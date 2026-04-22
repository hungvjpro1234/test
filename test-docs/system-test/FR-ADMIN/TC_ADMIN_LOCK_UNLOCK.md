# 📄 SYSTEM TEST — FR-ADMIN-4: Khóa & Mở khóa tài khoản

---

## 🧾 ABOUT

```
Module       : FR-ADMIN-4 — Khóa & Mở khóa tài khoản
SRS Ref      : FR-ADMIN-4.1, FR-ADMIN-4.2, FR-ADMIN-4.3
Test type    : Black-box System Test
Environment  : Windows 10, Chrome / Edge
Author       : 
Create Date  : 
Preconditions:
  1. Hệ thống đang chạy.
  2. Tồn tại ít nhất: 1 tài khoản Admin, 1 tài khoản User đang hoạt động, 1 tài khoản User đang bị khóa.
  3. Đăng nhập bằng tài khoản quản trị viên để thực hiện thao tác khóa/mở khóa.
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

## ✅ CHECKLIST (Customized cho FR-ADMIN-4)

- [ ] Nút khóa/mở khóa hiển thị đúng trạng thái tương ứng với từng tài khoản
- [ ] Có hộp thoại xác nhận trước khi thực hiện khóa/mở khóa
- [ ] Khóa tài khoản thành công — trạng thái tài khoản cập nhật thành "Bị khóa"
- [ ] Người dùng bị khóa không thể đăng nhập — hệ thống hiển thị thông báo tài khoản bị khóa
- [ ] Mở khóa tài khoản thành công — trạng thái tài khoản cập nhật thành "Đang hoạt động"
- [ ] Người dùng được mở khóa có thể đăng nhập lại bình thường
- [ ] Khóa tài khoản không tồn tại → hiển thị thông báo không tìm thấy
- [ ] Trạng thái tài khoản trong DB được cập nhật đúng sau khi khóa/mở khóa
- [ ] Chỉ quản trị viên mới có thể thực hiện thao tác khóa/mở khóa
- [ ] Thông báo lỗi rõ ràng khi thao tác thất bại

---

# 🧩 UI TEST

| ID             | Type    | Feature                                            | Test case description                                                                                                                    | Test data | Expected Result                                                                                                                                       | Tester | Date | Result | Note |
|----------------|---------|---------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------|-----------|-------------------------------------------------------------------------------------------------------------------------------------------------------|--------|------|--------|------|
| TC_ADMIN_4_01  | UI Test | Hiển thị trạng thái khóa/mở khóa trên danh sách  | Quản trị viên mở danh sách người dùng. Kiểm tra tài khoản đang hoạt động và tài khoản bị khóa có hiển thị trạng thái khác nhau không.  | 1 User hoạt động + 1 User bị khóa | Tài khoản đang hoạt động và tài khoản bị khóa hiển thị trạng thái rõ ràng (ví dụ: badge màu xanh/đỏ, label "Active"/"Locked") | | | | |
| TC_ADMIN_4_02  | UI Test | Hộp thoại xác nhận khi khóa tài khoản             | Quản trị viên nhấn nút "Khóa" trên một tài khoản. Kiểm tra có hiện hộp thoại xác nhận trước khi thực sự khóa không.                   | Tài khoản Admin | Hộp thoại xác nhận xuất hiện với nội dung rõ ràng (ví dụ: "Bạn có chắc muốn khóa tài khoản này không?") — có nút xác nhận và hủy | | | | |

---

# ✅ VALIDATE

| ID             | Type     | Feature                                                   | Test case description                                                                                       | Test data | Expected Result                                                                                          | Tester | Date | Result | Note |
|----------------|----------|-----------------------------------------------------------|-------------------------------------------------------------------------------------------------------------|-----------|----------------------------------------------------------------------------------------------------------|--------|------|--------|------|
| TC_ADMIN_4_03  | Validate | Khóa tài khoản không tồn tại (FR-ADMIN-4.3)              | Quản trị viên cố thực hiện thao tác khóa trên ID/email tài khoản không tồn tại trong hệ thống (ví dụ: qua API hoặc URL giả mạo). | ID hoặc email không tồn tại trong DB | Hệ thống hiển thị thông báo "Không tìm thấy tài khoản" — không thực hiện khóa | | | | |
| TC_ADMIN_4_04  | Validate | Người dùng thường cố thực hiện khóa tài khoản            | Đăng nhập bằng tài khoản User thường và cố gọi API hoặc truy cập chức năng khóa tài khoản.                | Tài khoản User thường | Hệ thống từ chối, hiển thị thông báo không có quyền — không thực hiện khóa | | | | |

---

# ⚙️ FUNCTIONS

| ID             | Type      | Feature                                                      | Test case description                                                                                                                                | Test data | Expected Result                                                                                                                       | Tester | Date | Result | Note |
|----------------|-----------|--------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|-----------|---------------------------------------------------------------------------------------------------------------------------------------|--------|------|--------|------|
| TC_ADMIN_4_05  | Functions | Khóa tài khoản thành công (FR-ADMIN-4.1)                    | 1. Quản trị viên tìm tài khoản User đang hoạt động trong danh sách. <br> 2. Nhấn nút "Khóa". <br> 3. Xác nhận trong hộp thoại.                     | Tài khoản User đang hoạt động | Hệ thống khóa tài khoản — trạng thái trong danh sách cập nhật thành "Bị khóa" ngay lập tức                                          | | | | |
| TC_ADMIN_4_06  | Functions | Mở khóa tài khoản thành công (FR-ADMIN-4.2)                 | 1. Quản trị viên tìm tài khoản User đang bị khóa trong danh sách. <br> 2. Nhấn nút "Mở khóa". <br> 3. Xác nhận trong hộp thoại.                   | Tài khoản User đang bị khóa | Hệ thống mở khóa tài khoản — trạng thái trong danh sách cập nhật thành "Đang hoạt động" ngay lập tức                                | | | | |

---

# 🧠 BUSINESS OPERATION

| ID             | Type               | Feature                                                                          | Test case description                                                                                                                                    | Test data | Expected Result                                                                                                                                    | Tester | Date | Result | Note |
|----------------|--------------------|----------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|-----------|-----------------------------------------------------------------------------------------------------------------------------------------------------|--------|------|--------|------|
| TC_ADMIN_4_07  | Business operation | Người dùng bị khóa không thể đăng nhập — hiển thị thông báo bị khóa (FR-ADMIN-4.1 + FR-AUTH-2.5) | 1. Admin khóa tài khoản User mẫu. <br> 2. Đăng xuất. <br> 3. Thử đăng nhập bằng tài khoản User vừa bị khóa (email + mật khẩu đúng).                   | Email + mật khẩu đúng của User bị khóa | Đăng nhập thất bại — hệ thống hiển thị thông báo "Tài khoản đã bị khóa" — không cho phép vào giao diện chính | | | | |
| TC_ADMIN_4_08  | Business operation | Người dùng được mở khóa có thể đăng nhập lại bình thường (FR-ADMIN-4.2)         | 1. Admin mở khóa tài khoản User mẫu đang bị khóa. <br> 2. Đăng xuất. <br> 3. Đăng nhập bằng tài khoản User vừa được mở khóa.                          | Email + mật khẩu đúng của User vừa mở khóa | Đăng nhập thành công — người dùng vào được giao diện chính bình thường | | | | |
| TC_ADMIN_4_09  | Business operation | Hủy xác nhận khóa tài khoản — không thực hiện khóa                              | 1. Admin nhấn nút "Khóa" trên tài khoản User đang hoạt động. <br> 2. Khi hộp thoại xác nhận xuất hiện, nhấn "Hủy".                                    | Tài khoản User đang hoạt động | Tài khoản không bị khóa — trạng thái giữ nguyên "Đang hoạt động" | | | | |

---

# 🗄 DATABASE

| ID             | Type     | Feature                                                            | Test case description                                                                                                  | Test data | Expected Result                                                                                            | Tester | Date | Result | Note |
|----------------|----------|--------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------|-----------|------------------------------------------------------------------------------------------------------------|--------|------|--------|------|
| TC_ADMIN_4_10  | Database | Trạng thái tài khoản cập nhật đúng trong DB sau khi khóa/mở khóa | Sau khi admin khóa tài khoản, kiểm tra trường trạng thái (is_active / status) của tài khoản đó trong DB có thay đổi đúng không. | Tài khoản User vừa bị khóa | DB lưu đúng trạng thái: tài khoản bị khóa → is_active = false (hoặc tương đương); mở khóa → is_active = true | | | | |

---

## 🐞 ISSUES

| ID | Issue Description |
|----|-------------------|
|    |                   |
