## 6.3. Chức năng Xem danh sách người được giao

### 6.3.1. Mô tả chức năng

Chức năng Xem danh sách người được giao hiển thị tất cả thành viên đã được phân công cho một công việc trong trang chi tiết công việc. Danh sách phản ánh trạng thái thực tế theo thời gian thực: cập nhật ngay khi có giao/hủy giao mà không cần tải lại trang. Khi không có ai được giao, hệ thống hiển thị trạng thái "Chưa có người được giao". Thành viên trong danh sách được hiển thị cùng avatar và tên. Hệ thống kiểm soát quyền truy cập: chỉ thành viên nhóm có quyền mới xem được.

---

### 6.3.2. Yêu cầu chức năng

**FR-ASSIGN-3-01:** Hệ thống phải hiển thị danh sách người được giao trong trang chi tiết công việc với avatar và tên của từng người.

**FR-ASSIGN-3-02:** Khi danh sách rỗng (chưa có ai được giao), hệ thống phải hiển thị trạng thái "Chưa có người được giao" hoặc tương đương.

**FR-ASSIGN-3-03:** Danh sách phải phản ánh đúng hiện trạng: cập nhật ngay sau khi giao/hủy giao mà không cần tải lại trang.

**FR-ASSIGN-3-04:** Danh sách phải đồng bộ chính xác với dữ liệu cơ sở dữ liệu; không hiển thị người đã bị hủy giao.

**FR-ASSIGN-3-05:** Hệ thống phải từ chối cho xem danh sách với người không thuộc nhóm; hiển thị thông báo không có quyền truy cập (FR-ASSIGN-3.2).

**FR-ASSIGN-3-06:** Danh sách phải persist đúng sau reload và đăng nhập lại.

---

### 6.3.3. Đặc tả Use Case

**Tên Use Case:** Xem danh sách người được giao của công việc  
**Mã Use Case:** UC-ASSIGN-VIEW-01

**Mô tả:**  
Thành viên nhóm mở trang chi tiết công việc và xem danh sách tất cả người được giao. Danh sách cập nhật theo thời gian thực và phản ánh chính xác trạng thái phân công hiện tại.

**Tác nhân chính:**  
Thành viên nhóm (`member@test.com`)

**Tiền điều kiện:**
- `member@test.com` đã đăng nhập và là thành viên của nhóm sở hữu task.
- Tồn tại task `Task View Assign` đang có `member1@test.com` và `member2@test.com` trong danh sách người được giao.
- Tồn tại task `Task No Assign` chưa có ai được giao.
- `outsider@test.com` không thuộc nhóm.

**Kích hoạt:**  
Người dùng mở trang chi tiết công việc.

**Hậu điều kiện:**
- Nếu có quyền: danh sách người được giao (hoặc trạng thái trống) được hiển thị đầy đủ.
- Nếu không có quyền: thông báo từ chối; không hiển thị dữ liệu.

#### a. Luồng chính (Basic Flow) — Task có người được giao
1. `member@test.com` mở trang chi tiết `Task View Assign`.
2. Hệ thống xác thực quyền: `member@test.com` thuộc nhóm sở hữu task.
3. Hệ thống truy vấn danh sách người được giao từ cơ sở dữ liệu.
4. Hệ thống hiển thị danh sách: `member1@test.com` (avatar + tên) và `member2@test.com` (avatar + tên).
5. Người dùng thấy đầy đủ thông tin.

#### b. Luồng thay thế (Alternative Flow)

**AF-01: Task chưa có người được giao**
1. `member@test.com` mở trang chi tiết `Task No Assign`.
2. Hệ thống xác thực quyền thành công.
3. Hệ thống truy vấn — danh sách rỗng.
4. Hệ thống hiển thị trạng thái "Chưa có người được giao" (hoặc tương đương).

**AF-02: Cập nhật real-time sau khi giao việc**
1. `member@test.com` đang xem danh sách người được giao của `Task View Assign`.
2. Người dùng khác (`assigner@test.com`) giao thêm `member3@test.com` vào task.
3. Danh sách cập nhật ngay; `member3@test.com` xuất hiện mà không cần `member@test.com` reload trang.

**AF-03: Cập nhật real-time sau khi hủy giao việc**
1. `member@test.com` đang xem danh sách; `member2@test.com` đang có trong danh sách.
2. `assigner@test.com` hủy giao `member2@test.com`.
3. `member2@test.com` biến mất khỏi danh sách ngay mà không cần reload.

