## 10.4. Chức năng Xóa mục checklist

### 10.4.1. Mô tả chức năng

Chức năng Xóa mục checklist cho phép người dùng **có quyền** gỡ một mục khỏi danh sách checklist của công việc. Trước khi xóa, hệ thống có thể hiển thị hộp thoại xác nhận; người dùng có thể hủy để giữ mục. Xóa thành công áp dụng cho mục **chưa hoàn thành** và mục **đã hoàn thành**; mục biến mất khỏi danh sách ngay. Xóa một mục không làm mất các mục khác. Nếu có progress / tỉ lệ %, giá trị phải cập nhật sau khi xóa (đặc biệt khi xóa mục đã hoàn thành). Người chỉ xem không thấy tùy chọn xóa. Hành động không hoàn tác từ phía người dùng thông thường. **Sau mỗi lần test xóa thành công, cần thêm lại mục** để không phá vỡ các case tiếp theo.

---

### 10.4.2. Yêu cầu chức năng

**FR-CHECK-4-01:** Hệ thống phải hiển thị tùy chọn xóa cạnh mỗi mục đối với người có quyền (FR-CHECK-4.1).

**FR-CHECK-4-02:** Hệ thống phải có xác nhận trước khi xóa (hộp thoại hoặc cơ chế tương đương).

**FR-CHECK-4-03:** Nhấn Hủy trong xác nhận → mục không bị xóa.

**FR-CHECK-4-04:** Xác nhận xóa mục chưa hoàn thành → mục biến mất khỏi danh sách ngay.

**FR-CHECK-4-05:** Xác nhận xóa mục đã hoàn thành → mục biến mất; tổng số mục giảm đúng.

**FR-CHECK-4-06:** Xóa một mục không được ảnh hưởng nội dung và trạng thái các mục còn lại (ví dụ `Mục Giữ Lại`, `Mục Xóa 2`).

**FR-CHECK-4-07:** Progress / % phải cập nhật đúng sau khi xóa mục đã hoàn thành (hoặc N/A nếu không có UI progress).

**FR-CHECK-4-08:** `viewer@test.com` không thấy tùy chọn xóa.

**FR-CHECK-4-09:** Danh sách cập nhật ngay sau xóa (không cần reload).

**FR-CHECK-4-10:** Thành viên khác không còn thấy mục đã xóa.

**FR-CHECK-4-11:** Sau reload, mục đã xóa vẫn không xuất hiện.

**FR-CHECK-4-12:** Không có chức năng khôi phục mục đã xóa cho người dùng thông thường.

---

### 10.4.3. Đặc tả Use Case

**Tên Use Case:** Xóa mục checklist khỏi công việc  
**Mã Use Case:** UC-CHECK-DELETE-01

**Mô tả:**  
Người có quyền chọn xóa một mục, xác nhận; hệ thống loại mục khỏi checklist.

**Tác nhân chính:**  
Thành viên có quyền (`member@test.com`)

**Tiền điều kiện:**
- Task `Task Check Test` có ít nhất 3 mục: `Mục Xóa 1` (chưa tích), `Mục Xóa 2` (đã hoàn thành), `Mục Giữ Lại` (chưa tích).
- `viewer@test.com` chỉ quyền xem.

**Kích hoạt:**  
Người dùng nhấn xóa cạnh một mục.

**Hậu điều kiện:**  
Mục được chọn không còn trong checklist đối với mọi thành viên; **thêm lại mục sau test xóa thành công** theo ghi chú test.

#### a. Luồng chính (Basic Flow)
1. `member@test.com` mở `Task Check Test`.
2. Tùy chọn xóa hiển thị cạnh các mục.
3. Người dùng nhấn xóa `Mục Xóa 1`, xác nhận.
4. `Mục Xóa 1` biến mất ngay; các mục khác giữ nguyên.

#### b. Luồng thay thế (Alternative Flow)

**AF-01: Hủy xóa**  
Hộp thoại mở → Hủy → `Mục Xóa 1` vẫn còn.

**AF-02: Xóa mục đã hoàn thành**  
Xóa `Mục Xóa 2` (đã tích) → biến mất; progress cập nhật (ví dụ từ 1/3 về 0/2 nếu logic đếm đúng theo test).

#### c. Luồng ngoại lệ (Exception Flow)

**EF-01: Viewer**  
Không hiển thị nút xóa.

---

### 10.4.4. Dữ liệu vào
- Yêu cầu xóa mục checklist (định danh mục)
- Xác nhận

### 10.4.5. Dữ liệu ra
- Danh sách checklist không còn mục đã xóa
- Progress cập nhật (nếu có)

---

### 10.4.6. Quy tắc nghiệp vụ
- Xóa mục là thao tác không đảo ngược cho user thường.
- Phân quyền rõ giữa member đầy đủ và viewer.

---

### 10.4.7. Điều kiện tiền đề và ràng buộc
- Thiết lập đủ 3 mục với trạng thái khác nhau như test.

---

### 10.4.8. Mức độ ưu tiên
**Mức độ ưu tiên: Cao**

**Lý do:**  
Cho phép dọn mục thừa hoặc nhập nhầm mà không đụng toàn bộ checklist.

---

### 10.4.9. Tiêu chí chấp nhận
- Xóa hiển thị với người có quyền; không hiển thị với viewer; responsive.
- Hủy → giữ mục.
- Xóa mục chưa / đã hoàn thành → biến mất ngay; mục khác không sai trạng thái.
- Progress cập nhật hoặc N/A.
- Real-time; thành viên khác không thấy mục đã xóa; persist reload.
- Không khôi phục.

---

### 10.4.10. Ghi chú
- Test case tham chiếu: `TC_CHECK_DELETE_01` đến `TC_CHECK_DELETE_11` (file `TC_CHECK_DELETE.md`).
- Pre-condition test: **thêm lại mục sau mỗi lần test xóa thành công**.
- `TC_CHECK_DELETE_09`: N/A progress nếu UI không có.
