# 📄 SYSTEM TEST — FR-USER-4: Tùy Chỉnh Giao Diện & Khu Vực

---

## 🧾 ABOUT

```
- Project Name  : Todo List App
- Module        : FR-USER — Quản lý hồ sơ cá nhân
- Feature       : FR-USER-4 — Tùy chỉnh giao diện & khu vực
- Version       : 1.0
- Test Type     : System Test (Black-box)
- Author        :
- Create Date   : 2026-03-20
- Pre-conditions:
    1. Ứng dụng đang chạy
    2. Đã đăng nhập với tài khoản: active@test.com / Abc@1234
    3. Đang ở trang Cài đặt (Settings) hoặc Tùy chọn (Preferences)
    4. Ngôn ngữ hiện tại: Tiếng Anh (English)
    5. Giao diện hiện tại: Sáng (Light)
```

---

## 📊 SUMMARY

```
- Total Test Cases : 14
- Pass             :
- Fail             :
- Untested         :
- N/A              :
```

---

## ✅ CHECKLIST (Customized cho FR-USER-4)

- [ ] Trang cài đặt hiển thị đủ các tùy chọn: Ngôn ngữ, Giao diện, Múi giờ, Định dạng ngày
- [ ] Chọn Tiếng Việt → toàn bộ giao diện chuyển sang tiếng Việt ngay lập tức
- [ ] Chọn Tiếng Anh → toàn bộ giao diện chuyển sang tiếng Anh ngay lập tức
- [ ] Chọn giao diện Tối (Dark) → UI chuyển sang dark mode ngay
- [ ] Chọn giao diện Sáng (Light) → UI chuyển sang light mode ngay
- [ ] Chọn giao diện Tự động → UI theo cài đặt hệ thống thiết bị
- [ ] Chọn múi giờ → thời gian trong hệ thống hiển thị theo múi giờ mới
- [ ] Chọn định dạng ngày → ngày tháng hiển thị theo format mới
- [ ] Tùy chỉnh được lưu sau khi reload trang
- [ ] Tùy chỉnh được lưu sau khi đăng xuất và đăng nhập lại
- [ ] Mỗi tài khoản có tùy chỉnh riêng biệt, không ảnh hưởng nhau

---

# 🧪 TEST CASES

## 🔹 UI TEST

| ID | Type | Feature | Description | Steps | Test Data | Expected Result | Actual Result | Test Result | Note |
|----|------|---------|-------------|-------|-----------|-----------------|---------------|-------------|------|
| TC_PREF_01 | UI | Hiển thị trang cài đặt | Trang cài đặt hiển thị đầy đủ các tùy chọn | 1. Đăng nhập → 2. Vào trang Cài đặt | — | Hiển thị đủ các mục: Ngôn ngữ, Giao diện (Sáng/Tối/Tự động), Múi giờ, Định dạng ngày | | | |
| TC_PREF_02 | UI | Giá trị mặc định hiển thị đúng | Giá trị cài đặt hiện tại được chọn sẵn | 1. Vào trang Cài đặt → 2. Quan sát các mục tùy chỉnh | — | Mỗi tùy chọn hiển thị đúng giá trị đang áp dụng (ví dụ: Light, English) | | | |
| TC_PREF_03 | UI | Responsive | UI không vỡ khi resize | 1. Mở trang Cài đặt → 2. Resize màn hình | — | Form cài đặt hiển thị đầy đủ, không bị tràn | | | |

---

## 🔹 FUNCTION TEST — Ngôn ngữ

| ID | Type | Feature | Description | Steps | Test Data | Expected Result | Actual Result | Test Result | Note |
|----|------|---------|-------------|-------|-----------|-----------------|---------------|-------------|------|
| TC_PREF_04 | Function | Chuyển sang Tiếng Việt | Chọn Tiếng Việt → UI chuyển ngôn ngữ ngay | 1. Vào trang Cài đặt → 2. Chọn ngôn ngữ "Tiếng Việt" | Ngôn ngữ: `vi` | Toàn bộ nhãn, menu, nút bấm trên giao diện chuyển sang tiếng Việt ngay lập tức | | | |
| TC_PREF_05 | Function | Chuyển sang Tiếng Anh | Chọn Tiếng Anh → UI chuyển ngôn ngữ ngay | 1. Đặt ngôn ngữ sang Tiếng Việt trước → 2. Chọn lại "English" | Ngôn ngữ: `en` | Toàn bộ giao diện chuyển sang tiếng Anh ngay lập tức | | | |

