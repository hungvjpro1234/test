## 6.4. Chức năng Xóa nhóm

### 6.4.1. Mô tả chức năng

Chức năng Xóa nhóm cho phép người tạo nhóm (Owner) xóa vĩnh viễn nhóm khỏi hệ thống. Đây là thao tác không thể hoàn tác từ phía người dùng. Trước khi thực hiện, hệ thống hiển thị hộp thoại xác nhận với cảnh báo rõ ràng. Sau khi xóa, nhóm biến mất khỏi danh sách của tất cả thành viên và toàn bộ dữ liệu liên quan (task, chat…) cũng bị xóa theo. Chỉ người tạo nhóm mới có quyền xóa; các thành viên khác bị từ chối.

---

### 6.4.2. Yêu cầu chức năng

**FR-GROUP-4-01:** Tùy chọn "Xóa nhóm" phải chỉ hiển thị với người tạo nhóm (Owner); thành viên thường không thấy hoặc không thể thực hiện.

**FR-GROUP-4-02:** Khi người tạo nhóm chọn xóa, hệ thống phải hiển thị hộp thoại xác nhận với cảnh báo rõ ràng về tính không thể hoàn tác.

**FR-GROUP-4-03:** Hộp thoại phải có hai lựa chọn: "Xác nhận" (tiến hành xóa) và "Hủy" (hủy thao tác).

**FR-GROUP-4-04:** Nếu người dùng chọn "Hủy", nhóm không bị ảnh hưởng và người dùng tiếp tục làm việc bình thường.

**FR-GROUP-4-05:** Khi xác nhận xóa, hệ thống phải xóa nhóm khỏi hệ thống và nhóm không còn hiển thị trong danh sách của bất kỳ thành viên nào.

**FR-GROUP-4-06:** Thành viên không phải người tạo nhóm cố xóa nhóm phải nhận thông báo không có quyền.

**FR-GROUP-4-07:** Sau khi xóa, mọi URL trực tiếp đến nhóm phải trả về lỗi hoặc thông báo nhóm không tồn tại.

---

### 6.4.3. Đặc tả Use Case

**Tên Use Case:** Xóa nhóm làm việc  
**Mã Use Case:** UC-GROUP-DELETE-01

**Mô tả:**  
Người tạo nhóm (Owner) xóa vĩnh viễn nhóm sau khi xác nhận trong hộp thoại cảnh báo. Hệ thống xóa nhóm và cập nhật danh sách của tất cả thành viên.

**Tác nhân chính:**  
Người tạo nhóm (Owner)

**Tiền điều kiện:**
- Người dùng đã đăng nhập thành công.
- Người dùng là người tạo nhóm (Owner) của nhóm cần xóa.
- Nhóm đang tồn tại trong hệ thống.

**Kích hoạt:**  
Người tạo nhóm chọn tùy chọn "Xóa nhóm" từ menu cài đặt nhóm.

**Hậu điều kiện:**
- Nếu xác nhận: nhóm bị xóa vĩnh viễn; không còn hiển thị với bất kỳ thành viên nào.
- Nếu hủy: nhóm không thay đổi; người dùng tiếp tục làm việc bình thường.

#### a. Luồng chính (Basic Flow)
1. Người tạo nhóm (Owner) vào nhóm cần xóa và chọn tùy chọn "Xóa nhóm" từ menu cài đặt.
2. Hệ thống hiển thị hộp thoại xác nhận với cảnh báo rõ ràng về hệ quả (không thể hoàn tác).
3. Người dùng đọc cảnh báo và nhấn "Xác nhận".
4. Hệ thống xóa nhóm và toàn bộ dữ liệu liên quan.
5. Hệ thống hiển thị thông báo xóa thành công.
6. Nhóm biến mất khỏi danh sách nhóm của tất cả thành viên.
7. Người dùng được chuyển về màn hình danh sách nhóm (không còn ở trang nhóm đã xóa).

#### b. Luồng thay thế (Alternative Flow)

**AF-01: Người dùng hủy xóa trong hộp thoại**
1. Hộp thoại xác nhận đang hiển thị.
2. Người dùng nhấn "Hủy".
3. Hộp thoại đóng; nhóm vẫn tồn tại trong danh sách.
4. Người dùng tiếp tục làm việc bình thường.

