Chào bạn, dựa trên yêu cầu của bạn về việc kết hợp giữa nội dung trong tệp "UNIT_TEST.pdf" (phần 5.3) và các yêu cầu cụ thể từ đề bài, tôi xin gửi tới bạn mẫu báo cáo kiểm thử đơn vị hoàn chỉnh từ đầu đến cuối như sau:

---

# BÁO CÁO KIỂM THỬ ĐƠN VỊ (UNIT TESTING REPORT)

**Thông tin chung:**
*   **Họ và tên:** [Nguyễn Văn A]
*   **Mã sinh viên:** [B21DCCNxxx]
*   **Lớp:** [Nhóm môn học]
*   **Tên bài tập:** [Bài tập lớn ...]

---

### 1. Thông tin kỹ thuật (Technical Information)

#### 1.1. Công cụ và thư viện (Tools and Libraries)
*   **Testing Framework:** [Ví dụ: JUnit 5, PyTest, Jest...].
*   **Thư viện hỗ trợ:** [Ví dụ: Mockito, JaCoCo, Coverage.py, DBUnit...].

#### 1.2. Phạm vi kiểm thử (Scope of Testing)
Dựa theo quy trình:
*   **Thành phần được kiểm thử:** Tất cả các lớp (class) và phương thức (method) trong hệ thống (ngoại trừ các Interface). Danh sách bao gồm: [Liệt kê các file/class như DangkihocDAO, KihocDAO...].
*   **Thành phần không kiểm thử:** Các Interface (do không chứa code thực thi trực tiếp).
*   **Lý do:** Mục tiêu là đảm bảo từng đơn vị (method, class) thực hiện đúng thiết kế và đạt **mức phủ cấp 2 (phủ hết các nhánh trong source code)**.

---

### 2. Danh sách các Ca kiểm thử (Unit Test Cases)
*Template này kết hợp cột từ đề bài và nội dung phân loại theo Function/Method từ tài liệu. Bạn nên trình bày trong file Excel.*

| Test Case ID | Chức năng / Phương thức (Function/Method) | Mục tiêu kiểm thử (Test Objective) | Dữ liệu vào (Input) | Kết quả mong đợi (Expected Output) | Ghi chú (Notes) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC_DK_01** | `DangkihocDAO.getDKcuaSV()` | SV đã đăng kí 1 LHP | `idSVK=1`, `idKihoc=1` | Trả về ArrayList chứa 1 đối tượng Dangkihoc | CheckDB: Kiểm tra query đúng procedure |
| **TC_DK_02** | `DangkihocDAO.getDKcuaSV()` | Kì học không tồn tại, SV tồn tại | `idSVK=1`, `idKihoc=999` | Trả về danh sách rỗng (size = 0) | |
| **TC_DK_03** | `DangkihocDAO.luuDKcuaSV()` | ĐK 1 LHP, chưa có ĐK cũ | Đối tượng `Dangkihoc` hợp lệ | Hàm trả về `true`. | **Rollback**: Xóa bản ghi sau khi test |
| **TC_DK_04** | `DangkihocDAO.luuDKcuaSV()` | ĐK mới trùng hoàn toàn với ĐK cũ | Đối tượng `Dangkihoc` đã tồn tại | Hàm trả về `false` hoặc xử lý báo lỗi | |

---

### 3. Đường dẫn dự án (Project Link)
*   **GitHub URL:** [Link repository chứa Unit Test Scripts].

---

### 4. Báo cáo thực thi và Độ bao phủ (Execution & Coverage Report)

#### 4.1. Kết quả thực thi (Execution Report)
*   **Tóm tắt:**
    *   Tổng số Test Cases: [Số lượng]
    *   Pass: [Số lượng] | Fail: [Số lượng]
*   **Bằng chứng (Screenshots):**
    *   *(Chèn ảnh màn hình kết quả chạy từ IDE thể hiện trạng thái xanh/đỏ của các test case).*

#### 4.2. Độ bao phủ mã nguồn (Code Coverage Report)
*   **Tóm tắt:** Độ bao phủ đạt mức phủ cấp 2 (Branch Coverage).
    *   Line Coverage: [%]
    *   Branch Coverage: [%]
*   **Bằng chứng (Screenshots):**
    *   *(Chèn ảnh màn hình từ công cụ đo độ bao phủ như Coverage.py hoặc JaCoCo).*

---

### 5. Yêu cầu kỹ thuật đối với Test Scripts (Script Requirements)
*Phần này xác nhận các script đã viết tuân thủ đúng quy tắc:*

1.  **Chú thích (Commenting):** Mọi script đều có comment xác định **Test Case ID** tương ứng.
2.  **Naming Convention:** Tên hàm/biến rõ ràng, mô tả đúng mục đích kiểm thử.
3.  **CheckDB:** Với các hàm có thay đổi DB (như `luuDKcuaSV`), script đã thực hiện truy vấn lại DB để xác nhận dữ liệu đã được ghi/sửa đúng.
4.  **Rollback:** Đã thiết lập các phương thức (ví dụ `@After` trong JUnit) để đưa DB về trạng thái ban đầu sau mỗi ca kiểm thử nhằm tránh lỗi cho các lần test sau.

---

### 6. Tham chiếu và Prompts (References + Prompts)
*   **Tài liệu tham khảo:** [Tên các tài liệu, ví dụ: UNIT_TEST.pdf].
*   **Danh sách Prompts đã sử dụng:** [Liệt kê các câu lệnh đã dùng với AI].

---

**Lưu ý khi thực hiện:**
*   Khi xây dựng **Expected Output**, bạn cần căn cứ vào thiết kế và đặc tả, không căn cứ vào code hiện tại để đảm bảo tính khách quan.
*   Cần đảm bảo chuẩn bị môi trường (kết nối DB, dữ liệu mẫu) trước khi chạy.