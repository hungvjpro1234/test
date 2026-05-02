## 4.5. Chức năng Kiểm soát quyền truy cập thư mục

### 4.5.1. Mô tả chức năng

Chức năng Kiểm soát quyền truy cập thư mục cho phép Admin nhóm giới hạn danh sách thành viên được phép xem một thư mục cụ thể. Thành viên có quyền thấy thư mục và toàn bộ task bên trong; thành viên không có quyền không thấy thư mục trong danh sách và bị chặn kể cả khi truy cập URL trực tiếp. Task bên trong thư mục bị hạn chế cũng không hiển thị trong danh sách task chung của người không có quyền. Admin có thể cấp thêm hoặc thu hồi quyền bất kỳ lúc nào; quyền cập nhật có hiệu lực ngay hoặc sau lần reload. Quyền persist sau reload và đăng nhập lại.

---

### 4.5.2. Yêu cầu chức năng

**FR-FOLDER-5-01:** Hệ thống phải cho phép Admin nhóm mở cài đặt quyền truy cập của thư mục và quản lý danh sách thành viên được phép xem (FR-FOLDER-5.1).

**FR-FOLDER-5-02:** Admin phải có thể thêm thành viên vào danh sách được phép xem thư mục.

**FR-FOLDER-5-03:** Admin phải có thể xóa thành viên khỏi danh sách được phép xem thư mục (thu hồi quyền).

**FR-FOLDER-5-04:** Thành viên có quyền phải thấy thư mục trong danh sách và có thể xem toàn bộ task bên trong thư mục đó.

**FR-FOLDER-5-05:** Thành viên không có quyền phải không thấy thư mục trong danh sách; thư mục không xuất hiện dù là thành viên của nhóm (FR-FOLDER-5.2).

**FR-FOLDER-5-06:** Thành viên không có quyền phải bị chặn truy cập URL trực tiếp của thư mục bị hạn chế; hệ thống hiển thị lỗi hoặc thông báo không có quyền.

**FR-FOLDER-5-07:** Task thuộc thư mục bị hạn chế không được hiển thị trong danh sách task chung của thành viên không có quyền.

**FR-FOLDER-5-08:** Sau khi cấp quyền, thành viên mới được cấp phải thấy thư mục ngay (hoặc sau lần reload đầu tiên).

**FR-FOLDER-5-09:** Sau khi thu hồi quyền, thành viên bị thu hồi phải không còn thấy thư mục.

**FR-FOLDER-5-10:** Quyền truy cập phải persist sau reload và đăng nhập lại.

**FR-FOLDER-5-11:** Quyền truy cập phải là riêng biệt theo từng thành viên — không ảnh hưởng lẫn nhau.

---

### 4.5.3. Đặc tả Use Case

**Tên Use Case:** Cấp và thu hồi quyền truy cập thư mục  
**Mã Use Case:** UC-FOLDER-ACCESS-01

**Mô tả:**  
Admin nhóm cài đặt quyền truy cập cho thư mục để giới hạn danh sách thành viên được phép xem. Thành viên có quyền thấy thư mục và task bên trong; thành viên không có quyền bị ẩn hoàn toàn.

**Tác nhân chính:**  
Admin nhóm (`admin_group@test.com`)

**Tác nhân phụ:**  
Thành viên nhóm (`allowed@test.com`, `restricted@test.com`)

**Tiền điều kiện:**
- `admin_group@test.com` là Admin của nhóm `Group Folder Test`.
- `allowed@test.com` đã được cấp quyền xem `Restricted Folder`.
- `restricted@test.com` chưa có quyền xem `Restricted Folder`.
- `Restricted Folder` có ít nhất 2 task bên trong.

**Kích hoạt:**  
Admin nhóm mở cài đặt quyền truy cập của thư mục.

**Hậu điều kiện:**
- Danh sách được phép xem được cập nhật.
- Thành viên có quyền thấy thư mục và task bên trong.
- Thành viên không có quyền không thấy thư mục trong danh sách và bị chặn URL trực tiếp.

#### a. Luồng chính — Xem giao diện cài đặt quyền
1. Admin mở `Restricted Folder` và truy cập phần cài đặt quyền truy cập.
2. Hệ thống hiển thị danh sách thành viên đang được cấp quyền; có thể thêm/xóa.

#### b. Luồng chính — Cấp quyền cho thành viên (FR-FOLDER-5.1)
1. Admin mở cài đặt quyền của `Restricted Folder`.
2. Admin thêm `restricted@test.com` vào danh sách được phép xem.
3. Admin lưu cài đặt.
4. `restricted@test.com` được cập nhật quyền; có thể thấy `Restricted Folder` ngay (hoặc sau reload).

#### c. Luồng chính — Thu hồi quyền (FR-FOLDER-5.1)
1. Admin mở cài đặt quyền của `Restricted Folder`.
2. Admin xóa `allowed@test.com` khỏi danh sách được phép xem.
3. Admin lưu cài đặt.
4. `allowed@test.com` không còn thấy `Restricted Folder` sau khi quyền bị thu hồi.

#### d. Luồng thay thế (Alternative Flow)

**AF-01: Thành viên có quyền xem thư mục và task**
1. `allowed@test.com` vào nhóm → thấy `Restricted Folder` trong danh sách.
2. Mở `Restricted Folder` → thấy toàn bộ task bên trong.

**AF-02: Quyền persist sau reload và đăng nhập lại**
1. `allowed@test.com` thấy `Restricted Folder` trước khi reload.
2. Sau reload và đăng nhập lại → vẫn thấy `Restricted Folder`.

