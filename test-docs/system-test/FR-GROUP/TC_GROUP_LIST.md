# TC_GROUP_LIST — FR-GROUP-2: Xem Danh Sách Nhóm

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | FR-GROUP — Quản lý nhóm & Workspace |
| Feature | FR-GROUP-2 — Xem danh sách nhóm |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Ứng dụng đang chạy; có tài khoản thường `member@test.com` / `Abc@1234` là thành viên của ≥ 2 nhóm; có tài khoản admin `admin@test.com` / `Abc@1234`; tồn tại ít nhất 1 nhóm mà `member@test.com` **không** thuộc về |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 9     |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Màn hình nhóm hiển thị danh sách nhóm mà người dùng là thành viên
- [ ] Mỗi nhóm hiển thị đủ thông tin cơ bản (tên, ảnh/icon)
- [ ] Người dùng thường **không** thấy nhóm mà họ không là thành viên
- [ ] Admin có thể xem toàn bộ nhóm trong hệ thống
- [ ] Danh sách được cập nhật khi tham gia/rời nhóm
- [ ] Giao diện responsive khi resize

---

## TEST CASES

### UI TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_GROUP_LIST_01 | Hiển thị danh sách nhóm đúng giao diện | Đăng nhập `member@test.com` | 1. Vào màn hình nhóm | — | Danh sách nhóm hiển thị tên, icon/avatar mỗi nhóm; layout gọn, không lỗi | | | |
| TC_GROUP_LIST_02 | Giao diện responsive | Đang xem danh sách nhóm | 1. Resize cửa sổ trình duyệt nhiều kích thước | — | Danh sách không bị vỡ layout | | | |

---

### FUNCTION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_GROUP_LIST_03 | Người dùng chỉ thấy nhóm của mình | Đăng nhập `member@test.com` | 1. Vào màn hình nhóm<br>2. Đếm/kiểm tra danh sách hiển thị | — | Chỉ thấy các nhóm mà `member@test.com` là thành viên; không thấy nhóm khác | | | |
| TC_GROUP_LIST_04 | Admin thấy toàn bộ nhóm | Đăng nhập `admin@test.com` | 1. Vào màn hình nhóm | — | Danh sách hiển thị tất cả nhóm trong hệ thống, kể cả nhóm admin không là thành viên | | | |
| TC_GROUP_LIST_05 | Danh sách cập nhật sau khi tham gia nhóm | Đăng nhập `member@test.com` | 1. Ghi nhớ số nhóm hiện tại<br>2. Tham gia thêm 1 nhóm công khai<br>3. Quay lại danh sách nhóm | — | Nhóm mới xuất hiện trong danh sách | | | |
| TC_GROUP_LIST_06 | Danh sách cập nhật sau khi rời nhóm | Đăng nhập `member@test.com` | 1. Ghi nhớ số nhóm hiện tại<br>2. Rời khỏi 1 nhóm<br>3. Quay lại danh sách | — | Nhóm đã rời không còn hiển thị trong danh sách | | | |

---

### BUSINESS FLOW

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_GROUP_LIST_07 | Danh sách nhóm persist sau reload | Đăng nhập `member@test.com` | 1. Ghi nhớ danh sách nhóm<br>2. Reload trang<br>3. Kiểm tra lại danh sách | — | Danh sách nhóm vẫn giữ nguyên sau reload | | | |
| TC_GROUP_LIST_08 | Danh sách nhóm persist sau đăng nhập lại | Đăng nhập `member@test.com` | 1. Ghi nhớ danh sách nhóm<br>2. Đăng xuất<br>3. Đăng nhập lại<br>4. Kiểm tra danh sách | — | Danh sách nhóm vẫn giữ nguyên sau đăng nhập lại | | | |
| TC_GROUP_LIST_09 | Danh sách nhóm độc lập giữa các tài khoản | Có 2 tài khoản với nhóm khác nhau | 1. Đăng nhập `member@test.com` → ghi nhớ danh sách<br>2. Đăng xuất<br>3. Đăng nhập `admin@test.com` → ghi nhớ danh sách | — | Mỗi tài khoản thấy danh sách nhóm đúng với quyền của mình | | | |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
