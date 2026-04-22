# 📄 SYSTEM TEST — FR-AUTH-4: Quên Mật Khẩu

---

## 🧾 ABOUT

```
- Project Name  : Todo List App
- Module        : FR-AUTH — Xác thực & Quản lý tài khoản
- Feature       : FR-AUTH-4 — Quên mật khẩu / Đặt lại mật khẩu
- Version       : 1.0
- Test Type     : System Test (Black-box)
- Author        :
- Create Date   : 2026-03-20
- Pre-conditions:
    1. Ứng dụng đang chạy
    2. Chưa đăng nhập
    3. Tài khoản test sẵn có:
       - registered@test.com / OldPass@1234   → tài khoản hợp lệ, email thực có thể nhận thư
    4. Có thể truy cập hộp thư email của registered@test.com để lấy mã xác nhận
```

---

## 📊 SUMMARY

```
- Total Test Cases : 21
- Pass             :
- Fail             :
- Untested         :
- N/A              :
```

---

## ✅ CHECKLIST (Customized cho FR-AUTH-4)

- [ ] Trang Quên mật khẩu có trường Email và nút Gửi
- [ ] Nhập email đã đăng ký → hệ thống gửi email và thông báo thành công
- [ ] Nhập email chưa đăng ký → hiển thị thông báo lỗi, không gửi
- [ ] Nhập email sai định dạng → hiển thị thông báo lỗi
- [ ] Bỏ trống email → hiển thị thông báo lỗi
- [ ] Nhập đúng mã xác nhận → cho phép đặt mật khẩu mới
- [ ] Nhập sai mã → hiển thị thông báo lỗi
- [ ] Nhập mã hết hạn → hiển thị thông báo lỗi
- [ ] Mật khẩu mới không đủ điều kiện → hiển thị thông báo lỗi
- [ ] Đặt lại thành công → chuyển về trang Login
- [ ] Đăng nhập với mật khẩu mới → thành công
- [ ] Đăng nhập với mật khẩu cũ sau khi đặt lại → thất bại
- [ ] UI 3 bước: nhập email → nhập mã → nhập MK mới (nếu có phân bước)

---

# 🧪 TEST CASES

## 🔹 UI TEST

| ID | Type | Feature | Description | Steps | Test Data | Expected Result | Actual Result | Test Result | Note |
|----|------|---------|-------------|-------|-----------|-----------------|---------------|-------------|------|
| TC_FP_01 | UI | Hiển thị trang Quên mật khẩu | Trang có trường Email và nút Gửi | 1. Mở trang Đăng nhập → 2. Nhấn "Quên mật khẩu?" | — | Hiển thị form nhập email, nút "Gửi", có thể có link quay lại trang Đăng nhập | | | |
| TC_FP_02 | UI | Hiển thị bước nhập mã | Sau khi gửi email → hiển thị form nhập mã xác nhận | 1. Nhập email hợp lệ → 2. Nhấn Gửi → 3. Quan sát màn hình tiếp theo | Email: `registered@test.com` | Hiển thị màn hình nhập mã xác nhận, có hướng dẫn kiểm tra email | | | |
| TC_FP_03 | UI | Hiển thị bước nhập mật khẩu mới | Sau khi xác nhận mã → hiển thị form đặt MK mới | 1. Nhập mã đúng → 2. Quan sát màn hình tiếp theo | Mã đúng từ email | Hiển thị màn hình nhập mật khẩu mới (có thể có xác nhận lại mật khẩu) | | | |
| TC_FP_04 | UI | Responsive | UI không vỡ khi resize | 1. Resize trình duyệt trên trang Quên mật khẩu | — | Form luôn hiển thị đầy đủ, không bị tràn | | | |

---

## 🔹 VALIDATION

| ID | Type | Feature | Description | Steps | Test Data | Expected Result | Actual Result | Test Result | Note |
|----|------|---------|-------------|-------|-----------|-----------------|---------------|-------------|------|
| TC_FP_05 | Validate | Email — bỏ trống | Kiểm tra khi bỏ trống trường email | 1. Để trống Email → 2. Nhấn Gửi | Email: _(trống)_ | Hệ thống hiển thị thông báo lỗi tại trường Email, không gửi | | | |
| TC_FP_06 | Validate | Email — sai định dạng | Kiểm tra email không hợp lệ | 1. Nhập email sai format → 2. Nhấn Gửi | Email: `testmail` | Hệ thống hiển thị thông báo lỗi "Email không hợp lệ", không gửi | | | |
| TC_FP_07 | Validate | Mã xác nhận — bỏ trống | Kiểm tra khi không nhập mã | 1. Đến bước nhập mã → 2. Để trống → 3. Nhấn xác nhận | Mã: _(trống)_ | Hệ thống hiển thị thông báo lỗi, không cho tiếp tục | | | |
| TC_FP_08 | Validate | Mật khẩu mới — bỏ trống | Kiểm tra khi bỏ trống mật khẩu mới | 1. Đến bước nhập MK mới → 2. Để trống → 3. Nhấn Lưu | MK mới: _(trống)_ | Hệ thống hiển thị thông báo lỗi, không cập nhật | | | |
| TC_FP_09 | Validate | Mật khẩu mới — dưới 8 ký tự | MK mới quá ngắn | 1. Đến bước nhập MK mới → 2. Nhập MK < 8 ký tự → 3. Nhấn Lưu | MK mới: `Ab@12` | Hệ thống hiển thị thông báo lỗi yêu cầu MK tối thiểu 8 ký tự | | | |
| TC_FP_10 | Validate | Mật khẩu mới — thiếu chữ hoa | MK mới không có chữ hoa | 1. Nhập MK không có chữ hoa → 2. Nhấn Lưu | MK mới: `abc@1234` | Hệ thống hiển thị thông báo lỗi yêu cầu ít nhất 1 chữ hoa | | | |
| TC_FP_11 | Validate | Mật khẩu mới — thiếu ký tự đặc biệt | MK mới không có ký tự đặc biệt | 1. Nhập MK không có ký tự đặc biệt → 2. Nhấn Lưu | MK mới: `Abcde123` | Hệ thống hiển thị thông báo lỗi yêu cầu ít nhất 1 ký tự đặc biệt | | | |

