# CHECKLIST — task.assignment

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | Task Service — Assignment Permissions |
| Source File | `backend/src/services/task.service.js` |
| Test File | `unit-test/backend/tests/services/task.assignment.test.js` + `unit-test/backend/tests-integration/services/task.assignment.int.test.js` |
| Test Framework | Jest + rewire |
| SRS Mapping | FR-ASSIGN (phân công công việc) |
| Author | |
| Date | |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 31 | 31 | 0 | 0 | 0 |

Ghi chú tổng hợp: checklist này phản ánh **đúng source test hiện tại** theo tiêu chí *1 khối code test = 1 test case*, gồm **11 UT mock** + **20 IT checkdb**.

---

## CUSTOMIZED CHECKLIST

### Unit (mockdata) — `tests/services/task.assignment.test.js`
- [x] UT_ASSIGN_01 — Empty targetUserIds trả về kết quả rỗng
- [x] UT_ASSIGN_02 — null targetUserIds trả về kết quả rỗng
- [x] UT_ASSIGN_03 — PM non-lead self-assign được phép
- [x] UT_ASSIGN_05 — mọi role self-assign đều hợp lệ
- [x] UT_ASSIGN_06 — target không tồn tại bị restricted
- [x] UT_ASSIGN_23 — PM lead có thể gán toàn bộ targets
- [x] UT_ASSIGN_25 — PO lead all-valid thì không có errorMessage
- [x] UT_ASSIGN_26 — BA leader gán Developer non-lead được phép
- [x] UT_ASSIGN_27 — BA leader gán QA non-lead được phép
- [x] UT_ASSIGN_29 — BA leader không gán được leader khác
- [x] UT_ASSIGN_36 — khi còn valid target thì errorMessage = null

### Integration (checkdb) — `tests-integration/services/task.assignment.int.test.js`
- [x] IT_TASK_ASSIGNMENT_01 — reject assignee ngoài group, không persist
- [x] IT_TASK_ASSIGNMENT_02 — reject creator không đủ quyền gán người khác
- [x] IT_TASK_ASSIGNMENT_03 — reject PM non-lead gán PM non-lead
- [x] IT_TASK_ASSIGNMENT_04 — PM lead gán đa nhóm role thành công
- [x] IT_TASK_ASSIGNMENT_05 — reject leader (non PM/PO) gán leader khác
- [x] IT_TASK_ASSIGNMENT_06 — regular user self-assign thành công
- [x] IT_TASK_ASSIGNMENT_07 — PM non-lead mix valid/restricted chỉ persist valid
- [x] IT_TASK_ASSIGNMENT_08 — PM non-lead gán BA thành công
- [x] IT_TASK_ASSIGNMENT_09 — PM non-lead gán QA thành công
- [x] IT_TASK_ASSIGNMENT_10 — PM non-lead gán Developer leader thành công
- [x] IT_TASK_ASSIGNMENT_11 — PM non-lead không gán được PO non-lead
- [x] IT_TASK_ASSIGNMENT_12 — PM non-lead không gán được PM lead
- [x] IT_TASK_ASSIGNMENT_13 — PM non-lead không gán được PO lead
- [x] IT_TASK_ASSIGNMENT_14 — PO non-lead gán Developer thành công
- [x] IT_TASK_ASSIGNMENT_15 — PO non-lead không gán được PM lead
- [x] IT_TASK_ASSIGNMENT_16 — PO non-lead không gán được PO non-lead
- [x] IT_TASK_ASSIGNMENT_17 — PO lead gán PM lead thành công
- [x] IT_TASK_ASSIGNMENT_18 — PO lead gán Developer thành công và cập nhật folder access
- [x] IT_TASK_ASSIGNMENT_19 — PO non-lead mix valid/restricted chỉ persist valid
- [x] IT_TASK_ASSIGNMENT_20 — PO non-lead mix self + restricted chỉ persist self

---

## TEST CASES

