## 5.2. Chức năng Đổi mật khẩu

### 5.2.1. Mô tả chức năng

Chức năng Đổi mật khẩu cho phép người dùng đang đăng nhập thay đổi mật khẩu tài khoản của mình thông qua trang cài đặt bảo mật. Người dùng phải xác nhận đúng mật khẩu hiện tại trước khi được phép đặt mật khẩu mới, đảm bảo chỉ chủ tài khoản mới có thể thực hiện thao tác này. Sau khi đổi thành công, mật khẩu cũ bị vô hiệu hóa ngay lập tức.

---

### 5.2.2. Yêu cầu chức năng

**FR-USER-2-01:** Hệ thống phải cung cấp biểu mẫu đổi mật khẩu với tối thiểu hai trường: Mật khẩu hiện tại và Mật khẩu mới.

**FR-USER-2-02:** Tất cả trường mật khẩu phải hiển thị dạng ẩn (***); có thể cung cấp nút toggle hiển thị/ẩn.

**FR-USER-2-03:** Hệ thống phải từ chối nếu bất kỳ trường bắt buộc nào bị để trống.

**FR-USER-2-04:** Hệ thống phải xác minh mật khẩu hiện tại khớp với mật khẩu đang được lưu trong tài khoản; từ chối và báo lỗi nếu sai.

**FR-USER-2-05:** Hệ thống phải kiểm tra mật khẩu mới đáp ứng đồng thời các yêu cầu: tối thiểu 8 ký tự, có ít nhất một chữ hoa, một chữ thường, một chữ số và một ký tự đặc biệt.

**FR-USER-2-06:** Sau khi đổi mật khẩu thành công, hệ thống phải hiển thị thông báo thành công.

**FR-USER-2-07:** Sau khi đổi mật khẩu thành công, mật khẩu cũ phải bị vô hiệu hóa ngay lập tức; không thể dùng mật khẩu cũ để đăng nhập.

---

### 5.2.3. Đặc tả Use Case

**Tên Use Case:** Đổi mật khẩu tài khoản  
**Mã Use Case:** UC-USER-CHGPW-01

**Mô tả:**  
Người dùng đang đăng nhập thực hiện thay đổi mật khẩu tài khoản của mình bằng cách xác nhận mật khẩu hiện tại và cung cấp mật khẩu mới đáp ứng yêu cầu bảo mật.

**Tác nhân chính:**  
Người dùng đã đăng nhập

**Tiền điều kiện:**
- Người dùng đã đăng nhập thành công.
- Người dùng đang ở trang cài đặt bảo mật hoặc trang Đổi mật khẩu.
- Tài khoản không được đăng nhập bằng phương thức Google OAuth (hoặc có xử lý riêng cho trường hợp này).

**Kích hoạt:**  
Người dùng điền thông tin vào biểu mẫu đổi mật khẩu và nhấn nút "Lưu" / "Cập nhật".

**Hậu điều kiện:**
- Nếu thành công: mật khẩu mới có hiệu lực, mật khẩu cũ bị vô hiệu hóa; người dùng nhận thông báo thành công.
- Nếu thất bại: mật khẩu không thay đổi; thông báo lỗi hiển thị tại trường tương ứng.

#### a. Luồng chính (Basic Flow)
1. Người dùng mở trang Đổi mật khẩu.
2. Hệ thống hiển thị biểu mẫu với các trường: Mật khẩu hiện tại, Mật khẩu mới (và Xác nhận mật khẩu mới nếu có).
3. Người dùng nhập mật khẩu hiện tại đúng.
4. Người dùng nhập mật khẩu mới đáp ứng yêu cầu bảo mật.
5. Người dùng nhấn "Lưu".
6. Hệ thống kiểm tra không có trường nào bị trống.
7. Hệ thống xác minh mật khẩu hiện tại khớp với dữ liệu lưu trữ.
8. Hệ thống kiểm tra mật khẩu mới đáp ứng các yêu cầu (độ dài, ký tự hoa/thường/số/đặc biệt).
9. Hệ thống cập nhật mật khẩu mới (lưu dạng mã hóa), vô hiệu hóa mật khẩu cũ.
10. Hệ thống hiển thị thông báo đổi mật khẩu thành công.

#### b. Luồng thay thế (Alternative Flow)

*(Không có luồng thay thế đặc biệt cho chức năng này.)*

#### c. Luồng ngoại lệ (Exception Flow)

**EF-01: Bỏ trống trường mật khẩu hiện tại**
1. Người dùng để trống trường Mật khẩu hiện tại và nhấn "Lưu".
2. Hệ thống hiển thị thông báo lỗi tại trường Mật khẩu hiện tại; không thực hiện thay đổi.

