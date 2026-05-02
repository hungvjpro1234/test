## 12.5. Chức năng Chia sẻ file trong chat nhóm

### 12.5.1. Mô tả chức năng

Chức năng Chia sẻ file cho phép thành viên nhóm đính kèm file hoặc ảnh vào tin nhắn trong khung chat nhóm. Sau khi gửi, tin hiển thị **tên file**, **kích thước**, liên kết **tải xuống** hoặc xem; ảnh có thể hiển thị **thumbnail/preview** trong luồng chat. Có thể gửi **chỉ file không kèm text** hoặc **file kèm text** trong cùng một tin (FR-CHAT-5.1). Thành viên khác trong nhóm có thể tải file đã chia sẻ; **outsider** không tải được qua URL trực tiếp. File mới gửi hiển thị ngay cho thành viên đang online (đồng bộ với FR-CHAT-6). Gửi nhiều file/tin liên tiếp → lịch sử giữ đúng thứ tự.

---

### 12.5.2. Yêu cầu chức năng

**FR-CHAT-5-01:** Nút/icon đính kèm file hiển thị trong khu vực nhập chat.

**FR-CHAT-5-02:** Gửi file thành công → hiển thị trong khung chat với link tải/xem (FR-CHAT-5.1).

**FR-CHAT-5-03:** PDF/tài liệu: tên, kích thước, liên kết tải.

**FR-CHAT-5-04:** Ảnh: thumbnail/preview; có thể mở xem full size.

**FR-CHAT-5-05:** Gửi chỉ file không text → được phép (`TC_CHAT_FILE_04`).

**FR-CHAT-5-06:** Gửi file kèm text → cả hai hiển thị trong cùng tin.

**FR-CHAT-5-07:** `member2@test.com` tải được file `shared.pdf`.

**FR-CHAT-5-08:** `outsider@test.com` truy cập URL file → từ chối.

**FR-CHAT-5-09:** Realtime: `member2` thấy file ngay khi `member` gửi.

**FR-CHAT-5-10:** Nhiều file + tin text → thứ tự lịch sử đúng.

---

### 12.5.3. Đặc tả Use Case

**Tên Use Case:** Gửi file hoặc ảnh trong chat nhóm  
**Mã Use Case:** UC-CHAT-FILE-01

**Mô tả:**  
Thành viên đính kèm file hoặc ảnh vào tin nhắn chat nhóm để chia sẻ với nhóm.

**Tác nhân chính:**  
`member@test.com`, `member2@test.com`

**Tiền điều kiện:**  
File test: PNG, PDF, TXT trên máy; `Group Chat Test`; `outsider@test.com` không thuộc nhóm.

**Kích hoạt:**  
Người dùng chọn đính kèm file và xác nhận gửi.

**Hậu điều kiện:**  
File hiển thị trong luồng chat và có thể tải bởi thành viên hợp lệ.

#### a. Luồng chính
1. Nhấn đính kèm → chọn `document.pdf` → Gửi.
2. Tin hiển thị link/preview trong chat.

#### b. Luồng thay thế

**AF-01:** Chỉ `test.txt`, không nhập text → gửi thành công.

**AF-02:** `test.pdf` + `"Đây là tài liệu quan trọng"` → hiển thị đủ.

---

### 12.5.4. Dữ liệu vào
- File đính kèm (và tùy chọn nội dung text)

### 12.5.5. Dữ liệu ra
- Tin nhắn chứa metadata file, link tải hoặc preview ảnh

---

### 12.5.6. Quy tắc nghiệp vụ
- Chỉ thành viên nhóm gửi và tải file trong ngữ cảnh chat nhóm; outsider không truy cập URL file.

---

### 12.5.7. Điều kiện tiền đề và ràng buộc
- File test cục bộ sẵn có (PNG, PDF, TXT).

---

### 12.5.8. Mức độ ưu tiên
**Mức độ ưu tiên: Cao**

**Lý do:**  
Chia sẻ tài liệu trong chat là nhu cầu phối hợp nhóm phổ biến.

---

### 12.5.9. Tiêu chí chấp nhận
- UI đính kèm; hiển thị PDF/ảnh (`01`–`03`).
- Chỉ file; file + text (`04`–`05`).
- Gửi thành công; member2 tải được; outsider chặn; realtime (`06`–`09`).
- Luồng đầy đủ và nhiều file (`10`–`11`).

---

### 12.5.10. Ghi chú
- Test case: `TC_CHAT_FILE_01` đến `TC_CHAT_FILE_11` (file `TC_CHAT_FILE.md`).
- `TC_CHAT_FILE_06` → FR-CHAT-5.1.
