# TC_TASK_DETAIL — FR-TASK-3: Xem Chi Tiết Công Việc

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | FR-TASK — Quản lý công việc |
| Feature | FR-TASK-3 — Xem chi tiết công việc |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Ứng dụng đang chạy; đăng nhập `member@test.com` / `Abc@1234`; tồn tại công việc `Task Detail Test` trong `Group Task Test` với đầy đủ: mô tả, trạng thái, độ ưu tiên, ngày đến hạn, người được giao, ≥1 bình luận, ≥1 file đính kèm, ≥1 checklist; tài khoản `outsider@test.com` không là thành viên nhóm |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 12    |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Click vào công việc → mở trang chi tiết
- [ ] Hiển thị đầy đủ: tiêu đề, mô tả, trạng thái, độ ưu tiên, ngày đến hạn
- [ ] Hiển thị danh sách người được giao
- [ ] Hiển thị bình luận (nếu có)
- [ ] Hiển thị file đính kèm (nếu có)
- [ ] Hiển thị checklist (nếu có)
- [ ] Truy cập công việc đã xóa → thông báo không tìm thấy
- [ ] Người không thuộc nhóm truy cập → thông báo không có quyền
- [ ] Giao diện responsive

---

## TEST CASES

### UI TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_TASK_DETAIL_01 | Trang chi tiết hiển thị đầy đủ thông tin | Đăng nhập `member@test.com` | 1. Click vào `Task Detail Test` | — | Hiển thị tiêu đề, mô tả, trạng thái, độ ưu tiên, ngày đến hạn, người được giao, bình luận, file đính kèm, checklist | | | |
| TC_TASK_DETAIL_02 | Giao diện responsive trên trang chi tiết | Trang chi tiết đang mở | 1. Resize cửa sổ trình duyệt | — | Layout không bị vỡ ở mọi kích thước | | | |

---

### FUNCTION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_TASK_DETAIL_03 | Tiêu đề hiển thị đúng | Đang ở trang chi tiết | 1. Kiểm tra tiêu đề hiển thị | — | Tiêu đề khớp với `Task Detail Test` | | | |
| TC_TASK_DETAIL_04 | Mô tả hiển thị đúng | Đang ở trang chi tiết | 1. Kiểm tra phần mô tả | — | Mô tả hiển thị đúng nội dung đã nhập | | | |
| TC_TASK_DETAIL_05 | Trạng thái, độ ưu tiên, ngày đến hạn hiển thị đúng | Đang ở trang chi tiết | 1. Kiểm tra từng trường metadata | — | Trạng thái, độ ưu tiên, ngày đến hạn hiển thị đúng giá trị đã set | | | |
| TC_TASK_DETAIL_06 | Danh sách người được giao hiển thị | Đang ở trang chi tiết | 1. Kiểm tra phần người được giao | — | Hiển thị đúng tên/avatar người được giao | | | |
| TC_TASK_DETAIL_07 | Bình luận hiển thị đúng | Task có ≥1 bình luận | 1. Cuộn xuống phần bình luận | — | Bình luận hiển thị đúng nội dung, tác giả, thời gian | | | |
| TC_TASK_DETAIL_08 | File đính kèm hiển thị | Task có ≥1 file | 1. Kiểm tra phần file đính kèm | — | File hiển thị với tên, kích thước; có thể download | | | |
| TC_TASK_DETAIL_09 | Checklist hiển thị | Task có ≥1 checklist | 1. Kiểm tra phần checklist | — | Checklist hiển thị với các mục và trạng thái checked/unchecked đúng | | | |
| TC_TASK_DETAIL_10 | Truy cập công việc đã bị xóa | Đăng nhập `member@test.com` | 1. Copy URL của task<br>2. Xóa task đó<br>3. Truy cập lại URL vừa copy | — | Hệ thống hiển thị thông báo không tìm thấy công việc (404 hoặc tương đương) | | | ⚠️ Tái tạo task sau test |
| TC_TASK_DETAIL_11 | Người không thuộc nhóm bị chặn | Đăng nhập `outsider@test.com` | 1. Truy cập URL trực tiếp của `Task Detail Test` | — | Hệ thống hiển thị thông báo không có quyền truy cập | | | |

---

### BUSINESS FLOW

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_TASK_DETAIL_12 | Thay đổi trên task cập nhật ngay trên trang chi tiết | Đang ở trang chi tiết `Task Detail Test` | 1. Thành viên khác thay đổi trạng thái task<br>2. Quan sát trang chi tiết (không reload) | — | Trạng thái mới hiển thị ngay hoặc sau lần reload | | | |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
