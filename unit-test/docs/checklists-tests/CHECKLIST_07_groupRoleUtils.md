# CHECKLIST — groupRoleUtils.test.ts

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | Utility — Group Role Utils (Frontend) |
| Source File | `frontend/app/utils/groupRoleUtils.ts` |
| Test File | `unit-test/frontend/tests/utils/groupRoleUtils.test.ts` |
| Test Framework | Jest + ts-jest |
| SRS Mapping | FR-FOLDER-5 (quyền folder), FR-GROUP-5 (thành viên), FR-GROUP-6 (personal workspace) |
| Author | |
| Date | |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 61    | 61 | 0 | 0 | 0 |

---

## CUSTOMIZED CHECKLIST

### getMemberId
- [x] UT_ROLE_01 — null member → null
- [x] UT_ROLE_02 — userId là string → return string
- [x] UT_ROLE_03 — userId là object với _id → _id
- [x] UT_ROLE_04 — userId là null → null
- [x] UT_ROLE_05 — userId object không có _id → null

### getMemberRole
- [x] UT_ROLE_06 — null group → null
- [x] UT_ROLE_07 — null userId → null
- [x] UT_ROLE_08 — undefined group → null
- [x] UT_ROLE_09 — Tìm thấy member → đúng role
- [x] UT_ROLE_10 — member.role undefined → null
- [x] UT_ROLE_11 — userId không có trong members → null
- [x] UT_ROLE_12 — Empty members array → null

### isReadOnlyRole
- [x] UT_ROLE_13 — SALE → true
- [x] UT_ROLE_14 — QA → true
- [x] UT_ROLE_15 — DEV_MANAGER → true
- [x] UT_ROLE_16 — PM → false
- [x] UT_ROLE_17 — PRODUCT_OWNER → false
- [x] UT_ROLE_18 — DEVELOPER → false
- [x] UT_ROLE_19 — BA → false
- [x] UT_ROLE_20 — null → false
- [x] UT_ROLE_21 — undefined → false

### requiresFolderAssignment
- [x] UT_ROLE_22 — BA → true
- [x] UT_ROLE_23 — BOT_BUILDER → true
- [x] UT_ROLE_24 — DEVOPS → true
- [x] UT_ROLE_25 — DEVELOPER → true
- [x] UT_ROLE_26 — PM → false
- [x] UT_ROLE_27 — PRODUCT_OWNER → false
- [x] UT_ROLE_28 — SALE → false
- [x] UT_ROLE_29 — null → false
- [x] UT_ROLE_30 — undefined → false

### canManageRoles
- [x] UT_ROLE_31 — Luôn trả về false (system admin only)

### canAddMembers (FR-GROUP-5.1)
- [x] UT_ROLE_32 — PRODUCT_OWNER → true
- [x] UT_ROLE_33 — PM → true
- [x] UT_ROLE_34 — isLeader = true → true
- [x] UT_ROLE_35 — isPersonalOwner = true → true
- [x] UT_ROLE_36 — DEVELOPER non-leader → false
- [x] UT_ROLE_37 — BA non-leader → false
- [x] UT_ROLE_38 — null role non-leader → false
- [x] UT_ROLE_39 — SALE non-leader → false

### canManageFolders (FR-FOLDER-1,3,4)
- [x] UT_ROLE_40 — PRODUCT_OWNER → true
- [x] UT_ROLE_41 — PM → true
- [x] UT_ROLE_42 — isLeader = true → true
- [x] UT_ROLE_43 — isPersonalOwner = true → true
- [x] UT_ROLE_44 — DEVELOPER non-leader → false
- [x] UT_ROLE_45 — BA non-leader → false
- [x] UT_ROLE_46 — null role → false

