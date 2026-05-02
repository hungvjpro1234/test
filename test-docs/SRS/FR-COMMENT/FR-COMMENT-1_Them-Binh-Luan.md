## 8.1. Chức năng Thêm bình luận

### 8.1.1. Mô tả chức năng

Chức năng Thêm bình luận cho phép thành viên nhóm nhập nội dung và gửi bình luận trên trang chi tiết công việc. Bình luận hợp lệ xuất hiện ngay trong danh sách kèm thông tin tác giả và thời gian. Hệ thống kiểm tra nội dung không trống (không chỉ khoảng trắng), độ dài tối đa 2000 ký tự, và giới hạn tối đa 200 bình luận trên một công việc. Người dùng có thể dùng ký hiệu "@" để đề cập thành viên nhóm; người được đề cập nhận thông báo và phần đề cập được làm nổi bật trong bình luận.

---

### 8.1.2. Yêu cầu chức năng

**FR-COMMENT-1-01:** Hệ thống phải hiển thị ô nhập bình luận và nút Gửi (hoặc cho phép gửi bằng phím Enter) trong chi tiết công việc.

**FR-COMMENT-1-02:** Hệ thống phải cho phép gửi bình luận văn bản thông thường; bình luận xuất hiện ngay trong danh sách mà không cần tải lại trang.

**FR-COMMENT-1-03:** Hệ thống phải hiển thị đầy đủ cho mỗi bình luận mới: nội dung, tên hoặc avatar tác giả, thời gian gửi.

**FR-COMMENT-1-04:** Hệ thống phải từ chối gửi khi nội dung trống hoặc chỉ chứa khoảng trắng; hiển thị thông báo lỗi và không gửi (FR-COMMENT-1.2).

**FR-COMMENT-1-05:** Hệ thống phải chấp nhận bình luận có độ dài đúng 2000 ký tự; từ chối khi vượt 2000 ký tự (ví dụ 2001 ký tự); hiển thị thông báo lỗi (FR-COMMENT-1.3).

**FR-COMMENT-1-06:** Hệ thống phải từ chối thêm bình luận khi công việc đã đạt đúng 200 bình luận; hiển thị thông báo đã đạt giới hạn (FR-COMMENT-1.4).

**FR-COMMENT-1-07:** Hệ thống phải hỗ trợ đề cập thành viên bằng "@"; hiển thị gợi ý thành viên khi gõ "@" và ký tự tiếp theo; làm nổi bật người được đề cập trong nội dung (FR-COMMENT-1.5).

**FR-COMMENT-1-08:** Khi bình luận có đề cập hợp lệ, người được đề cập phải nhận thông báo về bình luận đề cập đến họ.

**FR-COMMENT-1-09:** Hệ thống phải hiển thị đúng ký tự đặc biệt và tiếng Việt trong nội dung bình luận (không lỗi encode hiển thị).

**FR-COMMENT-1-10:** Thành viên nhóm khác mở cùng công việc phải thấy bình luận mới đúng như người gửi.

---

### 8.1.3. Đặc tả Use Case

**Tên Use Case:** Thêm bình luận vào công việc  
**Mã Use Case:** UC-COMMENT-ADD-01

**Mô tả:**  
Thành viên nhóm nhập nội dung bình luận trong chi tiết công việc và gửi. Hệ thống kiểm tra và lưu bình luận; có thể kèm đề cập thành viên.

**Tác nhân chính:**  
Thành viên nhóm (`commenter@test.com`)

**Tiền điều kiện:**
- `commenter@test.com` đã đăng nhập và là thành viên nhóm `Group Task Test`.
- Tồn tại task `Task Comment Test` trong nhóm.
- `mention_target@test.com` là thành viên nhóm (phục vụ test mention).
- Để kiểm tra giới hạn 200 bình luận: cần task `Task Full Comments` đã có đúng 200 bình luận.

**Kích hoạt:**  
Người dùng nhập nội dung và nhấn Gửi trong phần bình luận của chi tiết công việc.

**Hậu điều kiện:**
- Nếu thành công: bình luận mới xuất hiện trong danh sách; thông báo đến người được đề cập (nếu có).
- Nếu thất bại: thông báo lỗi tương ứng; không thêm bình luận.

#### a. Luồng chính (Basic Flow)
1. Người dùng mở chi tiết `Task Comment Test`.
2. Hệ thống hiển thị ô nhập bình luận và nút Gửi.
3. Người dùng nhập nội dung hợp lệ (không trống, không chỉ khoảng trắng, độ dài ≤ 2000 ký tự).
4. Số bình luận hiện tại của task < 200.
5. Người dùng nhấn Gửi.
6. Hệ thống kiểm tra và lưu bình luận.
7. Bình luận xuất hiện ngay trong danh sách với nội dung, tên/avatar tác giả, thời gian gửi.

