# 📄 SYSTEM TEST — FR-ADMIN-3: Quản lý người dùng

---

## 🧾 ABOUT

```
Module       : FR-ADMIN-3 — Quản lý người dùng
SRS Ref      : FR-ADMIN-3.1, FR-ADMIN-3.2, FR-ADMIN-3.3, FR-ADMIN-3.4, FR-ADMIN-3.5
Test type    : Black-box System Test
Environment  : Windows 10, Chrome / Edge
Author       : 
Create Date  : 
Preconditions:
  1. Hệ thống đang chạy và đã có dữ liệu người dùng mẫu (ít nhất 5 tài khoản).
  2. Đăng nhập bằng tài khoản quản trị viên (Admin hoặc Super Admin).
  3. Trang quản lý người dùng có thể truy cập từ trang admin.
```

---

## 📊 SUMMARY

```
Pass     : 
Fail     : 
Untested : 
N/A      : 
Total    : 14
```

---

## ✅ CHECKLIST (Customized cho FR-ADMIN-3)

- [ ] Danh sách người dùng hiển thị đầy đủ và có phân trang
- [ ] Tìm kiếm người dùng theo tên/email hoạt động đúng
- [ ] Lọc người dùng (theo vai trò, trạng thái…) hoạt động đúng
- [ ] Xem chi tiết tài khoản hiển thị đầy đủ thông tin người dùng
- [ ] Tìm kiếm tài khoản không tồn tại → hiển thị thông báo không tìm thấy
- [ ] Tạo tài khoản mới thành công với dữ liệu hợp lệ
- [ ] Tạo tài khoản với email đã tồn tại → hiển thị lỗi, không tạo thêm
- [ ] Tạo tài khoản với email không hợp lệ → hiển thị lỗi
- [ ] Tạo tài khoản với mật khẩu không đủ điều kiện → hiển thị lỗi
- [ ] Tạo tài khoản với họ tên bỏ trống hoặc quá 100 ký tự → hiển thị lỗi
- [ ] Cập nhật thông tin người dùng thành công
- [ ] Cập nhật với dữ liệu không hợp lệ → hiển thị lỗi, không lưu
- [ ] Dữ liệu tạo/cập nhật người dùng được lưu chính xác vào DB và hiển thị lại đúng
- [ ] Thao tác bị từ chối nếu không phải quản trị viên

---

# 🧩 UI TEST

| ID             | Type    | Feature                                      | Test case description                                                                                                                                        | Test data | Expected Result                                                                                                                                             | Tester | Date | Result | Note |
|----------------|---------|----------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|--------|------|--------|------|
| TC_ADMIN_3_01  | UI Test | Giao diện trang danh sách người dùng         | Quản trị viên mở trang quản lý người dùng. Kiểm tra bảng danh sách, tiêu đề cột, thanh tìm kiếm, bộ lọc, nút phân trang và nút tạo mới có hiển thị đúng không. | Tài khoản Admin | 1. Bảng danh sách có đủ các cột (tên, email, vai trò, trạng thái, ngày tạo) <br> 2. Thanh tìm kiếm và bộ lọc hiển thị <br> 3. Phân trang hiển thị đúng số trang | | | | |
| TC_ADMIN_3_02  | UI Test | Giao diện form tạo tài khoản mới             | Quản trị viên nhấn nút tạo tài khoản mới. Kiểm tra form có đủ trường bắt buộc, nhãn rõ ràng, có dấu * cho trường bắt buộc không.                            | Tài khoản Admin | Form hiển thị đầy đủ trường: họ tên (*), email (*), mật khẩu (*), vai trò — Trường bắt buộc có dấu *                                                      | | | | |
| TC_ADMIN_3_03  | UI Test | Giao diện trang chi tiết tài khoản           | Quản trị viên nhấn vào một tài khoản bất kỳ. Kiểm tra thông tin chi tiết hiển thị đầy đủ và giao diện đúng bố cục.                                          | Tài khoản Admin + 1 User mẫu | Thông tin người dùng hiển thị đầy đủ: tên, email, vai trò, ngày tạo, trạng thái — layout gọn gàng, không vỡ                                                | | | | |

