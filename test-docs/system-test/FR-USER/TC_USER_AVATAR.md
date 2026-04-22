# 📄 SYSTEM TEST — FR-USER-3: Cập Nhật Ảnh Đại Diện

---

## 🧾 ABOUT

```
- Project Name  : Todo List App
- Module        : FR-USER — Quản lý hồ sơ cá nhân
- Feature       : FR-USER-3 — Cập nhật ảnh đại diện
- Version       : 1.0
- Test Type     : System Test (Black-box)
- Author        :
- Create Date   : 2026-03-20
- Pre-conditions:
    1. Ứng dụng đang chạy
    2. Đã đăng nhập với tài khoản: active@test.com / Abc@1234
    3. Đang ở trang hồ sơ cá nhân (Profile Settings)
    4. Chuẩn bị sẵn:
       - File ảnh hợp lệ: avatar_valid.jpg (< 5MB, định dạng JPG/PNG)
       - File không phải ảnh: document.pdf
       - URL ảnh hợp lệ: https://picsum.photos/200
       - URL không hợp lệ: "not-a-valid-url"
```

---

## 📊 SUMMARY

```
- Total Test Cases : 12
- Pass             :
- Fail             :
- Untested         :
- N/A              :
```

---

## ✅ CHECKLIST (Customized cho FR-USER-3)

- [ ] Ảnh đại diện hiện tại hiển thị trên trang hồ sơ
- [ ] Có nút/vùng nhấp để thay đổi ảnh đại diện
- [ ] Hỗ trợ tải ảnh từ máy tính (Upload)
- [ ] Hỗ trợ nhập URL ảnh trực tiếp (nếu có)
- [ ] Tải ảnh hợp lệ → ảnh mới hiển thị trên hồ sơ
- [ ] Tải file không phải ảnh → hiển thị lỗi (nếu hệ thống kiểm tra)
- [ ] URL ảnh hợp lệ → ảnh mới hiển thị
- [ ] URL không hợp lệ → hiển thị lỗi (nếu có kiểm tra)
- [ ] Ảnh mới hiển thị trên thanh điều hướng (navbar) ngay sau cập nhật
- [ ] Ảnh mới được lưu sau khi reload trang

---

# 🧪 TEST CASES

## 🔹 UI TEST

| ID | Type | Feature | Description | Steps | Test Data | Expected Result | Actual Result | Test Result | Note |
|----|------|---------|-------------|-------|-----------|-----------------|---------------|-------------|------|
| TC_AVATAR_01 | UI | Hiển thị ảnh đại diện trên hồ sơ | Avatar hiện tại hiển thị trên trang hồ sơ | 1. Đăng nhập → 2. Vào trang Hồ sơ cá nhân | — | Ảnh đại diện hiện tại hiển thị, có nút/vùng cho phép thay đổi | | | |
| TC_AVATAR_02 | UI | Hiển thị ảnh đại diện trên navbar | Avatar hiện tại hiển thị trên thanh điều hướng | 1. Đăng nhập → 2. Quan sát góc trên của giao diện | — | Ảnh đại diện (hoặc ký tự đại diện) hiển thị trên navbar/header | | | |
| TC_AVATAR_03 | UI | Responsive | UI không vỡ sau khi cập nhật avatar | 1. Cập nhật avatar thành công → 2. Resize trình duyệt | — | Ảnh đại diện mới hiển thị đúng tỷ lệ, không vỡ bố cục | | | |

---

## 🔹 VALIDATION