**AF-04: Kiểm tra đồng bộ database — người bị hủy không còn hiển thị**
1. `assigner@test.com` hủy `member1@test.com` khỏi danh sách.
2. `member@test.com` reload trang.
3. Danh sách không còn chứa `member1@test.com`; đồng bộ chính xác với database.

#### c. Luồng ngoại lệ (Exception Flow)

**EF-01: Người dùng không thuộc nhóm cố truy cập (FR-ASSIGN-3.2)**
1. `outsider@test.com` cố truy cập trang chi tiết task thuộc nhóm không tham gia.
2. Hệ thống xác thực quyền thất bại.
3. Hệ thống hiển thị thông báo không có quyền truy cập; không hiển thị danh sách người được giao.

---

### 6.3.4. Dữ liệu vào
- ID công việc cần xem
- Danh tính người dùng (phải là thành viên nhóm)

### 6.3.5. Dữ liệu ra
- Danh sách người được giao: avatar + tên từng thành viên
- Hoặc thông báo "Chưa có người được giao" nếu danh sách rỗng
- Thông báo lỗi không có quyền truy cập nếu không hợp lệ

---

### 6.3.6. Quy tắc nghiệp vụ
- Chỉ thành viên thuộc nhóm mới được xem danh sách người được giao (C-4, NFR-SEC).
- Danh sách phản ánh trạng thái thực tế; không hiển thị người đã bị hủy giao.
- Khi chưa có ai được giao, hệ thống phải hiển thị trạng thái trống rõ ràng thay vì để trống không có thông báo.
- Danh sách được cập nhật theo thời gian thực sau mỗi thao tác giao/hủy giao.
- Dữ liệu hiển thị phải đồng bộ chính xác với cơ sở dữ liệu; không có độ trễ không nhất quán.

---

### 6.3.7. Điều kiện tiền đề và ràng buộc
- Người dùng phải đã đăng nhập và thuộc nhóm sở hữu task.
- Task phải tồn tại và chưa bị xóa.
- Cần chuẩn bị dữ liệu test: task có 2 người được giao, task chưa có người được giao, và tài khoản `outsider@test.com` không thuộc nhóm.

---

### 6.3.8. Mức độ ưu tiên
**Mức độ ưu tiên: Cao**

**Lý do:**  
Xem danh sách người được giao là thông tin cơ bản nhất của mỗi công việc; ảnh hưởng trực tiếp đến khả năng theo dõi trách nhiệm và tiến độ của nhóm.

---

### 6.3.9. Tiêu chí chấp nhận
- Task có assignee → hiển thị avatar và tên đầy đủ trong trang chi tiết.
- Task không có assignee → hiển thị trạng thái "Chưa có người được giao".
- Sau khi giao thêm người → danh sách cập nhật ngay; không cần reload.
- Sau khi hủy giao → người bị hủy biến mất khỏi danh sách ngay; không cần reload.
- Reload trang → danh sách vẫn hiển thị chính xác; đồng bộ với database.
- `outsider@test.com` cố truy cập → thông báo không có quyền; không thấy danh sách.
- Sau đăng nhập lại → danh sách vẫn hiển thị đúng.

---

### 6.3.10. Ghi chú
- Các test case tham chiếu: `TC_ASSIGN_VIEW_01` đến `TC_ASSIGN_VIEW_08` (file `TC_ASSIGN_VIEW.md`).
- `TC_ASSIGN_VIEW_01`: hiển thị danh sách khi có assignee.
- `TC_ASSIGN_VIEW_02`: hiển thị trạng thái trống khi chưa có assignee.
- `TC_ASSIGN_VIEW_03`: cập nhật real-time sau khi giao.
- `TC_ASSIGN_VIEW_04`: cập nhật real-time sau khi hủy giao.
- `TC_ASSIGN_VIEW_05`: kiểm tra quyền truy cập — người không thuộc nhóm.
- `TC_ASSIGN_VIEW_06`: đồng bộ với database sau reload.
- `TC_ASSIGN_VIEW_07` – `TC_ASSIGN_VIEW_08`: persist sau reload và đăng nhập lại.
- Liên kết ràng buộc C-4, NFR-SEC; liên kết FR-TASK-2 (Xem danh sách công việc) và FR-TASK-8 (Xem công việc được giao cho tôi).
