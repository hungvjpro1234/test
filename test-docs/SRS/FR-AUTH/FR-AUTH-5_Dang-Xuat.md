## 4.5. Chức năng Đăng xuất

### 4.5.1. Mô tả chức năng

Chức năng Đăng xuất cho phép người dùng kết thúc phiên làm việc hiện tại một cách an toàn và có kiểm soát. Sau khi đăng xuất, hệ thống hủy phiên làm việc, xóa trạng thái xác thực và chuyển người dùng về trang Đăng nhập. Mọi cố gắng truy cập lại các trang được bảo vệ sau khi đăng xuất đều bị chặn và tự động chuyển hướng về trang Đăng nhập.

---

### 4.5.2. Yêu cầu chức năng

**FR-AUTH-5-01:** Hệ thống phải hiển thị tùy chọn Đăng xuất trên giao diện chính khi người dùng đã đăng nhập.

**FR-AUTH-5-02:** Khi người dùng xác nhận đăng xuất, hệ thống phải kết thúc phiên làm việc hiện tại và hủy bỏ thông tin xác thực tương ứng.

**FR-AUTH-5-03:** Sau khi đăng xuất, hệ thống phải chuyển người dùng về trang Đăng nhập.

**FR-AUTH-5-04:** Sau khi đăng xuất, hệ thống phải ngăn người dùng truy cập bất kỳ trang được bảo vệ nào, kể cả khi dùng URL trực tiếp hoặc nút Back của trình duyệt.

**FR-AUTH-5-05:** Sau khi đăng xuất, giao diện không được hiển thị thông tin cá nhân của người dùng vừa đăng xuất.

**FR-AUTH-5-06:** Người dùng phải có thể đăng nhập lại bình thường sau khi đã đăng xuất.

---

### 4.5.3. Đặc tả Use Case

**Tên Use Case:** Đăng xuất khỏi hệ thống  
**Mã Use Case:** UC-AUTH-LOGOUT-01

**Mô tả:**  
Người dùng chủ động kết thúc phiên làm việc. Hệ thống hủy phiên, xóa trạng thái xác thực và đưa người dùng về trạng thái chưa đăng nhập, đảm bảo không ai có thể tiếp tục sử dụng phiên đó.

**Tác nhân chính:**  
Người dùng đang đăng nhập

**Tiền điều kiện:**
- Người dùng đã đăng nhập thành công và đang ở trong giao diện chính.
- Ứng dụng đang hoạt động bình thường.

**Kích hoạt:**  
Người dùng chọn tùy chọn "Đăng xuất" từ menu hoặc thanh điều hướng.

**Hậu điều kiện:**
- Phiên làm việc bị hủy; thông tin xác thực không còn hiệu lực.
- Người dùng được chuyển về trang Đăng nhập.
- Mọi trang được bảo vệ không còn truy cập được cho đến khi đăng nhập lại.

#### a. Luồng chính (Basic Flow)
1. Người dùng đang ở giao diện chính trong trạng thái đăng nhập hợp lệ.
2. Người dùng tìm và nhấn tùy chọn "Đăng xuất" (trên menu người dùng hoặc thanh điều hướng).
3. Hệ thống hiển thị hộp thoại xác nhận (nếu có trong thiết kế).
4. Người dùng xác nhận đăng xuất.
5. Hệ thống hủy phiên làm việc hiện tại và xóa thông tin xác thực (token/session).
6. Hệ thống chuyển người dùng về trang Đăng nhập.
7. Trang Đăng nhập hiển thị mà không còn thông tin của người dùng vừa đăng xuất.

#### b. Luồng thay thế (Alternative Flow)

**AF-01: Người dùng hủy xác nhận đăng xuất**
1. Hệ thống hiển thị hộp thoại xác nhận đăng xuất.
2. Người dùng nhấn "Hủy" trên hộp thoại.
3. Hệ thống đóng hộp thoại; người dùng vẫn ở trạng thái đăng nhập và tiếp tục sử dụng hệ thống bình thường.

#### c. Luồng ngoại lệ (Exception Flow)

**EF-01: Cố truy cập URL trang được bảo vệ sau khi đăng xuất**
1. Sau khi đăng xuất, người dùng nhập trực tiếp URL nội bộ (ví dụ: `/dashboard`) vào thanh địa chỉ.
2. Hệ thống phát hiện không có phiên hợp lệ.
3. Hệ thống tự động chuyển hướng về trang Đăng nhập; không hiển thị nội dung trang nội bộ.

