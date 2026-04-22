# 📄 SYSTEM TEST — FR-ADMIN-7: Lịch sử đăng nhập & Log hành động

---

## 🧾 ABOUT

```
Module       : FR-ADMIN-7 — Lịch sử đăng nhập & Log hành động quản trị
SRS Ref      : FR-ADMIN-7.1, FR-ADMIN-7.2
Test type    : Black-box System Test
Environment  : Windows 10, Chrome / Edge
Author       : 
Create Date  : 
Preconditions:
  1. Hệ thống đang chạy.
  2. Tồn tại: 1 tài khoản Admin (để xem log), 1 tài khoản User mẫu.
  3. Đã có ít nhất vài lần đăng nhập (thành công và thất bại) được ghi lại trong hệ thống.
  4. Admin đã thực hiện ít nhất 1 thao tác quản trị trước đó để có dữ liệu log.
```

---

## 📊 SUMMARY

```
Pass     : 
Fail     : 
Untested : 
N/A      : 
Total    : 10
```

---

## ✅ CHECKLIST (Customized cho FR-ADMIN-7)

- [ ] Trang lịch sử đăng nhập hiển thị danh sách các lần đăng nhập
- [ ] Mỗi bản ghi lịch sử đăng nhập có đủ: tên người dùng, địa chỉ IP, thiết bị, thời điểm, kết quả (thành công/thất bại)
- [ ] Đăng nhập thành công → tạo bản ghi mới trong lịch sử đăng nhập
- [ ] Đăng nhập thất bại (sai mật khẩu) → tạo bản ghi mới với kết quả "Thất bại"
- [ ] Trang log hành động quản trị hiển thị danh sách các thao tác quản trị đã thực hiện
- [ ] Mỗi bản ghi log có đủ thông tin: người thực hiện, loại thao tác, thời điểm, đối tượng tác động
- [ ] Sau khi admin thực hiện thao tác quản trị (khóa user, phân quyền, gửi thông báo…) → log được tạo
- [ ] Danh sách lịch sử đăng nhập và log hành động có phân trang
- [ ] Chỉ quản trị viên mới xem được lịch sử đăng nhập và log
- [ ] Giao diện trang log rõ ràng, thông tin dễ đọc

---

# 🧩 UI TEST

| ID             | Type    | Feature                                                     | Test case description                                                                                                                         | Test data | Expected Result                                                                                                                                                         | Tester | Date | Result | Note |
|----------------|---------|-------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------|-----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------|------|--------|------|
| TC_ADMIN_7_01  | UI Test | Giao diện trang lịch sử đăng nhập                           | Admin mở trang lịch sử đăng nhập. Kiểm tra bảng có đủ các cột thông tin, dữ liệu hiển thị rõ ràng, có phân trang.                           | Tài khoản Admin | Bảng hiển thị với các cột: Tên người dùng, Địa chỉ IP, Thiết bị, Thời điểm, Kết quả — dữ liệu không bị cắt xén, có phân trang nếu nhiều bản ghi | | | | |
| TC_ADMIN_7_02  | UI Test | Giao diện trang log hành động quản trị                      | Admin mở trang log hành động. Kiểm tra bảng có đủ các cột thông tin, thao tác có thể phân biệt theo loại, có phân trang.                    | Tài khoản Admin | Bảng hiển thị với các cột: Người thực hiện, Loại thao tác, Đối tượng tác động, Thời điểm — dữ liệu rõ ràng, có phân trang | | | | |
| TC_ADMIN_7_03  | UI Test | Định dạng thời gian trong log                               | Admin xem trang lịch sử đăng nhập và log hành động. Kiểm tra cột thời gian có hiển thị đúng định dạng ngày/giờ không.                       | Tài khoản Admin | Thời gian hiển thị đúng định dạng (ví dụ: DD/MM/YYYY HH:mm:ss) — nhất quán trên tất cả các bản ghi | | | | |

---

# ✅ VALIDATE

