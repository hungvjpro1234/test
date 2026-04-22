# TC_DIRECT_SEND — FR-DIRECT-3: Gửi Tin Nhắn Trực Tiếp

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | FR-DIRECT — Tin nhắn trực tiếp |
| Feature | FR-DIRECT-3 — Gửi tin nhắn trong hội thoại 1-1 |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Ứng dụng đang chạy; đăng nhập `user1@test.com` / `Abc@1234`; đã có hội thoại 1-1 giữa `user1@test.com` và `user2@test.com`; `outsider@test.com` không có trong hội thoại này |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 12    |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Ô nhập tin nhắn và nút gửi hiển thị đúng trong hội thoại
- [ ] Gửi tin nhắn thành công → hiển thị ngay trong khung hội thoại — FR-DIRECT-3.1
- [ ] Người nhận (đang online) nhận tin ngay lập tức không cần reload
- [ ] Gửi tin nhắn rỗng → không gửi được
- [ ] Gửi tin nhắn vượt 5000 ký tự → thông báo lỗi — FR-DIRECT-3.2 / C-11
- [ ] Người không thuộc hội thoại cố gửi tin → thông báo không có quyền — FR-DIRECT-3.3
- [ ] Tin nhắn hiển thị đúng thứ tự thời gian
- [ ] Tin nhắn hiển thị thời gian gửi

---

## TEST CASES

### UI TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_DIRECT_SEND_01 | Ô nhập tin nhắn và nút gửi hiển thị đúng | Đăng nhập `user1@test.com`; đang mở hội thoại với `user2@test.com` | 1. Quan sát giao diện hội thoại | — | Ô nhập tin nhắn và nút "Gửi" (hoặc icon gửi) hiển thị rõ ràng ở cuối khung hội thoại | | | |
| TC_DIRECT_SEND_02 | Tin nhắn gửi hiển thị đúng thứ tự thời gian | Đăng nhập `user1@test.com`; hội thoại đã có nhiều tin | 1. Gửi tin nhắn mới `"Tin mới nhất"`<br>2. Quan sát vị trí tin | `"Tin mới nhất"` | Tin `"Tin mới nhất"` xuất hiện cuối danh sách (mới nhất ở dưới cùng); thời gian gửi hiển thị chính xác | | | |
| TC_DIRECT_SEND_03 | Tin nhắn của mình phân biệt với tin nhắn của người kia | Đăng nhập `user1@test.com`; hội thoại có tin của cả hai bên | 1. Quan sát khung hội thoại | — | Tin nhắn của `user1@test.com` và `user2@test.com` phân biệt rõ (màu sắc/vị trí bubble khác nhau) | | | |

---

### VALIDATION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_DIRECT_SEND_04 | Gửi tin nhắn rỗng — không gửi được | Đăng nhập `user1@test.com`; đang mở hội thoại | 1. Để trống ô nhập tin nhắn<br>2. Nhấn nút "Gửi" hoặc Enter | `""` (rỗng) | Hệ thống không gửi tin nhắn; nút gửi bị vô hiệu hóa hoặc hiển thị thông báo lỗi | | | |
| TC_DIRECT_SEND_05 | Gửi tin nhắn vượt 5000 ký tự — FR-DIRECT-3.2 / C-11 | Đăng nhập `user1@test.com`; đang mở hội thoại | 1. Nhập chuỗi 5001 ký tự vào ô nhập<br>2. Nhấn "Gửi" | Chuỗi `"a" × 5001` | Hệ thống hiển thị thông báo lỗi "Tin nhắn vượt giới hạn 5000 ký tự"; tin nhắn không được gửi | | | |
| TC_DIRECT_SEND_06 | Gửi tin nhắn đúng giới hạn 5000 ký tự — boundary | Đăng nhập `user1@test.com`; đang mở hội thoại | 1. Nhập đúng 5000 ký tự<br>2. Nhấn "Gửi" | Chuỗi `"a" × 5000` | Tin nhắn được gửi thành công; hiển thị đầy đủ trong khung hội thoại | | | |
| TC_DIRECT_SEND_07 | Người không thuộc hội thoại cố gửi tin — FR-DIRECT-3.3 | `outsider@test.com` không có trong hội thoại của `user1@test.com` và `user2@test.com` | 1. Đăng nhập `outsider@test.com`<br>2. Cố truy cập URL hoặc gọi API gửi tin vào hội thoại của `user1@test.com` và `user2@test.com` | — | Hệ thống trả về thông báo không có quyền truy cập; tin nhắn không được gửi | | | |

---

### FUNCTION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_DIRECT_SEND_08 | Gửi tin nhắn thành công — FR-DIRECT-3.1 | Đăng nhập `user1@test.com`; đang mở hội thoại với `user2@test.com` | 1. Nhập `"Xin chào, bạn có khỏe không?"`<br>2. Nhấn "Gửi" | `"Xin chào, bạn có khỏe không?"` | Tin nhắn hiển thị ngay lập tức trong khung hội thoại với đúng nội dung và thời gian gửi | | | |
| TC_DIRECT_SEND_09 | Người nhận đang online thấy tin ngay lập tức | `user1@test.com` và `user2@test.com` đang online | 1. `user1@test.com` gửi `"Tin realtime"`<br>2. Quan sát màn hình `user2@test.com` | `"Tin realtime"` | Tin nhắn `"Tin realtime"` xuất hiện ngay lập tức trên màn hình `user2@test.com` mà không cần reload trang | | | |
| TC_DIRECT_SEND_10 | Gửi tin nhắn có ký tự đặc biệt và emoji | Đăng nhập `user1@test.com`; đang mở hội thoại | 1. Nhập `"Hello! 😊 @#$%^&*"`<br>2. Nhấn "Gửi" | `"Hello! 😊 @#$%^&*"` | Tin nhắn hiển thị đúng toàn bộ nội dung bao gồm emoji và ký tự đặc biệt | | | |

---

### BUSINESS FLOW

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_DIRECT_SEND_11 | Luồng gửi và nhận tin nhắn hai chiều | `user1@test.com` và `user2@test.com` đều đăng nhập | 1. `user1@test.com` gửi `"Chào user2!"`<br>2. `user2@test.com` trả lời `"Chào user1!"`<br>3. Cả hai quan sát hội thoại | — | Cả hai bên thấy đầy đủ 2 tin nhắn theo thứ tự đúng; hội thoại đồng bộ giữa hai thiết bị | | | |
| TC_DIRECT_SEND_12 | Luồng gửi nhiều tin liên tiếp — thứ tự không bị đảo | Đăng nhập `user1@test.com` | 1. Gửi `"Tin 1"` → `"Tin 2"` → `"Tin 3"` liên tiếp | `"Tin 1"`, `"Tin 2"`, `"Tin 3"` | Ba tin hiển thị theo đúng thứ tự `"Tin 1"` → `"Tin 2"` → `"Tin 3"`; không bị đảo lộn | | | |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
