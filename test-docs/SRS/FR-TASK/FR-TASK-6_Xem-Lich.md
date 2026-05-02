## 7.6. Chức năng Xem công việc theo Lịch

### 7.6.1. Mô tả chức năng

Chức năng Xem công việc theo Lịch hiển thị các công việc của nhóm trên giao diện lịch tháng, dựa theo ngày đến hạn (deadline). Công việc không có deadline không hiển thị trên lịch. Người dùng có thể điều hướng giữa các tháng/năm; ngày hiện tại được đánh dấu nổi bật. Nhấp vào công việc trên lịch sẽ mở trang chi tiết tương ứng. Lịch phản ánh ngay khi tạo mới hoặc cập nhật deadline của công việc.

---

### 7.6.2. Yêu cầu chức năng

**FR-TASK-6-01:** Hệ thống phải cung cấp chế độ xem Lịch cho danh sách công việc; người dùng có thể chuyển đổi sang chế độ này từ giao diện chính.

**FR-TASK-6-02:** Lịch phải hiển thị theo tháng với đầy đủ các ngày và đúng thứ trong tuần.

**FR-TASK-6-03:** Công việc có ngày đến hạn phải hiển thị đúng ngày tương ứng trên lịch.

**FR-TASK-6-04:** Công việc không có ngày đến hạn không được hiển thị trên lịch.

**FR-TASK-6-05:** Ngày hôm nay phải được đánh dấu/highlight rõ ràng trên lịch.

**FR-TASK-6-06:** Người dùng phải có thể điều hướng sang tháng trước, tháng sau và năm khác; lịch phải hiển thị đúng công việc của khoảng thời gian được chọn.

**FR-TASK-6-07:** Người dùng phải có thể quay về tháng hiện tại bằng nút "Hôm nay" hoặc tương đương.

**FR-TASK-6-08:** Khi có nhiều công việc cùng ngày, lịch phải hiển thị tất cả hoặc có indicator "xem thêm".

**FR-TASK-6-09:** Nhấp vào công việc trên lịch phải mở trang chi tiết của công việc đó.

**FR-TASK-6-10:** Khi công việc mới được tạo với deadline trong tháng đang xem, nó phải xuất hiện ngay trên lịch mà không cần tải lại trang.

**FR-TASK-6-11:** Khi deadline của công việc được cập nhật, công việc phải di chuyển đúng sang ngày mới và biến mất ở ngày cũ.

---

### 7.6.3. Đặc tả Use Case

**Tên Use Case:** Xem công việc trên giao diện lịch tháng  
**Mã Use Case:** UC-TASK-CALENDAR-01

**Mô tả:**  
Người dùng chuyển sang chế độ xem Lịch để theo dõi công việc theo ngày đến hạn. Người dùng có thể điều hướng giữa các tháng/năm và nhấp vào công việc để xem chi tiết.

**Tác nhân chính:**  
Thành viên nhóm đã đăng nhập

**Tiền điều kiện:**
- Người dùng đã đăng nhập và là thành viên nhóm.
- Nhóm có ít nhất một công việc có ngày đến hạn.

**Kích hoạt:**  
Người dùng nhấn nút chuyển sang chế độ xem Lịch.

**Hậu điều kiện:**
- Giao diện lịch hiển thị công việc đúng ngày deadline của tháng đang xem.

#### a. Luồng chính (Basic Flow)
1. Người dùng nhấn nút chuyển sang chế độ xem Lịch.
2. Hệ thống hiển thị lịch tháng hiện tại với đầy đủ ngày, đúng thứ trong tuần; ngày hôm nay được highlight.
3. Hệ thống hiển thị các công việc có deadline trong tháng hiện tại đúng ngày tương ứng.
4. Người dùng quan sát lịch.

#### b. Luồng thay thế (Alternative Flow)

**AF-01: Điều hướng sang tháng trước/sau**
1. Người dùng nhấn nút "Tháng trước" hoặc "Tháng sau".
2. Hệ thống chuyển lịch sang tháng tương ứng; hiển thị đúng công việc của tháng đó.

**AF-02: Điều hướng sang năm khác**
1. Người dùng chuyển sang năm khác.
2. Hệ thống hiển thị đúng tháng/năm được chọn và công việc có deadline trong đó.

