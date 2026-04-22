# TC_NOTIF_READ — FR-NOTIF-2: Đánh Dấu Đã Đọc

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | FR-NOTIF — Thông báo |
| Feature | FR-NOTIF-2.1 — Đánh dấu một thông báo đã đọc; FR-NOTIF-2.2 — Đánh dấu tất cả đã đọc |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Ứng dụng đang chạy; đăng nhập `user@test.com` / `Abc@1234`; tài khoản có ít nhất 3 thông báo chưa đọc |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 9     |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Nút / tùy chọn "Đánh dấu đã đọc" hiển thị trên từng thông báo
- [ ] Đánh dấu một thông báo đã đọc → trạng thái chuyển sang "đã đọc"
- [ ] Số đếm thông báo chưa đọc giảm đúng 1 sau khi đánh dấu đọc 1 thông báo
- [ ] Nút "Đánh dấu tất cả đã đọc" hiển thị khi có thông báo chưa đọc
- [ ] Đánh dấu tất cả đã đọc → số đếm về 0
- [ ] Đánh dấu tất cả đã đọc → tất cả thông báo chuyển trạng thái đã đọc
- [ ] Không thể đánh dấu đọc thông báo của người dùng khác

---

## TEST CASES

### UI TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_NOTIF_READ_01 | Nút/tùy chọn "Đánh dấu đã đọc" hiển thị trên thông báo chưa đọc | Đăng nhập `user@test.com`; bảng thông báo đang mở; có thông báo chưa đọc | 1. Hover hoặc nhấn vào một thông báo chưa đọc<br>2. Quan sát tùy chọn xuất hiện | — | Tùy chọn "Đánh dấu đã đọc" (hoặc icon tương tự) hiển thị rõ trên thông báo | | | |
| TC_NOTIF_READ_02 | Nút "Đánh dấu tất cả đã đọc" hiển thị khi có thông báo chưa đọc | Có ≥1 thông báo chưa đọc | 1. Mở bảng thông báo<br>2. Quan sát thanh tiêu đề bảng | — | Nút "Đánh dấu tất cả đã đọc" (hoặc tương tự) hiển thị ở đầu bảng thông báo | | | |

---

### FUNCTION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_NOTIF_READ_03 | Đánh dấu một thông báo đã đọc — FR-NOTIF-2.1 | Có thông báo `"Bạn được giao công việc X"` chưa đọc; badge hiển thị số N | 1. Mở bảng thông báo<br>2. Nhấn "Đánh dấu đã đọc" trên thông báo `"Bạn được giao công việc X"` | — | Thông báo đó chuyển sang trạng thái "đã đọc" (giao diện thay đổi: bỏ highlight/chấm xanh…); badge giảm từ N xuống N-1 | | | |
| TC_NOTIF_READ_04 | Đánh dấu tất cả đã đọc — FR-NOTIF-2.2 | Có 3 thông báo chưa đọc; badge hiển thị `3` | 1. Mở bảng thông báo<br>2. Nhấn "Đánh dấu tất cả đã đọc" | — | Tất cả thông báo chuyển sang trạng thái đã đọc; badge về `0` hoặc biến mất | | | |
| TC_NOTIF_READ_05 | Số đếm giảm đúng sau mỗi lần đánh dấu đọc | Badge hiển thị `3` | 1. Đánh dấu đọc lần 1<br>2. Kiểm tra badge<br>3. Đánh dấu đọc lần 2<br>4. Kiểm tra badge | — | Sau lần 1: badge = `2`; sau lần 2: badge = `1` | | | |
| TC_NOTIF_READ_06 | Thông báo đã đọc không tăng lại số đếm khi đánh dấu đọc lần nữa | Thông báo A đã ở trạng thái "đã đọc" | 1. Mở bảng thông báo<br>2. Cố gắng đánh dấu đọc lại thông báo A đã đọc (nếu hệ thống cho phép) | — | Số đếm không thay đổi; thông báo vẫn ở trạng thái đã đọc | | | |

---

### BUSINESS FLOW

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_NOTIF_READ_07 | Luồng đánh dấu từng thông báo cho đến khi hết chưa đọc | 3 thông báo chưa đọc; badge `3` | 1. Đánh dấu đọc thông báo 1 → badge = `2`<br>2. Đánh dấu đọc thông báo 2 → badge = `1`<br>3. Đánh dấu đọc thông báo 3 → badge = `0` | — | Badge giảm dần đúng theo từng bước; cuối cùng badge biến mất hoặc hiển thị `0`; danh sách vẫn hiển thị các thông báo đã đọc | | | |
| TC_NOTIF_READ_08 | Luồng "Đánh dấu tất cả đã đọc" khi có nhiều thông báo | 5 thông báo chưa đọc; badge `5` | 1. Mở bảng thông báo<br>2. Nhấn "Đánh dấu tất cả đã đọc"<br>3. Kiểm tra danh sách và badge | — | Tất cả 5 thông báo chuyển sang đã đọc trong cùng một thao tác; badge trở về `0`; không cần reload trang | | | |
| TC_NOTIF_READ_09 | Thông báo mới đến sau khi đánh dấu tất cả đã đọc — tăng lại đúng | Đã đánh dấu tất cả đã đọc; badge = `0` | 1. Một sự kiện kích hoạt thông báo mới (ví dụ: `admin@test.com` giao thêm công việc)<br>2. Quan sát badge | — | Badge tăng lên `1` sau khi nhận thông báo mới; số đếm phản ánh đúng thực tế | | | |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
