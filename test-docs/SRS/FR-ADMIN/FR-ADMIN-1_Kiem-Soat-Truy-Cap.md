## 8.1. Chức năng Kiểm soát truy cập trang quản trị

### 8.1.1. Mô tả chức năng

Chức năng Kiểm soát truy cập đảm bảo trang quản trị (Admin Panel) chỉ được phép truy cập bởi người dùng có vai trò Quản trị viên (Admin) hoặc Super Admin. Người dùng chưa đăng nhập bị chuyển hướng về trang đăng nhập. Người dùng thường đã đăng nhập bị từ chối truy cập với thông báo rõ ràng, không lộ thông tin kỹ thuật. Sau khi bị từ chối, người dùng thường không thấy bất kỳ dữ liệu quản trị nào.

---

### 8.1.2. Yêu cầu chức năng

**FR-ADMIN-1-01:** Hệ thống phải chặn người dùng chưa đăng nhập truy cập trang admin; tự động chuyển hướng về trang đăng nhập.

**FR-ADMIN-1-02:** Hệ thống phải chặn người dùng có vai trò thường (User) truy cập trang admin dù biết URL trực tiếp; hiển thị thông báo không có quyền mà không render bất kỳ nội dung quản trị nào.

**FR-ADMIN-1-03:** Hệ thống phải cho phép Quản trị viên (Admin) và Super Admin truy cập đầy đủ trang admin.

**FR-ADMIN-1-04:** Thông báo từ chối truy cập phải rõ ràng, thân thiện với người dùng và không lộ stack trace hoặc mã lỗi kỹ thuật.

**FR-ADMIN-1-05:** Trang admin của Super Admin phải bao gồm cả chức năng phân quyền không hiển thị với Admin thường.

---

### 8.1.3. Đặc tả Use Case

**Tên Use Case:** Kiểm soát quyền truy cập trang quản trị  
**Mã Use Case:** UC-ADMIN-ACCESS-01

**Mô tả:**  
Hệ thống kiểm tra vai trò của người dùng khi truy cập trang quản trị. Chỉ Admin và Super Admin được phép vào; các vai trò khác bị từ chối hoặc chuyển hướng tùy thuộc trạng thái đăng nhập.

**Tác nhân chính:**  
Người dùng bất kỳ (User, Admin, Super Admin, chưa đăng nhập)

**Tiền điều kiện:**
- Ứng dụng đang chạy và trang admin có URL riêng biệt (ví dụ: `/admin`).
- Tồn tại ít nhất: 1 tài khoản User thường, 1 tài khoản Admin, 1 tài khoản Super Admin.

**Kích hoạt:**  
Người dùng điều hướng đến URL trang admin (bằng menu, link, hoặc nhập trực tiếp).

**Hậu điều kiện:**
- Nếu là Admin/Super Admin: trang admin hiển thị đầy đủ giao diện quản trị.
- Nếu là User thường hoặc chưa đăng nhập: bị từ chối hoặc chuyển hướng.

#### a. Luồng chính (Basic Flow)
1. Quản trị viên (Admin hoặc Super Admin) đăng nhập thành công.
2. Quản trị viên điều hướng đến trang admin.
3. Hệ thống kiểm tra vai trò của người dùng.
4. Hệ thống xác nhận vai trò là Admin hoặc Super Admin.
5. Trang admin hiển thị đầy đủ: Dashboard, Người dùng, Log… và các chức năng quản trị.

#### b. Luồng thay thế (Alternative Flow)

**AF-01: Super Admin truy cập — thấy thêm chức năng phân quyền**
1. Super Admin điều hướng đến trang admin.
2. Hệ thống cho phép truy cập và hiển thị đầy đủ giao diện, bao gồm cả tùy chọn phân quyền (nâng cấp/thu hồi Admin) không có với Admin thường.

#### c. Luồng ngoại lệ (Exception Flow)

**EF-01: Người dùng chưa đăng nhập truy cập trang admin**
1. Người dùng chưa đăng nhập nhập URL trang admin vào thanh địa chỉ.
2. Hệ thống phát hiện không có session hợp lệ.
3. Hệ thống tự động chuyển hướng về trang đăng nhập; không hiển thị nội dung admin.

**EF-02: Người dùng vai trò thường truy cập trang admin**
1. Người dùng thường (đã đăng nhập) điều hướng đến URL trang admin.
2. Hệ thống phát hiện vai trò không đủ quyền.
3. Hệ thống hiển thị thông báo "Bạn không có quyền truy cập trang này" — không render bất kỳ nội dung hay dữ liệu quản trị nào.
4. Thông báo không lộ stack trace hoặc mã lỗi kỹ thuật.

---

### 8.1.4. Dữ liệu vào
- Session/token của người dùng hiện tại
- URL trang admin được truy cập

### 8.1.5. Dữ liệu ra
- Giao diện trang admin (nếu có quyền)
- Chuyển hướng về trang đăng nhập (nếu chưa đăng nhập)
- Thông báo không có quyền (nếu là User thường)

---

### 8.1.6. Quy tắc nghiệp vụ
- Chỉ vai trò Admin và Super Admin mới được phép vào trang quản trị (C-13).
- Kiểm tra quyền phải thực hiện ở cả phía server — không chỉ ẩn nút/link ở giao diện.
- Thông báo từ chối không lộ thông tin kỹ thuật nhạy cảm (NFR-SEC).
- Super Admin có quyền hơn Admin thường (thêm chức năng phân quyền).

---

### 8.1.7. Điều kiện tiền đề và ràng buộc
- Hệ thống quản lý vai trò phải hoạt động đúng.
- Session/token xác thực phải còn hiệu lực.

---

### 8.1.8. Mức độ ưu tiên
**Mức độ ưu tiên: Cao**

**Lý do:**  
Kiểm soát truy cập là tầng bảo vệ đầu tiên và quan trọng nhất của toàn bộ module quản trị; nếu sai, dữ liệu hệ thống có thể bị lộ hoặc thao túng.

---

### 8.1.9. Tiêu chí chấp nhận
- Quản trị viên truy cập trang admin → giao diện quản trị hiển thị đầy đủ.
- Super Admin truy cập → thấy thêm chức năng phân quyền so với Admin thường.
- Người dùng chưa đăng nhập nhập URL admin → tự động chuyển hướng về trang đăng nhập.
- Người dùng thường nhập URL admin trực tiếp → thông báo không có quyền; không hiển thị dữ liệu quản trị.
- Thông báo lỗi thân thiện, không lộ stack trace.

---

### 8.1.10. Ghi chú
- Các test case tham chiếu: `TC_ADMIN_1_01` đến `TC_ADMIN_1_07` (file `TC_ADMIN_ACCESS_CONTROL.md`).
- `TC_ADMIN_1_02` xác nhận thông báo lỗi không lộ stack trace.
- `TC_ADMIN_1_03` xác nhận User thường bị chặn kể cả khi nhập URL trực tiếp.
- `TC_ADMIN_1_04` xác nhận chuyển hướng về trang đăng nhập khi chưa có session.
- `TC_ADMIN_1_07` xác nhận User thường không thấy dữ liệu quản trị sau khi bị từ chối.
- Liên kết ràng buộc C-13; NFR-SEC.
