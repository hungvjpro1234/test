## 15.6. Chức năng Đánh dấu ghi chú yêu thích

### 15.6.1. Mô tả chức năng

Người dùng **bật/tắt yêu thích** trên từng ghi chú bằng icon/nút (toggle). Lần nhấn đầu → **đánh dấu yêu thích**; lần nhấn sau trên cùng ghi chú → **gỡ yêu thích** (FR-NOTE-6.1 — `04`, `05`). **Giao diện** phản ánh trạng thái (ví dụ ngôi sao đặc/rỗng — `02`, `03`). **Chỉ** ghi chú được chọn đổi trạng thái; ghi chú khác không bị ảnh hưởng (`06`). **Persist:** sau reload trạng thái yêu thích giữ nguyên (`07`). **Toggle nhiều lần** → trạng thái cuối lưu đúng (`08`). Checklist có “lọc xem riêng yêu thích” — triển khai nếu sản phẩm có tính năng tương ứng.

---

### 15.6.2. Yêu cầu chức năng

**FR-NOTE-6-01:** Toggle yêu thích trên ghi chú (FR-NOTE-6.1).

**FR-NOTE-6-02:** Lưu trạng thái và hiển thị nhất quán sau reload.

---

### 15.6.3. Đặc tả Use Case

**Tên Use Case:** Đánh dấu / gỡ yêu thích ghi chú  
**Mã Use Case:** UC-NOTE-FAVORITE-01

**Mô tả:**  
Người dùng nhấn icon yêu thích để đánh dấu hoặc bỏ đánh dấu.

**Tác nhân chính:**  
`user@test.com`

**Tiền điều kiện:**  
≥2 ghi chú trong danh sách hoặc chi tiết.

**Kích hoạt:**  
Nhấn icon yêu thích trên một ghi chú.

**Hậu điều kiện:**  
Trạng thái favorite của ghi chú đó cập nhật.

#### a. Luồng chính
1. `"Ghi chú A"` chưa yêu thích → nhấn → đánh dấu (`04`, `02`).

#### b. Luồng thay thế

**AF-01:** Nhấn lại → gỡ yêu thích (`05`, `03`).

**AF-02:** Bật/tắt/bật → sau reload vẫn đúng trạng thái cuối (`08`).

---

### 15.6.4. Dữ liệu vào
- ID ghi chú; hành động toggle

### 15.6.5. Dữ liệu ra
- `favorite` hoặc trường tương đương; UI cập nhật

---

### 15.6.6. Quy tắc nghiệp vụ
- Trạng thái yêu thích thuộc người dùng–ghi chú (theo mô hình dữ liệu).

---

### 15.6.7. Điều kiện tiền đề và ràng buộc
- Không có trong TC test quyền “yêu thích ghi chú người khác” — mặc định chỉ trên ghi chú của mình hoặc có quyền xem.

---

### 15.6.8. Mức độ ưu tiên
**Mức độ ưu tiên: Trung bình**

---

### 15.6.9. Tiêu chí chấp nhận
- `TC_NOTE_FAVORITE_01` đến `TC_NOTE_FAVORITE_08` (`TC_NOTE_FAVORITE.md`).
- `04`, `05`, `08` → FR-NOTE-6.1.

---

### 15.6.10. Ghi chú
- Nếu có màn “Chỉ yêu thích”, bổ sung TC UI riêng.
