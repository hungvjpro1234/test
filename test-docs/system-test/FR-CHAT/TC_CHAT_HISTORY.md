# TC_CHAT_HISTORY — FR-CHAT-2: Xem Lịch Sử Tin Nhắn

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | FR-CHAT — Chat nhóm |
| Feature | FR-CHAT-2 — Xem lịch sử tin nhắn nhóm |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Ứng dụng đang chạy; đăng nhập `member@test.com` / `Abc@1234`; nhóm `Group Chat Test` đã có ít nhất 60 tin nhắn được gửi trước đó; `outsider@test.com` không thuộc nhóm |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 10    |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Mở chat nhóm → lịch sử tin nhắn hiển thị theo thứ tự thời gian (mới nhất ở dưới)
- [ ] Mặc định tải 50 tin nhắn mỗi trang — NFR-PERF-2
- [ ] Cuộn lên đầu danh sách → tải thêm tin nhắn cũ hơn
- [ ] Tin nhắn cũ hơn hiển thị đúng thứ tự sau khi tải thêm
- [ ] Người không thuộc nhóm không thể xem lịch sử tin nhắn
- [ ] Lịch sử hiển thị đầy đủ: tên người gửi, nội dung, timestamp
- [ ] Tin nhắn đã bị xóa không còn hiển thị trong lịch sử
- [ ] Tin nhắn đã chỉnh sửa hiển thị trạng thái "đã chỉnh sửa"

---

## TEST CASES

### UI TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_CHAT_HISTORY_01 | Lịch sử hiển thị đúng thứ tự thời gian | Đăng nhập `member@test.com` | 1. Mở chat nhóm `Group Chat Test` | — | Tin nhắn hiển thị theo thứ tự thời gian từ cũ đến mới (từ trên xuống dưới); tin nhắn mới nhất ở cuối danh sách | | | |
| TC_CHAT_HISTORY_02 | Mỗi tin nhắn hiển thị tên người gửi, nội dung và timestamp | Đăng nhập `member@test.com`; nhóm có tin nhắn từ nhiều thành viên | 1. Mở chat nhóm<br>2. Quan sát các tin nhắn hiển thị | — | Mỗi tin nhắn hiển thị rõ: avatar/tên người gửi, nội dung đầy đủ, thời gian gửi theo đúng định dạng người dùng đã cài | | | |
| TC_CHAT_HISTORY_03 | Giao diện danh sách tin nhắn responsive | Đăng nhập `member@test.com`; đang xem lịch sử chat | 1. Resize cửa sổ trình duyệt về nhiều kích thước | — | Danh sách tin nhắn không bị vỡ layout; nội dung và tên vẫn đọc được; ô nhập tin nhắn không bị chồng lên danh sách | | | |

---

### FUNCTION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_CHAT_HISTORY_04 | Xem lịch sử tin nhắn — FR-CHAT-2.1 | Đăng nhập `member@test.com`; nhóm có 60 tin nhắn | 1. Mở chat nhóm `Group Chat Test` | — | Hệ thống hiển thị 50 tin nhắn gần nhất (trang đầu tiên); có chỉ báo có thể tải thêm tin cũ hơn | | | |
| TC_CHAT_HISTORY_05 | Tải thêm tin nhắn cũ khi cuộn lên đầu — FR-CHAT-2.2 | Đăng nhập `member@test.com`; nhóm có 60 tin nhắn; đang thấy 50 tin nhắn | 1. Cuộn lên đầu danh sách tin nhắn | — | Hệ thống tải thêm 10 tin nhắn cũ hơn; tổng 60 tin nhắn hiển thị đúng thứ tự; không bị nhảy vị trí cuộn đột ngột | | | |
| TC_CHAT_HISTORY_06 | Không tải thêm khi đã tải hết tin nhắn | Đăng nhập `member@test.com`; đã tải tất cả 60 tin nhắn | 1. Cuộn lên đầu danh sách | — | Hệ thống không gửi request tải thêm; hiển thị thông báo "Đã hiển thị tất cả tin nhắn" hoặc không có loading indicator | | | |
| TC_CHAT_HISTORY_07 | Người không thuộc nhóm không xem được lịch sử | Đăng nhập `outsider@test.com` | 1. Cố truy cập URL trực tiếp chat nhóm `Group Chat Test` | — | Hệ thống từ chối truy cập; hiển thị thông báo không có quyền; không hiển thị bất kỳ tin nhắn nào | | | |
| TC_CHAT_HISTORY_08 | Tin nhắn đã xóa không hiển thị trong lịch sử | `member@test.com` đã xóa tin nhắn `"Tin bị xóa"` | 1. Đăng nhập `member@test.com`<br>2. Mở chat nhóm<br>3. Tìm vị trí tin nhắn `"Tin bị xóa"` | — | Tin nhắn `"Tin bị xóa"` không còn xuất hiện trong lịch sử; không có nội dung placeholder | | | |
| TC_CHAT_HISTORY_09 | Tin nhắn đã chỉnh sửa hiển thị trạng thái "đã chỉnh sửa" | `member@test.com` đã sửa một tin nhắn trong nhóm | 1. Đăng nhập `member2@test.com`<br>2. Mở chat nhóm<br>3. Quan sát tin nhắn đã sửa | — | Tin nhắn đã sửa hiển thị nội dung mới kèm nhãn "(đã chỉnh sửa)" hoặc tương tự | | | |

---

### BUSINESS FLOW

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_CHAT_HISTORY_10 | Luồng xem lịch sử đầy đủ: mở → cuộn lên → tải thêm → xem tin cũ | Đăng nhập `member@test.com`; nhóm có > 50 tin nhắn | 1. Mở chat nhóm → quan sát 50 tin nhắn gần nhất<br>2. Cuộn lên đầu<br>3. Đợi tải thêm<br>4. Kiểm tra thứ tự | — | Toàn bộ tin nhắn hiển thị liên tục đúng thứ tự thời gian; trải nghiệm scroll mượt không bị giật | | | |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
