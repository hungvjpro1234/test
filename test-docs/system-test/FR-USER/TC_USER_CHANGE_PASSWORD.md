# 📄 SYSTEM TEST — FR-USER-2: Đổi Mật Khẩu

---

## 🧾 ABOUT

```
- Project Name  : Todo List App
- Module        : FR-USER — Quản lý hồ sơ cá nhân
- Feature       : FR-USER-2 — Đổi mật khẩu
- Version       : 1.0
- Test Type     : System Test (Black-box)
- Author        :
- Create Date   : 2026-03-20
- Pre-conditions:
    1. Ứng dụng đang chạy
    2. Đã đăng nhập với tài khoản: chgpw@test.com / OldPass@1234
    3. Đang ở trang Cài đặt bảo mật hoặc Đổi mật khẩu
    4. Sau khi test xong cần reset MK về OldPass@1234 để không ảnh hưởng test khác
```

---

## 📊 SUMMARY

```
- Total Test Cases : 17
- Pass             :
- Fail             :
- Untested         :
- N/A              :
```

---

## ✅ CHECKLIST (Customized cho FR-USER-2)

- [ ] Form đổi MK hiển thị đủ: MK hiện tại, MK mới, Xác nhận MK mới (nếu có)
- [ ] Tất cả trường hiển thị dạng ẩn (***)
- [ ] Toggle hiển thị/ẩn MK hoạt động (nếu có)
- [ ] Bỏ trống MK hiện tại → hiển thị lỗi
- [ ] Bỏ trống MK mới → hiển thị lỗi
- [ ] Sai MK hiện tại → hiển thị lỗi, không đổi
- [ ] MK mới không đủ điều kiện → hiển thị lỗi từng tiêu chí
- [ ] MK mới đủ điều kiện + MK hiện tại đúng → đổi thành công
- [ ] Sau đổi → đăng nhập với MK mới thành công
- [ ] Sau đổi → đăng nhập với MK cũ thất bại
- [ ] MK mới trùng MK cũ → hệ thống xử lý (chấp nhận hoặc hiển thị cảnh báo)
- [ ] Có thông báo thành công sau khi đổi

---

# 🧪 TEST CASES

## 🔹 UI TEST

| ID | Type | Feature | Description | Steps | Test Data | Expected Result | Actual Result | Test Result | Note |
|----|------|---------|-------------|-------|-----------|-----------------|---------------|-------------|------|
| TC_CHGPW_01 | UI | Hiển thị form đổi MK | Form đổi MK có đủ trường cần thiết | 1. Đăng nhập → 2. Vào trang Đổi mật khẩu | — | Hiển thị đủ: trường MK hiện tại, MK mới, Xác nhận MK mới (nếu có), nút Lưu | | | |
| TC_CHGPW_02 | UI | Trường MK hiển thị dạng ẩn | Tất cả trường MK ẩn ký tự | 1. Nhập vào các trường mật khẩu | `OldPass@1234` | Tất cả ký tự hiển thị dạng *** | | | |
| TC_CHGPW_03 | UI | Toggle hiển thị/ẩn MK | Nút mắt hiện/ẩn mật khẩu | 1. Nhập MK → 2. Nhấn icon mắt (nếu có) | `OldPass@1234` | MK chuyển từ *** sang văn bản thực và ngược lại | | | N/A nếu không có toggle |
| TC_CHGPW_04 | UI | Responsive | UI không vỡ khi resize | 1. Mở trang Đổi MK → 2. Resize màn hình | — | Form luôn hiển thị đầy đủ, không bị tràn | | | |

---

## 🔹 VALIDATION

