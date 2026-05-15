/**
 * Integration Tests: task.service.js
 * Source: backend/src/services/task.service.js
 *
 * Focus: createTask persistence, folder side effects, and helper behavior mappings via public APIs.
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
  createFolder,
  createTaskDoc
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

describe('Integration - task.helpers -> task.service.js', () => {
  describe('createTask persistence', () => {
    // IT_TASK_CREATE_01
    test('creates task in DB with correct creator, group, folder and assignees', async () => {
      const creator = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_creator',
        namePrefix: 'Task Creator',
        role: GROUP_ROLE_KEYS.PM
      });
      const assignee = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_assignee',
        namePrefix: 'Task Assignee',
        role: GROUP_ROLE_KEYS.DEVELOPER
      });
      const group = await createGroup({
        testRunId: TEST_RUN_ID,
        creator,
        memberIds: [assignee._id],
        namePrefix: 'task_group'
      });
      const targetFolder = await createFolder({
        testRunId: TEST_RUN_ID,
        group,
        creator,
        namePrefix: 'task_folder'
      });

      const title = buildTaggedValue('task_create', TEST_RUN_ID);
      const created = await taskService.createTask({
        title,
        description: 'task create integration',
        createdBy: creator._id,
        groupId: group._id,
        folderId: targetFolder._id,
        assignedTo: [{ userId: assignee._id }]
      });

      const fromDb = await Task.findById(created._id).lean();

      expect(fromDb).toBeTruthy();
      expect(fromDb.title).toBe(title);
      expect(fromDb.description).toBe('task create integration');
      expect(String(fromDb.createdBy)).toBe(String(creator._id));
      expect(String(fromDb.groupId)).toBe(String(group._id));
      expect(String(fromDb.folderId)).toBe(String(targetFolder._id));
      expect(fromDb.assignedTo).toHaveLength(1);
      expect(String(fromDb.assignedTo[0].userId)).toBe(String(assignee._id));
      expect(mockCreateNewTaskNotification).toHaveBeenCalledTimes(1);
      expect(mockEmitTaskEvent).toHaveBeenCalledTimes(1);
    });
  });

  describe('folder access side effects', () => {
    // IT_TASK_FOLDER_ACCESS_01
    test('Khi PM giao task trong một folder riêng cho một người chưa có quyền vào folder đó, hệ thống sẽ tự mở quyền folder cho người đó.', async () => {
      const creator = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_folder_pm',
        namePrefix: 'Task Folder PM',
        role: GROUP_ROLE_KEYS.PM
      });
      const assignee = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_folder_dev',
        namePrefix: 'Task Folder Dev',
        role: GROUP_ROLE_KEYS.DEVELOPER
      });
      const group = await createGroup({
        testRunId: TEST_RUN_ID,
        creator,
        memberIds: [assignee._id],
        namePrefix: 'task_folder_group'
      });
      const folder = await createFolder({
        testRunId: TEST_RUN_ID,
        group,
        creator,
        namePrefix: 'task_folder_target',
        // Ban đầu, assignee chưa có quyen truy cap folder
        memberAccessUserIds: []
      });
      const title = buildTaggedValue('task_folder_auto_access', TEST_RUN_ID);

      const created = await taskService.createTask({
        title,
        description: 'auto grant folder access',
        createdBy: creator._id,
        groupId: group._id,
        folderId: folder._id,
        assignedTo: [{ userId: assignee._id }]
      });

      const folderFromDb = await Folder.findById(folder._id).lean();
      const taskFromDb = await Task.findById(created._id).lean();
      const memberAccessIds = (folderFromDb.memberAccess || []).map((entry) => String(entry.userId));

      expect(taskFromDb).toBeTruthy();
      expect(taskFromDb.title).toBe(title);
      expect(memberAccessIds).toContain(String(assignee._id));
      expect(folderFromDb.memberAccess[0].addedBy.toString()).toBe(String(creator._id));
    });

    // IT_TASK_FOLDER_ACCESS_02
    test('dù lúc gọi hàm không truyền folderId, kết quả cuối cùng task vẫn có folderId, và giá trị đó chính là folder mặc định của group.', async () => {
      const creator = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_default_folder_pm',
        namePrefix: 'Task Default Folder PM',
        role: GROUP_ROLE_KEYS.PM
      });
      const assignee = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_default_folder_dev',
        namePrefix: 'Task Default Folder Dev',
        role: GROUP_ROLE_KEYS.DEVELOPER
      });
      const group = await createGroup({
        testRunId: TEST_RUN_ID,
        creator,
        memberIds: [assignee._id],
        namePrefix: 'task_default_folder_group'
      });
      const defaultFolder = await createFolder({
        testRunId: TEST_RUN_ID,
        group,
        creator,
        namePrefix: 'task_default_folder',
        isDefault: true
      });
      const title = buildTaggedValue('task_default_folder_fallback', TEST_RUN_ID);

      // Gọi hàm ko truyền folderId, sử dụng default folder
      const created = await taskService.createTask({
        title,
        description: 'default folder fallback',
        createdBy: creator._id,
        groupId: group._id,
        assignedTo: [{ userId: assignee._id }]
      });

      const taskFromDb = await Task.findById(created._id).lean();

      expect(taskFromDb).toBeTruthy();
      expect(taskFromDb.title).toBe(title);
      expect(String(taskFromDb.folderId)).toBe(String(defaultFolder._id));
    });
  });

  describe('getAllTasks folder-scoped behavior', () => {
    // IT_TASK_HELPER_MAP_01
    test('Người có quyền ở folder mặc định, khi xem task của group, sẽ thấy cả task ở folder mặc định lẫn task không có folder.', async () => {
      const creator = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_map_default_creator',
        namePrefix: 'Task Map Default Creator',
        role: GROUP_ROLE_KEYS.PM
      });
      const requester = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_map_default_requester',
        namePrefix: 'Task Map Default Requester',
        role: GROUP_ROLE_KEYS.DEVELOPER
      });
      const group = await createGroup({
        testRunId: TEST_RUN_ID,
        creator,
        // requester có quyền truy cập group
        memberIds: [requester._id],
        namePrefix: 'task_map_default_group'
      });
      const defaultFolder = await createFolder({
        testRunId: TEST_RUN_ID,
        group,
        creator,
        // requester có quyền truy cập folder mặc định
        namePrefix: 'task_map_default_folder',
        isDefault: true,
        memberAccessUserIds: [requester._id]
      });
      const otherFolder = await createFolder({
        testRunId: TEST_RUN_ID,
        group,
        creator,
        namePrefix: 'task_map_default_other'
      });
      // task ở folder mặc định
      const defaultTask = await createTaskDoc({
        testRunId: TEST_RUN_ID,
        creator,
        group,
        folder: defaultFolder,
        titlePrefix: 'task_map_default_visible'
      });
      // task ở folder null
      const nullFolderTask = await createTaskDoc({
        testRunId: TEST_RUN_ID,
        creator,
        group,
        folder: null,
        titlePrefix: 'task_map_null_visible'
      });
      await createTaskDoc({
        testRunId: TEST_RUN_ID,
        creator,
        group,
        folder: otherFolder,
        titlePrefix: 'task_map_hidden_other'
      });

      const result = await taskService.getAllTasks(
        { groupId: group._id },
        { sortBy: 'createdAt', order: 'asc', page: 1, limit: 50 },
        requester._id
      );

      const taskIds = result.tasks.map(task => String(task._id));

      expect(result.tasks.length).toBe(2);
      expect(taskIds).toContain(String(defaultTask._id));
      expect(taskIds).toContain(String(nullFolderTask._id));
      expect(result.pagination.total).toBe(2);
    });

    // IT_TASK_HELPER_MAP_02
    test('Khi người dùng yêu cầu xem task của một folder riêng, thì chỉ những task thuộc đúng folder đó mới được trả về.', async () => {
      const creator = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_map_specific_creator',
        namePrefix: 'Task Map Specific Creator',
        role: GROUP_ROLE_KEYS.PM
      });
      const requester = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_map_specific_requester',
        namePrefix: 'Task Map Specific Requester',
        role: GROUP_ROLE_KEYS.DEVELOPER
      });
      const group = await createGroup({
        testRunId: TEST_RUN_ID,
        creator,
        memberIds: [requester._id],
        namePrefix: 'task_map_specific_group'
      });
      const targetFolder = await createFolder({
        testRunId: TEST_RUN_ID,
        group,
        creator,
        namePrefix: 'task_map_specific_target',
        // requester có quyền truy cập folder target
        memberAccessUserIds: [requester._id]
      });
      const otherFolder = await createFolder({
        testRunId: TEST_RUN_ID,
        group,
        creator,
        namePrefix: 'task_map_specific_other',
        // requester khó quyền truy cập folder other
        memberAccessUserIds: [requester._id]
      });
      const targetTask = await createTaskDoc({
        testRunId: TEST_RUN_ID,
        creator,
        group,
        folder: targetFolder,
        titlePrefix: 'task_map_specific_visible'
      });
      await createTaskDoc({
        testRunId: TEST_RUN_ID,
        creator,
        group,
        folder: otherFolder,
        titlePrefix: 'task_map_specific_hidden'
      });

      // Lọc task theo targetfolder
      const result = await taskService.getAllTasks(
        { groupId: group._id, folderId: targetFolder._id },
        { sortBy: 'createdAt', order: 'asc', page: 1, limit: 50 },
        requester._id
      );

      expect(result.tasks).toHaveLength(1);
      expect(String(result.tasks[0]._id)).toBe(String(targetTask._id));
      expect(String(result.tasks[0].folderId)).toBe(String(targetFolder._id));
      // số task phù hợp với bộ lọc
      expect(result.pagination.total).toBe(1);
    });

    // IT_TASK_HELPER_MAP_03
    test('Nếu người dùng chỉ có quyền trong một folder thường, thì khi mở danh sách task của cả group, họ chỉ nhìn thấy task trong chính folder đó thôi.', async () => {
      const creator = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_map_assigned_creator',
        namePrefix: 'Task Map Assigned Creator',
        role: GROUP_ROLE_KEYS.PM
      });
      const requester = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_map_assigned_requester',
        namePrefix: 'Task Map Assigned Requester',
        role: GROUP_ROLE_KEYS.BA
      });
      const group = await createGroup({
        testRunId: TEST_RUN_ID,
        creator,
        // requester có quyền truy cập group
        memberIds: [requester._id],
        namePrefix: 'task_map_assigned_group'
      });
      // folder mà requester có quyền truy cập (1 task)
      const assignedFolder = await createFolder({
        testRunId: TEST_RUN_ID,
        group,
        creator,
        namePrefix: 'task_map_assigned_folder',
        memberAccessUserIds: [requester._id]
      });
      // folder mà requester ko có quyền truy cập (1 task)
      const unassignedFolder = await createFolder({
        testRunId: TEST_RUN_ID,
        group,
        creator,
        namePrefix: 'task_map_unassigned_folder'
      });
      const visibleTask = await createTaskDoc({
        testRunId: TEST_RUN_ID,
        creator,
        group,
        folder: assignedFolder,
        titlePrefix: 'task_map_assigned_visible'
      });
      await createTaskDoc({
        testRunId: TEST_RUN_ID,
        creator,
        group,
        folder: unassignedFolder,
        titlePrefix: 'task_map_assigned_hidden'
      });

      const result = await taskService.getAllTasks(
        { groupId: group._id },
        { sortBy: 'createdAt', order: 'asc', page: 1, limit: 50 },
        requester._id
      );

      expect(result.tasks).toHaveLength(1);
      expect(String(result.tasks[0]._id)).toBe(String(visibleTask._id));
      expect(String(result.tasks[0].folderId)).toBe(String(assignedFolder._id));
    });

    // IT_TASK_HELPER_MAP_04
    test('Nếu người dùng thuộc kiểu phải được gán folder mới xem được task, nhưng hiện tại chưa được gán folder nào, thì khi xem task của group sẽ không thấy gì cả.', async () => {
      const creator = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_map_none_creator',
        namePrefix: 'Task Map None Creator',
        role: GROUP_ROLE_KEYS.PM
      });
      const requester = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'task_map_none_requester',
        namePrefix: 'Task Map None Requester',
        role: GROUP_ROLE_KEYS.DEVELOPER
      });
      const group = await createGroup({
        testRunId: TEST_RUN_ID,
        creator,
        memberIds: [requester._id],
        namePrefix: 'task_map_none_group'
      });
      // requester ko có quyền truy cập folder
      const folder = await createFolder({
        testRunId: TEST_RUN_ID,
        group,
        creator,
        namePrefix: 'task_map_none_folder'
      });
      await createTaskDoc({
        testRunId: TEST_RUN_ID,
        creator,
        group,
        folder,
        titlePrefix: 'task_map_none_hidden'
      });

      const result = await taskService.getAllTasks(
        { groupId: group._id },
        { sortBy: 'createdAt', order: 'asc', page: 1, limit: 50 },
        requester._id
      );

      expect(result.tasks).toHaveLength(0);
      expect(result.pagination.total).toBe(0);
    });
  });
});
