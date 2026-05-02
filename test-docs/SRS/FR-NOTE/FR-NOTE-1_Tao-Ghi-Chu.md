## 15.1. Chức năng Tạo ghi chú

### 15.1.1. Mô tả chức năng

Người dùng **tạo ghi chú mới** qua nút/tùy chọn trong mục Ghi chú; form có các trường nhập (tiêu đề, nội dung). **Lưu** thành công → ghi chú xuất hiện trong danh sách và có thông báo thành công (FR-NOTE-1.1). **Để trống** các trường bắt buộc → lỗi, không tạo bản ghi (`TC_NOTE_CREATE_03`). Ghi chú mới **mặc định Riêng tư** — người khác không thấy trong danh sách của họ (`TC_NOTE_CREATE_06`, FR-NOTE-7.2). **Giữ bền:** sau reload vẫn còn trong danh sách (`08`). **Bảo mật:** chưa đăng nhập không truy cập trang tạo (`09`, NFR-SEC-2); ghi chú của user A không hiển thị cho user B (`07`, NFR-SEC-3).

---

### 15.1.2. Yêu cầu chức năng

**FR-NOTE-1-01:** Nút/màn hình tạo ghi chú mới (FR-NOTE-1.1).

**FR-NOTE-1-02:** Validation khi dữ liệu không hợp lệ.

**FR-NOTE-1-03:** Ghi chú mới mặc định **Riêng tư** (FR-NOTE-7.2).

**FR-NOTE-1-04:** Chỉ chủ sở hữu thấy ghi chú trong danh sách cá nhân.

---

### 15.1.3. Đặc tả Use Case

**Tên Use Case:** Tạo ghi chú mới  
**Mã Use Case:** UC-NOTE-CREATE-01

**Mô tả:**  
Người đăng nhập nhập tiêu đề và nội dung, lưu để thêm ghi chú vào hệ thống.

**Tác nhân chính:**  
Người dùng (`user@test.com`)

**Tiền điều kiện:**  
Đã đăng nhập.

**Kích hoạt:**  
Nhấn “Tạo ghi chú mới”, điền form, nhấn “Lưu”.

**Hậu điều kiện:**  
Ghi chú được lưu và hiển thị trong danh sách ghi chú của người dùng.

#### a. Luồng chính
1. Mở form → nhập tiêu đề `"Ghi chú học tập"`, nội dung `"Ôn tập chương 3"` → Lưu → ghi chú trong danh sách; mở chi tiết thấy đúng nội dung (`04`, `05`).

#### b. Luồng thay thế

**AF-01:** Trống toàn bộ → lỗi, không tạo (`03`).

**AF-02:** Sau khi tạo, kiểm tra cài đặt chia sẻ = Riêng tư (`06`).

---

### 15.1.4. Dữ liệu vào
- Tiêu đề, nội dung (theo form)

### 15.1.5. Dữ liệu ra
- Bản ghi ghi chú; thông báo thành công/lỗi

---

### 15.1.6. Quy tắc nghiệp vụ
- Ghi chú gắn với tài khoản tạo; mặc định riêng tư.

---

### 15.1.7. Điều kiện tiền đề và ràng buộc
- Cần tài khoản phụ (`user2@test.com`) để kiểm tra không lộ danh sách.

---

### 15.1.8. Mức độ ưu tiên
**Mức độ ưu tiên: Cao**

---

### 15.1.9. Tiêu chí chấp nhận
- `TC_NOTE_CREATE_01` đến `TC_NOTE_CREATE_09` (`TC_NOTE_CREATE.md`).
- `TC_NOTE_CREATE_04` → FR-NOTE-1.1; `06` → FR-NOTE-7.2.

---

### 15.1.10. Ghi chú
- Chi tiết **chia sẻ công khai / riêng tư** sau khi đổi cài đặt nằm trong `FR-NOTE-7_Chia-Se-Cong-Khai-Rieng-Tu.md`.
