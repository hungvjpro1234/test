## 13.3. Chức năng Gửi tin nhắn trực tiếp

### 13.3.1. Mô tả chức năng

Chức năng Gửi tin nhắn trực tiếp cho phép người tham gia hội thoại 1-1 nhập nội dung và gửi trong khung chat. Tin hợp lệ hiển thị ngay với thời gian gửi; tin của mình và tin đối phương phân biệt rõ (bubble/vị trí/màu). **Người nhận online** thấy tin **realtime** không reload. Validation: không gửi tin **rỗng**; tin **5001 ký tự** bị từ chối với thông báo giới hạn **5000** (FR-DIRECT-3.2 / C-11); **đúng 5000 ký tự** được chấp nhận. **Outsider** hoặc người không tham gia hội thoại cố gửi qua URL/API → không có quyền (FR-DIRECT-3.3). Hỗ trợ emoji và ký tự đặc biệt. Hai chiều: cả hai phía gửi đủ tin theo thứ tự.

---

### 13.3.2. Yêu cầu chức năng

**FR-DIRECT-3-01:** Ô nhập và nút Gửi trong hội thoại đã mở.

**FR-DIRECT-3-02:** Gửi thành công → tin trong khung chat ngay (FR-DIRECT-3.1).

**FR-DIRECT-3-03:** Tin mới nhất ở cuối; timestamp đúng.

**FR-DIRECT-3-04:** Phân biệt tin gửi/nhận.

**FR-DIRECT-3-05:** Trống → không gửi; nút disable hoặc lỗi.

**FR-DIRECT-3-06:** 5001 ký tự → lỗi; 5000 ký tự → OK (FR-DIRECT-3.2).

**FR-DIRECT-3-07:** Outsider/API không trong hội thoại → không quyền (FR-DIRECT-3.3).

**FR-DIRECT-3-08:** Realtime cho người nhận online.

---

### 13.3.3. Đặc tả Use Case

**Tên Use Case:** Gửi tin nhắn trong hội thoại 1-1  
**Mã Use Case:** UC-DIRECT-SEND-01

**Mô tả:**  
Thành viên hội thoại gửi nội dung text tới đối phương.

**Tác nhân chính:**  
`user1@test.com`, `user2@test.com`

**Tiền điều kiện:**  
Đã có hội thoại giữa `user1` và `user2`; `outsider@test.com` không thuộc hội thoại.

**Kích hoạt:**  
Nhập tin và nhấn Gửi / Enter.

**Hậu điều kiện:**  
Tin lưu và hiển thị hoặc bị từ chối.

#### a. Luồng chính
1. `user1` mở hội thoại với `user2`.
2. Gửi `"Xin chào, bạn có khỏe không?"` → tin hiển thị ngay.

#### b. Luồng thay thế

**AF-01:** `user2` thấy `"Tin realtime"` ngay trên màn hình.

**AF-02:** Hai chiều: `user1` và `user2` gửi luân phiên → cả hai thấy đủ.

**AF-03:** Gửi `"Tin 1"` → `"Tin 2"` → `"Tin 3"` đúng thứ tự.

#### c. Luồng ngoại lệ

**EF-01:** Rỗng / 5001 / outsider — theo test `04`, `05`, `07`.

---

### 13.3.4. Dữ liệu vào
- Nội dung tin (≤ 5000 ký tự)

### 13.3.5. Dữ liệu ra
- Tin trong luồng hội thoại
- Thông báo lỗi khi không gửi được

---

### 13.3.6. Quy tắc nghiệp vụ
- Chỉ hai thành viên hội thoại được gửi/nhận trong thread đó (FR-DIRECT-3.3).

---

### 13.3.7. Điều kiện tiền đề và ràng buộc
- Hội thoại đã được tạo giữa hai người.

---

### 13.3.8. Mức độ ưu tiên
**Mức độ ưu tiên: Cao**

---

### 13.3.9. Tiêu chí chấp nhận
- `TC_DIRECT_SEND_01` đến `TC_DIRECT_SEND_12` (`TC_DIRECT_SEND.md`).

---

### 13.3.10. Ghi chú
- `TC_DIRECT_SEND_08` → **FR-DIRECT-3.1**; `05` → **FR-DIRECT-3.2**; `07` → **FR-DIRECT-3.3**.
