# KẾ HOẠCH ĐẢM BẢO CHẤT LƯỢNG PHẦN MỀM (SQA PLAN)
**Dự án:** Thiết kế và phát triển hệ thống quản lý hồ sơ ứng viên và tuyển dụng (ATS).
**Mã nhóm:** [Group_ID] | **Phiên bản:** 1.2

## 1. MỤC ĐÍCH VÀ PHẠM VI (PURPOSE AND SCOPE)
*   **Mô tả:** Hệ thống ATS giúp tự động hóa từ đăng tin, lọc CV đến phỏng vấn và nhận việc.
*   **Mục đích SQAP:** Xác định hoạt động SQA để sản phẩm tuân thủ yêu cầu nghiệp vụ và kỹ thuật.
*   **Phạm vi:** Review tài liệu, thiết kế mã nguồn, kiểm thử chức năng/hiệu năng và giám sát CI/CD.

## 2. ĐỊNH NGHĨA VÀ THUẬT NGỮ (DEFINITIONS AND ACRONYMS)
| Thuật ngữ | Định nghĩa |
| :--- | :--- |
| **ATS / CAN / REC** | Hệ thống quản lý tuyển dụng / Ứng viên / Nhà tuyển dụng. |
| **Kafka / API / ORM** | Message broker / Giao diện lập trình ứng dụng / Ánh xạ đối tượng-quan hệ. |
| **SQA / SQAP** | Đảm bảo chất lượng phần mềm / Kế hoạch SQA. |
| **UT / UAT / BVA / EP** | Unit Test / Kiểm thử chấp nhận / Phân tích giá trị biên / Phân vùng tương đương. |

## 3. TÀI LIỆU THAM KHẢO (REFERENCE DOCUMENTS)
*   IEEE Std 730-2014 (Annex C).
*   Mô hình chất lượng McCall (11 yếu tố).
*   Tài liệu Đặc tả yêu cầu phần mềm (SRS) dự án.
*   Tài liệu chuyên môn: Mastering Software Quality Assurance (FORM_K Template).

## 4. TỔNG QUAN KẾ HOẠCH SQA (SQA PLAN OVERVIEW)
### 4.1 Tổ chức và Phân công nhiệm vụ
| Thành viên | Vai trò | Nhiệm vụ chính |
| :--- | :--- | :--- |
| **Student A** | SQA Lead / Tester | Lập SQAP & Test Plan; Thiết kế & thực thi Test Case cho Core, User, Gateway; Review báo cáo. |
| **Student B** | Developer | Thực hiện Unit Test; Đảm bảo tiêu chuẩn code; Sửa lỗi. |
| **Supervisor** | Quality Manager | Review và phê duyệt SQAP; Giám sát tuân thủ quy trình; Audit cuối cùng. |

### 4.2 Rủi ro sản phẩm
*   **Dữ liệu:** Sai lệch trạng thái trong Pipeline tuyển dụng.
*   **Bảo mật:** Rò rỉ dữ liệu giữa các tổ chức (Multi-tenant isolation).
*   **Hiệu năng:** Xử lý CV file lớn và lịch phỏng vấn dày đặc.

### 4.3 Công cụ sử dụng
*   **Quản lý:** GitHub, GitHub Actions (CI/CD), Microsoft Office.
*   **Kiểm thử:** Postman, JUnit, JMeter (v5.5), Chrome/Edge.

### 4.4 Tiêu chuẩn McCall (Cải thiện đặc tả)
| Yếu tố | Áp dụng | Giải thích / Cách thực hiện |
| :--- | :--- | :--- |
| **Correctness** | Có | Đảm bảo logic tính toán tỷ lệ chuyển đổi và luồng nghiệp vụ chính xác. |
| **Reliability** | Có | Đảm bảo thông báo qua Kafka và Email thành công. |
| **Integrity** | Có | Kiểm soát truy cập qua JWT, RBAC và cô lập dữ liệu Multi-tenant. |
| **Efficiency** | Có | Phản hồi API < 3s; Phản hồi Vector Search < 2s. |
| **Usability** | Có | Kiểm tra nhất quán UI: font, màu sắc, vị trí nhãn (labels). |
| **Flexibility** | **Không** | Hệ thống tập trung quy trình ATS cố định, chưa ưu tiên tùy biến cấu trúc lớn. |
| **Portability** | **Không** | Chỉ vận hành trên môi trường Web và Docker cố định. |
*(Các yếu tố khác như Maintainability, Testability, Reusability, Interoperability đều được áp dụng)*

