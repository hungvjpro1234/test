# TC_NOTE_FAVORITE — FR-NOTE-6: Đánh Dấu Ghi Chú Yêu Thích

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | FR-NOTE — Ghi chú cá nhân |
| Feature | FR-NOTE-6.1 — Đánh dấu / gỡ dấu yêu thích ghi chú (toggle) |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Ứng dụng đang chạy; đăng nhập `user@test.com` / `Abc@1234`; tài khoản có ít nhất 2 ghi chú |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 8     |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Icon / nút yêu thích hiển thị trên mỗi ghi chú
- [ ] Nhấn yêu thích lần 1 → ghi chú được đánh dấu — FR-NOTE-6.1
- [ ] Nhấn yêu thích lần 2 (cùng ghi chú) → gỡ dấu yêu thích (toggle) — FR-NOTE-6.1
- [ ] Trạng thái yêu thích hiển thị đúng (biểu tượng thay đổi khi bật/tắt)
- [ ] Trạng thái yêu thích được lưu vào DB; reload không bị mất
- [ ] Đánh dấu yêu thích ghi chú A không ảnh hưởng ghi chú B
- [ ] Ghi chú yêu thích có thể lọc / xem riêng (nếu hệ thống hỗ trợ)

---

## TEST CASES

### UI TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_NOTE_FAVORITE_01 | Icon yêu thích hiển thị trên ghi chú | Đăng nhập `user@test.com`; mở danh sách hoặc chi tiết ghi chú | 1. Quan sát giao diện ghi chú | — | Icon/nút yêu thích (hình ngôi sao hoặc tương đương) hiển thị trên mỗi ghi chú | | | |
| TC_NOTE_FAVORITE_02 | Biểu tượng thay đổi sau khi đánh dấu yêu thích | Đăng nhập `user@test.com`; ghi chú `"Ghi chú A"` chưa được yêu thích | 1. Nhấn icon yêu thích trên `"Ghi chú A"`<br>2. Quan sát biểu tượng | — | Biểu tượng chuyển sang trạng thái "đã yêu thích" (ví dụ: ngôi sao đặc) | | | |
| TC_NOTE_FAVORITE_03 | Biểu tượng trở về trạng thái ban đầu sau khi gỡ yêu thích | Đăng nhập `user@test.com`; ghi chú `"Ghi chú A"` đang được yêu thích | 1. Nhấn lại icon yêu thích trên `"Ghi chú A"`<br>2. Quan sát biểu tượng | — | Biểu tượng trở về trạng thái "chưa yêu thích" (ví dụ: ngôi sao rỗng) | | | |

---

### FUNCTION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_NOTE_FAVORITE_04 | Đánh dấu yêu thích ghi chú — FR-NOTE-6.1 | Đăng nhập `user@test.com`; ghi chú `"Ghi chú A"` chưa yêu thích | 1. Nhấn icon yêu thích trên `"Ghi chú A"` | — | Ghi chú `"Ghi chú A"` được đánh dấu là yêu thích; trạng thái cập nhật ngay lập tức | | | |
| TC_NOTE_FAVORITE_05 | Gỡ dấu yêu thích ghi chú (toggle) — FR-NOTE-6.1 | Đăng nhập `user@test.com`; ghi chú `"Ghi chú A"` đang yêu thích | 1. Nhấn lại icon yêu thích trên `"Ghi chú A"` | — | Dấu yêu thích bị gỡ; biểu tượng quay lại trạng thái chưa yêu thích | | | |
| TC_NOTE_FAVORITE_06 | Đánh dấu một ghi chú không ảnh hưởng ghi chú khác | Đăng nhập `user@test.com`; `"Ghi chú A"` và `"Ghi chú B"` đều chưa yêu thích | 1. Nhấn yêu thích `"Ghi chú A"`<br>2. Kiểm tra trạng thái `"Ghi chú B"` | — | `"Ghi chú A"` được đánh dấu yêu thích; `"Ghi chú B"` không bị thay đổi trạng thái | | | |

---

### BUSINESS FLOW

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_NOTE_FAVORITE_07 | Trạng thái yêu thích được lưu sau reload | Đăng nhập `user@test.com`; vừa đánh dấu yêu thích `"Ghi chú A"` | 1. Tải lại trang (F5)<br>2. Mở mục Ghi chú | — | Ghi chú `"Ghi chú A"` vẫn hiển thị trạng thái yêu thích sau khi reload | | | |
| TC_NOTE_FAVORITE_08 | Luồng toggle yêu thích nhiều lần — trạng thái cuối đúng | Đăng nhập `user@test.com`; `"Ghi chú A"` chưa yêu thích | 1. Nhấn yêu thích (→ bật)<br>2. Nhấn lại (→ tắt)<br>3. Nhấn lại (→ bật)<br>4. Tải lại trang | — | Trạng thái sau cùng là "đã yêu thích"; lưu đúng vào DB | | | |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