#### c. Luồng ngoại lệ (Exception Flow)

**EF-01: Thành viên không phải người tạo cố xóa nhóm**
1. Thành viên thường vào nhóm và cố tìm tùy chọn xóa nhóm.
2. Hệ thống không hiển thị tùy chọn xóa cho thành viên không phải Owner.
3. Nếu cố bypass qua API, hệ thống trả về thông báo không có quyền.

**EF-02: Truy cập URL nhóm đã xóa**
1. Người dùng hoặc thành viên cũ truy cập URL trực tiếp của nhóm đã xóa.
2. Hệ thống không tìm thấy nhóm trong cơ sở dữ liệu.
3. Hệ thống hiển thị lỗi 404 hoặc thông báo "Nhóm không tồn tại".

---

### 6.4.4. Dữ liệu vào
- Hành động xác nhận xóa nhóm từ người tạo (nhấn "Xác nhận" trong hộp thoại)
- ID nhóm cần xóa

### 6.4.5. Dữ liệu ra
- Nhóm bị xóa khỏi hệ thống (hoặc đánh dấu đã xóa)
- Danh sách nhóm của tất cả thành viên được cập nhật (nhóm không còn hiển thị)
- Thông báo thành công sau khi xóa

---

### 6.4.6. Quy tắc nghiệp vụ
- Chỉ người tạo nhóm (Owner) mới có quyền xóa nhóm; các thành viên khác bị từ chối (ràng buộc C-4).
- Xóa nhóm là thao tác không thể hoàn tác từ phía người dùng.
- Hệ thống bắt buộc có bước xác nhận (confirm dialog) trước khi xóa để tránh xóa nhầm.
- Sau khi xóa, nhóm biến mất khỏi danh sách của tất cả thành viên ngay lập tức.
- Mọi URL trực tiếp đến nhóm đã xóa phải trả về thông báo không tìm thấy.

---

### 6.4.7. Điều kiện tiền đề và ràng buộc
- Người dùng phải đang đăng nhập hợp lệ và là người tạo (Owner) nhóm.
- Nhóm phải đang tồn tại trong hệ thống.
- Cơ sở dữ liệu phải truy cập được để thực hiện xóa.

---

### 6.4.8. Mức độ ưu tiên
**Mức độ ưu tiên: Trung bình**

**Lý do:**  
Xóa nhóm là thao tác quản lý vòng đời nhóm. Quan trọng nhưng ít được sử dụng; cần cơ chế bảo vệ chắc chắn để tránh mất dữ liệu nhóm không mong muốn.

---

### 6.4.9. Tiêu chí chấp nhận
- Tùy chọn "Xóa nhóm" chỉ hiển thị với người tạo nhóm (Owner).
- Nhấn "Xóa nhóm" → hộp thoại xác nhận xuất hiện với cảnh báo rõ ràng.
- Nhấn "Hủy" trong hộp thoại → nhóm không bị xóa, mọi thứ bình thường.
- Nhấn "Xác nhận" → nhóm bị xóa, biến mất khỏi danh sách của Owner.
- Sau khi Owner xóa, các thành viên khác không còn thấy nhóm đó.
- URL trực tiếp của nhóm đã xóa → thông báo không tìm thấy (404).
- Thành viên thường không có quyền xóa → nút không hiển thị hoặc thông báo lỗi quyền.

---

### 6.4.10. Ghi chú
- Các test case tham chiếu: `TC_GROUP_DELETE_01` đến `TC_GROUP_DELETE_10` (file `TC_GROUP_DELETE.md`).
- **Cảnh báo quan trọng:** Cần tái tạo lại nhóm test sau mỗi lần thực thi test case xóa thành công.
- `TC_GROUP_DELETE_03` xác nhận nhấn "Hủy" không gây ảnh hưởng.
- `TC_GROUP_DELETE_06` xác nhận thành viên khác không còn thấy nhóm sau khi xóa.
- `TC_GROUP_DELETE_08` xác nhận URL nhóm đã xóa bị chặn (404 hoặc thông báo lỗi).
- `TC_GROUP_DELETE_10` kiểm tra DB — cần quyền truy cập database để xác nhận bản ghi đã xóa.
- Liên kết ràng buộc C-4: "Chỉ người tạo nhóm mới có thể xóa nhóm."
