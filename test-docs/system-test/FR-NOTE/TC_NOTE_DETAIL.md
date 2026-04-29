# TC_NOTE_DETAIL — FR-NOTE-3: Xem Chi Tiết Ghi Chú

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | FR-NOTE — Ghi chú cá nhân |
| Feature | FR-NOTE-3.1 / 3.2 / 3.3 — Xem chi tiết, ghi chú không tồn tại, quyền riêng tư |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Ứng dụng đang chạy; đăng nhập `user@test.com` / `Abc@1234`; tài khoản có ít nhất 1 ghi chú |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 9     |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Nhấn vào ghi chú trong danh sách → mở trang chi tiết — FR-NOTE-3.1
- [ ] Trang chi tiết hiển thị đầy đủ: tiêu đề, nội dung, ngày tạo/cập nhật
- [ ] Truy cập ghi chú đã xóa → thông báo không tìm thấy — FR-NOTE-3.2
- [ ] Truy cập ghi chú riêng tư của người khác → thông báo không có quyền — FR-NOTE-3.3
- [ ] Chủ sở hữu luôn xem được ghi chú riêng tư của mình — C-5
- [ ] Ghi chú công khai → người dùng khác xem được qua ID — FR-NOTE-7.1

---

## TEST CASES

### UI TEST

| ID | Test Case | Test Objective | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|----------------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_NOTE_DETAIL_01 | Trang chi tiết hiển thị đủ thông tin | Xác minh màn hình chi tiết ghi chú hiển thị đầy đủ thông tin cần thiết để người dùng đọc và xác nhận nội dung ghi chú. | Đăng nhập `user@test.com`; có ghi chú `"Ghi chú chi tiết"` với nội dung `"Nội dung đầy đủ"` | 1. Mở danh sách Ghi chú<br>2. Nhấn vào ghi chú `"Ghi chú chi tiết"` | — | Trang chi tiết hiển thị: tiêu đề `"Ghi chú chi tiết"`, nội dung `"Nội dung đầy đủ"`, ngày tạo/cập nhật | | | |

---

### FUNCTION TEST

| ID | Test Case | Test Objective | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|----------------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_NOTE_DETAIL_02 | Xem chi tiết ghi chú của mình — FR-NOTE-3.1 | Xác minh chủ sở hữu có thể mở và xem đầy đủ nội dung ghi chú của chính mình theo `FR-NOTE-3.1`. | Đăng nhập `user@test.com`; có ghi chú `"Ghi chú A"` | 1. Nhấn vào ghi chú `"Ghi chú A"` trong danh sách | — | Trang chi tiết mở ra với nội dung đầy đủ của `"Ghi chú A"` | | | |
| TC_NOTE_DETAIL_03 | Truy cập ghi chú đã bị xóa — FR-NOTE-3.2 | Xác minh hệ thống thông báo đúng khi người dùng truy cập vào ghi chú không còn tồn tại theo `FR-NOTE-3.2`. | Ghi chú với `id=999` đã bị xóa khỏi hệ thống | 1. Truy cập trực tiếp URL `/notes/999` | — | Hệ thống hiển thị thông báo "Không tìm thấy ghi chú" hoặc tương đương; không hiển thị màn hình trắng — NFR-RELI-1 | | | |
| TC_NOTE_DETAIL_04 | Truy cập ghi chú riêng tư của người khác — FR-NOTE-3.3 | Xác minh người dùng không thể xem nội dung ghi chú riêng tư không được chia sẻ của người khác theo `FR-NOTE-3.3`. | `user2@test.com` có ghi chú riêng tư `id=100`; đăng nhập `user@test.com` | 1. Truy cập trực tiếp URL `/notes/100` với tài khoản `user@test.com` | — | Hệ thống hiển thị thông báo không có quyền truy cập; nội dung ghi chú không bị lộ — NFR-SEC-3 | | | |
| TC_NOTE_DETAIL_05 | Chủ sở hữu xem được ghi chú riêng tư của mình | Xác minh quyền riêng tư không ngăn cản chủ sở hữu truy cập và xem ghi chú riêng tư của chính họ. | Đăng nhập `user@test.com`; có ghi chú riêng tư `"Bí mật cá nhân"` | 1. Mở danh sách Ghi chú<br>2. Nhấn vào `"Bí mật cá nhân"` | — | Trang chi tiết hiển thị đầy đủ nội dung ghi chú cho chính chủ sở hữu | | | |
| TC_NOTE_DETAIL_06 | Người dùng khác xem ghi chú công khai qua ID — FR-NOTE-7.1 | Xác minh ghi chú công khai có thể được người dùng đã đăng nhập khác truy cập qua ID theo `FR-NOTE-7.1`. | `user@test.com` có ghi chú công khai `id=50`; đăng nhập `user2@test.com` | 1. Truy cập URL `/notes/50` với tài khoản `user2@test.com` | — | Nội dung ghi chú công khai hiển thị đầy đủ cho `user2@test.com` | | | |

---

### BUSINESS FLOW

| ID | Test Case | Test Objective | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|----------------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_NOTE_DETAIL_07 | Luồng xem chi tiết → chỉnh sửa → nội dung cập nhật đúng | Xác minh màn hình chi tiết ghi chú phản ánh đúng nội dung mới sau khi người dùng cập nhật ghi chú. | Đăng nhập `user@test.com`; có ghi chú `"Phiên bản 1"` | 1. Mở chi tiết ghi chú `"Phiên bản 1"`<br>2. Sửa nội dung thành `"Phiên bản 2"`<br>3. Lưu<br>4. Mở lại chi tiết | `"Phiên bản 2"` | Trang chi tiết hiển thị nội dung `"Phiên bản 2"` sau khi cập nhật | | | |
| TC_NOTE_DETAIL_08 | Nội dung ghi chú không bị thay đổi sau reload | Xác minh dữ liệu hiển thị ở trang chi tiết ghi chú được giữ ổn định sau khi tải lại trang. | Đăng nhập `user@test.com`; vừa mở chi tiết ghi chú `"Ghi chú ổn định"` | 1. Tải lại trang (F5)<br>2. Mở lại chi tiết ghi chú | — | Nội dung ghi chú không thay đổi sau reload | | | |
| TC_NOTE_DETAIL_09 | Người dùng chưa đăng nhập không thể xem chi tiết ghi chú — NFR-SEC-2 | Xác minh chức năng xem chi tiết ghi chú yêu cầu người dùng phải đăng nhập trước khi truy cập. | Người dùng chưa đăng nhập | 1. Truy cập trực tiếp URL `/notes/50` | — | Hệ thống chuyển hướng về trang đăng nhập | | | |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
