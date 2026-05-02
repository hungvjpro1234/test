## 7.7. Chức năng Xem công việc theo Kanban

### 7.7.1. Mô tả chức năng

Chức năng Xem công việc theo Kanban hiển thị công việc của nhóm theo dạng bảng cột Kanban, mỗi cột tương ứng một trạng thái (Todo, In Progress, Done…). Người dùng có thể kéo-thả công việc giữa các cột để cập nhật trạng thái trực tiếp. Thay đổi từ kéo-thả phản ánh đồng bộ sang chế độ xem danh sách và thành viên khác cũng thấy ngay. Nhấp vào card công việc trên Kanban mở trang chi tiết.

---

### 7.7.2. Yêu cầu chức năng

**FR-TASK-7-01:** Hệ thống phải cung cấp chế độ xem Kanban; người dùng có thể chuyển đổi từ giao diện chính.

**FR-TASK-7-02:** Kanban phải hiển thị đúng số cột theo số trạng thái hệ thống định nghĩa; tên cột khớp với tên trạng thái.

**FR-TASK-7-03:** Mỗi công việc phải được xếp đúng cột theo trạng thái hiện tại.

**FR-TASK-7-04:** Số lượng card trong mỗi cột phải khớp với số công việc có trạng thái tương ứng.

**FR-TASK-7-05:** Mỗi card phải hiển thị ít nhất tiêu đề; có thể hiển thị thêm độ ưu tiên và ngày đến hạn nếu có.

**FR-TASK-7-06:** Người dùng phải có thể kéo-thả card từ cột này sang cột khác để cập nhật trạng thái.

**FR-TASK-7-07:** Thay đổi trạng thái từ kéo-thả phải persist sau reload.

**FR-TASK-7-08:** Thay đổi từ Kanban phải đồng bộ với chế độ xem danh sách — khi quay sang danh sách và lọc theo trạng thái mới, công việc phải hiển thị đúng.

**FR-TASK-7-09:** Thành viên khác phải thấy thay đổi từ kéo-thả của người dùng hiện tại.

**FR-TASK-7-10:** Nhấp vào card phải mở trang chi tiết công việc đó.

**FR-TASK-7-11:** Công việc mới được tạo phải xuất hiện ngay đúng cột theo trạng thái của nó.

---

### 7.7.3. Đặc tả Use Case

**Tên Use Case:** Xem và quản lý công việc theo bảng Kanban  
**Mã Use Case:** UC-TASK-KANBAN-01

**Mô tả:**  
Người dùng chuyển sang chế độ Kanban để có cái nhìn tổng quan theo trạng thái và thay đổi trạng thái công việc nhanh chóng bằng kéo-thả.

**Tác nhân chính:**  
Thành viên nhóm đã đăng nhập

**Tiền điều kiện:**
- Người dùng đã đăng nhập và là thành viên nhóm.
- Nhóm có công việc ở đủ các trạng thái (Todo, In Progress, Done…).

**Kích hoạt:**  
Người dùng nhấn nút chuyển sang chế độ xem Kanban.

**Hậu điều kiện:**
- Giao diện Kanban hiển thị công việc đúng cột theo trạng thái.
- Sau kéo-thả: trạng thái công việc được cập nhật và đồng bộ.

#### a. Luồng chính (Basic Flow)
1. Người dùng nhấn nút chuyển sang chế độ Kanban.
2. Hệ thống hiển thị bảng Kanban với các cột theo trạng thái; tên cột rõ ràng.
3. Mỗi công việc xuất hiện đúng cột theo trạng thái hiện tại; card hiển thị tiêu đề (và độ ưu tiên, deadline nếu có).
4. Người dùng quan sát và làm việc với bảng Kanban.

#### b. Luồng thay thế (Alternative Flow)

**AF-01: Kéo-thả card sang cột khác (đổi trạng thái)**
1. Người dùng kéo card từ cột `Todo` sang cột `In Progress`.
2. Hệ thống cập nhật trạng thái của công việc thành `In Progress`.
3. Card xuất hiện ở cột mới; biến mất khỏi cột cũ.
4. Thay đổi persist sau reload.
5. Thành viên khác thấy card ở đúng cột mới.

