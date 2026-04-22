# 📄 SYSTEM TEST — FR-USER-1: Cập Nhật Thông Tin Cá Nhân

---

## 🧾 ABOUT

```
- Project Name  : Todo List App
- Module        : FR-USER — Quản lý hồ sơ cá nhân
- Feature       : FR-USER-1 — Cập nhật thông tin cá nhân
- Version       : 1.0
- Test Type     : System Test (Black-box)
- Author        :
- Create Date   : 2026-03-20
- Pre-conditions:
    1. Ứng dụng đang chạy
    2. Đã đăng nhập với tài khoản: active@test.com / Abc@1234
       (Tên hiện tại: "Active User")
    3. Đang ở trang hồ sơ cá nhân (Profile Settings)
```

---

## 📊 SUMMARY

```
- Total Test Cases : 13
- Pass             :
- Fail             :
- Untested         :
- N/A              :
```

---

## ✅ CHECKLIST (Customized cho FR-USER-1)

- [ ] Trang hồ sơ hiển thị đúng thông tin hiện tại (tên, email)
- [ ] Trường Họ tên có thể chỉnh sửa
- [ ] Email hiển thị nhưng không chỉnh sửa được (read-only)
- [ ] Nút "Lưu" / "Cập nhật" hiển thị và có thể nhấn
- [ ] Cập nhật tên thành công → hiển thị thông báo thành công
- [ ] Họ tên trống → hiển thị thông báo lỗi, không lưu
- [ ] Họ tên > 100 ký tự → hiển thị thông báo lỗi, không lưu
- [ ] Họ tên = 100 ký tự → lưu thành công (boundary)
- [ ] Tên mới hiển thị ngay trên UI sau khi lưu
- [ ] Reload trang → tên mới vẫn được giữ
- [ ] Tên mới hiển thị ở thanh điều hướng (navbar/header)
- [ ] UI không vỡ khi resize

---

# 🧪 TEST CASES

## 🔹 UI TEST

| ID | Type | Feature | Description | Steps | Test Data | Expected Result | Actual Result | Test Result | Note |
|----|------|---------|-------------|-------|-----------|-----------------|---------------|-------------|------|
| TC_PROFILE_01 | UI | Hiển thị trang hồ sơ | Trang hồ sơ hiển thị đầy đủ thông tin hiện tại | 1. Đăng nhập → 2. Vào trang Hồ sơ cá nhân | — | Hiển thị đúng tên hiện tại "Active User", địa chỉ email, nút Lưu | | | |
| TC_PROFILE_02 | UI | Trường Email read-only | Email không thể chỉnh sửa trực tiếp | 1. Vào trang Hồ sơ → 2. Thử nhấn/sửa trường Email | — | Trường Email hiển thị nhưng không cho nhập/thay đổi | | | |
| TC_PROFILE_03 | UI | Trường Họ tên có thể sửa | Trường Họ tên cho phép chỉnh sửa | 1. Vào trang Hồ sơ → 2. Nhấn vào trường Họ tên | — | Trường Họ tên cho phép xóa và nhập nội dung mới | | | |
| TC_PROFILE_04 | UI | Responsive | UI không vỡ khi resize màn hình | 1. Mở trang Hồ sơ → 2. Resize trình duyệt → kéo nhỏ dần | — | Form vẫn hiển thị đầy đủ, không bị tràn hoặc vỡ bố cục | | | |

---

## 🔹 VALIDATION

| ID | Type | Feature | Description | Steps | Test Data | Expected Result | Actual Result | Test Result | Note |
|----|------|---------|-------------|-------|-----------|-----------------|---------------|-------------|------|
| TC_PROFILE_05 | Validate | Họ tên — bỏ trống | Kiểm tra khi xóa trắng trường Họ tên | 1. Xóa toàn bộ nội dung trường Họ tên → 2. Nhấn Lưu | Họ tên: _(trống)_ | Hệ thống hiển thị thông báo lỗi tại trường Họ tên, không lưu | | | |
| TC_PROFILE_06 | Validate | Họ tên — đúng 100 ký tự (boundary) | Kiểm tra họ tên ở đúng giới hạn tối đa | 1. Nhập họ tên đúng 100 ký tự → 2. Nhấn Lưu | Họ tên: chuỗi 100 ký tự (vd: `A` × 100) | Hệ thống chấp nhận và lưu thành công, hiển thị thông báo thành công | | | |
| TC_PROFILE_07 | Validate | Họ tên — 101 ký tự (boundary+1) | Kiểm tra họ tên vượt giới hạn tối đa | 1. Nhập họ tên 101 ký tự → 2. Nhấn Lưu | Họ tên: chuỗi 101 ký tự (vd: `A` × 101) | Hệ thống hiển thị thông báo lỗi, không lưu thay đổi | | | |
| TC_PROFILE_08 | Validate | Họ tên — chỉ khoảng trắng | Kiểm tra họ tên toàn khoảng trắng | 1. Nhập họ tên chỉ gồm khoảng trắng → 2. Nhấn Lưu | Họ tên: `   ` (3 dấu cách) | Hệ thống hiển thị thông báo lỗi, không lưu (trim và coi như trống) | | | |

---

## 🔹 FUNCTION TEST

| ID | Type | Feature | Description | Steps | Test Data | Expected Result | Actual Result | Test Result | Note |
|----|------|---------|-------------|-------|-----------|-----------------|---------------|-------------|------|
| TC_PROFILE_09 | Function | Cập nhật tên thành công | Đổi tên với dữ liệu hợp lệ | 1. Xóa tên cũ → 2. Nhập tên mới → 3. Nhấn Lưu | Họ tên mới: `Updated Name` | Hệ thống lưu thành công, hiển thị thông báo thành công, trường Họ tên hiển thị tên mới | | | |
| TC_PROFILE_10 | Function | Cập nhật tên có ký tự đặc biệt | Tên chứa dấu, ký tự đặc biệt hợp lệ | 1. Nhập tên có dấu tiếng Việt hoặc dấu câu → 2. Nhấn Lưu | Họ tên: `Nguyễn Văn An` | Hệ thống lưu thành công và hiển thị đúng tên có dấu | | | |
| TC_PROFILE_11 | Function | Lưu không thay đổi | Nhấn Lưu khi không thay đổi gì | 1. Không chỉnh sửa gì → 2. Nhấn Lưu | Họ tên: giữ nguyên `Active User` | Hệ thống xử lý không lỗi (hoặc thông báo "Không có thay đổi nào") | | | |

---

## 🔹 BUSINESS FLOW

| ID | Type | Feature | Description | Steps | Test Data | Expected Result | Actual Result | Test Result | Note |
|----|------|---------|-------------|-------|-----------|-----------------|---------------|-------------|------|
| TC_PROFILE_12 | Business | Tên mới hiển thị ngay trên navbar | Sau khi lưu, tên mới xuất hiện trên thanh điều hướng | 1. Cập nhật tên thành công → 2. Quan sát thanh điều hướng hoặc khu vực hiển thị tên người dùng | Tên mới: `Updated Name` | Thanh điều hướng hiển thị đúng tên mới (không cần reload trang) | | | |
| TC_PROFILE_13 | Business | Tên mới được lưu sau reload | Reload trang vẫn giữ tên mới | 1. Cập nhật tên thành công → 2. Reload trang → 3. Quan sát trường Họ tên | Tên mới: `Updated Name` | Trường Họ tên hiển thị đúng tên mới sau khi reload | | | |

---

# 🐞 BUG LIST

```
(Ghi nhận sau khi thực hiện test)
```
