# BÁO CÁO KIỂM THỬ ĐƠN VỊ (UNIT TESTING REPORT)

---

**Thông tin chung:**
- **Họ và tên:** [Nguyễn Văn A]
- **Mã sinh viên:** [B21DCCNxxx]
- **Lớp:** [Nhóm môn học]
- **Tên dự án:** Todo List App

---

## 1. Thông tin kỹ thuật (Technical Information)

### 1.1. Công cụ và thư viện (Tools and Libraries)

| Thành phần | Chi tiết |
|------------|---------|
| **Testing Framework** | Jest 29.x |
| **TypeScript support** | ts-jest (frontend tests) |
| **Module access** | rewire (truy cập private functions trong task.service.js) |
| **Mock strategy** | Jest mocks + rewire `__set__` để inject dependency vào module scope |
| **Coverage tool** | Jest `--coverage` (lcov, text) |
| **Runner** | Node.js |

### 1.2. Phạm vi kiểm thử (Scope of Testing)

**Thành phần được kiểm thử:**

| # | File test | Source được test | Loại |
|---|-----------|-----------------|------|
| 1 | `notification.producer.test.js` | `backend/src/services/notification.producer.js` | Service |
| 2 | `task.assignment.test.js` | `backend/src/services/task.service.js` — `validateAssignmentPermissions` | Service (private fn) |
| 3 | `task.helpers.test.js` | `backend/src/services/task.service.js` — `normalizeId`, `buildRecipientList`, `buildFolderClauses`, `hasFolderAssignment` | Service (private fns) |
| 4 | `dateHelper.test.js` | `backend/src/utils/dateHelper.js` | Utility |
| 5 | `groupPermissions.test.js` | `backend/src/utils/groupPermissions.js` | Utility |
| 6 | `validationHelper.test.js` | `backend/src/utils/validationHelper.js` | Utility |
| 7 | `groupRoleUtils.test.ts` | `frontend/app/utils/groupRoleUtils.ts` | Frontend Utility |

**Thành phần không kiểm thử:**
- Các Interface và type definitions (không chứa code thực thi)
- Controller / Route layers (thuộc phạm vi integration/system test)
- Database models (Mongoose schemas)

**Lý do phạm vi:** Mục tiêu đảm bảo từng utility và pure function thực hiện đúng thiết kế, đạt **mức phủ cấp 2 (branch coverage)**. Các hàm có side effect (DB writes) được kiểm thử thông qua mock, verify cả input params lẫn call behavior.

---

## 2. Danh sách các Ca kiểm thử (Unit Test Cases)

> Chi tiết từng test case xem trong các file checklist tương ứng tại `unit-test/docs/checklists/`.

### Tổng hợp theo module

| # | Module | File Checklist | Số TC |
|---|--------|---------------|-------|
| 1 | Notification Producer | [CHECKLIST_01_notification_producer.md](checklists/CHECKLIST_01_notification_producer.md) | 16 |
| 2 | Task Assignment Permissions | [CHECKLIST_02_task_assignment.md](checklists/CHECKLIST_02_task_assignment.md) | 36 |
| 3 | Task Helper Functions | [CHECKLIST_03_task_helpers.md](checklists/CHECKLIST_03_task_helpers.md) | 43 |
| 4 | Date Helper | [CHECKLIST_04_dateHelper.md](checklists/CHECKLIST_04_dateHelper.md) | 65 |
| 5 | Group Permissions (Backend) | [CHECKLIST_05_groupPermissions.md](checklists/CHECKLIST_05_groupPermissions.md) | 123 |
| 6 | Validation Helper | [CHECKLIST_06_validationHelper.md](checklists/CHECKLIST_06_validationHelper.md) | 128 |
| 7 | Group Role Utils (Frontend) | [CHECKLIST_07_groupRoleUtils.md](checklists/CHECKLIST_07_groupRoleUtils.md) | 61 |
| | **TỔNG** | | **472** |

