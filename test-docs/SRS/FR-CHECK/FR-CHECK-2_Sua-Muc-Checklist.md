## 10.2. Chức năng Sửa mục checklist

### 10.2.1. Mô tả chức năng

Chức năng Sửa mục checklist cho phép người dùng có quyền chỉnh sửa nội dung văn bản của một mục checklist đã tồn tại. Form sửa mở với nội dung hiện tại đã điền sẵn; sau khi lưu thành công, nội dung mới hiển thị ngay. Khi sửa mục **đã hoàn thành** (đã tích), trạng thái checkbox **giữ nguyên** — chỉ đổi nội dung chữ. Hệ thống từ chối lưu nếu nội dung mới trống hoặc chỉ khoảng trắng. Người chỉ có quyền xem không thấy tùy chọn sửa. Thay đổi persist sau reload và đồng bộ với thành viên khác.

---

### 10.2.2. Yêu cầu chức năng

**FR-CHECK-2-01:** Hệ thống phải cung cấp tùy chọn sửa (nút/icon) trên mục checklist đối với người có quyền chỉnh sửa.

**FR-CHECK-2-02:** Khi chọn sửa, hệ thống phải hiển thị form với nội dung hiện tại của mục (FR-CHECK-2.1).

**FR-CHECK-2-03:** Hệ thống phải lưu nội dung mới hợp lệ và cập nhật hiển thị ngay trong danh sách.

**FR-CHECK-2-04:** Sau khi sửa mục đã hoàn thành, checkbox phải vẫn ở trạng thái đã tích; chỉ nội dung chữ thay đổi.

**FR-CHECK-2-05:** Hệ thống phải từ chối lưu khi nội dung trống hoặc chỉ khoảng trắng; giữ nguyên nội dung cũ và hiển thị thông báo lỗi.

**FR-CHECK-2-06:** Hệ thống phải cho phép hủy chỉnh sửa; sau khi hủy hoặc Escape, mục giữ nội dung gốc.

**FR-CHECK-2-07:** `viewer@test.com` (chỉ xem) không được thấy tùy chọn sửa.

**FR-CHECK-2-08:** Nội dung đã sửa phải persist sau reload.

**FR-CHECK-2-09:** Thành viên khác mở task phải thấy nội dung mới của mục đã sửa.

---

### 10.2.3. Đặc tả Use Case

**Tên Use Case:** Sửa nội dung mục checklist  
**Mã Use Case:** UC-CHECK-EDIT-01

**Mô tả:**  
Người có quyền mở sửa mục, thay đổi chuỗi nội dung và lưu hoặc hủy.

**Tác nhân chính:**  
Thành viên có quyền sửa (`member@test.com`)

**Tiền điều kiện:**
- Task `Task Check Test` có ít nhất 2 mục: `Mục A - chưa hoàn thành` và `Mục B - đã hoàn thành` (đã tích).
- `viewer@test.com` chỉ quyền xem.

**Kích hoạt:**  
Người dùng nhấn sửa trên một mục checklist.

**Hậu điều kiện:**  
Nội dung cập nhật hoặc không đổi (hủy / lỗi validation).

#### a. Luồng chính (Basic Flow)
1. `member@test.com` mở `Task Check Test`.
2. Nút sửa hiển thị trên các mục (theo quyền).
3. Người dùng sửa `Mục A - chưa hoàn thành` thành `Mục A đã được cập nhật` và Lưu.
4. Nội dung mới hiển thị ngay.

#### b. Luồng thay thế (Alternative Flow)

**AF-01: Sửa mục đã hoàn thành**
1. Sửa `Mục B - đã hoàn thành` thành `Mục B đã cập nhật`.
2. Lưu thành công.
3. Nội dung mới hiển thị; checkbox vẫn đã tích.

**AF-02: Hủy chỉnh sửa**
1. Mở form, đổi nội dung rồi nhấn Hủy hoặc Escape.
2. Mục giữ nội dung gốc.

#### c. Luồng ngoại lệ (Exception Flow)

**EF-01: Lưu trống hoặc chỉ khoảng trắng**  
→ Thông báo lỗi; giữ nội dung cũ.

**EF-02: Viewer không có quyền**  
Không hiển thị tùy chọn sửa.

---

### 10.2.4. Dữ liệu vào
- Nội dung chữ mới của mục checklist

### 10.2.5. Dữ liệu ra
- Mục checklist với nội dung đã cập nhật
- Thông báo lỗi khi không lưu

---

### 10.2.6. Quy tắc nghiệp vụ
- Sửa nội dung không được tự động đổi trạng thái hoàn thành/chưa hoàn thành của checkbox trừ khi có luồng riêng (theo test: trạng thái tích giữ nguyên khi sửa mục đã hoàn thành).

---

### 10.2.7. Điều kiện tiền đề và ràng buộc
- Phân quyền: member vs viewer như bộ test.

---

### 10.2.8. Mức độ ưu tiên
**Mức độ ưu tiên: Cao**

**Lý do:**  
Cho phép chỉnh lại wording của mục mà không phải xóa và tạo lại.

---

### 10.2.9. Tiêu chí chấp nhận
- Tùy chọn sửa, form có nội dung sẵn; responsive.
- Sửa mục chưa hoàn thành → lưu thành công.
- Sửa mục đã hoàn thành → nội đổi, tích không đổi.
- Trống / chỉ khoảng trắng → lỗi, giữ nội dung cũ.
- Hủy → không đổi.
- Viewer không thấy sửa.
- Persist reload; thành viên khác thấy nội dung mới.

---

### 10.2.10. Ghi chú
- Test case tham chiếu: `TC_CHECK_EDIT_01` đến `TC_CHECK_EDIT_11` (file `TC_CHECK_EDIT.md`).
