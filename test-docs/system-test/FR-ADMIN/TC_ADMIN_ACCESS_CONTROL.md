# 📄 SYSTEM TEST — FR-ADMIN-1: Kiểm soát truy cập

---

## 🧾 ABOUT

```
Module       : FR-ADMIN-1 — Kiểm soát truy cập
SRS Ref      : FR-ADMIN-1.1
Test type    : Black-box System Test
Environment  : Windows 10, Chrome / Edge
Author       : 
Create Date  : 
Preconditions:
  1. Hệ thống đang chạy và có thể truy cập qua trình duyệt.
  2. Tồn tại ít nhất: 1 tài khoản người dùng thường, 1 tài khoản quản trị viên.
  3. Trang quản trị có URL riêng biệt (ví dụ: /admin).
```

---

## 📊 SUMMARY

```
Pass     : 
Fail     : 
Untested : 
N/A      : 
Total    : 7
```

---

## ✅ CHECKLIST (Customized cho FR-ADMIN-1)

- [ ] Người dùng chưa đăng nhập cố truy cập trang admin → bị chuyển hướng về trang đăng nhập
- [ ] Người dùng đăng nhập với vai trò thường (User) cố truy cập trang admin → bị từ chối, hiển thị thông báo không có quyền
- [ ] Quản trị viên (Admin) truy cập trang admin → thành công
- [ ] Super Admin truy cập trang admin → thành công
- [ ] URL trang admin không accessible trực tiếp bởi người dùng thường (kể cả khi biết đường link)
- [ ] Thông báo lỗi "không có quyền truy cập" hiển thị rõ ràng, không lộ thông tin kỹ thuật
- [ ] Sau khi bị từ chối, người dùng thường không thấy bất kỳ dữ liệu quản trị nào

---

# 🧩 UI TEST

| ID             | Type    | Feature                              | Test case description                                                                                               | Test data | Expected Result                                                                                                                  | Tester | Date | Result | Note |
|----------------|---------|--------------------------------------|---------------------------------------------------------------------------------------------------------------------|-----------|----------------------------------------------------------------------------------------------------------------------------------|--------|------|--------|------|
| TC_ADMIN_1_01  | UI Test | Giao diện trang quản trị (Admin)     | Quản trị viên đăng nhập và truy cập trang admin. Kiểm tra layout, menu, tiêu đề trang có hiển thị đúng không.      | Tài khoản Admin hợp lệ | 1. Trang admin hiển thị đầy đủ các mục quản trị (Dashboard, Người dùng, Log…) <br> 2. Font, layout, tiêu đề thống nhất và không lỗi chính tả | | | | |
| TC_ADMIN_1_02  | UI Test | Thông báo lỗi khi bị từ chối truy cập | Người dùng thường cố truy cập trang admin. Kiểm tra thông báo lỗi có hiển thị rõ ràng, thân thiện, không lộ stack trace | Tài khoản User thường | Hiển thị thông báo dễ hiểu như "Bạn không có quyền truy cập trang này" — không có stack trace hoặc mã lỗi kỹ thuật | | | | |

---

# ✅ VALIDATE

| ID             | Type     | Feature                                    | Test case description                                                                              | Test data | Expected Result                                                          | Tester | Date | Result | Note |
|----------------|----------|--------------------------------------------|----------------------------------------------------------------------------------------------------|-----------|--------------------------------------------------------------------------|--------|------|--------|------|
| TC_ADMIN_1_03  | Validate | URL trang admin nhập trực tiếp bởi User     | Người dùng thường đã đăng nhập, nhập trực tiếp URL của trang admin vào thanh địa chỉ trình duyệt. | URL: /admin (hoặc URL cụ thể của trang admin) | Hệ thống từ chối truy cập và hiển thị thông báo không có quyền — không render bất kỳ nội dung quản trị nào | | | | |

---

# ⚙️ FUNCTIONS

| ID             | Type      | Feature                                          | Test case description                                                                                          | Test data | Expected Result                                                                                                   | Tester | Date | Result | Note |
|----------------|-----------|--------------------------------------------------|----------------------------------------------------------------------------------------------------------------|-----------|-------------------------------------------------------------------------------------------------------------------|--------|------|--------|------|
| TC_ADMIN_1_04  | Functions | Người dùng chưa đăng nhập truy cập trang admin  | Mở trình duyệt mới (chưa đăng nhập), nhập URL trang admin.                                                    | Không có session | Hệ thống tự động chuyển hướng về trang đăng nhập, không hiển thị bất kỳ nội dung admin nào                    | | | | |
| TC_ADMIN_1_05  | Functions | Quản trị viên truy cập trang admin thành công    | Đăng nhập bằng tài khoản quản trị viên (Admin), sau đó điều hướng đến trang admin.                            | Tài khoản Admin hợp lệ | Hệ thống cho phép truy cập và hiển thị đầy đủ giao diện quản trị                                              | | | | |
| TC_ADMIN_1_06  | Functions | Super Admin truy cập trang admin thành công      | Đăng nhập bằng tài khoản Super Admin, sau đó điều hướng đến trang admin.                                      | Tài khoản Super Admin | Hệ thống cho phép truy cập và hiển thị đầy đủ giao diện quản trị (bao gồm cả chức năng phân quyền)           | | | | |

---

# 🧠 BUSINESS OPERATION

| ID             | Type               | Feature                                                   | Test case description                                                                                                                    | Test data | Expected Result                                                                                          | Tester | Date | Result | Note |
|----------------|--------------------|------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------|-----------|----------------------------------------------------------------------------------------------------------|--------|------|--------|------|
| TC_ADMIN_1_07  | Business operation | Người dùng vai trò thường bị chặn truy cập trang quản trị | 1. Đăng nhập bằng tài khoản người dùng thường (vai trò User). <br> 2. Cố truy cập trang admin (qua URL trực tiếp hoặc link nếu có). | Tài khoản User (vai trò: User) | Hệ thống từ chối truy cập, hiển thị thông báo "Bạn không có quyền truy cập trang này" — không trả về dữ liệu quản trị | | | | |

---

## 🐞 ISSUES

| ID | Issue Description |
|----|-------------------|
|    |                   |
