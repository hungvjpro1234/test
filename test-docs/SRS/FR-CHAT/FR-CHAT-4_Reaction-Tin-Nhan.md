## 12.4. Chức năng Phản ứng (Reaction) tin nhắn

### 12.4.1. Mô tả chức năng

Chức năng Reaction cho phép thành viên nhóm chọn emoji để phản hồi nhanh một tin nhắn trong chat. Sau khi thêm reaction, emoji và **số đếm** hiển thị ngay dưới tin nhắn. Người dùng **bấm lại** vào emoji đã chọn để **gỡ** reaction của chính mình (toggle — FR-CHAT-4.2). Nhiều người có thể cùng react một emoji — số đếm tích lũy đúng; mỗi người chỉ đếm **một lần** cho mỗi loại emoji trên cùng một tin (nhấn lại có thể gỡ hoặc không tăng trùng). Một tin có thể có **nhiều loại emoji** khác nhau từ cùng một người. Khi số đếm về 0, emoji có thể biến mất hoàn toàn. Reaction của user hiện tại có thể được **highlight** so với người khác. Cập nhật reaction hiển thị **realtime** cho thành viên khác online (liên hệ `TC_CHAT_REACTION_11` và FR-CHAT-6).

---

### 12.4.2. Yêu cầu chức năng

**FR-CHAT-4-01:** Thêm reaction → emoji + số lượng dưới tin; cập nhật ngay (FR-CHAT-4.1).

**FR-CHAT-4-02:** Bấm lại emoji đã react → gỡ reaction của user đó (FR-CHAT-4.2).

**FR-CHAT-4-03:** Emoji picker hiển thị khi tương tác nút reaction trên tin.

**FR-CHAT-4-04:** Nhiều người cùng emoji → đếm đúng (ví dụ 1 → 2).

**FR-CHAT-4-05:** Không thêm trùng reaction cùng loại từ cùng một người (toggle hoặc giữ nguyên đếm 1).

**FR-CHAT-4-06:** Nhiều emoji khác nhau trên cùng một tin — độc lập.

**FR-CHAT-4-07:** Khi chỉ còn một reaction và được gỡ → emoji biến mất.

**FR-CHAT-4-08:** Luồng đầy đủ: thêm → tích lũy → gỡ từng người → đếm 1→2→1→0.

---

### 12.4.3. Đặc tả Use Case

**Tên Use Case:** Thêm và gỡ reaction trên tin nhắn nhóm  
**Mã Use Case:** UC-CHAT-REACTION-01

**Mô tả:**  
Người dùng chọn emoji để phản hồi tin nhắn hoặc gỡ reaction đã chọn.

**Tác nhân chính:**  
`member@test.com`, `member2@test.com`

**Tiền điều kiện:**  
Có ít nhất một tin nhắn trong `Group Chat Test`.

**Kích hoạt:**  
Người dùng mở emoji picker và chọn emoji, hoặc nhấn lại emoji đã react để gỡ.

**Hậu điều kiện:**  
Reaction và số đếm cập nhật đúng trên tin nhắn.

#### a. Luồng chính
1. Mở emoji picker trên tin.
2. Chọn `👍` → hiển thị `👍` và đếm `1`.

#### b. Luồng thay thế

**AF-01:** `member2` react cùng `😂` → đếm `2`; tooltip có thể hiển thị cả hai người.

**AF-02:** Gỡ lần lượt → đếm giảm đúng; về 0 thì ẩn emoji.

---

### 12.4.4. Dữ liệu vào
- Loại emoji được chọn
- Tin nhắn đích

### 12.4.5. Dữ liệu ra
- Reaction và bộ đếm hiển thị dưới tin nhắn
- Cập nhật realtime cho thành viên khác (`TC_CHAT_REACTION_11`)

---

### 12.4.6. Quy tắc nghiệp vụ
- Mỗi người một lần cho mỗi emoji trên một tin (toggle để gỡ).
- Cho phép nhiều emoji khác nhau trên cùng một tin.

---

### 12.4.7. Điều kiện tiền đề và ràng buộc
- Người dùng phải là thành viên nhóm có quyền xem chat.

---

### 12.4.8. Mức độ ưu tiên
**Mức độ ưu tiên: Trung bình–Cao**

**Lý do:**  
Tăng tốc độ phản hồi trong chat nhóm so với chỉ gửi tin nhắn văn bản.

---

### 12.4.9. Tiêu chí chấp nhận
- Emoji picker, đếm, highlight reaction của user (`01`–`03`).
- Thêm/gỡ, tích lũy nhiều người, không trùng, nhiều emoji, về 0 (`04`–`09`).
- Luồng đầy đủ và realtime (`10`–`11`).

---

### 12.4.10. Ghi chú
- Test case: `TC_CHAT_REACTION_01` đến `TC_CHAT_REACTION_11` (file `TC_CHAT_REACTION.md`).
- `TC_CHAT_REACTION_04` → FR-CHAT-4.1; `TC_CHAT_REACTION_05` → FR-CHAT-4.2.