### 4.5 Lịch trình thực hiện (Schedule)
*   **Tuần 1:** Lập Test Plan (3 ngày).
*   **Tuần 2:** Thiết kế Test Case chi tiết mức màn hình (7 ngày).
*   **Tuần 3-4:** Kiểm thử Unit & Integration (10 ngày).
*   **Tuần 5:** Tổng hợp báo cáo SQA & Audit (3 ngày).

## 5. CÁC HOẠT ĐỘNG ĐẢM BẢO CHẤT LƯỢNG (ACTIVITIES)
### 5.1 Đảm bảo sản phẩm (Product Assurance)
#### 5.1.1 Các chức năng CẦN kiểm thử logic (Chi tiết mức màn hình)
*   **Tìm kiếm & Lọc (Job List):** Lọc đa tiêu chí (Ngành, Vị trí, Cấp bậc).
*   **Pipeline (Candidate Board):** Kéo thả ứng viên; Chặn nhảy bước hoặc đi lùi.
*   **Quản lý CV (Apply):** Chặn nộp trùng; Validate định dạng/dung lượng file CV.
*   **Báo cáo (Dashboard):** Tính toán phễu tuyển dụng; Tỷ lệ từ chối (Tổng = 100%).
*   **Bảo mật (User/Org):** Kiểm tra Token JWT; Cô lập dữ liệu giữa Org A và Org B.

#### 5.1.2 CÁC CHỨC NĂNG KHÔNG KIỂM THỬ LOGIC (FEATURES NOT TO BE TESTED)
*Phần này chỉ thực hiện Manual/UI Test vì không chứa thuật toán phức tạp hoặc phụ thuộc bên thứ 3:*
*   **Giao diện (UI):** Hiển thị danh sách Job/Ứng viên; Hiển thị biểu đồ (Charts); Giao diện Overview.
*   **Dịch vụ bên thứ 3:** Upload file lên Cloudinary; Gửi email; Login Google OAuth2.
*   **Thao tác cơ bản (CRUD):** Lưu lịch sử tìm kiếm; Xem chi tiết hồ sơ; Phân trang; Xem Job liên quan.
*   **Cấu hình hệ thống:** Security Filter Chain; Scheduled Jobs (Cron); Cấu hình Menu theo Role.

#### 5.1.3 Kỹ thuật kiểm thử áp dụng
*   **EP & BVA:** Cho các trường nhập liệu (CV size, email format, onboarding date).
*   **State Transition:** Cho luồng trạng thái ứng viên trong Pipeline.
*   **Decision Table:** Cho các bộ lọc tìm kiếm kết hợp nhiều điều kiện.
*   **Error Guessing:** Thử nghiệm các trường hợp nộp trùng CV hoặc truy cập API trái phép.

### 5.2 Đảm bảo quy trình (Process Assurance)
*   **Tuân thủ vòng đời:** Giám sát Git Flow và log commit trên GitHub.
*   **Kiểm soát môi trường:** Audit cấu hình Docker (Kafka, Redis, Postgres).
*   **Đo lường quy trình:** Theo dõi tỷ lệ Bug tìm thấy/đã sửa.

## 6. CÂN NHẮC BỔ SUNG (ADDITIONAL CONSIDERATIONS)
*   **Giới hạn (Waivers):** Không test hiệu năng Cloud quy mô lớn; Chỉ test local/Docker bằng JMeter.
*   **Chiến lược giao tiếp:** Báo cáo lỗi qua Ticket và họp hàng tuần với Supervisor.
*   **Xử lý sai lệch:** Các lỗi logic (như ứng viên tự ứng tuyển vào công ty mình) sẽ được truy vết qua log và ghi nhận ticket.

## 7. HỒ SƠ SQA (SQA RECORDS)
*   **Kỹ thuật:** Mã nguồn, Build logs (CI), Docker Images, Test Cases (PDF) trên GitHub.
*   **Vận hành:** Email logs (MySQL), Shedlock records (background jobs).
*   **Lưu giữ:** Từ 2021 đến khi nghiệm thu dự án (2026).

---
**PHỤ LỤC: DANH MỤC TÀI LIỆU HỢP NHẤT (CONSOLIDATED DOCUMENTATION)**
1. Link Báo cáo & Mã nguồn (GitHub)
2. Link Test Scripts (JUnit/JMeter)
3. Checklist review thiết kế/mã nguồn
4. Danh mục LLM & Prompts hỗ trợ (ChatGPT/NotebookLM).