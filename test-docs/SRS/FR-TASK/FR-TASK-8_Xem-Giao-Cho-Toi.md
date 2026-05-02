## 7.8. Chức năng Xem công việc được giao cho tôi

### 7.8.1. Mô tả chức năng

Chức năng Xem công việc được giao cho tôi cho phép người dùng xem tổng hợp toàn bộ công việc đã được giao trực tiếp cho bản thân, bất kể thuộc nhóm nào. Chỉ hiển thị công việc mà người dùng là người được giao; công việc trong cùng nhóm nhưng không giao cho mình không xuất hiện. Danh sách có thể kết hợp với bộ lọc trạng thái, độ ưu tiên. Danh sách cập nhật ngay khi được giao hoặc thu hồi task. Mỗi người dùng chỉ thấy task được giao cho riêng mình.

---

### 7.8.2. Yêu cầu chức năng

**FR-TASK-8-01:** Hệ thống phải cung cấp mục/bộ lọc "Giao cho tôi" trong sidebar hoặc menu; người dùng có thể truy cập dễ dàng.

**FR-TASK-8-02:** Danh sách "Giao cho tôi" phải chỉ hiển thị các công việc mà người dùng hiện tại là người được giao.

**FR-TASK-8-03:** Công việc trong cùng nhóm nhưng không được giao cho người dùng không được xuất hiện trong danh sách này.

**FR-TASK-8-04:** Hệ thống phải tổng hợp công việc từ tất cả nhóm mà người dùng là thành viên — không giới hạn một nhóm.

**FR-TASK-8-05:** Danh sách phải có thể kết hợp với bộ lọc trạng thái và độ ưu tiên.

**FR-TASK-8-06:** Khi được giao task mới, danh sách phải cập nhật ngay để phản ánh task mới đó.

**FR-TASK-8-07:** Khi task bị thu hồi (người giao gỡ người dùng khỏi task), danh sách phải cập nhật ngay — task không còn xuất hiện.

**FR-TASK-8-08:** Danh sách "Giao cho tôi" là riêng của từng người dùng — mỗi user chỉ thấy task được giao cho mình.

**FR-TASK-8-09:** Danh sách phải persist sau reload và đăng nhập lại.

---

### 7.8.3. Đặc tả Use Case

**Tên Use Case:** Xem danh sách công việc được giao cho người dùng hiện tại  
**Mã Use Case:** UC-TASK-ASSIGNED-01

**Mô tả:**  
Người dùng truy cập mục "Giao cho tôi" để xem tổng hợp tất cả công việc được giao trực tiếp cho bản thân từ mọi nhóm tham gia. Người dùng có thể lọc thêm theo trạng thái hoặc độ ưu tiên.

**Tác nhân chính:**  
Thành viên nhóm đã đăng nhập

**Tiền điều kiện:**
- Người dùng đã đăng nhập thành công.
- Người dùng là thành viên của ít nhất một nhóm và có ít nhất một task được giao.

**Kích hoạt:**  
Người dùng nhấp vào mục "Giao cho tôi" trong sidebar/menu.

**Hậu điều kiện:**
- Danh sách hiển thị đúng tất cả công việc được giao cho người dùng hiện tại từ tất cả nhóm.

#### a. Luồng chính (Basic Flow)
1. Người dùng nhấp vào mục "Giao cho tôi".
2. Hệ thống truy xuất tất cả công việc có người dùng hiện tại trong danh sách được giao — từ tất cả nhóm.
3. Hệ thống hiển thị danh sách công việc.
4. Người dùng xem danh sách.

#### b. Luồng thay thế (Alternative Flow)

**AF-01: Kết hợp với bộ lọc trạng thái**
1. Người dùng áp dụng bộ lọc Trạng thái = `In Progress` khi đang ở mục "Giao cho tôi".
2. Hệ thống chỉ hiển thị task được giao cho người dùng VÀ có trạng thái `In Progress`.

**AF-02: Được giao task mới**
1. Thành viên khác giao thêm task cho người dùng.
2. Danh sách "Giao cho tôi" cập nhật ngay để bao gồm task mới.

