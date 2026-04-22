/**
 * Unit Tests: Task Service Pure Helpers
 * Source: backend/src/services/task.service.js
 *
 * FIXED: Dùng rewire để import trực tiếp private functions từ source thật.
 * Không còn copy-paste implementation — nếu source code thay đổi, tests sẽ FAIL đúng như mong đợi.
 *
 * Note kỹ thuật: rewire tải module qua Node native require (không qua Jest module registry).
 * Không cần jest.mock vì các hàm này là pure functions không gọi DB.
 * Dùng rewire.__set__ nếu cần override dependency trong module scope.
 */

const path = require('path');
const rewire = require('rewire');

// ============================================================
// Load task.service.js qua rewire — truy cập private functions từ source thật
// ============================================================

const taskService = rewire(
  path.resolve(__dirname, '../../../../backend/src/services/task.service.js')
);

// Truy cập trực tiếp các hàm private — test chạy trên CODE THẬT, không phải bản copy
const normalizeId = taskService.__get__('normalizeId');
const buildRecipientList = taskService.__get__('buildRecipientList');
const buildFolderClauses = taskService.__get__('buildFolderClauses');
const hasFolderAssignment = taskService.__get__('hasFolderAssignment');

// ============================================================
// normalizeId
// ============================================================
describe('normalizeId', () => {
  describe('Falsy input → null', () => {
    // UT_HELPER_01
    it('null → null', () => {
      expect(normalizeId(null)).toBe(null);
    });

    // UT_HELPER_02
    it('undefined → null', () => {
      expect(normalizeId(undefined)).toBe(null);
    });

    // UT_HELPER_03
    it('0 → null (falsy)', () => {
      expect(normalizeId(0)).toBe(null);
    });

    // UT_HELPER_04
    it('empty string → null (falsy)', () => {
      expect(normalizeId('')).toBe(null);
    });
  });

  describe('String input → passthrough', () => {
    // UT_HELPER_05
    it('"abc123" → "abc123"', () => {
      expect(normalizeId('abc123')).toBe('abc123');
    });

    // UT_HELPER_06
    it('Valid ObjectId string → unchanged', () => {
      const id = '507f1f77bcf86cd799439011';
      expect(normalizeId(id)).toBe(id);
    });
  });

  describe('Mongoose ObjectId-like (toHexString)', () => {
    // UT_HELPER_07
    it('Object với toHexString → hex string', () => {
      const mockObjectId = { toHexString: () => '507f1f77bcf86cd799439011' };
      expect(normalizeId(mockObjectId)).toBe('507f1f77bcf86cd799439011');
    });
  });

  describe('Object với _id property', () => {
    // UT_HELPER_08
    it('{ _id: "userId123" } → "userId123"', () => {
      expect(normalizeId({ _id: 'userId123' })).toBe('userId123');
    });

    // UT_HELPER_09
    it('{ _id: objectId } với _id là object → toString()', () => {
      const innerObj = { toString: () => 'inner-id' };
      expect(normalizeId({ _id: innerObj })).toBe('inner-id');
    });
  });

  describe('Object với toString rõ ràng', () => {
    // UT_HELPER_10
    it('Object có toString method → toString result', () => {
      const obj = { toString: () => 'string-result' };
      expect(normalizeId(obj)).toBe('string-result');
    });
  });

  describe('Plain object không có property hữu ích', () => {
    /**
     * Theo SRS/PLAN spec: { } không có _id, không có toHexString → kết quả phải là null
     *
     * ⚠️ TEST NÀY CÓ THỂ FAIL: source code dùng `if (value.toString) return value.toString()`
     * Mọi object đều kế thừa toString từ Object.prototype nên {} trả về "[object Object]"
     * thay vì null. Đây là BUG trong source code nếu test fail.
     *
     * SRS ref: normalizeId phải trả về null cho object không có định danh hữu ích.
     */
    // UT_HELPER_11
    it('Empty object {} → null (theo SRS/PLAN spec)', () => {
      expect(normalizeId({})).toBe(null);
    });
  });
});

