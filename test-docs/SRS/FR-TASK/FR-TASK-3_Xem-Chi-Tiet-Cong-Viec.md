## 7.3. Chức năng Xem chi tiết công việc

### 7.3.1. Mô tả chức năng

Chức năng Xem chi tiết công việc cho phép thành viên nhóm xem toàn bộ thông tin của một công việc cụ thể bao gồm tiêu đề, mô tả, trạng thái, độ ưu tiên, ngày đến hạn, danh sách người được giao, bình luận, file đính kèm và checklist. Chỉ thành viên của nhóm sở hữu công việc mới được phép truy cập. Người ngoài nhóm và công việc đã xóa đều bị chặn truy cập với thông báo tương ứng.

---

### 7.3.2. Yêu cầu chức năng

**FR-TASK-3-01:** Khi người dùng nhấp vào một công việc trong danh sách, hệ thống phải mở trang chi tiết của công việc đó.

**FR-TASK-3-02:** Trang chi tiết phải hiển thị đầy đủ: tiêu đề, mô tả, trạng thái, độ ưu tiên, ngày đến hạn, danh sách người được giao, bình luận (nếu có), file đính kèm (nếu có), checklist (nếu có).

**FR-TASK-3-03:** File đính kèm phải hiển thị tên, kích thước và có thể tải xuống.

**FR-TASK-3-04:** Bình luận phải hiển thị nội dung, tác giả và thời gian đăng.

**FR-TASK-3-05:** Checklist phải hiển thị từng mục với trạng thái đã/chưa hoàn thành đúng như đã thiết lập.

**FR-TASK-3-06:** Hệ thống phải chặn người dùng không thuộc nhóm truy cập chi tiết công việc; hiển thị thông báo không có quyền.

**FR-TASK-3-07:** Hệ thống phải chặn truy cập vào công việc đã bị xóa; hiển thị thông báo không tìm thấy (404 hoặc tương đương).

**FR-TASK-3-08:** Trang chi tiết phải phản ánh trạng thái mới nhất của công việc (cập nhật theo thời gian thực hoặc sau lần reload).

---

### 7.3.3. Đặc tả Use Case

**Tên Use Case:** Xem thông tin chi tiết công việc  
**Mã Use Case:** UC-TASK-DETAIL-01

**Mô tả:**  
Thành viên nhóm nhấp vào công việc trong danh sách để xem đầy đủ thông tin của công việc đó bao gồm metadata, bình luận, file đính kèm và checklist.

**Tác nhân chính:**  
Thành viên nhóm đã đăng nhập

**Tiền điều kiện:**
- Người dùng đã đăng nhập thành công.
- Người dùng là thành viên của nhóm sở hữu công việc.
- Công việc tồn tại và chưa bị xóa.

**Kích hoạt:**  
Người dùng nhấp vào một công việc trong danh sách hoặc truy cập URL trực tiếp của công việc.

**Hậu điều kiện:**
- Trang chi tiết công việc hiển thị toàn bộ thông tin chính xác.

#### a. Luồng chính (Basic Flow)
1. Người dùng nhấp vào công việc trong danh sách.
2. Hệ thống kiểm tra người dùng có quyền truy cập công việc (là thành viên nhóm).
3. Hệ thống kiểm tra công việc vẫn tồn tại.
4. Hệ thống truy xuất và hiển thị trang chi tiết với: tiêu đề, mô tả, trạng thái, độ ưu tiên, ngày đến hạn, người được giao.
5. Hệ thống hiển thị phần bình luận (nếu có) với nội dung, tác giả, thời gian.
6. Hệ thống hiển thị file đính kèm (nếu có) với tên, kích thước và tùy chọn tải xuống.
7. Hệ thống hiển thị checklist (nếu có) với từng mục và trạng thái checked/unchecked.

#### b. Luồng thay thế (Alternative Flow)

