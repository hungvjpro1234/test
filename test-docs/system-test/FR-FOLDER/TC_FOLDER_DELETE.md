# TC_FOLDER_DELETE — FR-FOLDER-4: Xóa Thư Mục

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | FR-FOLDER — Quản lý thư mục |
| Feature | FR-FOLDER-4 — Xóa thư mục |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Ứng dụng đang chạy; tài khoản `member@test.com` / `Abc@1234` có quyền xóa thư mục trong nhóm `Group Folder Test`; tồn tại thư mục `Folder To Delete` (có chứa task bên trong) và `Empty Folder` (rỗng) trong nhóm; tài khoản `viewer@test.com` / `Abc@1234` không có quyền xóa; **⚠️ Tái tạo thư mục sau mỗi lần test xóa thành công** |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 11    |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Tùy chọn "Xóa thư mục" tồn tại với người có quyền
- [ ] Hộp thoại xác nhận xuất hiện trước khi xóa
- [ ] Hộp thoại có cảnh báo rõ ràng (các task bên trong cũng bị ảnh hưởng)
- [ ] Nhấn Hủy → thư mục không bị xóa
- [ ] Nhấn Xác nhận → thư mục biến mất khỏi danh sách
- [ ] Xóa thư mục có chứa task → xử lý đúng (xóa task theo hoặc thông báo)
- [ ] Người không có quyền xóa → không hiển thị tùy chọn hoặc thông báo lỗi
- [ ] ⚠️ Hành động xóa không thể hoàn tác từ phía người dùng

---

## TEST CASES

### UI TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_FOLDER_DELETE_01 | Nút xóa hiển thị với người có quyền | Đăng nhập `member@test.com` | 1. Vào `Group Folder Test`<br>2. Hover/right-click vào `Folder To Delete`<br>3. Kiểm tra menu | — | Tùy chọn "Xóa" hiển thị | | | |
| TC_FOLDER_DELETE_02 | Hộp thoại xác nhận có cảnh báo | Đăng nhập `member@test.com` | 1. Chọn xóa `Folder To Delete`<br>2. Quan sát hộp thoại | — | Hộp thoại xuất hiện với nội dung cảnh báo rõ ràng, có nút Hủy và Xác nhận | | | |

---

### FUNCTION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_FOLDER_DELETE_03 | Hủy xóa → thư mục không bị xóa | Hộp thoại xác nhận đang mở | 1. Chọn xóa `Folder To Delete`<br>2. Nhấn Hủy | — | Hộp thoại đóng; `Folder To Delete` vẫn còn trong danh sách | | | |
| TC_FOLDER_DELETE_04 | Xóa thư mục rỗng thành công | `Empty Folder` tồn tại | 1. Chọn xóa `Empty Folder`<br>2. Xác nhận | — | Thông báo thành công; `Empty Folder` biến khỏi danh sách | | | ⚠️ Tái tạo sau test |
| TC_FOLDER_DELETE_05 | Xóa thư mục có chứa task | `Folder To Delete` có task bên trong | 1. Chọn xóa `Folder To Delete`<br>2. Xác nhận | — | Thư mục bị xóa; hệ thống xử lý task theo đúng business rule (xóa theo hoặc chuyển về Uncategorized) | | | ⚠️ Tái tạo sau test; ghi nhận hành vi thực tế |
| TC_FOLDER_DELETE_06 | Người không có quyền xóa | Đăng nhập `viewer@test.com` | 1. Vào `Group Folder Test`<br>2. Cố tìm tùy chọn xóa thư mục | — | Tùy chọn xóa không hiển thị; hoặc nếu truy cập trực tiếp → thông báo không có quyền | | | |

---

### BUSINESS FLOW

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_FOLDER_DELETE_07 | Thư mục đã xóa không khôi phục được từ phía người dùng | Đã xóa `Empty Folder` | 1. Kiểm tra các tùy chọn khôi phục từ phía user | — | Không có tùy chọn Undo/Restore từ phía người dùng thường | | | ⚠️ Tái tạo sau test |
| TC_FOLDER_DELETE_08 | Thành viên khác không còn thấy thư mục đã xóa | Đã xóa `Empty Folder` | 1. Đăng nhập `viewer@test.com`<br>2. Kiểm tra danh sách thư mục | — | `Empty Folder` không còn hiển thị | | | ⚠️ Tái tạo sau test |
| TC_FOLDER_DELETE_09 | URL trực tiếp của thư mục đã xóa bị chặn | Đã xóa thư mục | 1. Copy URL thư mục trước khi xóa<br>2. Truy cập URL sau khi xóa | — | Hệ thống trả về 404 hoặc thông báo thư mục không tồn tại | | | ⚠️ Tái tạo sau test |
| TC_FOLDER_DELETE_10 | Task trong thư mục bị xóa được xử lý đúng | Đã xóa `Folder To Delete` có chứa task | 1. Kiểm tra các task đã có trong thư mục<br>2. Tìm task trong Uncategorized hoặc danh sách task chung | — | Task không bị mất hoặc được xóa theo đúng business rule đã định | | | ⚠️ Tái tạo sau test; cần xác nhận business rule |
| TC_FOLDER_DELETE_11 | Danh sách thư mục cập nhật ngay sau xóa (không reload) | Đăng nhập `member@test.com` | 1. Xóa `Empty Folder`<br>2. Quan sát danh sách ngay sau đó | — | Thư mục biến mất khỏi danh sách ngay, không cần reload | | | ⚠️ Tái tạo sau test |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
