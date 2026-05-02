## 8.3. Chức năng Quản lý người dùng

### 8.3.1. Mô tả chức năng

Chức năng Quản lý người dùng cung cấp cho Quản trị viên công cụ để xem danh sách tài khoản (có phân trang, tìm kiếm, lọc), xem chi tiết từng tài khoản, tạo tài khoản mới và cập nhật thông tin người dùng. Dữ liệu tạo/cập nhật được xác thực nghiêm ngặt (email hợp lệ, mật khẩu đủ điều kiện, tên không trống và không vượt giới hạn ký tự). Mật khẩu không được lưu dạng plaintext. Tài khoản mới có thể đăng nhập bình thường.

---

### 8.3.2. Yêu cầu chức năng

**FR-ADMIN-3-01:** Hệ thống phải hiển thị danh sách người dùng theo trang; mỗi hàng gồm: tên, email, vai trò, trạng thái, ngày tạo. Hỗ trợ tìm kiếm theo tên/email và lọc theo vai trò/trạng thái.

**FR-ADMIN-3-02:** Hệ thống phải cho phép xem chi tiết một tài khoản với đầy đủ thông tin: họ tên, email, vai trò, ngày tạo, trạng thái (đang hoạt động / bị khóa).

**FR-ADMIN-3-03:** Hệ thống phải hiển thị thông báo "không tìm thấy" khi tìm kiếm tài khoản không tồn tại.

**FR-ADMIN-3-04:** Hệ thống phải cho phép Quản trị viên tạo tài khoản mới với: họ tên (bắt buộc, tối đa 100 ký tự), email (bắt buộc, đúng định dạng, chưa tồn tại), mật khẩu (bắt buộc, tối thiểu 8 ký tự, có chữ hoa, chữ thường, số, ký tự đặc biệt).

**FR-ADMIN-3-05:** Hệ thống phải từ chối tạo tài khoản nếu email đã tồn tại; hiển thị thông báo "Email đã tồn tại".

**FR-ADMIN-3-06:** Hệ thống phải từ chối tạo nếu email sai định dạng, mật khẩu không đủ điều kiện, hoặc họ tên trống/vượt 100 ký tự.

**FR-ADMIN-3-07:** Tài khoản mới do Admin tạo phải có thể đăng nhập bình thường ngay sau khi tạo.

**FR-ADMIN-3-08:** Mật khẩu phải được lưu dưới dạng đã mã hóa (hash) trong cơ sở dữ liệu — không lưu plaintext.

**FR-ADMIN-3-09:** Hệ thống phải cho phép Quản trị viên cập nhật thông tin người dùng (họ tên, email…) với xác thực tương tự khi tạo; từ chối nếu dữ liệu không hợp lệ.

---

### 8.3.3. Đặc tả Use Case

**Tên Use Case:** Quản lý danh sách và thông tin tài khoản người dùng  
**Mã Use Case:** UC-ADMIN-USER-01

**Mô tả:**  
Quản trị viên xem, tìm kiếm danh sách người dùng; xem chi tiết từng tài khoản; tạo tài khoản mới; và cập nhật thông tin người dùng hiện có.

**Tác nhân chính:**  
Quản trị viên (Admin / Super Admin) đã đăng nhập

**Tiền điều kiện:**
- Người dùng đã đăng nhập với vai trò Admin hoặc Super Admin.
- Hệ thống có ít nhất 5 tài khoản người dùng mẫu.

**Kích hoạt:**  
Quản trị viên truy cập trang Quản lý người dùng trong Admin Panel.

**Hậu điều kiện:**
- Tạo tài khoản: tài khoản mới xuất hiện trong danh sách và có thể đăng nhập.
- Cập nhật: thông tin mới được lưu và hiển thị đúng.
- Tìm kiếm/xem: dữ liệu hiển thị đúng theo yêu cầu.

#### a. Luồng chính (Basic Flow)

**Xem danh sách người dùng (FR-ADMIN-3.1)**
1. Quản trị viên mở trang Quản lý người dùng.
2. Hệ thống hiển thị danh sách người dùng theo trang; mỗi hàng có tên, email, vai trò, trạng thái, ngày tạo.
3. Quản trị viên có thể điều hướng giữa các trang.

**Tạo tài khoản mới (FR-ADMIN-3.4)**
1. Quản trị viên nhấn nút "Tạo tài khoản mới".
2. Hệ thống hiển thị form với các trường bắt buộc: Họ tên (*), Email (*), Mật khẩu (*), Vai trò.
3. Quản trị viên điền đầy đủ thông tin hợp lệ.
4. Hệ thống kiểm tra: email chưa tồn tại, đúng định dạng; mật khẩu đủ điều kiện; họ tên không trống và ≤ 100 ký tự.
5. Hệ thống tạo tài khoản; lưu mật khẩu dạng hash; tài khoản mới xuất hiện trong danh sách.
6. Tài khoản mới có thể đăng nhập bình thường.

**Cập nhật thông tin người dùng (FR-ADMIN-3.5)**
1. Quản trị viên mở chi tiết tài khoản.
2. Quản trị viên chỉnh sửa thông tin (ví dụ: họ tên mới).
3. Hệ thống kiểm tra dữ liệu hợp lệ.
4. Hệ thống lưu thành công; chi tiết tài khoản hiển thị thông tin mới.

#### b. Luồng thay thế (Alternative Flow)

**AF-01: Tìm kiếm người dùng theo tên/email**
1. Quản trị viên nhập từ khóa vào ô tìm kiếm.
2. Hệ thống hiển thị chỉ các tài khoản khớp với từ khóa.

