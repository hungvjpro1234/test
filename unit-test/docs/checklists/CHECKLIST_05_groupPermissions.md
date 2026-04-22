# CHECKLIST — groupPermissions.test.js

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | Utility — Group Permissions (Backend) |
| Source File | `backend/src/utils/groupPermissions.js` |
| Test File | `unit-test/backend/tests/utils/groupPermissions.test.js` |
| Test Framework | Jest |
| SRS Mapping | FR-FOLDER (quyền folder), FR-TASK-1 (tạo/sửa/xóa task), FR-ASSIGN (phân công) |
| Author | |
| Date | |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 123    | 122 | 1 | 0 | 0 |

---

## CUSTOMIZED CHECKLIST

### canCreateTasks
- [x] UT_PERM_01 — null role → false
- [x] UT_PERM_02 — undefined role → false
- [x] UT_PERM_03 — empty object → false
- [x] UT_PERM_04 — SALE → false
- [x] UT_PERM_05 — QA không có folder → false
- [x] UT_PERM_06 — DEV_MANAGER → false
- [x] UT_PERM_07 — QA có folder assignment → true
- [x] UT_PERM_08 — PM → true
- [x] UT_PERM_09 — BA → true
- [x] UT_PERM_10 — DEVELOPER → true
- [x] UT_PERM_11 — DEVOPS → true
- [x] UT_PERM_12 — BOT_BUILDER → true
- [x] UT_PERM_13 — PRODUCT_OWNER → true
- [x] UT_PERM_14 — SALE + isLeader → true
- [x] UT_PERM_15 — QA + isLeader (không cần folder) → true
- [x] UT_PERM_16 — DEV_MANAGER + isLeader → true
- [x] UT_PERM_17 — null role + isLeader → true per SRS ⚠️ có thể FAIL

### canEditTask
- [x] UT_PERM_18 — PM → true
- [x] UT_PERM_19 — PRODUCT_OWNER → true
- [x] UT_PERM_20 — isLeader + bất kỳ role → true
- [x] UT_PERM_21 — isLeader + null role → true
- [x] UT_PERM_22 — Creator với role thấp → true
- [x] UT_PERM_23 — Creator + QA → true
- [x] UT_PERM_24 — Assignee với role thấp → true
- [x] UT_PERM_25 — Assignee + SALE → true
- [x] UT_PERM_26 — QA + isAssignedToFolder = true → true
- [x] UT_PERM_27 — QA không có folder, không phải creator/assignee → false
- [x] UT_PERM_28 — DEVELOPER bình thường → false
- [x] UT_PERM_29 — BA không phải creator/assignee/admin → false
- [x] UT_PERM_30 — null role → false

### canDeleteTask
- [x] UT_PERM_31 — Creator → true
- [x] UT_PERM_32 — Creator + SALE (readonly) → true
- [x] UT_PERM_33 — PM → true
- [x] UT_PERM_34 — PRODUCT_OWNER → true
- [x] UT_PERM_35 — isLeader + bất kỳ role → true
- [x] UT_PERM_36 — QA + isAssignedToFolder = true → true
- [x] UT_PERM_37 — QA + isAssignedToFolder = false → false
- [x] UT_PERM_38 — Assignee (không phải creator) → false (khác canEditTask!)
- [x] UT_PERM_39 — DEVELOPER bình thường → false
- [x] UT_PERM_40 — BA không phải creator/admin → false
- [x] UT_PERM_41 — null role → false

### canWriteInFolder
- [x] UT_PERM_42 — null role → false
- [x] UT_PERM_43 — undefined role → false
- [x] UT_PERM_44 — PRODUCT_OWNER → true
- [x] UT_PERM_45 — PM → true
- [x] UT_PERM_46 — isLeader + SALE → true
- [x] UT_PERM_47 — QA + isAssigned = true → true
- [x] UT_PERM_48 — QA + isAssigned = false → false
- [x] UT_PERM_49 — QA không truyền isAssigned → false
- [x] UT_PERM_50 — SALE (READ_ONLY) → false dù isAssigned
- [x] UT_PERM_51 — DEV_MANAGER → false
- [x] UT_PERM_52 — BA + isAssigned = true → true
- [x] UT_PERM_53 — BA + isAssigned = false → false
- [x] UT_PERM_54 — DEVOPS + isAssigned = true → true
- [x] UT_PERM_55 — DEVELOPER + isAssigned = true → true
- [x] UT_PERM_56 — DEVELOPER + isAssigned = false → false
- [x] UT_PERM_57 — CHATBOT + isAssigned = true → true

