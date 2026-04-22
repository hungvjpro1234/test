# TC_TASK_LINK — FR-TASK-10: Liên Kết Công Việc

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | FR-TASK — Quản lý công việc |
| Feature | FR-TASK-10 — Liên kết công việc |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Đăng nhập `member@test.com` / `Abc@1234`; tồn tại `Task Link Source` và `Task Link Target` trong `Group Task Test`; `Task Link Source` chưa có liên kết nào |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 13    |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Tùy chọn "Liên kết công việc" tồn tại trong chi tiết task
- [ ] Có thể tìm kiếm task để liên kết
- [ ] Liên kết thành công → task được liên kết hiển thị trong phần chi tiết
- [ ] Liên kết hiển thị 2 chiều (cả 2 task đều thấy nhau)
- [ ] Liên kết với task không tồn tại → thông báo lỗi
- [ ] Có thể xóa liên kết
- [ ] Xóa liên kết → mối quan hệ biến mất ở cả 2 task
- [ ] Giao diện responsive

---

## TEST CASES

### UI TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_TASK_LINK_01 | Tùy chọn liên kết hiển thị trong chi tiết task | Đang xem chi tiết `Task Link Source` | 1. Kiểm tra các tùy chọn trong chi tiết task | — | Có tùy chọn "Liên kết" hoặc "Link task" | | | |
| TC_TASK_LINK_02 | Giao diện tìm kiếm task để liên kết | Đang mở form liên kết | 1. Mở form liên kết từ `Task Link Source` | — | Có ô tìm kiếm; hiển thị danh sách task có thể liên kết | | | |
| TC_TASK_LINK_03 | Giao diện responsive | Form liên kết đang mở | 1. Resize cửa sổ | — | Form không bị vỡ layout | | | |

---

### VALIDATION

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_TASK_LINK_04 | Liên kết với task không tồn tại | Form liên kết đang mở | 1. Nhập ID/tên task không tồn tại<br>2. Xác nhận liên kết | Task: `nonexistent-task-id` | Hệ thống hiển thị thông báo không tìm thấy task; không tạo liên kết | | | |
| TC_TASK_LINK_05 | Liên kết task với chính nó (nếu áp dụng) | Form liên kết đang mở | 1. Cố liên kết `Task Link Source` với chính nó | Task: `Task Link Source` | Hệ thống ngăn hoặc thông báo lỗi; không tạo liên kết vòng | | | Tùy business rule |
| TC_TASK_LINK_06 | Liên kết trùng đã có | Đã có liên kết giữa Source và Target | 1. Cố liên kết lại Source với Target | — | Hệ thống thông báo liên kết đã tồn tại; không tạo liên kết trùng | | | |

---

### FUNCTION TEST — Thêm liên kết

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_TASK_LINK_07 | Liên kết 2 task thành công | Đang xem `Task Link Source` | 1. Mở form liên kết<br>2. Tìm và chọn `Task Link Target`<br>3. Xác nhận | Task liên kết: `Task Link Target` | Thông báo thành công; `Task Link Target` xuất hiện trong phần liên kết của `Task Link Source` | | | |
| TC_TASK_LINK_08 | Liên kết hiển thị 2 chiều | Đã tạo liên kết Source ↔ Target | 1. Mở chi tiết `Task Link Target`<br>2. Kiểm tra phần liên kết | — | `Task Link Source` xuất hiện trong phần liên kết của `Task Link Target` | | | |
| TC_TASK_LINK_09 | Click vào task liên kết → mở chi tiết task đó | Đang xem liên kết trong `Task Link Source` | 1. Click vào `Task Link Target` trong danh sách liên kết | — | Mở trang chi tiết của `Task Link Target` | | | |

---

### FUNCTION TEST — Xóa liên kết

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_TASK_LINK_10 | Xóa liên kết thành công | Đã có liên kết Source ↔ Target | 1. Mở chi tiết `Task Link Source`<br>2. Tìm `Task Link Target` trong danh sách liên kết<br>3. Nhấn xóa liên kết | — | Thông báo thành công; `Task Link Target` biến mất khỏi phần liên kết | | | |
| TC_TASK_LINK_11 | Xóa liên kết → mất ở cả 2 task | Đã xóa liên kết từ `Task Link Source` | 1. Mở chi tiết `Task Link Target`<br>2. Kiểm tra phần liên kết | — | `Task Link Source` cũng không còn trong phần liên kết của `Task Link Target` | | | |

---

### BUSINESS FLOW

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_TASK_LINK_12 | Liên kết persist sau reload | Đã tạo liên kết | 1. Reload trang<br>2. Kiểm tra phần liên kết | — | Liên kết vẫn hiển thị sau reload | | | |
| TC_TASK_LINK_13 | Thành viên khác thấy liên kết | Đã tạo liên kết | 1. Đăng nhập tài khoản khác<br>2. Mở chi tiết `Task Link Source` | — | Thành viên khác cũng thấy `Task Link Target` trong phần liên kết | | | |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
