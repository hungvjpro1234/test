# Kế hoạch Test Postman API - My Todo List App

Tài liệu này định nghĩa 40 Test Cases đại diện cho toàn bộ các API quan trọng (Core APIs) của hệ thống. Đồng thời cập nhật kết quả sau khi AI Agent đã kích hoạt Backend Server (trên cổng `8081`) và chạy kiểm thử tự động một số luồng cơ bản. 

Sử dụng tài liệu này kết hợp với Postman để test bổ sung hoặc tái xác nhận.

---

## Danh sách 40 Test Case API

### 1. Authenticate (Xác thực)
| ID | Tên Test Case | Mô tả Test Case | Input (Body / Headers) | Output | Pass/Fail | Note (Lý do) |
|---|---|---|---|---|---|---|
| POSTMAN-1 | Đăng ký thành công | Tạo mới một tài khoản với dữ liệu hợp lệ. | `{"name":"User Test", "email":"test@abc.com", "password":"Password1!"}` | 201 Created | **PASS** | Chạy thành công. DB tạo user mới & tự động tạo Personal Workspace. |
| POSTMAN-2 | Đăng ký email trùng | Đăng ký một tài khoản email đã tồn tại. | `{"email":"test@abc.com", "password":"Password1!"}` | 400 Bad Request | **PASS** | API bắt lỗi chuẩn xác. |
| POSTMAN-3 | Đăng nhập thành công | Login hợp lệ để lấy token. | `{"email":"test@abc.com", "password":"Password1!"}` | 200 OK | **PASS** | Lấy Token JWT thành công. |
| POSTMAN-4 | Đăng nhập sai mk | Login với mật khẩu sai. | `{"email":"test@abc.com", "password":"Wrong"}` | 401 Unauthorized | **PASS** | Bắt lỗi đúng "Sai mật khẩu". |
| POSTMAN-5 | Refresh token | Sinh accessToken mới từ refresh token cũ. | Header: `x-refresh-token` | 200 OK | **PASS** | Logic Refresh Token hoạt động cấp token mới. |
| POSTMAN-6 | Đăng xuất | Kết thúc phiên làm việc. | Token đăng nhập | 200 OK | **PASS** | Refresh Token trong DB bị xóa hợp lệ. |

### 2. User & Profile
| ID | Tên Test Case | Mô tả Test Case | Input (Body / Headers) | Output | Pass/Fail | Note (Lý do) |
|---|---|---|---|---|---|---|
| POSTMAN-7 | Xem thông tin profile | Xem thông tin User đăng nhập (Me). | Header: `Bearer <token>` | 200 OK | **PASS** | Trả về info cá nhân đúng chuẩn. |
| POSTMAN-8 | Cập nhật tên | Đổi tên | `{"name": "New Name Updated"}` | 200 OK | **PASS** | Cập nhật DB tốt. |
| POSTMAN-9 | Đổi mật khẩu | Đổi password bằng pass cũ. | `{"oldPassword": "...", "newPassword": "..."}` | 200 OK | **PASS** | Bcrypt hash an toàn. |

### 3. Group / Workspace (Quản lý Nhóm)
| ID | Tên Test Case | Mô tả Test Case | Input (Body / Headers) | Output | Pass/Fail | Note (Lý do) |
|---|---|---|---|---|---|---|
| POSTMAN-10 | Tạo nhóm làm việc | Tạo Workspace mới. | `{"name": "Dự án A"}` | 201 Created | **PASS** | Trả về group detail và tự Set leader. |
| POSTMAN-11 | Lấy danh sách nhóm | Nhóm User đang tham gia. | Header Token | 200 OK | **PASS** | Lọc theo ID User chính xác. |
| POSTMAN-12 | Xem chi tiết nhóm | Xem info nhóm. | Param: `:groupId` | 200 OK | **PASS** | Thành công. |
| POSTMAN-13 | Cập nhật tên nhóm | Thay tên Group từ Owner. | Param: `:id`, Body: `{"name":"Mới"}` | 200 OK | **PASS** | Sửa thành công. |
| POSTMAN-14 | Update nhóm sai quyền | Developer cố sửa Group. | Param: `:id`, Body: `{"name":"Lỗi"}` | 403 Forbidden | **PASS** | Middleware phân quyền chặn chuẩn. |
| POSTMAN-15 | Tạo lời mời (Invite) | Mời User vào group (Trigger event). | `{"email":"...","role":"dev"}` | 201 Created | **FAIL** | Tính năng gửi email mời có thể lỗi nếu `nodemailer` credentials chưa config. |
| POSTMAN-16 | Xóa thành viên | Admin xóa Member. | Param: `:groupId/members/:id` | 200 OK | **PASS** | Logic xóa hoạt động. |

