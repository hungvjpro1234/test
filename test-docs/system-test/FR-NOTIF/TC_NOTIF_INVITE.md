# TC_NOTIF_INVITE — FR-NOTIF-6: Phản Hồi Lời Mời Nhóm

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | FR-NOTIF — Thông báo |
| Feature | FR-NOTIF-6.1 — Chấp nhận lời mời vào nhóm; FR-NOTIF-6.2 — Từ chối lời mời vào nhóm |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Ứng dụng đang chạy; đăng nhập `user@test.com` / `Abc@1234` (người nhận lời mời); `admin@test.com` / `Abc@1234` (quản trị viên nhóm); nhóm `Team Gamma` tồn tại; `user@test.com` chưa là thành viên `Team Gamma`; `admin@test.com` đã gửi lời mời vào nhóm `Team Gamma` tới `user@test.com` |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 10    |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Thông báo lời mời hiển thị tên nhóm và nút "Chấp nhận" / "Từ chối"
- [ ] Chấp nhận lời mời → người dùng được thêm vào nhóm
- [ ] Chấp nhận lời mời → trạng thái thông báo cập nhật thành "Đã chấp nhận"
- [ ] Từ chối lời mời → người dùng không được thêm vào nhóm
- [ ] Từ chối lời mời → trạng thái thông báo cập nhật thành "Đã từ chối"
- [ ] Không thể chấp nhận/từ chối lời mời đã hết hạn hoặc đã phản hồi
- [ ] Nhóm hiển thị đúng thành viên sau khi lời mời được chấp nhận

---

## TEST CASES

### UI TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_NOTIF_INVITE_01 | Thông báo lời mời hiển thị tên nhóm và tùy chọn | Đăng nhập `user@test.com`; có thông báo lời mời từ `Team Gamma` | 1. Mở bảng thông báo<br>2. Tìm thông báo lời mời | — | Thông báo hiển thị tên nhóm `"Team Gamma"`, tên người mời và hai nút "Chấp nhận" / "Từ chối" rõ ràng | | | |
| TC_NOTIF_INVITE_02 | Sau khi phản hồi, nút chấp nhận/từ chối bị vô hiệu hóa hoặc ẩn | `user@test.com` đã nhấn "Chấp nhận" | 1. Kiểm tra thông báo lời mời sau khi đã chấp nhận | — | Nút "Chấp nhận" và "Từ chối" không còn hoạt động hoặc biến mất; trạng thái thông báo hiển thị "Đã chấp nhận" | | | |

---

### FUNCTION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_NOTIF_INVITE_03 | Chấp nhận lời mời — được thêm vào nhóm — FR-NOTIF-6.1 | `user@test.com` chưa là thành viên `Team Gamma`; có thông báo lời mời | 1. Mở bảng thông báo<br>2. Nhấn "Chấp nhận" trên thông báo lời mời `Team Gamma` | — | `user@test.com` được thêm vào nhóm `Team Gamma`; nhóm xuất hiện trong danh sách nhóm của người dùng | | | |
| TC_NOTIF_INVITE_04 | Trạng thái thông báo cập nhật "Đã chấp nhận" sau khi chấp nhận — FR-NOTIF-6.1 | `user@test.com` vừa nhấn "Chấp nhận" | 1. Quan sát thông báo lời mời trong bảng thông báo | — | Thông báo cập nhật trạng thái thành "Đã chấp nhận" (hoặc tương đương); không còn nút hành động | | | |
| TC_NOTIF_INVITE_05 | Từ chối lời mời — không được thêm vào nhóm — FR-NOTIF-6.2 | `user@test.com` chưa là thành viên `Team Gamma`; có thông báo lời mời | 1. Mở bảng thông báo<br>2. Nhấn "Từ chối" trên thông báo lời mời `Team Gamma` | — | `user@test.com` không được thêm vào nhóm `Team Gamma`; nhóm `Team Gamma` không xuất hiện trong danh sách nhóm | | | |
| TC_NOTIF_INVITE_06 | Trạng thái thông báo cập nhật "Đã từ chối" sau khi từ chối — FR-NOTIF-6.2 | `user@test.com` vừa nhấn "Từ chối" | 1. Quan sát thông báo lời mời trong bảng thông báo | — | Thông báo cập nhật trạng thái thành "Đã từ chối" (hoặc tương đương); không còn nút hành động | | | |

---

### DATABASE TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_NOTIF_INVITE_07 | Nhóm có đúng thành viên sau khi chấp nhận lời mời | `user@test.com` vừa chấp nhận lời mời `Team Gamma` | 1. Đăng nhập `admin@test.com`<br>2. Mở danh sách thành viên nhóm `Team Gamma` | — | `user@test.com` xuất hiện trong danh sách thành viên nhóm `Team Gamma` với vai trò mặc định | | | |
| TC_NOTIF_INVITE_08 | Nhóm không thay đổi thành viên sau khi từ chối | `user@test.com` vừa từ chối lời mời `Team Gamma` | 1. Đăng nhập `admin@test.com`<br>2. Mở danh sách thành viên nhóm `Team Gamma` | — | `user@test.com` không có trong danh sách thành viên `Team Gamma` | | | |

---

### BUSINESS FLOW

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_NOTIF_INVITE_09 | Luồng hoàn chỉnh: mời → chấp nhận → vào nhóm thành công | `admin@test.com` gửi lời mời `user@test.com` vào `Team Gamma` | 1. `admin@test.com` gửi lời mời<br>2. `user@test.com` mở thông báo<br>3. Nhấn "Chấp nhận"<br>4. Vào danh sách nhóm | — | `user@test.com` nhận thông báo → chấp nhận → nhóm `Team Gamma` xuất hiện trong danh sách nhóm của họ → có thể xem nội dung nhóm | | | |
| TC_NOTIF_INVITE_10 | Luồng hoàn chỉnh: mời → từ chối → không vào nhóm | `admin@test.com` gửi lời mời `user@test.com` vào `Team Gamma` | 1. `admin@test.com` gửi lời mời<br>2. `user@test.com` mở thông báo<br>3. Nhấn "Từ chối"<br>4. Kiểm tra danh sách nhóm | — | `user@test.com` từ chối → nhóm `Team Gamma` không xuất hiện trong danh sách nhóm → không thể xem nội dung nhóm | | | |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
