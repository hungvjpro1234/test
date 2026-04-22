# 📄 SYSTEM TEST — FR-ADMIN-5: Phân quyền quản trị (Chỉ Super Admin)

---

## 🧾 ABOUT

```
Module       : FR-ADMIN-5 — Phân quyền quản trị
SRS Ref      : FR-ADMIN-5.1, FR-ADMIN-5.2, FR-ADMIN-5.3
Test type    : Black-box System Test
Environment  : Windows 10, Chrome / Edge
Author       : 
Create Date  : 
Preconditions:
  1. Hệ thống đang chạy.
  2. Tồn tại: 1 tài khoản Super Admin, 1 tài khoản Admin thường, 1 tài khoản User thường.
  3. Super Admin đã đăng nhập để thực hiện thao tác phân quyền.
  4. (SRS Constraint C-13): Chỉ Super Admin mới có quyền cấp hoặc thu hồi vai trò Quản trị viên.
```

---

## 📊 SUMMARY

```
Pass     : 
Fail     : 
Untested : 
N/A      : 
Total    : 9
```

---

## ✅ CHECKLIST (Customized cho FR-ADMIN-5)

- [ ] Super Admin có thể nâng cấp người dùng thường thành quản trị viên
- [ ] Sau khi nâng cấp, người được nâng cấp có đầy đủ quyền quản trị
- [ ] Super Admin có thể thu hồi quyền quản trị của một admin
- [ ] Sau khi thu hồi, người bị thu hồi không còn truy cập được trang admin
- [ ] Admin thường không thể thực hiện nâng cấp hoặc thu hồi quyền admin
- [ ] Người dùng thường không thể thực hiện nâng cấp hoặc thu hồi quyền admin
- [ ] Nâng cấp người dùng không tồn tại → hiển thị lỗi, không thực hiện
- [ ] Có xác nhận trước khi thực hiện thao tác phân quyền quan trọng
- [ ] Vai trò được cập nhật đúng trong DB sau khi phân quyền

---

# 🧩 UI TEST

| ID             | Type    | Feature                                               | Test case description                                                                                                                      | Test data | Expected Result                                                                                                                    | Tester | Date | Result | Note |
|----------------|---------|-------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------|-----------|------------------------------------------------------------------------------------------------------------------------------------|--------|------|--------|------|
| TC_ADMIN_5_01  | UI Test | Giao diện phân quyền — chỉ hiển thị với Super Admin  | Super Admin mở chi tiết tài khoản của một User thường. Kiểm tra có hiện nút/tùy chọn "Nâng cấp thành Admin" không.                       | Tài khoản Super Admin + 1 User mẫu | Nút hoặc tùy chọn "Nâng cấp thành Admin" hiển thị — bố cục rõ ràng, không bị ẩn hay vỡ layout | | | | |
| TC_ADMIN_5_02  | UI Test | Chức năng phân quyền không hiển thị với Admin thường  | Admin thường (không phải Super Admin) mở chi tiết tài khoản của một User. Kiểm tra xem có hiện nút phân quyền không.                     | Tài khoản Admin thường | Nút "Nâng cấp thành Admin" / "Thu hồi quyền Admin" KHÔNG hiển thị đối với Admin thường — chỉ Super Admin mới thấy | | | | |

---

# ✅ VALIDATE

| ID             | Type     | Feature                                                          | Test case description                                                                                                          | Test data | Expected Result                                                                                      | Tester | Date | Result | Note |
|----------------|----------|------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------|-----------|------------------------------------------------------------------------------------------------------|--------|------|--------|------|
| TC_ADMIN_5_03  | Validate | Admin thường cố thực hiện thao tác phân quyền (FR-ADMIN-5.3)   | Admin thường đăng nhập và cố gọi API hoặc truy cập tính năng nâng cấp/thu hồi quyền admin (ví dụ: qua URL trực tiếp).       | Tài khoản Admin thường | Hệ thống từ chối, hiển thị thông báo "Bạn không có quyền thực hiện thao tác này" — không thay đổi vai trò | | | | |
| TC_ADMIN_5_04  | Validate | Người dùng thường cố thực hiện thao tác phân quyền              | Người dùng thường đăng nhập và cố gọi API phân quyền.                                                                        | Tài khoản User thường | Hệ thống từ chối, hiển thị thông báo không có quyền — không thay đổi vai trò | | | | |

