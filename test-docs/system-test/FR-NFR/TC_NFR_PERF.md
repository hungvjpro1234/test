# TC_NFR_PERF — NFR-PERF: Hiệu Năng

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | NFR-PERF — Hiệu năng |
| Feature | NFR-PERF-1: Thời gian phản hồi ≤ 3 giây; NFR-PERF-2: Phân trang danh sách |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Ứng dụng đang chạy trong điều kiện bình thường; đăng nhập `user@test.com` / `Abc@1234`; tài khoản có dữ liệu đủ để kiểm tra (ít nhất 1 nhóm, 1 công việc, 1 thông báo) |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 12    |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Xem danh sách công việc phản hồi trong ≤ 3 giây — NFR-PERF-1
- [ ] Tạo công việc mới phản hồi trong ≤ 3 giây — NFR-PERF-1
- [ ] Sửa công việc phản hồi trong ≤ 3 giây — NFR-PERF-1
- [ ] Xem hồ sơ người dùng phản hồi trong ≤ 3 giây — NFR-PERF-1
- [ ] Nhận / xem danh sách thông báo phản hồi trong ≤ 3 giây — NFR-PERF-1
- [ ] Danh sách công việc được phân trang, không tải toàn bộ dữ liệu — NFR-PERF-2
- [ ] Danh sách thông báo được phân trang — NFR-PERF-2
- [ ] Lịch sử tin nhắn nhóm phân trang 50 tin nhắn/trang — NFR-PERF-2
- [ ] Lịch sử tin nhắn 1-1 phân trang — NFR-PERF-2

---

## TEST CASES

### UI TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_NFR_PERF_01 | Danh sách công việc có indicator phân trang hiển thị | Đăng nhập; mở màn hình danh sách công việc của nhóm | 1. Quan sát phần cuối danh sách công việc | — | Có nút phân trang hoặc cơ chế load-more; danh sách không hiển thị toàn bộ ngay một lúc | | | |
| TC_NFR_PERF_02 | Danh sách thông báo có indicator phân trang hiển thị | Đăng nhập; mở bảng thông báo | 1. Quan sát danh sách thông báo | — | Danh sách thông báo hiển thị theo trang hoặc có cơ chế scroll-to-load; không load toàn bộ cùng lúc | | | |
| TC_NFR_PERF_03 | Lịch sử chat nhóm phân trang — hiển thị nút "Tải thêm" | Đăng nhập; mở chat nhóm có lịch sử tin nhắn | 1. Quan sát phần đầu danh sách tin nhắn | — | Hiển thị tối đa 50 tin nhắn; có nút/cơ chế tải thêm tin nhắn cũ hơn | | | |

---

### FUNCTION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_NFR_PERF_04 | Xem danh sách công việc trong ≤ 3 giây — NFR-PERF-1 | Đăng nhập `user@test.com`; đang ở màn hình nhóm | 1. Bấm vào mục "Công việc" của nhóm<br>2. Đo thời gian từ khi nhấn đến khi danh sách hiển thị | — | Danh sách công việc hiển thị trong vòng ≤ 3 giây | | | |
| TC_NFR_PERF_05 | Tạo công việc mới phản hồi trong ≤ 3 giây — NFR-PERF-1 | Đăng nhập `user@test.com`; mở form tạo công việc | 1. Điền tiêu đề `"Test perf task"`<br>2. Nhấn "Tạo"<br>3. Đo thời gian phản hồi | Tiêu đề: `"Test perf task"` | Hệ thống xác nhận tạo thành công trong ≤ 3 giây | | | |
| TC_NFR_PERF_06 | Sửa công việc phản hồi trong ≤ 3 giây — NFR-PERF-1 | Đăng nhập `user@test.com`; mở chi tiết công việc | 1. Sửa tiêu đề thành `"Updated perf task"`<br>2. Lưu<br>3. Đo thời gian phản hồi | Tiêu đề mới: `"Updated perf task"` | Hệ thống xác nhận cập nhật trong ≤ 3 giây | | | |
| TC_NFR_PERF_07 | Xem hồ sơ người dùng phản hồi trong ≤ 3 giây — NFR-PERF-1 | Đăng nhập `user@test.com` | 1. Mở trang hồ sơ cá nhân<br>2. Đo thời gian tải | — | Trang hồ sơ hiển thị đầy đủ trong ≤ 3 giây | | | |
| TC_NFR_PERF_08 | Xem danh sách thông báo phản hồi trong ≤ 3 giây — NFR-PERF-1 | Đăng nhập `user@test.com`; có ít nhất 1 thông báo | 1. Mở bảng thông báo<br>2. Đo thời gian hiển thị danh sách | — | Danh sách thông báo hiển thị trong ≤ 3 giây | | | |
| TC_NFR_PERF_09 | Tải thêm tin nhắn cũ khi cuộn lên đầu — NFR-PERF-2 | Đăng nhập; mở chat nhóm có > 50 tin nhắn | 1. Cuộn lên đầu danh sách<br>2. Quan sát hành vi hệ thống | — | Hệ thống tải thêm tin nhắn cũ hơn; không tải toàn bộ lịch sử ngay lập tức | | | |

---

### BUSINESS FLOW

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_NFR_PERF_10 | Luồng xem → tạo → sửa công việc đều trong ngưỡng 3 giây — NFR-PERF-1 | Đăng nhập `user@test.com`; nhóm có sẵn dữ liệu | 1. Xem danh sách công việc (ghi lại thời gian)<br>2. Tạo công việc mới (ghi lại thời gian)<br>3. Sửa công việc vừa tạo (ghi lại thời gian) | — | Cả 3 thao tác đều phản hồi trong ≤ 3 giây | | | |
| TC_NFR_PERF_11 | Chuyển trang phân trang danh sách công việc không tải lại toàn bộ — NFR-PERF-2 | Đăng nhập; danh sách công việc có nhiều trang | 1. Nhấn sang trang 2 trong danh sách công việc | — | Hệ thống chỉ tải dữ liệu trang 2; không tải lại toàn bộ trang | | | |
| TC_NFR_PERF_12 | Lịch sử tin nhắn 1-1 phân trang khi cuộn lên — NFR-PERF-2 | Đăng nhập; mở hội thoại 1-1 có nhiều tin nhắn | 1. Cuộn lên đầu danh sách tin nhắn<br>2. Quan sát hành vi | — | Hệ thống tải thêm tin nhắn cũ theo trang; không hiển thị toàn bộ ngay lập tức | | | |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
