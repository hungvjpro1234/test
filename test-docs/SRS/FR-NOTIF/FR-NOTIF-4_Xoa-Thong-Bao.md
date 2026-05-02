## 14.4. Chức năng Xóa thông báo

### 14.4.1. Mô tả chức năng

Người dùng **xóa** một hoặc nhiều thông báo khỏi danh sách của mình (FR-NOTIF-4.1). Tin bị xóa **biến mất ngay**; các tin khác không đổi thứ tự/nội dung. Xóa tin **chưa đọc** làm **badge giảm** đúng. Sau **reload**, tin đã xóa **không trở lại**. Có thể xóa trong **mục đã lưu trữ** — tin không xuất hiện lại ở danh sách chính (`TC_NOTIF_DELETE_08`). Gọi API lấy tin theo ID đã xóa → lỗi không tìm thấy / từ chối (`TC_NOTIF_DELETE_06`).

---

### 14.4.2. Yêu cầu chức năng

**FR-NOTIF-4-01:** Tùy chọn Xóa trên thông báo.

**FR-NOTIF-4-02:** Xóa một hoặc nhiều → danh sách và badge đúng (FR-NOTIF-4.1).

**FR-NOTIF-4-03:** Persist sau reload.

**FR-NOTIF-4-04:** Xóa trong mục đã lưu trữ.

---

### 14.4.3. Đặc tả Use Case

**Tên Use Case:** Xóa thông báo  
**Mã Use Case:** UC-NOTIF-DELETE-01

**Mô tả:**  
Người dùng gỡ vĩnh viễn thông báo khỏi giao diện và (theo thiết kế) khỏi truy xuất thông thường.

**Tác nhân chính:**  
`user@test.com`

**Tiền điều kiện:**  
≥3 thông báo (đã đọc và chưa đọc).

**Kích hoạt:**  
Nhấn Xóa.

**Hậu điều kiện:**  
Thông báo không còn trong danh sách hiển thị.

#### a. Luồng chính
1. Xóa tin đã đọc → biến mất ngay.

#### b. Luồng thay thế

**AF-01:** Xóa tin chưa đọc → badge N−1 (`TC_NOTIF_DELETE_03`, `07`).

**AF-02:** Xóa trong đã lưu trữ (`08`).

---

### 14.4.4. Dữ liệu vào
- ID thông báo xóa

### 14.4.5. Dữ liệu ra
- Danh sách đã cập nhật; lỗi nếu API truy ID đã xóa

---

### 14.4.6. Quy tắc nghiệp vụ
- Xóa chỉ áp dụng cho thông báo của chính user.

---

### 14.4.7. Điều kiện tiền đề và ràng buộc
- Phân biệt xóa khỏi danh sách chính vs mục lưu trữ.

---

### 14.4.8. Mức độ ưu tiên
**Mức độ ưu tiên: Trung bình**

---

### 14.4.9. Tiêu chí chấp nhận
- `TC_NOTIF_DELETE_01` đến `TC_NOTIF_DELETE_08` (`TC_NOTIF_DELETE.md`).

---

### 14.4.10. Ghi chú
- **FR-NOTIF-4.1** map `02`–`05`, `07`.
