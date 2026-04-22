# TC_GROUP_MEMBERS — FR-GROUP-5: Quản Lý Thành Viên Nhóm

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | FR-GROUP — Quản lý nhóm & Workspace |
| Feature | FR-GROUP-5 — Quản lý thành viên nhóm |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Ứng dụng đang chạy; tài khoản `admin_group@test.com` / `Abc@1234` là Admin của nhóm `Group Members Test`; tài khoản `member@test.com` / `Abc@1234` là thành viên của nhóm; tài khoản `newuser@test.com` / `Abc@1234` là người dùng hợp lệ **chưa** ở trong nhóm; nhóm `Public Group Test` là nhóm công khai |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 22    |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Admin có thể thêm thành viên vào nhóm
- [ ] Thêm thành viên thành công → người được thêm nhận thông báo
- [ ] Thêm thành viên vượt giới hạn tối đa → thông báo lỗi
- [ ] Admin có thể xóa thành viên khỏi nhóm
- [ ] Thành viên bị xóa không còn thấy nội dung nhóm
- [ ] Admin có thể thay đổi vai trò thành viên (PM, QA, Developer…)
- [ ] Thay đổi vai trò → người được đổi nhận thông báo
- [ ] Thành viên có thể gửi lời mời cho người dùng khác
- [ ] Người được mời nhận thông báo lời mời
- [ ] Thành viên có thể rời nhóm
- [ ] Sau khi rời → không còn thấy nội dung nhóm
- [ ] Người dùng có thể tham gia nhóm công khai
- [ ] Tham gia nhóm công khai → được thêm vào danh sách thành viên

---

## TEST CASES

### UI TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_GROUP_MEMBERS_01 | Màn hình quản lý thành viên hiển thị đúng | Đăng nhập `admin_group@test.com` | 1. Vào nhóm `Group Members Test`<br>2. Mở trang quản lý thành viên | — | Danh sách thành viên hiển thị tên, vai trò, avatar; có nút thêm/xóa thành viên | | | |
| TC_GROUP_MEMBERS_02 | Giao diện responsive | Trang quản lý thành viên đang mở | 1. Resize cửa sổ trình duyệt | — | Layout không bị vỡ | | | |

---

### FUNCTION TEST — Thêm thành viên

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_GROUP_MEMBERS_03 | Thêm thành viên thành công | Đăng nhập `admin_group@test.com` | 1. Mở quản lý thành viên<br>2. Tìm `newuser@test.com`<br>3. Nhấn Thêm | Email: `newuser@test.com` | `newuser@test.com` xuất hiện trong danh sách thành viên; `newuser@test.com` nhận thông báo | | | |
| TC_GROUP_MEMBERS_04 | Thêm thành viên đã có trong nhóm | Đăng nhập `admin_group@test.com` | 1. Cố thêm `member@test.com` vào nhóm | Email: `member@test.com` | Hệ thống thông báo người dùng đã là thành viên, không thêm trùng | | | |
| TC_GROUP_MEMBERS_05 | Thêm thành viên vượt giới hạn | Nhóm đã đạt số thành viên tối đa | 1. Cố thêm 1 thành viên nữa | — | Hệ thống hiển thị thông báo đã đạt giới hạn tối đa, không thêm được | | | Cần setup nhóm đầy |

---

### FUNCTION TEST — Xóa thành viên

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_GROUP_MEMBERS_06 | Xóa thành viên thành công | Đăng nhập `admin_group@test.com`, `newuser@test.com` là thành viên | 1. Mở quản lý thành viên<br>2. Chọn `newuser@test.com`<br>3. Nhấn Xóa khỏi nhóm | — | `newuser@test.com` bị xóa khỏi danh sách thành viên | | | |
| TC_GROUP_MEMBERS_07 | Thành viên bị xóa không thấy nội dung nhóm | Đã xóa `newuser@test.com` khỏi nhóm | 1. Đăng nhập `newuser@test.com`<br>2. Kiểm tra danh sách nhóm và nội dung nhóm | — | `Group Members Test` không hiển thị; URL trực tiếp của nhóm bị chặn | | | |

---

### FUNCTION TEST — Thay đổi vai trò

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_GROUP_MEMBERS_08 | Thay đổi vai trò thành công | Đăng nhập `admin_group@test.com`, `member@test.com` là thành viên | 1. Mở quản lý thành viên<br>2. Chọn `member@test.com`<br>3. Đổi vai trò sang PM<br>4. Lưu | Vai trò mới: PM | Vai trò được cập nhật, `member@test.com` nhận thông báo; hiển thị vai trò mới trong danh sách | | | |
| TC_GROUP_MEMBERS_09 | Vai trò hiển thị đúng sau thay đổi | Đã đổi vai trò `member@test.com` thành PM | 1. Đăng nhập `member@test.com`<br>2. Kiểm tra vai trò hiển thị trong nhóm | — | Hiển thị vai trò PM đúng | | | |

