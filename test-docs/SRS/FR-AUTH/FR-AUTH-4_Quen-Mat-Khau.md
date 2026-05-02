## 4.4. Chức năng Quên mật khẩu

### 4.4.1. Mô tả chức năng

Chức năng Quên mật khẩu cho phép người dùng lấy lại quyền truy cập tài khoản khi quên mật khẩu thông qua quy trình xác minh danh tính ba bước: (1) nhập email đã đăng ký để nhận mã xác nhận, (2) nhập mã xác nhận từ email, (3) đặt mật khẩu mới. Sau khi đặt lại thành công, mật khẩu cũ bị vô hiệu hóa và người dùng được chuyển về trang Đăng nhập để đăng nhập bằng mật khẩu mới.

---

### 4.4.2. Yêu cầu chức năng

**FR-AUTH-4-01:** Hệ thống phải cung cấp trang Quên mật khẩu với trường nhập email và nút "Gửi".

**FR-AUTH-4-02:** Hệ thống phải kiểm tra email nhập vào tồn tại trong hệ thống trước khi gửi mã xác nhận.

**FR-AUTH-4-03:** Khi email hợp lệ và tồn tại, hệ thống phải gửi mã xác nhận đến địa chỉ email đó và hiển thị thông báo thành công.

**FR-AUTH-4-04:** Hệ thống phải từ chối gửi mã nếu email không tồn tại trong hệ thống và hiển thị thông báo lỗi.

**FR-AUTH-4-05:** Hệ thống phải từ chối gửi mã nếu email sai định dạng hoặc để trống.

**FR-AUTH-4-06:** Hệ thống phải cho phép người dùng nhập mã xác nhận đã nhận qua email để tiếp tục bước đặt mật khẩu mới.

**FR-AUTH-4-07:** Hệ thống phải từ chối mã xác nhận sai hoặc đã hết hạn và hiển thị thông báo lỗi phù hợp.

**FR-AUTH-4-08:** Mã xác nhận chỉ được sử dụng một lần; sau khi dùng xong mã không còn hiệu lực.

**FR-AUTH-4-09:** Hệ thống phải cho phép người dùng đặt mật khẩu mới đáp ứng yêu cầu bảo mật (tối thiểu 8 ký tự, có chữ hoa, chữ thường, chữ số, ký tự đặc biệt).

**FR-AUTH-4-10:** Hệ thống phải từ chối mật khẩu mới không đáp ứng yêu cầu bảo mật và hiển thị thông báo lỗi chi tiết.

**FR-AUTH-4-11:** Sau khi đặt mật khẩu mới thành công, hệ thống phải vô hiệu hóa mật khẩu cũ và chuyển người dùng về trang Đăng nhập.

---

### 4.4.3. Đặc tả Use Case

**Tên Use Case:** Đặt lại mật khẩu qua email  
**Mã Use Case:** UC-AUTH-FP-01

**Mô tả:**  
Người dùng đã quên mật khẩu thực hiện quy trình xác minh danh tính qua email để đặt mật khẩu mới và khôi phục quyền truy cập tài khoản.

**Tác nhân chính:**  
Người dùng đã có tài khoản nhưng quên mật khẩu

**Tiền điều kiện:**
- Người dùng đã có tài khoản trong hệ thống.
- Người dùng chưa đăng nhập.
- Người dùng có thể truy cập hộp thư của địa chỉ email đã đăng ký.
- Ứng dụng đang hoạt động bình thường.

**Kích hoạt:**  
Người dùng nhấn link "Quên mật khẩu?" trên trang Đăng nhập.

**Hậu điều kiện:**
- Nếu thành công: mật khẩu mới được lưu, mật khẩu cũ bị vô hiệu, người dùng được chuyển về trang Đăng nhập.
- Nếu thất bại tại bất kỳ bước nào: mật khẩu không thay đổi, người dùng nhận thông báo lỗi phù hợp.

#### a. Luồng chính (Basic Flow)

