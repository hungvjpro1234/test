# TC_DIRECT_REACT — FR-DIRECT-6: React Tin Nhắn Trực Tiếp

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | FR-DIRECT — Tin nhắn trực tiếp |
| Feature | FR-DIRECT-6 — Thêm/gỡ emoji reaction vào tin nhắn trong hội thoại 1-1 (toggle) |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Ứng dụng đang chạy; đăng nhập `user1@test.com` / `Abc@1234`; hội thoại 1-1 giữa `user1@test.com` và `user2@test.com` đã có ít nhất 2 tin nhắn (1 của mỗi người) |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 10    |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Có thể chọn emoji để react vào tin nhắn trong hội thoại 1-1 — FR-DIRECT-6.1
- [ ] Reaction hiển thị đúng số lượng bên dưới tin nhắn sau khi thêm
- [ ] Bấm lại emoji đã react → gỡ reaction (toggle) — FR-DIRECT-6.1
- [ ] Số đếm reaction giảm đúng sau khi gỡ
- [ ] Có thể react vào tin nhắn của người khác
- [ ] Có thể react vào tin nhắn của chính mình
- [ ] Nhiều người có thể cùng react một emoji → số đếm tăng đúng
- [ ] Mỗi người chỉ được react một lần mỗi loại emoji trên một tin nhắn
- [ ] Người kia (đang online) thấy reaction cập nhật ngay lập tức

---

## TEST CASES

### UI TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_DIRECT_REACT_01 | Giao diện chọn emoji reaction hiển thị khi hover/nhấn vào tin nhắn | Đăng nhập `user1@test.com`; đang mở hội thoại có tin nhắn | 1. Hover hoặc nhấn vào tin nhắn | — | Bảng emoji reaction (emoji picker) hoặc icon emoji xuất hiện gần tin nhắn | | | |
| TC_DIRECT_REACT_02 | Reaction hiển thị với số đếm bên dưới tin nhắn | `user1@test.com` vừa react 👍 vào tin nhắn | 1. Quan sát tin nhắn vừa react | — | Emoji 👍 hiển thị bên dưới tin nhắn kèm số đếm `1` | | | |
| TC_DIRECT_REACT_03 | Reaction của chính mình hiển thị khác biệt (highlight) | Đăng nhập `user1@test.com`; đã react 👍 vào tin | 1. Quan sát emoji reaction 👍 dưới tin nhắn | — | Emoji 👍 của `user1@test.com` được highlight/phân biệt so với reaction của người khác | | | |

---

### VALIDATION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_DIRECT_REACT_04 | Mỗi người chỉ được react một lần mỗi emoji — không trùng lặp | Đăng nhập `user1@test.com`; đã react 👍 vào tin | 1. Cố react 👍 thêm một lần nữa vào cùng tin nhắn đó | Emoji: 👍 | Hệ thống không tăng số đếm; thay vào đó gỡ reaction (toggle off) | | | |

---

### FUNCTION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_DIRECT_REACT_05 | Thêm reaction vào tin nhắn thành công — FR-DIRECT-6.1 | Đăng nhập `user1@test.com`; đang mở hội thoại | 1. Chọn emoji 😂 react vào tin nhắn của `user2@test.com` | Emoji: 😂 | Emoji 😂 xuất hiện bên dưới tin nhắn với số đếm `1` | | | |
| TC_DIRECT_REACT_06 | Gỡ reaction bằng cách bấm lại — toggle off — FR-DIRECT-6.1 | `user1@test.com` đã react 😂 vào tin nhắn | 1. Bấm lại vào emoji 😂 đã react | Emoji: 😂 | Emoji 😂 biến mất hoặc số đếm giảm về `0` (nếu chỉ có một người react) | | | |
| TC_DIRECT_REACT_07 | React vào tin nhắn của chính mình | Đăng nhập `user1@test.com`; có tin nhắn do mình gửi | 1. Chọn emoji ❤️ react vào tin nhắn của chính mình | Emoji: ❤️ | Emoji ❤️ hiển thị bên dưới tin nhắn với số đếm `1` | | | |
| TC_DIRECT_REACT_08 | Nhiều người cùng react một emoji — số đếm tăng đúng | `user1@test.com` đã react 👍 vào tin; `user2@test.com` cũng react 👍 vào cùng tin đó | 1. `user2@test.com` chọn emoji 👍 react vào cùng tin nhắn<br>2. Quan sát số đếm | Emoji: 👍 | Số đếm 👍 tăng lên `2`; hiển thị đúng trên cả hai màn hình | | | |
| TC_DIRECT_REACT_09 | Reaction cập nhật ngay lập tức cho người kia — realtime | `user1@test.com` và `user2@test.com` đang online | 1. `user1@test.com` react 🔥 vào tin nhắn<br>2. Quan sát màn hình `user2@test.com` | Emoji: 🔥 | Emoji 🔥 xuất hiện ngay lập tức bên dưới tin nhắn trên màn hình `user2@test.com` mà không cần reload | | | |

---

### BUSINESS FLOW

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_DIRECT_REACT_10 | Luồng react → toggle off → đếm về 0 → emoji biến mất | Đăng nhập `user1@test.com`; chỉ mình react 👍 vào tin nhắn | 1. Quan sát: số đếm 👍 là `1`<br>2. Bấm lại 👍 để gỡ<br>3. Quan sát lại tin nhắn | Emoji: 👍 | Sau khi gỡ: emoji 👍 biến mất hoàn toàn khỏi tin nhắn; số đếm không còn hiển thị | | | |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
