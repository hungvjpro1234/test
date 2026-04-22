# 📄 SYSTEM TEST — FR-AUTH-1: Đăng Ký Tài Khoản

---

## 🧾 ABOUT

```
- Project Name  : Todo List App
- Module        : FR-AUTH — Xác thực & Quản lý tài khoản
- Feature       : FR-AUTH-1 — Đăng ký tài khoản
- Version       : 1.0
- Test Type     : System Test (Black-box)
- Author        :
- Create Date   : 2026-03-20
- Pre-conditions:
    1. Ứng dụng đang chạy, trang Đăng ký có thể truy cập
    2. Chưa đăng nhập
    3. Có tài khoản test sẵn: existing@test.com (đã đăng ký)
```

---

## 📊 SUMMARY

```
- Total Test Cases : 29
- Pass             :
- Fail             :
- Untested         :
- N/A              :
```

---

## ✅ CHECKLIST (Customized cho FR-AUTH-1)

- [ ] Form hiển thị đúng 3 trường: Họ tên, Email, Mật khẩu
- [ ] Trường bắt buộc có dấu (*)
- [ ] Mật khẩu hiển thị dạng ẩn (***)
- [ ] Toggle hiển thị/ẩn mật khẩu (nếu có)
- [ ] Link chuyển sang trang Đăng nhập hoạt động
- [ ] Validate Email format
- [ ] Validate độ mạnh mật khẩu (8 ký tự, hoa, thường, số, ký tự đặc biệt)
- [ ] Validate họ tên tối đa 100 ký tự
- [ ] Validate trường bắt buộc khi bỏ trống
- [ ] Hiển thị thông báo lỗi rõ ràng cho từng trường
- [ ] Đăng ký thành công → chuyển vào giao diện chính
- [ ] Sau đăng ký → Workspace cá nhân được tạo tự động
- [ ] Email đã tồn tại → hiển thị lỗi, không tạo tài khoản
- [ ] UI không vỡ khi resize màn hình
- [ ] Không có lỗi chính tả trên form

---

# 🧪 TEST CASES

## 🔹 UI TEST

| ID | Type | Feature | Description | Steps | Test Data | Expected Result | Actual Result | Test Result | Note |
|----|------|---------|-------------|-------|-----------|-----------------|---------------|-------------|------|
| TC_REG_01 | UI | Hiển thị form | Kiểm tra form đăng ký hiển thị đầy đủ các thành phần | 1. Mở trang Đăng ký | — | Hiển thị đủ: trường Họ tên, Email, Mật khẩu, nút "Đăng ký", link "Đã có tài khoản? Đăng nhập" | | | |
| TC_REG_02 | UI | Label & Placeholder | Kiểm tra nhãn và gợi ý của từng trường | 1. Quan sát từng trường trên form | — | Mỗi trường có label/placeholder rõ ràng, đúng chính tả, nhất quán với ngôn ngữ hiển thị | | | |
| TC_REG_03 | UI | Trường bắt buộc | Kiểm tra dấu (*) trên các trường bắt buộc | 1. Quan sát form | — | Cả 3 trường Họ tên, Email, Mật khẩu có dấu (*) hoặc ký hiệu bắt buộc | | | |
| TC_REG_04 | UI | Ẩn mật khẩu | Kiểm tra trường mật khẩu hiển thị dạng ẩn | 1. Nhập ký tự vào ô Mật khẩu | `Abc@1234` | Mật khẩu hiển thị dạng *** (không thấy ký tự thực) | | | |
| TC_REG_05 | UI | Toggle mật khẩu | Kiểm tra nút hiện/ẩn mật khẩu | 1. Nhập mật khẩu → 2. Nhấn icon mắt (nếu có) | `Abc@1234` | Mật khẩu chuyển từ ẩn sang hiện và ngược lại | | | |
| TC_REG_06 | UI | Link đến đăng nhập | Kiểm tra link chuyển sang trang Đăng nhập | 1. Nhấn link "Đã có tài khoản? Đăng nhập" | — | Chuyển đến trang Đăng nhập | | | |
| TC_REG_07 | UI | Responsive | Kiểm tra UI không vỡ khi thay đổi kích thước màn hình | 1. Resize trình duyệt → nhỏ dần → 2. Thử trên mobile | — | Form vẫn hiển thị đầy đủ, không bị tràn hoặc vỡ bố cục | | | |
| TC_REG_08 | UI | Chính tả | Kiểm tra không có lỗi chính tả trên toàn bộ trang | 1. Đọc tất cả text trên trang | — | Không có lỗi chính tả, viết tắt nhất quán | | | |

