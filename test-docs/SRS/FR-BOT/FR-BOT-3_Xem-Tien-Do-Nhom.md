## 16.3. Chức năng Xem tiến độ nhóm qua chatbot

### 16.3.1. Mô tả chức năng

Người dùng có vai trò **PM** hoặc **Product Owner** trong nhóm mở chatbot và yêu cầu **tổng quan tiến độ toàn nhóm** — hiển thị số công việc, tỷ lệ hoàn thành và các chỉ số liên quan (FR-BOT-3.1 — `03`, `04`, `02`, `08`, `11`). Cùng vai trò có thể xem **tiến độ từng thành viên** — thống kê công việc theo cá nhân (FR-BOT-3.2 — `05`, `06`, `09`, `10`). **Thành viên không phải PM/PO** yêu cầu xem tiến độ nhóm → **không có quyền**, không lộ dữ liệu (FR-BOT-3.3 — `07`). Dữ liệu **khớp thực tế**: ví dụ 3/5 hoàn thành → 60% (`08`); thành viên cụ thể 1/4 → 25% (`09`). Sau khi thành viên hoàn thành thêm việc, PM xem lại → tiến độ nhóm cập nhật (`11`). **UI:** tùy chọn/lệnh xem tiến độ nhóm cho PM (`01`).

---

### 16.3.2. Yêu cầu chức năng

**FR-BOT-3-01:** PM và PO xem tổng quan tiến độ nhóm (FR-BOT-3.1).

**FR-BOT-3-02:** PM và PO xem tiến độ từng thành viên (FR-BOT-3.2).

**FR-BOT-3-03:** Từ chối vai trò không đủ quyền (FR-BOT-3.3).

---

### 16.3.3. Đặc tả Use Case

**Tên Use Case:** Xem tiến độ nhóm và tiến độ thành viên qua chatbot  
**Mã Use Case:** UC-BOT-PROGRESS-01

**Mô tả:**  
PM/PO sử dụng chatbot để tra cứu tiến độ nhóm và chi tiết theo người.

**Tác nhân chính:**  
`pm@test.com`, `po@test.com`; đối chiếu `member@test.com` (không PM/PO).

**Tiền điều kiện:**  
Nhóm có ≥3 thành viên; có công việc với trạng thái đã biết cho các TC số học.

**Kích hoạt:**  
Yêu cầu chatbot “xem tiến độ nhóm” / “xem tiến độ từng thành viên”.

**Hậu điều kiện:**  
Hiển thị đúng quyền và đúng số liệu.

#### a. Luồng chính — PM/PO
1. PM xem tổng quan nhóm (`03`); PO xem tổng quan nhóm (`04`).
2. PM xem từng thành viên (`05`); PO xem từng thành viên (`06`).

#### b. Luồng thay thế

**AF-01:** Luồng dài: tổng quan → chi tiết từng người (`10`).

**AF-02:** Cập nhật tiến độ sau khi member hoàn thành thêm việc (`11`).

#### c. Luồng ngoại lệ

**EF-01:** Member không PM/PO → thông báo không có quyền (`07`).

---

### 16.3.4. Dữ liệu vào
- Vai trò trong nhóm; yêu cầu lệnh chatbot

### 16.3.5. Dữ liệu ra
- Tổng quan tiến độ nhóm; bảng/thống kê theo thành viên; hoặc lỗi quyền

---

### 16.3.6. Quy tắc nghiệp vụ
- Chỉ PM và Product Owner được xem tiến độ nhóm qua chatbot (theo SRS).

---

### 16.3.7. Điều kiện tiền đề và ràng buộc
- Tài khoản `pm@test.com`, `po@test.com`, `member@test.com` và dữ liệu nhóm nhất quán.

---

### 16.3.8. Mức độ ưu tiên
**Mức độ ưu tiên: Trung bình**

---

### 16.3.9. Tiêu chí chấp nhận
- `TC_BOT_PROGRESS_01` đến `TC_BOT_PROGRESS_11` (`TC_BOT_PROGRESS.md`).
- `03`, `04`, `08`, `11` → FR-BOT-3.1; `05`, `06`, `09`, `10` → FR-BOT-3.2; `07` → FR-BOT-3.3.

---

### 16.3.10. Ghi chú
- File test `TC_BOT_PROGRESS.md` ghi **SUMMARY Total = 10** nhưng liệt kê 11 case (`01`–`11`) — khi chạy test nên đồng bộ số đếm.
