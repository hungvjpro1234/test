# TC_NOTE_UPDATE — FR-NOTE-4: Cập Nhật Ghi Chú

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | FR-NOTE — Ghi chú cá nhân |
| Feature | FR-NOTE-4.1 / 4.2 — Cập nhật ghi chú của mình; cố sửa ghi chú người khác |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Ứng dụng đang chạy; đăng nhập `user@test.com` / `Abc@1234`; tài khoản có ghi chú `"Ghi chú gốc"` |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 10    |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Nút "Sửa" / "Chỉnh sửa" chỉ hiển thị trên ghi chú của chính mình
- [ ] Cập nhật nội dung hợp lệ → lưu thành công, nội dung mới hiển thị — FR-NOTE-4.1
- [ ] Cập nhật thành nội dung trống → hiển thị thông báo lỗi, không lưu
- [ ] Cố sửa ghi chú của người khác → thông báo không có quyền — FR-NOTE-4.2
- [ ] Hủy chỉnh sửa → nội dung gốc không thay đổi
- [ ] Thay đổi được lưu vào DB; tải lại trang nội dung vẫn đúng
- [ ] Thời gian "cập nhật lần cuối" được cập nhật sau khi sửa

---

## TEST CASES

### UI TEST

| ID | Test Case | Test Objective | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|----------------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_NOTE_UPDATE_01 | Nút "Sửa" hiển thị trên ghi chú của mình | Xác minh giao diện chỉ cung cấp tùy chọn chỉnh sửa trên ghi chú mà người dùng có quyền thao tác. | Đăng nhập `user@test.com`; mở chi tiết ghi chú `"Ghi chú gốc"` | 1. Quan sát giao diện chi tiết ghi chú | — | Tùy chọn "Sửa" / "Chỉnh sửa" hiển thị rõ ràng trên ghi chú của mình | | | |
| TC_NOTE_UPDATE_02 | Thời gian "cập nhật lần cuối" thay đổi sau khi sửa | Xác minh hệ thống cập nhật đúng thông tin thời gian sau khi nội dung ghi chú được chỉnh sửa thành công. | Đăng nhập `user@test.com`; ghi nhận thời gian hiển thị trên `"Ghi chú gốc"` | 1. Sửa nội dung ghi chú<br>2. Lưu<br>3. Quan sát thông tin thời gian | `"Nội dung mới"` | Thời gian "cập nhật lần cuối" cập nhật sang thời điểm vừa sửa | | | |

---

### VALIDATION TEST

| ID | Test Case | Test Objective | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|----------------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_NOTE_UPDATE_03 | Cập nhật ghi chú thành nội dung trống — không lưu | Xác minh hệ thống không cho phép lưu cập nhật khi nội dung ghi chú không hợp lệ và vẫn giữ nguyên dữ liệu cũ. | Đăng nhập `user@test.com`; đang chỉnh sửa `"Ghi chú gốc"` | 1. Xóa toàn bộ nội dung<br>2. Nhấn "Lưu" | `""` | Hệ thống hiển thị thông báo lỗi; không lưu; nội dung vẫn là nội dung gốc | | | |

---

### FUNCTION TEST

| ID | Test Case | Test Objective | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|----------------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_NOTE_UPDATE_04 | Cập nhật ghi chú của mình thành công — FR-NOTE-4.1 | Xác minh chủ sở hữu có thể cập nhật nội dung ghi chú của mình thành công theo `FR-NOTE-4.1`. | Đăng nhập `user@test.com`; có ghi chú `"Nội dung cũ"` | 1. Mở chi tiết ghi chú<br>2. Nhấn "Sửa"<br>3. Đổi nội dung thành `"Nội dung đã cập nhật"`<br>4. Nhấn "Lưu" | `"Nội dung đã cập nhật"` | Nội dung ghi chú hiển thị `"Nội dung đã cập nhật"`; có thông báo lưu thành công | | | |
| TC_NOTE_UPDATE_05 | Cố sửa ghi chú của người khác qua API — FR-NOTE-4.2 | Xác minh hệ thống từ chối mọi nỗ lực chỉnh sửa ghi chú không thuộc quyền sở hữu của người dùng theo `FR-NOTE-4.2`. | Đăng nhập `user@test.com`; `user2@test.com` có ghi chú `id=200` | 1. Gửi request API sửa ghi chú `id=200` với tài khoản `user@test.com` | `"Nội dung hack"` | Hệ thống trả về thông báo không có quyền; ghi chú `id=200` không bị thay đổi — C-5 | | | |
| TC_NOTE_UPDATE_06 | Hủy chỉnh sửa — nội dung gốc không thay đổi | Xác minh thao tác hủy chỉnh sửa không làm phát sinh thay đổi ngoài ý muốn trên nội dung ghi chú. | Đăng nhập `user@test.com`; đang chỉnh sửa `"Nội dung gốc"` | 1. Thay đổi nội dung thành `"Nội dung tạm"`<br>2. Nhấn "Hủy" | — | Nội dung ghi chú vẫn là `"Nội dung gốc"`; không có thay đổi nào được lưu | | | |
| TC_NOTE_UPDATE_07 | Cập nhật chỉ tiêu đề mà không thay đổi nội dung | Xác minh hệ thống cho phép cập nhật từng phần của ghi chú mà vẫn giữ nguyên các trường không bị chỉnh sửa. | Đăng nhập `user@test.com`; có ghi chú tiêu đề `"Tiêu đề cũ"`, nội dung `"Nội dung giữ nguyên"` | 1. Sửa tiêu đề thành `"Tiêu đề mới"`<br>2. Giữ nguyên nội dung<br>3. Lưu | Tiêu đề: `"Tiêu đề mới"` | Tiêu đề hiển thị `"Tiêu đề mới"`; nội dung vẫn là `"Nội dung giữ nguyên"` | | | |

---

### BUSINESS FLOW

| ID | Test Case | Test Objective | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|----------------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_NOTE_UPDATE_08 | Thay đổi được lưu vào DB sau khi reload — FR-NOTE-4.1 | Xác minh dữ liệu ghi chú sau khi cập nhật được lưu bền vững và không bị mất sau khi tải lại trang. | Đăng nhập `user@test.com`; vừa cập nhật ghi chú thành `"Nội dung mới nhất"` | 1. Tải lại trang (F5)<br>2. Mở chi tiết ghi chú | — | Nội dung vẫn hiển thị `"Nội dung mới nhất"` sau khi reload; không bị về nội dung cũ | | | |
| TC_NOTE_UPDATE_09 | Luồng sửa nhiều lần liên tiếp — nội dung luôn đúng | Xác minh hệ thống luôn lưu đúng phiên bản chỉnh sửa cuối cùng khi người dùng cập nhật ghi chú nhiều lần liên tiếp. | Đăng nhập `user@test.com`; có ghi chú bắt đầu là `"V1"` | 1. Sửa thành `"V2"` → Lưu<br>2. Sửa thành `"V3"` → Lưu<br>3. Mở chi tiết ghi chú | — | Nội dung hiển thị là `"V3"` (lần sửa cuối cùng); không có `"V1"` hay `"V2"` | | | |
| TC_NOTE_UPDATE_10 | Người dùng chưa đăng nhập không thể cập nhật ghi chú — NFR-SEC-2 | Xác minh chức năng cập nhật ghi chú chỉ khả dụng với người dùng đã đăng nhập hợp lệ. | Người dùng chưa đăng nhập | 1. Gửi request API cập nhật ghi chú `id=50` | — | Hệ thống từ chối; chuyển hướng về trang đăng nhập | | | |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
