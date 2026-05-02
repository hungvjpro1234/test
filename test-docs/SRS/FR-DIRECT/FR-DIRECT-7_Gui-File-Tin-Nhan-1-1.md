## 13.7. Chức năng Gửi file trong tin nhắn 1-1

### 13.7.1. Mô tả chức năng

Chức năng Gửi file trong tin nhắn 1-1 cho phép người tham gia hội thoại **đính kèm file hoặc ảnh** và gửi trong khung chat (FR-DIRECT-7.1). Tin hiển thị **tên file**, **kích thước**, liên kết **tải/xem**; ảnh có thể hiển thị **thumbnail/preview**. Cho phép gửi **chỉ file không text** hoặc **file kèm text** trong cùng một tin. **user2** (người nhận) có thể **tải** file; hiển thị **realtime** khi online (`TC_DIRECT_FILE_09`). **Outsider** truy cập URL file trực tiếp → **từ chối** — liên kết với FR-DIRECT-3.3 (`TC_DIRECT_FILE_06`). Gửi nhiều file/tin liên tiếp → lịch sử đúng thứ tự (`11`).

---

### 13.7.2. Yêu cầu chức năng

**FR-DIRECT-7-01:** Nút đính kèm trong ô nhập hội thoại (`TC_DIRECT_FILE_01`).

**FR-DIRECT-7-02:** Gửi PDF → tên, kích thước, link (`02`).

**FR-DIRECT-7-03:** Ảnh PNG → preview/thumbnail (`03`).

**FR-DIRECT-7-04:** Chỉ file không text (`04`); file + text (`05`).

**FR-DIRECT-7-05:** Outsider không tải được URL (`06` / FR-DIRECT-3.3).

**FR-DIRECT-7-06:** Gửi thành công hiển thị trong chat (`07` — FR-DIRECT-7.1).

**FR-DIRECT-7-07:** Người nhận tải được (`08`).

**FR-DIRECT-7-08:** Realtime hiển thị cho nhận (`09`).

---

### 13.7.3. Đặc tả Use Case

**Tên Use Case:** Gửi file hoặc ảnh trong hội thoại 1-1  
**Mã Use Case:** UC-DIRECT-FILE-01

**Mô tả:**  
Người dùng chọn file từ máy và gửi kèm hoặc không kèm chữ trong DM.

**Tác nhân chính:**  
`user1@test.com`, `user2@test.com`

**Tiền điều kiện:**  
Hội thoại tồn tại; file test PNG, PDF, TXT trên máy; `outsider@test.com` không trong hội thoại.

**Kích hoạt:**  
Đính kèm và Gửi.

**Hậu điều kiện:**  
File hiển thị trong luồng và có thể tải bởi đối phương hợp lệ.

#### a. Luồng chính
1. Đính kèm `test.pdf` → Gửi → hiển thị trong chat.

#### b. Luồng thay thế
**AF:** `user2` tải `shared.pdf`; realtime `update.docx`.

#### c. Luồng ngoại lệ
**EF:** Outsider không tải URL.

---

### 13.7.4. Dữ liệu vào
- File binary; tùy chọn text

### 13.7.5. Dữ liệu ra
- Tin có attachment và metadata

---

### 13.7.6. Quy tắc nghiệp vụ
- Chỉ thành viên hội thoại truy cập nội dung file đính kèm.

---

### 13.7.7. Điều kiện tiền đề và ràng buộc
- File cục bộ sẵn sàng để test.

---

### 13.7.8. Mức độ ưu tiên
**Mức độ ưu tiên: Cao**

---

### 13.7.9. Tiêu chí chấp nhận
- `TC_DIRECT_FILE_01` đến `TC_DIRECT_FILE_11` (`TC_DIRECT_FILE.md`).

---

### 13.7.10. Ghi chú
- `TC_DIRECT_FILE_07` map **FR-DIRECT-7.1**; `06` nhắc **FR-DIRECT-3.3**.