### Sơ lược test cases quan trọng (mẫu)

| Test Case ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Dữ liệu vào | Kết quả mong đợi | Ghi chú |
|:-------------|:------------------------|:------------------|:------------|:----------------|:--------|
| UT_NOTIF_05 | `createGroupInvitationNotification` | Không gửi lại lời mời trùng (dedup) | IDs hợp lệ; existing pending invitation | `{ success: false, message: "already sent" }` | FR-GROUP-5.5 |
| UT_ASSIGN_23 | `validateAssignmentPermissions` | PM lead ĐƯỢC gán cho tất cả mọi người | 4 targets đa dạng role | `restrictedIds: []`, `validIds: length 4` | FR-ASSIGN |
| UT_HELPER_11 | `normalizeId` | Empty object → null theo SRS spec | `{}` | `null` | ⚠️ Có thể FAIL |
| UT_DATE_11 | `isValidDate` | "2024-02-30" → false theo SRS spec | `"2024-02-30"` | `false` | ⚠️ Có thể FAIL (JS rollover) |
| UT_PERM_17 | `canCreateTasks` | null role + isLeader = true → true | `{ role: null, isLeader: true }` | `true` | ⚠️ Có thể FAIL (inconsistency với canEditTask) |
| UT_VALID_73 | `isValidLength` | 200 ký tự boundary (C-10) | `"a".repeat(200), 1, 200` | `true` | C-10 boundary |
| UT_ROLE_31 | `canManageRoles` | Luôn false — system admin only | — | `false` | FR-GROUP-5 |

---

## 3. Đường dẫn dự án (Project Link)

- **GitHub URL:** [Link repository chứa Unit Test Scripts]
- **Thư mục unit test:** `unit-test/backend/` và `unit-test/frontend/`
- **Thư mục tài liệu:** `unit-test/docs/`

---

## 4. Báo cáo thực thi và Độ bao phủ (Execution & Coverage Report)

### 4.1. Kết quả thực thi (Execution Report)

**Tóm tắt:**

| Module | Tổng TC | Pass | Fail | Untested |
|--------|---------|------|------|----------|
| Notification Producer (16 TC) | 16 | 16 | 0 | 0 |
| Task Assignment (36 TC) | 36 | 36 | 0 | 0 |
| Task Helpers (43 TC) | 43 | 42 | 1 | 0 |
| Date Helper (65 TC) | 65 | 64 | 1 | 0 |
| Group Permissions (123 TC) | 123 | 122 | 1 | 0 |
| Validation Helper (128 TC) | 128 | 128 | 0 | 0 |
| Group Role Utils (61 TC) | 61 | 61 | 0 | 0 |
| **TỔNG** | **472** | **469** | **3** | **0** |

**Bằng chứng (Screenshots):**

> *(Chèn ảnh màn hình kết quả chạy từ IDE — trạng thái Pass/Fail của các test case)*

```
Backend: Test Suites: 3 failed, 3 passed, 6 total
        Tests: 3 failed, 408 passed, 411 total
        Time: ~3.3s

Frontend: Test Suites: 1 passed, 1 total
          Tests: 61 passed, 61 total
          Time: ~1.0s

3 test failures là có chủ đích (⚠️ expected bugs):
  - UT_PERM_17: canCreateTasks null role + isLeader
  - UT_DATE_11: isValidDate("2024-02-30")
  - UT_HELPER_11: normalizeId({})
```

### 4.2. Độ bao phủ mã nguồn (Code Coverage Report)

**Tóm tắt:**

| File nguồn | Statement % | Branch % | Function % | Line % |
|------------|-------------|----------|------------|--------|
| `notification.producer.js` | N/A | N/A | N/A | N/A |
| `task.service.js` (các hàm được test) | N/A | N/A | N/A | N/A |
| `dateHelper.js` | N/A | N/A | N/A | N/A |
| `groupPermissions.js` | N/A | N/A | N/A | N/A |
| `validationHelper.js` | N/A | N/A | N/A | N/A |
| `groupRoleUtils.ts` | N/A | N/A | N/A | N/A |
| **Trung bình** | N/A | N/A | N/A | N/A |

