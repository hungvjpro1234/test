/**
 * Unit Tests: groupPermissions.js
 * Source: backend/src/utils/groupPermissions.js
 *
 * Test các hàm permission phức tạp — đây là "tim" của hệ thống phân quyền.
 * Bug ở đây sẽ ảnh hưởng FR-FOLDER, FR-TASK, FR-ASSIGN trong SRS v3.0.
 */

const path = require('path');
const {
  canCreateTasks,
  canEditTask,
  canDeleteTask,
  canWriteInFolder,
  canViewFolder,
  canViewAllFolders,
  requiresFolderAssignment,
  canManageFolders,
  canAssignFolderMembers,
  isAdminRole,
  isReadOnlyRole,
  isPrivilegedForGroup,
  getRoleGroup,
  isRoleInGroup
} = require(path.resolve(__dirname, '../../../../backend/src/utils/groupPermissions'));

// Role constants (mirror từ constants.js để test rõ ràng)
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
  CLOUD_INFRA: 'cloud_infra',
  SECURITY: 'security',
  CHATBOT: 'chatbot',
  VOICEBOT: 'voicebot',
  DEVELOPER: 'developer'
};

// ============================================================
// canCreateTasks
// ============================================================
describe('canCreateTasks', () => {
  describe('null / undefined input', () => {
    // UT_PERM_01
    it('returns false when role is null', () => {
      expect(canCreateTasks({ role: null })).toBe(false);
    });

    // UT_PERM_02
    it('returns false when role is undefined', () => {
      expect(canCreateTasks({ role: undefined })).toBe(false);
    });

    // UT_PERM_03
    it('returns false when called with empty object', () => {
      expect(canCreateTasks({})).toBe(false);
    });
  });

  describe('READ_ONLY_ROLES — không được tạo task', () => {
    // UT_PERM_04
    it('SALE không được tạo task', () => {
      expect(canCreateTasks({ role: ROLES.SALE, isLeader: false })).toBe(false);
    });

    // UT_PERM_05
    it('QA không được tạo task nếu không có folder assignment', () => {
      expect(canCreateTasks({ role: ROLES.QA, isLeader: false, isAssignedToFolder: false })).toBe(false);
    });

    // UT_PERM_06
    it('DEV_MANAGER không được tạo task', () => {
      expect(canCreateTasks({ role: ROLES.DEV_MANAGER, isLeader: false })).toBe(false);
    });
  });

  describe('QA — tùy thuộc folder assignment', () => {
    // UT_PERM_07
    it('QA với folder assignment → được tạo task', () => {
      expect(canCreateTasks({ role: ROLES.QA, isLeader: false, isAssignedToFolder: true })).toBe(true);
    });

    // UT_PERM_05
    it('QA không có folder assignment → không được tạo task', () => {
      expect(canCreateTasks({ role: ROLES.QA, isLeader: false, isAssignedToFolder: false })).toBe(false);
    });
  });

  describe('Business roles — được tạo task', () => {
    // UT_PERM_08
    it('PM được tạo task', () => {
      expect(canCreateTasks({ role: ROLES.PM })).toBe(true);
    });

    // UT_PERM_09
    it('BA được tạo task', () => {
      expect(canCreateTasks({ role: ROLES.BA })).toBe(true);
    });

    // UT_PERM_10
    it('DEVELOPER được tạo task', () => {
      expect(canCreateTasks({ role: ROLES.DEVELOPER })).toBe(true);
    });

    // UT_PERM_11
    it('DEVOPS được tạo task', () => {
      expect(canCreateTasks({ role: ROLES.DEVOPS })).toBe(true);
    });

    // UT_PERM_12
    it('BOT_BUILDER được tạo task', () => {
      expect(canCreateTasks({ role: ROLES.BOT_BUILDER })).toBe(true);
    });

    // UT_PERM_13
    it('PRODUCT_OWNER được tạo task', () => {
      expect(canCreateTasks({ role: ROLES.PRODUCT_OWNER })).toBe(true);
    });
  });

  describe('isLeader = true — override tất cả', () => {
    // UT_PERM_14
    it('SALE + isLeader → được tạo task', () => {
      expect(canCreateTasks({ role: ROLES.SALE, isLeader: true })).toBe(true);
    });

    // UT_PERM_15
    it('QA + isLeader → được tạo task (không cần folder)', () => {
      expect(canCreateTasks({ role: ROLES.QA, isLeader: true, isAssignedToFolder: false })).toBe(true);
    });

    // UT_PERM_16
    it('DEV_MANAGER + isLeader → được tạo task', () => {
      expect(canCreateTasks({ role: ROLES.DEV_MANAGER, isLeader: true })).toBe(true);
    });

    /**
     * ⚠️ TEST NÀY CÓ THỂ FAIL — đây là MONG MUỐN, expose inconsistency trong source code.
     *
     * Theo SRS PLAN: "Leader override tất cả" → leader phải được tạo task dù role là gì.
     * Theo PLAN case: role: 'sale', isLeader: true → true (leader override)
     *
     * Actual source code: canCreateTasks check `if (!role) return false` TRƯỚC isLeader.
     * → null role + isLeader = true → false (sai theo SRS)
     *
     * So sánh: canEditTask({ role: null, isLeader: true }) → true (đúng theo SRS)
     * Đây là BUG INCONSISTENCY: canCreateTasks và canEditTask xử lý null role + leader khác nhau.
     * SRS ref: FR-TASK-1 "Leader override tất cả" nghĩa là isLeader: true → luôn được tạo task.
     */
    // UT_PERM_17
    it('null role + isLeader = true → true theo SRS (Leader override tất cả)', () => {
      expect(canCreateTasks({ role: null, isLeader: true })).toBe(true);
    });
  });
});

