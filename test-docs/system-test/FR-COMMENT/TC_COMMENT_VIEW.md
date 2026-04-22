# TC_COMMENT_VIEW — FR-COMMENT-4: Xem Danh Sách Bình Luận

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | FR-COMMENT — Bình luận công việc |
| Feature | FR-COMMENT-4 — Xem danh sách bình luận |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Ứng dụng đang chạy; `member@test.com` / `Abc@1234` là thành viên `Group Task Test`; tồn tại task `Task Comment Test` có ≥ 5 bình luận từ nhiều người khác nhau, được gửi tại các thời điểm khác nhau; `outsider@test.com` không thuộc nhóm |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 10    |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Phần bình luận hiển thị trong chi tiết task
- [ ] Mỗi bình luận hiển thị: nội dung, tên tác giả, avatar, thời gian gửi
- [ ] Bình luận đã chỉnh sửa hiển thị nhãn "đã chỉnh sửa"
- [ ] Bình luận sắp xếp đúng thứ tự (cũ → mới hoặc mới → cũ theo thiết kế)
- [ ] Có phân trang hoặc load thêm nếu bình luận nhiều
- [ ] Task chưa có bình luận → hiển thị trạng thái "Chưa có bình luận"
- [ ] Người không thuộc nhóm không thể xem bình luận
- [ ] Giao diện responsive

---

## TEST CASES

### UI TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_COMMENT_VIEW_01 | Phần bình luận hiển thị đúng giao diện | Đăng nhập `member@test.com`, mở `Task Comment Test` | 1. Cuộn xuống phần bình luận | — | Danh sách bình luận hiển thị rõ ràng; không lỗi layout | | | |
| TC_COMMENT_VIEW_02 | Thông tin từng bình luận đầy đủ | Đang xem danh sách bình luận | 1. Quan sát từng bình luận | — | Mỗi bình luận có: nội dung, tên/avatar tác giả, thời gian gửi | | | |
| TC_COMMENT_VIEW_03 | Bình luận đã sửa có nhãn "đã chỉnh sửa" | Tồn tại bình luận đã được sửa | 1. Tìm bình luận đã sửa trong danh sách | — | Bình luận đó có nhãn "(edited)" hoặc "đã chỉnh sửa" | | | |
| TC_COMMENT_VIEW_04 | Giao diện responsive | Đang xem danh sách bình luận | 1. Resize cửa sổ trình duyệt | — | Danh sách bình luận không bị vỡ layout ở mọi kích thước | | | |

---

### FUNCTION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_COMMENT_VIEW_05 | Bình luận sắp xếp đúng thứ tự thời gian | Đang xem danh sách bình luận | 1. Quan sát thứ tự bình luận theo thời gian gửi | — | Bình luận cũ nhất ở trên, mới nhất ở dưới (hoặc ngược lại nếu đó là thiết kế); nhất quán | | | |
| TC_COMMENT_VIEW_06 | Task chưa có bình luận hiển thị đúng | Task không có bình luận | 1. Mở chi tiết task chưa có bình luận<br>2. Cuộn xuống phần bình luận | — | Hiển thị thông báo "Chưa có bình luận" hoặc trạng thái trống tương đương | | | |
| TC_COMMENT_VIEW_07 | Phân trang hoặc load thêm hoạt động | Task có nhiều bình luận (> 1 trang) | 1. Cuộn xuống hoặc nhấn "Xem thêm"<br>2. Kiểm tra bình luận tiếp theo | — | Bình luận tiếp theo được tải; không bị duplicate | | | Cần task có nhiều bình luận |
| TC_COMMENT_VIEW_08 | Người không thuộc nhóm không xem được bình luận | Đăng nhập `outsider@test.com` | 1. Truy cập URL trực tiếp của `Task Comment Test` | — | Hệ thống chặn truy cập; không hiển thị nội dung bình luận | | | |

---

### BUSINESS FLOW

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_COMMENT_VIEW_09 | Danh sách bình luận cập nhật ngay khi có bình luận mới | Đang xem danh sách | 1. Thành viên khác gửi bình luận mới<br>2. Quan sát danh sách (không reload) | — | Bình luận mới xuất hiện ngay hoặc sau khi reload | | | |
| TC_COMMENT_VIEW_10 | Danh sách bình luận nhất quán giữa các thành viên | Đang xem task | 1. Đăng nhập `member@test.com` → đếm số bình luận<br>2. Đăng nhập tài khoản khác → đếm số bình luận | — | Số lượng và nội dung bình luận giống nhau giữa các thành viên nhóm | | | |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
