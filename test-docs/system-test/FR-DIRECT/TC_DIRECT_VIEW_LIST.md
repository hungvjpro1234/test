# TC_DIRECT_VIEW_LIST — FR-DIRECT-1: Xem Danh Sách Cuộc Hội Thoại

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | FR-DIRECT — Tin nhắn trực tiếp |
| Feature | FR-DIRECT-1 — Xem danh sách tất cả cuộc hội thoại 1-1 của người dùng |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Ứng dụng đang chạy; đăng nhập `user1@test.com` / `Abc@1234`; `user1@test.com` đã có ít nhất 2 cuộc hội thoại 1-1 với `user2@test.com` và `user3@test.com` |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 8     |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Mục "Tin nhắn trực tiếp" hiển thị trong thanh điều hướng
- [ ] Danh sách hội thoại hiển thị đúng khi mở mục tin nhắn trực tiếp — FR-DIRECT-1.1
- [ ] Mỗi hội thoại hiển thị tên người dùng kia và tin nhắn cuối cùng
- [ ] Thứ tự danh sách hội thoại sắp xếp theo thời gian tin nhắn mới nhất
- [ ] Hội thoại chưa đọc hiển thị chỉ báo/số lượng tin chưa đọc
- [ ] Người dùng không có hội thoại nào → danh sách rỗng, không lỗi
- [ ] Chỉ hiển thị hội thoại của chính người dùng đang đăng nhập — NFR-SEC-3

---

## TEST CASES

### UI TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_DIRECT_VIEW_LIST_01 | Mục "Tin nhắn trực tiếp" hiển thị trong thanh điều hướng | Đăng nhập `user1@test.com` | 1. Quan sát thanh điều hướng chính | — | Có biểu tượng/mục "Tin nhắn trực tiếp" (Direct Messages) hiển thị rõ trong thanh điều hướng | | | |
| TC_DIRECT_VIEW_LIST_02 | Mỗi hội thoại hiển thị tên và tin nhắn cuối | `user1@test.com` đã có hội thoại với `user2@test.com`, tin cuối là `"Hẹn gặp lại nhé"` | 1. Nhấn mục "Tin nhắn trực tiếp"<br>2. Quan sát từng dòng trong danh sách | — | Mỗi hội thoại hiển thị: avatar, tên người dùng kia, đoạn trích tin nhắn cuối cùng | | | |
| TC_DIRECT_VIEW_LIST_03 | Hội thoại chưa đọc có chỉ báo số lượng | `user2@test.com` gửi 3 tin cho `user1@test.com`, `user1@test.com` chưa đọc | 1. Đăng nhập `user1@test.com`<br>2. Mở mục "Tin nhắn trực tiếp" | — | Hội thoại với `user2@test.com` hiển thị badge hoặc số `3` chỉ tin chưa đọc | | | |

---

### VALIDATION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_DIRECT_VIEW_LIST_04 | Người dùng chưa đăng nhập không thể xem danh sách — C-1 | Người dùng chưa đăng nhập | 1. Truy cập trực tiếp URL trang tin nhắn trực tiếp | — | Hệ thống chuyển hướng về trang đăng nhập; không hiển thị danh sách hội thoại | | | |
| TC_DIRECT_VIEW_LIST_05 | Người dùng không có hội thoại nào — danh sách rỗng | Đăng nhập `newuser@test.com` chưa từng nhắn tin | 1. Mở mục "Tin nhắn trực tiếp" | — | Danh sách rỗng; hiển thị thông báo hướng dẫn bắt đầu hội thoại mới; không có lỗi | | | |

---

### FUNCTION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_DIRECT_VIEW_LIST_06 | Xem danh sách hội thoại thành công — FR-DIRECT-1.1 | Đăng nhập `user1@test.com`; đã có 2 hội thoại với `user2@test.com` và `user3@test.com` | 1. Nhấn mục "Tin nhắn trực tiếp" | — | Hiển thị đầy đủ 2 hội thoại; mỗi hội thoại có tên người dùng kia và nội dung tin nhắn cuối | | | |
| TC_DIRECT_VIEW_LIST_07 | Danh sách sắp xếp theo thời gian mới nhất | `user1@test.com` có hội thoại với `user2@test.com` (tin cũ) và `user3@test.com` (tin mới hơn) | 1. Mở mục "Tin nhắn trực tiếp" | — | Hội thoại với `user3@test.com` xuất hiện trên cùng; hội thoại với `user2@test.com` bên dưới | | | |

---

### BUSINESS FLOW

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_DIRECT_VIEW_LIST_08 | Hội thoại mới nhất tự động lên đầu danh sách sau khi gửi tin | `user1@test.com` đang xem danh sách; `user2@test.com` nằm bên dưới `user3@test.com` | 1. `user2@test.com` gửi tin nhắn mới cho `user1@test.com`<br>2. `user1@test.com` quan sát lại danh sách | — | Hội thoại với `user2@test.com` tự động chuyển lên đầu danh sách; không cần tải lại trang | | | |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
