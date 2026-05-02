## 8.2. Chức năng Thống kê & Phân tích

### 8.2.1. Mô tả chức năng

Chức năng Thống kê & Phân tích cung cấp cho Quản trị viên ba màn hình thông tin: (1) Dashboard tổng quan với các chỉ số chính của hệ thống (số người dùng, số nhóm, hoạt động…); (2) Trang Phân tích chi tiết với số liệu theo trục thời gian (ngày/tuần/tháng); (3) Trang Trạng thái hệ thống hiển thị tình trạng hoạt động của các thành phần cơ sở hạ tầng (database, cache, server…). Chỉ Quản trị viên mới có thể truy cập. Dữ liệu phải nhất quán giữa Dashboard và trang Phân tích chi tiết.

---

### 8.2.2. Yêu cầu chức năng

**FR-ADMIN-2-01:** Hệ thống phải cung cấp trang Dashboard cho Quản trị viên, hiển thị: số người dùng đang hoạt động, số nhóm trong hệ thống và chỉ số hoạt động (tasks, messages…).

**FR-ADMIN-2-02:** Số liệu trên Dashboard phải phản ánh đúng dữ liệu thực tế — cập nhật khi có thay đổi (ví dụ: tạo người dùng mới, số liệu tăng lên).

**FR-ADMIN-2-03:** Hệ thống phải cung cấp trang Phân tích chi tiết với số liệu theo trục thời gian; các con số phải nhất quán với Dashboard.

**FR-ADMIN-2-04:** Hệ thống phải cung cấp trang Trạng thái hệ thống liệt kê từng thành phần (Database, Cache, Server…) với trạng thái hoạt động phân biệt rõ ràng (Online/Offline hoặc màu sắc tương ứng).

**FR-ADMIN-2-05:** Hệ thống phải chặn người dùng thường truy cập ba trang này dù biết URL; hiển thị thông báo không có quyền.

---

### 8.2.3. Đặc tả Use Case

**Tên Use Case:** Xem thống kê tổng quan, phân tích và trạng thái hệ thống  
**Mã Use Case:** UC-ADMIN-ANALYTICS-01

**Mô tả:**  
Quản trị viên mở các trang thống kê để theo dõi sức khỏe và hoạt động của hệ thống. Bao gồm Dashboard tổng quan, Phân tích chi tiết theo thời gian và Trạng thái thành phần hệ thống.

**Tác nhân chính:**  
Quản trị viên (Admin / Super Admin) đã đăng nhập

**Tiền điều kiện:**
- Người dùng đã đăng nhập với vai trò Admin hoặc Super Admin.
- Hệ thống có dữ liệu mẫu (người dùng, nhóm, hoạt động).

**Kích hoạt:**  
Quản trị viên nhấp vào mục Dashboard, Phân tích hoặc Trạng thái hệ thống trong menu admin.

**Hậu điều kiện:**
- Trang tương ứng hiển thị số liệu chính xác, nhất quán với dữ liệu thực tế.

#### a. Luồng chính (Basic Flow)

**Xem Dashboard tổng quan (FR-ADMIN-2.1)**
1. Quản trị viên mở trang Dashboard.
2. Hệ thống hiển thị các card chỉ số: số người dùng trong hệ thống, số nhóm, chỉ số hoạt động.
3. Bố cục hiển thị đúng; nhãn rõ ràng; không có lỗi chính tả.

**Xem Phân tích chi tiết (FR-ADMIN-2.2)**
1. Quản trị viên mở trang Phân tích.
2. Hệ thống hiển thị số liệu chi tiết theo trục thời gian (ngày/tuần/tháng): số người dùng đăng ký, số task tạo, v.v.
3. Số liệu phản ánh đúng dữ liệu thực tế.

**Xem Trạng thái hệ thống (FR-ADMIN-2.3)**
1. Quản trị viên mở trang Trạng thái hệ thống.
2. Hệ thống liệt kê từng thành phần (Database, Cache, Server…) cùng trạng thái hiện tại.
3. Màu sắc trạng thái phân biệt rõ ràng (ví dụ: xanh = Online, đỏ = Offline).

