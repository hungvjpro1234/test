## 5.5. Chức năng Tùy chỉnh thông báo

### 5.5.1. Mô tả chức năng

Chức năng Tùy chỉnh thông báo cho phép người dùng kiểm soát việc nhận thông báo theo hai chiều: theo kênh gửi (In-app hoặc Email) và theo danh mục sự kiện (Nhóm, Công việc, Chat, Cuộc họp, Hệ thống). Người dùng có thể bật hoặc tắt từng kết hợp kênh và danh mục theo nhu cầu cá nhân. Cài đặt được lưu bền vững và độc lập theo từng tài khoản; thay đổi cài đặt của người dùng này không ảnh hưởng đến người dùng khác.

---

### 5.5.2. Yêu cầu chức năng

**FR-USER-5-01:** Hệ thống phải cung cấp trang cài đặt thông báo hiển thị đầy đủ: hai kênh (In-app, Email) và năm danh mục (Nhóm, Công việc, Chat, Cuộc họp, Hệ thống) với trạng thái bật/tắt của từng mục.

**FR-USER-5-02:** Trạng thái bật/tắt phải hiển thị rõ ràng và dễ phân biệt (toggle hoặc checkbox).

**FR-USER-5-03:** Hệ thống phải tuân thủ cài đặt kênh: khi kênh In-app bị tắt, người dùng không nhận thông báo trong ứng dụng cho bất kỳ sự kiện nào; khi kênh Email bị tắt, người dùng không nhận email thông báo.

**FR-USER-5-04:** Hệ thống phải tuân thủ cài đặt danh mục: khi một danh mục bị tắt, người dùng không nhận thông báo từ danh mục đó qua bất kỳ kênh nào đang được bật.

**FR-USER-5-05:** Tắt một danh mục không được ảnh hưởng đến các danh mục khác đang được bật; mỗi danh mục hoạt động độc lập.

**FR-USER-5-06:** Mọi thay đổi cài đặt phải được lưu bền vững; vẫn giữ nguyên sau khi tải lại trang hoặc đăng xuất/đăng nhập lại.

**FR-USER-5-07:** Cài đặt thông báo của mỗi tài khoản phải độc lập; thay đổi của người dùng này không ảnh hưởng đến cài đặt của người dùng khác.

---

### 5.5.3. Đặc tả Use Case

**Tên Use Case:** Tùy chỉnh cài đặt thông báo cá nhân  
**Mã Use Case:** UC-USER-NOTIFSET-01

**Mô tả:**  
Người dùng truy cập trang cài đặt thông báo để bật hoặc tắt nhận thông báo theo kênh gửi và theo danh mục sự kiện. Hệ thống lưu cài đặt và áp dụng cho các thông báo tiếp theo.

**Tác nhân chính:**  
Người dùng đã đăng nhập

**Tiền điều kiện:**
- Người dùng đã đăng nhập thành công.
- Người dùng đang ở trang cài đặt thông báo (Notification Settings).

**Kích hoạt:**  
Người dùng nhấn toggle/checkbox để bật hoặc tắt một kênh thông báo hoặc một danh mục thông báo.

**Hậu điều kiện:**
- Cài đặt mới được lưu và áp dụng ngay cho tài khoản.
- Các thông báo tiếp theo chỉ được gửi theo các kênh và danh mục đang được bật.

#### a. Luồng chính (Basic Flow) — Tắt kênh thông báo
1. Người dùng mở trang cài đặt thông báo.
2. Hệ thống hiển thị danh sách kênh (In-app, Email) và danh mục (Nhóm, Công việc, Chat, Cuộc họp, Hệ thống) với trạng thái hiện tại.
3. Người dùng nhấn toggle để tắt một kênh (ví dụ: tắt kênh Email).
4. Hệ thống lưu thay đổi ngay lập tức.
5. Từ thời điểm này trở đi, hệ thống không gửi thông báo qua kênh vừa tắt cho bất kỳ sự kiện nào.

#### b. Luồng thay thế (Alternative Flow)

**AF-01: Tắt một danh mục thông báo**
1. Người dùng nhấn toggle để tắt một danh mục (ví dụ: tắt danh mục Công việc).
2. Hệ thống lưu thay đổi ngay lập tức.
3. Các sự kiện liên quan đến danh mục vừa tắt không còn tạo ra thông báo cho người dùng.
4. Các danh mục khác đang được bật hoạt động bình thường.

