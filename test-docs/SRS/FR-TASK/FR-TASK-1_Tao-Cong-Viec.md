## 7.1. Chức năng Tạo công việc

### 7.1.1. Mô tả chức năng

Chức năng Tạo công việc cho phép thành viên nhóm khởi tạo công việc (task) mới trong nhóm đang làm việc. Người dùng phải cung cấp tiêu đề (bắt buộc) và có thể bổ sung các trường tùy chọn: mô tả, trạng thái, độ ưu tiên, ngày đến hạn và nhãn. Công việc mới xuất hiện ngay trong danh sách mà không cần tải lại trang. Người dùng phải đang trong ngữ cảnh một nhóm cụ thể trước khi tạo công việc.

---

### 7.1.2. Yêu cầu chức năng

**FR-TASK-1-01:** Hệ thống phải cung cấp form tạo công việc với các trường: Tiêu đề (bắt buộc), Mô tả, Trạng thái, Độ ưu tiên, Ngày đến hạn và Nhãn.

**FR-TASK-1-02:** Hệ thống phải từ chối tạo nếu tiêu đề bị để trống hoặc chỉ chứa khoảng trắng.

**FR-TASK-1-03:** Hệ thống phải giới hạn tiêu đề tối đa 200 ký tự; từ chối nếu vượt quá (ràng buộc C-10).

**FR-TASK-1-04:** Hệ thống phải giới hạn mô tả tối đa 2000 ký tự; từ chối nếu vượt quá (ràng buộc C-10).

**FR-TASK-1-05:** Hệ thống phải chỉ chấp nhận trạng thái thuộc danh sách hợp lệ (Todo, In Progress, Done…); từ chối giá trị ngoài danh sách.

**FR-TASK-1-06:** Hệ thống phải chỉ chấp nhận độ ưu tiên thuộc danh sách hợp lệ (Low, Medium, High…); từ chối giá trị ngoài danh sách.

**FR-TASK-1-07:** Hệ thống phải giới hạn tối đa 10 nhãn trên một công việc; từ chối thêm nhãn thứ 11 (ràng buộc C-9).

**FR-TASK-1-08:** Hệ thống phải giới hạn mỗi nhãn tối đa 30 ký tự; từ chối nhãn dài hơn (ràng buộc C-9).

**FR-TASK-1-09:** Hệ thống phải yêu cầu người dùng đang trong ngữ cảnh nhóm trước khi tạo công việc; thông báo yêu cầu chọn nhóm nếu chưa.

**FR-TASK-1-10:** Khi tạo thành công, công việc mới phải xuất hiện ngay trong danh sách mà không cần tải lại trang.

---

### 7.1.3. Đặc tả Use Case

**Tên Use Case:** Tạo công việc mới trong nhóm  
**Mã Use Case:** UC-TASK-CREATE-01

**Mô tả:**  
Thành viên nhóm tạo công việc mới bằng cách điền tiêu đề và các thông tin tùy chọn. Hệ thống xác thực dữ liệu và thêm công việc vào danh sách nhóm ngay lập tức.

**Tác nhân chính:**  
Thành viên nhóm đã đăng nhập

**Tiền điều kiện:**
- Người dùng đã đăng nhập thành công.
- Người dùng đang trong ngữ cảnh một nhóm cụ thể (đã chọn nhóm làm việc).
- Người dùng có quyền tạo công việc trong nhóm.

**Kích hoạt:**  
Người dùng nhấn nút "Tạo công việc" và điền thông tin vào form.

**Hậu điều kiện:**
- Nếu thành công: công việc mới được tạo và hiển thị ngay trong danh sách.
- Nếu thất bại: không có công việc nào được tạo; thông báo lỗi hiển thị tại trường tương ứng.

#### a. Luồng chính (Basic Flow)
1. Người dùng nhấn nút "Tạo công việc" trong nhóm đang làm việc.
2. Hệ thống hiển thị form tạo công việc với các trường: Tiêu đề, Mô tả, Trạng thái, Độ ưu tiên, Ngày đến hạn, Nhãn.
3. Người dùng nhập tiêu đề hợp lệ và các trường tùy chọn.
4. Người dùng nhấn "Tạo".
5. Hệ thống kiểm tra tiêu đề không trống và không vượt 200 ký tự.
6. Hệ thống kiểm tra mô tả (nếu có) không vượt 2000 ký tự.
7. Hệ thống kiểm tra trạng thái và độ ưu tiên thuộc danh sách hợp lệ.
8. Hệ thống kiểm tra số lượng nhãn (≤ 10) và độ dài từng nhãn (≤ 30 ký tự).
9. Hệ thống tạo công việc mới gắn với nhóm hiện tại.
10. Công việc mới xuất hiện ngay trong danh sách, không cần tải lại trang.

#### b. Luồng thay thế (Alternative Flow)

**AF-01: Tạo công việc chỉ với tiêu đề**
1. Người dùng chỉ nhập tiêu đề, để trống các trường còn lại.
2. Hệ thống tạo công việc với trạng thái và độ ưu tiên mặc định.

#### c. Luồng ngoại lệ (Exception Flow)

**EF-01: Tiêu đề trống hoặc chỉ khoảng trắng**
1. Người dùng không nhập tiêu đề (hoặc chỉ nhập khoảng trắng) và nhấn "Tạo".
2. Hệ thống hiển thị thông báo lỗi tại trường Tiêu đề; công việc không được tạo.

