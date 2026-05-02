## 11.1. Chức năng Bắt đầu tính giờ

### 11.1.1. Mô tả chức năng

Chức năng Bắt đầu tính giờ cho phép thành viên nhóm khởi động **bộ đếm giờ riêng** cho chính người đó trên một công việc cụ thể. Sau khi nhấn "Bắt đầu", bộ đếm hiển thị (thường định dạng `HH:MM:SS`) và tăng theo thời gian thực; trạng thái chuyển sang đang tính giờ và nút điều khiển chuyển tương ứng (ví dụ hiển thị "Dừng" thay cho "Bắt đầu"). Một người dùng **không** được mở hai timer đồng thời trên cùng một task — khi đã chạy, không tạo thêm timer thứ hai cho cùng user. **Nhiều người khác nhau** có thể cùng bấm tính giờ trên một task; mỗi người có bộ đếm độc lập (lệch thời gian bắt đầu phản ánh đúng khi quan sát song song). Người không thuộc nhóm không truy cập được chi tiết task để bắt đầu timer. Bộ đếm có thể tiếp tục sau khi điều hướng sang trang khác rồi quay lại — không reset về 0 chỉ vì chuyển trang.

---

### 11.1.2. Yêu cầu chức năng

**FR-TIME-1-01:** Hệ thống phải hiển thị nút "Bắt đầu" (hoặc biểu tượng play ▶) trong khu vực theo dõi thời gian của chi tiết công việc.

**FR-TIME-1-02:** Khi nhấn "Bắt đầu" và chưa có timer đang chạy cho user đó trên task đó, hệ thống phải khởi động bộ đếm giờ bắt đầu từ `00:00:00` và tăng dần (FR-TIME-1.1).

**FR-TIME-1-03:** Trạng thái sau khi bắt đầu phải phản ánh đang tính giờ (ví dụ nhãn "Đang tính giờ"); nút "Bắt đầu" chuyển thành nút "Dừng" (hoặc tương đương).

**FR-TIME-1-04:** Khi timer của user đã chạy trên task, người dùng **không** thể bắt đầu thêm một timer thứ hai: nút "Bắt đầu" ẩn hoặc vô hiệu hóa.

**FR-TIME-1-05:** Hai người dùng khác nhau (`member@test.com`, `member2@test.com`) có thể cùng bấm "Bắt đầu" trên cùng một task; mỗi người có bộ đếm riêng, độc lập (FR-TIME-1.2).

**FR-TIME-1-06:** Khi một người bắt đầu trước người kia (ví dụ ~30 giây), giá trị hiển thị trên hai phiên phản ánh chênh lệch thời gian gần đúng — các bộ đếm không đồng bộ cưỡng ép về một giá trị chung.

**FR-TIME-1-07:** `outsider@test.com` không thuộc nhóm — truy cập URL chi tiết task bị từ chối; không thấy nút "Bắt đầu" hoặc nội dung task.

**FR-TIME-1-08:** Giao diện khu vực timer phải responsive khi timer đang chạy.

**FR-TIME-1-09:** Sau khi điều hướng rời khỏi chi tiết task rồi quay lại, bộ đếm của user tiếp tục tăng so với giá trị trước khi rời — không reset không lý do.

---

### 11.1.3. Đặc tả Use Case

**Tên Use Case:** Bắt đầu tính giờ trên công việc  
**Mã Use Case:** UC-TIME-START-01

**Mô tả:**  
Thành viên nhóm nhấn "Bắt đầu" để khởi động bộ đếm giờ cá nhân trên task.

**Tác nhân chính:**  
Thành viên nhóm (`member@test.com`, `member2@test.com`)

**Tiền điều kiện:**
- `member@test.com`, `member2@test.com` là thành viên nhóm chứa `Task Timer Test`.
- `outsider@test.com` không thuộc nhóm.

**Kích hoạt:**  
Người dùng nhấn nút "Bắt đầu" trong chi tiết `Task Timer Test`.

**Hậu điều kiện:**  
Timer của user đó đang chạy trên task; hoặc thao tụ bị từ chối (đã chạy / không có quyền).

#### a. Luồng chính (Basic Flow)
1. `member@test.com` đăng nhập; chưa có timer đang chạy của user này trên `Task Timer Test`.
2. Mở chi tiết `Task Timer Test`.
3. Nhấn "Bắt đầu".
4. Bộ đếm khởi động từ `00:00:00`, định dạng `HH:MM:SS`, tăng theo thời gian thực.
5. Trạng thái hiển thị đang tính giờ; nút chuyển sang "Dừng".

#### b. Luồng thay thế (Alternative Flow)

**AF-01: Hai người cùng task — FR-TIME-1.2**
1. `member@test.com` đã bắt đầu timer.
2. Đăng nhập `member2@test.com`, mở cùng `Task Timer Test`, nhấn "Bắt đầu".
3. `member2@test.com` có bộ đếm riêng; hai bộ đếm độc lập.

**AF-02: So sánh độc lập (~30 giây lệch)**  
Bộ đếm của người bắt đầu trước lớn hơn người sau khoảng tương ứng khi quan sát cùng lúc.

**AF-03: Điều hướng và quay lại**  
Ghi nhận giá trị đếm → chuyển trang khác → quay lại chi tiết task → đếm tiếp tục tăng, không reset về 0.

#### c. Luồng ngoại lệ (Exception Flow)

**EF-01: Đã có timer đang chạy cho cùng user**  
Nhấn lại "Bắt đầu" → nút không hoạt động hoặc không tạo timer thứ hai.

**EF-02: Outsider**  
Truy cập URL task → từ chối; không có nút "Bắt đầu".

---

### 11.1.4. Dữ liệu vào
- Xác nhận bắt đầu tính giờ trên task cụ thể

### 11.1.5. Dữ liệu ra
- Trạng thái timer đang chạy và giá trị đếm hiển thị
- Cập nhật UI nút Bắt đầu / Dừng

---

### 11.1.6. Quy tắc nghiệp vụ
- Một user — một timer chạy tại một thời điểm trên một task (theo test).
- Nhiều user — nhiều bộ đếm độc lập trên cùng task (FR-TIME-1.2).
- Quyền truy cập task theo thành viên nhóm (C-4).

---

### 11.1.7. Điều kiện tiền đề và ràng buộc
- Task `Task Timer Test` thuộc nhóm mà các tài khoản test là thành viên.

---

### 11.1.8. Mức độ ưu tiên
**Mức độ ưu tiên: Cao**

**Lý do:**  
Không bắt đầu được timer thì không ghi nhận được thời gian làm việc trên công việc.

---

### 11.1.9. Tiêu chí chấp nhận
- Nút "Bắt đầu" hiển thị; sau khi bấm — đếm `HH:MM:SS`, ≥ `00:00:10` sau 10 giây; trạng thái "Đang tính giờ"; nút Dừng.
- Không bắt đầu trùng khi đã chạy.
- Hai member độc lập; lệch ~30 giây khi test song song.
- Outsider chặn truy cập.
- Responsive; điều hướng quay lại không reset timer.

---

### 11.1.10. Ghi chú
- Test case tham chiếu: `TC_TIME_START_01` đến `TC_TIME_START_10` (file `TC_TIME_START.md`).
- `TC_TIME_START_04` map trực tiếp FR-TIME-1.1; `TC_TIME_START_06`–`TC_TIME_START_07` map FR-TIME-1.2.
