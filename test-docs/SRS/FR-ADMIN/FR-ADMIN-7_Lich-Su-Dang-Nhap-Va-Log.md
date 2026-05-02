## 8.7. Chức năng Lịch sử đăng nhập & Log hành động quản trị

### 8.7.1. Mô tả chức năng

Chức năng Lịch sử đăng nhập & Log hành động quản trị cung cấp cho Quản trị viên khả năng tra cứu và kiểm soát hai loại dữ liệu nhật ký: (1) Lịch sử đăng nhập ghi lại mọi lần đăng nhập (thành công và thất bại) với tên người dùng, địa chỉ IP, thiết bị, thời điểm và kết quả; (2) Log hành động quản trị ghi lại các thao tác quản trị đã thực hiện (khóa tài khoản, phân quyền, gửi thông báo…) với người thực hiện, loại thao tác, đối tượng tác động và thời điểm. Cả hai danh sách có phân trang và chỉ Quản trị viên mới được xem.

---

### 8.7.2. Yêu cầu chức năng

**FR-ADMIN-7-01:** Hệ thống phải cung cấp trang Lịch sử đăng nhập cho Quản trị viên, hiển thị danh sách có phân trang với đầy đủ thông tin mỗi bản ghi: tên người dùng, địa chỉ IP, thiết bị/trình duyệt, thời điểm, kết quả (Thành công/Thất bại).

**FR-ADMIN-7-02:** Mỗi lần đăng nhập thành công phải tạo bản ghi mới trong lịch sử đăng nhập với kết quả "Thành công".

**FR-ADMIN-7-03:** Mỗi lần đăng nhập thất bại phải tạo bản ghi mới trong lịch sử đăng nhập với kết quả "Thất bại".

**FR-ADMIN-7-04:** Hệ thống phải cung cấp trang Log hành động quản trị, hiển thị danh sách có phân trang với đầy đủ: người thực hiện, loại thao tác, đối tượng tác động, thời điểm.

**FR-ADMIN-7-05:** Sau khi Quản trị viên thực hiện thao tác quản trị (khóa tài khoản, phân quyền, gửi thông báo…), phải tạo bản ghi log mới ghi lại đầy đủ thông tin.

**FR-ADMIN-7-06:** Thời gian trong log phải hiển thị đúng định dạng nhất quán (ví dụ: DD/MM/YYYY HH:mm:ss).

**FR-ADMIN-7-07:** Hệ thống phải chặn người dùng thường truy cập cả trang lịch sử đăng nhập và trang log hành động; hiển thị thông báo không có quyền.

---

### 8.7.3. Đặc tả Use Case

**Tên Use Case:** Xem lịch sử đăng nhập và log hành động quản trị  
**Mã Use Case:** UC-ADMIN-LOG-01

**Mô tả:**  
Quản trị viên tra cứu lịch sử đăng nhập của hệ thống và log các thao tác quản trị đã thực hiện để kiểm soát bảo mật và kiểm toán (audit).

**Tác nhân chính:**  
Quản trị viên (Admin / Super Admin) đã đăng nhập

**Tiền điều kiện:**
- Người dùng đã đăng nhập với vai trò Admin hoặc Super Admin.
- Hệ thống đã có ít nhất vài lần đăng nhập (thành công và thất bại) được ghi lại.
- Admin đã thực hiện ít nhất 1 thao tác quản trị trước đó để có dữ liệu log.

**Kích hoạt:**  
Quản trị viên nhấp vào mục "Lịch sử đăng nhập" hoặc "Log hành động" trong Admin Panel.

**Hậu điều kiện:**
- Trang tương ứng hiển thị danh sách nhật ký chính xác, đầy đủ thông tin, có phân trang.

#### a. Luồng chính — Xem lịch sử đăng nhập (FR-ADMIN-7.1)
1. Quản trị viên mở trang Lịch sử đăng nhập.
2. Hệ thống hiển thị bảng danh sách các lần đăng nhập với các cột: Tên người dùng, Địa chỉ IP, Thiết bị, Thời điểm, Kết quả.
3. Dữ liệu hiển thị đúng, không có ô trống không giải thích.
4. Có phân trang nếu nhiều bản ghi; định dạng thời gian nhất quán.

#### b. Luồng chính — Xem log hành động quản trị (FR-ADMIN-7.2)
1. Quản trị viên mở trang Log hành động quản trị.
2. Hệ thống hiển thị bảng danh sách các thao tác quản trị với: Người thực hiện, Loại thao tác, Đối tượng tác động, Thời điểm.
3. Dữ liệu rõ ràng; phân loại thao tác dễ đọc (ví dụ: "Khóa tài khoản", "Nâng cấp quyền").
4. Có phân trang nếu nhiều bản ghi.

#### c. Luồng thay thế (Alternative Flow)

**AF-01: Đăng nhập thành công tạo bản ghi**
1. User thực hiện đăng nhập thành công.
2. Quản trị viên kiểm tra lại trang lịch sử đăng nhập.
3. Bản ghi mới xuất hiện với kết quả "Thành công", đủ thông tin: tên User, IP, thiết bị, thời điểm.