### Unit (mockdata)

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_ASSIGN_01 | `validateAssignmentPermissions` | Kiểm tra biên đầu vào rỗng để đảm bảo helper trả về shape ổn định. | Empty targetUserIds | assigner PM non-lead, `targetUserIds=[]` | `{ validIds: [], restrictedIds: [], errorMessage: null }` | Khớp kết quả mong đợi | ✅ Pass | `mode=mockdata; source=UT` |
| UT_ASSIGN_02 | `validateAssignmentPermissions` | Kiểm tra biên đầu vào null để tránh lỗi runtime ở lane createTask. | null targetUserIds | assigner PM, `targetUserIds=null` | `{ validIds: [], restrictedIds: [] }` | Khớp kết quả mong đợi | ✅ Pass | `mode=mockdata; source=UT` |
| UT_ASSIGN_03 | `validateAssignmentPermissions` | Khóa rule self-assignment luôn hợp lệ. | PM non-lead tự gán | assignerId nằm trong targetIds | `validIds` chứa assignerId | Khớp kết quả mong đợi | ✅ Pass | `mode=mockdata; source=UT` |
| UT_ASSIGN_05 | `validateAssignmentPermissions` | Khóa rule self-assignment cho mọi role thường. | nhiều role tự gán | roles: sale/qa/dev_manager/ba/developer | mỗi role đều có self trong `validIds` | Khớp kết quả mong đợi | ✅ Pass | `mode=mockdata; source=UT` |
| UT_ASSIGN_06 | `validateAssignmentPermissions` | Xử lý target không tồn tại để không persist assignee ảo. | User không tồn tại | `User.find => []`, target bất kỳ | target nằm trong `restrictedIds` | Khớp kết quả mong đợi | ✅ Pass | `mode=mockdata; source=UT` |
| UT_ASSIGN_23 | `validateAssignmentPermissions` | Khóa lane PM lead có quyền gán rộng với nhiều loại target cùng lúc. | PM lead gán 4 loại user | developer, PM non-lead, PO lead, BA lead | `restrictedIds` rỗng, `validIds` đủ 4 | Khớp kết quả mong đợi | ✅ Pass | `mode=mockdata; source=UT` |
| UT_ASSIGN_25 | `validateAssignmentPermissions` | Khóa điều kiện PO lead all-valid không sinh errorMessage. | PO lead all valid | target developer non-lead | `errorMessage = null` | Khớp kết quả mong đợi | ✅ Pass | `mode=mockdata; source=UT` |
| UT_ASSIGN_26 | `validateAssignmentPermissions` | Khóa lane leader non PM/PO được gán non-lead. | BA leader gán Developer non-lead | assigner BA leader, target developer non-lead | target nằm trong `validIds` | Khớp kết quả mong đợi | ✅ Pass | `mode=mockdata; source=UT` |
| UT_ASSIGN_27 | `validateAssignmentPermissions` | Khóa lane leader non PM/PO được gán QA non-lead. | BA leader gán QA non-lead | assigner BA leader, target QA non-lead | target nằm trong `validIds` | Khớp kết quả mong đợi | ✅ Pass | `mode=mockdata; source=UT` |
| UT_ASSIGN_29 | `validateAssignmentPermissions` | Khóa lane leader non PM/PO không gán leader khác. | BA leader gán BA leader khác | assigner BA leader, target BA leader | target nằm trong `restrictedIds` | Khớp kết quả mong đợi | ✅ Pass | `mode=mockdata; source=UT` |
| UT_ASSIGN_36 | `validateAssignmentPermissions` | Khóa behavior có valid target thì không trả errorMessage. | mixed targets có valid | developer + PM non-lead | `errorMessage = null` | Khớp kết quả mong đợi | ✅ Pass | `mode=mockdata; source=UT` |

