# TC_TASK_CALENDAR — FR-TASK-6: Xem Công Việc Theo Lịch

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | FR-TASK — Quản lý công việc |
| Feature | FR-TASK-6 — Xem công việc theo Lịch |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Đăng nhập `member@test.com` / `Abc@1234`; nhóm `Group Task Test` có: ≥3 task có ngày đến hạn ở tháng hiện tại, ≥1 task có ngày đến hạn tháng trước, ≥1 task có ngày đến hạn tháng sau, ≥1 task không có ngày đến hạn |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 12    |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Nút chuyển sang chế độ xem Lịch tồn tại
- [ ] Lịch tháng hiển thị đúng các ngày, thứ trong tuần
- [ ] Task có deadline hiển thị đúng ngày trên lịch
- [ ] Task không có deadline không hiển thị trên lịch
- [ ] Chuyển sang tháng trước → hiển thị đúng task của tháng đó
- [ ] Chuyển sang tháng sau → hiển thị đúng task của tháng đó
- [ ] Chuyển sang năm khác → hiển thị đúng
- [ ] Click vào task trên lịch → mở chi tiết task
- [ ] Tháng hiện tại được highlight/đánh dấu rõ ràng
- [ ] Giao diện responsive

---

## TEST CASES

### UI TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_TASK_CALENDAR_01 | Giao diện lịch hiển thị đúng | Đăng nhập, vào `Group Task Test` | 1. Chuyển sang chế độ xem Lịch | — | Hiển thị lịch theo tháng; đủ các ngày, đúng thứ trong tuần; ngày hiện tại được đánh dấu | | | |
| TC_TASK_CALENDAR_02 | Giao diện responsive | Đang xem lịch | 1. Resize cửa sổ trình duyệt | — | Lịch không bị vỡ layout | | | |

---

### FUNCTION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_TASK_CALENDAR_03 | Task có deadline hiển thị đúng ngày | Đang xem lịch tháng hiện tại | 1. Quan sát các ngày có task | — | Task hiển thị đúng ngày đến hạn; tên/tiêu đề task hiển thị trên ô ngày tương ứng | | | |
| TC_TASK_CALENDAR_04 | Task không có deadline không hiển thị trên lịch | Đang xem lịch | 1. Kiểm tra xem có task nào không có deadline hiển thị trên lịch không | — | Chỉ task có ngày đến hạn mới hiển thị trên lịch | | | |
| TC_TASK_CALENDAR_05 | Chuyển sang tháng trước | Đang xem tháng hiện tại | 1. Nhấn nút "Tháng trước" | — | Lịch chuyển sang tháng trước; task của tháng trước hiển thị đúng | | | |
| TC_TASK_CALENDAR_06 | Chuyển sang tháng sau | Đang xem tháng hiện tại | 1. Nhấn nút "Tháng sau" | — | Lịch chuyển sang tháng sau; task của tháng sau hiển thị đúng | | | |
| TC_TASK_CALENDAR_07 | Chuyển sang năm khác | Đang xem lịch | 1. Chuyển sang năm khác (ví dụ năm sau) | — | Lịch hiển thị đúng tháng/năm được chọn; task có deadline trong năm đó hiển thị đúng | | | |
| TC_TASK_CALENDAR_08 | Quay về tháng hiện tại | Đang xem tháng khác | 1. Nhấn nút "Hôm nay" hoặc "Tháng hiện tại" | — | Lịch chuyển về tháng hiện tại; ngày hôm nay được highlight | | | |
| TC_TASK_CALENDAR_09 | Click vào task trên lịch → mở chi tiết | Đang xem lịch, thấy task trên lịch | 1. Click vào 1 task hiển thị trên ô ngày | — | Mở trang chi tiết của task đó | | | |
| TC_TASK_CALENDAR_10 | Nhiều task cùng ngày hiển thị đúng | Có ≥2 task cùng deadline | 1. Quan sát ô ngày có nhiều task | — | Tất cả task trong ngày đó đều hiển thị hoặc có indicator "xem thêm" | | | |

---

### BUSINESS FLOW

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_TASK_CALENDAR_11 | Task mới có deadline xuất hiện trên lịch ngay | Đang xem lịch | 1. Tạo task mới với deadline trong tháng hiện tại<br>2. Quan sát lịch | Deadline: ngày trong tháng hiện tại | Task mới xuất hiện đúng ngày trên lịch | | | |
| TC_TASK_CALENDAR_12 | Cập nhật deadline → task di chuyển đúng ngày mới | Đang xem lịch, có task hiển thị | 1. Cập nhật deadline của 1 task<br>2. Kiểm tra lịch | Deadline mới: ngày khác trong tháng | Task xuất hiện đúng ở ngày mới; biến mất ở ngày cũ | | | |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
