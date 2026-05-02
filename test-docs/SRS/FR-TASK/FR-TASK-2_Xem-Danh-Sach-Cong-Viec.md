## 7.2. Chức năng Xem danh sách công việc

### 7.2.1. Mô tả chức năng

Chức năng Xem danh sách công việc cho phép thành viên nhóm xem toàn bộ công việc thuộc nhóm đang làm việc. Danh sách hiển thị tiêu đề, trạng thái, độ ưu tiên và ngày đến hạn của từng công việc. Người dùng có thể lọc theo trạng thái, độ ưu tiên và thư mục; kết hợp nhiều bộ lọc theo logic AND; tìm kiếm theo từ khóa tiêu đề (không phân biệt hoa/thường); và sắp xếp theo nhiều tiêu chí. Danh sách được cập nhật theo thời gian thực và độc lập giữa các nhóm.

---

### 7.2.2. Yêu cầu chức năng

**FR-TASK-2-01:** Hệ thống phải hiển thị danh sách công việc của nhóm đang hoạt động; mỗi mục hiển thị ít nhất tiêu đề, trạng thái, độ ưu tiên và ngày đến hạn.

**FR-TASK-2-02:** Hệ thống phải hỗ trợ lọc công việc theo từng tiêu chí: trạng thái, độ ưu tiên, thư mục.

**FR-TASK-2-03:** Khi kết hợp nhiều bộ lọc, hệ thống phải áp dụng logic AND — chỉ hiển thị công việc thỏa tất cả điều kiện.

**FR-TASK-2-04:** Hệ thống phải cung cấp chức năng xóa toàn bộ bộ lọc để hiển thị lại đầy đủ danh sách.

**FR-TASK-2-05:** Hệ thống phải hỗ trợ tìm kiếm theo từ khóa trên tiêu đề công việc, không phân biệt hoa/thường.

**FR-TASK-2-06:** Hệ thống phải hiển thị thông báo "không tìm thấy kết quả" khi tìm kiếm không khớp.

**FR-TASK-2-07:** Hệ thống phải hỗ trợ sắp xếp theo ngày tạo (tăng/giảm dần), ngày đến hạn, và độ ưu tiên.

**FR-TASK-2-08:** Danh sách phải cập nhật ngay khi có công việc mới được tạo mà không cần tải lại trang.

**FR-TASK-2-09:** Danh sách công việc phải độc lập theo nhóm — khi chuyển nhóm, hiển thị đúng công việc của nhóm đó, không lẫn dữ liệu.

---

### 7.2.3. Đặc tả Use Case

**Tên Use Case:** Xem và tìm kiếm danh sách công việc  
**Mã Use Case:** UC-TASK-LIST-01

**Mô tả:**  
Thành viên nhóm xem danh sách công việc của nhóm đang làm việc. Người dùng có thể lọc, tìm kiếm và sắp xếp danh sách theo các tiêu chí mong muốn.

**Tác nhân chính:**  
Thành viên nhóm đã đăng nhập

**Tiền điều kiện:**
- Người dùng đã đăng nhập thành công.
- Người dùng đang trong ngữ cảnh một nhóm có ít nhất một công việc.

**Kích hoạt:**  
Người dùng mở màn hình danh sách công việc của nhóm.

**Hậu điều kiện:**
- Danh sách công việc hiển thị đúng theo tiêu chí lọc/sắp xếp/tìm kiếm đang áp dụng.

#### a. Luồng chính (Basic Flow)
1. Người dùng mở màn hình danh sách công việc của nhóm đang làm việc.
2. Hệ thống truy xuất và hiển thị toàn bộ công việc thuộc nhóm.
3. Mỗi mục hiển thị: tiêu đề, trạng thái, độ ưu tiên, ngày đến hạn.
4. Người dùng xem danh sách.

#### b. Luồng thay thế (Alternative Flow)

**AF-01: Lọc theo một tiêu chí**
1. Người dùng chọn bộ lọc (ví dụ: Trạng thái = `Todo`).
2. Hệ thống chỉ hiển thị công việc thỏa điều kiện lọc.

**AF-02: Kết hợp nhiều bộ lọc (AND logic)**
1. Người dùng chọn nhiều bộ lọc (ví dụ: Trạng thái = `In Progress` VÀ Độ ưu tiên = `High`).
2. Hệ thống hiển thị công việc thỏa đồng thời tất cả điều kiện.

**AF-03: Xóa bộ lọc**
1. Người dùng nhấn "Xóa bộ lọc" hoặc reset.
2. Hệ thống hiển thị lại toàn bộ danh sách không lọc.

