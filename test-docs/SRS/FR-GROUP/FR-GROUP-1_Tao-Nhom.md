## 6.1. Chức năng Tạo nhóm

### 6.1.1. Mô tả chức năng

Chức năng Tạo nhóm cho phép người dùng đã đăng nhập khởi tạo một nhóm làm việc (workspace nhóm) mới trong hệ thống. Người dùng cung cấp tên nhóm (bắt buộc) và mô tả tùy chọn. Sau khi tạo thành công, nhóm mới xuất hiện ngay trong danh sách nhóm và người tạo được tự động thêm vào nhóm với vai trò Owner/Admin.

---

### 6.1.2. Yêu cầu chức năng

**FR-GROUP-1-01:** Hệ thống phải cung cấp form tạo nhóm với tối thiểu hai trường: Tên nhóm (bắt buộc) và Mô tả (tùy chọn).

**FR-GROUP-1-02:** Hệ thống phải từ chối tạo nhóm nếu tên nhóm bị để trống hoặc chỉ chứa khoảng trắng.

**FR-GROUP-1-03:** Hệ thống phải giới hạn tên nhóm tối đa 256 ký tự; từ chối nếu vượt quá.

**FR-GROUP-1-04:** Hệ thống phải giới hạn mô tả nhóm tối đa 2000 ký tự; từ chối nếu vượt quá.

**FR-GROUP-1-05:** Hệ thống phải hỗ trợ tên nhóm chứa ký tự đặc biệt và tiếng Việt có dấu.

**FR-GROUP-1-06:** Khi tạo nhóm thành công, hệ thống phải tự động thêm người tạo vào nhóm với vai trò Owner/Admin.

**FR-GROUP-1-07:** Khi tạo nhóm thành công, nhóm mới phải xuất hiện ngay trong danh sách nhóm mà không cần tải lại trang.

**FR-GROUP-1-08:** Hệ thống phải hiển thị thông báo thành công sau khi tạo nhóm.

---

### 6.1.3. Đặc tả Use Case

**Tên Use Case:** Tạo nhóm làm việc mới  
**Mã Use Case:** UC-GROUP-CREATE-01

**Mô tả:**  
Người dùng khởi tạo nhóm làm việc mới bằng cách cung cấp tên nhóm và mô tả tùy chọn. Hệ thống tạo nhóm, tự động bổ sung người tạo làm thành viên Owner và hiển thị nhóm trong danh sách ngay lập tức.

**Tác nhân chính:**  
Người dùng đã đăng nhập

**Tiền điều kiện:**
- Người dùng đã đăng nhập thành công.
- Ứng dụng đang hoạt động bình thường.

**Kích hoạt:**  
Người dùng nhấn nút "Tạo nhóm" và điền thông tin vào form.

**Hậu điều kiện:**
- Nếu thành công: nhóm mới được tạo, người tạo là thành viên Owner, nhóm hiển thị ngay trong danh sách.
- Nếu thất bại: nhóm không được tạo, thông báo lỗi hiển thị tại trường tương ứng.

#### a. Luồng chính (Basic Flow)
1. Người dùng vào màn hình quản lý nhóm và nhấn nút "Tạo nhóm".
2. Hệ thống hiển thị form tạo nhóm với trường Tên nhóm (bắt buộc) và Mô tả (tùy chọn).
3. Người dùng nhập tên nhóm hợp lệ (và mô tả nếu muốn).
4. Người dùng nhấn nút "Tạo".
5. Hệ thống kiểm tra tên nhóm không trống và không vượt quá 256 ký tự.
6. Hệ thống kiểm tra mô tả (nếu có) không vượt quá 2000 ký tự.
7. Hệ thống tạo nhóm mới trong cơ sở dữ liệu.
8. Hệ thống tự động thêm người tạo vào nhóm với vai trò Owner/Admin.
9. Hệ thống hiển thị thông báo tạo nhóm thành công.
10. Nhóm mới xuất hiện ngay trong danh sách nhóm của người dùng mà không cần tải lại trang.

#### b. Luồng thay thế (Alternative Flow)

**AF-01: Tạo nhóm chỉ với tên (không nhập mô tả)**
1. Người dùng chỉ nhập tên nhóm, để trống mô tả.
2. Hệ thống tạo nhóm thành công với mô tả trống.

#### c. Luồng ngoại lệ (Exception Flow)

