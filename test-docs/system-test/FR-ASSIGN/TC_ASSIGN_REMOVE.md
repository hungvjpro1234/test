# TC_ASSIGN_REMOVE — FR-ASSIGN-2: Hủy Giao Việc

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | FR-ASSIGN — Phân công công việc |
| Feature | FR-ASSIGN-2 — Hủy giao việc |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Ứng dụng đang chạy; `assigner@test.com` / `Abc@1234` có quyền phân công trong `Group Task Test`; tồn tại task `Task Unassign Test` đang được giao cho `member1@test.com` và `member2@test.com`; `outsider@test.com` không thuộc nhóm và không có trong danh sách được giao; **⚠️ Thêm lại assignee sau mỗi lần test hủy giao thành công** |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 11    |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Nút/tùy chọn xóa người khỏi danh sách được giao tồn tại
- [ ] Hủy giao 1 người thành công → người đó biến mất khỏi danh sách
- [ ] Người bị hủy giao nhận thông báo
- [ ] Hủy giao người không có trong danh sách → thông báo lỗi
- [ ] Sau khi bị hủy giao → task biến mất khỏi "Giao cho tôi" của người đó
- [ ] Hủy giao 1 người không ảnh hưởng đến người còn lại trong danh sách
- [ ] Danh sách cập nhật ngay (không reload)
- [ ] Giao diện responsive

---

## TEST CASES

### UI TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_ASSIGN_REMOVE_01 | Tùy chọn xóa assignee hiển thị đúng | Đăng nhập `assigner@test.com`, mở `Task Unassign Test` | 1. Mở phần người được giao trong chi tiết task | — | Mỗi assignee có nút/icon xóa cạnh tên; có thể click | | | |
| TC_ASSIGN_REMOVE_02 | Giao diện responsive | Chi tiết task đang mở | 1. Resize cửa sổ trình duyệt | — | Layout không bị vỡ | | | |

---

### VALIDATION

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_ASSIGN_REMOVE_03 | Hủy giao người không có trong danh sách | Đang xem `Task Unassign Test` | 1. Cố hủy giao `outsider@test.com` (không có trong danh sách) qua API hoặc thao tác bất thường | Người: `outsider@test.com` | Hệ thống hiển thị thông báo lỗi; không thực hiện | | | |

---

### FUNCTION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_ASSIGN_REMOVE_04 | Hủy giao 1 người thành công | `member1@test.com` và `member2@test.com` đều được giao | 1. Nhấn xóa `member1@test.com` khỏi danh sách được giao<br>2. Xác nhận (nếu có hộp thoại) | Người xóa: `member1@test.com` | `member1@test.com` biến mất khỏi danh sách; `member2@test.com` vẫn còn | | | ⚠️ Thêm lại `member1@test.com` sau test |
| TC_ASSIGN_REMOVE_05 | Hủy giao không ảnh hưởng đến người còn lại | Vừa xóa `member1@test.com` | 1. Kiểm tra danh sách sau khi xóa `member1@test.com` | — | `member2@test.com` vẫn giữ nguyên trong danh sách được giao | | | ⚠️ Thêm lại `member1@test.com` sau test |
| TC_ASSIGN_REMOVE_06 | Hủy giao toàn bộ → danh sách trống | Task có `member1@test.com` và `member2@test.com` | 1. Xóa lần lượt cả 2 người | — | Danh sách người được giao trống; task hiển thị "Chưa được giao" | | | ⚠️ Thêm lại sau test |
| TC_ASSIGN_REMOVE_07 | Danh sách cập nhật ngay sau hủy giao (không reload) | Đang xem chi tiết task | 1. Hủy giao `member1@test.com`<br>2. Quan sát danh sách ngay sau đó | — | `member1@test.com` biến mất ngay, không cần reload | | | ⚠️ Thêm lại sau test |

---

### BUSINESS FLOW

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_ASSIGN_REMOVE_08 | Người bị hủy giao nhận thông báo | Vừa hủy giao `member1@test.com` | 1. Đăng nhập `member1@test.com`<br>2. Kiểm tra thông báo | — | `member1@test.com` nhận thông báo "Bạn đã bị gỡ khỏi task..." với tên task | | | ⚠️ Thêm lại sau test |
| TC_ASSIGN_REMOVE_09 | Task biến mất khỏi "Giao cho tôi" của người bị hủy | Vừa hủy giao `member1@test.com` | 1. Đăng nhập `member1@test.com`<br>2. Mở "Giao cho tôi" | — | `Task Unassign Test` không còn trong danh sách "Giao cho tôi" | | | ⚠️ Thêm lại sau test |
| TC_ASSIGN_REMOVE_10 | Task vẫn trong "Giao cho tôi" của người còn lại | Vừa hủy giao `member1@test.com` | 1. Đăng nhập `member2@test.com`<br>2. Mở "Giao cho tôi" | — | `Task Unassign Test` vẫn xuất hiện trong danh sách của `member2@test.com` | | | ⚠️ Thêm lại `member1@test.com` sau test |
| TC_ASSIGN_REMOVE_11 | Hủy giao persist sau reload | Vừa hủy giao `member1@test.com` | 1. Reload trang<br>2. Kiểm tra danh sách người được giao | — | `member1@test.com` vẫn không còn trong danh sách sau reload | | | ⚠️ Thêm lại sau test |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
