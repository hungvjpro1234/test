## 13.6. Chức năng React tin nhắn trực tiếp

### 13.6.1. Mô tả chức năng

Chức năng React tin nhắn trực tiếp cho phép người tham gia hội thoại **thêm emoji reaction** vào một tin (của mình hoặc đối phương). Emoji và **số đếm** hiển thị dưới tin; reaction của user hiện tại có thể **highlight**. **Bấm lại** cùng emoji → **gỡ** reaction (toggle — FR-DIRECT-6.1). Mỗi người chỉ **một lần** mỗi loại emoji trên một tin — nhấn lại có thể coi là toggle off (`TC_DIRECT_REACT_04`). Hai người cùng react một emoji → đếm tăng (ví dụ 1→2). Khi chỉ một người react và gỡ → emoji có thể biến mất hoàn toàn. **user2** thấy reaction cập nhật **realtime** (`TC_DIRECT_REACT_09`).

---

### 13.6.2. Yêu cầu chức năng

**FR-DIRECT-6-01:** Emoji picker / nút reaction trên tin (`TC_DIRECT_REACT_01`).

**FR-DIRECT-6-02:** Thêm reaction → đếm hiển thị (`TC_DIRECT_REACT_05` — FR-DIRECT-6.1).

**FR-DIRECT-6-03:** Bấm lại → gỡ / đếm về 0 (`TC_DIRECT_REACT_06`, `10` — FR-DIRECT-6.1).

**FR-DIRECT-6-04:** React tin đối phương và tin của mình (`05`, `07`).

**FR-DIRECT-6-05:** Hai người cùng emoji → đếm `2` (`08`).

**FR-DIRECT-6-06:** Không trùng đếm khi nhấn lại — toggle (`04`).

**FR-DIRECT-6-07:** Realtime cho đối phương (`09`).

---

### 13.6.3. Đặc tả Use Case

**Tên Use Case:** Thêm và gỡ reaction trong hội thoại 1-1  
**Mã Use Case:** UC-DIRECT-REACT-01

**Mô tả:**  
Người dùng chọn emoji trên tin nhắn hoặc gỡ bằng cách bấm lại.

**Tác nhân chính:**  
`user1@test.com`, `user2@test.com`

**Tiền điều kiện:**  
Hội thoại có ít nhất 2 tin (mỗi bên một tin).

**Kích hoạt:**  
Chọn emoji hoặc nhấn lại emoji đã chọn.

**Hậu điều kiện:**  
Reaction và đếm cập nhật đúng.

#### a. Luồng chính
1. React 😂 vào tin của `user2` → 😂 (1).

#### b. Luồng thay thế
**AF:** Hai người 👍 → đếm 2; 🔥 realtime cho `user2`.

#### c. Luồng ngoại lệ
(Không có trong test tách riêng.)

---

### 13.6.4. Dữ liệu vào
- Loại emoji; tin đích

### 13.6.5. Dữ liệu ra
- Reaction bar dưới tin

---

### 13.6.6. Quy tắc nghiệp vụ
- Toggle reaction theo người dùng và loại emoji.

---

### 13.6.7. Điều kiện tiền đề và ràng buộc
- Cả hai phải là thành viên hội thoại.

---

### 13.6.8. Mức độ ưu tiên
**Mức độ ưu tiên: Trung bình–Cao**

---

### 13.6.9. Tiêu chí chấp nhận
- `TC_DIRECT_REACT_01` đến `TC_DIRECT_REACT_10` (`TC_DIRECT_REACT.md`).

---

### 13.6.10. Ghi chú
- **FR-DIRECT-6.1** được cover bởi `05`, `06` và các case toggle/tích lũy.
