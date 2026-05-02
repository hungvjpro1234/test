## 5.3. Chức năng Cập nhật ảnh đại diện

### 5.3.1. Mô tả chức năng

Chức năng Cập nhật ảnh đại diện cho phép người dùng thay đổi hình ảnh hiển thị đại diện cho tài khoản của mình. Hệ thống hỗ trợ hai phương thức: tải file ảnh trực tiếp từ thiết bị hoặc nhập URL ảnh từ internet. Sau khi cập nhật thành công, ảnh mới được hiển thị ngay trên trang hồ sơ và thanh điều hướng mà không cần tải lại trang. Các thành viên khác trong nhóm cũng sẽ thấy ảnh đại diện mới khi xem thông tin người dùng.

---

### 5.3.2. Yêu cầu chức năng

**FR-USER-3-01:** Hệ thống phải hiển thị ảnh đại diện hiện tại trên trang hồ sơ và cho phép người dùng thay đổi.

**FR-USER-3-02:** Hệ thống phải hỗ trợ tải file ảnh lên từ thiết bị cục bộ (upload).

**FR-USER-3-03:** Hệ thống phải hỗ trợ cập nhật ảnh đại diện bằng cách nhập URL ảnh trực tiếp (nếu tính năng được triển khai).

**FR-USER-3-04:** Sau khi cập nhật thành công, ảnh mới phải hiển thị ngay trên trang hồ sơ và thanh điều hướng mà không cần tải lại trang.

**FR-USER-3-05:** Ảnh mới phải được lưu bền vững; vẫn hiển thị đúng sau khi tải lại trang hoặc đăng xuất/đăng nhập lại.

**FR-USER-3-06:** Khi người dùng tải ảnh mới lần hai, ảnh lần hai phải thay thế ảnh lần một; chỉ lưu ảnh đại diện mới nhất.

**FR-USER-3-07:** Ảnh đại diện mới phải được cập nhật và hiển thị đúng cho các thành viên khác khi họ xem thông tin người dùng trong nhóm hoặc bình luận.

---

### 5.3.3. Đặc tả Use Case

**Tên Use Case:** Cập nhật ảnh đại diện tài khoản  
**Mã Use Case:** UC-USER-AVATAR-01

**Mô tả:**  
Người dùng thay đổi ảnh đại diện của tài khoản bằng cách tải file từ thiết bị hoặc nhập URL ảnh. Hệ thống lưu ảnh mới và cập nhật hiển thị trên toàn bộ giao diện.

**Tác nhân chính:**  
Người dùng đã đăng nhập

**Tiền điều kiện:**
- Người dùng đã đăng nhập thành công.
- Người dùng đang ở trang hồ sơ cá nhân (Profile Settings).

**Kích hoạt:**  
Người dùng nhấn vào vùng ảnh đại diện hoặc nút thay đổi ảnh trên trang hồ sơ.

**Hậu điều kiện:**
- Nếu thành công: ảnh mới được lưu và hiển thị ngay trên toàn bộ giao diện.
- Nếu thất bại: ảnh đại diện không thay đổi; thông báo lỗi hiển thị phù hợp.

#### a. Luồng chính (Basic Flow) — Tải file từ thiết bị
1. Người dùng mở trang hồ sơ cá nhân.
2. Hệ thống hiển thị ảnh đại diện hiện tại và nút/vùng cho phép thay đổi.
3. Người dùng nhấn vào vùng thay đổi ảnh đại diện.
4. Hệ thống mở hộp thoại chọn file.
5. Người dùng chọn file ảnh hợp lệ (JPG, PNG…) từ thiết bị.
6. Hệ thống tải file lên và xử lý.
7. Hệ thống lưu ảnh mới vào hệ thống lưu trữ.
8. Ảnh đại diện mới hiển thị ngay trên trang hồ sơ và thanh điều hướng mà không cần tải lại trang.

#### b. Luồng thay thế (Alternative Flow)

**AF-01: Cập nhật ảnh bằng URL**
1. Người dùng chọn hình thức nhập URL ảnh (nếu tính năng được triển khai).
2. Người dùng nhập URL ảnh hợp lệ (có thể truy cập được).
3. Người dùng nhấn "Lưu".
4. Hệ thống xác minh URL hợp lệ và có thể truy cập.
5. Hệ thống cập nhật ảnh đại diện sử dụng URL đó.
6. Ảnh từ URL hiển thị ngay trên trang hồ sơ và thanh điều hướng.

