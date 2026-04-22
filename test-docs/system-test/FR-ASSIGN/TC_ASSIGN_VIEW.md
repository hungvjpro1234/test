# TC_ASSIGN_VIEW — FR-ASSIGN-3: Xem Danh Sách Người Được Giao

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | FR-ASSIGN — Phân công công việc |
| Feature | FR-ASSIGN-3 — Xem danh sách người được giao |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Ứng dụng đang chạy; đăng nhập `member@test.com` / `Abc@1234`; tồn tại `Task View Assignees` được giao cho `member1@test.com` và `member2@test.com`; tồn tại `Task No Assignee` chưa được giao cho ai; `outsider@test.com` không thuộc nhóm |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 9     |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Trang chi tiết task hiển thị phần "Người được giao"
- [ ] Hiển thị đủ thông tin từng assignee: tên, avatar
- [ ] Task có nhiều assignee → hiển thị toàn bộ
- [ ] Task chưa có assignee → hiển thị trạng thái "Chưa được giao"
- [ ] Số lượng assignee hiển thị đúng với thực tế
- [ ] Thành viên nhóm đều thấy danh sách assignee như nhau
- [ ] Người không thuộc nhóm không xem được
- [ ] Giao diện responsive

---

## TEST CASES

### UI TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_ASSIGN_VIEW_01 | Phần người được giao hiển thị trong chi tiết task | Đăng nhập `member@test.com` | 1. Mở chi tiết `Task View Assignees` | — | Phần "Người được giao" hiển thị rõ ràng trong trang chi tiết | | | |
| TC_ASSIGN_VIEW_02 | Thông tin assignee hiển thị đủ | Đang xem chi tiết `Task View Assignees` | 1. Quan sát thông tin mỗi assignee | — | Mỗi assignee hiển thị tên và avatar (nếu có) | | | |
| TC_ASSIGN_VIEW_03 | Giao diện responsive | Chi tiết task đang mở | 1. Resize cửa sổ trình duyệt | — | Phần assignee không bị vỡ layout | | | |

---

### FUNCTION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_ASSIGN_VIEW_04 | Hiển thị đúng tất cả assignee | Đang xem `Task View Assignees` | 1. Đọc danh sách người được giao | — | Cả `member1@test.com` và `member2@test.com` đều hiển thị; số lượng khớp thực tế | | | |
| TC_ASSIGN_VIEW_05 | Task chưa có assignee hiển thị đúng | Đăng nhập `member@test.com` | 1. Mở chi tiết `Task No Assignee` | — | Hiển thị "Chưa được giao" hoặc trạng thái tương đương; không hiển thị tên giả | | | |
| TC_ASSIGN_VIEW_06 | Danh sách cập nhật sau khi thêm assignee | Đang xem `Task No Assignee` | 1. Giao task cho `member1@test.com`<br>2. Quan sát phần người được giao | — | `member1@test.com` xuất hiện ngay trong danh sách | | | |
| TC_ASSIGN_VIEW_07 | Danh sách cập nhật sau khi xóa assignee | Đang xem `Task View Assignees` | 1. Hủy giao `member1@test.com`<br>2. Quan sát phần người được giao | — | `member1@test.com` biến mất ngay khỏi danh sách | | | ⚠️ Thêm lại sau test |
| TC_ASSIGN_VIEW_08 | Người không thuộc nhóm không xem được | Đăng nhập `outsider@test.com` | 1. Cố truy cập URL trực tiếp của `Task View Assignees` | — | Hệ thống chặn; không hiển thị nội dung task kể cả danh sách assignee | | | |

---

### BUSINESS FLOW

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_ASSIGN_VIEW_09 | Tất cả thành viên nhóm thấy danh sách assignee như nhau | `member1@test.com` và `member2@test.com` được giao | 1. Đăng nhập `member@test.com` → ghi nhớ danh sách assignee<br>2. Đăng nhập tài khoản khác trong nhóm → xem cùng task | — | Danh sách assignee hiển thị giống nhau với mọi thành viên nhóm | | | |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
