# TC_NOTE_LIST — FR-NOTE-2: Xem Danh Sách Ghi Chú

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | FR-NOTE — Ghi chú cá nhân |
| Feature | FR-NOTE-2.1 — Xem danh sách ghi chú cá nhân |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Ứng dụng đang chạy; đăng nhập `user@test.com` / `Abc@1234`; tài khoản có ít nhất 3 ghi chú |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 7     |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Mục Ghi chú truy cập được từ menu điều hướng
- [ ] Danh sách hiển thị đúng tất cả ghi chú của người dùng hiện tại — FR-NOTE-2.1
- [ ] Chỉ hiển thị ghi chú của chính người dùng; không lộ ghi chú người khác — NFR-SEC-3
- [ ] Danh sách trống khi người dùng chưa có ghi chú nào
- [ ] Thứ tự sắp xếp ghi chú nhất quán (ví dụ: mới nhất lên trên)
- [ ] Ghi chú vừa tạo xuất hiện ngay trong danh sách
- [ ] Ghi chú đã xóa không còn hiển thị trong danh sách

---

## TEST CASES

### UI TEST

| ID | Test Case | Test Objective | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|----------------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_NOTE_LIST_01 | Mục Ghi chú truy cập được từ menu | Xác minh người dùng có thể truy cập chức năng xem danh sách ghi chú từ điều hướng chính của hệ thống. | Đăng nhập `user@test.com` | 1. Tìm mục "Ghi chú" trên menu điều hướng<br>2. Nhấn vào mục đó | — | Trang danh sách ghi chú mở ra, hiển thị đúng giao diện | | | |
| TC_NOTE_LIST_02 | Danh sách ghi chú hiển thị đầy đủ thông tin | Xác minh giao diện danh sách ghi chú hiển thị đủ thông tin cơ bản để người dùng nhận diện từng ghi chú. | Đăng nhập `user@test.com`; tài khoản có ghi chú | 1. Mở mục Ghi chú<br>2. Quan sát danh sách | — | Mỗi ghi chú hiển thị ít nhất tiêu đề và thời gian tạo/cập nhật | | | |

---

### FUNCTION TEST

| ID | Test Case | Test Objective | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|----------------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_NOTE_LIST_03 | Xem danh sách ghi chú — FR-NOTE-2.1 | Xác minh hệ thống hiển thị đầy đủ tất cả ghi chú thuộc về người dùng hiện tại theo `FR-NOTE-2.1`. | Đăng nhập `user@test.com`; tài khoản có 3 ghi chú: `"A"`, `"B"`, `"C"` | 1. Mở mục Ghi chú | — | Cả 3 ghi chú `"A"`, `"B"`, `"C"` đều xuất hiện trong danh sách | | | |
| TC_NOTE_LIST_04 | Danh sách trống khi chưa có ghi chú | Xác minh hệ thống xử lý đúng trạng thái không có dữ liệu khi tài khoản chưa có ghi chú nào. | Đăng nhập `newuser@test.com`; tài khoản chưa có ghi chú nào | 1. Mở mục Ghi chú | — | Giao diện hiển thị thông báo trống (ví dụ: "Bạn chưa có ghi chú nào") thay vì hiển thị lỗi | | | |
| TC_NOTE_LIST_05 | Ghi chú mới vừa tạo xuất hiện ngay trong danh sách | Xác minh danh sách ghi chú được cập nhật ngay sau khi tạo mới mà không làm người dùng hiểu sai về trạng thái dữ liệu. | Đăng nhập `user@test.com`; đang ở trang danh sách Ghi chú | 1. Tạo ghi chú mới `"Ghi chú kiểm tra"`<br>2. Quay lại danh sách | — | Ghi chú `"Ghi chú kiểm tra"` xuất hiện trong danh sách | | | |
| TC_NOTE_LIST_06 | Chỉ hiển thị ghi chú của người dùng hiện tại — NFR-SEC-3 | Xác minh danh sách ghi chú cá nhân không hiển thị ghi chú riêng tư thuộc về người dùng khác. | Đăng nhập `user@test.com`; `user2@test.com` có ghi chú riêng tư `"Ghi chú bí mật"` | 1. Mở mục Ghi chú với tài khoản `user@test.com` | — | Ghi chú `"Ghi chú bí mật"` của `user2@test.com` không xuất hiện trong danh sách của `user@test.com` | | | |

---

### BUSINESS FLOW

| ID | Test Case | Test Objective | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|----------------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_NOTE_LIST_07 | Danh sách cập nhật sau khi xóa ghi chú | Xác minh danh sách ghi chú phản ánh đúng thay đổi sau thao tác xóa và không còn hiển thị ghi chú đã bị loại bỏ. | Đăng nhập `user@test.com`; danh sách có ghi chú `"X"`, `"Y"`, `"Z"` | 1. Xóa ghi chú `"X"`<br>2. Quan sát danh sách | — | Danh sách chỉ còn `"Y"` và `"Z"`; ghi chú `"X"` không còn xuất hiện | | | |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
