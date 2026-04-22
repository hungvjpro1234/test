# TC_NOTIF_AUTO — FR-NOTIF-5: Nhận Thông Báo Tự Động

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | FR-NOTIF — Thông báo |
| Feature | FR-NOTIF-5.1 → 5.14 — Hệ thống tự động gửi thông báo khi có sự kiện xảy ra |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Ứng dụng đang chạy; đăng nhập `user@test.com` / `Abc@1234`; `admin@test.com` / `Abc@1234` (quản trị viên nhóm); `member2@test.com` / `Abc@1234`; nhóm `Team Alpha` với `user@test.com` và `member2@test.com` là thành viên; `admin@test.com` là quản trị viên nhóm; có ít nhất 1 công việc tồn tại trong nhóm được giao cho `user@test.com` |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 17    |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Nhận thông báo khi được mời vào nhóm (có tùy chọn chấp nhận/từ chối) — FR-NOTIF-5.1
- [ ] Nhận thông báo khi vai trò trong nhóm bị thay đổi — FR-NOTIF-5.2
- [ ] Nhận thông báo khi tên nhóm thay đổi — FR-NOTIF-5.3
- [ ] Nhận thông báo khi có công việc mới trong nhóm — FR-NOTIF-5.4
- [ ] Nhận thông báo khi được giao công việc — FR-NOTIF-5.5
- [ ] Nhận thông báo khi bị hủy giao công việc — FR-NOTIF-5.6
- [ ] Người liên quan nhận thông báo khi công việc hoàn thành — FR-NOTIF-5.7
- [ ] Nhận thông báo khi công việc sắp đến hạn — FR-NOTIF-5.8
- [ ] Nhận thông báo khi có bình luận mới trên công việc theo dõi — FR-NOTIF-5.9
- [ ] Nhận thông báo khi được @mention trong bình luận — FR-NOTIF-5.10
- [ ] Nhận thông báo về tin nhắn khi offline — FR-NOTIF-5.11
- [ ] Nhận thông báo khi có lời mời cuộc họp — FR-NOTIF-5.12
- [ ] Nhận thông báo khi bỏ lỡ cuộc họp — FR-NOTIF-5.13
- [ ] Nhận thông báo hệ thống từ quản trị viên — FR-NOTIF-5.14
- [ ] Không nhận thông báo cho danh mục đã tắt trong cài đặt (FR-USER-5.2)

---

## TEST CASES

### FUNCTION TEST — Thông báo về Nhóm

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_NOTIF_AUTO_01 | Nhận thông báo lời mời vào nhóm — FR-NOTIF-5.1 | Đăng nhập `admin@test.com`; `outsider@test.com` chưa thuộc nhóm `Team Alpha` | 1. Đăng nhập `admin@test.com`<br>2. Vào nhóm `Team Alpha` → Quản lý thành viên<br>3. Mời `outsider@test.com` vào nhóm<br>4. Đăng nhập `outsider@test.com`; mở bảng thông báo | — | `outsider@test.com` nhận được thông báo lời mời vào nhóm `Team Alpha`; thông báo hiển thị tên nhóm và nút tùy chọn "Chấp nhận" / "Từ chối" | | | |
| TC_NOTIF_AUTO_02 | Nhận thông báo khi vai trò trong nhóm thay đổi — FR-NOTIF-5.2 | `user@test.com` đang là thành viên thường trong `Team Alpha` | 1. Đăng nhập `admin@test.com`<br>2. Thay đổi vai trò `user@test.com` từ "Member" → "QA"<br>3. Đăng nhập `user@test.com`; mở bảng thông báo | — | `user@test.com` nhận được thông báo vai trò của họ trong nhóm `Team Alpha` đã được thay đổi | | | |
| TC_NOTIF_AUTO_03 | Nhận thông báo khi tên nhóm thay đổi — FR-NOTIF-5.3 | `user@test.com` và `member2@test.com` là thành viên `Team Alpha` | 1. Đăng nhập `admin@test.com`<br>2. Đổi tên nhóm từ `"Team Alpha"` → `"Team Beta"`<br>3. Đăng nhập `user@test.com`; mở bảng thông báo | — | `user@test.com` nhận được thông báo tên nhóm đã thay đổi thành `"Team Beta"` | | | |

