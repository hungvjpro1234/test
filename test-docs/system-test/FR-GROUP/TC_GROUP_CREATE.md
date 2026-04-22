# TC_GROUP_CREATE — FR-GROUP-1: Tạo Nhóm

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | FR-GROUP — Quản lý nhóm & Workspace |
| Feature | FR-GROUP-1 — Tạo nhóm |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Ứng dụng đang chạy, đã đăng nhập với tài khoản `creator@test.com` / `Abc@1234` |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 14    |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Form tạo nhóm hiển thị đầy đủ các trường: Tên nhóm, Mô tả
- [ ] Trường Tên nhóm là bắt buộc, có placeholder rõ ràng
- [ ] Nút "Tạo" tồn tại và có thể click
- [ ] Tạo nhóm thành công → nhóm xuất hiện trong danh sách
- [ ] Tạo nhóm thành công → người tạo tự động là thành viên của nhóm
- [ ] Tạo nhóm thành công → hiển thị thông báo thành công
- [ ] Tên nhóm bỏ trống → hiển thị lỗi, không tạo được
- [ ] Tên nhóm = 256 ký tự → tạo thành công (boundary)
- [ ] Tên nhóm = 257 ký tự → hiển thị lỗi, không tạo được
- [ ] Mô tả = 2000 ký tự → tạo thành công (boundary)
- [ ] Mô tả = 2001 ký tự → hiển thị lỗi, không tạo được
- [ ] Giao diện responsive khi resize

---

## TEST CASES

### UI TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_GROUP_CREATE_01 | Form tạo nhóm hiển thị đúng | Đã đăng nhập | 1. Vào màn hình nhóm<br>2. Nhấn nút "Tạo nhóm" | — | Form hiển thị đầy đủ trường Tên nhóm, Mô tả; nút Tạo nhóm rõ ràng | | | |
| TC_GROUP_CREATE_02 | Trường Tên nhóm bắt buộc | Form đang mở | 1. Quan sát trường Tên nhóm | — | Trường có dấu * hoặc placeholder chỉ rõ bắt buộc | | | |
| TC_GROUP_CREATE_03 | Giao diện responsive | Form đang mở | 1. Mở form tạo nhóm<br>2. Resize cửa sổ trình duyệt nhiều kích thước | — | Form không bị vỡ layout ở mọi kích thước | | | |

---

### VALIDATION

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_GROUP_CREATE_04 | Tên nhóm bỏ trống | Form đang mở | 1. Để trống Tên nhóm<br>2. Nhấn "Tạo" | Tên nhóm: _(trống)_ | Hiển thị thông báo lỗi, nhóm không được tạo | | | |
| TC_GROUP_CREATE_05 | Tên nhóm chỉ có khoảng trắng | Form đang mở | 1. Nhập khoảng trắng vào Tên nhóm<br>2. Nhấn "Tạo" | Tên nhóm: `   ` | Hiển thị thông báo lỗi, nhóm không được tạo | | | |
| TC_GROUP_CREATE_06 | Tên nhóm đúng 256 ký tự | Form đang mở | 1. Nhập tên nhóm đúng 256 ký tự<br>2. Nhấn "Tạo" | Tên nhóm: chuỗi 256 ký tự `A*256` | Tạo nhóm thành công | | | Boundary value |
| TC_GROUP_CREATE_07 | Tên nhóm 257 ký tự | Form đang mở | 1. Nhập tên nhóm 257 ký tự<br>2. Nhấn "Tạo" | Tên nhóm: chuỗi 257 ký tự `A*257` | Hiển thị thông báo lỗi, nhóm không được tạo | | | Boundary value |
| TC_GROUP_CREATE_08 | Mô tả đúng 2000 ký tự | Form đang mở | 1. Nhập mô tả đúng 2000 ký tự<br>2. Nhập tên nhóm hợp lệ<br>3. Nhấn "Tạo" | Mô tả: chuỗi 2000 ký tự | Tạo nhóm thành công | | | Boundary value |
| TC_GROUP_CREATE_09 | Mô tả 2001 ký tự | Form đang mở | 1. Nhập mô tả 2001 ký tự<br>2. Nhập tên nhóm hợp lệ<br>3. Nhấn "Tạo" | Mô tả: chuỗi 2001 ký tự | Hiển thị thông báo lỗi, nhóm không được tạo | | | Boundary value |

---

### FUNCTION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_GROUP_CREATE_10 | Tạo nhóm thành công (chỉ nhập tên) | Đã đăng nhập | 1. Mở form tạo nhóm<br>2. Nhập tên nhóm<br>3. Để trống mô tả<br>4. Nhấn "Tạo" | Tên: `Test Group Alpha` | Nhóm được tạo, hiện thị thành công trong danh sách | | | |
| TC_GROUP_CREATE_11 | Tạo nhóm thành công (đầy đủ thông tin) | Đã đăng nhập | 1. Mở form tạo nhóm<br>2. Nhập tên và mô tả<br>3. Nhấn "Tạo" | Tên: `Test Group Beta`<br>Mô tả: `Mô tả nhóm` | Nhóm được tạo với đầy đủ thông tin, hiển thị trong danh sách | | | |
| TC_GROUP_CREATE_12 | Tên nhóm có ký tự đặc biệt | Đã đăng nhập | 1. Nhập tên nhóm có ký tự đặc biệt<br>2. Nhấn "Tạo" | Tên: `Nhóm #1 & Dev!` | Tạo nhóm thành công, tên hiển thị đúng | | | |

---

### BUSINESS FLOW

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_GROUP_CREATE_13 | Người tạo tự động thành thành viên | Đã tạo nhóm thành công | 1. Vào nhóm vừa tạo<br>2. Kiểm tra danh sách thành viên | — | `creator@test.com` xuất hiện trong danh sách thành viên với vai trò Owner/Admin | | | |
| TC_GROUP_CREATE_14 | Nhóm mới hiển thị trong danh sách ngay | Đã đăng nhập | 1. Tạo nhóm mới thành công<br>2. Quan sát danh sách nhóm (không reload) | Tên: `Test Group Gamma` | Nhóm mới xuất hiện ngay trong danh sách, không cần reload trang | | | |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
