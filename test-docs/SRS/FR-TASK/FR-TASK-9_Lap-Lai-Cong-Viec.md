## 7.9. Chức năng Lặp lại công việc

### 7.9.1. Mô tả chức năng

Chức năng Lặp lại công việc cho phép người dùng cài đặt chu kỳ tự động tạo lại công việc theo khoảng thời gian định kỳ: hàng ngày, hàng tuần, hàng tháng hoặc hàng năm. Người dùng có thể tùy chỉnh khoảng cách (mỗi N đơn vị thời gian) và đặt điều kiện dừng bằng ngày kết thúc hoặc số lần lặp. Công việc lặp mới được tạo tự động với cùng tiêu đề, mô tả và độ ưu tiên từ task gốc; trạng thái được reset về mặc định (Todo). Cài đặt lặp có thể bị hủy bất kỳ lúc nào.

---

### 7.9.2. Yêu cầu chức năng

**FR-TASK-9-01:** Hệ thống phải cung cấp tùy chọn cài đặt lặp lại trong form tạo hoặc chỉnh sửa công việc.

**FR-TASK-9-02:** Hệ thống phải hỗ trợ các chu kỳ: hàng ngày (Daily), hàng tuần (Weekly), hàng tháng (Monthly), hàng năm (Yearly).

**FR-TASK-9-03:** Hệ thống phải cho phép đặt khoảng cách lặp (mỗi N đơn vị, ví dụ mỗi 2 tuần).

**FR-TASK-9-04:** Hệ thống phải cho phép đặt điều kiện dừng theo ngày kết thúc hoặc số lần lặp.

**FR-TASK-9-05:** Hệ thống phải từ chối ngày kết thúc lặp nằm trong quá khứ; hiển thị thông báo lỗi ngày không hợp lệ.

**FR-TASK-9-06:** Hệ thống phải tự động tạo công việc mới theo chu kỳ đã cài đặt.

**FR-TASK-9-07:** Công việc lặp mới phải kế thừa: tiêu đề, mô tả, độ ưu tiên và người được giao từ task gốc; trạng thái phải được reset về giá trị mặc định (Todo).

**FR-TASK-9-08:** Công việc lặp phải hiển thị đúng ngày deadline trên chế độ xem Lịch.

**FR-TASK-9-09:** Người dùng phải có thể hủy cài đặt lặp; sau khi hủy hệ thống không tự động tạo công việc mới nữa.

**FR-TASK-9-10:** Cài đặt lặp phải persist sau reload và đăng nhập lại.

---

### 7.9.3. Đặc tả Use Case

**Tên Use Case:** Cài đặt và quản lý lặp lại công việc định kỳ  
**Mã Use Case:** UC-TASK-REPEAT-01

**Mô tả:**  
Người dùng cài đặt công việc lặp lại theo chu kỳ để hệ thống tự động tạo task mới đúng lịch. Người dùng chọn chu kỳ, khoảng cách và điều kiện dừng. Khi đến thời điểm, hệ thống tự động tạo task mới với thông tin kế thừa từ task gốc.

**Tác nhân chính:**  
Thành viên nhóm đã đăng nhập và có quyền tạo/chỉnh sửa công việc

**Tiền điều kiện:**
- Người dùng đã đăng nhập và có quyền tạo/chỉnh sửa công việc trong nhóm.
- Công việc gốc đã tồn tại hoặc đang được tạo mới.

**Kích hoạt:**  
Người dùng mở phần cài đặt lặp lại trong form tạo/chỉnh sửa công việc và kích hoạt chức năng lặp.

**Hậu điều kiện:**
- Nếu thành công: cài đặt lặp được lưu; hệ thống tự động tạo task mới theo chu kỳ cho đến khi điều kiện dừng thỏa.
- Nếu hủy cài đặt: hệ thống dừng tạo task mới tự động.

#### a. Luồng chính (Basic Flow)
1. Người dùng mở form chỉnh sửa công việc.
2. Người dùng mở phần cài đặt lặp lại.
3. Người dùng chọn chu kỳ (ví dụ: Hàng tuần) và khoảng cách (ví dụ: mỗi 1 tuần).
4. Người dùng chọn điều kiện dừng (ngày kết thúc hoặc số lần lặp).
5. Người dùng lưu cài đặt.
6. Hệ thống lưu cài đặt lặp vào task gốc; thông báo thành công.
7. Đến thời điểm lặp tiếp theo, hệ thống tự động tạo task mới với tiêu đề, mô tả, độ ưu tiên và người được giao giống task gốc; trạng thái reset về `Todo`.

#### b. Luồng thay thế (Alternative Flow)

**AF-01: Đặt điều kiện dừng theo số lần lặp**
1. Người dùng chọn điều kiện dừng: Số lần lặp = 5.
2. Hệ thống lưu thành công; tự động tạo đúng 5 task mới theo chu kỳ rồi dừng.

