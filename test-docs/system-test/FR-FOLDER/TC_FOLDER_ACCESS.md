# TC_FOLDER_ACCESS — FR-FOLDER-5: Kiểm Soát Quyền Truy Cập Thư Mục

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | FR-FOLDER — Quản lý thư mục |
| Feature | FR-FOLDER-5 — Kiểm soát quyền truy cập thư mục |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Ứng dụng đang chạy; tài khoản `admin_group@test.com` / `Abc@1234` là Admin của nhóm `Group Folder Test`; tài khoản `allowed@test.com` / `Abc@1234` được cấp quyền xem `Restricted Folder`; tài khoản `restricted@test.com` / `Abc@1234` **không** có quyền xem `Restricted Folder`; `Restricted Folder` có ≥ 2 task bên trong |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 14    |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Admin có thể mở cài đặt quyền truy cập của thư mục
- [ ] Admin có thể thêm/xóa thành viên trong danh sách được phép xem
- [ ] Thành viên có quyền → thấy thư mục trong danh sách
- [ ] Thành viên có quyền → thấy toàn bộ task bên trong thư mục
- [ ] Thành viên không có quyền → không thấy thư mục trong danh sách
- [ ] Thành viên không có quyền → URL trực tiếp của thư mục bị chặn
- [ ] Thành viên không có quyền → không thấy task bên trong thư mục
- [ ] Khi thu hồi quyền → thành viên không còn thấy thư mục
- [ ] Khi cấp thêm quyền → thành viên thấy thư mục ngay
- [ ] Quyền truy cập persist sau reload và đăng nhập lại

---

## TEST CASES

### UI TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_FOLDER_ACCESS_01 | Giao diện cài đặt quyền truy cập thư mục | Đăng nhập `admin_group@test.com` | 1. Vào `Group Folder Test`<br>2. Mở cài đặt của `Restricted Folder`<br>3. Tìm tùy chọn quản lý quyền truy cập | — | Hiển thị danh sách thành viên được cấp quyền; có thể thêm/xóa thành viên | | | |
| TC_FOLDER_ACCESS_02 | Giao diện responsive | Cài đặt quyền đang mở | 1. Resize cửa sổ trình duyệt | — | Giao diện không bị vỡ layout | | | |

---

### FUNCTION TEST — Giới hạn quyền xem

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_FOLDER_ACCESS_03 | Thành viên có quyền thấy thư mục | Đăng nhập `allowed@test.com` | 1. Vào `Group Folder Test`<br>2. Kiểm tra danh sách thư mục | — | `Restricted Folder` hiển thị trong danh sách của `allowed@test.com` | | | |
| TC_FOLDER_ACCESS_04 | Thành viên có quyền thấy task bên trong | Đăng nhập `allowed@test.com` | 1. Vào `Restricted Folder`<br>2. Kiểm tra danh sách task | — | Tất cả task trong `Restricted Folder` hiển thị đầy đủ | | | |
| TC_FOLDER_ACCESS_05 | Thành viên không có quyền không thấy thư mục | Đăng nhập `restricted@test.com` | 1. Vào `Group Folder Test`<br>2. Kiểm tra danh sách thư mục | — | `Restricted Folder` **không** xuất hiện trong danh sách | | | |
| TC_FOLDER_ACCESS_06 | Thành viên không có quyền bị chặn URL trực tiếp | Đăng nhập `restricted@test.com` | 1. Truy cập URL trực tiếp của `Restricted Folder` | — | Hệ thống hiển thị lỗi hoặc trang không có quyền; không hiển thị nội dung thư mục | | | |
| TC_FOLDER_ACCESS_07 | Thành viên không có quyền không thấy task bên trong | Đăng nhập `restricted@test.com` | 1. Kiểm tra danh sách task toàn nhóm<br>2. Tìm task thuộc `Restricted Folder` | — | Task thuộc `Restricted Folder` không hiển thị trong danh sách task của `restricted@test.com` | | | |

---

### FUNCTION TEST — Cấp và thu hồi quyền

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_FOLDER_ACCESS_08 | Admin cấp quyền cho thành viên mới | Đăng nhập `admin_group@test.com`, `restricted@test.com` chưa có quyền | 1. Mở cài đặt quyền `Restricted Folder`<br>2. Thêm `restricted@test.com` vào danh sách<br>3. Lưu | Thêm: `restricted@test.com` | `restricted@test.com` được thêm vào danh sách; có thể thấy thư mục ngay | | | |
| TC_FOLDER_ACCESS_09 | Admin thu hồi quyền | Đăng nhập `admin_group@test.com`, `allowed@test.com` đang có quyền | 1. Mở cài đặt quyền `Restricted Folder`<br>2. Xóa `allowed@test.com` khỏi danh sách<br>3. Lưu | Xóa: `allowed@test.com` | `allowed@test.com` không còn thấy `Restricted Folder` | | | ⚠️ Cấp lại quyền sau test |
| TC_FOLDER_ACCESS_10 | Thành viên thấy thư mục ngay sau khi được cấp quyền | Admin vừa cấp quyền cho `restricted@test.com` | 1. Đăng nhập `restricted@test.com`<br>2. Vào `Group Folder Test` (không reload nếu đang đăng nhập) | — | `Restricted Folder` xuất hiện trong danh sách ngay hoặc sau lần reload đầu tiên | | | |
| TC_FOLDER_ACCESS_11 | Thành viên không thấy thư mục ngay sau bị thu hồi quyền | Admin vừa thu hồi quyền của `allowed@test.com` | 1. Đăng nhập `allowed@test.com`<br>2. Kiểm tra danh sách thư mục | — | `Restricted Folder` không còn hiển thị | | | ⚠️ Cấp lại quyền sau test |

---

### BUSINESS FLOW

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_FOLDER_ACCESS_12 | Quyền truy cập persist sau reload | `allowed@test.com` có quyền xem | 1. Đăng nhập `allowed@test.com`<br>2. Kiểm tra thấy `Restricted Folder`<br>3. Reload trang<br>4. Kiểm tra lại | — | `Restricted Folder` vẫn hiển thị sau reload | | | |
| TC_FOLDER_ACCESS_13 | Quyền truy cập persist sau đăng nhập lại | `allowed@test.com` có quyền xem | 1. Đăng xuất `allowed@test.com`<br>2. Đăng nhập lại<br>3. Kiểm tra danh sách thư mục | — | `Restricted Folder` vẫn hiển thị sau đăng nhập lại | | | |
| TC_FOLDER_ACCESS_14 | Quyền truy cập độc lập theo từng thành viên | `allowed@test.com` có quyền, `restricted@test.com` không có | 1. Đăng nhập lần lượt 2 tài khoản<br>2. Kiểm tra danh sách thư mục mỗi tài khoản | — | `allowed@test.com` thấy `Restricted Folder`; `restricted@test.com` không thấy | | | |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
