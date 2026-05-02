## 4.2. Chức năng Xem danh sách thư mục

### 4.2.1. Mô tả chức năng

Chức năng Xem danh sách thư mục cho phép thành viên nhóm xem tất cả thư mục mà họ có quyền xem trong nhóm đang làm việc. Thư mục bị hạn chế quyền sẽ không hiển thị với thành viên không có quyền. Danh sách cập nhật ngay khi có thư mục được tạo mới hoặc xóa, persist sau reload và hoàn toàn độc lập giữa các nhóm khác nhau.

---

### 4.2.2. Yêu cầu chức năng

**FR-FOLDER-2-01:** Hệ thống phải hiển thị danh sách tất cả thư mục mà người dùng có quyền xem trong nhóm đang làm việc; mỗi thư mục hiển thị tên và icon/màu sắc nếu có (FR-FOLDER-2.1).

**FR-FOLDER-2-02:** Thư mục bị hạn chế quyền không được hiển thị với thành viên không có quyền xem thư mục đó.

**FR-FOLDER-2-03:** Danh sách phải cập nhật ngay khi thư mục mới được tạo hoặc một thư mục bị xóa.

**FR-FOLDER-2-04:** Danh sách thư mục phải persist sau reload.

**FR-FOLDER-2-05:** Danh sách thư mục phải độc lập theo nhóm — chuyển sang nhóm khác thì hiển thị đúng thư mục của nhóm đó, không lẫn dữ liệu.

---

### 4.2.3. Đặc tả Use Case

**Tên Use Case:** Xem danh sách thư mục trong nhóm  
**Mã Use Case:** UC-FOLDER-LIST-01

**Mô tả:**  
Thành viên nhóm mở màn hình nhóm và xem danh sách thư mục mà họ có quyền truy cập. Danh sách phản ánh đúng quyền của từng thành viên và cập nhật theo thay đổi thực tế.

**Tác nhân chính:**  
Thành viên nhóm đã đăng nhập

**Tiền điều kiện:**
- Người dùng đã đăng nhập và là thành viên nhóm.
- Nhóm có ít nhất 3 thư mục.
- Có tài khoản `restricted@test.com` bị hạn chế quyền xem `Restricted Folder`.

**Kích hoạt:**  
Người dùng vào màn hình nhóm hoặc mở phần danh sách thư mục.

**Hậu điều kiện:**
- Danh sách thư mục hiển thị đúng theo quyền của người dùng hiện tại.

#### a. Luồng chính (Basic Flow)
1. Người dùng vào nhóm đang làm việc.
2. Hệ thống hiển thị danh sách thư mục mà người dùng có quyền xem.
3. Mỗi thư mục hiển thị tên và icon/màu sắc (nếu có).
4. Thư mục bị hạn chế quyền không xuất hiện với người dùng không có quyền.

#### b. Luồng thay thế (Alternative Flow)

**AF-01: Thành viên có đủ quyền thấy tất cả thư mục**
1. Người dùng (`member@test.com`) vào nhóm.
2. Hệ thống hiển thị đầy đủ tất cả thư mục không bị hạn chế quyền riêng.

**AF-02: Danh sách cập nhật sau khi tạo thư mục mới**
1. Người dùng tạo thư mục `Newly Added Folder`.
2. Thư mục mới xuất hiện ngay trong danh sách.

**AF-03: Danh sách cập nhật sau khi xóa thư mục**
1. Người dùng xóa một thư mục.
2. Thư mục đã xóa biến mất khỏi danh sách ngay.

**AF-04: Chuyển sang nhóm khác**
1. Người dùng chuyển sang nhóm B.
2. Hệ thống hiển thị danh sách thư mục của nhóm B; không lẫn thư mục từ nhóm A.

#### c. Luồng ngoại lệ (Exception Flow)

Không có luồng ngoại lệ đặc biệt — thành viên không có quyền xem thư mục đơn giản là không thấy thư mục đó trong danh sách (không hiển thị lỗi).

---

### 4.2.4. Dữ liệu vào
- Thông tin người dùng hiện tại (để lọc theo quyền)
- Nhóm đang làm việc

### 4.2.5. Dữ liệu ra
- Danh sách thư mục người dùng có quyền xem với tên, icon/màu (nếu có)

---

### 4.2.6. Quy tắc nghiệp vụ
- Danh sách thư mục phải lọc theo quyền của từng thành viên — thư mục bị hạn chế không hiển thị với người không có quyền (C-4).
- Mỗi nhóm có danh sách thư mục riêng; hoàn toàn độc lập giữa các nhóm (C-3).
- Danh sách cập nhật theo thời gian thực khi có thay đổi.

---

### 4.2.7. Điều kiện tiền đề và ràng buộc
- Người dùng phải đang đăng nhập và là thành viên nhóm.
- Nhóm cần có ít nhất một thư mục để kiểm tra danh sách.

---

### 4.2.8. Mức độ ưu tiên
**Mức độ ưu tiên: Cao**

**Lý do:**  
Xem danh sách thư mục là bước thiết yếu để người dùng điều hướng và quản lý công việc theo cấu trúc tổ chức của nhóm.

---

### 4.2.9. Tiêu chí chấp nhận
- Danh sách thư mục hiển thị tên và icon/màu (nếu có); layout không lỗi.
- Thành viên có đủ quyền → thấy tất cả thư mục không bị hạn chế.
- `restricted@test.com` → `Restricted Folder` không hiển thị trong danh sách.
- Tạo thư mục mới → xuất hiện ngay trong danh sách.
- Xóa thư mục → biến mất khỏi danh sách ngay.
- Reload trang → danh sách không thay đổi (persist).
- Chuyển nhóm → danh sách thư mục của nhóm mới hiển thị đúng, không lẫn dữ liệu.

---

### 4.2.10. Ghi chú
- Các test case tham chiếu: `TC_FOLDER_LIST_01` đến `TC_FOLDER_LIST_08` (file `TC_FOLDER_LIST.md`).
- `TC_FOLDER_LIST_03` xác nhận `restricted@test.com` không thấy `Restricted Folder`.
- `TC_FOLDER_LIST_04` xác nhận `member@test.com` thấy đầy đủ thư mục có quyền.
- `TC_FOLDER_LIST_05/06` xác nhận danh sách cập nhật sau tạo/xóa.
- `TC_FOLDER_LIST_07` xác nhận persist sau reload.
- `TC_FOLDER_LIST_08` xác nhận danh sách độc lập theo nhóm.
- Pre-condition: cần tài khoản `restricted@test.com` với quyền bị hạn chế `Restricted Folder` được thiết lập trước.
- Liên kết ràng buộc C-3, C-4.