**Bước 1 — Yêu cầu gửi mã xác nhận:**
1. Người dùng mở trang Quên mật khẩu.
2. Hệ thống hiển thị biểu mẫu với trường nhập email và nút "Gửi".
3. Người dùng nhập địa chỉ email đã đăng ký và nhấn "Gửi".
4. Hệ thống kiểm tra email đúng định dạng và tồn tại trong hệ thống.
5. Hệ thống tạo mã xác nhận có thời hạn và gửi đến email người dùng.
6. Hệ thống hiển thị thông báo thành công và chuyển sang bước nhập mã.

**Bước 2 — Xác nhận mã:**
7. Hệ thống hiển thị biểu mẫu nhập mã xác nhận.
8. Người dùng kiểm tra email, lấy mã và nhập vào biểu mẫu, nhấn "Xác nhận".
9. Hệ thống kiểm tra mã hợp lệ (đúng, chưa hết hạn, chưa dùng).
10. Mã hợp lệ; hệ thống chuyển sang bước đặt mật khẩu mới.

**Bước 3 — Đặt mật khẩu mới:**
11. Hệ thống hiển thị biểu mẫu nhập mật khẩu mới.
12. Người dùng nhập mật khẩu mới đáp ứng yêu cầu bảo mật và nhấn "Lưu".
13. Hệ thống kiểm tra mật khẩu mới đáp ứng các yêu cầu.
14. Hệ thống cập nhật mật khẩu mới (lưu dạng mã hóa), vô hiệu hóa mật khẩu cũ.
15. Hệ thống đánh dấu mã xác nhận đã dùng (không thể dùng lại).
16. Hệ thống hiển thị thông báo thành công và chuyển người dùng về trang Đăng nhập.

#### b. Luồng thay thế (Alternative Flow)

**AF-01: Người dùng yêu cầu gửi lại mã xác nhận**
1. Tại bước nhập mã, người dùng nhấn "Gửi lại mã".
2. Hệ thống tạo mã mới và gửi lại email, vô hiệu hóa mã cũ.
3. Người dùng tiếp tục với mã mới.

#### c. Luồng ngoại lệ (Exception Flow)

**EF-01: Bỏ trống trường email**
1. Người dùng không nhập email và nhấn "Gửi".
2. Hệ thống hiển thị thông báo lỗi "Vui lòng nhập email" và không gửi mã.

**EF-02: Email sai định dạng**
1. Người dùng nhập email không đúng định dạng (ví dụ: `testmail`).
2. Hệ thống hiển thị thông báo lỗi "Email không hợp lệ" và không gửi mã.

**EF-03: Email chưa đăng ký trong hệ thống**
1. Người dùng nhập email không tồn tại trong hệ thống.
2. Hệ thống hiển thị thông báo lỗi và không gửi mã xác nhận.

**EF-04: Bỏ trống trường mã xác nhận**
1. Người dùng không nhập mã và nhấn "Xác nhận".
2. Hệ thống hiển thị thông báo lỗi và không cho tiếp tục.

**EF-05: Mã xác nhận sai**
1. Người dùng nhập mã không khớp với mã được gửi.
2. Hệ thống hiển thị thông báo lỗi "Mã xác nhận không hợp lệ" và không cho tiếp tục.

**EF-06: Mã xác nhận đã hết hạn**
1. Người dùng nhập mã sau khi mã đã hết thời gian hiệu lực.
2. Hệ thống hiển thị thông báo lỗi "Mã xác nhận đã hết hạn" và không cho tiếp tục.

**EF-07: Bỏ trống trường mật khẩu mới**
1. Người dùng không nhập mật khẩu mới và nhấn "Lưu".
2. Hệ thống hiển thị thông báo lỗi và không cập nhật.

**EF-08: Mật khẩu mới không đủ điều kiện**
1. Người dùng nhập mật khẩu mới không đáp ứng yêu cầu (dưới 8 ký tự, thiếu chữ hoa, thiếu ký tự đặc biệt…).
2. Hệ thống hiển thị thông báo lỗi mô tả yêu cầu chưa đáp ứng và không cập nhật mật khẩu.

