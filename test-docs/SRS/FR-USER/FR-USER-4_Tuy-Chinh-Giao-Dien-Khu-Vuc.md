## 5.4. Chức năng Tùy chỉnh giao diện & khu vực

### 5.4.1. Mô tả chức năng

Chức năng Tùy chỉnh giao diện & khu vực cho phép người dùng cá nhân hóa trải nghiệm sử dụng thông qua các thiết lập: ngôn ngữ hiển thị (Tiếng Việt hoặc Tiếng Anh), chủ đề màu sắc giao diện (Sáng, Tối, hoặc Tự động theo hệ điều hành), múi giờ và định dạng ngày tháng. Tất cả thay đổi được áp dụng ngay lập tức trên toàn bộ giao diện, lưu bền vững và độc lập theo từng tài khoản.

---

### 5.4.2. Yêu cầu chức năng

**FR-USER-4-01:** Hệ thống phải cung cấp trang cài đặt với đầy đủ các tùy chọn: Ngôn ngữ, Giao diện (Sáng/Tối/Tự động), Múi giờ, Định dạng ngày.

**FR-USER-4-02:** Trang cài đặt phải hiển thị giá trị đang được áp dụng của mỗi tùy chọn.

**FR-USER-4-03:** Hệ thống phải hỗ trợ hai ngôn ngữ: Tiếng Anh và Tiếng Việt; chuyển ngôn ngữ phải áp dụng ngay lập tức cho toàn bộ giao diện mà không cần tải lại trang.

**FR-USER-4-04:** Hệ thống phải hỗ trợ ba chủ đề: Sáng (Light), Tối (Dark) và Tự động (Auto theo cài đặt hệ điều hành); chuyển chủ đề phải áp dụng ngay lập tức.

**FR-USER-4-05:** Hệ thống phải cho phép người dùng chọn múi giờ; tất cả thời gian hiển thị trong hệ thống phải theo múi giờ đã chọn.

**FR-USER-4-06:** Hệ thống phải cho phép người dùng chọn định dạng ngày tháng ưa thích; tất cả ngày tháng trong hệ thống phải hiển thị theo định dạng đã chọn.

**FR-USER-4-07:** Mọi tùy chỉnh phải được lưu bền vững; vẫn giữ nguyên sau khi tải lại trang hoặc đăng xuất/đăng nhập lại.

**FR-USER-4-08:** Cài đặt của mỗi tài khoản phải độc lập; thay đổi của người dùng này không ảnh hưởng đến người dùng khác.

---

### 5.4.3. Đặc tả Use Case

**Tên Use Case:** Tùy chỉnh giao diện và cài đặt khu vực  
**Mã Use Case:** UC-USER-PREF-01

**Mô tả:**  
Người dùng truy cập trang cài đặt để thay đổi ngôn ngữ hiển thị, chủ đề giao diện, múi giờ hoặc định dạng ngày. Hệ thống áp dụng thay đổi ngay lập tức và lưu cài đặt theo từng tài khoản.

**Tác nhân chính:**  
Người dùng đã đăng nhập

**Tiền điều kiện:**
- Người dùng đã đăng nhập thành công.
- Người dùng đang ở trang Cài đặt (Settings/Preferences).

**Kích hoạt:**  
Người dùng chọn một giá trị mới cho bất kỳ tùy chọn nào (Ngôn ngữ, Giao diện, Múi giờ, Định dạng ngày).

**Hậu điều kiện:**
- Tùy chỉnh mới được lưu và áp dụng ngay cho tài khoản.
- Toàn bộ giao diện phản ánh thay đổi tương ứng.

#### a. Luồng chính (Basic Flow) — Thay đổi ngôn ngữ
1. Người dùng mở trang Cài đặt.
2. Hệ thống hiển thị trang cài đặt với các tùy chọn hiện tại (Ngôn ngữ, Giao diện, Múi giờ, Định dạng ngày).
3. Người dùng chọn giá trị ngôn ngữ mới (ví dụ: Tiếng Việt).
4. Hệ thống lưu lựa chọn và áp dụng ngôn ngữ mới ngay lập tức.
5. Toàn bộ nhãn, menu, nút bấm và nội dung giao diện chuyển sang ngôn ngữ được chọn mà không cần tải lại trang.

#### b. Luồng thay thế (Alternative Flow)

**AF-01: Thay đổi chủ đề giao diện**
1. Người dùng chọn chủ đề mới (Sáng, Tối hoặc Tự động).
2. Hệ thống lưu lựa chọn và áp dụng chủ đề ngay lập tức trên toàn bộ giao diện.

**AF-02: Thay đổi múi giờ**
1. Người dùng chọn múi giờ mới từ danh sách.
2. Hệ thống lưu lựa chọn.
3. Tất cả thời gian hiển thị trong hệ thống (thời gian tạo task, thông báo…) được quy đổi và hiển thị theo múi giờ mới.

