## 6.2. Chức năng Hủy giao việc

### 6.2.1. Mô tả chức năng

Chức năng Hủy giao việc cho phép người dùng có quyền phân công xóa một thành viên khỏi danh sách người được giao của công việc. Khi hủy thành công, thành viên bị xóa khỏi danh sách ngay lập tức, công việc không còn xuất hiện trong mục "Giao cho tôi" của họ, và thông báo hủy giao được gửi đến người bị xóa. Hệ thống ngăn hủy người không có trong danh sách và từ chối hủy từ người không có quyền.

---

### 6.2.2. Yêu cầu chức năng

**FR-ASSIGN-2-01:** Hệ thống phải cung cấp nút/chức năng xóa từng người trong danh sách người được giao tại trang chi tiết công việc.

**FR-ASSIGN-2-02:** Sau khi hủy thành công, người được giao bị xóa ngay khỏi danh sách; không cần tải lại trang.

**FR-ASSIGN-2-03:** Sau khi hủy thành công, công việc phải biến mất khỏi mục "Giao cho tôi" của người bị hủy.

**FR-ASSIGN-2-04:** Người bị hủy phải nhận thông báo "Bạn bị hủy giao task [tên task]".

**FR-ASSIGN-2-05:** Hệ thống phải từ chối hủy người không có trong danh sách người được giao; hiển thị thông báo không phải assignee (FR-ASSIGN-2.2).

**FR-ASSIGN-2-06:** Hệ thống phải từ chối khi người dùng không có quyền hủy giao; hiển thị thông báo không có quyền (FR-ASSIGN-2.2).

**FR-ASSIGN-2-07:** Việc hủy giao phải persist sau reload và đăng nhập lại.

---

### 6.2.3. Đặc tả Use Case

**Tên Use Case:** Hủy phân công thành viên khỏi công việc  
**Mã Use Case:** UC-ASSIGN-REMOVE-01

**Mô tả:**  
Người dùng có quyền phân công xóa một thành viên khỏi danh sách người được giao của công việc. Hệ thống cập nhật danh sách ngay lập tức, gửi thông báo và cập nhật mục "Giao cho tôi" của người bị hủy.

**Tác nhân chính:**  
Thành viên nhóm có quyền phân công (`assigner@test.com`)

**Tiền điều kiện:**
- `assigner@test.com` đã đăng nhập và có quyền hủy giao việc trong nhóm.
- Tồn tại task `Task Remove Assign` đã có `member1@test.com` trong danh sách người được giao.
- `outsider@test.com` không có trong danh sách người được giao của task.

**Kích hoạt:**  
Người dùng nhấn nút/icon xóa bên cạnh tên thành viên trong danh sách người được giao tại trang chi tiết công việc.

**Hậu điều kiện:**
- Nếu thành công: thành viên bị xóa khỏi danh sách ngay; nhận thông báo; task biến mất khỏi "Giao cho tôi".
- Nếu thất bại: thông báo lỗi tương ứng; danh sách không thay đổi.

#### a. Luồng chính (Basic Flow)
1. Người dùng mở trang chi tiết `Task Remove Assign`.
2. Hệ thống hiển thị danh sách người được giao; trong đó có `member1@test.com`.
3. Người dùng nhấn nút xóa bên cạnh `member1@test.com`.
4. Hệ thống kiểm tra: `assigner@test.com` có quyền hủy giao; `member1@test.com` có trong danh sách.
5. Hệ thống xóa `member1@test.com` khỏi danh sách.
6. `member1@test.com` biến mất khỏi danh sách ngay; không cần reload.
7. Hệ thống gửi thông báo "Bạn bị hủy giao task Task Remove Assign" đến `member1@test.com`.
8. Task `Task Remove Assign` biến mất khỏi mục "Giao cho tôi" của `member1@test.com`.

#### b. Luồng thay thế (Alternative Flow)

**AF-01: Hủy người cuối cùng trong danh sách**
1. Task chỉ còn `member1@test.com` trong danh sách.
2. Người dùng xóa `member1@test.com`.
3. Hệ thống xử lý thành công; danh sách người được giao trở thành rỗng (nếu hệ thống cho phép).
4. Task hiển thị trạng thái "Chưa được giao".

