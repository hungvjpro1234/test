# TC_FOLDER_UPDATE — FR-FOLDER-3: Cập Nhật Thư Mục

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | FR-FOLDER — Quản lý thư mục |
| Feature | FR-FOLDER-3 — Cập nhật thư mục |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Ứng dụng đang chạy; tài khoản `member@test.com` / `Abc@1234` có quyền chỉnh sửa thư mục trong nhóm `Group Folder Test`; tồn tại 2 thư mục: `Folder To Edit` và `Other Folder` trong cùng nhóm; tài khoản `viewer@test.com` / `Abc@1234` chỉ có quyền xem, không có quyền sửa |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 13    |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Form chỉnh sửa thư mục hiển thị các trường: Tên, Màu sắc, Biểu tượng
- [ ] Các trường hiển thị đúng giá trị hiện tại của thư mục
- [ ] Cập nhật tên thành công → tên mới hiển thị ngay
- [ ] Cập nhật màu sắc → màu mới hiển thị ngay
- [ ] Cập nhật biểu tượng → icon mới hiển thị ngay
- [ ] Tên mới bỏ trống → thông báo lỗi, không lưu
- [ ] Tên mới trùng với thư mục khác trong cùng nhóm → thông báo lỗi, không lưu
- [ ] Người dùng không có quyền sửa → không hiển thị nút sửa hoặc thông báo lỗi quyền
- [ ] Thay đổi persist sau reload
- [ ] Thay đổi hiển thị đúng với thành viên khác trong nhóm

---

## TEST CASES

### UI TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_FOLDER_UPDATE_01 | Form chỉnh sửa hiển thị đúng | Đăng nhập `member@test.com` | 1. Vào `Group Folder Test`<br>2. Mở form chỉnh sửa `Folder To Edit` | — | Hiển thị đủ trường Tên, Màu sắc, Biểu tượng với giá trị hiện tại | | | |
| TC_FOLDER_UPDATE_02 | Giao diện responsive | Form chỉnh sửa đang mở | 1. Resize cửa sổ trình duyệt | — | Form không bị vỡ layout | | | |

---

### VALIDATION

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_FOLDER_UPDATE_03 | Tên mới bỏ trống | Form đang mở | 1. Xóa hết nội dung tên<br>2. Nhấn Lưu | Tên: _(trống)_ | Hiển thị thông báo lỗi; không lưu | | | |
| TC_FOLDER_UPDATE_04 | Tên mới chỉ khoảng trắng | Form đang mở | 1. Nhập khoảng trắng vào tên<br>2. Nhấn Lưu | Tên: `   ` | Hiển thị thông báo lỗi; không lưu | | | |
| TC_FOLDER_UPDATE_05 | Tên mới trùng với thư mục khác trong nhóm | `Other Folder` đã tồn tại | 1. Đổi tên `Folder To Edit` thành `Other Folder`<br>2. Nhấn Lưu | Tên mới: `Other Folder` | Hiển thị thông báo lỗi tên đã tồn tại; không lưu | | | |
| TC_FOLDER_UPDATE_06 | Tên mới giữ nguyên (không đổi) | Form đang mở | 1. Giữ nguyên tên thư mục<br>2. Nhấn Lưu | Tên: `Folder To Edit` (không đổi) | Lưu thành công hoặc không hiển thị lỗi | | | |

---

### FUNCTION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_FOLDER_UPDATE_07 | Cập nhật tên thư mục thành công | Đăng nhập `member@test.com` | 1. Mở form sửa `Folder To Edit`<br>2. Nhập tên mới<br>3. Nhấn Lưu | Tên mới: `Folder Renamed` | Thông báo thành công; tên mới hiển thị ngay trong danh sách | | | |
| TC_FOLDER_UPDATE_08 | Cập nhật màu sắc thành công | Đăng nhập `member@test.com` | 1. Mở form sửa thư mục<br>2. Chọn màu mới<br>3. Nhấn Lưu | Màu mới: bất kỳ màu có trong palette | Màu mới hiển thị ngay trên icon/tên thư mục | | | |
| TC_FOLDER_UPDATE_09 | Cập nhật biểu tượng thành công | Đăng nhập `member@test.com` | 1. Mở form sửa thư mục<br>2. Chọn icon mới<br>3. Nhấn Lưu | Icon mới: bất kỳ icon có trong bộ chọn | Icon mới hiển thị đúng cạnh tên thư mục | | | |
| TC_FOLDER_UPDATE_10 | Người dùng không có quyền sửa | Đăng nhập `viewer@test.com` | 1. Vào `Group Folder Test`<br>2. Cố mở form chỉnh sửa `Folder To Edit` | — | Nút sửa không hiển thị hoặc bị vô hiệu hóa; nếu cố truy cập trực tiếp → thông báo không có quyền | | | |

---

### BUSINESS FLOW

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_FOLDER_UPDATE_11 | Thay đổi persist sau reload | Đã đổi tên thành `Folder Renamed` | 1. Reload trang<br>2. Kiểm tra tên thư mục | — | Tên `Folder Renamed` vẫn giữ nguyên sau reload | | | |
| TC_FOLDER_UPDATE_12 | Thành viên khác thấy thay đổi ngay | Đã đổi tên thành `Folder Renamed` | 1. Đăng nhập `viewer@test.com`<br>2. Vào `Group Folder Test`<br>3. Kiểm tra danh sách thư mục | — | `viewer@test.com` thấy tên mới `Folder Renamed` | | | |
| TC_FOLDER_UPDATE_13 | Tên thư mục persist sau đăng nhập lại | Đã đổi tên thành `Folder Renamed` | 1. Đăng xuất<br>2. Đăng nhập lại `member@test.com`<br>3. Kiểm tra danh sách | — | Tên `Folder Renamed` vẫn đúng sau đăng nhập lại | | | |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