**AF-01: Công việc không có bình luận/file/checklist**
1. Hệ thống hiển thị trang chi tiết với các section tương ứng trống hoặc ẩn.

**AF-02: Thành viên khác cập nhật trạng thái khi đang xem**
1. Khi có thành viên khác thay đổi trạng thái công việc, trang chi tiết hiển thị trạng thái mới (theo thời gian thực hoặc sau lần reload tiếp theo).

#### c. Luồng ngoại lệ (Exception Flow)

**EF-01: Người không thuộc nhóm truy cập**
1. Người dùng truy cập URL trực tiếp của công việc trong khi không là thành viên nhóm.
2. Hệ thống hiển thị thông báo không có quyền truy cập; không hiển thị nội dung công việc.

**EF-02: Truy cập công việc đã bị xóa**
1. Người dùng truy cập URL của công việc đã bị xóa.
2. Hệ thống hiển thị thông báo không tìm thấy công việc (404 hoặc tương đương).

---

### 7.3.4. Dữ liệu vào
- ID hoặc URL của công việc

### 7.3.5. Dữ liệu ra
- Tiêu đề công việc
- Mô tả
- Trạng thái, Độ ưu tiên, Ngày đến hạn
- Danh sách người được giao (tên/avatar)
- Danh sách bình luận (nội dung, tác giả, thời gian)
- Danh sách file đính kèm (tên, kích thước, tùy chọn tải xuống)
- Danh sách checklist (mục, trạng thái checked/unchecked)
- Thông báo lỗi khi không có quyền hoặc không tìm thấy

---

### 7.3.6. Quy tắc nghiệp vụ
- Chỉ thành viên nhóm sở hữu công việc mới có quyền xem chi tiết (C-4).
- Công việc đã xóa không thể truy cập; hệ thống trả 404 (C-3).
- File đính kèm phải hiển thị có thể tải xuống.

---

### 7.3.7. Điều kiện tiền đề và ràng buộc
- Người dùng phải đang đăng nhập và là thành viên nhóm.
- Công việc phải tồn tại (chưa bị xóa).
- Cơ sở dữ liệu và dịch vụ file phải truy cập được.

---

### 7.3.8. Mức độ ưu tiên
**Mức độ ưu tiên: Cao**

**Lý do:**  
Xem chi tiết công việc là nơi người dùng nắm bắt đầy đủ thông tin, bình luận và tiến độ — đây là màn hình làm việc cốt lõi.

---

### 7.3.9. Tiêu chí chấp nhận
- Nhấp vào công việc → mở trang chi tiết với đầy đủ thông tin.
- Tiêu đề, mô tả, trạng thái, độ ưu tiên, ngày đến hạn hiển thị đúng.
- Danh sách người được giao hiển thị tên/avatar đúng.
- Bình luận hiển thị nội dung, tác giả, thời gian.
- File đính kèm hiển thị tên, kích thước; có thể tải xuống.
- Checklist hiển thị mục và trạng thái checked/unchecked đúng.
- Người không thuộc nhóm truy cập URL trực tiếp → thông báo không có quyền.
- Truy cập URL công việc đã xóa → thông báo không tìm thấy.

---

### 7.3.10. Ghi chú
- Các test case tham chiếu: `TC_TASK_DETAIL_01` đến `TC_TASK_DETAIL_12` (file `TC_TASK_DETAIL.md`).
- `TC_TASK_DETAIL_10` xác nhận thông báo 404 khi truy cập task đã xóa; cần tái tạo task sau test.
- `TC_TASK_DETAIL_11` xác nhận chặn `outsider@test.com` truy cập task ngoài nhóm.
- `TC_TASK_DETAIL_12` xác nhận trang chi tiết cập nhật khi thành viên khác thay đổi trạng thái.
- Pre-condition: tài khoản `outsider@test.com` phải tồn tại và không là thành viên của `Group Task Test`.
- Liên kết ràng buộc C-3, C-4.
