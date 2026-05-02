## 7.4. Chức năng Cập nhật công việc

### 7.4.1. Mô tả chức năng

Chức năng Cập nhật công việc cho phép thành viên có quyền chỉnh sửa nội dung, trạng thái, độ ưu tiên và ngày đến hạn của công việc. Thay đổi phải được lưu bền vững (persist sau reload, đăng nhập lại) và hiển thị ngay lập tức trên chi tiết và danh sách; thành viên khác trong nhóm cũng thấy thay đổi này. Người không có quyền sửa không được thấy nút chỉnh sửa và bị từ chối nếu cố gửi request trực tiếp.

---

### 7.4.2. Yêu cầu chức năng

**FR-TASK-4-01:** Hệ thống phải cho phép người dùng có quyền chỉnh sửa mở form cập nhật công việc; form phải hiển thị đúng giá trị hiện tại của tất cả trường.

**FR-TASK-4-02:** Hệ thống phải ẩn hoặc vô hiệu hóa nút chỉnh sửa với người dùng không có quyền sửa.

**FR-TASK-4-03:** Hệ thống phải từ chối cập nhật nếu tiêu đề trống hoặc chỉ khoảng trắng; hiển thị thông báo lỗi.

**FR-TASK-4-04:** Hệ thống phải từ chối nếu tiêu đề vượt 200 ký tự (ràng buộc C-10).

**FR-TASK-4-05:** Hệ thống phải từ chối nếu mô tả vượt 2000 ký tự (ràng buộc C-10).

**FR-TASK-4-06:** Hệ thống phải cập nhật tất cả trường hợp lệ: tiêu đề, mô tả, trạng thái, độ ưu tiên, ngày đến hạn.

**FR-TASK-4-07:** Thay đổi phải hiển thị ngay trên trang chi tiết và danh sách sau khi lưu.

**FR-TASK-4-08:** Thay đổi phải persist sau reload và đăng nhập lại.

**FR-TASK-4-09:** Thành viên khác trong nhóm phải thấy được thay đổi.

**FR-TASK-4-10:** Người không có quyền cố gửi request cập nhật qua API/URL phải bị từ chối; hệ thống trả về thông báo không có quyền.

---

### 7.4.3. Đặc tả Use Case

**Tên Use Case:** Cập nhật thông tin công việc  
**Mã Use Case:** UC-TASK-UPDATE-01

**Mô tả:**  
Người dùng có quyền chỉnh sửa mở form cập nhật công việc, thay đổi thông tin và lưu. Hệ thống xác thực dữ liệu, lưu thay đổi và phản ánh ngay trên giao diện.

**Tác nhân chính:**  
Thành viên nhóm có quyền chỉnh sửa công việc

**Tiền điều kiện:**
- Người dùng đã đăng nhập và có quyền sửa công việc trong nhóm.
- Công việc tồn tại và chưa bị xóa.

**Kích hoạt:**  
Người dùng nhấn nút chỉnh sửa trên trang chi tiết công việc.

**Hậu điều kiện:**
- Nếu thành công: thay đổi được lưu, hiển thị ngay trên giao diện và persist sau reload.
- Nếu thất bại (validation): thông báo lỗi hiển thị; dữ liệu cũ không bị thay đổi.

#### a. Luồng chính (Basic Flow)
1. Người dùng mở trang chi tiết công việc.
2. Người dùng nhấn nút chỉnh sửa.
3. Hệ thống hiển thị form với giá trị hiện tại của tất cả trường.
4. Người dùng thay đổi một hoặc nhiều trường.
5. Người dùng nhấn "Lưu".
6. Hệ thống kiểm tra tiêu đề không trống và không vượt 200 ký tự.
7. Hệ thống kiểm tra mô tả (nếu có) không vượt 2000 ký tự.
8. Hệ thống lưu thay đổi vào cơ sở dữ liệu.
9. Hệ thống hiển thị ngay giá trị mới trên trang chi tiết và danh sách.

#### b. Luồng thay thế (Alternative Flow)

**AF-01: Cập nhật chỉ trạng thái**
1. Người dùng thay đổi trạng thái (ví dụ: từ `Todo` → `Done`).
2. Hệ thống lưu và hiển thị trạng thái mới ngay; nếu có Kanban thì task chuyển cột đúng.

**AF-02: Cập nhật ngày đến hạn**
1. Người dùng chọn ngày đến hạn mới hợp lệ.
2. Hệ thống lưu và hiển thị ngày mới; lịch cập nhật đúng vị trí.

#### c. Luồng ngoại lệ (Exception Flow)

