## 4.x. Chức năng Đăng nhập

### 4.x.1. Mô tả chức năng
Chức năng Đăng nhập cho phép người dùng đã có tài khoản hợp lệ truy cập vào hệ thống bằng thông tin xác thực tương ứng. Sau khi xác thực thành công, hệ thống thiết lập trạng thái đăng nhập và chuyển người dùng đến khu vực làm việc phù hợp theo vai trò và quyền hạn hiện có.

---

### 4.x.2. Yêu cầu chức năng

**FR-LOGIN-01:** Hệ thống phải cung cấp giao diện để người dùng nhập thông tin đăng nhập, tối thiểu bao gồm email và mật khẩu.

**FR-LOGIN-02:** Hệ thống phải kiểm tra tính hợp lệ của dữ liệu đầu vào trước khi thực hiện xác thực.

**FR-LOGIN-03:** Hệ thống phải cho phép người dùng đăng nhập bằng tài khoản đã được tạo trước đó.

**FR-LOGIN-04:** Hệ thống phải xác thực thông tin đăng nhập với dữ liệu tài khoản được lưu trong hệ thống.

**FR-LOGIN-05:** Hệ thống phải từ chối đăng nhập nếu email không tồn tại trong hệ thống.

**FR-LOGIN-06:** Hệ thống phải từ chối đăng nhập nếu mật khẩu không chính xác.

**FR-LOGIN-07:** Hệ thống phải từ chối đăng nhập nếu tài khoản không ở trạng thái được phép truy cập.

**FR-LOGIN-08:** Khi đăng nhập thành công, hệ thống phải thiết lập phiên đăng nhập hoặc cơ chế xác thực tương đương cho người dùng.

**FR-LOGIN-09:** Khi đăng nhập thành công, hệ thống phải trả về thông tin cần thiết để client xác định trạng thái người dùng và quyền truy cập tương ứng.

**FR-LOGIN-10:** Hệ thống phải hiển thị thông báo phù hợp cho từng kết quả đăng nhập thành công hoặc thất bại.

**FR-LOGIN-11:** Hệ thống phải ghi nhận thông tin đăng nhập phục vụ quản lý phiên hoặc theo dõi lịch sử đăng nhập nếu chức năng này được hiện thực trong hệ thống.

**FR-LOGIN-12:** Hệ thống chỉ cho phép người dùng truy cập các chức năng tiếp theo sau khi đăng nhập thành công.

---

### 4.x.3. Đặc tả Use Case

**Tên Use Case:** Đăng nhập hệ thống  
**Mã Use Case:** UC-LOGIN-01

**Mô tả:**  
Người dùng nhập thông tin xác thực để truy cập vào hệ thống và sử dụng các chức năng theo quyền hạn được cấp.

**Tác nhân chính:**  
Người dùng

**Tiền điều kiện:**  
- Người dùng đã có tài khoản trong hệ thống.  
- Người dùng chưa đăng nhập tại thời điểm thực hiện use case.  
- Hệ thống đang hoạt động bình thường và có thể kết nối đến dịch vụ xác thực.

**Kích hoạt:**  
Người dùng chọn chức năng “Đăng nhập” từ giao diện hệ thống.

**Hậu điều kiện:**  
- Nếu thành công: người dùng được xác thực và chuyển vào hệ thống.  
- Nếu thất bại: người dùng vẫn ở màn hình đăng nhập và nhận được thông báo phù hợp.

#### a. Luồng chính (Basic Flow)
1. Người dùng mở màn hình đăng nhập.
2. Hệ thống hiển thị biểu mẫu đăng nhập.
3. Người dùng nhập email và mật khẩu.
4. Người dùng gửi yêu cầu đăng nhập.
5. Hệ thống kiểm tra định dạng và tính đầy đủ của dữ liệu đầu vào.
6. Hệ thống gửi thông tin xác thực tới thành phần xử lý đăng nhập.
7. Hệ thống đối chiếu email và mật khẩu với dữ liệu tài khoản đã lưu.
8. Hệ thống xác định tài khoản hợp lệ và đủ điều kiện truy cập.
9. Hệ thống tạo trạng thái đăng nhập hợp lệ cho người dùng.
10. Hệ thống trả về kết quả đăng nhập thành công.
11. Hệ thống chuyển người dùng đến màn hình chính hoặc khu vực làm việc tương ứng.

#### b. Luồng thay thế (Alternative Flow)
**AF-01: Người dùng đăng nhập bằng phương thức xác thực ngoài**  
1. Tại màn hình đăng nhập, người dùng chọn phương thức đăng nhập ngoài nếu hệ thống hỗ trợ.  
2. Hệ thống chuyển sang quy trình xác thực tương ứng.  
3. Sau khi xác thực thành công, hệ thống tạo trạng thái đăng nhập cho người dùng.  
4. Người dùng được chuyển vào hệ thống.

**AF-02: Người dùng đã đăng nhập trước đó**  
1. Người dùng truy cập màn hình đăng nhập trong khi đã có trạng thái đăng nhập hợp lệ.  
2. Hệ thống nhận diện phiên đăng nhập hiện có.  
3. Hệ thống bỏ qua bước xác thực lại hoặc chuyển người dùng thẳng vào khu vực làm việc phù hợp.

