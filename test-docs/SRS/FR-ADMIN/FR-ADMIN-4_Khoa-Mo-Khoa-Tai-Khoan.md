## 8.4. Chức năng Khóa & Mở khóa tài khoản

### 8.4.1. Mô tả chức năng

Chức năng Khóa & Mở khóa tài khoản cho phép Quản trị viên kiểm soát khả năng đăng nhập của người dùng. Quản trị viên có thể khóa tài khoản đang hoạt động để ngăn người dùng đó đăng nhập, hoặc mở khóa để khôi phục quyền đăng nhập. Trước mỗi thao tác, hệ thống hiển thị hộp thoại xác nhận. Người dùng bị khóa nhận thông báo rõ ràng khi cố đăng nhập. Trạng thái tài khoản được cập nhật ngay lập tức trong giao diện và cơ sở dữ liệu.

---

### 8.4.2. Yêu cầu chức năng

**FR-ADMIN-4-01:** Hệ thống phải hiển thị trạng thái khóa/mở khóa rõ ràng (phân biệt bằng màu sắc hoặc nhãn: Active/Locked) trên danh sách người dùng.

**FR-ADMIN-4-02:** Trước khi thực hiện khóa hoặc mở khóa, hệ thống phải hiển thị hộp thoại xác nhận với nội dung rõ ràng và các nút Hủy/Xác nhận.

**FR-ADMIN-4-03:** Khi khóa thành công, trạng thái tài khoản phải cập nhật ngay thành "Bị khóa" trên giao diện và cơ sở dữ liệu.

**FR-ADMIN-4-04:** Người dùng bị khóa phải không thể đăng nhập; hệ thống hiển thị thông báo "Tài khoản đã bị khóa" khi họ cố đăng nhập với thông tin đúng.

**FR-ADMIN-4-05:** Khi mở khóa thành công, trạng thái tài khoản phải cập nhật ngay thành "Đang hoạt động"; người dùng có thể đăng nhập bình thường.

**FR-ADMIN-4-06:** Nếu Quản trị viên hủy xác nhận, tài khoản không bị thay đổi trạng thái.

**FR-ADMIN-4-07:** Hệ thống phải từ chối khóa tài khoản không tồn tại; hiển thị thông báo không tìm thấy.

**FR-ADMIN-4-08:** Chỉ Quản trị viên mới có thể thực hiện thao tác khóa/mở khóa; người dùng thường bị từ chối.

---

### 8.4.3. Đặc tả Use Case

**Tên Use Case:** Khóa và mở khóa tài khoản người dùng  
**Mã Use Case:** UC-ADMIN-LOCK-01

**Mô tả:**  
Quản trị viên thay đổi trạng thái hoạt động của tài khoản người dùng: khóa (ngăn đăng nhập) hoặc mở khóa (khôi phục đăng nhập). Mỗi thao tác yêu cầu xác nhận trước khi thực hiện.

**Tác nhân chính:**  
Quản trị viên (Admin / Super Admin) đã đăng nhập

**Tiền điều kiện:**
- Người dùng đã đăng nhập với vai trò Admin hoặc Super Admin.
- Tồn tại tài khoản User đang hoạt động (để test khóa) và tài khoản User đang bị khóa (để test mở khóa).

**Kích hoạt:**  
Quản trị viên nhấn nút "Khóa" hoặc "Mở khóa" trên tài khoản người dùng.

**Hậu điều kiện:**
- Nếu xác nhận khóa: tài khoản chuyển sang trạng thái "Bị khóa"; người dùng không thể đăng nhập.
- Nếu xác nhận mở khóa: tài khoản chuyển sang "Đang hoạt động"; người dùng có thể đăng nhập lại.
- Nếu hủy: trạng thái giữ nguyên.

#### a. Luồng chính — Khóa tài khoản (FR-ADMIN-4.1)
1. Quản trị viên tìm tài khoản User đang hoạt động trong danh sách.
2. Quản trị viên nhấn nút "Khóa".
3. Hệ thống hiển thị hộp thoại xác nhận với nội dung cảnh báo; nút Hủy và Xác nhận.
4. Quản trị viên nhấn "Xác nhận".
5. Hệ thống khóa tài khoản; trạng thái cập nhật ngay thành "Bị khóa" trên giao diện.
6. Cơ sở dữ liệu cập nhật đúng (is_active = false hoặc tương đương).

#### b. Luồng chính — Mở khóa tài khoản (FR-ADMIN-4.2)
1. Quản trị viên tìm tài khoản User đang bị khóa.
2. Quản trị viên nhấn nút "Mở khóa".
3. Hệ thống hiển thị hộp thoại xác nhận.
4. Quản trị viên nhấn "Xác nhận".
5. Hệ thống mở khóa; trạng thái cập nhật ngay thành "Đang hoạt động".
6. Cơ sở dữ liệu cập nhật đúng (is_active = true hoặc tương đương).