### Integration (checkdb)

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| IT_TASK_ASSIGNMENT_01 | `createTask` | Xác minh reject assignee ngoài group và không tạo task bẩn. | outsider assignee | creator + group + outsider user | throw lỗi membership, DB không có task theo title | Khớp kết quả mong đợi | ✅ Pass | `mode=checkdb; source=IT` |
| IT_TASK_ASSIGNMENT_02 | `createTask` | Xác minh role thường không được gán người khác. | developer gán teammate | creator developer, assignee teammate | throw lỗi self-assign only, không persist task | Khớp kết quả mong đợi | ✅ Pass | `mode=checkdb; source=IT` |
| IT_TASK_ASSIGNMENT_03 | `createTask` | Xác minh PM non-lead không gán được PM non-lead. | PM -> PM non-lead | creator PM non-lead, target PM non-lead | reject, không persist task | Khớp kết quả mong đợi | ✅ Pass | `mode=checkdb; source=IT` |
| IT_TASK_ASSIGNMENT_04 | `createTask` | Xác minh PM lead gán rộng và persist đủ assignees + folder access. | PM lead broad assign | targets PM/PO/leader | task + folder memberAccess chứa đầy đủ targets | Khớp kết quả mong đợi | ✅ Pass | `mode=checkdb; source=IT` |
| IT_TASK_ASSIGNMENT_05 | `createTask` | Xác minh leader non PM/PO không gán được leader khác. | BA leader -> developer leader | creator BA leader, target developer leader | reject với thông điệp Lead, không persist | Khớp kết quả mong đợi | ✅ Pass | `mode=checkdb; source=IT` |
| IT_TASK_ASSIGNMENT_06 | `createTask` | Xác minh regular user chỉ self-assign và task được persist đúng. | developer self-assign | creator developer, target chính creator | persist task, assignedTo chỉ có creator | Khớp kết quả mong đợi | ✅ Pass | `mode=checkdb; source=IT` |
| IT_TASK_ASSIGNMENT_07 | `createTask` | Xác minh mixed valid/restricted chỉ persist valid assignee với PM non-lead. | PM mixed assign | target developer + PM | task/folder chỉ chứa developer | Khớp kết quả mong đợi | ✅ Pass | `mode=checkdb; source=IT` |
| IT_TASK_ASSIGNMENT_08 | `createTask` | Xác minh PM non-lead gán BA non-lead thành công. | PM -> BA | creator PM, target BA | persist task với BA trong assignedTo | Khớp kết quả mong đợi | ✅ Pass | `mode=checkdb; source=IT` |
| IT_TASK_ASSIGNMENT_09 | `createTask` | Xác minh PM non-lead gán QA non-lead thành công. | PM -> QA | creator PM, target QA | persist task với QA trong assignedTo | Khớp kết quả mong đợi | ✅ Pass | `mode=checkdb; source=IT` |
| IT_TASK_ASSIGNMENT_10 | `createTask` | Xác minh PM non-lead gán developer leader thành công. | PM -> developer leader | creator PM, target dev leader | persist task với dev leader trong assignedTo | Khớp kết quả mong đợi | ✅ Pass | `mode=checkdb; source=IT` |
| IT_TASK_ASSIGNMENT_11 | `createTask` | Xác minh PM non-lead không gán được PO non-lead. | PM -> PO non-lead | creator PM, target PO | reject, không persist task | Khớp kết quả mong đợi | ✅ Pass | `mode=checkdb; source=IT` |
| IT_TASK_ASSIGNMENT_12 | `createTask` | Xác minh PM non-lead không gán được PM lead. | PM -> PM lead | creator PM, target PM leader | reject, không persist task | Khớp kết quả mong đợi | ✅ Pass | `mode=checkdb; source=IT` |
| IT_TASK_ASSIGNMENT_13 | `createTask` | Xác minh PM non-lead không gán được PO lead. | PM -> PO lead | creator PM, target PO leader | reject, không persist task | Khớp kết quả mong đợi | ✅ Pass | `mode=checkdb; source=IT` |
| IT_TASK_ASSIGNMENT_14 | `createTask` | Xác minh PO non-lead gán developer thành công. | PO -> developer | creator PO, target developer | persist task với developer trong assignedTo | Khớp kết quả mong đợi | ✅ Pass | `mode=checkdb; source=IT` |
| IT_TASK_ASSIGNMENT_15 | `createTask` | Xác minh PO non-lead không gán được PM lead. | PO -> PM lead | creator PO, target PM leader | reject, không persist task | Khớp kết quả mong đợi | ✅ Pass | `mode=checkdb; source=IT` |
| IT_TASK_ASSIGNMENT_16 | `createTask` | Xác minh PO non-lead không gán được PO non-lead khác. | PO -> PO non-lead | creator PO, target PO | reject, không persist task | Khớp kết quả mong đợi | ✅ Pass | `mode=checkdb; source=IT` |
| IT_TASK_ASSIGNMENT_17 | `createTask` | Xác minh PO lead gán PM lead thành công. | PO lead -> PM lead | creator PO lead, target PM lead | persist task với PM lead trong assignedTo | Khớp kết quả mong đợi | ✅ Pass | `mode=checkdb; source=IT` |
| IT_TASK_ASSIGNMENT_18 | `createTask` | Xác minh PO lead gán developer và cập nhật folder access đúng. | PO lead -> developer | creator PO lead, target developer, folder cụ thể | task persist + folder memberAccess chứa developer | Khớp kết quả mong đợi | ✅ Pass | `mode=checkdb; source=IT` |
| IT_TASK_ASSIGNMENT_19 | `createTask` | Xác minh PO non-lead mixed targets chỉ persist target hợp lệ. | PO mixed assign | target developer + PO restricted | assignedTo/folder access chỉ chứa developer | Khớp kết quả mong đợi | ✅ Pass | `mode=checkdb; source=IT` |
| IT_TASK_ASSIGNMENT_20 | `createTask` | Xác minh PO non-lead self + restricted chỉ persist self. | PO self + restricted | target creator + PO restricted | assignedTo chỉ chứa creator | Khớp kết quả mong đợi | ✅ Pass | `mode=checkdb; source=IT` |

---

## NHẬN XÉT KẾT QUẢ TEST

Nhóm `task.assignment` đang ổn định: toàn bộ 31 test case trong source hiện tại đều pass. Phần integration đã bao phủ đầy đủ các lane phân quyền chính theo role/leader và xác nhận trực tiếp trạng thái persist/no-persist trong DB.

## GIẢI TRÌNH CÁC HÀNG `mockdata`

Các hàng `mockdata`: `UT_ASSIGN_01`, `UT_ASSIGN_02`, `UT_ASSIGN_03`, `UT_ASSIGN_05`, `UT_ASSIGN_06`, `UT_ASSIGN_23`, `UT_ASSIGN_25`, `UT_ASSIGN_26`, `UT_ASSIGN_27`, `UT_ASSIGN_29`, `UT_ASSIGN_36`.

- Lý do chung: đây là các kiểm tra chi tiết ở mức helper nội bộ (`validIds/restrictedIds/errorMessage` shape) nên không phải DB-observable contract 1:1.
- Trường hợp đặc biệt: `UT_ASSIGN_23` là lane tổng hợp nhiều target trong cùng 1 call, integration đã bao phủ hành vi tương đương nhưng không assert theo đúng shape unit.

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |

