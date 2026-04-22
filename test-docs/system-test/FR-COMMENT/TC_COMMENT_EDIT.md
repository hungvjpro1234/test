# TC_COMMENT_EDIT — FR-COMMENT-2: Sửa Bình Luận

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | FR-COMMENT — Bình luận công việc |
| Feature | FR-COMMENT-2 — Sửa bình luận |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Ứng dụng đang chạy; `commenter@test.com` / `Abc@1234` là thành viên `Group Task Test`; tồn tại task `Task Comment Test` có ít nhất 1 bình luận của `commenter@test.com` (nội dung: `Bình luận gốc để sửa`) và 1 bình luận của `other@test.com` |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 12    |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Nút/tùy chọn sửa chỉ hiển thị trên bình luận của chính mình
- [ ] Sửa bình luận thành công → nội dung mới hiển thị ngay
- [ ] Bình luận đã sửa được đánh dấu "đã chỉnh sửa"
- [ ] Sửa thành nội dung trống → thông báo lỗi, không lưu
- [ ] Sửa thành nội dung vượt 2000 ký tự → thông báo lỗi, không lưu
- [ ] Cố sửa bình luận của người khác → thông báo không có quyền
- [ ] Hủy chỉnh sửa → nội dung bình luận không thay đổi
- [ ] Thay đổi persist sau reload
- [ ] Giao diện responsive

---

## TEST CASES

### UI TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_COMMENT_EDIT_01 | Nút sửa chỉ hiển thị trên bình luận của mình | Đăng nhập `commenter@test.com`, mở `Task Comment Test` | 1. Quan sát bình luận của chính mình<br>2. Quan sát bình luận của `other@test.com` | — | Nút sửa hiển thị trên bình luận của `commenter@test.com`; không hiển thị trên bình luận của `other@test.com` | | | |
| TC_COMMENT_EDIT_02 | Form sửa hiển thị nội dung bình luận hiện tại | Đang xem bình luận của mình | 1. Nhấn nút sửa bình luận | — | Ô chỉnh sửa mở ra với nội dung hiện tại đã điền sẵn | | | |
| TC_COMMENT_EDIT_03 | Giao diện responsive | Form sửa đang mở | 1. Resize cửa sổ trình duyệt | — | Form sửa không bị vỡ layout | | | |

---

### VALIDATION

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_COMMENT_EDIT_04 | Sửa thành nội dung trống | Form sửa đang mở | 1. Xóa hết nội dung<br>2. Nhấn Lưu | Nội dung: _(trống)_ | Hiển thị thông báo lỗi; bình luận không được lưu | | | |
| TC_COMMENT_EDIT_05 | Sửa thành chỉ khoảng trắng | Form sửa đang mở | 1. Nhập toàn khoảng trắng<br>2. Nhấn Lưu | Nội dung: `     ` | Hiển thị thông báo lỗi; không lưu | | | |
| TC_COMMENT_EDIT_06 | Sửa thành nội dung đúng 2000 ký tự | Form sửa đang mở | 1. Nhập đúng 2000 ký tự<br>2. Nhấn Lưu | Nội dung: chuỗi 2000 ký tự | Lưu thành công | | | Boundary value |
| TC_COMMENT_EDIT_07 | Sửa thành nội dung 2001 ký tự | Form sửa đang mở | 1. Nhập 2001 ký tự<br>2. Nhấn Lưu | Nội dung: chuỗi 2001 ký tự | Hiển thị thông báo lỗi; không lưu | | | Boundary value |

---

### FUNCTION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_COMMENT_EDIT_08 | Sửa bình luận của mình thành công | Đăng nhập `commenter@test.com` | 1. Nhấn sửa bình luận gốc<br>2. Đổi nội dung<br>3. Nhấn Lưu | Nội dung mới: `Bình luận đã được chỉnh sửa` | Nội dung mới hiển thị ngay; bình luận được đánh dấu "đã chỉnh sửa" | | | |
| TC_COMMENT_EDIT_09 | Dấu "đã chỉnh sửa" hiển thị sau khi sửa | Đã sửa bình luận thành công | 1. Quan sát bình luận vừa sửa | — | Có nhãn/text "đã chỉnh sửa" hoặc "(edited)" hiển thị cạnh bình luận | | | |
| TC_COMMENT_EDIT_10 | Hủy chỉnh sửa → nội dung không đổi | Form sửa đang mở | 1. Thay đổi nội dung trong form<br>2. Nhấn Hủy (hoặc Escape) | Nội dung mới: `Nội dung sẽ bị hủy` | Form đóng; bình luận vẫn giữ nội dung gốc `Bình luận gốc để sửa` | | | |
| TC_COMMENT_EDIT_11 | Cố sửa bình luận của người khác | Đăng nhập `commenter@test.com` | 1. Tìm bình luận của `other@test.com`<br>2. Cố truy cập tùy chọn sửa | — | Nút sửa không hiển thị; hoặc nếu cố qua API → thông báo không có quyền | | | |

---

### BUSINESS FLOW

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_COMMENT_EDIT_12 | Nội dung mới persist sau reload | Đã sửa bình luận thành công | 1. Reload trang<br>2. Kiểm tra nội dung bình luận | — | Nội dung đã sửa vẫn hiển thị đúng sau reload; nhãn "đã chỉnh sửa" vẫn còn | | | |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
