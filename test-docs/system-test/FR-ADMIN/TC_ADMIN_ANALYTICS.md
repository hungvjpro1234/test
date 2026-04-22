# 📄 SYSTEM TEST — FR-ADMIN-2: Thống kê & Phân tích

---

## 🧾 ABOUT

```
Module       : FR-ADMIN-2 — Thống kê & Phân tích
SRS Ref      : FR-ADMIN-2.1, FR-ADMIN-2.2, FR-ADMIN-2.3
Test type    : Black-box System Test
Environment  : Windows 10, Chrome / Edge
Author       : 
Create Date  : 
Preconditions:
  1. Hệ thống đang chạy và có dữ liệu mẫu (người dùng, nhóm, hoạt động).
  2. Đăng nhập bằng tài khoản quản trị viên (Admin hoặc Super Admin).
  3. Trang Dashboard, Phân tích và Trạng thái hệ thống có thể truy cập.
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

## ✅ CHECKLIST (Customized cho FR-ADMIN-2)

- [ ] Dashboard hiển thị đúng số người dùng hiện có trong hệ thống
- [ ] Dashboard hiển thị đúng số nhóm hiện có trong hệ thống
- [ ] Dashboard hiển thị chỉ số hoạt động của hệ thống
- [ ] Trang Phân tích hiển thị số liệu chi tiết theo thời gian (ngày/tuần/tháng)
- [ ] Số liệu phân tích cập nhật khi có thay đổi dữ liệu thực tế
- [ ] Trang Trạng thái hệ thống hiển thị tình trạng các thành phần (database, cache…)
- [ ] Chỉ quản trị viên mới xem được các trang thống kê — người dùng thường bị từ chối
- [ ] Giao diện các trang thống kê hiển thị đúng, không bị vỡ layout
- [ ] Dữ liệu hiển thị nhất quán giữa Dashboard và trang Phân tích chi tiết

---

# 🧩 UI TEST

| ID             | Type    | Feature                                      | Test case description                                                                                                                | Test data | Expected Result                                                                                                                                           | Tester | Date | Result | Note |
|----------------|---------|----------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------|-----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|--------|------|--------|------|
| TC_ADMIN_2_01  | UI Test | Giao diện trang Dashboard                    | Quản trị viên mở trang Dashboard. Kiểm tra layout, các widget/card chỉ số, nhãn, font chữ và không có lỗi chính tả.                 | Tài khoản Admin | 1. Các card chỉ số (số người dùng, số nhóm, hoạt động) hiển thị đúng bố cục <br> 2. Nhãn rõ ràng, font nhất quán, không lỗi chính tả                    | | | | |
| TC_ADMIN_2_02  | UI Test | Giao diện trang Phân tích chi tiết           | Quản trị viên mở trang Phân tích. Kiểm tra biểu đồ/bảng số liệu hiển thị đúng, có nhãn trục, chú thích.                            | Tài khoản Admin | 1. Biểu đồ hoặc bảng số liệu hiển thị đúng <br> 2. Nhãn thời gian rõ ràng, định dạng ngày tháng nhất quán <br> 3. Không có ô trống không giải thích    | | | | |
| TC_ADMIN_2_03  | UI Test | Giao diện trang Trạng thái hệ thống          | Quản trị viên mở trang Trạng thái hệ thống. Kiểm tra danh sách thành phần, màu sắc trạng thái (xanh/đỏ/vàng), và layout tổng thể. | Tài khoản Admin | 1. Danh sách thành phần (database, cache…) hiển thị đầy đủ <br> 2. Màu trạng thái phân biệt rõ (ví dụ: xanh = hoạt động, đỏ = lỗi) <br> 3. Layout không vỡ | | | | |

---

# ✅ VALIDATE

| ID             | Type     | Feature                                           | Test case description                                                                                            | Test data | Expected Result                                                                                  | Tester | Date | Result | Note |
|----------------|----------|---------------------------------------------------|------------------------------------------------------------------------------------------------------------------|-----------|--------------------------------------------------------------------------------------------------|--------|------|--------|------|
| TC_ADMIN_2_04  | Validate | Người dùng thường truy cập trang thống kê         | Đăng nhập bằng tài khoản người dùng thường, cố truy cập URL trang Dashboard/Phân tích/Trạng thái hệ thống.     | Tài khoản User | Hệ thống từ chối truy cập và hiển thị thông báo không có quyền — không hiển thị bất kỳ số liệu quản trị nào | | | | |

---

# ⚙️ FUNCTIONS

| ID             | Type      | Feature                                                   | Test case description                                                                                                                             | Test data | Expected Result                                                                                                                            | Tester | Date | Result | Note |
|----------------|-----------|-----------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|-----------|--------------------------------------------------------------------------------------------------------------------------------------------|--------|------|--------|------|
| TC_ADMIN_2_05  | Functions | Xem thống kê tổng quan — Dashboard (FR-ADMIN-2.1)        | Quản trị viên mở trang Dashboard. Kiểm tra các chỉ số tổng quan (số người dùng đang hoạt động, số nhóm, số hoạt động gần đây) có hiển thị không. | Tài khoản Admin, hệ thống có dữ liệu | Trang Dashboard hiển thị đầy đủ: <br> - Số người dùng trong hệ thống <br> - Số nhóm trong hệ thống <br> - Chỉ số hoạt động (tasks, messages…) | | | | |
| TC_ADMIN_2_06  | Functions | Xem phân tích chi tiết theo thời gian (FR-ADMIN-2.2)     | Quản trị viên mở trang Phân tích. Kiểm tra số liệu chi tiết (ví dụ: số người dùng đăng ký theo ngày, số task tạo theo tuần) có hiển thị không.  | Tài khoản Admin | Trang Phân tích hiển thị số liệu chi tiết theo trục thời gian — các con số phản ánh đúng dữ liệu thực tế trong hệ thống                   | | | | |
| TC_ADMIN_2_07  | Functions | Xem trạng thái các thành phần hệ thống (FR-ADMIN-2.3)    | Quản trị viên mở trang Trạng thái hệ thống. Kiểm tra tình trạng của các thành phần (database, cache, server…) có được liệt kê và cập nhật không. | Tài khoản Admin | Trang hiển thị trạng thái từng thành phần hệ thống (ví dụ: Database — Online, Cache — Online…) — phản ánh đúng tình trạng thực tế         | | | | |

---

# 🧠 BUSINESS OPERATION

| ID             | Type               | Feature                                                         | Test case description                                                                                                                               | Test data | Expected Result                                                                                                                     | Tester | Date | Result | Note |
|----------------|--------------------|-----------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|-----------|-------------------------------------------------------------------------------------------------------------------------------------|--------|------|--------|------|
| TC_ADMIN_2_08  | Business operation | Dữ liệu Dashboard nhất quán với dữ liệu thực tế                | 1. Ghi nhận số người dùng trước. <br> 2. Tạo thêm 1 tài khoản mới. <br> 3. Quay lại Dashboard và kiểm tra chỉ số số người dùng đã cập nhật chưa. | Tài khoản Admin + tạo thêm 1 User mới | Số người dùng trên Dashboard tăng lên 1 sau khi tạo mới — dữ liệu nhất quán và không trễ bất thường                                | | | | |
| TC_ADMIN_2_09  | Business operation | Số liệu phân tích nhất quán giữa Dashboard và trang Phân tích  | 1. Xem tổng số nhóm trên Dashboard. <br> 2. Mở trang Phân tích chi tiết. <br> 3. So sánh con số tổng nhóm giữa hai trang.                         | Tài khoản Admin | Số liệu trên Dashboard và trang Phân tích chi tiết nhất quán với nhau — không có sai lệch                                          | | | | |

---

## 🐞 ISSUES

| ID | Issue Description |
|----|-------------------|
|    |                   |