**AF-02: Xem trên chế độ danh sách sau khi kéo-thả**
1. Người dùng chuyển sang chế độ danh sách và lọc theo trạng thái mới.
2. Công việc vừa kéo hiển thị đúng trong kết quả lọc.

**AF-03: Nhấp vào card để xem chi tiết**
1. Người dùng nhấp vào card trên Kanban.
2. Hệ thống mở trang chi tiết của công việc đó.

**AF-04: Tạo công việc mới khi đang ở Kanban**
1. Người dùng tạo công việc mới với trạng thái `Todo`.
2. Card mới xuất hiện ngay ở cột `Todo` mà không cần tải lại.

#### c. Luồng ngoại lệ (Exception Flow)

Không có luồng ngoại lệ đặc biệt — thao tác kéo-thả không hợp lệ (ví dụ: thả ngoài vùng cột) sẽ khiến card trở về vị trí ban đầu.

---

### 7.7.4. Dữ liệu vào
- Chế độ xem Kanban được kích hoạt bởi người dùng
- Thao tác kéo-thả card (card nguồn, cột đích)

### 7.7.5. Dữ liệu ra
- Bảng Kanban với cột theo trạng thái và card công việc đúng vị trí
- Cập nhật trạng thái công việc sau kéo-thả
- Thông báo đồng bộ sang chế độ danh sách

---

### 7.7.6. Quy tắc nghiệp vụ
- Số cột và tên cột do hệ thống định nghĩa theo danh sách trạng thái hợp lệ.
- Mỗi công việc luôn thuộc đúng một cột tương ứng trạng thái của nó (C-3).
- Kéo-thả là cách cập nhật trạng thái nhanh; kết quả phải đồng bộ với tất cả chế độ xem khác.
- Thay đổi persist sau reload; đồng bộ với thành viên khác.

---

### 7.7.7. Điều kiện tiền đề và ràng buộc
- Người dùng phải đang đăng nhập và là thành viên nhóm.
- Nhóm cần có công việc ở đa trạng thái để kiểm tra đầy đủ.

---

### 7.7.8. Mức độ ưu tiên
**Mức độ ưu tiên: Trung bình**

**Lý do:**  
Kanban cung cấp giao diện trực quan cho nhóm theo dõi luồng công việc; tính năng kéo-thả nâng cao trải nghiệm quản lý trạng thái so với cập nhật thủ công qua form.

---

### 7.7.9. Tiêu chí chấp nhận
- Chuyển sang Kanban → hiển thị bảng cột đúng số/tên trạng thái; layout không lỗi.
- Số card trong mỗi cột khớp số task trạng thái tương ứng.
- Card hiển thị ít nhất tiêu đề task.
- Task `Todo` ở cột `Todo`; `In Progress` ở `In Progress`; `Done` ở `Done`.
- Kéo task từ `Todo` → `In Progress` → trạng thái cập nhật; card chuyển cột.
- Thay đổi persist sau reload.
- Chuyển sang danh sách + lọc trạng thái mới → task hiển thị đúng.
- Thành viên khác thấy card ở đúng cột mới.
- Click vào card → mở chi tiết task.
- Tạo task `Todo` khi đang ở Kanban → xuất hiện ngay ở cột `Todo`.

---

### 7.7.10. Ghi chú
- Các test case tham chiếu: `TC_TASK_KANBAN_01` đến `TC_TASK_KANBAN_11` (file `TC_TASK_KANBAN.md`).
- `TC_TASK_KANBAN_06` xác nhận kéo-thả cập nhật trạng thái.
- `TC_TASK_KANBAN_07` xác nhận persist sau reload.
- `TC_TASK_KANBAN_10` xác nhận đồng bộ với chế độ danh sách sau kéo-thả.
- `TC_TASK_KANBAN_11` xác nhận thành viên khác thấy thay đổi.
- Pre-condition: nhóm phải có task ở đủ trạng thái Todo, In Progress, Done.
