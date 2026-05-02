## 9.2. Chức năng Xóa file đính kèm

### 9.2.1. Mô tả chức năng

Chức năng Xóa file đính kèm cho phép người dùng **có quyền** gỡ một file khỏi danh sách đính kèm của công việc. Trước khi xóa, hệ thống hiển thị hộp thoại xác nhận với nội dung cảnh báo rõ ràng; người dùng có thể hủy để giữ nguyên file. Sau khi xác nhận xóa thành công, file biến mất khỏi danh sách ngay lập tức; các file khác không bị ảnh hưởng. Link trực tiếp đến file đã xóa phải vô hiệu (404 hoặc thông báo không tồn tại). Người chỉ có quyền xem không thấy nút xóa hoặc bị từ chối khi cố xóa qua API. Yêu cầu xóa file không tồn tại phải trả về thông báo không tìm thấy file (FR-ATTACH-2.2). Hành động xóa không thể hoàn tác từ phía người dùng thông thường.

---

### 9.2.2. Yêu cầu chức năng

**FR-ATTACH-2-01:** Hệ thống phải hiển thị nút/icon xóa cạnh mỗi file đính kèm đối với người dùng có quyền xóa.

**FR-ATTACH-2-02:** Khi nhấn xóa, hệ thống phải hiển thị hộp thoại xác nhận với cảnh báo; có nút Hủy và Xác nhận.

**FR-ATTACH-2-03:** Nếu người dùng nhấn Hủy trong hộp thoại, file không bị xóa.

**FR-ATTACH-2-04:** Sau khi xác nhận, hệ thống xóa file khỏi lưu trữ và danh sách hiển thị; có thể có thông báo thành công (FR-ATTACH-2.1).

**FR-ATTACH-2-05:** Danh sách phải cập nhật ngay sau xóa; không cần reload.

**FR-ATTACH-2-06:** Xóa một file không được làm mất các file đính kèm khác trên cùng công việc.

**FR-ATTACH-2-07:** Người không có quyền xóa (`viewer@test.com`) không thấy nút xóa; nếu cố gửi yêu cầu xóa qua API → thông báo không có quyền.

**FR-ATTACH-2-08:** Yêu cầu xóa với ID file không tồn tại phải trả về thông báo không tìm thấy file; không gây crash (FR-ATTACH-2.2).

**FR-ATTACH-2-09:** Sau khi xóa, mọi thành viên nhóm không còn thấy file đó trong danh sách.

**FR-ATTACH-2-10:** Link trực tiếp đến file đã xóa phải vô hiệu (không tải được nội dung cũ).

**FR-ATTACH-2-11:** Không có chức năng khôi phục file đã xóa cho người dùng thông thường.

---

### 9.2.3. Đặc tả Use Case

**Tên Use Case:** Xóa file đính kèm khỏi công việc  
**Mã Use Case:** UC-ATTACH-DELETE-01

**Mô tả:**  
Người có quyền chọn xóa một file đính kèm, xác nhận trong hộp thoại; hệ thống gỡ file và vô hiệu hóa truy cập.

**Tác nhân chính:**  
Thành viên có quyền xóa (`member@test.com`)

**Tiền điều kiện:**
- `member@test.com` có quyền xóa file đính kèm trong `Group Task Test`.
- Task `Task Attach Test` có ít nhất 2 file: `file_to_delete.jpg` (do `member@test.com` tải) và `other_member_file.pdf` (do `other@test.com` tải).
- `viewer@test.com` chỉ có quyền xem (test từ chối quyền).

**Kích hoạt:**  
Người dùng nhấn xóa cạnh một file trong danh sách đính kèm.

**Hậu điều kiện:**  
File được chọn không còn trong hệ thống đối với người dùng; **sau mỗi lần test xóa thành công, cần tải lại file `file_to_delete.jpg` để không ảnh hưởng các case tiếp theo.**

#### a. Luồng chính (Basic Flow)
1. `member@test.com` mở `Task Attach Test`.
2. Nút xóa hiển thị cạnh các file trong danh sách.
3. Người dùng nhấn xóa `file_to_delete.jpg`.
4. Hộp thoại xác nhận hiển thị với cảnh báo rõ; có Hủy và Xác nhận.
5. Người dùng nhấn Xác nhận.
6. Thông báo thành công (nếu có); `file_to_delete.jpg` biến mất khỏi danh sách ngay.

#### b. Luồng thay thế (Alternative Flow)

**AF-01: Hủy xóa**
1. Hộp thoại đang mở sau khi nhấn xóa.
2. Người dùng nhấn Hủy.
3. Hộp thoại đóng; `file_to_delete.jpg` vẫn trong danh sách.

#### c. Luồng ngoại lệ (Exception Flow)

**EF-01: Xóa file không tồn tại (FR-ATTACH-2.2)**  
Request xóa với ID không tồn tại (API/DevTools) → thông báo không tìm thấy file; không crash.

**EF-02: Người không có quyền**  
`viewer@test.com` không thấy nút xóa; request API xóa bị từ chối với thông báo không có quyền.

---

### 9.2.4. Dữ liệu vào
- Định danh file đính kèm cần xóa
- Xác nhận từ hộp thoại

### 9.2.5. Dữ liệu ra
- File bị gỡ khỏi danh sách và lưu trữ phía người dùng
- Link trực tiếp không còn hợp lệ
- Thông báo lỗi khi không tìm thấy hoặc không có quyền

---

### 9.2.6. Quy tắc nghiệp vụ
- Chỉ vai trò/quyền được phép mới xóa file đính kèm (có thể khác với quyền chỉ xem task).
- Xóa một file không được ảnh hưởng file khác.
- File không tồn tại: phản hồi rõ ràng, an toàn (FR-ATTACH-2.2).

---

### 9.2.7. Điều kiện tiền đề và ràng buộc
- Phân quyền: `member@test.com` xóa được; `viewer@test.com` không.
- Chuẩn bị dữ liệu theo pre-condition test (2 file tối thiểu).

---

### 9.2.8. Mức độ ưu tiên
**Mức độ ưu tiên: Cao**

**Lý do:**  
Cho phép gỡ tài liệu lỗi thời hoặc nhầm lẫn; đồng thời kiểm soát dung lượng và tuân thủ quyền truy cập.

---

### 9.2.9. Tiêu chí chấp nhận
- Nút xóa với người có quyền; hộp thoại xác nhận có cảnh báo; responsive.
- Hủy → file giữ nguyên.
- Xác nhận → file biến mất ngay; các file khác còn nguyên.
- Viewer không thấy nút xóa; API từ chối viewer.
- Xóa ID không tồn tại → không tìm thấy file.
- Thành viên khác không còn thấy file đã xóa; link cũ vô hiệu.
- Không có khôi phục cho user thường.

---

### 9.2.10. Ghi chú
- Test case tham chiếu: `TC_ATTACH_DELETE_01` đến `TC_ATTACH_DELETE_12` (file `TC_ATTACH_DELETE.md`).
- Pre-condition test: **tải lại file sau mỗi lần test xóa thành công** (`file_to_delete.jpg` và các case phụ thuộc).
- `TC_ATTACH_DELETE_04`: kiểm tra qua API/DevTools với ID không tồn tại.
- `TC_ATTACH_DELETE_09`: cố xóa qua API khi đăng nhập `viewer@test.com`.