### canViewFolder
- [x] UT_PERM_58 — isLeader + SALE → true
- [x] UT_PERM_59 — isLeader + null role → true
- [x] UT_PERM_60 — null role → false
- [x] UT_PERM_61 — PM → true
- [x] UT_PERM_62 — PRODUCT_OWNER → true
- [x] UT_PERM_63 — SALE (READ_ONLY) → true (xem được tất cả)
- [x] UT_PERM_64 — DEV_MANAGER → true
- [x] UT_PERM_65 — BA + isAssigned = true → true
- [x] UT_PERM_66 — BA + isAssigned = false → false
- [x] UT_PERM_67 — DEVELOPER + isAssigned = true → true
- [x] UT_PERM_68 — DEVELOPER + isAssigned = false → false

### canViewAllFolders
- [x] UT_PERM_69 — null → false
- [x] UT_PERM_70 — undefined → false
- [x] UT_PERM_71 — { isLeader: true } → true
- [x] UT_PERM_72 — { isLeader: true, role: "ba" } → true (leader override)
- [x] UT_PERM_73 — { role: "pm" } → true
- [x] UT_PERM_74 — { role: "product_owner" } → true
- [x] UT_PERM_75 — { role: "sale" } → true
- [x] UT_PERM_76 — { role: "developer_manager" } → true
- [x] UT_PERM_77 — { role: "ba" } → false (FOLDER_SCOPED)
- [x] UT_PERM_78 — { role: "developer" } → false
- [x] UT_PERM_79 — "pm" string → true (backwards compat)
- [x] UT_PERM_80 — "ba" string → false
- [x] UT_PERM_81 — "sale" string → true

### requiresFolderAssignment
- [x] UT_PERM_82 — BA → true
- [x] UT_PERM_83 — BOT_BUILDER → true
- [x] UT_PERM_84 — QC → true
- [x] UT_PERM_85 — DEVOPS → true
- [x] UT_PERM_86 — CLOUD_INFRA → true
- [x] UT_PERM_87 — SECURITY → true
- [x] UT_PERM_88 — DEVELOPER → true
- [x] UT_PERM_89 — CHATBOT → true
- [x] UT_PERM_90 — VOICEBOT → true
- [x] UT_PERM_91 — PM → false
- [x] UT_PERM_92 — PRODUCT_OWNER → false
- [x] UT_PERM_93 — SALE → false
- [x] UT_PERM_94 — QA → false (SUPERVISION, không phải FOLDER_SCOPED)
- [x] UT_PERM_95 — DEV_MANAGER → false
- [x] UT_PERM_96 — null → false

### isAdminRole
- [x] UT_PERM_97 — PM → true
- [x] UT_PERM_98 — PRODUCT_OWNER → true
- [x] UT_PERM_99 — isLeader = true → true
- [x] UT_PERM_100 — DEVELOPER non-leader → false
- [x] UT_PERM_101 — BA → false
- [x] UT_PERM_102 — null role → false

### canManageFolders
- [x] UT_PERM_103 — PM → true
- [x] UT_PERM_104 — PRODUCT_OWNER → true
- [x] UT_PERM_105 — isLeader → true
- [x] UT_PERM_106 — BA non-leader → false

### canAssignFolderMembers
- [x] UT_PERM_107 — PM → true
- [x] UT_PERM_108 — PRODUCT_OWNER → true
- [x] UT_PERM_109 — isLeader → true
- [x] UT_PERM_110 — DEVELOPER non-leader → false

### isReadOnlyRole
- [x] UT_PERM_111 — SALE → true
- [x] UT_PERM_112 — QA → true
- [x] UT_PERM_113 — DEV_MANAGER → true
- [x] UT_PERM_114 — PM → false
- [x] UT_PERM_115 — DEVELOPER → false
- [x] UT_PERM_116 — null → false

### getRoleGroup
- [x] UT_PERM_117 — PM → "DELIVERY"
- [x] UT_PERM_118 — PRODUCT_OWNER → "SUPERVISION"
- [x] UT_PERM_119 — DEVELOPER → "PRODUCT_TEAM"
- [x] UT_PERM_120 — DEVOPS → "INFRA"
- [x] UT_PERM_121 — null → null
- [x] UT_PERM_122 — unknown role → null

### isRoleInGroup (bonus)
- [x] UT_PERM_123 — Verify isRoleInGroup hoạt động đúng với các nhóm role

---

## TEST CASES

