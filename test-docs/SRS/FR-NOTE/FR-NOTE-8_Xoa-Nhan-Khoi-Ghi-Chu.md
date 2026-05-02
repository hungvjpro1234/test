## 15.8. Chức năng Xóa nhãn khỏi ghi chú

### 15.8.1. Mô tả chức năng

Trên **chi tiết ghi chú**, danh sách **nhãn** gắn với ghi chú hiển thị đầy đủ; mỗi nhãn có thể **gỡ** (icon × hoặc tương đương). **Xóa một nhãn** → nhãn đó biến khỏi ghi chú; các nhãn khác giữ nguyên (FR-NOTE-8.1 — `03`, `04`). **Xóa hết nhãn** → vùng nhãn trống, không lỗi (`05`). **Persist:** sau reload nhãn đã gỡ không xuất hiện lại (`07`). **API:** `user@test.com` không gỡ nhãn trên ghi chú `id=202` của `user2` — từ chối, nhãn còn (C-5 — `06`). **TC_TAG_08:** Gỡ nhãn khỏi ghi chú chỉ bỏ liên kết trên ghi chú đó; nếu có “kho nhãn” chung, nhãn có thể vẫn tồn tại trong kho.

---

### 15.8.2. Yêu cầu chức năng

**FR-NOTE-8-01:** Gỡ một nhãn khỏi ghi chú của mình (FR-NOTE-8.1).

**FR-NOTE-8-02:** Không cho phép thao tác trên ghi chú không thuộc quyền.

---

### 15.8.3. Đặc tả Use Case

**Tên Use Case:** Xóa nhãn khỏi ghi chú  
**Mã Use Case:** UC-NOTE-TAG-01

**Mô tả:**  
Người dùng gỡ một tag khỏi một ghi chú cụ thể.

**Tác nhân chính:**  
`user@test.com`

**Tiền điều kiện:**  
Ghi chú có ít nhất 2 nhãn (ví dụ `"Công việc"`, `"Học tập"`).

**Kích hoạt:**  
Nhấn × trên một nhãn.

**Hậu điều kiện:**  
Tập nhãn của ghi chú cập nhật.

#### a. Luồng chính
1. Xóa `"Công việc"` → chỉ còn `"Học tập"` (`03`).

#### b. Luồng thay thế

**AF-01:** Xóa nhãn cuối → danh sách nhãn rỗng (`05`).

**AF-02:** Gỡ nhãn người khác qua API → lỗi (`06`).

---

### 15.8.4. Dữ liệu vào
- ID ghi chú; ID/tên nhãn cần gỡ

### 15.8.5. Dữ liệu ra
- Danh sách nhãn sau gỡ

---

### 15.8.6. Quy tắc nghiệp vụ
- Chỉ chủ sở hữu ghi chú gỡ nhãn (theo C-5 trong test).

---

### 15.8.7. Điều kiện tiền đề và ràng buộc
- Chuẩn bị ghi chú đủ nhãn và ghi chú `user2` cho test API.

---

### 15.8.8. Mức độ ưu tiên
**Mức độ ưu tiên: Trung bình**

---

### 15.8.9. Tiêu chí chấp nhận
- `TC_NOTE_TAG_01` đến `TC_NOTE_TAG_08` (`TC_NOTE_TAG.md`).
- `03` → FR-NOTE-8.1.

---

### 15.8.10. Ghi chú
- Thêm/xóa nhãn từ “kho nhãn” (nếu có module riêng) nằm ngoài phạm vi TC này trừ khi có test bổ sung.
