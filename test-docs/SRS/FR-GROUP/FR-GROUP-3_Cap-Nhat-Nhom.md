## 6.3. Chức năng Cập nhật thông tin nhóm

### 6.3.1. Mô tả chức năng

Chức năng Cập nhật thông tin nhóm cho phép người dùng có quyền chỉnh sửa tên, mô tả, màu sắc và biểu tượng (icon) của nhóm. Chỉ thành viên có vai trò phù hợp (Owner, Admin hoặc người được cấp quyền) mới được thực hiện thao tác này. Thay đổi được áp dụng ngay và hiển thị cho tất cả thành viên trong nhóm.

---

### 6.3.2. Yêu cầu chức năng

**FR-GROUP-3-01:** Hệ thống phải cung cấp form chỉnh sửa nhóm với đầy đủ các trường: Tên nhóm, Mô tả, Màu sắc và Biểu tượng.

**FR-GROUP-3-02:** Form phải hiển thị giá trị hiện tại của nhóm khi mở.

**FR-GROUP-3-03:** Hệ thống phải từ chối lưu nếu tên nhóm bị để trống hoặc chỉ chứa khoảng trắng.

**FR-GROUP-3-04:** Hệ thống phải giới hạn tên nhóm tối đa 256 ký tự; từ chối nếu vượt quá.

**FR-GROUP-3-05:** Hệ thống phải giới hạn mô tả tối đa 2000 ký tự; từ chối nếu vượt quá.

**FR-GROUP-3-06:** Chỉ người dùng có quyền chỉnh sửa nhóm (Owner/Admin) mới được phép thực hiện thao tác này; thành viên thường bị từ chối với thông báo không có quyền.

**FR-GROUP-3-07:** Sau khi lưu thành công, thông tin mới phải được cập nhật và hiển thị ngay trên giao diện.

**FR-GROUP-3-08:** Thay đổi thông tin nhóm phải hiển thị cho tất cả thành viên nhóm.

---

### 6.3.3. Đặc tả Use Case

**Tên Use Case:** Cập nhật thông tin nhóm làm việc  
**Mã Use Case:** UC-GROUP-UPDATE-01

**Mô tả:**  
Người dùng có quyền quản trị nhóm chỉnh sửa thông tin nhóm (tên, mô tả, màu sắc, biểu tượng) và lưu lại. Hệ thống xác thực dữ liệu, kiểm tra quyền và cập nhật thông tin cho toàn bộ thành viên.

**Tác nhân chính:**  
Người dùng có quyền chỉnh sửa nhóm (Owner/Admin nhóm)

**Tiền điều kiện:**
- Người dùng đã đăng nhập thành công.
- Người dùng là thành viên có quyền chỉnh sửa của nhóm (Owner hoặc Admin).
- Nhóm cần chỉnh sửa đang tồn tại trong hệ thống.

**Kích hoạt:**  
Người dùng mở form chỉnh sửa nhóm và thực hiện thay đổi.

**Hậu điều kiện:**
- Nếu thành công: thông tin nhóm được cập nhật và hiển thị ngay; tất cả thành viên thấy thay đổi.
- Nếu thất bại: thông tin không thay đổi; thông báo lỗi hiển thị tại trường tương ứng.

#### a. Luồng chính (Basic Flow)
1. Người dùng (Owner/Admin) vào nhóm cần chỉnh sửa và mở form chỉnh sửa thông tin nhóm.
2. Hệ thống hiển thị form với giá trị hiện tại của các trường: Tên, Mô tả, Màu sắc, Biểu tượng.
3. Người dùng thay đổi một hoặc nhiều trường.
4. Người dùng nhấn "Lưu".
5. Hệ thống kiểm tra tên nhóm không trống và không vượt 256 ký tự.
6. Hệ thống kiểm tra mô tả (nếu có) không vượt 2000 ký tự.
7. Hệ thống lưu thông tin mới vào cơ sở dữ liệu.
8. Hệ thống hiển thị thông báo cập nhật thành công.
9. Thông tin mới được phản ánh ngay trên giao diện (tên nhóm, màu sắc, biểu tượng).

#### b. Luồng thay thế (Alternative Flow)

*(Không có luồng thay thế đặc biệt cho chức năng này.)*

#### c. Luồng ngoại lệ (Exception Flow)

**EF-01: Tên nhóm bị xóa trắng hoặc chỉ khoảng trắng**
1. Người dùng xóa tên nhóm (hoặc chỉ nhập khoảng trắng) và nhấn "Lưu".
2. Hệ thống phát hiện tên không hợp lệ.
3. Hệ thống hiển thị thông báo lỗi; thông tin không được lưu.

