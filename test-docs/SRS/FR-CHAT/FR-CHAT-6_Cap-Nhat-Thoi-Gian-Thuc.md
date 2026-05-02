## 12.6. Chức năng Cập nhật thời gian thực (chat nhóm)

### 12.6.1. Mô tả chức năng

Chức năng Cập nhật thời gian thự đảm bảo thành viên nhóm **đang online** và đang mở đúng khung chat nhóm nhận được **tin nhắn mới**, **sửa tin**, **xóa tin**, **reaction**, và **file** mà **không cần tải lại trang** (FR-CHAT-6.1, FR-CHAT-6.2). Thời gian hiển thị cập nhật trong ngưỡng hiệu năng (test kỳ vọng **< 3 giây** — NFR-PERF-1). Giao diện có thể **tự cuộn** xuống tin mới nhất khi đang ở cuối luồng. Khi user đang xem **chat nhóm khác**, tin của `Group Chat Test` không hiển nhầm trong nhóm đang mở; có thể có **badge** tin chưa đọc cho nhóm đích (`TC_CHAT_REALTIME_07`). Sau **mất mạng tạm thời**, khi kết nối lại, tin nhắn đã gửi trong lúc mất mạng vẫn **đồng bộ** vào lịch sử.

---

### 12.6.2. Yêu cầu chức năng

**FR-CHAT-6-01:** Tin nhắn mới đến thành viên online trong khung chat đích trong ~3 giây; không F5 (FR-CHAT-6.1 / NFR-PERF-1).

**FR-CHAT-6-02:** Tin bị sửa → người khác thấy nội dung mới + nhãn đã chỉnh sửa ngay (FR-CHAT-6.2).

**FR-CHAT-6-03:** Tin bị xóa → biến mất ngay trên màn hình người khác (FR-CHAT-6.2).

**FR-CHAT-6-04:** Reaction thêm/gỡ → đếm và emoji cập nhật ngay cho người khác.

**FR-CHAT-6-05:** File mới gửi → hiển thị ngay trên màn hình thành viên khác.

**FR-CHAT-6-06:** Auto-scroll xuống tin mới khi đang ở cuối luồng.

**FR-CHAT-6-07:** Hai phiên gửi tin xen kẽ → cả hai thấy đúng thứ tự Tin 1 → Tin 2 → Tin 3, không thiếu không trùng.

**FR-CHAT-6-08:** Xem nhóm khác → không lẫn tin realtime của `Group Chat Test` (có thể có badge).

**FR-CHAT-6-09:** Reconnect sau mất mạng → tin bị lỡ vẫn xuất hiện sau khi có lại kết nối.

---

### 12.6.3. Đặc tả Use Case

**Tên Use Case:** Nhận cập nhật chat nhóm theo thời gian thực  
**Mã Use Case:** UC-CHAT-REALTIME-01

**Mô tả:**  
Thành viên đang mở chat nhận tin nhắn và các thay đổi (sửa/xóa/reaction/file) gần như tức thì, không reload.

**Tác nhân chính:**  
`member@test.com`, `member2@test.com` (hai phiên trình duyệt/tab)

**Tiền điều kiện:**  
Cả hai đăng nhập và mở `Group Chat Test` (trừ case `TC_CHAT_REALTIME_07` chỉnh màn hình đang xem nhóm khác).

**Kích hoạt:**  
Sự kiện từ server/client: tin mới, sửa, xóa, reaction, file; hoặc đồng bộ sau reconnect.

**Hậu điều kiện:**  
UI của các thành viên đang mở đúng nhóm phản ánh trạng thái mới không cần F5.

#### a. Luồng chính
1. `member@test.com` gửi `"Tin realtime"`.
2. Trên màn hình `member2@test.com`, tin xuất hiện trong < 3 giây, không reload.

#### b. Luồng thay thế

**AF-01:** Sửa `"Cũ"` → `"Mới"`; **AF-02:** Xóa `"Sẽ xóa"`; **AF-03:** Reaction `👍`; **AF-04:** Gửi `doc.pdf` — mỗi case kiểm tra màn hình đối phương ngay.

**AF-05:** Luồng Tin 1 / Tin 2 / Tin 3 xen kẽ hai người.

**AF-06:** `member2` mất mạng → `member` gửi `"Tin bị lỡ"` → `member2` bật lại mạng → thấy tin.

#### c. Luồng ngoại lệ / Phạm vi

**EF-01:** Đang không mở đúng nhóm chat → không hiển thị tin nhóm kia trong luồng hiện tại; badge có thể có.

---

### 12.6.4. Dữ liệu vào
- Sự kiện realtime (tin mới, cập nhật tin, xóa tin, reaction, attachment)

### 12.6.5. Dữ liệu ra
- Cập nhật UI khung chat và badge (nếu có) trong ngưỡng thời gian (< 3 giây theo test)

---

### 12.6.6. Quy tắc nghiệp vụ
- Người đang không mở đúng nhóm không được đổi nhầm luồng tin giữa các nhóm.
- Sau reconnect, tin lỡ phải được đồng bộ.

---

### 12.6.7. Điều kiện tiền đề và ràng buộc
- Hai phiên trình duyệt/tab để kiểm tra song song.
- NFR-PERF-1: độ trễ hiển thị tin mới < 3 giây (`TC_CHAT_REALTIME_01`).

---

### 12.6.8. Mức độ ưu tiên
**Mức độ ưu tiên: Cao**

**Lý do:**  
Chat nhóm chỉ có giá trị khi mọi người thấy nội dung mới gần như tức thì.

---

### 12.6.9. Tiêu chí chấp nhận
- Tin mới < 3 giây; auto-scroll (`01`–`02`).
- Sửa/xóa/reaction/file realtime (`03`–`06`).
- Đang xem nhóm khác không lẫn tin (`07`).
- Chuỗi tin xen kẽ (`08`); reconnect (`09`).

---

### 12.6.10. Ghi chú
- Test case: `TC_CHAT_REALTIME_01` đến `TC_CHAT_REALTIME_09` (file `TC_CHAT_REALTIME.md`).
- Liên kết: `TC_CHAT_EDIT_DELETE_11`–`12`, `TC_CHAT_REACTION_11`, `TC_CHAT_FILE_09`.
- **FR-CHAT-6.1** (`01`); **FR-CHAT-6.2** (`03`–`04` và các test liên quan).
