# CHECKLIST — task.assignment.test.js

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | Task Service — Assignment Permissions |
| Source File | `backend/src/services/task.service.js` |
| Test File | `unit-test/backend/tests/services/task.assignment.test.js` |
| Test Framework | Jest + rewire |
| SRS Mapping | FR-ASSIGN (phân công công việc) |
| Author | |
| Date | |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 36    | 36 | 0 | 0 | 0 |

---

## CUSTOMIZED CHECKLIST

### Edge Cases
- [x] UT_ASSIGN_01 — Empty targetUserIds → kết quả rỗng
- [x] UT_ASSIGN_02 — null targetUserIds → kết quả rỗng

### Self-assignment
- [x] UT_ASSIGN_03 — PM non-lead tự gán → validIds
- [x] UT_ASSIGN_04 — Developer tự gán → validIds
- [x] UT_ASSIGN_05 — Bất kỳ role nào tự gán → luôn valid

### User không tồn tại
- [x] UT_ASSIGN_06 — User không có trong DB → restrictedIds

### PM non-lead (FR-ASSIGN)
- [x] UT_ASSIGN_07 — ĐƯỢC gán cho Developer
- [x] UT_ASSIGN_08 — ĐƯỢC gán cho BA
- [x] UT_ASSIGN_09 — ĐƯỢC gán cho QA
- [x] UT_ASSIGN_10 — KHÔNG gán cho PM khác (non-lead)
- [x] UT_ASSIGN_11 — KHÔNG gán cho PO non-lead
- [x] UT_ASSIGN_12 — KHÔNG gán cho PM lead
- [x] UT_ASSIGN_13 — KHÔNG gán cho PO lead
- [x] UT_ASSIGN_14 — errorMessage khi tất cả bị restricted
- [x] UT_ASSIGN_15 — ĐƯỢC gán cho Developer leader (non-PM/PO)

### PO non-lead
- [x] UT_ASSIGN_16 — ĐƯỢC gán cho Developer
- [x] UT_ASSIGN_17 — KHÔNG gán cho PM lead
- [x] UT_ASSIGN_18 — KHÔNG gán cho PO khác

### PM lead
- [x] UT_ASSIGN_19 — ĐƯỢC gán cho Developer
- [x] UT_ASSIGN_20 — ĐƯỢC gán cho PM non-lead
- [x] UT_ASSIGN_21 — ĐƯỢC gán cho PO lead
- [x] UT_ASSIGN_22 — ĐƯỢC gán cho Developer lead
- [x] UT_ASSIGN_23 — ĐƯỢC gán cho tất cả (không có restrictedIds)

### PO lead
- [x] UT_ASSIGN_24 — ĐƯỢC gán cho PM lead
- [x] UT_ASSIGN_25 — errorMessage = null khi tất cả valid

### Leader (non-PM/PO)
- [x] UT_ASSIGN_26 — BA leader ĐƯỢC gán cho Developer non-lead
- [x] UT_ASSIGN_27 — BA leader ĐƯỢC gán cho QA non-lead
- [x] UT_ASSIGN_28 — BA leader KHÔNG gán cho Developer leader
- [x] UT_ASSIGN_29 — BA leader KHÔNG gán cho BA leader khác
- [x] UT_ASSIGN_30 — errorMessage đề cập "Lead"

### Regular role (không phải PM/PO/Leader)
- [x] UT_ASSIGN_31 — Developer non-lead KHÔNG gán cho người khác
- [x] UT_ASSIGN_32 — errorMessage generic

### Mixed valid + restricted
- [x] UT_ASSIGN_33 — Một số valid, một số restricted → errorMessage = null
- [x] UT_ASSIGN_34 — Self + restricted target → self valid, errorMessage = null

### errorMessage behavior
- [x] UT_ASSIGN_35 — All restricted → errorMessage not null
- [x] UT_ASSIGN_36 — Some valid → errorMessage = null

---

## TEST CASES

