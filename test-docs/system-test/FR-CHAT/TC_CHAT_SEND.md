# TC_CHAT_SEND — FR-CHAT-1: Gửi và Nhận Tin Nhắn Nhóm

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | FR-CHAT — Chat nhóm |
| Feature | FR-CHAT-1 — Gửi và nhận tin nhắn nhóm |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Ứng dụng đang chạy; đăng nhập `member@test.com` / `Abc@1234`; tồn tại nhóm `Group Chat Test` với `member@test.com` và `member2@test.com` là thành viên; `outsider@test.com` không thuộc nhóm |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 16    |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Ô nhập tin nhắn hiển thị trong khung chat nhóm
- [ ] Gửi tin nhắn hợp lệ → tin nhắn hiển thị ngay lập tức trong khung chat
- [ ] Tin nhắn trống → không gửi được, hiển thị thông báo lỗi
- [ ] Tin nhắn vượt 5000 ký tự → hiển thị thông báo lỗi, không gửi
- [ ] Người không thuộc nhóm → không thể gửi tin nhắn, hiển thị thông báo lỗi
- [ ] Trả lời tin nhắn → hiển thị tham chiếu đến tin nhắn gốc
- [ ] Tin nhắn gửi thành công được hiển thị đúng tên người gửi và thời gian
- [ ] Giao diện ô nhập responsive trên nhiều kích thước màn hình

---

## TEST CASES

### UI TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_CHAT_SEND_01 | Ô nhập tin nhắn hiển thị trong khung chat | Đăng nhập `member@test.com` | 1. Mở chat nhóm `Group Chat Test` | — | Ô nhập tin nhắn (text input / textarea) hiển thị ở cuối khung chat; nút "Gửi" hoặc phím Enter có thể kích hoạt gửi | | | |
| TC_CHAT_SEND_02 | Tin nhắn hiển thị đúng tên người gửi và thời gian | Đăng nhập `member@test.com` | 1. Gửi tin nhắn `"Xin chào nhóm"` | `"Xin chào nhóm"` | Tin nhắn xuất hiện với đúng tên `member@test.com`, nội dung `"Xin chào nhóm"` và timestamp hiển thị đúng | | | |
| TC_CHAT_SEND_03 | Giao diện ô nhập tin nhắn responsive | Đăng nhập `member@test.com`; đang trong chat nhóm | 1. Resize cửa sổ trình duyệt về nhiều kích thước | — | Ô nhập tin nhắn và nút gửi không bị vỡ layout; vẫn sử dụng được bình thường | | | |

---

### VALIDATION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_CHAT_SEND_04 | Gửi tin nhắn trống — FR-CHAT-1.2 | Đăng nhập `member@test.com`; đang trong chat nhóm `Group Chat Test` | 1. Để trống ô nhập tin nhắn<br>2. Nhấn nút "Gửi" hoặc Enter | `""` (rỗng) | Hệ thống không gửi tin nhắn; hiển thị thông báo lỗi; không có tin nhắn mới trong khung chat | | | |
| TC_CHAT_SEND_05 | Gửi tin nhắn chỉ có khoảng trắng | Đăng nhập `member@test.com`; đang trong chat nhóm | 1. Nhập chỉ khoảng trắng vào ô tin nhắn<br>2. Nhấn "Gửi" | `"   "` (toàn khoảng trắng) | Hệ thống không gửi tin nhắn; coi như tin nhắn trống; hiển thị thông báo lỗi | | | |
| TC_CHAT_SEND_06 | Gửi tin nhắn vượt 5000 ký tự — FR-CHAT-1.3 / C-11 | Đăng nhập `member@test.com`; đang trong chat nhóm | 1. Nhập chuỗi 5001 ký tự vào ô tin nhắn<br>2. Nhấn "Gửi" | Chuỗi 5001 ký tự `"a" × 5001` | Hệ thống hiển thị thông báo lỗi "Tin nhắn vượt giới hạn 5000 ký tự"; không gửi tin nhắn | | | |
| TC_CHAT_SEND_07 | Gửi tin nhắn đúng 5000 ký tự — boundary | Đăng nhập `member@test.com`; đang trong chat nhóm | 1. Nhập chuỗi đúng 5000 ký tự<br>2. Nhấn "Gửi" | Chuỗi `"a" × 5000` | Hệ thống chấp nhận và gửi thành công; tin nhắn xuất hiện trong khung chat | | | |

