## 13.4. Chức năng Xem lịch sử tin nhắn 1-1

### 13.4.1. Mô tả chức năng

Chức năng Xem lịch sử tin nhắn cho phép người tham gia hội thoại mở khung chat và xem các tin đã gửi **theo trang / tải dần** (FR-DIRECT-4.1). Khi mở, viewport thường **cuộn xuống cuối** để tin **mới nhất** nằm **dưới cùng**. **Cuộn lên** đầu danh sách để **tải thêm** tin cũ hơn (lazy load); khi đã tải hết (ví dụ đủ 55 tin), không còn load vô hạn. Mỗi tin hiển thị nội dung, người gửi, thời gian. Hội thoại **mới chưa có tin** hiển thị trạng thái trống thân thiện. **Outsider** không xem được lịch sử qua URL (giao với FR-DIRECT-3.3). Tin **đã xóa** không còn trong lịch sử; tin **đã sửa** hiển thị nội dung mới và nhãn đã chỉnh sửa.

---

### 13.4.2. Yêu cầu chức năng

**FR-DIRECT-4-01:** Mở hội thoại có nhiều tin → auto-focus cuối; tin mới nhất dưới cùng.

**FR-DIRECT-4-02:** Hiển thị đủ metadata mỗi tin (`TC_DIRECT_HISTORY_02`).

**FR-DIRECT-4-03:** Lịch sử theo trang / phân đoạn tải; cuộn lên tải tin cũ (`TC_DIRECT_HISTORY_05`–`06`, `09`).

**FR-DIRECT-4-04:** Outsider URL → không quyền (`TC_DIRECT_HISTORY_03` / FR-DIRECT-3.3).

**FR-DIRECT-4-05:** Hội thoại trống → placeholder không lỗi (`TC_DIRECT_HISTORY_04`).

**FR-DIRECT-4-06:** Tin đã xóa không hiển thị (`07`); tin đã sửa có nhãn + nội dung mới (`08`).

---

### 13.4.3. Đặc tả Use Case

**Tên Use Case:** Xem và tải lịch sử tin nhắn hội thoại 1-1  
**Mã Use Case:** UC-DIRECT-HISTORY-01

**Mô tả:**  
Người tham gia cuộn trong khung chat để xem tin cũ và mới.

**Tác nhân chính:**  
`user1@test.com`

**Tiền điều kiện:**  
Hội thoại có > 60 tin (cho lazy load); hoặc 55 tin (case `09`); hoặc 0 tin (hội thoại mới với `user3`).

**Kích hoạt:**  
Mở hội thoại hoặc cuộn lên.

**Hậu điều kiện:**  
Lịch sử hiển thị đúng phạm vi đã tải.

#### a. Luồng chính
1. Mở hội thoại có nhiều tin → cuộn cuối; thứ tự thời gian cũ → mới.

#### b. Luồng thay thế

**AF-01:** Cuộn lên → nạp thêm tin cũ; không giật scroll.

**AF-02:** 55 tin → cuộn đến đầu → đủ 55, không thiếu.

#### c. Luồng ngoại lệ

**EF-01:** Outsider không xem được.

---

### 13.4.4. Dữ liệu vào
- ID hội thoại / quyền người dùng
- Thao tác cuộn / yêu cầu trang

### 13.4.5. Dữ liệu ra
- Các tin nhắn theo batch

---

### 13.4.6. Quy tắc nghiệp vụ
- Chỉ thành viên hội thoại xem được lịch sử.

---

### 13.4.7. Điều kiện tiền đề và ràng buộc
- Dataset đủ dài để test phân trang.

---

### 13.4.8. Mức độ ưu tiên
**Mức độ ưu tiên: Cao**

---

### 13.4.9. Tiêu chí chấp nhận
- `TC_DIRECT_HISTORY_01` đến `TC_DIRECT_HISTORY_09` (`TC_DIRECT_HISTORY.md`).

---

### 13.4.10. Ghi chú
- `TC_DIRECT_HISTORY_05` map **FR-DIRECT-4.1**; `03` nhắc **FR-DIRECT-3.3**.