// ============================================================
// canEditTask
// ============================================================
describe('canEditTask', () => {
  describe('Admin roles — luôn được edit', () => {
    // UT_PERM_18
    it('PM được edit task', () => {
      expect(canEditTask({ role: ROLES.PM })).toBe(true);
    });

    // UT_PERM_19
    it('PRODUCT_OWNER được edit task', () => {
      expect(canEditTask({ role: ROLES.PRODUCT_OWNER })).toBe(true);
    });

    // UT_PERM_20
    it('isLeader + bất kỳ role → được edit', () => {
      expect(canEditTask({ role: ROLES.SALE, isLeader: true })).toBe(true);
    });

    // UT_PERM_21
    it('isLeader + null role → được edit', () => {
      expect(canEditTask({ role: null, isLeader: true })).toBe(true);
    });
  });

  describe('isCreator — được edit task của mình', () => {
    // UT_PERM_22
    it('Creator với role thấp → vẫn được edit', () => {
      expect(canEditTask({ role: ROLES.DEVELOPER, isCreator: true })).toBe(true);
    });

    // UT_PERM_23
    it('Creator + QA → được edit', () => {
      expect(canEditTask({ role: ROLES.QA, isCreator: true })).toBe(true);
    });
  });

  describe('isAssignee — được edit task được giao', () => {
    // UT_PERM_24
    it('Assignee với role thấp → được edit', () => {
      expect(canEditTask({ role: ROLES.DEVELOPER, isAssignee: true })).toBe(true);
    });

    // UT_PERM_25
    it('Assignee + SALE (readonly) → vẫn được edit vì là assignee', () => {
      expect(canEditTask({ role: ROLES.SALE, isAssignee: true })).toBe(true);
    });
  });

  describe('QA + folder assignment', () => {
    // UT_PERM_26
    it('QA + isAssignedToFolder = true → được edit', () => {
      expect(canEditTask({ role: ROLES.QA, isAssignedToFolder: true })).toBe(true);
    });

    // UT_PERM_27
    it('QA + isAssignedToFolder = false, không phải creator/assignee → không được edit', () => {
      expect(canEditTask({
        role: ROLES.QA,
        isCreator: false,
        isAssignee: false,
        isAssignedToFolder: false
      })).toBe(false);
    });
  });

  describe('Không có quyền edit', () => {
    // UT_PERM_28
    it('DEVELOPER bình thường không phải creator/assignee → không được edit', () => {
      expect(canEditTask({
        role: ROLES.DEVELOPER,
        isCreator: false,
        isAssignee: false
      })).toBe(false);
    });

    // UT_PERM_29
    it('BA không phải creator/assignee/admin → không được edit', () => {
      expect(canEditTask({
        role: ROLES.BA,
        isCreator: false,
        isAssignee: false
      })).toBe(false);
    });

    // UT_PERM_30
    it('null role, không có quyền nào → không được edit', () => {
      expect(canEditTask({ role: null })).toBe(false);
    });
  });
});