| ID | Type | Feature | Description | Steps | Test Data | Expected Result | Actual Result | Test Result | Note |
|----|------|---------|-------------|-------|-----------|-----------------|---------------|-------------|------|
| TC_CHGPW_05 | Validate | MK hiện tại — bỏ trống | Không nhập MK hiện tại | 1. Để trống MK hiện tại → 2. Nhập MK mới hợp lệ → 3. Nhấn Lưu | MK hiện tại: _(trống)_, MK mới: `NewPass@2026` | Hệ thống hiển thị thông báo lỗi tại trường MK hiện tại, không đổi | | | |
| TC_CHGPW_06 | Validate | MK mới — bỏ trống | Không nhập MK mới | 1. Nhập đúng MK hiện tại → 2. Để trống MK mới → 3. Nhấn Lưu | MK hiện tại: `OldPass@1234`, MK mới: _(trống)_ | Hệ thống hiển thị thông báo lỗi tại trường MK mới, không đổi | | | |
| TC_CHGPW_07 | Validate | MK mới — dưới 8 ký tự | MK mới ngắn hơn 8 ký tự | 1. Nhập đúng MK hiện tại → 2. Nhập MK mới < 8 ký tự → 3. Nhấn Lưu | MK mới: `Ab@12` (5 ký tự) | Hệ thống hiển thị thông báo lỗi yêu cầu tối thiểu 8 ký tự | | | |
| TC_CHGPW_08 | Validate | MK mới — thiếu chữ hoa | MK mới không có chữ hoa | 1. Nhập đúng MK hiện tại → 2. Nhập MK mới toàn chữ thường → 3. Nhấn Lưu | MK mới: `newpass@1234` | Hệ thống hiển thị thông báo lỗi yêu cầu ít nhất 1 chữ hoa | | | |
| TC_CHGPW_09 | Validate | MK mới — thiếu chữ thường | MK mới không có chữ thường | 1. Nhập đúng MK hiện tại → 2. Nhập MK mới toàn chữ hoa → 3. Nhấn Lưu | MK mới: `NEWPASS@1234` | Hệ thống hiển thị thông báo lỗi yêu cầu ít nhất 1 chữ thường | | | |
| TC_CHGPW_10 | Validate | MK mới — thiếu chữ số | MK mới không có số | 1. Nhập đúng MK hiện tại → 2. Nhập MK mới không có số → 3. Nhấn Lưu | MK mới: `NewPass@abc` | Hệ thống hiển thị thông báo lỗi yêu cầu ít nhất 1 chữ số | | | |
| TC_CHGPW_11 | Validate | MK mới — thiếu ký tự đặc biệt | MK mới không có ký tự đặc biệt | 1. Nhập đúng MK hiện tại → 2. Nhập MK mới không có ký tự đặc biệt → 3. Nhấn Lưu | MK mới: `NewPass1234` | Hệ thống hiển thị thông báo lỗi yêu cầu ít nhất 1 ký tự đặc biệt | | | |
| TC_CHGPW_12 | Validate | MK mới — đúng 8 ký tự (boundary) | MK mới đúng độ dài tối thiểu | 1. Nhập đúng MK hiện tại → 2. Nhập MK mới đúng 8 ký tự hợp lệ → 3. Nhấn Lưu | MK mới: `Abc@1234` (8 ký tự) | Hệ thống chấp nhận, đổi MK thành công | | | |

---

## 🔹 FUNCTION TEST

| ID | Type | Feature | Description | Steps | Test Data | Expected Result | Actual Result | Test Result | Note |
|----|------|---------|-------------|-------|-----------|-----------------|---------------|-------------|------|
| TC_CHGPW_13 | Function | Đổi MK thành công | Đổi MK với MK hiện tại đúng + MK mới hợp lệ | 1. Nhập đúng MK hiện tại → 2. Nhập MK mới hợp lệ → 3. Nhấn Lưu | MK hiện tại: `OldPass@1234`, MK mới: `NewPass@2026` | Hệ thống cập nhật MK, hiển thị thông báo thành công | | | |
| TC_CHGPW_14 | Function | Sai MK hiện tại | Nhập sai MK hiện tại | 1. Nhập sai MK hiện tại → 2. Nhập MK mới hợp lệ → 3. Nhấn Lưu | MK hiện tại: `WrongPass@99`, MK mới: `NewPass@2026` | Hệ thống hiển thị thông báo lỗi "Mật khẩu hiện tại không đúng", không thay đổi MK | | | |
| TC_CHGPW_15 | Function | MK mới trùng MK cũ | Nhập MK mới giống MK hiện tại | 1. Nhập đúng MK hiện tại → 2. Nhập MK mới = MK hiện tại → 3. Nhấn Lưu | MK hiện tại: `OldPass@1234`, MK mới: `OldPass@1234` | Hệ thống xử lý (chấp nhận hoặc cảnh báo "MK mới phải khác MK cũ") | | | Tùy thiết kế hệ thống |

---

## 🔹 BUSINESS FLOW

| ID | Type | Feature | Description | Steps | Test Data | Expected Result | Actual Result | Test Result | Note |
|----|------|---------|-------------|-------|-----------|-----------------|---------------|-------------|------|
| TC_CHGPW_16 | Business | Đăng nhập lại với MK mới | MK mới có hiệu lực ngay sau khi đổi | 1. Đổi MK thành công → 2. Đăng xuất → 3. Đăng nhập với MK mới | Email: `chgpw@test.com`, MK mới: `NewPass@2026` | Đăng nhập thành công với MK mới | | | |
| TC_CHGPW_17 | Business | MK cũ không còn hiệu lực | Sau khi đổi, MK cũ không thể dùng | 1. Đổi MK thành công → 2. Đăng xuất → 3. Đăng nhập với MK cũ | Email: `chgpw@test.com`, MK cũ: `OldPass@1234` | Hệ thống hiển thị thông báo lỗi, không cho đăng nhập | | | |

---

# 🐞 BUG LIST

```
(Ghi nhận sau khi thực hiện test)
```