# TC_ATTACH_UPLOAD — FR-ATTACH-1: Tải File Lên Công Việc

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | FR-ATTACH — File đính kèm |
| Feature | FR-ATTACH-1 — Tải file lên công việc |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Ứng dụng đang chạy; `member@test.com` / `Abc@1234` là thành viên `Group Task Test`; tồn tại task `Task Attach Test` chưa có file đính kèm; chuẩn sẵn file test:<br>- `valid_image.jpg` (ảnh JPG hợp lệ, < 5 MB)<br>- `valid_doc.pdf` (PDF hợp lệ, < 5 MB)<br>- `valid_excel.xlsx` (Excel hợp lệ, < 5 MB)<br>- `large_file.zip` (> giới hạn kích thước cho phép)<br>- `malicious.exe` (file thực thi, định dạng không được phép)<br>- Để test giới hạn 20 file: cần task riêng `Task Full Attach` đã có đúng 20 file đính kèm |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 18    |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Khu vực / nút tải file đính kèm hiển thị trong chi tiết task
- [ ] Tải file hợp lệ thành công → file xuất hiện trong danh sách đính kèm ngay
- [ ] Mỗi file hiển thị đầy đủ: tên file, kích thước, người tải, thời gian tải
- [ ] File vượt giới hạn kích thước → thông báo lỗi, không tải lên
- [ ] File định dạng không được phép (`.exe`, ...) → thông báo lỗi, không tải lên
- [ ] Task đã có 20 file cố tải thêm → thông báo đã đạt giới hạn
- [ ] Tải nhiều file liên tiếp → tất cả đều lưu đúng
- [ ] File tải lên có thể download về
- [ ] Thành viên khác trong nhóm tải được file
- [ ] Người ngoài nhóm không tải được file qua link trực tiếp
- [ ] File persist sau reload và đăng nhập lại
- [ ] Giao diện responsive

---

## TEST CASES

### UI TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_ATTACH_UPLOAD_01 | Khu vực đính kèm file hiển thị đúng | Đăng nhập `member@test.com`, mở `Task Attach Test` | 1. Cuộn đến phần file đính kèm trong chi tiết task | — | Có nút "Tải file lên" hoặc vùng kéo thả file; hiển thị rõ ràng | | | |
| TC_ATTACH_UPLOAD_02 | Thông tin file hiển thị đầy đủ sau khi tải lên | Đã tải `valid_image.jpg` thành công | 1. Quan sát file trong danh sách đính kèm | — | Hiển thị: tên file `valid_image.jpg`, kích thước file, tên người tải (`member@test.com`), thời gian tải | | | |
| TC_ATTACH_UPLOAD_03 | Giao diện responsive | Trang chi tiết task đang mở | 1. Resize cửa sổ trình duyệt | — | Phần file đính kèm không bị vỡ layout ở mọi kích thước | | | |

---

### VALIDATION — Giới hạn kích thước & định dạng

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_ATTACH_UPLOAD_04 | File vượt giới hạn kích thước | Đang ở `Task Attach Test` | 1. Chọn `large_file.zip`<br>2. Nhấn tải lên | File: `large_file.zip` (> giới hạn) | Hiển thị thông báo lỗi kích thước vượt giới hạn; file không được tải lên | | | |
| TC_ATTACH_UPLOAD_05 | File định dạng không được phép — thực thi | Đang ở `Task Attach Test` | 1. Chọn `malicious.exe`<br>2. Nhấn tải lên | File: `malicious.exe` | Hiển thị thông báo lỗi định dạng không được phép; file không được tải lên | | | |
| TC_ATTACH_UPLOAD_06 | File đúng giới hạn kích thước tối đa (boundary) | Đang ở `Task Attach Test` | 1. Chuẩn bị file đúng kích thước tối đa cho phép<br>2. Tải lên | File: kích thước = giới hạn tối đa | Tải lên thành công | | | Boundary value; cần biết giới hạn cụ thể |
| TC_ATTACH_UPLOAD_07 | Tải file đúng 20 file (boundary giới hạn số lượng) | `Task Attach Test` có 19 file | 1. Tải thêm 1 file hợp lệ | File: `valid_doc.pdf` | Tải lên thành công; tổng 20 file | | | Boundary value |
| TC_ATTACH_UPLOAD_08 | Tải file thứ 21 vượt giới hạn | `Task Full Attach` đã có 20 file | 1. Cố tải thêm 1 file hợp lệ | File: `valid_image.jpg` | Hiển thị thông báo đã đạt giới hạn 20 file; file không được tải lên | | | Cần task có sẵn 20 file |