### canCreateTasks

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_PERM_01 | `canCreateTasks` | Xác minh điều kiện được tạo task (FR-TASK-1) theo role + leader + gán folder — PLAN mục 4.1. | null role → false | `{ role: null }` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_02 | `canCreateTasks` | Xác minh điều kiện được tạo task (FR-TASK-1) theo role + leader + gán folder — PLAN mục 4.1. | undefined role → false | `{ role: undefined }` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_03 | `canCreateTasks` | Xác minh điều kiện được tạo task (FR-TASK-1) theo role + leader + gán folder — PLAN mục 4.1. | empty object → false | `{}` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_04 | `canCreateTasks` | Xác minh điều kiện được tạo task (FR-TASK-1) theo role + leader + gán folder — PLAN mục 4.1. | SALE → false | `{ role: "sale", isLeader: false }` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_05 | `canCreateTasks` | Xác minh điều kiện được tạo task (FR-TASK-1) theo role + leader + gán folder — PLAN mục 4.1. | QA không có folder → false | `{ role: "qa", isLeader: false, isAssignedToFolder: false }` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_06 | `canCreateTasks` | Xác minh điều kiện được tạo task (FR-TASK-1) theo role + leader + gán folder — PLAN mục 4.1. | DEV_MANAGER → false | `{ role: "developer_manager", isLeader: false }` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_07 | `canCreateTasks` | Xác minh điều kiện được tạo task (FR-TASK-1) theo role + leader + gán folder — PLAN mục 4.1. | QA có folder assignment → true | `{ role: "qa", isLeader: false, isAssignedToFolder: true }` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_08 | `canCreateTasks` | Xác minh điều kiện được tạo task (FR-TASK-1) theo role + leader + gán folder — PLAN mục 4.1. | PM → true | `{ role: "pm" }` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_09 | `canCreateTasks` | Xác minh điều kiện được tạo task (FR-TASK-1) theo role + leader + gán folder — PLAN mục 4.1. | BA → true | `{ role: "ba" }` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_10 | `canCreateTasks` | Xác minh điều kiện được tạo task (FR-TASK-1) theo role + leader + gán folder — PLAN mục 4.1. | DEVELOPER → true | `{ role: "developer" }` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_11 | `canCreateTasks` | Xác minh điều kiện được tạo task (FR-TASK-1) theo role + leader + gán folder — PLAN mục 4.1. | DEVOPS → true | `{ role: "devops" }` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_12 | `canCreateTasks` | Xác minh điều kiện được tạo task (FR-TASK-1) theo role + leader + gán folder — PLAN mục 4.1. | BOT_BUILDER → true | `{ role: "bot_builder" }` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_13 | `canCreateTasks` | Xác minh điều kiện được tạo task (FR-TASK-1) theo role + leader + gán folder — PLAN mục 4.1. | PRODUCT_OWNER → true | `{ role: "product_owner" }` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_14 | `canCreateTasks` | Xác minh điều kiện được tạo task (FR-TASK-1) theo role + leader + gán folder — PLAN mục 4.1. | SALE + isLeader → true (leader override) | `{ role: "sale", isLeader: true }` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_15 | `canCreateTasks` | Xác minh điều kiện được tạo task (FR-TASK-1) theo role + leader + gán folder — PLAN mục 4.1. | QA + isLeader (không cần folder) → true | `{ role: "qa", isLeader: true, isAssignedToFolder: false }` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_16 | `canCreateTasks` | Xác minh điều kiện được tạo task (FR-TASK-1) theo role + leader + gán folder — PLAN mục 4.1. | DEV_MANAGER + isLeader → true | `{ role: "developer_manager", isLeader: true }` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_17 | `canCreateTasks` | Xác minh điều kiện được tạo task (FR-TASK-1) theo role + leader + gán folder — PLAN mục 4.1. | null role + isLeader → true per SRS | `{ role: null, isLeader: true }` | `true` | `false` | ❌ Fail | ⚠️ Có thể FAIL: source check `!role` trước isLeader — inconsistency với canEditTask; ⚠️ BUG: source code check `!role` trả về false trước khi kiểm tra isLeader |

