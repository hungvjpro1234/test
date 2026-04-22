# TC_CHAT_EDIT_DELETE — FR-CHAT-3: Sửa và Xóa Tin Nhắn

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | FR-CHAT — Chat nhóm |
| Feature | FR-CHAT-3 — Sửa và xóa tin nhắn nhóm |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Ứng dụng đang chạy; đăng nhập `member@test.com` / `Abc@1234`; nhóm `Group Chat Test` gồm `member@test.com` và `member2@test.com`; mỗi user đã gửi ít nhất 1 tin nhắn trong nhóm |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 14    |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Nút "Sửa" chỉ hiển thị trên tin nhắn do chính mình gửi
- [ ] Sửa tin nhắn của mình → nội dung cập nhật, hiển thị nhãn "đã chỉnh sửa"
- [ ] Cố sửa tin nhắn của người khác → hiển thị thông báo không có quyền
- [ ] Nút "Xóa" chỉ hiển thị trên tin nhắn do chính mình gửi
- [ ] Xóa tin nhắn của mình → tin nhắn không còn hiển thị
- [ ] Cố xóa tin nhắn của người khác → hiển thị thông báo không có quyền
- [ ] Sửa tin nhắn thành rỗng → không lưu, hiển thị thông báo lỗi
- [ ] Sửa tin nhắn vượt 5000 ký tự → không lưu, hiển thị thông báo lỗi
- [ ] Thành viên khác online thấy thay đổi sửa/xóa ngay lập tức — FR-CHAT-6.2

---

## TEST CASES

### UI TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_CHAT_EDIT_DELETE_01 | Nút "Sửa" chỉ hiện trên tin nhắn của mình | Đăng nhập `member@test.com`; nhóm có tin nhắn của `member@test.com` và `member2@test.com` | 1. Mở chat nhóm<br>2. Hover/nhấn vào tin nhắn của `member@test.com`<br>3. Hover/nhấn vào tin nhắn của `member2@test.com` | — | Tùy chọn "Sửa" chỉ xuất hiện trên tin nhắn của `member@test.com`; không xuất hiện trên tin nhắn của `member2@test.com` | | | |
| TC_CHAT_EDIT_DELETE_02 | Nút "Xóa" chỉ hiện trên tin nhắn của mình | Đăng nhập `member@test.com` | 1. Mở chat nhóm<br>2. Hover/nhấn vào tin nhắn của `member@test.com`<br>3. Hover/nhấn vào tin nhắn của `member2@test.com` | — | Tùy chọn "Xóa" chỉ xuất hiện trên tin nhắn của `member@test.com`; không xuất hiện trên tin nhắn của `member2@test.com` | | | |
| TC_CHAT_EDIT_DELETE_03 | Nhãn "đã chỉnh sửa" hiển thị sau khi sửa | `member@test.com` vừa sửa tin nhắn | 1. Quan sát tin nhắn vừa sửa trong khung chat | — | Tin nhắn hiển thị nhãn "(đã chỉnh sửa)" hoặc ký hiệu tương đương kèm nội dung mới | | | |

---

### VALIDATION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_CHAT_EDIT_DELETE_04 | Sửa tin nhắn thành rỗng — không lưu | Đăng nhập `member@test.com`; có tin nhắn `"Tin gốc"` do mình gửi | 1. Nhấn "Sửa" trên tin nhắn `"Tin gốc"`<br>2. Xóa toàn bộ nội dung<br>3. Lưu | `""` (rỗng) | Hệ thống hiển thị thông báo lỗi; không lưu; nội dung tin nhắn vẫn là `"Tin gốc"` | | | |
| TC_CHAT_EDIT_DELETE_05 | Sửa tin nhắn vượt 5000 ký tự — C-11 | Đăng nhập `member@test.com`; có tin nhắn do mình gửi | 1. Nhấn "Sửa"<br>2. Nhập nội dung 5001 ký tự<br>3. Lưu | Chuỗi `"a" × 5001` | Hệ thống hiển thị thông báo lỗi "Tin nhắn vượt giới hạn 5000 ký tự"; không lưu nội dung mới | | | |

---

