# TC_TIME_START — FR-TIME-1: Bắt Đầu Tính Giờ

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | FR-TIME — Theo dõi thời gian |
| Feature | FR-TIME-1 — Bắt đầu tính giờ |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Ứng dụng đang chạy; đăng nhập `member@test.com` / `Abc@1234`; tồn tại task `Task Timer Test` thuộc nhóm mà `member@test.com` là thành viên; `member2@test.com` cũng là thành viên cùng nhóm; `outsider@test.com` không thuộc nhóm |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 10    |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Nút "Bắt đầu" hiển thị trong trang chi tiết công việc
- [ ] Bộ đếm giờ khởi động và tăng dần sau khi nhấn "Bắt đầu"
- [ ] Trạng thái timer thay đổi sang "Đang chạy" sau khi bắt đầu
- [ ] Người dùng không thể bắt đầu thêm 1 timer khi đã có timer đang chạy trên cùng task
- [ ] Nhiều người dùng khác nhau có thể cùng tính giờ một công việc
- [ ] Mỗi người dùng có bộ đếm riêng biệt và độc lập
- [ ] Người không thuộc nhóm không thể bắt đầu tính giờ trên công việc của nhóm
- [ ] Giao diện responsive khi timer đang chạy

---

## TEST CASES

### UI TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_TIME_START_01 | Nút "Bắt đầu" hiển thị trong chi tiết task | Đăng nhập `member@test.com` | 1. Mở chi tiết `Task Timer Test` | — | Nút "Bắt đầu" (hoặc biểu tượng play ▶) hiển thị rõ trong khu vực theo dõi thời gian | | | |
| TC_TIME_START_02 | Bộ đếm giờ hiển thị và tăng sau khi bắt đầu | Đang xem chi tiết `Task Timer Test` | 1. Nhấn nút "Bắt đầu"<br>2. Quan sát màn hình trong 5 giây | — | Bộ đếm giờ hiển thị định dạng `HH:MM:SS` và đang tăng theo thời gian thực | | | |
| TC_TIME_START_03 | Giao diện responsive khi timer đang chạy | Timer đang chạy trên `Task Timer Test` | 1. Resize cửa sổ trình duyệt về nhiều kích thước khác nhau | — | Khu vực bộ đếm giờ không bị vỡ layout; nút điều khiển vẫn hiển thị rõ | | | |

---

### FUNCTION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_TIME_START_04 | Bắt đầu tính giờ thành công — FR-TIME-1.1 | Đăng nhập `member@test.com`; chưa có timer đang chạy trên `Task Timer Test` | 1. Mở chi tiết `Task Timer Test`<br>2. Nhấn nút "Bắt đầu" | — | Hệ thống khởi động bộ đếm giờ cho `member@test.com` trên task này; bộ đếm bắt đầu từ 00:00:00 và tăng dần | | | |
| TC_TIME_START_05 | Không thể bắt đầu timer khi đã có timer đang chạy | Timer của `member@test.com` đang chạy trên `Task Timer Test` | 1. Nhấn lại nút "Bắt đầu" | — | Nút "Bắt đầu" bị ẩn hoặc vô hiệu hóa; hệ thống không tạo thêm timer thứ hai cho cùng người dùng | | | |
| TC_TIME_START_06 | Nhiều người dùng cùng tính giờ trên 1 task — FR-TIME-1.2 | `member@test.com` đã bắt đầu timer; `member2@test.com` mở cùng task | 1. Đăng nhập `member2@test.com`<br>2. Mở chi tiết `Task Timer Test`<br>3. Nhấn nút "Bắt đầu" | — | Hệ thống cho phép `member2@test.com` bắt đầu bộ đếm riêng; bộ đếm của hai người độc lập nhau | | | |
| TC_TIME_START_07 | Bộ đếm của từng người dùng là độc lập — FR-TIME-1.2 | `member@test.com` bắt đầu timer trước `member2@test.com` 30 giây | 1. Quan sát bộ đếm của `member@test.com`<br>2. Quan sát bộ đếm của `member2@test.com` | — | Bộ đếm của `member@test.com` lớn hơn `member2@test.com` khoảng 30 giây; hai bộ đếm chạy độc lập | | | |
| TC_TIME_START_08 | Người không thuộc nhóm không thể bắt đầu tính giờ | Đăng nhập `outsider@test.com` | 1. Cố truy cập URL trực tiếp chi tiết `Task Timer Test` | — | Hệ thống từ chối truy cập; không hiển thị nút "Bắt đầu" hoặc bất kỳ nội dung nào của task | | | |

---

### BUSINESS FLOW

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_TIME_START_09 | Luồng hoàn chỉnh: bắt đầu tính giờ và xác nhận trạng thái | Đăng nhập `member@test.com`; không có timer nào đang chạy | 1. Mở chi tiết `Task Timer Test`<br>2. Nhấn "Bắt đầu"<br>3. Đợi 10 giây<br>4. Quan sát trạng thái | — | Bộ đếm đang hiển thị ≥ 00:00:10; trạng thái task hiển thị "Đang tính giờ"; nút "Bắt đầu" chuyển thành nút "Dừng" | | | |
| TC_TIME_START_10 | Timer vẫn tiếp tục sau khi điều hướng và quay lại task | Timer của `member@test.com` đang chạy | 1. Ghi nhận giá trị bộ đếm (ví dụ: 00:00:30)<br>2. Chuyển sang trang khác<br>3. Quay lại chi tiết `Task Timer Test` | — | Bộ đếm tiếp tục tăng so với giá trị đã ghi nhận; thời gian không bị reset về 0 khi chuyển trang | | | |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
