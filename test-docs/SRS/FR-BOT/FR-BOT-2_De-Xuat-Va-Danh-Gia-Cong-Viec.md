## 16.2. Chức năng Đề xuất và đánh giá công việc qua chatbot

### 16.2.1. Mô tả chức năng

Chatbot **đề xuất** danh sách công việc phù hợp với người dùng; các mục được **lưu vào hồ sơ** người dùng và vẫn hiển thị đúng sau **reload** (FR-BOT-2.1 — `03`, `04`, `08`). Người dùng xem **tỷ lệ hoàn thành** các công việc được đề xuất: một phần (`05`), **100%** (`06`), **0%** (`07`), và **cập nhật** sau khi hoàn thành thêm việc (`09`). **Giao diện:** khu đề xuất và chỉ số phần trăm dễ đọc (`01`, `02`). Luồng đầy đủ: nhận đề xuất 3 việc → hoàn thành 1 → tỷ lệ **33%** (`08`).

---

### 16.2.2. Yêu cầu chức năng

**FR-BOT-2-01:** Đề xuất danh sách công việc và lưu vào hồ sơ (FR-BOT-2.1).

**FR-BOT-2-02:** Tính và hiển thị tỷ lệ hoàn thành đề xuất (FR-BOT-2.2).

**FR-BOT-2-03:** Tỷ lệ đồng bộ khi trạng thái công việc thay đổi.

---

### 16.2.3. Đặc tả Use Case

**Tên Use Case:** Nhận đề xuất công việc và theo dõi tỷ lệ hoàn thành  
**Mã Use Case:** UC-BOT-SUGGEST-01

**Mô tả:**  
Người dùng yêu cầu chatbot đề xuất; hệ thống lưu danh sách và hiển thị đánh giá hoàn thành.

**Tác nhân chính:**  
`user@test.com`

**Tiền điều kiện:**  
Đăng nhập; chatbot có thể mở; có công việc đang hoạt động (tùy TC).

**Kích hoạt:**  
Yêu cầu đề xuất / xem kết quả thực hiện đề xuất trong chatbot.

**Hậu điều kiện:**  
Đề xuất được persist; tỷ lệ khớp số việc đã hoàn thành trong tập đề xuất.

#### a. Luồng chính
1. Yêu cầu đề xuất → danh sách phù hợp (`03`).
2. Reload → danh sách vẫn đúng (`04`).

#### b. Luồng thay thế

**AF-01:** 2/4 hoàn thành → 50% (`05`); 4/4 → 100% (`06`); 0/N → 0% (`07`).

**AF-02:** Hoàn thành thêm việc → tỷ lệ tăng (`09`).

---

### 16.2.4. Dữ liệu vào
- Yêu cầu người dùng trong chat; trạng thái công việc sau khi hoàn thành

### 16.2.5. Dữ liệu ra
- Danh sách đề xuất đã lưu; phần trăm hoàn thành

---

### 16.2.6. Quy tắc nghiệp vụ
- Tỷ lệ chỉ tính trên tập “công việc được đề xuất” đã lưu cho user.

---

### 16.2.7. Điều kiện tiền đề và ràng buộc
- Chuẩn bị bộ dữ liệu 4 đề xuất với các trạng thái khác nhau cho các TC phần trăm.

---

### 16.2.8. Mức độ ưu tiên
**Mức độ ưu tiên: Cao**

---

### 16.2.9. Tiêu chí chấp nhận
- `TC_BOT_SUGGEST_01` đến `TC_BOT_SUGGEST_09` (`TC_BOT_SUGGEST.md`).
- `03`, `04`, `08` → FR-BOT-2.1; `05`, `06`, `07`, `09` → FR-BOT-2.2.

---

### 16.2.10. Ghi chú
- Ngữ cảnh ban đầu khi mở chatbot → `FR-BOT-1_Ngu-Canh-Chatbot.md`.
