# TC_GROUP_SWITCH — FR-GROUP-6: Chuyển Đổi Nhóm Đang Làm Việc

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | FR-GROUP — Quản lý nhóm & Workspace |
| Feature | FR-GROUP-6 — Chuyển đổi nhóm đang làm việc |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Ứng dụng đang chạy; tài khoản `member@test.com` / `Abc@1234` là thành viên của ≥ 2 nhóm (`Group A Test`, `Group B Test`); tồn tại nhóm `Private Group Test` mà `member@test.com` **không** là thành viên |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 9     |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Danh sách nhóm cho phép click để chuyển nhóm
- [ ] Chuyển sang nhóm → giao diện hiển thị công việc của nhóm đó
- [ ] Chuyển sang nhóm → hiển thị chat của nhóm đó
- [ ] Chuyển sang nhóm → tên nhóm hiển thị đúng trên header/breadcrumb
- [ ] Cố truy cập nhóm không thuộc về → thông báo không có quyền
- [ ] Giao diện responsive sau khi chuyển nhóm

---

## TEST CASES

### UI TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_GROUP_SWITCH_01 | Danh sách nhóm có thể click để chuyển | Đăng nhập `member@test.com` | 1. Quan sát sidebar/danh sách nhóm | — | Các nhóm hiển thị dạng có thể click; nhóm đang active được highlight | | | |
| TC_GROUP_SWITCH_02 | Header/breadcrumb hiển thị đúng tên nhóm sau chuyển | Đăng nhập `member@test.com` | 1. Chuyển sang `Group A Test`<br>2. Kiểm tra header<br>3. Chuyển sang `Group B Test`<br>4. Kiểm tra header | — | Header/breadcrumb hiển thị đúng tên nhóm đang active | | | |
| TC_GROUP_SWITCH_03 | Giao diện responsive sau chuyển nhóm | Đang ở `Group A Test` | 1. Chuyển sang `Group B Test`<br>2. Resize cửa sổ | — | Layout không bị vỡ sau chuyển nhóm | | | |

---

### FUNCTION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_GROUP_SWITCH_04 | Chuyển sang nhóm khác thành công | Đăng nhập `member@test.com`, đang ở `Group A Test` | 1. Click vào `Group B Test` trong danh sách | — | Giao diện chuyển sang `Group B Test`; hiển thị công việc và chat của `Group B Test` | | | |
| TC_GROUP_SWITCH_05 | Công việc hiển thị đúng theo nhóm | Đang ở `Group A Test` sau khi chuyển | 1. Kiểm tra danh sách task/folder đang hiển thị | — | Chỉ hiển thị công việc thuộc `Group A Test`, không lẫn dữ liệu nhóm khác | | | |
| TC_GROUP_SWITCH_06 | Chat hiển thị đúng theo nhóm | Đang ở `Group A Test` sau khi chuyển | 1. Mở tab chat<br>2. Kiểm tra lịch sử chat | — | Hiển thị đúng lịch sử chat của `Group A Test` | | | |
| TC_GROUP_SWITCH_07 | Cố truy cập nhóm không thuộc về | Đăng nhập `member@test.com` | 1. Cố click hoặc truy cập URL của `Private Group Test` | — | Hệ thống hiển thị thông báo không có quyền truy cập; không hiển thị nội dung nhóm | | | |

---

### BUSINESS FLOW

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_GROUP_SWITCH_08 | Chuyển nhiều lần liên tiếp không bị lỗi | Đăng nhập `member@test.com` | 1. Chuyển nhanh qua lại giữa `Group A Test` và `Group B Test` nhiều lần | — | Mỗi lần chuyển đều hiển thị đúng nội dung nhóm; không bị lỗi hoặc hiển thị sai dữ liệu | | | |
| TC_GROUP_SWITCH_09 | Nhóm active persist sau reload | Đang ở `Group B Test` | 1. Reload trang | — | Sau reload vẫn ở `Group B Test` (hoặc trở về nhóm mặc định — tùy business rule) | | | |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
