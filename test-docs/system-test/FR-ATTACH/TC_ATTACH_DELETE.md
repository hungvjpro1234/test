# TC_ATTACH_DELETE — FR-ATTACH-2: Xóa File Đính Kèm

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | FR-ATTACH — File đính kèm |
| Feature | FR-ATTACH-2 — Xóa file đính kèm |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Ứng dụng đang chạy; `member@test.com` / `Abc@1234` có quyền xóa file đính kèm trong `Group Task Test`; tồn tại task `Task Attach Test` có ít nhất 2 file: `file_to_delete.jpg` (tải bởi `member@test.com`) và `other_member_file.pdf` (tải bởi `other@test.com`); `viewer@test.com` / `Abc@1234` chỉ có quyền xem; **⚠️ Tải lại file sau mỗi lần test xóa thành công** |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 12    |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Nút/tùy chọn xóa hiển thị cạnh file đính kèm với người có quyền
- [ ] Có hộp thoại xác nhận trước khi xóa
- [ ] Nhấn Hủy → file không bị xóa
- [ ] Xóa thành công → file biến khỏi danh sách ngay
- [ ] Xóa file không tồn tại → thông báo không tìm thấy
- [ ] Người không có quyền xóa → không hiển thị nút xóa hoặc lỗi quyền
- [ ] Xóa 1 file không ảnh hưởng đến các file khác trong task
- [ ] Sau khi xóa → link trực tiếp của file bị vô hiệu hóa
- [ ] ⚠️ Hành động không thể hoàn tác

---

## TEST CASES

### UI TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_ATTACH_DELETE_01 | Nút xóa hiển thị với người có quyền | Đăng nhập `member@test.com`, mở `Task Attach Test` | 1. Quan sát danh sách file đính kèm | — | Nút/icon xóa hiển thị cạnh mỗi file; có thể click | | | |
| TC_ATTACH_DELETE_02 | Hộp thoại xác nhận có cảnh báo rõ ràng | Đăng nhập `member@test.com` | 1. Nhấn xóa `file_to_delete.jpg` | — | Hộp thoại xác nhận xuất hiện với nội dung cảnh báo; có nút Hủy và Xác nhận | | | |
| TC_ATTACH_DELETE_03 | Giao diện responsive | Danh sách file đính kèm đang hiển thị | 1. Resize cửa sổ trình duyệt | — | Danh sách không bị vỡ layout | | | |

---

### VALIDATION

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_ATTACH_DELETE_04 | Xóa file không tồn tại (qua API) | — | 1. Gửi request xóa file với ID không tồn tại | File ID: không tồn tại | Hệ thống trả về thông báo không tìm thấy file; không có lỗi crash | | | Cần test qua API/DevTools |
| TC_ATTACH_DELETE_05 | Người không có quyền không thấy nút xóa | Đăng nhập `viewer@test.com` | 1. Mở `Task Attach Test`<br>2. Quan sát danh sách file | — | Nút xóa không hiển thị với `viewer@test.com` | | | |

---

### FUNCTION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_ATTACH_DELETE_06 | Hủy xóa → file không bị xóa | Hộp thoại xác nhận đang mở | 1. Nhấn Hủy trong hộp thoại | — | Hộp thoại đóng; `file_to_delete.jpg` vẫn còn trong danh sách | | | |
| TC_ATTACH_DELETE_07 | Xóa file thành công | Đăng nhập `member@test.com` | 1. Nhấn xóa `file_to_delete.jpg`<br>2. Xác nhận | — | Thông báo thành công; `file_to_delete.jpg` biến khỏi danh sách ngay | | | ⚠️ Tải lại file sau test |
| TC_ATTACH_DELETE_08 | Xóa 1 file không ảnh hưởng file khác | Sau khi xóa `file_to_delete.jpg` | 1. Kiểm tra danh sách file còn lại | — | `other_member_file.pdf` và các file khác vẫn còn nguyên trong danh sách | | | ⚠️ Tải lại file sau test |
| TC_ATTACH_DELETE_09 | Người không có quyền cố xóa qua API | Đăng nhập `viewer@test.com` | 1. Gửi request xóa file `file_to_delete.jpg` | — | Hệ thống từ chối; thông báo không có quyền | | | |

---

### BUSINESS FLOW

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_ATTACH_DELETE_10 | Danh sách cập nhật ngay sau xóa (không reload) | Đang xem danh sách file | 1. Xóa `file_to_delete.jpg`<br>2. Quan sát danh sách | — | File biến mất ngay, số lượng file giảm 1 | | | ⚠️ Tải lại file sau test |
| TC_ATTACH_DELETE_11 | Thành viên khác không còn thấy file đã xóa | Đã xóa `file_to_delete.jpg` | 1. Đăng nhập `other@test.com`<br>2. Mở `Task Attach Test`<br>3. Kiểm tra danh sách | — | `file_to_delete.jpg` không xuất hiện trong danh sách file của bất kỳ thành viên nào | | | ⚠️ Tải lại file sau test |
| TC_ATTACH_DELETE_12 | Link trực tiếp của file đã xóa bị vô hiệu hóa | Đã lấy link trực tiếp của `file_to_delete.jpg` trước khi xóa | 1. Xóa `file_to_delete.jpg`<br>2. Truy cập link trực tiếp đã lưu | — | Hệ thống trả về 404 hoặc thông báo file không tồn tại; không thể tải file đã xóa | | | ⚠️ Tải lại file sau test |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