// ============================================================
// canDeleteTask
// ============================================================
describe('canDeleteTask', () => {
  describe('isCreator — luôn được xóa task của mình', () => {
    // UT_PERM_31
    it('Creator dù bất kỳ role → được xóa', () => {
      expect(canDeleteTask({ role: ROLES.DEVELOPER, isCreator: true })).toBe(true);
    });

    // UT_PERM_32
    it('Creator + SALE (readonly) → vẫn được xóa', () => {
      expect(canDeleteTask({ role: ROLES.SALE, isCreator: true })).toBe(true);
    });
  });

  describe('Admin roles — được xóa', () => {
    // UT_PERM_33
    it('PM → được xóa', () => {
      expect(canDeleteTask({ role: ROLES.PM, isCreator: false })).toBe(true);
    });

    // UT_PERM_34
    it('PRODUCT_OWNER → được xóa', () => {
      expect(canDeleteTask({ role: ROLES.PRODUCT_OWNER, isCreator: false })).toBe(true);
    });

    // UT_PERM_35
    it('isLeader + bất kỳ role → được xóa', () => {
      expect(canDeleteTask({ role: ROLES.DEVELOPER, isLeader: true, isCreator: false })).toBe(true);
    });
  });

  describe('QA + folder assignment', () => {
    // UT_PERM_36
    it('QA + isAssignedToFolder = true, không phải creator → được xóa', () => {
      expect(canDeleteTask({
        role: ROLES.QA,
        isCreator: false,
        isAssignedToFolder: true
      })).toBe(true);
    });

    // UT_PERM_37
    it('QA + isAssignedToFolder = false, không phải creator → KHÔNG được xóa', () => {
      expect(canDeleteTask({
        role: ROLES.QA,
        isCreator: false,
        isAssignedToFolder: false
      })).toBe(false);
    });
  });

  describe('KHÁC BIỆT với canEditTask: Assignee KHÔNG được xóa', () => {
    // UT_PERM_38
    it('Assignee (không phải creator, không phải admin) → KHÔNG được xóa', () => {
      // canEditTask cho phép assignee, nhưng canDeleteTask thì không!
      expect(canDeleteTask({
        role: ROLES.DEVELOPER,
        isCreator: false,
        isLeader: false,
        isAssignedToFolder: false
      })).toBe(false);
    });
  });

  describe('Không có quyền xóa', () => {
    // UT_PERM_39
    it('DEVELOPER bình thường không phải creator → không được xóa', () => {
      expect(canDeleteTask({ role: ROLES.DEVELOPER, isCreator: false })).toBe(false);
    });

    // UT_PERM_40
    it('BA không phải creator/admin → không được xóa', () => {
      expect(canDeleteTask({ role: ROLES.BA, isCreator: false })).toBe(false);
    });

    // UT_PERM_41
    it('null role, không phải creator → không được xóa', () => {
      expect(canDeleteTask({ role: null, isCreator: false })).toBe(false);
    });
  });
});

