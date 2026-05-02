## 12.1. Chức năng Gửi và nhận tin nhắn nhóm

### 12.1.1. Mô tả chức năng

Chức năng Gửi và nhận tin nhắn nhóm cho phép thành viên nhóm nhập nội dung vào ô tin nhắn và gửi vào khung chat nhóm `Group Chat Test`. Tin hợp lệ hiển thị ngay trong khung chat kèm tên người gửi và thời gian; ô nhập được làm trống sau khi gửi thành công. Hệ thống từ chối tin trống, chỉ khoảng trắng, hoặc vượt **5000 ký tự** (boundary 5000 hợp lệ, 5001 lỗi — C-11). Người không thuộc nhóm không gửi được qua URL trực tiếp. Người chưa đăng nhập bị chuyển hướng (NFR-SEC-2). Tính năng **Trả lời** cho phép gửi tin kèm tham chiếu (quote) đến tin gốc. Hai thành viên online cùng nhóm đều thấy tin nhắn đúng nội dung và thứ tự.

---

### 12.1.2. Yêu cầu chức năng

**FR-CHAT-1-01:** Hệ thống phải hiển thị ô nhập tin nhắn và nút Gửi hoặc phím Enter ở cuối khung chat nhóm.

**FR-CHAT-1-02:** Gửi tin hợp lệ → tin xuất hiện ngay trong khung chat; ô nhập được clear (FR-CHAT-1.1).

**FR-CHAT-1-03:** Mỗi tin hiển thị đúng tên người gửi, nội dung và timestamp.

**FR-CHAT-1-04:** Tin trống → không gửi; thông báo lỗi (FR-CHAT-1.2).

**FR-CHAT-1-05:** Tin chỉ khoảng trắng → coi như trống; không gửi; thông báo lỗi.

**FR-CHAT-1-06:** Tin vượt 5000 ký tự (5001) → thông báo lỗi giới hạn; không gửi (FR-CHAT-1.3 / C-11).

**FR-CHAT-1-07:** Tin đúng 5000 ký tự → gửi thành công (boundary).

**FR-CHAT-1-08:** Outsider không thuộc nhóm cố truy cập/gửi → không có quyền; không gửi được (FR-CHAT-1.4).

**FR-CHAT-1-09:** Trả lời tin: tin mới hiển thị kèm tham chiếu đến tin gốc (FR-CHAT-1.5).

**FR-CHAT-1-10:** Gửi tin có emoji và ký tự đặc biệt/HTML-like → hiển thị an toàn, không XSS; nội dung đọc được.

**FR-CHAT-1-11:** Chưa đăng nhập cố truy cập URL chat → chuyển về đăng nhập (TC_CHAT_SEND_15 / NFR-SEC-2).

**FR-CHAT-1-12:** Gửi nhiều tin liên tiếp → thứ tự Tin 1 → Tin 2 → Tin 3 đúng.

---

### 12.1.3. Đặc tả Use Case

**Tên Use Case:** Gửi tin nhắn vào chat nhóm và nhận từ thành viên  
**Mã Use Case:** UC-CHAT-SEND-01

**Mô tả:**  
Thành viên nhập tin nhắn văn bản (hoặc trả lời tin trước) và gửi vào luồng chat nhóm; các thành viên khác đọc được tin trong nhóm.

**Tác nhân chính:**  
Thành viên nhóm (`member@test.com`, `member2@test.com`)

**Tiền điều kiện:**  
Nhóm `Group Chat Test` có `member@test.com` và `member2@test.com`; `outsider@test.com` không thuộc nhóm.

**Kích hoạt:**  
Người dùng nhập nội dung và nhấn Gửi hoặc Enter trong khung chat nhóm.

**Hậu điều kiện:**  
Tin được lưu và hiển thị trong luồng chat (thành công); hoặc hệ thống từ chối và hiển thị lỗi.

#### a. Luồng chính (Basic Flow)
1. `member@test.com` đăng nhập và mở chat nhóm `Group Chat Test`.
2. Hệ thống hiển thị ô nhập và nút Gửi (hoặc hỗ trợ Enter).
3. Người dùng nhập nội dung hợp lệ (ví dụ `"Hello World"`).
4. Nhấn Gửi.
5. Tin xuất hiện ngay trong khung chat với tên `member@test.com`, timestamp đúng; ô nhập được làm trống và có thể giữ focus để gửi tiếp (`TC_CHAT_SEND_16`).