**EF-02: Nhấn nút Back trình duyệt sau khi đăng xuất**
1. Sau khi đăng xuất, người dùng nhấn nút Back của trình duyệt.
2. Hệ thống phát hiện phiên không hợp lệ.
3. Hệ thống không hiển thị lại nội dung trang được bảo vệ; chuyển về trang Đăng nhập hoặc hiển thị thông báo phiên hết hạn.

**EF-03: Đăng xuất khi đang mở nhiều tab**
1. Người dùng mở nhiều tab với cùng tài khoản và đăng xuất trên một tab.
2. Phiên làm việc bị hủy ở server.
3. Khi người dùng thực hiện hành động tiếp theo trên các tab còn lại, hệ thống phát hiện phiên không còn hợp lệ và chuyển hướng về trang Đăng nhập.

---

### 4.5.4. Dữ liệu vào
- Yêu cầu đăng xuất từ người dùng (thao tác nhấn nút/menu)
- Thông tin phiên hiện tại (token/session ID) để hệ thống xác định phiên cần hủy

### 4.5.5. Dữ liệu ra
- Phiên làm việc bị hủy (token/session không còn hiệu lực)
- Chuyển hướng về trang Đăng nhập
- Trạng thái giao diện được đặt lại về trạng thái chưa đăng nhập

---

### 4.5.6. Quy tắc nghiệp vụ
- Sau khi đăng xuất, phiên làm việc phải bị hủy hoàn toàn ở cả client và server.
- Người dùng không thể truy cập trang được bảo vệ sau khi đăng xuất, kể cả dùng URL trực tiếp hoặc nút Back.
- Mỗi lần đăng nhập tạo ra một phiên mới độc lập; phiên cũ sau khi đăng xuất không gây xung đột với phiên mới.
- Giao diện sau đăng xuất không được rò rỉ thông tin cá nhân của người dùng vừa đăng xuất.

---

### 4.5.7. Điều kiện tiền đề và ràng buộc
- Người dùng phải đang trong trạng thái đăng nhập hợp lệ để thực hiện đăng xuất.
- Dịch vụ quản lý phiên (session/token service) phải hoạt động bình thường để hủy phiên đúng cách.

---

### 4.5.8. Mức độ ưu tiên
**Mức độ ưu tiên: Cao**

**Lý do:**  
Đây là chức năng bảo mật thiết yếu. Nếu không có cơ chế đăng xuất đúng đắn, người dùng không thể bảo vệ tài khoản khi sử dụng trên thiết bị dùng chung, gây rủi ro bảo mật nghiêm trọng.

---

### 4.5.9. Tiêu chí chấp nhận
- Nhấn "Đăng xuất" → hệ thống hủy phiên và chuyển về trang Đăng nhập.
- Sau đăng xuất, truy cập URL nội bộ → hệ thống tự chuyển về trang Đăng nhập, không hiển thị nội dung.
- Sau đăng xuất, nhấn nút Back → hệ thống không cho vào lại trang được bảo vệ.
- Đăng nhập lại sau khi đăng xuất → thành công bình thường.
- Trang Đăng nhập sau khi đăng xuất không hiển thị thông tin người dùng vừa thoát.
- Mở nhiều tab cùng tài khoản, đăng xuất trên một tab → các tab còn lại bị mất phiên khi thao tác tiếp theo.

---

### 4.5.10. Ghi chú
- Các test case tham chiếu: `TC_LOGOUT_01` đến `TC_LOGOUT_09` (file `TC_AUTH_LOGOUT.md`).
- `TC_LOGOUT_02` kiểm tra hộp thoại xác nhận — đánh dấu N/A nếu thiết kế không có confirm dialog.
- `TC_LOGOUT_04` xác nhận chặn truy cập URL trực tiếp sau đăng xuất.
- `TC_LOGOUT_05` xác nhận nút Back trình duyệt không vào lại được trang nội bộ.
- `TC_LOGOUT_07` xác nhận mỗi lần đăng nhập tạo phiên mới, phiên cũ không gây xung đột.
- `TC_LOGOUT_08` kiểm tra hành vi đa tab — kết quả tùy thiết kế của hệ thống.
