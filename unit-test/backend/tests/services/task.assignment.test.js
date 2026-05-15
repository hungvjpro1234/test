/**
 * Unit Tests: validateAssignmentPermissions (task.service.js)
 * Source: backend/src/services/task.service.js
 *
 * FIXED: Dùng rewire để test hàm THẬT từ source, không còn copy-paste.
 * User.find được mock qua rewire.__set__ — test đúng business logic thực tế trong source code.
 *
 * Note kỹ thuật:
 * - rewire tải module qua Node native require (bypass Jest module registry)
 * - jest.mock() KHÔNG hoạt động cho rewire-loaded modules
 * - Cần dùng rewire.__set__('User', mockUser) để inject mock vào module scope
 *
 * Business rules từ SRS FR-ASSIGN:
 * - PM non-lead: chỉ gán cho non-PM/PO roles
 * - PO non-lead: giống PM non-lead
 * - PM lead / PO lead: gán cho tất cả
 * - Leader (không phải PM/PO): gán cho non-leader, KHÔNG gán cho leader khác
 * - Self-assignment: LUÔN cho phép
 */

const path = require('path');
const rewire = require('rewire');

// ============================================================
// Load task.service.js qua rewire để truy cập private function
// ============================================================

const taskService = rewire(
  path.resolve(__dirname, '../../../../backend/src/services/task.service.js')
);

// ============================================================
// Tạo controllable mock cho User.find
// rewire.__set__ inject trực tiếp vào module scope — thay thế Mongoose model thật
// ============================================================

const mockUserFind = jest.fn();
taskService.__set__('User', {
  find: mockUserFind,
  findById: jest.fn()
});

// Truy cập hàm private thật từ source
const validateAssignmentPermissions = taskService.__get__('validateAssignmentPermissions');

// ============================================================
// Role constants
// ============================================================
const R = {
  PM: 'pm',
  PO: 'product_owner',
  DEVELOPER: 'developer',
  BA: 'ba',
  QA: 'qa',
  SALE: 'sale',
  DEV_MANAGER: 'developer_manager'
};

// ============================================================
// Helpers
// ============================================================

/**
 * Mock User.find().select().lean() để trả về danh sách users kiểm soát được.
 * validateAssignmentPermissions gọi: User.find({...}).select('_id groupRole isLeader').lean()
 */
const mockUsers = (users) => {
  mockUserFind.mockReturnValueOnce({
    select: () => ({
      lean: () => Promise.resolve(users)
    })
  });
};

const makeUser = (id, role, isLeader = false) => ({
  _id: id,
  groupRole: role,
  isLeader,
  isActive: true
});

beforeEach(() => {
  jest.clearAllMocks();
});

// ============================================================
// Test cases
// ============================================================