// ============================================================
// buildRecipientList
// ============================================================
describe('buildRecipientList', () => {
  describe('Null / empty task', () => {
    // UT_HELPER_12
    it('null task → []', () => {
      expect(buildRecipientList(null)).toEqual([]);
    });

    // UT_HELPER_13
    it('undefined task → []', () => {
      expect(buildRecipientList(undefined)).toEqual([]);
    });
  });

  describe('Task với chỉ createdBy', () => {
    // UT_HELPER_14
    it('Task có createdBy → [createdBy]', () => {
      const task = { createdBy: 'user1' };
      expect(buildRecipientList(task)).toEqual(['user1']);
    });

    // UT_HELPER_15
    it('Task createdBy là null → []', () => {
      const task = { createdBy: null };
      expect(buildRecipientList(task)).toEqual([]);
    });
  });

  describe('Task với assignedTo', () => {
    // UT_HELPER_16
    it('assignedTo với string userId → included', () => {
      const task = {
        createdBy: 'creator1',
        assignedTo: [{ userId: 'assignee1' }]
      };
      const result = buildRecipientList(task);
      expect(result).toContain('creator1');
      expect(result).toContain('assignee1');
    });

    // UT_HELPER_17
    it('assignedTo với populated userId object', () => {
      const task = {
        createdBy: 'creator1',
        assignedTo: [{ userId: { _id: 'assignee2', name: 'User 2' } }]
      };
      const result = buildRecipientList(task);
      expect(result).toContain('assignee2');
    });

    // UT_HELPER_18
    it('Nhiều assignees', () => {
      const task = {
        createdBy: 'creator1',
        assignedTo: [
          { userId: 'assignee1' },
          { userId: 'assignee2' },
          { userId: 'assignee3' }
        ]
      };
      const result = buildRecipientList(task);
      expect(result).toHaveLength(4);
    });

    // UT_HELPER_19
    it('Null entries trong assignedTo → bỏ qua', () => {
      const task = {
        createdBy: 'creator1',
        assignedTo: [null, { userId: 'assignee1' }, null]
      };
      const result = buildRecipientList(task);
      expect(result).toContain('assignee1');
      expect(result).not.toContain(null);
    });

    // UT_HELPER_20
    it('Empty assignedTo array', () => {
      const task = { createdBy: 'creator1', assignedTo: [] };
      expect(buildRecipientList(task)).toEqual(['creator1']);
    });
  });

  describe('Deduplication', () => {
    // UT_HELPER_21
    it('Creator cũng là assignee → chỉ có 1 entry', () => {
      const task = {
        createdBy: 'user1',
        assignedTo: [{ userId: 'user1' }]
      };
      const result = buildRecipientList(task);
      expect(result).toHaveLength(1);
      expect(result[0]).toBe('user1');
    });

    // UT_HELPER_22
    it('Assignee trùng lặp → dedup', () => {
      const task = {
        createdBy: 'creator1',
        assignedTo: [{ userId: 'assignee1' }, { userId: 'assignee1' }]
      };
      const result = buildRecipientList(task);
      expect(result).toHaveLength(2);
    });
  });

  describe('groupDoc với members', () => {
    // UT_HELPER_23
    it('Group members được thêm vào recipients', () => {
      const task = { createdBy: 'creator1' };
      const groupDoc = {
        members: [{ userId: 'member1' }, { userId: 'member2' }]
      };
      const result = buildRecipientList(task, groupDoc);
      expect(result).toContain('creator1');
      expect(result).toContain('member1');
      expect(result).toContain('member2');
    });

    // UT_HELPER_24
    it('Group member với populated userId object', () => {
      const task = { createdBy: 'creator1' };
      const groupDoc = {
        members: [{ userId: { _id: 'member3', name: 'Member 3' } }]
      };
      const result = buildRecipientList(task, groupDoc);
      expect(result).toContain('member3');
    });

    // UT_HELPER_25
    it('groupDoc = null → không ảnh hưởng', () => {
      const task = { createdBy: 'creator1' };
      const result = buildRecipientList(task, null);
      expect(result).toEqual(['creator1']);
    });

    // UT_HELPER_26
    it('Creator cũng là group member → dedup', () => {
      const task = { createdBy: 'creator1' };
      const groupDoc = {
        members: [{ userId: 'creator1' }, { userId: 'member2' }]
      };
      const result = buildRecipientList(task, groupDoc);
      expect(result.filter(id => id === 'creator1')).toHaveLength(1);
    });
  });
});

