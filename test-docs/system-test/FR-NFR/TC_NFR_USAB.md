# TC_NFR_USAB — NFR-USAB: Khả Năng Sử Dụng

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | NFR-USAB — Khả năng sử dụng |
| Feature | NFR-USAB-1: Responsive UI; NFR-USAB-2: Chủ đề Sáng/Tối/Tự động; NFR-USAB-3: Đa ngôn ngữ EN/VI; NFR-USAB-4: Thông báo lỗi rõ ràng bằng ngôn ngữ người dùng |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Ứng dụng đang chạy; đăng nhập `user@test.com` / `Abc@1234`; kiểm tra trên trình duyệt Chrome/Edge |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 16    |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Giao diện hiển thị đúng và đầy đủ trên màn hình máy tính (≥ 1024px) — NFR-USAB-1
- [ ] Giao diện hiển thị đúng và đầy đủ trên thiết bị di động (≤ 480px) — NFR-USAB-1
- [ ] Giao diện không bị vỡ layout khi thu/phóng trình duyệt — NFR-USAB-1
- [ ] Chuyển sang chủ đề Tối (Dark) không cần tải lại trang — NFR-USAB-2
- [ ] Chuyển sang chủ đề Sáng (Light) không cần tải lại trang — NFR-USAB-2
- [ ] Chủ đề Tự động theo cài đặt hệ thống — NFR-USAB-2
- [ ] Chủ đề được lưu lại sau khi đăng xuất / tải lại trang — NFR-USAB-2
- [ ] Chuyển sang Tiếng Anh, toàn bộ giao diện chuyển ngay không cần reload — NFR-USAB-3
- [ ] Chuyển sang Tiếng Việt, toàn bộ giao diện chuyển ngay không cần reload — NFR-USAB-3
- [ ] Cài đặt ngôn ngữ được lưu lại — NFR-USAB-3
- [ ] Thông báo lỗi validation hiển thị bằng ngôn ngữ hiện tại của người dùng — NFR-USAB-4
- [ ] Thông báo lỗi không hiển thị mã lỗi kỹ thuật (HTTP status, stack trace) cho người dùng — NFR-USAB-4

---

## TEST CASES

### UI TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_NFR_USAB_01 | Giao diện hiển thị đúng trên màn hình máy tính — NFR-USAB-1 | Đăng nhập trên trình duyệt; cửa sổ ≥ 1024px | 1. Duyệt qua các màn hình chính: Dashboard, Danh sách công việc, Ghi chú, Thông báo, Chat | — | Tất cả các màn hình hiển thị đầy đủ nội dung, không bị tràn, không bị che khuất; menu và nút bấm rõ ràng | | | |
| TC_NFR_USAB_02 | Giao diện hiển thị đúng trên thiết bị di động — NFR-USAB-1 | Mở ứng dụng trên trình duyệt với viewport 375×812 (iPhone) hoặc dùng DevTools | 1. Kiểm tra màn hình Đăng nhập, Dashboard, Danh sách công việc trên viewport mobile | Viewport: 375px | Giao diện responsive; menu hiển thị dạng mobile-friendly; nội dung không tràn ra ngoài màn hình | | | |
| TC_NFR_USAB_03 | Giao diện không vỡ khi thu/phóng trình duyệt — NFR-USAB-1 | Đăng nhập; mở màn hình chính | 1. Nhấn Ctrl+ để phóng to (zoom 125%, 150%)<br>2. Nhấn Ctrl- để thu nhỏ (zoom 75%, 50%) | — | Giao diện điều chỉnh theo zoom; không bị tràn layout hoặc che khuất nội dung | | | |
| TC_NFR_USAB_04 | Chủ đề Tối áp dụng ngay sau khi chọn — NFR-USAB-2 | Đăng nhập; đang dùng chủ đề Sáng | 1. Mở cài đặt giao diện<br>2. Chọn chủ đề "Tối"<br>3. Quan sát ngay sau khi chọn | — | Toàn bộ giao diện chuyển sang màu tối ngay lập tức; không có sự kiện tải lại trang (no page reload) | | | |
| TC_NFR_USAB_05 | Chủ đề Sáng áp dụng ngay sau khi chọn — NFR-USAB-2 | Đăng nhập; đang dùng chủ đề Tối | 1. Mở cài đặt giao diện<br>2. Chọn chủ đề "Sáng"<br>3. Quan sát | — | Giao diện chuyển sang chủ đề sáng ngay lập tức; không tải lại trang | | | |
| TC_NFR_USAB_06 | Chủ đề Tự động theo cài đặt hệ thống — NFR-USAB-2 | Đăng nhập; hệ thống OS đang dùng chế độ Tối | 1. Chọn chủ đề "Tự động" trong ứng dụng<br>2. Quan sát màu sắc giao diện | — | Giao diện hiển thị theo chế độ tối tương ứng với OS; khi OS đổi sang sáng, ứng dụng tự điều chỉnh | | | |
| TC_NFR_USAB_07 | Chuyển sang Tiếng Anh — toàn bộ giao diện thay đổi ngay — NFR-USAB-3 | Đăng nhập; ngôn ngữ hiện tại là Tiếng Việt | 1. Mở cài đặt ngôn ngữ<br>2. Chọn "English"<br>3. Quan sát giao diện | — | Tất cả nhãn, nút, thông báo chuyển sang Tiếng Anh ngay lập tức; không tải lại trang | | | |
| TC_NFR_USAB_08 | Chuyển sang Tiếng Việt — toàn bộ giao diện thay đổi ngay — NFR-USAB-3 | Đăng nhập; ngôn ngữ hiện tại là Tiếng Anh | 1. Mở cài đặt ngôn ngữ<br>2. Chọn "Tiếng Việt"<br>3. Quan sát giao diện | — | Tất cả nhãn, nút, thông báo chuyển sang Tiếng Việt ngay lập tức; không tải lại trang | | | |