---

### 4.4.4. Dữ liệu vào
- Email đã đăng ký (Bước 1)
- Mã xác nhận nhận từ email (Bước 2)
- Mật khẩu mới (tối thiểu 8 ký tự, có chữ hoa, chữ thường, chữ số, ký tự đặc biệt) (Bước 3)

### 4.4.5. Dữ liệu ra
- Thông báo phản hồi tại từng bước (thành công hoặc lỗi)
- Email chứa mã xác nhận được gửi đến địa chỉ email người dùng
- Mật khẩu mới được cập nhật trong hệ thống

---

### 4.4.6. Quy tắc nghiệp vụ
- Mã xác nhận chỉ được gửi đến email đã đăng ký và tồn tại trong hệ thống.
- Mã xác nhận có thời hạn hiệu lực; mã hết hạn không được chấp nhận.
- Mỗi mã xác nhận chỉ được sử dụng một lần; sau khi dùng thành công, mã không còn hiệu lực.
- Mật khẩu mới phải đáp ứng cùng yêu cầu với mật khẩu khi đăng ký: tối thiểu 8 ký tự, có chữ hoa, chữ thường, chữ số và ký tự đặc biệt.
- Sau khi đặt lại thành công, mật khẩu cũ bị vô hiệu hóa và không thể dùng để đăng nhập.
- Hệ thống lưu mật khẩu mới dưới dạng mã hóa.

---

### 4.4.7. Điều kiện tiền đề và ràng buộc
- Hệ thống phải có khả năng gửi email; dịch vụ gửi email phải hoạt động bình thường.
- Cơ sở dữ liệu phải truy cập được để kiểm tra email và cập nhật mật khẩu.
- Người dùng phải có thể truy cập hộp thư của địa chỉ email đã đăng ký để lấy mã xác nhận.

---

### 4.4.8. Mức độ ưu tiên
**Mức độ ưu tiên: Cao**

**Lý do:**  
Đây là cơ chế khôi phục tài khoản cốt lõi. Nếu người dùng quên mật khẩu và không có chức năng này, họ sẽ mất quyền truy cập vĩnh viễn, ảnh hưởng nghiêm trọng đến trải nghiệm và độ tin cậy của hệ thống.

---

### 4.4.9. Tiêu chí chấp nhận
- Nhập email đã đăng ký → hệ thống gửi email chứa mã xác nhận và hiển thị thông báo thành công.
- Nhập email chưa đăng ký hoặc sai định dạng → hệ thống hiển thị lỗi, không gửi email.
- Nhập đúng mã xác nhận → hệ thống chuyển sang bước đặt mật khẩu mới.
- Nhập sai mã hoặc mã hết hạn → hệ thống hiển thị lỗi, không cho tiếp tục.
- Mật khẩu mới không đủ điều kiện → hệ thống hiển thị lỗi, không cập nhật.
- Đặt lại thành công → hệ thống chuyển về trang Đăng nhập.
- Đăng nhập với mật khẩu mới → thành công.
- Đăng nhập với mật khẩu cũ sau khi đặt lại → thất bại.
- Sử dụng lại mã đã dùng → hệ thống từ chối với thông báo lỗi.

---

### 4.4.10. Ghi chú
- Các test case tham chiếu: `TC_FP_01` đến `TC_FP_21` (file `TC_AUTH_FORGOT_PASSWORD.md`).
- `TC_FP_16` kiểm tra mã hết hạn — cần biết thời gian hết hạn cụ thể của hệ thống để thực thi test.
- `TC_FP_20` xác nhận mật khẩu cũ không còn dùng được sau khi đặt lại.
- `TC_FP_21` xác nhận mã chỉ dùng được một lần.
- `TC_FP_19` xác nhận đăng nhập thành công với mật khẩu mới.