---

### FUNCTION TEST — Thông báo về Công việc

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_NOTIF_AUTO_04 | Nhận thông báo khi có công việc mới — FR-NOTIF-5.4 | `user@test.com` và `member2@test.com` là thành viên `Team Alpha` | 1. Đăng nhập `admin@test.com`<br>2. Tạo công việc mới `"Deploy v2.0"` trong nhóm<br>3. Đăng nhập `user@test.com`; mở bảng thông báo | Tên công việc: `"Deploy v2.0"` | `user@test.com` nhận thông báo có công việc mới `"Deploy v2.0"` được tạo trong nhóm `Team Alpha` | | | |
| TC_NOTIF_AUTO_05 | Nhận thông báo khi được giao công việc — FR-NOTIF-5.5 | Công việc `"Fix bug #42"` tồn tại trong nhóm | 1. Đăng nhập `admin@test.com`<br>2. Giao công việc `"Fix bug #42"` cho `user@test.com`<br>3. Đăng nhập `user@test.com`; mở bảng thông báo | — | `user@test.com` nhận thông báo được giao công việc `"Fix bug #42"` | | | |
| TC_NOTIF_AUTO_06 | Nhận thông báo khi bị hủy giao công việc — FR-NOTIF-5.6 | `user@test.com` đang được giao công việc `"Fix bug #42"` | 1. Đăng nhập `admin@test.com`<br>2. Hủy giao `user@test.com` khỏi công việc `"Fix bug #42"`<br>3. Đăng nhập `user@test.com`; mở bảng thông báo | — | `user@test.com` nhận thông báo đã bị gỡ khỏi danh sách người được giao công việc `"Fix bug #42"` | | | |
| TC_NOTIF_AUTO_07 | Người liên quan nhận thông báo khi công việc hoàn thành — FR-NOTIF-5.7 | `user@test.com` được giao công việc `"Code review"`; `admin@test.com` là người tạo công việc | 1. Đăng nhập `member2@test.com`<br>2. Chuyển trạng thái công việc `"Code review"` sang "Hoàn thành"<br>3. Đăng nhập `user@test.com`; mở bảng thông báo | — | `user@test.com` (người được giao) nhận thông báo công việc `"Code review"` đã được đánh dấu hoàn thành | | | |
| TC_NOTIF_AUTO_08 | Nhận thông báo khi công việc sắp đến hạn — FR-NOTIF-5.8 | `user@test.com` được giao công việc `"Submit report"` có ngày đến hạn là ngày mai | 1. Chờ / mô phỏng thời điểm hệ thống gửi cảnh báo sắp đến hạn<br>2. Đăng nhập `user@test.com`; mở bảng thông báo | Ngày đến hạn: ngày mai | `user@test.com` nhận thông báo công việc `"Submit report"` sắp đến hạn | | | |

---

### FUNCTION TEST — Thông báo về Bình luận

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_NOTIF_AUTO_09 | Nhận thông báo khi có bình luận mới — FR-NOTIF-5.9 | `user@test.com` đang theo dõi công việc `"Fix bug #42"` | 1. Đăng nhập `member2@test.com`<br>2. Thêm bình luận `"Cần kiểm tra lại logic"` vào công việc `"Fix bug #42"`<br>3. Đăng nhập `user@test.com`; mở bảng thông báo | Nội dung bình luận: `"Cần kiểm tra lại logic"` | `user@test.com` nhận thông báo có bình luận mới trên công việc `"Fix bug #42"` | | | |
| TC_NOTIF_AUTO_10 | Nhận thông báo khi được @mention trong bình luận — FR-NOTIF-5.10 | `member2@test.com` đang xem công việc `"Fix bug #42"` | 1. Đăng nhập `member2@test.com`<br>2. Thêm bình luận `"@user cần review phần này"` vào công việc<br>3. Đăng nhập `user@test.com`; mở bảng thông báo | Bình luận: `"@user cần review phần này"` | `user@test.com` nhận thông báo được đề cập (@mention) trong bình luận trên công việc `"Fix bug #42"` | | | |