---

# ✅ VALIDATE

| ID             | Type     | Feature                                                    | Test case description                                                                                                  | Test data                                              | Expected Result                                                                                             | Tester | Date | Result | Note |
|----------------|----------|------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------|-------------------------------------------------------------------------------------------------------------|--------|------|--------|------|
| TC_ADMIN_3_04  | Validate | Tạo tài khoản với email đã tồn tại (FR-ADMIN-3.4)         | Quản trị viên điền form tạo mới với email đã được đăng ký trong hệ thống và nhấn lưu.                                | Email: email đã tồn tại trong DB                       | Hệ thống hiển thị thông báo lỗi "Email đã tồn tại" — không tạo tài khoản mới                               | | | | |
| TC_ADMIN_3_05  | Validate | Tạo tài khoản với email không đúng định dạng (FR-ADMIN-3.4) | Quản trị viên nhập email sai định dạng (ví dụ: thiếu "@" hoặc thiếu domain) và nhấn lưu.                             | Email: `userexample.com`, `user@`, `@domain.com`       | Hệ thống hiển thị thông báo lỗi tại trường email — không tạo tài khoản                                     | | | | |
| TC_ADMIN_3_06  | Validate | Tạo tài khoản với mật khẩu không đủ điều kiện (FR-ADMIN-3.4) | Quản trị viên nhập mật khẩu ít hơn 8 ký tự hoặc thiếu chữ hoa/số/ký tự đặc biệt và nhấn lưu.                       | Mật khẩu: `abc123`, `12345678`, `password`             | Hệ thống hiển thị thông báo lỗi mô tả yêu cầu mật khẩu — không tạo tài khoản                              | | | | |
| TC_ADMIN_3_07  | Validate | Tạo tài khoản với họ tên bỏ trống (FR-ADMIN-3.4)           | Quản trị viên để trống trường họ tên và nhấn lưu.                                                                    | Họ tên: (trống)                                        | Hệ thống hiển thị thông báo lỗi "Họ tên không được để trống" — không tạo tài khoản                         | | | | |
| TC_ADMIN_3_08  | Validate | Tạo tài khoản với họ tên vượt 100 ký tự (FR-ADMIN-3.4)    | Quản trị viên nhập họ tên dài hơn 100 ký tự và nhấn lưu.                                                            | Họ tên: chuỗi 101 ký tự                                | Hệ thống hiển thị thông báo lỗi về giới hạn ký tự — không tạo tài khoản                                    | | | | |
| TC_ADMIN_3_09  | Validate | Cập nhật thông tin với dữ liệu không hợp lệ (FR-ADMIN-3.5) | Quản trị viên chỉnh sửa thông tin người dùng với họ tên > 100 ký tự hoặc email sai định dạng và nhấn lưu.            | Họ tên: 101 ký tự hoặc email sai định dạng             | Hệ thống hiển thị thông báo lỗi tương ứng — không cập nhật, giữ nguyên thông tin cũ                        | | | | |

---

# ⚙️ FUNCTIONS