### canEditTask

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_PERM_18 | `canEditTask` | Xác minh quyền cập nhật task (FR-TASK-4.3): admin/creator/assignee/QA có folder vs leader — PLAN mục 4.1. | PM → true | `{ role: "pm" }` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_19 | `canEditTask` | Xác minh quyền cập nhật task (FR-TASK-4.3): admin/creator/assignee/QA có folder vs leader — PLAN mục 4.1. | PRODUCT_OWNER → true | `{ role: "product_owner" }` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_20 | `canEditTask` | Xác minh quyền cập nhật task (FR-TASK-4.3): admin/creator/assignee/QA có folder vs leader — PLAN mục 4.1. | isLeader + bất kỳ role → true | `{ role: "sale", isLeader: true }` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_21 | `canEditTask` | Xác minh quyền cập nhật task (FR-TASK-4.3): admin/creator/assignee/QA có folder vs leader — PLAN mục 4.1. | isLeader + null role → true | `{ role: null, isLeader: true }` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_22 | `canEditTask` | Xác minh quyền cập nhật task (FR-TASK-4.3): admin/creator/assignee/QA có folder vs leader — PLAN mục 4.1. | Creator với role thấp → true | `{ role: "developer", isCreator: true }` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_23 | `canEditTask` | Xác minh quyền cập nhật task (FR-TASK-4.3): admin/creator/assignee/QA có folder vs leader — PLAN mục 4.1. | Creator + QA → true | `{ role: "qa", isCreator: true }` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_24 | `canEditTask` | Xác minh quyền cập nhật task (FR-TASK-4.3): admin/creator/assignee/QA có folder vs leader — PLAN mục 4.1. | Assignee với role thấp → true | `{ role: "developer", isAssignee: true }` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_25 | `canEditTask` | Xác minh quyền cập nhật task (FR-TASK-4.3): admin/creator/assignee/QA có folder vs leader — PLAN mục 4.1. | Assignee + SALE (readonly) → true | `{ role: "sale", isAssignee: true }` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_26 | `canEditTask` | Xác minh quyền cập nhật task (FR-TASK-4.3): admin/creator/assignee/QA có folder vs leader — PLAN mục 4.1. | QA + isAssignedToFolder = true → true | `{ role: "qa", isAssignedToFolder: true }` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_27 | `canEditTask` | Xác minh quyền cập nhật task (FR-TASK-4.3): admin/creator/assignee/QA có folder vs leader — PLAN mục 4.1. | QA không có folder, không phải creator/assignee → false | `{ role: "qa", isCreator: false, isAssignee: false, isAssignedToFolder: false }` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_28 | `canEditTask` | Xác minh quyền cập nhật task (FR-TASK-4.3): admin/creator/assignee/QA có folder vs leader — PLAN mục 4.1. | DEVELOPER bình thường → false | `{ role: "developer", isCreator: false, isAssignee: false }` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_29 | `canEditTask` | Xác minh quyền cập nhật task (FR-TASK-4.3): admin/creator/assignee/QA có folder vs leader — PLAN mục 4.1. | BA không phải creator/assignee/admin → false | `{ role: "ba", isCreator: false, isAssignee: false }` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_30 | `canEditTask` | Xác minh quyền cập nhật task (FR-TASK-4.3): admin/creator/assignee/QA có folder vs leader — PLAN mục 4.1. | null role → false | `{ role: null }` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |

### canDeleteTask

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_PERM_31 | `canDeleteTask` | Xác minh quyền xóa task (FR-TASK-5.2); lưu ý assignee không được xóa — PLAN mục 4.1. | Creator → true | `{ role: "developer", isCreator: true }` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_32 | `canDeleteTask` | Xác minh quyền xóa task (FR-TASK-5.2); lưu ý assignee không được xóa — PLAN mục 4.1. | Creator + SALE → true | `{ role: "sale", isCreator: true }` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_33 | `canDeleteTask` | Xác minh quyền xóa task (FR-TASK-5.2); lưu ý assignee không được xóa — PLAN mục 4.1. | PM → true | `{ role: "pm", isCreator: false }` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_34 | `canDeleteTask` | Xác minh quyền xóa task (FR-TASK-5.2); lưu ý assignee không được xóa — PLAN mục 4.1. | PRODUCT_OWNER → true | `{ role: "product_owner", isCreator: false }` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_35 | `canDeleteTask` | Xác minh quyền xóa task (FR-TASK-5.2); lưu ý assignee không được xóa — PLAN mục 4.1. | isLeader + bất kỳ role → true | `{ role: "developer", isLeader: true, isCreator: false }` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_36 | `canDeleteTask` | Xác minh quyền xóa task (FR-TASK-5.2); lưu ý assignee không được xóa — PLAN mục 4.1. | QA + isAssignedToFolder = true → true | `{ role: "qa", isCreator: false, isAssignedToFolder: true }` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_37 | `canDeleteTask` | Xác minh quyền xóa task (FR-TASK-5.2); lưu ý assignee không được xóa — PLAN mục 4.1. | QA + isAssignedToFolder = false → false | `{ role: "qa", isCreator: false, isAssignedToFolder: false }` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_38 | `canDeleteTask` | Xác minh quyền xóa task (FR-TASK-5.2); lưu ý assignee không được xóa — PLAN mục 4.1. | Assignee (không phải creator) → false | `{ role: "developer", isCreator: false, isLeader: false, isAssignedToFolder: false }` | `false` | Khớp kết quả mong đợi | ✅ Pass | Khác biệt với canEditTask: assignee không được xóa |
| UT_PERM_39 | `canDeleteTask` | Xác minh quyền xóa task (FR-TASK-5.2); lưu ý assignee không được xóa — PLAN mục 4.1. | DEVELOPER bình thường → false | `{ role: "developer", isCreator: false }` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_40 | `canDeleteTask` | Xác minh quyền xóa task (FR-TASK-5.2); lưu ý assignee không được xóa — PLAN mục 4.1. | BA không phải creator/admin → false | `{ role: "ba", isCreator: false }` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_41 | `canDeleteTask` | Xác minh quyền xóa task (FR-TASK-5.2); lưu ý assignee không được xóa — PLAN mục 4.1. | null role → false | `{ role: null, isCreator: false }` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |

### canWriteInFolder

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_PERM_42 | `canWriteInFolder` | Xác minh quyền ghi folder (FR-FOLDER-5): READ_ONLY, FOLDER_SCOPED, leader — PLAN mục 4.1. | null role → false | `null` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_43 | `canWriteInFolder` | Xác minh quyền ghi folder (FR-FOLDER-5): READ_ONLY, FOLDER_SCOPED, leader — PLAN mục 4.1. | undefined role → false | `undefined` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_44 | `canWriteInFolder` | Xác minh quyền ghi folder (FR-FOLDER-5): READ_ONLY, FOLDER_SCOPED, leader — PLAN mục 4.1. | PRODUCT_OWNER → true | `"product_owner"` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_45 | `canWriteInFolder` | Xác minh quyền ghi folder (FR-FOLDER-5): READ_ONLY, FOLDER_SCOPED, leader — PLAN mục 4.1. | PM → true | `"pm"` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_46 | `canWriteInFolder` | Xác minh quyền ghi folder (FR-FOLDER-5): READ_ONLY, FOLDER_SCOPED, leader — PLAN mục 4.1. | isLeader + SALE → true | `"sale", { isLeader: true }` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_47 | `canWriteInFolder` | Xác minh quyền ghi folder (FR-FOLDER-5): READ_ONLY, FOLDER_SCOPED, leader — PLAN mục 4.1. | QA + isAssigned = true → true | `"qa", { isAssigned: true }` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_48 | `canWriteInFolder` | Xác minh quyền ghi folder (FR-FOLDER-5): READ_ONLY, FOLDER_SCOPED, leader — PLAN mục 4.1. | QA + isAssigned = false → false | `"qa", { isAssigned: false }` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_49 | `canWriteInFolder` | Xác minh quyền ghi folder (FR-FOLDER-5): READ_ONLY, FOLDER_SCOPED, leader — PLAN mục 4.1. | QA không truyền opts → false | `"qa"` (không có opts) | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_50 | `canWriteInFolder` | Xác minh quyền ghi folder (FR-FOLDER-5): READ_ONLY, FOLDER_SCOPED, leader — PLAN mục 4.1. | SALE (READ_ONLY) → false dù isAssigned | `"sale", { isAssigned: true }` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_51 | `canWriteInFolder` | Xác minh quyền ghi folder (FR-FOLDER-5): READ_ONLY, FOLDER_SCOPED, leader — PLAN mục 4.1. | DEV_MANAGER → false | `"developer_manager", { isAssigned: true }` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_52 | `canWriteInFolder` | Xác minh quyền ghi folder (FR-FOLDER-5): READ_ONLY, FOLDER_SCOPED, leader — PLAN mục 4.1. | BA + isAssigned = true → true | `"ba", { isAssigned: true }` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_53 | `canWriteInFolder` | Xác minh quyền ghi folder (FR-FOLDER-5): READ_ONLY, FOLDER_SCOPED, leader — PLAN mục 4.1. | BA + isAssigned = false → false | `"ba", { isAssigned: false }` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_54 | `canWriteInFolder` | Xác minh quyền ghi folder (FR-FOLDER-5): READ_ONLY, FOLDER_SCOPED, leader — PLAN mục 4.1. | DEVOPS + isAssigned = true → true | `"devops", { isAssigned: true }` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_55 | `canWriteInFolder` | Xác minh quyền ghi folder (FR-FOLDER-5): READ_ONLY, FOLDER_SCOPED, leader — PLAN mục 4.1. | DEVELOPER + isAssigned = true → true | `"developer", { isAssigned: true }` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_56 | `canWriteInFolder` | Xác minh quyền ghi folder (FR-FOLDER-5): READ_ONLY, FOLDER_SCOPED, leader — PLAN mục 4.1. | DEVELOPER + isAssigned = false → false | `"developer", { isAssigned: false }` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_57 | `canWriteInFolder` | Xác minh quyền ghi folder (FR-FOLDER-5): READ_ONLY, FOLDER_SCOPED, leader — PLAN mục 4.1. | CHATBOT + isAssigned = true → true | `"chatbot", { isAssigned: true }` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |

