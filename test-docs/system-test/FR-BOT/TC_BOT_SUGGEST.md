# TC_BOT_SUGGEST — FR-BOT-2: Đề xuất và đánh giá công việc

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | FR-BOT — Chatbot hỗ trợ |
| Feature | FR-BOT-2.1 — Lưu công việc được đề xuất; FR-BOT-2.2 — Đánh giá hoàn thành công việc được đề xuất |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Ứng dụng đang chạy; đăng nhập `user@test.com` / `Abc@1234`; chatbot đang mở |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 9     |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Chatbot đề xuất danh sách công việc phù hợp cho người dùng — FR-BOT-2.1
- [ ] Các công việc được chatbot đề xuất được lưu vào hồ sơ người dùng — FR-BOT-2.1
- [ ] Hệ thống tính toán tỷ lệ hoàn thành công việc được đề xuất — FR-BOT-2.2
- [ ] Tỷ lệ hoàn thành hiển thị đúng khi một số công việc đã hoàn thành — FR-BOT-2.2
- [ ] Tỷ lệ hoàn thành hiển thị 100% khi tất cả công việc được đề xuất hoàn thành — FR-BOT-2.2
- [ ] Tỷ lệ hoàn thành hiển thị 0% khi chưa có công việc nào hoàn thành — FR-BOT-2.2
- [ ] Tỷ lệ hoàn thành cập nhật đúng sau khi người dùng hoàn thành thêm công việc — FR-BOT-2.2

---

## TEST CASES

### UI TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_BOT_SUGGEST_01 | Khu vực hiển thị đề xuất công việc hiển thị rõ trong chatbot | Đăng nhập `user@test.com`; chatbot đang mở | 1. Quan sát giao diện chatbot sau khi mở | — | Khu vực đề xuất công việc hiển thị rõ ràng, dễ đọc | | | |
| TC_BOT_SUGGEST_02 | Tỷ lệ hoàn thành công việc đề xuất hiển thị rõ ràng | Đăng nhập `user@test.com`; có danh sách công việc đề xuất đã lưu | 1. Mở kết quả thực hiện công việc được đề xuất | — | Tỷ lệ hoàn thành hiển thị dưới dạng số hoặc phần trăm dễ đọc | | | |

---

### FUNCTION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_BOT_SUGGEST_03 | Chatbot đề xuất danh sách công việc phù hợp — FR-BOT-2.1 | Đăng nhập `user@test.com`; người dùng có công việc đang hoạt động | 1. Mở chatbot<br>2. Yêu cầu chatbot đề xuất công việc | — | Chatbot trả về danh sách công việc đề xuất phù hợp với người dùng | | | |
| TC_BOT_SUGGEST_04 | Công việc được đề xuất được lưu vào hồ sơ người dùng — FR-BOT-2.1 | Đăng nhập `user@test.com`; chatbot vừa đề xuất danh sách công việc | 1. Nhận đề xuất từ chatbot<br>2. Tải lại trang (F5)<br>3. Mở lại kết quả đề xuất | — | Danh sách công việc đề xuất vẫn được lưu và hiển thị đúng sau khi tải lại | | | |
| TC_BOT_SUGGEST_05 | Tỷ lệ hoàn thành tính đúng khi một phần công việc đề xuất đã hoàn thành — FR-BOT-2.2 | Đăng nhập `user@test.com`; có 4 công việc đề xuất, 2 công việc đã hoàn thành | 1. Mở kết quả thực hiện công việc được đề xuất | — | Tỷ lệ hoàn thành hiển thị 50% (2/4) | | | |
| TC_BOT_SUGGEST_06 | Tỷ lệ hoàn thành hiển thị 100% khi tất cả công việc đề xuất hoàn thành — FR-BOT-2.2 | Đăng nhập `user@test.com`; tất cả công việc được đề xuất đã hoàn thành | 1. Mở kết quả thực hiện công việc được đề xuất | — | Tỷ lệ hoàn thành hiển thị 100% | | | |
| TC_BOT_SUGGEST_07 | Tỷ lệ hoàn thành hiển thị 0% khi chưa có công việc đề xuất nào hoàn thành — FR-BOT-2.2 | Đăng nhập `user@test.com`; có danh sách công việc đề xuất nhưng chưa hoàn thành cái nào | 1. Mở kết quả thực hiện công việc được đề xuất | — | Tỷ lệ hoàn thành hiển thị 0% | | | |

---

### BUSINESS FLOW

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_BOT_SUGGEST_08 | Luồng đề xuất → lưu → theo dõi hoàn thành — FR-BOT-2.1, FR-BOT-2.2 | Đăng nhập `user@test.com`; người dùng có công việc đang hoạt động | 1. Mở chatbot<br>2. Nhận đề xuất từ chatbot (3 công việc)<br>3. Hoàn thành 1 công việc trong danh sách đề xuất<br>4. Xem kết quả thực hiện đề xuất | — | Danh sách 3 công việc được lưu; tỷ lệ hoàn thành hiển thị 33% (1/3) sau khi hoàn thành 1 công việc | | | |
| TC_BOT_SUGGEST_09 | Tỷ lệ hoàn thành cập nhật đúng sau khi hoàn thành thêm công việc — FR-BOT-2.2 | Đăng nhập `user@test.com`; có 3 công việc đề xuất, đã hoàn thành 1 (33%) | 1. Hoàn thành thêm 1 công việc đề xuất<br>2. Xem lại kết quả thực hiện đề xuất | — | Tỷ lệ hoàn thành cập nhật lên 67% (2/3) | | | |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
