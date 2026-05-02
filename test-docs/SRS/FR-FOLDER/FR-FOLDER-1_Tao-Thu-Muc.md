## 4.1. Chức năng Tạo thư mục

### 4.1.1. Mô tả chức năng

Chức năng Tạo thư mục cho phép thành viên nhóm tạo thư mục mới để tổ chức công việc trong nhóm đang làm việc. Tên thư mục là bắt buộc, không được trống hoặc chỉ chứa khoảng trắng, và phải là duy nhất trong phạm vi cùng một nhóm (không thể trùng tên với thư mục đã có trong nhóm). Thư mục mới xuất hiện ngay trong danh sách mà không cần tải lại trang và tồn tại bền vững sau reload. Tên thư mục có thể chứa ký tự đặc biệt và tiếng Việt.

---

### 4.1.2. Yêu cầu chức năng

**FR-FOLDER-1-01:** Hệ thống phải cung cấp form/input tạo thư mục với trường nhập tên và nút xác nhận.

**FR-FOLDER-1-02:** Hệ thống phải từ chối tạo nếu tên thư mục trống hoặc chỉ chứa khoảng trắng; hiển thị thông báo lỗi.

**FR-FOLDER-1-03:** Hệ thống phải từ chối tạo nếu tên thư mục đã tồn tại trong cùng nhóm; hiển thị thông báo lỗi tên đã tồn tại (FR-FOLDER-1.2).

**FR-FOLDER-1-04:** Tên thư mục phải chấp nhận ký tự đặc biệt và tiếng Việt.

**FR-FOLDER-1-05:** Tên thư mục chỉ cần duy nhất trong cùng một nhóm — cho phép trùng tên giữa các nhóm khác nhau.

**FR-FOLDER-1-06:** Sau khi tạo thành công, thư mục mới phải xuất hiện ngay trong danh sách mà không cần tải lại trang; hiển thị thông báo thành công.

**FR-FOLDER-1-07:** Thư mục mới phải persist sau reload.

---

### 4.1.3. Đặc tả Use Case

**Tên Use Case:** Tạo thư mục mới trong nhóm  
**Mã Use Case:** UC-FOLDER-CREATE-01

**Mô tả:**  
Thành viên nhóm tạo thư mục mới để phân loại và tổ chức công việc. Hệ thống xác thực tên và thêm thư mục vào danh sách ngay lập tức.

**Tác nhân chính:**  
Thành viên nhóm đã đăng nhập

**Tiền điều kiện:**
- Người dùng đã đăng nhập và là thành viên của nhóm.
- Người dùng đang trong ngữ cảnh nhóm cụ thể.
- Đã tồn tại thư mục `Existing Folder` trong nhóm (để test trùng tên).

**Kích hoạt:**  
Người dùng nhấn nút "Tạo thư mục" và nhập thông tin.

**Hậu điều kiện:**
- Nếu thành công: thư mục mới xuất hiện ngay trong danh sách và persist sau reload.
- Nếu thất bại: không có thư mục nào được tạo; thông báo lỗi hiển thị.

#### a. Luồng chính (Basic Flow)
1. Người dùng nhấn nút "Tạo thư mục".
2. Hệ thống hiển thị form/input nhập tên thư mục với nút xác nhận.
3. Người dùng nhập tên hợp lệ (không trống, không trùng tên trong nhóm).
4. Người dùng nhấn "Tạo" / "Xác nhận".
5. Hệ thống kiểm tra tên không trống, không chỉ khoảng trắng, không trùng tên trong nhóm.
6. Hệ thống tạo thư mục và thông báo thành công.
7. Thư mục mới xuất hiện ngay trong danh sách mà không cần tải lại trang.

#### b. Luồng thay thế (Alternative Flow)

**AF-01: Tên có ký tự đặc biệt hoặc tiếng Việt**
1. Người dùng nhập tên chứa ký tự đặc biệt hoặc tiếng Việt (ví dụ: `Dự Án #1 & Sprint`).
2. Hệ thống chấp nhận và tạo thành công; tên hiển thị đúng.

