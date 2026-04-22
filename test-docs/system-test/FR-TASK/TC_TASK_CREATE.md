# TC_TASK_CREATE — FR-TASK-1: Tạo Công Việc

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | FR-TASK — Quản lý công việc |
| Feature | FR-TASK-1 — Tạo công việc |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Ứng dụng đang chạy; đã đăng nhập với `member@test.com` / `Abc@1234`; đang ở trong nhóm `Group Task Test`; nhóm có ít nhất 1 thư mục |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 20    |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Form tạo công việc hiển thị đầy đủ: Tiêu đề, Mô tả, Trạng thái, Độ ưu tiên, Ngày đến hạn, Nhãn
- [ ] Trường Tiêu đề là bắt buộc
- [ ] Tạo thành công → công việc xuất hiện trong danh sách ngay
- [ ] Tiêu đề bỏ trống → thông báo lỗi, không tạo được
- [ ] Tiêu đề = 200 ký tự → tạo thành công (boundary)
- [ ] Tiêu đề = 201 ký tự → thông báo lỗi (boundary)
- [ ] Mô tả = 2000 ký tự → tạo thành công (boundary)
- [ ] Mô tả = 2001 ký tự → thông báo lỗi (boundary)
- [ ] Trạng thái không hợp lệ → thông báo lỗi
- [ ] Độ ưu tiên không hợp lệ → thông báo lỗi
- [ ] Thêm > 10 nhãn → thông báo lỗi, giới hạn tối đa 10
- [ ] Nhãn > 30 ký tự → thông báo lỗi
- [ ] Chưa chọn nhóm → thông báo yêu cầu chọn nhóm
- [ ] Giao diện responsive

---

## TEST CASES

### UI TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_TASK_CREATE_01 | Form tạo công việc hiển thị đầy đủ | Đăng nhập, đang ở `Group Task Test` | 1. Nhấn nút "Tạo công việc" | — | Hiển thị các trường: Tiêu đề, Mô tả, Trạng thái, Độ ưu tiên, Ngày đến hạn, Nhãn; nút Tạo có thể click | | | |
| TC_TASK_CREATE_02 | Trường tiêu đề được đánh dấu bắt buộc | Form đang mở | 1. Quan sát trường Tiêu đề | — | Trường có dấu * hoặc placeholder chỉ rõ bắt buộc | | | |
| TC_TASK_CREATE_03 | Giao diện responsive | Form tạo công việc đang mở | 1. Resize cửa sổ nhiều kích thước | — | Form không bị vỡ layout | | | |

---

### VALIDATION — Tiêu đề

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_TASK_CREATE_04 | Tiêu đề bỏ trống | Form đang mở | 1. Để trống Tiêu đề<br>2. Nhấn Tạo | Tiêu đề: _(trống)_ | Hiển thị thông báo lỗi; không tạo công việc | | | |
| TC_TASK_CREATE_05 | Tiêu đề chỉ khoảng trắng | Form đang mở | 1. Nhập khoảng trắng<br>2. Nhấn Tạo | Tiêu đề: `   ` | Hiển thị thông báo lỗi; không tạo công việc | | | |
| TC_TASK_CREATE_06 | Tiêu đề đúng 200 ký tự | Form đang mở | 1. Nhập tiêu đề 200 ký tự<br>2. Nhấn Tạo | Tiêu đề: chuỗi 200 ký tự | Tạo công việc thành công | | | Boundary value |
| TC_TASK_CREATE_07 | Tiêu đề 201 ký tự | Form đang mở | 1. Nhập tiêu đề 201 ký tự<br>2. Nhấn Tạo | Tiêu đề: chuỗi 201 ký tự | Hiển thị thông báo lỗi; không tạo | | | Boundary value |

---

### VALIDATION — Mô tả

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_TASK_CREATE_08 | Mô tả đúng 2000 ký tự | Form đang mở | 1. Nhập tiêu đề hợp lệ<br>2. Nhập mô tả 2000 ký tự<br>3. Nhấn Tạo | Mô tả: chuỗi 2000 ký tự | Tạo thành công | | | Boundary value |
| TC_TASK_CREATE_09 | Mô tả 2001 ký tự | Form đang mở | 1. Nhập tiêu đề hợp lệ<br>2. Nhập mô tả 2001 ký tự<br>3. Nhấn Tạo | Mô tả: chuỗi 2001 ký tự | Hiển thị thông báo lỗi; không tạo | | | Boundary value |