| ID             | Type     | Feature                                                        | Test case description                                                                                                  | Test data | Expected Result                                                                                               | Tester | Date | Result | Note |
|----------------|----------|----------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------|-----------|---------------------------------------------------------------------------------------------------------------|--------|------|--------|------|
| TC_ADMIN_7_04  | Validate | Người dùng thường không thể xem lịch sử đăng nhập             | Người dùng thường đăng nhập và cố truy cập trang lịch sử đăng nhập (qua URL trực tiếp).                              | Tài khoản User thường | Hệ thống từ chối truy cập, hiển thị thông báo không có quyền — không hiển thị bất kỳ dữ liệu log nào | | | | |
| TC_ADMIN_7_05  | Validate | Người dùng thường không thể xem log hành động quản trị         | Người dùng thường đăng nhập và cố truy cập trang log hành động quản trị (qua URL trực tiếp).                         | Tài khoản User thường | Hệ thống từ chối truy cập, hiển thị thông báo không có quyền — không hiển thị bất kỳ dữ liệu log nào | | | | |

---

# ⚙️ FUNCTIONS

| ID             | Type      | Feature                                                              | Test case description                                                                                                                                         | Test data | Expected Result                                                                                                                                             | Tester | Date | Result | Note |
|----------------|-----------|----------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|--------|------|--------|------|
| TC_ADMIN_7_06  | Functions | Xem lịch sử đăng nhập — hiển thị đủ thông tin (FR-ADMIN-7.1)       | Admin mở trang lịch sử đăng nhập. Kiểm tra các bản ghi có đủ: tên người dùng, IP, thiết bị/trình duyệt, thời điểm, kết quả (thành công/thất bại).            | Tài khoản Admin | Mỗi bản ghi hiển thị đầy đủ 5 thông tin: tên người dùng, địa chỉ IP, thiết bị, thời điểm, kết quả — không có ô trống không giải thích | | | | |
| TC_ADMIN_7_07  | Functions | Xem log hành động quản trị — hiển thị đủ thông tin (FR-ADMIN-7.2)  | Admin mở trang log hành động. Kiểm tra các bản ghi có đủ thông tin về thao tác đã thực hiện.                                                                | Tài khoản Admin | Mỗi bản ghi log hiển thị: người thực hiện, loại thao tác (ví dụ: "Khóa tài khoản", "Nâng cấp quyền"), đối tượng tác động, thời điểm | | | | |

---

# 🧠 BUSINESS OPERATION

| ID             | Type               | Feature                                                                               | Test case description                                                                                                                                              | Test data | Expected Result                                                                                                                                        | Tester | Date | Result | Note |
|----------------|--------------------|---------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------|--------------------------------------------------------------------------------------------------------------------------------------------------------|--------|------|--------|------|
| TC_ADMIN_7_08  | Business operation | Đăng nhập thành công → tạo bản ghi lịch sử đăng nhập (FR-ADMIN-7.1)                 | 1. Ghi nhận số bản ghi trong lịch sử đăng nhập. <br> 2. Thực hiện đăng nhập bằng tài khoản User mẫu thành công. <br> 3. Admin kiểm tra lại trang lịch sử đăng nhập. | Tài khoản User mẫu hợp lệ | Có bản ghi mới xuất hiện với: tên User mẫu, IP, thiết bị, thời điểm và kết quả "Thành công" | | | | |
| TC_ADMIN_7_09  | Business operation | Đăng nhập thất bại → tạo bản ghi lịch sử đăng nhập với kết quả thất bại (FR-ADMIN-7.1) | 1. Ghi nhận số bản ghi. <br> 2. Cố đăng nhập bằng email đúng nhưng sai mật khẩu. <br> 3. Admin kiểm tra lại trang lịch sử đăng nhập.                             | Email đúng + mật khẩu sai | Có bản ghi mới xuất hiện với: email cố đăng nhập, IP, thời điểm và kết quả "Thất bại" | | | | |
| TC_ADMIN_7_10  | Business operation | Thao tác quản trị → log hành động được tạo (FR-ADMIN-7.2)                            | 1. Ghi nhận số bản ghi trong log hành động. <br> 2. Admin thực hiện 1 thao tác quản trị (ví dụ: khóa tài khoản User mẫu). <br> 3. Kiểm tra trang log hành động. | Admin + User mẫu | Có bản ghi log mới xuất hiện ghi lại thao tác "Khóa tài khoản" — bao gồm tên admin thực hiện, đối tượng bị tác động (User mẫu) và thời điểm thực hiện | | | | |

---

## 🐞 ISSUES

| ID | Issue Description |
|----|-------------------|
|    |                   |
