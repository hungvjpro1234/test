# TC_TASK_REPEAT — FR-TASK-9: Lặp Lại Công Việc

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | FR-TASK — Quản lý công việc |
| Feature | FR-TASK-9 — Lặp lại công việc |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Đăng nhập `member@test.com` / `Abc@1234`; có quyền tạo và chỉnh sửa task trong `Group Task Test`; tồn tại task `Task Repeat Test` để thêm cài đặt lặp lại |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 16    |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Tùy chọn cài đặt lặp lại hiển thị trong form tạo/sửa task
- [ ] Hỗ trợ chu kỳ: hàng ngày, hàng tuần, hàng tháng, hàng năm
- [ ] Có thể đặt khoảng cách (mỗi N ngày/tuần/tháng)
- [ ] Có thể đặt ngày kết thúc lặp lại
- [ ] Có thể đặt số lần lặp (thay vì ngày kết thúc)
- [ ] Lưu cài đặt lặp lại thành công → thông báo thành công
- [ ] Hệ thống tự động tạo task mới theo chu kỳ đã cài
- [ ] Task lặp mới có cùng tiêu đề, mô tả, độ ưu tiên với task gốc
- [ ] Hủy cài đặt lặp lại → task không còn tự động tạo
- [ ] Giao diện responsive

---

## TEST CASES

### UI TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_TASK_REPEAT_01 | Tùy chọn lặp lại hiển thị trong form | Đang mở form sửa `Task Repeat Test` | 1. Tìm phần cài đặt lặp lại | — | Tùy chọn lặp lại tồn tại; có thể chọn chu kỳ, khoảng cách, điều kiện dừng | | | |
| TC_TASK_REPEAT_02 | Giao diện responsive | Form cài đặt lặp lại đang mở | 1. Resize cửa sổ | — | Form không bị vỡ layout | | | |

---

### FUNCTION TEST — Cài đặt chu kỳ

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_TASK_REPEAT_03 | Đặt lặp hàng ngày | Form cài đặt lặp đang mở | 1. Chọn chu kỳ: Hàng ngày<br>2. Khoảng cách: 1<br>3. Lưu | Chu kỳ: Daily, Khoảng cách: 1 | Lưu thành công; task được đánh dấu lặp lại hàng ngày | | | |
| TC_TASK_REPEAT_04 | Đặt lặp hàng tuần | Form cài đặt lặp đang mở | 1. Chọn chu kỳ: Hàng tuần<br>2. Khoảng cách: 1<br>3. Lưu | Chu kỳ: Weekly | Lưu thành công | | | |
| TC_TASK_REPEAT_05 | Đặt lặp hàng tháng | Form cài đặt lặp đang mở | 1. Chọn chu kỳ: Hàng tháng<br>3. Lưu | Chu kỳ: Monthly | Lưu thành công | | | |
| TC_TASK_REPEAT_06 | Đặt lặp hàng năm | Form cài đặt lặp đang mở | 1. Chọn chu kỳ: Hàng năm<br>2. Lưu | Chu kỳ: Yearly | Lưu thành công | | | |
| TC_TASK_REPEAT_07 | Đặt khoảng cách N > 1 | Form cài đặt lặp đang mở | 1. Chọn Hàng tuần, Khoảng cách: 2 | Chu kỳ: Weekly, Khoảng cách: 2 | Lưu thành công; task lặp mỗi 2 tuần | | | |

---

### FUNCTION TEST — Điều kiện dừng

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_TASK_REPEAT_08 | Đặt ngày kết thúc lặp | Form cài đặt lặp đang mở | 1. Chọn chu kỳ: Hàng ngày<br>2. Chọn điều kiện dừng: Ngày kết thúc<br>3. Nhập ngày kết thúc hợp lệ | Ngày kết thúc: ngày trong tương lai | Lưu thành công; hệ thống chỉ tạo task đến ngày đó | | | |
| TC_TASK_REPEAT_09 | Đặt số lần lặp | Form cài đặt lặp đang mở | 1. Chọn điều kiện dừng: Số lần lặp<br>2. Nhập số lần | Số lần: 5 | Lưu thành công; hệ thống tạo đúng 5 lần | | | |
| TC_TASK_REPEAT_10 | Ngày kết thúc trong quá khứ → lỗi | Form cài đặt lặp đang mở | 1. Chọn ngày kết thúc đã qua | Ngày kết thúc: ngày hôm qua | Hiển thị thông báo lỗi ngày không hợp lệ; không lưu | | | |

---

### FUNCTION TEST — Tự động tạo task

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_TASK_REPEAT_11 | Task mới tự động tạo theo chu kỳ | Đã cài lặp Hàng ngày | 1. Chờ đến thời điểm lặp tiếp theo (hoặc simulate thời gian)<br>2. Kiểm tra danh sách task | — | Task mới được tạo tự động với tiêu đề, mô tả, độ ưu tiên giống task gốc | | | Cần simulate hoặc chờ |
| TC_TASK_REPEAT_12 | Task lặp kế thừa thông tin từ task gốc | Task lặp đã được tạo | 1. Mở chi tiết task lặp vừa tạo | — | Tiêu đề, mô tả, độ ưu tiên giống task gốc; trạng thái reset về mặc định (Todo) | | | |

---

### FUNCTION TEST — Hủy lặp

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_TASK_REPEAT_13 | Hủy cài đặt lặp lại | Task đang có cài đặt lặp | 1. Mở cài đặt lặp lại của task<br>2. Chọn "Không lặp lại" hoặc xóa cài đặt<br>3. Lưu | — | Cài đặt lặp được xóa; hệ thống không tự động tạo task mới nữa | | | |

---

### BUSINESS FLOW

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_TASK_REPEAT_14 | Task lặp được giao cho người nhận như task gốc | Task gốc đã được giao cho `member@test.com` | 1. Task lặp được tạo tự động<br>2. Kiểm tra người được giao của task mới | — | `member@test.com` vẫn là người được giao trong task lặp | | | |
| TC_TASK_REPEAT_15 | Task lặp hiển thị đúng trên lịch | Task lặp có deadline | 1. Mở chế độ xem Lịch<br>2. Tìm task lặp | — | Task lặp hiển thị đúng ngày deadline trên lịch | | | |
| TC_TASK_REPEAT_16 | Cài đặt lặp persist sau reload và đăng nhập lại | Đã cài lặp hàng ngày | 1. Reload trang<br>2. Mở cài đặt task<br>3. Kiểm tra cài đặt lặp | — | Cài đặt lặp vẫn còn nguyên | | | |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
