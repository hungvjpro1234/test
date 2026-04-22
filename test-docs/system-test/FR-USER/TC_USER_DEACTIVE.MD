# 📄 SYSTEM TEST — FR-USER-6: Hủy Kích Hoạt Tài Khoản

---

## 🧾 ABOUT

```
- Project Name  : Todo List App
- Module        : FR-USER — Quản lý hồ sơ cá nhân
- Feature       : FR-USER-6 — Hủy kích hoạt tài khoản
- Version       : 1.0
- Test Type     : System Test (Black-box)
- Author        :
- Create Date   : 2026-03-20
- Pre-conditions:
    1. Ứng dụng đang chạy
    2. Đã đăng nhập với tài khoản dành riêng cho test:
       deactivate_test@test.com / Abc@1234
       (KHÔNG dùng tài khoản chính — vì sau test tài khoản sẽ bị hủy)
    3. Có tài khoản Admin để xác minh trạng thái:
       admin@test.com / AdminPass@1234
    4. ⚠️ Sau mỗi lần test cần tạo lại tài khoản deactivate_test@test.com
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

## ✅ CHECKLIST (Customized cho FR-USER-6)

- [ ] Có nút/tùy chọn Hủy tài khoản trong trang Cài đặt
- [ ] Có confirm dialog trước khi hủy (yêu cầu xác nhận)
- [ ] Nhấn Hủy (cancel) trong dialog → tài khoản không bị hủy
- [ ] Xác nhận hủy → tài khoản bị vô hiệu hóa và người dùng bị đăng xuất
- [ ] Sau khi hủy → không thể đăng nhập lại với tài khoản đó
- [ ] Admin có thể xem tài khoản ở trạng thái deactivated
- [ ] ⚠️ Thao tác không thể hoàn tác (nếu không có tính năng mở lại từ phía user)

---

# 🧪 TEST CASES

## 🔹 UI TEST

| ID | Type | Feature | Description | Steps | Test Data | Expected Result | Actual Result | Test Result | Note |
|----|------|---------|-------------|-------|-----------|-----------------|---------------|-------------|------|
| TC_DEACT_01 | UI | Hiển thị nút Hủy tài khoản | Tùy chọn hủy tài khoản có trên trang Cài đặt | 1. Đăng nhập → 2. Vào trang Cài đặt tài khoản | — | Có nút hoặc link "Hủy tài khoản" / "Deactivate Account" / "Xóa tài khoản" hiển thị | | | |
| TC_DEACT_02 | UI | Hiển thị confirm dialog | Nhấn nút hủy → xuất hiện hộp thoại xác nhận | 1. Nhấn nút "Hủy tài khoản" | — | Hộp thoại xác nhận xuất hiện với thông báo cảnh báo rõ ràng và hai lựa chọn: Xác nhận / Hủy | | | |
| TC_DEACT_03 | UI | Cảnh báo trong dialog | Nội dung dialog cảnh báo rõ ràng về hệ quả | 1. Nhấn nút "Hủy tài khoản" → 2. Đọc nội dung dialog | — | Dialog hiển thị thông báo cảnh báo rõ ràng (vd: "Tài khoản sẽ bị vô hiệu hóa và không thể khôi phục từ phía người dùng") | | | |

---

## 🔹 FUNCTION TEST

| ID | Type | Feature | Description | Steps | Test Data | Expected Result | Actual Result | Test Result | Note |
|----|------|---------|-------------|-------|-----------|-----------------|---------------|-------------|------|
| TC_DEACT_04 | Function | Hủy thao tác qua dialog | Nhấn "Hủy" trong dialog → tài khoản không bị ảnh hưởng | 1. Nhấn "Hủy tài khoản" → 2. Trong dialog nhấn "Hủy" / "Cancel" | — | Dialog đóng lại, tài khoản không bị hủy, người dùng vẫn đang đăng nhập và sử dụng bình thường | | | |
| TC_DEACT_05 | Function | Xác nhận hủy tài khoản | Nhấn xác nhận trong dialog → tài khoản bị hủy | 1. Nhấn "Hủy tài khoản" → 2. Trong dialog nhấn "Xác nhận" / "Confirm" | — | Tài khoản bị vô hiệu hóa; hệ thống đăng xuất người dùng ngay lập tức và chuyển về trang Đăng nhập | | | |
| TC_DEACT_06 | Function | Sau hủy — không thể đăng nhập lại | Tài khoản đã hủy không thể đăng nhập | 1. Hủy tài khoản thành công → 2. Thử đăng nhập lại với credentials cũ | Email: `deactivate_test@test.com`, MK: `Abc@1234` | Hệ thống hiển thị thông báo tài khoản không tồn tại hoặc đã bị vô hiệu hóa, không cho đăng nhập | | | |

---

## 🔹 BUSINESS FLOW

| ID | Type | Feature | Description | Steps | Test Data | Expected Result | Actual Result | Test Result | Note |
|----|------|---------|-------------|-------|-----------|-----------------|---------------|-------------|------|
| TC_DEACT_07 | Business | Đăng xuất ngay sau hủy | Hủy tài khoản → tự động bị đăng xuất | 1. Xác nhận hủy tài khoản | — | Hệ thống đăng xuất người dùng ngay lập tức và chuyển về trang Đăng nhập (không ở lại Dashboard) | | | |
| TC_DEACT_08 | Business | Không truy cập được trang protected | Sau hủy, URL protected bị chặn | 1. Hủy tài khoản thành công → 2. Thử truy cập trực tiếp URL Dashboard | URL: `/dashboard` | Hệ thống chuyển về trang Đăng nhập, không hiển thị nội dung trang protected | | | |
| TC_DEACT_09 | Business | Admin thấy trạng thái tài khoản đã hủy | Admin có thể xác nhận tài khoản bị vô hiệu hóa | 1. Hủy tài khoản thành công → 2. Đăng nhập với tài khoản Admin → 3. Vào trang Quản lý người dùng → 4. Tìm kiếm `deactivate_test@test.com` | Tài khoản Admin: `admin@test.com` | Admin thấy tài khoản `deactivate_test@test.com` tồn tại trong hệ thống với trạng thái "Đã vô hiệu hóa" / "Inactive" | | | |

---

# 🐞 BUG LIST

```
(Ghi nhận sau khi thực hiện test)
```
