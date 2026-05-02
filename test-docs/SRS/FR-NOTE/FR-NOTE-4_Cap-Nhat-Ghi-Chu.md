## 15.4. Chức năng Cập nhật ghi chú

### 15.4.1. Mô tả chức năng

**Chủ sở hữu** chỉnh sửa tiêu đề/nội dung ghi chú của mình và **Lưu** → nội dung mới hiển thị; **thời gian cập nhật lần cuối** đổi theo (FR-NOTE-4.1 — `04`, `02`, `08`, `09`). **Validation:** không cho lưu khi **nội dung trống**; giữ nguyên bản cũ (`03`). **Hủy** chỉnh sửa → không đổi dữ liệu (`06`). **Sửa một phần:** ví dụ chỉ đổi tiêu đề, giữ nội dung (`07`). **API:** `user@test.com` **không** sửa được ghi chú `id=200` của `user2` — lỗi quyền, dữ liệu không đổi (FR-NOTE-4.2, C-5 — `05`). **Chưa đăng nhập** không gọi cập nhật thành công (`10`, NFR-SEC-2).

---

### 15.4.2. Yêu cầu chức năng

**FR-NOTE-4-01:** Chỉnh sửa và lưu ghi chú của chính mình (FR-NOTE-4.1).

**FR-NOTE-4-02:** Từ chối cập nhật ghi chú không thuộc quyền sở hữu (FR-NOTE-4.2).

**FR-NOTE-4-03:** Validation nội dung hợp lệ; hủy không ghi DB.

---

### 15.4.3. Đặc tả Use Case

**Tên Use Case:** Cập nhật ghi chú  
**Mã Use Case:** UC-NOTE-UPDATE-01

**Mô tả:**  
Người dùng mở chế độ sửa, thay đổi trường và lưu.

**Tác nhân chính:**  
`user@test.com`

**Tiền điều kiện:**  
Có ghi chú `"Ghi chú gốc"` (hoặc tương đương).

**Kích hoạt:**  
Nhấn “Sửa”, chỉnh nội dung, “Lưu” hoặc “Hủy”.

**Hậu điều kiện:**  
Dữ liệu lưu khớp thao tác người dùng.

#### a. Luồng chính
1. Sửa `"Nội dung cũ"` → `"Nội dung đã cập nhật"` → lưu → hiển thị mới (`04`).

#### b. Luồng thay thế

**AF-01:** Nội dung rỗng → lỗi, không lưu (`03`).

**AF-02:** Hủy → về `"Nội dung gốc"` (`06`).

**AF-03:** Sửa V1→V2→V3 → chỉ V3 còn (`09`).

---

### 15.4.4. Dữ liệu vào
- Tiêu đề, nội dung mới

### 15.4.5. Dữ liệu ra
- Ghi chú đã cập nhật; timestamp cập nhật

---

### 15.4.6. Quy tắc nghiệp vụ
- Chỉ `owner_id` khớp mới được PATCH.

---

### 15.4.7. Điều kiện tiền đề và ràng buộc
- Test API cần biết `id` ghi chú của user khác.

---

### 15.4.8. Mức độ ưu tiên
**Mức độ ưu tiên: Cao**

---

### 15.4.9. Tiêu chí chấp nhận
- `TC_NOTE_UPDATE_01` đến `TC_NOTE_UPDATE_10` (`TC_NOTE_UPDATE.md`).
- `04`, `08`, `09` → FR-NOTE-4.1; `05` → FR-NOTE-4.2.

---

### 15.4.10. Ghi chú
- Nút “Sửa” chỉ trên ghi chú của mình — đồng bộ UI với kiểm tra quyền backend.
