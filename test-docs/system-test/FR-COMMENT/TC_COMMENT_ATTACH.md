# TC_COMMENT_ATTACH — FR-COMMENT-5: Bình Luận Kèm File

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | FR-COMMENT — Bình luận công việc |
| Feature | FR-COMMENT-5 — Bình luận kèm file đính kèm |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Ứng dụng đang chạy; `commenter@test.com` / `Abc@1234` là thành viên `Group Task Test`; tồn tại task `Task Comment Test`; chuẩn sẵn file test: `valid_image.jpg` (< 5 MB), `valid_doc.pdf` (< 5 MB), `large_file.zip` (> giới hạn cho phép), `malicious.exe` (file thực thi) |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 13    |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Nút đính kèm file hiển thị trong ô bình luận
- [ ] Đính kèm file hợp lệ + gửi bình luận → file hiển thị dạng link tải trong bình luận
- [ ] Tên file hiển thị đúng trong bình luận
- [ ] Link tải file hoạt động và tải đúng file
- [ ] Đính kèm file quá giới hạn kích thước → thông báo lỗi
- [ ] Đính kèm định dạng file không được phép → thông báo lỗi
- [ ] Gửi bình luận có nội dung văn bản + file đính kèm cùng lúc → thành công
- [ ] Gửi bình luận chỉ có file (không có text) → xử lý đúng
- [ ] Thành viên khác tải được file trong bình luận
- [ ] Giao diện responsive

---

## TEST CASES

### UI TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_COMMENT_ATTACH_01 | Nút đính kèm file hiển thị trong ô bình luận | Đăng nhập `commenter@test.com`, mở `Task Comment Test` | 1. Quan sát ô nhập bình luận | — | Có icon/nút đính kèm file hiển thị rõ trong hoặc cạnh ô bình luận | | | |
| TC_COMMENT_ATTACH_02 | File đính kèm hiển thị trong bình luận sau khi gửi | Đã gửi bình luận kèm file | 1. Quan sát bình luận vừa gửi | — | Tên file và link tải hiển thị rõ ràng trong nội dung bình luận | | | |
| TC_COMMENT_ATTACH_03 | Giao diện responsive | Bình luận kèm file đang hiển thị | 1. Resize cửa sổ | — | Bình luận kèm file không bị vỡ layout | | | |

---

### VALIDATION

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_COMMENT_ATTACH_04 | File quá giới hạn kích thước | Ô bình luận đang mở | 1. Đính kèm `large_file.zip`<br>2. Nhấn Gửi | File: `large_file.zip` (> giới hạn) | Hiển thị thông báo lỗi kích thước vượt giới hạn; bình luận không gửi | | | |
| TC_COMMENT_ATTACH_05 | File định dạng không được phép | Ô bình luận đang mở | 1. Đính kèm `malicious.exe`<br>2. Nhấn Gửi | File: `malicious.exe` | Hiển thị thông báo lỗi định dạng không được phép; bình luận không gửi | | | |
| TC_COMMENT_ATTACH_06 | Gửi bình luận không có nội dung nhưng có file | Ô bình luận đang mở | 1. Để trống nội dung text<br>2. Đính kèm `valid_image.jpg`<br>3. Nhấn Gửi | Nội dung: _(trống)_, File: `valid_image.jpg` | Tùy business rule: gửi thành công với chỉ file; hoặc yêu cầu có nội dung text — ghi nhận hành vi thực tế | | | Cần xác nhận business rule |

---

### FUNCTION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_COMMENT_ATTACH_07 | Gửi bình luận kèm ảnh thành công | Đăng nhập `commenter@test.com` | 1. Nhập nội dung bình luận<br>2. Đính kèm `valid_image.jpg`<br>3. Nhấn Gửi | Nội dung: `Xem ảnh này`, File: `valid_image.jpg` | Bình luận xuất hiện với nội dung text và link/preview ảnh | | | |
| TC_COMMENT_ATTACH_08 | Gửi bình luận kèm tài liệu PDF thành công | Đăng nhập `commenter@test.com` | 1. Nhập nội dung<br>2. Đính kèm `valid_doc.pdf`<br>3. Nhấn Gửi | File: `valid_doc.pdf` | Bình luận xuất hiện với link tải `valid_doc.pdf`; tên file hiển thị đúng | | | |
| TC_COMMENT_ATTACH_09 | Tên file hiển thị đúng trong bình luận | Đã gửi bình luận kèm `valid_image.jpg` | 1. Đọc tên file trong bình luận | — | Tên file hiển thị đúng là `valid_image.jpg` | | | |
| TC_COMMENT_ATTACH_10 | Tải file từ link trong bình luận | Bình luận kèm `valid_doc.pdf` đã tồn tại | 1. Click vào link file trong bình luận | — | File `valid_doc.pdf` được tải về đúng, không bị lỗi hoặc thiếu nội dung | | | |

---

### BUSINESS FLOW

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_COMMENT_ATTACH_11 | Thành viên khác tải được file trong bình luận | Bình luận kèm file đã tồn tại | 1. Đăng nhập tài khoản khác trong nhóm<br>2. Tìm bình luận kèm file<br>3. Click tải file | — | File tải được thành công với tài khoản khác | | | |
| TC_COMMENT_ATTACH_12 | Người không thuộc nhóm không tải được file | `outsider@test.com` không thuộc nhóm | 1. Lấy link trực tiếp của file đính kèm<br>2. Đăng nhập `outsider@test.com`<br>3. Cố truy cập link | — | Hệ thống chặn truy cập; `outsider@test.com` không tải được file | | | |
| TC_COMMENT_ATTACH_13 | File persist sau reload | Bình luận kèm file đã tồn tại | 1. Reload trang<br>2. Tìm bình luận kèm file<br>3. Kiểm tra link | — | File vẫn tồn tại và có thể tải được sau reload | | | |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
