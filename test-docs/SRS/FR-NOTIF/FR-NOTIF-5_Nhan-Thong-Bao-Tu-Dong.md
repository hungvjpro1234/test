## 14.5. Chức năng Nhận thông báo tự động

### 14.5.1. Mô tả chức năng

Hệ thống **tự động tạo thông báo** khi có sự kiện nghiệp vụ tương ứng (FR-NOTIF-5.1 đến FR-NOTIF-5.14). Bảng dưới map **SRS** với **TC** trong `TC_NOTIF_AUTO.md`:

| SRS | Nội dung ngắn | TC chính |
|-----|----------------|----------|
| FR-NOTIF-5.1 | Lời mời nhóm + Chấp nhận/Từ chối | `TC_NOTIF_AUTO_01` |
| FR-NOTIF-5.2 | Thay đổi vai trò nhóm | `02` |
| FR-NOTIF-5.3 | Đổi tên nhóm | `03` |
| FR-NOTIF-5.4 | Công việc mới trong nhóm | `04` |
| FR-NOTIF-5.5 | Được giao công việc | `05` |
| FR-NOTIF-5.6 | Hủy giao việc | `06` |
| FR-NOTIF-5.7 | Công việc hoàn thành (người liên quan) | `07` |
| FR-NOTIF-5.8 | Sắp đến hạn | `08` |
| FR-NOTIF-5.9 | Bình luận mới (theo dõi công việc) | `09` |
| FR-NOTIF-5.10 | @mention trong bình luận | `10` |
| FR-NOTIF-5.11 | Tin nhắn khi offline | `11` |
| FR-NOTIF-5.12 | Lời mời cuộc họp | `12` |
| FR-NOTIF-5.13 | Cuộc họp nhỡ | `13` |
| FR-NOTIF-5.14 | Thông báo toàn hệ thống từ quản trị | `14` |

**Cài đặt người dùng:** Tắt thông báo **danh mục** “Nhóm” → không nhận ví dụ đổi tên nhóm (`15`, FR-USER-5.2). Tắt **kênh email** → không gửi email nhưng in-app có thể vẫn có (`16`, FR-USER-5.1). Thông báo **đúng danh mục và nội dung** (`17`).

**Điều kiện test:** `user@test.com`, `admin@test.com`, `member2@test.com`, nhóm `Team Alpha`, công việc mẫu theo file test.

---

### 14.5.2. Yêu cầu chức năng

**FR-NOTIF-5-01:** Mỗi loại sự kiện trên tạo đúng loại thông báo với thông tin tham chiếu (tên nhóm, công việc, ...).

**FR-NOTIF-5-02:** Tôn trọng cài đặt thông báo theo danh mục và kênh (FR-USER-5.x).

---

### 14.5.3. Đặc tả Use Case

**Tên Use Case:** Nhận thông báo tự động theo sự kiện  
**Mã Use Case:** UC-NOTIF-AUTO-01

**Mô tả:**  
Khi hệ thống ghi nhận sự kiện (nhóm, công việc, bình luận, chat, họp, admin), thông báo được gắn cho người nhận đúng.

**Tác nhân chính:**  
Hệ thống; người nhận là người dùng cuối.

**Tiền điều kiện:**  
Theo từng TC (nhóm, công việc, vai trò, ...).

**Kích hoạt:**  
Hành động admin/member khác gây sự kiện.

**Hậu điều kiện:**  
Thông báo xuất hiện trong bảng thông báo người nhận (trừ khi bị cài đặt chặn danh mục).

#### a. Luồng chính (theo nhóm TC)

1. **Nhóm:** mời, đổi vai trò, đổi tên (`01`–`03`).
2. **Công việc:** tạo mới, giao, hủy giao, hoàn thành, sắp hạn (`04`–`08`).
3. **Bình luận:** comment mới, mention (`09`–`10`).
4. **Chat & họp:** offline message, mời họp, nhỡ họp (`11`–`13`).
5. **Hệ thống:** broadcast admin (`14`).

#### b. Luồng thay thế — Cài đặt

**AF-01:** Tắt danh mục Nhóm → không nhận đổi tên (`15`).

**AF-02:** Tắt email → không mail; in-app theo cấu hình (`16`).

---

### 14.5.4. Dữ liệu vào
- Sự kiện nghiệp vụ (API/backend)

### 14.5.5. Dữ liệu ra
- Bản ghi thông báo cho user đích

---

### 14.5.6. Quy tắc nghiệp vụ
- Chỉ người có quan hệ với sự kiện nhận thông báo (theo thiết kế từng loại).

---

### 14.5.7. Điều kiện tiền đề và ràng buộc
- Chuẩn bị nhiều tài khoản và nhóm như test doc.

---

### 14.5.8. Mức độ ưu tiên
**Mức độ ưu tiên: Cao**

---

### 14.5.9. Tiêu chí chấp nhận
- `TC_NOTIF_AUTO_01` đến `TC_NOTIF_AUTO_17` (`TC_NOTIF_AUTO.md`).
- Map FR-NOTIF-5.1–5.14 như bảng mục 14.5.1.

---

### 14.5.10. Ghi chú
- FR-NOTIF-6 (chấp nhận/từ chối lời mời) có đặc tả riêng `FR-NOTIF-6_*.md`; `TC_NOTIF_AUTO_01` kiểm tra **hiển thị** lời mời + nút phản hồi.