---

## 🔹 VALIDATION

| ID | Type | Feature | Description | Steps | Test Data | Expected Result | Actual Result | Test Result | Note |
|----|------|---------|-------------|-------|-----------|-----------------|---------------|-------------|------|
| TC_REG_09 | Validate | Họ tên — bỏ trống | Kiểm tra khi bỏ trống trường Họ tên | 1. Để trống Họ tên → 2. Điền Email, Mật khẩu hợp lệ → 3. Nhấn Đăng ký | Họ tên: _(trống)_, Email: `new@test.com`, MK: `Abc@1234` | Hệ thống hiển thị thông báo lỗi tại trường Họ tên, không tạo tài khoản | | | |
| TC_REG_10 | Validate | Email — bỏ trống | Kiểm tra khi bỏ trống trường Email | 1. Điền Họ tên → 2. Để trống Email → 3. Điền Mật khẩu hợp lệ → 4. Nhấn Đăng ký | Họ tên: `Test User`, Email: _(trống)_, MK: `Abc@1234` | Hệ thống hiển thị thông báo lỗi tại trường Email, không tạo tài khoản | | | |
| TC_REG_11 | Validate | Mật khẩu — bỏ trống | Kiểm tra khi bỏ trống trường Mật khẩu | 1. Điền Họ tên, Email → 2. Để trống Mật khẩu → 3. Nhấn Đăng ký | Họ tên: `Test User`, Email: `new@test.com`, MK: _(trống)_ | Hệ thống hiển thị thông báo lỗi tại trường Mật khẩu, không tạo tài khoản | | | |
| TC_REG_12 | Validate | Tất cả — bỏ trống | Kiểm tra khi bỏ trống toàn bộ form | 1. Không nhập gì → 2. Nhấn Đăng ký | Tất cả _(trống)_ | Hệ thống hiển thị thông báo lỗi tại tất cả 3 trường, không tạo tài khoản | | | |
| TC_REG_13 | Validate | Email — thiếu @ | Kiểm tra email thiếu ký tự @ | 1. Nhập email thiếu @ → 2. Nhấn Đăng ký | Email: `usertest.com` | Hệ thống hiển thị thông báo lỗi "Email không hợp lệ" tại trường Email | | | |
| TC_REG_14 | Validate | Email — thiếu domain | Kiểm tra email thiếu phần domain | 1. Nhập email thiếu domain → 2. Nhấn Đăng ký | Email: `user@` | Hệ thống hiển thị thông báo lỗi "Email không hợp lệ" tại trường Email | | | |
| TC_REG_15 | Validate | Email — có khoảng trắng | Kiểm tra email chứa khoảng trắng | 1. Nhập email có dấu cách → 2. Nhấn Đăng ký | Email: `user @test.com` | Hệ thống hiển thị thông báo lỗi "Email không hợp lệ" | | | |
| TC_REG_16 | Validate | Mật khẩu — dưới 8 ký tự | Kiểm tra mật khẩu ngắn hơn 8 ký tự | 1. Nhập mật khẩu 7 ký tự → 2. Nhấn Đăng ký | MK: `Abc@12` (7 ký tự) | Hệ thống hiển thị thông báo lỗi yêu cầu mật khẩu tối thiểu 8 ký tự | | | |
| TC_REG_17 | Validate | Mật khẩu — thiếu chữ hoa | Kiểm tra mật khẩu không có chữ hoa | 1. Nhập mật khẩu không có chữ hoa → 2. Nhấn Đăng ký | MK: `abc@1234` | Hệ thống hiển thị thông báo lỗi yêu cầu có ít nhất 1 chữ hoa | | | |
| TC_REG_18 | Validate | Mật khẩu — thiếu chữ thường | Kiểm tra mật khẩu không có chữ thường | 1. Nhập mật khẩu không có chữ thường → 2. Nhấn Đăng ký | MK: `ABC@1234` | Hệ thống hiển thị thông báo lỗi yêu cầu có ít nhất 1 chữ thường | | | |
| TC_REG_19 | Validate | Mật khẩu — thiếu chữ số | Kiểm tra mật khẩu không có chữ số | 1. Nhập mật khẩu không có số → 2. Nhấn Đăng ký | MK: `Abcdefg@` | Hệ thống hiển thị thông báo lỗi yêu cầu có ít nhất 1 chữ số | | | |
| TC_REG_20 | Validate | Mật khẩu — thiếu ký tự đặc biệt | Kiểm tra mật khẩu không có ký tự đặc biệt | 1. Nhập mật khẩu không có ký tự đặc biệt → 2. Nhấn Đăng ký | MK: `Abcde123` | Hệ thống hiển thị thông báo lỗi yêu cầu có ít nhất 1 ký tự đặc biệt | | | |
| TC_REG_21 | Validate | Họ tên — đúng 100 ký tự (boundary) | Kiểm tra họ tên đúng giới hạn tối đa | 1. Nhập họ tên đúng 100 ký tự → 2. Điền các trường còn lại hợp lệ → 3. Nhấn Đăng ký | Họ tên: chuỗi 100 ký tự `A*100` | Hệ thống chấp nhận, đăng ký thành công | | | |
| TC_REG_22 | Validate | Họ tên — 101 ký tự (boundary+1) | Kiểm tra họ tên vượt giới hạn tối đa | 1. Nhập họ tên 101 ký tự → 2. Điền các trường còn lại hợp lệ → 3. Nhấn Đăng ký | Họ tên: chuỗi 101 ký tự `A*101` | Hệ thống hiển thị thông báo lỗi, không đăng ký | | | |
| TC_REG_23 | Validate | Mật khẩu — đúng 8 ký tự (boundary min) | Kiểm tra mật khẩu đúng độ dài tối thiểu | 1. Nhập mật khẩu đúng 8 ký tự hợp lệ → 2. Nhấn Đăng ký | MK: `Abc@1234` (8 ký tự) | Hệ thống chấp nhận, đăng ký thành công | | | |