---

## 🔹 FUNCTION TEST — Giao diện (Theme)

| ID | Type | Feature | Description | Steps | Test Data | Expected Result | Actual Result | Test Result | Note |
|----|------|---------|-------------|-------|-----------|-----------------|---------------|-------------|------|
| TC_PREF_06 | Function | Chuyển sang Giao diện Tối | Chọn Dark mode → UI áp dụng ngay | 1. Vào trang Cài đặt → 2. Chọn giao diện "Tối" (Dark) | Theme: `dark` | Toàn bộ UI chuyển sang màu tối (dark background, light text) ngay lập tức | | | |
| TC_PREF_07 | Function | Chuyển sang Giao diện Sáng | Chọn Light mode → UI áp dụng ngay | 1. Đặt theme Tối trước → 2. Chọn giao diện "Sáng" (Light) | Theme: `light` | Toàn bộ UI chuyển sang màu sáng ngay lập tức | | | |
| TC_PREF_08 | Function | Chuyển sang Giao diện Tự động | Chọn Auto mode → UI theo cài đặt thiết bị | 1. Vào trang Cài đặt → 2. Chọn giao diện "Tự động" (Auto) | Theme: `auto` | UI áp dụng giao diện theo cài đặt sáng/tối của hệ điều hành thiết bị | | | |

---

## 🔹 FUNCTION TEST — Múi giờ & Định dạng ngày

| ID | Type | Feature | Description | Steps | Test Data | Expected Result | Actual Result | Test Result | Note |
|----|------|---------|-------------|-------|-----------|-----------------|---------------|-------------|------|
| TC_PREF_09 | Function | Thay đổi múi giờ | Chọn múi giờ mới → thời gian hiển thị thay đổi | 1. Vào trang Cài đặt → 2. Chọn múi giờ `UTC+7 (Hà Nội)` → 3. Xem thời gian của một thông báo hoặc task | Múi giờ: `Asia/Ho_Chi_Minh` | Thời gian hiển thị trong hệ thống (ngày tạo task, thông báo...) theo đúng múi giờ mới | | | |
| TC_PREF_10 | Function | Thay đổi định dạng ngày | Chọn định dạng ngày mới → ngày tháng hiển thị thay đổi | 1. Vào trang Cài đặt → 2. Chọn định dạng ngày `DD/MM/YYYY` → 3. Xem ngày trên danh sách task | Định dạng: `DD/MM/YYYY` | Ngày hiển thị ở định dạng mới (vd: 20/03/2026 thay vì 03/20/2026) | | | |

---

## 🔹 BUSINESS FLOW

| ID | Type | Feature | Description | Steps | Test Data | Expected Result | Actual Result | Test Result | Note |
|----|------|---------|-------------|-------|-----------|-----------------|---------------|-------------|------|
| TC_PREF_11 | Business | Tùy chỉnh lưu sau reload | Reload trang vẫn giữ cài đặt | 1. Đổi ngôn ngữ sang Tiếng Việt → 2. Reload trang | — | Trang tải lại vẫn hiển thị bằng Tiếng Việt | | | |
| TC_PREF_12 | Business | Tùy chỉnh lưu sau đăng xuất | Đăng xuất → đăng nhập lại → giữ cài đặt | 1. Đổi theme sang Tối → 2. Đăng xuất → 3. Đăng nhập lại | — | Giao diện vẫn là Dark mode sau khi đăng nhập lại | | | |
| TC_PREF_13 | Business | Tùy chỉnh độc lập mỗi tài khoản | Cài đặt của một user không ảnh hưởng user khác | 1. User A đổi ngôn ngữ sang Tiếng Việt → 2. User B đăng nhập trên trình duyệt khác | — | Giao diện của User B không bị thay đổi theo cài đặt của User A | | | |
| TC_PREF_14 | Business | Giao diện Tự động theo hệ thống | Dark/Light auto phản ánh đúng cài đặt hệ điều hành | 1. Chọn theme "Tự động" → 2. Đổi thiết bị sang Dark mode (OS level) → 3. Reload ứng dụng | OS: Dark mode | Ứng dụng chuyển sang Dark mode tương ứng | | | Tùy thuộc vào hệ điều hành và trình duyệt |

---

# 🐞 BUG LIST

```
(Ghi nhận sau khi thực hiện test)
```