# TC_NOTIF_REALTIME — FR-NOTIF-7: Thông Báo Thời Gian Thực

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | FR-NOTIF — Thông báo |
| Feature | FR-NOTIF-7.1 — Người dùng đang online nhận thông báo mới ngay lập tức; số đếm cập nhật tự động |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Ứng dụng đang chạy; đăng nhập `user@test.com` / `Abc@1234` trên **Trình duyệt A**; đăng nhập `admin@test.com` / `Abc@1234` trên **Trình duyệt B**; `user@test.com` là thành viên nhóm `Team Alpha`; cả hai trình duyệt đang mở đồng thời |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 7     |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Thông báo mới xuất hiện ngay lập tức trong bảng thông báo mà không cần tải lại trang
- [ ] Badge số đếm thông báo chưa đọc tăng tự động khi nhận thông báo mới
- [ ] Thông báo thời gian thực hoạt động cho mọi loại sự kiện: nhóm, công việc, chat, hệ thống
- [ ] Nhiều thông báo đến liên tiếp — tất cả xuất hiện đúng
- [ ] Thông báo thời gian thực hoạt động ngay cả khi bảng thông báo đang đóng

---

## TEST CASES

### FUNCTION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_NOTIF_REALTIME_01 | Nhận thông báo thời gian thực khi bảng đang đóng — FR-NOTIF-7.1 | `user@test.com` đang online; bảng thông báo đang đóng; badge hiện tại = `0` | 1. Trên Trình duyệt B: `admin@test.com` giao công việc `"Task RT-01"` cho `user@test.com`<br>2. Ngay lập tức quan sát icon thông báo trên Trình duyệt A | Tên công việc: `"Task RT-01"` | Badge trên icon thông báo của `user@test.com` tăng lên `1` ngay lập tức mà không cần reload trang | | | |
| TC_NOTIF_REALTIME_02 | Thông báo mới xuất hiện trong bảng đang mở — FR-NOTIF-7.1 | `user@test.com` đang mở bảng thông báo | 1. Trên Trình duyệt B: `admin@test.com` giao thêm công việc `"Task RT-02"` cho `user@test.com`<br>2. Quan sát bảng thông báo trên Trình duyệt A mà không reload | Tên công việc: `"Task RT-02"` | Thông báo `"Bạn được giao Task RT-02"` xuất hiện ở đầu danh sách trong bảng thông báo của `user@test.com` ngay lập tức | | | |
| TC_NOTIF_REALTIME_03 | Số đếm cập nhật tự động không cần reload — FR-NOTIF-7.1 | Badge = `1` trên Trình duyệt A | 1. Trên Trình duyệt B: `admin@test.com` thực hiện thêm một hành động kích hoạt thông báo (đổi vai trò `user@test.com`)<br>2. Quan sát badge trên Trình duyệt A | — | Badge tăng từ `1` lên `2` tự động mà không cần người dùng làm gì | | | |
| TC_NOTIF_REALTIME_04 | Nhiều thông báo đến liên tiếp — tất cả hiển thị đúng | `user@test.com` đang online; badge = `0` | 1. Trên Trình duyệt B: `admin@test.com` thực hiện 3 hành động liên tiếp: giao Task A, giao Task B, đổi tên nhóm<br>2. Quan sát Trình duyệt A sau mỗi hành động | — | Badge tăng đúng theo từng bước: `1` → `2` → `3`; tất cả 3 thông báo xuất hiện đúng trong bảng | | | |

---

### BUSINESS FLOW

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_NOTIF_REALTIME_05 | Luồng nhận thông báo thời gian thực đa loại sự kiện | `user@test.com` đang online | 1. `admin@test.com` giao công việc → kiểm tra Trình duyệt A<br>2. `admin@test.com` gửi thông báo hệ thống → kiểm tra Trình duyệt A<br>3. `member2@test.com` @mention `user@test.com` trong bình luận → kiểm tra Trình duyệt A | — | Tất cả 3 loại thông báo (công việc, hệ thống, mention) đều xuất hiện ngay lập tức; badge tăng đúng sau mỗi loại | | | |
| TC_NOTIF_REALTIME_06 | Đánh dấu đã đọc — badge giảm ngay lập tức không cần reload | Badge = `2` | 1. `user@test.com` nhấn "Đánh dấu đã đọc" trên 1 thông báo<br>2. Quan sát badge ngay lập tức | — | Badge giảm từ `2` xuống `1` ngay lập tức mà không cần tải lại trang | | | |
| TC_NOTIF_REALTIME_07 | Thông báo thời gian thực hoạt động sau phiên dài | `user@test.com` đã giữ ứng dụng mở >30 phút | 1. Không làm gì trên Trình duyệt A trong 30 phút<br>2. `admin@test.com` giao công việc mới cho `user@test.com`<br>3. Quan sát Trình duyệt A | — | Thông báo vẫn đến ngay lập tức; kết nối thời gian thực không bị mất sau thời gian dài không hoạt động | | | |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
