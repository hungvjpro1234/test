# TC_TIME_STOP — FR-TIME-2: Dừng Tính Giờ & Ghi Chú

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | FR-TIME — Theo dõi thời gian |
| Feature | FR-TIME-2 — Dừng tính giờ, ghi nhận lịch sử và ghi chú thời gian |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Ứng dụng đang chạy; đăng nhập `member@test.com` / `Abc@1234`; tồn tại task `Task Timer Test` thuộc nhóm; timer của `member@test.com` đang chạy trên task đó (dùng cho các test dừng timer); `member2@test.com` cũng là thành viên cùng nhóm |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 13    |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Nút "Dừng" hiển thị khi timer đang chạy
- [ ] Nhấn "Dừng" dừng bộ đếm và lưu bản ghi thời gian vào lịch sử
- [ ] Tổng thời gian của bản ghi được tính chính xác
- [ ] Dừng khi không có timer đang chạy → hiển thị thông báo lỗi
- [ ] Có thể nhập ghi chú khi dừng timer
- [ ] Ghi chú được lưu cùng bản ghi thời gian trong lịch sử
- [ ] Ghi chú có thể để trống (không bắt buộc)
- [ ] Lịch sử thời gian hiển thị đúng: thời điểm bắt đầu, kết thúc, tổng giờ, ghi chú
- [ ] Nhiều lần tính giờ trên cùng 1 task → lịch sử lưu đầy đủ từng bản ghi
- [ ] Giao diện responsive tại màn hình dừng timer và xem lịch sử

---

## TEST CASES

### UI TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_TIME_STOP_01 | Nút "Dừng" hiển thị khi timer đang chạy | Timer của `member@test.com` đang chạy trên `Task Timer Test` | 1. Mở chi tiết `Task Timer Test` | — | Nút "Dừng" (hoặc biểu tượng stop ■) hiển thị rõ; nút "Bắt đầu" không còn hiển thị | | | |
| TC_TIME_STOP_02 | Trường nhập ghi chú hiển thị khi dừng | Timer đang chạy | 1. Nhấn nút "Dừng" | — | Hệ thống hiển thị trường nhập ghi chú (textarea hoặc input) trước khi xác nhận lưu | | | |
| TC_TIME_STOP_03 | Lịch sử thời gian hiển thị sau khi dừng | Timer vừa được dừng | 1. Quan sát khu vực lịch sử thời gian trên chi tiết task | — | Bản ghi mới xuất hiện trong lịch sử gồm: thời điểm bắt đầu, thời điểm kết thúc, tổng thời gian, ghi chú (nếu có) | | | |
| TC_TIME_STOP_04 | Giao diện responsive khi xem lịch sử | Có ít nhất 1 bản ghi trong lịch sử | 1. Resize cửa sổ trình duyệt | — | Bảng/danh sách lịch sử không bị vỡ layout; thông tin vẫn đọc được | | | |

---

### VALIDATION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_TIME_STOP_05 | Dừng khi không có timer đang chạy — FR-TIME-2.2 | Đăng nhập `member@test.com`; không có timer nào đang chạy | 1. Mở chi tiết `Task Timer Test`<br>2. Thực hiện hành động dừng timer (qua API hoặc nếu nút vẫn hiển thị) | — | Hệ thống hiển thị thông báo lỗi; không tạo bản ghi thời gian giả trong lịch sử | | | |
| TC_TIME_STOP_06 | Ghi chú để trống vẫn dừng được | Timer đang chạy | 1. Nhấn "Dừng"<br>2. Để trống trường ghi chú<br>3. Xác nhận dừng | — | Hệ thống chấp nhận; bản ghi được lưu với ghi chú rỗng; không hiện thông báo lỗi | | | |

---