---

### FUNCTION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_CHAT_SEND_08 | Gửi tin nhắn thành công — FR-CHAT-1.1 | Đăng nhập `member@test.com`; đang trong chat nhóm `Group Chat Test` | 1. Nhập `"Hello World"`<br>2. Nhấn "Gửi" | `"Hello World"` | Tin nhắn xuất hiện ngay lập tức trong khung chat; ô nhập được làm trống sau khi gửi | | | |
| TC_CHAT_SEND_09 | Người không thuộc nhóm không thể gửi tin nhắn — FR-CHAT-1.4 | Đăng nhập `outsider@test.com` | 1. Cố truy cập URL trực tiếp của chat nhóm `Group Chat Test`<br>2. Cố gửi tin nhắn | `"Thử gửi"` | Hệ thống hiển thị thông báo không có quyền; không gửi được tin nhắn | | | |
| TC_CHAT_SEND_10 | Trả lời tin nhắn hiển thị tham chiếu — FR-CHAT-1.5 | `member@test.com` đã gửi tin nhắn `"Tin gốc"` trước đó | 1. Đăng nhập `member2@test.com`<br>2. Nhấn "Trả lời" trên tin nhắn `"Tin gốc"`<br>3. Nhập `"Đây là trả lời"` và gửi | `"Đây là trả lời"` | Tin nhắn mới hiển thị kèm tham chiếu (quote) đến nội dung `"Tin gốc"` của `member@test.com` | | | |
| TC_CHAT_SEND_11 | Gửi tin nhắn với ký tự đặc biệt và emoji | Đăng nhập `member@test.com`; đang trong chat nhóm | 1. Nhập `"Test 🎉 <b>bold</b> & special!"` và gửi | `"Test 🎉 <b>bold</b> & special!"` | Tin nhắn hiển thị đúng nội dung; không bị lỗi render hay XSS; ký tự đặc biệt hiển thị nguyên vẹn | | | |

---

### BUSINESS FLOW

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_CHAT_SEND_12 | Luồng gửi tin nhắn thành công và thành viên khác nhận được | Cả `member@test.com` và `member2@test.com` đang online trong `Group Chat Test` | 1. Đăng nhập `member@test.com`<br>2. Gửi tin nhắn `"Chào tất cả!"`<br>3. Chuyển sang phiên `member2@test.com`<br>4. Kiểm tra khung chat | `"Chào tất cả!"` | Tin nhắn hiển thị trong khung chat của cả hai; đúng tên người gửi; đúng nội dung | | | |
| TC_CHAT_SEND_13 | Luồng trả lời chuỗi tin nhắn | `member@test.com` gửi `"Tin A"`, `member2@test.com` trả lời `"Tin A"` với `"Trả lời A"` | 1. `member@test.com` mở chat<br>2. Quan sát chuỗi tin nhắn | — | Thứ tự hiển thị đúng: `"Tin A"` → `"Trả lời A"` (có tham chiếu); không bị đảo thứ tự | | | |
| TC_CHAT_SEND_14 | Gửi nhiều tin nhắn liên tiếp — kiểm tra thứ tự | Đăng nhập `member@test.com` | 1. Gửi `"Tin 1"` → `"Tin 2"` → `"Tin 3"` liên tiếp | `"Tin 1"`, `"Tin 2"`, `"Tin 3"` | Danh sách tin nhắn hiển thị đúng thứ tự: Tin 1 → Tin 2 → Tin 3; không bị đảo ngược | | | |
| TC_CHAT_SEND_15 | Người dùng chưa đăng nhập không thể gửi tin nhắn — NFR-SEC-2 | Chưa đăng nhập | 1. Cố truy cập trực tiếp URL chat nhóm | — | Hệ thống chuyển hướng về trang đăng nhập; không hiển thị nội dung chat | | | |
| TC_CHAT_SEND_16 | Ô nhập tin nhắn được làm trống sau khi gửi thành công | Đăng nhập `member@test.com` | 1. Nhập `"Kiểm tra làm trống"`<br>2. Nhấn "Gửi" | `"Kiểm tra làm trống"` | Sau khi gửi, ô nhập tin nhắn được clear về rỗng; focus vẫn ở ô nhập để gửi tiếp | | | |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
