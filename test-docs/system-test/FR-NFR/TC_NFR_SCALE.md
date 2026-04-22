# TC_NFR_SCALE — NFR-SCALE: Khả Năng Mở Rộng

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | NFR-SCALE — Khả năng mở rộng |
| Feature | NFR-SCALE-1: Hệ thống cho phép mở rộng để đáp ứng số lượng người dùng tăng mà không ảnh hưởng đến chức năng hiện tại |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Ứng dụng đang chạy trong môi trường staging/production-like; có ít nhất 2 tài khoản người dùng |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 7     |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Nhiều người dùng đăng nhập đồng thời, hệ thống vẫn hoạt động bình thường — NFR-SCALE-1
- [ ] Nhiều người dùng tạo công việc đồng thời, dữ liệu không bị xung đột — NFR-SCALE-1
- [ ] Nhiều người dùng gửi tin nhắn chat đồng thời trong cùng nhóm, tin nhắn được giao đúng — NFR-SCALE-1
- [ ] Hệ thống không mất chức năng khi số lượng bản ghi dữ liệu lớn — NFR-SCALE-1
- [ ] Phân trang vẫn hoạt động đúng khi danh sách có nhiều mục (> 100 bản ghi) — NFR-SCALE-1

---

## TEST CASES

### FUNCTION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_NFR_SCALE_01 | Nhiều người dùng đăng nhập đồng thời — NFR-SCALE-1 | Có ít nhất 5 tài khoản người dùng | 1. Đăng nhập đồng thời từ 5 trình duyệt/tab khác nhau với 5 tài khoản | 5 tài khoản khác nhau | Tất cả 5 tài khoản đăng nhập thành công; hệ thống không trả về lỗi 500 hay timeout | | | |
| TC_NFR_SCALE_02 | Nhiều người dùng tạo công việc đồng thời — NFR-SCALE-1 | 3 tài khoản cùng thuộc nhóm `group-A` | 1. Cả 3 tài khoản đồng thời tạo công việc trong cùng nhóm `group-A` | 3 tài khoản, 3 công việc cùng lúc | Tất cả 3 công việc được tạo thành công; không xảy ra lỗi trùng lặp hay mất dữ liệu | | | |
| TC_NFR_SCALE_03 | Nhiều người dùng gửi tin nhắn đồng thời trong cùng nhóm — NFR-SCALE-1 | 3 thành viên cùng thuộc nhóm chat | 1. 3 thành viên gửi tin nhắn khác nhau đồng thời vào cùng nhóm chat | 3 nội dung tin nhắn khác nhau | Tất cả 3 tin nhắn hiển thị đúng trong nhóm; thứ tự hiển thị theo thời gian; không có tin nhắn bị mất | | | |
| TC_NFR_SCALE_04 | Danh sách công việc vẫn phân trang đúng khi có nhiều bản ghi — NFR-SCALE-1 | Nhóm có > 100 công việc | 1. Mở danh sách công việc<br>2. Điều hướng qua các trang | — | Phân trang hoạt động đúng; mỗi trang hiển thị đúng số mục; không bị lỗi hay mất dữ liệu | | | |
| TC_NFR_SCALE_05 | Tìm kiếm công việc vẫn hoạt động đúng khi dữ liệu lớn — NFR-SCALE-1 | Nhóm có > 100 công việc với nhiều tiêu đề | 1. Nhập từ khóa tìm kiếm vào ô tìm kiếm công việc | Từ khóa: `"test"` | Kết quả trả về đúng các công việc có tiêu đề chứa `"test"`; thời gian phản hồi ≤ 3 giây | | | |

---

### BUSINESS FLOW

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_NFR_SCALE_06 | Luồng: tạo nhiều nhóm + nhiều công việc → hệ thống vẫn ổn định — NFR-SCALE-1 | Tài khoản `admin@test.com` | 1. Tạo 5 nhóm mới<br>2. Mỗi nhóm tạo 10 công việc<br>3. Kiểm tra hiệu năng danh sách | — | Tất cả nhóm và công việc được tạo thành công; danh sách hiển thị đúng; thời gian phản hồi ≤ 3 giây | | | |
| TC_NFR_SCALE_07 | Hệ thống vẫn phục vụ người dùng bình thường khi một người dùng tạo nhiều request liên tiếp — NFR-SCALE-1 | 2 tài khoản: `user@test.com` và `user2@test.com` | 1. `user@test.com` gửi nhiều request nhanh liên tiếp (tạo/xem công việc)<br>2. Đồng thời `user2@test.com` thực hiện thao tác bình thường | — | `user2@test.com` vẫn thao tác bình thường; hệ thống không bị ảnh hưởng bởi load từ user khác | | | |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
