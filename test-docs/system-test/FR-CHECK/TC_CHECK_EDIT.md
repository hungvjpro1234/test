# TC_CHECK_EDIT — FR-CHECK-2: Sửa Mục Checklist

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | FR-CHECK — Checklist |
| Feature | FR-CHECK-2 — Sửa mục checklist |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Ứng dụng đang chạy; `member@test.com` / `Abc@1234` là thành viên `Group Task Test`; tồn tại task `Task Check Test` có ít nhất 2 mục checklist: `Mục A - chưa hoàn thành` và `Mục B - đã hoàn thành` (đã tích); `viewer@test.com` / `Abc@1234` chỉ có quyền xem |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 11    |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Tùy chọn sửa mục checklist tồn tại và có thể click
- [ ] Form sửa hiển thị nội dung hiện tại của mục
- [ ] Sửa thành nội dung hợp lệ → lưu thành công, nội dung mới hiển thị ngay
- [ ] Sửa mục đã hoàn thành → trạng thái tích vẫn giữ nguyên sau khi sửa nội dung
- [ ] Sửa thành nội dung trống → thông báo lỗi, không lưu
- [ ] Sửa thành chỉ khoảng trắng → thông báo lỗi, không lưu
- [ ] Hủy chỉnh sửa → nội dung không thay đổi
- [ ] Người không có quyền sửa → không thấy tùy chọn sửa
- [ ] Thay đổi persist sau reload
- [ ] Giao diện responsive

---

## TEST CASES

### UI TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_CHECK_EDIT_01 | Tùy chọn sửa mục hiển thị đúng | Đăng nhập `member@test.com`, mở `Task Check Test` | 1. Hover hoặc click vào `Mục A` trong checklist<br>2. Tìm nút/icon sửa | — | Nút sửa hiển thị và có thể click | | | |
| TC_CHECK_EDIT_02 | Form sửa hiển thị nội dung hiện tại | Nhấn sửa `Mục A` | 1. Nhấn tùy chọn sửa `Mục A` | — | Ô nhập mở ra với nội dung `Mục A - chưa hoàn thành` đã điền sẵn | | | |
| TC_CHECK_EDIT_03 | Giao diện responsive | Form sửa đang mở | 1. Resize cửa sổ trình duyệt | — | Form sửa không bị vỡ layout | | | |

---

### VALIDATION

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_CHECK_EDIT_04 | Sửa thành nội dung trống | Form sửa đang mở | 1. Xóa hết nội dung<br>2. Nhấn Lưu | Nội dung: _(trống)_ | Hiển thị thông báo lỗi; nội dung cũ được giữ nguyên | | | |
| TC_CHECK_EDIT_05 | Sửa thành chỉ khoảng trắng | Form sửa đang mở | 1. Nhập toàn khoảng trắng<br>2. Nhấn Lưu | Nội dung: `     ` | Hiển thị thông báo lỗi; nội dung cũ được giữ nguyên | | | |

---

### FUNCTION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_CHECK_EDIT_06 | Sửa mục chưa hoàn thành thành công | Đăng nhập `member@test.com` | 1. Nhấn sửa `Mục A - chưa hoàn thành`<br>2. Đổi nội dung<br>3. Nhấn Lưu | Nội dung mới: `Mục A đã được cập nhật` | Nội dung mới hiển thị ngay trong danh sách checklist | | | |
| TC_CHECK_EDIT_07 | Sửa mục đã hoàn thành → trạng thái tích không đổi | Nhấn sửa `Mục B - đã hoàn thành` | 1. Sửa nội dung mục đã tích<br>2. Lưu | Nội dung mới: `Mục B đã cập nhật` | Nội dung mới hiển thị; checkbox vẫn ở trạng thái đã tích | | | |
| TC_CHECK_EDIT_08 | Hủy chỉnh sửa → nội dung không đổi | Form sửa đang mở với nội dung đã thay đổi | 1. Thay đổi nội dung trong form<br>2. Nhấn Hủy hoặc nhấn Escape | Nội dung mới: `Nội dung sẽ bị hủy` | Form đóng; mục vẫn giữ nội dung gốc | | | |
| TC_CHECK_EDIT_09 | Người không có quyền không thấy tùy chọn sửa | Đăng nhập `viewer@test.com` | 1. Mở `Task Check Test`<br>2. Hover/click vào các mục checklist | — | Không có nút/tùy chọn sửa hiển thị | | | |

---

### BUSINESS FLOW

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_CHECK_EDIT_10 | Nội dung mới persist sau reload | Đã sửa `Mục A` thành công | 1. Reload trang<br>2. Kiểm tra nội dung mục | — | Nội dung đã sửa vẫn hiển thị đúng sau reload | | | |
| TC_CHECK_EDIT_11 | Thành viên khác thấy nội dung đã sửa | Đã sửa `Mục A` thành công | 1. Đăng nhập tài khoản khác<br>2. Mở `Task Check Test` | — | Thành viên khác thấy nội dung mới của `Mục A` | | | |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