---

## 🔹 FUNCTION TEST

| ID | Type | Feature | Description | Steps | Test Data | Expected Result | Actual Result | Test Result | Note |
|----|------|---------|-------------|-------|-----------|-----------------|---------------|-------------|------|
| TC_REG_24 | Function | Đăng ký thành công | Đăng ký với toàn bộ dữ liệu hợp lệ | 1. Nhập Họ tên hợp lệ → 2. Nhập Email hợp lệ (chưa đăng ký) → 3. Nhập Mật khẩu đủ điều kiện → 4. Nhấn "Đăng ký" | Họ tên: `Test User`, Email: `testuser01@test.com`, MK: `Abc@1234` | Tài khoản được tạo; hệ thống chuyển người dùng vào giao diện chính | | | |
| TC_REG_25 | Function | Email đã tồn tại | Đăng ký với email đã có trong hệ thống | 1. Nhập email đã đăng ký → 2. Điền các trường còn lại hợp lệ → 3. Nhấn "Đăng ký" | Email: `existing@test.com`, MK: `Abc@1234` | Hệ thống hiển thị thông báo lỗi (email đã tồn tại), không tạo tài khoản mới | | | |
| TC_REG_26 | Function | Mật khẩu đủ 4 loại ký tự | Xác nhận mật khẩu đủ điều kiện được chấp nhận | 1. Nhập mật khẩu có đủ hoa, thường, số, ký tự đặc biệt → 2. Nhấn Đăng ký | MK: `Hello@World9` | Hệ thống chấp nhận, đăng ký thành công | | | |
| TC_REG_27 | Function | Email với ký tự đặc biệt hợp lệ | Đăng ký với email có dấu chấm và gạch dưới | 1. Nhập email có dấu chấm/gạch dưới → 2. Nhấn Đăng ký | Email: `test.user_01@test.com` | Hệ thống chấp nhận định dạng email hợp lệ | | | |

