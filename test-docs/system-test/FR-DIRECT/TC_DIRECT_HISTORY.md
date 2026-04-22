# TC_DIRECT_HISTORY — FR-DIRECT-4: Xem Lịch Sử Tin Nhắn 1-1

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | FR-DIRECT — Tin nhắn trực tiếp |
| Feature | FR-DIRECT-4 — Xem lịch sử tin nhắn trong hội thoại 1-1 theo trang |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Ứng dụng đang chạy; đăng nhập `user1@test.com` / `Abc@1234`; hội thoại giữa `user1@test.com` và `user2@test.com` đã có hơn 60 tin nhắn; `outsider@test.com` không thuộc hội thoại |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 9     |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Mở hội thoại → lịch sử tin nhắn hiển thị theo trang — FR-DIRECT-4.1
- [ ] Tin nhắn mới nhất hiển thị ở cuối (vị trí dưới cùng)
- [ ] Cuộn lên trên → tải thêm tin nhắn cũ hơn (phân trang)
- [ ] Tin nhắn cũ hiển thị đúng nội dung, người gửi, thời gian
- [ ] Người không thuộc hội thoại không thể xem lịch sử — FR-DIRECT-3.3
- [ ] Hội thoại mới chưa có tin nhắn → hiển thị trạng thái rỗng không lỗi
- [ ] Lịch sử tin nhắn đúng sau khi xóa/sửa tin (không hiển thị tin đã xóa)

---

## TEST CASES

### UI TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_DIRECT_HISTORY_01 | Tin nhắn mới nhất hiển thị ở cuối khi mở hội thoại | Đăng nhập `user1@test.com`; hội thoại có nhiều tin | 1. Mở hội thoại với `user2@test.com` | — | Khung hội thoại tự động cuộn xuống vị trí cuối; tin nhắn mới nhất hiển thị ở dưới cùng | | | |
| TC_DIRECT_HISTORY_02 | Tin nhắn hiển thị đầy đủ thông tin: nội dung, người gửi, thời gian | Đăng nhập `user1@test.com`; hội thoại có tin nhắn của cả hai bên | 1. Mở hội thoại<br>2. Quan sát từng tin nhắn | — | Mỗi tin nhắn hiển thị: nội dung, tên/avatar người gửi và thời gian gửi | | | |

---

### VALIDATION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_DIRECT_HISTORY_03 | Người không thuộc hội thoại không thể xem lịch sử — FR-DIRECT-3.3 | `outsider@test.com` không có trong hội thoại | 1. Đăng nhập `outsider@test.com`<br>2. Cố truy cập trực tiếp URL lịch sử hội thoại | — | Hệ thống hiển thị thông báo không có quyền truy cập; không hiển thị nội dung lịch sử | | | |
| TC_DIRECT_HISTORY_04 | Hội thoại mới chưa có tin nhắn — không có lỗi | Đăng nhập `user1@test.com`; vừa tạo hội thoại mới với `user3@test.com` | 1. Mở hội thoại vừa tạo | — | Khung hội thoại trống; hiển thị trạng thái "Hãy bắt đầu cuộc trò chuyện" hoặc tương tự; không có lỗi | | | |

---

### FUNCTION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_DIRECT_HISTORY_05 | Xem lịch sử tin nhắn thành công — FR-DIRECT-4.1 | Đăng nhập `user1@test.com`; hội thoại có 30 tin nhắn | 1. Mở hội thoại với `user2@test.com` | — | Hệ thống hiển thị lịch sử tin nhắn theo trang; tin nhắn sắp xếp đúng thứ tự thời gian từ cũ đến mới | | | |
| TC_DIRECT_HISTORY_06 | Tải thêm tin nhắn cũ khi cuộn lên — phân trang | Đăng nhập `user1@test.com`; hội thoại có hơn 60 tin nhắn | 1. Mở hội thoại<br>2. Cuộn lên đầu danh sách hiện tại<br>3. Chờ tải thêm | — | Hệ thống tải thêm các tin nhắn cũ hơn và hiển thị liên tục phía trên; vị trí cuộn không bị nhảy | | | |
| TC_DIRECT_HISTORY_07 | Tin nhắn đã xóa không còn trong lịch sử | `user1@test.com` đã xóa tin nhắn `"Tin đã xóa"` trước đó | 1. Mở hội thoại<br>2. Cuộn qua lịch sử tìm `"Tin đã xóa"` | — | Không tìm thấy `"Tin đã xóa"` trong lịch sử; các tin khác không bị ảnh hưởng | | | |
| TC_DIRECT_HISTORY_08 | Tin nhắn đã sửa hiển thị nội dung mới với nhãn "đã chỉnh sửa" | `user1@test.com` đã sửa tin `"Nội dung cũ"` thành `"Nội dung mới"` | 1. Mở hội thoại<br>2. Tìm tin nhắn vừa sửa | — | Lịch sử hiển thị `"Nội dung mới"` kèm nhãn "(đã chỉnh sửa)"; không còn thấy `"Nội dung cũ"` | | | |

---

### BUSINESS FLOW

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_DIRECT_HISTORY_09 | Luồng cuộn qua toàn bộ lịch sử — tải đủ tất cả tin nhắn | Đăng nhập `user1@test.com`; hội thoại có đúng 55 tin nhắn | 1. Mở hội thoại<br>2. Cuộn lên đầu nhiều lần cho đến khi không còn tải thêm | — | Hệ thống tải đủ 55 tin nhắn; khi đến tin đầu tiên, không còn tải thêm; không có tin nào bị thiếu | | | |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
