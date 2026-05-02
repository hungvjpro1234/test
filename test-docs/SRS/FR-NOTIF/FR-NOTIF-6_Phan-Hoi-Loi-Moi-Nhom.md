## 14.6. Chức năng Phản hồi lời mời nhóm

### 14.6.1. Mô tả chức năng

Trên **thông báo lời mời vào nhóm**, người được mời có thể **Chấp nhận** hoặc **Từ chối** (FR-NOTIF-6.1, FR-NOTIF-6.2). Thông báo hiển thị **tên nhóm**, người mời, hai nút hành động (`TC_NOTIF_INVITE_01`). **Chấp nhận:** người dùng được **thêm vào nhóm**; danh sách nhóm có nhóm đó; thông báo chuyển trạng thái **Đã chấp nhận**; nút hành động vô hiệu/ẩn (`02`, `03`, `04`, `07`, `09`). **Từ chối:** không thêm vào nhóm; trạng thái **Đã từ chối** (`05`, `06`, `08`, `10`). Sau phản hồi, không thể bấm lại accept/reject như chưa xử lý (`02`).

---

### 14.6.2. Yêu cầu chức năng

**FR-NOTIF-6-01:** UI lời mời đủ thông tin và hai nút (FR-NOTIF-6.x).

**FR-NOTIF-6-02:** Chấp nhận → membership + trạng thái thông báo (FR-NOTIF-6.1).

**FR-NOTIF-6-03:** Từ chối → không membership + trạng thái thông báo (FR-NOTIF-6.2).

**FR-NOTIF-6-04:** Đồng bộ danh sách thành viên phía admin (`07`, `08`).

---

### 14.6.3. Đặc tả Use Case

**Tên Use Case:** Chấp nhận hoặc từ chối lời mời nhóm  
**Mã Use Case:** UC-NOTIF-INVITE-01

**Mô tả:**  
Người được mời phản hồi từ bảng thông báo.

**Tác nhân chính:**  
`user@test.com` (người được mời)

**Tiền điều kiện:**  
`admin@test.com` đã gửi lời mời vào `Team Gamma`; `user@test.com` chưa là thành viên.

**Kích hoạt:**  
Nhấn Chấp nhận hoặc Từ chối.

**Hậu điều kiện:**  
Membership và trạng thái thông báo khớp lựa chọn.

#### a. Luồng chính — Chấp nhận
1. Nhấn Chấp nhận → vào nhóm → thông báo “Đã chấp nhận”.

#### b. Luồng thay thế — Từ chối
1. Nhấn Từ chối → không vào nhóm → “Đã từ chối”.

---

### 14.6.4. Dữ liệu vào
- ID lời mời / thông báo; hành động accept|reject

### 14.6.5. Dữ liệu ra
- Membership; trạng thái thông báo

---

### 14.6.6. Quy tắc nghiệp vụ
- Một lời mời chỉ phản hồi một lần (trừ luồng mời lại — ngoài phạm vi TC).

---

### 14.6.7. Điều kiện tiền đề và ràng buộc
- Checklist ghi “Không thể chấp nhận/từ chối lời mời đã hết hạn hoặc đã phản hồi” — bổ sung TC riêng nếu triển khai.

---

### 14.6.8. Mức độ ưu tiên
**Mức độ ưu tiên: Cao**

---

### 14.6.9. Tiêu chí chấp nhận
- `TC_NOTIF_INVITE_01` đến `TC_NOTIF_INVITE_10` (`TC_NOTIF_INVITE.md`).
- `03`, `04` → FR-NOTIF-6.1; `05`, `06` → FR-NOTIF-6.2.

---

### 14.6.10. Ghi chú
- FR-NOTIF-5.1 về **hiển thị** lời mời trong `FR-NOTIF-5_Nhan-Thong-Bao-Tu-Dong.md`; file này về **hành động** phản hồi.
