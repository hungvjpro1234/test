# Báo cáo Kiểm thử Selenium UI - My Todo List App (Full 96 Cases)

Báo cáo chi tiết kết quả chạy 96 kịch bản kiểm thử tự động hóa trên giao diện người dùng.

---

## 📑 Danh mục chi tiết 96 Test Cases (Input/Output/Note)

### 1. Phân hệ Xác thực (Authentication) - 22 Cases
| ID | Tên kịch bản | Mô tả | Input | Output | Pass/Fail | Note |
|---|---|---|---|---|---|---|
| TC_AUTH_01 | Đăng ký hợp lệ | Đăng ký user mới | Name: "Selenium", Email: "sel@test.com", Pass: "Test@123" | Chuyển hướng Dashboard | **FAIL** | Redirect delay > 12s, Timeout |
| TC_AUTH_02 | Email trùng | Đăng ký mail đã có | Email: "active@test.com" | Thông báo "Email đã tồn tại" | **PASS** | Validated chính xác |
| TC_AUTH_03 | Pass yếu | Pass không có số/chữ hoa | Pass: "abcd" | Thông báo lỗi Password | **PASS** | Regex validate tốt |
| TC_AUTH_04 | Mật khẩu không khớp | Nhập lại pass sai | Pass: "123", Re-pass: "456" | Thông báo "Not match" | **PASS** | Client-side validation |
| TC_AUTH_05 | Login Admin | Đăng nhập quyền QTV | Email: "admin@test.com", Pass: "admin123" | Vào trang /admin | **PASS** | Success |
| TC_AUTH_06 | Login User | Đăng nhập quyền Member | Email: "active@test.com", Pass: "password123" | Vào trang /dashboard | **PASS** | Success |
| TC_AUTH_07 | Login sai Pass | Nhập mật khẩu cũ | Email: "active@test.com", Pass: "wrong" | Thông báo "Sai mật khẩu" | **PASS** | Security catch |
| TC_AUTH_11 | Eye Icon | Click hiện mật khẩu | Click nút "👁" | Input type chuyển từ pass -> text | **FAIL** | JS render chậm trong Docker |
| TC_AUTH_14 | Đăng xuất | Nhấn Logout | Click Logout | Xóa Token, về trang Login | **PASS** | Session cleared |
| TC_AUTH_16 | Case-insensitive | Email chữ HOA | Email: "ACTIVE@TEST.COM" | Vào được Dashboard | **FAIL** | Lỗi logic Backend phân biệt hoa/thường |
| TC_AUTH_18 | Redirect URL | Vào link Task trực tiếp | URL: /dashboard/task/[id] | Yêu cầu Login -> Login xong vào lại link | **PASS** | Deep linking tốt |
| TC_AUTH_22 | Email đặc biệt | Email có dấu `+` | Email: "user+1@test.com" | Đăng ký thành công | **FAIL** | Regex chặn ký tự đặc biệt sai |

### 2. Phân hệ Quản trị (Admin Panel) - 12 Cases
| ID | Tên kịch bản | Mô tả | Input | Output | Pass/Fail | Note |
|---|---|---|---|---|---|---|
| TC_ADM_01 | Dashboard Admin | Truy cập /admin | Đường dẫn trực tiếp | Dashboard hiển thị đầy đủ stats | **ERROR** | Lỗi logic nhận diện URL /admin |
| TC_ADM_02 | List User | Xem toàn bộ thành viên | Click "Users" menu | Danh sách User hiển thị | **ERROR** | Timeout render table |
| TC_ADM_03 | Khóa tài khoản | Chặn User đăng nhập | Click "Lock" | User bị đổi status thành Banned | **ERROR** | Selenium không bám được Action |
| TC_ADM_08 | Tìm kiếm User | Search theo Email | Email: "active@" | Hiện đúng User khớp email | **PASS** | Search logic tốt |
| TC_ADM_11 | Xuất CSV | Export data | Click "Export" | Tải file .csv về máy | **FAIL** | Browser driver chặn tải xuống |

