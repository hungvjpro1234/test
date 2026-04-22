# TC_BOT_PROGRESS — FR-BOT-3: Xem tiến độ nhóm qua Chatbot

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | FR-BOT — Chatbot hỗ trợ |
| Feature | FR-BOT-3.1 — Xem tiến độ nhóm (PM/PO); FR-BOT-3.2 — Xem tiến độ từng thành viên (PM/PO); FR-BOT-3.3 — Từ chối quyền với vai trò không phù hợp |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Ứng dụng đang chạy; có nhóm với ít nhất 3 thành viên; đăng nhập `pm@test.com` / `Abc@1234` (vai trò PM) |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 10    |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] PM mở chatbot → xem được tổng quan tiến độ toàn nhóm — FR-BOT-3.1
- [ ] Product Owner mở chatbot → xem được tổng quan tiến độ toàn nhóm — FR-BOT-3.1
- [ ] PM xem tiến độ từng thành viên → hiển thị thống kê công việc cá nhân — FR-BOT-3.2
- [ ] Product Owner xem tiến độ từng thành viên → hiển thị thống kê công việc cá nhân — FR-BOT-3.2
- [ ] Thành viên không phải PM/Product Owner cố xem tiến độ nhóm → thấy thông báo không có quyền — FR-BOT-3.3
- [ ] Dữ liệu tiến độ nhóm hiển thị đúng theo thực tế công việc — FR-BOT-3.1
- [ ] Dữ liệu tiến độ từng thành viên hiển thị đúng theo thực tế — FR-BOT-3.2

---

## TEST CASES

### UI TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_BOT_PROGRESS_01 | Giao diện chatbot hiển thị tùy chọn xem tiến độ nhóm cho PM | Đăng nhập `pm@test.com` (vai trò PM); chatbot đang mở | 1. Quan sát giao diện chatbot | — | Tùy chọn hoặc lệnh xem tiến độ nhóm hiển thị rõ ràng với người dùng có vai trò PM | | | |
| TC_BOT_PROGRESS_02 | Giao diện tổng quan tiến độ nhóm hiển thị đầy đủ thông tin | Đăng nhập `pm@test.com`; PM vừa xem tiến độ nhóm qua chatbot | 1. Yêu cầu chatbot xem tiến độ nhóm<br>2. Quan sát thông tin hiển thị | — | Tổng quan tiến độ nhóm hiển thị đầy đủ: số công việc, tỷ lệ hoàn thành chung, các thông số liên quan | | | |

---

### FUNCTION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_BOT_PROGRESS_03 | PM xem tổng quan tiến độ toàn nhóm — FR-BOT-3.1 | Đăng nhập `pm@test.com` (vai trò PM trong nhóm); chatbot đang mở | 1. Mở chatbot<br>2. Yêu cầu xem tiến độ nhóm | — | Hệ thống hiển thị tổng quan tiến độ toàn nhóm (số công việc, tỷ lệ hoàn thành) | | | |
| TC_BOT_PROGRESS_04 | Product Owner xem tổng quan tiến độ toàn nhóm — FR-BOT-3.1 | Đăng nhập `po@test.com` (vai trò Product Owner trong nhóm); chatbot đang mở | 1. Mở chatbot<br>2. Yêu cầu xem tiến độ nhóm | — | Hệ thống hiển thị tổng quan tiến độ toàn nhóm | | | |
| TC_BOT_PROGRESS_05 | PM xem tiến độ từng thành viên — FR-BOT-3.2 | Đăng nhập `pm@test.com`; nhóm có 3 thành viên; chatbot đang mở | 1. Mở chatbot<br>2. Yêu cầu xem tiến độ từng thành viên | — | Hệ thống hiển thị thống kê công việc riêng cho từng thành viên trong nhóm | | | |
| TC_BOT_PROGRESS_06 | Product Owner xem tiến độ từng thành viên — FR-BOT-3.2 | Đăng nhập `po@test.com`; nhóm có 3 thành viên; chatbot đang mở | 1. Mở chatbot<br>2. Yêu cầu xem tiến độ từng thành viên | — | Hệ thống hiển thị thống kê công việc riêng cho từng thành viên trong nhóm | | | |
| TC_BOT_PROGRESS_07 | Thành viên thường (không phải PM/PO) bị từ chối xem tiến độ nhóm — FR-BOT-3.3 | Đăng nhập `member@test.com` (vai trò Developer/QA, không phải PM/PO); chatbot đang mở | 1. Mở chatbot<br>2. Yêu cầu xem tiến độ nhóm | — | Hệ thống hiển thị thông báo không có quyền truy cập tính năng này; không hiển thị dữ liệu tiến độ | | | |
| TC_BOT_PROGRESS_08 | Dữ liệu tiến độ nhóm hiển thị đúng theo thực tế công việc — FR-BOT-3.1 | Đăng nhập `pm@test.com`; nhóm có 5 công việc, 3 đã hoàn thành | 1. Mở chatbot<br>2. Yêu cầu xem tiến độ nhóm | — | Tỷ lệ hoàn thành nhóm hiển thị 60% (3/5); số liệu khớp với thực tế | | | |
| TC_BOT_PROGRESS_09 | Dữ liệu tiến độ từng thành viên hiển thị đúng — FR-BOT-3.2 | Đăng nhập `pm@test.com`; thành viên `member@test.com` có 4 công việc, 1 đã hoàn thành | 1. Mở chatbot<br>2. Yêu cầu xem tiến độ từng thành viên | — | Thống kê của `member@test.com` hiển thị: 4 công việc, 1 hoàn thành (25%) | | | |

---

### BUSINESS FLOW

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_BOT_PROGRESS_10 | Luồng PM mở chatbot → xem tiến độ nhóm → xem tiến độ từng thành viên — FR-BOT-3.1, FR-BOT-3.2 | Đăng nhập `pm@test.com`; nhóm có 3 thành viên với công việc ở các trạng thái khác nhau | 1. Mở chatbot<br>2. Yêu cầu xem tiến độ nhóm<br>3. Quan sát tổng quan<br>4. Yêu cầu xem tiến độ từng thành viên<br>5. Quan sát chi tiết từng người | — | Bước 3: hiển thị tổng quan tiến độ nhóm; Bước 5: hiển thị thống kê công việc riêng từng thành viên | | | |
| TC_BOT_PROGRESS_11 | Tiến độ nhóm cập nhật đúng sau khi thành viên hoàn thành công việc — FR-BOT-3.1 | Đăng nhập `pm@test.com`; tiến độ nhóm hiện tại 40% (2/5 công việc hoàn thành) | 1. `member@test.com` hoàn thành thêm 1 công việc<br>2. PM mở chatbot<br>3. Yêu cầu xem tiến độ nhóm | — | Tiến độ nhóm cập nhật lên 60% (3/5 công việc hoàn thành) | | | |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
