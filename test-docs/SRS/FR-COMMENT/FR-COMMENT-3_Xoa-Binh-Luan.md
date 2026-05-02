## 8.3. Chức năng Xóa bình luận

### 8.3.1. Mô tả chức năng

Chức năng Xóa bình luận cho phép tác giả xóa bình luận do chính mình đăng khỏi danh sách bình luận của công việc. Trước khi xóa, hệ thống có thể hiển thị hộp thoại xác nhận hoặc cung cấp cơ chế Undo trong thời gian ngắn (theo thiết kế UI). Sau khi xóa thành công, bình luận biến mất khỏi danh sách ngay lập tức; các bình luận khác không bị ảnh hưởng. Người không phải tác giả không thấy nút xóa hoặc bị từ chối khi cố xóa. Hành động xóa không thể hoàn tác từ phía người dùng thông thường (theo test mong đợi).

---

### 8.3.2. Yêu cầu chức năng

**FR-COMMENT-3-01:** Hệ thống phải chỉ hiển thị nút/chức năng xóa trên bình luận do chính người dùng đăng.

**FR-COMMENT-3-02:** Trước khi xóa vĩnh viễn, hệ thống phải có hộp thoại xác nhận; hoặc xóa ngay nhưng có Undo trong giới hạn thời gian (một trong hai mô hình được test chấp nhận).

**FR-COMMENT-3-03:** Nếu người dùng hủy trong hộp thoại xác nhận, bình luận không bị xóa.

**FR-COMMENT-3-04:** Sau khi xác nhận xóa thành công, bình luận biến mất khỏi danh sách ngay; có thể có thông báo thành công (FR-COMMENT-3.1).

**FR-COMMENT-3-05:** Hệ thống phải từ chối xóa bình luận của người khác; không hiển thị nút xóa hoặc trả về thông báo không có quyền (FR-COMMENT-3.2).

**FR-COMMENT-3-06:** Sau khi xóa một bình luận, các bình luận khác (ví dụ của `other@test.com`) vẫn hiển thị đầy đủ.

**FR-COMMENT-3-07:** Bình luận đã xóa không xuất hiện lại sau reload; thành viên khác cũng không thấy bình luận đó.

**FR-COMMENT-3-08:** Không có tùy chọn khôi phục (Restore) cho người dùng thông thường sau khi xóa (theo phạm vi test).

---

### 8.3.3. Đặc tả Use Case

**Tên Use Case:** Xóa bình luận của chính mình  
**Mã Use Case:** UC-COMMENT-DELETE-01

**Mô tả:**  
Tác giả chọn xóa bình luận của mình, xác nhận (nếu có), và bình luận bị gỡ khỏi công việc.

**Tác nhân chính:**  
Thành viên nhóm (`commenter@test.com`)

**Tiền điều kiện:**
- `commenter@test.com` đã đăng nhập; là thành viên `Group Task Test`.
- Task `Task Comment Test` có bình luận của `commenter@test.com` (ví dụ: `Bình luận để xóa`) và bình luận của `other@test.com`.

**Kích hoạt:**  
Người dùng nhấn Xóa trên bình luận của mình.

**Hậu điều kiện:**
- Bình luận được chọn không còn trong danh sách đối với mọi thành viên.
- **Lưu ý test:** Sau mỗi lần test xóa thành công, cần thêm lại bình luận để không ảnh hưởng các case tiếp theo.

#### a. Luồng chính (Basic Flow)
1. Người dùng mở `Task Comment Test`.
2. Nút Xóa chỉ hiển thị trên bình luận của `commenter@test.com`, không hiển thị trên bình luận của `other@test.com`.
3. Người dùng nhấn Xóa trên bình luận `Bình luận để xóa`.
4. Hệ thống hiển thị hộp thoại xác nhận (hoặc xóa ngay với Undo — theo thiết kế).
5. Người dùng xác nhận xóa.
6. Bình luận biến mất khỏi danh sách ngay; số lượng bình luận giảm tương ứng.

#### b. Luồng thay thế (Alternative Flow)

**AF-01: Hủy xóa trong hộp thoại**
1. Hộp thoại xác nhận đang mở.
2. Người dùng nhấn Hủy.
3. Hộp thoại đóng; bình luận vẫn còn.

#### c. Luồng ngoại lệ (Exception Flow)

**EF-01: Cố xóa bình luận của người khác (FR-COMMENT-3.2)**  
Không có nút Xóa; hoặc API từ chối với thông báo không có quyền.

---

### 8.3.4. Dữ liệu vào
- Yêu cầu xóa bình luận (định danh bình luận)
- Xác nhận (nếu có)

### 8.3.5. Dữ liệu ra
- Bình luận bị loại khỏi danh sách hiển thị và lưu trữ phía người dùng cuối
- Thông báo thành công (nếu có trong UI)

---

### 8.3.6. Quy tắc nghiệp vụ
- Chỉ tác giả được xóa bình luận của mình.
- Xóa một bình luận không được làm mất dữ liệu các bình luận khác trên cùng công việc.
- Theo đặc tả test: không có khôi phục cho người dùng thường sau khi xóa.

---

### 8.3.7. Điều kiện tiền đề và ràng buộc
- Bình luận cần xóa phải tồn tại và thuộc về người dùng hiện tại.

---

### 8.3.8. Mức độ ưu tiên
**Mức độ ưu tiên: Cao**

**Lý do:**  
Cho phép gỡ nội dung sai hoặc nhạy cảm khỏi luồng thảo luận.

---

### 8.3.9. Tiêu chí chấp nhận
- Nút Xóa chỉ trên bình luận của mình; có xác nhận hoặc Undo theo thiết kế.
- Hủy xác nhận → bình luận giữ nguyên.
- Xác nhận xóa → biến mất ngay; danh sách cập nhật không cần reload.
- Bình luận khác không bị mất.
- Không xóa được bình luận của người khác.
- Sau reload và khi đăng nhập thành viên khác: bình luận đã xóa không còn.
- Không có Restore cho user thường.

---

### 8.3.10. Ghi chú
- Test case tham chiếu: `TC_COMMENT_DELETE_01` đến `TC_COMMENT_DELETE_10` (file `TC_COMMENT_DELETE.md`).
- Pre-condition trong test: **thêm lại bình luận sau mỗi lần test xóa thành công**.
- `TC_COMMENT_DELETE_07`: kiểm tra cập nhật ngay không reload.
- `TC_COMMENT_DELETE_09`–`TC_COMMENT_DELETE_10`: nhất quán giữa thành viên và không khôi phục.
