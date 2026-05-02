## 4.2. Chức năng Đăng nhập

### 4.2.1. Mô tả chức năng

Chức năng Đăng nhập cho phép người dùng đã có tài khoản truy cập hệ thống bằng cách xác thực thông qua cặp thông tin email và mật khẩu. Sau khi xác thực thành công, hệ thống thiết lập phiên làm việc hợp lệ và chuyển người dùng vào giao diện chính theo vai trò và quyền hạn tương ứng. Hệ thống từ chối đăng nhập trong các trường hợp thông tin không hợp lệ, tài khoản không tồn tại, hoặc tài khoản bị khóa.

---

### 4.2.2. Yêu cầu chức năng

**FR-AUTH-2-01:** Hệ thống phải cung cấp biểu mẫu đăng nhập với tối thiểu hai trường: Email và Mật khẩu.

**FR-AUTH-2-02:** Hệ thống phải kiểm tra tính đầy đủ của dữ liệu đầu vào; không cho phép gửi yêu cầu đăng nhập khi có trường bị để trống.

**FR-AUTH-2-03:** Hệ thống phải xác thực cặp email–mật khẩu với dữ liệu tài khoản được lưu trong hệ thống.

**FR-AUTH-2-04:** Hệ thống phải từ chối đăng nhập nếu địa chỉ email không tồn tại trong hệ thống.

**FR-AUTH-2-05:** Hệ thống phải từ chối đăng nhập nếu mật khẩu không khớp với tài khoản tương ứng.

**FR-AUTH-2-06:** Hệ thống phải từ chối đăng nhập nếu tài khoản đang ở trạng thái bị khóa và hiển thị thông báo tài khoản bị khóa.

**FR-AUTH-2-07:** Hệ thống phải không phân biệt chữ hoa/chữ thường khi so sánh địa chỉ email.

**FR-AUTH-2-08:** Hệ thống phải phân biệt chữ hoa/chữ thường khi so sánh mật khẩu.

**FR-AUTH-2-09:** Khi đăng nhập thành công, hệ thống phải thiết lập phiên làm việc hợp lệ và chuyển người dùng vào giao diện chính.

**FR-AUTH-2-10:** Hệ thống phải ngăn người dùng chưa đăng nhập truy cập bất kỳ trang được bảo vệ nào; tự động chuyển hướng về trang đăng nhập.

**FR-AUTH-2-11:** Hệ thống phải ghi lại lịch sử đăng nhập bao gồm thông tin người dùng, thời điểm và kết quả (thành công/thất bại) để quản trị viên có thể xem.

---

### 4.2.3. Đặc tả Use Case

**Tên Use Case:** Đăng nhập hệ thống  
**Mã Use Case:** UC-AUTH-LOGIN-01

**Mô tả:**  
Người dùng nhập thông tin xác thực (email và mật khẩu) để truy cập vào hệ thống và sử dụng các chức năng theo quyền hạn được cấp.

**Tác nhân chính:**  
Người dùng đã có tài khoản

**Tiền điều kiện:**
- Người dùng đã có tài khoản hợp lệ trong hệ thống.
- Người dùng chưa đăng nhập tại thời điểm thực hiện use case.
- Ứng dụng đang hoạt động bình thường và trang Đăng nhập có thể truy cập.

**Kích hoạt:**  
Người dùng chọn chức năng "Đăng nhập" từ giao diện hệ thống.

**Hậu điều kiện:**
- Nếu thành công: người dùng được xác thực, phiên làm việc được tạo, người dùng được chuyển vào giao diện chính.
- Nếu thất bại: người dùng vẫn ở màn hình đăng nhập và nhận được thông báo lỗi phù hợp.

#### a. Luồng chính (Basic Flow)
1. Người dùng mở trang Đăng nhập.
2. Hệ thống hiển thị biểu mẫu với hai trường: Email và Mật khẩu, cùng link "Quên mật khẩu?" và "Chưa có tài khoản? Đăng ký".
3. Người dùng nhập địa chỉ email và mật khẩu.
4. Người dùng nhấn nút "Đăng nhập".
5. Hệ thống kiểm tra tính đầy đủ của hai trường.
6. Hệ thống tìm kiếm tài khoản theo địa chỉ email (không phân biệt hoa/thường).
7. Hệ thống xác minh tài khoản đang ở trạng thái hoạt động.
8. Hệ thống so sánh mật khẩu nhập vào với mật khẩu đã lưu (phân biệt hoa/thường).
9. Hệ thống tạo phiên làm việc hợp lệ cho người dùng.
10. Hệ thống ghi lại bản ghi đăng nhập thành công.
11. Hệ thống chuyển người dùng vào giao diện chính (Dashboard).

#### b. Luồng thay thế (Alternative Flow)

**AF-01: Người dùng đăng nhập bằng Google**
1. Tại trang đăng nhập, người dùng chọn "Đăng nhập bằng Google".
2. Hệ thống khởi tạo quy trình xác thực OAuth với Google.
3. Sau khi xác thực Google thành công, hệ thống tạo phiên làm việc.
4. Người dùng được chuyển vào giao diện chính.

**AF-02: Người dùng đã có phiên đăng nhập hợp lệ**
1. Người dùng truy cập trang Đăng nhập trong khi đã có phiên hợp lệ.
2. Hệ thống nhận diện phiên hiện có.
3. Hệ thống bỏ qua bước xác thực và chuyển người dùng thẳng vào giao diện chính.