**AF-02: Tải ảnh lần hai (thay thế ảnh cũ)**
1. Người dùng đã có ảnh đại diện tùy chỉnh.
2. Người dùng thực hiện thao tác tải ảnh mới (bất kỳ phương thức nào).
3. Hệ thống thay thế ảnh cũ bằng ảnh mới; chỉ lưu ảnh mới nhất.

#### c. Luồng ngoại lệ (Exception Flow)

**EF-01: Tải file không phải ảnh**
1. Người dùng chọn file không phải định dạng ảnh (PDF, Word, Excel…).
2. Hệ thống phát hiện loại file không hợp lệ.
3. Hệ thống hiển thị thông báo lỗi (chỉ chấp nhận file ảnh); không tải lên.

**EF-02: Nhập URL ảnh không hợp lệ**
1. Người dùng nhập URL không đúng định dạng hoặc không thể truy cập.
2. Hệ thống phát hiện URL không hợp lệ.
3. Hệ thống hiển thị thông báo lỗi; ảnh đại diện không thay đổi.

---

### 5.3.4. Dữ liệu vào
- File ảnh từ thiết bị cục bộ (định dạng ảnh hợp lệ, ví dụ: JPG, PNG)
- Hoặc: URL ảnh hợp lệ có thể truy cập được

### 5.3.5. Dữ liệu ra
- Ảnh đại diện mới được lưu và hiển thị trên trang hồ sơ, thanh điều hướng
- Ảnh mới hiển thị cho các thành viên khác khi xem thông tin người dùng
- Thông báo lỗi khi file hoặc URL không hợp lệ

---

### 5.3.6. Quy tắc nghiệp vụ
- Chỉ chấp nhận file ảnh hợp lệ (JPG, PNG hoặc các định dạng ảnh được hỗ trợ); từ chối file không phải ảnh.
- URL ảnh phải có định dạng hợp lệ; tùy thiết kế hệ thống có thể kiểm tra khả năng truy cập URL.
- Mỗi tài khoản chỉ có một ảnh đại diện tại một thời điểm; ảnh mới thay thế ảnh cũ.
- Thay đổi ảnh đại diện được cập nhật ngay lập tức trên toàn bộ giao diện, kể cả ở các vị trí hiển thị của người dùng khác (bình luận, danh sách thành viên…).
- Ảnh đại diện được lưu bền vững; vẫn giữ nguyên sau reload, đăng xuất/đăng nhập lại.

---

### 5.3.7. Điều kiện tiền đề và ràng buộc
- Người dùng phải đang trong trạng thái đăng nhập hợp lệ.
- Hệ thống lưu trữ file (file storage) phải hoạt động bình thường để tiếp nhận file upload.
- Kết nối internet ổn định khi upload file hoặc tải ảnh từ URL.

---

### 5.3.8. Mức độ ưu tiên
**Mức độ ưu tiên: Thấp**

**Lý do:**  
Ảnh đại diện là thông tin trực quan giúp nhận diện người dùng trong giao diện nhóm và bình luận, nhưng không ảnh hưởng đến luồng nghiệp vụ chính. Có thể triển khai sau các chức năng cốt lõi.

---

### 5.3.9. Tiêu chí chấp nhận
- Tải file ảnh hợp lệ lên → ảnh mới hiển thị ngay trên trang hồ sơ và thanh điều hướng.
- Nhập URL ảnh hợp lệ → ảnh mới được cập nhật và hiển thị.
- Tải file không phải ảnh → hệ thống hiển thị lỗi, ảnh không thay đổi.
- Nhập URL không hợp lệ → hệ thống hiển thị lỗi, ảnh không thay đổi.
- Tải ảnh lần hai → ảnh mới nhất được hiển thị (thay thế ảnh cũ).
- Sau cập nhật, reload trang hoặc đăng xuất/đăng nhập lại → ảnh mới vẫn được giữ.
- Các thành viên khác thấy ảnh đại diện mới của người dùng trong bình luận và danh sách.

---

### 5.3.10. Ghi chú
- Các test case tham chiếu: `TC_AVATAR_01` đến `TC_AVATAR_12` (file `TC_USER_AVATAR.md`).
- `TC_AVATAR_04` kiểm tra từ chối file không phải ảnh — tùy hệ thống có validate loại file không.
- `TC_AVATAR_05` kiểm tra URL không hợp lệ — đánh dấu N/A nếu không có tính năng nhập URL.
- `TC_AVATAR_07` kiểm tra nhập URL ảnh hợp lệ — đánh dấu N/A nếu không có tính năng này.
- `TC_AVATAR_09` xác nhận ảnh mới hiển thị ngay trên navbar mà không cần reload.
- `TC_AVATAR_12` xác nhận các thành viên khác thấy ảnh đại diện mới.
