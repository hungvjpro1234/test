## 9.1. Chức năng Tải file lên công việc

### 9.1.1. Mô tả chức năng

Chức năng Tải file lên công việc cho phép thành viên nhóm chọn file (hoặc kéo thả nếu hỗ trợ) và đưa file vào danh sách đính kèm của công việc. Sau khi tải lên thành công, mỗi mục hiển thị đầy đủ: tên file, kích thước, người tải, thời gian tải; file xuất hiện ngay trong danh sách mà không cần tải lại trang. Hệ thống kiểm tra kích thước tối đa, định dạng được phép, và giới hạn tối đa **20 file** trên một công việc. Thành viên khác trong nhóm có thể tải xuống file; người không thuộc nhóm không truy cập được qua link trực tiếp. File persist sau reload và đăng nhập lại.

---

### 9.1.2. Yêu cầu chức năng

**FR-ATTACH-1-01:** Hệ thống phải hiển thị khu vực hoặc nút tải file đính kèm trong chi tiết công việc (nút "Tải file lên" và/hoặc vùng kéo thả).

**FR-ATTACH-1-02:** Hệ thống phải lưu file hợp lệ và hiển thị trong danh sách đính kèm ngay sau khi tải lên thành công (FR-ATTACH-1.1).

**FR-ATTACH-1-03:** Mỗi file trong danh sách phải hiển thị: tên file, kích thước, người tải, thời gian tải.

**FR-ATTACH-1-04:** Hệ thống phải từ chối file vượt giới hạn kích thước; hiển thị thông báo lỗi; không lưu file.

**FR-ATTACH-1-05:** Hệ thống phải từ chối định dạng không được phép (ví dụ file thực thi `.exe`); hiển thị thông báo lỗi; không lưu file.

**FR-ATTACH-1-06:** Hệ thống phải chấp nhận file đúng kích thước tối đa cho phép (boundary theo cấu hình hệ thống).

**FR-ATTACH-1-07:** Hệ thống phải cho phép tối đa **20 file** đính kèm trên một công việc; khi đã có 20 file, từ chối tải thêm và hiển thị thông báo đã đạt giới hạn (FR-ATTACH-1.2).

**FR-ATTACH-1-08:** Khi task có đúng 19 file, tải thêm 1 file hợp lệ → thành công; tổng 20 file (boundary).

**FR-ATTACH-1-09:** Hệ thống phải cho phép tải nhiều file liên tiếp; mỗi file hiển thị đúng thông tin trong danh sách.

**FR-ATTACH-1-10:** Người dùng phải có thể tải xuống (download) file đã đính kèm từ liên kết trong danh sách; nội dung tải về đúng, không lỗi.

**FR-ATTACH-1-11:** Thành viên khác trong nhóm mở cùng công việc phải tải được file đính kèm thành công.

**FR-ATTACH-1-12:** Người không thuộc nhóm (`outsider@test.com`) không được tải file qua link trực tiếp (hệ thống chặn truy cập).

**FR-ATTACH-1-13:** Danh sách file và khả năng tải xuống phải persist sau reload trang và sau khi đăng xuất rồi đăng nhập lại.

**FR-ATTACH-1-14:** Nếu UI hỗ trợ kéo thả, kéo file vào vùng quy định phải cho kết quả tương đương chọn file qua hộp thoại (N/A nếu không hỗ trợ).

---

### 9.1.3. Đặc tả Use Case

**Tên Use Case:** Tải file đính kèm lên công việc  
**Mã Use Case:** UC-ATTACH-UPLOAD-01

**Mô tả:**  
Thành viên nhóm tải file từ máy lên công việc. Hệ thống kiểm tra và lưu trữ; hiển thị metadata trong danh sách đính kèm.

**Tác nhân chính:**  
Thành viên nhóm (`member@test.com`)

**Tiền điều kiện:**
- `member@test.com` đã đăng nhập; là thành viên `Group Task Test`.
- Tồn tại task `Task Attach Test` (ưu tiên chưa có file hoặc dùng để tải dần theo test).
- Chuẩn bị file: `valid_image.jpg`, `valid_doc.pdf`, `valid_excel.xlsx` (< 5 MB); `large_file.zip` (> giới hạn); `malicious.exe`; file đúng kích thước tối đa (boundary); task `Task Full Attach` có đúng 20 file (cho test vượt giới hạn); để boundary 19→20: task có 19 file.

**Kích hoạt:**  
Người dùng chọn file và xác nhận tải lên (hoặc thả file vào vùng kéo thả).

**Hậu điều kiện:**  
File hợp lệ xuất hiện trong danh sách; hoặc thông báo lỗi nếu không hợp lệ.

