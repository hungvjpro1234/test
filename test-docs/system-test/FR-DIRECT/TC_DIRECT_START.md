# TC_DIRECT_START — FR-DIRECT-2: Bắt Đầu Hội Thoại Mới

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | FR-DIRECT — Tin nhắn trực tiếp |
| Feature | FR-DIRECT-2 — Bắt đầu hội thoại mới hoặc mở lại hội thoại đã có |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Ứng dụng đang chạy; đăng nhập `user1@test.com` / `Abc@1234`; `user2@test.com` tồn tại trong hệ thống; `user1@test.com` chưa có hội thoại với `user3@test.com` |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 9     |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Nút/icon "Tạo hội thoại mới" hoặc "Tìm người dùng" hiển thị trong giao diện
- [ ] Tìm kiếm đúng người dùng tồn tại → hiển thị kết quả — FR-DIRECT-2.1
- [ ] Chọn người dùng đã có hội thoại → mở lại hội thoại cũ, không tạo mới — FR-DIRECT-2.1
- [ ] Chọn người dùng chưa có hội thoại → tạo hội thoại mới — FR-DIRECT-2.1
- [ ] Tìm kiếm người không tồn tại → hiển thị thông báo lỗi — FR-DIRECT-2.2
- [ ] Không thể bắt đầu hội thoại với chính mình
- [ ] Hội thoại mới tạo xuất hiện trong danh sách hội thoại

---

## TEST CASES

### UI TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_DIRECT_START_01 | Nút "Tạo hội thoại mới" hiển thị trong giao diện | Đăng nhập `user1@test.com`; đang ở mục tin nhắn trực tiếp | 1. Quan sát giao diện mục tin nhắn trực tiếp | — | Có nút hoặc icon "Tạo mới" / "Tìm người dùng" hiển thị rõ ràng | | | |
| TC_DIRECT_START_02 | Giao diện tìm kiếm người dùng hiển thị khi nhấn tạo mới | Đăng nhập `user1@test.com` | 1. Nhấn nút "Tạo hội thoại mới" | — | Ô tìm kiếm hoặc modal tìm người dùng hiển thị; có thể nhập tên/email | | | |

---

### VALIDATION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_DIRECT_START_03 | Tìm kiếm người dùng không tồn tại — FR-DIRECT-2.2 | Đăng nhập `user1@test.com` | 1. Nhấn tạo hội thoại mới<br>2. Nhập `"nguoidungkhongtontai@xyz.com"`<br>3. Xác nhận | `"nguoidungkhongtontai@xyz.com"` | Hệ thống hiển thị thông báo "Không tìm thấy người dùng"; không tạo hội thoại | | | |
| TC_DIRECT_START_04 | Tìm kiếm bằng chuỗi rỗng | Đăng nhập `user1@test.com`; ô tìm kiếm đang mở | 1. Để trống ô tìm kiếm<br>2. Nhấn tìm | `""` (rỗng) | Hệ thống không trả về kết quả hoặc hiển thị thông báo yêu cầu nhập từ khóa | | | |
| TC_DIRECT_START_05 | Không thể bắt đầu hội thoại với chính mình | Đăng nhập `user1@test.com` | 1. Tìm kiếm `user1@test.com`<br>2. Cố chọn kết quả là chính mình | `user1@test.com` | Hệ thống không cho phép; hiển thị thông báo lỗi hoặc ẩn chính mình khỏi kết quả tìm kiếm | | | |

---

### FUNCTION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_DIRECT_START_06 | Bắt đầu hội thoại mới với người chưa có — FR-DIRECT-2.1 | Đăng nhập `user1@test.com`; chưa có hội thoại với `user3@test.com` | 1. Nhấn tạo hội thoại mới<br>2. Tìm và chọn `user3@test.com`<br>3. Xác nhận | — | Hội thoại mới được tạo và mở ngay lập tức; hội thoại xuất hiện trong danh sách của cả hai người | | | |
| TC_DIRECT_START_07 | Mở lại hội thoại đã có — FR-DIRECT-2.1 | Đăng nhập `user1@test.com`; đã có hội thoại với `user2@test.com` | 1. Nhấn tạo hội thoại mới<br>2. Tìm và chọn `user2@test.com` | — | Hệ thống mở lại hội thoại cũ với `user2@test.com`; không tạo hội thoại mới trùng lặp | | | |
| TC_DIRECT_START_08 | Hội thoại mới xuất hiện trong danh sách | `user1@test.com` vừa tạo hội thoại mới với `user3@test.com` | 1. Quay lại danh sách hội thoại | — | Hội thoại với `user3@test.com` xuất hiện trong danh sách của `user1@test.com` | | | |

---

### BUSINESS FLOW

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_DIRECT_START_09 | Luồng tạo hội thoại mới → gửi tin nhắn đầu tiên | Đăng nhập `user1@test.com`; chưa có hội thoại với `user3@test.com` | 1. Tạo hội thoại mới với `user3@test.com`<br>2. Nhập `"Xin chào!"`<br>3. Gửi | `"Xin chào!"` | Hội thoại được tạo; tin nhắn `"Xin chào!"` hiển thị trong khung hội thoại; `user3@test.com` nhận được thông báo tin nhắn mới | | | |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
