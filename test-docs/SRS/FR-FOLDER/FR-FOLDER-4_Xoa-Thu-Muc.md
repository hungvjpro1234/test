## 4.4. Chức năng Xóa thư mục

### 4.4.1. Mô tả chức năng

Chức năng Xóa thư mục cho phép thành viên có quyền xóa vĩnh viễn một thư mục khỏi nhóm. Trước khi xóa, hệ thống hiển thị hộp thoại xác nhận với cảnh báo rõ ràng về tính không thể hoàn tác và các task bên trong thư mục sẽ bị ảnh hưởng (xóa theo hoặc chuyển về Uncategorized tùy business rule). Sau khi xóa thành công, thư mục biến mất khỏi danh sách của tất cả thành viên ngay lập tức, URL trực tiếp trở nên không hợp lệ. Người không có quyền xóa không thấy tùy chọn này.

---

### 4.4.2. Yêu cầu chức năng

**FR-FOLDER-4-01:** Hệ thống phải hiển thị tùy chọn xóa chỉ với người dùng có quyền xóa thư mục.

**FR-FOLDER-4-02:** Trước khi xóa, hệ thống phải hiển thị hộp thoại xác nhận với cảnh báo rõ ràng (bao gồm tác động lên task bên trong) và các nút Hủy/Xác nhận.

**FR-FOLDER-4-03:** Khi người dùng nhấn Hủy, thư mục không bị xóa; tất cả dữ liệu giữ nguyên.

**FR-FOLDER-4-04:** Khi người dùng nhấn Xác nhận, hệ thống xóa thư mục và xử lý task bên trong theo đúng business rule (xóa theo hoặc chuyển về Uncategorized).

**FR-FOLDER-4-05:** Sau khi xóa thành công, thư mục phải biến mất khỏi danh sách ngay lập tức mà không cần tải lại trang (FR-FOLDER-4.1).

**FR-FOLDER-4-06:** Thành viên khác trong nhóm cũng không còn thấy thư mục đã xóa.

**FR-FOLDER-4-07:** URL trực tiếp của thư mục đã xóa phải trả về 404 hoặc thông báo không tồn tại.

**FR-FOLDER-4-08:** Không có tùy chọn khôi phục thư mục từ phía người dùng.

**FR-FOLDER-4-09:** Người không có quyền xóa không được thấy tùy chọn xóa; nếu cố truy cập trực tiếp thì bị từ chối với thông báo không có quyền.

---

### 4.4.3. Đặc tả Use Case

**Tên Use Case:** Xóa thư mục khỏi nhóm  
**Mã Use Case:** UC-FOLDER-DELETE-01

**Mô tả:**  
Người dùng có quyền xóa kích hoạt xóa thư mục. Hệ thống xác nhận qua hộp thoại và thực hiện xóa vĩnh viễn cùng xử lý task bên trong theo business rule.

**Tác nhân chính:**  
Thành viên nhóm có quyền xóa thư mục

**Tiền điều kiện:**
- `member@test.com` đã đăng nhập và có quyền xóa thư mục trong nhóm.
- Tồn tại: `Folder To Delete` (có task bên trong) và `Empty Folder` (rỗng).
- `viewer@test.com` không có quyền xóa.
- **⚠️ Tái tạo thư mục sau mỗi lần test xóa thành công.**

**Kích hoạt:**  
Người dùng nhấn tùy chọn "Xóa" trên thư mục.

**Hậu điều kiện:**
- Nếu xác nhận: thư mục và dữ liệu liên quan bị xóa vĩnh viễn; không thể khôi phục từ phía người dùng.
- Nếu hủy: thư mục không bị xóa; mọi thứ giữ nguyên.

#### a. Luồng chính (Basic Flow)
1. Người dùng (`member@test.com`) hover/right-click vào thư mục và chọn "Xóa".
2. Hệ thống kiểm tra người dùng có quyền xóa.
3. Hệ thống hiển thị hộp thoại xác nhận với cảnh báo rõ ràng (task bên trong bị ảnh hưởng); có nút Hủy và Xác nhận.
4. Người dùng nhấn "Xác nhận".
5. Hệ thống xóa thư mục; xử lý task bên trong theo business rule.
6. Thư mục biến mất khỏi danh sách ngay; hiển thị thông báo thành công.

#### b. Luồng thay thế (Alternative Flow)

**AF-01: Xóa thư mục rỗng**
1. Người dùng xóa `Empty Folder` (không có task bên trong).
2. Hệ thống xóa thành công; `Empty Folder` biến khỏi danh sách ngay.

