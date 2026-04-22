# TC_CHAT_REACTION — FR-CHAT-4: Phản Ứng (Reaction) Tin Nhắn

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | FR-CHAT — Chat nhóm |
| Feature | FR-CHAT-4 — Thêm và xóa reaction trên tin nhắn nhóm |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Ứng dụng đang chạy; đăng nhập `member@test.com` / `Abc@1234`; nhóm `Group Chat Test` gồm `member@test.com` và `member2@test.com`; có ít nhất 1 tin nhắn trong nhóm |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 11    |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Bảng chọn emoji hiển thị khi người dùng tương tác vào tin nhắn
- [ ] Thêm reaction → emoji + số lượng hiển thị ngay dưới tin nhắn
- [ ] Bấm lại vào emoji đã react → gỡ reaction (toggle off)
- [ ] Số lượng reaction cập nhật đúng sau mỗi lần thêm/gỡ
- [ ] Nhiều người cùng react cùng emoji → số lượng tích lũy đúng
- [ ] Mỗi người chỉ react 1 lần cho mỗi loại emoji trên cùng 1 tin nhắn
- [ ] Reaction của người dùng được phân biệt trực quan (highlight) so với reaction của người khác
- [ ] Người không thuộc nhóm không thể react tin nhắn

---

## TEST CASES

### UI TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_CHAT_REACTION_01 | Bảng chọn emoji hiển thị khi tương tác với tin nhắn | Đăng nhập `member@test.com`; có tin nhắn trong nhóm | 1. Hover hoặc nhấn vào nút reaction/emoji trên tin nhắn | — | Bảng chọn emoji (emoji picker) hiển thị với các lựa chọn emoji có thể react | | | |
| TC_CHAT_REACTION_02 | Emoji + số lượng hiển thị dưới tin nhắn sau khi react | Đăng nhập `member@test.com`; vừa react `👍` vào tin nhắn | 1. Quan sát khu vực dưới tin nhắn | — | Emoji `👍` hiển thị kèm số `1` ngay dưới tin nhắn; phần reaction rõ ràng, đọc được | | | |
| TC_CHAT_REACTION_03 | Reaction của người dùng hiện tại được highlight | Đăng nhập `member@test.com`; đã react `❤️` vào tin nhắn | 1. Quan sát khu vực reaction của tin nhắn đó | — | Emoji `❤️` của `member@test.com` được hiển thị highlight/khác màu so với reaction của người khác | | | |

---

### FUNCTION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_CHAT_REACTION_04 | Thêm reaction thành công — FR-CHAT-4.1 | Đăng nhập `member@test.com`; tin nhắn chưa có reaction nào | 1. Nhấn vào nút emoji trên tin nhắn<br>2. Chọn emoji `👍` | Emoji: `👍` | Emoji `👍` hiển thị bên dưới tin nhắn với số đếm `1`; reaction được lưu | | | |
| TC_CHAT_REACTION_05 | Gỡ reaction bằng toggle — FR-CHAT-4.2 | Đăng nhập `member@test.com`; đã react `👍` vào tin nhắn | 1. Nhấn lại vào emoji `👍` đang hiển thị dưới tin nhắn | — | Emoji `👍` biến mất (nếu chỉ có 1 reaction) hoặc số đếm giảm 1; reaction của `member@test.com` bị gỡ | | | |
| TC_CHAT_REACTION_06 | Nhiều người react cùng 1 emoji — số lượng tích lũy đúng | `member@test.com` đã react `😂` vào tin nhắn | 1. Đăng nhập `member2@test.com`<br>2. React `😂` vào cùng tin nhắn đó | — | Số đếm của emoji `😂` tăng từ `1` lên `2`; cả hai tên người react hiện trong tooltip | | | |
| TC_CHAT_REACTION_07 | Mỗi người chỉ react 1 lần cho mỗi loại emoji | Đăng nhập `member@test.com`; đã react `👍` vào tin nhắn | 1. Thử react `👍` thêm lần nữa vào cùng tin nhắn đó | — | Hệ thống không thêm reaction trùng; số đếm `👍` vẫn là `1` (hoặc chuyển về trạng thái toggle off) | | | |
| TC_CHAT_REACTION_08 | React nhiều loại emoji khác nhau vào cùng 1 tin nhắn | Đăng nhập `member@test.com` | 1. React `👍` vào tin nhắn<br>2. React thêm `❤️` vào cùng tin nhắn | — | Cả `👍` (1) và `❤️` (1) hiển thị dưới tin nhắn; hai reaction độc lập, không ảnh hưởng nhau | | | |
| TC_CHAT_REACTION_09 | Số lượng reaction giảm về 0 → emoji biến mất | Đăng nhập `member@test.com`; chỉ có reaction `👍` duy nhất từ `member@test.com` | 1. Nhấn lại `👍` để gỡ reaction | — | Emoji `👍` biến mất hoàn toàn khỏi khu vực reaction của tin nhắn | | | |

---

### BUSINESS FLOW

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_CHAT_REACTION_10 | Luồng thêm → tích lũy → gỡ reaction hoàn chỉnh | Cả `member@test.com` và `member2@test.com` đang online | 1. `member@test.com` react `🔥` vào tin nhắn → đếm = 1<br>2. `member2@test.com` react `🔥` → đếm = 2<br>3. `member@test.com` gỡ reaction → đếm = 1<br>4. `member2@test.com` gỡ reaction → đếm = 0 | Emoji: `🔥` | Số đếm thay đổi chính xác qua từng bước: 1 → 2 → 1 → emoji biến mất; không có sai lệch đếm | | | |
| TC_CHAT_REACTION_11 | Reaction cập nhật realtime cho thành viên khác online | `member@test.com` và `member2@test.com` đang online | 1. `member@test.com` react `👏` vào tin nhắn<br>2. Kiểm tra ngay màn hình `member2@test.com` | — | Emoji `👏` với số `1` hiển thị ngay lập tức trên màn hình `member2@test.com` mà không cần reload | | | |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