**AF-02: Bật lại kênh hoặc danh mục đã tắt**
1. Người dùng nhấn toggle để bật lại kênh hoặc danh mục đã tắt trước đó.
2. Hệ thống lưu thay đổi ngay lập tức.
3. Thông báo cho kênh/danh mục đó được gửi trở lại cho các sự kiện tiếp theo.

#### c. Luồng ngoại lệ (Exception Flow)

**EF-01: Lỗi khi lưu cài đặt**
1. Người dùng thay đổi một toggle.
2. Xảy ra lỗi hệ thống khi lưu (lỗi mạng, lỗi server).
3. Hệ thống hiển thị thông báo lỗi chung; cài đặt không được lưu bền vững.
4. Toggle có thể tự động trở về trạng thái cũ (rollback UI) để tránh gây nhầm lẫn.

---

### 5.5.4. Dữ liệu vào
- Trạng thái bật/tắt của kênh In-app
- Trạng thái bật/tắt của kênh Email
- Trạng thái bật/tắt của từng danh mục: Nhóm, Công việc, Chat, Cuộc họp, Hệ thống

### 5.5.5. Dữ liệu ra
- Cài đặt được lưu theo tài khoản người dùng
- Thông báo tiếp theo chỉ được gửi theo kênh và danh mục đang được bật
- Thông báo thành công (ngầm hoặc hiện) khi cài đặt được lưu

---

### 5.5.6. Quy tắc nghiệp vụ
- Hai kênh thông báo độc lập nhau: có thể bật/tắt từng kênh riêng lẻ mà không ảnh hưởng kênh kia.
- Năm danh mục thông báo độc lập nhau: tắt một danh mục không ảnh hưởng đến các danh mục khác.
- Điều kiện để người dùng nhận được thông báo: cả kênh VÀ danh mục tương ứng đều phải được bật.
- Cài đặt thông báo chỉ áp dụng cho các sự kiện xảy ra SAU khi thay đổi; không ảnh hưởng thông báo đã tạo trước đó.
- Cài đặt được lưu bền vững và độc lập theo từng tài khoản.

---

### 5.5.7. Điều kiện tiền đề và ràng buộc
- Người dùng phải đang trong trạng thái đăng nhập hợp lệ.
- Cơ sở dữ liệu phải truy cập được để lưu cài đặt.
- Hệ thống gửi thông báo (in-app và email) phải đọc cài đặt của từng người dùng trước khi gửi.

---

### 5.5.8. Mức độ ưu tiên
**Mức độ ưu tiên: Trung bình**

**Lý do:**  
Tùy chỉnh thông báo giúp người dùng tránh bị làm phiền bởi thông báo không liên quan, cải thiện trải nghiệm sử dụng. Hệ thống vẫn hoạt động đúng khi tất cả thông báo được bật mặc định; đây là tính năng nâng cao trải nghiệm.

---

### 5.5.9. Tiêu chí chấp nhận
- Trang cài đặt hiển thị đầy đủ 2 kênh và 5 danh mục với trạng thái bật/tắt rõ ràng.
- Tắt kênh In-app → không nhận thông báo trong ứng dụng; số đếm thông báo không tăng.
- Bật lại kênh In-app → nhận thông báo trở lại bình thường.
- Tắt kênh Email → không nhận email thông báo.
- Tắt danh mục Công việc → không nhận thông báo liên quan đến công việc.
- Tắt danh mục Nhóm → không nhận thông báo liên quan đến nhóm.
- Tắt một danh mục → các danh mục khác không bị ảnh hưởng.
- Cài đặt được lưu sau reload trang.
- Cài đặt được lưu sau đăng xuất/đăng nhập lại.
- Cài đặt của User A không ảnh hưởng đến cài đặt của User B.

---

### 5.5.10. Ghi chú
- Các test case tham chiếu: `TC_NOTIFSET_01` đến `TC_NOTIFSET_14` (file `TC_USER_NOTIF_SETTINGS.md`).
- `TC_NOTIFSET_04` và `TC_NOTIFSET_05` xác nhận kênh In-app hoạt động đúng khi tắt/bật.
- `TC_NOTIFSET_06` và `TC_NOTIFSET_07` kiểm tra kênh Email — cần truy cập hộp thư để xác minh.
- `TC_NOTIFSET_11` xác nhận tính độc lập giữa các danh mục.
- `TC_NOTIFSET_14` xác nhận cài đặt độc lập theo từng tài khoản.
- Lưu ý: các test case liên quan đến kênh Email cần môi trường test có thể nhận email thực tế.