| ID | Type | Feature | Description | Steps | Test Data | Expected Result | Actual Result | Test Result | Note |
|----|------|---------|-------------|-------|-----------|-----------------|---------------|-------------|------|
| TC_AVATAR_04 | Validate | Upload file không phải ảnh | Tải file PDF/Word thay vì ảnh | 1. Nhấn vào vùng thay đổi avatar → 2. Chọn file PDF → 3. Xác nhận tải lên | File: `document.pdf` | Hệ thống từ chối và hiển thị thông báo lỗi (chỉ chấp nhận file ảnh) | | | Tùy hệ thống có validate loại file không |
| TC_AVATAR_05 | Validate | URL ảnh không hợp lệ | Nhập URL không đúng định dạng | 1. Chọn hình thức nhập URL → 2. Nhập URL không hợp lệ → 3. Nhấn Lưu | URL: `not-a-valid-url` | Hệ thống hiển thị thông báo lỗi URL không hợp lệ | | | N/A nếu không có tính năng nhập URL |

---

## 🔹 FUNCTION TEST

| ID | Type | Feature | Description | Steps | Test Data | Expected Result | Actual Result | Test Result | Note |
|----|------|---------|-------------|-------|-----------|-----------------|---------------|-------------|------|
| TC_AVATAR_06 | Function | Upload ảnh thành công | Tải ảnh hợp lệ từ máy tính | 1. Nhấn vào vùng thay đổi avatar → 2. Chọn file ảnh hợp lệ (JPG/PNG) → 3. Xác nhận tải lên | File: `avatar_valid.jpg` | Hệ thống tải ảnh lên thành công, ảnh mới hiển thị ngay trên trang hồ sơ | | | |
| TC_AVATAR_07 | Function | Cập nhật URL ảnh thành công | Nhập URL ảnh hợp lệ | 1. Chọn hình thức nhập URL → 2. Nhập URL ảnh hợp lệ → 3. Nhấn Lưu | URL: `https://picsum.photos/200` | Hệ thống cập nhật và hiển thị ảnh từ URL trên trang hồ sơ | | | N/A nếu không có tính năng nhập URL |
| TC_AVATAR_08 | Function | Upload nhiều lần — giữ ảnh cuối | Tải ảnh mới lần 2 thay thế ảnh cũ | 1. Upload ảnh lần 1 thành công → 2. Upload ảnh mới lần 2 | File lần 1: `avatar1.jpg`, File lần 2: `avatar2.jpg` | Ảnh đại diện hiển thị là ảnh lần 2 (ảnh mới nhất) | | | |

---

## 🔹 BUSINESS FLOW

| ID | Type | Feature | Description | Steps | Test Data | Expected Result | Actual Result | Test Result | Note |
|----|------|---------|-------------|-------|-----------|-----------------|---------------|-------------|------|
| TC_AVATAR_09 | Business | Avatar mới hiển thị ngay trên navbar | Sau khi cập nhật, avatar mới xuất hiện ở thanh điều hướng | 1. Upload ảnh mới thành công → 2. Quan sát navbar (không reload trang) | File: `avatar_valid.jpg` | Avatar mới hiển thị trên navbar ngay lập tức (không cần reload) | | | |
| TC_AVATAR_10 | Business | Avatar được lưu sau reload | Reload trang vẫn giữ ảnh mới | 1. Upload ảnh mới thành công → 2. Reload trang → 3. Quan sát ảnh đại diện | — | Trang hồ sơ vẫn hiển thị ảnh mới sau khi reload | | | |
| TC_AVATAR_11 | Business | Avatar được lưu sau đăng xuất và đăng nhập lại | Đăng xuất → đăng nhập lại → avatar vẫn là ảnh mới | 1. Upload ảnh mới thành công → 2. Đăng xuất → 3. Đăng nhập lại → 4. Vào trang hồ sơ | — | Ảnh đại diện vẫn là ảnh mới đã tải lên | | | |
| TC_AVATAR_12 | Business | Avatar mới hiển thị cho các thành viên khác | Các thành viên nhóm thấy avatar mới khi xem hồ sơ | 1. User A cập nhật avatar → 2. User B xem danh sách thành viên nhóm hoặc bình luận của User A | — | User B thấy avatar mới của User A | | | |

---

# 🐞 BUG LIST

```
(Ghi nhận sau khi thực hiện test)
```