**EF-01: Tiêu đề trống hoặc chỉ khoảng trắng**
1. Người dùng xóa hoặc chỉ để khoảng trắng trong tiêu đề rồi nhấn "Lưu".
2. Hệ thống hiển thị thông báo lỗi; không lưu thay đổi.

**EF-02: Tiêu đề vượt 200 ký tự**
1. Người dùng nhập tiêu đề dài hơn 200 ký tự rồi nhấn "Lưu".
2. Hệ thống hiển thị thông báo lỗi; không lưu thay đổi.

**EF-03: Mô tả vượt 2000 ký tự**
1. Người dùng nhập mô tả dài hơn 2000 ký tự rồi nhấn "Lưu".
2. Hệ thống hiển thị thông báo lỗi; không lưu thay đổi.

**EF-04: Người không có quyền cố chỉnh sửa**
1. Người dùng không có quyền cố gửi request cập nhật trực tiếp.
2. Hệ thống từ chối và trả về thông báo không có quyền; dữ liệu không thay đổi.

---

### 7.4.4. Dữ liệu vào
- Tiêu đề mới (tối đa 200 ký tự, không trống)
- Mô tả mới (tối đa 2000 ký tự, tùy chọn)
- Trạng thái mới (từ danh sách hợp lệ)
- Độ ưu tiên mới (từ danh sách hợp lệ)
- Ngày đến hạn mới (ngày hợp lệ, tùy chọn)

### 7.4.5. Dữ liệu ra
- Công việc được cập nhật với thông tin mới
- Giao diện phản ánh ngay thay đổi
- Thông báo thành công hoặc lỗi tại trường tương ứng

---

### 7.4.6. Quy tắc nghiệp vụ
- Chỉ người có quyền mới có thể chỉnh sửa; người không có quyền không thấy nút sửa (C-4).
- Tiêu đề bắt buộc, không được trống, tối đa 200 ký tự (C-10).
- Mô tả tối đa 2000 ký tự (C-10).
- Thay đổi phải persist sau reload và đăng nhập lại (NFR-SEC).
- Thành viên khác trong nhóm phải thấy thay đổi.

---

### 7.4.7. Điều kiện tiền đề và ràng buộc
- Người dùng phải đang đăng nhập và có quyền chỉnh sửa công việc.
- Công việc phải tồn tại và chưa bị xóa.
- Cơ sở dữ liệu phải truy cập được.

---

### 7.4.8. Mức độ ưu tiên
**Mức độ ưu tiên: Cao**

**Lý do:**  
Cập nhật công việc là thao tác thường xuyên nhất trong quản lý tiến độ; gồm cả việc chuyển trạng thái — luồng nghiệp vụ cốt lõi.

---

### 7.4.9. Tiêu chí chấp nhận
- Người có quyền mở form → form hiển thị đúng giá trị hiện tại.
- Người không có quyền → nút sửa không hiển thị/bị disable.
- Cập nhật tiêu đề hợp lệ → lưu thành công; hiển thị ngay.
- Cập nhật trạng thái → hiển thị ngay trên chi tiết và danh sách.
- Cập nhật độ ưu tiên → hiển thị đúng.
- Cập nhật ngày đến hạn → hiển thị đúng.
- Tiêu đề trống → lỗi, không lưu.
- Tiêu đề 201 ký tự → lỗi, không lưu.
- Mô tả 2001 ký tự → lỗi, không lưu.
- Thay đổi persist sau reload và đăng nhập lại.
- Thành viên khác xem task → thấy thay đổi mới.
- Người không quyền gửi request API → bị từ chối.

---

### 7.4.10. Ghi chú
- Các test case tham chiếu: `TC_TASK_UPDATE_01` đến `TC_TASK_UPDATE_16` (file `TC_TASK_UPDATE.md`).
- `TC_TASK_UPDATE_02` xác nhận người không quyền không thấy nút sửa.
- `TC_TASK_UPDATE_06/07` boundary 200/201 ký tự tiêu đề.
- `TC_TASK_UPDATE_08` boundary 2001 ký tự mô tả.
- `TC_TASK_UPDATE_13` xác nhận từ chối request cập nhật trực tiếp khi không có quyền.
- `TC_TASK_UPDATE_14` xác nhận persist sau reload.
- `TC_TASK_UPDATE_15` xác nhận thành viên khác thấy thay đổi.
- `TC_TASK_UPDATE_16` xác nhận thay đổi trạng thái phản ánh đúng trên danh sách và bộ lọc.
- Pre-condition: tài khoản `viewer@test.com` phải có trong nhóm với quyền chỉ xem.
- Liên kết ràng buộc C-4, C-10.