**EF-02: Tiêu đề vượt 200 ký tự**
1. Người dùng nhập tiêu đề dài hơn 200 ký tự.
2. Hệ thống hiển thị thông báo lỗi; công việc không được tạo.

**EF-03: Mô tả vượt 2000 ký tự**
1. Người dùng nhập mô tả dài hơn 2000 ký tự.
2. Hệ thống hiển thị thông báo lỗi; công việc không được tạo.

**EF-04: Thêm hơn 10 nhãn**
1. Người dùng cố thêm nhãn thứ 11.
2. Hệ thống ngăn thêm và hiển thị thông báo đã đạt giới hạn 10 nhãn.

**EF-05: Nhãn vượt 30 ký tự**
1. Người dùng nhập nhãn dài hơn 30 ký tự.
2. Hệ thống hiển thị thông báo lỗi; nhãn không được thêm.

**EF-06: Chưa chọn nhóm làm việc**
1. Người dùng cố truy cập tính năng tạo công việc mà không đang trong ngữ cảnh nhóm nào.
2. Hệ thống hiển thị thông báo yêu cầu chọn nhóm trước; không hiển thị form tạo.

---

### 7.1.4. Dữ liệu vào
- Tiêu đề (tối đa 200 ký tự, không trống, bắt buộc)
- Mô tả (tối đa 2000 ký tự, tùy chọn)
- Trạng thái (từ danh sách hợp lệ, tùy chọn — mặc định Todo)
- Độ ưu tiên (từ danh sách hợp lệ, tùy chọn — mặc định Medium)
- Ngày đến hạn (ngày hợp lệ, tùy chọn)
- Nhãn (tối đa 10 nhãn, mỗi nhãn ≤ 30 ký tự, tùy chọn)

### 7.1.5. Dữ liệu ra
- Công việc mới được tạo gắn với nhóm hiện tại
- Công việc hiển thị ngay trong danh sách
- Thông báo thành công hoặc lỗi chi tiết tại từng trường

---

### 7.1.6. Quy tắc nghiệp vụ
- Tiêu đề là trường bắt buộc; không chấp nhận trống hoặc chỉ khoảng trắng.
- Tiêu đề tối đa 200 ký tự; mô tả tối đa 2000 ký tự (C-10).
- Trạng thái và độ ưu tiên phải nằm trong danh sách hợp lệ do hệ thống định nghĩa.
- Tối đa 10 nhãn trên một công việc; mỗi nhãn tối đa 30 ký tự (C-9).
- Công việc chỉ thuộc về một nhóm duy nhất; không chia sẻ giữa các nhóm (C-3).
- Người dùng phải chọn nhóm đang làm việc trước khi tạo công việc (A-3).

---

### 7.1.7. Điều kiện tiền đề và ràng buộc
- Người dùng phải đang đăng nhập hợp lệ và là thành viên nhóm.
- Người dùng phải đang trong ngữ cảnh nhóm (đã chọn nhóm làm việc).
- Cơ sở dữ liệu phải truy cập được.

---

### 7.1.8. Mức độ ưu tiên
**Mức độ ưu tiên: Cao**

**Lý do:**  
Tạo công việc là tính năng cốt lõi của ứng dụng quản lý công việc. Không có tính năng này, toàn bộ luồng nghiệp vụ chính không thể vận hành.

---

### 7.1.9. Tiêu chí chấp nhận
- Nhập tiêu đề hợp lệ → công việc được tạo, xuất hiện ngay trong danh sách.
- Tiêu đề trống/khoảng trắng → lỗi, không tạo.
- Tiêu đề đúng 200 ký tự → tạo thành công (boundary).
- Tiêu đề 201 ký tự → lỗi (boundary+1).
- Mô tả đúng 2000 ký tự → tạo thành công (boundary).
- Mô tả 2001 ký tự → lỗi (boundary+1).
- Thêm đúng 10 nhãn → tạo thành công; thêm nhãn thứ 11 → bị ngăn.
- Nhãn đúng 30 ký tự → thêm thành công; nhãn 31 ký tự → lỗi.
- Tiêu đề có ký tự đặc biệt/tiếng Việt → tạo thành công.
- Chưa chọn nhóm → thông báo yêu cầu chọn nhóm.
- Công việc mới xuất hiện ngay, không cần reload.

---

### 7.1.10. Ghi chú
- Các test case tham chiếu: `TC_TASK_CREATE_01` đến `TC_TASK_CREATE_20` (file `TC_TASK_CREATE.md`).
- `TC_TASK_CREATE_05` xác nhận tiêu đề chỉ khoảng trắng bị từ chối.
- `TC_TASK_CREATE_06/07` boundary 200/201 ký tự tiêu đề.
- `TC_TASK_CREATE_08/09` boundary 2000/2001 ký tự mô tả.
- `TC_TASK_CREATE_12` boundary 10 nhãn; `TC_TASK_CREATE_14/15` boundary 30/31 ký tự nhãn.
- `TC_TASK_CREATE_19` xác nhận chặn tạo task khi chưa chọn nhóm (A-3).
- `TC_TASK_CREATE_20` xác nhận công việc mới hiển thị ngay, không cần reload.
- Liên kết ràng buộc C-3, C-9, C-10 và giả định A-3.
