# TC_DIRECT_FILE — FR-DIRECT-7: Gửi File Trong Tin Nhắn 1-1

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | FR-DIRECT — Tin nhắn trực tiếp |
| Feature | FR-DIRECT-7 — Tải và chia sẻ file/ảnh trong hội thoại 1-1 |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Ứng dụng đang chạy; đăng nhập `user1@test.com` / `Abc@1234`; hội thoại 1-1 giữa `user1@test.com` và `user2@test.com` đã tồn tại; `outsider@test.com` không thuộc hội thoại; có sẵn các file test: ảnh PNG, file PDF, file TXT trên máy tính |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 11    |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Nút/icon đính kèm file hiển thị trong giao diện hội thoại 1-1
- [ ] Gửi file thành công → hiển thị liên kết tải hoặc xem trước trong khung hội thoại — FR-DIRECT-7.1
- [ ] Ảnh gửi hiển thị dạng thumbnail/preview trong hội thoại
- [ ] Tên file và kích thước file hiển thị đầy đủ
- [ ] Người nhận (trong hội thoại) có thể xem/tải file đã chia sẻ
- [ ] Người không thuộc hội thoại không thể tải file — FR-DIRECT-3.3
- [ ] Gửi file kèm nội dung text — cả hai hiển thị cùng nhau
- [ ] Gửi chỉ file (không có text) — được phép
- [ ] File gửi hiển thị cho người nhận ngay lập tức (realtime)

---

## TEST CASES

### UI TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_DIRECT_FILE_01 | Nút đính kèm file hiển thị trong giao diện hội thoại | Đăng nhập `user1@test.com`; đang mở hội thoại với `user2@test.com` | 1. Quan sát khu vực ô nhập tin nhắn | — | Có nút/icon đính kèm file (clip icon hoặc tương tự) hiển thị rõ trong khu vực nhập tin nhắn | | | |
| TC_DIRECT_FILE_02 | File gửi thành công hiển thị tên và liên kết tải | Đăng nhập `user1@test.com` | 1. Nhấn nút đính kèm<br>2. Chọn file `document.pdf`<br>3. Gửi | File: `document.pdf` | Tin nhắn hiển thị tên file `document.pdf`, kích thước file và liên kết để tải xuống | | | |
| TC_DIRECT_FILE_03 | Ảnh gửi hiển thị dạng thumbnail/preview trong hội thoại | Đăng nhập `user1@test.com` | 1. Nhấn nút đính kèm<br>2. Chọn file ảnh `photo.png`<br>3. Gửi | File: `photo.png` | Ảnh hiển thị dưới dạng thumbnail/preview trong khung hội thoại; có thể nhấn để xem kích thước đầy đủ | | | |

---

### VALIDATION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_DIRECT_FILE_04 | Gửi chỉ file không có text — được phép | Đăng nhập `user1@test.com` | 1. Nhấn nút đính kèm<br>2. Chọn `report.xlsx`<br>3. Không nhập text<br>4. Gửi | File: `report.xlsx`; text: `""` | Hệ thống cho phép gửi chỉ với file; file hiển thị trong hội thoại mà không cần text kèm theo | | | |
| TC_DIRECT_FILE_05 | Gửi file kèm nội dung text — cả hai hiển thị cùng nhau | Đăng nhập `user1@test.com` | 1. Nhấn nút đính kèm<br>2. Chọn `notes.txt`<br>3. Nhập `"Ghi chú quan trọng"`<br>4. Gửi | File: `notes.txt`; text: `"Ghi chú quan trọng"` | Tin nhắn hiển thị cả nội dung text `"Ghi chú quan trọng"` và thông tin file `notes.txt` trong cùng một tin nhắn | | | |
| TC_DIRECT_FILE_06 | Người không thuộc hội thoại không thể tải file — FR-DIRECT-3.3 | `user1@test.com` đã gửi file; URL file có thể trích xuất | 1. Đăng nhập `outsider@test.com`<br>2. Cố truy cập trực tiếp URL tải file | — | Hệ thống từ chối; trả về thông báo không có quyền truy cập; file không được tải | | | |

---

### FUNCTION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_DIRECT_FILE_07 | Gửi file thành công — FR-DIRECT-7.1 | Đăng nhập `user1@test.com`; đang mở hội thoại | 1. Nhấn nút đính kèm<br>2. Chọn `test.pdf`<br>3. Nhấn "Gửi" | File: `test.pdf` | File được gửi; hiển thị liên kết tải/xem file trong khung hội thoại ngay lập tức | | | |
| TC_DIRECT_FILE_08 | Người nhận trong hội thoại có thể tải file | `user1@test.com` đã gửi file `shared.pdf` | 1. Đăng nhập `user2@test.com`<br>2. Mở hội thoại với `user1@test.com`<br>3. Nhấn vào liên kết tải `shared.pdf` | — | File `shared.pdf` được tải xuống thành công từ phía `user2@test.com` | | | |
| TC_DIRECT_FILE_09 | File gửi hiển thị ngay cho người nhận đang online — realtime | `user1@test.com` và `user2@test.com` đang online | 1. `user1@test.com` gửi file `update.docx`<br>2. Quan sát màn hình `user2@test.com` | File: `update.docx` | File xuất hiện ngay lập tức trong khung hội thoại của `user2@test.com` mà không cần reload | | | |

---

### BUSINESS FLOW

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_DIRECT_FILE_10 | Luồng gửi file và người nhận tải thành công | `user1@test.com` và `user2@test.com` trong cùng hội thoại | 1. `user1@test.com` đính kèm và gửi `contract.pdf`<br>2. `user2@test.com` thấy file trong hội thoại<br>3. `user2@test.com` nhấn tải xuống | File: `contract.pdf` | Toàn bộ luồng: file gửi thành công → hiển thị trong hội thoại → tải được bởi người nhận | | | |
| TC_DIRECT_FILE_11 | Gửi nhiều file liên tiếp — lịch sử hiển thị đầy đủ đúng thứ tự | Đăng nhập `user1@test.com` | 1. Gửi `file1.png`<br>2. Gửi `file2.pdf`<br>3. Gửi tin nhắn text `"Xong rồi"`<br>4. Cuộn qua lịch sử | `file1.png`, `file2.pdf`, text | Lịch sử hiển thị đúng thứ tự: `file1.png` → `file2.pdf` → `"Xong rồi"`; không bị mất file nào | | | |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