---

### FUNCTION TEST — Thông báo về Tin nhắn & Cuộc họp

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_NOTIF_AUTO_11 | Nhận thông báo tin nhắn khi offline — FR-NOTIF-5.11 | `user@test.com` đang offline (đăng xuất hoặc đóng ứng dụng) | 1. Đăng xuất `user@test.com`<br>2. Đăng nhập `member2@test.com`; gửi tin nhắn trực tiếp cho `user@test.com`<br>3. Đăng nhập lại `user@test.com`; mở bảng thông báo | — | `user@test.com` nhận thông báo về tin nhắn nhận được khi offline | | | |
| TC_NOTIF_AUTO_12 | Nhận thông báo lời mời cuộc họp — FR-NOTIF-5.12 | `user@test.com` là thành viên đang online | 1. Đăng nhập `admin@test.com`<br>2. Gửi lời mời cuộc họp tới `user@test.com`<br>3. Kiểm tra bảng thông báo của `user@test.com` | — | `user@test.com` nhận thông báo có lời mời tham gia cuộc họp/cuộc gọi | | | |
| TC_NOTIF_AUTO_13 | Nhận thông báo cuộc họp nhỡ — FR-NOTIF-5.13 | `user@test.com` nhận lời mời cuộc họp nhưng không tham gia | 1. Để cuộc họp kết thúc mà không tham gia<br>2. Kiểm tra bảng thông báo của `user@test.com` | — | `user@test.com` nhận thông báo đã bỏ lỡ cuộc họp | | | |

---

### FUNCTION TEST — Thông báo Hệ thống

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_NOTIF_AUTO_14 | Nhận thông báo hệ thống từ quản trị viên — FR-NOTIF-5.14 | `admin@test.com` có quyền quản trị viên | 1. Đăng nhập `admin@test.com`<br>2. Gửi thông báo hệ thống toàn hệ thống với nội dung `"Hệ thống sẽ bảo trì lúc 22:00"`<br>3. Đăng nhập `user@test.com`; mở bảng thông báo | Nội dung: `"Hệ thống sẽ bảo trì lúc 22:00"` | `user@test.com` nhận được thông báo hệ thống với nội dung `"Hệ thống sẽ bảo trì lúc 22:00"` trong mục thông báo | | | |

---

### BUSINESS FLOW

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_NOTIF_AUTO_15 | Không nhận thông báo danh mục đã tắt — FR-USER-5.2 | `user@test.com` đã tắt thông báo danh mục "Nhóm" trong cài đặt | 1. `admin@test.com` đổi tên nhóm `Team Alpha` → `Team Beta`<br>2. Đăng nhập `user@test.com`; mở bảng thông báo | — | `user@test.com` không nhận được thông báo đổi tên nhóm; các danh mục khác vẫn nhận thông báo bình thường | | | |
| TC_NOTIF_AUTO_16 | Không nhận thông báo qua email nếu kênh email đã tắt — FR-USER-5.1 | `user@test.com` đã tắt thông báo qua kênh email | 1. Thực hiện một sự kiện kích hoạt thông báo (ví dụ: giao công việc)<br>2. Kiểm tra hộp thư email của `user@test.com` | — | Không có email thông báo gửi đến hộp thư `user@test.com`; thông báo vẫn xuất hiện trong ứng dụng (nếu kênh in-app còn bật) | | | |
| TC_NOTIF_AUTO_17 | Thông báo hiển thị đúng loại sự kiện kích hoạt | `user@test.com` được giao công việc mới | 1. `admin@test.com` giao công việc `"Sprint planning"` cho `user@test.com`<br>2. Đăng nhập `user@test.com`; kiểm tra thông báo | Tên công việc: `"Sprint planning"` | Thông báo thuộc đúng danh mục "Công việc"; nội dung đề cập tên công việc `"Sprint planning"`; không hiển thị sai thông tin | | | |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