### canAssignFolderMembers (FR-FOLDER-5.1)
- [x] UT_ROLE_47 — PRODUCT_OWNER → true
- [x] UT_ROLE_48 — PM → true
- [x] UT_ROLE_49 — isLeader = true → true
- [x] UT_ROLE_50 — isPersonalOwner = true → true
- [x] UT_ROLE_51 — DEVELOPER non-leader → false
- [x] UT_ROLE_52 — QA non-leader → false

### isPersonalWorkspaceOwner (FR-GROUP-6)
- [x] UT_ROLE_53 — null group → false
- [x] UT_ROLE_54 — null userId → false
- [x] UT_ROLE_55 — undefined group → false
- [x] UT_ROLE_56 — isPersonalWorkspace = false → false
- [x] UT_ROLE_57 — Không có isPersonalWorkspace property → false
- [x] UT_ROLE_58 — Personal workspace + matching createdBy string → true
- [x] UT_ROLE_59 — Personal workspace + createdBy object → true
- [x] UT_ROLE_60 — Personal workspace + sai userId → false
- [x] UT_ROLE_61 — createdBy object + sai userId → false

---

## TEST CASES

### getMemberId

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_ROLE_01 | `getMemberId` | Xác minh trích userId từ member (string vs populated) cho UI group — PLAN mục 4.7. | null member → null | `null` | `null` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_ROLE_02 | `getMemberId` | Xác minh trích userId từ member (string vs populated) cho UI group — PLAN mục 4.7. | userId là string → return string | `{ userId: "user-123" }` | `"user-123"` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_ROLE_03 | `getMemberId` | Xác minh trích userId từ member (string vs populated) cho UI group — PLAN mục 4.7. | userId là object với _id → _id | `{ userId: { _id: "user-456", name: "John" } }` | `"user-456"` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_ROLE_04 | `getMemberId` | Xác minh trích userId từ member (string vs populated) cho UI group — PLAN mục 4.7. | userId là null → null | `{ userId: null }` | `null` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_ROLE_05 | `getMemberId` | Xác minh trích userId từ member (string vs populated) cho UI group — PLAN mục 4.7. | userId object không có _id → null | `{ userId: { name: "John" } }` | `null` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |

### getMemberRole

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_ROLE_06 | `getMemberRole` | Xác minh tra role theo user trong group (show/hide đúng) — PLAN mục 4.7. | null group → null | `null, "user1"` | `null` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_ROLE_07 | `getMemberRole` | Xác minh tra role theo user trong group (show/hide đúng) — PLAN mục 4.7. | null userId → null | `group, null` | `null` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_ROLE_08 | `getMemberRole` | Xác minh tra role theo user trong group (show/hide đúng) — PLAN mục 4.7. | undefined group → null | `undefined, "user1"` | `null` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_ROLE_09 | `getMemberRole` | Xác minh tra role theo user trong group (show/hide đúng) — PLAN mục 4.7. | Tìm thấy member → đúng role | group với `user1→pm, user2→developer`; query `"user1"` | `"pm"` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_ROLE_10 | `getMemberRole` | Xác minh tra role theo user trong group (show/hide đúng) — PLAN mục 4.7. | member.role undefined → null | member: `{ userId: "user1", role: undefined }` | `null` | Khớp kết quả mong đợi | ✅ Pass | `?? null` |
| UT_ROLE_11 | `getMemberRole` | Xác minh tra role theo user trong group (show/hide đúng) — PLAN mục 4.7. | userId không có trong members → null | group có user1, query `"user-nonexistent"` | `null` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_ROLE_12 | `getMemberRole` | Xác minh tra role theo user trong group (show/hide đúng) — PLAN mục 4.7. | Empty members array → null | `{ members: [] }, "user1"` | `null` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |

### isReadOnlyRole

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_ROLE_13 | `isReadOnlyRole` | Xác minh READ_ONLY role phía FE khớp backend — PLAN mục 4.7. | SALE → true | `"sale"` | `true` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_ROLE_14 | `isReadOnlyRole` | Xác minh READ_ONLY role phía FE khớp backend — PLAN mục 4.7. | QA → true | `"qa"` | `true` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_ROLE_15 | `isReadOnlyRole` | Xác minh READ_ONLY role phía FE khớp backend — PLAN mục 4.7. | DEV_MANAGER → true | `"developer_manager"` | `true` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_ROLE_16 | `isReadOnlyRole` | Xác minh READ_ONLY role phía FE khớp backend — PLAN mục 4.7. | PM → false | `"pm"` | `false` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_ROLE_17 | `isReadOnlyRole` | Xác minh READ_ONLY role phía FE khớp backend — PLAN mục 4.7. | PRODUCT_OWNER → false | `"product_owner"` | `false` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_ROLE_18 | `isReadOnlyRole` | Xác minh READ_ONLY role phía FE khớp backend — PLAN mục 4.7. | DEVELOPER → false | `"developer"` | `false` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_ROLE_19 | `isReadOnlyRole` | Xác minh READ_ONLY role phía FE khớp backend — PLAN mục 4.7. | BA → false | `"ba"` | `false` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_ROLE_20 | `isReadOnlyRole` | Xác minh READ_ONLY role phía FE khớp backend — PLAN mục 4.7. | null → false | `null` | `false` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_ROLE_21 | `isReadOnlyRole` | Xác minh READ_ONLY role phía FE khớp backend — PLAN mục 4.7. | undefined → false | `undefined` | `false` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |

### requiresFolderAssignment

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_ROLE_22 | `requiresFolderAssignment` | Xác minh role cần gán folder trước khi bật thao tác — PLAN mục 4.7. | BA → true | `"ba"` | `true` | Khớp kết quả mong đợi | ✅ Pass | FR-FOLDER-5 |
| UT_ROLE_23 | `requiresFolderAssignment` | Xác minh role cần gán folder trước khi bật thao tác — PLAN mục 4.7. | BOT_BUILDER → true | `"bot_builder"` | `true` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_ROLE_24 | `requiresFolderAssignment` | Xác minh role cần gán folder trước khi bật thao tác — PLAN mục 4.7. | DEVOPS → true | `"devops"` | `true` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_ROLE_25 | `requiresFolderAssignment` | Xác minh role cần gán folder trước khi bật thao tác — PLAN mục 4.7. | DEVELOPER → true | `"developer"` | `true` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_ROLE_26 | `requiresFolderAssignment` | Xác minh role cần gán folder trước khi bật thao tác — PLAN mục 4.7. | PM → false | `"pm"` | `false` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_ROLE_27 | `requiresFolderAssignment` | Xác minh role cần gán folder trước khi bật thao tác — PLAN mục 4.7. | PRODUCT_OWNER → false | `"product_owner"` | `false` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_ROLE_28 | `requiresFolderAssignment` | Xác minh role cần gán folder trước khi bật thao tác — PLAN mục 4.7. | SALE → false | `"sale"` | `false` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_ROLE_29 | `requiresFolderAssignment` | Xác minh role cần gán folder trước khi bật thao tác — PLAN mục 4.7. | null → false | `null` | `false` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_ROLE_30 | `requiresFolderAssignment` | Xác minh role cần gán folder trước khi bật thao tác — PLAN mục 4.7. | undefined → false | `undefined` | `false` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |

### canManageRoles

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_ROLE_31 | `canManageRoles` | Xác minh quyền chỉnh role thành viên trên UI — PLAN mục 4.7 / FR-GROUP. | Luôn trả về false | — (no args) | `false` | Khớp kết quả mong đợi | ✅ Pass | Roles chỉ được assign bởi system admin |

