# 📄 SYSTEM TEST — FR-AUTH-5: Đăng Xuất

---

## 🧾 ABOUT

```
- Project Name  : Todo List App
- Module        : FR-AUTH — Xác thực & Quản lý tài khoản
- Feature       : FR-AUTH-5 — Đăng xuất
- Version       : 1.0
- Test Type     : System Test (Black-box)
- Author        :
- Create Date   : 2026-03-20
- Pre-conditions:
    1. Ứng dụng đang chạy
    2. Đã đăng nhập với tài khoản: active@test.com / Abc@1234
```

---

## 📊 SUMMARY

```
- Total Test Cases : 9
- Pass             :
- Fail             :
- Untested         :
- N/A              :
```

---

## ✅ CHECKLIST (Customized cho FR-AUTH-5)

- [ ] Nút/menu Đăng xuất hiển thị rõ ràng sau khi đăng nhập
- [ ] Nhấn Đăng xuất → chuyển về trang Đăng nhập
- [ ] Sau đăng xuất → truy cập URL trang protected bị redirect về Login
- [ ] Sau đăng xuất → nút Back trình duyệt không vào lại được trang protected
- [ ] Phiên làm việc kết thúc hoàn toàn (không còn dữ liệu phiên)
- [ ] Có thể đăng nhập lại bình thường sau khi đăng xuất
- [ ] Có dialog xác nhận trước khi đăng xuất (nếu có)

---

# 🧪 TEST CASES

## 🔹 UI TEST

| ID | Type | Feature | Description | Steps | Test Data | Expected Result | Actual Result | Test Result | Note |
|----|------|---------|-------------|-------|-----------|-----------------|---------------|-------------|------|
| TC_LOGOUT_01 | UI | Hiển thị nút Đăng xuất | Nút/menu Đăng xuất hiển thị sau khi đăng nhập | 1. Đăng nhập thành công → 2. Quan sát thanh điều hướng hoặc menu người dùng | — | Nút/menu "Đăng xuất" hiển thị rõ ràng và có thể nhấn được | | | |
| TC_LOGOUT_02 | UI | Confirm dialog (nếu có) | Kiểm tra hộp thoại xác nhận trước khi đăng xuất | 1. Nhấn "Đăng xuất" | — | Nếu hệ thống có dialog xác nhận: dialog xuất hiện với nút "Xác nhận" và "Hủy" | | | N/A nếu không có confirm |

---

## 🔹 FUNCTION TEST

| ID | Type | Feature | Description | Steps | Test Data | Expected Result | Actual Result | Test Result | Note |
|----|------|---------|-------------|-------|-----------|-----------------|---------------|-------------|------|
| TC_LOGOUT_03 | Function | Đăng xuất thành công | Nhấn Đăng xuất → chuyển về trang Login | 1. Đang ở giao diện chính → 2. Nhấn "Đăng xuất" (xác nhận nếu có dialog) | — | Hệ thống kết thúc phiên làm việc, chuyển về trang Đăng nhập | | | |
| TC_LOGOUT_04 | Function | Chặn truy cập sau đăng xuất | Sau đăng xuất, URL protected bị chặn | 1. Đăng xuất thành công → 2. Nhập trực tiếp URL trang Dashboard vào thanh địa chỉ | URL: `/dashboard` (hoặc URL bảo vệ tương đương) | Hệ thống tự chuyển về trang Đăng nhập, không hiển thị nội dung trang Dashboard | | | |
| TC_LOGOUT_05 | Function | Nút Back trình duyệt không vào lại được | Sau đăng xuất, nhấn Back không vào lại Dashboard | 1. Đăng xuất thành công → 2. Nhấn nút Back của trình duyệt | — | Hệ thống không cho vào lại trang protected; vẫn ở trang Đăng nhập hoặc hiển thị thông báo phiên hết hạn | | | |

---

## 🔹 BUSINESS FLOW

| ID | Type | Feature | Description | Steps | Test Data | Expected Result | Actual Result | Test Result | Note |
|----|------|---------|-------------|-------|-----------|-----------------|---------------|-------------|------|
| TC_LOGOUT_06 | Business | Đăng nhập lại sau khi đăng xuất | Có thể đăng nhập lại bình thường sau khi đăng xuất | 1. Đăng xuất thành công → 2. Nhập email và mật khẩu → 3. Nhấn Đăng nhập | Email: `active@test.com`, MK: `Abc@1234` | Đăng nhập lại thành công, vào được giao diện chính | | | |
| TC_LOGOUT_07 | Business | Phiên cũ không còn hiệu lực | Sau đăng xuất, token/phiên cũ không thể dùng lại | 1. Đăng xuất → 2. Đăng nhập lại → 3. Đăng xuất lần 2 → 4. Quan sát phiên mới có hoạt động bình thường không | — | Mỗi lần đăng nhập tạo phiên mới độc lập; phiên cũ không gây xung đột | | | |
| TC_LOGOUT_08 | Business | Nhiều tab — đăng xuất | Đăng xuất trên một tab ảnh hưởng đến tab khác | 1. Mở 2 tab đều đăng nhập cùng tài khoản → 2. Đăng xuất trên tab 1 → 3. Thao tác trên tab 2 | — | Tab 2 hiển thị thông báo phiên hết hạn hoặc tự chuyển về trang Login khi thực hiện hành động tiếp theo | | | Tùy thiết kế hệ thống |
| TC_LOGOUT_09 | Business | Đăng xuất → không còn thông tin người dùng | Sau đăng xuất, UI không còn hiển thị thông tin của người dùng cũ | 1. Đăng xuất thành công → 2. Quan sát trang Login | — | Trang Login không hiển thị tên/email của người dùng vừa đăng xuất | | | |

---

# 🐞 BUG LIST

```
(Ghi nhận sau khi thực hiện test)
```
