# TC_CHAT_REALTIME — FR-CHAT-6: Cập Nhật Thời Gian Thực

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | FR-CHAT — Chat nhóm |
| Feature | FR-CHAT-6 — Nhận tin nhắn và cập nhật thay đổi (sửa/xóa) theo thời gian thực |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Ứng dụng đang chạy; cả `member@test.com` và `member2@test.com` đều đăng nhập đồng thời trên 2 phiên trình duyệt/tab khác nhau và đang mở chat nhóm `Group Chat Test` |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 9     |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Thành viên đang online nhận được tin nhắn mới ngay lập tức, không cần reload
- [ ] Tin nhắn bị sửa → thành viên khác thấy nội dung mới + nhãn "đã chỉnh sửa" ngay
- [ ] Tin nhắn bị xóa → thành viên khác thấy tin nhắn biến mất ngay
- [ ] Reaction được thêm/gỡ → số đếm cập nhật ngay trên màn hình thành viên khác
- [ ] File mới chia sẻ → thành viên khác nhận được ngay
- [ ] Không cần tải lại trang (no reload) để thấy các cập nhật
- [ ] Kết nối lại sau mất mạng → vẫn nhận được tin nhắn bị bỏ lỡ

---

## TEST CASES

### UI TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_CHAT_REALTIME_01 | Tin nhắn mới hiển thị ngay không cần reload — FR-CHAT-6.1 | `member@test.com` và `member2@test.com` đang mở chat nhóm trên 2 tab riêng | 1. `member@test.com` gửi `"Tin realtime"`<br>2. Quan sát ngay màn hình `member2@test.com` | `"Tin realtime"` | Tin nhắn `"Tin realtime"` xuất hiện trong khung chat của `member2@test.com` trong vòng < 3 giây (NFR-PERF-1); không cần F5 | | | |
| TC_CHAT_REALTIME_02 | Giao diện tự cuộn xuống tin nhắn mới nhất | `member2@test.com` đang xem chat nhóm ở vị trí mới nhất | 1. `member@test.com` gửi tin nhắn mới | — | Màn hình của `member2@test.com` tự cuộn xuống để hiển thị tin nhắn mới nhất | | | |

---

### FUNCTION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_CHAT_REALTIME_03 | Tin nhắn bị sửa cập nhật ngay cho thành viên khác — FR-CHAT-6.2 | Cả hai đang online; `member@test.com` có tin nhắn `"Cũ"` trong nhóm | 1. `member@test.com` sửa `"Cũ"` thành `"Mới"`<br>2. Quan sát ngay màn hình `member2@test.com` | `"Mới"` | Tin nhắn trên màn hình `member2@test.com` cập nhật thành `"Mới"` kèm nhãn "(đã chỉnh sửa)" trong < 3 giây | | | |
| TC_CHAT_REALTIME_04 | Tin nhắn bị xóa biến mất ngay cho thành viên khác — FR-CHAT-6.2 | Cả hai đang online; `member@test.com` có tin nhắn `"Sẽ xóa"` trong nhóm | 1. `member@test.com` xóa tin nhắn `"Sẽ xóa"`<br>2. Quan sát ngay màn hình `member2@test.com` | — | Tin nhắn `"Sẽ xóa"` biến mất khỏi khung chat của `member2@test.com` trong < 3 giây; không có dấu vết nội dung | | | |
| TC_CHAT_REALTIME_05 | Reaction cập nhật realtime cho thành viên khác | Cả hai đang online | 1. `member@test.com` react `👍` vào tin nhắn<br>2. Quan sát màn hình `member2@test.com` | Emoji: `👍` | Emoji `👍` với số đếm `1` xuất hiện dưới tin nhắn trên màn hình `member2@test.com` trong < 3 giây | | | |
| TC_CHAT_REALTIME_06 | File mới gửi hiển thị realtime cho thành viên khác | Cả hai đang online | 1. `member@test.com` gửi file `doc.pdf`<br>2. Quan sát màn hình `member2@test.com` | File: `doc.pdf` | File `doc.pdf` xuất hiện trong khung chat của `member2@test.com` ngay lập tức | | | |
| TC_CHAT_REALTIME_07 | Người dùng đang xem chat nhóm khác không nhận realtime của nhóm này | `member2@test.com` đang mở chat của nhóm khác, không phải `Group Chat Test` | 1. `member@test.com` gửi tin nhắn vào `Group Chat Test`<br>2. Quan sát màn hình của `member2@test.com` | `"Tin cho nhóm"` | Tin nhắn không xuất hiện trong chat nhóm khác đang mở; nhưng có thể hiển thị badge thông báo chưa đọc cho `Group Chat Test` | | | |

---

### BUSINESS FLOW

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_CHAT_REALTIME_08 | Luồng nhận tin nhắn realtime liên tiếp từ nhiều thành viên | `member@test.com`, `member2@test.com` đang online | 1. `member@test.com` gửi `"Tin 1"`<br>2. `member2@test.com` gửi `"Tin 2"`<br>3. `member@test.com` gửi `"Tin 3"`<br>4. Cả hai quan sát khung chat | — | Cả hai màn hình hiển thị đúng 3 tin nhắn theo thứ tự: Tin 1 → Tin 2 → Tin 3; không bị thiếu hoặc trùng tin | | | |
| TC_CHAT_REALTIME_09 | Kết nối lại sau mất mạng ngắn — nhận tin nhắn bị bỏ lỡ | `member2@test.com` mất mạng trong lúc `member@test.com` gửi `"Tin bị lỡ"` | 1. `member2@test.com` tắt kết nối mạng<br>2. `member@test.com` gửi `"Tin bị lỡ"`<br>3. `member2@test.com` kết nối lại mạng<br>4. Quan sát khung chat | `"Tin bị lỡ"` | Sau khi kết nối lại, `"Tin bị lỡ"` xuất hiện trong chat của `member2@test.com`; không bị mất | | | |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
