# TC_DIRECT_EDIT_DELETE — FR-DIRECT-5: Sửa và Xóa Tin Nhắn Trực Tiếp

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | FR-DIRECT — Tin nhắn trực tiếp |
| Feature | FR-DIRECT-5 — Sửa và xóa tin nhắn trong hội thoại 1-1 |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Ứng dụng đang chạy; đăng nhập `user1@test.com` / `Abc@1234`; hội thoại 1-1 giữa `user1@test.com` và `user2@test.com` đã tồn tại; mỗi người đã gửi ít nhất 1 tin nhắn trong hội thoại |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 14    |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Nút "Sửa" chỉ hiển thị trên tin nhắn do chính mình gửi — C-5
- [ ] Nút "Xóa" chỉ hiển thị trên tin nhắn do chính mình gửi — C-5
- [ ] Sửa tin nhắn của mình thành công → nội dung cập nhật, hiển thị nhãn "đã chỉnh sửa" — FR-DIRECT-5.1
- [ ] Cố sửa tin nhắn của người khác → thông báo không có quyền — FR-DIRECT-5.1 / C-5
- [ ] Xóa tin nhắn của mình thành công → tin biến mất khỏi hội thoại — FR-DIRECT-5.1
- [ ] Cố xóa tin nhắn của người khác → thông báo không có quyền — FR-DIRECT-5.1 / C-5
- [ ] Sửa tin nhắn thành rỗng → không lưu, thông báo lỗi
- [ ] Sửa tin nhắn vượt 5000 ký tự → không lưu, thông báo lỗi — C-11
- [ ] Người kia (đang online) thấy thay đổi sửa/xóa ngay lập tức

---

## TEST CASES

### UI TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_DIRECT_EDIT_DELETE_01 | Nút "Sửa" chỉ hiển thị trên tin nhắn của mình — C-5 | Đăng nhập `user1@test.com`; hội thoại có tin nhắn của cả hai bên | 1. Mở hội thoại<br>2. Hover/nhấn vào tin nhắn của `user1@test.com`<br>3. Hover/nhấn vào tin nhắn của `user2@test.com` | — | Tùy chọn "Sửa" chỉ xuất hiện trên tin nhắn của `user1@test.com`; không xuất hiện trên tin của `user2@test.com` | | | |
| TC_DIRECT_EDIT_DELETE_02 | Nút "Xóa" chỉ hiển thị trên tin nhắn của mình — C-5 | Đăng nhập `user1@test.com`; hội thoại có tin nhắn của cả hai bên | 1. Mở hội thoại<br>2. Hover/nhấn vào tin nhắn của `user1@test.com`<br>3. Hover/nhấn vào tin nhắn của `user2@test.com` | — | Tùy chọn "Xóa" chỉ xuất hiện trên tin nhắn của `user1@test.com`; không xuất hiện trên tin của `user2@test.com` | | | |
| TC_DIRECT_EDIT_DELETE_03 | Nhãn "đã chỉnh sửa" hiển thị sau khi sửa tin | `user1@test.com` vừa sửa tin nhắn trong hội thoại | 1. Quan sát tin nhắn vừa sửa | — | Tin nhắn hiển thị nhãn "(đã chỉnh sửa)" hoặc ký hiệu tương đương kèm nội dung mới | | | |

---

### VALIDATION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_DIRECT_EDIT_DELETE_04 | Sửa tin nhắn thành rỗng — không lưu | Đăng nhập `user1@test.com`; có tin `"Nội dung gốc"` do mình gửi | 1. Nhấn "Sửa"<br>2. Xóa toàn bộ nội dung<br>3. Lưu | `""` (rỗng) | Hệ thống hiển thị thông báo lỗi; không lưu; tin nhắn vẫn hiển thị `"Nội dung gốc"` | | | |
| TC_DIRECT_EDIT_DELETE_05 | Sửa tin nhắn vượt 5000 ký tự — C-11 | Đăng nhập `user1@test.com`; có tin nhắn do mình gửi | 1. Nhấn "Sửa"<br>2. Nhập 5001 ký tự<br>3. Lưu | Chuỗi `"a" × 5001` | Hệ thống hiển thị thông báo lỗi "Tin nhắn vượt giới hạn 5000 ký tự"; không lưu nội dung mới | | | |
| TC_DIRECT_EDIT_DELETE_06 | Hủy thao tác sửa — không lưu thay đổi | Đăng nhập `user1@test.com`; đang chỉnh sửa tin nhắn `"Nội dung gốc"` | 1. Nhấn "Sửa"<br>2. Đổi thành `"Nội dung tạm"`<br>3. Nhấn "Hủy" | `"Nội dung tạm"` | Tin nhắn vẫn hiển thị `"Nội dung gốc"`; không có nhãn "(đã chỉnh sửa)" | | | |