**EF-02: Bỏ trống trường mật khẩu mới**
1. Người dùng để trống trường Mật khẩu mới và nhấn "Lưu".
2. Hệ thống hiển thị thông báo lỗi tại trường Mật khẩu mới; không thực hiện thay đổi.

**EF-03: Mật khẩu hiện tại sai**
1. Người dùng nhập sai mật khẩu hiện tại.
2. Hệ thống xác định mật khẩu không khớp.
3. Hệ thống hiển thị thông báo lỗi "Mật khẩu hiện tại không đúng"; mật khẩu không thay đổi.

**EF-04: Mật khẩu mới không đủ điều kiện**
1. Người dùng nhập mật khẩu mới không đáp ứng một hoặc nhiều yêu cầu (dưới 8 ký tự, thiếu chữ hoa, thiếu chữ thường, thiếu chữ số, thiếu ký tự đặc biệt).
2. Hệ thống hiển thị thông báo lỗi mô tả yêu cầu chưa đáp ứng; mật khẩu không thay đổi.

---

### 5.2.4. Dữ liệu vào
- Mật khẩu hiện tại (bắt buộc)
- Mật khẩu mới (tối thiểu 8 ký tự, có chữ hoa, chữ thường, chữ số, ký tự đặc biệt; bắt buộc)

### 5.2.5. Dữ liệu ra
- Thông báo thành công khi mật khẩu được cập nhật
- Thông báo lỗi chi tiết tại từng trường khi dữ liệu không hợp lệ

---

### 5.2.6. Quy tắc nghiệp vụ
- Người dùng phải cung cấp đúng mật khẩu hiện tại để được phép đổi; đây là cơ chế xác minh danh tính bổ sung.
- Mật khẩu mới phải đáp ứng: tối thiểu 8 ký tự, ít nhất 1 chữ hoa, 1 chữ thường, 1 chữ số, 1 ký tự đặc biệt.
- Sau khi đổi thành công, mật khẩu cũ không còn hiệu lực ngay lập tức.
- Mật khẩu mới được lưu dưới dạng mã hóa; không lưu dạng văn bản thường.
- Mật khẩu mới trùng với mật khẩu cũ: tùy thiết kế hệ thống (chấp nhận hoặc hiển thị cảnh báo).

---

### 5.2.7. Điều kiện tiền đề và ràng buộc
- Người dùng phải đang trong trạng thái đăng nhập hợp lệ.
- Cơ sở dữ liệu phải truy cập được để xác minh và cập nhật mật khẩu.

---

### 5.2.8. Mức độ ưu tiên
**Mức độ ưu tiên: Cao**

**Lý do:**  
Đổi mật khẩu là chức năng bảo mật cơ bản, cho phép người dùng chủ động bảo vệ tài khoản. Đây cũng là yêu cầu bảo mật tối thiểu của hầu hết các hệ thống hiện đại.

---

### 5.2.9. Tiêu chí chấp nhận
- Nhập đúng mật khẩu hiện tại và mật khẩu mới hợp lệ → đổi thành công, thông báo thành công hiển thị.
- Nhập sai mật khẩu hiện tại → hệ thống hiển thị lỗi, mật khẩu không thay đổi.
- Mật khẩu mới không đủ điều kiện → hệ thống hiển thị lỗi chi tiết cho từng yêu cầu chưa đáp ứng.
- Bỏ trống bất kỳ trường nào → hệ thống hiển thị lỗi tại trường đó.
- Mật khẩu mới đúng 8 ký tự hợp lệ → được chấp nhận (boundary test).
- Sau đổi thành công, đăng nhập với mật khẩu mới → thành công.
- Sau đổi thành công, đăng nhập với mật khẩu cũ → thất bại.

---

### 5.2.10. Ghi chú
- Các test case tham chiếu: `TC_CHGPW_01` đến `TC_CHGPW_17` (file `TC_USER_CHANGE_PASSWORD.md`).
- `TC_CHGPW_12` xác nhận mật khẩu đúng 8 ký tự được chấp nhận (boundary).
- `TC_CHGPW_15` kiểm tra trường hợp mật khẩu mới trùng mật khẩu cũ — kết quả tùy thiết kế.
- `TC_CHGPW_16` xác nhận mật khẩu mới có hiệu lực ngay sau khi đổi.
- `TC_CHGPW_17` xác nhận mật khẩu cũ không còn dùng được sau khi đổi.
- Lưu ý: sau mỗi lần test cần reset mật khẩu về giá trị ban đầu để không ảnh hưởng các test case khác.
