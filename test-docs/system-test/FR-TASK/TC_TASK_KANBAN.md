# TC_TASK_KANBAN — FR-TASK-7: Xem Công Việc Theo Kanban

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | FR-TASK — Quản lý công việc |
| Feature | FR-TASK-7 — Xem công việc theo Kanban |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Đăng nhập `member@test.com` / `Abc@1234`; nhóm `Group Task Test` có task ở đầy đủ các trạng thái: `Todo`, `In Progress`, `Done` (và các trạng thái khác nếu có) |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 11    |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Nút chuyển sang chế độ Kanban tồn tại
- [ ] Kanban hiển thị đúng số cột theo số trạng thái
- [ ] Tên cột khớp với tên trạng thái
- [ ] Task được phân bố đúng cột theo trạng thái hiện tại
- [ ] Kéo thả task sang cột khác → trạng thái cập nhật
- [ ] Mỗi task hiển thị tiêu đề, độ ưu tiên, ngày đến hạn (nếu có)
- [ ] Task mới tạo xuất hiện đúng cột
- [ ] Giao diện responsive

---

## TEST CASES

### UI TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_TASK_KANBAN_01 | Giao diện Kanban hiển thị đúng | Đăng nhập, vào `Group Task Test` | 1. Chuyển sang chế độ Kanban | — | Hiển thị các cột theo trạng thái; tên cột rõ ràng; layout không lỗi | | | |
| TC_TASK_KANBAN_02 | Mỗi cột hiển thị đúng số task | Đang xem Kanban | 1. Đếm task trong từng cột<br>2. So sánh với danh sách | — | Số task trong mỗi cột khớp với số task có trạng thái tương ứng | | | |
| TC_TASK_KANBAN_03 | Thông tin task hiển thị trên card | Đang xem Kanban | 1. Quan sát các card trong cột | — | Mỗi card hiển thị ít nhất tiêu đề; có thể thấy độ ưu tiên, deadline nếu có | | | |
| TC_TASK_KANBAN_04 | Giao diện responsive | Đang xem Kanban | 1. Resize cửa sổ trình duyệt | — | Các cột không bị vỡ layout; có thể scroll ngang nếu nhiều cột | | | |

---

### FUNCTION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_TASK_KANBAN_05 | Task phân bố đúng cột theo trạng thái | Đang xem Kanban | 1. Kiểm tra từng task ở mỗi cột | — | Task `Todo` ở cột `Todo`; task `In Progress` ở cột `In Progress`; task `Done` ở cột `Done` | | | |
| TC_TASK_KANBAN_06 | Kéo thả task sang cột khác → trạng thái cập nhật | Đang xem Kanban | 1. Kéo task từ cột `Todo` sang cột `In Progress` | — | Task chuyển sang cột `In Progress`; trạng thái của task được cập nhật thành `In Progress` | | | |
| TC_TASK_KANBAN_07 | Kéo thả → thay đổi persist sau reload | Đã kéo task sang cột khác | 1. Reload trang<br>2. Kiểm tra vị trí task | — | Task vẫn ở cột mới sau reload | | | |
| TC_TASK_KANBAN_08 | Click vào card → mở chi tiết task | Đang xem Kanban | 1. Click vào 1 task card | — | Mở trang chi tiết của task đó | | | |
| TC_TASK_KANBAN_09 | Task mới tạo xuất hiện đúng cột | Đang xem Kanban | 1. Tạo task mới với trạng thái `Todo`<br>2. Quan sát Kanban | Trạng thái: `Todo` | Task xuất hiện ở cột `Todo` ngay | | | |

---

### BUSINESS FLOW

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_TASK_KANBAN_10 | Kéo thả Kanban → danh sách task cập nhật đúng trạng thái | Đã kéo task từ `Todo` → `Done` | 1. Chuyển sang chế độ danh sách<br>2. Lọc theo trạng thái `Done` | — | Task vừa kéo hiển thị trong kết quả lọc `Done` | | | |
| TC_TASK_KANBAN_11 | Thành viên khác thấy thay đổi từ kéo thả | Đã kéo task sang cột khác | 1. Đăng nhập tài khoản khác<br>2. Xem Kanban | — | Thành viên khác thấy task ở đúng cột mới | | | |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
