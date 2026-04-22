# TC_GROUP_DELETE — FR-GROUP-4: Xóa Nhóm

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | FR-GROUP — Quản lý nhóm & Workspace |
| Feature | FR-GROUP-4 — Xóa nhóm |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Ứng dụng đang chạy; tài khoản `owner@test.com` / `Abc@1234` là người tạo nhóm `Group Delete Test`; tài khoản `member@test.com` / `Abc@1234` là thành viên thường của cùng nhóm; **⚠️ Tái tạo lại nhóm sau mỗi lần test xóa thành công** |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 10    |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Tùy chọn "Xóa nhóm" tồn tại và chỉ hiển thị với người tạo nhóm
- [ ] Hộp thoại xác nhận xuất hiện trước khi xóa
- [ ] Hộp thoại có cảnh báo rõ ràng (hành động không thể hoàn tác)
- [ ] Nhấn Hủy trong hộp thoại → nhóm không bị xóa
- [ ] Nhấn Xác nhận → nhóm bị xóa, biến mất khỏi danh sách
- [ ] Thành viên không phải người tạo cố xóa → thông báo không có quyền
- [ ] Sau khi xóa → các thành viên khác không còn thấy nhóm
- [ ] ⚠️ Hành động xóa là không thể hoàn tác

---

## TEST CASES

### UI TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_GROUP_DELETE_01 | Nút xóa nhóm chỉ hiển thị với người tạo | Đăng nhập `owner@test.com` | 1. Vào nhóm `Group Delete Test`<br>2. Kiểm tra menu/cài đặt nhóm | — | Tùy chọn "Xóa nhóm" hiển thị với `owner@test.com` | | | |
| TC_GROUP_DELETE_02 | Hộp thoại xác nhận có cảnh báo | Đăng nhập `owner@test.com` | 1. Nhấn "Xóa nhóm"<br>2. Quan sát hộp thoại | — | Hộp thoại xuất hiện với nội dung cảnh báo rõ ràng về tính không thể hoàn tác | | | |

---

### FUNCTION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_GROUP_DELETE_03 | Hủy xóa → nhóm không bị xóa | Đăng nhập `owner@test.com`, hộp thoại đang mở | 1. Nhấn "Xóa nhóm"<br>2. Nhấn Hủy trong hộp thoại | — | Hộp thoại đóng, nhóm vẫn còn trong danh sách | | | |
| TC_GROUP_DELETE_04 | Xóa nhóm thành công | Đăng nhập `owner@test.com` | 1. Nhấn "Xóa nhóm"<br>2. Xác nhận xóa | — | Thông báo thành công, nhóm biến khỏi danh sách của `owner@test.com` | | | ⚠️ Tái tạo nhóm sau test |
| TC_GROUP_DELETE_05 | Thành viên thường không có quyền xóa | Đăng nhập `member@test.com` | 1. Vào nhóm `Group Delete Test`<br>2. Kiểm tra menu/cài đặt nhóm<br>3. Cố thực hiện xóa nhóm | — | Nút xóa nhóm không hiển thị hoặc hệ thống thông báo không có quyền | | | |

---

### BUSINESS FLOW

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_GROUP_DELETE_06 | Thành viên khác không còn thấy nhóm sau khi xóa | Đã xóa `Group Delete Test` | 1. Đăng nhập `member@test.com`<br>2. Kiểm tra danh sách nhóm | — | `Group Delete Test` không xuất hiện trong danh sách của `member@test.com` | | | ⚠️ Tái tạo nhóm sau test |
| TC_GROUP_DELETE_07 | Nhóm không khôi phục được sau xóa | Đã xóa `Group Delete Test` | 1. Đăng nhập `owner@test.com`<br>2. Tìm kiếm hoặc truy cập nhóm đã xóa | — | Nhóm không tồn tại, không có cách khôi phục từ phía người dùng | | | ⚠️ Tái tạo nhóm sau test |
| TC_GROUP_DELETE_08 | URL trực tiếp của nhóm đã xóa bị chặn | Đã xóa `Group Delete Test` | 1. Copy URL nhóm trước khi xóa<br>2. Sau khi xóa, truy cập URL đó | — | Hệ thống hiển thị lỗi (404 hoặc thông báo nhóm không tồn tại) | | | ⚠️ Tái tạo nhóm sau test |
| TC_GROUP_DELETE_09 | Admin thấy nhóm biến mất sau xóa | Đăng nhập `admin@test.com` | 1. Ghi nhớ danh sách nhóm<br>2. Xóa nhóm bằng `owner@test.com`<br>3. Đăng nhập lại `admin@test.com` kiểm tra | — | Nhóm đã xóa không còn hiển thị trong danh sách admin | | | ⚠️ Tái tạo nhóm sau test |
| TC_GROUP_DELETE_10 | Dữ liệu nhóm bị xóa khỏi DB | Đã xóa `Group Delete Test` | 1. Kiểm tra DB (nếu có quyền truy cập)<br>2. Tìm bản ghi nhóm | — | Bản ghi nhóm không còn tồn tại trong DB (hoặc được đánh dấu là đã xóa) | | | Cần DB access |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