describe('validateAssignmentPermissions', () => {

  // -------------------------------------------------------
  // Edge cases
  // -------------------------------------------------------
  describe('Edge cases', () => {
    // UT_ASSIGN_01
    it('Khi truyền danh sách user cần assign là [], hàm phải trả về kết quả rỗng, không lỗi.', async () => {
      const result = await validateAssignmentPermissions(
        { role: R.PM, isLeader: false },
        [],
        'assigner1'
      );
      expect(result.validIds).toEqual([]);
      expect(result.restrictedIds).toEqual([]);
      expect(result.errorMessage).toBeNull();
    });

    // UT_ASSIGN_02
    it('Khi danh sách target bị null, hàm vẫn xử lý an toàn, không crash', async () => {
      const result = await validateAssignmentPermissions(
        { role: R.PM },
        null,
        'assigner1'
      );
      expect(result.validIds).toEqual([]);
      expect(result.restrictedIds).toEqual([]);
    });
  });

  // -------------------------------------------------------
  // Self-assignment — luôn cho phép
  // -------------------------------------------------------
  describe('Self-assignment (luôn được phép bất kể role)', () => {
    // UT_ASSIGN_03
    it('PM không phải lead vẫn được gán task cho chính mình.', async () => {
      mockUsers([]);
      const result = await validateAssignmentPermissions(
        { role: R.PM, isLeader: false },
        // targetUserIds
        ['assigner1'],
        // assignerId
        'assigner1'
      );
      expect(result.validIds).toContain('assigner1');
    });

    // UT_ASSIGN_05
    it('Bất kỳ role nào self-assign → luôn valid', async () => {
      const roles = [R.SALE, R.QA, R.DEV_MANAGER, R.BA, R.DEVELOPER];
      for (const role of roles) {
        mockUsers([]);
        const result = await validateAssignmentPermissions(
          { role, isLeader: false },
          ['self'],
          'self'
        );
        expect(result.validIds).toContain('self');
      }
    });
  });

  // -------------------------------------------------------
  // User không tồn tại / không active
  // -------------------------------------------------------
  describe('Target user không tồn tại hoặc inactive', () => {
    // UT_ASSIGN_06
    it('Khi target user không có trong DB, hoặc bị lọc do isActive: true, thì bị đưa vào restrictedIds.', async () => {
      mockUsers([]);
      const result = await validateAssignmentPermissions(
        { role: R.PM, isLeader: false },
        ['nonexistent-user'],
        'assigner1'
      );
      expect(result.restrictedIds).toContain('nonexistent-user');
    });
  });

  // -------------------------------------------------------
  // PM lead rules
  // -------------------------------------------------------
  describe('PM lead', () => {
    const assignerCtx = { role: R.PM, isLeader: true };
    const assignerId = 'pm-lead';

    // UT_ASSIGN_23
    it('PM có isLeader: true được assign cho mọi loại user: developer, PM non-lead, PO lead, BA lead.', async () => {
      mockUsers([
        makeUser('dev1', R.DEVELOPER, false),
        makeUser('pm2', R.PM, false),
        makeUser('po-lead', R.PO, true),
        makeUser('ba1', R.BA, true)
      ]);
      const result = await validateAssignmentPermissions(
        assignerCtx,
        ['dev1', 'pm2', 'po-lead', 'ba1'],
        assignerId
      );
      expect(result.restrictedIds).toHaveLength(0);
      expect(result.validIds).toHaveLength(4);
    });
  });

  // -------------------------------------------------------
  // PO lead rules
  // -------------------------------------------------------
  describe('PO lead', () => {
    const assignerCtx = { role: R.PO, isLeader: true };
    const assignerId = 'po-lead';

    // UT_ASSIGN_25
    it('PO lead assign cho developer non-lead là hợp lệ, và khi tất cả hợp lệ thì errorMessage = null.', async () => {
      mockUsers([makeUser('dev1', R.DEVELOPER, false)]);
      const result = await validateAssignmentPermissions(assignerCtx, ['dev1'], assignerId);
      expect(result.errorMessage).toBeNull();
    });
  });

  // -------------------------------------------------------
  // Leader (không phải PM/PO)
  // -------------------------------------------------------
  describe('Leader (non-PM/PO)', () => {
    const assignerCtx = { role: R.BA, isLeader: true };
    const assignerId = 'ba-leader';

    // UT_ASSIGN_26
    it('BA leader → ĐƯỢC gán cho Developer non-lead', async () => {
      mockUsers([makeUser('dev1', R.DEVELOPER, false)]);
      const result = await validateAssignmentPermissions(assignerCtx, ['dev1'], assignerId);
      expect(result.validIds).toContain('dev1');
    });

    // UT_ASSIGN_27
    it('BA leader → ĐƯỢC gán cho QA non-lead', async () => {
      mockUsers([makeUser('qa1', R.QA, false)]);
      const result = await validateAssignmentPermissions(assignerCtx, ['qa1'], assignerId);
      expect(result.validIds).toContain('qa1');
    });

    // UT_ASSIGN_29
    it('BA leader → KHÔNG gán cho BA leader khác', async () => {
      mockUsers([makeUser('ba-lead2', R.BA, true)]);
      const result = await validateAssignmentPermissions(assignerCtx, ['ba-lead2'], assignerId);
      expect(result.restrictedIds).toContain('ba-lead2');
    });
  });

  // -------------------------------------------------------
  // errorMessage behavior
  // -------------------------------------------------------
  describe('errorMessage chỉ set khi TẤT CẢ targets là restricted', () => {
    // UT_ASSIGN_36
    it('Chỉ 1 trong 2 người assign là không hợp lệ -> errorMessage = null', async () => {
      mockUsers([
        makeUser('dev1', R.DEVELOPER, false),
        makeUser('pm2', R.PM, false)
      ]);
      const result = await validateAssignmentPermissions(
        // assigner context ( assigner1 )
        { role: R.PM, isLeader: false },
        // assign cho cả dev (được phép) và pm (không được phép)
        ['dev1', 'pm2'],
        // PM, non-lead
        'assigner1'
      );
      expect(result.errorMessage).toBeNull();
    });
  });
});