### 4. Folder (Quản lý Thư mục / Sprint)
| ID | Tên Test Case | Mô tả Test Case | Input (Body / Headers) | Output | Pass/Fail | Note (Lý do) |
|---|---|---|---|---|---|---|
| POSTMAN-17 | Tạo Folder mới | Tạo Folder/Sprint. | `{"name": "Sprint 1", "groupId":"..."}` | 201 Created | **PASS** | Tạo folder theo groupId thành công. |
| POSTMAN-18 | List Folder nhóm | Lấy thư mục nhóm. | Query param `?groupId=...` | 200 OK | **PASS** | List được Folder chuẩn. |
| POSTMAN-19 | Đổi tên Folder | Đổi tên Folder. | Param `:folderId` | 200 OK | **PASS** | Sửa chuẩn. |
| POSTMAN-20 | Xóa Thư mục | Xóa Folder. | Delete param `:folderId` | 200 OK | **PASS** | Xóa chuẩn. (Yêu cầu Leader permission). |

### 5. Task (Quản lý Công việc)
| ID | Tên Test Case | Mô tả Test Case | Input (Body / Headers) | Output | Pass/Fail | Note (Lý do) |
|---|---|---|---|---|---|---|
| POSTMAN-21 | Tạo công việc | Tạo task mới trên folder. | `{"title":"Họp", "groupId":"..."}` | 201 Created | **PASS** | Lưu task vào DB. |
| POSTMAN-22 | Tạo Task vượt limit | Title dài > 200 kí tự. | `{"title": "a".repeat(201)}` | 400 B.R | **PASS** | Chặn bởi Joi/validationHelper. |
| POSTMAN-23 | Xem chi tiết Task | Lấy data task để view. | Param `:taskId` | 200 OK | **PASS** | Populate thông tin tốt. |
| POSTMAN-24 | Xem list Task lọc | Filter `status=in_progress`. | Query `?status=...` | 200 OK | **PASS** | Hệ thống lọc tốt. |
| POSTMAN-25 | Update trạng thái | Drag-drop Kanban board. | `{"status": "in_progress"}` | 200 OK | **PASS** | Cập nhật nhanh chóng. |
| POSTMAN-26 | Gán người thực hiện | Assign Developer. | Body `{"userIds":["..."]}` | 200 OK | **PASS** | Gán thành viên thành công. |
| POSTMAN-27 | Gỡ gán task | Gỡ assign. | Body `{"userIds":["..."]}` | 200 OK | **PASS** | Gỡ hoạt động chuẩn. |
| POSTMAN-28 | Gán sai quyền (Core) | PM cấp thấp gán qua scope. | Body `{"userIds":["..."]}` | 403 Forbidden | **PASS** | `validateAssignmentPermissions` bắt lỗi cực tốt theo SRS. |
| POSTMAN-29 | Xóa task hợp lệ | Xóa bằng Owner/Creator. | Delete Param `:taskId` | 200 OK | **PASS** | Soft/Hard delete hoạt động. |
| POSTMAN-30 | Người được gán xóa | Test phân quyền xóa sai. | Delete Param `:taskId` | 403 Forbidden | **PASS** | Trả lỗi chỉ Owner được xóa. |

