## 4.1. Chức năng Đăng ký tài khoản

### 4.1.1. Mô tả chức năng

Chức năng Đăng ký tài khoản cho phép người dùng mới tạo tài khoản cá nhân trong hệ thống bằng cách cung cấp họ tên, địa chỉ email hợp lệ và mật khẩu đáp ứng yêu cầu bảo mật. Sau khi đăng ký thành công, hệ thống tự động tạo workspace cá nhân cho người dùng và chuyển thẳng vào giao diện chính mà không cần đăng nhập lại.

---

### 4.1.2. Yêu cầu chức năng

**FR-AUTH-1-01:** Hệ thống phải cung cấp biểu mẫu đăng ký bao gồm tối thiểu ba trường bắt buộc: Họ tên, Email và Mật khẩu.

**FR-AUTH-1-02:** Hệ thống phải kiểm tra tính đầy đủ của dữ liệu đầu vào; tất cả trường bắt buộc không được để trống trước khi gửi yêu cầu đăng ký.

**FR-AUTH-1-03:** Hệ thống phải kiểm tra định dạng email đầu vào phải hợp lệ (bao gồm ký tự "@" và phần tên miền).

**FR-AUTH-1-04:** Hệ thống phải từ chối đăng ký nếu địa chỉ email đã tồn tại trong hệ thống.

**FR-AUTH-1-05:** Hệ thống phải kiểm tra mật khẩu đáp ứng đồng thời các yêu cầu: tối thiểu 8 ký tự, có ít nhất một chữ hoa, một chữ thường, một chữ số và một ký tự đặc biệt.

**FR-AUTH-1-06:** Hệ thống phải giới hạn độ dài họ tên không vượt quá 100 ký tự.

**FR-AUTH-1-07:** Hệ thống phải hiển thị thông báo lỗi rõ ràng tại từng trường vi phạm khi dữ liệu không hợp lệ.

**FR-AUTH-1-08:** Khi đăng ký thành công, hệ thống phải tạo tài khoản người dùng mới và tự động tạo workspace cá nhân cho người dùng đó.

**FR-AUTH-1-09:** Khi đăng ký thành công, hệ thống phải thiết lập trạng thái đăng nhập hợp lệ và chuyển người dùng vào giao diện chính mà không yêu cầu đăng nhập lại.

**FR-AUTH-1-10:** Hệ thống phải lưu mật khẩu dưới dạng đã mã hóa, không lưu dưới dạng văn bản thường.

---

### 4.1.3. Đặc tả Use Case

**Tên Use Case:** Đăng ký tài khoản mới  
**Mã Use Case:** UC-AUTH-REG-01

**Mô tả:**  
Người dùng chưa có tài khoản điền thông tin cá nhân để tạo tài khoản mới trong hệ thống. Sau khi hệ thống xác thực dữ liệu hợp lệ, tài khoản được tạo và người dùng truy cập trực tiếp vào giao diện chính.

**Tác nhân chính:**  
Người dùng chưa có tài khoản (Khách)

**Tiền điều kiện:**
- Người dùng chưa có tài khoản trong hệ thống.
- Người dùng chưa đăng nhập.
- Ứng dụng đang hoạt động bình thường và trang Đăng ký có thể truy cập.

**Kích hoạt:**  
Người dùng chọn chức năng "Đăng ký" từ trang chào mừng hoặc trang đăng nhập.

**Hậu điều kiện:**
- Nếu thành công: tài khoản mới được tạo, workspace cá nhân được khởi tạo, người dùng được chuyển vào giao diện chính với trạng thái đăng nhập hợp lệ.
- Nếu thất bại: không có tài khoản nào được tạo, người dùng vẫn ở trang Đăng ký và nhận được thông báo lỗi tương ứng.

#### a. Luồng chính (Basic Flow)
1. Người dùng mở trang Đăng ký.
2. Hệ thống hiển thị biểu mẫu đăng ký với ba trường: Họ tên, Email, Mật khẩu.
3. Người dùng điền đầy đủ thông tin hợp lệ vào cả ba trường.
4. Người dùng nhấn nút "Đăng ký".
5. Hệ thống kiểm tra tính đầy đủ của các trường bắt buộc.
6. Hệ thống kiểm tra định dạng email hợp lệ.
7. Hệ thống kiểm tra email chưa được đăng ký trước đó.
8. Hệ thống kiểm tra mật khẩu đáp ứng các yêu cầu bảo mật (độ dài, ký tự hoa/thường/số/đặc biệt).
9. Hệ thống kiểm tra họ tên không vượt quá 100 ký tự.
10. Hệ thống tạo tài khoản mới với thông tin đã cung cấp, lưu mật khẩu dưới dạng mã hóa.
11. Hệ thống tự động tạo workspace cá nhân cho người dùng mới.
12. Hệ thống thiết lập trạng thái đăng nhập hợp lệ cho người dùng.
13. Hệ thống chuyển người dùng vào giao diện chính (Dashboard).

#### b. Luồng thay thế (Alternative Flow)

**AF-01: Người dùng đã có tài khoản**
1. Tại trang Đăng ký, người dùng nhấn link "Đã có tài khoản? Đăng nhập".
2. Hệ thống chuyển người dùng sang trang Đăng nhập.

#### c. Luồng ngoại lệ (Exception Flow)

