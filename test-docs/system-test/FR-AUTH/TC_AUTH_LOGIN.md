# 📄 SYSTEM TEST — FR-AUTH-2: Đăng Nhập

---

## 🧾 ABOUT

```
- Project Name  : Todo List App
- Module        : FR-AUTH — Xác thực & Quản lý tài khoản
- Feature       : FR-AUTH-2 — Đăng nhập
- Version       : 1.0
- Test Type     : System Test (Black-box)
- Author        :
- Create Date   : 2026-03-20
- Pre-conditions:
    1. Ứng dụng đang chạy, trang Đăng nhập có thể truy cập
    2. Chưa đăng nhập
    3. Tài khoản test sẵn có:
       - active@test.com / Abc@1234       → tài khoản hợp lệ, đang hoạt động
       - locked@test.com / Abc@1234       → tài khoản đã bị Admin khóa
```

---

## 📊 SUMMARY

```
- Total Test Cases : 22
- Pass             :
- Fail             :
- Untested         :
- N/A              :
```

---

## ✅ CHECKLIST (Customized cho FR-AUTH-2)

- [ ] Form hiển thị đúng 2 trường: Email, Mật khẩu
- [ ] Mật khẩu hiển thị dạng ẩn (***)
- [ ] Toggle hiển thị/ẩn mật khẩu (nếu có)
- [ ] Link "Quên mật khẩu?" hoạt động
- [ ] Link "Chưa có tài khoản? Đăng ký" hoạt động
- [ ] Đăng nhập thành công → chuyển vào giao diện chính
- [ ] Sai mật khẩu → hiển thị thông báo lỗi, không vào được
- [ ] Email chưa đăng ký → hiển thị thông báo lỗi
- [ ] Tài khoản bị khóa → hiển thị thông báo bị khóa
- [ ] Bỏ trống trường → hiển thị lỗi từng trường
- [ ] Sau đăng nhập → session hợp lệ (truy cập được trang protected)
- [ ] Chưa đăng nhập → redirect về trang login khi vào trang protected
- [ ] Lịch sử đăng nhập được ghi lại (Admin có thể xem)
- [ ] UI không vỡ khi resize

---

# 🧪 TEST CASES

## 🔹 UI TEST

| ID | Type | Feature | Description | Steps | Test Data | Expected Result | Actual Result | Test Result | Note |
|----|------|---------|-------------|-------|-----------|-----------------|---------------|-------------|------|
| TC_LOGIN_01 | UI | Hiển thị form | Kiểm tra form đăng nhập hiển thị đầy đủ | 1. Mở trang Đăng nhập | — | Hiển thị đủ: trường Email, trường Mật khẩu, nút "Đăng nhập", link "Quên mật khẩu?", link "Chưa có tài khoản? Đăng ký" | | | |
| TC_LOGIN_02 | UI | Ẩn mật khẩu | Trường mật khẩu hiển thị dạng ẩn | 1. Nhập ký tự vào ô Mật khẩu | `Abc@1234` | Ký tự hiển thị dạng *** | | | |
| TC_LOGIN_03 | UI | Toggle mật khẩu | Nút hiện/ẩn mật khẩu hoạt động | 1. Nhập mật khẩu → 2. Nhấn icon mắt (nếu có) | `Abc@1234` | Mật khẩu chuyển từ *** sang văn bản và ngược lại | | | |
| TC_LOGIN_04 | UI | Link Quên mật khẩu | Link dẫn đến trang Quên mật khẩu | 1. Nhấn "Quên mật khẩu?" | — | Chuyển đến trang Quên mật khẩu | | | |
| TC_LOGIN_05 | UI | Link Đăng ký | Link dẫn đến trang Đăng ký | 1. Nhấn "Chưa có tài khoản? Đăng ký" | — | Chuyển đến trang Đăng ký | | | |
| TC_LOGIN_06 | UI | Responsive | UI không vỡ khi thay đổi kích thước | 1. Resize trình duyệt → kéo nhỏ dần | — | Form luôn hiển thị đầy đủ, không bị tràn | | | |

---

## 🔹 VALIDATION

| ID | Type | Feature | Description | Steps | Test Data | Expected Result | Actual Result | Test Result | Note |
|----|------|---------|-------------|-------|-----------|-----------------|---------------|-------------|------|
| TC_LOGIN_07 | Validate | Email — bỏ trống | Kiểm tra khi để trống Email | 1. Để trống Email → 2. Nhập mật khẩu bất kỳ → 3. Nhấn Đăng nhập | Email: _(trống)_, MK: `Abc@1234` | Hệ thống hiển thị thông báo lỗi tại trường Email, không đăng nhập | | | |
| TC_LOGIN_08 | Validate | Mật khẩu — bỏ trống | Kiểm tra khi để trống Mật khẩu | 1. Nhập email bất kỳ → 2. Để trống Mật khẩu → 3. Nhấn Đăng nhập | Email: `active@test.com`, MK: _(trống)_ | Hệ thống hiển thị thông báo lỗi tại trường Mật khẩu, không đăng nhập | | | |
| TC_LOGIN_09 | Validate | Tất cả — bỏ trống | Kiểm tra khi để trống cả 2 trường | 1. Không nhập gì → 2. Nhấn Đăng nhập | Tất cả _(trống)_ | Hệ thống hiển thị thông báo lỗi tại cả 2 trường, không đăng nhập | | | |

---

## 🔹 FUNCTION TEST

| ID | Type | Feature | Description | Steps | Test Data | Expected Result | Actual Result | Test Result | Note |
|----|------|---------|-------------|-------|-----------|-----------------|---------------|-------------|------|
| TC_LOGIN_10 | Function | Đăng nhập thành công | Đăng nhập với credentials đúng | 1. Nhập đúng email → 2. Nhập đúng mật khẩu → 3. Nhấn "Đăng nhập" | Email: `active@test.com`, MK: `Abc@1234` | Hệ thống xác thực thành công, chuyển vào giao diện chính | | | |
| TC_LOGIN_11 | Function | Sai mật khẩu | Đăng nhập với mật khẩu sai | 1. Nhập đúng email → 2. Nhập sai mật khẩu → 3. Nhấn Đăng nhập | Email: `active@test.com`, MK: `WrongPass@99` | Hệ thống hiển thị thông báo lỗi, không vào được giao diện chính | | | |
| TC_LOGIN_12 | Function | Email chưa đăng ký | Đăng nhập với email không tồn tại | 1. Nhập email chưa đăng ký → 2. Nhập mật khẩu bất kỳ → 3. Nhấn Đăng nhập | Email: `notexist@test.com`, MK: `Abc@1234` | Hệ thống hiển thị thông báo lỗi, không vào được | | | |
| TC_LOGIN_13 | Function | Tài khoản bị khóa | Đăng nhập khi tài khoản bị Admin khóa | 1. Nhập email tài khoản đã bị khóa → 2. Nhập đúng mật khẩu → 3. Nhấn Đăng nhập | Email: `locked@test.com`, MK: `Abc@1234` | Hệ thống hiển thị thông báo tài khoản đã bị khóa, không vào được | | | |
| TC_LOGIN_14 | Function | Sai email + đúng MK | Đăng nhập với email không tồn tại nhưng mật khẩu đúng của người khác | 1. Nhập email không tồn tại → 2. Nhập mật khẩu của `active@test.com` → 3. Nhấn Đăng nhập | Email: `notexist@test.com`, MK: `Abc@1234` | Hệ thống hiển thị thông báo lỗi, không vào được | | | |
| TC_LOGIN_15 | Function | Sai cả email lẫn MK | Đăng nhập với cả hai trường đều sai | 1. Nhập email sai → 2. Nhập mật khẩu sai → 3. Nhấn Đăng nhập | Email: `wrong@test.com`, MK: `WrongPass@00` | Hệ thống hiển thị thông báo lỗi, không vào được | | | |
| TC_LOGIN_16 | Function | Phân biệt hoa/thường email | Kiểm tra email có phân biệt hoa thường không | 1. Nhập email với chữ in hoa → 2. Nhập đúng mật khẩu → 3. Nhấn Đăng nhập | Email: `ACTIVE@TEST.COM`, MK: `Abc@1234` | Hệ thống nhận ra email (không phân biệt hoa thường) và đăng nhập thành công | | | |
| TC_LOGIN_17 | Function | Phân biệt hoa/thường mật khẩu | Kiểm tra mật khẩu phân biệt hoa thường | 1. Nhập đúng email → 2. Nhập mật khẩu đúng nhưng đổi hoa/thường → 3. Nhấn Đăng nhập | Email: `active@test.com`, MK: `abc@1234` (đổi A→a) | Hệ thống hiển thị thông báo lỗi (mật khẩu phân biệt hoa thường) | | | |

---

## 🔹 BUSINESS FLOW

| ID | Type | Feature | Description | Steps | Test Data | Expected Result | Actual Result | Test Result | Note |
|----|------|---------|-------------|-------|-----------|-----------------|---------------|-------------|------|
| TC_LOGIN_18 | Business | Redirect sau đăng nhập | Sau đăng nhập thành công → chuyển đúng trang | 1. Đăng nhập với credentials hợp lệ | Email: `active@test.com`, MK: `Abc@1234` | Hệ thống chuyển sang giao diện chính (Dashboard), không còn ở trang Login | | | |
| TC_LOGIN_19 | Business | Chặn truy cập khi chưa đăng nhập | Người dùng chưa đăng nhập không vào được trang protected | 1. Không đăng nhập → 2. Truy cập trực tiếp URL trang Dashboard | URL Dashboard (ví dụ: `/dashboard`) | Hệ thống tự chuyển hướng về trang Đăng nhập | | | |
| TC_LOGIN_20 | Business | Thông tin user hiển thị sau đăng nhập | Tên/avatar của người dùng hiển thị đúng trên UI | 1. Đăng nhập thành công → 2. Quan sát thanh điều hướng hoặc góc trên cùng | Email: `active@test.com` | Tên của người dùng hiển thị đúng trên giao diện (không phải email của người khác) | | | |
| TC_LOGIN_21 | Business | Phiên làm việc hợp lệ sau đăng nhập | Sau đăng nhập có thể truy cập các tính năng cần xác thực | 1. Đăng nhập thành công → 2. Thử truy cập trang Quản lý công việc → 3. Thử tạo một task | Email: `active@test.com`, MK: `Abc@1234` | Người dùng truy cập và thao tác bình thường (không bị redirect về Login) | | | |

---

## 🔹 DATABASE

| ID | Type | Feature | Description | Steps | Test Data | Expected Result | Actual Result | Test Result | Note |
|----|------|---------|-------------|-------|-----------|-----------------|---------------|-------------|------|
| TC_LOGIN_22 | Database | Lịch sử đăng nhập được ghi lại | Admin có thể xem lịch sử đăng nhập | 1. Đăng nhập với `active@test.com` → 2. Đăng xuất → 3. Đăng nhập bằng tài khoản Admin → 4. Vào trang Admin > Lịch sử đăng nhập | — | Trong lịch sử xuất hiện bản ghi đăng nhập thành công của `active@test.com` với thông tin thời gian | | | |

---

# 🐞 BUG LIST

```
(Ghi nhận sau khi thực hiện test)
```