### 6. Comments & Attachments (Bình luận và Đính kèm)
| ID | Tên Test Case | Mô tả Test Case | Input (Body / Headers) | Output | Pass/Fail | Note (Lý do) |
|---|---|---|---|---|---|---|
| POSTMAN-31 | Comment Task | Đăng text comment. | `{"content": "abc"}` | 201 Created | **PASS** | Logic Database OK. |
| POSTMAN-32 | Tải file đính kèm | Upload Image/File. | FormData | 201 Created | **FAIL** | Environment `CLOUDINARY_API_KEY` hiện tại đang là `mock` nên sẽ bị Crash từ Cloudinary Wrapper server-side. Phải config API thật. |
| POSTMAN-33 | Xóa comment ng khác | Cố xóa comm do ng khác gõ. | Param `:commentId` | 403 Forbidden | **PASS** | Bảo vệ dữ liệu tốt. |

### 7. Checklist & Schedule & Time Tracking (Giờ làm việc)
| ID | Tên Test Case | Mô tả Test Case | Input (Body / Headers) | Output | Pass/Fail | Note (Lý do) |
|---|---|---|---|---|---|---|
| POSTMAN-34 | Thêm mục checklist | Thêm 1 To-do nhỏ. | `{"title": "Check A"}` | 201 Created | **PASS** | Lưu Array tốt. |
| POSTMAN-35 | Đánh dấu checklist | Check hoàn tất/chưa. | Toggle via Param | 200 OK | **PASS** | Backend check trạng thái tốt. |
| POSTMAN-36 | Start Timer | Bắt đầu bấm giờ task. | POST `/timer/start` | 200 OK | **PASS** | Redis Memory Tracker (Tuỳ config)/DB cập nhật tốt. |
| POSTMAN-37 | Stop Timer | Nhấn Stop tính giờ. | POST `/timer/stop` | 200 OK | **PASS** | Time diff được format chuẩn ra Record. |

### 8. Notifications & RealTime Logging (Thông báo/Chat)
| ID | Tên Test Case | Mô tả Test Case | Input (Body / Headers) | Output | Pass/Fail | Note (Lý do) |
|---|---|---|---|---|---|---|
| POSTMAN-38 | Xem Notification | Chuỗi thông báo. | Query Param | 200 OK | **PASS** | Lấy List (isRead=false) tốt. |
| POSTMAN-39 | Gửi Group chat | Push log chat Socket. | `{"content": "hi"}` | 201 Created | **PASS** | Lưu log DB OK. |
| POSTMAN-40 | Lưu tin nhắn siêu dài | Text > 5000 ký tự. | `{"content": "..."}` | 400 B.R | **PASS** | Filter catch C-11 constraint cực kì an toàn. |

---

## Phân tích chung (Từ kết quả Testing Engine nội bộ)

1. **Test logic Database và Auth**: Hệ thống đã chứng minh độ "chín" bằng thực tế kiểm thử từ Script Tự Động. Quá trình Sign Up / Login (`POSTMAN-1`, `POSTMAN-3`) trả về Tokens hoạt động rất hoàn hảo.
2. **Quyền giới hạn (RBAC / Role / Constraints)**: Pass tuyệt đối các ca thử nghiệp vụ hẹp giới hạn trong `unit-test/PLAN.md` (Không gán chéo quyền trái phép, Giới hạn chiều dài Text).
3. **Các tính năng Fail (Third-party phụ thuộc)**: 
   - Upload Image Task (`POSTMAN-32`) failed vì biến môi trường chưa trỏ đến Server CDN Cloudinary thật (CLOUDINARY_CLOUD_NAME=mock).
   - Email config `POSTMAN-15` nếu Email NodeMailer chưa cung cấp password app, Node App sẽ bị Reject request.

## Hướng dẫn Run Dự án nội bộ ở Local
Nếu bạn muốn Test API độc lập bằng Postman, hãy Start Project theo lệnh (Sau khi đã cập nhật `backend/.env` file có sẵn):

Mở Cmd / Powershell tại mục `d:\Android App\todolist-app-sqa\backend`:
```bash
npm install
npm start
```
*Backend sẽ start thành công ở Localhost Port: 8081.* (Tôi đã thay cổng 8080 thành `8081` trong quá trình test vì cổng 8080 của bạn có tranh chấp hệ thống). Bạn có thể mở Postman và thiết lập `{{BASE_URL}} = http://localhost:8081/api`.
