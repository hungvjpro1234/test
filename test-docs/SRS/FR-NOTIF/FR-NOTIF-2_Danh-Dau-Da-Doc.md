## 14.2. Chức năng Đánh dấu đã đọc

### 14.2.1. Mô tả chức năng

Người dùng có thể **đánh dấu một** thông báo là đã đọc hoặc **đánh dấu tất cả đã đọc**. Sau mỗi thao tác, trạng thái hiển thị chuyển sang đã đọc và **badge số chưa đọc** giảm đúng (FR-NOTIF-2.1, FR-NOTIF-2.2). Đánh dấu tất cả → toàn bộ thông báo trong phạm vi áp dụng chuyển đã đọc; badge về `0`. Đánh dấu lại tin đã đọc không làm tăng badge (`TC_NOTIF_READ_06`). Sau khi đã đánh dấu tất cả, thông báo **mới** từ sự kiện sau đó làm badge **tăng lại** đúng (`TC_NOTIF_READ_09`). Chỉ thông báo của chính người dùng được quản lý — không có luồng “đánh dấu đọc thông báo người khác” (theo checklist đặt ra trong test).

---

### 14.2.2. Yêu cầu chức năng

**FR-NOTIF-2-01:** Tùy chọn đánh dấu đã đọc trên từng thông báo chưa đọc (FR-NOTIF-2.1).

**FR-NOTIF-2-02:** Nút “Đánh dấu tất cả đã đọc” khi còn chưa đọc (FR-NOTIF-2.2).

**FR-NOTIF-2-03:** Badge giảm đúng từng bước hoặc về 0 một lần.

**FR-NOTIF-2-04:** Thông báo mới sau “tất cả đã đọc” làm badge tăng lại.

---

### 14.2.3. Đặc tả Use Case

**Tên Use Case:** Đánh dấu một hoặc tất cả thông báo đã đọc  
**Mã Use Case:** UC-NOTIF-READ-01

**Mô tả:**  
Người dùng cập nhật trạng thái đọc để đồng bộ badge và danh sách.

**Tác nhân chính:**  
`user@test.com`

**Tiền điều kiện:**  
Có ít nhất 3 thông báo chưa đọc.

**Kích hoạt:**  
Nhấn đánh dấu đọc trên một mục hoặn “Đánh dấu tất cả đã đọc”.

**Hậu điều kiện:**  
Trạng thái và badge cập nhật đúng.

#### a. Luồng chính — Một thông báo
1. Badge = N; đánh dấu đọc một tin → badge N−1; tin chuyển kiểu đã đọc.

#### b. Luồng thay thế — Tất cả
1. Badge = 3; “Đánh dấu tất cả đã đọc” → badge 0; mọi tin đã đọc.

#### c. Luồng thay thế — Chuỗi từng tin đến hết

Theo `TC_NOTIF_READ_07`.

---

### 14.2.4. Dữ liệu vào
- Lựa chọn thông báo hoặc “tất cả”

### 14.2.5. Dữ liệu ra
- Trạng thái đã đọc; badge cập nhật

---

### 14.2.6. Quy tắc nghiệp vụ
- Chỉ làm việc trên thông báo của user đang phiên.

---

### 14.2.7. Điều kiện tiền đề và ràng buộc
- Cần đủ thông báo chưa đọc để kiểm tra badge.

---

### 14.2.8. Mức độ ưu tiên
**Mức độ ưu tiên: Cao**

---

### 14.2.9. Tiêu chí chấp nhận
- `TC_NOTIF_READ_01` đến `TC_NOTIF_READ_09` (`TC_NOTIF_READ.md`).
- `TC_NOTIF_READ_03` → FR-NOTIF-2.1; `04` → FR-NOTIF-2.2.

---

### 14.2.10. Ghi chú
- Checklist “Không thể đánh dấu đọc thông báo của người dùng khác” — đảm bảo qua phân quyền backend/API.
