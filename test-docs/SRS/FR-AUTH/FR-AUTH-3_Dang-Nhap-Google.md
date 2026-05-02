## 4.3. Chức năng Đăng nhập bằng Google

### 4.3.1. Mô tả chức năng

Chức năng Đăng nhập bằng Google cung cấp phương thức xác thực thay thế thông qua giao thức OAuth 2.0 của Google. Người dùng không cần nhập email và mật khẩu thủ công mà thay vào đó ủy quyền xác thực cho tài khoản Google của họ. Nếu tài khoản Google chưa từng liên kết với hệ thống, hệ thống sẽ tự động tạo tài khoản mới. Nếu đã liên kết trước đó, người dùng được đăng nhập bình thường và chuyển vào giao diện chính.

---

### 4.3.2. Yêu cầu chức năng

**FR-AUTH-3-01:** Hệ thống phải hiển thị nút "Đăng nhập bằng Google" trên trang Đăng nhập.

**FR-AUTH-3-02:** Khi người dùng nhấn nút Google, hệ thống phải mở quy trình xác thực OAuth 2.0 của Google (popup hoặc redirect).

**FR-AUTH-3-03:** Sau khi người dùng hoàn thành xác thực Google thành công, hệ thống phải thiết lập phiên làm việc hợp lệ và chuyển người dùng vào giao diện chính.

**FR-AUTH-3-04:** Nếu tài khoản Google chưa liên kết với bất kỳ tài khoản nào trong hệ thống, hệ thống phải tự động tạo tài khoản mới liên kết với tài khoản Google đó.

**FR-AUTH-3-05:** Nếu người dùng hủy hoặc xác thực Google thất bại, hệ thống phải quay lại trang Đăng nhập mà không gây lỗi crash hoặc màn hình trắng.

**FR-AUTH-3-06:** Hệ thống không được yêu cầu người dùng nhập thêm mật khẩu sau khi xác thực Google thành công.

---

### 4.3.3. Đặc tả Use Case

**Tên Use Case:** Đăng nhập bằng tài khoản Google  
**Mã Use Case:** UC-AUTH-GOOGLE-01

**Mô tả:**  
Người dùng chọn phương thức đăng nhập thông qua tài khoản Google thay vì nhập thủ công email và mật khẩu. Hệ thống thực hiện xác thực OAuth với Google và cho phép người dùng truy cập vào hệ thống sau khi xác thực thành công.

**Tác nhân chính:**  
Người dùng (đã có hoặc chưa có tài khoản trong hệ thống, nhưng có tài khoản Google hợp lệ)

**Tiền điều kiện:**
- Người dùng chưa đăng nhập vào hệ thống.
- Người dùng có tài khoản Google hợp lệ.
- Ứng dụng đang hoạt động bình thường và trang Đăng nhập có thể truy cập.
- Kết nối internet ổn định để thực hiện xác thực với máy chủ Google.

**Kích hoạt:**  
Người dùng nhấn nút "Đăng nhập bằng Google" trên trang Đăng nhập.

**Hậu điều kiện:**
- Nếu thành công: người dùng được xác thực, phiên làm việc được tạo, người dùng được chuyển vào giao diện chính.
- Nếu hủy hoặc thất bại: người dùng quay lại trang Đăng nhập, không có phiên mới được tạo.

#### a. Luồng chính (Basic Flow)
1. Người dùng mở trang Đăng nhập.
2. Hệ thống hiển thị trang Đăng nhập bao gồm nút "Đăng nhập bằng Google".
3. Người dùng nhấn nút "Đăng nhập bằng Google".
4. Hệ thống khởi tạo quy trình xác thực OAuth 2.0 và mở cửa sổ/tab xác thực của Google.
5. Người dùng chọn tài khoản Google và cấp quyền truy cập cho ứng dụng.
6. Google xác thực thành công và trả về thông tin xác thực cho hệ thống.
7. Hệ thống kiểm tra xem tài khoản Google này đã liên kết với tài khoản nào trong hệ thống chưa.
8. Hệ thống tìm thấy tài khoản liên kết (hoặc tạo mới nếu chưa có — xem AF-01).
9. Hệ thống thiết lập phiên làm việc hợp lệ.
10. Hệ thống chuyển người dùng vào giao diện chính (Dashboard).

#### b. Luồng thay thế (Alternative Flow)