#### c. Luồng ngoại lệ (Exception Flow)
**EF-01: Thiếu dữ liệu đầu vào**  
1. Người dùng để trống một hoặc nhiều trường bắt buộc.  
2. Hệ thống từ chối gửi yêu cầu đăng nhập.  
3. Hệ thống hiển thị thông báo yêu cầu nhập đầy đủ thông tin.

**EF-02: Sai định dạng dữ liệu**  
1. Người dùng nhập email hoặc dữ liệu không đúng định dạng hợp lệ.  
2. Hệ thống phát hiện dữ liệu không hợp lệ.  
3. Hệ thống hiển thị thông báo lỗi và yêu cầu nhập lại.

**EF-03: Email không tồn tại**  
1. Người dùng nhập email không tồn tại trong hệ thống.  
2. Hệ thống không tìm thấy tài khoản tương ứng.  
3. Hệ thống từ chối đăng nhập và hiển thị thông báo lỗi.

**EF-04: Mật khẩu không chính xác**  
1. Người dùng nhập đúng email nhưng sai mật khẩu.  
2. Hệ thống xác định thông tin xác thực không hợp lệ.  
3. Hệ thống từ chối đăng nhập và hiển thị thông báo lỗi.

**EF-05: Tài khoản bị khóa hoặc bị vô hiệu hóa**  
1. Người dùng nhập đúng thông tin nhưng tài khoản không được phép đăng nhập.  
2. Hệ thống kiểm tra trạng thái tài khoản.  
3. Hệ thống từ chối truy cập và hiển thị thông báo phù hợp.

**EF-06: Lỗi hệ thống hoặc lỗi dịch vụ xác thực**  
1. Người dùng gửi yêu cầu đăng nhập hợp lệ.  
2. Trong quá trình xử lý xảy ra lỗi hệ thống hoặc lỗi dịch vụ.  
3. Hệ thống không hoàn tất xác thực.  
4. Hệ thống hiển thị thông báo lỗi chung và yêu cầu thử lại sau.

---

### 4.x.4. Dữ liệu vào
- Email đăng nhập
- Mật khẩu

### 4.x.5. Dữ liệu ra
- Trạng thái đăng nhập thành công hoặc thất bại
- Thông báo phản hồi cho người dùng
- Thông tin phiên đăng nhập hoặc dữ liệu xác thực tương đương
- Thông tin người dùng cơ bản cần thiết cho client sau khi đăng nhập

---

### 4.x.6. Quy tắc nghiệp vụ
- Người dùng chỉ được đăng nhập khi đã có tài khoản hợp lệ trong hệ thống.
- Email phải tuân theo định dạng hợp lệ theo quy tắc của hệ thống.
- Mật khẩu phải khớp với thông tin xác thực đã lưu.
- Tài khoản ở trạng thái bị khóa, vô hiệu hóa hoặc bị hạn chế truy cập thì không được phép đăng nhập.
- Người dùng chỉ được sử dụng các chức năng nghiệp vụ sau khi đăng nhập thành công.
- Mọi quyền truy cập sau đăng nhập phải phụ thuộc vào vai trò và quyền hạn của người dùng.
- Hệ thống có thể ghi nhận lịch sử đăng nhập nếu chức năng này được bật hoặc đã được triển khai.

---

### 4.x.7. Điều kiện tiền đề và ràng buộc
- Hệ thống phải có sẵn dữ liệu tài khoản người dùng.
- Dịch vụ xác thực phải hoạt động bình thường.
- Client và server phải có kết nối mạng ổn định.
- Cơ sở dữ liệu người dùng phải truy cập được tại thời điểm xác thực.

---

### 4.x.8. Mức độ ưu tiên
**Mức độ ưu tiên: Cao**

**Lý do:**  
Đây là chức năng nền tảng để người dùng truy cập hệ thống. Nếu chức năng đăng nhập không hoạt động, hầu hết các chức năng nghiệp vụ khác sẽ không thể sử dụng.

---

### 4.x.9. Tiêu chí chấp nhận
- Người dùng nhập đúng thông tin thì đăng nhập thành công.
- Người dùng nhập sai email hoặc mật khẩu thì bị từ chối truy cập.
- Người dùng nhận được thông báo phù hợp tương ứng với từng trường hợp.
- Sau khi đăng nhập thành công, hệ thống thiết lập trạng thái đăng nhập hợp lệ.
- Người dùng được chuyển đến màn hình hoặc khu vực phù hợp sau đăng nhập.

---

### 4.x.10. Ghi chú
- Phần này là mẫu format chuẩn cho 1 chức năng trong mục 4 của SRS.
- Các chức năng khác như Đăng ký, Quên mật khẩu, Tạo công việc, Chỉnh sửa công việc, Gửi thông báo, Chat, Quản lý người dùng... sẽ giữ nguyên cấu trúc này và chỉ thay đổi nội dung chi tiết theo từng chức năng.