### canViewFolder

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_PERM_58 | `canViewFolder` | Xác minh quyền xem folder theo FR-FOLDER-5 và các role xem toàn cục — PLAN mục 4.1. | isLeader + SALE → true | `"sale", { isLeader: true }` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_59 | `canViewFolder` | Xác minh quyền xem folder theo FR-FOLDER-5 và các role xem toàn cục — PLAN mục 4.1. | isLeader + null role → true | `null, { isLeader: true }` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_60 | `canViewFolder` | Xác minh quyền xem folder theo FR-FOLDER-5 và các role xem toàn cục — PLAN mục 4.1. | null role (không leader) → false | `null` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_61 | `canViewFolder` | Xác minh quyền xem folder theo FR-FOLDER-5 và các role xem toàn cục — PLAN mục 4.1. | PM → true | `"pm"` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_62 | `canViewFolder` | Xác minh quyền xem folder theo FR-FOLDER-5 và các role xem toàn cục — PLAN mục 4.1. | PRODUCT_OWNER → true | `"product_owner"` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_63 | `canViewFolder` | Xác minh quyền xem folder theo FR-FOLDER-5 và các role xem toàn cục — PLAN mục 4.1. | SALE (READ_ONLY) → true | `"sale"` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_64 | `canViewFolder` | Xác minh quyền xem folder theo FR-FOLDER-5 và các role xem toàn cục — PLAN mục 4.1. | DEV_MANAGER → true | `"developer_manager"` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_65 | `canViewFolder` | Xác minh quyền xem folder theo FR-FOLDER-5 và các role xem toàn cục — PLAN mục 4.1. | BA + isAssigned = true → true | `"ba", { isAssigned: true }` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_66 | `canViewFolder` | Xác minh quyền xem folder theo FR-FOLDER-5 và các role xem toàn cục — PLAN mục 4.1. | BA + isAssigned = false → false | `"ba", { isAssigned: false }` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_67 | `canViewFolder` | Xác minh quyền xem folder theo FR-FOLDER-5 và các role xem toàn cục — PLAN mục 4.1. | DEVELOPER + isAssigned = true → true | `"developer", { isAssigned: true }` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_68 | `canViewFolder` | Xác minh quyền xem folder theo FR-FOLDER-5 và các role xem toàn cục — PLAN mục 4.1. | DEVELOPER + isAssigned = false → false | `"developer", { isAssigned: false }` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |

### canViewAllFolders

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_PERM_69 | `canViewAllFolders` | Xác minh canViewAllFolders (object + legacy string) khớp ma trận PM/PO/Sale vs scoped — PLAN mục 4.1. | null → false | `null` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_70 | `canViewAllFolders` | Xác minh canViewAllFolders (object + legacy string) khớp ma trận PM/PO/Sale vs scoped — PLAN mục 4.1. | undefined → false | `undefined` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_71 | `canViewAllFolders` | Xác minh canViewAllFolders (object + legacy string) khớp ma trận PM/PO/Sale vs scoped — PLAN mục 4.1. | { isLeader: true } → true | `{ isLeader: true }` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_72 | `canViewAllFolders` | Xác minh canViewAllFolders (object + legacy string) khớp ma trận PM/PO/Sale vs scoped — PLAN mục 4.1. | leader override BA → true | `{ isLeader: true, role: "ba" }` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_73 | `canViewAllFolders` | Xác minh canViewAllFolders (object + legacy string) khớp ma trận PM/PO/Sale vs scoped — PLAN mục 4.1. | { role: "pm" } → true | `{ role: "pm" }` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_74 | `canViewAllFolders` | Xác minh canViewAllFolders (object + legacy string) khớp ma trận PM/PO/Sale vs scoped — PLAN mục 4.1. | { role: "product_owner" } → true | `{ role: "product_owner" }` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_75 | `canViewAllFolders` | Xác minh canViewAllFolders (object + legacy string) khớp ma trận PM/PO/Sale vs scoped — PLAN mục 4.1. | { role: "sale" } → true | `{ role: "sale" }` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_76 | `canViewAllFolders` | Xác minh canViewAllFolders (object + legacy string) khớp ma trận PM/PO/Sale vs scoped — PLAN mục 4.1. | { role: "developer_manager" } → true | `{ role: "developer_manager" }` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_77 | `canViewAllFolders` | Xác minh canViewAllFolders (object + legacy string) khớp ma trận PM/PO/Sale vs scoped — PLAN mục 4.1. | { role: "ba" } → false | `{ role: "ba" }` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_78 | `canViewAllFolders` | Xác minh canViewAllFolders (object + legacy string) khớp ma trận PM/PO/Sale vs scoped — PLAN mục 4.1. | { role: "developer" } → false | `{ role: "developer" }` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_79 | `canViewAllFolders` | Xác minh canViewAllFolders (object + legacy string) khớp ma trận PM/PO/Sale vs scoped — PLAN mục 4.1. | "pm" string → true | `"pm"` | `true` | Khớp kết quả mong đợi | ✅ Pass | backwards compat |
| UT_PERM_80 | `canViewAllFolders` | Xác minh canViewAllFolders (object + legacy string) khớp ma trận PM/PO/Sale vs scoped — PLAN mục 4.1. | "ba" string → false | `"ba"` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_81 | `canViewAllFolders` | Xác minh canViewAllFolders (object + legacy string) khớp ma trận PM/PO/Sale vs scoped — PLAN mục 4.1. | "sale" string → true | `"sale"` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |

