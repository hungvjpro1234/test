/**
 * Unit Tests: groupRoleUtils.ts (Frontend)
 * Source: frontend/app/utils/groupRoleUtils.ts
 *
 * Test các hàm permission helper ở frontend — dùng để show/hide UI elements.
 * Nếu sai thì user thấy UI không đúng dù backend chính xác.
 *
 * Mapping SRS:
 * - FR-FOLDER-5: Kiểm soát quyền truy cập (canManageFolders, canAssignFolderMembers)
 * - FR-GROUP-5: Quản lý thành viên (canAddMembers)
 * - FR-GROUP-6: Chuyển đổi workspace (isPersonalWorkspaceOwner)
 */

import path from 'path';

// Import trực tiếp từ frontend source
// ts-jest sẽ compile TypeScript on-the-fly
const {
  getMemberId,
  getMemberRole,
  isReadOnlyRole,
  requiresFolderAssignment,
  canManageRoles,
  canAddMembers,
  canManageFolders,
  canAssignFolderMembers,
  getRoleSummary,
  isPersonalWorkspaceOwner
} = require(path.resolve(__dirname, '../../../../frontend/app/utils/groupRoleUtils'));

// Role constants — mirror từ frontend/app/constants/groupRoles.ts
const ROLES = {
  PRODUCT_OWNER: 'product_owner',
  SALE: 'sale',
  QA: 'qa',
  DEV_MANAGER: 'developer_manager',
  PM: 'pm',
  BA: 'ba',
  BOT_BUILDER: 'bot_builder',
  QC: 'qc',
  DEVOPS: 'devops',
  DEVELOPER: 'developer'
} as const;

// ============================================================
// getMemberId
// ============================================================
describe('getMemberId', () => {
  // UT_ROLE_01
  it('null member → null', () => {
    expect(getMemberId(null)).toBeNull();
  });

  // UT_ROLE_02
  it('userId là string → return string', () => {
    const member = { userId: 'user-123' };
    expect(getMemberId(member)).toBe('user-123');
  });

  // UT_ROLE_03
  it('userId là object với _id string → return _id', () => {
    const member = { userId: { _id: 'user-456', name: 'John' } };
    expect(getMemberId(member)).toBe('user-456');
  });

  // UT_ROLE_04
  it('userId là null → null', () => {
    const member = { userId: null };
    expect(getMemberId(member)).toBeNull();
  });

  // UT_ROLE_05
  it('userId là object không có _id → null', () => {
    const member = { userId: { name: 'John' } };
    expect(getMemberId(member)).toBeNull();
  });
});

// ============================================================
// getMemberRole
// ============================================================
describe('getMemberRole', () => {
  const makeGroup = (members: any[]) => ({ members });
  const makeMember = (userId: string, role?: string) => ({ userId, role });

  describe('Invalid inputs', () => {
    // UT_ROLE_06
    it('null group → null', () => {
      expect(getMemberRole(null, 'user1')).toBeNull();
    });

    // UT_ROLE_07
    it('null userId → null', () => {
      const group = makeGroup([makeMember('user1', 'pm')]);
      expect(getMemberRole(group, null)).toBeNull();
    });

    // UT_ROLE_08
    it('undefined group → null', () => {
      expect(getMemberRole(undefined, 'user1')).toBeNull();
    });
  });

  describe('Member found', () => {
    // UT_ROLE_09
    it('Tìm thấy member → trả về đúng role', () => {
      const group = makeGroup([
        makeMember('user1', ROLES.PM),
        makeMember('user2', ROLES.DEVELOPER)
      ]);
      expect(getMemberRole(group, 'user1')).toBe(ROLES.PM);
    });

    // UT_ROLE_10
    it('Tìm thấy member với role undefined → null (không phải undefined)', () => {
      const group = makeGroup([makeMember('user1', undefined)]);
      // member.role ?? null → null nếu undefined
      expect(getMemberRole(group, 'user1')).toBeNull();
    });
  });

  describe('Member không tìm thấy', () => {
    // UT_ROLE_11
    it('userId không có trong members → null', () => {
      const group = makeGroup([makeMember('user1', ROLES.PM)]);
      expect(getMemberRole(group, 'user-nonexistent')).toBeNull();
    });

    // UT_ROLE_12
    it('Empty members array → null', () => {
      const group = makeGroup([]);
      expect(getMemberRole(group, 'user1')).toBeNull();
    });
  });
});

