## 10.1. Chức năng Thêm mục checklist

### 10.1.1. Mô tả chức năng

Chức năng Thêm mục checklist cho phép thành viên nhóm nhập nội dung và thêm mục mới vào checklist của công việc trong trang chi tiết task. Mục hợp lệ xuất hiện ngay trong danh sách với trạng thái **chưa hoàn thành** (checkbox chưa tích) mặc định. Hệ thống từ chối mục trống hoặc chỉ chứa khoảng trắng và giới hạn tối đa **50 mục** checklist trên một công việc. Nội dung hỗ trợ ký tự đặc biệt và tiếng Việt; thứ tự hiển thị khớp thứ tự thêm. Thành viên khác trong nhóm thấy mục mới giống người thêm; dữ liệu persist sau reload.

---

### 10.1.2. Yêu cầu chức năng

**FR-CHECK-1-01:** Hệ thống phải hiển thị phần checklist trong chi tiết task với ô nhập nội dung và nút Thêm (hoặc gửi bằng Enter).

**FR-CHECK-1-02:** Hệ thống phải thêm mục checklist có nội dung hợp lệ và hiển thị ngay trong danh sách (FR-CHECK-1.1).

**FR-CHECK-1-03:** Mục mới mặc định ở trạng thái chưa hoàn thành (checkbox unchecked).

**FR-CHECK-1-04:** Hệ thống phải từ chối khi nội dung trống hoặc chỉ khoảng trắng; hiển thị thông báo lỗi; không thêm mục (FR-CHECK-1.2).

**FR-CHECK-1-05:** Hệ thống phải cho phép tối đa 50 mục checklist trên một công việc; khi đã có 50 mục, từ chối thêm và hiển thị thông báo đã đạt giới hạn (FR-CHECK-1.3).

**FR-CHECK-1-06:** Boundary: task có đúng 49 mục → thêm 1 mục hợp lệ thành công; tổng 50 mục.

**FR-CHECK-1-07:** Hệ thống phải hiển thị đúng nội dung có ký tự đặc biệt và tiếng Việt.

**FR-CHECK-1-08:** Thêm nhiều mục liên tiếp → tất cả hiển thị đúng thứ tự.

**FR-CHECK-1-09:** Mục mới phải xuất hiện ngay không cần reload; persist sau reload.

**FR-CHECK-1-10:** Thành viên khác mở cùng task phải thấy mục mới đúng như người thêm.

---

### 10.1.3. Đặc tả Use Case

**Tên Use Case:** Thêm mục checklist vào công việc  
**Mã Use Case:** UC-CHECK-ADD-01

**Mô tả:**  
Người dùng nhập nội dung mục checklist và xác nhận thêm. Hệ thống kiểm tra và chèn mục vào danh sách.

**Tác nhân chính:**  
Thành viên nhóm (`member@test.com`)

**Tiền điều kiện:**
- `member@test.com` đã đăng nhập; là thành viên `Group Task Test`.
- Task `Task Check Test` (ưu tiên chưa có mục hoặc dùng để thêm dần).
- Task `Task Full Check` có đúng **49** mục (cho boundary thứ 50) hoặc **50** mục (cho test mục thứ 51).

**Kích hoạt:**  
Người dùng nhập nội dung và nhấn Thêm / Enter.

**Hậu điều kiện:**  
Mục mới trong danh sách hoặc thông báo lỗi.

#### a. Luồng chính (Basic Flow)
1. Người dùng mở chi tiết `Task Check Test`.
2. Hệ thống hiển thị phần checklist với ô nhập và nút Thêm.
3. Người dùng nhập nội dung hợp lệ (không trống, không chỉ khoảng trắng).
4. Số mục hiện tại của task < 50.
5. Người dùng nhấn Thêm (hoặc Enter).
6. Mục mới xuất hiện ngay; checkbox chưa tích.

#### b. Luồng thay thế (Alternative Flow)

**AF-01: Thêm nhiều mục A, B, C liên tiếp**  
Cả ba hiển thị đúng thứ tự.

**AF-02: Nội dung có ký tự đặc biệt và tiếng Việt**  
Ví dụ: `Viết test case #1 & "Done"!` → hiển thị đúng, không lỗi encode.

#### c. Luồng ngoại lệ (Exception Flow)

**EF-01: Trống hoặc chỉ khoảng trắng (FR-CHECK-1.2)**  
→ Thông báo lỗi; không thêm.

**EF-02: Đã đủ 50 mục (FR-CHECK-1.3)**  
Task `Task Full Check` có 50 mục; cố thêm "Mục thứ 51" → thông báo đạt giới hạn 50 mục; không thêm.

---

### 10.1.4. Dữ liệu vào
- Chuỗi nội dung mục checklist

### 10.1.5. Dữ liệu ra
- Mục mới trong danh sách (trạng thái chưa hoàn thành)
- Thông báo lỗi khi không thêm được

---

### 10.1.6. Quy tắc nghiệp vụ
- Chỉ người có quyền chỉnh sửa checklist trên công việc mới thêm được (theo phân quyền nhóm/task).
- Giới hạn 50 mục mỗi công việc.

---

### 10.1.7. Điều kiện tiền đề và ràng buộc
- Chuẩn bị `Task Full Check` với đúng 49 hoặc 50 mục cho boundary (`TC_CHECK_ADD_06`, `TC_CHECK_ADD_07`).

---

### 10.1.8. Mức độ ưu tiên
**Mức độ ưu tiên: Cao**

**Lý do:**  
Checklist là cấu trúc cơ bản để chia nhỏ công việc; không thêm được mục thì không có checklist.

---

### 10.1.9. Tiêu chí chấp nhận
- Phần checklist, ô nhập, nút Thêm hiển thị; responsive.
- Thêm thành công → mục mới ngay, chưa tích mặc định.
- Trống / chỉ khoảng trắng → lỗi.
- 49 + 1 → 50 thành công; 50 + 1 → bị chặn.
- Nhiều mục đúng thứ tự; ký tự đặc biệt & tiếng Việt đúng.
- Real-time; persist reload; thành viên khác đồng bộ.

---

### 10.1.10. Ghi chú
- Test case tham chiếu: `TC_CHECK_ADD_01` đến `TC_CHECK_ADD_13` (file `TC_CHECK_ADD.md`).
- `TC_CHECK_ADD_06`–`TC_CHECK_ADD_07`: dùng `Task Full Check` với 49/50 mục.
