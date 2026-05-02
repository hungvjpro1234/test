## 7.5. Chức năng Xóa công việc

### 7.5.1. Mô tả chức năng

Chức năng Xóa công việc cho phép thành viên có quyền xóa xóa vĩnh viễn một công việc khỏi hệ thống. Trước khi xóa, hệ thống phải hiển thị hộp thoại xác nhận với cảnh báo rõ ràng về tính không thể hoàn tác. Sau khi xóa, công việc biến mất khỏi danh sách của tất cả thành viên, URL trực tiếp trở nên không hợp lệ và toàn bộ dữ liệu phụ (bình luận, file đính kèm, checklist) cũng bị xóa theo. Người dùng không có quyền xóa sẽ không thấy tùy chọn này.

---

### 7.5.2. Yêu cầu chức năng

**FR-TASK-5-01:** Hệ thống phải hiển thị tùy chọn xóa chỉ với người dùng có quyền xóa công việc.

**FR-TASK-5-02:** Trước khi xóa, hệ thống phải hiển thị hộp thoại xác nhận với cảnh báo rõ ràng về hành động không thể hoàn tác và các nút Hủy/Xác nhận.

**FR-TASK-5-03:** Khi người dùng nhấn Hủy, hộp thoại đóng lại và công việc không bị xóa.

**FR-TASK-5-04:** Khi người dùng nhấn Xác nhận, hệ thống xóa công việc và toàn bộ dữ liệu phụ (bình luận, file đính kèm, checklist).

**FR-TASK-5-05:** Sau khi xóa thành công, công việc phải biến mất khỏi danh sách ngay lập tức mà không cần tải lại trang.

**FR-TASK-5-06:** Hệ thống phải chặn truy cập URL trực tiếp của công việc đã xóa; trả về thông báo không tìm thấy (404 hoặc tương đương).

**FR-TASK-5-07:** Thành viên khác trong nhóm không còn thấy công việc đã xóa trong danh sách.

**FR-TASK-5-08:** Không có tùy chọn khôi phục công việc từ phía người dùng.

**FR-TASK-5-09:** Người không có quyền xóa không được thấy tùy chọn xóa; nếu cố gửi request trực tiếp, hệ thống từ chối và thông báo không có quyền.

---

### 7.5.3. Đặc tả Use Case

**Tên Use Case:** Xóa công việc khỏi hệ thống  
**Mã Use Case:** UC-TASK-DELETE-01

**Mô tả:**  
Người dùng có quyền xóa kích hoạt xóa công việc. Hệ thống xác nhận qua hộp thoại và thực hiện xóa vĩnh viễn cùng toàn bộ dữ liệu phụ.

**Tác nhân chính:**  
Thành viên nhóm có quyền xóa công việc

**Tiền điều kiện:**
- Người dùng đã đăng nhập và có quyền xóa công việc trong nhóm.
- Công việc tồn tại và chưa bị xóa.

**Kích hoạt:**  
Người dùng nhấn tùy chọn "Xóa" trên trang chi tiết hoặc menu công việc.

**Hậu điều kiện:**
- Nếu xác nhận: công việc và toàn bộ dữ liệu phụ bị xóa vĩnh viễn; không thể khôi phục từ phía người dùng.
- Nếu hủy: công việc không bị xóa; mọi thứ giữ nguyên.

#### a. Luồng chính (Basic Flow)
1. Người dùng mở chi tiết công việc.
2. Người dùng nhấn nút/tùy chọn "Xóa".
3. Hệ thống kiểm tra người dùng có quyền xóa.
4. Hệ thống hiển thị hộp thoại xác nhận với cảnh báo hành động không thể hoàn tác; có nút Hủy và Xác nhận.
5. Người dùng nhấn "Xác nhận".
6. Hệ thống xóa công việc cùng toàn bộ bình luận, file đính kèm, checklist liên quan.
7. Hệ thống hiển thị thông báo xóa thành công.
8. Công việc biến mất khỏi danh sách ngay lập tức, không cần tải lại trang.

#### b. Luồng thay thế (Alternative Flow)

