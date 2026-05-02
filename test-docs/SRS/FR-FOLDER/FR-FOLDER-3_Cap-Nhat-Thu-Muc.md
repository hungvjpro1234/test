## 4.3. Chức năng Cập nhật thư mục

### 4.3.1. Mô tả chức năng

Chức năng Cập nhật thư mục cho phép thành viên có quyền chỉnh sửa tên, màu sắc và biểu tượng (icon) của thư mục. Form chỉnh sửa phải hiển thị đúng giá trị hiện tại của tất cả trường. Tên mới không được trống, không chỉ khoảng trắng và không trùng với thư mục khác trong cùng nhóm. Thay đổi phải hiển thị ngay lập tức, persist sau reload và đăng nhập lại, đồng thời thành viên khác trong nhóm cũng thấy được. Người không có quyền sửa không được thấy nút chỉnh sửa.

---

### 4.3.2. Yêu cầu chức năng

**FR-FOLDER-3-01:** Hệ thống phải cho phép người dùng có quyền mở form chỉnh sửa thư mục; form phải hiển thị đúng giá trị hiện tại của tất cả trường: Tên, Màu sắc, Biểu tượng.

**FR-FOLDER-3-02:** Hệ thống phải ẩn hoặc vô hiệu hóa nút chỉnh sửa với người dùng không có quyền sửa.

**FR-FOLDER-3-03:** Hệ thống phải từ chối cập nhật nếu tên mới trống hoặc chỉ khoảng trắng; hiển thị thông báo lỗi.

**FR-FOLDER-3-04:** Hệ thống phải từ chối cập nhật nếu tên mới trùng với thư mục khác trong cùng nhóm; hiển thị thông báo lỗi (FR-FOLDER-3.2).

**FR-FOLDER-3-05:** Hệ thống phải cho phép lưu nếu tên giữ nguyên không đổi (không coi là trùng).

**FR-FOLDER-3-06:** Sau khi cập nhật thành công, thay đổi (tên, màu, icon) phải hiển thị ngay trong danh sách.

**FR-FOLDER-3-07:** Thay đổi phải persist sau reload và đăng nhập lại.

**FR-FOLDER-3-08:** Thành viên khác trong nhóm phải thấy thay đổi mới.

---

### 4.3.3. Đặc tả Use Case

**Tên Use Case:** Cập nhật thông tin thư mục  
**Mã Use Case:** UC-FOLDER-UPDATE-01

**Mô tả:**  
Người dùng có quyền mở form chỉnh sửa thư mục, thay đổi tên/màu sắc/biểu tượng và lưu. Hệ thống xác thực và phản ánh ngay thay đổi cho tất cả thành viên nhóm.

**Tác nhân chính:**  
Thành viên nhóm có quyền chỉnh sửa thư mục

**Tiền điều kiện:**
- Người dùng (`member@test.com`) đã đăng nhập và có quyền chỉnh sửa thư mục trong nhóm.
- Tồn tại 2 thư mục: `Folder To Edit` và `Other Folder` trong cùng nhóm.
- Tài khoản `viewer@test.com` chỉ có quyền xem, không có quyền sửa.

**Kích hoạt:**  
Người dùng mở form chỉnh sửa của thư mục cần cập nhật.

**Hậu điều kiện:**
- Nếu thành công: thay đổi hiển thị ngay và persist.
- Nếu thất bại (validation): thông báo lỗi; dữ liệu cũ không thay đổi.

#### a. Luồng chính (Basic Flow)
1. Người dùng (`member@test.com`) mở form chỉnh sửa `Folder To Edit`.
2. Hệ thống hiển thị form với giá trị hiện tại của Tên, Màu sắc, Biểu tượng.
3. Người dùng thay đổi tên thành `Folder Renamed`.
4. Người dùng nhấn "Lưu".
5. Hệ thống kiểm tra tên không trống, không chỉ khoảng trắng, không trùng với `Other Folder`.
6. Hệ thống lưu thay đổi; tên mới `Folder Renamed` hiển thị ngay trong danh sách.

#### b. Luồng thay thế (Alternative Flow)

**AF-01: Cập nhật màu sắc**
1. Người dùng chọn màu mới từ palette.
2. Hệ thống lưu; màu mới hiển thị ngay trên icon/tên thư mục.

**AF-02: Cập nhật biểu tượng**
1. Người dùng chọn icon mới.
2. Hệ thống lưu; icon mới hiển thị đúng cạnh tên thư mục.