// ============================================================
// isReadOnlyRole
// ============================================================
describe('isReadOnlyRole', () => {
  describe('READ_ONLY roles', () => {
    // UT_ROLE_13
    it('SALE → true', () => {
      expect(isReadOnlyRole(ROLES.SALE)).toBe(true);
    });

    // UT_ROLE_14
    it('QA → true', () => {
      expect(isReadOnlyRole(ROLES.QA)).toBe(true);
    });

    // UT_ROLE_15
    it('DEV_MANAGER → true', () => {
      expect(isReadOnlyRole(ROLES.DEV_MANAGER)).toBe(true);
    });
  });

  describe('Non-read-only roles', () => {
    // UT_ROLE_16
    it('PM → false', () => {
      expect(isReadOnlyRole(ROLES.PM)).toBe(false);
    });

    // UT_ROLE_17
    it('PRODUCT_OWNER → false', () => {
      expect(isReadOnlyRole(ROLES.PRODUCT_OWNER)).toBe(false);
    });

    // UT_ROLE_18
    it('DEVELOPER → false', () => {
      expect(isReadOnlyRole(ROLES.DEVELOPER)).toBe(false);
    });

    // UT_ROLE_19
    it('BA → false', () => {
      expect(isReadOnlyRole(ROLES.BA)).toBe(false);
    });
  });

  describe('Edge cases', () => {
    // UT_ROLE_20
    it('null → false', () => {
      expect(isReadOnlyRole(null)).toBe(false);
    });

    // UT_ROLE_21
    it('undefined → false', () => {
      expect(isReadOnlyRole(undefined)).toBe(false);
    });
  });
});

// ============================================================
// requiresFolderAssignment
// ============================================================
describe('requiresFolderAssignment', () => {
  describe('FOLDER_SCOPED roles → true', () => {
    // UT_ROLE_22
    it('BA → true', () => {
      expect(requiresFolderAssignment(ROLES.BA)).toBe(true);
    });

    // UT_ROLE_23
    it('BOT_BUILDER → true', () => {
      expect(requiresFolderAssignment(ROLES.BOT_BUILDER)).toBe(true);
    });

    // UT_ROLE_24
    it('DEVOPS → true', () => {
      expect(requiresFolderAssignment(ROLES.DEVOPS)).toBe(true);
    });

    // UT_ROLE_25
    it('DEVELOPER → true', () => {
      expect(requiresFolderAssignment(ROLES.DEVELOPER)).toBe(true);
    });
  });

  describe('Non-scoped roles → false', () => {
    // UT_ROLE_26
    it('PM → false', () => {
      expect(requiresFolderAssignment(ROLES.PM)).toBe(false);
    });

    // UT_ROLE_27
    it('PRODUCT_OWNER → false', () => {
      expect(requiresFolderAssignment(ROLES.PRODUCT_OWNER)).toBe(false);
    });

    // UT_ROLE_28
    it('SALE → false', () => {
      expect(requiresFolderAssignment(ROLES.SALE)).toBe(false);
    });
  });

  describe('Edge cases', () => {
    // UT_ROLE_29
    it('null → false', () => {
      expect(requiresFolderAssignment(null)).toBe(false);
    });

    // UT_ROLE_30
    it('undefined → false', () => {
      expect(requiresFolderAssignment(undefined)).toBe(false);
    });
  });
});

// ============================================================
// canManageRoles — luôn false (system admin only)
// ============================================================
describe('canManageRoles', () => {
  // UT_ROLE_31
  it('Luôn trả về false — roles chỉ được assign bởi system admin', () => {
    expect(canManageRoles()).toBe(false);
  });
});

// ============================================================
// canAddMembers — FR-GROUP-5.1
// ============================================================
describe('canAddMembers', () => {
  describe('Được thêm member', () => {
    // UT_ROLE_32
    it('PRODUCT_OWNER → true', () => {
      expect(canAddMembers(ROLES.PRODUCT_OWNER)).toBe(true);
    });

    // UT_ROLE_33
    it('PM → true', () => {
      expect(canAddMembers(ROLES.PM)).toBe(true);
    });

    // UT_ROLE_34
    it('isLeader = true → true', () => {
      expect(canAddMembers(ROLES.DEVELOPER, true)).toBe(true);
    });

    // UT_ROLE_35
    it('isPersonalOwner = true → true', () => {
      expect(canAddMembers(ROLES.SALE, false, true)).toBe(true);
    });
  });

  describe('Không được thêm member', () => {
    // UT_ROLE_36
    it('DEVELOPER, không phải leader → false', () => {
      expect(canAddMembers(ROLES.DEVELOPER, false, false)).toBe(false);
    });

    // UT_ROLE_37
    it('BA, không phải leader → false', () => {
      expect(canAddMembers(ROLES.BA, false, false)).toBe(false);
    });

    // UT_ROLE_38
    it('null role, không phải leader/owner → false', () => {
      expect(canAddMembers(null, false, false)).toBe(false);
    });

    // UT_ROLE_39
    it('SALE (read-only), không phải leader → false', () => {
      expect(canAddMembers(ROLES.SALE, false, false)).toBe(false);
    });
  });
});