#### b. Luồng thay thế (Alternative Flow)

**AF-01: Đề cập thành viên bằng "@"**
1. Người dùng nhập `@` và chọn hoặc gõ `mention_target@test.com` / tên hiển thị.
2. Gửi bình luận (ví dụ: `@mention_target xem lại nhé!`).
3. Bình luận gửi thành công; phần đề cập được highlight.
4. `mention_target@test.com` nhận thông báo về bình luận đề cập.

**AF-02: Gợi ý thành viên khi gõ "@"**
1. Người dùng nhập `@` rồi gõ thêm vài ký tự (ví dụ `@mem`).
2. Hệ thống hiển thị dropdown gợi ý thành viên khớp từ khóa.

**AF-03: Bình luận có ký tự đặc biệt và tiếng Việt**
1. Người dùng nhập nội dung có ký tự đặc biệt và tiếng Việt (ví dụ: `Kiểm thử #1: "OK" & <done>!`).
2. Gửi thành công; nội dung hiển thị đúng.

#### c. Luồng ngoại lệ (Exception Flow)

**EF-01: Nội dung trống (FR-COMMENT-1.2)**  
Người dùng không nhập gì và nhấn Gửi → thông báo lỗi; không gửi.

**EF-02: Nội dung chỉ khoảng trắng (FR-COMMENT-1.2)**  
Người dùng nhập toàn khoảng trắng → thông báo lỗi; không gửi.

**EF-03: Vượt 2000 ký tự (FR-COMMENT-1.3)**  
Nội dung 2001 ký tự → thông báo lỗi; không gửi.

**EF-04: Đạt 200 bình luận (FR-COMMENT-1.4)**  
Task đã có 200 bình luận; người dùng cố thêm → thông báo đã đạt giới hạn; không gửi.

---

### 8.1.4. Dữ liệu vào
- Nội dung bình luận (chuỗi, tối đa 2000 ký tự thực tế sau khi loại nội dung chỉ khoảng trắng)
- Tùy chọn đề cập thành viên qua "@"

### 8.1.5. Dữ liệu ra
- Bản ghi bình luận mới trong danh sách
- Thông báo cho người được đề cập (khi có mention)
- Thông báo lỗi khi không gửi được

---

### 8.1.6. Quy tắc nghiệp vụ
- Chỉ thành viên nhóm có quyền xem chi tiết công việc mới có thể thêm bình luận (liên kết C-4 / FR-TASK).
- Giới hạn 200 bình luận trên một công việc (theo SRS và test).
- Giới hạn độ dài 2000 ký tự trên mỗi bình luận.
- Đề cập "@" kích hoạt thông báo đến thành viên được chọn hợp lệ trong nhóm.

---

### 8.1.7. Điều kiện tiền đề và ràng buộc
- Người dùng đã đăng nhập và thuộc nhóm sở hữu công việc.
- Task tồn tại và chưa xóa.
- Chuẩn bị dữ liệu: `Task Full Comments` với đúng 200 bình luận khi cần test FR-COMMENT-1.4.

---

### 8.1.8. Mức độ ưu tiên
**Mức độ ưu tiên: Cao**

**Lý do:**  
Bình luận là kênh trao đổi trực tiếp trên công việc; thiếu chức năng này làm giảm khả năng phối hợp nhóm.

---

### 8.1.9. Tiêu chí chấp nhận
- Ô nhập và nút Gửi hiển thị đúng; giao diện responsive.
- Bình luận hợp lệ xuất hiện ngay; hiển thị đúng nội dung, tác giả, thời gian.
- Trống / chỉ khoảng trắng → lỗi, không gửi.
- Đúng 2000 ký tự → gửi thành công; 2001 ký tự → lỗi.
- Task 200 bình luận → không thêm được; thông báo giới hạn.
- Mention `@mention_target` → highlight và thông báo cho người được đề cập.
- Gợi ý khi gõ `@` + ký tự.
- Bình luận real-time hiển thị ngay; thành viên khác thấy đúng nội dung.

---

### 8.1.10. Ghi chú
- Test case tham chiếu: `TC_COMMENT_ADD_01` đến `TC_COMMENT_ADD_15` (file `TC_COMMENT_ADD.md`).
- `TC_COMMENT_ADD_06`–`TC_COMMENT_ADD_07`: boundary 2000 / 2001 ký tự.
- `TC_COMMENT_ADD_08`: cần task `Task Full Comments` đã có 200 bình luận.
- `TC_COMMENT_ADD_14`: xác minh thông báo trên tài khoản `mention_target@test.com`.
- `TC_COMMENT_ADD_15`: đăng nhập tài khoản thành viên khác và mở lại `Task Comment Test`.