### Edge Cases

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_ASSIGN_01 | `validateAssignmentPermissions` | Xác minh biên đầu vào của validateAssignmentPermissions (target rỗng/null) — FR-ASSIGN, PLAN mục 4.5. | Empty targetUserIds trả về kết quả rỗng | assignerCtx: `{role: "pm", isLeader: false}`, targetUserIds: `[]` | `{ validIds: [], restrictedIds: [], errorMessage: null }` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_ASSIGN_02 | `validateAssignmentPermissions` | Xác minh biên đầu vào của validateAssignmentPermissions (target rỗng/null) — FR-ASSIGN, PLAN mục 4.5. | null targetUserIds trả về kết quả rỗng | targetUserIds: `null` | `{ validIds: [], restrictedIds: [] }` | Khớp kết quả mong đợi | ✅ Pass |  |

### Self-assignment (luôn được phép)

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_ASSIGN_03 | `validateAssignmentPermissions` | Xác minh tự phân công luôn được phép bất kể role (đặc thù FR-ASSIGN) — PLAN mục 4.5. | PM non-lead tự gán | assignerId: `"pm-non-lead"`, targetIds: `["pm-non-lead"]` | `validIds` chứa `"pm-non-lead"` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_ASSIGN_04 | `validateAssignmentPermissions` | Xác minh tự phân công luôn được phép bất kể role (đặc thù FR-ASSIGN) — PLAN mục 4.5. | Developer tự gán | assignerId: `"dev1"`, targetIds: `["dev1"]` | `validIds` chứa `"dev1"`, `restrictedIds` rỗng | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_ASSIGN_05 | `validateAssignmentPermissions` | Xác minh tự phân công luôn được phép bất kể role (đặc thù FR-ASSIGN) — PLAN mục 4.5. | Bất kỳ role nào tự gán đều valid | roles: `[sale, qa, developer_manager, ba, developer]`; targetId = assignerId | Mỗi role → `validIds` chứa assignerId | Khớp kết quả mong đợi | ✅ Pass |  |

### Target user không tồn tại

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_ASSIGN_06 | `validateAssignmentPermissions` | Xác minh validateAssignmentPermissions khớp FR-ASSIGN và ma trận PLAN mục 4.5. | User không có trong DB → restricted | mock `User.find → []`, target: `"nonexistent-user"` | `restrictedIds` chứa `"nonexistent-user"` | Khớp kết quả mong đợi | ✅ Pass | CheckDB |

### PM non-lead

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_ASSIGN_07 | `validateAssignmentPermissions` | Xác minh ma trận PM non-lead: được/không được gán theo nhóm PM/PO/lead — FR-ASSIGN, PLAN mục 4.5. | PM non-lead ĐƯỢC gán cho Developer | assigner: `{role:"pm", isLeader:false}`, target: Developer non-lead | `validIds` chứa target | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_ASSIGN_08 | `validateAssignmentPermissions` | Xác minh ma trận PM non-lead: được/không được gán theo nhóm PM/PO/lead — FR-ASSIGN, PLAN mục 4.5. | PM non-lead ĐƯỢC gán cho BA | target: BA non-lead | `validIds` chứa target | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_ASSIGN_09 | `validateAssignmentPermissions` | Xác minh ma trận PM non-lead: được/không được gán theo nhóm PM/PO/lead — FR-ASSIGN, PLAN mục 4.5. | PM non-lead ĐƯỢC gán cho QA | target: QA non-lead | `validIds` chứa target | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_ASSIGN_10 | `validateAssignmentPermissions` | Xác minh ma trận PM non-lead: được/không được gán theo nhóm PM/PO/lead — FR-ASSIGN, PLAN mục 4.5. | PM non-lead KHÔNG gán cho PM khác | target: PM non-lead | `restrictedIds` chứa target | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_ASSIGN_11 | `validateAssignmentPermissions` | Xác minh ma trận PM non-lead: được/không được gán theo nhóm PM/PO/lead — FR-ASSIGN, PLAN mục 4.5. | PM non-lead KHÔNG gán cho PO non-lead | target: PO non-lead | `restrictedIds` chứa target | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_ASSIGN_12 | `validateAssignmentPermissions` | Xác minh ma trận PM non-lead: được/không được gán theo nhóm PM/PO/lead — FR-ASSIGN, PLAN mục 4.5. | PM non-lead KHÔNG gán cho PM lead | target: PM isLeader=true | `restrictedIds` chứa target | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_ASSIGN_13 | `validateAssignmentPermissions` | Xác minh ma trận PM non-lead: được/không được gán theo nhóm PM/PO/lead — FR-ASSIGN, PLAN mục 4.5. | PM non-lead KHÔNG gán cho PO lead | target: PO isLeader=true | `restrictedIds` chứa target | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_ASSIGN_14 | `validateAssignmentPermissions` | Xác minh ma trận PM non-lead: được/không được gán theo nhóm PM/PO/lead — FR-ASSIGN, PLAN mục 4.5. | errorMessage khi tất cả bị restricted | target duy nhất là PM non-lead | `errorMessage` truthy và chứa "PM" | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_ASSIGN_15 | `validateAssignmentPermissions` | Xác minh ma trận PM non-lead: được/không được gán theo nhóm PM/PO/lead — FR-ASSIGN, PLAN mục 4.5. | PM non-lead ĐƯỢC gán cho Developer leader | target: Developer isLeader=true | `validIds` chứa target | Khớp kết quả mong đợi | ✅ Pass |  |

