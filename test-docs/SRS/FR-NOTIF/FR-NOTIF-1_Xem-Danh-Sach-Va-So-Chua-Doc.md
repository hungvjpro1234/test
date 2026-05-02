## 14.1. Chức năng Xem danh sách thông báo và số chưa đọc

### 14.1.1. Mô tả chức năng

Người dùng mở **bảng thông báo** từ icon trên thanh điều hướng và xem danh sách thông báo thuộc tài khoản của mình (FR-NOTIF-1.1). Hệ thống hiển thị tiêu đề/nội dung tóm tắt và thời gian nhận; phân biệt trực quan **đã đọc** và **chưa đọc**. Có thể **lọc** theo danh mục (nhóm, công việc, chat — được kiểm chứng trong test; SRS còn nêu cuộc họp, hệ thống) và theo trạng thái (ví dụ chưa đọc). **Badge** trên icon hiển thị **số thông báo chưa đọc**; khi không còn chưa đọc thì badge ẩn hoặc `0` (FR-NOTIF-1.2). Khi đánh dấu đọc một tin, badge giảm tương ứng (`TC_NOTIF_VIEW_11`). Không có thông báo → empty state, không lỗi. Chưa đăng nhập không xem được (NFR-SEC-2).

---

### 14.1.2. Yêu cầu chức năng

**FR-NOTIF-1-01:** Icon thông báo trên thanh điều hướng; mở bảng danh sách.

**FR-NOTIF-1-02:** Danh sách đủ thông tin mỗi mục; lọc danh mục và trạng thái (FR-NOTIF-1.1).

**FR-NOTIF-1-03:** Badge số chưa đọc trên icon; về 0 khi hết chưa đọc (FR-NOTIF-1.2).

**FR-NOTIF-1-04:** Phân biệt UI đã đọc / chưa đọc.

**FR-NOTIF-1-05:** Tài khoản không có thông báo → empty state.

---

### 14.1.3. Đặc tả Use Case

**Tên Use Case:** Xem danh sách thông báo và số đếm chưa đọc  
**Mã Use Case:** UC-NOTIF-VIEW-01

**Mô tả:**  
Người dùng mở bảng thông báo và lọc/xem các mục; quan sát badge trên icon.

**Tác nhân chính:**  
Người dùng (`user@test.com`)

**Tiền điều kiện:**  
Đã đăng nhập; có ≥5 thông báo thuộc nhiều danh mục (test); có cả đã đọc và chưa đọc.

**Kích hoạt:**  
Nhấn icon thông báo; chọn bộ lọc.

**Hậu điều kiện:**  
Danh sách và badge phản ánh đúng trạng thái.

#### a. Luồng chính
1. Mở bảng → thấy danh sách với tiêu đề/nội dung ngắn và thời gian.

#### b. Luồng thay thế

**AF-01:** Lọc "Công việc" / "Nhóm" / "Chat"; lọc "Chưa đọc".

**AF-02:** Đọc 1 tin → badge `3` → `2`.

#### c. Luồng ngoại lệ

**EF-01:** Chưa đăng nhập → redirect đăng nhập.

---

### 14.1.4. Dữ liệu vào
- Bộ lọc danh mục/trạng thái

### 14.1.5. Dữ liệu ra
- Danh sách thông báo; badge đếm

---

### 14.1.6. Quy tắc nghiệp vụ
- Chỉ hiển thị thông báo của chính người dùng đăng nhập.

---

### 14.1.7. Điều kiện tiền đề và ràng buộc
- Chuẩn bị dữ liệu đủ loại danh mục cho test lọc.

---

### 14.1.8. Mức độ ưu tiên
**Mức độ ưu tiên: Cao**

---

### 14.1.9. Tiêu chí chấp nhận
- `TC_NOTIF_VIEW_01` đến `TC_NOTIF_VIEW_12` (`TC_NOTIF_VIEW.md`).
- `TC_NOTIF_VIEW_06` → FR-NOTIF-1.1; `02`, `11` → FR-NOTIF-1.2.

---

### 14.1.10. Ghi chú
- SRS FR-NOTIF-1.1 còn nêu lọc **cuộc họp**, **hệ thống** — bổ sung kiểm thử nếu có dữ liệu sự kiện tương ứng.
