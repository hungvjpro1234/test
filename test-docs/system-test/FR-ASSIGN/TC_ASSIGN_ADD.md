# TC_ASSIGN_ADD — FR-ASSIGN-1: Giao Việc Cho Thành Viên

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | FR-ASSIGN — Phân công công việc |
| Feature | FR-ASSIGN-1 — Giao việc cho thành viên |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Ứng dụng đang chạy; `assigner@test.com` / `Abc@1234` có quyền giao việc trong `Group Task Test`; tồn tại task `Task Assign Test` chưa có ai được giao; `member1@test.com`, `member2@test.com` là thành viên hợp lệ của nhóm; `locked@test.com` là tài khoản bị khóa; biết giới hạn tối đa người được giao của hệ thống |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 14    |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Giao diện phân công hiển thị danh sách thành viên nhóm có thể chọn
- [ ] Giao việc cho 1 người thành công → người đó xuất hiện trong danh sách được giao
- [ ] Giao việc cho 1 người thành công → người đó nhận được thông báo
- [ ] Giao việc cho nhiều người cùng lúc thành công
- [ ] Giao việc cho người đã được giao trước đó → không tạo trùng
- [ ] Vượt số lượng tối đa người được giao → thông báo lỗi, không giao thêm
- [ ] Giao cho tài khoản không tồn tại → thông báo lỗi
- [ ] Giao cho tài khoản bị khóa → thông báo lỗi
- [ ] Giao cho người không thuộc nhóm → thông báo lỗi
- [ ] Danh sách người được giao cập nhật ngay (không reload)
- [ ] Giao diện responsive

---

## TEST CASES

### UI TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_ASSIGN_ADD_01 | Giao diện phân công hiển thị đúng | Đăng nhập `assigner@test.com`, mở `Task Assign Test` | 1. Mở phần phân công trong chi tiết task | — | Hiển thị ô tìm kiếm/dropdown thành viên; danh sách thành viên nhóm có thể chọn | | | |
| TC_ASSIGN_ADD_02 | Giao diện responsive | Phần phân công đang mở | 1. Resize cửa sổ trình duyệt | — | Layout không bị vỡ | | | |

---

### VALIDATION

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_ASSIGN_ADD_03 | Giao cho người đã có trong danh sách | `member1@test.com` đã được giao | 1. Cố giao `member1@test.com` lần 2 | Người: `member1@test.com` | Hệ thống thông báo người đã được giao; không thêm trùng | | | |
| TC_ASSIGN_ADD_04 | Vượt giới hạn tối đa người được giao | Task đã đủ số người tối đa | 1. Cố giao thêm 1 người | Người: `member2@test.com` | Hiển thị thông báo đã đạt giới hạn; không giao thêm | | | Cần setup task đầy assignee |
| TC_ASSIGN_ADD_05 | Giao cho tài khoản không tồn tại | Form phân công đang mở | 1. Nhập email/ID không tồn tại vào ô tìm kiếm | Email: `nonexistent_xyz@test.com` | Hệ thống thông báo không tìm thấy người dùng | | | |
| TC_ASSIGN_ADD_06 | Giao cho tài khoản bị khóa | Form phân công đang mở | 1. Tìm và chọn `locked@test.com` | Người: `locked@test.com` | Hệ thống hiển thị thông báo lỗi tài khoản không hợp lệ; không giao được | | | |
| TC_ASSIGN_ADD_07 | Giao cho người không thuộc nhóm | Form phân công đang mở | 1. Cố tìm và giao cho tài khoản hợp lệ nhưng không trong nhóm | Email: `outsider@test.com` | Hệ thống thông báo người dùng không phải thành viên nhóm; không giao được | | | |

---

### FUNCTION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_ASSIGN_ADD_08 | Giao việc cho 1 người thành công | Đăng nhập `assigner@test.com` | 1. Mở phần phân công của `Task Assign Test`<br>2. Tìm và chọn `member1@test.com`<br>3. Xác nhận | Người: `member1@test.com` | `member1@test.com` xuất hiện trong danh sách người được giao của task | | | |
| TC_ASSIGN_ADD_09 | Giao việc cho nhiều người cùng lúc | Task chưa có assignee | 1. Chọn `member1@test.com` và `member2@test.com` cùng lúc<br>2. Xác nhận | Người: `member1@test.com`, `member2@test.com` | Cả 2 đều xuất hiện trong danh sách được giao | | | |
| TC_ASSIGN_ADD_10 | Tìm kiếm thành viên theo tên | Form phân công đang mở | 1. Nhập tên thành viên vào ô tìm kiếm | Tên: `member` | Danh sách gợi ý hiển thị đúng các thành viên khớp với từ khóa | | | |

---

### BUSINESS FLOW

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_ASSIGN_ADD_11 | Người được giao nhận thông báo | Vừa giao task cho `member1@test.com` | 1. Đăng nhập `member1@test.com`<br>2. Kiểm tra thông báo | — | `member1@test.com` nhận thông báo "Bạn được giao task..." với tên task | | | |
| TC_ASSIGN_ADD_12 | Danh sách cập nhật ngay không cần reload | Đang xem chi tiết task | 1. Giao task cho `member1@test.com`<br>2. Quan sát danh sách người được giao ngay sau đó | — | `member1@test.com` xuất hiện ngay, không cần reload | | | |
| TC_ASSIGN_ADD_13 | Task xuất hiện trong "Giao cho tôi" của người nhận | Vừa giao task cho `member1@test.com` | 1. Đăng nhập `member1@test.com`<br>2. Mở mục "Giao cho tôi" | — | `Task Assign Test` xuất hiện trong danh sách "Giao cho tôi" của `member1@test.com` | | | |
| TC_ASSIGN_ADD_14 | Phân công persist sau reload và đăng nhập lại | Vừa giao task cho `member1@test.com` | 1. Reload trang<br>2. Đăng xuất rồi đăng nhập lại<br>3. Kiểm tra danh sách người được giao | — | `member1@test.com` vẫn trong danh sách người được giao sau reload và đăng nhập lại | | | |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
