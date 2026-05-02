## 5.1. Chức năng Cập nhật thông tin cá nhân

### 5.1.1. Mô tả chức năng

Chức năng Cập nhật thông tin cá nhân cho phép người dùng đã đăng nhập chỉnh sửa thông tin hồ sơ của mình, cụ thể là họ tên hiển thị. Địa chỉ email là thông tin định danh cố định và không thể thay đổi trực tiếp qua trang này. Sau khi lưu thành công, tên mới được cập nhật ngay lập tức trên toàn bộ giao diện mà không cần tải lại trang.

---

### 5.1.2. Yêu cầu chức năng

**FR-USER-1-01:** Hệ thống phải cung cấp trang hồ sơ cá nhân hiển thị thông tin hiện tại của người dùng bao gồm họ tên và địa chỉ email.

**FR-USER-1-02:** Trường họ tên phải cho phép người dùng chỉnh sửa trực tiếp.

**FR-USER-1-03:** Trường email phải hiển thị dạng chỉ đọc (read-only) và không cho phép thay đổi trên trang này.

**FR-USER-1-04:** Hệ thống phải từ chối lưu nếu họ tên bị để trống hoặc chỉ chứa khoảng trắng.

**FR-USER-1-05:** Hệ thống phải giới hạn họ tên tối đa 100 ký tự; từ chối và hiển thị lỗi nếu vượt quá.

**FR-USER-1-06:** Hệ thống phải hỗ trợ họ tên chứa ký tự tiếng Việt có dấu và ký tự đặc biệt hợp lệ.

**FR-USER-1-07:** Sau khi lưu thành công, hệ thống phải hiển thị thông báo thành công và cập nhật tên mới ngay lập tức trên giao diện (bao gồm thanh điều hướng) mà không cần tải lại trang.

**FR-USER-1-08:** Tên mới phải được lưu bền vững; vẫn hiển thị đúng sau khi tải lại trang hoặc đăng xuất và đăng nhập lại.

---

### 5.1.3. Đặc tả Use Case

**Tên Use Case:** Cập nhật họ tên người dùng  
**Mã Use Case:** UC-USER-PROFILE-01

**Mô tả:**  
Người dùng truy cập trang hồ sơ cá nhân, chỉnh sửa họ tên và lưu lại. Hệ thống xác thực dữ liệu và cập nhật thông tin mới trên toàn bộ giao diện.

**Tác nhân chính:**  
Người dùng đã đăng nhập

**Tiền điều kiện:**
- Người dùng đã đăng nhập thành công.
- Người dùng đang ở trang hồ sơ cá nhân (Profile Settings).

**Kích hoạt:**  
Người dùng nhấn vào trường họ tên, thực hiện chỉnh sửa và nhấn nút "Lưu" / "Cập nhật".

**Hậu điều kiện:**
- Nếu thành công: họ tên mới được lưu vào hệ thống và hiển thị ngay trên giao diện.
- Nếu thất bại: thông tin không thay đổi, thông báo lỗi hiển thị tại trường tương ứng.

#### a. Luồng chính (Basic Flow)
1. Người dùng mở trang hồ sơ cá nhân.
2. Hệ thống hiển thị thông tin hiện tại: họ tên (có thể sửa) và email (chỉ đọc).
3. Người dùng nhấn vào trường Họ tên, xóa nội dung cũ và nhập tên mới hợp lệ.
4. Người dùng nhấn nút "Lưu".
5. Hệ thống kiểm tra họ tên không trống và không vượt quá 100 ký tự.
6. Hệ thống lưu thông tin mới vào cơ sở dữ liệu.
7. Hệ thống hiển thị thông báo thành công.
8. Giao diện cập nhật tên mới ngay lập tức trên toàn bộ UI (trang hồ sơ, thanh điều hướng…).

#### b. Luồng thay thế (Alternative Flow)

**AF-01: Người dùng nhấn Lưu mà không thay đổi gì**
1. Người dùng không chỉnh sửa bất kỳ thông tin nào.
2. Người dùng nhấn "Lưu".
3. Hệ thống xử lý không lỗi (hiển thị thông báo "Không có thay đổi nào" hoặc lưu bình thường mà không báo lỗi).