**EF-01: Tên nhóm bị để trống hoặc chỉ chứa khoảng trắng**
1. Người dùng không nhập tên nhóm (hoặc chỉ nhập khoảng trắng) và nhấn "Tạo".
2. Hệ thống phát hiện tên nhóm không hợp lệ (sau khi trim).
3. Hệ thống hiển thị thông báo lỗi tại trường Tên nhóm; nhóm không được tạo.

**EF-02: Tên nhóm vượt quá 256 ký tự**
1. Người dùng nhập tên nhóm dài hơn 256 ký tự và nhấn "Tạo".
2. Hệ thống phát hiện vi phạm giới hạn độ dài.
3. Hệ thống hiển thị thông báo lỗi; nhóm không được tạo.

**EF-03: Mô tả vượt quá 2000 ký tự**
1. Người dùng nhập mô tả dài hơn 2000 ký tự và nhấn "Tạo".
2. Hệ thống phát hiện vi phạm giới hạn.
3. Hệ thống hiển thị thông báo lỗi; nhóm không được tạo.

---

### 6.1.4. Dữ liệu vào
- Tên nhóm (chuỗi ký tự, tối đa 256 ký tự, không trống, bắt buộc)
- Mô tả nhóm (chuỗi ký tự, tối đa 2000 ký tự, tùy chọn)

### 6.1.5. Dữ liệu ra
- Nhóm mới được tạo trong hệ thống
- Người tạo được thêm tự động làm thành viên Owner của nhóm
- Nhóm mới hiển thị ngay trong danh sách nhóm
- Thông báo thành công hoặc lỗi tương ứng

---

### 6.1.6. Quy tắc nghiệp vụ
- Tên nhóm là trường bắt buộc; không chấp nhận giá trị trống hoặc chỉ khoảng trắng.
- Tên nhóm tối đa 256 ký tự; mô tả tối đa 2000 ký tự.
- Người tạo nhóm tự động trở thành thành viên Owner/Admin của nhóm đó.
- Tên nhóm hỗ trợ ký tự đặc biệt và tiếng Việt có dấu.
- Nhóm mới hiển thị ngay trên giao diện sau khi tạo thành công mà không cần tải lại trang.

---

### 6.1.7. Điều kiện tiền đề và ràng buộc
- Người dùng phải đang trong trạng thái đăng nhập hợp lệ.
- Cơ sở dữ liệu phải truy cập được để lưu thông tin nhóm và quan hệ thành viên.

---

### 6.1.8. Mức độ ưu tiên
**Mức độ ưu tiên: Cao**

**Lý do:**  
Nhóm là đơn vị làm việc cơ bản của hệ thống. Không có nhóm, người dùng không thể tạo công việc, folder hay sử dụng các tính năng cộng tác.

---

### 6.1.9. Tiêu chí chấp nhận
- Nhập tên nhóm hợp lệ → nhóm được tạo thành công, xuất hiện ngay trong danh sách.
- Tên nhóm trống hoặc chỉ khoảng trắng → lỗi, không tạo.
- Tên nhóm đúng 256 ký tự → tạo thành công (boundary).
- Tên nhóm 257 ký tự → lỗi (boundary+1).
- Mô tả đúng 2000 ký tự → tạo thành công (boundary).
- Mô tả 2001 ký tự → lỗi (boundary+1).
- Tên nhóm có ký tự đặc biệt/tiếng Việt → tạo thành công, tên hiển thị đúng.
- Sau khi tạo, người tạo xuất hiện trong danh sách thành viên với vai trò Owner/Admin.
- Nhóm mới hiển thị ngay trong danh sách mà không cần reload trang.

---

### 6.1.10. Ghi chú
- Các test case tham chiếu: `TC_GROUP_CREATE_01` đến `TC_GROUP_CREATE_14` (file `TC_GROUP_CREATE.md`).
- `TC_GROUP_CREATE_05` xác nhận tên nhóm chỉ khoảng trắng bị từ chối (trim trước validate).
- `TC_GROUP_CREATE_06/07` kiểm tra boundary 256/257 ký tự cho tên nhóm.
- `TC_GROUP_CREATE_08/09` kiểm tra boundary 2000/2001 ký tự cho mô tả.
- `TC_GROUP_CREATE_13` xác nhận người tạo tự động được thêm làm thành viên Owner.
- `TC_GROUP_CREATE_14` xác nhận nhóm mới hiển thị ngay, không cần reload.
