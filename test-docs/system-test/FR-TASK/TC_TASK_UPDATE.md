# TC_TASK_UPDATE — FR-TASK-4: Cập Nhật Công Việc

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | FR-TASK — Quản lý công việc |
| Feature | FR-TASK-4 — Cập nhật công việc |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Ứng dụng đang chạy; `member@test.com` / `Abc@1234` có quyền chỉnh sửa công việc trong `Group Task Test`; tồn tại `Task Update Test` với đầy đủ thông tin; `viewer@test.com` / `Abc@1234` chỉ có quyền xem |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 16    |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Người có quyền có thể mở form chỉnh sửa công việc
- [ ] Cập nhật tiêu đề thành công → hiển thị ngay
- [ ] Cập nhật mô tả thành công
- [ ] Cập nhật trạng thái thành công → hiển thị ngay trong danh sách
- [ ] Cập nhật độ ưu tiên thành công
- [ ] Cập nhật ngày đến hạn thành công
- [ ] Tiêu đề vượt 200 ký tự → lỗi, không lưu
- [ ] Tiêu đề bỏ trống → lỗi, không lưu
- [ ] Mô tả vượt 2000 ký tự → lỗi, không lưu
- [ ] Người không có quyền sửa → không hiển thị nút sửa hoặc lỗi quyền
- [ ] Thay đổi persist sau reload và đăng nhập lại
- [ ] Thành viên khác thấy thay đổi

---

## TEST CASES

### UI TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_TASK_UPDATE_01 | Form chỉnh sửa hiển thị đúng giá trị hiện tại | Đăng nhập `member@test.com` | 1. Mở form chỉnh sửa `Task Update Test` | — | Tất cả trường hiển thị đúng giá trị hiện tại của task | | | |
| TC_TASK_UPDATE_02 | Người không có quyền không thấy nút sửa | Đăng nhập `viewer@test.com` | 1. Mở chi tiết `Task Update Test`<br>2. Kiểm tra nút chỉnh sửa | — | Nút sửa không hiển thị hoặc bị disable | | | |
| TC_TASK_UPDATE_03 | Giao diện responsive | Form chỉnh sửa đang mở | 1. Resize cửa sổ | — | Form không bị vỡ layout | | | |

---

### VALIDATION

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_TASK_UPDATE_04 | Tiêu đề bỏ trống khi sửa | Form đang mở | 1. Xóa hết tiêu đề<br>2. Nhấn Lưu | Tiêu đề: _(trống)_ | Hiển thị thông báo lỗi; không lưu | | | |
| TC_TASK_UPDATE_05 | Tiêu đề chỉ khoảng trắng | Form đang mở | 1. Nhập khoảng trắng vào tiêu đề<br>2. Nhấn Lưu | Tiêu đề: `   ` | Hiển thị thông báo lỗi; không lưu | | | |
| TC_TASK_UPDATE_06 | Tiêu đề đúng 200 ký tự | Form đang mở | 1. Nhập tiêu đề 200 ký tự<br>2. Nhấn Lưu | Tiêu đề: chuỗi 200 ký tự | Lưu thành công | | | Boundary value |
| TC_TASK_UPDATE_07 | Tiêu đề 201 ký tự | Form đang mở | 1. Nhập tiêu đề 201 ký tự<br>2. Nhấn Lưu | Tiêu đề: chuỗi 201 ký tự | Hiển thị thông báo lỗi; không lưu | | | Boundary value |
| TC_TASK_UPDATE_08 | Mô tả 2001 ký tự | Form đang mở | 1. Nhập mô tả 2001 ký tự<br>2. Nhấn Lưu | Mô tả: chuỗi 2001 ký tự | Hiển thị thông báo lỗi; không lưu | | | Boundary value |

---

### FUNCTION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_TASK_UPDATE_09 | Cập nhật tiêu đề thành công | Đăng nhập `member@test.com` | 1. Mở form sửa `Task Update Test`<br>2. Đổi tiêu đề<br>3. Nhấn Lưu | Tiêu đề mới: `Task Updated Title` | Tiêu đề mới hiển thị ngay trên chi tiết và danh sách | | | |
| TC_TASK_UPDATE_10 | Cập nhật trạng thái thành công | Đăng nhập `member@test.com` | 1. Đổi trạng thái sang `Done`<br>2. Nhấn Lưu | Trạng thái: `Done` | Trạng thái mới hiển thị ngay; task chuyển cột đúng (nếu có Kanban) | | | |
| TC_TASK_UPDATE_11 | Cập nhật độ ưu tiên thành công | Đăng nhập `member@test.com` | 1. Đổi độ ưu tiên sang `High`<br>2. Nhấn Lưu | Độ ưu tiên: `High` | Độ ưu tiên mới hiển thị đúng | | | |
| TC_TASK_UPDATE_12 | Cập nhật ngày đến hạn thành công | Đăng nhập `member@test.com` | 1. Chọn ngày đến hạn mới<br>2. Nhấn Lưu | Ngày: ngày hợp lệ trong tương lai | Ngày đến hạn mới hiển thị đúng | | | |
| TC_TASK_UPDATE_13 | Người không có quyền cố sửa qua API/URL | Đăng nhập `viewer@test.com` | 1. Cố gửi request cập nhật task | — | Hệ thống từ chối; thông báo không có quyền | | | |

---

### BUSINESS FLOW

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_TASK_UPDATE_14 | Thay đổi persist sau reload | Đã cập nhật thành công | 1. Reload trang<br>2. Kiểm tra thông tin task | — | Tất cả thay đổi vẫn được giữ nguyên | | | |
| TC_TASK_UPDATE_15 | Thành viên khác thấy thay đổi | Đã cập nhật trạng thái | 1. Đăng nhập tài khoản khác<br>2. Xem task | — | Thành viên khác thấy trạng thái mới | | | |
| TC_TASK_UPDATE_16 | Thay đổi trạng thái phản ánh đúng trên danh sách | Đã đổi trạng thái `Task Update Test` → `Done` | 1. Quay lại danh sách task<br>2. Kiểm tra trạng thái hiển thị | — | Danh sách hiển thị đúng trạng thái mới; bộ lọc trạng thái hoạt động đúng | | | |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