**AF-03: Quyền độc lập theo từng thành viên**
1. `allowed@test.com` thấy `Restricted Folder`; `restricted@test.com` không thấy.
2. Hai tài khoản nhận kết quả riêng biệt khi kiểm tra danh sách thư mục.

#### e. Luồng ngoại lệ (Exception Flow)

**EF-01: Thành viên không có quyền thấy thư mục trong danh sách (FR-FOLDER-5.2)**
1. `restricted@test.com` vào nhóm.
2. `Restricted Folder` không xuất hiện trong danh sách thư mục của họ.

**EF-02: Thành viên không có quyền truy cập URL trực tiếp**
1. `restricted@test.com` nhập URL trực tiếp của `Restricted Folder`.
2. Hệ thống hiển thị lỗi hoặc thông báo không có quyền; không hiển thị nội dung thư mục.

**EF-03: Thành viên không có quyền không thấy task bên trong thư mục bị hạn chế**
1. `restricted@test.com` xem danh sách task chung của nhóm.
2. Task thuộc `Restricted Folder` không hiển thị.

---

### 4.5.4. Dữ liệu vào
- Tên/email thành viên cần cấp hoặc thu hồi quyền
- Thao tác: Thêm vào danh sách / Xóa khỏi danh sách

### 4.5.5. Dữ liệu ra
- Danh sách quyền truy cập cập nhật
- Thư mục và task hiển thị/ẩn đúng theo quyền của từng thành viên
- Thông báo không có quyền khi truy cập URL bị hạn chế

---

### 4.5.6. Quy tắc nghiệp vụ
- Chỉ Admin nhóm mới có thể cấu hình quyền truy cập thư mục (C-4).
- Thư mục bị hạn chế phải ẩn hoàn toàn với thành viên không có quyền — không chỉ ẩn nội dung mà còn ẩn khỏi danh sách và chặn URL trực tiếp.
- Task trong thư mục bị hạn chế cũng phải ẩn với thành viên không có quyền (C-4).
- Quyền là riêng biệt cho từng thành viên; thay đổi một người không ảnh hưởng người khác.
- Quyền phải persist sau reload và đăng nhập lại (NFR-SEC).

---

### 4.5.7. Điều kiện tiền đề và ràng buộc
- Admin nhóm phải đang đăng nhập.
- Cần có tài khoản test: `admin_group@test.com` (Admin nhóm), `allowed@test.com` (có quyền), `restricted@test.com` (không có quyền).
- `Restricted Folder` phải được thiết lập với quyền hạn chế trước khi test.
- **⚠️ Lưu ý:** Sau test thu hồi quyền (`TC_FOLDER_ACCESS_09, 11`), cần cấp lại quyền cho `allowed@test.com`.

---

### 4.5.8. Mức độ ưu tiên
**Mức độ ưu tiên: Cao**

**Lý do:**  
Kiểm soát quyền truy cập thư mục là tính năng bảo mật dữ liệu cốt lõi — cho phép nhóm bảo vệ thông tin nhạy cảm khỏi các thành viên không liên quan mà vẫn là thành viên của nhóm.

---

### 4.5.9. Tiêu chí chấp nhận
- Admin nhóm mở cài đặt quyền của `Restricted Folder` → hiển thị danh sách thành viên được phép xem; có thể thêm/xóa.
- `allowed@test.com` vào nhóm → thấy `Restricted Folder` trong danh sách.
- `allowed@test.com` mở `Restricted Folder` → thấy toàn bộ task bên trong.
- `restricted@test.com` vào nhóm → `Restricted Folder` không hiển thị trong danh sách.
- `restricted@test.com` truy cập URL trực tiếp → thông báo lỗi/không có quyền.
- `restricted@test.com` xem danh sách task chung → task thuộc `Restricted Folder` không hiển thị.
- Admin cấp quyền cho `restricted@test.com` → thấy `Restricted Folder` ngay hoặc sau reload.
- Admin thu hồi quyền `allowed@test.com` → không còn thấy `Restricted Folder`.
- Quyền persist sau reload và đăng nhập lại.
- `allowed@test.com` thấy thư mục; `restricted@test.com` không thấy — quyền độc lập.

---

### 4.5.10. Ghi chú
- Các test case tham chiếu: `TC_FOLDER_ACCESS_01` đến `TC_FOLDER_ACCESS_14` (file `TC_FOLDER_ACCESS.md`).
- `TC_FOLDER_ACCESS_05` xác nhận `restricted@test.com` không thấy `Restricted Folder` trong danh sách.
- `TC_FOLDER_ACCESS_06` xác nhận chặn URL trực tiếp với thành viên không có quyền.
- `TC_FOLDER_ACCESS_07` xác nhận task trong thư mục bị ẩn với người không có quyền.
- `TC_FOLDER_ACCESS_08` xác nhận cấp quyền cho thành viên mới.
- `TC_FOLDER_ACCESS_09` xác nhận thu hồi quyền; cần cấp lại quyền sau test.
- `TC_FOLDER_ACCESS_12/13` xác nhận persist sau reload và đăng nhập lại.
- `TC_FOLDER_ACCESS_14` xác nhận quyền độc lập theo từng thành viên.
- Pre-condition: cần thiết lập 3 tài khoản test với vai trò khác nhau và `Restricted Folder` đã được cấu hình quyền hạn chế trước khi test.
- Liên kết ràng buộc C-4; NFR-SEC.
