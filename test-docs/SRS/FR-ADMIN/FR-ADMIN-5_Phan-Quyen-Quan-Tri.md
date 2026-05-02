## 8.5. Chức năng Phân quyền quản trị (Chỉ Super Admin)

### 8.5.1. Mô tả chức năng

Chức năng Phân quyền quản trị cho phép Super Admin nâng cấp người dùng thường thành Quản trị viên hoặc thu hồi quyền Quản trị viên của Admin thường. Đây là thao tác đặc quyền chỉ dành cho Super Admin — Admin thường và người dùng thường đều không được thực hiện. Sau khi nâng cấp, người được nâng cấp có đủ quyền truy cập trang admin sau lần đăng nhập tiếp theo. Sau khi thu hồi, người bị thu hồi không còn truy cập được trang admin. Vai trò phải cập nhật đúng trong cơ sở dữ liệu.

---

### 8.5.2. Yêu cầu chức năng

**FR-ADMIN-5-01:** Chỉ Super Admin mới có thể thấy và thực hiện các tùy chọn phân quyền (nâng cấp/thu hồi); Admin thường không thấy tùy chọn này.

**FR-ADMIN-5-02:** Super Admin phải có thể nâng cấp người dùng thường thành Quản trị viên.

**FR-ADMIN-5-03:** Sau khi nâng cấp, người được nâng cấp phải có đầy đủ quyền quản trị và truy cập được trang admin sau lần đăng nhập tiếp theo.

**FR-ADMIN-5-04:** Super Admin phải có thể thu hồi quyền Quản trị viên của Admin thường.

**FR-ADMIN-5-05:** Sau khi thu hồi, người bị thu hồi không còn truy cập được trang admin sau lần đăng nhập tiếp theo; hệ thống hiển thị thông báo không có quyền.

**FR-ADMIN-5-06:** Hệ thống phải từ chối Admin thường cố thực hiện thao tác phân quyền (qua UI hoặc API); hiển thị thông báo không có quyền.

**FR-ADMIN-5-07:** Hệ thống phải từ chối người dùng thường cố thực hiện thao tác phân quyền.

**FR-ADMIN-5-08:** Vai trò phải được cập nhật đúng trong cơ sở dữ liệu sau mỗi thao tác phân quyền (nâng cấp → role = "admin"; thu hồi → role = "user").

---

### 8.5.3. Đặc tả Use Case

**Tên Use Case:** Phân quyền và thu hồi quyền quản trị viên  
**Mã Use Case:** UC-ADMIN-ROLE-01

**Mô tả:**  
Super Admin nâng cấp hoặc thu hồi quyền Quản trị viên của người dùng trong hệ thống. Chỉ Super Admin mới thấy và thực hiện được chức năng này.

**Tác nhân chính:**  
Super Admin đã đăng nhập

**Tiền điều kiện:**
- Người dùng đã đăng nhập với vai trò Super Admin.
- Tồn tại: 1 tài khoản User thường (để nâng cấp), 1 tài khoản Admin thường (để thu hồi).

**Kích hoạt:**  
Super Admin mở chi tiết tài khoản và chọn "Nâng cấp thành Admin" hoặc "Thu hồi quyền Admin".

**Hậu điều kiện:**
- Nâng cấp thành công: vai trò người dùng = Admin; người đó truy cập được trang admin sau đăng nhập lại.
- Thu hồi thành công: vai trò Admin đó = User; người đó không còn truy cập được trang admin.

#### a. Luồng chính — Nâng cấp thành Quản trị viên (FR-ADMIN-5.1)
1. Super Admin mở chi tiết tài khoản User thường.
2. Hệ thống hiển thị tùy chọn "Nâng cấp thành Admin" (chỉ thấy với Super Admin).
3. Super Admin nhấn "Nâng cấp thành Admin" và xác nhận.
4. Hệ thống cập nhật vai trò thành Admin; danh sách người dùng hiển thị vai trò "Admin".
5. Người được nâng cấp đăng xuất và đăng nhập lại → truy cập được trang admin với đầy đủ quyền quản trị.

#### b. Luồng chính — Thu hồi quyền Quản trị viên (FR-ADMIN-5.2)
1. Super Admin mở chi tiết tài khoản Admin thường.
2. Hệ thống hiển thị tùy chọn "Thu hồi quyền Admin".
3. Super Admin nhấn "Thu hồi quyền Admin" và xác nhận.
4. Hệ thống cập nhật vai trò về User; danh sách hiển thị vai trò "User".
5. Người bị thu hồi đăng xuất và đăng nhập lại → bị từ chối truy cập trang admin; thông báo không có quyền.