---

### FUNCTION TEST — Mời thành viên

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_GROUP_MEMBERS_10 | Gửi lời mời thành công | Đăng nhập `member@test.com` | 1. Vào nhóm `Group Members Test`<br>2. Chọn chức năng mời người<br>3. Mời `newuser@test.com` | Email: `newuser@test.com` | Lời mời được gửi; `newuser@test.com` nhận thông báo lời mời | | | |
| TC_GROUP_MEMBERS_11 | Mời người dùng không tồn tại | Đăng nhập `member@test.com` | 1. Nhập email không tồn tại vào ô mời | Email: `nonexistent_xyz@test.com` | Hệ thống thông báo lỗi người dùng không tồn tại | | | |

---

### FUNCTION TEST — Rời nhóm

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_GROUP_MEMBERS_12 | Thành viên rời nhóm thành công | Đăng nhập `member@test.com` | 1. Vào nhóm `Group Members Test`<br>2. Nhấn "Rời nhóm"<br>3. Xác nhận | — | Thông báo thành công; `Group Members Test` không còn trong danh sách nhóm của `member@test.com` | | | ⚠️ Thêm lại `member@test.com` sau test |
| TC_GROUP_MEMBERS_13 | Sau khi rời không thấy nội dung nhóm | Đã rời nhóm | 1. Kiểm tra danh sách nhóm<br>2. Thử truy cập URL nhóm | — | Nhóm biến mất khỏi danh sách; URL nhóm bị chặn | | | ⚠️ Thêm lại `member@test.com` sau test |

---

### FUNCTION TEST — Tham gia nhóm công khai

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_GROUP_MEMBERS_14 | Tham gia nhóm công khai thành công | Đăng nhập `newuser@test.com`, chưa ở trong `Public Group Test` | 1. Tìm nhóm `Public Group Test`<br>2. Nhấn "Tham gia nhóm" | — | `newuser@test.com` được thêm vào danh sách thành viên; nhóm xuất hiện trong danh sách nhóm của người dùng | | | |
| TC_GROUP_MEMBERS_15 | Tham gia nhóm công khai → thấy nội dung | Đã tham gia `Public Group Test` | 1. Vào nhóm `Public Group Test`<br>2. Kiểm tra nội dung | — | Nội dung nhóm (task, chat...) hiển thị đầy đủ | | | |

---

### BUSINESS FLOW

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_GROUP_MEMBERS_16 | Thông báo khi được thêm vào nhóm | `newuser@test.com` chưa ở trong nhóm | 1. Admin thêm `newuser@test.com`<br>2. Đăng nhập `newuser@test.com`<br>3. Kiểm tra thông báo | — | `newuser@test.com` nhận thông báo "Bạn đã được thêm vào nhóm..." | | | |
| TC_GROUP_MEMBERS_17 | Thông báo khi vai trò thay đổi | `member@test.com` là thành viên | 1. Admin đổi vai trò `member@test.com`<br>2. Đăng nhập `member@test.com`<br>3. Kiểm tra thông báo | — | `member@test.com` nhận thông báo về thay đổi vai trò | | | |
| TC_GROUP_MEMBERS_18 | Thành viên mới thấy danh sách thành viên | Đã thêm `newuser@test.com` | 1. Đăng nhập `newuser@test.com`<br>2. Vào nhóm → xem danh sách thành viên | — | Thấy toàn bộ danh sách thành viên nhóm | | | |
| TC_GROUP_MEMBERS_19 | Danh sách thành viên cập nhật ngay sau thêm/xóa | Admin đang xem danh sách | 1. Thêm `newuser@test.com`<br>2. Quan sát danh sách (không reload) | — | Danh sách cập nhật ngay mà không cần reload | | | |
| TC_GROUP_MEMBERS_20 | Thành viên bị xóa nhận thông báo | `newuser@test.com` là thành viên | 1. Admin xóa `newuser@test.com`<br>2. Đăng nhập `newuser@test.com`<br>3. Kiểm tra thông báo | — | `newuser@test.com` nhận thông báo bị xóa khỏi nhóm | | | |
| TC_GROUP_MEMBERS_21 | Owner không thể tự rời nhóm (nếu áp dụng) | Đăng nhập `admin_group@test.com` | 1. Cố nhấn "Rời nhóm" | — | Hệ thống ngăn Owner rời nhóm nếu không có thành viên khác đảm nhận; hoặc yêu cầu chuyển quyền trước | | | Tùy business rule |
| TC_GROUP_MEMBERS_22 | Thành viên đã rời không thể mời người khác vào nhóm cũ | Đã rời `Group Members Test` | 1. Cố truy cập chức năng mời vào `Group Members Test` | — | Không có quyền mời; hệ thống thông báo lỗi hoặc không hiển thị tùy chọn | | | |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
