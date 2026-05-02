## 15.3. Chức năng Xem chi tiết ghi chú

### 15.3.1. Mô tả chức năng

Người dùng nhấn một ghi chú trong danh sách để mở **trang chi tiết** với **tiêu đề, nội dung đầy đủ, ngày tạo/cập nhật** (FR-NOTE-3.1 — `TC_NOTE_DETAIL_01`, `02`). **Ghi chú đã xóa:** truy cập trực tiếp URL (ví dụ `/notes/999`) → thông báo không tìm thấy; không màn hình trắng (FR-NOTE-3.2, NFR-RELI-1 — `03`). **Ghi chú riêng tư của người khác:** user khác truy cập URL → không có quyền, không lộ nội dung (FR-NOTE-3.3, NFR-SEC-3 — `04`). **Chủ sở hữu** luôn xem được ghi chú riêng tư của mình (`05`). **Ghi chú công khai:** user khác đăng nhập xem được qua ID (FR-NOTE-7.1 — `06`). Sau **cập nhật** nội dung, chi tiết phản ánh bản mới; **reload** không làm mất dữ liệu (`07`, `08`). **Chưa đăng nhập** không xem chi tiết qua URL (`09`, NFR-SEC-2).

---

### 15.3.2. Yêu cầu chức năng

**FR-NOTE-3-01:** Hiển thị đầy đủ thông tin chi tiết (FR-NOTE-3.1).

**FR-NOTE-3-02:** Xử lý ID không tồn tại (FR-NOTE-3.2).

**FR-NOTE-3-03:** Chặn xem ghi chú riêng tư người khác (FR-NOTE-3.3).

**FR-NOTE-3-04:** Phối hợp với chia sẻ công khai (FR-NOTE-7.1) — xem `FR-NOTE-7`.

---

### 15.3.3. Đặc tả Use Case

**Tên Use Case:** Xem chi tiết ghi chú  
**Mã Use Case:** UC-NOTE-DETAIL-01

**Mô tả:**  
Người dùng (hoặc người được phép) mở một ghi chú theo danh sách hoặc URL.

**Tác nhân chính:**  
Người dùng đã đăng nhập

**Tiền điều kiện:**  
Có ghi chú tồn tại hoặc URL kiểm tra lỗi/quyền.

**Kích hoạt:**  
Nhấn ghi chú trong danh sách hoặc truy cập `/notes/{id}`.

**Hậu điều kiện:**  
Hiển thị nội dung hoặc thông báo lỗi/quyền phù hợp.

#### a. Luồng chính — Chủ sở hữu
1. Mở `"Ghi chú A"` → đủ nội dung (`02`, `05`).

#### b. Luồng thay thế

**AF-01:** ID đã xóa → không tìm thấy (`03`).

**AF-02:** Riêng tư người khác → không quyền (`04`).

**AF-03:** Công khai, user khác → xem được (`06`).

#### c. Luồng ngoại lệ

**EF-01:** Chưa đăng nhập → redirect đăng nhập (`09`).

---

### 15.3.4. Dữ liệu vào
- ID ghi chú (URL hoặc chọn từ danh sách)

### 15.3.5. Dữ liệu ra
- Chi tiết ghi chú hoặc thông báo lỗi

---

### 15.3.6. Quy tắc nghiệp vụ
- Riêng tư: chỉ chủ (trừ khi công khai và đủ điều kiện xem theo FR-NOTE-7).

---

### 15.3.7. Điều kiện tiền đề và ràng buộc
- Chuẩn bị ghi chú `user2` riêng tư và URL cố định cho test.

---

### 15.3.8. Mức độ ưu tiên
**Mức độ ưu tiên: Cao**

---

### 15.3.9. Tiêu chí chấp nhận
- `TC_NOTE_DETAIL_01` đến `TC_NOTE_DETAIL_09` (`TC_NOTE_DETAIL.md`).
- `02` → FR-NOTE-3.1; `03` → FR-NOTE-3.2; `04` → FR-NOTE-3.3; `06` → FR-NOTE-7.1.

---

### 15.3.10. Ghi chú
- Luồng **chỉnh sửa** chi tiết → `FR-NOTE-4_Cap-Nhat-Ghi-Chu.md` (`07`).