**AF-04: Tìm kiếm theo từ khóa**
1. Người dùng nhập từ khóa vào ô tìm kiếm.
2. Hệ thống lọc và hiển thị công việc có tiêu đề chứa từ khóa (không phân biệt hoa/thường).

**AF-05: Xóa từ khóa tìm kiếm**
1. Người dùng xóa nội dung ô tìm kiếm.
2. Hệ thống hiển thị lại toàn bộ danh sách.

**AF-06: Sắp xếp**
1. Người dùng chọn tiêu chí sắp xếp (ngày tạo tăng/giảm dần, ngày đến hạn, độ ưu tiên).
2. Hệ thống hiển thị lại danh sách theo thứ tự được chọn.

**AF-07: Chuyển sang nhóm khác**
1. Người dùng chuyển sang nhóm khác.
2. Hệ thống hiển thị danh sách công việc của nhóm mới; không lẫn dữ liệu từ nhóm cũ.

#### c. Luồng ngoại lệ (Exception Flow)

**EF-01: Tìm kiếm không có kết quả**
1. Người dùng nhập từ khóa không khớp với bất kỳ công việc nào.
2. Hệ thống hiển thị thông báo "không tìm thấy kết quả".

---

### 7.2.4. Dữ liệu vào
- Tiêu chí lọc: Trạng thái, Độ ưu tiên, Thư mục
- Từ khóa tìm kiếm (chuỗi văn bản)
- Tiêu chí sắp xếp

### 7.2.5. Dữ liệu ra
- Danh sách công việc hiển thị với tiêu đề, trạng thái, độ ưu tiên, ngày đến hạn
- Thông báo "không tìm thấy" nếu tìm kiếm không khớp

---

### 7.2.6. Quy tắc nghiệp vụ
- Kết hợp nhiều bộ lọc sử dụng logic AND (C-3).
- Tìm kiếm không phân biệt hoa/thường.
- Công việc chỉ thuộc nhóm cụ thể; danh sách hoàn toàn độc lập giữa các nhóm (C-3).
- Sắp xếp theo độ ưu tiên: `High` → `Medium` → `Low`.
- Task không có ngày đến hạn sẽ xếp cuối khi sắp xếp theo deadline.

---

### 7.2.7. Điều kiện tiền đề và ràng buộc
- Người dùng phải đang đăng nhập và là thành viên nhóm.
- Người dùng phải đang trong ngữ cảnh nhóm có công việc.

---

### 7.2.8. Mức độ ưu tiên
**Mức độ ưu tiên: Cao**

**Lý do:**  
Xem danh sách công việc là bước thiết yếu để người dùng theo dõi và quản lý tiến độ — đây là màn hình trung tâm của toàn bộ ứng dụng.

---

### 7.2.9. Tiêu chí chấp nhận
- Danh sách hiển thị đúng công việc của nhóm với đủ thông tin: tiêu đề, trạng thái, độ ưu tiên.
- Lọc trạng thái `Todo` → chỉ hiện task `Todo`.
- Lọc trạng thái `Done` → chỉ hiện task `Done`.
- Lọc độ ưu tiên `High` → chỉ hiện task `High`.
- Lọc thư mục → chỉ hiện task thuộc thư mục đó.
- Kết hợp Trạng thái + Độ ưu tiên → chỉ hiện task thỏa cả 2 (AND).
- Xóa bộ lọc → hiển thị lại toàn bộ.
- Tìm kiếm `Alpha` hoặc `alpha` → tìm thấy task có tiêu đề `Alpha`.
- Tìm kiếm không khớp → thông báo không tìm thấy.
- Xóa từ khóa → danh sách đầy đủ trở lại.
- Sắp xếp theo ngày tạo mới nhất → task mới nhất lên đầu.
- Sắp xếp theo độ ưu tiên giảm dần → `High` → `Medium` → `Low`.
- Task mới tạo xuất hiện ngay trong danh sách không cần reload.
- Chuyển nhóm → danh sách hiển thị đúng task của nhóm mới, không lẫn.

---

### 7.2.10. Ghi chú
- Các test case tham chiếu: `TC_TASK_LIST_01` đến `TC_TASK_LIST_18` (file `TC_TASK_LIST.md`).
- `TC_TASK_LIST_07` xác nhận logic AND khi kết hợp nhiều bộ lọc.
- `TC_TASK_LIST_10` xác nhận tìm kiếm không phân biệt hoa/thường.
- `TC_TASK_LIST_15` xác nhận task không có deadline xếp cuối khi sắp xếp theo deadline.
- `TC_TASK_LIST_16` xác nhận thứ tự sắp xếp High → Medium → Low.
- `TC_TASK_LIST_17` xác nhận cập nhật danh sách ngay khi tạo task mới.
- `TC_TASK_LIST_18` xác nhận danh sách độc lập theo nhóm.
