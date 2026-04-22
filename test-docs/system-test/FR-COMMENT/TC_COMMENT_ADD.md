# TC_COMMENT_ADD — FR-COMMENT-1: Thêm Bình Luận

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | FR-COMMENT — Bình luận công việc |
| Feature | FR-COMMENT-1 — Thêm bình luận |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Ứng dụng đang chạy; `commenter@test.com` / `Abc@1234` là thành viên `Group Task Test`; tồn tại task `Task Comment Test` trong nhóm; `mention_target@test.com` là thành viên nhóm; để test giới hạn 200 bình luận cần task riêng `Task Full Comments` đã có đúng 200 bình luận |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 15    |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Ô nhập bình luận hiển thị trong chi tiết task
- [ ] Nút Gửi tồn tại và có thể click
- [ ] Bình luận hợp lệ → xuất hiện ngay trong danh sách, không cần reload
- [ ] Bình luận hiển thị đúng: nội dung, tên tác giả, thời gian
- [ ] Bình luận trống → thông báo lỗi, không gửi
- [ ] Bình luận chỉ khoảng trắng → thông báo lỗi, không gửi
- [ ] Bình luận = 2000 ký tự → gửi thành công (boundary)
- [ ] Bình luận = 2001 ký tự → thông báo lỗi (boundary)
- [ ] Task đã có 200 bình luận → thêm nữa bị chặn
- [ ] Dùng "@" mention thành viên → người được mention nhận thông báo
- [ ] Giao diện responsive

---

## TEST CASES

### UI TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_COMMENT_ADD_01 | Ô nhập bình luận và nút Gửi hiển thị đúng | Đăng nhập `commenter@test.com`, mở `Task Comment Test` | 1. Cuộn xuống phần bình luận | — | Ô nhập bình luận hiển thị rõ; nút Gửi (hoặc phím Enter) hoạt động được | | | |
| TC_COMMENT_ADD_02 | Bình luận hiển thị đúng thông tin tác giả và thời gian | Vừa gửi bình luận thành công | 1. Quan sát bình luận vừa gửi | — | Hiển thị đúng: nội dung bình luận, tên/avatar `commenter@test.com`, thời gian gửi | | | |
| TC_COMMENT_ADD_03 | Giao diện responsive | Trang chi tiết task đang mở | 1. Resize cửa sổ trình duyệt | — | Phần bình luận không bị vỡ layout | | | |

---

### VALIDATION

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_COMMENT_ADD_04 | Bình luận trống | Ô nhập đang trống | 1. Không nhập gì<br>2. Nhấn Gửi | Nội dung: _(trống)_ | Hiển thị thông báo lỗi; bình luận không được gửi | | | |
| TC_COMMENT_ADD_05 | Bình luận chỉ khoảng trắng | — | 1. Nhập toàn bộ khoảng trắng<br>2. Nhấn Gửi | Nội dung: `     ` | Hiển thị thông báo lỗi; bình luận không được gửi | | | |
| TC_COMMENT_ADD_06 | Bình luận đúng 2000 ký tự | — | 1. Nhập bình luận đúng 2000 ký tự<br>2. Nhấn Gửi | Nội dung: chuỗi 2000 ký tự | Bình luận gửi thành công | | | Boundary value |
| TC_COMMENT_ADD_07 | Bình luận 2001 ký tự | — | 1. Nhập bình luận 2001 ký tự<br>2. Nhấn Gửi | Nội dung: chuỗi 2001 ký tự | Hiển thị thông báo lỗi; bình luận không được gửi | | | Boundary value |
| TC_COMMENT_ADD_08 | Task đã đạt 200 bình luận | Mở `Task Full Comments` (đã có 200 bình luận) | 1. Nhập bình luận hợp lệ<br>2. Nhấn Gửi | Nội dung: `Bình luận thứ 201` | Hiển thị thông báo đã đạt giới hạn; bình luận không được gửi | | | Cần setup task có sẵn 200 bình luận |

---

### FUNCTION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_COMMENT_ADD_09 | Gửi bình luận văn bản thông thường | Đăng nhập `commenter@test.com` | 1. Nhập bình luận<br>2. Nhấn Gửi | Nội dung: `Đây là bình luận kiểm thử` | Bình luận xuất hiện ngay trong danh sách; nội dung đúng | | | |
| TC_COMMENT_ADD_10 | Bình luận có ký tự đặc biệt và tiếng Việt | — | 1. Nhập bình luận có ký tự đặc biệt và tiếng Việt<br>2. Nhấn Gửi | Nội dung: `Kiểm thử #1: "OK" & <done>!` | Bình luận gửi thành công; nội dung hiển thị đúng, không bị encode sai | | | |
| TC_COMMENT_ADD_11 | Mention thành viên bằng "@" | — | 1. Nhập `@` rồi tên `mention_target@test.com`<br>2. Gửi bình luận | Nội dung: `@mention_target xem lại nhé!` | Bình luận gửi thành công; `mention_target@test.com` được highlight trong bình luận | | | |
| TC_COMMENT_ADD_12 | Gợi ý thành viên khi gõ "@" | — | 1. Nhập `@` vào ô bình luận<br>2. Gõ thêm vài ký tự tên | Nhập: `@mem` | Dropdown gợi ý hiển thị danh sách thành viên khớp với từ khóa | | | |

---

### BUSINESS FLOW

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_COMMENT_ADD_13 | Bình luận xuất hiện ngay không cần reload | Đang mở chi tiết task | 1. Gửi bình luận<br>2. Quan sát danh sách ngay sau khi gửi | Nội dung: `Real-time test` | Bình luận xuất hiện ngay trong danh sách | | | |
| TC_COMMENT_ADD_14 | Người được mention nhận thông báo | Vừa gửi bình luận có `@mention_target` | 1. Đăng nhập `mention_target@test.com`<br>2. Kiểm tra thông báo | — | `mention_target@test.com` nhận thông báo về bình luận đề cập đến họ | | | |
| TC_COMMENT_ADD_15 | Thành viên khác thấy bình luận mới | Vừa gửi bình luận | 1. Đăng nhập tài khoản thành viên khác<br>2. Mở `Task Comment Test` | — | Bình luận của `commenter@test.com` hiển thị đúng với thành viên khác | | | |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
