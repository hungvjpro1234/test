## 8.5. Chức năng Bình luận kèm file đính kèm

### 8.5.1. Mô tả chức năng

Chức năng Bình luận kèm file cho phép thành viên nhóm đính kèm một hoặc nhiều file cùng lúc với nội dung bình luận (hoặc chỉ file — tùy quy tắc nghiệp vụ được hệ thống áp dụng). Sau khi gửi, bình luận hiển thị tên file và liên kết tải; có thể kèm preview đối với ảnh. Hệ thống kiểm tra kích thước file và định dạng cho phép; từ chối file quá lớn hoặc loại file không được phép. Thành viên khác trong nhóm có thể tải file từ liên kết trong bình luận; người không thuộc nhóm không truy cập được file qua link trực tiếp. File đính kèm persist sau khi tải lại trang.

---

### 8.5.2. Yêu cầu chức năng

**FR-COMMENT-5-01:** Hệ thống phải cung cấp nút/icon đính kèm file trong hoặc cạnh ô nhập bình luận.

**FR-COMMENT-5-02:** Hệ thống phải cho phép gửi bình luận kèm file hợp lệ (ví dụ ảnh JPG, PDF dưới ngưỡng kích thước); sau khi gửi, hiển thị tên file và liên kết tải trong bình luận (FR-COMMENT-5.1).

**FR-COMMENT-5-03:** Hệ thống phải từ chối file vượt giới hạn kích thước; hiển thị thông báo lỗi; không gửi bình luận.

**FR-COMMENT-5-04:** Hệ thống phải từ chối định dạng file không được phép (ví dụ file thực thi); hiển thị thông báo lỗi; không gửi bình luận.

**FR-COMMENT-5-05:** Tên file hiển thị trong bình luận phải khớp tên file đính kèm.

**FR-COMMENT-5-06:** Liên kết tải trong bình luận phải tải đúng nội dung file; không lỗi hoặc file rỗng sai.

**FR-COMMENT-5-07:** Thành viên nhóm khác có thể tải file từ bình luận thành công.

**FR-COMMENT-5-08:** Người không thuộc nhóm không được tải file qua link trực tiếp khi đăng nhập `outsider@test.com`.

**FR-COMMENT-5-09:** File đính kèm vẫn hiển thị và tải được sau khi reload trang.

**FR-COMMENT-5-10:** Trường hợp chỉ đính kèm file mà không có nội dung text: ghi nhận hành vi thực tế của hệ thống (cho phép hoặc bắt buộc có text) — xem `TC_COMMENT_ATTACH_06`.

---

### 8.5.3. Đặc tả Use Case

**Tên Use Case:** Gửi bình luận có file đính kèm  
**Mã Use Case:** UC-COMMENT-ATTACH-01

**Mô tả:**  
Người dùng chọn file, có thể nhập nội dung chữ, và gửi. Hệ thống lưu file và liên kết với bình luận.

**Tác nhân chính:**  
Thành viên nhóm (`commenter@test.com`)

**Tiền điều kiện:**
- `commenter@test.com` đã đăng nhập; là thành viên `Group Task Test`.
- Tồn tại `Task Comment Test`.
- File test: `valid_image.jpg`, `valid_doc.pdf` (< 5 MB); `large_file.zip` (> giới hạn); `malicious.exe` (định dạng cấm).

**Kích hoạt:**  
Người dùng đính kèm file và nhấn Gửi.

**Hậu điều kiện:**  
Bình luận hiển thị với file đính kèm hợp lệ; hoặc thông báo lỗi nếu không hợp lệ.

#### a. Luồng chính (Basic Flow) — Text + file ảnh
1. Người dùng mở ô bình luận trên `Task Comment Test`.
2. Icon/nút đính kèm hiển thị.
3. Người dùng nhập nội dung (ví dụ: `Xem ảnh này`) và đính kèm `valid_image.jpg`.
4. Nhấn Gửi.
5. Bình luận xuất hiện với nội dung text và ảnh (preview hoặc link tùy UI).

#### b. Luồng thay thế (Alternative Flow)

**AF-01: Bình luận kèm PDF**
1. Đính kèm `valid_doc.pdf` cùng nội dung text.
2. Gửi thành công; hiển thị link tải và tên `valid_doc.pdf`.

**AF-02: Chỉ file, không có text**
1. Để trống nội dung, chỉ đính kèm `valid_image.jpg`, Gửi.
2. Hành vi theo quy tắc nghiệp vụ: hoặc thành công chỉ với file, hoặc bị từ chối yêu cầu nhập chữ — **ghi nhận kết quả thực tế khi test** (`TC_COMMENT_ATTACH_06`).

#### c. Luồng ngoại lệ (Exception Flow)

**EF-01: File quá giới hạn kích thước**  
Đính kèm `large_file.zip` → thông báo lỗi kích thước; không gửi.

**EF-02: Định dạng không được phép**  
Đính kèm `malicious.exe` → thông báo định dạng không được phép; không gửi.

---

### 8.5.4. Dữ liệu vào
- Nội dung text (tùy chọn, theo quy tắc hệ thống)
- File đính kèm (kích thước, loại MIME/extension trong whitelist)

### 8.5.5. Dữ liệu ra
- Bình luận hiển thị tên file, link tải, có thể preview
- Thông báo lỗi khi upload không hợp lệ

---

### 8.5.6. Quy tắc nghiệp vụ
- Giới hạn kích thước và danh sách định dạng cho phép phải được áp dụng nhất quán.
- Quyền tải file gắn với quyền xem công việc và thành viên nhóm.
- File đính kèm bình luận là một phần của luồng thảo luận; truy cập file phải được kiểm soát như tài nguyên nhóm (liên kết NFR-SEC).

---

### 8.5.7. Điều kiện tiền đề và ràng buộc
- Chuẩn bị file test theo `TC_COMMENT_ATTACH` (kích thước, loại).

---

### 8.5.8. Mức độ ưu tiên
**Mức độ ưu tiên: Trung bình–Cao**

**Lý do:**  
Đính kèm trong bình luận bổ sung minh chứng và tài liệu ngay trong ngữ cảnh thảo luận; quan trọng nhưng có thể phụ thuộc FR đính kèm tổng quát của task.

---

### 8.5.9. Tiêu chí chấp nhận
- Nút đính kèm hiển thị; responsive.
- Gửi text + `valid_image.jpg` / `valid_doc.pdf` thành công; tên file và link đúng.
- Click link → tải đúng file.
- File quá lớn / `.exe` → lỗi, không gửi.
- Thành viên khác tải được file từ bình luận.
- `outsider@test.com` không tải được qua link trực tiếp.
- Sau reload, file vẫn tồn tại và tải được.
- Ghi nhận hành vi khi chỉ có file không có text (`TC_COMMENT_ATTACH_06`).

---

### 8.5.10. Ghi chú
- Test case tham chiếu: `TC_COMMENT_ATTACH_01` đến `TC_COMMENT_ATTACH_13` (file `TC_COMMENT_ATTACH.md`).
- `TC_COMMENT_ATTACH_06`: business rule "chỉ file không text" — xác nhận kết quả thực tế khi kiểm thử.
- `TC_COMMENT_ATTACH_12`: kiểm tra kiểm soát truy cập file với `outsider@test.com`.
- Liên kết có thể chồng lấn với FR-ATTACH (đính kèm công việc) nếu hệ thống dùng chung storage; document traceability theo test hiện có.
