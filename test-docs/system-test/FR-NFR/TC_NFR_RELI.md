# TC_NFR_RELI — NFR-RELI: Độ Tin Cậy

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | NFR-RELI — Độ tin cậy |
| Feature | NFR-RELI-1: Mọi thao tác thất bại đều trả về thông báo lỗi mô tả cụ thể; hệ thống không hiển thị màn hình trắng hay crash không có thông báo |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Ứng dụng đang chạy; đăng nhập `user@test.com` / `Abc@1234` |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 12    |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Tạo công việc thiếu trường bắt buộc → thông báo lỗi mô tả cụ thể — NFR-RELI-1
- [ ] Đăng nhập sai mật khẩu → thông báo lỗi rõ ràng, không màn hình trắng — NFR-RELI-1
- [ ] Truy cập tài nguyên không tồn tại → thông báo lỗi rõ ràng — NFR-RELI-1
- [ ] Truy cập tài nguyên không có quyền → thông báo lỗi, không màn hình trắng — NFR-RELI-1
- [ ] Gửi tin nhắn trống → thông báo lỗi, không crash — NFR-RELI-1
- [ ] Gửi form với dữ liệu vượt giới hạn ký tự → thông báo lỗi cụ thể — NFR-RELI-1
- [ ] Server trả về lỗi 500 → UI hiển thị thông báo thân thiện, không màn hình trắng — NFR-RELI-1
- [ ] Mất kết nối mạng khi thao tác → UI hiển thị thông báo lỗi mạng — NFR-RELI-1

---

## TEST CASES

### FUNCTION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_NFR_RELI_01 | Tạo công việc thiếu tiêu đề → thông báo lỗi cụ thể — NFR-RELI-1 | Đăng nhập; mở form tạo công việc | 1. Để trống trường tiêu đề<br>2. Nhấn "Tạo" | Tiêu đề: rỗng | Hiển thị thông báo lỗi mô tả rõ (ví dụ: "Tiêu đề không được để trống"); không có màn hình trắng; form vẫn còn trên màn hình | | | |
| TC_NFR_RELI_02 | Đăng nhập sai mật khẩu → thông báo lỗi rõ, không crash — NFR-RELI-1 | Mở trang đăng nhập | 1. Nhập đúng email, sai mật khẩu<br>2. Nhấn "Đăng nhập" | Email: `user@test.com`, Password: `WrongPass!` | Hiển thị thông báo lỗi rõ ràng (ví dụ: "Email hoặc mật khẩu không đúng"); không crash; không màn hình trắng | | | |
| TC_NFR_RELI_03 | Truy cập công việc không tồn tại → thông báo lỗi, không crash — NFR-RELI-1 | Đăng nhập `user@test.com` | 1. Truy cập trực tiếp URL chi tiết task với ID không tồn tại | Task ID: 99999 | Hiển thị thông báo "Không tìm thấy công việc" hoặc tương đương; không màn hình trắng; không crash | | | |
| TC_NFR_RELI_04 | Truy cập ghi chú không có quyền → thông báo lỗi, không crash — NFR-RELI-1 | Đăng nhập `user@test.com`; ghi chú `id=500` thuộc `user2@test.com` | 1. Truy cập trực tiếp URL ghi chú `id=500` | Note ID: 500 | Hiển thị thông báo không có quyền truy cập; không màn hình trắng; không crash | | | |
| TC_NFR_RELI_05 | Gửi tin nhắn trống → thông báo lỗi, không crash — NFR-RELI-1 | Đăng nhập; mở chat nhóm | 1. Nhập ô chat trống<br>2. Nhấn nút gửi | Nội dung: rỗng | Hệ thống không gửi tin nhắn; hiển thị thông báo lỗi hoặc nút gửi bị vô hiệu hóa; không crash | | | |
| TC_NFR_RELI_06 | Tiêu đề công việc vượt 200 ký tự → thông báo lỗi cụ thể — NFR-RELI-1 | Đăng nhập; mở form tạo công việc | 1. Nhập tiêu đề 201 ký tự<br>2. Nhấn "Tạo" | Tiêu đề: chuỗi 201 ký tự | Hiển thị thông báo lỗi cụ thể về giới hạn ký tự (ví dụ: "Tiêu đề không vượt quá 200 ký tự"); không crash | | | |
| TC_NFR_RELI_07 | Tin nhắn chat vượt 5000 ký tự → thông báo lỗi, không crash — NFR-RELI-1 | Đăng nhập; mở chat nhóm | 1. Nhập tin nhắn 5001 ký tự<br>2. Nhấn gửi | Nội dung: chuỗi 5001 ký tự | Hệ thống hiển thị thông báo lỗi (ví dụ: "Tin nhắn không vượt quá 5000 ký tự"); không gửi; không crash | | | |
| TC_NFR_RELI_08 | Server trả về lỗi 500 → UI hiển thị thông báo thân thiện — NFR-RELI-1 | Đăng nhập; tạo điều kiện gây lỗi server (ví dụ: dữ liệu không hợp lệ ở backend) | 1. Thực hiện thao tác gây lỗi server<br>2. Quan sát UI | — | UI hiển thị thông báo thân thiện (ví dụ: "Đã xảy ra lỗi, vui lòng thử lại"); không hiển thị màn hình trắng; không hiển thị stack trace hay JSON lỗi thô | | | |
| TC_NFR_RELI_09 | Xóa tài nguyên không tồn tại → thông báo lỗi cụ thể — NFR-RELI-1 | Đăng nhập `user@test.com` | 1. Gửi request DELETE công việc với ID không tồn tại | Task ID: 99998 | Hệ thống trả về thông báo "Không tìm thấy công việc" hoặc tương đương; không crash | | | |

---

### BUSINESS FLOW

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_NFR_RELI_10 | Luồng: nhập sai nhiều trường → mỗi trường đều có thông báo lỗi riêng — NFR-RELI-1 | Đăng nhập; mở form tạo công việc | 1. Để trống tiêu đề<br>2. Nhập mô tả vượt 2000 ký tự<br>3. Nhấn "Tạo" | Tiêu đề: rỗng, Mô tả: 2001 ký tự | Hiển thị thông báo lỗi cho từng trường; người dùng biết cụ thể cần sửa gì | | | |
| TC_NFR_RELI_11 | Sau khi gặp lỗi, người dùng sửa lại và gửi thành công — NFR-RELI-1 | Đăng nhập; vừa nhận thông báo lỗi "Tiêu đề không được để trống" | 1. Nhập tiêu đề hợp lệ `"Công việc test reliability"`<br>2. Nhấn "Tạo" lại | Tiêu đề: `"Công việc test reliability"` | Hệ thống tạo công việc thành công; hiển thị thông báo thành công | | | |
| TC_NFR_RELI_12 | Luồng: mất kết nối → thao tác → UI thông báo lỗi mạng, không crash — NFR-RELI-1 | Đăng nhập; ngắt kết nối internet (tắt wifi/mạng) | 1. Ngắt kết nối mạng<br>2. Cố tạo công việc mới<br>3. Quan sát UI | — | UI hiển thị thông báo lỗi mạng (ví dụ: "Không có kết nối mạng"); không crash; không màn hình trắng; kết nối lại vẫn dùng được bình thường | | | |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
