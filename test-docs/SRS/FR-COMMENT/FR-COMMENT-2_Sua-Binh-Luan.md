## 8.2. Chức năng Sửa bình luận

### 8.2.1. Mô tả chức năng

Chức năng Sửa bình luận cho phép tác giả bình luận chỉnh sửa nội dung bình luận do chính mình đăng. Sau khi lưu thành công, nội dung mới hiển thị ngay và bình luận được đánh dấu trạng thái đã chỉnh sửa (ví dụ nhãn "đã chỉnh sửa" hoặc "(edited)"). Hệ thống áp dụng cùng quy tắc nội dung như khi thêm: không cho phép trống hoặc chỉ khoảng trắng, tối đa 2000 ký tự. Người dùng không phải tác giả không thấy nút sửa hoặc bị từ chối khi cố sửa.

---

### 8.2.2. Yêu cầu chức năng

**FR-COMMENT-2-01:** Hệ thống phải chỉ hiển thị nút/chức năng sửa trên bình luận do chính người dùng đăng.

**FR-COMMENT-2-02:** Khi nhấn sửa, hệ thống phải mở form hoặc chế độ chỉnh sửa với nội dung hiện tại đã điền sẵn.

**FR-COMMENT-2-03:** Hệ thống phải cho phép lưu nội dung mới hợp lệ; sau khi lưu, hiển thị nội dung mới ngay và nhãn đã chỉnh sửa (FR-COMMENT-2.1).

**FR-COMMENT-2-04:** Hệ thống phải từ chối lưu khi nội dung sau chỉnh sửa trống hoặc chỉ khoảng trắng.

**FR-COMMENT-2-05:** Hệ thống phải chấp nhận nội dung đúng 2000 ký tự sau chỉnh sửa; từ chối khi vượt 2000 ký tự.

**FR-COMMENT-2-06:** Hệ thống phải cho phép hủy chỉnh sửa; sau khi hủy, nội dung bình luận giữ nguyên như trước khi mở form.

**FR-COMMENT-2-07:** Hệ thống phải từ chối chỉnh sửa bình luận của người khác; không hiển thị nút sửa hoặc trả về thông báo không có quyền (FR-COMMENT-2.2).

**FR-COMMENT-2-08:** Nội dung đã sửa phải persist sau khi tải lại trang; nhãn đã chỉnh sửa vẫn hiển thị.

---

### 8.2.3. Đặc tả Use Case

**Tên Use Case:** Sửa bình luận của chính mình  
**Mã Use Case:** UC-COMMENT-EDIT-01

**Mô tả:**  
Tác giả bình luận mở chức năng sửa, thay đổi nội dung và lưu. Hệ thống cập nhật và đánh dấu bình luận đã chỉnh sửa.

**Tác nhân chính:**  
Thành viên nhóm (`commenter@test.com`)

**Tiền điều kiện:**
- `commenter@test.com` đã đăng nhập; là thành viên `Group Task Test`.
- Task `Task Comment Test` có ít nhất một bình luận của `commenter@test.com` (ví dụ nội dung gốc: `Bình luận gốc để sửa`) và một bình luận của `other@test.com`.

**Kích hoạt:**  
Người dùng nhấn nút Sửa trên bình luận của mình.

**Hậu điều kiện:**
- Nếu lưu thành công: nội dung mới hiển thị; có nhãn đã chỉnh sửa.
- Nếu hủy: nội dung không đổi.
- Nếu lỗi validation hoặc quyền: thông báo phù hợp; dữ liệu không bị cập nhật sai.

#### a. Luồng chính (Basic Flow)
1. Người dùng mở `Task Comment Test`.
2. Trên bình luận của `commenter@test.com`, nút Sửa hiển thị; trên bình luận của `other@test.com` không có nút Sửa.
3. Người dùng nhấn Sửa trên bình luận của mình.
4. Form/chế độ sửa mở với nội dung hiện tại đã điền sẵn.
5. Người dùng sửa thành nội dung hợp lệ (ví dụ: `Bình luận đã được chỉnh sửa`) và nhấn Lưu.
6. Hệ thống kiểm tra và lưu.
7. Nội dung mới hiển thị ngay; bình luận có nhãn "đã chỉnh sửa" hoặc "(edited)".

#### b. Luồng thay thế (Alternative Flow)

**AF-01: Hủy chỉnh sửa**
1. Người dùng mở form sửa và thay đổi nội dung.
2. Người dùng nhấn Hủy hoặc Escape (nếu hỗ trợ).
3. Form đóng; bình luận vẫn là nội dung gốc.

#### c. Luồng ngoại lệ (Exception Flow)

**EF-01: Lưu nội dung trống**  
Xóa hết nội dung và Lưu → thông báo lỗi; không lưu.

**EF-02: Lưu nội dung chỉ khoảng trắng**  
→ Thông báo lỗi; không lưu.

**EF-03: Nội dung 2001 ký tự**  
→ Thông báo lỗi; không lưu.

**EF-04: Cố sửa bình luận của người khác (FR-COMMENT-2.2)**  
Không có nút Sửa; hoặc thao tác qua API bị từ chối với thông báo không có quyền.

---

### 8.2.4. Dữ liệu vào
- Nội dung bình luận sau chỉnh sửa (chuỗi, quy tắc giống thêm bình luận)

### 8.2.5. Dữ liệu ra
- Bình luận với nội dung đã cập nhật
- Trạng thái hiển thị đã chỉnh sửa
- Thông báo lỗi khi không lưu được

---

### 8.2.6. Quy tắc nghiệp vụ
- Chỉ tác giả được sửa bình luận của mình.
- Ràng buộc độ dài và nội dung không trống giống bình luận mới.
- Sau khi sửa, người xem danh sách phải nhận biết bình luận đã được chỉnh sửa (FR-COMMENT-4.1 / hiển thị nhãn).

---

### 8.2.7. Điều kiện tiền đề và ràng buộc
- Bình luận cần sửa phải tồn tại và thuộc về người dùng hiện tại.

---

### 8.2.8. Mức độ ưu tiên
**Mức độ ưu tiên: Cao**

**Lý do:**  
Cho phép sửa lỗi và cập nhật thông tin trong luồng thảo luận mà không cần xóa và tạo lại bình luận.

---

### 8.2.9. Tiêu chí chấp nhận
- Nút Sửa chỉ trên bình luận của mình; form mở với nội dung hiện tại.
- Lưu thành công → nội dung mới + nhãn đã chỉnh sửa.
- Trống / chỉ khoảng trắng / 2001 ký tự → không lưu.
- Đúng 2000 ký tự → lưu thành công.
- Hủy → giữ nội dung gốc.
- Không thể sửa bình luận của `other@test.com`.
- Sau reload, nội dung đã sửa và nhãn vẫn đúng.

---

### 8.2.10. Ghi chú
- Test case tham chiếu: `TC_COMMENT_EDIT_01` đến `TC_COMMENT_EDIT_12` (file `TC_COMMENT_EDIT.md`).
- `TC_COMMENT_EDIT_06`–`TC_COMMENT_EDIT_07`: boundary 2000 / 2001 ký tự khi sửa.
- `TC_COMMENT_EDIT_12`: persist sau reload.
