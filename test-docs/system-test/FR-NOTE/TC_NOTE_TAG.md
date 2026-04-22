# TC_NOTE_TAG — FR-NOTE-8: Xóa Nhãn Khỏi Ghi Chú

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | FR-NOTE — Ghi chú cá nhân |
| Feature | FR-NOTE-8.1 — Xóa một nhãn ra khỏi ghi chú |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Ứng dụng đang chạy; đăng nhập `user@test.com` / `Abc@1234`; tài khoản có ghi chú gắn ít nhất 2 nhãn: `"Công việc"` và `"Học tập"` |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 8     |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Danh sách nhãn hiển thị đầy đủ trên ghi chú
- [ ] Nút xóa nhãn (icon "×" hoặc tương đương) hiển thị trên mỗi nhãn
- [ ] Xóa một nhãn → nhãn đó biến mất khỏi ghi chú — FR-NOTE-8.1
- [ ] Xóa nhãn A không ảnh hưởng nhãn B trên cùng ghi chú
- [ ] Xóa tất cả nhãn → danh sách nhãn của ghi chú trống (không báo lỗi)
- [ ] Thay đổi được lưu vào DB; reload không khôi phục nhãn đã xóa
- [ ] Chỉ chủ sở hữu mới xóa được nhãn trên ghi chú của mình — C-5

---

## TEST CASES

### UI TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_NOTE_TAG_01 | Danh sách nhãn hiển thị đầy đủ trên ghi chú | Đăng nhập `user@test.com`; mở chi tiết ghi chú có nhãn `"Công việc"` và `"Học tập"` | 1. Quan sát phần nhãn trong chi tiết ghi chú | — | Cả 2 nhãn `"Công việc"` và `"Học tập"` hiển thị rõ ràng | | | |
| TC_NOTE_TAG_02 | Nút xóa nhãn hiển thị trên từng nhãn | Đăng nhập `user@test.com`; mở chi tiết ghi chú có nhãn | 1. Hover hoặc nhìn vào khu vực nhãn | — | Mỗi nhãn có icon "×" hoặc nút xóa hiển thị | | | |

---

### FUNCTION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_NOTE_TAG_03 | Xóa một nhãn khỏi ghi chú — FR-NOTE-8.1 | Đăng nhập `user@test.com`; ghi chú có nhãn `"Công việc"` và `"Học tập"` | 1. Nhấn "×" trên nhãn `"Công việc"` | — | Nhãn `"Công việc"` biến mất khỏi ghi chú; danh sách nhãn chỉ còn `"Học tập"` | | | |
| TC_NOTE_TAG_04 | Xóa nhãn A không ảnh hưởng nhãn B | Đăng nhập `user@test.com`; ghi chú có nhãn `"Công việc"` và `"Học tập"` | 1. Xóa nhãn `"Công việc"`<br>2. Kiểm tra nhãn `"Học tập"` | — | Nhãn `"Học tập"` vẫn còn trên ghi chú; không bị ảnh hưởng | | | |
| TC_NOTE_TAG_05 | Xóa tất cả nhãn — danh sách nhãn trống, không báo lỗi | Đăng nhập `user@test.com`; ghi chú chỉ còn 1 nhãn `"Học tập"` | 1. Xóa nhãn `"Học tập"` | — | Danh sách nhãn trống; ghi chú vẫn hiển thị bình thường, không có lỗi | | | |
| TC_NOTE_TAG_06 | Cố xóa nhãn trên ghi chú của người khác qua API — C-5 | Đăng nhập `user@test.com`; `user2@test.com` có ghi chú `id=202` với nhãn `"Quan trọng"` | 1. Gửi request API xóa nhãn `"Quan trọng"` khỏi ghi chú `id=202` với tài khoản `user@test.com` | — | Hệ thống trả về thông báo không có quyền; nhãn `"Quan trọng"` vẫn còn trên ghi chú `id=202` | | | |

---

### BUSINESS FLOW

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_NOTE_TAG_07 | Xóa nhãn được lưu vào DB — reload không khôi phục nhãn | Đăng nhập `user@test.com`; vừa xóa nhãn `"Công việc"` khỏi ghi chú | 1. Tải lại trang (F5)<br>2. Mở chi tiết ghi chú | — | Nhãn `"Công việc"` không xuất hiện lại sau khi reload | | | |
| TC_NOTE_TAG_08 | Luồng xóa nhãn và kiểm tra danh sách nhãn tổng | Đăng nhập `user@test.com`; ghi chú có 2 nhãn; cần kiểm tra nhãn tổng của hệ thống (nếu có) | 1. Xóa nhãn `"Công việc"` khỏi ghi chú<br>2. Kiểm tra danh sách nhãn trên ghi chú | — | Chỉ nhãn `"Công việc"` bị gỡ ra khỏi ghi chú này; nếu hệ thống có kho nhãn chung thì nhãn `"Công việc"` vẫn tồn tại trong kho | | | |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