// ============================================================
// canWriteInFolder
// ============================================================
describe('canWriteInFolder', () => {
  describe('null / empty role', () => {
    // UT_PERM_42
    it('null role → false', () => {
      expect(canWriteInFolder(null)).toBe(false);
    });

    // UT_PERM_43
    it('undefined role → false', () => {
      expect(canWriteInFolder(undefined)).toBe(false);
    });
  });

  describe('Admin roles — luôn được write', () => {
    // UT_PERM_44
    it('PRODUCT_OWNER → true', () => {
      expect(canWriteInFolder(ROLES.PRODUCT_OWNER)).toBe(true);
    });

    // UT_PERM_45
    it('PM → true', () => {
      expect(canWriteInFolder(ROLES.PM)).toBe(true);
    });

    // UT_PERM_46
    it('isLeader + SALE → true', () => {
      expect(canWriteInFolder(ROLES.SALE, { isLeader: true })).toBe(true);
    });
  });

  describe('QA — phụ thuộc folder assignment', () => {
    // UT_PERM_47
    it('QA + isAssigned = true → true', () => {
      expect(canWriteInFolder(ROLES.QA, { isAssigned: true })).toBe(true);
    });

    // UT_PERM_48
    it('QA + isAssigned = false → false', () => {
      expect(canWriteInFolder(ROLES.QA, { isAssigned: false })).toBe(false);
    });

    // UT_PERM_49
    it('QA không truyền isAssigned → false', () => {
      expect(canWriteInFolder(ROLES.QA)).toBe(false);
    });
  });

  describe('READ_ONLY_ROLES — không bao giờ được write', () => {
    // UT_PERM_50
    it('SALE → false (dù isAssigned)', () => {
      expect(canWriteInFolder(ROLES.SALE, { isAssigned: true })).toBe(false);
    });

    // UT_PERM_51
    it('DEV_MANAGER → false', () => {
      expect(canWriteInFolder(ROLES.DEV_MANAGER, { isAssigned: true })).toBe(false);
    });
  });

  describe('FOLDER_SCOPED roles — phụ thuộc folder assignment', () => {
    // UT_PERM_52
    it('BA + isAssigned = true → true', () => {
      expect(canWriteInFolder(ROLES.BA, { isAssigned: true })).toBe(true);
    });

    // UT_PERM_53
    it('BA + isAssigned = false → false', () => {
      expect(canWriteInFolder(ROLES.BA, { isAssigned: false })).toBe(false);
    });

    // UT_PERM_54
    it('DEVOPS + isAssigned = true → true', () => {
      expect(canWriteInFolder(ROLES.DEVOPS, { isAssigned: true })).toBe(true);
    });

    // UT_PERM_55
    it('DEVELOPER + isAssigned = true → true', () => {
      expect(canWriteInFolder(ROLES.DEVELOPER, { isAssigned: true })).toBe(true);
    });

    // UT_PERM_56
    it('DEVELOPER + isAssigned = false → false', () => {
      expect(canWriteInFolder(ROLES.DEVELOPER, { isAssigned: false })).toBe(false);
    });

    // UT_PERM_57
    it('CHATBOT + isAssigned = true → true (PRODUCT_TEAM group)', () => {
      expect(canWriteInFolder(ROLES.CHATBOT, { isAssigned: true })).toBe(true);
    });
  });
});

