# TC_NFR_SEC — NFR-SEC: Bảo Mật

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | NFR-SEC — Bảo mật |
| Feature | NFR-SEC-1: Mã hóa mật khẩu; NFR-SEC-2: Chuyển hướng khi chưa đăng nhập; NFR-SEC-3: Cách ly dữ liệu theo quyền; NFR-SEC-4: Chống brute-force |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Ứng dụng đang chạy; có tài khoản `user@test.com` / `Abc@1234` và `user2@test.com`; `user2` thuộc nhóm khác với `user` |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 14    |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Mật khẩu trong DB không được lưu dạng plain text — NFR-SEC-1
- [ ] Người dùng chưa đăng nhập truy cập trang chính bị chuyển hướng về login — NFR-SEC-2
- [ ] Người dùng chưa đăng nhập truy cập trực tiếp URL bảo vệ bị chuyển về login — NFR-SEC-2
- [ ] Người dùng không thể truy cập nhóm không thuộc về mình — NFR-SEC-3
- [ ] Người dùng không thể xem công việc của nhóm khác — NFR-SEC-3
- [ ] Người dùng không thể xem ghi chú riêng tư của người khác — NFR-SEC-3
- [ ] Sau N lần đăng nhập sai liên tiếp, hệ thống giới hạn/khóa thêm thử — NFR-SEC-4
- [ ] Sau N lần đăng ký thất bại liên tiếp từ cùng nguồn, hệ thống giới hạn — NFR-SEC-4

---

## TEST CASES

### UI TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_NFR_SEC_01 | Trang đăng nhập hiển thị khi chưa xác thực | Không có session đăng nhập | 1. Truy cập URL gốc của ứng dụng (trang chính) | — | Trang tự động chuyển về màn hình đăng nhập; không hiển thị nội dung ứng dụng | | | |
| TC_NFR_SEC_02 | Trường mật khẩu hiển thị dạng ký tự ẩn (•••) | Mở trang đăng nhập | 1. Quan sát trường mật khẩu khi nhập | — | Ký tự nhập vào hiển thị dưới dạng •••; không lộ ra ký tự gốc | | | |

---

