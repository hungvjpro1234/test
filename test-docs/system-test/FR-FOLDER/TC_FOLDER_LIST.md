# TC_FOLDER_LIST — FR-FOLDER-2: Xem Danh Sách Thư Mục

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | FR-FOLDER — Quản lý thư mục |
| Feature | FR-FOLDER-2 — Xem danh sách thư mục |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Ứng dụng đang chạy; tài khoản `member@test.com` / `Abc@1234` là thành viên của nhóm `Group Folder Test`; nhóm có ≥ 3 thư mục; tài khoản `restricted@test.com` / `Abc@1234` bị hạn chế quyền xem 1 thư mục cụ thể (`Restricted Folder`) |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 8     |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Màn hình nhóm hiển thị danh sách tất cả thư mục mà người dùng có quyền xem
- [ ] Mỗi thư mục hiển thị đủ thông tin cơ bản (tên, icon/màu nếu có)
- [ ] Thư mục mà người dùng không có quyền xem không hiển thị trong danh sách
- [ ] Danh sách cập nhật khi thư mục được tạo mới hoặc xóa
- [ ] Giao diện responsive

---

## TEST CASES

### UI TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_FOLDER_LIST_01 | Danh sách thư mục hiển thị đúng giao diện | Đăng nhập `member@test.com`, vào `Group Folder Test` | 1. Mở danh sách thư mục của nhóm | — | Hiển thị danh sách thư mục với tên, icon/màu (nếu có); layout gọn, không lỗi | | | |
| TC_FOLDER_LIST_02 | Giao diện responsive | Đang xem danh sách thư mục | 1. Resize cửa sổ trình duyệt | — | Danh sách không bị vỡ layout ở mọi kích thước | | | |

---

### FUNCTION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_FOLDER_LIST_03 | Người dùng chỉ thấy thư mục có quyền xem | Đăng nhập `restricted@test.com` | 1. Vào `Group Folder Test`<br>2. Kiểm tra danh sách thư mục | — | `Restricted Folder` không hiển thị; các thư mục có quyền xem vẫn hiển thị bình thường | | | |
| TC_FOLDER_LIST_04 | Thành viên đủ quyền thấy tất cả thư mục | Đăng nhập `member@test.com` | 1. Vào `Group Folder Test`<br>2. Đếm số thư mục hiển thị | — | Tất cả thư mục (không bị hạn chế) đều hiển thị đầy đủ | | | |
| TC_FOLDER_LIST_05 | Danh sách cập nhật sau khi tạo thư mục mới | Đăng nhập `member@test.com` | 1. Ghi nhớ số thư mục hiện tại<br>2. Tạo thêm 1 thư mục<br>3. Kiểm tra danh sách | Tên mới: `Newly Added Folder` | Thư mục mới xuất hiện trong danh sách | | | |
| TC_FOLDER_LIST_06 | Danh sách cập nhật sau khi xóa thư mục | Đăng nhập `member@test.com` | 1. Ghi nhớ số thư mục hiện tại<br>2. Xóa 1 thư mục<br>3. Kiểm tra danh sách | — | Thư mục đã xóa không còn trong danh sách | | | |

---

### BUSINESS FLOW

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_FOLDER_LIST_07 | Danh sách thư mục persist sau reload | Đăng nhập `member@test.com` | 1. Ghi nhớ danh sách thư mục<br>2. Reload trang<br>3. Kiểm tra lại | — | Danh sách thư mục không thay đổi sau reload | | | |
| TC_FOLDER_LIST_08 | Danh sách thư mục độc lập theo nhóm | Đăng nhập `member@test.com`, thành viên ≥ 2 nhóm | 1. Xem thư mục nhóm A<br>2. Chuyển sang nhóm B<br>3. Xem thư mục nhóm B | — | Mỗi nhóm hiển thị đúng danh sách thư mục của nhóm đó, không lẫn dữ liệu | | | |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