**AF-02: Xem chi tiết tài khoản (FR-ADMIN-3.2)**
1. Quản trị viên nhấp vào một tài khoản trong danh sách.
2. Hệ thống hiển thị đầy đủ: họ tên, email, vai trò, ngày tạo, trạng thái.

#### c. Luồng ngoại lệ (Exception Flow)

**EF-01: Tìm kiếm tài khoản không tồn tại (FR-ADMIN-3.3)**
1. Quản trị viên nhập từ khóa không khớp với bất kỳ tài khoản nào.
2. Hệ thống hiển thị thông báo "Không tìm thấy" hoặc danh sách rỗng.

**EF-02: Tạo tài khoản với email đã tồn tại**
1. Quản trị viên nhập email đã có trong hệ thống.
2. Hệ thống hiển thị thông báo lỗi "Email đã tồn tại"; không tạo tài khoản.

**EF-03: Tạo tài khoản với email sai định dạng**
1. Quản trị viên nhập email không đúng định dạng.
2. Hệ thống hiển thị thông báo lỗi tại trường email; không tạo.

**EF-04: Tạo tài khoản với mật khẩu không đủ điều kiện**
1. Quản trị viên nhập mật khẩu không đủ (thiếu chữ hoa, số, ký tự đặc biệt hoặc < 8 ký tự).
2. Hệ thống hiển thị thông báo lỗi mô tả yêu cầu; không tạo.

**EF-05: Tạo tài khoản với họ tên trống hoặc quá 100 ký tự**
1. Quản trị viên để trống hoặc nhập họ tên vượt 100 ký tự.
2. Hệ thống hiển thị thông báo lỗi; không tạo.

**EF-06: Cập nhật với dữ liệu không hợp lệ**
1. Quản trị viên lưu cập nhật với họ tên > 100 ký tự hoặc email sai định dạng.
2. Hệ thống hiển thị thông báo lỗi tương ứng; giữ nguyên thông tin cũ.

---

### 8.3.4. Dữ liệu vào
- Từ khóa tìm kiếm (tên/email)
- Thông tin tạo tài khoản: Họ tên (≤ 100 ký tự, bắt buộc), Email (đúng định dạng, chưa tồn tại, bắt buộc), Mật khẩu (≥ 8 ký tự, có chữ hoa/thường/số/ký tự đặc biệt), Vai trò
- Thông tin cập nhật: Họ tên, Email

### 8.3.5. Dữ liệu ra
- Danh sách người dùng (có phân trang)
- Thông tin chi tiết tài khoản
- Thông báo tạo/cập nhật thành công hoặc lỗi chi tiết
- Tài khoản mới trong danh sách

---

### 8.3.6. Quy tắc nghiệp vụ
- Chỉ Admin và Super Admin được thực hiện các thao tác này (C-13).
- Email phải là duy nhất trong hệ thống; không cho phép tạo trùng.
- Mật khẩu phải có tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt.
- Họ tên bắt buộc, không trống, tối đa 100 ký tự.
- Mật khẩu phải được lưu dạng hash — không lưu plaintext (NFR-SEC).
- Tài khoản do Admin tạo có thể đăng nhập ngay.

---

### 8.3.7. Điều kiện tiền đề và ràng buộc
- Người dùng phải đang đăng nhập với vai trò Admin hoặc Super Admin.
- Hệ thống cần có ít nhất 5 tài khoản mẫu để kiểm tra danh sách và phân trang.

---

### 8.3.8. Mức độ ưu tiên
**Mức độ ưu tiên: Cao**

**Lý do:**  
Quản lý người dùng là chức năng trung tâm của Admin Panel; cho phép Quản trị viên kiểm soát hoàn toàn vòng đời tài khoản trong hệ thống.

---

### 8.3.9. Tiêu chí chấp nhận
- Danh sách hiển thị đầy đủ tên, email, vai trò, trạng thái, ngày tạo; có phân trang.
- Tìm kiếm theo tên/email → chỉ hiển thị kết quả khớp.
- Tìm kiếm không có kết quả → thông báo "Không tìm thấy".
- Click vào tài khoản → xem đầy đủ chi tiết.
- Tạo tài khoản hợp lệ → tạo thành công; tài khoản mới xuất hiện trong danh sách.
- Tài khoản mới có thể đăng nhập bình thường.
- Mật khẩu lưu dạng hash trong DB.
- Email đã tồn tại → lỗi "Email đã tồn tại"; không tạo.
- Email sai định dạng → lỗi tại trường email.
- Mật khẩu không đủ điều kiện → lỗi mô tả yêu cầu.
- Họ tên trống → lỗi; họ tên 101 ký tự → lỗi.
- Cập nhật hợp lệ → lưu thành công; hiển thị thông tin mới.
- Cập nhật không hợp lệ → lỗi; giữ nguyên thông tin cũ.

---

### 8.3.10. Ghi chú
- Các test case tham chiếu: `TC_ADMIN_3_01` đến `TC_ADMIN_3_17` (file `TC_ADMIN_USER_MANAGEMENT.md`).
- `TC_ADMIN_3_04` xác nhận lỗi khi email trùng.
- `TC_ADMIN_3_05` xác nhận lỗi email sai định dạng (ví dụ: `userexample.com`, `user@`).
- `TC_ADMIN_3_06` xác nhận lỗi mật khẩu không đủ điều kiện.
- `TC_ADMIN_3_08` xác nhận lỗi họ tên vượt 100 ký tự (boundary 101).
- `TC_ADMIN_3_16` xác nhận tài khoản mới có thể đăng nhập.
- `TC_ADMIN_3_17` xác nhận mật khẩu lưu dạng hash trong DB.
- Liên kết ràng buộc C-13; NFR-SEC.