// ============================================================
// buildFolderClauses
// ============================================================
describe('buildFolderClauses', () => {
  describe('Null / undefined folder', () => {
    // UT_HELPER_27
    it('null → []', () => {
      expect(buildFolderClauses(null)).toEqual([]);
    });

    // UT_HELPER_28
    it('undefined → []', () => {
      expect(buildFolderClauses(undefined)).toEqual([]);
    });
  });

  describe('Default folder (isDefault: true)', () => {
    const defaultFolder = { _id: 'folder-id-default', isDefault: true };

    // UT_HELPER_29
    it('Trả về $or clause', () => {
      const result = buildFolderClauses(defaultFolder);
      expect(result).toHaveLength(1);
      expect(result[0].$or).toBeDefined();
    });

    // UT_HELPER_30
    it('$or bao gồm exact folderId match', () => {
      const result = buildFolderClauses(defaultFolder);
      expect(result[0].$or).toContainEqual({ folderId: 'folder-id-default' });
    });

    // UT_HELPER_31
    it('$or bao gồm folderId = null (tasks không có folder)', () => {
      const result = buildFolderClauses(defaultFolder);
      expect(result[0].$or).toContainEqual({ folderId: null });
    });

    // UT_HELPER_32
    it('$or bao gồm folderId $exists: false', () => {
      const result = buildFolderClauses(defaultFolder);
      expect(result[0].$or).toContainEqual({ folderId: { $exists: false } });
    });

    // UT_HELPER_33
    it('$or có đúng 3 conditions', () => {
      const result = buildFolderClauses(defaultFolder);
      expect(result[0].$or).toHaveLength(3);
    });
  });

  describe('Non-default folder', () => {
    const regularFolder = { _id: 'folder-id-regular', isDefault: false };

    // UT_HELPER_34
    it('Trả về exact folderId match', () => {
      const result = buildFolderClauses(regularFolder);
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({ folderId: 'folder-id-regular' });
    });

    // UT_HELPER_35
    it('Không có $or clause', () => {
      const result = buildFolderClauses(regularFolder);
      expect(result[0].$or).toBeUndefined();
    });
  });

  describe('Folder không có isDefault property', () => {
    // UT_HELPER_36
    it('isDefault: undefined → treat as non-default', () => {
      const folder = { _id: 'folder-no-default' };
      const result = buildFolderClauses(folder);
      expect(result).toEqual([{ folderId: 'folder-no-default' }]);
    });
  });
});

// ============================================================
// hasFolderAssignment
// ============================================================
describe('hasFolderAssignment', () => {
  describe('Invalid inputs', () => {
    // UT_HELPER_37
    it('null folderDoc → false', () => {
      expect(hasFolderAssignment(null, 'user1')).toBe(false);
    });

    // UT_HELPER_38
    it('Folder không có memberAccess array → false', () => {
      expect(hasFolderAssignment({ name: 'folder' }, 'user1')).toBe(false);
    });

    // UT_HELPER_39
    it('null requesterId → false', () => {
      const folder = { memberAccess: [{ userId: 'user1' }] };
      expect(hasFolderAssignment(folder, null)).toBe(false);
    });
  });

  describe('User được assign', () => {
    // UT_HELPER_40
    it('User có trong memberAccess → true', () => {
      const folder = {
        memberAccess: [{ userId: 'user1' }, { userId: 'user2' }]
      };
      expect(hasFolderAssignment(folder, 'user1')).toBe(true);
    });

    // UT_HELPER_41
    it('User với ObjectId-like object trong memberAccess → true', () => {
      const folder = {
        memberAccess: [{ userId: { toHexString: () => 'user-hex-id' } }]
      };
      expect(hasFolderAssignment(folder, 'user-hex-id')).toBe(true);
    });
  });

  describe('User không được assign', () => {
    // UT_HELPER_42
    it('User không có trong memberAccess → false', () => {
      const folder = { memberAccess: [{ userId: 'user1' }] };
      expect(hasFolderAssignment(folder, 'user2')).toBe(false);
    });

    // UT_HELPER_43
    it('Empty memberAccess → false', () => {
      const folder = { memberAccess: [] };
      expect(hasFolderAssignment(folder, 'user1')).toBe(false);
    });
  });
});