#### a. Luồng chính (Basic Flow)
1. Người dùng mở chi tiết `Task Attach Test`.
2. Hệ thống hiển thị phần đính kèm (nút tải / vùng kéo thả).
3. Người dùng chọn `valid_image.jpg` và tải lên.
4. Hệ thống kiểm tra kích thước, định dạng, và số lượng file hiện có (< 20).
5. File được lưu và hiển thị ngay trong danh sách với tên, kích thước, người tải, thời gian.

#### b. Luồng thay thế (Alternative Flow)

**AF-01: Tải PDF, Excel**
1. Tải `valid_doc.pdf` hoặc `valid_excel.xlsx` tương tự JPG.
2. File xuất hiện trong danh sách với thông tin đúng.

**AF-02: Tải nhiều file liên tiếp**
1. Tải `valid_image.jpg` rồi `valid_doc.pdf`.
2. Cả hai đều có trong danh sách; thông tin mỗi file đúng.

**AF-03: Kéo thả (nếu có)**
1. Kéo `valid_doc.pdf` vào vùng kéo thả.
2. Kết quả giống chọn file qua dialog.

**AF-04: Download file vừa tải**
1. Click liên kết tải xuống `valid_image.jpg`.
2. File tải về đúng nội dung.

#### c. Luồng ngoại lệ (Exception Flow)

**EF-01: File vượt giới hạn kích thước**  
Chọn `large_file.zip` → thông báo lỗi kích thước; không tải lên.

**EF-02: Định dạng không được phép**  
Chọn `malicious.exe` → thông báo định dạng không được phép; không tải lên.

**EF-03: Đã đủ 20 file (FR-ATTACH-1.2)**  
Mở `Task Full Attach` (20 file), cố tải thêm `valid_image.jpg` → thông báo đã đạt giới hạn 20 file; không tải lên.

**EF-04: Outsider truy cập link file**  
`outsider@test.com` dùng link trực tiếp → chặn; không tải được.

---

### 9.1.4. Dữ liệu vào
- File binary từ máy người dùng
- Ngữ cảnh công việc và người tải

### 9.1.5. Dữ liệu ra
- Bản ghi đính kèm trong danh sách (tên, kích thước, người tải, thời gian)
- Liên kết tải xuống hợp lệ cho thành viên nhóm
- Thông báo lỗi khi tải lên thất bại

---

### 9.1.6. Quy tắc nghiệp vụ
- Chỉ người có quyền truy cập công việc mới tải file lên và xem/tải xuống đính kèm (C-4 / FR-TASK).
- Giới hạn kích thước, whitelist định dạng, và tối đa 20 file mỗi task theo SRS và bộ test.
- Link trực tiếp file phải được bảo vệ: không cho outsider (NFR-SEC).

---

### 9.1.7. Điều kiện tiền đề và ràng buộc
- Chuẩn bị `Task Full Attach` với đúng 20 file khi test `TC_ATTACH_UPLOAD_08`.
- Biết trước giới hạn kích thước tối đa để tạo file boundary (`TC_ATTACH_UPLOAD_06`).

---

### 9.1.8. Mức độ ưu tiên
**Mức độ ưu tiên: Cao**

**Lý do:**  
Đính kèm tài liệu trên công việc là nhu cầu cơ bản để phối hợp và lưu bằng chứng làm việc.

---

### 9.1.9. Tiêu chí chấp nhận
- Khu vực đính kèm hiển thị; responsive.
- JPG/PDF/XLSX hợp lệ tải lên thành công; đủ metadata.
- File quá lớn / `.exe` bị từ chối với thông báo rõ.
- Boundary kích thước tối đa → thành công.
- 19 file + 1 file → 20 file thành công; task 20 file không tải thêm được.
- Nhiều file liên tiếp; download đúng; thành viên khác tải được; outsider không tải qua link.
- Hiển thị ngay không reload; persist sau reload và đăng nhập lại.
- Drag & drop tương đương chọn file nếu có tính năng.

---

### 9.1.10. Ghi chú
- Test case tham chiếu: `TC_ATTACH_UPLOAD_01` đến `TC_ATTACH_UPLOAD_18` (file `TC_ATTACH_UPLOAD.md`).
- `TC_ATTACH_UPLOAD_06`: cần xác định giới hạn kích thước cụ thể của hệ thống để tạo file boundary.
- `TC_ATTACH_UPLOAD_07`: yêu cầu task có sẵn 19 file.
- `TC_ATTACH_UPLOAD_08`: dùng `Task Full Attach` có đúng 20 file.
- `TC_ATTACH_UPLOAD_14`: đánh dấu N/A nếu UI không hỗ trợ kéo thả.
