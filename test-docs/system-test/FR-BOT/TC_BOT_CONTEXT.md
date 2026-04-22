# TC_BOT_CONTEXT — FR-BOT-1: Chatbot hiển thị thông tin ngữ cảnh

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | FR-BOT — Chatbot hỗ trợ |
| Feature | FR-BOT-1.1 — Chatbot hiển thị thông tin ngữ cảnh |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Ứng dụng đang chạy; đăng nhập `user@test.com` / `Abc@1234` |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 8     |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Icon / nút mở chatbot hiển thị rõ ràng trong giao diện chính
- [ ] Chatbot hiển thị tên người dùng hiện tại khi được mở — FR-BOT-1.1
- [ ] Chatbot hiển thị danh sách công việc đến hạn hôm nay của người dùng — FR-BOT-1.1
- [ ] Chatbot hiển thị danh sách công việc đang hoạt động (chưa hoàn thành) của người dùng — FR-BOT-1.1
- [ ] Chatbot không hiển thị dữ liệu của người dùng khác — NFR-SEC-3
- [ ] Người dùng chưa đăng nhập không thể truy cập chatbot — NFR-SEC-2

---

## TEST CASES

### UI TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_BOT_CONTEXT_01 | Icon / nút mở chatbot hiển thị trong giao diện chính | Đăng nhập `user@test.com`; ở giao diện chính | 1. Quan sát giao diện chính | — | Icon hoặc nút "Chatbot" hiển thị rõ ràng, dễ nhận biết | | | |
| TC_BOT_CONTEXT_02 | Panel chatbot mở đúng khi nhấn icon | Đăng nhập `user@test.com`; giao diện chính đang hiển thị | 1. Nhấn icon / nút Chatbot | — | Panel hoặc cửa sổ chat mở ra với giao diện nhập liệu | | | |

---

### FUNCTION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_BOT_CONTEXT_03 | Chatbot hiển thị tên người dùng hiện tại — FR-BOT-1.1 | Đăng nhập `user@test.com`; tên hiển thị là `"Test User"` | 1. Mở chatbot | — | Chatbot phản hồi hoặc hiển thị tên `"Test User"` trong ngữ cảnh | | | |
| TC_BOT_CONTEXT_04 | Chatbot hiển thị công việc đến hạn hôm nay — FR-BOT-1.1 | Đăng nhập `user@test.com`; có ít nhất 1 công việc đến hạn hôm nay (`deadline = ngày hiện tại`) | 1. Mở chatbot | — | Chatbot liệt kê đúng các công việc có deadline là hôm nay | | | |
| TC_BOT_CONTEXT_05 | Chatbot hiển thị công việc đang hoạt động (chưa hoàn thành) — FR-BOT-1.1 | Đăng nhập `user@test.com`; có ít nhất 1 công việc đang hoạt động chưa hoàn thành | 1. Mở chatbot | — | Chatbot liệt kê đúng các công việc chưa hoàn thành của người dùng | | | |
| TC_BOT_CONTEXT_06 | Chatbot không hiển thị dữ liệu của người dùng khác — NFR-SEC-3 | `user@test.com` đang đăng nhập; `user2@test.com` có công việc riêng | 1. Mở chatbot với tài khoản `user@test.com` | — | Chatbot chỉ hiển thị công việc của `user@test.com`; không có công việc của `user2@test.com` | | | |
| TC_BOT_CONTEXT_07 | Chatbot hiển thị đúng khi không có công việc đến hạn hôm nay — FR-BOT-1.1 | Đăng nhập `user@test.com`; không có công việc nào đến hạn hôm nay | 1. Mở chatbot | — | Chatbot thông báo không có công việc đến hạn hôm nay (không bị lỗi hoặc hiển thị trống) | | | |

---

### BUSINESS FLOW

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_BOT_CONTEXT_08 | Luồng mở chatbot — ngữ cảnh đầy đủ hiển thị đúng — FR-BOT-1.1 | Đăng nhập `user@test.com`; có 2 công việc đến hạn hôm nay và 3 công việc đang hoạt động | 1. Mở chatbot<br>2. Quan sát thông tin được hiển thị | — | Chatbot hiển thị đúng tên người dùng, 2 công việc đến hạn hôm nay và 3 công việc đang hoạt động | | | |
| TC_BOT_CONTEXT_09 | Người dùng chưa đăng nhập không thể truy cập chatbot — NFR-SEC-2 | Người dùng chưa đăng nhập | 1. Truy cập trực tiếp URL trang chatbot | — | Hệ thống chuyển hướng về trang đăng nhập; không cho phép truy cập chatbot | | | |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
