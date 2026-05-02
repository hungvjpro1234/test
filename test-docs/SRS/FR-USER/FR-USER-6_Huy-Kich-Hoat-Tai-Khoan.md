## 5.6. Chức năng Hủy kích hoạt tài khoản

### 5.6.1. Mô tả chức năng

Chức năng Hủy kích hoạt tài khoản cho phép người dùng tự vô hiệu hóa tài khoản của mình. Đây là thao tác không thể hoàn tác từ phía người dùng; chỉ quản trị viên mới có thể mở khóa lại tài khoản đã bị hủy kích hoạt. Trước khi thực hiện, hệ thống phải hiển thị hộp thoại xác nhận với cảnh báo rõ ràng về hệ quả. Sau khi xác nhận, tài khoản bị vô hiệu hóa ngay lập tức và người dùng bị đăng xuất; không thể đăng nhập lại cho đến khi được quản trị viên mở khóa.

---

### 5.6.2. Yêu cầu chức năng

**FR-USER-6-01:** Hệ thống phải cung cấp tùy chọn "Hủy tài khoản" trong trang cài đặt tài khoản.

**FR-USER-6-02:** Khi người dùng chọn hủy tài khoản, hệ thống phải hiển thị hộp thoại xác nhận với cảnh báo rõ ràng về hệ quả (tài khoản bị vô hiệu hóa và không thể tự khôi phục).

**FR-USER-6-03:** Hệ thống phải cung cấp hai lựa chọn trong hộp thoại: "Xác nhận" (tiến hành hủy) và "Hủy" (hủy bỏ thao tác).

**FR-USER-6-04:** Nếu người dùng chọn "Hủy" trong hộp thoại, tài khoản không bị ảnh hưởng; người dùng vẫn đang đăng nhập và sử dụng bình thường.

**FR-USER-6-05:** Nếu người dùng xác nhận, hệ thống phải vô hiệu hóa tài khoản ngay lập tức và đăng xuất người dùng, chuyển về trang Đăng nhập.

**FR-USER-6-06:** Sau khi tài khoản bị hủy kích hoạt, người dùng không thể đăng nhập lại bằng tài khoản đó.

**FR-USER-6-07:** Tài khoản đã hủy kích hoạt vẫn tồn tại trong hệ thống với trạng thái "Đã vô hiệu hóa" (Inactive); quản trị viên có thể xem và quản lý.

---

### 5.6.3. Đặc tả Use Case

**Tên Use Case:** Hủy kích hoạt tài khoản cá nhân  
**Mã Use Case:** UC-USER-DEACT-01

**Mô tả:**  
Người dùng chủ động vô hiệu hóa tài khoản của mình thông qua trang cài đặt. Sau khi xác nhận, tài khoản bị vô hiệu hóa, phiên làm việc kết thúc và người dùng không thể đăng nhập lại cho đến khi quản trị viên phục hồi tài khoản.

**Tác nhân chính:**  
Người dùng đã đăng nhập

**Tác nhân phụ:**  
Quản trị viên (để xác minh trạng thái tài khoản sau khi hủy)

**Tiền điều kiện:**
- Người dùng đã đăng nhập thành công.
- Người dùng đang ở trang cài đặt tài khoản.

**Kích hoạt:**  
Người dùng nhấn tùy chọn "Hủy tài khoản" trên trang cài đặt.

**Hậu điều kiện:**
- Nếu xác nhận: tài khoản bị vô hiệu hóa; phiên làm việc kết thúc; người dùng được chuyển về trang Đăng nhập; không thể đăng nhập lại.
- Nếu hủy bỏ: tài khoản không thay đổi; người dùng vẫn đang đăng nhập và tiếp tục sử dụng bình thường.

#### a. Luồng chính (Basic Flow)
1. Người dùng mở trang cài đặt tài khoản.
2. Hệ thống hiển thị tùy chọn "Hủy tài khoản" (Deactivate Account).
3. Người dùng nhấn nút/link "Hủy tài khoản".
4. Hệ thống hiển thị hộp thoại xác nhận với cảnh báo về hệ quả (tài khoản bị vô hiệu hóa, không tự khôi phục được).
5. Người dùng đọc cảnh báo và nhấn "Xác nhận".
6. Hệ thống vô hiệu hóa tài khoản ngay lập tức (đổi trạng thái sang Inactive).
7. Hệ thống kết thúc phiên làm việc hiện tại.
8. Hệ thống chuyển người dùng về trang Đăng nhập.

#### b. Luồng thay thế (Alternative Flow)

**AF-01: Người dùng hủy bỏ thao tác trong hộp thoại**
1. Hộp thoại xác nhận đang hiển thị.
2. Người dùng nhấn "Hủy" / "Cancel" trong hộp thoại.
3. Hộp thoại đóng lại.
4. Tài khoản không bị ảnh hưởng; người dùng vẫn đang đăng nhập và sử dụng bình thường.