| ID             | Type      | Feature                                                        | Test case description                                                                                                                                   | Test data | Expected Result                                                                                                                                       | Tester | Date | Result | Note |
|----------------|-----------|----------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------|-----------|-------------------------------------------------------------------------------------------------------------------------------------------------------|--------|------|--------|------|
| TC_ADMIN_3_10  | Functions | Xem danh sách người dùng có phân trang (FR-ADMIN-3.1)         | Quản trị viên mở trang quản lý người dùng. Kiểm tra danh sách hiển thị theo trang và có thể chuyển sang trang tiếp theo.                               | Tài khoản Admin, hệ thống có > 10 người dùng | Danh sách hiển thị theo trang — có thể điều hướng giữa các trang, mỗi trang hiển thị đúng số lượng người dùng                                       | | | | |
| TC_ADMIN_3_11  | Functions | Tìm kiếm người dùng theo tên hoặc email (FR-ADMIN-3.1)        | Quản trị viên nhập từ khóa vào ô tìm kiếm (tên hoặc email một phần).                                                                                  | Từ khóa: một phần tên hoặc email của User mẫu | Danh sách lọc chỉ hiển thị các tài khoản khớp với từ khóa tìm kiếm                                                                                  | | | | |
| TC_ADMIN_3_12  | Functions | Tìm kiếm tài khoản không tồn tại (FR-ADMIN-3.3)               | Quản trị viên nhập tên/email không có trong hệ thống vào ô tìm kiếm.                                                                                  | Từ khóa: `user_khong_ton_tai_xyz@test.com` | Hệ thống hiển thị thông báo "Không tìm thấy" hoặc danh sách rỗng — không có kết quả nào được trả về                                                 | | | | |
| TC_ADMIN_3_13  | Functions | Xem chi tiết tài khoản (FR-ADMIN-3.2)                         | Quản trị viên nhấn vào một tài khoản trong danh sách.                                                                                                 | Tài khoản Admin + 1 User mẫu có đầy đủ thông tin | Hệ thống hiển thị đầy đủ thông tin: họ tên, email, vai trò, ngày tạo, trạng thái tài khoản (đang hoạt động / bị khóa)                                | | | | |
| TC_ADMIN_3_14  | Functions | Tạo tài khoản người dùng mới thành công (FR-ADMIN-3.4)        | Quản trị viên điền đầy đủ họ tên, email hợp lệ, mật khẩu đủ điều kiện và nhấn lưu.                                                                   | Họ tên: "Nguyen Van Test", Email: mới chưa tồn tại, Mật khẩu: "Test@1234" | Hệ thống tạo tài khoản thành công, tài khoản mới xuất hiện trong danh sách người dùng                                                               | | | | |

---

# 🧠 BUSINESS OPERATION

| ID             | Type               | Feature                                                                      | Test case description                                                                                                                           | Test data | Expected Result                                                                                                | Tester | Date | Result | Note |
|----------------|--------------------|---------------------------------------------------------------------------   |-------------------------------------------------------------------------------------------------------------------------------------------------|-----------|----------------------------------------------------------------------------------------------------------------|--------|------|--------|------|
| TC_ADMIN_3_15  | Business operation | Cập nhật thông tin người dùng thành công — dữ liệu được lưu đúng (FR-ADMIN-3.5) | 1. Quản trị viên mở chi tiết tài khoản User mẫu. <br> 2. Sửa họ tên thành tên mới hợp lệ. <br> 3. Nhấn lưu. <br> 4. Kiểm tra lại chi tiết tài khoản. | Họ tên mới: "Nguyen Van Updated" | Hệ thống cập nhật thành công — chi tiết tài khoản hiển thị đúng tên mới sau khi lưu                           | | | | |
| TC_ADMIN_3_16  | Business operation | Tài khoản mới tạo có thể đăng nhập bình thường (FR-ADMIN-3.4)               | 1. Admin tạo tài khoản mới. <br> 2. Đăng xuất. <br> 3. Đăng nhập bằng tài khoản mới vừa tạo.                                                  | Email và mật khẩu của tài khoản vừa tạo | Đăng nhập thành công — tài khoản mới do admin tạo hoạt động bình thường                                        | | | | |

---

# 🗄 DATABASE

| ID             | Type     | Feature                                                       | Test case description                                                                                                               | Test data | Expected Result                                                                                          | Tester | Date | Result | Note |
|----------------|----------|---------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------|-----------|----------------------------------------------------------------------------------------------------------|--------|------|--------|------|
| TC_ADMIN_3_17  | Database | Tạo tài khoản — dữ liệu được lưu đúng vào DB (FR-ADMIN-3.4) | Sau khi admin tạo tài khoản mới thành công, kiểm tra dữ liệu lưu trong DB có đúng (họ tên, email, mật khẩu đã hash, vai trò).      | Tài khoản mới vừa tạo | DB lưu đúng thông tin người dùng — mật khẩu được lưu dạng đã mã hóa (hash), không phải plaintext         | | | | |

---

## 🐞 ISSUES

| ID | Issue Description |
|----|-------------------|
|    |                   |
