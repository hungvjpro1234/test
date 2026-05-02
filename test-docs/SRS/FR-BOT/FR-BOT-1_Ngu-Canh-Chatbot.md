## 16.1. Chức năng Chatbot hiển thị thông tin ngữ cảnh

### 16.1.1. Mô tả chức năng

Người dùng mở **chatbot** từ icon/nút trên giao diện chính; **panel** chat mở với khu vực nhập liệu. Hệ thống cung cấp cho chatbot **ngữ cảnh** theo `FR-BOT-1.1`: **tên** người dùng hiện tại; **công việc đến hạn hôm nay**; **công việc đang hoạt động** (chưa hoàn thành). Khi **không** có công việc đến hạn hôm nay, chatbot thông báo phù hợp, không lỗi/blank (`TC_BOT_CONTEXT_07`). Chỉ dữ liệu của **chính người dùng** — không lộ công việc user khác (`06`, NFR-SEC-3). **Chưa đăng nhập** không truy cập chatbot (redirect login — `09`, NFR-SEC-2). Luồng đủ: tên + danh sách deadline hôm nay + danh sách chưa hoàn thành (`08`).

---

### 16.1.2. Yêu cầu chức năng

**FR-BOT-1-01:** Entry point mở chatbot (icon/nút, panel) (FR-BOT-1.1).

**FR-BOT-1-02:** Hiển thị tên, công việc đến hạn hôm nay, công việc chưa hoàn thành.

**FR-BOT-1-03:** Cách ly dữ liệu theo tài khoản (NFR-SEC-3).

**FR-BOT-1-04:** Yêu cầu đăng nhập trước khi dùng chatbot (NFR-SEC-2).

---

### 16.1.3. Đặc tả Use Case

**Tên Use Case:** Mở chatbot và nhận ngữ cảnh cá nhân  
**Mã Use Case:** UC-BOT-CONTEXT-01

**Mô tả:**  
Người dùng đã đăng nhập mở chatbot để xem thông tin ngữ cảnh gắn với tài khoản.

**Tác nhân chính:**  
`user@test.com`

**Tiền điều kiện:**  
Ứng dụng chạy; user đã đăng nhập; (tùy TC) có công việc deadline hôm nay và/hoặc công việc chưa xong.

**Kích hoạt:**  
Nhấn icon/nút chatbot.

**Hậu điều kiện:**  
Panel chat hiển thị; ngữ cảnh đúng user.

#### a. Luồng chính
1. Quan sát icon → nhấn → panel mở (`01`, `02`).
2. Kiểm tra tên `"Test User"` (`03`).
3. Kiểm tra CV đến hạn hôm nay và CV đang hoạt động (`04`, `05`).

#### b. Luồng thay thế

**AF-01:** Không có CV đến hạn hôm nay → thông báo rõ, không lỗi (`07`).

#### c. Luồng ngoại lệ

**EF-01:** Chưa đăng nhập → không vào được chatbot (`09`).

---

### 16.1.4. Dữ liệu vào
- Phiên đăng nhập; ngữ cảnh nhóm/workspace hiện tại (theo thiết kế app)

### 16.1.5. Dữ liệu ra
- Hiển thị tên user; danh sách CV deadline hôm nay; danh sách CV chưa hoàn thành

---

### 16.1.6. Quy tắc nghiệp vụ
- Ngữ cảnh chỉ lấy từ dữ liệu mà user được phép xem.

---

### 16.1.7. Điều kiện tiền đề và ràng buộc
- Chuẩn bị `user2@test.com` với công việc riêng để đối chiếu không lộ dữ liệu (`06`).

---

### 16.1.8. Mức độ ưu tiên
**Mức độ ưu tiên: Cao**

---

### 16.1.9. Tiêu chí chấp nhận
- `TC_BOT_CONTEXT_01` đến `TC_BOT_CONTEXT_09` (`TC_BOT_CONTEXT.md`).
- `TC_BOT_CONTEXT_03`, `04`, `05`, `07`, `08` → FR-BOT-1.1.

---

### 16.1.10. Ghi chú
- Đề xuất công việc và tỷ lệ hoàn thành → `FR-BOT-2_De-Xuat-Va-Danh-Gia-Cong-Viec.md`.
- Tiến độ nhóm (PM/PO) → `FR-BOT-3_Xem-Tien-Do-Nhom.md`.
