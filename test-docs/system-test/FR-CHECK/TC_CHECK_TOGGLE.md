# TC_CHECK_TOGGLE — FR-CHECK-3: Đánh Dấu Hoàn Thành / Bỏ Đánh Dấu

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | FR-CHECK — Checklist |
| Feature | FR-CHECK-3 — Đánh dấu hoàn thành & Bỏ đánh dấu hoàn thành |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Ứng dụng đang chạy; `member@test.com` / `Abc@1234` là thành viên `Group Task Test`; tồn tại task `Task Check Test` có ít nhất 3 mục checklist: `Mục 1`, `Mục 2`, `Mục 3` — tất cả đều chưa tích; tài khoản thứ hai `other@test.com` / `Abc@1234` cũng là thành viên nhóm |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 14    |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Checkbox của mỗi mục checklist có thể click
- [ ] Tick vào mục → trạng thái chuyển thành hoàn thành, ghi nhận người thực hiện và thời điểm
- [ ] Mục hoàn thành có dấu hiệu trực quan rõ ràng (gạch ngang, màu khác, icon ✓...)
- [ ] Bỏ tick mục đã hoàn thành → trạng thái trở về chưa hoàn thành
- [ ] Bỏ tick → thông tin người thực hiện và thời điểm bị xóa
- [ ] Tick/bỏ tick nhiều mục độc lập nhau
- [ ] Progress bar / tỉ lệ % hoàn thành cập nhật đúng (nếu có)
- [ ] Thành viên khác thấy trạng thái tick đúng
- [ ] Trạng thái persist sau reload và đăng nhập lại
- [ ] Giao diện responsive

---

## TEST CASES

### UI TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_CHECK_TOGGLE_01 | Checkbox mỗi mục có thể click | Đăng nhập `member@test.com`, mở `Task Check Test` | 1. Quan sát các mục checklist | — | Mỗi mục có checkbox; cursor thay đổi khi hover; có thể click | | | |
| TC_CHECK_TOGGLE_02 | Mục hoàn thành có dấu hiệu trực quan rõ | Vừa tick `Mục 1` | 1. Quan sát `Mục 1` sau khi tick | — | `Mục 1` hiển thị khác biệt rõ ràng: gạch ngang, màu mờ hơn, hoặc icon ✓ | | | |
| TC_CHECK_TOGGLE_03 | Thông tin người thực hiện và thời điểm hiển thị | Vừa tick `Mục 1` | 1. Quan sát thông tin chi tiết của `Mục 1` | — | Hiển thị tên `member@test.com` và thời điểm hoàn thành cạnh mục | | | |
| TC_CHECK_TOGGLE_04 | Giao diện responsive | Đang xem checklist | 1. Resize cửa sổ trình duyệt | — | Checklist không bị vỡ layout; checkbox vẫn click được | | | |

---

### FUNCTION TEST — Đánh dấu hoàn thành

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_CHECK_TOGGLE_05 | Tick mục chưa hoàn thành thành công | `Mục 1` chưa được tích | 1. Click checkbox của `Mục 1` | — | `Mục 1` chuyển sang trạng thái hoàn thành; người thực hiện = `member@test.com`; thời điểm = thời gian hiện tại | | | |
| TC_CHECK_TOGGLE_06 | Tick nhiều mục độc lập nhau | `Mục 1`, `Mục 2`, `Mục 3` chưa tích | 1. Tick `Mục 1`<br>2. Tick `Mục 3`<br>3. Kiểm tra trạng thái | — | `Mục 1` và `Mục 3` hoàn thành; `Mục 2` vẫn chưa tích; các mục không ảnh hưởng lẫn nhau | | | |
| TC_CHECK_TOGGLE_07 | Progress / tỉ lệ hoàn thành cập nhật đúng | Task có 3 mục, 0 mục hoàn thành | 1. Tick `Mục 1`<br>2. Kiểm tra progress bar hoặc tỉ lệ % (nếu có) | — | Hiển thị 1/3 hoặc 33% hoàn thành | | | N/A nếu không có progress bar |

---

### FUNCTION TEST — Bỏ đánh dấu hoàn thành

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_CHECK_TOGGLE_08 | Bỏ tick mục đã hoàn thành thành công | `Mục 1` đang được tích | 1. Click lại checkbox của `Mục 1` | — | `Mục 1` chuyển về trạng thái chưa hoàn thành; dấu hiệu trực quan biến mất | | | |
| TC_CHECK_TOGGLE_09 | Bỏ tick → xóa thông tin người thực hiện và thời điểm | `Mục 1` vừa được bỏ tích | 1. Quan sát thông tin chi tiết của `Mục 1` sau khi bỏ tích | — | Thông tin người thực hiện và thời điểm hoàn thành không còn hiển thị | | | |
| TC_CHECK_TOGGLE_10 | Progress cập nhật khi bỏ tick | Đã tick `Mục 1`, progress = 1/3 | 1. Bỏ tick `Mục 1`<br>2. Kiểm tra progress | — | Progress trở về 0/3 hoặc 0% | | | N/A nếu không có progress bar |

---

### BUSINESS FLOW

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_CHECK_TOGGLE_11 | Trạng thái tick cập nhật ngay (không reload) | Đang xem checklist | 1. Tick `Mục 2`<br>2. Quan sát ngay sau khi tick | — | Trạng thái thay đổi ngay tức thì, không cần reload | | | |
| TC_CHECK_TOGGLE_12 | Thành viên khác thấy đúng trạng thái tick | `member@test.com` vừa tick `Mục 2` | 1. Đăng nhập `other@test.com`<br>2. Mở `Task Check Test` | — | `other@test.com` thấy `Mục 2` ở trạng thái hoàn thành; thấy đúng tên `member@test.com` là người thực hiện | | | |
| TC_CHECK_TOGGLE_13 | Trạng thái tick persist sau reload | Đã tick `Mục 1` và `Mục 3` | 1. Reload trang<br>2. Kiểm tra trạng thái các mục | — | `Mục 1` và `Mục 3` vẫn ở trạng thái hoàn thành; `Mục 2` vẫn chưa tích | | | |
| TC_CHECK_TOGGLE_14 | Trạng thái tick persist sau đăng nhập lại | Đã tick `Mục 1` | 1. Đăng xuất<br>2. Đăng nhập lại `member@test.com`<br>3. Mở `Task Check Test` | — | `Mục 1` vẫn ở trạng thái hoàn thành sau đăng nhập lại | | | |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
