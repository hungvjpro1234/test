## 7.10. Chức năng Liên kết công việc

### 7.10.1. Mô tả chức năng

Chức năng Liên kết công việc cho phép người dùng tạo mối quan hệ tham chiếu hai chiều giữa hai công việc. Khi hai công việc được liên kết, mỗi công việc đều hiển thị công việc kia trong phần liên kết của trang chi tiết. Người dùng có thể tìm kiếm task để liên kết, xóa liên kết đã tạo. Xóa liên kết từ một phía thì mối quan hệ sẽ biến mất ở cả hai phía. Hệ thống ngăn liên kết trùng, liên kết vòng (task với chính nó) và liên kết với task không tồn tại.

---

### 7.10.2. Yêu cầu chức năng

**FR-TASK-10-01:** Hệ thống phải cung cấp tùy chọn "Liên kết công việc" trong trang chi tiết task.

**FR-TASK-10-02:** Hệ thống phải cung cấp giao diện tìm kiếm task để liên kết; hiển thị danh sách task có thể liên kết.

**FR-TASK-10-03:** Sau khi liên kết thành công, task được liên kết phải xuất hiện trong phần liên kết của trang chi tiết task nguồn.

**FR-TASK-10-04:** Liên kết phải là hai chiều: cả hai task đều thấy nhau trong phần liên kết.

**FR-TASK-10-05:** Hệ thống phải từ chối liên kết với task không tồn tại; hiển thị thông báo không tìm thấy.

**FR-TASK-10-06:** Hệ thống phải ngăn liên kết task với chính nó (liên kết vòng tự tham chiếu).

**FR-TASK-10-07:** Hệ thống phải ngăn tạo liên kết trùng đã tồn tại; hiển thị thông báo liên kết đã có.

**FR-TASK-10-08:** Người dùng phải có thể xóa liên kết từ phần chi tiết của một trong hai task.

**FR-TASK-10-09:** Khi xóa liên kết từ một phía, mối quan hệ phải biến mất ở cả hai task.

**FR-TASK-10-10:** Nhấp vào task liên kết trong phần liên kết phải mở trang chi tiết của task đó.

**FR-TASK-10-11:** Liên kết phải persist sau reload; thành viên khác cũng thấy liên kết.

---

### 7.10.3. Đặc tả Use Case

**Tên Use Case:** Liên kết hai công việc với nhau  
**Mã Use Case:** UC-TASK-LINK-01

**Mô tả:**  
Người dùng tạo mối quan hệ tham chiếu giữa hai công việc để chỉ ra sự liên quan (ví dụ: phụ thuộc, liên quan). Liên kết hiển thị hai chiều trên cả hai trang chi tiết.

**Tác nhân chính:**  
Thành viên nhóm đã đăng nhập và có quyền xem công việc

**Tiền điều kiện:**
- Người dùng đã đăng nhập và là thành viên nhóm.
- Tồn tại ít nhất hai công việc: task nguồn (Task Link Source) và task đích (Task Link Target).
- Task nguồn chưa có liên kết với Task Link Target.

**Kích hoạt:**  
Người dùng nhấp vào tùy chọn "Liên kết" trong trang chi tiết Task Link Source.

**Hậu điều kiện:**
- Nếu thành công: liên kết hai chiều được tạo; cả hai task hiển thị nhau trong phần liên kết.
- Nếu thất bại: không có liên kết nào được tạo; thông báo lỗi tương ứng.

#### a. Luồng chính (Basic Flow)
1. Người dùng mở trang chi tiết Task Link Source.
2. Người dùng nhấp vào tùy chọn "Liên kết" hoặc "Link task".
3. Hệ thống hiển thị giao diện tìm kiếm task với ô tìm kiếm.
4. Người dùng tìm và chọn Task Link Target.
5. Người dùng xác nhận liên kết.
6. Hệ thống kiểm tra: Task Link Target tồn tại, chưa liên kết với nguồn, không phải task nguồn.
7. Hệ thống tạo liên kết hai chiều giữa Task Link Source và Task Link Target.
8. Hệ thống thông báo thành công; Task Link Target xuất hiện trong phần liên kết của Task Link Source.
9. Khi mở Task Link Target, Task Link Source cũng xuất hiện trong phần liên kết.

#### b. Luồng thay thế (Alternative Flow)

**AF-01: Nhấp vào task liên kết để xem chi tiết**
1. Người dùng nhấp vào task được liên kết trong phần liên kết.
2. Hệ thống mở trang chi tiết của task đó.

**AF-02: Xóa liên kết**
1. Người dùng mở trang chi tiết Task Link Source.
2. Người dùng tìm Task Link Target trong phần liên kết và nhấn xóa liên kết.
3. Hệ thống thông báo thành công; Task Link Target biến mất khỏi phần liên kết của Task Link Source.
4. Khi mở Task Link Target, Task Link Source cũng không còn trong phần liên kết.

