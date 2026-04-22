# 📄 SYSTEM TEST — FR-ADMIN-6: Gửi thông báo hệ thống

---

## 🧾 ABOUT

```
Module       : FR-ADMIN-6 — Gửi thông báo hệ thống
SRS Ref      : FR-ADMIN-6.1, FR-ADMIN-6.2
Test type    : Black-box System Test
Environment  : Windows 10, Chrome / Edge
Author       : 
Create Date  : 
Preconditions:
  1. Hệ thống đang chạy.
  2. Tồn tại: 1 tài khoản Admin, 1 tài khoản User thường (người nhận).
  3. Admin đăng nhập để thực hiện gửi thông báo.
  4. User thường đăng nhập để kiểm tra nhận thông báo (trên tab/trình duyệt riêng).
```

---

## 📊 SUMMARY

```
Pass     : 
Fail     : 
Untested : 
N/A      : 
Total    : 8
```

---

## ✅ CHECKLIST (Customized cho FR-ADMIN-6)

- [ ] Giao diện form gửi thông báo rõ ràng (chọn người nhận, nhập nội dung)
- [ ] Admin gửi thông báo đến người dùng cụ thể thành công
- [ ] Người dùng nhận được thông báo trong bảng thông báo của họ
- [ ] Gửi thông báo với nội dung trống → hiển thị lỗi, không gửi
- [ ] Người dùng thường cố gửi thông báo hệ thống → bị từ chối
- [ ] Thông báo hiển thị đúng nội dung và thông tin người gửi (quản trị viên)
- [ ] Số đếm thông báo chưa đọc của người nhận tăng lên sau khi nhận thông báo
- [ ] Thông báo hệ thống có thể phân biệt được với các loại thông báo khác

---

# 🧩 UI TEST

| ID             | Type    | Feature                                           | Test case description                                                                                                                            | Test data | Expected Result                                                                                                                                          | Tester | Date | Result | Note |
|----------------|---------|---------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|-----------|----------------------------------------------------------------------------------------------------------------------------------------------------------|--------|------|--------|------|
| TC_ADMIN_6_01  | UI Test | Giao diện form gửi thông báo hệ thống             | Admin mở tính năng gửi thông báo hệ thống. Kiểm tra form có đủ các trường cần thiết: chọn người nhận, nhập nội dung thông báo.                  | Tài khoản Admin | Form hiển thị đầy đủ: trường chọn/tìm kiếm người nhận, trường nội dung thông báo, nút "Gửi" — layout gọn gàng, nhãn rõ ràng | | | | |
| TC_ADMIN_6_02  | UI Test | Thông báo hệ thống hiển thị trong bảng thông báo của người nhận | Sau khi Admin gửi thông báo, mở bảng thông báo của User nhận. Kiểm tra thông báo hệ thống có hiển thị với nhãn/icon phân biệt không.            | Thông báo vừa gửi | Thông báo hệ thống hiển thị trong bảng thông báo của người nhận với nội dung đúng, có thể phân biệt được với thông báo loại khác (nhóm, task, chat…) | | | | |

---

# ✅ VALIDATE

| ID             | Type     | Feature                                                       | Test case description                                                                                                   | Test data | Expected Result                                                                                                 | Tester | Date | Result | Note |
|----------------|----------|---------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------|-----------|-----------------------------------------------------------------------------------------------------------------|--------|------|--------|------|
| TC_ADMIN_6_03  | Validate | Gửi thông báo với nội dung trống (FR-ADMIN-6.1)              | Admin mở form gửi thông báo, chọn người nhận nhưng để trống nội dung thông báo và nhấn "Gửi".                         | Nội dung: (trống) | Hệ thống hiển thị thông báo lỗi "Nội dung không được để trống" — không gửi thông báo | | | | |
| TC_ADMIN_6_04  | Validate | Gửi thông báo khi chưa chọn người nhận                       | Admin mở form gửi thông báo, nhập nội dung nhưng không chọn người nhận và nhấn "Gửi".                                | Người nhận: (chưa chọn) | Hệ thống hiển thị thông báo lỗi yêu cầu chọn người nhận — không gửi thông báo | | | | |
| TC_ADMIN_6_05  | Validate | Người dùng thường cố gửi thông báo hệ thống (FR-ADMIN-6.2)  | Người dùng thường đăng nhập và cố gọi API gửi thông báo hệ thống hoặc truy cập tính năng này.                        | Tài khoản User thường | Hệ thống từ chối, hiển thị thông báo "Bạn không có quyền thực hiện thao tác này" — không gửi thông báo | | | | |

---

# ⚙️ FUNCTIONS

| ID             | Type      | Feature                                                              | Test case description                                                                                                                          | Test data | Expected Result                                                                                                                           | Tester | Date | Result | Note |
|----------------|-----------|----------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------|-----------|-------------------------------------------------------------------------------------------------------------------------------------------|--------|------|--------|------|
| TC_ADMIN_6_06  | Functions | Gửi thông báo đến người dùng cụ thể thành công (FR-ADMIN-6.1)      | 1. Admin mở form gửi thông báo. <br> 2. Chọn User A là người nhận. <br> 3. Nhập nội dung thông báo hợp lệ. <br> 4. Nhấn "Gửi".               | Nội dung: "Thông báo bảo trì hệ thống vào lúc 22:00 hôm nay" | Hệ thống xác nhận gửi thành công — hiển thị thông báo/toast "Đã gửi thông báo thành công" | | | | |

---

# 🧠 BUSINESS OPERATION

| ID             | Type               | Feature                                                                         | Test case description                                                                                                                                           | Test data | Expected Result                                                                                                                                      | Tester | Date | Result | Note |
|----------------|--------------------|----------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------|------------------------------------------------------------------------------------------------------------------------------------------------------|--------|------|--------|------|
| TC_ADMIN_6_07  | Business operation | Người nhận nhận được thông báo trong bảng thông báo (FR-ADMIN-6.1 + FR-NOTIF-5.14) | 1. Admin gửi thông báo cho User A. <br> 2. Chuyển sang phiên đăng nhập của User A. <br> 3. Mở bảng thông báo của User A và kiểm tra thông báo có xuất hiện không. | Nội dung thông báo đã gửi | Thông báo hệ thống xuất hiện trong bảng thông báo của User A với đúng nội dung — số đếm thông báo chưa đọc tăng lên 1 | | | | |
| TC_ADMIN_6_08  | Business operation | Thông báo không gửi đến người dùng không được chỉ định                          | 1. Admin gửi thông báo cho User A. <br> 2. Kiểm tra bảng thông báo của User B (không phải người nhận).                                                        | User A là người nhận; User B không phải người nhận | User B không nhận được thông báo này — bảng thông báo của User B không có mục thông báo vừa gửi | | | | |

---

## 🐞 ISSUES

| ID | Issue Description |
|----|-------------------|
|    |                   |
