## 13.5. Chức năng Sửa và xóa tin nhắn trực tiếp

### 13.5.1. Mô tả chức năng

Chức năng Sửa và xóa tin nhắn trực tiếp cho phép người dùng chỉnh sửa hoặc xóa **chỉ tin do chính mình gửi** trong hội thoại 1-1 (FR-DIRECT-5.1). Nút Sửa/Xóa chỉ trên tin của mình — **C-5**. Sửa thành công → nội dung mới + nhãn đã chỉnh sửa; không cho lưu **rỗng** hoặc **> 5000 ký tự** (C-11). Hủy sửa → giữ nội dung gốc. Cố **API** sửa/xóa tin đối phương → không có quyền; tin đối phương không đổi. **user2** đang online thấy sửa/xóa **realtime** không reload (`TC_DIRECT_EDIT_DELETE_11`–`12`). Lịch sử sau sửa/xóa nhất quán khi cuộn (`13`–`14`).

---

### 13.5.2. Yêu cầu chức năng

**FR-DIRECT-5-01:** Sửa tin mình → nội dung + nhãn đã sửa (FR-DIRECT-5.1).

**FR-DIRECT-5-02:** Xóa tin mình → tin biến mất (FR-DIRECT-5.1).

**FR-DIRECT-5-03:** Không sửa/xóa tin người khác qua UI; API từ chối (FR-DIRECT-5.1 / C-5).

**FR-DIRECT-5-04:** Validation sửa: không rỗng; không 5001 ký tự.

**FR-DIRECT-5-05:** Realtime đồng bộ cho đối phương.

---

### 13.5.3. Đặc tả Use Case

**Tên Use Case:** Sửa hoặc xóa tin nhắn của mình trong DM  
**Mã Use Case:** UC-DIRECT-EDIT-DELETE-01

**Mô tả:**  
Tác giả tin cập nhật hoặc gỡ tin khỏi luồng hội thoại.

**Tác nhân chính:**  
`user1@test.com`, `user2@test.com`

**Tiền điều kiện:**  
Hội thoại tồn tại; mỗi người đã có ít nhất một tin.

**Kích hoạt:**  
Chọn Sửa/Xóa trên tin của mình hoặc gọi API (case trái phép).

**Hậu điều kiện:**  
Tin cập nhật/xóa hoặc lỗi quyền/validation.

#### a. Luồng chính — Sửa
1. Sửa `"Phiên bản 1"` → `"Phiên bản 2"` → nhãn đã chỉnh sửa.

#### b. Luồng chính — Xóa
1. Xóa `"Tin sẽ xóa"` → biến mất; tin khác giữ nguyên.

#### c. Luồng ngoại lệ
**EF:** API sửa/xóa tin của `user2` khi đăng nhập `user1` → từ chối.

---

### 13.5.4. Dữ liệu vào
- Nội dung sau sửa / yêu cầu xóa

### 13.5.5. Dữ liệu ra
- Tin cập nhật hoặc đã xóa khỏi UI

---

### 13.5.6. Quy tắc nghiệp vụ
- Quyền sở hữu tin nhắn: chỉ tác giả chỉnh sửa/xóa (C-5).

---

### 13.5.7. Điều kiện tiền đề và ràng buộc
- Tin phải thuộc về người thực hiện thao tác hợp lệ.

---

### 13.5.8. Mức độ ưu tiên
**Mức độ ưu tiên: Cao**

---

### 13.5.9. Tiêu chí chấp nhận
- `TC_DIRECT_EDIT_DELETE_01` đến `TC_DIRECT_EDIT_DELETE_14` (`TC_DIRECT_EDIT_DELETE.md`).

---

### 13.5.10. Ghi chú
- **FR-DIRECT-5.1** bao trùm sửa/xóa của mình và từ chối sửa/xóa tin người khác (`07`–`10`).
- C-5 trên UI `01`–`02`; C-11 `05`.