#### c. Luồng thay thế (Alternative Flow)

**AF-01: Admin thường mở chi tiết tài khoản User**
1. Admin thường mở chi tiết tài khoản User bất kỳ.
2. Hệ thống không hiển thị tùy chọn "Nâng cấp thành Admin" — chỉ Super Admin mới thấy.

#### d. Luồng ngoại lệ (Exception Flow)

**EF-01: Admin thường cố thực hiện thao tác phân quyền (FR-ADMIN-5.3)**
1. Admin thường gọi API hoặc truy cập URL phân quyền trực tiếp.
2. Hệ thống từ chối; thông báo "Bạn không có quyền thực hiện thao tác này"; không thay đổi vai trò.

**EF-02: Người dùng thường cố thực hiện thao tác phân quyền**
1. Người dùng thường gọi API phân quyền.
2. Hệ thống từ chối; thông báo không có quyền; không thay đổi vai trò.

---

### 8.5.4. Dữ liệu vào
- ID tài khoản cần nâng cấp hoặc thu hồi quyền
- Thao tác: Nâng cấp / Thu hồi quyền Admin
- Xác nhận của Super Admin

### 8.5.5. Dữ liệu ra
- Vai trò tài khoản cập nhật ngay trên giao diện (Admin / User)
- Vai trò cập nhật đúng trong DB (role = "admin" hoặc "user")
- Thông báo thành công hoặc lỗi khi bị từ chối

---

### 8.5.6. Quy tắc nghiệp vụ
- Chỉ Super Admin mới có quyền cấp hoặc thu hồi vai trò Quản trị viên (C-13).
- Admin thường tuyệt đối không thể thực hiện thao tác phân quyền — kiểm tra phải thực hiện ở server.
- Thay đổi vai trò có hiệu lực sau lần đăng nhập tiếp theo của người được/bị thay đổi.
- Vai trò phải cập nhật đúng trong DB.

---

### 8.5.7. Điều kiện tiền đề và ràng buộc
- Người dùng phải đang đăng nhập với vai trò Super Admin.
- Tài khoản cần nâng cấp phải là User thường; tài khoản cần thu hồi phải là Admin thường.
- Ràng buộc C-13: Chỉ Super Admin mới có quyền cấp hoặc thu hồi vai trò Quản trị viên.

---

### 8.5.8. Mức độ ưu tiên
**Mức độ ưu tiên: Cao**

**Lý do:**  
Phân quyền quản trị là thao tác có tác động lớn đến bảo mật hệ thống; nếu bị lạm dụng, có thể tạo ra quá nhiều tài khoản admin không được kiểm soát.

---

### 8.5.9. Tiêu chí chấp nhận
- Super Admin mở chi tiết User → thấy tùy chọn "Nâng cấp thành Admin".
- Admin thường mở chi tiết User → không thấy tùy chọn phân quyền.
- Super Admin nâng cấp User A → vai trò "Admin" hiển thị trong danh sách.
- User A đăng nhập lại → truy cập được trang admin.
- Super Admin thu hồi quyền Admin B → vai trò "User" hiển thị trong danh sách.
- Admin B đăng nhập lại → bị từ chối trang admin; thông báo không có quyền.
- Admin thường gọi API phân quyền → bị từ chối; không thay đổi vai trò.
- Người dùng thường gọi API phân quyền → bị từ chối.
- DB cập nhật đúng role sau nâng cấp và thu hồi.

---

### 8.5.10. Ghi chú
- Các test case tham chiếu: `TC_ADMIN_5_01` đến `TC_ADMIN_5_09` (file `TC_ADMIN_ROLE_MANAGEMENT.md`).
- `TC_ADMIN_5_02` xác nhận Admin thường không thấy tùy chọn phân quyền.
- `TC_ADMIN_5_03` xác nhận Admin thường bị từ chối khi cố thực hiện qua API/URL.
- `TC_ADMIN_5_07` xác nhận người được nâng cấp truy cập được trang admin sau đăng nhập lại.
- `TC_ADMIN_5_08` xác nhận người bị thu hồi bị từ chối trang admin sau đăng nhập lại.
- `TC_ADMIN_5_09` xác nhận vai trò cập nhật đúng trong DB.
- Ràng buộc C-13 là ràng buộc cứng; mọi bypass cần bị chặn ở server.