// ============================================================
// canViewFolder
// ============================================================
describe('canViewFolder', () => {
  describe('isLeader — override tất cả', () => {
    // UT_PERM_58
    it('isLeader + SALE → true', () => {
      expect(canViewFolder(ROLES.SALE, { isLeader: true })).toBe(true);
    });

    // UT_PERM_59
    it('isLeader + null role → true', () => {
      expect(canViewFolder(null, { isLeader: true })).toBe(true);
    });
  });

  describe('null role', () => {
    // UT_PERM_60
    it('null role, không phải leader → false', () => {
      expect(canViewFolder(null)).toBe(false);
    });
  });

  describe('canViewAllFolders roles', () => {
    // UT_PERM_61
    it('PM → true', () => {
      expect(canViewFolder(ROLES.PM)).toBe(true);
    });

    // UT_PERM_62
    it('PRODUCT_OWNER → true', () => {
      expect(canViewFolder(ROLES.PRODUCT_OWNER)).toBe(true);
    });

    // UT_PERM_63
    it('SALE (READ_ONLY) → true (xem được tất cả)', () => {
      expect(canViewFolder(ROLES.SALE)).toBe(true);
    });

    // UT_PERM_64
    it('DEV_MANAGER (READ_ONLY) → true', () => {
      expect(canViewFolder(ROLES.DEV_MANAGER)).toBe(true);
    });
  });

  describe('FOLDER_SCOPED roles — phụ thuộc assignment', () => {
    // UT_PERM_65
    it('BA + isAssigned = true → true', () => {
      expect(canViewFolder(ROLES.BA, { isAssigned: true })).toBe(true);
    });

    // UT_PERM_66
    it('BA + isAssigned = false → false', () => {
      expect(canViewFolder(ROLES.BA, { isAssigned: false })).toBe(false);
    });

    // UT_PERM_67
    it('DEVELOPER + isAssigned = true → true', () => {
      expect(canViewFolder(ROLES.DEVELOPER, { isAssigned: true })).toBe(true);
    });

    // UT_PERM_68
    it('DEVELOPER + isAssigned = false → false', () => {
      expect(canViewFolder(ROLES.DEVELOPER, { isAssigned: false })).toBe(false);
    });
  });
});

// ============================================================
// canViewAllFolders
// ============================================================
describe('canViewAllFolders', () => {
  describe('Falsy input', () => {
    // UT_PERM_69
    it('null → false', () => {
      expect(canViewAllFolders(null)).toBe(false);
    });

    // UT_PERM_70
    it('undefined → false', () => {
      expect(canViewAllFolders(undefined)).toBe(false);
    });
  });

  describe('Object input với isLeader', () => {
    // UT_PERM_71
    it('{ isLeader: true } → true', () => {
      expect(canViewAllFolders({ isLeader: true })).toBe(true);
    });

    // UT_PERM_72
    it('{ isLeader: true, role: "ba" } → true (leader override)', () => {
      expect(canViewAllFolders({ isLeader: true, role: ROLES.BA })).toBe(true);
    });
  });

  describe('Object input với role', () => {
    // UT_PERM_73
    it('{ role: "pm" } → true', () => {
      expect(canViewAllFolders({ role: ROLES.PM })).toBe(true);
    });

    // UT_PERM_74
    it('{ role: "product_owner" } → true', () => {
      expect(canViewAllFolders({ role: ROLES.PRODUCT_OWNER })).toBe(true);
    });

    // UT_PERM_75
    it('{ role: "sale" } (READ_ONLY) → true', () => {
      expect(canViewAllFolders({ role: ROLES.SALE })).toBe(true);
    });

    // UT_PERM_76
    it('{ role: "developer_manager" } (READ_ONLY) → true', () => {
      expect(canViewAllFolders({ role: ROLES.DEV_MANAGER })).toBe(true);
    });

    // UT_PERM_77
    it('{ role: "ba" } (FOLDER_SCOPED) → false', () => {
      expect(canViewAllFolders({ role: ROLES.BA })).toBe(false);
    });

    // UT_PERM_78
    it('{ role: "developer" } (FOLDER_SCOPED) → false', () => {
      expect(canViewAllFolders({ role: ROLES.DEVELOPER })).toBe(false);
    });
  });

  describe('String input — backwards compatibility', () => {
    // UT_PERM_79
    it('"pm" string → true', () => {
      expect(canViewAllFolders('pm')).toBe(true);
    });

    // UT_PERM_80
    it('"ba" string → false', () => {
      expect(canViewAllFolders('ba')).toBe(false);
    });

    // UT_PERM_81
    it('"sale" string → true', () => {
      expect(canViewAllFolders('sale')).toBe(true);
    });
  });
});