---

### VALIDATION — Trạng thái & Độ ưu tiên

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_TASK_CREATE_10 | Trạng thái hợp lệ | Form đang mở | 1. Chọn từng trạng thái có trong dropdown<br>2. Nhấn Tạo | Trạng thái: `Todo`, `In Progress`, `Done` | Tạo thành công với mỗi trạng thái hợp lệ | | | |
| TC_TASK_CREATE_11 | Độ ưu tiên hợp lệ | Form đang mở | 1. Chọn từng mức độ ưu tiên có trong dropdown<br>2. Nhấn Tạo | Độ ưu tiên: `Low`, `Medium`, `High` | Tạo thành công với mỗi mức độ ưu tiên | | | |

---

### VALIDATION — Nhãn

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_TASK_CREATE_12 | Thêm đúng 10 nhãn | Form đang mở | 1. Thêm đúng 10 nhãn hợp lệ<br>2. Nhấn Tạo | 10 nhãn, mỗi nhãn ≤ 30 ký tự | Tạo thành công với 10 nhãn | | | Boundary value |
| TC_TASK_CREATE_13 | Thêm nhãn thứ 11 | Đã có 10 nhãn | 1. Thêm nhãn thứ 11 | Nhãn thứ 11 | Hệ thống ngăn thêm; hiển thị thông báo đã đạt giới hạn 10 nhãn | | | |
| TC_TASK_CREATE_14 | Nhãn đúng 30 ký tự | Form đang mở | 1. Nhập nhãn đúng 30 ký tự | Nhãn: chuỗi 30 ký tự | Thêm nhãn thành công | | | Boundary value |
| TC_TASK_CREATE_15 | Nhãn 31 ký tự | Form đang mở | 1. Nhập nhãn 31 ký tự | Nhãn: chuỗi 31 ký tự | Hiển thị thông báo lỗi; không thêm nhãn | | | Boundary value |

---

### FUNCTION TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_TASK_CREATE_16 | Tạo công việc thành công với chỉ tiêu đề | Đăng nhập, đang ở nhóm | 1. Nhập tiêu đề<br>2. Để trống các trường còn lại<br>3. Nhấn Tạo | Tiêu đề: `New Task Alpha` | Công việc được tạo; xuất hiện trong danh sách với trạng thái và độ ưu tiên mặc định | | | |
| TC_TASK_CREATE_17 | Tạo công việc đầy đủ thông tin | Đăng nhập, đang ở nhóm | 1. Điền đầy đủ tất cả trường<br>2. Nhấn Tạo | Tiêu đề: `Full Task`; Mô tả: `Description`; Trạng thái: `In Progress`; Độ ưu tiên: `High`; Ngày đến hạn: ngày hợp lệ | Công việc được tạo với đúng tất cả thông tin đã nhập | | | |
| TC_TASK_CREATE_18 | Tiêu đề có ký tự đặc biệt / tiếng Việt | Form đang mở | 1. Nhập tiêu đề có ký tự đặc biệt<br>2. Nhấn Tạo | Tiêu đề: `Công việc #1 & Sprint!` | Tạo thành công; tiêu đề hiển thị đúng | | | |
| TC_TASK_CREATE_19 | Chưa chọn nhóm cố tạo công việc | Không đang ở trong nhóm nào | 1. Cố truy cập chức năng tạo công việc mà không chọn nhóm | — | Hệ thống hiển thị thông báo yêu cầu chọn nhóm trước; không hiển thị form tạo | | | |

---

### BUSINESS FLOW

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_TASK_CREATE_20 | Công việc mới xuất hiện ngay trong danh sách (không reload) | Đang ở `Group Task Test` | 1. Tạo công việc thành công<br>2. Quan sát danh sách ngay sau đó | Tiêu đề: `New Task Beta` | Công việc xuất hiện ngay, không cần reload trang | | | |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