### requiresFolderAssignment

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_PERM_82 | `requiresFolderAssignment` | Xác minh role nào bắt buộc gán folder (DELIVERY/INFRA/PRODUCT_TEAM vs PM/PO) — PLAN mục 4.1. | BA → true | `"ba"` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_83 | `requiresFolderAssignment` | Xác minh role nào bắt buộc gán folder (DELIVERY/INFRA/PRODUCT_TEAM vs PM/PO) — PLAN mục 4.1. | BOT_BUILDER → true | `"bot_builder"` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_84 | `requiresFolderAssignment` | Xác minh role nào bắt buộc gán folder (DELIVERY/INFRA/PRODUCT_TEAM vs PM/PO) — PLAN mục 4.1. | QC → true | `"qc"` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_85 | `requiresFolderAssignment` | Xác minh role nào bắt buộc gán folder (DELIVERY/INFRA/PRODUCT_TEAM vs PM/PO) — PLAN mục 4.1. | DEVOPS → true | `"devops"` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_86 | `requiresFolderAssignment` | Xác minh role nào bắt buộc gán folder (DELIVERY/INFRA/PRODUCT_TEAM vs PM/PO) — PLAN mục 4.1. | CLOUD_INFRA → true | `"cloud_infra"` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_87 | `requiresFolderAssignment` | Xác minh role nào bắt buộc gán folder (DELIVERY/INFRA/PRODUCT_TEAM vs PM/PO) — PLAN mục 4.1. | SECURITY → true | `"security"` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_88 | `requiresFolderAssignment` | Xác minh role nào bắt buộc gán folder (DELIVERY/INFRA/PRODUCT_TEAM vs PM/PO) — PLAN mục 4.1. | DEVELOPER → true | `"developer"` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_89 | `requiresFolderAssignment` | Xác minh role nào bắt buộc gán folder (DELIVERY/INFRA/PRODUCT_TEAM vs PM/PO) — PLAN mục 4.1. | CHATBOT → true | `"chatbot"` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_90 | `requiresFolderAssignment` | Xác minh role nào bắt buộc gán folder (DELIVERY/INFRA/PRODUCT_TEAM vs PM/PO) — PLAN mục 4.1. | VOICEBOT → true | `"voicebot"` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_91 | `requiresFolderAssignment` | Xác minh role nào bắt buộc gán folder (DELIVERY/INFRA/PRODUCT_TEAM vs PM/PO) — PLAN mục 4.1. | PM → false | `"pm"` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_92 | `requiresFolderAssignment` | Xác minh role nào bắt buộc gán folder (DELIVERY/INFRA/PRODUCT_TEAM vs PM/PO) — PLAN mục 4.1. | PRODUCT_OWNER → false | `"product_owner"` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_93 | `requiresFolderAssignment` | Xác minh role nào bắt buộc gán folder (DELIVERY/INFRA/PRODUCT_TEAM vs PM/PO) — PLAN mục 4.1. | SALE → false | `"sale"` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_94 | `requiresFolderAssignment` | Xác minh role nào bắt buộc gán folder (DELIVERY/INFRA/PRODUCT_TEAM vs PM/PO) — PLAN mục 4.1. | QA → false | `"qa"` | `false` | Khớp kết quả mong đợi | ✅ Pass | QA thuộc SUPERVISION |
| UT_PERM_95 | `requiresFolderAssignment` | Xác minh role nào bắt buộc gán folder (DELIVERY/INFRA/PRODUCT_TEAM vs PM/PO) — PLAN mục 4.1. | DEV_MANAGER → false | `"developer_manager"` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_96 | `requiresFolderAssignment` | Xác minh role nào bắt buộc gán folder (DELIVERY/INFRA/PRODUCT_TEAM vs PM/PO) — PLAN mục 4.1. | null → false | `null` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |

### isAdminRole

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_PERM_97 | `isAdminRole` | Xác minh nhận diện admin role phục vụ nhánh quyền cao — PLAN mục 4.1. | PM → true | `{ role: "pm" }` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_98 | `isAdminRole` | Xác minh nhận diện admin role phục vụ nhánh quyền cao — PLAN mục 4.1. | PRODUCT_OWNER → true | `{ role: "product_owner" }` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_99 | `isAdminRole` | Xác minh nhận diện admin role phục vụ nhánh quyền cao — PLAN mục 4.1. | isLeader = true → true | `{ role: "developer", isLeader: true }` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_100 | `isAdminRole` | Xác minh nhận diện admin role phục vụ nhánh quyền cao — PLAN mục 4.1. | DEVELOPER non-leader → false | `{ role: "developer", isLeader: false }` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_101 | `isAdminRole` | Xác minh nhận diện admin role phục vụ nhánh quyền cao — PLAN mục 4.1. | BA → false | `{ role: "ba" }` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_102 | `isAdminRole` | Xác minh nhận diện admin role phục vụ nhánh quyền cao — PLAN mục 4.1. | null role → false | `{ role: null }` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |

