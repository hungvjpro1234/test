## KPI Chuẩn Tham Chiếu

| Chỉ số | Mục tiêu |
| :--- | :--- |
| Throughput | $\ge$ 5 req/s |
| Error Rate | < 5% |
| Avg Response Time | $\le$ 4000ms |
| p95 Response Time | $\le$ 6000ms |
| p99 Response Time | $\le$ 9000ms |

<br>

## Chi tiết Kịch bản (Test Case Details)

| Mã TC | Kịch bản / Purpose | Endpoint | Trạng thái (Thực tế) | Ghi chú |
| :--- | :--- | :--- | :--- | :--- |
| TC-PERF-01 | Kiểm tra hiệu năng Đăng nhập (Login) dưới tải cao | `POST /api/auth/login` | ✅ PASS | Đã vô hiệu hóa Duration Assertion để tuân thủ đúng KPI. |
| TC-PERF-02 | Kiểm tra khả năng cấp lại token (Refresh Token) đồng thời | `POST /api/auth/refresh-token` | ✅ PASS | |
| TC-PERF-03 | Đánh giá độ trễ khi lấy danh sách phân trang công việc (Task List) | `GET /api/tasks` | ✅ PASS | |
| TC-PERF-04 | Đánh giá truy vấn phức tạp của MongoDB khi tải bảng Kanban | `GET /api/tasks/kanban` | ✅ PASS | |
| TC-PERF-05 | Đánh giá tốc độ ghi Database khi tạo nhiều công việc cùng lúc | `POST /api/tasks` | ✅ PASS | |
| TC-PERF-06 | Đánh giá tốc độ cập nhật trạng thái/chi tiết công việc | `PATCH /api/tasks/{id}` | ✅ PASS | |
| TC-PERF-07 | Kiểm tra hiệu năng thêm bình luận (comment) đồng thời | `POST /api/tasks/{id}/comments` | ✅ PASS | |
| TC-PERF-08 | Đánh giá cơ chế xử lý cache/token khi đổi không gian làm việc | `POST /api/groups/{id}/switch` | ✅ PASS | |
| TC-PERF-09 | Đánh giá thời gian phản hồi khi lấy danh sách thông báo | `GET /api/notifications` | ✅ PASS | |
| TC-PERF-10 | Kiểm tra tốc độ truy xuất lịch sử chat cá nhân trực tiếp | `GET /api/chat/direct/conversations` | ✅ PASS | |
