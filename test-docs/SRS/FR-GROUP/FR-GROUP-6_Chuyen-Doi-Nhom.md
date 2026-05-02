## 6.6. Chức năng Chuyển đổi nhóm đang làm việc

### 6.6.1. Mô tả chức năng

Chức năng Chuyển đổi nhóm đang làm việc cho phép người dùng chuyển ngữ cảnh làm việc sang một nhóm khác mà họ là thành viên. Khi chuyển nhóm, toàn bộ giao diện (danh sách công việc, chat, folder…) được cập nhật để phản ánh nội dung của nhóm được chọn. Hệ thống ngăn người dùng truy cập nhóm mà họ không tham gia.

---

### 6.6.2. Yêu cầu chức năng

**FR-GROUP-6-01:** Giao diện phải hiển thị danh sách nhóm của người dùng dưới dạng có thể nhấp để chuyển đổi; nhóm đang active phải được đánh dấu nổi bật.

**FR-GROUP-6-02:** Khi người dùng chọn một nhóm, hệ thống phải cập nhật toàn bộ giao diện để hiển thị nội dung (công việc, chat, folder) của nhóm được chọn.

**FR-GROUP-6-03:** Header/breadcrumb phải hiển thị đúng tên nhóm đang active sau khi chuyển đổi.

**FR-GROUP-6-04:** Nội dung của nhóm đang hiển thị không được lẫn dữ liệu từ nhóm khác.

**FR-GROUP-6-05:** Hệ thống phải ngăn người dùng truy cập nhóm mà họ không là thành viên; hiển thị thông báo không có quyền truy cập.

**FR-GROUP-6-06:** Chuyển đổi nhiều lần liên tiếp giữa các nhóm không được gây lỗi hoặc hiển thị sai dữ liệu.

---

### 6.6.3. Đặc tả Use Case

**Tên Use Case:** Chuyển đổi nhóm đang làm việc  
**Mã Use Case:** UC-GROUP-SWITCH-01

**Mô tả:**  
Người dùng chọn một nhóm khác từ danh sách nhóm của mình. Hệ thống chuyển ngữ cảnh làm việc sang nhóm được chọn, cập nhật toàn bộ giao diện để hiển thị đúng dữ liệu của nhóm đó.

**Tác nhân chính:**  
Người dùng đã đăng nhập, là thành viên của ít nhất hai nhóm

**Tiền điều kiện:**
- Người dùng đã đăng nhập thành công.
- Người dùng là thành viên của ít nhất hai nhóm.
- Ứng dụng đang hiển thị một nhóm đang active.

**Kích hoạt:**  
Người dùng nhấp vào tên nhóm khác trong sidebar/danh sách nhóm.

**Hậu điều kiện:**
- Nhóm được chọn trở thành nhóm active.
- Giao diện hiển thị đúng nội dung (công việc, chat, folder) của nhóm mới.
- Header/breadcrumb phản ánh tên nhóm đang active.

#### a. Luồng chính (Basic Flow)
1. Người dùng đang làm việc trong một nhóm (Group A).
2. Người dùng nhìn thấy danh sách nhóm trong sidebar; Group A được highlight là nhóm active.
3. Người dùng nhấp vào Group B trong danh sách.
4. Hệ thống xác nhận người dùng là thành viên của Group B.
5. Hệ thống cập nhật ngữ cảnh làm việc sang Group B.
6. Giao diện hiển thị danh sách công việc của Group B.
7. Tab chat chuyển sang lịch sử chat của Group B.
8. Header/breadcrumb hiển thị tên "Group B".
9. Group B được highlight là nhóm active trong sidebar; Group A bỏ highlight.

#### b. Luồng thay thế (Alternative Flow)

**AF-01: Chuyển nhiều lần liên tiếp**
1. Người dùng chuyển qua lại nhanh giữa Group A và Group B nhiều lần liên tiếp.
2. Mỗi lần chuyển, hệ thống hiển thị đúng nội dung của nhóm tương ứng.
3. Không có lỗi giao diện hoặc dữ liệu bị lẫn giữa các nhóm.

