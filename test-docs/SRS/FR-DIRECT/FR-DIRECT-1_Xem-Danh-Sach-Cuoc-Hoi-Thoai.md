## 13.1. Chức năng Xem danh sách cuộc hội thoại

### 13.1.1. Mô tả chức năng

Chức năng Xem danh sách cuộc hội thoại cho phép người dùng mở mục **Tin nhắn trực tiếp** (Direct Messages) từ thanh điều hướng và xem **tất cả cuộc hội thoại 1-1** của chính họ (FR-DIRECT-1.1). Mỗi dòng hiển thị thông tin người đối thoại (avatar, tên), đoạn trích **tin nhắn cuối**, và có thể có **badge** số tin chưa đọc. Danh sách **sắp xếp theo thời gian tin mới nhất** — hội thoại có hoạt động gần nhất nằm trên cùng; khi có tin mới từ phía kia, hội thoại tương ứng có thể **nhảy lên đầu** mà không cần reload. Người chưa có hội thoại nào thấy danh sách rỗng kèm hướng dẫn, không lỗi. Chưa đăng nhập không xem được danh sách (C-1). Chỉ hiển thị hội thoại của user đang phiên — không lộ hội thoại người khác (NFR-SEC-3).

---

### 13.1.2. Yêu cầu chức năng

**FR-DIRECT-1-01:** Thanh điều hướng phải có mục/biểu tượng "Tin nhắn trực tiếp".

**FR-DIRECT-1-02:** Khi mở mục, hệ thống hiển thị danh sách cuộc hội thoại 1-1 của người dùng hiện tại (FR-DIRECT-1.1).

**FR-DIRECT-1-03:** Mỗi hội thoại hiển thị avatar/tên người kia và tin nhắn cuối (preview).

**FR-DIRECT-1-04:** Thứ tự: mới nhất lên trên (theo thời điểm tin gần nhất).

**FR-DIRECT-1-05:** Hội thoại có tin chưa đọc hiển thị badge hoặc số lượng chưa đọc.

**FR-DIRECT-1-06:** Không có hội thoại → danh sách rỗng + thông điệp hướng dẫn; không crash.

**FR-DIRECT-1-07:** Chưa đăng nhập truy cập URL → chuyển về đăng nhập; không thấy danh sách (C-1).

**FR-DIRECT-1-08:** Tin mới từ đối phương có thể đưa hội thoại lên đầu danh sách realtime (`TC_DIRECT_VIEW_LIST_08`).

---

### 13.1.3. Đặc tả Use Case

**Tên Use Case:** Xem danh sách cuộc hội thoại tin nhắn trực tiếp  
**Mã Use Case:** UC-DIRECT-VIEW-LIST-01

**Mô tả:**  
Người dùng đã đăng nhập mở mục DM và xem các cuộc trò chuyện 1-1 của mình.

**Tác nhân chính:**  
Người dùng (`user1@test.com`)

**Tiền điều kiện:**  
`user1@test.com` có ít nhất 2 hội thoại với `user2@test.com` và `user3@test.com` (cho các case đầy đủ); `newuser@test.com` không có hội thoại (case rỗng).

**Kích hoạt:**  
Nhấn mục "Tin nhắn trực tiếp" trên thanh điều hướng.

**Hậu điều kiện:**  
Danh sách hội thoại hiển thị đúng phạm vi và quyền.

#### a. Luồng chính (Basic Flow)
1. Đăng nhập `user1@test.com`.
2. Nhấn "Tin nhắn trực tiếp".
3. Hệ thống hiển thị đủ các hội thoại; mỗi dòng có tên đối phương và tin cuối.

#### b. Luồng thay thế (Alternative Flow)

**AF-01: Sắp xếp theo mới nhất**  
Hội thoại với `user3` mới hơn `user2` → `user3` ở trên.

**AF-02: Badge chưa đọc**  
`user2` gửi 3 tin chưa đọc → badge hoặc số `3`.

**AF-03: Tin mới đẩy hội thoại lên đầu**  
Đang xem danh sách; `user2` gửi tin → hội thoại `user2` lên đầu không F5.

#### c. Luồng ngoại lệ (Exception Flow)

**EF-01:** Chưa đăng nhập → redirect đăng nhập.

**EF-02:** `newuser@test.com` không có chat → danh sách rỗng + hướng dẫn.

---

### 13.1.4. Dữ liệu vào
- Phiên người dùng đã xác thực

### 13.1.5. Dữ liệu ra
- Danh sách hội thoại với preview và metadata sắp xếp

---

### 13.1.6. Quy tắc nghiệp vụ
- Chỉ hiển thị hội thoại mà người dùng là thành viên (NFR-SEC-3).

---

### 13.1.7. Điều kiện tiền đề và ràng buộc
- Chuẩn bị dữ liệu: nhiều hội thoại, tin chưa đọc, user không có chat.

---

### 13.1.8. Mức độ ưu tiên
**Mức độ ưu tiên: Cao**

---

### 13.1.9. Tiêu chí chấp nhận
- Khớp `TC_DIRECT_VIEW_LIST_01` đến `TC_DIRECT_VIEW_LIST_08` (`TC_DIRECT_VIEW_LIST.md`).

---

### 13.1.10. Ghi chú
- `TC_DIRECT_VIEW_LIST_06` map **FR-DIRECT-1.1**; `04` C-1; `08` cập nhật đầu danh sách sau tin mới.