#### b. Luồng thay thế (Alternative Flow)

**AF-01: Trả lời tin — FR-CHAT-1.5**  
Đã có tin `"Tin gốc"` do `member@test.com`. `member2@test.com` nhấn Trả lời, gửi `"Đây là trả lời"` → tin mới hiển thị kèm tham chiếu (quote) đến `"Tin gốc"`.

**AF-02: Chuỗi trả lời**  
`member@test.com` gửi `"Tin A"` → `member2@test.com` trả lời `"Tin A"` với `"Trả lời A"` → thứ tự và tham chiếu đúng (`TC_CHAT_SEND_13`).

**AF-03: Hai thành viên online**  
`member@test.com` gửi `"Chào tất cả!"` → trên phiên `member2@test.com` thấy cùng nội dung và người gửi (`TC_CHAT_SEND_12`).

**AF-04: Nhiều tin liên tiếp**  
Gửi `"Tin 1"` → `"Tin 2"` → `"Tin 3"` → thứ tự hiển thị khớp (`TC_CHAT_SEND_14`).

**AF-05: Ký tự đặc biệt và emoji**  
Nội dung `"Test 🎉 <b>bold</b> & special!"` hiển thị đúng, tránh XSS (`TC_CHAT_SEND_11`).

#### c. Luồng ngoại lệ (Exception Flow)

**EF-01: Tin trống — FR-CHAT-1.2**  
Không nhập gì, nhấn Gửi → không có tin mới; thông báo lỗi (`TC_CHAT_SEND_04`).

**EF-02: Chỉ khoảng trắng**  
→ Không gửi; thông báo lỗi (`TC_CHAT_SEND_05`).

**EF-03: 5001 ký tự — FR-CHAT-1.3 / C-11**  
→ Thông báo vượt giới hạn 5000 ký tự; không gửi (`TC_CHAT_SEND_06`).

**EF-04: Outsider — FR-CHAT-1.4**  
`outsider@test.com` truy cập URL chat và cố gửi `"Thử gửi"` → không có quyền; không gửi được (`TC_CHAT_SEND_09`).

**EF-05: Chưa đăng nhập — NFR-SEC-2**  
Truy cập URL chat khi chưa đăng nhập → chuyển hướng đăng nhập; không thấy nội dung chat (`TC_CHAT_SEND_15`).

---

### 12.1.4. Dữ liệu vào
- Nội dung tin nhắn (chuỗi, tối đa 5000 ký tự)
- Tùy chọn trả lời (tham chiếu tin gốc)

### 12.1.5. Dữ liệu ra
- Tin nhắn trong luồng chat kèm người gửi, thời gian
- Ô nhập cleared sau khi gửi thành công
- Thông báo lỗi khi không gửi được

---

### 12.1.6. Quy tắc nghiệp vụ
- Chỉ thành viên nhóm mới gửi tin trong chat nhóm đó (C-4).
- Giới hạn độ dài 5000 ký tự mỗi tin (C-11).
- Trả lời tin phải giữ liên kết hiển thị với tin được trích dẫn.

---

### 12.1.7. Điều kiện tiền đề và ràng buộc
- Người dùng đã đăng nhập (trừ case test NFR-SEC-2).
- Thuộc nhóm chứa kênh chat đang mở.

---

### 12.1.8. Mức độ ưu tiên
**Mức độ ưu tiên: Cao**

**Lý do:**  
Gửi/nhận tin là chức năng cốt lõi của chat nhóm.

---

### 12.1.9. Tiêu chí chấp nhận
- UI: ô nhập, Gửi/Enter, responsive (`TC_CHAT_SEND_01`–`03`).
- Validation: trống, khoảng trắng, 5001 ký tự từ chối; đúng 5000 ký tự chấp nhận (`04`–`07`).
- Gửi thành công, outsider, reply, emoji/special (`08`–`11`).
- Luồng hai người, chuỗi reply, nhiều tin, chưa đăng nhập, clear ô nhập (`12`–`16`).

---

### 12.1.10. Ghi chú
- Test case: `TC_CHAT_SEND_01` đến `TC_CHAT_SEND_16` (file `TC_CHAT_SEND.md`).
- Map SRS: `TC_CHAT_SEND_08` → FR-CHAT-1.1; `04` → 1.2; `06` → 1.3; `09` → 1.4; `10` → 1.5.