**EF-01: Bỏ trống một hoặc nhiều trường bắt buộc**
1. Người dùng để trống ít nhất một trong ba trường: Họ tên, Email, Mật khẩu.
2. Người dùng nhấn "Đăng ký".
3. Hệ thống phát hiện trường bị bỏ trống.
4. Hệ thống hiển thị thông báo lỗi tại từng trường bị bỏ trống và không gửi yêu cầu tạo tài khoản.

**EF-02: Email không hợp lệ**
1. Người dùng nhập email sai định dạng (thiếu "@", thiếu tên miền, có khoảng trắng…).
2. Hệ thống phát hiện định dạng email không hợp lệ.
3. Hệ thống hiển thị thông báo lỗi "Email không hợp lệ" tại trường Email và không tiếp tục.

**EF-03: Email đã được đăng ký**
1. Người dùng nhập địa chỉ email đã tồn tại trong hệ thống.
2. Hệ thống xác định email đã được sử dụng.
3. Hệ thống hiển thị thông báo lỗi, không tạo tài khoản mới.

**EF-04: Mật khẩu không đủ điều kiện**
1. Người dùng nhập mật khẩu không đáp ứng một hoặc nhiều yêu cầu (dưới 8 ký tự, thiếu chữ hoa, thiếu chữ thường, thiếu chữ số, thiếu ký tự đặc biệt).
2. Hệ thống phát hiện mật khẩu không hợp lệ.
3. Hệ thống hiển thị thông báo lỗi mô tả yêu cầu chưa đáp ứng và không tạo tài khoản.

**EF-05: Họ tên vượt quá 100 ký tự**
1. Người dùng nhập họ tên có độ dài trên 100 ký tự.
2. Hệ thống phát hiện vi phạm giới hạn độ dài.
3. Hệ thống hiển thị thông báo lỗi và không tạo tài khoản.

---

### 4.1.4. Dữ liệu vào
- Họ tên (chuỗi ký tự, tối đa 100 ký tự, bắt buộc)
- Email (định dạng email hợp lệ, bắt buộc)
- Mật khẩu (tối thiểu 8 ký tự, có chữ hoa, chữ thường, chữ số, ký tự đặc biệt; bắt buộc)

### 4.1.5. Dữ liệu ra
- Tài khoản người dùng mới được tạo trong hệ thống
- Workspace cá nhân được khởi tạo tự động
- Trạng thái đăng nhập hợp lệ sau khi đăng ký thành công
- Thông báo phản hồi phù hợp (thành công hoặc lỗi chi tiết theo từng trường)

---

### 4.1.6. Quy tắc nghiệp vụ
- Email phải là địa chỉ duy nhất trong hệ thống; không cho phép trùng lặp.
- Email phải tuân theo định dạng hợp lệ (có "@" và phần tên miền).
- Mật khẩu phải có tối thiểu 8 ký tự, bao gồm ít nhất: 1 chữ hoa, 1 chữ thường, 1 chữ số, 1 ký tự đặc biệt.
- Họ tên không được vượt quá 100 ký tự.
- Mật khẩu phải được lưu dưới dạng mã hóa; không lưu dạng văn bản thường.
- Mỗi tài khoản mới được tự động tạo kèm một workspace cá nhân ngay sau khi đăng ký thành công.
- Người dùng không cần đăng nhập lại sau khi đăng ký thành công.

---

### 4.1.7. Điều kiện tiền đề và ràng buộc
- Hệ thống phải có khả năng kết nối đến cơ sở dữ liệu để kiểm tra và lưu thông tin tài khoản.
- Dịch vụ tạo tài khoản và workspace phải hoạt động bình thường.
- Client và server phải có kết nối mạng ổn định.

---

### 4.1.8. Mức độ ưu tiên
**Mức độ ưu tiên: Cao**

**Lý do:**  
Đây là cổng vào đầu tiên của hệ thống. Không có chức năng đăng ký, người dùng mới không thể tạo tài khoản và không thể sử dụng bất kỳ tính năng nào khác.

---

### 4.1.9. Tiêu chí chấp nhận
- Người dùng điền đầy đủ thông tin hợp lệ thì tài khoản được tạo thành công và được chuyển vào giao diện chính.
- Hệ thống hiển thị thông báo lỗi chính xác tại từng trường khi dữ liệu không hợp lệ.
- Email đã đăng ký bị từ chối; không cho phép tạo tài khoản trùng email.
- Sau đăng ký thành công, workspace cá nhân xuất hiện trong danh sách nhóm của người dùng.
- Mật khẩu không hiển thị dưới dạng văn bản thường ở bất kỳ đâu trên giao diện.
- Mọi trường hợp validation lỗi đều không tạo bản ghi mới trong hệ thống.

---

### 4.1.10. Ghi chú
- Các test case tham chiếu: `TC_REG_01` đến `TC_REG_33` (file `TC_AUTH_REGISTER.md`).
- Test case `TC_REG_29` xác nhận workspace cá nhân được tạo tự động sau đăng ký.
- Test case `TC_REG_32` xác nhận mật khẩu không lộ dạng plaintext trên UI.
- Test case `TC_REG_33` xác nhận khi đăng ký thất bại, không có bản ghi nào được ghi vào cơ sở dữ liệu.
- Boundary test: họ tên đúng 100 ký tự được chấp nhận (`TC_REG_21`), 101 ký tự bị từ chối (`TC_REG_22`); mật khẩu đúng 8 ký tự được chấp nhận (`TC_REG_23`).