### canAddMembers (FR-GROUP-5.1)

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_ROLE_32 | `canAddMembers` | Xác minh quyền mời thêm thành viên (FR-GROUP-5.1) — PLAN mục 4.7. | PRODUCT_OWNER → true | `"product_owner"` | `true` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_ROLE_33 | `canAddMembers` | Xác minh quyền mời thêm thành viên (FR-GROUP-5.1) — PLAN mục 4.7. | PM → true | `"pm"` | `true` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_ROLE_34 | `canAddMembers` | Xác minh quyền mời thêm thành viên (FR-GROUP-5.1) — PLAN mục 4.7. | isLeader = true → true | `"developer", true` | `true` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_ROLE_35 | `canAddMembers` | Xác minh quyền mời thêm thành viên (FR-GROUP-5.1) — PLAN mục 4.7. | isPersonalOwner = true → true | `"sale", false, true` | `true` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_ROLE_36 | `canAddMembers` | Xác minh quyền mời thêm thành viên (FR-GROUP-5.1) — PLAN mục 4.7. | DEVELOPER non-leader → false | `"developer", false, false` | `false` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_ROLE_37 | `canAddMembers` | Xác minh quyền mời thêm thành viên (FR-GROUP-5.1) — PLAN mục 4.7. | BA non-leader → false | `"ba", false, false` | `false` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_ROLE_38 | `canAddMembers` | Xác minh quyền mời thêm thành viên (FR-GROUP-5.1) — PLAN mục 4.7. | null role non-leader → false | `null, false, false` | `false` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_ROLE_39 | `canAddMembers` | Xác minh quyền mời thêm thành viên (FR-GROUP-5.1) — PLAN mục 4.7. | SALE non-leader → false | `"sale", false, false` | `false` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |

### canManageFolders (FR-FOLDER-1,3,4)

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_ROLE_40 | `canManageFolders` | Xác minh quyền quản lý folder trên UI (FR-FOLDER-1,3,4) — PLAN mục 4.7. | PRODUCT_OWNER → true | `"product_owner"` | `true` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_ROLE_41 | `canManageFolders` | Xác minh quyền quản lý folder trên UI (FR-FOLDER-1,3,4) — PLAN mục 4.7. | PM → true | `"pm"` | `true` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_ROLE_42 | `canManageFolders` | Xác minh quyền quản lý folder trên UI (FR-FOLDER-1,3,4) — PLAN mục 4.7. | isLeader = true → true | `"ba", true` | `true` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_ROLE_43 | `canManageFolders` | Xác minh quyền quản lý folder trên UI (FR-FOLDER-1,3,4) — PLAN mục 4.7. | isPersonalOwner = true → true | `null, false, true` | `true` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_ROLE_44 | `canManageFolders` | Xác minh quyền quản lý folder trên UI (FR-FOLDER-1,3,4) — PLAN mục 4.7. | DEVELOPER non-leader → false | `"developer", false, false` | `false` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_ROLE_45 | `canManageFolders` | Xác minh quyền quản lý folder trên UI (FR-FOLDER-1,3,4) — PLAN mục 4.7. | BA non-leader → false | `"ba", false, false` | `false` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_ROLE_46 | `canManageFolders` | Xác minh quyền quản lý folder trên UI (FR-FOLDER-1,3,4) — PLAN mục 4.7. | null role → false | `null, false, false` | `false` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |

### canAssignFolderMembers (FR-FOLDER-5.1)

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_ROLE_47 | `canAssignFolderMembers` | Xác minh quyền gán thành viên vào folder (FR-FOLDER-5.1) — PLAN mục 4.7. | PRODUCT_OWNER → true | `"product_owner"` | `true` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_ROLE_48 | `canAssignFolderMembers` | Xác minh quyền gán thành viên vào folder (FR-FOLDER-5.1) — PLAN mục 4.7. | PM → true | `"pm"` | `true` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_ROLE_49 | `canAssignFolderMembers` | Xác minh quyền gán thành viên vào folder (FR-FOLDER-5.1) — PLAN mục 4.7. | isLeader = true → true | `"devops", true` | `true` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_ROLE_50 | `canAssignFolderMembers` | Xác minh quyền gán thành viên vào folder (FR-FOLDER-5.1) — PLAN mục 4.7. | isPersonalOwner = true → true | `null, false, true` | `true` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_ROLE_51 | `canAssignFolderMembers` | Xác minh quyền gán thành viên vào folder (FR-FOLDER-5.1) — PLAN mục 4.7. | DEVELOPER non-leader → false | `"developer", false, false` | `false` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_ROLE_52 | `canAssignFolderMembers` | Xác minh quyền gán thành viên vào folder (FR-FOLDER-5.1) — PLAN mục 4.7. | QA non-leader → false | `"qa", false, false` | `false` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |

### isPersonalWorkspaceOwner (FR-GROUP-6)

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_ROLE_53 | `isPersonalWorkspaceOwner` | Xác minh chủ personal workspace (FR-GROUP-6) — PLAN mục 4.7. | null group → false | `null, "user1"` | `false` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_ROLE_54 | `isPersonalWorkspaceOwner` | Xác minh chủ personal workspace (FR-GROUP-6) — PLAN mục 4.7. | null userId → false | `group, null` | `false` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_ROLE_55 | `isPersonalWorkspaceOwner` | Xác minh chủ personal workspace (FR-GROUP-6) — PLAN mục 4.7. | undefined group → false | `undefined, "user1"` | `false` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_ROLE_56 | `isPersonalWorkspaceOwner` | Xác minh chủ personal workspace (FR-GROUP-6) — PLAN mục 4.7. | isPersonalWorkspace = false → false | `{ isPersonalWorkspace: false, createdBy: "user1" }, "user1"` | `false` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_ROLE_57 | `isPersonalWorkspaceOwner` | Xác minh chủ personal workspace (FR-GROUP-6) — PLAN mục 4.7. | Không có isPersonalWorkspace property → false | `{ createdBy: "user1" }, "user1"` | `false` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_ROLE_58 | `isPersonalWorkspaceOwner` | Xác minh chủ personal workspace (FR-GROUP-6) — PLAN mục 4.7. | Personal workspace + createdBy string khớp → true | `{ isPersonalWorkspace: true, createdBy: "user-owner" }, "user-owner"` | `true` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_ROLE_59 | `isPersonalWorkspaceOwner` | Xác minh chủ personal workspace (FR-GROUP-6) — PLAN mục 4.7. | Personal workspace + createdBy object → true | `{ isPersonalWorkspace: true, createdBy: { _id: "user-owner" } }, "user-owner"` | `true` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_ROLE_60 | `isPersonalWorkspaceOwner` | Xác minh chủ personal workspace (FR-GROUP-6) — PLAN mục 4.7. | Personal workspace nhưng sai userId → false | `{ isPersonalWorkspace: true, createdBy: "user-owner" }, "other-user"` | `false` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_ROLE_61 | `isPersonalWorkspaceOwner` | Xác minh chủ personal workspace (FR-GROUP-6) — PLAN mục 4.7. | createdBy object nhưng sai userId → false | `{ isPersonalWorkspace: true, createdBy: { _id: "user-owner" } }, "other-user"` | `false` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |

---

## NHẬN XÉT KẾT QUẢ TEST

Toàn bộ 61/61 case frontend role utils đều pass, phản ánh tính nhất quán tốt của logic phân quyền phía client. Bộ này hữu ích cho regression nhanh ở UI permission behavior mà không phụ thuộc backend/integration runtime.

---

## RATIONALE - WHY THIS CHECKLIST DOES NOT USE DB CHECK

Lý do chung:

- File này thuộc frontend utility (`groupRoleUtils.ts`), nằm ngoài backend DB integration scope trong `PLAN.md` và feasibility report.
- Logic chỉ xử lý role/member object trong memory, không có persistence contract với MongoDB.

Trường hợp đặc biệt:

- Không có; toàn bộ checklist này nên giữ unit-only để đảm bảo tốc độ và độ ổn định regression ở frontend utilities.

