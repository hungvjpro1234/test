# TC_CHAT_FILE — FR-CHAT-5: Chia Sẻ File Trong Chat Nhóm

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | FR-CHAT — Chat nhóm |
| Feature | FR-CHAT-5 — Gửi và hiển thị file/ảnh trong chat nhóm |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Ứng dụng đang chạy; đăng nhập `member@test.com` / `Abc@1234`; nhóm `Group Chat Test` gồm `member@test.com` và `member2@test.com`; `outsider@test.com` không thuộc nhóm; có sẵn các file test: ảnh PNG, file PDF, file TXT trên máy tính |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 11    |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Nút tải file/ảnh hiển thị trong giao diện chat nhóm
- [ ] Gửi file thành công → hiển thị liên kết tải hoặc xem trước file trong khung chat
- [ ] File ảnh được hiển thị trực tiếp dưới dạng thumbnail trong chat
- [ ] Tên file, kích thước file hiển thị đầy đủ
- [ ] Thành viên khác có thể xem/tải file đã chia sẻ
- [ ] Người không thuộc nhóm không thể tải file từ chat nhóm
- [ ] File được gửi kèm message text (nếu hỗ trợ) hiển thị đồng thời

---

## TEST CASES

### UI TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_CHAT_FILE_01 | Nút tải file hiển thị trong giao diện chat | Đăng nhập `member@test.com`; đang trong chat nhóm | 1. Quan sát khu vực ô nhập tin nhắn | — | Có nút/icon đính kèm file (clip icon hoặc tương tự) hiển thị rõ trong khu vực nhập | | | |
| TC_CHAT_FILE_02 | File gửi thành công hiển thị tên và liên kết tải | Đăng nhập `member@test.com` | 1. Nhấn nút đính kèm<br>2. Chọn file `test.pdf`<br>3. Gửi | File: `test.pdf` | Tin nhắn hiển thị tên file `test.pdf`, kích thước file và liên kết để tải xuống | | | |
| TC_CHAT_FILE_03 | Ảnh gửi hiển thị dạng thumbnail trong chat | Đăng nhập `member@test.com` | 1. Nhấn nút đính kèm<br>2. Chọn file ảnh `image.png`<br>3. Gửi | File: `image.png` | Ảnh hiển thị dưới dạng thumbnail/preview trong khung chat; có thể click để xem full size | | | |

---

### VALIDATION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_CHAT_FILE_04 | Gửi file không có nội dung text — chỉ file | Đăng nhập `member@test.com` | 1. Nhấn nút đính kèm<br>2. Chọn file `test.txt`<br>3. Không nhập text<br>4. Gửi | File: `test.txt`; text: `""` | Hệ thống cho phép gửi chỉ với file (không cần kèm text); file hiển thị trong chat | | | |
| TC_CHAT_FILE_05 | Gửi file kèm nội dung text | Đăng nhập `member@test.com` | 1. Nhấn nút đính kèm<br>2. Chọn `test.pdf`<br>3. Nhập `"Đây là tài liệu quan trọng"`<br>4. Gửi | File: `test.pdf`; text: `"Đây là tài liệu quan trọng"` | Tin nhắn hiển thị cả nội dung text `"Đây là tài liệu quan trọng"` và thông tin file `test.pdf` trong cùng một tin nhắn | | | |

---

### FUNCTION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_CHAT_FILE_06 | Gửi file thành công — FR-CHAT-5.1 | Đăng nhập `member@test.com`; đang trong chat nhóm | 1. Nhấn nút đính kèm<br>2. Chọn file `document.pdf`<br>3. Nhấn "Gửi" | File: `document.pdf` | File được gửi; hiển thị liên kết tải/xem file trong khung chat ngay lập tức | | | |
| TC_CHAT_FILE_07 | Thành viên khác có thể tải file đã chia sẻ | `member@test.com` đã gửi file `shared.pdf` | 1. Đăng nhập `member2@test.com`<br>2. Mở chat nhóm<br>3. Nhấn vào liên kết tải `shared.pdf` | — | File `shared.pdf` được tải xuống thành công từ phía `member2@test.com` | | | |
| TC_CHAT_FILE_08 | Người không thuộc nhóm không thể tải file từ chat nhóm | `member@test.com` đã gửi file; URL file có thể được trích xuất | 1. Đăng nhập `outsider@test.com`<br>2. Cố truy cập URL tải file trực tiếp | — | Hệ thống từ chối; trả về thông báo không có quyền truy cập; file không được tải | | | |
| TC_CHAT_FILE_09 | File gửi hiển thị đúng cho tất cả thành viên đang online | `member@test.com` và `member2@test.com` đang online | 1. `member@test.com` gửi file `report.xlsx`<br>2. Quan sát màn hình `member2@test.com` | File: `report.xlsx` | File `report.xlsx` xuất hiện ngay lập tức trong khung chat của `member2@test.com` mà không cần reload | | | |

---

### BUSINESS FLOW

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_CHAT_FILE_10 | Luồng gửi file và thành viên khác tải thành công | `member@test.com` và `member2@test.com` trong nhóm | 1. `member@test.com` đính kèm và gửi `test_doc.pdf`<br>2. `member2@test.com` thấy file trong chat<br>3. `member2@test.com` nhấn tải xuống | File: `test_doc.pdf` | Toàn bộ luồng hoạt động: file gửi thành công → hiển thị trong chat → tải được bởi thành viên khác | | | |
| TC_CHAT_FILE_11 | Gửi nhiều file liên tiếp — lịch sử hiển thị đầy đủ | Đăng nhập `member@test.com` | 1. Gửi file `file1.png`<br>2. Gửi file `file2.pdf`<br>3. Gửi tin nhắn text `"Xong rồi"`<br>4. Cuộn lên xem lịch sử | `file1.png`, `file2.pdf`, text | Lịch sử hiển thị đúng thứ tự: `file1.png` → `file2.pdf` → `"Xong rồi"`; không bị mất file nào | | | |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
