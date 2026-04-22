# TC_NOTIF_ARCHIVE — FR-NOTIF-3: Lưu Trữ Thông Báo

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | FR-NOTIF — Thông báo |
| Feature | FR-NOTIF-3.1 — Lưu trữ một hoặc nhiều thông báo |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Ứng dụng đang chạy; đăng nhập `user@test.com` / `Abc@1234`; tài khoản có ít nhất 3 thông báo trong danh sách chính |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 8     |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Tùy chọn "Lưu trữ" hiển thị trên mỗi thông báo
- [ ] Lưu trữ 1 thông báo → thông báo biến mất khỏi danh sách chính
- [ ] Thông báo đã lưu trữ xuất hiện trong mục "Đã lưu trữ"
- [ ] Lưu trữ nhiều thông báo cùng lúc (nếu hỗ trợ) hoạt động đúng
- [ ] Thông báo lưu trữ không bị tính vào số đếm chưa đọc của danh sách chính
- [ ] Có thể lọc/xem riêng mục thông báo đã lưu trữ

---

## TEST CASES

### UI TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_NOTIF_ARCHIVE_01 | Tùy chọn "Lưu trữ" hiển thị trên thông báo | Đăng nhập `user@test.com`; bảng thông báo đang mở | 1. Hover hoặc nhấn vào một thông báo bất kỳ trong danh sách chính<br>2. Quan sát các tùy chọn hiện ra | — | Tùy chọn "Lưu trữ" (hoặc icon lưu trữ) hiển thị rõ trên thông báo | | | |
| TC_NOTIF_ARCHIVE_02 | Mục "Đã lưu trữ" có thể truy cập trong bảng thông báo | Đang trong bảng thông báo | 1. Tìm tab hoặc bộ lọc "Đã lưu trữ" trong bảng thông báo | — | Có thể chuyển sang xem danh sách thông báo đã lưu trữ | | | |

---

### FUNCTION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_NOTIF_ARCHIVE_03 | Lưu trữ một thông báo — FR-NOTIF-3.1 | Có thông báo `"Bạn được mời vào nhóm Alpha"` trong danh sách chính | 1. Mở bảng thông báo<br>2. Nhấn "Lưu trữ" trên thông báo `"Bạn được mời vào nhóm Alpha"` | — | Thông báo biến mất khỏi danh sách chính ngay lập tức; không còn hiển thị trong tab mặc định | | | |
| TC_NOTIF_ARCHIVE_04 | Thông báo đã lưu trữ xuất hiện trong mục "Đã lưu trữ" | Thông báo `"Bạn được mời vào nhóm Alpha"` vừa được lưu trữ | 1. Mở tab / bộ lọc "Đã lưu trữ"<br>2. Tìm thông báo vừa lưu trữ | — | Thông báo `"Bạn được mời vào nhóm Alpha"` xuất hiện đúng trong mục "Đã lưu trữ" | | | |
| TC_NOTIF_ARCHIVE_05 | Lưu trữ nhiều thông báo — FR-NOTIF-3.1 | Có 3 thông báo trong danh sách chính | 1. Lưu trữ thông báo A<br>2. Lưu trữ thông báo B<br>3. Kiểm tra danh sách chính và mục "Đã lưu trữ" | — | Cả A và B biến mất khỏi danh sách chính; cả hai xuất hiện trong mục "Đã lưu trữ"; thông báo C vẫn còn trong danh sách chính | | | |
| TC_NOTIF_ARCHIVE_06 | Thông báo lưu trữ không ảnh hưởng số đếm chưa đọc | Có 2 thông báo chưa đọc; badge = `2`; 1 trong số đó là thông báo A | 1. Lưu trữ thông báo A (chưa đọc)<br>2. Quan sát badge | — | Badge giảm xuống `1` (thông báo chưa đọc đã lưu trữ không còn tính vào số đếm danh sách chính) | | | |

---

### BUSINESS FLOW

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_NOTIF_ARCHIVE_07 | Luồng lưu trữ và kiểm tra danh sách chính còn đúng | 3 thông báo A, B, C trong danh sách chính | 1. Lưu trữ thông báo B<br>2. Xem danh sách chính<br>3. Xem mục "Đã lưu trữ" | — | Danh sách chính còn A và C; mục "Đã lưu trữ" có B; thứ tự A và C không bị xáo trộn | | | |
| TC_NOTIF_ARCHIVE_08 | Thông báo lưu trữ không xuất hiện lại trong danh sách chính sau reload | Thông báo B đã được lưu trữ | 1. Tải lại trang (F5)<br>2. Mở bảng thông báo, xem danh sách chính | — | Thông báo B vẫn không xuất hiện trong danh sách chính sau khi reload; vẫn nằm trong mục "Đã lưu trữ" | | | |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