**AF-03: Thành viên khác xem liên kết**
1. Thành viên khác mở trang chi tiết Task Link Source.
2. Task Link Target vẫn hiển thị trong phần liên kết với thành viên đó.

#### c. Luồng ngoại lệ (Exception Flow)

**EF-01: Liên kết với task không tồn tại**
1. Người dùng nhập ID/tên task không tồn tại trong giao diện tìm kiếm.
2. Hệ thống hiển thị thông báo không tìm thấy task; không tạo liên kết.

**EF-02: Cố liên kết task với chính nó**
1. Người dùng cố liên kết Task Link Source với chính nó.
2. Hệ thống ngăn và hiển thị thông báo lỗi; không tạo liên kết vòng.

**EF-03: Liên kết trùng đã có**
1. Người dùng cố liên kết lại Task Link Source với Task Link Target khi đã có liên kết.
2. Hệ thống thông báo liên kết đã tồn tại; không tạo liên kết trùng.

---

### 7.10.4. Dữ liệu vào
- ID/tên task đích cần liên kết
- Thao tác xác nhận liên kết hoặc xóa liên kết

### 7.10.5. Dữ liệu ra
- Liên kết hai chiều được tạo; hiển thị trong phần liên kết của cả hai task
- Thông báo thành công khi tạo/xóa liên kết
- Thông báo lỗi khi: task không tồn tại, liên kết vòng, liên kết trùng

---

### 7.10.6. Quy tắc nghiệp vụ
- Liên kết là hai chiều: tạo liên kết A↔B thì cả A và B đều thấy nhau trong phần liên kết (C-3).
- Không cho phép liên kết task với chính nó (liên kết vòng tự tham chiếu).
- Không cho phép tạo liên kết trùng (A↔B đã tồn tại thì không tạo lại).
- Xóa liên kết từ một phía xóa toàn bộ mối quan hệ ở cả hai phía (C-3).
- Liên kết persist sau reload; đồng bộ với tất cả thành viên nhóm.

---

### 7.10.7. Điều kiện tiền đề và ràng buộc
- Người dùng phải đang đăng nhập và là thành viên nhóm.
- Cả hai task (nguồn và đích) phải tồn tại.
- Cơ sở dữ liệu phải truy cập được.
- Task nguồn chưa được liên kết với task đích (để tránh liên kết trùng).

---

### 7.10.8. Mức độ ưu tiên
**Mức độ ưu tiên: Thấp - Trung bình**

**Lý do:**  
Liên kết công việc là tính năng bổ trợ giúp ghi nhận mối quan hệ giữa các task; không phải luồng nghiệp vụ bắt buộc nhưng nâng cao chất lượng quản lý dự án phức tạp.

---

### 7.10.9. Tiêu chí chấp nhận
- Tùy chọn "Liên kết" tồn tại trong chi tiết task.
- Giao diện tìm kiếm task hiện với ô tìm kiếm và danh sách task có thể liên kết.
- Liên kết Task Link Source ↔ Task Link Target thành công → Task Link Target xuất hiện trong phần liên kết của Task Link Source.
- Mở Task Link Target → Task Link Source cũng hiện trong phần liên kết (liên kết 2 chiều).
- Click vào task liên kết → mở trang chi tiết của task đó.
- Cố liên kết task không tồn tại → thông báo không tìm thấy; không tạo liên kết.
- Cố liên kết task với chính nó → thông báo lỗi; không tạo liên kết.
- Cố liên kết trùng → thông báo đã tồn tại; không tạo thêm.
- Xóa liên kết từ Task Link Source → Task Link Target biến mất ở cả hai task.
- Liên kết persist sau reload.
- Thành viên khác mở task → thấy liên kết.

---

### 7.10.10. Ghi chú
- Các test case tham chiếu: `TC_TASK_LINK_01` đến `TC_TASK_LINK_13` (file `TC_TASK_LINK.md`).
- `TC_TASK_LINK_04` xác nhận từ chối liên kết với task không tồn tại.
- `TC_TASK_LINK_05` xác nhận ngăn liên kết task với chính nó (tùy thuộc vào business rule có bật không).
- `TC_TASK_LINK_06` xác nhận ngăn liên kết trùng.
- `TC_TASK_LINK_08` xác nhận liên kết hiển thị hai chiều.
- `TC_TASK_LINK_11` xác nhận xóa liên kết biến mất ở cả hai task.
- `TC_TASK_LINK_12` xác nhận persist sau reload.
- `TC_TASK_LINK_13` xác nhận thành viên khác thấy liên kết.
- Pre-condition: Task Link Source và Task Link Target phải tồn tại trong `Group Task Test` trước khi test.
- Liên kết ràng buộc C-3.