### FUNCTION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_NFR_SEC_03 | Mật khẩu lưu dạng đã mã hóa trong DB — NFR-SEC-1 | Truy cập DB; có tài khoản `user@test.com` | 1. Truy vấn bảng users với email `user@test.com`<br>2. Kiểm tra giá trị cột password | Password: `Abc@1234` | Giá trị trong cột password là chuỗi hash (bcrypt/argon2…); không phải chuỗi `Abc@1234` | | | |
| TC_NFR_SEC_04 | Truy cập URL bảo vệ khi chưa đăng nhập — NFR-SEC-2 | Không có session đăng nhập | 1. Nhập thẳng URL `/tasks` (hoặc URL nội bộ khác) vào thanh địa chỉ | URL: `/tasks` | Hệ thống chuyển hướng về trang đăng nhập; không hiển thị dữ liệu trang `/tasks` | | | |
| TC_NFR_SEC_05 | Token/session hết hạn — hệ thống chuyển về login — NFR-SEC-2 | Đăng nhập; sau đó token hết hạn (hoặc xóa cookie thủ công) | 1. Xóa cookie/token<br>2. Thực hiện bất kỳ thao tác nào trong app | — | Hệ thống phát hiện session không hợp lệ và chuyển hướng về trang đăng nhập | | | |
| TC_NFR_SEC_06 | Người dùng không thể xem công việc của nhóm không thuộc — NFR-SEC-3 | Đăng nhập `user@test.com`; `user2@test.com` thuộc nhóm `group-B` (id=99) | 1. Gửi request GET chi tiết công việc thuộc `group-B` với tài khoản `user@test.com` | Task ID thuộc group-B | Hệ thống trả về lỗi không có quyền; không trả về dữ liệu công việc của group-B | | | |
| TC_NFR_SEC_07 | Người dùng không thể truy cập ghi chú riêng tư của người khác — NFR-SEC-3 | Đăng nhập `user@test.com`; `user2@test.com` có ghi chú riêng tư `id=500` | 1. Truy cập trực tiếp URL chi tiết ghi chú `id=500` bằng tài khoản `user@test.com` | Note ID: 500 | Hệ thống từ chối; hiển thị thông báo không có quyền; không lộ nội dung ghi chú | | | |
| TC_NFR_SEC_08 | Người dùng không thể xem thành viên/dữ liệu nhóm không thuộc về mình — NFR-SEC-3 | Đăng nhập `user@test.com`; nhóm `group-X` (id=10) không có `user@test.com` | 1. Gửi request GET danh sách thành viên nhóm `group-X` với tài khoản `user@test.com` | Group ID: 10 | Hệ thống trả về lỗi không có quyền; không trả về danh sách thành viên | | | |
| TC_NFR_SEC_09 | Đăng nhập sai nhiều lần bị giới hạn — NFR-SEC-4 | Tài khoản `user@test.com` đang hoạt động bình thường | 1. Đăng nhập với mật khẩu sai nhiều lần liên tiếp (thử 6–10 lần) | Email: `user@test.com`, Password: `WrongPass` | Sau N lần sai (theo cấu hình hệ thống), hệ thống hiển thị thông báo tạm khóa hoặc yêu cầu xác minh; không cho tiếp tục thử | | | |
| TC_NFR_SEC_10 | Thử đăng ký nhiều lần liên tiếp từ cùng IP bị giới hạn — NFR-SEC-4 | Không có tài khoản, thực hiện nhiều request đăng ký liên tiếp | 1. Gửi nhiều request đăng ký với các email khác nhau trong thời gian ngắn | Nhiều email ngẫu nhiên | Hệ thống giới hạn số lần gửi; sau ngưỡng nhất định trả về thông báo rate limit | | | |

---

### BUSINESS FLOW

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_NFR_SEC_11 | Luồng: chưa đăng nhập → truy cập app → chuyển hướng login → đăng nhập → vào đúng trang — NFR-SEC-2 | Không có session | 1. Truy cập URL nội bộ `/dashboard`<br>2. Hệ thống chuyển về `/login`<br>3. Đăng nhập đúng thông tin<br>4. Kiểm tra trang sau khi đăng nhập | Email: `user@test.com`, Password: `Abc@1234` | Sau khi đăng nhập thành công, hệ thống chuyển vào trang ứng dụng (dashboard hoặc trang gốc đã truy cập) | | | |
| TC_NFR_SEC_12 | Luồng: đăng nhập sai nhiều lần → bị khóa → chờ / mở khóa → đăng nhập lại thành công — NFR-SEC-4 | Tài khoản `user@test.com` chưa bị khóa | 1. Đăng nhập sai đủ số lần gây rate limit<br>2. Kiểm tra thông báo<br>3. Chờ thời gian giới hạn hết<br>4. Đăng nhập đúng lại | — | Sau thời gian chờ, hệ thống cho phép đăng nhập lại; đăng nhập đúng thì vào được | | | |
| TC_NFR_SEC_13 | Người dùng A chỉ thấy dữ liệu nhóm mình, không thấy dữ liệu nhóm của B — NFR-SEC-3 | Đăng nhập `user@test.com` (thuộc group-A); `user2@test.com` thuộc group-B | 1. Mở danh sách nhóm trên UI | — | Chỉ hiển thị group-A; group-B không xuất hiện trong danh sách | | | |
| TC_NFR_SEC_14 | Dữ liệu ghi chú công khai có thể xem được bởi người dùng khác đã đăng nhập — NFR-SEC-3 | `user2@test.com` có ghi chú công khai `id=600` | 1. Đăng nhập `user@test.com`<br>2. Truy cập ghi chú `id=600` | Note ID: 600 | Hệ thống cho phép xem; hiển thị nội dung ghi chú công khai (theo FR-NOTE-7.1) | | | |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
