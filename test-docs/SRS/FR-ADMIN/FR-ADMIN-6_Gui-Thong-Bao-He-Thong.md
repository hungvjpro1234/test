## 8.6. Chức năng Gửi thông báo hệ thống

### 8.6.1. Mô tả chức năng

Chức năng Gửi thông báo hệ thống cho phép Quản trị viên soạn và gửi thông báo trực tiếp đến một người dùng cụ thể. Người nhận sẽ thấy thông báo trong bảng thông báo của họ ngay sau khi nhận; số đếm thông báo chưa đọc tăng lên. Thông báo hệ thống có thể phân biệt được với các loại thông báo khác (nhóm, task, chat). Người dùng thường không được phép sử dụng chức năng này. Nội dung và người nhận đều bắt buộc.

---

### 8.6.2. Yêu cầu chức năng

**FR-ADMIN-6-01:** Hệ thống phải cung cấp form gửi thông báo hệ thống cho Quản trị viên với các trường: chọn người nhận (bắt buộc) và nội dung thông báo (bắt buộc).

**FR-ADMIN-6-02:** Hệ thống phải gửi thông báo thành công đến người nhận được chỉ định.

**FR-ADMIN-6-03:** Người nhận phải thấy thông báo xuất hiện trong bảng thông báo của họ với nội dung đúng và có thể phân biệt với các loại thông báo khác.

**FR-ADMIN-6-04:** Số đếm thông báo chưa đọc của người nhận phải tăng lên 1 sau khi nhận thông báo hệ thống.

**FR-ADMIN-6-05:** Hệ thống phải từ chối gửi nếu nội dung thông báo trống; hiển thị thông báo lỗi.

**FR-ADMIN-6-06:** Hệ thống phải từ chối gửi nếu chưa chọn người nhận; hiển thị thông báo lỗi.

**FR-ADMIN-6-07:** Hệ thống phải đảm bảo thông báo chỉ đến đúng người nhận được chỉ định — người dùng khác không nhận được.

**FR-ADMIN-6-08:** Người dùng thường không được phép gửi thông báo hệ thống; hệ thống từ chối với thông báo không có quyền.

---

### 8.6.3. Đặc tả Use Case

**Tên Use Case:** Gửi thông báo hệ thống đến người dùng cụ thể  
**Mã Use Case:** UC-ADMIN-NOTIF-01

**Mô tả:**  
Quản trị viên soạn thông báo hệ thống và gửi đến người dùng cụ thể. Người nhận thấy thông báo trong bảng thông báo với số đếm chưa đọc được cập nhật.

**Tác nhân chính:**  
Quản trị viên (Admin / Super Admin) đã đăng nhập

**Tiền điều kiện:**
- Người dùng đã đăng nhập với vai trò Admin hoặc Super Admin.
- Tồn tại ít nhất 1 tài khoản User thường (người nhận).
- Cả Admin và User đang đăng nhập (trên tab/trình duyệt riêng để kiểm tra nhận).

**Kích hoạt:**  
Quản trị viên mở tính năng "Gửi thông báo hệ thống" và điền thông tin.

**Hậu điều kiện:**
- Thông báo được gửi thành công đến đúng người nhận.
- Người nhận thấy thông báo trong bảng thông báo; số đếm chưa đọc tăng lên 1.
- Người dùng khác không nhận được thông báo này.

#### a. Luồng chính (Basic Flow)
1. Quản trị viên mở form gửi thông báo hệ thống.
2. Hệ thống hiển thị form với trường chọn người nhận và trường nội dung.
3. Quản trị viên chọn người nhận (User A) và nhập nội dung thông báo hợp lệ.
4. Quản trị viên nhấn "Gửi".
5. Hệ thống xác nhận gửi thành công; hiển thị toast "Đã gửi thông báo thành công".
6. User A kiểm tra bảng thông báo → thông báo hệ thống xuất hiện với nội dung đúng và có thể phân biệt với các loại khác.
7. Số đếm thông báo chưa đọc của User A tăng lên 1.

#### b. Luồng thay thế (Alternative Flow)