**AF-03: Quay về tháng hiện tại**
1. Người dùng nhấn nút "Hôm nay".
2. Hệ thống chuyển lịch về tháng hiện tại; ngày hôm nay được highlight.

**AF-04: Nhấp vào công việc trên lịch**
1. Người dùng nhấp vào tên công việc hiển thị trên ô ngày.
2. Hệ thống mở trang chi tiết của công việc đó.

**AF-05: Nhiều công việc cùng ngày**
1. Hệ thống hiển thị tất cả công việc trong ô ngày hoặc hiển thị một số và có indicator "xem thêm" nếu quá nhiều.

**AF-06: Tạo công việc mới với deadline trong tháng đang xem**
1. Người dùng tạo công việc mới với deadline trong tháng đang hiển thị.
2. Công việc mới xuất hiện ngay đúng ngày trên lịch mà không cần tải lại.

**AF-07: Cập nhật deadline công việc**
1. Deadline của một công việc được thay đổi.
2. Công việc biến mất ở ngày cũ và xuất hiện ở ngày mới trên lịch.

#### c. Luồng ngoại lệ (Exception Flow)

Không có luồng ngoại lệ đặc biệt — giao diện Lịch là chế độ xem chỉ đọc; lỗi truy cập xử lý tương tự chức năng xem danh sách.

---

### 7.6.4. Dữ liệu vào
- Tháng/năm đang xem
- Dữ liệu công việc của nhóm (deadline, tiêu đề)

### 7.6.5. Dữ liệu ra
- Giao diện lịch tháng hiển thị công việc đúng ngày deadline
- Indicator khi nhiều công việc cùng ngày
- Ngày hôm nay được highlight

---

### 7.6.6. Quy tắc nghiệp vụ
- Chỉ công việc có ngày đến hạn (deadline) mới xuất hiện trên lịch (C-3).
- Lịch hiển thị công việc của nhóm đang làm việc; độc lập theo nhóm.
- Khi cập nhật deadline, công việc di chuyển đúng vị trí trên lịch ngay lập tức.

---

### 7.6.7. Điều kiện tiền đề và ràng buộc
- Người dùng phải đang đăng nhập và là thành viên nhóm.
- Nhóm cần có ít nhất một công việc có deadline để lịch có nội dung hiển thị.

---

### 7.6.8. Mức độ ưu tiên
**Mức độ ưu tiên: Trung bình**

**Lý do:**  
Chế độ xem Lịch bổ sung khả năng nhìn tổng quan tiến độ theo thời gian; không thay thế mà bổ sung cho chế độ xem danh sách.

---

### 7.6.9. Tiêu chí chấp nhận
- Chuyển sang chế độ Lịch → hiển thị lịch tháng đúng ngày, thứ; ngày hôm nay được highlight.
- Task có deadline → xuất hiện đúng ngày trên lịch.
- Task không có deadline → không xuất hiện trên lịch.
- Chuyển sang tháng trước → lịch và task chuyển đúng.
- Chuyển sang tháng sau → lịch và task chuyển đúng.
- Chuyển sang năm khác → lịch hiển thị đúng.
- Nhấn "Hôm nay" → quay về tháng hiện tại, ngày hôm nay highlighted.
- Nhiều task cùng ngày → hiển thị tất cả hoặc có indicator "xem thêm".
- Click vào task trên lịch → mở chi tiết task.
- Tạo task mới với deadline trong tháng đang xem → xuất hiện ngay trên lịch.
- Cập nhật deadline → task di chuyển sang ngày mới, biến mất ở ngày cũ.

---

### 7.6.10. Ghi chú
- Các test case tham chiếu: `TC_TASK_CALENDAR_01` đến `TC_TASK_CALENDAR_12` (file `TC_TASK_CALENDAR.md`).
- `TC_TASK_CALENDAR_04` xác nhận task không có deadline không hiển thị trên lịch.
- `TC_TASK_CALENDAR_10` xác nhận nhiều task cùng ngày đều hiển thị hoặc có indicator.
- `TC_TASK_CALENDAR_11` xác nhận task mới xuất hiện ngay trên lịch.
- `TC_TASK_CALENDAR_12` xác nhận cập nhật deadline → task di chuyển đúng.
- Pre-condition: nhóm cần có task với deadline đủ trải rộng (tháng trước, tháng hiện tại, tháng sau).