// ============================================================
// requiresFolderAssignment
// ============================================================
describe('requiresFolderAssignment', () => {
  describe('FOLDER_SCOPED roles → true', () => {
    // UT_PERM_82
    it('BA → true (DELIVERY sans PM)', () => {
      expect(requiresFolderAssignment(ROLES.BA)).toBe(true);
    });

    // UT_PERM_83
    it('BOT_BUILDER → true', () => {
      expect(requiresFolderAssignment(ROLES.BOT_BUILDER)).toBe(true);
    });

    // UT_PERM_84
    it('QC → true', () => {
      expect(requiresFolderAssignment(ROLES.QC)).toBe(true);
    });

    // UT_PERM_85
    it('DEVOPS → true (INFRA)', () => {
      expect(requiresFolderAssignment(ROLES.DEVOPS)).toBe(true);
    });

    // UT_PERM_86
    it('CLOUD_INFRA → true', () => {
      expect(requiresFolderAssignment(ROLES.CLOUD_INFRA)).toBe(true);
    });

    // UT_PERM_87
    it('SECURITY → true', () => {
      expect(requiresFolderAssignment(ROLES.SECURITY)).toBe(true);
    });

    // UT_PERM_88
    it('DEVELOPER → true (PRODUCT_TEAM)', () => {
      expect(requiresFolderAssignment(ROLES.DEVELOPER)).toBe(true);
    });

    // UT_PERM_89
    it('CHATBOT → true', () => {
      expect(requiresFolderAssignment(ROLES.CHATBOT)).toBe(true);
    });

    // UT_PERM_90
    it('VOICEBOT → true', () => {
      expect(requiresFolderAssignment(ROLES.VOICEBOT)).toBe(true);
    });
  });

  describe('Non-scoped roles → false', () => {
    // UT_PERM_91
    it('PM → false (DELIVERY nhưng được loại trừ)', () => {
      expect(requiresFolderAssignment(ROLES.PM)).toBe(false);
    });

    // UT_PERM_92
    it('PRODUCT_OWNER → false (SUPERVISION)', () => {
      expect(requiresFolderAssignment(ROLES.PRODUCT_OWNER)).toBe(false);
    });

    // UT_PERM_93
    it('SALE → false (SUPERVISION)', () => {
      expect(requiresFolderAssignment(ROLES.SALE)).toBe(false);
    });

    // UT_PERM_94
    it('QA → false (SUPERVISION)', () => {
      // QA là READ_ONLY trong SUPERVISION, không phải FOLDER_SCOPED
      expect(requiresFolderAssignment(ROLES.QA)).toBe(false);
    });

    // UT_PERM_95
    it('DEV_MANAGER → false', () => {
      expect(requiresFolderAssignment(ROLES.DEV_MANAGER)).toBe(false);
    });

    // UT_PERM_96
    it('null → false', () => {
      expect(requiresFolderAssignment(null)).toBe(false);
    });
  });
});

// ============================================================
// isAdminRole
// ============================================================
describe('isAdminRole', () => {
  // UT_PERM_97
  it('PM → true', () => {
    expect(isAdminRole({ role: ROLES.PM })).toBe(true);
  });

  // UT_PERM_98
  it('PRODUCT_OWNER → true', () => {
    expect(isAdminRole({ role: ROLES.PRODUCT_OWNER })).toBe(true);
  });

  // UT_PERM_99
  it('isLeader = true → true (qua isPrivilegedForGroup)', () => {
    expect(isAdminRole({ role: ROLES.DEVELOPER, isLeader: true })).toBe(true);
  });

  // UT_PERM_100
  it('DEVELOPER không phải leader → false', () => {
    expect(isAdminRole({ role: ROLES.DEVELOPER, isLeader: false })).toBe(false);
  });

  // UT_PERM_101
  it('BA → false', () => {
    expect(isAdminRole({ role: ROLES.BA })).toBe(false);
  });

  // UT_PERM_102
  it('null role → false', () => {
    expect(isAdminRole({ role: null })).toBe(false);
  });
});