---

### FUNCTION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_ATTACH_UPLOAD_09 | Tải ảnh JPG lên thành công | Đăng nhập `member@test.com` | 1. Chọn `valid_image.jpg`<br>2. Nhấn tải lên | File: `valid_image.jpg` | File xuất hiện ngay trong danh sách đính kèm; tên và kích thước đúng | | | |
| TC_ATTACH_UPLOAD_10 | Tải tài liệu PDF lên thành công | Đang ở `Task Attach Test` | 1. Chọn `valid_doc.pdf`<br>2. Nhấn tải lên | File: `valid_doc.pdf` | File xuất hiện trong danh sách; tên đúng | | | |
| TC_ATTACH_UPLOAD_11 | Tải file Excel lên thành công | Đang ở `Task Attach Test` | 1. Chọn `valid_excel.xlsx`<br>2. Nhấn tải lên | File: `valid_excel.xlsx` | File xuất hiện trong danh sách; tên đúng | | | |
| TC_ATTACH_UPLOAD_12 | Tải nhiều file khác nhau liên tiếp | Đang ở `Task Attach Test` | 1. Tải `valid_image.jpg`<br>2. Tải `valid_doc.pdf`<br>3. Kiểm tra danh sách | 2 file khác nhau | Cả 2 file đều xuất hiện trong danh sách; thông tin mỗi file đúng | | | |
| TC_ATTACH_UPLOAD_13 | Download file vừa tải lên | Đã có `valid_image.jpg` trong danh sách | 1. Click vào link tải `valid_image.jpg` | — | File được tải về đúng, không bị lỗi hoặc thiếu nội dung | | | |
| TC_ATTACH_UPLOAD_14 | Tải file bằng kéo thả (drag & drop) nếu hỗ trợ | Đang ở `Task Attach Test` | 1. Kéo `valid_doc.pdf` vào vùng kéo thả | File: `valid_doc.pdf` | File được tải lên thành công như khi chọn file bình thường | | | N/A nếu không hỗ trợ |

---

### BUSINESS FLOW

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_ATTACH_UPLOAD_15 | File xuất hiện ngay trong danh sách (không reload) | Đang xem chi tiết task | 1. Tải `valid_image.jpg` lên<br>2. Quan sát danh sách ngay sau đó | — | File xuất hiện trong danh sách ngay mà không cần reload | | | |
| TC_ATTACH_UPLOAD_16 | Thành viên khác tải được file | `valid_image.jpg` đã có trong task | 1. Đăng nhập tài khoản khác trong nhóm<br>2. Mở `Task Attach Test`<br>3. Tải `valid_image.jpg` | — | File tải về thành công | | | |
| TC_ATTACH_UPLOAD_17 | Người ngoài nhóm không tải được file qua link | Lấy link trực tiếp của file trong task | 1. Đăng nhập `outsider@test.com`<br>2. Truy cập link trực tiếp của file | — | Hệ thống chặn truy cập; không tải được file | | | |
| TC_ATTACH_UPLOAD_18 | File persist sau reload và đăng nhập lại | `valid_image.jpg` đã có trong task | 1. Reload trang<br>2. Đăng xuất rồi đăng nhập lại<br>3. Mở `Task Attach Test` | — | `valid_image.jpg` vẫn hiển thị trong danh sách; vẫn tải được | | | |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
