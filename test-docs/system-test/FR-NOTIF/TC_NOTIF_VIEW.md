# TC_NOTIF_VIEW — FR-NOTIF-1: Xem Danh Sách Thông Báo & Số Chưa Đọc

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | FR-NOTIF — Thông báo |
| Feature | FR-NOTIF-1.1 — Xem danh sách thông báo; FR-NOTIF-1.2 — Hiển thị số thông báo chưa đọc |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Ứng dụng đang chạy; đăng nhập `user@test.com` / `Abc@1234`; tài khoản có ít nhất 5 thông báo thuộc các danh mục: nhóm, công việc, chat; trong đó có thông báo chưa đọc và đã đọc |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 12    |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Icon thông báo trên thanh điều hướng hiển thị rõ ràng
- [ ] Số đếm thông báo chưa đọc hiển thị trên icon khi có thông báo mới
- [ ] Số đếm về 0 khi không còn thông báo chưa đọc
- [ ] Mở bảng thông báo → hiển thị danh sách thông báo
- [ ] Danh sách phân biệt trạng thái đã đọc / chưa đọc (màu sắc hoặc ký hiệu khác nhau)
- [ ] Lọc thông báo theo danh mục: nhóm, công việc, chat, cuộc họp, hệ thống
- [ ] Lọc thông báo theo trạng thái: chưa đọc, đã lưu trữ
- [ ] Mỗi thông báo hiển thị đủ thông tin: tiêu đề / nội dung ngắn, thời gian nhận
- [ ] Không có thông báo → hiển thị trạng thái trống thay vì lỗi

---

## TEST CASES

### UI TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_NOTIF_VIEW_01 | Icon thông báo hiển thị trên thanh điều hướng | Đăng nhập `user@test.com` | 1. Quan sát thanh điều hướng | — | Icon thông báo (chuông hoặc tương tự) hiển thị rõ ràng trên thanh điều hướng | | | |
| TC_NOTIF_VIEW_02 | Số đếm thông báo chưa đọc hiển thị trên icon | Tài khoản có 3 thông báo chưa đọc | 1. Quan sát icon thông báo trên thanh điều hướng | — | Badge số `3` hiển thị trên hoặc cạnh icon thông báo | | | |
| TC_NOTIF_VIEW_03 | Thông báo chưa đọc và đã đọc phân biệt bằng giao diện | Có ít nhất 1 thông báo chưa đọc và 1 đã đọc | 1. Nhấn mở bảng thông báo<br>2. Quan sát sự khác biệt giữa các thông báo | — | Thông báo chưa đọc hiển thị khác biệt (màu nền, chấm tròn, chữ đậm…) so với thông báo đã đọc | | | |

---

### VALIDATION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_NOTIF_VIEW_04 | Số đếm không hiển thị hoặc hiển thị 0 khi không có thông báo chưa đọc | Tất cả thông báo đã được đọc | 1. Quan sát icon thông báo | — | Badge số không hiển thị hoặc hiển thị `0`; không có số sai lệch | | | |
| TC_NOTIF_VIEW_05 | Bảng thông báo trống khi không có thông báo nào | Tài khoản chưa có thông báo nào | 1. Nhấn icon thông báo để mở bảng | — | Bảng hiển thị thông báo trống (empty state) như "Không có thông báo nào"; không bị lỗi hoặc màn hình trắng | | | |

---

### FUNCTION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_NOTIF_VIEW_06 | Xem danh sách thông báo — FR-NOTIF-1.1 | Đăng nhập `user@test.com`; có ≥5 thông báo | 1. Nhấn icon thông báo để mở bảng | — | Bảng thông báo mở ra; hiển thị danh sách thông báo với tiêu đề/nội dung ngắn và thời gian nhận của mỗi thông báo | | | |
| TC_NOTIF_VIEW_07 | Lọc thông báo theo danh mục "công việc" — FR-NOTIF-1.1 | Có thông báo thuộc nhiều danh mục | 1. Mở bảng thông báo<br>2. Chọn bộ lọc danh mục "Công việc" | — | Chỉ hiển thị thông báo liên quan đến công việc (giao việc, hoàn thành, sắp đến hạn…); các thông báo danh mục khác bị ẩn | | | |
| TC_NOTIF_VIEW_08 | Lọc thông báo theo danh mục "nhóm" | Có thông báo thuộc nhiều danh mục | 1. Mở bảng thông báo<br>2. Chọn bộ lọc danh mục "Nhóm" | — | Chỉ hiển thị thông báo liên quan đến nhóm (lời mời, thay đổi vai trò, đổi tên nhóm…) | | | |
| TC_NOTIF_VIEW_09 | Lọc thông báo theo danh mục "chat" | Có thông báo tin nhắn | 1. Mở bảng thông báo<br>2. Chọn bộ lọc danh mục "Chat" | — | Chỉ hiển thị thông báo liên quan đến tin nhắn offline hoặc mention | | | |
| TC_NOTIF_VIEW_10 | Lọc theo trạng thái "chưa đọc" | Có thông báo cả đã đọc và chưa đọc | 1. Mở bảng thông báo<br>2. Chọn bộ lọc "Chưa đọc" | — | Chỉ hiển thị các thông báo có trạng thái chưa đọc; thông báo đã đọc bị ẩn | | | |

---

### BUSINESS FLOW

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_NOTIF_VIEW_11 | Số đếm chưa đọc giảm đúng khi đọc thông báo — FR-NOTIF-1.2 | Có 3 thông báo chưa đọc; badge hiển thị `3` | 1. Mở bảng thông báo<br>2. Đọc/đánh dấu đọc 1 thông báo<br>3. Quan sát badge trên icon | — | Badge cập nhật từ `3` xuống `2` | | | |
| TC_NOTIF_VIEW_12 | Người dùng chưa đăng nhập không thể xem thông báo — NFR-SEC-2 | Chưa đăng nhập | 1. Truy cập trực tiếp URL trang thông báo (nếu có) | — | Hệ thống chuyển hướng về trang đăng nhập; không hiển thị dữ liệu thông báo | | | |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
