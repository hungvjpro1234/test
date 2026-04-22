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

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_NOTE_DETAIL_01 | Trang chi tiết hiển thị đủ thông tin | Đăng nhập `user@test.com`; có ghi chú `"Ghi chú chi tiết"` với nội dung `"Nội dung đầy đủ"` | 1. Mở danh sách Ghi chú<br>2. Nhấn vào ghi chú `"Ghi chú chi tiết"` | — | Trang chi tiết hiển thị: tiêu đề `"Ghi chú chi tiết"`, nội dung `"Nội dung đầy đủ"`, ngày tạo/cập nhật | | | |

---

### FUNCTION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_NOTE_DETAIL_02 | Xem chi tiết ghi chú của mình — FR-NOTE-3.1 | Đăng nhập `user@test.com`; có ghi chú `"Ghi chú A"` | 1. Nhấn vào ghi chú `"Ghi chú A"` trong danh sách | — | Trang chi tiết mở ra với nội dung đầy đủ của `"Ghi chú A"` | | | |
| TC_NOTE_DETAIL_03 | Truy cập ghi chú đã bị xóa — FR-NOTE-3.2 | Ghi chú với `id=999` đã bị xóa khỏi hệ thống | 1. Truy cập trực tiếp URL `/notes/999` | — | Hệ thống hiển thị thông báo "Không tìm thấy ghi chú" hoặc tương đương; không hiển thị màn hình trắng — NFR-RELI-1 | | | |
| TC_NOTE_DETAIL_04 | Truy cập ghi chú riêng tư của người khác — FR-NOTE-3.3 | `user2@test.com` có ghi chú riêng tư `id=100`; đăng nhập `user@test.com` | 1. Truy cập trực tiếp URL `/notes/100` với tài khoản `user@test.com` | — | Hệ thống hiển thị thông báo không có quyền truy cập; nội dung ghi chú không bị lộ — NFR-SEC-3 | | | |
| TC_NOTE_DETAIL_05 | Chủ sở hữu xem được ghi chú riêng tư của mình | Đăng nhập `user@test.com`; có ghi chú riêng tư `"Bí mật cá nhân"` | 1. Mở danh sách Ghi chú<br>2. Nhấn vào `"Bí mật cá nhân"` | — | Trang chi tiết hiển thị đầy đủ nội dung ghi chú cho chính chủ sở hữu | | | |
| TC_NOTE_DETAIL_06 | Người dùng khác xem ghi chú công khai qua ID — FR-NOTE-7.1 | `user@test.com` có ghi chú công khai `id=50`; đăng nhập `user2@test.com` | 1. Truy cập URL `/notes/50` với tài khoản `user2@test.com` | — | Nội dung ghi chú công khai hiển thị đầy đủ cho `user2@test.com` | | | |

---

### BUSINESS FLOW

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_NOTE_DETAIL_07 | Luồng xem chi tiết → chỉnh sửa → nội dung cập nhật đúng | Đăng nhập `user@test.com`; có ghi chú `"Phiên bản 1"` | 1. Mở chi tiết ghi chú `"Phiên bản 1"`<br>2. Sửa nội dung thành `"Phiên bản 2"`<br>3. Lưu<br>4. Mở lại chi tiết | `"Phiên bản 2"` | Trang chi tiết hiển thị nội dung `"Phiên bản 2"` sau khi cập nhật | | | |
| TC_NOTE_DETAIL_08 | Nội dung ghi chú không bị thay đổi sau reload | Đăng nhập `user@test.com`; vừa mở chi tiết ghi chú `"Ghi chú ổn định"` | 1. Tải lại trang (F5)<br>2. Mở lại chi tiết ghi chú | — | Nội dung ghi chú không thay đổi sau reload | | | |
| TC_NOTE_DETAIL_09 | Người dùng chưa đăng nhập không thể xem chi tiết ghi chú — NFR-SEC-2 | Người dùng chưa đăng nhập | 1. Truy cập trực tiếp URL `/notes/50` | — | Hệ thống chuyển hướng về trang đăng nhập | | | |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
