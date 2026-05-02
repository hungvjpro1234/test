## 12.2. Chức năng Xem lịch sử tin nhắn nhóm

### 12.2.1. Mô tả chức năng

Chức năng Xem lịch sử tin nhắn cho phép thành viên nhóm mở khung chat và xem các tin nhắn đã gửi theo **thứ tự thời gian** (cũ phía trên, mới nhất ở cuối). Mặc định hệ thống tải **50 tin nhắn gần nhất** mỗi “trang” / lần tải (FR-CHAT-2.1, NFR-PERF-2). Khi nhóm có nhiều hơn 50 tin (ví dụ 60), người dùng **cuộn lên đầu** danh sách để **tải thêm** tin cũ hơn (FR-CHAT-2.2); sau khi tải đủ, không còn request tải thêm và có thể hiển thị thông báo đã hết tin. Mỗi tin hiển thị tên/avatar người gửi, nội dung và timestamp. Tin đã xóa không còn trong lịch sử; tin đã sửa hiển thị nội dung mới kèm nhãn đã chỉnh sửa. Outsider không xem được lịch sử.

---

### 12.2.2. Yêu cầu chức năng

**FR-CHAT-2-01:** Hiển thị lịch sử theo thời gian; tin mới nhất ở cuối danh sách.

**FR-CHAT-2-02:** Trang đầu: 50 tin gần nhất (FR-CHAT-2.1 / NFR-PERF-2).

**FR-CHAT-2-03:** Cuộn lên đầu → tải thêm tin cũ; thứ tự liên tục đúng; không duplicate (FR-CHAT-2.2).

**FR-CHAT-2-04:** Khi đã tải hết tin trong nhóm → không gửi request tải thêm vô hạn; có chỉ báo “đã hiển thị tất cả” hoặc tương đương.

**FR-CHAT-2-05:** Outsider truy cập URL chat → từ chối; không thấy tin.

**FR-CHAT-2-06:** Tin đã xóa không xuất hiện (kể cả placeholder).

**FR-CHAT-2-07:** Tin đã sửa: nội dung mới + nhãn đã chỉnh sửa cho viewer khác (`member2@test.com`).

**FR-CHAT-2-08:** Giao diện danh sách và ô nhập responsive.

---

### 12.2.3. Đặc tả Use Case

**Tên Use Case:** Xem và tải thêm lịch sử chat nhóm  
**Mã Use Case:** UC-CHAT-HISTORY-01

**Mô tả:**  
Thành viên nhóm mở khung chat và xem tin nhắn theo trang; có thể cuộn để tải tin cũ hơn.

**Tác nhân chính:**  
Thành viên nhóm (`member@test.com`)

**Tiền điều kiện:**  
`Group Chat Test` có ≥ 60 tin nhắn (cho test phân trang); `outsider@test.com` không thuộc nhóm.

**Kích hoạt:**  
Người dùng mở khung chat nhóm hoặc cuộn lên đầu danh sách để tải thêm.

**Hậu điều kiện:**  
Lịch sử tin nhắn hiển thị đúng phạm vi đã tải và quyền truy cập.

#### a. Luồng chính (Basic Flow)
1. Mở chat nhóm → thấy 50 tin gần nhất; thứ tự thời gian đúng.
2. Mỗi tin có tên người gửi, nội dung, timestamp.

#### b. Luồng thay thế (Alternative Flow)

**AF-01: Cuộn lên tải thêm**  
Còn 10 tin cũ → tải thêm → tổng 60 tin, thứ tự đúng, scroll mượt.

**AF-02: Đã hết tin**  
Đã có đủ 60/60 → cuộn lên không còn loading vô hạn.

#### c. Luồng ngoại lệ (Exception Flow)

**EF-01:** Outsider — không xem được lịch sử (`TC_CHAT_HISTORY_07`).

---

### 12.2.4. Dữ liệu vào
- Xác thực người dùng và quyền thành viên nhóm
- Thao tác cuộn / yêu cầu trang tin cũ hơn

### 12.2.5. Dữ liệu ra
- Danh sách tin nhắn (tối đa 50 mỗi lần tải đầu; thêm khi lazy-load)
- Thông báo khi đã hết tin hoặc lỗi quyền

---

### 12.2.6. Quy tắc nghiệp vụ
- Phân trang / tải thêm phục vụ hiệu năng (NFR-PERF-2: 50 tin/trang).
- Tin đã xóa không hiển thị; tin đã sửa phải phản ánh nội dung và trạng thái chỉnh sửa.

---

### 12.2.7. Điều kiện tiền đề và ràng buộc
- Cần dataset ≥ 60 tin để kiểm tra đầy đủ `TC_CHAT_HISTORY_04`–`06`, `10`.

---

### 12.2.8. Mức độ ưu tiên
**Mức độ ưu tiên: Cao**

**Lý do:**  
Không đọc được lịch sử thì chat nhóm không dùng được cho trao đổi lâu dài.

---

### 12.2.9. Tiêu chí chấp nhận
- Thứ tự thời gian; đủ metadata mỗi tin (`01`–`03`).
- 50 tin đầu; cuộn lên tải thêm 10 tin; hết tin không load vô hạn (`04`–`06`).
- Outsider chặn (`07`); tin xóa không còn (`08`); tin sửa có nhãn (`09`).
- Luồng đầy đủ mở → cuộn → tải (`10`).

---

### 12.2.10. Ghi chú
- Test case: `TC_CHAT_HISTORY_01` đến `TC_CHAT_HISTORY_10` (file `TC_CHAT_HISTORY.md`).
- `TC_CHAT_HISTORY_04` → FR-CHAT-2.1; `TC_CHAT_HISTORY_05` → FR-CHAT-2.2.