**AF-03: Giữ nguyên tên (không đổi)**
1. Người dùng mở form, không thay đổi tên, chỉ đổi màu sắc.
2. Hệ thống lưu thành công — không coi tên giữ nguyên là trùng.

#### c. Luồng ngoại lệ (Exception Flow)

**EF-01: Tên mới trống hoặc chỉ khoảng trắng**
1. Người dùng xóa hết tên hoặc chỉ nhập khoảng trắng rồi nhấn "Lưu".
2. Hệ thống hiển thị thông báo lỗi; không lưu; giữ nguyên thông tin cũ.

**EF-02: Tên mới trùng với thư mục khác trong nhóm (FR-FOLDER-3.2)**
1. Người dùng đổi tên `Folder To Edit` thành `Other Folder` (đã tồn tại).
2. Hệ thống hiển thị thông báo lỗi tên đã tồn tại; không lưu.

**EF-03: Người không có quyền sửa cố chỉnh sửa**
1. `viewer@test.com` cố mở form chỉnh sửa hoặc truy cập trực tiếp.
2. Nút sửa không hiển thị hoặc bị vô hiệu hóa; nếu cố truy cập trực tiếp → thông báo không có quyền.

---

### 4.3.4. Dữ liệu vào
- Tên mới (không trống, không trùng trong nhóm)
- Màu sắc mới (từ palette hợp lệ, tùy chọn)
- Biểu tượng mới (từ bộ chọn icon, tùy chọn)

### 4.3.5. Dữ liệu ra
- Thư mục cập nhật với thông tin mới hiển thị ngay
- Thông báo thành công hoặc lỗi tương ứng

---

### 4.3.6. Quy tắc nghiệp vụ
- Chỉ người có quyền mới có thể chỉnh sửa; người không có quyền không thấy nút sửa (C-4).
- Tên mới không được trống, không chỉ khoảng trắng, phải là duy nhất trong nhóm (ngoại trừ tên không đổi).
- Màu sắc và biểu tượng là tùy chọn — không bắt buộc thay đổi.
- Thay đổi phải persist và đồng bộ với tất cả thành viên nhóm.

---

### 4.3.7. Điều kiện tiền đề và ràng buộc
- Người dùng phải đang đăng nhập và có quyền chỉnh sửa thư mục trong nhóm.
- Thư mục cần cập nhật phải tồn tại.

---

### 4.3.8. Mức độ ưu tiên
**Mức độ ưu tiên: Trung bình**

**Lý do:**  
Cập nhật thư mục cho phép điều chỉnh cấu trúc tổ chức khi dự án thay đổi; màu sắc và icon hỗ trợ nhận diện nhanh trong danh sách.

---

### 4.3.9. Tiêu chí chấp nhận
- Form chỉnh sửa hiển thị đúng giá trị hiện tại: Tên, Màu sắc, Biểu tượng.
- Người không có quyền → nút sửa không hiển thị/bị vô hiệu.
- Đổi tên hợp lệ → lưu thành công; tên mới hiển thị ngay.
- Đổi màu sắc → lưu thành công; màu mới hiển thị ngay.
- Đổi biểu tượng → lưu thành công; icon mới hiển thị ngay.
- Tên mới trống → lỗi; không lưu.
- Tên mới chỉ khoảng trắng → lỗi; không lưu.
- Tên mới trùng thư mục khác trong nhóm → lỗi tên đã tồn tại.
- Giữ nguyên tên → lưu thành công (không báo lỗi trùng).
- Thay đổi persist sau reload và đăng nhập lại.
- Thành viên khác thấy tên mới `Folder Renamed`.

---

### 4.3.10. Ghi chú
- Các test case tham chiếu: `TC_FOLDER_UPDATE_01` đến `TC_FOLDER_UPDATE_13` (file `TC_FOLDER_UPDATE.md`).
- `TC_FOLDER_UPDATE_05` xác nhận lỗi khi tên mới trùng `Other Folder`.
- `TC_FOLDER_UPDATE_06` xác nhận lưu thành công khi tên giữ nguyên.
- `TC_FOLDER_UPDATE_10` xác nhận `viewer@test.com` không thấy nút sửa.
- `TC_FOLDER_UPDATE_11` xác nhận persist sau reload.
- `TC_FOLDER_UPDATE_12` xác nhận thành viên khác thấy thay đổi.
- `TC_FOLDER_UPDATE_13` xác nhận persist sau đăng nhập lại.
- Liên kết ràng buộc C-4.