// ============================================================
// canManageFolders — FR-FOLDER-1, FR-FOLDER-3, FR-FOLDER-4
// ============================================================
describe('canManageFolders', () => {
  describe('Được quản lý folders', () => {
    // UT_ROLE_40
    it('PRODUCT_OWNER → true', () => {
      expect(canManageFolders(ROLES.PRODUCT_OWNER)).toBe(true);
    });

    // UT_ROLE_41
    it('PM → true', () => {
      expect(canManageFolders(ROLES.PM)).toBe(true);
    });

    // UT_ROLE_42
    it('isLeader = true → true', () => {
      expect(canManageFolders(ROLES.BA, true)).toBe(true);
    });

    // UT_ROLE_43
    it('isPersonalOwner = true → true', () => {
      expect(canManageFolders(null, false, true)).toBe(true);
    });
  });

  describe('Không được quản lý folders', () => {
    // UT_ROLE_44
    it('DEVELOPER non-leader → false', () => {
      expect(canManageFolders(ROLES.DEVELOPER, false, false)).toBe(false);
    });

    // UT_ROLE_45
    it('BA non-leader → false', () => {
      expect(canManageFolders(ROLES.BA, false, false)).toBe(false);
    });

    // UT_ROLE_46
    it('null role → false', () => {
      expect(canManageFolders(null, false, false)).toBe(false);
    });
  });
});

// ============================================================
// canAssignFolderMembers — FR-FOLDER-5.1
// ============================================================
describe('canAssignFolderMembers', () => {
  describe('Được assign folder members', () => {
    // UT_ROLE_47
    it('PRODUCT_OWNER → true', () => {
      expect(canAssignFolderMembers(ROLES.PRODUCT_OWNER)).toBe(true);
    });

    // UT_ROLE_48
    it('PM → true', () => {
      expect(canAssignFolderMembers(ROLES.PM)).toBe(true);
    });

    // UT_ROLE_49
    it('isLeader = true → true', () => {
      expect(canAssignFolderMembers(ROLES.DEVOPS, true)).toBe(true);
    });

    // UT_ROLE_50
    it('isPersonalOwner = true → true', () => {
      expect(canAssignFolderMembers(null, false, true)).toBe(true);
    });
  });

  describe('Không được assign folder members', () => {
    // UT_ROLE_51
    it('DEVELOPER non-leader → false', () => {
      expect(canAssignFolderMembers(ROLES.DEVELOPER, false, false)).toBe(false);
    });

    // UT_ROLE_52
    it('QA non-leader → false', () => {
      expect(canAssignFolderMembers(ROLES.QA, false, false)).toBe(false);
    });
  });
});

// ============================================================
// isPersonalWorkspaceOwner — FR-GROUP-6 (workspace owner logic)
// ============================================================
describe('isPersonalWorkspaceOwner', () => {
  describe('Invalid inputs', () => {
    // UT_ROLE_53
    it('null group → false', () => {
      expect(isPersonalWorkspaceOwner(null, 'user1')).toBe(false);
    });

    // UT_ROLE_54
    it('null userId → false', () => {
      const group = { isPersonalWorkspace: true, createdBy: 'user1' };
      expect(isPersonalWorkspaceOwner(group, null)).toBe(false);
    });

    // UT_ROLE_55
    it('undefined group → false', () => {
      expect(isPersonalWorkspaceOwner(undefined, 'user1')).toBe(false);
    });
  });

  describe('Non-personal workspace', () => {
    // UT_ROLE_56
    it('isPersonalWorkspace = false → false', () => {
      const group = { isPersonalWorkspace: false, createdBy: 'user1' };
      expect(isPersonalWorkspaceOwner(group, 'user1')).toBe(false);
    });

    // UT_ROLE_57
    it('Không có isPersonalWorkspace property → false', () => {
      const group = { createdBy: 'user1' };
      expect(isPersonalWorkspaceOwner(group, 'user1')).toBe(false);
    });
  });

  describe('Personal workspace — đúng owner', () => {
    // UT_ROLE_58
    it('isPersonalWorkspace + createdBy là string matching userId → true', () => {
      const group = { isPersonalWorkspace: true, createdBy: 'user-owner' };
      expect(isPersonalWorkspaceOwner(group, 'user-owner')).toBe(true);
    });

    // UT_ROLE_59
    it('isPersonalWorkspace + createdBy là object với _id → true', () => {
      const group = {
        isPersonalWorkspace: true,
        createdBy: { _id: 'user-owner', name: 'Owner' }
      };
      expect(isPersonalWorkspaceOwner(group, 'user-owner')).toBe(true);
    });
  });

  describe('Personal workspace — sai owner', () => {
    // UT_ROLE_60
    it('isPersonalWorkspace nhưng sai userId → false', () => {
      const group = { isPersonalWorkspace: true, createdBy: 'user-owner' };
      expect(isPersonalWorkspaceOwner(group, 'other-user')).toBe(false);
    });

    // UT_ROLE_61
    it('createdBy là object nhưng sai userId → false', () => {
      const group = {
        isPersonalWorkspace: true,
        createdBy: { _id: 'user-owner' }
      };
      expect(isPersonalWorkspaceOwner(group, 'other-user')).toBe(false);
    });
  });
});