#### b. Luồng thay thế (Alternative Flow)

**AF-01: Dữ liệu cập nhật sau khi tạo thêm người dùng**
1. Quản trị viên ghi nhận số người dùng trên Dashboard.
2. Admin tạo thêm 1 tài khoản mới.
3. Quay lại Dashboard — số người dùng tăng lên 1; dữ liệu nhất quán.

**AF-02: Kiểm tra nhất quán giữa Dashboard và Phân tích chi tiết**
1. Quản trị viên xem tổng số nhóm trên Dashboard.
2. Quản trị viên mở trang Phân tích chi tiết.
3. Con số tổng nhóm khớp với nhau; không có sai lệch.

#### c. Luồng ngoại lệ (Exception Flow)

**EF-01: Người dùng thường cố truy cập trang thống kê**
1. Người dùng thường nhập URL của Dashboard/Phân tích/Trạng thái hệ thống.
2. Hệ thống từ chối; hiển thị thông báo không có quyền; không hiển thị bất kỳ số liệu quản trị nào.

---

### 8.2.4. Dữ liệu vào
- Tài khoản Quản trị viên đã xác thực

### 8.2.5. Dữ liệu ra
- Dashboard: số người dùng, số nhóm, chỉ số hoạt động
- Phân tích chi tiết: số liệu theo trục thời gian
- Trạng thái hệ thống: danh sách thành phần và trạng thái (Online/Offline)

---

### 8.2.6. Quy tắc nghiệp vụ
- Chỉ Admin và Super Admin được xem các trang thống kê (C-13).
- Số liệu Dashboard và Phân tích chi tiết phải nhất quán; không có sai lệch.
- Dữ liệu hiển thị phải phản ánh đúng trạng thái thực tế của hệ thống tại thời điểm truy cập.

---

### 8.2.7. Điều kiện tiền đề và ràng buộc
- Người dùng phải đang đăng nhập với vai trò Admin hoặc Super Admin.
- Hệ thống phải có dữ liệu để hiển thị (ít nhất vài người dùng và nhóm).

---

### 8.2.8. Mức độ ưu tiên
**Mức độ ưu tiên: Trung bình**

**Lý do:**  
Thống kê & Phân tích hỗ trợ Quản trị viên ra quyết định dựa trên dữ liệu; không ảnh hưởng trực tiếp đến luồng nghiệp vụ của người dùng thường nhưng quan trọng cho vận hành hệ thống.

---

### 8.2.9. Tiêu chí chấp nhận
- Dashboard hiển thị đúng số người dùng, số nhóm, chỉ số hoạt động.
- Tạo thêm 1 người dùng → số người dùng trên Dashboard tăng lên 1.
- Số liệu tổng nhóm giữa Dashboard và Phân tích chi tiết khớp nhau.
- Trang Phân tích hiển thị số liệu theo trục thời gian; nhãn rõ ràng.
- Trang Trạng thái liệt kê đầy đủ thành phần; màu trạng thái phân biệt rõ.
- Người dùng thường cố truy cập URL → bị từ chối, thông báo không có quyền.

---

### 8.2.10. Ghi chú
- Các test case tham chiếu: `TC_ADMIN_2_01` đến `TC_ADMIN_2_09` (file `TC_ADMIN_ANALYTICS.md`).
- `TC_ADMIN_2_04` xác nhận User thường bị chặn truy cập trang thống kê.
- `TC_ADMIN_2_05` xác nhận Dashboard hiển thị đủ chỉ số tổng quan.
- `TC_ADMIN_2_08` xác nhận số liệu Dashboard cập nhật sau khi tạo người dùng mới.
- `TC_ADMIN_2_09` xác nhận nhất quán giữa Dashboard và Phân tích chi tiết.
- Liên kết ràng buộc C-13.