#### c. Luồng ngoại lệ (Exception Flow)

**EF-01: Hủy người không có trong danh sách (FR-ASSIGN-2.2)**
1. Người dùng cố hủy `outsider@test.com` (không có trong danh sách người được giao).
2. Hệ thống thông báo người này không phải assignee của task; không thực hiện thay đổi.

**EF-02: Người dùng không có quyền hủy giao (FR-ASSIGN-2.2)**
1. Người dùng không có quyền phân công cố xóa thành viên khỏi danh sách.
2. Hệ thống thông báo không có quyền thực hiện hành động này; nút xóa không hiển thị hoặc bị vô hiệu hóa.

---

### 6.2.4. Dữ liệu vào
- Yêu cầu hủy giao (nhấn nút xóa cạnh tên thành viên)
- Danh tính người dùng thực hiện (phải có quyền phân công)

### 6.2.5. Dữ liệu ra
- Danh sách người được giao cập nhật ngay (xóa thành viên)
- Thông báo "Bạn bị hủy giao task [tên task]" gửi đến người bị hủy
- Task biến mất khỏi "Giao cho tôi" của người bị hủy
- Thông báo lỗi khi hủy thất bại

---

### 6.2.6. Quy tắc nghiệp vụ
- Chỉ người có quyền phân công mới được hủy giao việc (C-4).
- Không cho phép hủy người không có trong danh sách người được giao.
- Sau khi hủy, người bị hủy không còn thấy task trong "Giao cho tôi" (liên kết FR-TASK-8).
- Người bị hủy nhận thông báo ngay để biết mình không còn chịu trách nhiệm công việc đó.
- Việc hủy giao không xóa lịch sử hoạt động của task (nếu hệ thống có ghi log).

---

### 6.2.7. Điều kiện tiền đề và ràng buộc
- Người dùng phải đang đăng nhập và có quyền phân công trong nhóm.
- Task phải tồn tại và người được giao phải thực sự có trong danh sách.
- Cần có tài khoản test: `member1@test.com` (đang là assignee), `outsider@test.com` (không phải assignee).

---

### 6.2.8. Mức độ ưu tiên
**Mức độ ưu tiên: Cao**

**Lý do:**  
Hủy giao là thao tác đối xứng với giao việc; cần thiết để điều chỉnh trách nhiệm khi có sự thay đổi nhân sự hoặc kế hoạch làm việc.

---

### 6.2.9. Tiêu chí chấp nhận
- Nút xóa hiển thị bên cạnh từng thành viên trong danh sách người được giao (với người có quyền).
- Hủy `member1@test.com` → biến mất khỏi danh sách ngay; không cần reload.
- `member1@test.com` nhận thông báo "Bạn bị hủy giao task..." với tên task.
- Task biến mất khỏi mục "Giao cho tôi" của `member1@test.com`.
- Hủy người không có trong danh sách (`outsider@test.com`) → thông báo không phải assignee.
- Người không có quyền cố hủy → thông báo không có quyền; thao tác bị từ chối.
- Việc hủy persist sau reload và đăng nhập lại.

---

### 6.2.10. Ghi chú
- Các test case tham chiếu: `TC_ASSIGN_REMOVE_01` đến `TC_ASSIGN_REMOVE_09` (file `TC_ASSIGN_REMOVE.md`).
- `TC_ASSIGN_REMOVE_01` đến `TC_ASSIGN_REMOVE_05`: kiểm tra UI và luồng chức năng cơ bản (hiển thị nút, hủy thành công, cập nhật ngay, thông báo, biến mất khỏi "Giao cho tôi").
- `TC_ASSIGN_REMOVE_06`: kiểm tra hủy người không phải assignee.
- `TC_ASSIGN_REMOVE_07`: kiểm tra quyền hủy giao.
- `TC_ASSIGN_REMOVE_08`: kiểm tra persist sau reload.
- `TC_ASSIGN_REMOVE_09`: kiểm tra persist sau đăng nhập lại.
- Sau khi chạy test hủy, cần giao lại `member1@test.com` vào task để không ảnh hưởng các test case tiếp theo.
- Liên kết ràng buộc C-4; liên kết FR-TASK-8 (Xem công việc được giao cho tôi).
