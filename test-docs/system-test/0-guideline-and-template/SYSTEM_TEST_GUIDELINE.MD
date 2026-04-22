# 📄 SYSTEM TEST GUIDELINE FOR AI AGENT

## 🎯 Mục tiêu

Bạn là một **AI Agent chuyên viết System Test** cho một dự án đã hoàn thành.

Nhiệm vụ của bạn:

* Đọc hiểu **SRS / code / UI / API / DB**
* Sinh ra:

  * Checklist test phù hợp theo từng module
  * Test cases chi tiết
* Đảm bảo:

  * Bao phủ **UI + Validation + Business logic + Database + Flow**

---

## ⚠️ Nguyên tắc quan trọng

* ❗ Không bắt buộc phải dùng toàn bộ checklist
* ❗ Được phép:

  * Thêm
  * Xóa
  * Điều chỉnh
* 👉 Mục tiêu: **phù hợp với ngữ cảnh module**

---

## ⚠️ NGUYÊN TẮC QUAN TRỌNG BỔ SUNG (RẤT QUAN TRỌNG CHO AI AGENT)

### 1. Ưu tiên nguồn dữ liệu

* SRS đã chuẩn hóa là **nguồn chính (source of truth)** để sinh checklist và test case
* Code / API / DB chỉ dùng để:

  * xác minh hành vi
  * bổ sung edge case
  * kiểm tra constraint
* ❗ Không được suy luận hành vi chính từ code nếu SRS đã mô tả rõ

---

### 2. Giới hạn đọc code (tránh tốn token)

* ❗ Không đọc toàn bộ codebase
* Chỉ đọc:

  * file liên quan trực tiếp đến module đang test
* Nếu không cần thiết → **không đọc code**

---

### 3. Tuân thủ black-box testing

* ❗ Không viết test case dựa trên:

  * implementation nội bộ
  * logic ẩn không visible với user
* Test phải dựa trên:

  * input / output
  * hành vi quan sát được

---

### 4. Mapping với SRS

* Mỗi checklist item hoặc test case phải:

  * map được tới **requirement / constraint / rule trong SRS**
* ❗ Không tạo test “mơ hồ không có nguồn”

---

### 5. Không sinh checklist chung chung

❌ Sai:

* “Kiểm tra UI đúng”
* “Kiểm tra DB đúng”

✅ Đúng:

* “Kiểm tra title task không vượt quá 200 ký tự”
* “Kiểm tra user không thuộc workspace không thể truy cập task”

---

### 6. Ưu tiên theo mức độ quan trọng

Thứ tự ưu tiên:

1. Business logic
2. Data consistency
3. Validation
4. Flow
5. UI

---

### 7. Chia nhỏ theo module (bắt buộc)

* ❗ Chỉ làm việc trên **1 module tại 1 thời điểm**
* Không sinh test cho toàn hệ thống trong 1 lần

---

## 🧠 Quy trình thực hiện

### Bước 1: Xây dựng checklist test (tùy chọn nhưng khuyến nghị)

* Áp dụng checklist bên dưới
* Customize theo module

---

### Bước 2: Viết test cases

Bao gồm:

* GUI
* Validation
* Function
* Flow / Business
* Database

---

### Bước 3: Chuẩn bị test data (nếu cần)

---

### Bước 4: Thực hiện test & ghi nhận kết quả

* Pass / Fail
* Nếu Fail:

  * Mô tả lỗi rõ ràng
  * Ghi note

---

## 🔁 QUY TRÌNH CHẠY AI AGENT (RECOMMENDED)

### Phase 1: Sinh checklist

Input:

* SRS module
* Guideline này

Output:

* Checklist đã customize
* Mapping với SRS

---

### Phase 2: Sinh test case

Input:

* Checklist đã chốt
* Template test case
* (Optional) Code/UI/API liên quan module

Output:

* Test cases chi tiết

---

### Phase 3: Review

* Kiểm tra:

  * thiếu case?
  * duplicate?
  * sai black-box?
  * thiếu edge case?

---

# ✅ CHECKLIST SYSTEM TEST (FULL)

## 1. 🧩 CHUNG / UI