#### c. Luồng ngoại lệ (Exception Flow)

**EF-01: Cố truy cập trang được bảo vệ sau khi hủy kích hoạt**
1. Tài khoản đã bị hủy kích hoạt.
2. Người dùng cố truy cập trực tiếp URL trang nội bộ (Dashboard).
3. Hệ thống phát hiện phiên/tài khoản không hợp lệ.
4. Hệ thống chuyển về trang Đăng nhập; không hiển thị nội dung trang được bảo vệ.

**EF-02: Cố đăng nhập lại sau khi hủy kích hoạt**
1. Người dùng thử đăng nhập với credentials của tài khoản đã hủy.
2. Hệ thống kiểm tra trạng thái tài khoản.
3. Hệ thống hiển thị thông báo tài khoản không tồn tại hoặc đã bị vô hiệu hóa; từ chối đăng nhập.

---

### 5.6.4. Dữ liệu vào
- Hành động xác nhận hủy tài khoản từ người dùng (nhấn nút Xác nhận trong hộp thoại)

### 5.6.5. Dữ liệu ra
- Trạng thái tài khoản được đổi thành "Đã vô hiệu hóa" (Inactive) trong hệ thống
- Phiên làm việc bị kết thúc ngay lập tức
- Chuyển hướng về trang Đăng nhập
- Tài khoản vẫn tồn tại trong hệ thống (để quản trị viên có thể xem và quản lý)

---

### 5.6.6. Quy tắc nghiệp vụ
- Hủy kích hoạt tài khoản là thao tác không thể tự hoàn tác từ phía người dùng; chỉ quản trị viên mới có thể mở khóa lại.
- Hệ thống phải yêu cầu xác nhận rõ ràng (hộp thoại với cảnh báo) trước khi thực hiện; không cho phép hủy tài khoản ngay khi nhấn nút lần đầu.
- Sau khi hủy, tài khoản không bị xóa hoàn toàn khỏi cơ sở dữ liệu mà chỉ chuyển sang trạng thái vô hiệu hóa.
- Tài khoản đã vô hiệu hóa không thể đăng nhập cho đến khi quản trị viên mở khóa (xem FR-ADMIN-4.2).

---

### 5.6.7. Điều kiện tiền đề và ràng buộc
- Người dùng phải đang trong trạng thái đăng nhập hợp lệ.
- Cơ sở dữ liệu phải truy cập được để cập nhật trạng thái tài khoản.
- Chức năng này không áp dụng cho tài khoản Super Admin (cần ràng buộc bổ sung để tránh mất quyền quản trị hệ thống).

---

### 5.6.8. Mức độ ưu tiên
**Mức độ ưu tiên: Trung bình**

**Lý do:**  
Đây là tính năng trao quyền tự quản lý cho người dùng, phù hợp với các tiêu chuẩn về quyền riêng tư. Tuy nhiên, cần thiết kế cẩn thận với các biện pháp bảo vệ (confirm dialog, cảnh báo rõ ràng) để tránh hủy tài khoản nhầm.

---

### 5.6.9. Tiêu chí chấp nhận
- Tùy chọn "Hủy tài khoản" hiển thị trong trang cài đặt.
- Nhấn nút hủy → hộp thoại xác nhận hiển thị với cảnh báo rõ ràng và hai lựa chọn (Xác nhận / Hủy).
- Nhấn "Hủy" trong hộp thoại → tài khoản không bị ảnh hưởng, người dùng vẫn đăng nhập.
- Nhấn "Xác nhận" → tài khoản bị vô hiệu hóa, người dùng bị đăng xuất và chuyển về trang Đăng nhập ngay lập tức.
- Sau khi hủy, thử đăng nhập lại → hệ thống từ chối với thông báo tài khoản đã bị vô hiệu hóa.
- Sau khi hủy, truy cập URL nội bộ trực tiếp → hệ thống chuyển về trang Đăng nhập.
- Quản trị viên vào trang quản lý người dùng → thấy tài khoản đã hủy với trạng thái "Đã vô hiệu hóa".

---

### 5.6.10. Ghi chú
- Các test case tham chiếu: `TC_DEACT_01` đến `TC_DEACT_09` (file `TC_USER_DEACTIVE.MD`).
- `TC_DEACT_04` xác nhận nhấn "Hủy" trong dialog không gây ảnh hưởng đến tài khoản.
- `TC_DEACT_06` xác nhận tài khoản đã hủy không thể đăng nhập lại.
- `TC_DEACT_09` xác nhận quản trị viên thấy tài khoản ở trạng thái "Đã vô hiệu hóa".
- **Cảnh báo quan trọng:** Mỗi lần thực thi test case này cần tạo lại tài khoản test (`deactivate_test@test.com`) vì sau test tài khoản sẽ bị hủy.
- Chức năng mở lại tài khoản đã bị hủy nằm ở FR-ADMIN-4.2 (Mở khóa tài khoản).
