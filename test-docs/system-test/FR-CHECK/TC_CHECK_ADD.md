# TC_CHECK_ADD — FR-CHECK-1: Thêm Mục Checklist

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | FR-CHECK — Checklist |
| Feature | FR-CHECK-1 — Thêm mục checklist |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Ứng dụng đang chạy; `member@test.com` / `Abc@1234` là thành viên `Group Task Test`; tồn tại task `Task Check Test` chưa có mục checklist nào; để test giới hạn 50 mục cần task riêng `Task Full Check` đã có đúng 50 mục checklist |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 13    |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Phần checklist hiển thị trong chi tiết task
- [ ] Có ô nhập và nút "Thêm" mục checklist
- [ ] Thêm mục hợp lệ → mục mới xuất hiện trong danh sách ngay
- [ ] Mục mới có trạng thái chưa hoàn thành (chưa tích) mặc định
- [ ] Mục checklist trống → thông báo lỗi, không thêm
- [ ] Mục chỉ khoảng trắng → thông báo lỗi, không thêm
- [ ] Thêm đúng 50 mục → thành công (boundary)
- [ ] Thêm mục thứ 51 → thông báo đã đạt giới hạn
- [ ] Thêm nhiều mục liên tiếp → tất cả hiển thị đúng thứ tự
- [ ] Giao diện responsive

---

## TEST CASES

### UI TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_CHECK_ADD_01 | Phần checklist hiển thị trong chi tiết task | Đăng nhập `member@test.com`, mở `Task Check Test` | 1. Quan sát trang chi tiết task | — | Phần Checklist hiển thị với ô nhập nội dung và nút "Thêm" hoặc nhấn Enter | | | |
| TC_CHECK_ADD_02 | Mục mới có trạng thái chưa tích mặc định | Vừa thêm mục checklist thành công | 1. Quan sát mục vừa thêm | — | Checkbox của mục mới ở trạng thái chưa tích (unchecked) | | | |
| TC_CHECK_ADD_03 | Giao diện responsive | Trang chi tiết task đang mở | 1. Resize cửa sổ trình duyệt | — | Phần checklist không bị vỡ layout | | | |

---

### VALIDATION

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_CHECK_ADD_04 | Mục checklist trống | Ô nhập đang trống | 1. Không nhập nội dung<br>2. Nhấn Thêm | Nội dung: _(trống)_ | Hiển thị thông báo lỗi; mục không được thêm | | | |
| TC_CHECK_ADD_05 | Mục checklist chỉ khoảng trắng | — | 1. Nhập toàn khoảng trắng<br>2. Nhấn Thêm | Nội dung: `     ` | Hiển thị thông báo lỗi; mục không được thêm | | | |
| TC_CHECK_ADD_06 | Thêm mục thứ 50 (boundary) | `Task Full Check` đang có 49 mục | 1. Thêm 1 mục hợp lệ | Nội dung: `Mục thứ 50` | Thêm thành công; tổng 50 mục | | | Boundary value |
| TC_CHECK_ADD_07 | Thêm mục thứ 51 vượt giới hạn | `Task Full Check` đã có 50 mục | 1. Cố thêm 1 mục nữa | Nội dung: `Mục thứ 51` | Hiển thị thông báo đã đạt giới hạn 50 mục; mục không được thêm | | | Boundary value |

---

### FUNCTION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_CHECK_ADD_08 | Thêm mục checklist thành công | Đăng nhập `member@test.com` | 1. Nhập nội dung mục<br>2. Nhấn Thêm (hoặc Enter) | Nội dung: `Kiểm tra giao diện trang chủ` | Mục mới xuất hiện ngay trong danh sách checklist | | | |
| TC_CHECK_ADD_09 | Thêm mục có ký tự đặc biệt và tiếng Việt | — | 1. Nhập nội dung có ký tự đặc biệt<br>2. Nhấn Thêm | Nội dung: `Viết test case #1 & "Done"!` | Mục thêm thành công; nội dung hiển thị đúng, không bị encode sai | | | |
| TC_CHECK_ADD_10 | Thêm nhiều mục liên tiếp | — | 1. Thêm mục A → thêm mục B → thêm mục C | Mục A, B, C | Cả 3 mục đều hiển thị đúng thứ tự thêm vào | | | |

---

### BUSINESS FLOW

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_CHECK_ADD_11 | Mục mới xuất hiện ngay (không reload) | Đang xem chi tiết task | 1. Thêm mục checklist<br>2. Quan sát danh sách ngay sau khi thêm | Nội dung: `Mục real-time` | Mục xuất hiện ngay, không cần reload | | | |
| TC_CHECK_ADD_12 | Thành viên khác thấy mục mới | Vừa thêm mục mới | 1. Đăng nhập tài khoản khác trong nhóm<br>2. Mở `Task Check Test` | — | Mục mới hiển thị đúng với thành viên khác | | | |
| TC_CHECK_ADD_13 | Mục checklist persist sau reload | Vừa thêm mục checklist | 1. Reload trang<br>2. Kiểm tra danh sách checklist | — | Mục vừa thêm vẫn còn trong danh sách sau reload | | | |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