// ============================================================
// canManageFolders + canAssignFolderMembers
// ============================================================
describe('canManageFolders / canAssignFolderMembers', () => {
  describe('canManageFolders', () => {
    // UT_PERM_103
    it('PM → true', () => {
      expect(canManageFolders({ role: ROLES.PM })).toBe(true);
    });

    // UT_PERM_104
    it('PRODUCT_OWNER → true', () => {
      expect(canManageFolders({ role: ROLES.PRODUCT_OWNER })).toBe(true);
    });

    // UT_PERM_105
    it('isLeader → true', () => {
      expect(canManageFolders({ role: ROLES.BA, isLeader: true })).toBe(true);
    });

    // UT_PERM_106
    it('BA không phải leader → false', () => {
      expect(canManageFolders({ role: ROLES.BA })).toBe(false);
    });
  });

  describe('canAssignFolderMembers', () => {
    // UT_PERM_107
    it('PM → true', () => {
      expect(canAssignFolderMembers({ role: ROLES.PM })).toBe(true);
    });

    // UT_PERM_108
    it('PRODUCT_OWNER → true', () => {
      expect(canAssignFolderMembers({ role: ROLES.PRODUCT_OWNER })).toBe(true);
    });

    // UT_PERM_109
    it('isLeader → true', () => {
      expect(canAssignFolderMembers({ role: ROLES.DEVELOPER, isLeader: true })).toBe(true);
    });

    // UT_PERM_110
    it('DEVELOPER không phải leader → false', () => {
      expect(canAssignFolderMembers({ role: ROLES.DEVELOPER })).toBe(false);
    });
  });
});

// ============================================================
// isReadOnlyRole
// ============================================================
describe('isReadOnlyRole', () => {
  // UT_PERM_111
  it('SALE → true', () => {
    expect(isReadOnlyRole(ROLES.SALE)).toBe(true);
  });

  // UT_PERM_112
  it('QA → true', () => {
    expect(isReadOnlyRole(ROLES.QA)).toBe(true);
  });

  // UT_PERM_113
  it('DEV_MANAGER → true', () => {
    expect(isReadOnlyRole(ROLES.DEV_MANAGER)).toBe(true);
  });

  // UT_PERM_114
  it('PM → false', () => {
    expect(isReadOnlyRole(ROLES.PM)).toBe(false);
  });

  // UT_PERM_115
  it('DEVELOPER → false', () => {
    expect(isReadOnlyRole(ROLES.DEVELOPER)).toBe(false);
  });

  // UT_PERM_116
  it('null → false', () => {
    expect(isReadOnlyRole(null)).toBe(false);
  });
});

// ============================================================
// getRoleGroup
// ============================================================
describe('getRoleGroup', () => {
  // UT_PERM_117
  it('PM → "DELIVERY"', () => {
    expect(getRoleGroup(ROLES.PM)).toBe('DELIVERY');
  });

  // UT_PERM_118
  it('PRODUCT_OWNER → "SUPERVISION"', () => {
    expect(getRoleGroup(ROLES.PRODUCT_OWNER)).toBe('SUPERVISION');
  });

  // UT_PERM_119
  it('DEVELOPER → "PRODUCT_TEAM"', () => {
    expect(getRoleGroup(ROLES.DEVELOPER)).toBe('PRODUCT_TEAM');
  });

  // UT_PERM_120
  it('DEVOPS → "INFRA"', () => {
    expect(getRoleGroup(ROLES.DEVOPS)).toBe('INFRA');
  });

  // UT_PERM_121
  it('null → null', () => {
    expect(getRoleGroup(null)).toBe(null);
  });

  // UT_PERM_122
  it('unknown role → null', () => {
    expect(getRoleGroup('unknown_role')).toBe(null);
  });
});
