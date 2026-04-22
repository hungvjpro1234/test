# TC_TASK_ASSIGNED — FR-TASK-8: Xem Công Việc Được Giao Cho Tôi

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | FR-TASK — Quản lý công việc |
| Feature | FR-TASK-8 — Xem công việc được giao cho tôi |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Đăng nhập `member@test.com` / `Abc@1234`; có ≥3 task được giao cho `member@test.com` (ở nhiều nhóm khác nhau); có ≥2 task trong nhóm nhưng không được giao cho `member@test.com` |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 10    |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Bộ lọc / mục "Giao cho tôi" tồn tại và có thể truy cập
- [ ] Chỉ hiển thị task được giao cho người dùng hiện tại
- [ ] Không hiển thị task không được giao cho mình dù cùng nhóm
- [ ] Hiển thị task từ tất cả nhóm mà người dùng là thành viên
- [ ] Có thể kết hợp với bộ lọc trạng thái, độ ưu tiên
- [ ] Danh sách cập nhật khi có task mới được giao
- [ ] Danh sách cập nhật khi bị thu hồi task
- [ ] Giao diện responsive

---

## TEST CASES

### UI TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_TASK_ASSIGNED_01 | Mục "Giao cho tôi" hiển thị và có thể truy cập | Đăng nhập `member@test.com` | 1. Tìm bộ lọc hoặc mục "Giao cho tôi" trong sidebar/menu | — | Tùy chọn tồn tại và click được | | | |
| TC_TASK_ASSIGNED_02 | Giao diện responsive | Đang xem danh sách "Giao cho tôi" | 1. Resize cửa sổ | — | Layout không bị vỡ | | | |

---

### FUNCTION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_TASK_ASSIGNED_03 | Chỉ hiển thị task được giao cho mình | Đăng nhập `member@test.com` | 1. Mở "Giao cho tôi"<br>2. Kiểm tra từng task trong danh sách | — | Tất cả task hiển thị đều có `member@test.com` là người được giao | | | |
| TC_TASK_ASSIGNED_04 | Không hiển thị task không được giao cho mình | Đăng nhập `member@test.com` | 1. Mở "Giao cho tôi"<br>2. Kiểm tra xem có task không thuộc về mình không | — | Task không có `member@test.com` trong danh sách được giao không xuất hiện | | | |
| TC_TASK_ASSIGNED_05 | Hiển thị task từ nhiều nhóm | `member@test.com` có task ở ≥2 nhóm | 1. Mở "Giao cho tôi"<br>2. Kiểm tra nguồn gốc của các task | — | Task từ tất cả nhóm đều xuất hiện (không giới hạn 1 nhóm) | | | |
| TC_TASK_ASSIGNED_06 | Kết hợp lọc "Giao cho tôi" + Trạng thái | Đang xem "Giao cho tôi" | 1. Áp dụng thêm bộ lọc Trạng thái = `In Progress` | — | Chỉ hiển thị task giao cho mình VÀ có trạng thái `In Progress` | | | |
| TC_TASK_ASSIGNED_07 | Danh sách cập nhật khi được giao task mới | Đang xem "Giao cho tôi" | 1. Thành viên khác giao thêm task mới cho `member@test.com`<br>2. Kiểm tra danh sách | — | Task mới xuất hiện trong "Giao cho tôi" | | | |
| TC_TASK_ASSIGNED_08 | Danh sách cập nhật khi bị thu hồi task | Đang xem "Giao cho tôi" | 1. Thành viên khác gỡ `member@test.com` khỏi 1 task<br>2. Kiểm tra danh sách | — | Task bị gỡ không còn trong "Giao cho tôi" | | | |

---

### BUSINESS FLOW

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_TASK_ASSIGNED_09 | Danh sách "Giao cho tôi" là của riêng mỗi user | 2 tài khoản có task được giao khác nhau | 1. Đăng nhập `member@test.com` → ghi nhớ danh sách<br>2. Đăng nhập `admin_group@test.com` → xem "Giao cho tôi" | — | Mỗi user chỉ thấy task được giao cho chính họ | | | |
| TC_TASK_ASSIGNED_10 | Danh sách persist sau reload và đăng nhập lại | Đang xem "Giao cho tôi" | 1. Reload trang<br>2. Đăng xuất và đăng nhập lại<br>3. Mở lại "Giao cho tôi" | — | Danh sách vẫn đúng sau reload và đăng nhập lại | | | |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
