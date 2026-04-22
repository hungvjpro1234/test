# TC_COMMENT_DELETE — FR-COMMENT-3: Xóa Bình Luận

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | FR-COMMENT — Bình luận công việc |
| Feature | FR-COMMENT-3 — Xóa bình luận |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Ứng dụng đang chạy; `commenter@test.com` / `Abc@1234` là thành viên `Group Task Test`; tồn tại task `Task Comment Test` có bình luận của `commenter@test.com` (nội dung: `Bình luận để xóa`) và bình luận của `other@test.com`; **⚠️ Thêm lại bình luận sau mỗi lần test xóa thành công** |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 10    |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Nút/tùy chọn xóa chỉ hiển thị trên bình luận của chính mình
- [ ] Có hộp thoại xác nhận trước khi xóa (hoặc Undo ngay sau)
- [ ] Nhấn Hủy → bình luận không bị xóa
- [ ] Xóa thành công → bình luận biến mất khỏi danh sách ngay
- [ ] Cố xóa bình luận của người khác → thông báo không có quyền
- [ ] Xóa bình luận không ảnh hưởng đến các bình luận khác
- [ ] ⚠️ Hành động không thể hoàn tác

---

## TEST CASES

### UI TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_COMMENT_DELETE_01 | Nút xóa chỉ hiển thị trên bình luận của mình | Đăng nhập `commenter@test.com`, mở `Task Comment Test` | 1. Quan sát bình luận của mình<br>2. Quan sát bình luận của `other@test.com` | — | Nút xóa hiển thị trên bình luận của `commenter@test.com`; không hiển thị trên bình luận của `other@test.com` | | | |
| TC_COMMENT_DELETE_02 | Hộp thoại xác nhận (hoặc cơ chế Undo) xuất hiện | Đăng nhập `commenter@test.com` | 1. Nhấn xóa bình luận của mình | — | Hộp thoại xác nhận xuất hiện trước khi xóa; hoặc hệ thống xóa ngay nhưng có nút Undo trong vài giây | | | |

---

### FUNCTION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_COMMENT_DELETE_03 | Hủy xóa → bình luận không bị xóa | Hộp thoại xác nhận đang mở | 1. Nhấn Hủy trong hộp thoại | — | Hộp thoại đóng; `Bình luận để xóa` vẫn còn trong danh sách | | | |
| TC_COMMENT_DELETE_04 | Xóa bình luận của mình thành công | Đăng nhập `commenter@test.com` | 1. Nhấn xóa `Bình luận để xóa`<br>2. Xác nhận | — | Thông báo thành công; bình luận biến mất khỏi danh sách ngay | | | ⚠️ Thêm lại sau test |
| TC_COMMENT_DELETE_05 | Xóa bình luận không ảnh hưởng đến bình luận khác | Sau khi xóa `Bình luận để xóa` | 1. Kiểm tra danh sách bình luận còn lại | — | Bình luận của `other@test.com` và các bình luận khác vẫn còn nguyên | | | ⚠️ Thêm lại sau test |
| TC_COMMENT_DELETE_06 | Cố xóa bình luận của người khác | Đăng nhập `commenter@test.com` | 1. Tìm bình luận của `other@test.com`<br>2. Cố tìm tùy chọn xóa | — | Nút xóa không hiển thị; hoặc nếu cố qua API → thông báo không có quyền | | | |
| TC_COMMENT_DELETE_07 | Danh sách cập nhật ngay sau xóa (không reload) | Đang xem danh sách bình luận | 1. Xóa bình luận<br>2. Quan sát danh sách | — | Bình luận biến mất ngay, số lượng bình luận giảm 1 | | | ⚠️ Thêm lại sau test |

---

### BUSINESS FLOW

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_COMMENT_DELETE_08 | Bình luận đã xóa không hiển thị sau reload | Đã xóa bình luận | 1. Reload trang<br>2. Kiểm tra danh sách bình luận | — | Bình luận đã xóa không xuất hiện lại sau reload | | | ⚠️ Thêm lại sau test |
| TC_COMMENT_DELETE_09 | Thành viên khác cũng không thấy bình luận đã xóa | Đã xóa bình luận | 1. Đăng nhập `other@test.com`<br>2. Mở `Task Comment Test` | — | Bình luận đã xóa không hiển thị với bất kỳ thành viên nào | | | ⚠️ Thêm lại sau test |
| TC_COMMENT_DELETE_10 | Bình luận đã xóa không thể khôi phục từ phía người dùng | Đã xóa bình luận | 1. Kiểm tra các tùy chọn khôi phục | — | Không có tùy chọn Restore/Undo từ phía người dùng thường | | | ⚠️ Thêm lại sau test |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
