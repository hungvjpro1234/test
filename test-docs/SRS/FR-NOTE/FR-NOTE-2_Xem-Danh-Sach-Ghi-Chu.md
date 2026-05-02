## 15.2. Chức năng Xem danh sách ghi chú

### 15.2.1. Mô tả chức năng

Người dùng mở **mục Ghi chú** từ menu điều hướng và xem **tất cả ghi chú thuộc tài khoản hiện tại** (FR-NOTE-2.1). Mỗi mục hiển thị ít nhất **tiêu đề** và **thời gian tạo/cập nhật** (`TC_NOTE_LIST_02`). **Không** hiển thị ghi chú riêng tư của người dùng khác (`06`, NFR-SEC-3). **Danh sách trống:** empty state rõ ràng, không lỗi (`04`). **Ghi chú mới** sau khi tạo xuất hiện ngay trong danh sách (`05`). **Sau khi xóa** một ghi chú, danh sách cập nhật không còn mục đó (`07`).

---

### 15.2.2. Yêu cầu chức năng

**FR-NOTE-2-01:** Truy cập mục Ghi chú từ điều hướng (FR-NOTE-2.1).

**FR-NOTE-2-02:** Danh sách đủ thông tin nhận diện từng ghi chú.

**FR-NOTE-2-03:** Cách ly dữ liệu giữa các tài khoản (NFR-SEC-3).

---

### 15.2.3. Đặc tả Use Case

**Tên Use Case:** Xem danh sách ghi chú cá nhân  
**Mã Use Case:** UC-NOTE-LIST-01

**Mô tả:**  
Người dùng xem tập hợp ghi chú của chính mình.

**Tác nhân chính:**  
`user@test.com` / `newuser@test.com`

**Tiền điều kiện:**  
Đã đăng nhập; có ≥3 ghi chú (hoặc 0 để test empty).

**Kích hoạt:**  
Chọn mục “Ghi chú” trên menu.

**Hậu điều kiện:**  
Danh sách phản ánh đúng ghi chú của user.

#### a. Luồng chính
1. Mở mục → thấy đủ các ghi chú `"A"`, `"B"`, `"C"` (`03`).

#### b. Luồng thay thế

**AF-01:** Tài khoản chưa có ghi chú → thông báo trống (`04`).

**AF-02:** Xóa `"X"` → danh sách còn `"Y"`, `"Z"` (`07`).

---

### 15.2.4. Dữ liệu vào
- Phiên đăng nhập hiện tại

### 15.2.5. Dữ liệu ra
- Danh sách ghi chú (tiêu đề, thời gian, …)

---

### 15.2.6. Quy tắc nghiệp vụ
- Chỉ trả về ghi chú do user hiện tại sở hữu.

---

### 15.2.7. Điều kiện tiền đề và ràng buộc
- Checklist “thứ tự sắp xếp nhất quán” — bổ sung kỳ vọng cụ thể (ví dụ mới nhất trên) theo sản phẩm.

---

### 15.2.8. Mức độ ưu tiên
**Mức độ ưu tiên: Cao**

---

### 15.2.9. Tiêu chí chấp nhận
- `TC_NOTE_LIST_01` đến `TC_NOTE_LIST_07` (`TC_NOTE_LIST.md`).
- `TC_NOTE_LIST_03` → FR-NOTE-2.1.

---

### 15.2.10. Ghi chú
- Ghi chú **công khai** xem qua URL bởi user khác được mô tả thêm ở `FR-NOTE-3` và `FR-NOTE-7`.