### PO non-lead

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_ASSIGN_16 | `validateAssignmentPermissions` | Xác minh ma trận PO non-lead đối xứng policy với PM — FR-ASSIGN, PLAN mục 4.5. | PO non-lead ĐƯỢC gán cho Developer | assigner: `{role:"product_owner", isLeader:false}`, target: Developer | `validIds` chứa target | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_ASSIGN_17 | `validateAssignmentPermissions` | Xác minh ma trận PO non-lead đối xứng policy với PM — FR-ASSIGN, PLAN mục 4.5. | PO non-lead KHÔNG gán cho PM lead | target: PM isLeader=true | `restrictedIds` chứa target | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_ASSIGN_18 | `validateAssignmentPermissions` | Xác minh ma trận PO non-lead đối xứng policy với PM — FR-ASSIGN, PLAN mục 4.5. | PO non-lead KHÔNG gán cho PO khác | target: PO non-lead | `restrictedIds` chứa target | Khớp kết quả mong đợi | ✅ Pass |  |

### PM lead

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_ASSIGN_19 | `validateAssignmentPermissions` | Xác minh PM lead được phân công rộng (kể cả lead khác) — FR-ASSIGN, PLAN mục 4.5. | PM lead ĐƯỢC gán cho Developer | assigner: `{role:"pm", isLeader:true}`, target: Developer | `validIds` chứa target | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_ASSIGN_20 | `validateAssignmentPermissions` | Xác minh PM lead được phân công rộng (kể cả lead khác) — FR-ASSIGN, PLAN mục 4.5. | PM lead ĐƯỢC gán cho PM non-lead | target: PM isLeader=false | `validIds` chứa target | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_ASSIGN_21 | `validateAssignmentPermissions` | Xác minh PM lead được phân công rộng (kể cả lead khác) — FR-ASSIGN, PLAN mục 4.5. | PM lead ĐƯỢC gán cho PO lead | target: PO isLeader=true | `validIds` chứa target | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_ASSIGN_22 | `validateAssignmentPermissions` | Xác minh PM lead được phân công rộng (kể cả lead khác) — FR-ASSIGN, PLAN mục 4.5. | PM lead ĐƯỢC gán cho Developer lead | target: Developer isLeader=true | `validIds` chứa target | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_ASSIGN_23 | `validateAssignmentPermissions` | Xác minh PM lead được phân công rộng (kể cả lead khác) — FR-ASSIGN, PLAN mục 4.5. | PM lead ĐƯỢC gán cho tất cả mọi người | 4 targets: Developer, PM non-lead, PO lead, BA lead | `restrictedIds` rỗng, `validIds` có 4 phần tử | Khớp kết quả mong đợi | ✅ Pass |  |

### PO lead

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_ASSIGN_24 | `validateAssignmentPermissions` | Xác minh PO lead được phân công rộng — FR-ASSIGN, PLAN mục 4.5. | PO lead ĐƯỢC gán cho PM lead | assigner: `{role:"product_owner", isLeader:true}`, target: PM lead | `validIds` chứa target | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_ASSIGN_25 | `validateAssignmentPermissions` | Xác minh PO lead được phân công rộng — FR-ASSIGN, PLAN mục 4.5. | PO lead không có errorMessage khi tất cả valid | target: Developer non-lead | `errorMessage` là null | Khớp kết quả mong đợi | ✅ Pass |  |

