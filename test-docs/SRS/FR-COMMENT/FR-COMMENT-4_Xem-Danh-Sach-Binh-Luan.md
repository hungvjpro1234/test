## 8.4. Chức năng Xem danh sách bình luận

### 8.4.1. Mô tả chức năng

Chức năng Xem danh sách bình luận hiển thị toàn bộ bình luận của công việc trong trang chi tiết: mỗi mục gồm nội dung, tên hoặc avatar tác giả, thời gian gửi; bình luận đã chỉnh sửa có nhãn "đã chỉnh sửa" hoặc tương đương. Danh sách sắp xếp theo thứ tự thời gian nhất quán (cũ → mới hoặc mới → cũ theo thiết kế). Khi có nhiều bình luận, hệ thống hỗ trợ phân trang hoặc tải thêm / cuộn để không trùng lặp bản ghi. Task chưa có bình luận hiển thị trạng thái rỗng rõ ràng. Chỉ thành viên nhóm được xem; người không thuộc nhóm bị chặn.

---

### 8.4.2. Yêu cầu chức năng

**FR-COMMENT-4-01:** Hệ thống phải hiển thị phần bình luận trong chi tiết công việc với layout rõ ràng (FR-COMMENT-4.1).

**FR-COMMENT-4-02:** Mỗi bình luận phải hiển thị tối thiểu: nội dung, tên/avatar tác giả, thời gian gửi.

**FR-COMMENT-4-03:** Bình luận đã được chỉnh sửa phải có nhãn "đã chỉnh sửa" hoặc "(edited)".

**FR-COMMENT-4-04:** Thứ tự hiển thị bình luận phải nhất quán theo quy tắc thời gian (ghi nhận thiết kế thực tế: cũ trên mới dưới hoặc ngược lại).

**FR-COMMENT-4-05:** Khi số bình luận vượt một trang hiển thị, hệ thống phải có phân trang hoặc "Xem thêm" / tải khi cuộn; không duplicate khi tải thêm.

**FR-COMMENT-4-06:** Task không có bình luận phải hiển thị "Chưa có bình luận" hoặc trạng thái trống tương đương.

**FR-COMMENT-4-07:** Người không thuộc nhóm không được xem nội dung bình luận khi truy cập trái phép (URL trực tiếp).

**FR-COMMENT-4-08:** Danh sách phải cập nhật khi có bình luận mới (real-time hoặc sau reload — theo test kỳ vọng).

**FR-COMMENT-4-09:** Số lượng và nội dung bình luận phải nhất quán giữa các thành viên trong cùng nhóm.

---

### 8.4.3. Đặc tả Use Case

**Tên Use Case:** Xem danh sách bình luận trong chi tiết công việc  
**Mã Use Case:** UC-COMMENT-VIEW-01

**Mô tả:**  
Thành viên nhóm mở chi tiết công việc và xem danh sách bình luận có phân trang hoặc tải thêm khi cần.

**Tác nhân chính:**  
Thành viên nhóm (`member@test.com`)

**Tiền điều kiện:**
- `member@test.com` đã đăng nhập; là thành viên `Group Task Test`.
- `Task Comment Test` có ít nhất 5 bình luận từ nhiều người, thời điểm khác nhau (cho test sắp xếp và UI).
- `outsider@test.com` không thuộc nhóm (cho test truy cập).
- Task không có bình luận (cho test trạng thái trống).

**Kích hoạt:**  
Người dùng mở trang chi tiết công việc và cuộn đến phần bình luận.

**Hậu điều kiện:**  
Người dùng hợp lệ thấy danh sách đúng với dữ liệu hệ thống.

#### a. Luồng chính (Basic Flow)
1. `member@test.com` mở `Task Comment Test`.
2. Cuộn đến phần bình luận.
3. Hệ thống hiển thị danh sách bình luận với layout ổn định (responsive).
4. Mỗi bình luận có nội dung, tác giả (tên/avatar), thời gian.
5. Bình luận đã sửa có nhãn đã chỉnh sửa.

#### b. Luồng thay thế (Alternative Flow)

**AF-01: Task chưa có bình luận**
1. Mở chi tiết task không có bình luận.
2. Hiển thị "Chưa có bình luận" hoặc tương đương.

**AF-02: Nhiều bình luận — phân trang / load thêm**
1. Task có số bình luận > một trang.
2. Người dùng cuộn hoặc nhấn "Xem thêm".
3. Bình luận tiếp theo được tải; không trùng lặp.

**AF-03: Cập nhật khi có bình luận mới**
1. Thành viên khác gửi bình luận mới.
2. Người đang xem thấy bình luận mới xuất hiện ngay hoặc sau khi reload (theo khả năng real-time của hệ thống).

#### c. Luồng ngoại lệ (Exception Flow)

**EF-01: Outsider truy cập URL task (FR-COMMENT-4 — kiểm soát quyền)**  
`outsider@test.com` truy cập URL trực tiếp → hệ thống chặn; không hiển thị nội dung bình luận.

---

### 8.4.4. Dữ liệu vào
- Xác thực người dùng và quyền truy cập công việc

### 8.4.5. Dữ liệu ra
- Danh sách bình luận (phân trang hoặc tải dần)
- Trạng thái trống khi không có bình luận

---

### 8.4.6. Quy tắc nghiệp vụ
- Chỉ thành viên nhóm xem được bình luận trên công việc của nhóm (C-4, NFR-SEC).
- Thứ tự hiển thị phải nhất quán cho mọi người xem hợp lệ.
- Nội dung hiển thị phải khớp giữa các thành viên.

---

### 8.4.7. Điều kiện tiền đề và ràng buộc
- Cần task có ≥ 5 bình luận để verify đầy đủ UI và thứ tự.
- Cần task có nhiều bình luận hơn một trang để test `TC_COMMENT_VIEW_07`.

---

### 8.4.8. Mức độ ưu tiên
**Mức độ ưu tiên: Cao**

**Lý do:**  
Đọc luồng thảo luận là hành vi cơ bản sau khi thêm bình luận; không có danh sách rõ ràng thì collaboration kém tin cậy.

---

### 8.4.9. Tiêu chí chấp nhận
- Phần bình luận hiển thị đúng giao diện; responsive.
- Đủ thông tin từng bình luận; bình luận đã sửa có nhãn.
- Thứ tự thời gian nhất quán.
- Task không bình luận → thông báo trống phù hợp.
- Phân trang / load thêm hoạt động, không duplicate.
- Outsider không xem được qua URL.
- Bình luận mới xuất hiện (real-time hoặc reload).
- Hai thành viên đếm và so khớp danh sách giống nhau.

---

### 8.4.10. Ghi chú
- Test case tham chiếu: `TC_COMMENT_VIEW_01` đến `TC_COMMENT_VIEW_10` (file `TC_COMMENT_VIEW.md`).
- `TC_COMMENT_VIEW_07`: cần task có nhiều bình luận hơn một trang.
- `TC_COMMENT_VIEW_09`: ghi nhận hành vi real-time vs reload theo hệ thống thực tế.