### canManageFolders

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_PERM_103 | `canManageFolders` | Xác minh quyền quản lý cấu trúc folder (FR-FOLDER-1,3,4) — PLAN mục 4.1. | PM → true | `{ role: "pm" }` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_104 | `canManageFolders` | Xác minh quyền quản lý cấu trúc folder (FR-FOLDER-1,3,4) — PLAN mục 4.1. | PRODUCT_OWNER → true | `{ role: "product_owner" }` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_105 | `canManageFolders` | Xác minh quyền quản lý cấu trúc folder (FR-FOLDER-1,3,4) — PLAN mục 4.1. | isLeader → true | `{ role: "ba", isLeader: true }` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_106 | `canManageFolders` | Xác minh quyền quản lý cấu trúc folder (FR-FOLDER-1,3,4) — PLAN mục 4.1. | BA non-leader → false | `{ role: "ba" }` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |

### canAssignFolderMembers

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_PERM_107 | `canAssignFolderMembers` | Xác minh quyền gán thành viên vào folder (FR-FOLDER-5.1) — PLAN mục 4.1. | PM → true | `{ role: "pm" }` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_108 | `canAssignFolderMembers` | Xác minh quyền gán thành viên vào folder (FR-FOLDER-5.1) — PLAN mục 4.1. | PRODUCT_OWNER → true | `{ role: "product_owner" }` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_109 | `canAssignFolderMembers` | Xác minh quyền gán thành viên vào folder (FR-FOLDER-5.1) — PLAN mục 4.1. | isLeader → true | `{ role: "developer", isLeader: true }` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_110 | `canAssignFolderMembers` | Xác minh quyền gán thành viên vào folder (FR-FOLDER-5.1) — PLAN mục 4.1. | DEVELOPER non-leader → false | `{ role: "developer" }` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |

### isReadOnlyRole

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_PERM_111 | `isReadOnlyRole` | Xác minh READ_ONLY roles (Sale/QA/dev manager) — PLAN mục 4.1. | SALE → true | `"sale"` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_112 | `isReadOnlyRole` | Xác minh READ_ONLY roles (Sale/QA/dev manager) — PLAN mục 4.1. | QA → true | `"qa"` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_113 | `isReadOnlyRole` | Xác minh READ_ONLY roles (Sale/QA/dev manager) — PLAN mục 4.1. | DEV_MANAGER → true | `"developer_manager"` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_114 | `isReadOnlyRole` | Xác minh READ_ONLY roles (Sale/QA/dev manager) — PLAN mục 4.1. | PM → false | `"pm"` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_115 | `isReadOnlyRole` | Xác minh READ_ONLY roles (Sale/QA/dev manager) — PLAN mục 4.1. | DEVELOPER → false | `"developer"` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_116 | `isReadOnlyRole` | Xác minh READ_ONLY roles (Sale/QA/dev manager) — PLAN mục 4.1. | null → false | `null` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |

### getRoleGroup

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_PERM_117 | `getRoleGroup` | Xác minh mapping role → nhóm chức năng (PRODUCT_TEAM, DELIVERY, …) — PLAN mục 4.1. | PM → "DELIVERY" | `"pm"` | `"DELIVERY"` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_118 | `getRoleGroup` | Xác minh mapping role → nhóm chức năng (PRODUCT_TEAM, DELIVERY, …) — PLAN mục 4.1. | PRODUCT_OWNER → "SUPERVISION" | `"product_owner"` | `"SUPERVISION"` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_119 | `getRoleGroup` | Xác minh mapping role → nhóm chức năng (PRODUCT_TEAM, DELIVERY, …) — PLAN mục 4.1. | DEVELOPER → "PRODUCT_TEAM" | `"developer"` | `"PRODUCT_TEAM"` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_120 | `getRoleGroup` | Xác minh mapping role → nhóm chức năng (PRODUCT_TEAM, DELIVERY, …) — PLAN mục 4.1. | DEVOPS → "INFRA" | `"devops"` | `"INFRA"` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_121 | `getRoleGroup` | Xác minh mapping role → nhóm chức năng (PRODUCT_TEAM, DELIVERY, …) — PLAN mục 4.1. | null → null | `null` | `null` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_122 | `getRoleGroup` | Xác minh mapping role → nhóm chức năng (PRODUCT_TEAM, DELIVERY, …) — PLAN mục 4.1. | unknown role → null | `"unknown_role"` | `null` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_PERM_123 | `isRoleInGroup` | Xác minh mapping role → nhóm chức năng (PRODUCT_TEAM, DELIVERY, …) — PLAN mục 4.1. | Kiểm tra grouping đúng | — | Roles trong đúng group → `true` | Khớp kết quả mong đợi | ✅ Pass |  |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| BUG-003 | UT_PERM_17 | `canCreateTasks({role:null, isLeader:true})` trả về `false` — source code check `!role` return false trước khi kiểm tra isLeader, không nhất quán với canEditTask | High | Open |
