# TC_CHECK_DELETE — FR-CHECK-4: Xóa Mục Checklist

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | FR-CHECK — Checklist |
| Feature | FR-CHECK-4 — Xóa mục checklist |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Ứng dụng đang chạy; `member@test.com` / `Abc@1234` là thành viên `Group Task Test`; tồn tại task `Task Check Test` có ít nhất 3 mục: `Mục Xóa 1` (chưa tích), `Mục Xóa 2` (đã tích/hoàn thành), `Mục Giữ Lại` (chưa tích); `viewer@test.com` / `Abc@1234` chỉ có quyền xem; **⚠️ Thêm lại mục sau mỗi lần test xóa thành công** |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 11    |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Tùy chọn xóa mục checklist tồn tại với người có quyền
- [ ] Có xác nhận trước khi xóa (hộp thoại hoặc cơ chế tương đương)
- [ ] Nhấn Hủy → mục không bị xóa
- [ ] Xóa mục chưa hoàn thành thành công → mục biến mất
- [ ] Xóa mục đã hoàn thành thành công → mục biến mất
- [ ] Xóa 1 mục không ảnh hưởng đến các mục khác
- [ ] Progress / tỉ lệ % cập nhật đúng sau khi xóa mục đã hoàn thành (nếu có)
- [ ] Người không có quyền → không thấy tùy chọn xóa
- [ ] Danh sách cập nhật ngay (không reload)
- [ ] ⚠️ Hành động không thể hoàn tác

---

## TEST CASES

### UI TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_CHECK_DELETE_01 | Tùy chọn xóa hiển thị với người có quyền | Đăng nhập `member@test.com`, mở `Task Check Test` | 1. Hover hoặc click vào từng mục checklist | — | Nút/icon xóa hiển thị cạnh mỗi mục; có thể click | | | |
| TC_CHECK_DELETE_02 | Tùy chọn xóa không hiển thị với người không có quyền | Đăng nhập `viewer@test.com` | 1. Mở `Task Check Test`<br>2. Hover/click vào các mục | — | Không có nút/tùy chọn xóa hiển thị | | | |
| TC_CHECK_DELETE_03 | Giao diện responsive | Danh sách checklist đang hiển thị | 1. Resize cửa sổ trình duyệt | — | Checklist không bị vỡ layout | | | |

---

### FUNCTION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_CHECK_DELETE_04 | Hủy xóa → mục không bị xóa | Đăng nhập `member@test.com` | 1. Nhấn xóa `Mục Xóa 1`<br>2. Nhấn Hủy trong hộp thoại xác nhận (nếu có) | — | `Mục Xóa 1` vẫn còn trong danh sách | | | |
| TC_CHECK_DELETE_05 | Xóa mục chưa hoàn thành thành công | Đăng nhập `member@test.com` | 1. Nhấn xóa `Mục Xóa 1`<br>2. Xác nhận | — | `Mục Xóa 1` biến mất khỏi danh sách ngay | | | ⚠️ Thêm lại sau test |
| TC_CHECK_DELETE_06 | Xóa mục đã hoàn thành thành công | `Mục Xóa 2` đang ở trạng thái đã tích | 1. Nhấn xóa `Mục Xóa 2`<br>2. Xác nhận | — | `Mục Xóa 2` biến mất khỏi danh sách; tổng mục giảm đúng | | | ⚠️ Thêm lại sau test |
| TC_CHECK_DELETE_07 | Xóa 1 mục không ảnh hưởng mục khác | Sau khi xóa `Mục Xóa 1` | 1. Kiểm tra danh sách còn lại | — | `Mục Xóa 2`, `Mục Giữ Lại` vẫn còn nguyên với đúng trạng thái của chúng | | | ⚠️ Thêm lại sau test |
| TC_CHECK_DELETE_08 | Danh sách cập nhật ngay (không reload) | Đang xem checklist | 1. Xóa `Mục Xóa 1`<br>2. Quan sát danh sách | — | Mục biến mất ngay, số lượng mục giảm 1 | | | ⚠️ Thêm lại sau test |

---

### BUSINESS FLOW

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_CHECK_DELETE_09 | Progress cập nhật đúng sau khi xóa mục đã hoàn thành | Task có 3 mục, `Mục Xóa 2` đã tích → progress = 1/3 | 1. Xóa `Mục Xóa 2`<br>2. Kiểm tra progress | — | Progress cập nhật đúng: 0/2 hoặc 0% (vì mục đã hoàn thành bị xóa) | | | ⚠️ Thêm lại sau test; N/A nếu không có progress |
| TC_CHECK_DELETE_10 | Thành viên khác không còn thấy mục đã xóa | Đã xóa `Mục Xóa 1` | 1. Đăng nhập tài khoản khác<br>2. Mở `Task Check Test` | — | `Mục Xóa 1` không xuất hiện trong danh sách của thành viên khác | | | ⚠️ Thêm lại sau test |
| TC_CHECK_DELETE_11 | Xóa mục persist sau reload | Đã xóa `Mục Xóa 1` | 1. Reload trang<br>2. Kiểm tra danh sách checklist | — | `Mục Xóa 1` vẫn không xuất hiện sau reload | | | ⚠️ Thêm lại sau test |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
