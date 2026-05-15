/**
 * Integration Tests: task.service.js
 * Source: backend/src/services/task.service.js
 *
 * Focus: assignment permission matrix and persistence outcomes.
 */

const path = require('path');

const mockCreateNewTaskNotification = jest.fn().mockResolvedValue({ success: true });
const mockEmitTaskEvent = jest.fn();

jest.mock(
  require('path').resolve(__dirname, '../../../../backend/src/services/notification.service'),
  () => ({
    createNewTaskNotification: mockCreateNewTaskNotification
  })
);

jest.mock(
  require('path').resolve(__dirname, '../../../../backend/src/services/task.realtime.gateway'),
  () => ({
    TASK_EVENTS: {
      created: 'task.created',
      updated: 'task.updated',
      deleted: 'task.deleted'
    },
    emitTaskEvent: mockEmitTaskEvent
  })
);

jest.mock(
  require('path').resolve(__dirname, '../../../../backend/src/services/file.service'),
  () => ({})
);

const taskService = require(path.resolve(__dirname, '../../../../backend/src/services/task.service'));
const Task = require(path.resolve(__dirname, '../../../../backend/src/models/Task.model'));
const Folder = require(path.resolve(__dirname, '../../../../backend/src/models/Folder.model'));

const {
  connectTestDb,
  disconnectTestDb,
  cleanupByRunId,
  assertCleanRunId
} = require('../_helpers/db');

const {
  GROUP_ROLE_KEYS,
  createTestRunId,
  buildTaggedValue,
  createUser,
  createGroup,
  createFolder
} = require('../_helpers/fixtures');

const TEST_RUN_ID = createTestRunId();

beforeAll(async () => {
  await connectTestDb();
});

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(async () => {
  await cleanupByRunId(TEST_RUN_ID);
  await assertCleanRunId(TEST_RUN_ID);
});

afterAll(async () => {
  await cleanupByRunId(TEST_RUN_ID);
  await assertCleanRunId(TEST_RUN_ID);
  await disconnectTestDb();
});

describe('Integration - task.assignment -> task.service.js', () => {
  describe('assignment guardrails', () => {
    // IT_TASK_ASSIGNMENT_01
    test('Kiểm tra rằng dù người tạo là PM, hệ thống vẫn không cho gán task cho một người không thuộc group.', async () => {
      // PM : Tạo group
      const creator = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_pm_owner',
        namePrefix: 'Task PM Owner',
        role: GROUP_ROLE_KEYS.PM
      });
      const inGroupUser = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_in_group',
        namePrefix: 'Task In Group',
        role: GROUP_ROLE_KEYS.DEVELOPER
      });
      const outsider = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_outsider',
        namePrefix: 'Task Outsider',
        role: GROUP_ROLE_KEYS.DEVELOPER
      });
      const group = await createGroup({
        testRunId: TEST_RUN_ID,
        creator,
        // Group không có tv là outsider
        memberIds: [inGroupUser._id],
        namePrefix: 'task_assignment_group'
      });

      const title = buildTaggedValue('task_outside_group', TEST_RUN_ID);

      // expected : bị từ chối
      await expect(
        taskService.createTask({
          title,
          description: 'should fail',
          createdBy: creator._id,
          groupId: group._id,
          // vì giao việc cho người không thuộc group
          assignedTo: [{ userId: outsider._id }]
        })
      ).rejects.toThrow('One or more users are not members of this group');

      const persisted = await Task.find({ title }).lean();
      // DB không lưu task
      expect(persisted).toHaveLength(0);
    });

    // IT_TASK_ASSIGNMENT_02
    test('Kiểm tra một Developer bình thường không được tạo task và gán task đó cho teammate khác.', async () => {
      // Developer : Tạo group
      const creator = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_dev_creator',
        namePrefix: 'Task Dev Creator',
        role: GROUP_ROLE_KEYS.DEVELOPER
      });
      const teammate = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_dev_teammate',
        namePrefix: 'Task Dev Teammate',
        role: GROUP_ROLE_KEYS.DEVELOPER
      });
      const group = await createGroup({
        testRunId: TEST_RUN_ID,
        // Group được khởi tạo : dev là người tạo
        creator,
        memberIds: [teammate._id],
        namePrefix: 'task_assignment_dev_group'
      });
      const title = buildTaggedValue('task_forbidden_assign', TEST_RUN_ID);

      // expected : thông báo chỉ có thể gán task cho chính mình
      await expect(
        taskService.createTask({
          title,
          description: 'dev cannot assign teammate',
          createdBy: creator._id,
          groupId: group._id,
          assignedTo: [{ userId: teammate._id }]
        })
      ).rejects.toThrow('gán task cho chính mình');

      const persisted = await Task.find({ title }).lean();
      expect(persisted).toHaveLength(0);
    });

    // IT_TASK_ASSIGNMENT_03
    test('Kiểm tra PM không có quyền lead không được gán task cho một PM khác cũng không phải lead.', async () => {
      // PM : ko có isLeader
      const creator = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_pm_non_lead_creator',
        namePrefix: 'Task PM Non Lead Creator',
        role: GROUP_ROLE_KEYS.PM
      });
      // PM : ko có isLeader
      const targetPm = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_pm_non_lead_target',
        namePrefix: 'Task PM Non Lead Target',
        role: GROUP_ROLE_KEYS.PM
      });
      const group = await createGroup({
        testRunId: TEST_RUN_ID,
        creator,
        memberIds: [targetPm._id],
        namePrefix: 'task_pm_non_lead_group'
      });
      const title = buildTaggedValue('task_pm_non_lead_restricted', TEST_RUN_ID);

      await expect(
        taskService.createTask({
          title,
          description: 'pm non-lead cannot assign pm non-lead',
          // PM tạo task
          createdBy: creator._id,
          groupId: group._id,
          // assign cho pm khác
          assignedTo: [{ userId: targetPm._id }]
        })
        // fail
      ).rejects.toThrow('PM, PO');

      const persisted = await Task.find({ title }).lean();
      expect(persisted).toHaveLength(0);
    });

    // IT_TASK_ASSIGNMENT_04
    test('Kiểm tra PM có thuộc tính lead được quyền assign rộng: PM, PO lead, Developer lead.', async () => {
      // PM : tạo group && isLeader
      const creator = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_pm_lead_creator',
        namePrefix: 'Task PM Lead Creator',
        role: GROUP_ROLE_KEYS.PM,
        isLeader: true
      });
      const pmTarget = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_pm_lead_target_pm',
        namePrefix: 'Task PM Lead Target PM',
        role: GROUP_ROLE_KEYS.PM
      });
      // PO : isLeader
      const poLeadTarget = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_pm_lead_target_po',
        namePrefix: 'Task PM Lead Target PO',
        role: GROUP_ROLE_KEYS.PRODUCT_OWNER,
        isLeader: true
      });
      // Developer : isLeader
      const devLeadTarget = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_pm_lead_target_dev',
        namePrefix: 'Task PM Lead Target Dev',
        role: GROUP_ROLE_KEYS.DEVELOPER,
        isLeader: true
      });
      const group = await createGroup({
        testRunId: TEST_RUN_ID,
        creator,
        // Group full thành viên
        memberIds: [pmTarget._id, poLeadTarget._id, devLeadTarget._id],
        namePrefix: 'task_pm_lead_group'
      });
      const folder = await createFolder({
        testRunId: TEST_RUN_ID,
        group,
        creator,
        namePrefix: 'task_pm_lead_folder',
        // Folder trong group ban đầu rỗng
        memberAccessUserIds: []
      });
      const title = buildTaggedValue('task_pm_lead_broad_assign', TEST_RUN_ID);

      // Tạo task trong folder rỗng và assign cho tất cả các thành viên ở trên
      const created = await taskService.createTask({
        title,
        description: 'pm lead can assign broad set',
        createdBy: creator._id,
        groupId: group._id,
        folderId: folder._id,
        assignedTo: [
          { userId: pmTarget._id },
          { userId: poLeadTarget._id },
          { userId: devLeadTarget._id }
        ]
      });

      const taskFromDb = await Task.findById(created._id).lean();
      const folderFromDb = await Folder.findById(folder._id).lean();
      const assignedIds = taskFromDb.assignedTo.map(item => String(item.userId)).sort();
      const folderAccessIds = folderFromDb.memberAccess.map(item => String(item.userId)).sort();

      // task được tạo
      expect(taskFromDb).toBeTruthy();
      // các thành viên phải được asigned trong task
      expect(assignedIds).toEqual([
        String(pmTarget._id),
        String(poLeadTarget._id),
        String(devLeadTarget._id)
      ].sort());
      // các thành viên phải được accessable trong folder
      expect(folderAccessIds).toEqual([
        String(pmTarget._id),
        String(poLeadTarget._id),
        String(devLeadTarget._id)
      ].sort());
    });

    // IT_TASK_ASSIGNMENT_05
    test('Kiểm tra một BA lead ( không phải PM/PO ) không được gán task cho một leader khác', async () => {
      // BA : tạo group && isLeader
      const creator = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_ba_leader_creator',
        namePrefix: 'Task BA Leader Creator',
        role: GROUP_ROLE_KEYS.BA,
        isLeader: true
      });
      // PM : isleader
      const targetLeader = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_ba_leader_target',
        namePrefix: 'Task BA Leader Target',
        role: GROUP_ROLE_KEYS.DEVELOPER,
        isLeader: true
      });
      const group = await createGroup({
        testRunId: TEST_RUN_ID,
        creator,
        memberIds: [targetLeader._id],
        namePrefix: 'task_ba_leader_group'
      });
      const title = buildTaggedValue('task_ba_leader_restricted', TEST_RUN_ID);

      await expect(
        taskService.createTask({
          title,
          description: 'leader cannot assign another leader',
          createdBy: creator._id,
          groupId: group._id,
          // BA lead assign cho leader PM
          assignedTo: [{ userId: targetLeader._id }]
        })
        // fail
      ).rejects.toThrow('Lead');

      const persisted = await Task.find({ title }).lean();
      expect(persisted).toHaveLength(0);
    });

    // IT_TASK_ASSIGNMENT_06
    test('Kiểm tra Developer bình thường vẫn có quyền tạo task và tự assign chính mình.', async () => {
      // Developer : tạo group & task
      const creator = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_dev_self_creator',
        namePrefix: 'Task Dev Self Creator',
        role: GROUP_ROLE_KEYS.DEVELOPER
      });
      const group = await createGroup({
        testRunId: TEST_RUN_ID,
        creator,
        namePrefix: 'task_dev_self_group'
      });
      const folder = await createFolder({
        testRunId: TEST_RUN_ID,
        group,
        creator,
        namePrefix: 'task_dev_self_folder',
        memberAccessUserIds: [creator._id]
      });
      const title = buildTaggedValue('task_dev_self_assign', TEST_RUN_ID);

      const created = await taskService.createTask({
        title,
        description: 'regular creator self assignment',
        createdBy: creator._id,
        groupId: group._id,
        folderId: folder._id,
        // Developer assign chính mình
        assignedTo: [{ userId: creator._id }]
      });

      const taskFromDb = await Task.findById(created._id).lean();

      // task được tạo bình thường
      expect(taskFromDb).toBeTruthy();
      expect(taskFromDb.title).toBe(title);
      expect(taskFromDb.assignedTo).toHaveLength(1);
      expect(String(taskFromDb.assignedTo[0].userId)).toBe(String(creator._id));
    });

    // IT_TASK_ASSIGNMENT_07
    test('Kiểm tra khi PM non-lead assign cùng lúc Developer hợp lệ và PM bị hạn chế, hệ thống chỉ giữ người hợp lệ thay vì fail toàn bộ.', async () => {
      // PM : tạo group && non-lead (ko được assign cho PM/PO khác)
      const creator = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_pm_mixed_creator',
        namePrefix: 'Task PM Mixed Creator',
        role: GROUP_ROLE_KEYS.PM
      });
      // Developer : thành viên trong group
      const validDeveloper = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_pm_mixed_dev',
        namePrefix: 'Task PM Mixed Dev',
        role: GROUP_ROLE_KEYS.DEVELOPER
      });
      // PM : PM khác trong group
      const restrictedPm = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_pm_mixed_pm',
        namePrefix: 'Task PM Mixed PM',
        role: GROUP_ROLE_KEYS.PM
      });
      const group = await createGroup({
        testRunId: TEST_RUN_ID,
        creator,
        memberIds: [validDeveloper._id, restrictedPm._id],
        namePrefix: 'task_pm_mixed_group'
      });
      const folder = await createFolder({
        testRunId: TEST_RUN_ID,
        group,
        creator,
        namePrefix: 'task_pm_mixed_folder',
        memberAccessUserIds: []
      });
      const title = buildTaggedValue('task_pm_mixed_assign', TEST_RUN_ID);

      const created = await taskService.createTask({
        title,
        description: 'mixed valid and restricted assignees',
        createdBy: creator._id,
        groupId: group._id,
        folderId: folder._id,
        // Creator (PM non-lead) assign cho Developer và PM khác
        assignedTo: [
          { userId: validDeveloper._id },
          { userId: restrictedPm._id }
        ]
      });

      const taskFromDb = await Task.findById(created._id).lean();
      const folderFromDb = await Folder.findById(folder._id).lean();
      const assignedIds = taskFromDb.assignedTo.map(item => String(item.userId));
      const folderAccessIds = folderFromDb.memberAccess.map(item => String(item.userId));

      // Task vẫn được tạo nhưng chỉ assign cho Developer
      expect(taskFromDb).toBeTruthy();
      expect(taskFromDb.title).toBe(title);
      expect(assignedIds).toEqual([String(validDeveloper._id)]);
      expect(assignedIds).not.toContain(String(restrictedPm._id));
      expect(folderAccessIds).toContain(String(validDeveloper._id));
      expect(folderAccessIds).not.toContain(String(restrictedPm._id));
    });

    // IT_TASK_ASSIGNMENT_08
    test('Kiểm tra PM non-lead được phép gán task cho BA không phải lead.', async () => {
      const creator = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_pm_ba_creator',
        namePrefix: 'Task PM BA Creator',
        role: GROUP_ROLE_KEYS.PM
      });
      const baTarget = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_pm_ba_target',
        namePrefix: 'Task PM BA Target',
        role: GROUP_ROLE_KEYS.BA
      });
      const group = await createGroup({
        testRunId: TEST_RUN_ID,
        creator,
        memberIds: [baTarget._id],
        namePrefix: 'task_pm_ba_group'
      });
      const title = buildTaggedValue('task_pm_ba_assign', TEST_RUN_ID);

      const created = await taskService.createTask({
        title,
        description: 'pm non-lead assigns ba',
        createdBy: creator._id,
        groupId: group._id,
        // Creator (PM non-lead) assign cho BA (non-lead)
        assignedTo: [{ userId: baTarget._id }]
      });

      const taskFromDb = await Task.findById(created._id).lean();
      // task tạo bình thường
      expect(taskFromDb).toBeTruthy();
      expect(taskFromDb.assignedTo).toHaveLength(1);
      expect(String(taskFromDb.assignedTo[0].userId)).toBe(String(baTarget._id));
    });

    // IT_TASK_ASSIGNMENT_09
    test('Kiểm tra PM non-lead được phép gán task cho QA thường.', async () => {
      const creator = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_pm_qa_creator',
        namePrefix: 'Task PM QA Creator',
        role: GROUP_ROLE_KEYS.PM
      });
      const qaTarget = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_pm_qa_target',
        namePrefix: 'Task PM QA Target',
        role: GROUP_ROLE_KEYS.QA
      });
      const group = await createGroup({
        testRunId: TEST_RUN_ID,
        creator,
        memberIds: [qaTarget._id],
        namePrefix: 'task_pm_qa_group'
      });
      const title = buildTaggedValue('task_pm_qa_assign', TEST_RUN_ID);

      const created = await taskService.createTask({
        title,
        description: 'pm non-lead assigns qa',
        createdBy: creator._id,
        groupId: group._id,
        // Creator (PM non-lead) assign cho QA (non-lead)
        assignedTo: [{ userId: qaTarget._id }]
      });

      const taskFromDb = await Task.findById(created._id).lean();
      expect(taskFromDb).toBeTruthy();
      expect(String(taskFromDb.assignedTo[0].userId)).toBe(String(qaTarget._id));
    });

    // IT_TASK_ASSIGNMENT_10
    test('Kiểm tra PM non-lead được phép gán folder cho Developer có thuộc tính lead.', async () => {
      // PM : tạo group && non-lead
      const creator = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_pm_devlead_creator',
        namePrefix: 'Task PM DevLead Creator',
        role: GROUP_ROLE_KEYS.PM
      });
      // Developer : isLeader
      const devLeadTarget = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_pm_devlead_target',
        namePrefix: 'Task PM DevLead Target',
        role: GROUP_ROLE_KEYS.DEVELOPER,
        isLeader: true
      });
      const group = await createGroup({
        testRunId: TEST_RUN_ID,
        creator,
        memberIds: [devLeadTarget._id],
        namePrefix: 'task_pm_devlead_group'
      });
      const title = buildTaggedValue('task_pm_devlead_assign', TEST_RUN_ID);

      const created = await taskService.createTask({
        title,
        description: 'pm non-lead assigns developer leader',
        createdBy: creator._id,
        groupId: group._id,
        // Creator (PM non-lead) assign cho Developer (lead)
        assignedTo: [{ userId: devLeadTarget._id }]
      });

      const taskFromDb = await Task.findById(created._id).lean();
      // task tạo bình thuong
      expect(taskFromDb).toBeTruthy();
      expect(String(taskFromDb.assignedTo[0].userId)).toBe(String(devLeadTarget._id));
    });

    // IT_TASK_ASSIGNMENT_11
    test('Kiểm tra PM non-lead không được assign task cho PO non-lead.', async () => {
      // PM : tạo group && non-lead
      const creator = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_pm_po_creator',
        namePrefix: 'Task PM PO Creator',
        role: GROUP_ROLE_KEYS.PM
      });
      // PO : thành viên, non-lead
      const poTarget = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_pm_po_target',
        namePrefix: 'Task PM PO Target',
        role: GROUP_ROLE_KEYS.PRODUCT_OWNER
      });
      const group = await createGroup({
        testRunId: TEST_RUN_ID,
        creator,
        memberIds: [poTarget._id],
        namePrefix: 'task_pm_po_group'
      });
      const title = buildTaggedValue('task_pm_po_restricted', TEST_RUN_ID);

      await expect(
        taskService.createTask({
          title,
          description: 'pm non-lead cannot assign po non-lead',
          createdBy: creator._id,
          groupId: group._id,
          // Creator (PM non-lead) assign cho PO (non-lead)
          assignedTo: [{ userId: poTarget._id }]
        })
      ).rejects.toThrow('PM, PO');

      const persisted = await Task.find({ title }).lean();
      // fail
      expect(persisted).toHaveLength(0);
    });

    // IT_TASK_ASSIGNMENT_12
    test('Kiểm tra PM thường không được assign cho PM lead.', async () => {
      // PM : tạo group && non-lead
      const creator = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_pm_pmlead_creator',
        namePrefix: 'Task PM PMLead Creator',
        role: GROUP_ROLE_KEYS.PM
      });
      // PM : thành viên && isleader
      const pmLeadTarget = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_pm_pmlead_target',
        namePrefix: 'Task PM PMLead Target',
        role: GROUP_ROLE_KEYS.PM,
        isLeader: true
      });
      const group = await createGroup({
        testRunId: TEST_RUN_ID,
        creator,
        memberIds: [pmLeadTarget._id],
        namePrefix: 'task_pm_pmlead_group'
      });
      const title = buildTaggedValue('task_pm_pmlead_restricted', TEST_RUN_ID);

      await expect(
        taskService.createTask({
          title,
          description: 'pm non-lead cannot assign pm lead',
          createdBy: creator._id,
          groupId: group._id,
          // Creator (PM non-lead) assign cho PM (lead)
          assignedTo: [{ userId: pmLeadTarget._id }]
        })
      ).rejects.toThrow('PM, PO');

      const persisted = await Task.find({ title }).lean();
      //fail
      expect(persisted).toHaveLength(0);
    });

    // IT_TASK_ASSIGNMENT_13
    test('Kiểm tra PM thường không được assign cho PO lead.', async () => {
      // PM : tạo group && non-lead
      const creator = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_pm_polead_creator',
        namePrefix: 'Task PM POLead Creator',
        role: GROUP_ROLE_KEYS.PM
      });
      // PO : thành viên && isleader
      const poLeadTarget = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_pm_polead_target',
        namePrefix: 'Task PM POLead Target',
        role: GROUP_ROLE_KEYS.PRODUCT_OWNER,
        isLeader: true
      });
      const group = await createGroup({
        testRunId: TEST_RUN_ID,
        creator,
        memberIds: [poLeadTarget._id],
        namePrefix: 'task_pm_polead_group'
      });
      const title = buildTaggedValue('task_pm_polead_restricted', TEST_RUN_ID);

      await expect(
        taskService.createTask({
          title,
          description: 'pm non-lead cannot assign po lead',
          createdBy: creator._id,
          groupId: group._id,
          // Creator (PM non-lead) assign cho PO (lead)
          assignedTo: [{ userId: poLeadTarget._id }]
        })
      ).rejects.toThrow('PM, PO');

      const persisted = await Task.find({ title }).lean();
      //fail
      expect(persisted).toHaveLength(0);
    });

    // IT_TASK_ASSIGNMENT_14
    test('Kiểm tra PO non-lead có quyền assign task cho Developer.', async () => {
      // PO : tạo group && non-lead
      const creator = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_po_dev_creator',
        namePrefix: 'Task PO Dev Creator',
        role: GROUP_ROLE_KEYS.PRODUCT_OWNER
      });
      // Developer : thành viên && non-lead
      const developerTarget = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_po_dev_target',
        namePrefix: 'Task PO Dev Target',
        role: GROUP_ROLE_KEYS.DEVELOPER
      });
      const group = await createGroup({
        testRunId: TEST_RUN_ID,
        creator,
        memberIds: [developerTarget._id],
        namePrefix: 'task_po_dev_group'
      });
      const title = buildTaggedValue('task_po_dev_assign', TEST_RUN_ID);

      const created = await taskService.createTask({
        title,
        description: 'po non-lead assigns developer',
        createdBy: creator._id,
        groupId: group._id,
        // Creator (PO non-lead) assign cho Developer (non-lead)
        assignedTo: [{ userId: developerTarget._id }]
      });

      const taskFromDb = await Task.findById(created._id).lean();
      // thành công
      expect(taskFromDb).toBeTruthy();
      expect(String(taskFromDb.assignedTo[0].userId)).toBe(String(developerTarget._id));
    });

    // IT_TASK_ASSIGNMENT_15
    test('Kiểm tra PO thường không được assign task cho PM lead.', async () => {
      // PO : tạo group && non-lead
      const creator = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_po_pmlead_creator',
        namePrefix: 'Task PO PMLead Creator',
        role: GROUP_ROLE_KEYS.PRODUCT_OWNER
      });
      // PM : thành viên && isleader
      const pmLeadTarget = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_po_pmlead_target',
        namePrefix: 'Task PO PMLead Target',
        role: GROUP_ROLE_KEYS.PM,
        isLeader: true
      });
      const group = await createGroup({
        testRunId: TEST_RUN_ID,
        creator,
        memberIds: [pmLeadTarget._id],
        namePrefix: 'task_po_pmlead_group'
      });
      const title = buildTaggedValue('task_po_pmlead_restricted', TEST_RUN_ID);

      await expect(
        taskService.createTask({
          title,
          description: 'po non-lead cannot assign pm lead',
          createdBy: creator._id,
          groupId: group._id,
          // Creator (PO non-lead) assign cho PM (lead)
          assignedTo: [{ userId: pmLeadTarget._id }]
        })
      ).rejects.toThrow('PM, PO');

      const persisted = await Task.find({ title }).lean();
      expect(persisted).toHaveLength(0);
    });

    // IT_TASK_ASSIGNMENT_16
    test('Kiểm tra PO thường không được assign cho PO thường khác.', async () => {
      // PO : tạo group && non-lead
      const creator = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_po_po_creator',
        namePrefix: 'Task PO PO Creator',
        role: GROUP_ROLE_KEYS.PRODUCT_OWNER
      });
      // PO : thành viên, non-lead
      const poTarget = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_po_po_target',
        namePrefix: 'Task PO PO Target',
        role: GROUP_ROLE_KEYS.PRODUCT_OWNER
      });
      const group = await createGroup({
        testRunId: TEST_RUN_ID,
        creator,
        memberIds: [poTarget._id],
        namePrefix: 'task_po_po_group'
      });
      const title = buildTaggedValue('task_po_po_restricted', TEST_RUN_ID);

      await expect(
        taskService.createTask({
          title,
          description: 'po non-lead cannot assign po non-lead',
          createdBy: creator._id,
          groupId: group._id,
          // Creator (PO non-lead) assign cho PO (non-lead)
          assignedTo: [{ userId: poTarget._id }]
        })
      ).rejects.toThrow('PM, PO');

      const persisted = await Task.find({ title }).lean();

      //fail
      expect(persisted).toHaveLength(0);
    });

    // IT_TASK_ASSIGNMENT_17
    test('Kiểm tra PO lead có quyền assign cho PM lead.', async () => {
      // PO : tạo group && isleader
      const creator = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_polead_pmlead_creator',
        namePrefix: 'Task POLead PMLead Creator',
        role: GROUP_ROLE_KEYS.PRODUCT_OWNER,
        isLeader: true
      });
      // PM : thanh vien && isleader
      const pmLeadTarget = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_polead_pmlead_target',
        namePrefix: 'Task POLead PMLead Target',
        role: GROUP_ROLE_KEYS.PM,
        isLeader: true
      });
      const group = await createGroup({
        testRunId: TEST_RUN_ID,
        creator,
        memberIds: [pmLeadTarget._id],
        namePrefix: 'task_polead_pmlead_group'
      });
      const title = buildTaggedValue('task_polead_pmlead_assign', TEST_RUN_ID);

      const created = await taskService.createTask({
        title,
        description: 'po lead assigns pm lead',
        createdBy: creator._id,
        groupId: group._id,
        // Creator (PO lead) assign cho PM (lead)
        assignedTo: [{ userId: pmLeadTarget._id }]
      });

      const taskFromDb = await Task.findById(created._id).lean();
      expect(taskFromDb).toBeTruthy();
      expect(String(taskFromDb.assignedTo[0].userId)).toBe(String(pmLeadTarget._id));
    });

    // IT_TASK_ASSIGNMENT_18
    test('Kiểm tra PO lead assign Developer thường vào task trong folder riêng, đồng thời hệ thống cấp folder access đúng cho Developer đó.', async () => {
      // PO : tạo group && isleader
      const creator = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_polead_dev_creator',
        namePrefix: 'Task POLead Dev Creator',
        role: GROUP_ROLE_KEYS.PRODUCT_OWNER,
        isLeader: true
      });
      // developer : nonlead
      const developerTarget = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_polead_dev_target',
        namePrefix: 'Task POLead Dev Target',
        role: GROUP_ROLE_KEYS.DEVELOPER
      });
      const group = await createGroup({
        testRunId: TEST_RUN_ID,
        creator,
        memberIds: [developerTarget._id],
        namePrefix: 'task_polead_dev_group'
      });
      const folder = await createFolder({
        testRunId: TEST_RUN_ID,
        group,
        creator,
        namePrefix: 'task_polead_dev_folder',
        // developer không được access folder này
        memberAccessUserIds: []
      });
      const title = buildTaggedValue('task_polead_dev_assign', TEST_RUN_ID);

      const created = await taskService.createTask({
        title,
        description: 'po lead assigns developer',
        createdBy: creator._id,
        groupId: group._id,
        folderId: folder._id,
        // Creator (PO lead) assign task cho Developer không tham gia folder
        assignedTo: [{ userId: developerTarget._id }]
      });

      const taskFromDb = await Task.findById(created._id).lean();
      const folderFromDb = await Folder.findById(folder._id).lean();
      const folderAccessIds = folderFromDb.memberAccess.map(item => String(item.userId));

      // task vẫn được tạo và giao cho Developer
      expect(taskFromDb).toBeTruthy();
      expect(String(taskFromDb.assignedTo[0].userId)).toBe(String(developerTarget._id));
      expect(folderAccessIds).toEqual([String(developerTarget._id)]);
    });

    // IT_TASK_ASSIGNMENT_19
    test('Kiểm tra PO non-lead khi assign một danh sách hỗn hợp thì hệ thống chỉ giữ Developer hợp lệ, loại PO bị hạn chế.', async () => {
      // PO : tạo group && non-lead
      const creator = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_po_mixed_creator',
        namePrefix: 'Task PO Mixed Creator',
        role: GROUP_ROLE_KEYS.PRODUCT_OWNER
      });
      // Developer : tham gia group
      const validDeveloper = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_po_mixed_dev',
        namePrefix: 'Task PO Mixed Dev',
        role: GROUP_ROLE_KEYS.DEVELOPER
      });
      // PO : PO && non-lead
      const restrictedPo = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_po_mixed_po',
        namePrefix: 'Task PO Mixed PO',
        role: GROUP_ROLE_KEYS.PRODUCT_OWNER
      });
      const group = await createGroup({
        testRunId: TEST_RUN_ID,
        creator,
        memberIds: [validDeveloper._id, restrictedPo._id],
        namePrefix: 'task_po_mixed_group'
      });
      const folder = await createFolder({
        testRunId: TEST_RUN_ID,
        group,
        creator,
        namePrefix: 'task_po_mixed_folder',
        // folder không có cả developer và PO
        memberAccessUserIds: []
      });
      const title = buildTaggedValue('task_po_mixed_assign', TEST_RUN_ID);

      const created = await taskService.createTask({
        title,
        description: 'po mixed valid and restricted assignees',
        createdBy: creator._id,
        groupId: group._id,
        folderId: folder._id,
        // Creator (PO non-lead) assign cho Developer và PO (non-lead)
        assignedTo: [
          { userId: validDeveloper._id },
          { userId: restrictedPo._id }
        ]
      });

      const taskFromDb = await Task.findById(created._id).lean();
      const folderFromDb = await Folder.findById(folder._id).lean();
      const assignedIds = taskFromDb.assignedTo.map(item => String(item.userId));
      const folderAccessIds = folderFromDb.memberAccess.map(item => String(item.userId));

      // Task vẫn được tạo nhưng chỉ assign cho Developer
      expect(taskFromDb).toBeTruthy();
      expect(assignedIds).toEqual([String(validDeveloper._id)]);
      expect(folderAccessIds).toContain(String(validDeveloper._id));
      expect(folderAccessIds).not.toContain(String(restrictedPo._id));
    });

    // IT_TASK_ASSIGNMENT_20
    test('Kiểm tra self-assignment luôn được ưu tiên hợp lệ, kể cả khi danh sách assign có thêm một PO khác bị hạn chế.', async () => {
      // PO : tạo group && non-lead
      const creator = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_po_self_creator',
        namePrefix: 'Task PO Self Creator',
        role: GROUP_ROLE_KEYS.PRODUCT_OWNER
      });
      // PO : thành viên && non-lead
      const restrictedPo = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_po_self_restricted',
        namePrefix: 'Task PO Self Restricted',
        role: GROUP_ROLE_KEYS.PRODUCT_OWNER
      });
      const group = await createGroup({
        testRunId: TEST_RUN_ID,
        creator,
        memberIds: [restrictedPo._id],
        namePrefix: 'task_po_self_group'
      });
      const title = buildTaggedValue('task_po_self_partial', TEST_RUN_ID);

      const created = await taskService.createTask({
        title,
        description: 'po self plus restricted target',
        createdBy: creator._id,
        groupId: group._id,
        // Creator (PO non-lead) assign cho PO (non-lead) và chính mình
        assignedTo: [
          { userId: creator._id },
          { userId: restrictedPo._id }
        ]
      });

      const taskFromDb = await Task.findById(created._id).lean();
      const assignedIds = taskFromDb.assignedTo.map(item => String(item.userId));

      // Task vẫn được tạo nhưng chỉ assign cho Creator
      expect(taskFromDb).toBeTruthy();
      expect(assignedIds).toEqual([String(creator._id)]);
      expect(assignedIds).not.toContain(String(restrictedPo._id));
    });
  });
});
