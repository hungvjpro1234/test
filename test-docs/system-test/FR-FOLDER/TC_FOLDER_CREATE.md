# TC_FOLDER_CREATE — FR-FOLDER-1: Tạo Thư Mục

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | FR-FOLDER — Quản lý thư mục |
| Feature | FR-FOLDER-1 — Tạo thư mục |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Ứng dụng đang chạy; đã đăng nhập với tài khoản `member@test.com` / `Abc@1234`; đang ở trong nhóm `Group Folder Test`; đã tồn tại thư mục tên `Existing Folder` trong nhóm này |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 12    |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Form tạo thư mục hiển thị trường nhập tên
- [ ] Nút "Tạo" / "Xác nhận" tồn tại và có thể click
- [ ] Tạo thư mục thành công → thư mục xuất hiện trong danh sách ngay
- [ ] Tạo thư mục thành công → hiển thị thông báo thành công
- [ ] Tên thư mục bỏ trống → thông báo lỗi, không tạo được
- [ ] Tên thư mục chỉ khoảng trắng → thông báo lỗi
- [ ] Tên thư mục trùng với thư mục đã có trong nhóm → thông báo lỗi, không tạo được
- [ ] Tên thư mục có ký tự đặc biệt/tiếng Việt → tạo thành công
- [ ] Thư mục mới tạo persist sau reload
- [ ] Giao diện responsive

---

## TEST CASES

### UI TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_FOLDER_CREATE_01 | Form tạo thư mục hiển thị đúng | Đăng nhập, đang ở `Group Folder Test` | 1. Nhấn nút "Tạo thư mục" hoặc tương đương | — | Form/input hiển thị trường nhập tên thư mục; có nút xác nhận | | | |
| TC_FOLDER_CREATE_02 | Giao diện responsive | Form tạo thư mục đang mở | 1. Resize cửa sổ trình duyệt nhiều kích thước | — | Form không bị vỡ layout | | | |

---

### VALIDATION

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_FOLDER_CREATE_03 | Tên thư mục bỏ trống | Form đang mở | 1. Để trống tên thư mục<br>2. Nhấn Tạo | Tên: _(trống)_ | Hiển thị thông báo lỗi; thư mục không được tạo | | | |
| TC_FOLDER_CREATE_04 | Tên thư mục chỉ khoảng trắng | Form đang mở | 1. Nhập khoảng trắng vào tên<br>2. Nhấn Tạo | Tên: `   ` | Hiển thị thông báo lỗi; thư mục không được tạo | | | |
| TC_FOLDER_CREATE_05 | Tên thư mục trùng tên đã tồn tại trong nhóm | Đã có `Existing Folder` trong nhóm | 1. Nhập tên trùng<br>2. Nhấn Tạo | Tên: `Existing Folder` | Hiển thị thông báo lỗi tên đã tồn tại; không tạo thư mục mới | | | |
| TC_FOLDER_CREATE_06 | Tên thư mục trùng nhưng khác hoa/thường (nếu áp dụng) | Đã có `Existing Folder` | 1. Nhập tên khác hoa thường<br>2. Nhấn Tạo | Tên: `existing folder` | Tùy logic: lỗi hoặc cho phép — ghi nhận hành vi thực tế | | | Cần xác nhận business rule |

---

### FUNCTION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_FOLDER_CREATE_07 | Tạo thư mục thành công với tên hợp lệ | Đăng nhập, đang ở `Group Folder Test` | 1. Mở form tạo thư mục<br>2. Nhập tên<br>3. Nhấn Tạo | Tên: `New Folder Alpha` | Thông báo thành công; `New Folder Alpha` xuất hiện trong danh sách thư mục | | | |
| TC_FOLDER_CREATE_08 | Tạo thư mục với tên tiếng Việt và ký tự đặc biệt | Form đang mở | 1. Nhập tên có tiếng Việt và ký tự đặc biệt<br>2. Nhấn Tạo | Tên: `Dự Án #1 & Sprint` | Tạo thành công; tên hiển thị đúng | | | |
| TC_FOLDER_CREATE_09 | Tạo nhiều thư mục khác tên nhau trong cùng nhóm | Đã có `New Folder Alpha` | 1. Tạo thêm thư mục với tên khác | Tên: `New Folder Beta` | Cả 2 thư mục đều tồn tại và hiển thị trong danh sách | | | |
| TC_FOLDER_CREATE_10 | Tên thư mục trùng giữa 2 nhóm khác nhau (nếu áp dụng) | Có 2 nhóm khác nhau | 1. Tạo thư mục `Alpha` ở nhóm A<br>2. Tạo thư mục `Alpha` ở nhóm B | Tên: `Alpha` (ở 2 nhóm) | Cả 2 đều tạo thành công (tên chỉ unique trong cùng nhóm) | | | |

---

### BUSINESS FLOW

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_FOLDER_CREATE_11 | Thư mục mới hiển thị ngay trong danh sách (không reload) | Đang ở `Group Folder Test` | 1. Tạo thư mục thành công<br>2. Quan sát danh sách ngay sau đó | Tên: `New Folder Gamma` | Thư mục xuất hiện ngay mà không cần reload | | | |
| TC_FOLDER_CREATE_12 | Thư mục persist sau reload | Đã tạo `New Folder Gamma` | 1. Reload trang<br>2. Kiểm tra danh sách thư mục | — | `New Folder Gamma` vẫn hiển thị sau reload | | | |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
