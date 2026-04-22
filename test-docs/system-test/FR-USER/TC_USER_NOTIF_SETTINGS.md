# 📄 SYSTEM TEST — FR-USER-5: Tùy Chỉnh Cài Đặt Thông Báo

---

## 🧾 ABOUT

```
- Project Name  : Todo List App
- Module        : FR-USER — Quản lý hồ sơ cá nhân
- Feature       : FR-USER-5 — Tùy chỉnh thông báo cá nhân
- Version       : 1.0
- Test Type     : System Test (Black-box)
- Author        :
- Create Date   : 2026-03-20
- Pre-conditions:
    1. Ứng dụng đang chạy
    2. Đã đăng nhập với tài khoản: active@test.com / Abc@1234
    3. Tài khoản đã là thành viên của ít nhất 1 nhóm
    4. Đang ở trang Cài đặt thông báo (Notification Settings)
    5. Tất cả thông báo đang được bật mặc định
    6. Cần có tài khoản thứ 2 (member@test.com) để kích hoạt các sự kiện tạo thông báo
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

## ✅ CHECKLIST (Customized cho FR-USER-5)

- [ ] Trang cài đặt hiển thị đủ kênh: In-app, Email
- [ ] Trang cài đặt hiển thị đủ danh mục: Nhóm, Công việc, Chat, Cuộc họp, Hệ thống
- [ ] Trạng thái bật/tắt hiển thị rõ ràng (toggle hoặc checkbox)
- [ ] Tắt thông báo Email → không nhận email khi có sự kiện
- [ ] Bật thông báo Email → nhận email khi có sự kiện
- [ ] Tắt thông báo In-app → không nhận thông báo trong ứng dụng
- [ ] Tắt danh mục Công việc → không nhận thông báo liên quan task
- [ ] Tắt danh mục Nhóm → không nhận thông báo liên quan nhóm
- [ ] Tắt danh mục Chat → không nhận thông báo tin nhắn offline
- [ ] Tắt danh mục Cuộc họp → không nhận thông báo cuộc họp
- [ ] Cài đặt được lưu sau reload trang
- [ ] Cài đặt được lưu sau đăng xuất và đăng nhập lại

---

# 🧪 TEST CASES

## 🔹 UI TEST

| ID | Type | Feature | Description | Steps | Test Data | Expected Result | Actual Result | Test Result | Note |
|----|------|---------|-------------|-------|-----------|-----------------|---------------|-------------|------|
| TC_NOTIFSET_01 | UI | Hiển thị trang cài đặt thông báo | Trang cài đặt thông báo hiển thị đầy đủ | 1. Đăng nhập → 2. Vào trang Cài đặt thông báo | — | Hiển thị đủ: kênh (In-app, Email) và danh mục (Nhóm, Công việc, Chat, Cuộc họp, Hệ thống) với trạng thái bật/tắt | | | |
| TC_NOTIFSET_02 | UI | Trạng thái toggle hiển thị rõ ràng | Toggle bật/tắt phân biệt được trạng thái | 1. Quan sát các toggle trên trang cài đặt | — | Toggle đang bật và đang tắt có màu sắc/hình dạng khác nhau, dễ phân biệt | | | |
| TC_NOTIFSET_03 | UI | Responsive | UI không vỡ khi resize | 1. Mở trang Cài đặt thông báo → 2. Resize màn hình | — | Danh sách cài đặt hiển thị đầy đủ, không bị tràn hoặc vỡ | | | |

---

## 🔹 FUNCTION TEST — Kênh thông báo

| ID | Type | Feature | Description | Steps | Test Data | Expected Result | Actual Result | Test Result | Note |
|----|------|---------|-------------|-------|-----------|-----------------|---------------|-------------|------|
| TC_NOTIFSET_04 | Function | Tắt kênh In-app | Tắt thông báo trong ứng dụng | 1. Tắt toggle "In-app" → 2. Nhờ member@test.com thực hiện hành động tạo thông báo (vd: giao task cho active@test.com) → 3. Quan sát bảng thông báo của active@test.com | Kênh In-app: OFF | active@test.com không nhận thông báo trong ứng dụng, số đếm thông báo không tăng | | | |
| TC_NOTIFSET_05 | Function | Bật kênh In-app | Bật lại thông báo trong ứng dụng | 1. Bật lại toggle "In-app" → 2. Nhờ member@test.com thực hiện hành động tạo thông báo | Kênh In-app: ON | active@test.com nhận thông báo trong ứng dụng, số đếm tăng lên | | | |
| TC_NOTIFSET_06 | Function | Tắt kênh Email | Tắt nhận email thông báo | 1. Tắt toggle "Email" → 2. Nhờ member@test.com thực hiện hành động tạo thông báo qua email (vd: mời vào nhóm) | Kênh Email: OFF | active@test.com không nhận email thông báo | | | Cần kiểm tra hộp thư |
| TC_NOTIFSET_07 | Function | Bật kênh Email | Bật lại nhận email thông báo | 1. Bật lại toggle "Email" → 2. Nhờ member@test.com tạo sự kiện | Kênh Email: ON | active@test.com nhận được email thông báo | | | |

---

## 🔹 FUNCTION TEST — Danh mục thông báo

| ID | Type | Feature | Description | Steps | Test Data | Expected Result | Actual Result | Test Result | Note |
|----|------|---------|-------------|-------|-----------|-----------------|---------------|-------------|------|
| TC_NOTIFSET_08 | Function | Tắt thông báo danh mục Công việc | Không nhận thông báo liên quan task | 1. Tắt danh mục "Công việc" → 2. Nhờ member@test.com giao một task cho active@test.com → 3. Quan sát bảng thông báo | Danh mục Công việc: OFF | active@test.com không nhận thông báo "Bạn được giao việc" | | | |
| TC_NOTIFSET_09 | Function | Tắt thông báo danh mục Nhóm | Không nhận thông báo liên quan nhóm | 1. Tắt danh mục "Nhóm" → 2. Nhờ admin nhóm thay đổi vai trò của active@test.com → 3. Quan sát thông báo | Danh mục Nhóm: OFF | active@test.com không nhận thông báo thay đổi vai trò nhóm | | | |
| TC_NOTIFSET_10 | Function | Tắt thông báo danh mục Chat | Không nhận thông báo tin nhắn khi offline | 1. Tắt danh mục "Chat" → 2. active@test.com đăng xuất → 3. member@test.com gửi tin nhắn trực tiếp → 4. active@test.com đăng nhập lại | Danh mục Chat: OFF | active@test.com không nhận thông báo về tin nhắn nhận khi offline | | | |
| TC_NOTIFSET_11 | Function | Tắt một danh mục — danh mục khác không bị ảnh hưởng | Tắt Công việc, thông báo Nhóm vẫn hoạt động | 1. Tắt danh mục "Công việc" → 2. Nhờ admin nhóm thay đổi vai trò active@test.com → 3. Quan sát thông báo | Công việc: OFF, Nhóm: ON | active@test.com vẫn nhận thông báo nhóm (vai trò thay đổi), không nhận thông báo công việc | | | |

---

## 🔹 BUSINESS FLOW

| ID | Type | Feature | Description | Steps | Test Data | Expected Result | Actual Result | Test Result | Note |
|----|------|---------|-------------|-------|-----------|-----------------|---------------|-------------|------|
| TC_NOTIFSET_12 | Business | Cài đặt lưu sau reload | Reload trang vẫn giữ cài đặt thông báo | 1. Tắt kênh Email → 2. Reload trang → 3. Quan sát toggle Email | — | Toggle Email vẫn ở trạng thái TẮT sau khi reload | | | |
| TC_NOTIFSET_13 | Business | Cài đặt lưu sau đăng xuất | Đăng xuất → đăng nhập lại → giữ cài đặt | 1. Tắt danh mục "Công việc" → 2. Đăng xuất → 3. Đăng nhập lại → 4. Vào trang cài đặt thông báo | — | Danh mục "Công việc" vẫn ở trạng thái TẮT sau khi đăng nhập lại | | | |
| TC_NOTIFSET_14 | Business | Cài đặt độc lập mỗi tài khoản | Cài đặt của active@test.com không ảnh hưởng member@test.com | 1. active@test.com tắt toàn bộ thông báo → 2. member@test.com đăng nhập → 3. Kiểm tra cài đặt của member@test.com | — | member@test.com vẫn nhận thông báo bình thường theo cài đặt của riêng họ | | | |

---

# 🐞 BUG LIST

```
(Ghi nhận sau khi thực hiện test)
```