---

# ⚙️ FUNCTIONS

| ID             | Type      | Feature                                                           | Test case description                                                                                                                                      | Test data | Expected Result                                                                                                                                   | Tester | Date | Result | Note |
|----------------|-----------|-------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------|---------------------------------------------------------------------------------------------------------------------------------------------------|--------|------|--------|------|
| TC_ADMIN_5_05  | Functions | Nâng cấp người dùng thành quản trị viên (FR-ADMIN-5.1)           | 1. Super Admin mở chi tiết tài khoản User thường. <br> 2. Nhấn "Nâng cấp thành Admin" và xác nhận.                                                       | Tài khoản Super Admin + 1 User thường | Hệ thống cập nhật vai trò của User thành Admin — trong danh sách người dùng, vai trò hiển thị là "Admin" | | | | |
| TC_ADMIN_5_06  | Functions | Thu hồi quyền quản trị viên (FR-ADMIN-5.2)                       | 1. Super Admin mở chi tiết tài khoản Admin thường. <br> 2. Nhấn "Thu hồi quyền Admin" và xác nhận.                                                       | Tài khoản Super Admin + 1 Admin thường | Hệ thống cập nhật vai trò về User — trong danh sách, vai trò hiển thị là "User" | | | | |

---

# 🧠 BUSINESS OPERATION

| ID             | Type               | Feature                                                                               | Test case description                                                                                                                                            | Test data | Expected Result                                                                                                                                     | Tester | Date | Result | Note |
|----------------|--------------------|---------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------|-----------------------------------------------------------------------------------------------------------------------------------------------------|--------|------|--------|------|
| TC_ADMIN_5_07  | Business operation | Người được nâng cấp có đủ quyền truy cập trang admin (FR-ADMIN-5.1)                  | 1. Super Admin nâng cấp User A thành Admin. <br> 2. User A đăng xuất và đăng nhập lại. <br> 3. User A thử truy cập trang admin.                                | User A vừa được nâng cấp | Sau khi đăng nhập lại, User A truy cập được trang admin và có đủ quyền quản trị (xem danh sách user, xem log…) | | | | |
| TC_ADMIN_5_08  | Business operation | Người bị thu hồi quyền không còn truy cập được trang admin (FR-ADMIN-5.2)            | 1. Super Admin thu hồi quyền Admin của Admin B. <br> 2. Admin B đăng xuất và đăng nhập lại. <br> 3. Admin B thử truy cập trang admin.                          | Admin B vừa bị thu hồi quyền | Sau khi đăng nhập lại, Admin B bị từ chối truy cập trang admin — hệ thống hiển thị thông báo không có quyền | | | | |

---

# 🗄 DATABASE

| ID             | Type     | Feature                                                               | Test case description                                                                                              | Test data | Expected Result                                                                                   | Tester | Date | Result | Note |
|----------------|----------|-----------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------|-----------|---------------------------------------------------------------------------------------------------|--------|------|--------|------|
| TC_ADMIN_5_09  | Database | Vai trò được cập nhật đúng trong DB sau khi phân quyền (FR-ADMIN-5.1, 5.2) | Sau khi Super Admin nâng cấp hoặc thu hồi quyền, kiểm tra trường vai trò (role) của tài khoản trong DB cập nhật đúng. | Tài khoản vừa thay đổi vai trò | DB lưu đúng vai trò mới — nâng cấp → role = "admin"; thu hồi → role = "user" (hoặc tương đương) | | | | |

---

## 🐞 ISSUES

| ID | Issue Description |
|----|-------------------|
|    |                   |