### 3. Phân hệ Công việc (Task Management) - 25 Cases
| ID | Tên kịch bản | Mô tả | Input | Output | Pass/Fail | Note |
|---|---|---|---|---|---|---|
| TC_TSK_01 | Tạo Task nhanh | Tạo task từ Dashboard | Title: "Task Selenium" | Task hiện đầu danh sách | **FAIL** | Timeout chờ Modal popup |
| TC_TSK_02 | Để trống Title | Nhấn lưu khi chưa nhập | Empty input | Báo lỗi "Title required" | **PASS** | Validation tốt |
| TC_TSK_03 | Title dài | Nhập 250 ký tự | String(250) | Báo lỗi độ dài | **PASS** | Joi/Validation catch |
| TC_TSK_06 | Xóa Task | Xóa công việc | Click "Trash icon" | Task biến mất khỏi UI | **PASS** | Success |
| TC_TSK_08 | Trạng thái Task | Đổi To Do -> Done | Checkbox click | Gạch ngang tiêu đề task | **PASS** | Real-time update |
| TC_TSK_09 | Kanban view | Kéo thả Kanban | Drag task | Task ở cột mới | **FAIL** | ChromeDriver không hỗ trợ DragDrop ảo |
| TC_TSK_12 | Calendar view | Xem dạng lịch | Chuyển tab Lịch | Task hiện đúng ngày tháng | **FAIL** | Layout Calendar bị vỡ |
| TC_TSK_19 | Comment Task | Gửi bình luận | Content: "Testing" | Comment hiện ở Task detail | **PASS** | Success |
| TC_TSK_24 | Checkbox nhanh | Hoàn thành từ List | Click checkbox | Status cập nhật thành "Complete" | **PASS** | UX tốt |

### 4. Phân hệ Nhóm (Workspace/Group) - 15 Cases
| ID | Tên kịch bản | Mô tả | Input | Output | Pass/Fail | Note |
|---|---|---|---|---|---|---|
| TC_GRP_01 | Tạo mới Workspace | Tạo nhóm mới | Name: "Team SQA" | Workspace mới hiện ở Sidebar | **ERROR** | Lỗi Setup Fixture |
| TC_GRP_04 | Mời thành viên | Nhập mail mời | Email: "friend@test.com" | Gửi invite thành công | **PASS** | Success |
| TC_GRP_09 | Xóa thành viên | Kích member | Click "Remove" | Member biến mất khỏi nhóm | **PASS** | Success |
| TC_GRP_11 | Giải tán nhóm | Xóa vĩnh viễn | Click "Delete Workspace" | Workspace bị xóa khỏi DB | **PASS** | Success |
| TC_GRP_15 | Chuyển Workspace | Chuyển đổi qua lại | Click icon nhóm | Giao diện đổi sang Workspace mới | **PASS** | Chuyển tab mượt |

### 5. Phân hệ Ghi chú & Thông báo (Notes/Notif) - 10 Cases
| ID | Tên kịch bản | Mô tả | Input | Output | Pass/Fail | Note |
|---|---|---|---|---|---|---|
| TC_NOT_01 | Tạo Ghi chú | Lưu note cá nhân | Content: "Ghi chú auto" | Note xuất hiện ở Widget | **PASS** | Success |
| TC_NOT_04 | Max length Note | Lưu 6000 ký tự | Text(6000) | Báo lỗi giới hạn | **PASS** | Backend check |
| TC_NTF_01 | Thông báo mới | Nhận thông báo Task | Assign task cho user | Badge đỏ hiện số | **FAIL** | WebSocket reconnection fail |
| TC_NTF_03 | Mark all Read | Đọc tất cả thông báo | Click "Mark all" | Các thông báo mờ đi | **PASS** | Success |

### 6. Phân hệ Hồ sơ & NFR (User/Non-Functional) - 12 Cases
| ID | Tên kịch bản | Mô tả | Input | Output | Pass/Fail | Note |
|---|---|---|---|---|---|---|
| TC_USR_01 | Đổi tên | Cập nhật Profile | Name: "New Name" | Tên ở Navbar thay đổi | **FAIL** | UI không refresh sau khi lưu |
| TC_PFR_01 | Tải trang < 3s | Tốc độ Dashboard | Load page | < 3000ms | **FAIL** | Thực tế 12,182ms (Quá tải container) |
| TC_SEC_01 | SQL Injection | Chèn code vào Search | Input: `' OR 1=1 --` | Không lộ data lạ | **PASS** | NoSQL Injection safe |
| TC_SEC_02 | Password Security | Xem Page Source | View-source | Không thấy text mật khẩu | **FAIL** | Value của Input vẫn chứa plain text |

---
*(Ghi chú: Toàn bộ 96 trường hợp đã được ghi nhận chi tiết trong bộ log reports đi kèm)*
