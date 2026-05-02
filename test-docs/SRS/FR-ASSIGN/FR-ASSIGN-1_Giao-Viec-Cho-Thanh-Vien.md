## 6.1. Chức năng Giao việc cho thành viên

### 6.1.1. Mô tả chức năng

Chức năng Giao việc cho thành viên cho phép người dùng có quyền phân công chỉ định một hoặc nhiều thành viên nhóm vào danh sách người được giao của một công việc. Khi được giao, thành viên nhận thông báo ngay và công việc xuất hiện trong mục "Giao cho tôi" của họ. Hệ thống ngăn giao trùng (cùng người), vượt giới hạn tối đa, giao cho tài khoản không tồn tại, tài khoản bị khóa hoặc người không thuộc nhóm. Danh sách người được giao cập nhật ngay lập tức và persist sau reload.

---

### 6.1.2. Yêu cầu chức năng

**FR-ASSIGN-1-01:** Hệ thống phải cung cấp giao diện phân công trong trang chi tiết công việc; hiển thị ô tìm kiếm/dropdown với danh sách thành viên nhóm có thể chọn.

**FR-ASSIGN-1-02:** Hệ thống phải cho phép giao việc cho một hoặc nhiều thành viên cùng lúc.

**FR-ASSIGN-1-03:** Hệ thống phải hỗ trợ tìm kiếm thành viên theo tên trong phần phân công.

**FR-ASSIGN-1-04:** Hệ thống phải từ chối giao cho người đã có trong danh sách được giao; không tạo trùng; hiển thị thông báo (FR-ASSIGN-1.2).

**FR-ASSIGN-1-05:** Hệ thống phải từ chối khi vượt số lượng người được giao tối đa; hiển thị thông báo đã đạt giới hạn (FR-ASSIGN-1.2).

**FR-ASSIGN-1-06:** Hệ thống phải từ chối giao cho tài khoản không tồn tại; hiển thị thông báo không tìm thấy (FR-ASSIGN-1.3).

**FR-ASSIGN-1-07:** Hệ thống phải từ chối giao cho tài khoản bị khóa; hiển thị thông báo tài khoản không hợp lệ (FR-ASSIGN-1.3).

**FR-ASSIGN-1-08:** Hệ thống phải từ chối giao cho người không thuộc nhóm; hiển thị thông báo không phải thành viên nhóm (FR-ASSIGN-1.3).

**FR-ASSIGN-1-09:** Sau khi giao thành công, người được giao phải xuất hiện ngay trong danh sách mà không cần tải lại trang.

**FR-ASSIGN-1-10:** Người được giao phải nhận thông báo "Bạn được giao task..." với tên task.

**FR-ASSIGN-1-11:** Công việc phải xuất hiện ngay trong mục "Giao cho tôi" của người được giao.

**FR-ASSIGN-1-12:** Phân công phải persist sau reload và đăng nhập lại.

---

### 6.1.3. Đặc tả Use Case

**Tên Use Case:** Giao công việc cho thành viên nhóm  
**Mã Use Case:** UC-ASSIGN-ADD-01

**Mô tả:**  
Người dùng có quyền phân công chỉ định thành viên nhóm vào danh sách người được giao của công việc. Hệ thống xác thực và gửi thông báo đến người được giao.

**Tác nhân chính:**  
Thành viên nhóm có quyền phân công (`assigner@test.com`)

**Tiền điều kiện:**
- `assigner@test.com` đã đăng nhập và có quyền giao việc trong nhóm.
- Tồn tại task `Task Assign Test` chưa có ai được giao.
- `member1@test.com`, `member2@test.com` là thành viên hợp lệ của nhóm.
- `locked@test.com` là tài khoản bị khóa.
- `outsider@test.com` không thuộc nhóm.

**Kích hoạt:**  
Người dùng mở phần phân công trong trang chi tiết công việc và chọn thành viên.

**Hậu điều kiện:**
- Nếu thành công: thành viên được giao xuất hiện ngay trong danh sách; nhận thông báo; task xuất hiện trong "Giao cho tôi".
- Nếu thất bại: thông báo lỗi tương ứng; danh sách không thay đổi.

#### a. Luồng chính (Basic Flow)
1. Người dùng mở trang chi tiết `Task Assign Test`.
2. Người dùng mở phần phân công.
3. Hệ thống hiển thị ô tìm kiếm/dropdown với danh sách thành viên nhóm có thể chọn.
4. Người dùng tìm và chọn `member1@test.com`.
5. Người dùng xác nhận.
6. Hệ thống kiểm tra: `member1@test.com` là thành viên hợp lệ, tài khoản đang hoạt động, chưa có trong danh sách, chưa vượt giới hạn tối đa.
7. Hệ thống thêm `member1@test.com` vào danh sách người được giao.
8. `member1@test.com` xuất hiện ngay trong danh sách; không cần reload.
9. Hệ thống gửi thông báo đến `member1@test.com`.
10. Task xuất hiện trong mục "Giao cho tôi" của `member1@test.com`.

#### b. Luồng thay thế (Alternative Flow)

**AF-01: Giao cho nhiều người cùng lúc**
1. Người dùng chọn `member1@test.com` và `member2@test.com` cùng lúc.
2. Xác nhận.
3. Cả 2 đều xuất hiện trong danh sách người được giao; mỗi người nhận thông báo riêng.

