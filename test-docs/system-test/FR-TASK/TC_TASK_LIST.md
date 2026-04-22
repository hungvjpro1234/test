# TC_TASK_LIST — FR-TASK-2: Xem Danh Sách Công Việc

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | FR-TASK — Quản lý công việc |
| Feature | FR-TASK-2 — Xem danh sách công việc |
| Version | 1.0 |
| Test Type | System Test (Black-box) |
| Pre-conditions | Ứng dụng đang chạy; đăng nhập `member@test.com` / `Abc@1234`; nhóm `Group Task Test` có ≥ 10 công việc với đa dạng trạng thái (`Todo`, `In Progress`, `Done`), độ ưu tiên (`Low`, `Medium`, `High`), thuộc các thư mục khác nhau |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 18    |      |      |          |     |

---

## CUSTOMIZED CHECKLIST

- [ ] Danh sách công việc hiển thị đúng, có phân trang nếu nhiều công việc
- [ ] Mỗi công việc hiển thị: tiêu đề, trạng thái, độ ưu tiên, ngày đến hạn
- [ ] Lọc theo trạng thái → chỉ hiển thị công việc đúng trạng thái
- [ ] Lọc theo độ ưu tiên → chỉ hiển thị công việc đúng độ ưu tiên
- [ ] Lọc theo thư mục → chỉ hiển thị công việc trong thư mục đó
- [ ] Kết hợp nhiều bộ lọc → kết quả đúng logic AND
- [ ] Xóa bộ lọc → hiển thị lại toàn bộ danh sách
- [ ] Tìm kiếm theo từ khóa tiêu đề → ra đúng kết quả
- [ ] Tìm kiếm không có kết quả → hiển thị thông báo "không tìm thấy"
- [ ] Sắp xếp theo ngày tạo tăng/giảm dần → đúng thứ tự
- [ ] Sắp xếp theo ngày đến hạn → đúng thứ tự
- [ ] Sắp xếp theo độ ưu tiên → đúng thứ tự
- [ ] Giao diện responsive

---

## TEST CASES

### UI TEST

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_TASK_LIST_01 | Danh sách công việc hiển thị đúng giao diện | Đăng nhập, vào `Group Task Test` | 1. Mở màn hình danh sách công việc | — | Hiển thị danh sách; mỗi item có tiêu đề, trạng thái, độ ưu tiên; layout không lỗi | | | |
| TC_TASK_LIST_02 | Giao diện responsive | Đang xem danh sách | 1. Resize cửa sổ trình duyệt | — | Danh sách không bị vỡ layout | | | |

---

### FUNCTION TEST — Lọc công việc

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_TASK_LIST_03 | Lọc theo trạng thái `Todo` | Đang xem danh sách | 1. Chọn bộ lọc Trạng thái = `Todo` | Trạng thái: `Todo` | Chỉ hiển thị công việc có trạng thái `Todo` | | | |
| TC_TASK_LIST_04 | Lọc theo trạng thái `Done` | Đang xem danh sách | 1. Chọn bộ lọc Trạng thái = `Done` | Trạng thái: `Done` | Chỉ hiển thị công việc có trạng thái `Done` | | | |
| TC_TASK_LIST_05 | Lọc theo độ ưu tiên `High` | Đang xem danh sách | 1. Chọn bộ lọc Độ ưu tiên = `High` | Độ ưu tiên: `High` | Chỉ hiển thị công việc có độ ưu tiên `High` | | | |
| TC_TASK_LIST_06 | Lọc theo thư mục | Đang xem danh sách | 1. Chọn bộ lọc Thư mục = `Folder A` | Thư mục: `Folder A` | Chỉ hiển thị công việc thuộc `Folder A` | | | |
| TC_TASK_LIST_07 | Kết hợp nhiều bộ lọc | Đang xem danh sách | 1. Chọn Trạng thái = `In Progress` VÀ Độ ưu tiên = `High` | Trạng thái: `In Progress`, Độ ưu tiên: `High` | Chỉ hiển thị công việc thỏa cả 2 điều kiện (AND) | | | |
| TC_TASK_LIST_08 | Xóa bộ lọc → hiển thị lại tất cả | Đang lọc theo 1 điều kiện | 1. Nhấn "Xóa bộ lọc" hoặc reset | — | Danh sách trở về đầy đủ không lọc | | | |

---

### FUNCTION TEST — Tìm kiếm

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_TASK_LIST_09 | Tìm kiếm theo từ khóa khớp tiêu đề | Đang xem danh sách | 1. Nhập từ khóa vào ô tìm kiếm | Từ khóa: `Alpha` (có trong tiêu đề 1 task) | Hiển thị đúng công việc có tiêu đề chứa `Alpha` | | | |
| TC_TASK_LIST_10 | Tìm kiếm không phân biệt hoa thường | Đang xem danh sách | 1. Nhập từ khóa chữ thường | Từ khóa: `alpha` (task có tiêu đề `Alpha`) | Vẫn tìm thấy kết quả | | | |
| TC_TASK_LIST_11 | Tìm kiếm không có kết quả | Đang xem danh sách | 1. Nhập từ khóa không khớp với bất kỳ task nào | Từ khóa: `xyznonexistent123` | Hiển thị thông báo "không tìm thấy kết quả" | | | |
| TC_TASK_LIST_12 | Xóa từ khóa tìm kiếm → hiển thị lại toàn bộ | Sau khi tìm kiếm | 1. Xóa nội dung ô tìm kiếm | — | Danh sách đầy đủ hiển thị lại | | | |

---

### FUNCTION TEST — Sắp xếp

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_TASK_LIST_13 | Sắp xếp theo ngày tạo (mới nhất trước) | Đang xem danh sách | 1. Chọn sắp xếp: Ngày tạo giảm dần | — | Công việc tạo gần đây nhất hiển thị đầu tiên | | | |
| TC_TASK_LIST_14 | Sắp xếp theo ngày tạo (cũ nhất trước) | Đang xem danh sách | 1. Chọn sắp xếp: Ngày tạo tăng dần | — | Công việc tạo lâu nhất hiển thị đầu tiên | | | |
| TC_TASK_LIST_15 | Sắp xếp theo ngày đến hạn | Đang xem danh sách | 1. Chọn sắp xếp: Ngày đến hạn tăng dần | — | Công việc đến hạn sớm nhất hiển thị đầu; task không có deadline xuống cuối | | | |
| TC_TASK_LIST_16 | Sắp xếp theo độ ưu tiên | Đang xem danh sách | 1. Chọn sắp xếp: Độ ưu tiên giảm dần | — | `High` → `Medium` → `Low` | | | |

---

### BUSINESS FLOW

| ID | Test Case | Pre-condition | Steps | Test Data | Expected Result | Actual Result | Result | Note |
|----|-----------|---------------|-------|-----------|-----------------|---------------|--------|------|
| TC_TASK_LIST_17 | Danh sách cập nhật ngay khi tạo task mới | Đang xem danh sách | 1. Tạo công việc mới<br>2. Quan sát danh sách | Tiêu đề: `Live Update Task` | Công việc mới xuất hiện ngay mà không cần reload | | | |
| TC_TASK_LIST_18 | Danh sách độc lập theo nhóm | Thành viên ≥ 2 nhóm | 1. Xem danh sách task nhóm A<br>2. Chuyển sang nhóm B<br>3. Kiểm tra danh sách | — | Mỗi nhóm hiển thị đúng task của nhóm mình, không lẫn dữ liệu | | | |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