**AF-02: Tạo nhiều thư mục khác tên trong cùng nhóm**
1. Người dùng tạo thư mục `New Folder Alpha` rồi `New Folder Beta` trong cùng nhóm.
2. Cả hai đều tạo thành công và hiển thị đầy đủ trong danh sách.

**AF-03: Trùng tên giữa hai nhóm khác nhau**
1. Người dùng tạo thư mục `Alpha` ở nhóm A và nhóm B.
2. Cả hai đều tạo thành công — tên chỉ cần unique trong cùng một nhóm.

#### c. Luồng ngoại lệ (Exception Flow)

**EF-01: Tên thư mục trống hoặc chỉ khoảng trắng**
1. Người dùng để trống tên hoặc chỉ nhập khoảng trắng và nhấn "Tạo".
2. Hệ thống hiển thị thông báo lỗi; thư mục không được tạo.

**EF-02: Tên thư mục đã tồn tại trong nhóm (FR-FOLDER-1.2)**
1. Người dùng nhập tên trùng với thư mục đã có trong nhóm.
2. Hệ thống hiển thị thông báo lỗi tên đã tồn tại; thư mục không được tạo.

---

### 4.1.4. Dữ liệu vào
- Tên thư mục (bắt buộc, không trống, không trùng trong nhóm)

### 4.1.5. Dữ liệu ra
- Thư mục mới được tạo và hiển thị ngay trong danh sách
- Thông báo thành công
- Thông báo lỗi khi tên trống hoặc trùng tên

---

### 4.1.6. Quy tắc nghiệp vụ
- Tên thư mục bắt buộc; không chấp nhận trống hoặc chỉ khoảng trắng.
- Tên thư mục phải là duy nhất trong phạm vi cùng một nhóm; không hạn chế trùng giữa các nhóm (C-3).
- Thư mục mới gắn với nhóm đang làm việc; không chia sẻ giữa các nhóm.

---

### 4.1.7. Điều kiện tiền đề và ràng buộc
- Người dùng phải đang đăng nhập và là thành viên nhóm.
- Người dùng đang trong ngữ cảnh nhóm cụ thể.
- Cơ sở dữ liệu phải truy cập được.

---

### 4.1.8. Mức độ ưu tiên
**Mức độ ưu tiên: Cao**

**Lý do:**  
Thư mục là đơn vị tổ chức công việc cơ bản trong nhóm; không có thư mục thì không thể phân loại task theo mục đích hoặc giai đoạn dự án.

---

### 4.1.9. Tiêu chí chấp nhận
- Form tạo thư mục hiển thị trường nhập tên và nút xác nhận.
- Tên hợp lệ → tạo thành công; thông báo thành công; thư mục xuất hiện ngay trong danh sách.
- Tên trống → lỗi; thư mục không được tạo.
- Tên chỉ khoảng trắng → lỗi; thư mục không được tạo.
- Tên trùng với thư mục đã có trong nhóm → lỗi tên đã tồn tại.
- Tên có ký tự đặc biệt/tiếng Việt → tạo thành công; tên hiển thị đúng.
- Tên trùng giữa 2 nhóm khác nhau → đều tạo thành công (unique chỉ trong nhóm).
- Thư mục persist sau reload.
- Thư mục xuất hiện ngay sau tạo, không cần reload.

---

### 4.1.10. Ghi chú
- Các test case tham chiếu: `TC_FOLDER_CREATE_01` đến `TC_FOLDER_CREATE_12` (file `TC_FOLDER_CREATE.md`).
- `TC_FOLDER_CREATE_04` xác nhận tên chỉ khoảng trắng bị từ chối.
- `TC_FOLDER_CREATE_05` xác nhận tên trùng trong cùng nhóm bị từ chối.
- `TC_FOLDER_CREATE_06` ghi nhận hành vi với tên trùng khác hoa/thường — cần xác nhận business rule thực tế.
- `TC_FOLDER_CREATE_10` xác nhận tên chỉ unique trong nhóm; trùng giữa các nhóm khác nhau vẫn được phép.
- `TC_FOLDER_CREATE_11` xác nhận xuất hiện ngay không cần reload.
- `TC_FOLDER_CREATE_12` xác nhận persist sau reload.
- Liên kết ràng buộc C-3.
