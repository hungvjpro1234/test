# 📄 SYSTEM TEST — FR-AUTH-3: Đăng Nhập Bằng Google

---

## 🧾 ABOUT

```
- Project Name  : Todo List App
- Module        : FR-AUTH — Xác thực & Quản lý tài khoản
- Feature       : FR-AUTH-3 — Đăng nhập bằng Google
- Version       : 1.0
- Test Type     : System Test (Black-box)
- Author        :
- Create Date   : 2026-03-20
- Pre-conditions:
    1. Ứng dụng đang chạy, trang Đăng nhập có thể truy cập
    2. Chưa đăng nhập
    3. Có sẵn tài khoản Google hợp lệ để test
    4. Kết nối internet ổn định
```

---

## 📊 SUMMARY

```
- Total Test Cases : 7
- Pass             :
- Fail             :
- Untested         :
- N/A              :
```

---

## ✅ CHECKLIST (Customized cho FR-AUTH-3)

- [ ] Nút "Đăng nhập bằng Google" hiển thị trên trang Login/Register
- [ ] Icon Google hiển thị đúng trên nút
- [ ] Nhấn nút → mở cửa sổ xác thực Google
- [ ] Xác thực Google thành công → vào được giao diện chính
- [ ] Hủy xác thực Google → quay lại trang Login, không lỗi
- [ ] Đăng nhập Google lần đầu → tài khoản tự động tạo (nếu chưa tồn tại)
- [ ] Đăng nhập Google với tài khoản đã liên kết → đăng nhập bình thường

---

# 🧪 TEST CASES

## 🔹 UI TEST

| ID | Type | Feature | Description | Steps | Test Data | Expected Result | Actual Result | Test Result | Note |
|----|------|---------|-------------|-------|-----------|-----------------|---------------|-------------|------|
| TC_GOOGLE_01 | UI | Hiển thị nút Google | Nút "Đăng nhập bằng Google" có trên trang Login | 1. Mở trang Đăng nhập | — | Nút "Đăng nhập bằng Google" hiển thị rõ ràng, có icon Google, text đúng | | | |
| TC_GOOGLE_02 | UI | Hiển thị nút Google trên Register | Nút Google cũng có trên trang Đăng ký (nếu có) | 1. Mở trang Đăng ký | — | Nút "Đăng nhập / Đăng ký bằng Google" hiển thị trên trang Đăng ký | | | N/A nếu chỉ có ở trang Login |

---

## 🔹 FUNCTION TEST

| ID | Type | Feature | Description | Steps | Test Data | Expected Result | Actual Result | Test Result | Note |
|----|------|---------|-------------|-------|-----------|-----------------|---------------|-------------|------|
| TC_GOOGLE_03 | Function | Mở cửa sổ Google | Nhấn nút mở popup/redirect xác thực Google | 1. Nhấn nút "Đăng nhập bằng Google" | — | Cửa sổ/tab xác thực của Google mở ra | | | |
| TC_GOOGLE_04 | Function | Đăng nhập Google thành công | Hoàn thành xác thực Google → vào hệ thống | 1. Nhấn "Đăng nhập bằng Google" → 2. Chọn tài khoản Google → 3. Chấp nhận quyền truy cập | Tài khoản Google hợp lệ | Hệ thống xác thực thành công, chuyển vào giao diện chính | | | |
| TC_GOOGLE_05 | Function | Hủy xác thực Google | Người dùng đóng cửa sổ Google hoặc chọn Cancel | 1. Nhấn "Đăng nhập bằng Google" → 2. Đóng popup / nhấn Cancel trên trang Google | — | Hệ thống quay lại trang Đăng nhập, không hiển thị lỗi crash, không bị kẹt màn hình | | | |
| TC_GOOGLE_06 | Function | Lần đầu đăng nhập Google | Tài khoản Google chưa từng dùng trong hệ thống | 1. Nhấn "Đăng nhập bằng Google" → 2. Chọn tài khoản Google chưa đăng ký → 3. Hoàn thành xác thực | Tài khoản Google mới (chưa có trong hệ thống) | Hệ thống tự tạo tài khoản mới liên kết với Google, chuyển vào giao diện chính | | | |

---

## 🔹 BUSINESS FLOW

| ID | Type | Feature | Description | Steps | Test Data | Expected Result | Actual Result | Test Result | Note |
|----|------|---------|-------------|-------|-----------|-----------------|---------------|-------------|------|
| TC_GOOGLE_07 | Business | Redirect sau đăng nhập Google | Sau khi xác thực Google → vào đúng trang Dashboard | 1. Hoàn thành đăng nhập Google thành công | Tài khoản Google hợp lệ | Hệ thống chuyển người dùng vào trang chính (Dashboard), không còn ở trang Login | | | |

---

# 🐞 BUG LIST

```
(Ghi nhận sau khi thực hiện test)
```
