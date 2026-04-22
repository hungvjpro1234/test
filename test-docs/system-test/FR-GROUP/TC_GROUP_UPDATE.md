# TC_GROUP_UPDATE — FR-GROUP-3: Cập Nhật Thông Tin Nhóm

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | FR-GROUP — Quản lý nhóm & Workspace |
| Feature | FR-GROUP-3 — Cập nhật thông tin nhóm |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Ứng dụng đang chạy; tài khoản `owner@test.com` / `Abc@1234` là Owner của nhóm `Group Edit Test`; tài khoản `member@test.com` / `Abc@1234` là thành viên thường (không có quyền sửa) của cùng nhóm đó |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 13    |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Form chỉnh sửa nhóm hiển thị đầy đủ các trường: Tên, Mô tả, Màu sắc, Biểu tượng
- [ ] Các trường hiển thị đúng giá trị hiện tại của nhóm
- [ ] Cập nhật tên → thành công, thông tin mới hiển thị ngay
- [ ] Cập nhật mô tả → thành công
- [ ] Cập nhật màu sắc → thành công, màu mới hiển thị ngay
- [ ] Cập nhật biểu tượng → thành công, icon mới hiển thị ngay
- [ ] Tên nhóm bỏ trống khi sửa → lỗi
- [ ] Tên nhóm vượt 256 ký tự → lỗi
- [ ] Mô tả vượt 2000 ký tự → lỗi
- [ ] Thành viên không có quyền cố sửa → thông báo lỗi quyền truy cập
- [ ] Thay đổi persist sau reload
- [ ] Giao diện responsive

---

## TEST CASES

### UI TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_GROUP_UPDATE_01 | Form chỉnh sửa hiển thị đúng | Đăng nhập `owner@test.com` | 1. Vào nhóm `Group Edit Test`<br>2. Mở form chỉnh sửa nhóm | — | Hiển thị đủ trường Tên, Mô tả, Màu sắc, Biểu tượng với giá trị hiện tại | | | |
| TC_GROUP_UPDATE_02 | Giao diện responsive | Form chỉnh sửa đang mở | 1. Resize cửa sổ trình duyệt | — | Form không bị vỡ layout | | | |

---

### VALIDATION

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_GROUP_UPDATE_03 | Tên nhóm bỏ trống khi sửa | Đăng nhập `owner@test.com`, form đang mở | 1. Xóa hết tên nhóm<br>2. Nhấn Lưu | Tên: _(trống)_ | Hiển thị thông báo lỗi, không lưu | | | |
| TC_GROUP_UPDATE_04 | Tên nhóm chỉ khoảng trắng | Form đang mở | 1. Nhập khoảng trắng vào tên<br>2. Nhấn Lưu | Tên: `   ` | Hiển thị thông báo lỗi, không lưu | | | |
| TC_GROUP_UPDATE_05 | Tên nhóm đúng 256 ký tự | Form đang mở | 1. Nhập tên 256 ký tự<br>2. Nhấn Lưu | Tên: `A*256` | Cập nhật thành công | | | Boundary value |
| TC_GROUP_UPDATE_06 | Tên nhóm 257 ký tự | Form đang mở | 1. Nhập tên 257 ký tự<br>2. Nhấn Lưu | Tên: `A*257` | Hiển thị thông báo lỗi, không lưu | | | Boundary value |
| TC_GROUP_UPDATE_07 | Mô tả đúng 2000 ký tự | Form đang mở | 1. Nhập mô tả 2000 ký tự<br>2. Nhấn Lưu | Mô tả: chuỗi 2000 ký tự | Cập nhật thành công | | | Boundary value |
| TC_GROUP_UPDATE_08 | Mô tả 2001 ký tự | Form đang mở | 1. Nhập mô tả 2001 ký tự<br>2. Nhấn Lưu | Mô tả: chuỗi 2001 ký tự | Hiển thị thông báo lỗi, không lưu | | | Boundary value |

---

### FUNCTION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_GROUP_UPDATE_09 | Cập nhật tên nhóm thành công | Đăng nhập `owner@test.com` | 1. Mở form sửa nhóm<br>2. Đổi tên nhóm<br>3. Nhấn Lưu | Tên mới: `Group Edit Test - Updated` | Thông báo thành công, tên mới hiển thị ngay | | | |
| TC_GROUP_UPDATE_10 | Cập nhật mô tả, màu sắc, icon | Đăng nhập `owner@test.com` | 1. Mở form sửa nhóm<br>2. Thay đổi mô tả, màu sắc, biểu tượng<br>3. Nhấn Lưu | Mô tả mới, màu mới, icon mới | Tất cả thay đổi được lưu và hiển thị đúng | | | |
| TC_GROUP_UPDATE_11 | Thành viên không có quyền sửa | Đăng nhập `member@test.com` | 1. Vào nhóm `Group Edit Test`<br>2. Cố mở form chỉnh sửa nhóm | — | Hệ thống hiển thị thông báo không có quyền truy cập; nút sửa không hiển thị hoặc bị vô hiệu hóa | | | |

---

### BUSINESS FLOW

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_GROUP_UPDATE_12 | Thay đổi persist sau reload | Đã cập nhật tên nhóm thành công | 1. Reload trang<br>2. Kiểm tra tên nhóm | — | Tên nhóm mới vẫn được giữ nguyên sau reload | | | |
| TC_GROUP_UPDATE_13 | Thành viên khác thấy thay đổi | Đã cập nhật tên nhóm thành công | 1. Đăng nhập `member@test.com`<br>2. Kiểm tra tên nhóm trong danh sách | — | `member@test.com` thấy tên nhóm mới | | | |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