**AF-03: Task bị thu hồi**
1. Thành viên khác gỡ người dùng khỏi một task.
2. Task đó không còn xuất hiện trong danh sách "Giao cho tôi" của người dùng.

**AF-04: Đăng nhập với tài khoản khác**
1. Người dùng đăng nhập bằng tài khoản khác.
2. Mục "Giao cho tôi" hiển thị đúng task được giao cho tài khoản mới này; không lẫn với tài khoản cũ.

#### c. Luồng ngoại lệ (Exception Flow)

**EF-01: Không có task được giao**
1. Người dùng chưa được giao bất kỳ task nào.
2. Hệ thống hiển thị danh sách trống hoặc thông báo chưa có task được giao.

---

### 7.8.4. Dữ liệu vào
- Thông tin người dùng hiện tại (dùng để lọc task được giao)
- Bộ lọc bổ sung (trạng thái, độ ưu tiên) nếu áp dụng

### 7.8.5. Dữ liệu ra
- Danh sách công việc được giao cho người dùng hiện tại từ tất cả nhóm
- Thông báo trống nếu chưa có task được giao

---

### 7.8.6. Quy tắc nghiệp vụ
- "Giao cho tôi" lọc theo điều kiện: người dùng hiện tại có trong danh sách assignee của task (C-4).
- Danh sách tổng hợp từ tất cả nhóm mà người dùng là thành viên; không bị giới hạn một nhóm.
- Mỗi user chỉ thấy task của chính mình; dữ liệu hoàn toàn riêng biệt theo user.
- Kết hợp bộ lọc bổ sung sử dụng logic AND.

---

### 7.8.7. Điều kiện tiền đề và ràng buộc
- Người dùng phải đang đăng nhập.
- Cơ sở dữ liệu phải truy cập được.

---

### 7.8.8. Mức độ ưu tiên
**Mức độ ưu tiên: Trung bình**

**Lý do:**  
"Giao cho tôi" giúp người dùng tập trung vào công việc cần thực hiện mà không bị phân tán bởi toàn bộ task của nhóm; đặc biệt hữu ích khi thành viên nhiều nhóm.

---

### 7.8.9. Tiêu chí chấp nhận
- Mục "Giao cho tôi" tồn tại và có thể truy cập từ sidebar/menu.
- Tất cả task hiển thị đều có người dùng hiện tại là người được giao.
- Task trong cùng nhóm không được giao cho mình → không xuất hiện.
- Task từ nhiều nhóm khác nhau đều xuất hiện trong cùng danh sách.
- Áp dụng bộ lọc `In Progress` → chỉ hiển thị task giao cho mình VÀ `In Progress`.
- Được giao task mới → xuất hiện ngay trong danh sách.
- Bị thu hồi task → task không còn trong danh sách.
- Đăng nhập tài khoản khác → danh sách "Giao cho tôi" riêng biệt cho tài khoản đó.
- Danh sách persist sau reload và đăng nhập lại.

---

### 7.8.10. Ghi chú
- Các test case tham chiếu: `TC_TASK_ASSIGNED_01` đến `TC_TASK_ASSIGNED_10` (file `TC_TASK_ASSIGNED.md`).
- `TC_TASK_ASSIGNED_03` xác nhận chỉ hiển thị task được giao cho người dùng hiện tại.
- `TC_TASK_ASSIGNED_04` xác nhận task không được giao không xuất hiện.
- `TC_TASK_ASSIGNED_05` xác nhận tổng hợp task từ nhiều nhóm.
- `TC_TASK_ASSIGNED_07/08` xác nhận cập nhật ngay khi được giao/thu hồi task.
- `TC_TASK_ASSIGNED_09` xác nhận danh sách là riêng của từng user.
- `TC_TASK_ASSIGNED_10` xác nhận persist sau reload và đăng nhập lại.
- Pre-condition: `member@test.com` cần có task được giao ở ít nhất 2 nhóm khác nhau.