**AF-02: Đăng nhập thất bại tạo bản ghi**
1. Ai đó cố đăng nhập với email đúng nhưng sai mật khẩu.
2. Quản trị viên kiểm tra lại trang lịch sử đăng nhập.
3. Bản ghi mới xuất hiện với kết quả "Thất bại", email cố đăng nhập, IP và thời điểm.

**AF-03: Thao tác quản trị tạo bản ghi log**
1. Admin thực hiện thao tác khóa tài khoản User mẫu.
2. Quản trị viên kiểm tra trang Log hành động.
3. Bản ghi mới xuất hiện ghi lại: tên admin thực hiện, loại thao tác "Khóa tài khoản", đối tượng bị tác động (User mẫu), thời điểm.

#### d. Luồng ngoại lệ (Exception Flow)

**EF-01: Người dùng thường truy cập trang lịch sử đăng nhập**
1. Người dùng thường nhập URL trang lịch sử đăng nhập.
2. Hệ thống từ chối; thông báo không có quyền; không hiển thị dữ liệu log.

**EF-02: Người dùng thường truy cập trang log hành động**
1. Người dùng thường nhập URL trang log hành động.
2. Hệ thống từ chối; thông báo không có quyền; không hiển thị dữ liệu log.

---

### 8.7.4. Dữ liệu vào
- Sự kiện đăng nhập (thành công/thất bại) → tự động ghi log
- Thao tác quản trị được thực hiện → tự động ghi log
- Tài khoản Quản trị viên đã xác thực (để xem log)

### 8.7.5. Dữ liệu ra
- Danh sách lịch sử đăng nhập (tên người dùng, IP, thiết bị, thời điểm, kết quả)
- Danh sách log hành động quản trị (người thực hiện, loại thao tác, đối tượng, thời điểm)
- Thông báo không có quyền khi người dùng thường cố truy cập

---

### 8.7.6. Quy tắc nghiệp vụ
- Chỉ Admin và Super Admin được xem lịch sử đăng nhập và log hành động (C-13).
- Mọi lần đăng nhập (thành công và thất bại) đều phải được ghi lại tự động.
- Mọi thao tác quản trị (khóa tài khoản, phân quyền, gửi thông báo…) phải được ghi log tự động.
- Định dạng thời gian phải nhất quán trên toàn bộ các bản ghi.
- Dữ liệu log phải chỉ đọc — Quản trị viên không thể chỉnh sửa hoặc xóa log.

---

### 8.7.7. Điều kiện tiền đề và ràng buộc
- Người dùng phải đang đăng nhập với vai trò Admin hoặc Super Admin.
- Hệ thống phải có cơ chế tự động ghi log khi xảy ra sự kiện đăng nhập và thao tác quản trị.
- Cơ sở dữ liệu log phải truy cập được.

---

### 8.7.8. Mức độ ưu tiên
**Mức độ ưu tiên: Trung bình - Cao**

**Lý do:**  
Lịch sử đăng nhập và log hành động là công cụ kiểm toán (audit trail) thiết yếu để phát hiện truy cập bất thường và truy vết trách nhiệm các thao tác quản trị.

---

### 8.7.9. Tiêu chí chấp nhận
- Trang lịch sử đăng nhập hiển thị bảng với đủ 5 cột: tên người dùng, IP, thiết bị, thời điểm, kết quả.
- Đăng nhập thành công → bản ghi mới xuất hiện với kết quả "Thành công".
- Đăng nhập thất bại (sai mật khẩu) → bản ghi mới với kết quả "Thất bại".
- Trang log hành động hiển thị với đủ: người thực hiện, loại thao tác, đối tượng, thời điểm.
- Admin khóa tài khoản → bản ghi log mới xuất hiện với đủ thông tin.
- Có phân trang trên cả hai trang log.
- Định dạng thời gian nhất quán trên tất cả bản ghi.
- Người dùng thường truy cập URL trang lịch sử đăng nhập → bị từ chối.
- Người dùng thường truy cập URL trang log hành động → bị từ chối.

---

### 8.7.10. Ghi chú
- Các test case tham chiếu: `TC_ADMIN_7_01` đến `TC_ADMIN_7_10` (file `TC_ADMIN_LOG.md`).
- `TC_ADMIN_7_03` xác nhận định dạng thời gian nhất quán (DD/MM/YYYY HH:mm:ss).
- `TC_ADMIN_7_04/05` xác nhận người dùng thường bị chặn cả hai trang log.
- `TC_ADMIN_7_08` xác nhận đăng nhập thành công tạo bản ghi với kết quả "Thành công".
- `TC_ADMIN_7_09` xác nhận đăng nhập thất bại tạo bản ghi với kết quả "Thất bại".
- `TC_ADMIN_7_10` xác nhận thao tác quản trị tạo bản ghi log đầy đủ.
- Pre-condition: cần có sẵn ít nhất vài bản ghi lịch sử đăng nhập (thành công và thất bại) và 1 thao tác quản trị trước đó.
- Liên kết ràng buộc C-13.