**AF-01: Lần đầu đăng nhập bằng Google (tài khoản chưa tồn tại trong hệ thống)**
1. Sau bước 6 của luồng chính, hệ thống không tìm thấy tài khoản liên kết với Google account này.
2. Hệ thống tự động tạo tài khoản mới sử dụng thông tin từ Google (tên, email).
3. Hệ thống tạo workspace cá nhân cho tài khoản mới.
4. Hệ thống thiết lập phiên làm việc hợp lệ.
5. Hệ thống chuyển người dùng vào giao diện chính.

#### c. Luồng ngoại lệ (Exception Flow)

**EF-01: Người dùng hủy xác thực Google**
1. Tại cửa sổ/tab xác thực của Google, người dùng đóng cửa sổ hoặc nhấn "Cancel".
2. Google trả về thông báo hủy cho hệ thống.
3. Hệ thống đóng quy trình xác thực.
4. Hệ thống quay lại trang Đăng nhập mà không hiển thị lỗi crash hay màn hình trắng.

**EF-02: Xác thực Google thất bại do lỗi kỹ thuật**
1. Trong quá trình xác thực, xảy ra lỗi từ phía Google hoặc lỗi mạng.
2. Hệ thống không nhận được thông tin xác thực hợp lệ từ Google.
3. Hệ thống hiển thị thông báo lỗi và quay lại trang Đăng nhập.

---

### 4.3.4. Dữ liệu vào
- Thông tin xác thực OAuth 2.0 từ Google (authorization code / access token)
- Thông tin người dùng từ Google (tên, địa chỉ email, Google ID)

### 4.3.5. Dữ liệu ra
- Trạng thái đăng nhập thành công hoặc thất bại
- Phiên làm việc hợp lệ sau khi thành công
- Tài khoản người dùng mới (trong trường hợp đăng nhập Google lần đầu)
- Thông báo phản hồi phù hợp với từng trường hợp

---

### 4.3.6. Quy tắc nghiệp vụ
- Hệ thống sử dụng giao thức OAuth 2.0 để xác thực với Google; không lưu mật khẩu Google của người dùng.
- Mỗi tài khoản Google chỉ được liên kết với một tài khoản trong hệ thống.
- Khi đăng nhập Google lần đầu, hệ thống tự động tạo tài khoản dựa trên thông tin Google cung cấp.
- Người dùng hủy hoặc xác thực thất bại thì không có phiên mới được tạo và không có tài khoản mới được tạo.
- Sau khi xác thực Google thành công, quyền truy cập trong hệ thống vẫn tuân theo vai trò và quyền hạn của tài khoản đó.

---

### 4.3.7. Điều kiện tiền đề và ràng buộc
- Hệ thống phải được cấu hình đúng với Google OAuth 2.0 (Client ID, Client Secret, Redirect URI).
- Kết nối internet ổn định là bắt buộc để thực hiện xác thực với máy chủ Google.
- Dịch vụ OAuth và cơ sở dữ liệu phải hoạt động bình thường.

---

### 4.3.8. Mức độ ưu tiên
**Mức độ ưu tiên: Trung bình**

**Lý do:**  
Đây là phương thức đăng nhập bổ sung, giúp tăng trải nghiệm người dùng. Chức năng đăng nhập thông thường vẫn là phương thức chính; đăng nhập Google là tùy chọn tiện lợi thêm.

---

### 4.3.9. Tiêu chí chấp nhận
- Nút "Đăng nhập bằng Google" hiển thị trên trang Đăng nhập với icon Google rõ ràng.
- Nhấn nút Google mở ra cửa sổ/tab xác thực của Google.
- Hoàn thành xác thực Google thành công → người dùng được chuyển vào Dashboard.
- Đăng nhập Google lần đầu với tài khoản mới → hệ thống tự động tạo tài khoản và workspace.
- Hủy xác thực Google → quay lại trang Đăng nhập, không có lỗi crash.
- Sau đăng nhập Google thành công, người dùng có thể truy cập các tính năng như đăng nhập thông thường.

---

### 4.3.10. Ghi chú
- Các test case tham chiếu: `TC_GOOGLE_01` đến `TC_GOOGLE_07` (file `TC_AUTH_GOOGLE.md`).
- `TC_GOOGLE_06` xác nhận hệ thống tự tạo tài khoản khi đăng nhập Google lần đầu.
- `TC_GOOGLE_05` xác nhận hủy xác thực không gây lỗi crash.
- `TC_GOOGLE_07` xác nhận sau xác thực thành công người dùng vào đúng trang Dashboard.
- `TC_GOOGLE_02` kiểm tra nút Google có xuất hiện trên trang Đăng ký không (có thể N/A tùy thiết kế).