**EF-02: Tên nhóm vượt quá 256 ký tự**
1. Người dùng nhập tên nhóm dài hơn 256 ký tự và nhấn "Lưu".
2. Hệ thống hiển thị thông báo lỗi; thông tin không được lưu.

**EF-03: Mô tả vượt quá 2000 ký tự**
1. Người dùng nhập mô tả dài hơn 2000 ký tự và nhấn "Lưu".
2. Hệ thống hiển thị thông báo lỗi; thông tin không được lưu.

**EF-04: Người dùng không có quyền chỉnh sửa nhóm**
1. Thành viên thường cố gắng mở form chỉnh sửa nhóm hoặc thực hiện cập nhật.
2. Hệ thống kiểm tra quyền hạn của người dùng.
3. Hệ thống từ chối thao tác, hiển thị thông báo không có quyền truy cập; nút chỉnh sửa không hiển thị hoặc bị vô hiệu hóa.

---

### 6.3.4. Dữ liệu vào
- Tên nhóm mới (tối đa 256 ký tự, không trống, bắt buộc)
- Mô tả mới (tối đa 2000 ký tự, tùy chọn)
- Màu sắc nhóm mới (tùy chọn)
- Biểu tượng nhóm mới (tùy chọn)

### 6.3.5. Dữ liệu ra
- Thông tin nhóm được cập nhật trong hệ thống
- Giao diện phản ánh thay đổi ngay lập tức
- Thông báo thành công hoặc lỗi tương ứng

---

### 6.3.6. Quy tắc nghiệp vụ
- Chỉ người dùng có quyền quản trị nhóm (Owner/Admin) mới được phép chỉnh sửa thông tin nhóm.
- Tên nhóm không được để trống hoặc chỉ chứa khoảng trắng.
- Tên nhóm tối đa 256 ký tự; mô tả tối đa 2000 ký tự.
- Thay đổi thông tin nhóm hiển thị cho tất cả thành viên ngay sau khi lưu.
- Thay đổi được lưu bền vững; vẫn giữ nguyên sau reload trang.

---

### 6.3.7. Điều kiện tiền đề và ràng buộc
- Người dùng phải đang đăng nhập hợp lệ và có quyền quản trị nhóm.
- Nhóm phải tồn tại trong hệ thống.
- Cơ sở dữ liệu phải truy cập được để lưu thay đổi.

---

### 6.3.8. Mức độ ưu tiên
**Mức độ ưu tiên: Trung bình**

**Lý do:**  
Chỉnh sửa thông tin nhóm là tính năng quản lý cần thiết nhưng không ảnh hưởng trực tiếp đến luồng nghiệp vụ chính (tạo task, cộng tác). Có thể triển khai sau các tính năng cốt lõi của nhóm.

---

### 6.3.9. Tiêu chí chấp nhận
- Owner/Admin nhóm cập nhật tên/mô tả/màu/icon → thành công, thông tin mới hiển thị ngay.
- Tên nhóm trống hoặc chỉ khoảng trắng khi sửa → lỗi, không lưu.
- Tên nhóm đúng 256 ký tự → lưu thành công (boundary).
- Tên nhóm 257 ký tự → lỗi (boundary+1).
- Mô tả đúng 2000 ký tự → lưu thành công (boundary).
- Mô tả 2001 ký tự → lỗi (boundary+1).
- Thành viên thường cố sửa → thông báo không có quyền; nút sửa không hiển thị hoặc bị vô hiệu.
- Sau khi lưu, thành viên khác thấy tên nhóm mới trong danh sách.
- Reload trang → thông tin mới vẫn được giữ.

---

### 6.3.10. Ghi chú
- Các test case tham chiếu: `TC_GROUP_UPDATE_01` đến `TC_GROUP_UPDATE_13` (file `TC_GROUP_UPDATE.md`).
- `TC_GROUP_UPDATE_04` xác nhận tên nhóm chỉ khoảng trắng bị từ chối.
- `TC_GROUP_UPDATE_05/06` boundary 256/257 ký tự cho tên.
- `TC_GROUP_UPDATE_07/08` boundary 2000/2001 ký tự cho mô tả.
- `TC_GROUP_UPDATE_11` xác nhận thành viên thường bị từ chối (nút sửa không hiển thị hoặc disabled).
- `TC_GROUP_UPDATE_13` xác nhận thành viên khác thấy tên nhóm mới sau khi Owner cập nhật.