### Leader (non-PM/PO)

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_ASSIGN_26 | `validateAssignmentPermissions` | Xác minh leader không phải PM/PO: được gán non-lead, không gán chéo leader — FR-ASSIGN, PLAN mục 4.5. | BA leader ĐƯỢC gán cho Developer non-lead | assigner: `{role:"ba", isLeader:true}`, target: Developer non-lead | `validIds` chứa target | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_ASSIGN_27 | `validateAssignmentPermissions` | Xác minh leader không phải PM/PO: được gán non-lead, không gán chéo leader — FR-ASSIGN, PLAN mục 4.5. | BA leader ĐƯỢC gán cho QA non-lead | target: QA non-lead | `validIds` chứa target | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_ASSIGN_28 | `validateAssignmentPermissions` | Xác minh leader không phải PM/PO: được gán non-lead, không gán chéo leader — FR-ASSIGN, PLAN mục 4.5. | BA leader KHÔNG gán cho Developer leader | target: Developer isLeader=true | `restrictedIds` chứa target | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_ASSIGN_29 | `validateAssignmentPermissions` | Xác minh leader không phải PM/PO: được gán non-lead, không gán chéo leader — FR-ASSIGN, PLAN mục 4.5. | BA leader KHÔNG gán cho BA leader khác | target: BA isLeader=true | `restrictedIds` chứa target | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_ASSIGN_30 | `validateAssignmentPermissions` | Xác minh leader không phải PM/PO: được gán non-lead, không gán chéo leader — FR-ASSIGN, PLAN mục 4.5. | errorMessage đề cập "Lead" khi bị restricted vì leader | target: Developer leader (all restricted) | `errorMessage` chứa "Lead" | Khớp kết quả mong đợi | ✅ Pass |  |

### Regular role

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_ASSIGN_31 | `validateAssignmentPermissions` | Xác minh role thường (không PM/PO/leader) không gán người khác — FR-ASSIGN, PLAN mục 4.5. | Developer non-lead KHÔNG gán cho người khác | assigner: `{role:"developer", isLeader:false}`, target khác (dev2) | `restrictedIds` chứa target | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_ASSIGN_32 | `validateAssignmentPermissions` | Xác minh role thường (không PM/PO/leader) không gán người khác — FR-ASSIGN, PLAN mục 4.5. | Regular role có errorMessage generic | same as above | `errorMessage` truthy | Khớp kết quả mong đợi | ✅ Pass |  |

### Mixed valid + restricted

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_ASSIGN_33 | `validateAssignmentPermissions` | Xác minh tổ hợp valid + restricted: validIds partial và errorMessage đúng luật — FR-ASSIGN, PLAN mục 4.5. | PM non-lead: một số valid, một số restricted → errorMessage = null | targets: `[Developer, PM non-lead]` | `validIds` chứa Developer; `restrictedIds` chứa PM; `errorMessage = null` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_ASSIGN_34 | `validateAssignmentPermissions` | Xác minh tổ hợp valid + restricted: validIds partial và errorMessage đúng luật — FR-ASSIGN, PLAN mục 4.5. | Self + restricted → self valid, errorMessage = null | targets: `[assigner, PM non-lead]`; PM non-lead là assigner | `validIds` chứa assigner; `restrictedIds` chứa PM; `errorMessage = null` | Khớp kết quả mong đợi | ✅ Pass |  |

### errorMessage behavior

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_ASSIGN_35 | `validateAssignmentPermissions` | Xác minh điều kiện điền errorMessage (all restricted vs có valid) — FR-ASSIGN, PLAN mục 4.5. | All restricted → errorMessage not null | target duy nhất là PM non-lead (bị restrict) | `errorMessage` không null | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_ASSIGN_36 | `validateAssignmentPermissions` | Xác minh điều kiện điền errorMessage (all restricted vs có valid) — FR-ASSIGN, PLAN mục 4.5. | Some valid → errorMessage = null | targets: `[Developer, PM non-lead]` | `errorMessage = null` | Khớp kết quả mong đợi | ✅ Pass |  |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