#### c. Luồng thay thế (Alternative Flow)

**AF-01: Hủy xác nhận khóa**
1. Quản trị viên nhấn "Khóa" nhưng chọn "Hủy" trên hộp thoại.
2. Hộp thoại đóng; tài khoản vẫn ở trạng thái "Đang hoạt động".

**AF-02: Xác minh người dùng bị khóa không thể đăng nhập**
1. Sau khi khóa, cố đăng nhập với tài khoản đó bằng email và mật khẩu đúng.
2. Hệ thống từ chối; hiển thị thông báo "Tài khoản đã bị khóa".

**AF-03: Xác minh người dùng được mở khóa có thể đăng nhập**
1. Sau khi mở khóa, đăng nhập với tài khoản đó.
2. Đăng nhập thành công; vào được giao diện chính.

#### d. Luồng ngoại lệ (Exception Flow)

**EF-01: Khóa tài khoản không tồn tại (FR-ADMIN-4.3)**
1. Quản trị viên cố thực hiện khóa tài khoản với ID/email không tồn tại (ví dụ: qua API).
2. Hệ thống hiển thị thông báo "Không tìm thấy tài khoản"; không thực hiện khóa.

**EF-02: Người dùng thường cố thực hiện khóa**
1. Người dùng thường gọi API hoặc truy cập chức năng khóa.
2. Hệ thống từ chối; thông báo không có quyền; không thực hiện khóa.

---

### 8.4.4. Dữ liệu vào
- ID/email tài khoản cần khóa hoặc mở khóa
- Xác nhận của Quản trị viên (nhấn nút Xác nhận)

### 8.4.5. Dữ liệu ra
- Trạng thái tài khoản cập nhật ngay trên giao diện (Bị khóa / Đang hoạt động)
- Trạng thái cập nhật trong DB (is_active)
- Thông báo thành công hoặc lỗi tương ứng

---

### 8.4.6. Quy tắc nghiệp vụ
- Chỉ Admin và Super Admin được thực hiện khóa/mở khóa (C-13).
- Bắt buộc có bước xác nhận trước khi thực hiện.
- Tài khoản bị khóa không thể đăng nhập dù nhập đúng mật khẩu (liên kết FR-AUTH-2).
- Trạng thái phải cập nhật ngay trên giao diện và persist trong DB.

---

### 8.4.7. Điều kiện tiền đề và ràng buộc
- Người dùng phải đang đăng nhập với vai trò Admin hoặc Super Admin.
- Tài khoản cần khóa phải tồn tại và đang hoạt động; tài khoản cần mở khóa phải tồn tại và đang bị khóa.

---

### 8.4.8. Mức độ ưu tiên
**Mức độ ưu tiên: Cao**

**Lý do:**  
Khóa/mở khóa tài khoản là công cụ quan trọng để Quản trị viên bảo vệ hệ thống khỏi tài khoản vi phạm hoặc khôi phục truy cập hợp lệ.

---

### 8.4.9. Tiêu chí chấp nhận
- Tài khoản hoạt động và bị khóa hiển thị trạng thái phân biệt rõ ràng trên danh sách.
- Nhấn "Khóa" → hộp thoại xác nhận hiển thị với cảnh báo và nút Hủy/Xác nhận.
- Nhấn "Hủy" → hộp thoại đóng; trạng thái không thay đổi.
- Nhấn "Xác nhận" khóa → trạng thái cập nhật ngay thành "Bị khóa".
- Người dùng bị khóa cố đăng nhập → thông báo "Tài khoản đã bị khóa".
- Mở khóa thành công → trạng thái cập nhật ngay thành "Đang hoạt động".
- Người dùng được mở khóa đăng nhập → thành công.
- Cố khóa tài khoản không tồn tại → thông báo "Không tìm thấy".
- Người dùng thường cố khóa → bị từ chối.
- DB cập nhật đúng trạng thái sau khóa/mở khóa.

---

### 8.4.10. Ghi chú
- Các test case tham chiếu: `TC_ADMIN_4_01` đến `TC_ADMIN_4_10` (file `TC_ADMIN_LOCK_UNLOCK.md`).
- `TC_ADMIN_4_07` xác nhận người dùng bị khóa không thể đăng nhập; liên kết với FR-AUTH-2.5.
- `TC_ADMIN_4_08` xác nhận người được mở khóa đăng nhập bình thường.
- `TC_ADMIN_4_09` xác nhận hủy xác nhận không thực hiện khóa.
- `TC_ADMIN_4_10` xác nhận DB cập nhật đúng is_active sau khóa/mở khóa.
- Liên kết ràng buộc C-13; liên kết FR-AUTH-2 (đăng nhập tài khoản bị khóa).