**AF-02: Người dùng hủy xóa**
1. Người dùng nhấn "Xóa" nhưng chọn "Hủy" trên hộp thoại.
2. Hộp thoại đóng; thư mục vẫn còn trong danh sách.

#### c. Luồng ngoại lệ (Exception Flow)

**EF-01: Người không có quyền xóa**
1. `viewer@test.com` cố tìm tùy chọn xóa.
2. Tùy chọn xóa không hiển thị; nếu cố truy cập trực tiếp → thông báo không có quyền.

**EF-02: Truy cập URL trực tiếp sau khi xóa**
1. Người dùng truy cập URL của thư mục đã bị xóa.
2. Hệ thống trả về 404 hoặc thông báo thư mục không tồn tại.

---

### 4.4.4. Dữ liệu vào
- ID thư mục cần xóa
- Xác nhận của người dùng (nhấn nút Xác nhận)

### 4.4.5. Dữ liệu ra
- Thư mục biến mất khỏi danh sách của tất cả thành viên
- Thông báo thành công
- Task bên trong được xử lý theo business rule
- URL trực tiếp trả về 404

---

### 4.4.6. Quy tắc nghiệp vụ
- Chỉ người có quyền xóa mới thực hiện được thao tác này (C-4).
- Bắt buộc có bước xác nhận trước khi xóa; không thể hoàn tác.
- Task bên trong thư mục phải được xử lý theo business rule đã định (xóa theo hoặc chuyển về Uncategorized) — cần xác nhận business rule thực tế.
- Sau khi xóa, URL trực tiếp trả về 404 (C-3).
- Không có tính năng Undo/Restore từ phía người dùng.

---

### 4.4.7. Điều kiện tiền đề và ràng buộc
- Người dùng phải đang đăng nhập và có quyền xóa thư mục.
- Thư mục phải tồn tại.
- Cơ sở dữ liệu phải truy cập được.
- **⚠️ Lưu ý kiểm thử:** Tái tạo thư mục sau mỗi lần test xóa thành công.

---

### 4.4.8. Mức độ ưu tiên
**Mức độ ưu tiên: Trung bình - Cao**

**Lý do:**  
Xóa thư mục là thao tác không thể hoàn tác; kiểm soát quyền và hộp thoại xác nhận cùng cách xử lý task bên trong cần được đảm bảo chính xác để tránh mất dữ liệu ngoài ý muốn.

---

### 4.4.9. Tiêu chí chấp nhận
- Người có quyền → thấy tùy chọn "Xóa" trong menu thư mục.
- Nhấn "Xóa" → hộp thoại xác nhận hiện với cảnh báo rõ và nút Hủy/Xác nhận.
- Nhấn "Hủy" → hộp thoại đóng; thư mục vẫn còn.
- Nhấn "Xác nhận" xóa thư mục rỗng → thành công; thư mục biến mất ngay.
- Nhấn "Xác nhận" xóa thư mục có task → thành công; task được xử lý đúng business rule.
- Thư mục đã xóa không còn hiển thị với thành viên khác.
- URL của thư mục đã xóa → 404 hoặc thông báo không tồn tại.
- Không có tùy chọn khôi phục từ phía người dùng.
- Danh sách cập nhật ngay sau xóa, không cần reload.
- Người không có quyền → không thấy tùy chọn xóa hoặc bị từ chối.

---

### 4.4.10. Ghi chú
- Các test case tham chiếu: `TC_FOLDER_DELETE_01` đến `TC_FOLDER_DELETE_11` (file `TC_FOLDER_DELETE.md`).
- `TC_FOLDER_DELETE_04` xác nhận xóa thư mục rỗng; cần tái tạo sau test.
- `TC_FOLDER_DELETE_05` xác nhận xóa thư mục có task; ghi nhận hành vi thực tế — cần xác nhận business rule (xóa theo hay chuyển Uncategorized).
- `TC_FOLDER_DELETE_06` xác nhận `viewer@test.com` không thấy tùy chọn xóa.
- `TC_FOLDER_DELETE_07` xác nhận không có tùy chọn Undo/Restore.
- `TC_FOLDER_DELETE_08` xác nhận thành viên khác không còn thấy thư mục đã xóa.
- `TC_FOLDER_DELETE_09` xác nhận URL trả 404 sau xóa.
- `TC_FOLDER_DELETE_10` xác nhận task bên trong được xử lý đúng; cần DB access để xác minh.
- `TC_FOLDER_DELETE_11` xác nhận danh sách cập nhật ngay không cần reload.
- **⚠️ Lưu ý:** Các test `TC_FOLDER_DELETE_04, 05, 07, 08, 09, 10, 11` đều yêu cầu tái tạo thư mục sau khi thực thi.
- Liên kết ràng buộc C-3, C-4.