#### c. Luồng ngoại lệ (Exception Flow)

**EF-01: Bỏ trống một hoặc cả hai trường**
1. Người dùng để trống trường Email hoặc Mật khẩu (hoặc cả hai).
2. Hệ thống từ chối gửi yêu cầu.
3. Hệ thống hiển thị thông báo lỗi tại từng trường bị bỏ trống.

**EF-02: Email không tồn tại trong hệ thống**
1. Người dùng nhập địa chỉ email không có trong hệ thống.
2. Hệ thống không tìm thấy tài khoản tương ứng.
3. Hệ thống ghi lại bản ghi đăng nhập thất bại.
4. Hệ thống hiển thị thông báo lỗi ("Thông tin đăng nhập không hợp lệ") và không cho phép vào.

**EF-03: Mật khẩu không chính xác**
1. Người dùng nhập đúng email nhưng sai mật khẩu.
2. Hệ thống xác định thông tin xác thực không khớp.
3. Hệ thống ghi lại bản ghi đăng nhập thất bại.
4. Hệ thống hiển thị thông báo lỗi và không cho phép vào.

**EF-04: Tài khoản bị khóa**
1. Người dùng nhập thông tin hợp lệ nhưng tài khoản đang ở trạng thái bị khóa.
2. Hệ thống phát hiện trạng thái tài khoản bị khóa.
3. Hệ thống hiển thị thông báo "Tài khoản của bạn đã bị khóa" và không cho phép vào.

**EF-05: Truy cập trang được bảo vệ khi chưa đăng nhập**
1. Người dùng chưa đăng nhập cố truy cập trực tiếp vào URL trang nội bộ (Dashboard, Task…).
2. Hệ thống phát hiện không có phiên hợp lệ.
3. Hệ thống tự động chuyển hướng người dùng về trang Đăng nhập.

---

### 4.2.4. Dữ liệu vào
- Email đăng nhập (bắt buộc)
- Mật khẩu (bắt buộc)

### 4.2.5. Dữ liệu ra
- Trạng thái đăng nhập thành công hoặc thất bại
- Phiên làm việc hợp lệ (token xác thực hoặc tương đương) sau khi thành công
- Thông báo phản hồi phù hợp với từng trường hợp
- Thông tin người dùng cơ bản cần thiết để hiển thị trên giao diện

---

### 4.2.6. Quy tắc nghiệp vụ
- Người dùng chỉ được đăng nhập khi có tài khoản hợp lệ trong hệ thống.
- So sánh địa chỉ email không phân biệt chữ hoa/chữ thường.
- So sánh mật khẩu phân biệt chữ hoa/chữ thường.
- Tài khoản ở trạng thái bị khóa không được phép đăng nhập dù thông tin xác thực đúng.
- Người dùng chỉ được truy cập các trang được bảo vệ sau khi đăng nhập thành công.
- Hệ thống ghi lại lịch sử đăng nhập (cả thành công lẫn thất bại) để quản trị viên theo dõi.
- Mọi quyền truy cập sau đăng nhập phụ thuộc vào vai trò và quyền hạn của người dùng.

---

### 4.2.7. Điều kiện tiền đề và ràng buộc
- Hệ thống phải có sẵn dữ liệu tài khoản người dùng trong cơ sở dữ liệu.
- Dịch vụ xác thực phải hoạt động bình thường.
- Client và server phải có kết nối mạng ổn định.

---

### 4.2.8. Mức độ ưu tiên
**Mức độ ưu tiên: Cao**

**Lý do:**  
Đây là cổng kiểm soát truy cập cốt lõi của hệ thống. Nếu chức năng đăng nhập không hoạt động, toàn bộ tính năng nghiệp vụ sẽ không thể sử dụng.

---

### 4.2.9. Tiêu chí chấp nhận
- Người dùng nhập đúng email và mật khẩu thì đăng nhập thành công và được chuyển vào Dashboard.
- Người dùng nhập sai mật khẩu hoặc email không tồn tại thì bị từ chối với thông báo lỗi.
- Tài khoản bị khóa không thể đăng nhập; hiển thị thông báo rõ ràng.
- Bỏ trống bất kỳ trường nào thì hệ thống hiển thị thông báo lỗi tương ứng.
- Sau đăng nhập thành công, người dùng có thể truy cập tất cả trang được bảo vệ.
- Người dùng chưa đăng nhập bị tự động chuyển hướng về trang Đăng nhập khi truy cập URL nội bộ.
- Tên/thông tin người dùng hiển thị đúng trên giao diện sau đăng nhập.
- Lịch sử đăng nhập có thể xem trong trang quản trị.

---

### 4.2.10. Ghi chú
- Các test case tham chiếu: `TC_LOGIN_01` đến `TC_LOGIN_22` (file `TC_AUTH_LOGIN.md`).
- `TC_LOGIN_16` xác nhận email không phân biệt hoa/thường; `TC_LOGIN_17` xác nhận mật khẩu phân biệt hoa/thường.
- `TC_LOGIN_19` xác nhận chặn truy cập URL nội bộ khi chưa đăng nhập.
- `TC_LOGIN_22` xác nhận lịch sử đăng nhập hiển thị trong trang Admin.
- Thông báo lỗi khi sai email hoặc sai mật khẩu nên dùng chung một thông điệp ("Thông tin đăng nhập không hợp lệ") để tránh lộ thông tin về sự tồn tại của tài khoản.