---

## 🔹 BUSINESS FLOW

| ID | Type | Feature | Description | Steps | Test Data | Expected Result | Actual Result | Test Result | Note |
|----|------|---------|-------------|-------|-----------|-----------------|---------------|-------------|------|
| TC_REG_28 | Business | Redirect sau đăng ký | Sau đăng ký thành công hệ thống chuyển đến đúng trang | 1. Hoàn thành đăng ký hợp lệ | Họ tên: `New User`, Email: `newuser@test.com`, MK: `Abc@1234` | Sau khi đăng ký, hệ thống tự chuyển người dùng vào trang chính (Dashboard) | | | |
| TC_REG_29 | Business | Workspace cá nhân tự động tạo | Kiểm tra workspace cá nhân được tạo sau đăng ký | 1. Đăng ký thành công → 2. Vào giao diện chính → 3. Kiểm tra danh sách nhóm/workspace | Email mới chưa đăng ký | Người dùng thấy ít nhất 1 workspace cá nhân trong danh sách nhóm ngay sau đăng ký | | | |
| TC_REG_30 | Business | Đăng nhập lại bằng tài khoản vừa tạo | Sau đăng ký có thể đăng nhập bình thường | 1. Đăng ký thành công → 2. Đăng xuất → 3. Vào trang Đăng nhập → 4. Đăng nhập với credentials vừa đăng ký | Email: `newuser@test.com`, MK: `Abc@1234` | Đăng nhập thành công, vào được giao diện chính | | | |

---

## 🔹 DATABASE

| ID | Type | Feature | Description | Steps | Test Data | Expected Result | Actual Result | Test Result | Note |
|----|------|---------|-------------|-------|-----------|-----------------|---------------|-------------|------|
| TC_REG_31 | Database | Tài khoản được lưu | Sau đăng ký tài khoản tồn tại trong hệ thống | 1. Đăng ký thành công → 2. Đăng xuất → 3. Vào trang Đăng nhập → 4. Đăng nhập với email vừa đăng ký | Email: `newuser@test.com` | Đăng nhập thành công (tài khoản đã được lưu) | | | |
| TC_REG_32 | Database | Mật khẩu không hiển thị dạng plaintext | Xác nhận mật khẩu không lộ ra trên UI | 1. Đăng ký → 2. Vào trang hồ sơ cá nhân → 3. Quan sát thông tin hiển thị | — | Mật khẩu không hiển thị dưới bất kỳ dạng nào trên UI sau đăng ký | | | |
| TC_REG_33 | Database | Đăng ký thất bại không lưu DB | Khi validation lỗi, không có tài khoản nào được tạo | 1. Điền email đã tồn tại → 2. Nhấn Đăng ký → 3. Thử đăng nhập với password vừa nhập | Email: `existing@test.com`, MK khác: `NewPass@99` | Đăng nhập với MK mới thất bại (tài khoản không bị ghi đè, không tạo mới) | | | |

---

# 🐞 BUG LIST

```
(Ghi nhận sau khi thực hiện test)
```