**AF-01: Kiểm tra thông báo chỉ đến đúng người nhận**
1. Admin gửi thông báo cho User A.
2. Kiểm tra bảng thông báo của User B (không phải người nhận).
3. User B không nhận được thông báo này.

#### c. Luồng ngoại lệ (Exception Flow)

**EF-01: Gửi với nội dung trống (FR-ADMIN-6.1)**
1. Quản trị viên chọn người nhận nhưng để trống nội dung và nhấn "Gửi".
2. Hệ thống hiển thị thông báo lỗi "Nội dung không được để trống"; không gửi.

**EF-02: Gửi khi chưa chọn người nhận**
1. Quản trị viên nhập nội dung nhưng không chọn người nhận và nhấn "Gửi".
2. Hệ thống hiển thị thông báo lỗi yêu cầu chọn người nhận; không gửi.

**EF-03: Người dùng thường cố gửi thông báo hệ thống (FR-ADMIN-6.2)**
1. Người dùng thường gọi API hoặc truy cập tính năng gửi thông báo hệ thống.
2. Hệ thống từ chối; thông báo "Bạn không có quyền thực hiện thao tác này"; không gửi.

---

### 8.6.4. Dữ liệu vào
- Người nhận (bắt buộc — chọn từ danh sách người dùng)
- Nội dung thông báo (bắt buộc, không trống)

### 8.6.5. Dữ liệu ra
- Thông báo gửi thành công (toast/alert)
- Thông báo xuất hiện trong bảng thông báo của người nhận
- Số đếm chưa đọc của người nhận tăng lên 1
- Thông báo lỗi khi nội dung trống, chưa chọn người nhận, hoặc không có quyền

---

### 8.6.6. Quy tắc nghiệp vụ
- Chỉ Admin và Super Admin được gửi thông báo hệ thống (C-13).
- Nội dung và người nhận đều bắt buộc.
- Thông báo chỉ đến đúng người nhận được chỉ định; không broadcast đến tất cả.
- Thông báo hệ thống phải có nhãn/icon phân biệt với thông báo nhóm, task, chat.

---

### 8.6.7. Điều kiện tiền đề và ràng buộc
- Người dùng phải đang đăng nhập với vai trò Admin hoặc Super Admin.
- Người nhận phải là tài khoản hợp lệ đang hoạt động trong hệ thống.

---

### 8.6.8. Mức độ ưu tiên
**Mức độ ưu tiên: Trung bình**

**Lý do:**  
Gửi thông báo hệ thống cho phép Quản trị viên truyền đạt thông tin quan trọng (bảo trì, cập nhật…) trực tiếp đến người dùng mà không cần kênh khác.

---

### 8.6.9. Tiêu chí chấp nhận
- Form gửi thông báo hiển thị với trường chọn người nhận và nội dung; layout gọn gàng.
- Chọn người nhận + nhập nội dung hợp lệ + nhấn Gửi → thành công; toast xác nhận.
- User nhận được kiểm tra bảng thông báo → thông báo hệ thống xuất hiện với nội dung đúng; có thể phân biệt với loại khác.
- Số đếm thông báo chưa đọc của người nhận tăng lên 1.
- Người dùng không được chỉ định không nhận thông báo.
- Nội dung trống → lỗi; không gửi.
- Chưa chọn người nhận → lỗi; không gửi.
- Người dùng thường cố gửi → bị từ chối.

---

### 8.6.10. Ghi chú
- Các test case tham chiếu: `TC_ADMIN_6_01` đến `TC_ADMIN_6_08` (file `TC_ADMIN_NOTIFICATION.md`).
- `TC_ADMIN_6_02` xác nhận thông báo hệ thống có thể phân biệt với các loại thông báo khác.
- `TC_ADMIN_6_05` xác nhận User thường bị từ chối gửi thông báo hệ thống.
- `TC_ADMIN_6_07` xác nhận User nhận được thông báo và số đếm chưa đọc tăng; liên kết FR-NOTIF-5.14.
- `TC_ADMIN_6_08` xác nhận thông báo không đến User không được chỉ định.
- Pre-condition: cần có 2 phiên đăng nhập song song (Admin và User nhận) để kiểm tra nhận thông báo.
- Liên kết ràng buộc C-13.