**AF-01: Người dùng hủy xóa**
1. Người dùng nhấn "Hủy" trên hộp thoại xác nhận.
2. Hộp thoại đóng lại; công việc không bị xóa; tất cả dữ liệu giữ nguyên.

#### c. Luồng ngoại lệ (Exception Flow)

**EF-01: Người không có quyền xóa**
1. Người dùng không có quyền cố tìm tùy chọn xóa.
2. Tùy chọn xóa không hiển thị; hoặc hệ thống hiển thị thông báo không có quyền.

**EF-02: Người không có quyền gửi request xóa trực tiếp**
1. Người dùng không có quyền gửi request xóa qua API/URL.
2. Hệ thống từ chối; thông báo không có quyền; dữ liệu không bị xóa.

---

### 7.5.4. Dữ liệu vào
- ID công việc cần xóa
- Xác nhận của người dùng (nhấn nút Xác nhận)

### 7.5.5. Dữ liệu ra
- Thông báo xóa thành công
- Danh sách cập nhật ngay (công việc không còn xuất hiện)
- Thông báo 404 khi truy cập URL cũ của công việc đã xóa

---

### 7.5.6. Quy tắc nghiệp vụ
- Chỉ người có quyền xóa mới thực hiện được thao tác này (C-4).
- Bắt buộc có bước xác nhận trước khi xóa; không thể hoàn tác.
- Toàn bộ dữ liệu phụ (bình luận, file đính kèm, checklist) bị xóa cùng công việc (C-3).
- Sau khi xóa, URL trực tiếp trả 404.
- Không có tính năng Undo/Restore từ phía người dùng thường.

---

### 7.5.7. Điều kiện tiền đề và ràng buộc
- Người dùng phải đang đăng nhập và có quyền xóa công việc.
- Công việc phải tồn tại.
- Cơ sở dữ liệu phải truy cập được.
- **⚠️ Lưu ý kiểm thử:** Phải tái tạo công việc sau mỗi lần test xóa thành công.

---

### 7.5.8. Mức độ ưu tiên
**Mức độ ưu tiên: Trung bình - Cao**

**Lý do:**  
Xóa công việc là thao tác không thể hoàn tác; tính chính xác của kiểm soát quyền và hộp thoại xác nhận là quan trọng để bảo vệ toàn vẹn dữ liệu.

---

### 7.5.9. Tiêu chí chấp nhận
- Người có quyền → thấy tùy chọn "Xóa" trong chi tiết công việc.
- Nhấn xóa → hộp thoại xác nhận hiện với cảnh báo rõ và nút Hủy/Xác nhận.
- Nhấn Hủy → hộp thoại đóng; công việc vẫn còn.
- Nhấn Xác nhận → thông báo thành công; công việc biến mất ngay khỏi danh sách.
- Người không có quyền → không thấy tùy chọn xóa hoặc bị từ chối.
- URL của task đã xóa → 404 hoặc thông báo không tìm thấy.
- Thành viên khác không còn thấy task trong danh sách.
- Không có tùy chọn khôi phục từ phía người dùng.
- Dữ liệu phụ (bình luận, file, checklist) cũng bị xóa theo.

---

### 7.5.10. Ghi chú
- Các test case tham chiếu: `TC_TASK_DELETE_01` đến `TC_TASK_DELETE_10` (file `TC_TASK_DELETE.md`).
- `TC_TASK_DELETE_04` xác nhận xóa thành công; cần tái tạo task sau test.
- `TC_TASK_DELETE_05` xác nhận `viewer@test.com` không thấy tùy chọn xóa.
- `TC_TASK_DELETE_07` xác nhận URL task đã xóa trả 404.
- `TC_TASK_DELETE_08` xác nhận thành viên khác không còn thấy task.
- `TC_TASK_DELETE_09` xác nhận dữ liệu phụ bị xóa cùng; cần quyền DB access để xác minh.
- `TC_TASK_DELETE_10` xác nhận không có tùy chọn Undo/Restore.
- **⚠️ Lưu ý:** Các test `TC_TASK_DELETE_04, 06, 07, 08, 09, 10` đều yêu cầu tái tạo task sau khi thực thi.
- Liên kết ràng buộc C-3, C-4.
