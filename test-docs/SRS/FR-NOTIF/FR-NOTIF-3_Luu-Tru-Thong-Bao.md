## 14.3. Chức năng Lưu trữ thông báo

### 14.3.1. Mô tả chức năng

Người dùng có thể **lưu trữ** một hoặc nhiều thông báo để đưa chúng ra khỏi **danh sách chính** và xem riêng trong mục/tab **Đã lưu trữ** (FR-NOTIF-3.1). Sau khi lưu trữ, thông báo biến khỏi danh sách mặc định ngay; xuất hiện đúng trong mục đã lưu trữ. Lưu trữ **nhiều** thông báo: các mục còn lại trên danh sách chính không xáo trộn sai. Thông báo chưa đọc bị lưu trữ làm **badge giảm** (không còn tính vào đếm danh sách chính — `TC_NOTIF_ARCHIVE_06`). Sau **reload**, thông báo đã lưu trữ không quay lại danh sách chính (`TC_NOTIF_ARCHIVE_08`). Có thể **lọc/xem** mục đã lưu trữ (`TC_NOTIF_ARCHIVE_02`).

---

### 14.3.2. Yêu cầu chức năng

**FR-NOTIF-3-01:** Tùy chọn Lưu trữ trên thông báo.

**FR-NOTIF-3-02:** Truy cập mục/tab “Đã lưu trữ”.

**FR-NOTIF-3-03:** Lưu trữ một hoặc nhiều → đúng vị trí danh sách (FR-NOTIF-3.1).

**FR-NOTIF-3-04:** Badge chưa đọc cập nhật khi lưu trữ tin chưa đọc.

**FR-NOTIF-3-05:** Persist sau reload.

---

### 14.3.3. Đặc tả Use Case

**Tên Use Case:** Lưu trữ thông báo  
**Mã Use Case:** UC-NOTIF-ARCHIVE-01

**Mô tả:**  
Người dùng chọn lưu trữ để dọn danh sách chính nhưng giữ lại trong kho lưu trữ.

**Tác nhân chính:**  
`user@test.com`

**Tiền điều kiện:**  
≥3 thông báo trong danh sách chính.

**Kích hoạt:**  
Nhấn Lưu trữ trên một hoặc nhiều thông báo.

**Hậu điều kiện:**  
Thông báo chuyển sang mục đã lưu trữ; danh sách chính cập nhật.

#### a. Luồng chính
1. Lưu trữ `"Bạn được mời vào nhóm Alpha"` → biến khỏi danh sách chính → có trong “Đã lưu trữ”.

#### b. Luồng thay thế

**AF-01:** Lưu A, B; C còn trên chính (`TC_NOTIF_ARCHIVE_05`, `07`).

---

### 14.3.4. Dữ liệu vào
- ID thông báo cần lưu trữ

### 14.3.5. Dữ liệu ra
- Trạng thái lưu trữ; danh sách hai vùng cập nhật

---

### 14.3.6. Quy tắc nghiệp vụ
- Lưu trữ không đồng nghĩa xóa — có thể xem lại trong mục đã lưu trữ.

---

### 14.3.7. Điều kiện tiền đề và ràng buộc
- UI có tab/bộ lọc “Đã lưu trữ”.

---

### 14.3.8. Mức độ ưu tiên
**Mức độ ưu tiên: Trung bình**

---

### 14.3.9. Tiêu chí chấp nhận
- `TC_NOTIF_ARCHIVE_01` đến `TC_NOTIF_ARCHIVE_08` (`TC_NOTIF_ARCHIVE.md`).

---

### 14.3.10. Ghi chú
- **FR-NOTIF-3.1** map các case chức năng `03`, `05`.