---

### FUNCTION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_DIRECT_EDIT_DELETE_07 | Sửa tin nhắn của mình thành công — FR-DIRECT-5.1 | Đăng nhập `user1@test.com`; có tin `"Phiên bản 1"` do mình gửi | 1. Nhấn "Sửa" trên tin `"Phiên bản 1"`<br>2. Đổi thành `"Phiên bản 2"`<br>3. Lưu | `"Phiên bản 2"` | Tin nhắn hiển thị `"Phiên bản 2"` kèm nhãn "(đã chỉnh sửa)"; `"Phiên bản 1"` không còn xuất hiện | | | |
| TC_DIRECT_EDIT_DELETE_08 | Cố sửa tin nhắn của người khác — FR-DIRECT-5.1 / C-5 | Đăng nhập `user1@test.com`; có tin nhắn của `user2@test.com` trong hội thoại | 1. Cố gọi API sửa tin nhắn của `user2@test.com` | — | Hệ thống trả về thông báo không có quyền; tin nhắn của `user2@test.com` không bị thay đổi | | | |
| TC_DIRECT_EDIT_DELETE_09 | Xóa tin nhắn của mình thành công — FR-DIRECT-5.1 | Đăng nhập `user1@test.com`; có tin `"Tin sẽ xóa"` do mình gửi | 1. Nhấn "Xóa" trên tin `"Tin sẽ xóa"`<br>2. Xác nhận xóa | — | Tin nhắn biến mất khỏi hội thoại; các tin khác không bị ảnh hưởng | | | |
| TC_DIRECT_EDIT_DELETE_10 | Cố xóa tin nhắn của người khác — FR-DIRECT-5.1 / C-5 | Đăng nhập `user1@test.com`; có tin nhắn của `user2@test.com` trong hội thoại | 1. Cố gọi API xóa tin nhắn của `user2@test.com` | — | Hệ thống trả về thông báo không có quyền; tin nhắn của `user2@test.com` vẫn còn trong hội thoại | | | |
| TC_DIRECT_EDIT_DELETE_11 | Người kia thấy tin nhắn sửa cập nhật ngay — realtime | `user1@test.com` và `user2@test.com` đang online trong cùng hội thoại | 1. `user1@test.com` sửa tin thành `"Nội dung mới"`<br>2. Quan sát màn hình `user2@test.com` | `"Nội dung mới"` | Tin nhắn trên màn hình `user2@test.com` cập nhật ngay thành `"Nội dung mới"` kèm nhãn "(đã chỉnh sửa)" mà không cần reload | | | |
| TC_DIRECT_EDIT_DELETE_12 | Người kia thấy tin nhắn xóa biến mất ngay — realtime | `user1@test.com` và `user2@test.com` đang online trong cùng hội thoại | 1. `user1@test.com` xóa tin nhắn của mình<br>2. Quan sát màn hình `user2@test.com` | — | Tin nhắn biến mất ngay lập tức trên màn hình `user2@test.com` mà không cần reload trang | | | |

---

### BUSINESS FLOW

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_DIRECT_EDIT_DELETE_13 | Luồng sửa tin nhắn và kiểm tra lịch sử cập nhật | Đăng nhập `user1@test.com`; gửi tin `"Phiên bản 1"` | 1. Sửa thành `"Phiên bản 2"` → Lưu<br>2. Cuộn qua lịch sử | `"Phiên bản 2"` | Lịch sử chỉ hiển thị `"Phiên bản 2"` kèm nhãn "(đã chỉnh sửa)"; không còn `"Phiên bản 1"` | | | |
| TC_DIRECT_EDIT_DELETE_14 | Luồng xóa tin nhắn và kiểm tra lịch sử không còn tin đó | Đăng nhập `user1@test.com`; gửi tin `"Tin cần xóa"` | 1. Xóa `"Tin cần xóa"` → Xác nhận<br>2. Cuộn qua toàn bộ lịch sử | — | Không tìm thấy `"Tin cần xóa"` trong toàn bộ lịch sử; các tin nhắn khác không bị mất | | | |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
