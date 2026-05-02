## 14.7. Chức năng Thông báo thời gian thực

### 14.7.1. Mô tả chức năng

Người dùng **đang online** nhận thông báo **ngay** khi sự kiện xảy ra, **không cần tải lại trang** (FR-NOTIF-7.1). **Badge** số chưa đọc **tăng/giảm tự động** khi có tin mới hoặc khi đánh dấu đọc. Hoạt động khi **bảng thông báo đóng** (chỉ badge) hoặc **đang mở** (tin mới xuất hiện đầu danh sách). Nhiều sự kiện liên tiếp → badge và danh sách cập nhật đúng từng bước (`TC_NOTIF_REALTIME_04`). **Đa loại** sự kiện (công việc, hệ thống, mention) đều đẩy realtime (`05`). **Đánh dấu đọc** làm badge giảm ngay (`06`). Sau **phiên dài** (ví dụ >30 phút không tương tác), kênh realtime vẫn nhận tin (`07`).

---

### 14.7.2. Yêu cầu chức năng

**FR-NOTIF-7-01:** Push tin mới và cập nhật badge không reload (FR-NOTIF-7.1).

**FR-NOTIF-7-02:** Đồng bộ khi bảng mở/đóng.

**FR-NOTIF-7-03:** Badge phản ánh đọc/chưa đọc realtime.

---

### 14.7.3. Đặc tả Use Case

**Tên Use Case:** Nhận và phản hồi thông báo thời gian thực  
**Mã Use Case:** UC-NOTIF-RT-01

**Mô tả:**  
Hai phiên trình duyệt: A (`user@test.com`), B (`admin@test.com` hoặc tác nhân gây sự kiện); quan sát cập nhật không refresh.

**Tác nhân chính:**  
`user@test.com`

**Tiền điều kiện:**  
Cả hai phiên đăng nhập; user thuộc nhóm/có quan hệ để nhận tin test.

**Kích hoạt:**  
Hành động trên B (giao việc, đổi vai trò, gửi thông báo hệ thống, mention, ...).

**Hậu điều kiện:**  
A thấy badge/danh sách cập nhật ngay.

#### a. Luồng chính
1. Bảng đóng: giao việc → badge 0→1 ngay (`01`).
2. Bảng mở: giao thêm việc → tin mới đầu list (`02`).

#### b. Luồng thay thế

**AF-01:** Badge tăng chuỗi với nhiều hành động (`03`, `04`).

**AF-02:** Đánh dấu đọc → badge giảm ngay (`06`).

**AF-03:** Idle lâu vẫn nhận tin (`07`).

---

### 14.7.4. Dữ liệu vào
- Sự kiện realtime từ server/WebSocket (theo kiến trúc)

### 14.7.5. Dữ liệu ra
- Cập nhật UI badge và panel

---

### 14.7.6. Quy tắc nghiệp vụ
- Chỉ user đích thấy tin của mình.

---

### 14.7.7. Điều kiện tiền đề và ràng buộc
- Hai trình duyệt hoặc hai profile để tái hiện TC.

---

### 14.7.8. Mức độ ưu tiên
**Mức độ ưu tiên: Cao**

---

### 14.7.9. Tiêu chí chấp nhận
- `TC_NOTIF_REALTIME_01` đến `TC_NOTIF_REALTIME_07` (`TC_NOTIF_REALTIME.md`).

---

### 14.7.10. Ghi chú
- **FR-NOTIF-7.1** bao trùm toàn bộ file test realtime.