---

### FUNCTION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_NFR_USAB_09 | Chủ đề được lưu sau khi tải lại trang — NFR-USAB-2 | Đăng nhập; chọn chủ đề Tối | 1. Chọn chủ đề "Tối"<br>2. Nhấn F5 tải lại trang | — | Sau khi tải lại, giao diện vẫn ở chủ đề Tối; không tự reset về Sáng | | | |
| TC_NFR_USAB_10 | Ngôn ngữ được lưu sau khi tải lại trang — NFR-USAB-3 | Đăng nhập; chọn "English" | 1. Chọn ngôn ngữ "English"<br>2. Nhấn F5 tải lại trang | — | Sau khi tải lại, giao diện vẫn là Tiếng Anh; không reset về Tiếng Việt | | | |
| TC_NFR_USAB_11 | Thông báo lỗi khi submit form trống hiển thị bằng ngôn ngữ người dùng — NFR-USAB-4 | Đăng nhập; ngôn ngữ Tiếng Việt; mở form tạo công việc | 1. Để trống tiêu đề<br>2. Nhấn "Tạo" | Tiêu đề: rỗng | Hiển thị thông báo lỗi bằng Tiếng Việt (ví dụ: "Tiêu đề không được để trống"); không hiện mã lỗi kỹ thuật | | | |
| TC_NFR_USAB_12 | Thông báo lỗi không lộ mã kỹ thuật (HTTP status, stack trace) — NFR-USAB-4 | Đăng nhập; gây ra lỗi server (ví dụ: request sai format) | 1. Gửi request với dữ liệu không hợp lệ<br>2. Quan sát thông báo hiển thị trên UI | — | UI hiển thị thông báo ngôn ngữ tự nhiên; không hiển thị `500`, `NullPointerException`, stack trace, hoặc JSON error thô | | | |

---

### BUSINESS FLOW

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_NFR_USAB_13 | Luồng đổi ngôn ngữ → thao tác → thông báo lỗi đúng ngôn ngữ — NFR-USAB-3 + NFR-USAB-4 | Đăng nhập; chuyển sang "English" | 1. Chuyển sang English<br>2. Mở form tạo công việc<br>3. Để trống tiêu đề<br>4. Nhấn "Create" | — | Thông báo lỗi hiển thị bằng Tiếng Anh (ví dụ: "Title is required"); nhất quán với ngôn ngữ đã chọn | | | |
| TC_NFR_USAB_14 | Luồng đổi chủ đề không mất trạng thái dữ liệu đang nhập — NFR-USAB-2 | Đăng nhập; mở form tạo ghi chú; đang nhập nội dung | 1. Nhập nội dung ghi chú `"Nội dung test"`<br>2. Chuyển chủ đề sang Tối<br>3. Kiểm tra form | Nội dung: `"Nội dung test"` | Nội dung đã nhập vẫn còn trong form; chủ đề thay đổi mà không mất dữ liệu | | | |
| TC_NFR_USAB_15 | Responsive — menu mobile không che khuất nội dung — NFR-USAB-1 | Đang dùng viewport mobile (375px) | 1. Mở menu điều hướng<br>2. Đóng menu<br>3. Kiểm tra nội dung phía sau | — | Khi menu mở, nội dung chính có thể bị che hoặc lùi sang; khi đóng menu, nội dung trở lại hiển thị đầy đủ | | | |
| TC_NFR_USAB_16 | Thông báo lỗi server chung hiển thị nội dung rõ ràng — NFR-USAB-4 | Đăng nhập; server trả về lỗi không mong đợi | 1. Thực hiện thao tác gây lỗi server (ví dụ: xóa item không tồn tại) | — | Hiển thị thông báo thân thiện như "Đã xảy ra lỗi, vui lòng thử lại"; không hiển thị màn hình trắng hay mã lỗi kỹ thuật | | | |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