* Giao diện người dùng có đúng với prototype không?
* Danh sách menu và màn hình có thống nhất không?
* Các link html có hoạt động không?
* Tất cả các cửa sổ đều có thể truy cập từ toolbar?
* Tất cả các trang web/cửa sổ đều có thể truy cập từ menu?
* Các màn hình được gọi từ button có hiển thị đúng không?
* Font chữ, màu chữ có đúng yêu cầu không?
* Căn lề, khoảng cách có đúng không?
* Text căn trái? Số căn phải?
* Form có dễ sử dụng không?
* Phím tắt có hoạt động không?
* Không có lỗi chính tả?
* Viết tắt có thống nhất?
* Format ngày, số có đúng?
* Tooltip có hiển thị và hữu ích không?
* Có default value?
* Tab navigation đúng thứ tự?
* Shift+Tab đúng thứ tự?
* Enter trigger đúng button?
* Resize không vỡ UI?
* Required field có dấu *?
* Data hiển thị đúng DB?
* Đổi ngôn ngữ đúng?
* Captcha hoạt động?
* Field disabled có đúng style?

---

## 2. 🔍 VALIDATION

### Text / String

* Max length đúng?
* Có phân biệt hoa thường không?
* Có cho phép null không?
* Có cho phép ký tự đặc biệt không?

### Number

* Max length đúng?
* Boundary value đúng?
* Có cho phép ký tự đặc biệt không?
* Có cho phép null không?
* Có cho phép nhập chữ không?
* Lỗi chia cho 0?

### Date / Time

* Format đúng?
* Ngày hợp lệ?
* Cho phép chọn ngày?
* Cho phép nhập tay?
* Có validate null?
* Có validate ký tự?

### File

* Giới hạn min/max file?
* Upload multiple?
* Allow null?
* Validate loại file?

---

## 3. ⚠️ THÔNG BÁO

* Thông báo lỗi có thống nhất?
* Thông báo đúng?
* Dễ hiểu?
* Không đổ lỗi user?
* Có gợi ý sửa lỗi?
* Có confirm khi action nguy hiểm (delete/update)?
* Có thông báo:

  * invalid input
  * boundary
  * exception

---

## 4. 🎨 TRẠNG THÁI

* Status hiển thị đúng?
* Màu phân biệt rõ?

---

## 5. 🗄 DATABASE

### Thêm mới

* Thành công → hiển thị trên UI?
* Thiếu field → có cảnh báo?
* Fail → không lưu DB?
* Success → lưu DB?

### Xóa

* Có confirm?
* Có update dữ liệu liên quan?
* Soft delete hay hard delete?

### Sửa

* Duplicate → có cảnh báo?
* Update thành công → có thông báo?
* Có update dữ liệu liên quan?
* DB update đúng?

### Chung

* Concurrent update?
* Rollback khi fail?
* Trim space?
* Combobox lưu id?

---

## 6. 🔁 NGHIỆP VỤ

* Đã test hết:

  * valid cases?
  * invalid cases?
* Flow tối ưu?
* Dễ dùng?

---

# 🧪 TEMPLATE TEST CASE (FOR AI AGENT)

## 📌 Format

```md
### Test Case ID: <ID>

- Module: <module name>
- Feature: <feature name>

### Mục đích
<Mô tả mục tiêu test>

### Pre-condition
<Điều kiện trước>

### Test Steps
1. ...
2. ...

### Test Data
<dữ liệu test cụ thể>

### Expected Result
<kết quả mong muốn>

### Actual Result
<kết quả thực tế khi chạy test>

### Test Result
Pass / Fail

### Note
<Nếu fail: lỗi gì, nguyên nhân>
```

---

# 🧠 RULES CHO AI AGENT

## 1. Phân tích trước khi test

* Đọc:

  * SRS
  * UI
  * API
  * DB schema
* Xác định:

  * Luồng chính
  * Edge case
  * Constraint

---

## 2. Sinh test thông minh

Không chỉ copy checklist → phải:

* Mapping checklist → module
* Loại bỏ item không liên quan
* Thêm case đặc thù

---

## 3. Bao phủ test

Phải có đủ:

| Type           | Required |
| -------------- | -------- |
| UI             | ✅        |
| Validation     | ✅        |
| API            | nếu có   |
| Business logic | ✅        |
| Flow           | ✅        |
| Database       | ✅        |

---

## 4. Ưu tiên test quan trọng

1. Business logic
2. Data consistency
3. Validation
4. UI

---

## 5. Naming convention

* TC_<MODULE>_<NUMBER>
* Ví dụ:

  * TC_AUTH_01
  * TC_TASK_12

---

# 🚀 OUTPUT MONG MUỐN

AI Agent cần output:

```md
# Module: <Tên module>

## Checklist (customized)

## Test Cases
...
```

