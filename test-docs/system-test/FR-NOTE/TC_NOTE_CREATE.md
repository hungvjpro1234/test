# TC_NOTE_CREATE — FR-NOTE-1: Tạo Ghi Chú

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | FR-NOTE — Ghi chú cá nhân |
| Feature | FR-NOTE-1.1 — Tạo ghi chú mới |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Ứng dụng đang chạy; đăng nhập `user@test.com` / `Abc@1234` |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 9     |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Nút / tùy chọn "Tạo ghi chú mới" hiển thị rõ trong giao diện ghi chú
- [ ] Tạo ghi chú với nội dung hợp lệ → ghi chú xuất hiện trong danh sách
- [ ] Ghi chú mới được lưu vào DB và chỉ hiển thị cho chủ sở hữu
- [ ] Tiêu đề / nội dung để trống → hệ thống phản hồi phù hợp
- [ ] Tạo ghi chú thành công → hiển thị thông báo thành công
- [ ] Ghi chú mới có trạng thái mặc định "Riêng tư" — FR-NOTE-7.2
- [ ] Người dùng chưa đăng nhập không thể tạo ghi chú — NFR-SEC-2

---

## TEST CASES

### UI TEST

| ID | Test Case | Test Objective | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|----------------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_NOTE_CREATE_01 | Nút "Tạo ghi chú" hiển thị trong giao diện ghi chú | Xác minh người dùng có thể nhận biết và truy cập điểm bắt đầu của chức năng tạo ghi chú từ giao diện ghi chú cá nhân. | Đăng nhập `user@test.com`; mở mục Ghi chú | 1. Quan sát giao diện mục Ghi chú | — | Nút hoặc tùy chọn "Tạo ghi chú mới" (hoặc icon "+") hiển thị rõ ràng, dễ nhận biết | | | |
| TC_NOTE_CREATE_02 | Form tạo ghi chú mở đúng khi nhấn nút | Xác minh hệ thống mở đúng form nhập liệu để người dùng bắt đầu tạo ghi chú mới. | Đăng nhập `user@test.com`; mục Ghi chú đang mở | 1. Nhấn nút "Tạo ghi chú mới" | — | Form / màn hình nhập ghi chú mở ra với các trường nhập liệu (tiêu đề, nội dung) | | | |

---

### VALIDATION TEST

| ID | Test Case | Test Objective | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|----------------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_NOTE_CREATE_03 | Tạo ghi chú khi bỏ trống toàn bộ nội dung | Xác minh hệ thống từ chối tạo ghi chú khi người dùng không nhập dữ liệu bắt buộc và không phát sinh bản ghi mới. | Đăng nhập `user@test.com`; form tạo ghi chú đang mở | 1. Để trống tất cả trường<br>2. Nhấn "Lưu" | `""` | Hệ thống hiển thị thông báo lỗi; không tạo ghi chú mới | | | |

---

### FUNCTION TEST

| ID | Test Case | Test Objective | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|----------------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_NOTE_CREATE_04 | Tạo ghi chú thành công — FR-NOTE-1.1 | Xác minh người dùng có thể tạo ghi chú mới thành công và ghi chú được thêm vào danh sách ghi chú cá nhân theo `FR-NOTE-1.1`. | Đăng nhập `user@test.com`; form tạo ghi chú đang mở | 1. Nhập tiêu đề `"Ghi chú học tập"`<br>2. Nhập nội dung `"Ôn tập chương 3"`<br>3. Nhấn "Lưu" | Tiêu đề: `"Ghi chú học tập"`; Nội dung: `"Ôn tập chương 3"` | Ghi chú mới xuất hiện trong danh sách ghi chú; hiển thị thông báo tạo thành công | | | |
| TC_NOTE_CREATE_05 | Ghi chú mới hiển thị đúng nội dung sau khi tạo | Xác minh nội dung chi tiết của ghi chú sau khi tạo được lưu và hiển thị đúng với dữ liệu người dùng đã nhập. | Ghi chú `"Ghi chú học tập"` vừa được tạo | 1. Nhấn vào ghi chú `"Ghi chú học tập"` trong danh sách | — | Nội dung hiển thị đúng là `"Ôn tập chương 3"` | | | |
| TC_NOTE_CREATE_06 | Ghi chú mới mặc định ở trạng thái "Riêng tư" — FR-NOTE-7.2 | Xác minh ghi chú mới được tạo có trạng thái chia sẻ mặc định là riêng tư theo `FR-NOTE-7.2`. | Ghi chú `"Ghi chú học tập"` vừa được tạo | 1. Mở chi tiết ghi chú<br>2. Kiểm tra cài đặt chia sẻ | — | Cài đặt hiển thị "Riêng tư"; người dùng khác không thể truy cập ghi chú này | | | |
| TC_NOTE_CREATE_07 | Ghi chú của người dùng A không hiển thị với người dùng B — NFR-SEC-3 | Xác minh ghi chú riêng tư mới tạo chỉ hiển thị cho chủ sở hữu và không bị lộ trong danh sách ghi chú của người dùng khác. | `user@test.com` vừa tạo ghi chú `"Ghi chú riêng tư"`; đăng nhập vào `user2@test.com` | 1. Đăng xuất `user@test.com`<br>2. Đăng nhập `user2@test.com`<br>3. Mở mục Ghi chú | — | Ghi chú `"Ghi chú riêng tư"` của `user@test.com` không xuất hiện trong danh sách của `user2@test.com` | | | |

---

### BUSINESS FLOW

| ID | Test Case | Test Objective | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|----------------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_NOTE_CREATE_08 | Luồng tạo ghi chú và kiểm tra DB — FR-NOTE-1.1 | Xác minh ghi chú được lưu bền vững sau khi tạo và vẫn còn hiển thị chính xác sau khi tải lại trang. | Đăng nhập `user@test.com`; mở mục Ghi chú | 1. Nhấn "Tạo ghi chú mới"<br>2. Điền tiêu đề `"Kế hoạch tuần"` và nội dung `"Họp thứ 2"`<br>3. Nhấn "Lưu"<br>4. Tải lại trang (F5)<br>5. Mở mục Ghi chú | Tiêu đề: `"Kế hoạch tuần"`; Nội dung: `"Họp thứ 2"` | Sau khi reload, ghi chú `"Kế hoạch tuần"` vẫn xuất hiện trong danh sách; nội dung không bị mất | | | |
| TC_NOTE_CREATE_09 | Người dùng chưa đăng nhập không thể tạo ghi chú — NFR-SEC-2 | Xác minh chỉ người dùng đã xác thực mới được phép truy cập và sử dụng chức năng tạo ghi chú. | Người dùng chưa đăng nhập | 1. Truy cập trực tiếp URL trang tạo ghi chú | — | Hệ thống chuyển hướng về trang đăng nhập; không cho phép truy cập | | | |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
