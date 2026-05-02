## 12.3. Chức năng Sửa và xóa tin nhắn nhóm

### 12.3.1. Mô tả chức năng

Chức năng Sửa và xóa tin nhắn cho phép người dùng chỉnh sửa hoặc xóa **chỉ các tin do chính mình gửi** trong chat nhóm. Nút Sửa và Xóa chỉ hiển thị trên tin của user hiện tại; tin của người khác không có tùy chọn này trên UI. Khi sửa thành công, nội dung cập nhật và hiển thị nhãn **đã chỉnh sửa**; không cho phép lưu nội dung rỗng hoặc vượt 5000 ký tự (C-11). Cố sửa/xóa tin người khác qua API phải bị từ chối với thông báo không có quyền (FR-CHAT-3.2, FR-CHAT-3.4). Xóa tin của mình → tin biến mất khỏi khung chat; các tin khác không ảnh hưởng. Hủy khi đang sửa → giữ nội dung gốc. Thành viên khác **online** thấy sửa/xóa **ngay lập tức** — chi tiết đồng bộ thời gian thực xem thêm FR-CHAT-6 và `TC_CHAT_REALTIME` / `TC_CHAT_EDIT_DELETE_11`–`12`.

---

### 12.3.2. Yêu cầu chức năng

**FR-CHAT-3-01:** Sửa tin của mình → nội dung mới + nhãn đã chỉnh sửa (FR-CHAT-3.1).

**FR-CHAT-3-02:** Cố sửa tin người khác (API) → không có quyền; tin không đổi (FR-CHAT-3.2).

**FR-CHAT-3-03:** Xóa tin của mình → tin không còn hiển thị (FR-CHAT-3.3).

**FR-CHAT-3-04:** Cố xóa tin người khác (API) → không có quyền (FR-CHAT-3.4).

**FR-CHAT-3-05:** Validation khi sửa: không rỗng; không quá 5001 ký tự.

**FR-CHAT-3-06:** Hủy sửa → giữ `"Nội dung gốc"`.

**FR-CHAT-3-07:** Sau sửa/xóa, lịch sử chat phản ánh đúng (cuộn xem không còn tin đã xóa; tin đã sửa hiển thị phiên bản mới).

---

### 12.3.3. Đặc tả Use Case

**Tên Use Case:** Sửa hoặc xóa tin nhắn của chính mình trong chat nhóm  
**Mã Use Case:** UC-CHAT-EDIT-DELETE-01

**Mô tả:**  
Tác giả tin nhắn chỉnh sửa nội dung hoặc xóa tin do mình gửi; hệ thống từ chối thao tác trên tin người khác.

**Tác nhân chính:**  
`member@test.com`, `member2@test.com`

**Tiền điều kiện:**  
Mỗi user đã gửi ít nhất 1 tin trong `Group Chat Test`.

**Kích hoạt:**  
Người dùng chọn Sửa hoặc Xóa trên một tin của mình (hoặc gửi API trong case kiểm tra quyền).

**Hậu điều kiện:**  
Tin được cập nhật/xóa trong luồng chat; hoặc thao tác bị từ chối.

#### a. Luồng chính — Sửa
1. Nhấn Sửa trên tin `"Nội dung cũ"` của mình.
2. Đổi thành `"Nội dung đã sửa"`, Lưu.
3. Tin hiển thị nội dung mới và nhãn đã chỉnh sửa.

#### b. Luồng chính — Xóa
1. Nhấn Xóa trên `"Tin sẽ xóa"`, xác nhận.
2. Tin biến mất; tin khác giữ nguyên.

#### c. Luồng ngoại lệ

**EF-01:** API sửa/xóa tin `member2` khi đăng nhập `member` → từ chối.

---

### 12.3.4. Dữ liệu vào
- Nội dung tin sau chỉnh sửa (khi sửa)
- Xác nhận xóa (khi xóa)

### 12.3.5. Dữ liệu ra
- Tin nhắn đã cập nhật hoặc đã gỡ khỏi luồng
- Thông báo lỗi khi không có quyền hoặc validation thất bại

---

### 12.3.6. Quy tắc nghiệp vụ
- Chỉ tác giả được sửa/xóa tin của mình trên UI; API phải kiểm tra quyền tương tự.
- Giới hạn 5000 ký tự áp dụng cho nội dung sau khi sửa (C-11).

---

### 12.3.7. Điều kiện tiền đề và ràng buộc
- Tin nhắn cần sửa/xóa phải tồn tại và thuộc về người thực hiện (trừ case test API trái phép).

---

### 12.3.8. Mức độ ưu tiên
**Mức độ ưu tiên: Cao**

**Lý do:**  
Cho phép sửa lỗi gõ và gỡ tin gửi nhầm; đồng bộ realtime với các thành viên khác.

---

### 12.3.9. Tiêu chí chấp nhận
- UI chỉ Sửa/Xóa tin của mình (`01`–`02`); nhãn đã sửa (`03`).
- Validation rỗng / 5001 ký tự (`04`–`05`).
- Sửa/xóa thành công; API từ chối sửa/xóa tin người khác (`06`–`09`).
- Hủy sửa (`10`); realtime cho member2 (`11`–`12`).
- Lịch sử sau sửa/xóa (`13`–`14`).

---

### 12.3.10. Ghi chú
- Test case: `TC_CHAT_EDIT_DELETE_01` đến `TC_CHAT_EDIT_DELETE_14` (file `TC_CHAT_EDIT_DELETE.md`).
- `TC_CHAT_EDIT_DELETE_11`–`12` đồng thời chứng minh **FR-CHAT-6.2** — xem `FR-CHAT-6_Cap-Nhat-Thoi-Gian-Thuc.md`.
- Map: `06` → FR-CHAT-3.1; `07` → 3.2; `08` → 3.3; `09` → 3.4.