### FUNCTION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_TIME_STOP_07 | Dừng tính giờ thành công — FR-TIME-2.1 | Timer của `member@test.com` đang chạy ít nhất 5 giây | 1. Ghi nhận giá trị bộ đếm tại thời điểm dừng (ví dụ: 00:00:15)<br>2. Nhấn "Dừng"<br>3. Xác nhận | — | Bộ đếm dừng lại; bản ghi mới xuất hiện trong lịch sử với tổng thời gian ≈ 00:00:15 (±1 giây) | | | |
| TC_TIME_STOP_08 | Tổng thời gian được tính chính xác | Timer bắt đầu lúc T₁ và dừng lúc T₂ | 1. Ghi nhận T₁ khi bắt đầu<br>2. Ghi nhận T₂ khi dừng<br>3. Kiểm tra tổng thời gian trong bản ghi | — | Tổng thời gian trong bản ghi = T₂ − T₁ (±1 giây); không bị làm tròn sai | | | |
| TC_TIME_STOP_09 | Ghi chú thời gian làm việc được lưu — FR-TIME-2.3 | Timer đang chạy | 1. Nhấn "Dừng"<br>2. Nhập ghi chú `"Hoàn thành phần giao diện"`<br>3. Xác nhận | `"Hoàn thành phần giao diện"` | Bản ghi lưu trong lịch sử hiển thị đúng ghi chú `"Hoàn thành phần giao diện"` kèm theo bản ghi thời gian | | | |
| TC_TIME_STOP_10 | Nhiều lần tính giờ → lịch sử lưu đầy đủ từng bản ghi | `member@test.com` đã dừng timer 1 lần trước đó | 1. Bắt đầu timer lần 2<br>2. Dừng timer sau ≥ 3 giây<br>3. Kiểm tra lịch sử | — | Lịch sử hiển thị 2 bản ghi riêng biệt theo đúng thứ tự thời gian; không bị ghi đè nhau | | | |
| TC_TIME_STOP_11 | Bản ghi thời gian chỉ lưu cho đúng người dùng | `member@test.com` và `member2@test.com` cùng bắt đầu timer; `member@test.com` dừng trước | 1. Đăng nhập `member@test.com` → dừng timer<br>2. Kiểm tra lịch sử của `member@test.com`<br>3. Kiểm tra lịch sử của `member2@test.com` | — | Bản ghi chỉ xuất hiện trong lịch sử của `member@test.com`; lịch sử `member2@test.com` không có bản ghi này; timer của `member2@test.com` vẫn đang chạy | | | |

---

### BUSINESS FLOW

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_TIME_STOP_12 | Luồng hoàn chỉnh: bắt đầu → dừng → kiểm tra lịch sử | Đăng nhập `member@test.com`; không có timer đang chạy | 1. Mở chi tiết `Task Timer Test`<br>2. Nhấn "Bắt đầu"<br>3. Đợi 10 giây<br>4. Nhấn "Dừng"<br>5. Nhập ghi chú `"Test flow"`<br>6. Xác nhận<br>7. Kiểm tra lịch sử | `"Test flow"` | Bộ đếm dừng; bản ghi xuất hiện trong lịch sử với tổng thời gian ≈ 10 giây, ghi chú `"Test flow"`, thời điểm bắt đầu và kết thúc đúng | | | |
| TC_TIME_STOP_13 | Nhiều vòng tính giờ tích lũy đúng trong lịch sử | Đăng nhập `member@test.com` | 1. Bắt đầu timer → dừng sau 5 giây (ghi chú `"Vòng 1"`)<br>2. Bắt đầu timer → dừng sau 8 giây (ghi chú `"Vòng 2"`)<br>3. Xem toàn bộ lịch sử | `"Vòng 1"`, `"Vòng 2"` | Lịch sử có 2 bản ghi: bản ghi 1 ≈ 5 giây với ghi chú `"Vòng 1"`, bản ghi 2 ≈ 8 giây với ghi chú `"Vòng 2"`; thứ tự đúng theo thời gian | | | |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