#### c. Luồng ngoại lệ (Exception Flow)

**EF-01: Người dùng cố truy cập nhóm không thuộc về**
1. Người dùng cố truy cập URL trực tiếp của nhóm họ không tham gia, hoặc nhấp vào nhóm không thuộc danh sách của mình.
2. Hệ thống kiểm tra tư cách thành viên.
3. Hệ thống hiển thị thông báo "Bạn không có quyền truy cập nhóm này"; không hiển thị nội dung nhóm.

---

### 6.6.4. Dữ liệu vào
- ID nhóm được chọn để chuyển đổi

### 6.6.5. Dữ liệu ra
- Giao diện được cập nhật với nội dung của nhóm mới (công việc, chat, folder)
- Header/breadcrumb hiển thị tên nhóm đang active
- Thông báo không có quyền khi cố truy cập nhóm không thuộc về

---

### 6.6.6. Quy tắc nghiệp vụ
- Người dùng chỉ có thể chuyển sang nhóm họ là thành viên; không thể truy cập nhóm người khác.
- Khi chuyển nhóm, toàn bộ nội dung hiển thị (task, chat, folder…) phải thuộc về nhóm được chọn, không lẫn dữ liệu nhóm khác.
- Người dùng phải chọn nhóm đang làm việc trước khi có thể tạo hoặc xem công việc trong nhóm đó (ràng buộc A-3).
- Chuyển nhóm không xóa hay thay đổi dữ liệu; chỉ thay đổi ngữ cảnh hiển thị.

---

### 6.6.7. Điều kiện tiền đề và ràng buộc
- Người dùng phải đang đăng nhập hợp lệ.
- Người dùng phải là thành viên của nhóm muốn chuyển sang.
- Cơ sở dữ liệu phải truy cập được để tải dữ liệu nhóm mới.

---

### 6.6.8. Mức độ ưu tiên
**Mức độ ưu tiên: Cao**

**Lý do:**  
Đây là cơ chế điều hướng cốt lõi của hệ thống đa nhóm. Người dùng thường xuyên làm việc trong nhiều nhóm khác nhau; chuyển đổi nhóm phải mượt mà và chính xác để tránh nhầm lẫn dữ liệu.

---

### 6.6.9. Tiêu chí chấp nhận
- Nhấp vào nhóm khác trong sidebar → giao diện chuyển sang nhóm đó, hiển thị đúng công việc và chat.
- Header/breadcrumb hiển thị tên nhóm đang active sau khi chuyển.
- Nội dung hiển thị chỉ thuộc nhóm đang active; không lẫn dữ liệu nhóm khác.
- Cố truy cập nhóm không thuộc về → thông báo không có quyền truy cập.
- Chuyển nhiều lần liên tiếp → không có lỗi, mỗi lần hiển thị đúng nội dung nhóm.
- Reload trang → vẫn ở nhóm đã chọn (hoặc về nhóm mặc định — tùy business rule).

---

### 6.6.10. Ghi chú
- Các test case tham chiếu: `TC_GROUP_SWITCH_01` đến `TC_GROUP_SWITCH_09` (file `TC_GROUP_SWITCH.md`).
- `TC_GROUP_SWITCH_05` xác nhận không lẫn dữ liệu giữa các nhóm.
- `TC_GROUP_SWITCH_07` xác nhận chặn truy cập nhóm không thuộc về.
- `TC_GROUP_SWITCH_08` kiểm tra chuyển nhiều lần liên tiếp không gây lỗi.
- `TC_GROUP_SWITCH_09` kiểm tra nhóm active có persist sau reload — kết quả tùy business rule của hệ thống.
- Liên kết với ràng buộc A-3: "Người dùng phải chọn nhóm đang làm việc trước khi tạo hoặc xem công việc."