#### c. Luồng ngoại lệ (Exception Flow)

**EF-01: Họ tên bị xóa trắng hoặc chỉ chứa khoảng trắng**
1. Người dùng xóa toàn bộ nội dung trường Họ tên (hoặc chỉ nhập khoảng trắng).
2. Người dùng nhấn "Lưu".
3. Hệ thống phát hiện giá trị trống (sau khi trim khoảng trắng).
4. Hệ thống hiển thị thông báo lỗi tại trường Họ tên và không lưu thay đổi.

**EF-02: Họ tên vượt quá 100 ký tự**
1. Người dùng nhập họ tên có độ dài trên 100 ký tự.
2. Người dùng nhấn "Lưu".
3. Hệ thống phát hiện vi phạm giới hạn độ dài.
4. Hệ thống hiển thị thông báo lỗi và không lưu thay đổi.

---

### 5.1.4. Dữ liệu vào
- Họ tên mới (chuỗi ký tự, tối đa 100 ký tự, không được trống, bắt buộc)

### 5.1.5. Dữ liệu ra
- Thông báo thành công sau khi lưu
- Tên mới hiển thị ngay trên toàn bộ giao diện
- Thông báo lỗi tại trường tương ứng khi dữ liệu không hợp lệ

---

### 5.1.6. Quy tắc nghiệp vụ
- Họ tên không được để trống hoặc chỉ chứa khoảng trắng (trim trước khi kiểm tra).
- Họ tên tối đa 100 ký tự.
- Địa chỉ email không thể thay đổi qua trang hồ sơ; hiển thị dạng chỉ đọc.
- Thay đổi họ tên được phản ánh ngay lập tức trên toàn bộ giao diện mà không yêu cầu tải lại trang.
- Thay đổi được lưu bền vững; vẫn giữ nguyên sau reload trang hoặc đăng xuất/đăng nhập lại.

---

### 5.1.7. Điều kiện tiền đề và ràng buộc
- Người dùng phải đang trong trạng thái đăng nhập hợp lệ.
- Cơ sở dữ liệu phải truy cập được để lưu thông tin.

---

### 5.1.8. Mức độ ưu tiên
**Mức độ ưu tiên: Trung bình**

**Lý do:**  
Đây là chức năng cơ bản trong quản lý hồ sơ cá nhân. Không ảnh hưởng trực tiếp đến các luồng nghiệp vụ chính nhưng cần thiết cho trải nghiệm người dùng và tính nhất quán hiển thị tên trên giao diện.

---

### 5.1.9. Tiêu chí chấp nhận
- Nhập họ tên hợp lệ và nhấn Lưu → thành công, tên mới hiển thị ngay trên UI.
- Để trống họ tên hoặc chỉ nhập khoảng trắng → hệ thống hiển thị lỗi, không lưu.
- Nhập họ tên vượt 100 ký tự → hệ thống hiển thị lỗi, không lưu.
- Nhập họ tên đúng 100 ký tự → hệ thống chấp nhận và lưu thành công (boundary).
- Họ tên có ký tự tiếng Việt có dấu được lưu và hiển thị đúng.
- Sau khi lưu thành công, tên mới hiển thị trên thanh điều hướng mà không cần reload.
- Reload trang hoặc đăng xuất/đăng nhập lại → tên mới vẫn được giữ.
- Trường email hiển thị nhưng không thể chỉnh sửa.

---

### 5.1.10. Ghi chú
- Các test case tham chiếu: `TC_PROFILE_01` đến `TC_PROFILE_13` (file `TC_USER_UPDATE_PROFILE.md`).
- `TC_PROFILE_08` xác nhận họ tên chỉ chứa khoảng trắng bị từ chối (trim trước khi validate).
- `TC_PROFILE_06` (boundary 100 ký tự — pass) và `TC_PROFILE_07` (101 ký tự — fail).
- `TC_PROFILE_12` xác nhận tên mới cập nhật ngay trên navbar, không cần reload.
- `TC_PROFILE_13` xác nhận tên mới được giữ sau khi reload trang.
