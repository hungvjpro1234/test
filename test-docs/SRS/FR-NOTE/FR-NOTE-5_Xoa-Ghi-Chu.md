## 15.5. Chức năng Xóa ghi chú

### 15.5.1. Mô tả chức năng

**Chủ sở hữu** xóa ghi chú của mình qua nút Xóa trên chi tiết (hoặc tương đương). Trước khi xóa có **hộp thoại xác nhận** (`TC_NOTE_DELETE_02`). **Xác nhận** → ghi chú biến khỏi danh sách ngay (FR-NOTE-5.1 — `03`). **Hủy** trên dialog → ghi chú giữ nguyên (`06`). Truy cập `/notes/{id}` sau khi xóa → **không tìm thấy** (FR-NOTE-3.2 — `04`). **API:** không cho phép xóa ghi chú của người khác — lỗi quyền, bản ghi còn (FR-NOTE-5.2 — `05`). **Xóa một** không làm mất ghi chú khác (`07`). **Persist:** sau reload ghi chú đã xóa không xuất hiện lại (`08`). **Chưa đăng nhập** không xóa được (`09`, NFR-SEC-2).

---

### 15.5.2. Yêu cầu chức năng

**FR-NOTE-5-01:** Xóa ghi chú của chính mình với xác nhận (FR-NOTE-5.1).

**FR-NOTE-5-02:** Từ chối xóa ghi chú không thuộc quyền (FR-NOTE-5.2).

**FR-NOTE-5-03:** Đồng bộ với chi tiết không còn truy cập (FR-NOTE-3.2).

---

### 15.5.3. Đặc tả Use Case

**Tên Use Case:** Xóa ghi chú  
**Mã Use Case:** UC-NOTE-DELETE-01

**Mô tả:**  
Người dùng xác nhận xóa một ghi chú khỏi hệ thống.

**Tác nhân chính:**  
`user@test.com`

**Tiền điều kiện:**  
≥2 ghi chú; đang xem chi tiết ghi chú cần xóa.

**Kích hoạt:**  
Nhấn “Xóa” → “Xác nhận” hoặc “Hủy”.

**Hậu điều kiện:**  
Ghi chú bị loại khỏi DB/phần hiển thị theo thiết kế.

#### a. Luồng chính
1. Xóa `"Ghi chú sẽ xóa"` → khỏi danh sách (`03`).

#### b. Luồng thay thế

**AF-01:** Hủy dialog → `"Ghi chú giữ lại"` còn (`06`).

**AF-02:** Xóa `id=201` của user2 qua API → từ chối (`05`).

---

### 15.5.4. Dữ liệu vào
- ID ghi chú

### 15.5.5. Dữ liệu ra
- Danh sách/chi tiết cập nhật; lỗi quyền khi không hợp lệ

---

### 15.5.6. Quy tắc nghiệp vụ
- Chỉ chủ sở hữu được DELETE.

---

### 15.5.7. Điều kiện tiền đề và ràng buộc
- Chuẩn bị ghi chú `user2` để test API từ chối.

---

### 15.5.8. Mức độ ưu tiên
**Mức độ ưu tiên: Trung bình**

---

### 15.5.9. Tiêu chí chấp nhận
- `TC_NOTE_DELETE_01` đến `TC_NOTE_DELETE_09` (`TC_NOTE_DELETE.md`).
- `03` → FR-NOTE-5.1; `05` → FR-NOTE-5.2; `04` liên quan FR-NOTE-3.2.

---

### 15.5.10. Ghi chú
- Kiểm tra danh sách sau xóa đồng bộ với `FR-NOTE-2` (`TC_NOTE_LIST_07`).