**AF-03: Thay đổi định dạng ngày**
1. Người dùng chọn định dạng ngày mới (ví dụ: DD/MM/YYYY hoặc MM/DD/YYYY).
2. Hệ thống lưu lựa chọn.
3. Tất cả ngày tháng trong hệ thống hiển thị theo định dạng mới.

#### c. Luồng ngoại lệ (Exception Flow)

*(Chức năng này chủ yếu là chọn từ danh sách định sẵn nên ít có luồng ngoại lệ dữ liệu. Trường hợp lỗi hệ thống khi lưu:)*

**EF-01: Lỗi khi lưu tùy chỉnh**
1. Người dùng thay đổi một tùy chọn.
2. Xảy ra lỗi hệ thống khi lưu (lỗi mạng, lỗi server).
3. Hệ thống hiển thị thông báo lỗi chung; tùy chỉnh không được lưu bền vững (có thể áp dụng tạm thời trên UI nhưng mất sau reload).

---

### 5.4.4. Dữ liệu vào
- Ngôn ngữ được chọn (Tiếng Anh hoặc Tiếng Việt)
- Chủ đề giao diện được chọn (Sáng, Tối hoặc Tự động)
- Múi giờ được chọn (ví dụ: Asia/Ho_Chi_Minh — UTC+7)
- Định dạng ngày được chọn (ví dụ: DD/MM/YYYY, MM/DD/YYYY, YYYY-MM-DD)

### 5.4.5. Dữ liệu ra
- Giao diện áp dụng ngay lập tức thay đổi ngôn ngữ / chủ đề / múi giờ / định dạng ngày
- Cài đặt được lưu bền vững theo tài khoản người dùng

---

### 5.4.6. Quy tắc nghiệp vụ
- Hệ thống hỗ trợ đúng hai ngôn ngữ: Tiếng Anh (en) và Tiếng Việt (vi).
- Hệ thống hỗ trợ ba chủ đề: Sáng (light), Tối (dark), Tự động (auto).
- Chủ đề Tự động theo cài đặt sáng/tối của hệ điều hành thiết bị người dùng.
- Mọi thay đổi được áp dụng ngay lập tức; không cần nhấn nút Lưu riêng (hoặc lưu ngay khi chọn).
- Cài đặt riêng biệt theo từng tài khoản; không ảnh hưởng giữa các tài khoản khác nhau.
- Cài đặt được lưu bền vững: giữ nguyên sau khi tải lại trang và sau khi đăng xuất/đăng nhập lại.

---

### 5.4.7. Điều kiện tiền đề và ràng buộc
- Người dùng phải đang trong trạng thái đăng nhập hợp lệ.
- Cơ sở dữ liệu phải truy cập được để lưu cài đặt người dùng.
- Tính năng chủ đề Tự động phụ thuộc vào khả năng phát hiện cài đặt hệ điều hành của trình duyệt.

---

### 5.4.8. Mức độ ưu tiên
**Mức độ ưu tiên: Trung bình**

**Lý do:**  
Tùy chỉnh ngôn ngữ và chủ đề giao diện ảnh hưởng trực tiếp đến trải nghiệm người dùng và là yêu cầu phi chức năng NFR-USAB-2 và NFR-USAB-3. Cần triển khai để đáp ứng tiêu chí NFR nhưng không chặn luồng nghiệp vụ chính.

---

### 5.4.9. Tiêu chí chấp nhận
- Chọn Tiếng Việt → toàn bộ giao diện chuyển sang tiếng Việt ngay lập tức.
- Chọn Tiếng Anh → toàn bộ giao diện chuyển sang tiếng Anh ngay lập tức.
- Chọn chủ đề Tối → UI chuyển sang dark mode ngay, không cần reload.
- Chọn chủ đề Sáng → UI chuyển sang light mode ngay, không cần reload.
- Chọn chủ đề Tự động → UI theo cài đặt dark/light của hệ điều hành thiết bị.
- Chọn múi giờ mới → thời gian trong hệ thống hiển thị theo múi giờ mới.
- Chọn định dạng ngày mới → ngày tháng hiển thị theo định dạng mới.
- Reload trang → tất cả tùy chỉnh vẫn được giữ.
- Đăng xuất → đăng nhập lại → tất cả tùy chỉnh vẫn được giữ.
- Cài đặt của User A không ảnh hưởng đến cài đặt của User B.

---

### 5.4.10. Ghi chú
- Các test case tham chiếu: `TC_PREF_01` đến `TC_PREF_14` (file `TC_USER_PREFERENCES.md`).
- `TC_PREF_08` kiểm tra chủ đề Tự động — kết quả phụ thuộc hệ điều hành và trình duyệt.
- `TC_PREF_13` xác nhận cài đặt của từng tài khoản độc lập nhau.
- `TC_PREF_14` kiểm tra chủ đề Auto theo OS — có thể khó kiểm soát trong môi trường test.
- Liên quan đến NFR-USAB-2 (hỗ trợ Sáng/Tối/Tự động) và NFR-USAB-3 (đa ngôn ngữ).
