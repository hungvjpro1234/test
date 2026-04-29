# TC_NOTE_SHARE — FR-NOTE-7: Chia Sẻ Ghi Chú

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | FR-NOTE — Ghi chú cá nhân |
| Feature | FR-NOTE-7.1 / 7.2 — Đặt ghi chú công khai; đặt ghi chú riêng tư |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Ứng dụng đang chạy; đăng nhập `user@test.com` / `Abc@1234`; `user2@test.com` đã tồn tại trong hệ thống |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 10    |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Cài đặt chia sẻ (Công khai / Riêng tư) hiển thị trong chi tiết ghi chú
- [ ] Đặt ghi chú thành "Công khai" → người dùng đăng nhập khác xem được qua ID — FR-NOTE-7.1
- [ ] Đặt ghi chú thành "Riêng tư" → người dùng khác không thể xem — FR-NOTE-7.2
- [ ] Người dùng chưa đăng nhập không thể xem dù ghi chú là công khai — C-1
- [ ] Chuyển từ công khai → riêng tư → người đang xem bị chặn ngay
- [ ] Ghi chú mới mặc định là "Riêng tư" — FR-NOTE-7.2
- [ ] Chủ sở hữu luôn xem được dù ở trạng thái nào — C-5

---

## TEST CASES

### UI TEST

| ID | Test Case | Test Objective | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|----------------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_NOTE_SHARE_01 | Cài đặt chia sẻ hiển thị trong chi tiết ghi chú | Xác minh giao diện chi tiết ghi chú hiển thị rõ tùy chọn cấu hình trạng thái chia sẻ. | Đăng nhập `user@test.com`; mở chi tiết ghi chú | 1. Quan sát giao diện chi tiết ghi chú | — | Có tùy chọn cài đặt chia sẻ ("Công khai" / "Riêng tư") hiển thị rõ ràng | | | |
| TC_NOTE_SHARE_02 | Ghi chú mới tạo mặc định hiển thị "Riêng tư" | Xác minh ghi chú mới được tạo có trạng thái chia sẻ mặc định là riêng tư theo `FR-NOTE-7.2`. | Đăng nhập `user@test.com`; vừa tạo ghi chú mới | 1. Mở chi tiết ghi chú mới tạo<br>2. Kiểm tra cài đặt chia sẻ | — | Trạng thái chia sẻ mặc định là "Riêng tư" — FR-NOTE-7.2 | | | |

---

### FUNCTION TEST

| ID | Test Case | Test Objective | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|----------------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_NOTE_SHARE_03 | Đặt ghi chú thành "Công khai" — FR-NOTE-7.1 | Xác minh chủ sở hữu có thể chuyển ghi chú sang trạng thái công khai theo `FR-NOTE-7.1`. | Đăng nhập `user@test.com`; có ghi chú riêng tư `id=50` | 1. Mở chi tiết ghi chú `id=50`<br>2. Đổi cài đặt sang "Công khai"<br>3. Lưu | — | Cài đặt cập nhật thành "Công khai"; hiển thị thông báo lưu thành công | | | |
| TC_NOTE_SHARE_04 | Người dùng khác xem ghi chú công khai qua ID — FR-NOTE-7.1 | Xác minh ghi chú công khai có thể được người dùng đăng nhập khác truy cập qua ID theo `FR-NOTE-7.1`. | `user@test.com` có ghi chú công khai `id=50`; đăng nhập `user2@test.com` | 1. Truy cập URL `/notes/50` với tài khoản `user2@test.com` | — | Nội dung ghi chú `id=50` hiển thị đầy đủ cho `user2@test.com` | | | |
| TC_NOTE_SHARE_05 | Đặt ghi chú thành "Riêng tư" — FR-NOTE-7.2 | Xác minh chủ sở hữu có thể chuyển ghi chú sang trạng thái riêng tư theo `FR-NOTE-7.2`. | Đăng nhập `user@test.com`; có ghi chú công khai `id=50` | 1. Mở chi tiết ghi chú `id=50`<br>2. Đổi cài đặt sang "Riêng tư"<br>3. Lưu | — | Cài đặt cập nhật thành "Riêng tư" | | | |
| TC_NOTE_SHARE_06 | Người dùng khác không thể xem ghi chú riêng tư — FR-NOTE-7.2 | Xác minh người dùng khác mất quyền truy cập khi ghi chú ở trạng thái riêng tư theo `FR-NOTE-7.2`. | `user@test.com` đổi ghi chú `id=50` sang "Riêng tư"; đăng nhập `user2@test.com` | 1. Truy cập URL `/notes/50` với tài khoản `user2@test.com` | — | Hệ thống hiển thị thông báo không có quyền truy cập — NFR-SEC-3 | | | |
| TC_NOTE_SHARE_07 | Chủ sở hữu vẫn xem được ghi chú ở mọi trạng thái | Xác minh thay đổi trạng thái chia sẻ không làm mất quyền truy cập của chủ sở hữu đối với ghi chú của mình. | Đăng nhập `user@test.com`; ghi chú `id=50` đang là "Riêng tư" | 1. Truy cập chi tiết ghi chú `id=50` | — | Chủ sở hữu `user@test.com` xem được toàn bộ nội dung | | | |
| TC_NOTE_SHARE_08 | Người dùng chưa đăng nhập không xem được dù ghi chú công khai — C-1 | Xác minh việc ghi chú ở trạng thái công khai không bỏ qua yêu cầu đăng nhập của hệ thống. | Ghi chú `id=50` đang là "Công khai"; người dùng chưa đăng nhập | 1. Truy cập URL `/notes/50` | — | Hệ thống chuyển hướng về trang đăng nhập; không hiển thị nội dung ghi chú — NFR-SEC-2 | | | |

---

### BUSINESS FLOW

| ID | Test Case | Test Objective | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|----------------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_NOTE_SHARE_09 | Luồng công khai → riêng tư → người đang xem bị chặn | Xác minh thay đổi trạng thái chia sẻ có hiệu lực đúng với quyền truy cập của người dùng khác ngay sau khi cập nhật. | `user2@test.com` đang xem ghi chú `id=50` (công khai); `user@test.com` đổi sang "Riêng tư" | 1. `user@test.com` đổi ghi chú `id=50` sang "Riêng tư"<br>2. `user2@test.com` reload hoặc truy cập lại `/notes/50` | — | `user2@test.com` nhận thông báo không có quyền truy cập | | | |
| TC_NOTE_SHARE_10 | Trạng thái chia sẻ được lưu sau reload | Xác minh trạng thái chia sẻ sau khi cập nhật được lưu bền vững và không bị đặt lại sau khi tải lại trang. | Đăng nhập `user@test.com`; vừa đổi ghi chú `id=50` sang "Công khai" | 1. Tải lại trang (F5)<br>2. Mở chi tiết ghi chú `id=50` | — | Trạng thái vẫn hiển thị "Công khai"; không bị reset về "Riêng tư" | | | |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