### FUNCTION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_CHAT_EDIT_DELETE_06 | Sửa tin nhắn của mình thành công — FR-CHAT-3.1 | Đăng nhập `member@test.com`; có tin nhắn `"Nội dung cũ"` do mình gửi | 1. Nhấn "Sửa" trên tin nhắn<br>2. Sửa thành `"Nội dung đã sửa"`<br>3. Lưu | `"Nội dung đã sửa"` | Tin nhắn hiển thị nội dung `"Nội dung đã sửa"` kèm nhãn "(đã chỉnh sửa)"; nội dung cũ không còn xuất hiện | | | |
| TC_CHAT_EDIT_DELETE_07 | Cố sửa tin nhắn của người khác — FR-CHAT-3.2 | Đăng nhập `member@test.com`; có tin nhắn của `member2@test.com` trong nhóm | 1. Cố gọi API sửa tin nhắn của `member2@test.com` (không qua UI nút sửa) | — | Hệ thống trả về thông báo không có quyền; tin nhắn của `member2@test.com` không bị thay đổi | | | |
| TC_CHAT_EDIT_DELETE_08 | Xóa tin nhắn của mình thành công — FR-CHAT-3.3 | Đăng nhập `member@test.com`; có tin nhắn `"Tin sẽ xóa"` do mình gửi | 1. Nhấn "Xóa" trên tin nhắn `"Tin sẽ xóa"`<br>2. Xác nhận xóa | — | Tin nhắn biến mất khỏi danh sách chat; các tin nhắn khác không bị ảnh hưởng | | | |
| TC_CHAT_EDIT_DELETE_09 | Cố xóa tin nhắn của người khác — FR-CHAT-3.4 | Đăng nhập `member@test.com`; có tin nhắn của `member2@test.com` trong nhóm | 1. Cố gọi API xóa tin nhắn của `member2@test.com` (không qua UI nút xóa) | — | Hệ thống trả về thông báo không có quyền; tin nhắn của `member2@test.com` vẫn còn trong danh sách | | | |
| TC_CHAT_EDIT_DELETE_10 | Hủy thao tác sửa — không lưu thay đổi | Đăng nhập `member@test.com`; đang chỉnh sửa tin nhắn | 1. Nhấn "Sửa" trên tin nhắn `"Nội dung gốc"`<br>2. Sửa thành `"Nội dung tạm"`<br>3. Nhấn "Hủy" | — | Tin nhắn vẫn hiển thị nội dung `"Nội dung gốc"`; không xuất hiện nhãn "(đã chỉnh sửa)" | | | |
| TC_CHAT_EDIT_DELETE_11 | Thành viên khác thấy tin nhắn xóa biến mất ngay — FR-CHAT-6.2 | `member@test.com` và `member2@test.com` đang online cùng nhóm | 1. `member@test.com` xóa tin nhắn của mình<br>2. Kiểm tra ngay trên màn hình của `member2@test.com` | — | Tin nhắn biến mất ngay lập tức trong khung chat của `member2@test.com` mà không cần reload trang | | | |
| TC_CHAT_EDIT_DELETE_12 | Thành viên khác thấy nội dung sửa cập nhật ngay — FR-CHAT-6.2 | `member@test.com` và `member2@test.com` đang online cùng nhóm | 1. `member@test.com` sửa tin nhắn thành `"Nội dung mới"`<br>2. Kiểm tra ngay trên màn hình của `member2@test.com` | — | Tin nhắn trên màn hình `member2@test.com` cập nhật ngay thành `"Nội dung mới"` kèm nhãn "(đã chỉnh sửa)" | | | |

---

### BUSINESS FLOW

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_CHAT_EDIT_DELETE_13 | Luồng sửa tin nhắn thành công và kiểm tra lịch sử | Đăng nhập `member@test.com`; gửi tin nhắn `"Phiên bản 1"` | 1. Nhấn "Sửa" → đổi thành `"Phiên bản 2"` → Lưu<br>2. Cuộn lên xem lịch sử | `"Phiên bản 2"` | Lịch sử chat hiển thị `"Phiên bản 2"` với nhãn "(đã chỉnh sửa)"; không còn `"Phiên bản 1"` | | | |
| TC_CHAT_EDIT_DELETE_14 | Luồng xóa tin nhắn và kiểm tra lịch sử không còn tin đó | Đăng nhập `member@test.com`; gửi `"Tin cần xóa"` | 1. Nhấn "Xóa" trên `"Tin cần xóa"` → Xác nhận<br>2. Cuộn qua lịch sử chat | — | Không tìm thấy `"Tin cần xóa"` trong toàn bộ lịch sử; các tin nhắn khác không bị mất | | | |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
