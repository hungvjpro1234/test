# TC_NOTE_DELETE — FR-NOTE-5: Xóa Ghi Chú

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | FR-NOTE — Ghi chú cá nhân |
| Feature | FR-NOTE-5.1 / 5.2 — Xóa ghi chú của mình; cố xóa ghi chú người khác |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Ứng dụng đang chạy; đăng nhập `user@test.com` / `Abc@1234`; tài khoản có ít nhất 2 ghi chú |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 9     |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Nút "Xóa" chỉ hiển thị trên ghi chú của chính mình
- [ ] Có confirm dialog trước khi xóa
- [ ] Xóa ghi chú của mình → ghi chú biến mất khỏi danh sách — FR-NOTE-5.1
- [ ] Xóa ghi chú → không còn truy cập được qua ID — FR-NOTE-3.2
- [ ] Cố xóa ghi chú của người khác → thông báo không có quyền — FR-NOTE-5.2
- [ ] Hủy xóa (nhấn "Hủy" ở confirm) → ghi chú vẫn còn
- [ ] Xóa được lưu vào DB; tải lại trang ghi chú không xuất hiện lại

---

## TEST CASES

### UI TEST

| ID | Test Case | Test Objective | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|----------------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_NOTE_DELETE_01 | Nút "Xóa" hiển thị trên ghi chú của mình | Xác minh giao diện cung cấp tùy chọn xóa cho ghi chú mà người dùng có quyền thao tác. | Đăng nhập `user@test.com`; mở chi tiết ghi chú `"Ghi chú cần xóa"` | 1. Quan sát giao diện chi tiết ghi chú | — | Tùy chọn "Xóa" hoặc icon thùng rác hiển thị trên ghi chú của mình | | | |
| TC_NOTE_DELETE_02 | Confirm dialog hiển thị trước khi xóa | Xác minh hệ thống yêu cầu người dùng xác nhận trước khi thực hiện thao tác xóa ghi chú. | Đăng nhập `user@test.com`; mở chi tiết ghi chú | 1. Nhấn nút "Xóa" | — | Hộp thoại xác nhận hiển thị với nội dung cảnh báo và 2 nút "Xác nhận" / "Hủy" | | | |

---

### FUNCTION TEST

| ID | Test Case | Test Objective | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|----------------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_NOTE_DELETE_03 | Xóa ghi chú của mình thành công — FR-NOTE-5.1 | Xác minh chủ sở hữu có thể xóa ghi chú của mình thành công theo `FR-NOTE-5.1`. | Đăng nhập `user@test.com`; có ghi chú `"Ghi chú sẽ xóa"` | 1. Mở chi tiết ghi chú `"Ghi chú sẽ xóa"`<br>2. Nhấn "Xóa"<br>3. Xác nhận | — | Ghi chú biến mất khỏi danh sách ngay lập tức | | | |
| TC_NOTE_DELETE_04 | Ghi chú đã xóa không truy cập được qua ID — FR-NOTE-3.2 | Xác minh ghi chú sau khi bị xóa không còn truy cập được qua đường dẫn trực tiếp theo `FR-NOTE-3.2`. | Ghi chú `id=300` vừa bị xóa | 1. Truy cập URL `/notes/300` | — | Hệ thống hiển thị thông báo "Không tìm thấy ghi chú" — NFR-RELI-1 | | | |
| TC_NOTE_DELETE_05 | Cố xóa ghi chú của người khác qua API — FR-NOTE-5.2 | Xác minh hệ thống ngăn người dùng xóa ghi chú không thuộc quyền sở hữu theo `FR-NOTE-5.2`. | Đăng nhập `user@test.com`; `user2@test.com` có ghi chú `id=201` | 1. Gửi request API xóa ghi chú `id=201` với tài khoản `user@test.com` | — | Hệ thống trả về thông báo không có quyền; ghi chú `id=201` vẫn tồn tại — C-5 | | | |
| TC_NOTE_DELETE_06 | Hủy xóa — ghi chú vẫn còn trong danh sách | Xác minh thao tác hủy ở bước xác nhận không làm mất dữ liệu ghi chú. | Đăng nhập `user@test.com`; đang ở confirm dialog của ghi chú `"Ghi chú giữ lại"` | 1. Nhấn "Hủy" trên dialog xác nhận | — | Ghi chú `"Ghi chú giữ lại"` vẫn xuất hiện trong danh sách; không bị xóa | | | |
| TC_NOTE_DELETE_07 | Xóa một ghi chú không ảnh hưởng ghi chú khác | Xác minh thao tác xóa chỉ tác động đến đúng ghi chú được chọn và không làm thay đổi các ghi chú khác. | Đăng nhập `user@test.com`; danh sách có `"Ghi chú A"`, `"Ghi chú B"`, `"Ghi chú C"` | 1. Xóa `"Ghi chú B"`<br>2. Quan sát danh sách | — | Danh sách chỉ còn `"Ghi chú A"` và `"Ghi chú C"`; không bị ảnh hưởng | | | |

---

### BUSINESS FLOW

| ID | Test Case | Test Objective | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|----------------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_NOTE_DELETE_08 | Xóa được lưu vào DB — ghi chú không xuất hiện lại sau reload | Xác minh trạng thái xóa của ghi chú được lưu bền vững và không bị khôi phục sau khi tải lại trang. | Đăng nhập `user@test.com`; vừa xóa ghi chú `"Ghi chú đã xóa"` | 1. Tải lại trang (F5)<br>2. Mở mục Ghi chú | — | Ghi chú `"Ghi chú đã xóa"` không xuất hiện lại trong danh sách | | | |
| TC_NOTE_DELETE_09 | Người dùng chưa đăng nhập không thể xóa ghi chú — NFR-SEC-2 | Xác minh chức năng xóa ghi chú chỉ cho phép với người dùng đã xác thực hợp lệ. | Người dùng chưa đăng nhập | 1. Gửi request API xóa ghi chú `id=50` | — | Hệ thống từ chối; chuyển hướng về trang đăng nhập | | | |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
