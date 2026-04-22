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
    it('Empty targetUserIds → { validIds: [], restrictedIds: [], errorMessage: null }', async () => {
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
    it('null targetUserIds → empty result', async () => {
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
    it('PM non-lead self-assign → validIds', async () => {
      mockUsers([]);
      const result = await validateAssignmentPermissions(
        { role: R.PM, isLeader: false },
        ['assigner1'],
        'assigner1'
      );
      expect(result.validIds).toContain('assigner1');
    });

    // UT_ASSIGN_04
    it('DEVELOPER self-assign → validIds', async () => {
      mockUsers([]);
      const result = await validateAssignmentPermissions(
        { role: R.DEVELOPER, isLeader: false },
        ['dev1'],
        'dev1'
      );
      expect(result.validIds).toContain('dev1');
      expect(result.restrictedIds).toHaveLength(0);
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
    it('User không có trong DB (User.find trả về []) → restrictedIds', async () => {
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
  // PM non-lead rules — FR-ASSIGN
  // -------------------------------------------------------
  describe('PM non-lead', () => {
    const assignerCtx = { role: R.PM, isLeader: false };
    const assignerId = 'pm-non-lead';

    // UT_ASSIGN_07
    it('PM non-lead → ĐƯỢC gán cho Developer', async () => {
      mockUsers([makeUser('developer1', R.DEVELOPER, false)]);
      const result = await validateAssignmentPermissions(assignerCtx, ['developer1'], assignerId);
      expect(result.validIds).toContain('developer1');
    });

    // UT_ASSIGN_08
    it('PM non-lead → ĐƯỢC gán cho BA', async () => {
      mockUsers([makeUser('ba1', R.BA, false)]);
      const result = await validateAssignmentPermissions(assignerCtx, ['ba1'], assignerId);
      expect(result.validIds).toContain('ba1');
    });

    // UT_ASSIGN_09
    it('PM non-lead → ĐƯỢC gán cho QA', async () => {
      mockUsers([makeUser('qa1', R.QA, false)]);
      const result = await validateAssignmentPermissions(assignerCtx, ['qa1'], assignerId);
      expect(result.validIds).toContain('qa1');
    });

    // UT_ASSIGN_10
    it('PM non-lead → KHÔNG gán cho PM khác (non-lead)', async () => {
      mockUsers([makeUser('pm2', R.PM, false)]);
      const result = await validateAssignmentPermissions(assignerCtx, ['pm2'], assignerId);
      expect(result.restrictedIds).toContain('pm2');
    });

    // UT_ASSIGN_11
    it('PM non-lead → KHÔNG gán cho PO non-lead', async () => {
      mockUsers([makeUser('po1', R.PO, false)]);
      const result = await validateAssignmentPermissions(assignerCtx, ['po1'], assignerId);
      expect(result.restrictedIds).toContain('po1');
    });

    // UT_ASSIGN_12
    it('PM non-lead → KHÔNG gán cho PM lead', async () => {
      mockUsers([makeUser('pm-lead', R.PM, true)]);
      const result = await validateAssignmentPermissions(assignerCtx, ['pm-lead'], assignerId);
      expect(result.restrictedIds).toContain('pm-lead');
    });

    // UT_ASSIGN_13
    it('PM non-lead → KHÔNG gán cho PO lead', async () => {
      mockUsers([makeUser('po-lead', R.PO, true)]);
      const result = await validateAssignmentPermissions(assignerCtx, ['po-lead'], assignerId);
      expect(result.restrictedIds).toContain('po-lead');
    });

    // UT_ASSIGN_14
    it('PM non-lead → errorMessage được set khi all restricted', async () => {
      mockUsers([makeUser('pm2', R.PM, false)]);
      const result = await validateAssignmentPermissions(assignerCtx, ['pm2'], assignerId);
      expect(result.errorMessage).toBeTruthy();
      expect(result.errorMessage).toContain('PM');
    });

    // UT_ASSIGN_15
    it('PM non-lead → ĐƯỢC gán cho Developer leader (non-PM/PO leader)', async () => {
      mockUsers([makeUser('dev-lead', R.DEVELOPER, true)]);
      const result = await validateAssignmentPermissions(assignerCtx, ['dev-lead'], assignerId);
      expect(result.validIds).toContain('dev-lead');
    });
  });

  // -------------------------------------------------------
  // PO non-lead rules
  // -------------------------------------------------------
  describe('PO non-lead', () => {
    const assignerCtx = { role: R.PO, isLeader: false };
    const assignerId = 'po-non-lead';

    // UT_ASSIGN_16
    it('PO non-lead → ĐƯỢC gán cho Developer', async () => {
      mockUsers([makeUser('dev1', R.DEVELOPER, false)]);
      const result = await validateAssignmentPermissions(assignerCtx, ['dev1'], assignerId);
      expect(result.validIds).toContain('dev1');
    });

    // UT_ASSIGN_17
    it('PO non-lead → KHÔNG gán cho PM lead', async () => {
      mockUsers([makeUser('pm-lead', R.PM, true)]);
      const result = await validateAssignmentPermissions(assignerCtx, ['pm-lead'], assignerId);
      expect(result.restrictedIds).toContain('pm-lead');
    });

    // UT_ASSIGN_18
    it('PO non-lead → KHÔNG gán cho PO khác', async () => {
      mockUsers([makeUser('po2', R.PO, false)]);
      const result = await validateAssignmentPermissions(assignerCtx, ['po2'], assignerId);
      expect(result.restrictedIds).toContain('po2');
    });
  });

  // -------------------------------------------------------
  // PM lead rules
  // -------------------------------------------------------
  describe('PM lead', () => {
    const assignerCtx = { role: R.PM, isLeader: true };
    const assignerId = 'pm-lead';

    // UT_ASSIGN_19
    it('PM lead → ĐƯỢC gán cho Developer', async () => {
      mockUsers([makeUser('dev1', R.DEVELOPER, false)]);
      const result = await validateAssignmentPermissions(assignerCtx, ['dev1'], assignerId);
      expect(result.validIds).toContain('dev1');
    });

    // UT_ASSIGN_20
    it('PM lead → ĐƯỢC gán cho PM non-lead', async () => {
      mockUsers([makeUser('pm2', R.PM, false)]);
      const result = await validateAssignmentPermissions(assignerCtx, ['pm2'], assignerId);
      expect(result.validIds).toContain('pm2');
    });

    // UT_ASSIGN_21
    it('PM lead → ĐƯỢC gán cho PO lead', async () => {
      mockUsers([makeUser('po-lead', R.PO, true)]);
      const result = await validateAssignmentPermissions(assignerCtx, ['po-lead'], assignerId);
      expect(result.validIds).toContain('po-lead');
    });

    // UT_ASSIGN_22
    it('PM lead → ĐƯỢC gán cho Developer lead', async () => {
      mockUsers([makeUser('dev-lead', R.DEVELOPER, true)]);
      const result = await validateAssignmentPermissions(assignerCtx, ['dev-lead'], assignerId);
      expect(result.validIds).toContain('dev-lead');
    });

    // UT_ASSIGN_23
    it('PM lead → ĐƯỢC gán cho tất cả mọi người', async () => {
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

    // UT_ASSIGN_24
    it('PO lead → ĐƯỢC gán cho PM lead', async () => {
      mockUsers([makeUser('pm-lead', R.PM, true)]);
      const result = await validateAssignmentPermissions(assignerCtx, ['pm-lead'], assignerId);
      expect(result.validIds).toContain('pm-lead');
    });

    // UT_ASSIGN_25
    it('PO lead → không có errorMessage khi tất cả valid', async () => {
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

    // UT_ASSIGN_28
    it('BA leader → KHÔNG gán cho Developer leader', async () => {
      mockUsers([makeUser('dev-lead', R.DEVELOPER, true)]);
      const result = await validateAssignmentPermissions(assignerCtx, ['dev-lead'], assignerId);
      expect(result.restrictedIds).toContain('dev-lead');
    });

    // UT_ASSIGN_29
    it('BA leader → KHÔNG gán cho BA leader khác', async () => {
      mockUsers([makeUser('ba-lead2', R.BA, true)]);
      const result = await validateAssignmentPermissions(assignerCtx, ['ba-lead2'], assignerId);
      expect(result.restrictedIds).toContain('ba-lead2');
    });

    // UT_ASSIGN_30
    it('BA leader → errorMessage đề cập "Lead"', async () => {
      mockUsers([makeUser('dev-lead', R.DEVELOPER, true)]);
      const result = await validateAssignmentPermissions(assignerCtx, ['dev-lead'], assignerId);
      expect(result.errorMessage).toContain('Lead');
    });
  });

  // -------------------------------------------------------
  // Regular role (không phải PM/PO/Leader)
  // -------------------------------------------------------
  describe('Regular role (Developer, BA, etc. không phải leader)', () => {
    // UT_ASSIGN_31
    it('Developer non-lead → KHÔNG gán cho người khác (restrictedIds)', async () => {
      mockUsers([makeUser('dev2', R.DEVELOPER, false)]);
      const result = await validateAssignmentPermissions(
        { role: R.DEVELOPER, isLeader: false },
        ['dev2'],
        'dev1'
      );
      expect(result.restrictedIds).toContain('dev2');
    });

    // UT_ASSIGN_32
    it('Regular role → errorMessage generic', async () => {
      mockUsers([makeUser('dev2', R.DEVELOPER, false)]);
      const result = await validateAssignmentPermissions(
        { role: R.DEVELOPER, isLeader: false },
        ['dev2'],
        'dev1'
      );
      expect(result.errorMessage).toBeTruthy();
    });
  });

  // -------------------------------------------------------
  // Mixed results
  // -------------------------------------------------------
  describe('Mixed valid + restricted', () => {
    // UT_ASSIGN_33
    it('PM non-lead: một số valid, một số restricted → errorMessage = null', async () => {
      mockUsers([
        makeUser('dev1', R.DEVELOPER, false),
        makeUser('pm2', R.PM, false)
      ]);
      const result = await validateAssignmentPermissions(
        { role: R.PM, isLeader: false },
        ['dev1', 'pm2'],
        'assigner1'
      );
      expect(result.validIds).toContain('dev1');
      expect(result.restrictedIds).toContain('pm2');
      expect(result.errorMessage).toBeNull();
    });

    // UT_ASSIGN_34
    it('Self + restricted target → self vào validIds, errorMessage = null', async () => {
      mockUsers([makeUser('pm2', R.PM, false)]);
      const result = await validateAssignmentPermissions(
        { role: R.PM, isLeader: false },
        ['assigner1', 'pm2'],
        'assigner1'
      );
      expect(result.validIds).toContain('assigner1');
      expect(result.restrictedIds).toContain('pm2');
      expect(result.errorMessage).toBeNull();
    });
  });

  // -------------------------------------------------------
  // errorMessage behavior
  // -------------------------------------------------------
  describe('errorMessage chỉ set khi TẤT CẢ targets là restricted', () => {
    // UT_ASSIGN_35
    it('All restricted → errorMessage not null', async () => {
      mockUsers([makeUser('pm2', R.PM, false)]);
      const result = await validateAssignmentPermissions(
        { role: R.PM, isLeader: false },
        ['pm2'],
        'assigner1'
      );
      expect(result.errorMessage).not.toBeNull();
    });

    // UT_ASSIGN_36
    it('Some valid → errorMessage = null', async () => {
      mockUsers([
        makeUser('dev1', R.DEVELOPER, false),
        makeUser('pm2', R.PM, false)
      ]);
      const result = await validateAssignmentPermissions(
        { role: R.PM, isLeader: false },
        ['dev1', 'pm2'],
        'assigner1'
      );
      expect(result.errorMessage).toBeNull();
    });
  });
});
