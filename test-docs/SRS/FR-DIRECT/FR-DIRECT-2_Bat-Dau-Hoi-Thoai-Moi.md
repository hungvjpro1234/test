## 13.2. Chức năng Bắt đầu hội thoại mới / mở lại hội thoại

### 13.2.1. Mô tả chức năng

Chức năng Bắt đầu hội thoại cho phép người dùng tạo **cuộc trò chuyện 1-1 mới** hoặc **mở lại** cuộc đã có với cùng một đối phương (FR-DIRECT-2.1). Người dùng nhấn nút tạo mới / tìm người; hệ thống hiển thị ô tìm kiếm hoặc modal; tìm người **tồn tại** và chọn → mở khung chat (tạo thread mới nếu chưa có, hoặc attach vào thread cũ nếu đã có — không tạo trùng). Tìm email **không tồn tại** → thông báo không tìm thấy người dùng (FR-DIRECT-2.2). Tìm kiếm rỗng không trả kết quả hoặc nhắc nhập từ khóa. **Không** cho phép bắt đầu hội thoại với **chính mình**. Hội thoại mới xuất hiện trong danh sách; có thể gửi tin đầu tiên ngay (`TC_DIRECT_START_09`).

---

### 13.2.2. Yêu cầu chức năng

**FR-DIRECT-2-01:** UI có nút "Tạo hội thoại mới" / tìm người (`TC_DIRECT_START_01`–`02`).

**FR-DIRECT-2-02:** Tìm và chọn người chưa có hội thoại → tạo và mở chat; hai bên thấy trong danh sách (FR-DIRECT-2.1).

**FR-DIRECT-2-03:** Tìm người đã có hội thoại → mở lại thread cũ, không nhân đôi (FR-DIRECT-2.1).

**FR-DIRECT-2-04:** Email không tồn tại → "Không tìm thấy người dùng"; không tạo hội thoại (FR-DIRECT-2.2).

**FR-DIRECT-2-05:** Chuỗi tìm rỗng → không kết quả hoặc yêu cầu nhập.

**FR-DIRECT-2-06:** Không cho chat với chính mình.

**FR-DIRECT-2-07:** Sau tạo mới, hội thoại có trong danh sách (`TC_DIRECT_START_08`).

---

### 13.2.3. Đặc tả Use Case

**Tên Use Case:** Bắt đầu hoặc mở lại hội thoại 1-1  
**Mã Use Case:** UC-DIRECT-START-01

**Mô tả:**  
Người dùng tìm đối phương và xác nhận để vào khung chat.

**Tác nhân chính:**  
`user1@test.com`

**Tiền điều kiện:**  
`user2@test.com`, `user3@test.com` tồn tại; `user1` chưa có chat với `user3` (cho case tạo mới); đã có chat với `user2` (cho case mở lại).

**Kích hoạt:**  
Nhấn tạo hội thoại mới và chọn/tìm người.

**Hậu điều kiện:**  
Khung hội thoại mở; hoặc thông báo lỗi.

#### a. Luồng chính — Tạo mới
1. Tạo mới → tìm `user3@test.com` → xác nhận.
2. Hội thoại mở; xuất hiện trong danh sách hai phía.

#### b. Luồng thay thế — Mở lại
1. Tìm `user2@test.com` đã có chat → mở thread cũ, không tạo trùng.

#### c. Luồng ngoại lệ

**EF-01:** `nguoidungkhongtontai@xyz.com` → không tìm thấy.

**EF-02:** Tìm `user1@test.com` (chính mình) → không cho chọn.

---

### 13.2.4. Dữ liệu vào
- Từ khóa tìm kiếm (email/tên)
- Lựa chọn người dùng đích

### 13.2.5. Dữ liệu ra
- Khung hội thoại hoặc thông báo lỗi

---

### 13.2.6. Quy tắc nghiệp vụ
- Một cặp người dùng → một luồng hội thoại 1-1 (không duplicate thread).

---

### 13.2.7. Điều kiện tiền đề và ràng buộc
- Tài khoản đích phải tồn tại trong hệ thống để tạo chat thành công.

---

### 13.2.8. Mức độ ưu tiên
**Mức độ ưu tiên: Cao**

---

### 13.2.9. Tiêu chí chấp nhận
- `TC_DIRECT_START_01` đến `TC_DIRECT_START_09` (`TC_DIRECT_START.md`).

---

### 13.2.10. Ghi chú
- `TC_DIRECT_START_06`–`07` → **FR-DIRECT-2.1**; `TC_DIRECT_START_03` → **FR-DIRECT-2.2**.