**AF-02: Hủy cài đặt lặp**
1. Người dùng mở cài đặt lặp lại của task.
2. Người dùng chọn "Không lặp lại" hoặc xóa cài đặt, rồi lưu.
3. Cài đặt lặp bị xóa; hệ thống không tự động tạo task mới nữa.

**AF-03: Task lặp hiển thị trên Lịch**
1. Task lặp được tạo tự động có deadline.
2. Task xuất hiện đúng ngày deadline trên chế độ xem Lịch.

#### c. Luồng ngoại lệ (Exception Flow)

**EF-01: Ngày kết thúc lặp trong quá khứ**
1. Người dùng chọn ngày kết thúc đã qua.
2. Hệ thống hiển thị thông báo lỗi ngày không hợp lệ; không lưu cài đặt lặp.

---

### 7.9.4. Dữ liệu vào
- Chu kỳ lặp (Daily, Weekly, Monthly, Yearly)
- Khoảng cách (N đơn vị)
- Điều kiện dừng: Ngày kết thúc (ngày trong tương lai) hoặc Số lần lặp (số nguyên dương)

### 7.9.5. Dữ liệu ra
- Cài đặt lặp lại được lưu thành công
- Task mới tự động được tạo theo chu kỳ với thông tin kế thừa từ task gốc
- Thông báo lỗi nếu ngày kết thúc không hợp lệ

---

### 7.9.6. Quy tắc nghiệp vụ
- Chu kỳ hỗ trợ: Daily, Weekly, Monthly, Yearly; khoảng cách N ≥ 1.
- Ngày kết thúc lặp phải là ngày trong tương lai.
- Task lặp mới kế thừa: tiêu đề, mô tả, độ ưu tiên, người được giao — không kế thừa trạng thái; trạng thái reset về Todo.
- Sau khi đạt điều kiện dừng (ngày kết thúc hoặc đủ số lần), hệ thống dừng tạo task mới tự động.
- Người dùng có thể hủy cài đặt lặp bất kỳ lúc nào.

---

### 7.9.7. Điều kiện tiền đề và ràng buộc
- Người dùng phải đang đăng nhập và có quyền tạo/chỉnh sửa công việc.
- Hệ thống (backend scheduler) phải hoạt động để tự động tạo task theo chu kỳ.
- Ngày kết thúc phải là ngày tương lai khi đặt điều kiện dừng theo ngày.

---

### 7.9.8. Mức độ ưu tiên
**Mức độ ưu tiên: Trung bình**

**Lý do:**  
Lặp lại công việc giúp tự động hóa các task định kỳ (họp tuần, báo cáo tháng…) — tiết kiệm thời gian và giảm thiểu bỏ sót trong quản lý công việc lặp lại.

---

### 7.9.9. Tiêu chí chấp nhận
- Tùy chọn lặp lại hiển thị trong form tạo/sửa task.
- Chọn chu kỳ Daily, khoảng cách 1 → lưu thành công.
- Chọn chu kỳ Weekly → lưu thành công.
- Chọn chu kỳ Monthly → lưu thành công.
- Chọn chu kỳ Yearly → lưu thành công.
- Khoảng cách N = 2 (ví dụ mỗi 2 tuần) → lưu thành công.
- Điều kiện dừng: ngày trong tương lai → lưu thành công.
- Điều kiện dừng: số lần = 5 → tạo đúng 5 task rồi dừng.
- Ngày kết thúc trong quá khứ → thông báo lỗi; không lưu.
- Task lặp tự động tạo → có tiêu đề, mô tả, độ ưu tiên, người được giao giống task gốc; trạng thái = Todo.
- Task lặp có deadline → hiển thị đúng ngày trên Lịch.
- Hủy cài đặt lặp → hệ thống không tạo task mới nữa.
- Cài đặt lặp persist sau reload và đăng nhập lại.

---

### 7.9.10. Ghi chú
- Các test case tham chiếu: `TC_TASK_REPEAT_01` đến `TC_TASK_REPEAT_16` (file `TC_TASK_REPEAT.md`).
- `TC_TASK_REPEAT_10` xác nhận từ chối ngày kết thúc trong quá khứ.
- `TC_TASK_REPEAT_11` xác nhận tự động tạo task theo chu kỳ; cần simulate hoặc chờ thời điểm lặp.
- `TC_TASK_REPEAT_12` xác nhận task lặp kế thừa thông tin và trạng thái reset về Todo.
- `TC_TASK_REPEAT_14` xác nhận task lặp được giao cho người nhận như task gốc.
- `TC_TASK_REPEAT_15` xác nhận task lặp hiển thị đúng ngày trên Lịch.
- `TC_TASK_REPEAT_16` xác nhận cài đặt lặp persist sau reload.
- Lưu ý: `TC_TASK_REPEAT_11` cần môi trường test hỗ trợ simulate thời gian hoặc chờ thực tế.