**AF-02: Tìm kiếm thành viên theo tên**
1. Người dùng nhập từ khóa (ví dụ: `member`) vào ô tìm kiếm.
2. Hệ thống hiển thị danh sách gợi ý các thành viên khớp với từ khóa.

#### c. Luồng ngoại lệ (Exception Flow)

**EF-01: Giao cho người đã được giao (FR-ASSIGN-1.2)**
1. `member1@test.com` đã có trong danh sách; người dùng cố giao lại.
2. Hệ thống thông báo người đã được giao; không thêm trùng.

**EF-02: Vượt giới hạn tối đa người được giao (FR-ASSIGN-1.2)**
1. Task đã đủ số người được giao tối đa; người dùng cố giao thêm.
2. Hệ thống thông báo đã đạt giới hạn; không giao thêm.

**EF-03: Giao cho tài khoản không tồn tại (FR-ASSIGN-1.3)**
1. Người dùng nhập email/ID không tồn tại.
2. Hệ thống thông báo không tìm thấy người dùng.

**EF-04: Giao cho tài khoản bị khóa (FR-ASSIGN-1.3)**
1. Người dùng chọn `locked@test.com`.
2. Hệ thống thông báo tài khoản không hợp lệ; không giao được.

**EF-05: Giao cho người không thuộc nhóm (FR-ASSIGN-1.3)**
1. Người dùng tìm và chọn `outsider@test.com` (hợp lệ nhưng không trong nhóm).
2. Hệ thống thông báo người dùng không phải thành viên nhóm; không giao được.

---

### 6.1.4. Dữ liệu vào
- ID/email/tên thành viên cần giao việc
- Xác nhận phân công

### 6.1.5. Dữ liệu ra
- Danh sách người được giao cập nhật ngay
- Thông báo cho người được giao: "Bạn được giao task [tên task]"
- Task xuất hiện trong "Giao cho tôi" của người được giao
- Thông báo lỗi chi tiết khi giao thất bại

---

### 6.1.6. Quy tắc nghiệp vụ
- Chỉ người có quyền phân công mới được thực hiện (C-4).
- Không cho phép giao trùng — mỗi thành viên chỉ xuất hiện một lần trong danh sách.
- Hệ thống có giới hạn tối đa số người được giao trên một công việc; vượt giới hạn thì bị từ chối.
- Chỉ giao được cho thành viên đang hoạt động và thuộc nhóm sở hữu công việc.
- Người được giao nhận thông báo ngay; công việc xuất hiện trong "Giao cho tôi" của họ (liên kết FR-TASK-8).

---

### 6.1.7. Điều kiện tiền đề và ràng buộc
- Người dùng phải đang đăng nhập và có quyền phân công trong nhóm.
- Task phải tồn tại và chưa bị xóa.
- Cần có tài khoản test: `member1@test.com`, `member2@test.com` (thành viên hợp lệ), `locked@test.com` (bị khóa), `outsider@test.com` (không thuộc nhóm).

---

### 6.1.8. Mức độ ưu tiên
**Mức độ ưu tiên: Cao**

**Lý do:**  
Phân công là cơ chế cốt lõi để xác định trách nhiệm thực hiện công việc; không có phân công, việc theo dõi tiến độ theo người không thể thực hiện được.

---

### 6.1.9. Tiêu chí chấp nhận
- Giao diện phân công hiển thị ô tìm kiếm và danh sách thành viên nhóm.
- Tìm kiếm theo tên `member` → hiển thị gợi ý đúng.
- Giao `member1@test.com` → xuất hiện ngay trong danh sách; không cần reload.
- Giao `member1@test.com` và `member2@test.com` cùng lúc → cả 2 xuất hiện.
- `member1@test.com` nhận thông báo "Bạn được giao task..." với tên task.
- Task xuất hiện trong "Giao cho tôi" của `member1@test.com`.
- Giao lại người đã có trong danh sách → thông báo đã được giao; không trùng.
- Vượt giới hạn tối đa → thông báo đã đạt giới hạn; không giao thêm.
- Giao tài khoản không tồn tại → thông báo không tìm thấy.
- Giao `locked@test.com` → thông báo tài khoản không hợp lệ.
- Giao `outsider@test.com` → thông báo không phải thành viên nhóm.
- Phân công persist sau reload và đăng nhập lại.

---

### 6.1.10. Ghi chú
- Các test case tham chiếu: `TC_ASSIGN_ADD_01` đến `TC_ASSIGN_ADD_14` (file `TC_ASSIGN_ADD.md`).
- `TC_ASSIGN_ADD_04` cần setup task đã đủ số assignee tối đa trước khi test.
- `TC_ASSIGN_ADD_11` xác nhận `member1@test.com` nhận thông báo sau khi được giao.
- `TC_ASSIGN_ADD_12` xác nhận danh sách cập nhật ngay không cần reload.
- `TC_ASSIGN_ADD_13` xác nhận task xuất hiện trong "Giao cho tôi" của người nhận; liên kết FR-TASK-8.
- `TC_ASSIGN_ADD_14` xác nhận persist sau reload và đăng nhập lại.
- Liên kết ràng buộc C-4; liên kết FR-TASK-8 (Xem công việc được giao cho tôi).
