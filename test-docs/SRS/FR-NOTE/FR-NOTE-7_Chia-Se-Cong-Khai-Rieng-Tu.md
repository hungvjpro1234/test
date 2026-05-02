## 15.7. Chức năng Chia sẻ ghi chú (công khai / riêng tư)

### 15.7.1. Mô tả chức năng

Trên **chi tiết ghi chú**, chủ sở hữu chọn chế độ **Công khai** hoặc **Riêng tư** và lưu (FR-NOTE-7.1, FR-NOTE-7.2). **Công khai:** người dùng đăng nhập khác truy cập `/notes/{id}` xem được đầy đủ (`TC_NOTE_SHARE_03`, `04`; đồng bộ `TC_NOTE_DETAIL_06`). **Riêng tư:** người khác không xem được — thông báo không có quyền (`05`, `06`). **Chủ sở hữu** luôn xem được dù trạng thái nào (`07`). **Ghi chú mới** mặc định **Riêng tư** (`02`; đồng bộ tạo ghi chú `FR-NOTE-1`). **C-1:** Người **chưa đăng nhập** không xem được nội dung kể cả khi ghi chú công khai — chuyển login (`08`). **Luồng chuyển công khai → riêng tư** khi người khác đang có quyền xem: sau đổi + reload/truy cập lại, user kia bị chặn (`09`). **Persist** trạng thái chia sẻ sau F5 (`10`).

---

### 15.7.2. Yêu cầu chức năng

**FR-NOTE-7-01:** Đặt ghi chú công khai; user khác (đã đăng nhập) xem qua ID (FR-NOTE-7.1).

**FR-NOTE-7-02:** Đặt riêng tư; chặn người khác (FR-NOTE-7.2).

**FR-NOTE-7-03:** Tuân thủ C-1, C-5, NFR-SEC-2/3.

---

### 15.7.3. Đặc tả Use Case

**Tên Use Case:** Cấu hình chia sẻ ghi chú  
**Mã Use Case:** UC-NOTE-SHARE-01

**Mô tả:**  
Chủ sở hữu thay đổi visibility và hệ thống áp dụng quy tắc truy cập.

**Tác nhân chính:**  
`user@test.com` (chủ); `user2@test.com` (người xem thử)

**Tiền điều kiện:**  
Có ghi chú `id=50` (hoặc ID test doc).

**Kích hoạt:**  
Đổi radio/toggle Công khai | Riêng tư → Lưu.

**Hậu điều kiện:**  
Quyền xem theo URL khớp cài đặt.

#### a. Luồng chính — Công khai
1. Đổi sang Công khai → `user2` mở URL → thấy nội dung (`03`, `04`).

#### b. Luồng thay thế — Riêng tư
1. Đổi sang Riêng tư → `user2` bị chặn (`05`, `06`).

#### c. Luồng ngoại lệ

**EF-01:** Anonymous vào URL công khai → login (`08`).

---

### 15.7.4. Dữ liệu vào
- `visibility`: public | private

### 15.7.5. Dữ liệu ra
- Quyền GET `/notes/{id}` theo vai trò

---

### 15.7.6. Quy tắc nghiệp vụ
- Chỉ chủ sở hữu đổi được visibility.

---

### 15.7.7. Điều kiện tiền đề và ràng buộc
- Hai tài khoản + thử anonymous.

---

### 15.7.8. Mức độ ưu tiên
**Mức độ ưu tiên: Cao**

---

### 15.7.9. Tiêu chí chấp nhận
- `TC_NOTE_SHARE_01` đến `TC_NOTE_SHARE_10` (`TC_NOTE_SHARE.md`).
- `03`, `04`, `10` → FR-NOTE-7.1; `05`, `06`, `02` → FR-NOTE-7.2.

---

### 15.7.10. Ghi chú
- **FR-NOTE-3.3** và **FR-NOTE-7.2** cùng bảo vệ riêng tư — kiểm thử kết hợp với `FR-NOTE-3`.
