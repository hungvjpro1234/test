# TC_NOTIF_DELETE — FR-NOTIF-4: Xóa Thông Báo

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | FR-NOTIF — Thông báo |
| Feature | FR-NOTIF-4.1 — Xóa một hoặc nhiều thông báo |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Ứng dụng đang chạy; đăng nhập `user@test.com` / `Abc@1234`; tài khoản có ít nhất 3 thông báo (bao gồm cả đã đọc và chưa đọc) |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 8     |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Tùy chọn "Xóa" hiển thị trên mỗi thông báo
- [ ] Xóa 1 thông báo → thông báo biến mất khỏi danh sách
- [ ] Thông báo đã xóa không còn xuất hiện sau khi reload
- [ ] Xóa thông báo chưa đọc → số đếm chưa đọc giảm đúng
- [ ] Xóa nhiều thông báo cùng lúc (nếu hỗ trợ) hoạt động đúng
- [ ] Các thông báo còn lại không bị ảnh hưởng sau khi xóa

---

## TEST CASES

### UI TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_NOTIF_DELETE_01 | Tùy chọn "Xóa" hiển thị trên thông báo | Đăng nhập `user@test.com`; bảng thông báo đang mở | 1. Hover hoặc nhấn vào một thông báo trong danh sách<br>2. Quan sát các tùy chọn | — | Tùy chọn "Xóa" (hoặc icon thùng rác) hiển thị rõ trên thông báo | | | |

---

### FUNCTION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_NOTIF_DELETE_02 | Xóa một thông báo đã đọc — FR-NOTIF-4.1 | Có thông báo `"Công việc X đã hoàn thành"` trong danh sách; trạng thái đã đọc | 1. Mở bảng thông báo<br>2. Nhấn "Xóa" trên thông báo `"Công việc X đã hoàn thành"` | — | Thông báo biến mất khỏi danh sách ngay lập tức; các thông báo còn lại không bị thay đổi | | | |
| TC_NOTIF_DELETE_03 | Xóa thông báo chưa đọc — số đếm giảm | Có thông báo `"Bạn được giao công việc Y"` chưa đọc; badge hiển thị số N | 1. Nhấn "Xóa" trên thông báo chưa đọc đó | — | Thông báo biến mất; badge giảm từ N xuống N-1 | | | |
| TC_NOTIF_DELETE_04 | Xóa nhiều thông báo — FR-NOTIF-4.1 | Có 3 thông báo A, B, C trong danh sách | 1. Xóa thông báo A<br>2. Xóa thông báo B<br>3. Kiểm tra danh sách | — | A và B biến mất; C vẫn còn trong danh sách; thứ tự không bị xáo trộn | | | |
| TC_NOTIF_DELETE_05 | Thông báo đã xóa không còn xuất hiện sau reload | Thông báo A vừa được xóa | 1. Tải lại trang (F5)<br>2. Mở bảng thông báo | — | Thông báo A không xuất hiện lại trong danh sách sau reload | | | |

---

### DATABASE TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_NOTIF_DELETE_06 | Thông báo bị xóa không thể truy cập lại | Thông báo A đã bị xóa; ID của thông báo A đã biết | 1. Cố gọi API lấy thông báo theo ID của A (nếu có thể) | ID thông báo A | Hệ thống trả về lỗi "không tìm thấy" hoặc từ chối; không trả về dữ liệu thông báo đã xóa | | | |

---

### BUSINESS FLOW

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_NOTIF_DELETE_07 | Luồng xóa thông báo và kiểm tra danh sách còn đúng | 3 thông báo A, B, C; badge = `1` (chỉ B là chưa đọc) | 1. Xóa B (chưa đọc)<br>2. Xem danh sách<br>3. Kiểm tra badge | — | Danh sách còn A và C; badge về `0`; thứ tự A → C không đổi | | | |
| TC_NOTIF_DELETE_08 | Xóa thông báo trong mục "Đã lưu trữ" | Có thông báo trong mục "Đã lưu trữ" | 1. Mở mục "Đã lưu trữ"<br>2. Xóa một thông báo trong đó | — | Thông báo biến mất khỏi mục "Đã lưu trữ"; không xuất hiện lại trong danh sách chính | | | |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
