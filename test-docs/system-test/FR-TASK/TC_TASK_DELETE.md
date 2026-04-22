# TC_TASK_DELETE — FR-TASK-5: Xóa Công Việc

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | FR-TASK — Quản lý công việc |
| Feature | FR-TASK-5 — Xóa công việc |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Ứng dụng đang chạy; `member@test.com` / `Abc@1234` có quyền xóa công việc trong `Group Task Test`; tồn tại `Task Delete Test` (có bình luận, file đính kèm, checklist); `viewer@test.com` / `Abc@1234` không có quyền xóa; **⚠️ Tái tạo task sau mỗi lần test xóa thành công** |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 10    |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Tùy chọn xóa công việc tồn tại với người có quyền
- [ ] Hộp thoại xác nhận xuất hiện trước khi xóa
- [ ] Nhấn Hủy → công việc không bị xóa
- [ ] Nhấn Xác nhận → công việc biến khỏi danh sách
- [ ] Người không có quyền → không thấy tùy chọn xóa hoặc lỗi quyền
- [ ] URL trực tiếp của task đã xóa bị chặn
- [ ] ⚠️ Hành động không thể hoàn tác

---

## TEST CASES

### UI TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_TASK_DELETE_01 | Tùy chọn xóa hiển thị với người có quyền | Đăng nhập `member@test.com` | 1. Mở chi tiết `Task Delete Test`<br>2. Kiểm tra menu/nút xóa | — | Tùy chọn "Xóa" hiển thị và có thể click | | | |
| TC_TASK_DELETE_02 | Hộp thoại xác nhận có cảnh báo rõ ràng | Đăng nhập `member@test.com` | 1. Nhấn xóa `Task Delete Test`<br>2. Quan sát hộp thoại | — | Hộp thoại xuất hiện với nội dung cảnh báo; có nút Hủy và Xác nhận | | | |

---

### FUNCTION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_TASK_DELETE_03 | Hủy xóa → task không bị xóa | Hộp thoại xác nhận đang mở | 1. Nhấn Hủy | — | Hộp thoại đóng; `Task Delete Test` vẫn còn trong danh sách | | | |
| TC_TASK_DELETE_04 | Xóa task thành công | Đăng nhập `member@test.com` | 1. Mở chi tiết task<br>2. Nhấn xóa<br>3. Xác nhận | — | Thông báo thành công; task biến mất khỏi danh sách | | | ⚠️ Tái tạo sau test |
| TC_TASK_DELETE_05 | Người không có quyền xóa | Đăng nhập `viewer@test.com` | 1. Mở chi tiết `Task Delete Test`<br>2. Cố tìm tùy chọn xóa | — | Tùy chọn xóa không hiển thị; hoặc thông báo không có quyền | | | |

---

### BUSINESS FLOW

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_TASK_DELETE_06 | Danh sách cập nhật ngay sau xóa (không reload) | Đang xem danh sách | 1. Xóa task<br>2. Quan sát danh sách | — | Task biến mất ngay, không cần reload | | | ⚠️ Tái tạo sau test |
| TC_TASK_DELETE_07 | URL trực tiếp của task đã xóa bị chặn | Đã xóa task | 1. Truy cập URL của task đã xóa | — | Hệ thống trả 404 hoặc thông báo không tìm thấy | | | ⚠️ Tái tạo sau test |
| TC_TASK_DELETE_08 | Thành viên khác không còn thấy task | Đã xóa task | 1. Đăng nhập `viewer@test.com`<br>2. Kiểm tra danh sách | — | Task đã xóa không hiển thị với bất kỳ thành viên nào | | | ⚠️ Tái tạo sau test |
| TC_TASK_DELETE_09 | Bình luận / file / checklist bị xóa cùng task | Đã xóa `Task Delete Test` | 1. Kiểm tra DB hoặc thử truy cập file đính kèm cũ | — | Dữ liệu phụ (bình luận, file, checklist) cũng bị xóa theo đúng business rule | | | ⚠️ Tái tạo sau test; cần DB access |
| TC_TASK_DELETE_10 | Không thể khôi phục task từ phía người dùng | Đã xóa task | 1. Kiểm tra các tùy chọn Undo/Restore | — | Không có tùy chọn khôi phục từ phía người dùng thường | | | ⚠️ Tái tạo sau test |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