---

## 🔹 FUNCTION TEST

| ID | Type | Feature | Description | Steps | Test Data | Expected Result | Actual Result | Test Result | Note |
|----|------|---------|-------------|-------|-----------|-----------------|---------------|-------------|------|
| TC_FP_12 | Function | Gửi mã thành công | Email hợp lệ → hệ thống gửi email thành công | 1. Nhập email đã đăng ký → 2. Nhấn Gửi | Email: `registered@test.com` | Hệ thống hiển thị thông báo thành công (ví dụ: "Mã xác nhận đã được gửi đến email của bạn") và email có mã | | | |
| TC_FP_13 | Function | Email chưa đăng ký | Nhập email không tồn tại trong hệ thống | 1. Nhập email chưa đăng ký → 2. Nhấn Gửi | Email: `notexist@test.com` | Hệ thống hiển thị thông báo lỗi, không gửi email | | | |
| TC_FP_14 | Function | Xác nhận mã đúng | Nhập đúng mã nhận được qua email | 1. Vào hộp thư → lấy mã → 2. Nhập đúng mã → 3. Nhấn xác nhận | Mã đúng lấy từ email | Hệ thống chấp nhận mã, chuyển sang bước nhập mật khẩu mới | | | |
| TC_FP_15 | Function | Xác nhận mã sai | Nhập sai mã xác nhận | 1. Nhập mã sai → 2. Nhấn xác nhận | Mã: `000000` (sai) | Hệ thống hiển thị thông báo "Mã xác nhận không hợp lệ", không cho tiếp tục | | | |
| TC_FP_16 | Function | Mã đã hết hạn | Nhập mã xác nhận đã hết hạn | 1. Yêu cầu gửi mã → 2. Chờ mã hết hạn → 3. Nhập mã vừa hết hạn | Mã từ email (đã hết hạn theo thời gian hệ thống) | Hệ thống hiển thị thông báo "Mã xác nhận đã hết hạn", không cho tiếp tục | | | Cần biết thời gian hết hạn của mã |
| TC_FP_17 | Function | Đặt mật khẩu mới thành công | Nhập mật khẩu mới đủ điều kiện | 1. Nhập mã đúng → 2. Nhập MK mới hợp lệ → 3. Nhấn Lưu | MK mới: `NewPass@2026` | Hệ thống cập nhật mật khẩu, hiển thị thông báo thành công | | | |

---

## 🔹 BUSINESS FLOW

| ID | Type | Feature | Description | Steps | Test Data | Expected Result | Actual Result | Test Result | Note |
|----|------|---------|-------------|-------|-----------|-----------------|---------------|-------------|------|
| TC_FP_18 | Business | Redirect sau đặt lại MK | Sau khi đặt lại MK thành công → về trang Đăng nhập | 1. Hoàn thành đặt lại mật khẩu | MK mới: `NewPass@2026` | Hệ thống chuyển người dùng về trang Đăng nhập | | | |
| TC_FP_19 | Business | Đăng nhập với MK mới | Xác nhận MK mới hoạt động | 1. Đặt lại MK thành công → 2. Đăng nhập với MK mới | Email: `registered@test.com`, MK mới: `NewPass@2026` | Đăng nhập thành công, vào được giao diện chính | | | |
| TC_FP_20 | Business | MK cũ không còn dùng được | Sau khi đặt lại, MK cũ bị vô hiệu | 1. Đặt lại MK thành công → 2. Thử đăng nhập với MK cũ | Email: `registered@test.com`, MK cũ: `OldPass@1234` | Hệ thống hiển thị thông báo lỗi "Thông tin đăng nhập không hợp lệ", không vào được | | | |
| TC_FP_21 | Business | Mã chỉ dùng được một lần | Mã xác nhận không thể dùng lại sau khi đã đặt lại MK | 1. Đặt lại MK thành công với mã X → 2. Thử dùng lại mã X để đặt lại lần nữa | Mã đã dùng | Hệ thống hiển thị thông báo lỗi "Mã không hợp lệ hoặc đã được sử dụng" | | | |

---

# 🐞 BUG LIST

```
(Ghi nhận sau khi thực hiện test)
```