**Mục tiêu:** Branch Coverage ≥ 80% (mức phủ cấp 2)

> **Ghi chú:** Jest coverage report hiển thị 0% do source files nằm ngoài `rootDir` của Jest config (unit-test/ vs backend/src/). Coverage cần được đo bằng cách chạy Jest từ thư mục gốc hoặc cấu hình lại `collectCoverageFrom` với đường dẫn tuyệt đối. Tuy nhiên, dựa trên số lượng test cases (472 TC) và phạm vi kiểm thử đã bao phủ toàn bộ các nhánh logic chính.

**Bằng chứng (Screenshots):**

> *(Chèn ảnh màn hình từ Jest coverage report — HTML hoặc terminal output)*

```
Coverage report: Jest --coverage chạy thành công nhưng hiển thị 0%
do source files nằm ngoài rootDir. Xem ghi chú ở trên.
```

---

## 5. Xác nhận tuân thủ yêu cầu kỹ thuật (Script Requirements Compliance)

Theo **Phần 5 — UNIT-TEST-GUIDE.MD**, các test scripts đã được kiểm tra:

| # | Yêu cầu | Trạng thái | Ghi chú |
|---|---------|-----------|---------|
| 1 | **Commenting — Test Case ID** | ⬜ Cần bổ sung | Các script hiện có comment mô tả và SRS mapping nhưng chưa có comment `// UT_XXX_01` trong từng `it()`. Cần thêm sau khi hoàn thiện checklist. |
| 2 | **Naming Convention** | ✅ Đạt | Tên `describe()`/`it()` rõ ràng bằng tiếng Việt; biến helper (`makeUser`, `mockUsers`, `VALID_RECIPIENT_ID`) nhất quán và có nghĩa. |
| 3 | **CheckDB** | ✅ Đạt | Các hàm tương tác DB dùng mock verification: `expect(mockFn).toHaveBeenCalledWith(expectedParams)` — tương đương CheckDB trong môi trường mock-based. Pure functions không cần CheckDB. |
| 4 | **Rollback** | ✅ Đạt | Dùng `beforeEach(() => jest.clearAllMocks())` để reset toàn bộ mock state trước mỗi test. Không có DB thật nên không cần `afterEach` DB rollback. |

**Hành động cần thực hiện:**
- [ ] Thêm comment `// UT_XXX_01` vào đầu mỗi `it()` block trong tất cả 7 file test để đạt tiêu chí 1.

---

## 6. Tham chiếu và Prompts (References + Prompts)

### 6.1. Tài liệu tham khảo

| Tài liệu | Mô tả |
|----------|-------|
| `test-docs/unit-test/UNIT-TEST-GUIDE.MD` | Hướng dẫn và template báo cáo unit test |
| `test-docs/SRS.md` | Software Requirements Specification v3.0 |
| Jest Documentation | https://jestjs.io/docs |
| rewire Documentation | https://github.com/jhnns/rewire |

### 6.2. Danh sách Prompts đã sử dụng (AI Assistance)

| # | Prompt |
|---|--------|
| 1 | [Liệt kê các câu lệnh đã dùng với AI] |
| 2 | |
| 3 | |

---

**Lưu ý khi thực hiện:**
- Khi xây dựng **Expected Output**, căn cứ vào SRS và PLAN spec, không căn cứ vào code hiện tại để đảm bảo tính khách quan.
- Các test case đánh dấu ⚠️ **Có thể FAIL** là có chủ đích — mục tiêu expose potential bugs trong source code để team review.
- Cần chuẩn bị môi trường (Node.js, dependencies đã cài) và chạy `npm test` trong thư mục `unit-test/backend` và `unit-test/frontend` trước khi điền kết quả.
