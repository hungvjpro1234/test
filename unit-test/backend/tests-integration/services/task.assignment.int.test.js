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
    test('rejects assignee outside the group and leaves DB clean for that task title', async () => {
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
        memberIds: [inGroupUser._id],
        namePrefix: 'task_assignment_group'
      });

      const title = buildTaggedValue('task_outside_group', TEST_RUN_ID);

      await expect(
        taskService.createTask({
          title,
          description: 'should fail',
          createdBy: creator._id,
          groupId: group._id,
          assignedTo: [{ userId: outsider._id }]
        })
      ).rejects.toThrow('One or more users are not members of this group');

      const persisted = await Task.find({ title }).lean();
      expect(persisted).toHaveLength(0);
    });

    // IT_TASK_ASSIGNMENT_02
    test('rejects non-privileged creator assigning another user and does not persist task', async () => {
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
        creator,
        memberIds: [teammate._id],
        namePrefix: 'task_assignment_dev_group'
      });
      const title = buildTaggedValue('task_forbidden_assign', TEST_RUN_ID);

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
    test('rejects PM non-lead assigning another PM non-lead and does not persist task', async () => {
      const creator = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_pm_non_lead_creator',
        namePrefix: 'Task PM Non Lead Creator',
        role: GROUP_ROLE_KEYS.PM
      });
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
          createdBy: creator._id,
          groupId: group._id,
          assignedTo: [{ userId: targetPm._id }]
        })
      ).rejects.toThrow('PM, PO');

      const persisted = await Task.find({ title }).lean();
      expect(persisted).toHaveLength(0);
    });

    // IT_TASK_ASSIGNMENT_04
    test('allows PM lead assigning PM/PO/leader targets and persists all valid assignees', async () => {
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
      const poLeadTarget = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_pm_lead_target_po',
        namePrefix: 'Task PM Lead Target PO',
        role: GROUP_ROLE_KEYS.PRODUCT_OWNER,
        isLeader: true
      });
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
        memberIds: [pmTarget._id, poLeadTarget._id, devLeadTarget._id],
        namePrefix: 'task_pm_lead_group'
      });
      const folder = await createFolder({
        testRunId: TEST_RUN_ID,
        group,
        creator,
        namePrefix: 'task_pm_lead_folder',
        memberAccessUserIds: []
      });
      const title = buildTaggedValue('task_pm_lead_broad_assign', TEST_RUN_ID);

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

      expect(taskFromDb).toBeTruthy();
      expect(assignedIds).toEqual([
        String(pmTarget._id),
        String(poLeadTarget._id),
        String(devLeadTarget._id)
      ].sort());
      expect(folderAccessIds).toEqual([
        String(pmTarget._id),
        String(poLeadTarget._id),
        String(devLeadTarget._id)
      ].sort());
    });

    // IT_TASK_ASSIGNMENT_05
    test('rejects non-PM/PO leader assigning another leader and does not persist task', async () => {
      const creator = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_ba_leader_creator',
        namePrefix: 'Task BA Leader Creator',
        role: GROUP_ROLE_KEYS.BA,
        isLeader: true
      });
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
          assignedTo: [{ userId: targetLeader._id }]
        })
      ).rejects.toThrow('Lead');

      const persisted = await Task.find({ title }).lean();
      expect(persisted).toHaveLength(0);
    });

    // IT_TASK_ASSIGNMENT_06
    test('allows regular creator to self-assign only and persists the task', async () => {
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
        assignedTo: [{ userId: creator._id }]
      });

      const taskFromDb = await Task.findById(created._id).lean();

      expect(taskFromDb).toBeTruthy();
      expect(taskFromDb.title).toBe(title);
      expect(taskFromDb.assignedTo).toHaveLength(1);
      expect(String(taskFromDb.assignedTo[0].userId)).toBe(String(creator._id));
    });

    // IT_TASK_ASSIGNMENT_07
    test('keeps only valid assignees when PM non-lead mixes allowed and restricted targets', async () => {
      const creator = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_pm_mixed_creator',
        namePrefix: 'Task PM Mixed Creator',
        role: GROUP_ROLE_KEYS.PM
      });
      const validDeveloper = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_pm_mixed_dev',
        namePrefix: 'Task PM Mixed Dev',
        role: GROUP_ROLE_KEYS.DEVELOPER
      });
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
        assignedTo: [
          { userId: validDeveloper._id },
          { userId: restrictedPm._id }
        ]
      });

      const taskFromDb = await Task.findById(created._id).lean();
      const folderFromDb = await Folder.findById(folder._id).lean();
      const assignedIds = taskFromDb.assignedTo.map(item => String(item.userId));
      const folderAccessIds = folderFromDb.memberAccess.map(item => String(item.userId));

      expect(taskFromDb).toBeTruthy();
      expect(taskFromDb.title).toBe(title);
      expect(assignedIds).toEqual([String(validDeveloper._id)]);
      expect(assignedIds).not.toContain(String(restrictedPm._id));
      expect(folderAccessIds).toContain(String(validDeveloper._id));
      expect(folderAccessIds).not.toContain(String(restrictedPm._id));
    });

    // IT_TASK_ASSIGNMENT_08
    test('allows PM non-lead assigning a BA non-lead and persists the assignee', async () => {
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
        assignedTo: [{ userId: baTarget._id }]
      });

      const taskFromDb = await Task.findById(created._id).lean();
      expect(taskFromDb).toBeTruthy();
      expect(taskFromDb.assignedTo).toHaveLength(1);
      expect(String(taskFromDb.assignedTo[0].userId)).toBe(String(baTarget._id));
    });

    // IT_TASK_ASSIGNMENT_09
    test('allows PM non-lead assigning a QA non-lead and persists the assignee', async () => {
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
        assignedTo: [{ userId: qaTarget._id }]
      });

      const taskFromDb = await Task.findById(created._id).lean();
      expect(taskFromDb).toBeTruthy();
      expect(String(taskFromDb.assignedTo[0].userId)).toBe(String(qaTarget._id));
    });

    // IT_TASK_ASSIGNMENT_10
    test('allows PM non-lead assigning a developer leader and persists the assignee', async () => {
      const creator = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_pm_devlead_creator',
        namePrefix: 'Task PM DevLead Creator',
        role: GROUP_ROLE_KEYS.PM
      });
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
        assignedTo: [{ userId: devLeadTarget._id }]
      });

      const taskFromDb = await Task.findById(created._id).lean();
      expect(taskFromDb).toBeTruthy();
      expect(String(taskFromDb.assignedTo[0].userId)).toBe(String(devLeadTarget._id));
    });

    // IT_TASK_ASSIGNMENT_11
    test('rejects PM non-lead assigning a PO non-lead and does not persist task', async () => {
      const creator = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_pm_po_creator',
        namePrefix: 'Task PM PO Creator',
        role: GROUP_ROLE_KEYS.PM
      });
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
          assignedTo: [{ userId: poTarget._id }]
        })
      ).rejects.toThrow('PM, PO');

      const persisted = await Task.find({ title }).lean();
      expect(persisted).toHaveLength(0);
    });

    // IT_TASK_ASSIGNMENT_12
    test('rejects PM non-lead assigning a PM lead and does not persist task', async () => {
      const creator = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_pm_pmlead_creator',
        namePrefix: 'Task PM PMLead Creator',
        role: GROUP_ROLE_KEYS.PM
      });
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
          assignedTo: [{ userId: pmLeadTarget._id }]
        })
      ).rejects.toThrow('PM, PO');

      const persisted = await Task.find({ title }).lean();
      expect(persisted).toHaveLength(0);
    });

    // IT_TASK_ASSIGNMENT_13
    test('rejects PM non-lead assigning a PO lead and does not persist task', async () => {
      const creator = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_pm_polead_creator',
        namePrefix: 'Task PM POLead Creator',
        role: GROUP_ROLE_KEYS.PM
      });
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
          assignedTo: [{ userId: poLeadTarget._id }]
        })
      ).rejects.toThrow('PM, PO');

      const persisted = await Task.find({ title }).lean();
      expect(persisted).toHaveLength(0);
    });

    // IT_TASK_ASSIGNMENT_14
    test('allows PO non-lead assigning a developer and persists the assignee', async () => {
      const creator = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_po_dev_creator',
        namePrefix: 'Task PO Dev Creator',
        role: GROUP_ROLE_KEYS.PRODUCT_OWNER
      });
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
        assignedTo: [{ userId: developerTarget._id }]
      });

      const taskFromDb = await Task.findById(created._id).lean();
      expect(taskFromDb).toBeTruthy();
      expect(String(taskFromDb.assignedTo[0].userId)).toBe(String(developerTarget._id));
    });

    // IT_TASK_ASSIGNMENT_15
    test('rejects PO non-lead assigning a PM lead and does not persist task', async () => {
      const creator = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_po_pmlead_creator',
        namePrefix: 'Task PO PMLead Creator',
        role: GROUP_ROLE_KEYS.PRODUCT_OWNER
      });
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
          assignedTo: [{ userId: pmLeadTarget._id }]
        })
      ).rejects.toThrow('PM, PO');

      const persisted = await Task.find({ title }).lean();
      expect(persisted).toHaveLength(0);
    });

    // IT_TASK_ASSIGNMENT_16
    test('rejects PO non-lead assigning another PO non-lead and does not persist task', async () => {
      const creator = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_po_po_creator',
        namePrefix: 'Task PO PO Creator',
        role: GROUP_ROLE_KEYS.PRODUCT_OWNER
      });
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
          assignedTo: [{ userId: poTarget._id }]
        })
      ).rejects.toThrow('PM, PO');

      const persisted = await Task.find({ title }).lean();
      expect(persisted).toHaveLength(0);
    });

    // IT_TASK_ASSIGNMENT_17
    test('allows PO lead assigning a PM lead and persists the assignee', async () => {
      const creator = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_polead_pmlead_creator',
        namePrefix: 'Task POLead PMLead Creator',
        role: GROUP_ROLE_KEYS.PRODUCT_OWNER,
        isLeader: true
      });
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
        assignedTo: [{ userId: pmLeadTarget._id }]
      });

      const taskFromDb = await Task.findById(created._id).lean();
      expect(taskFromDb).toBeTruthy();
      expect(String(taskFromDb.assignedTo[0].userId)).toBe(String(pmLeadTarget._id));
    });

    // IT_TASK_ASSIGNMENT_18
    test('allows PO lead assigning a developer non-lead and persists without restricted side effects', async () => {
      const creator = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_polead_dev_creator',
        namePrefix: 'Task POLead Dev Creator',
        role: GROUP_ROLE_KEYS.PRODUCT_OWNER,
        isLeader: true
      });
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
        memberAccessUserIds: []
      });
      const title = buildTaggedValue('task_polead_dev_assign', TEST_RUN_ID);

      const created = await taskService.createTask({
        title,
        description: 'po lead assigns developer',
        createdBy: creator._id,
        groupId: group._id,
        folderId: folder._id,
        assignedTo: [{ userId: developerTarget._id }]
      });

      const taskFromDb = await Task.findById(created._id).lean();
      const folderFromDb = await Folder.findById(folder._id).lean();
      const folderAccessIds = folderFromDb.memberAccess.map(item => String(item.userId));

      expect(taskFromDb).toBeTruthy();
      expect(String(taskFromDb.assignedTo[0].userId)).toBe(String(developerTarget._id));
      expect(folderAccessIds).toEqual([String(developerTarget._id)]);
    });

    // IT_TASK_ASSIGNMENT_19
    test('keeps only valid assignees when PO non-lead mixes allowed and restricted targets', async () => {
      const creator = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_po_mixed_creator',
        namePrefix: 'Task PO Mixed Creator',
        role: GROUP_ROLE_KEYS.PRODUCT_OWNER
      });
      const validDeveloper = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_po_mixed_dev',
        namePrefix: 'Task PO Mixed Dev',
        role: GROUP_ROLE_KEYS.DEVELOPER
      });
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
        memberAccessUserIds: []
      });
      const title = buildTaggedValue('task_po_mixed_assign', TEST_RUN_ID);

      const created = await taskService.createTask({
        title,
        description: 'po mixed valid and restricted assignees',
        createdBy: creator._id,
        groupId: group._id,
        folderId: folder._id,
        assignedTo: [
          { userId: validDeveloper._id },
          { userId: restrictedPo._id }
        ]
      });

      const taskFromDb = await Task.findById(created._id).lean();
      const folderFromDb = await Folder.findById(folder._id).lean();
      const assignedIds = taskFromDb.assignedTo.map(item => String(item.userId));
      const folderAccessIds = folderFromDb.memberAccess.map(item => String(item.userId));

      expect(taskFromDb).toBeTruthy();
      expect(assignedIds).toEqual([String(validDeveloper._id)]);
      expect(folderAccessIds).toContain(String(validDeveloper._id));
      expect(folderAccessIds).not.toContain(String(restrictedPo._id));
    });

    // IT_TASK_ASSIGNMENT_20
    test('persists self only when PO non-lead mixes self with a restricted target', async () => {
      const creator = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_po_self_creator',
        namePrefix: 'Task PO Self Creator',
        role: GROUP_ROLE_KEYS.PRODUCT_OWNER
      });
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
        assignedTo: [
          { userId: creator._id },
          { userId: restrictedPo._id }
        ]
      });

      const taskFromDb = await Task.findById(created._id).lean();
      const assignedIds = taskFromDb.assignedTo.map(item => String(item.userId));

      expect(taskFromDb).toBeTruthy();
      expect(assignedIds).toEqual([String(creator._id)]);
      expect(assignedIds).not.toContain(String(restrictedPo._id));
    });
  });
});
