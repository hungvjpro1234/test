# Software Requirements Specification (SRS) — Final
**Phiên bản**: 3.0
**Ngày**: 2026-03-20
**Mục tiêu**: Phục vụ System Test (Black-box, góc nhìn người dùng)

---

## Mục lục

1. [FR-AUTH — Xác thực & Quản lý tài khoản](#fr-auth--xác-thực--quản-lý-tài-khoản)
2. [FR-USER — Quản lý hồ sơ cá nhân](#fr-user--quản-lý-hồ-sơ-cá-nhân)
3. [FR-GROUP — Quản lý nhóm & Workspace](#fr-group--quản-lý-nhóm--workspace)
4. [FR-FOLDER — Quản lý thư mục](#fr-folder--quản-lý-thư-mục)
5. [FR-TASK — Quản lý công việc](#fr-task--quản-lý-công-việc)
6. [FR-ASSIGN — Phân công công việc](#fr-assign--phân-công-công-việc)
7. [FR-COMMENT — Bình luận công việc](#fr-comment--bình-luận-công-việc)
8. [FR-ATTACH — File đính kèm](#fr-attach--file-đính-kèm)
9. [FR-CHECK — Checklist](#fr-check--checklist)
10. [FR-TIME — Theo dõi thời gian](#fr-time--theo-dõi-thời-gian)
11. [FR-CHAT — Chat nhóm](#fr-chat--chat-nhóm)
12. [FR-DIRECT — Tin nhắn trực tiếp](#fr-direct--tin-nhắn-trực-tiếp)
13. [FR-NOTIF — Thông báo](#fr-notif--thông-báo)
14. [FR-NOTE — Ghi chú cá nhân](#fr-note--ghi-chú-cá-nhân)
15. [FR-ADMIN — Quản trị viên](#fr-admin--quản-trị-viên)
16. [FR-BOT — Chatbot hỗ trợ](#fr-bot--chatbot-hỗ-trợ)
17. [NFR — Yêu cầu phi chức năng](#nfr--yêu-cầu-phi-chức-năng)
18. [Assumptions & Constraints](#assumptions--constraints)

---

## FR-AUTH — Xác thực & Quản lý tài khoản

### FR-AUTH-1: Đăng ký tài khoản

| ID | Chức năng | Mô tả |
|----|-----------|-------|
| FR-AUTH-1.1 | Đăng ký thành công | Người dùng điền đầy đủ họ tên, email hợp lệ và mật khẩu đủ điều kiện, sau đó nhấn "Đăng ký". Hệ thống tạo tài khoản mới, tự động tạo workspace cá nhân cho người dùng và chuyển người dùng vào giao diện chính. |
| FR-AUTH-1.2 | Email đã tồn tại | Người dùng nhập email đã được đăng ký trước đó. Hệ thống hiển thị thông báo lỗi và không cho phép tạo tài khoản mới. |
| FR-AUTH-1.3 | Email không hợp lệ | Người dùng nhập email sai định dạng (ví dụ: thiếu "@"). Hệ thống hiển thị thông báo lỗi ngay tại trường email và không cho phép tiếp tục. |
| FR-AUTH-1.4 | Mật khẩu không đủ điều kiện | Người dùng nhập mật khẩu không đáp ứng yêu cầu (ít hơn 8 ký tự, hoặc thiếu chữ hoa, chữ thường, số, ký tự đặc biệt). Hệ thống hiển thị thông báo lỗi mô tả yêu cầu và không cho phép đăng ký. |
| FR-AUTH-1.5 | Bỏ trống trường bắt buộc | Người dùng bỏ trống một hoặc nhiều trường (họ tên, email, mật khẩu). Hệ thống hiển thị thông báo lỗi tại từng trường bị bỏ trống và không cho phép đăng ký. |
| FR-AUTH-1.6 | Họ tên quá dài | Người dùng nhập họ tên vượt quá 100 ký tự. Hệ thống hiển thị thông báo lỗi và không cho phép đăng ký. |

---

### FR-AUTH-2: Đăng nhập

| ID | Chức năng | Mô tả |
|----|-----------|-------|
| FR-AUTH-2.1 | Đăng nhập thành công | Người dùng nhập đúng email và mật khẩu đã đăng ký, nhấn "Đăng nhập". Hệ thống xác thực và chuyển người dùng vào giao diện chính. |
| FR-AUTH-2.2 | Sai mật khẩu | Người dùng nhập đúng email nhưng sai mật khẩu. Hệ thống hiển thị thông báo "Thông tin đăng nhập không hợp lệ" và không cho phép vào. |
| FR-AUTH-2.3 | Email chưa đăng ký | Người dùng nhập email không tồn tại trong hệ thống. Hệ thống hiển thị thông báo lỗi và không cho phép đăng nhập. |
| FR-AUTH-2.4 | Bỏ trống trường đăng nhập | Người dùng bỏ trống email hoặc mật khẩu. Hệ thống hiển thị thông báo lỗi và không cho phép tiếp tục. |
| FR-AUTH-2.5 | Tài khoản bị khóa | Người dùng bị quản trị viên khóa tài khoản cố đăng nhập. Hệ thống hiển thị thông báo tài khoản đã bị khóa và không cho phép vào. |

---

### FR-AUTH-3: Đăng nhập bằng Google

| ID | Chức năng | Mô tả |
|----|-----------|-------|
| FR-AUTH-3.1 | Đăng nhập Google thành công | Người dùng nhấn "Đăng nhập bằng Google" và hoàn thành xác thực Google. Hệ thống đăng nhập và chuyển người dùng vào giao diện chính. |
| FR-AUTH-3.2 | Xác thực Google thất bại | Người dùng hủy hoặc xác thực Google không thành công. Hệ thống quay lại trang đăng nhập và hiển thị thông báo lỗi. |

---

### FR-AUTH-4: Quên mật khẩu

| ID | Chức năng | Mô tả |
|----|-----------|-------|
| FR-AUTH-4.1 | Yêu cầu đặt lại mật khẩu | Người dùng nhập email đã đăng ký và nhấn "Gửi". Hệ thống gửi mã xác nhận đến email đó và thông báo thành công. |
| FR-AUTH-4.2 | Email chưa đăng ký | Người dùng nhập email không tồn tại trong hệ thống. Hệ thống hiển thị thông báo lỗi và không gửi mã. |
| FR-AUTH-4.3 | Xác nhận mã đặt lại | Người dùng nhập đúng mã xác nhận nhận được qua email. Hệ thống xác nhận hợp lệ và cho phép nhập mật khẩu mới. |
| FR-AUTH-4.4 | Mã xác nhận sai hoặc hết hạn | Người dùng nhập sai mã hoặc mã đã hết hạn. Hệ thống hiển thị thông báo lỗi và không cho phép tiếp tục. |
| FR-AUTH-4.5 | Đặt mật khẩu mới | Người dùng nhập mật khẩu mới đủ điều kiện. Hệ thống cập nhật mật khẩu thành công và chuyển người dùng về trang đăng nhập. |
| FR-AUTH-4.6 | Mật khẩu mới không đủ điều kiện | Người dùng nhập mật khẩu mới không đáp ứng yêu cầu. Hệ thống hiển thị thông báo lỗi và không cập nhật. |

---

### FR-AUTH-5: Đăng xuất

| ID | Chức năng | Mô tả |
|----|-----------|-------|
| FR-AUTH-5.1 | Đăng xuất thành công | Người dùng nhấn "Đăng xuất". Hệ thống kết thúc phiên làm việc và chuyển người dùng về trang đăng nhập. |
| FR-AUTH-5.2 | Bảo vệ phiên | Sau khi đăng xuất, nếu người dùng cố truy cập lại giao diện chính, hệ thống tự động chuyển về trang đăng nhập. |

---

## FR-USER — Quản lý hồ sơ cá nhân

### FR-USER-1: Cập nhật thông tin cá nhân

| ID | Chức năng | Mô tả |
|----|-----------|-------|
| FR-USER-1.1 | Cập nhật họ tên thành công | Người dùng chỉnh sửa họ tên trong trang hồ sơ và lưu lại. Hệ thống cập nhật tên mới và hiển thị thông báo thành công. |
| FR-USER-1.2 | Họ tên quá dài | Người dùng nhập họ tên vượt quá 100 ký tự. Hệ thống hiển thị thông báo lỗi và không lưu. |

---

### FR-USER-2: Đổi mật khẩu

| ID | Chức năng | Mô tả |
|----|-----------|-------|
| FR-USER-2.1 | Đổi mật khẩu thành công | Người dùng nhập đúng mật khẩu hiện tại và mật khẩu mới hợp lệ, nhấn lưu. Hệ thống cập nhật mật khẩu và hiển thị thông báo thành công. |
| FR-USER-2.2 | Sai mật khẩu hiện tại | Người dùng nhập sai mật khẩu hiện tại. Hệ thống hiển thị thông báo lỗi và không đổi mật khẩu. |
| FR-USER-2.3 | Mật khẩu mới không đủ điều kiện | Người dùng nhập mật khẩu mới không đáp ứng yêu cầu. Hệ thống hiển thị thông báo lỗi và không đổi. |

---

### FR-USER-3: Cập nhật ảnh đại diện

| ID | Chức năng | Mô tả |
|----|-----------|-------|
| FR-USER-3.1 | Tải ảnh đại diện thành công | Người dùng chọn và tải lên ảnh đại diện mới. Hệ thống hiển thị ảnh mới trên hồ sơ sau khi tải lên thành công. |
| FR-USER-3.2 | Cập nhật URL ảnh đại diện | Người dùng nhập URL ảnh trực tiếp. Hệ thống cập nhật và hiển thị ảnh đại diện mới. |

---

### FR-USER-4: Tùy chỉnh giao diện & khu vực

| ID | Chức năng | Mô tả |
|----|-----------|-------|
| FR-USER-4.1 | Chọn ngôn ngữ | Người dùng chọn ngôn ngữ (Tiếng Anh hoặc Tiếng Việt) trong phần cài đặt. Hệ thống ngay lập tức hiển thị toàn bộ giao diện bằng ngôn ngữ đã chọn. |
| FR-USER-4.2 | Chọn giao diện sáng/tối | Người dùng chọn chủ đề giao diện (Sáng, Tối, hoặc Tự động). Hệ thống áp dụng chủ đề ngay lập tức trên toàn bộ giao diện. |
| FR-USER-4.3 | Cài đặt múi giờ & định dạng ngày | Người dùng chọn múi giờ và định dạng ngày tháng ưa thích. Hệ thống hiển thị tất cả thời gian và ngày tháng theo cài đặt mới. |

---

### FR-USER-5: Tùy chỉnh thông báo

| ID | Chức năng | Mô tả |
|----|-----------|-------|
| FR-USER-5.1 | Bật/tắt thông báo theo kênh | Người dùng bật hoặc tắt nhận thông báo qua kênh email hoặc trong ứng dụng. Hệ thống lưu tùy chọn và áp dụng cho các thông báo tiếp theo. |
| FR-USER-5.2 | Bật/tắt thông báo theo danh mục | Người dùng bật hoặc tắt thông báo theo loại (nhóm, công việc, chat, cuộc họp, hệ thống). Hệ thống chỉ gửi thông báo cho các danh mục đã được bật. |

---

### FR-USER-6: Hủy kích hoạt tài khoản

| ID | Chức năng | Mô tả |
|----|-----------|-------|
| FR-USER-6.1 | Hủy tài khoản | Người dùng xác nhận hủy kích hoạt tài khoản của mình. Hệ thống vô hiệu hóa tài khoản và đăng xuất người dùng. |

---

## FR-GROUP — Quản lý nhóm & Workspace

### FR-GROUP-1: Tạo nhóm

| ID | Chức năng | Mô tả |
|----|-----------|-------|
| FR-GROUP-1.1 | Tạo nhóm thành công | Người dùng nhập tên nhóm và nhấn "Tạo". Hệ thống tạo nhóm mới, tự động thêm người tạo vào nhóm và hiển thị nhóm trong danh sách. |
| FR-GROUP-1.2 | Tên nhóm bị bỏ trống | Người dùng không nhập tên nhóm. Hệ thống hiển thị thông báo lỗi và không cho phép tạo. |
| FR-GROUP-1.3 | Tên nhóm quá dài | Người dùng nhập tên nhóm vượt quá 256 ký tự. Hệ thống hiển thị thông báo lỗi và không tạo nhóm. |
| FR-GROUP-1.4 | Mô tả nhóm quá dài | Người dùng nhập mô tả nhóm vượt quá 2000 ký tự. Hệ thống hiển thị thông báo lỗi. |

---

### FR-GROUP-2: Xem danh sách nhóm

| ID | Chức năng | Mô tả |
|----|-----------|-------|
| FR-GROUP-2.1 | Xem nhóm của mình | Người dùng mở màn hình nhóm. Hệ thống hiển thị tất cả nhóm mà người dùng là thành viên. |
| FR-GROUP-2.2 | Quản trị viên xem tất cả nhóm | Người dùng có vai trò quản trị viên mở màn hình nhóm. Hệ thống hiển thị toàn bộ nhóm trong hệ thống, không giới hạn theo tư cách thành viên. |

---

### FR-GROUP-3: Cập nhật thông tin nhóm

| ID | Chức năng | Mô tả |
|----|-----------|-------|
| FR-GROUP-3.1 | Cập nhật thành công | Người dùng có quyền chỉnh sửa tên, mô tả, màu sắc hoặc biểu tượng nhóm và lưu lại. Hệ thống cập nhật và hiển thị thông tin mới. |
| FR-GROUP-3.2 | Không có quyền cập nhật | Người dùng không có quyền sửa nhóm cố gắng thực hiện. Hệ thống hiển thị thông báo không có quyền truy cập. |

---

### FR-GROUP-4: Xóa nhóm

| ID | Chức năng | Mô tả |
|----|-----------|-------|
| FR-GROUP-4.1 | Xóa nhóm thành công | Người tạo nhóm xác nhận xóa nhóm. Hệ thống xóa nhóm và không còn hiển thị nhóm đó trong danh sách. |
| FR-GROUP-4.2 | Không phải người tạo | Người dùng không phải người tạo nhóm cố xóa nhóm. Hệ thống hiển thị thông báo không có quyền. |

---

### FR-GROUP-5: Quản lý thành viên nhóm

| ID | Chức năng | Mô tả |
|----|-----------|-------|
| FR-GROUP-5.1 | Thêm thành viên | Quản trị viên nhóm thêm người dùng mới vào nhóm. Hệ thống thêm thành viên và gửi thông báo đến người được thêm. |
| FR-GROUP-5.2 | Vượt giới hạn thành viên | Quản trị viên cố thêm thành viên vượt quá giới hạn tối đa của nhóm. Hệ thống hiển thị thông báo đã đạt giới hạn và không thêm được. |
| FR-GROUP-5.3 | Xóa thành viên | Quản trị viên nhóm xóa một thành viên khỏi nhóm. Hệ thống gỡ thành viên và người đó không còn thấy nội dung nhóm. |
| FR-GROUP-5.4 | Thay đổi vai trò thành viên | Quản trị viên thay đổi vai trò của một thành viên (ví dụ: PM, QA, Developer…). Hệ thống cập nhật vai trò và gửi thông báo đến người được thay đổi. |
| FR-GROUP-5.5 | Mời người dùng vào nhóm | Thành viên nhóm gửi lời mời đến một người dùng khác. Hệ thống gửi thông báo lời mời đến người đó. |
| FR-GROUP-5.6 | Rời khỏi nhóm | Thành viên nhấn "Rời nhóm". Hệ thống gỡ thành viên khỏi nhóm và người đó không còn nhìn thấy nội dung nhóm. |
| FR-GROUP-5.7 | Tham gia nhóm công khai | Người dùng tham gia nhóm công khai. Hệ thống thêm người dùng vào danh sách thành viên nhóm. |

---

### FR-GROUP-6: Chuyển đổi nhóm đang làm việc

| ID | Chức năng | Mô tả |
|----|-----------|-------|
| FR-GROUP-6.1 | Chuyển sang nhóm khác | Người dùng chọn một nhóm khác từ danh sách. Hệ thống chuyển giao diện sang nhóm được chọn, hiển thị công việc và chat của nhóm đó. |
| FR-GROUP-6.2 | Chuyển sang nhóm không thuộc về | Người dùng cố chuyển sang nhóm mà họ không phải thành viên. Hệ thống hiển thị thông báo không có quyền truy cập. |

---

## FR-FOLDER — Quản lý thư mục

### FR-FOLDER-1: Tạo thư mục

| ID | Chức năng | Mô tả |
|----|-----------|-------|
| FR-FOLDER-1.1 | Tạo thư mục thành công | Người dùng nhập tên thư mục trong nhóm và nhấn "Tạo". Hệ thống tạo thư mục mới và hiển thị trong danh sách. |
| FR-FOLDER-1.2 | Tên thư mục đã tồn tại | Người dùng nhập tên thư mục đã có trong nhóm. Hệ thống hiển thị thông báo lỗi và không tạo thư mục mới. |
| FR-FOLDER-1.3 | Tên thư mục bị bỏ trống | Người dùng không nhập tên thư mục. Hệ thống hiển thị thông báo lỗi và không cho phép tạo. |

---

### FR-FOLDER-2: Xem danh sách thư mục

| ID | Chức năng | Mô tả |
|----|-----------|-------|
| FR-FOLDER-2.1 | Xem thư mục trong nhóm | Người dùng mở danh sách thư mục của nhóm. Hệ thống hiển thị tất cả thư mục mà người dùng có quyền xem. |

---

### FR-FOLDER-3: Cập nhật thư mục

| ID | Chức năng | Mô tả |
|----|-----------|-------|
| FR-FOLDER-3.1 | Cập nhật thư mục thành công | Người dùng đổi tên, màu hoặc biểu tượng thư mục và lưu. Hệ thống cập nhật và hiển thị thông tin mới. |
| FR-FOLDER-3.2 | Tên mới trùng với thư mục khác | Người dùng đổi tên thành tên đã tồn tại trong nhóm. Hệ thống hiển thị thông báo lỗi và không lưu. |

---

### FR-FOLDER-4: Xóa thư mục

| ID | Chức năng | Mô tả |
|----|-----------|-------|
| FR-FOLDER-4.1 | Xóa thư mục thành công | Người dùng có quyền xác nhận xóa thư mục. Hệ thống xóa thư mục và không còn hiển thị trong danh sách. |

---

### FR-FOLDER-5: Kiểm soát quyền truy cập thư mục

| ID | Chức năng | Mô tả |
|----|-----------|-------|
| FR-FOLDER-5.1 | Giới hạn quyền xem thư mục | Quản trị viên chỉ định danh sách thành viên được phép xem thư mục. Hệ thống ẩn thư mục và các công việc bên trong đối với những thành viên không có trong danh sách. |
| FR-FOLDER-5.2 | Thành viên không có quyền truy cập | Thành viên bị giới hạn cố xem thư mục bị hạn chế. Hệ thống không hiển thị thư mục đó trong danh sách của người dùng. |

---

## FR-TASK — Quản lý công việc

### FR-TASK-1: Tạo công việc

| ID | Chức năng | Mô tả |
|----|-----------|-------|
| FR-TASK-1.1 | Tạo công việc thành công | Người dùng điền tiêu đề công việc và nhấn "Tạo". Hệ thống tạo công việc mới trong nhóm hiện tại và hiển thị trong danh sách. |
| FR-TASK-1.2 | Tiêu đề bị bỏ trống | Người dùng không nhập tiêu đề. Hệ thống hiển thị thông báo lỗi và không cho phép tạo công việc. |
| FR-TASK-1.3 | Tiêu đề quá dài | Người dùng nhập tiêu đề vượt quá 200 ký tự. Hệ thống hiển thị thông báo lỗi và không cho phép tạo. |
| FR-TASK-1.4 | Mô tả quá dài | Người dùng nhập mô tả vượt quá 2000 ký tự. Hệ thống hiển thị thông báo lỗi. |
| FR-TASK-1.5 | Trạng thái không hợp lệ | Người dùng chọn trạng thái không nằm trong danh sách cho phép. Hệ thống hiển thị thông báo lỗi. |
| FR-TASK-1.6 | Độ ưu tiên không hợp lệ | Người dùng chọn mức độ ưu tiên không hợp lệ. Hệ thống hiển thị thông báo lỗi. |
| FR-TASK-1.7 | Quá nhiều nhãn | Người dùng thêm hơn 10 nhãn vào một công việc. Hệ thống hiển thị thông báo lỗi và giới hạn tối đa 10 nhãn. |
| FR-TASK-1.8 | Nhãn quá dài | Người dùng nhập nhãn dài hơn 30 ký tự. Hệ thống hiển thị thông báo lỗi. |
| FR-TASK-1.9 | Chưa chọn nhóm làm việc | Người dùng chưa chọn nhóm đang làm việc cố tạo công việc. Hệ thống hiển thị thông báo yêu cầu chọn nhóm trước. |

---

### FR-TASK-2: Xem danh sách công việc

| ID | Chức năng | Mô tả |
|----|-----------|-------|
| FR-TASK-2.1 | Xem danh sách công việc | Người dùng mở màn hình công việc. Hệ thống hiển thị danh sách công việc trong nhóm hiện tại theo trang. |
| FR-TASK-2.2 | Lọc công việc | Người dùng áp dụng bộ lọc theo trạng thái, độ ưu tiên, thư mục hoặc nhóm. Hệ thống hiển thị chỉ các công việc khớp với điều kiện lọc. |
| FR-TASK-2.3 | Tìm kiếm công việc | Người dùng nhập từ khóa vào ô tìm kiếm. Hệ thống hiển thị các công việc có tiêu đề hoặc nội dung khớp với từ khóa. |
| FR-TASK-2.4 | Sắp xếp công việc | Người dùng chọn sắp xếp theo ngày tạo, ngày đến hạn hoặc độ ưu tiên. Hệ thống sắp xếp lại danh sách theo lựa chọn. |

---

### FR-TASK-3: Xem chi tiết công việc

| ID | Chức năng | Mô tả |
|----|-----------|-------|
| FR-TASK-3.1 | Xem chi tiết công việc | Người dùng nhấn vào một công việc. Hệ thống hiển thị đầy đủ thông tin: tiêu đề, mô tả, trạng thái, độ ưu tiên, ngày đến hạn, người được giao, bình luận, file đính kèm và checklist. |
| FR-TASK-3.2 | Công việc không tồn tại | Người dùng truy cập công việc đã bị xóa. Hệ thống hiển thị thông báo không tìm thấy công việc. |
| FR-TASK-3.3 | Không có quyền xem | Người dùng truy cập công việc thuộc nhóm họ không tham gia. Hệ thống hiển thị thông báo không có quyền truy cập. |

---

### FR-TASK-4: Cập nhật công việc

| ID | Chức năng | Mô tả |
|----|-----------|-------|
| FR-TASK-4.1 | Cập nhật thành công | Người dùng thay đổi thông tin công việc (tiêu đề, mô tả, trạng thái, độ ưu tiên, ngày đến hạn…) và lưu. Hệ thống cập nhật và hiển thị thông tin mới. |
| FR-TASK-4.2 | Dữ liệu cập nhật không hợp lệ | Người dùng nhập giá trị vượt giới hạn (ví dụ tiêu đề quá 200 ký tự). Hệ thống hiển thị thông báo lỗi và không lưu. |
| FR-TASK-4.3 | Không có quyền cập nhật | Người dùng không có quyền sửa công việc. Hệ thống hiển thị thông báo không có quyền. |

---

### FR-TASK-5: Xóa công việc

| ID | Chức năng | Mô tả |
|----|-----------|-------|
| FR-TASK-5.1 | Xóa công việc thành công | Người dùng có quyền xác nhận xóa công việc. Hệ thống xóa công việc và không còn hiển thị trong danh sách. |
| FR-TASK-5.2 | Không có quyền xóa | Người dùng không có quyền xóa công việc. Hệ thống hiển thị thông báo không có quyền. |

---

### FR-TASK-6: Xem công việc theo Lịch

| ID | Chức năng | Mô tả |
|----|-----------|-------|
| FR-TASK-6.1 | Xem lịch công việc | Người dùng mở chế độ xem Lịch. Hệ thống hiển thị công việc phân bố trên lịch theo tháng/năm dựa trên ngày đến hạn. |
| FR-TASK-6.2 | Chuyển tháng/năm | Người dùng nhấn chuyển sang tháng hoặc năm khác. Hệ thống cập nhật lịch và hiển thị công việc của tháng/năm được chọn. |

---

### FR-TASK-7: Xem công việc theo Kanban

| ID | Chức năng | Mô tả |
|----|-----------|-------|
| FR-TASK-7.1 | Xem Kanban | Người dùng mở chế độ xem Kanban. Hệ thống hiển thị công việc dưới dạng các cột theo từng trạng thái (Chờ, Đang làm, Hoàn thành…). |

---

### FR-TASK-8: Xem công việc được giao cho tôi

| ID | Chức năng | Mô tả |
|----|-----------|-------|
| FR-TASK-8.1 | Xem công việc của mình | Người dùng mở bộ lọc "Giao cho tôi". Hệ thống chỉ hiển thị các công việc mà người dùng hiện tại là người được giao. |

---

### FR-TASK-9: Lặp lại công việc

| ID | Chức năng | Mô tả |
|----|-----------|-------|
| FR-TASK-9.1 | Đặt lịch lặp lại | Người dùng cài đặt công việc lặp lại theo chu kỳ (hàng ngày, hàng tuần, hàng tháng, hàng năm) với khoảng cách và ngày kết thúc hoặc số lần lặp. Hệ thống tự động tạo lại công việc theo chu kỳ đã cài. |

---

### FR-TASK-10: Liên kết công việc

| ID | Chức năng | Mô tả |
|----|-----------|-------|
| FR-TASK-10.1 | Liên kết hai công việc | Người dùng liên kết một công việc với công việc khác. Hệ thống hiển thị công việc được liên kết trong phần chi tiết. |
| FR-TASK-10.2 | Xóa liên kết | Người dùng xóa liên kết giữa hai công việc. Hệ thống gỡ liên kết và không còn hiển thị mối quan hệ đó. |
| FR-TASK-10.3 | Công việc được liên kết không tồn tại | Người dùng liên kết với công việc không tồn tại. Hệ thống hiển thị thông báo không tìm thấy công việc đích. |

---

## FR-ASSIGN — Phân công công việc

| ID | Chức năng | Mô tả |
|----|-----------|-------|
| FR-ASSIGN-1.1 | Giao việc cho thành viên | Người dùng chọn một hoặc nhiều thành viên để giao công việc. Hệ thống thêm họ vào danh sách người được giao và gửi thông báo đến các thành viên đó. |
| FR-ASSIGN-1.2 | Vượt số lượng người được giao tối đa | Người dùng cố giao công việc cho nhiều người hơn mức cho phép. Hệ thống hiển thị thông báo đã đạt giới hạn và không giao thêm. |
| FR-ASSIGN-1.3 | Người dùng không tồn tại hoặc bị khóa | Người dùng cố giao công việc cho tài khoản không hợp lệ. Hệ thống hiển thị thông báo lỗi và không thực hiện. |
| FR-ASSIGN-2.1 | Hủy giao việc | Người dùng xóa một người khỏi danh sách được giao. Hệ thống gỡ người đó và gửi thông báo đến họ. |
| FR-ASSIGN-2.2 | Hủy giao người không thuộc danh sách | Người dùng cố hủy giao cho người không có trong danh sách. Hệ thống hiển thị thông báo lỗi. |
| FR-ASSIGN-3.1 | Xem danh sách người được giao | Người dùng mở chi tiết công việc. Hệ thống hiển thị danh sách tất cả thành viên đang được giao cho công việc đó. |

---

## FR-COMMENT — Bình luận công việc

| ID | Chức năng | Mô tả |
|----|-----------|-------|
| FR-COMMENT-1.1 | Thêm bình luận thành công | Người dùng nhập nội dung bình luận và gửi. Hệ thống hiển thị bình luận mới trong danh sách bình luận của công việc. |
| FR-COMMENT-1.2 | Bình luận trống | Người dùng gửi bình luận không có nội dung. Hệ thống hiển thị thông báo lỗi và không gửi. |
| FR-COMMENT-1.3 | Bình luận quá dài | Người dùng nhập bình luận dài hơn 2000 ký tự. Hệ thống hiển thị thông báo lỗi và không gửi. |
| FR-COMMENT-1.4 | Vượt giới hạn bình luận | Công việc đã có 200 bình luận, người dùng cố thêm bình luận mới. Hệ thống hiển thị thông báo đã đạt giới hạn. |
| FR-COMMENT-1.5 | Đề cập (mention) thành viên | Người dùng dùng ký hiệu "@" đề cập một thành viên trong bình luận. Hệ thống gửi thông báo đến người được đề cập. |
| FR-COMMENT-2.1 | Sửa bình luận của mình | Người dùng chỉnh sửa bình luận do mình đăng. Hệ thống cập nhật nội dung bình luận và hiển thị trạng thái "đã chỉnh sửa". |
| FR-COMMENT-2.2 | Sửa bình luận của người khác | Người dùng cố sửa bình luận không phải của mình. Hệ thống hiển thị thông báo không có quyền. |
| FR-COMMENT-3.1 | Xóa bình luận của mình | Người dùng xóa bình luận do mình đăng. Hệ thống xóa bình luận khỏi danh sách. |
| FR-COMMENT-3.2 | Xóa bình luận của người khác | Người dùng cố xóa bình luận không phải của mình. Hệ thống hiển thị thông báo không có quyền. |
| FR-COMMENT-4.1 | Xem danh sách bình luận | Người dùng mở chi tiết công việc. Hệ thống hiển thị danh sách bình luận theo trang. |
| FR-COMMENT-5.1 | Bình luận kèm file | Người dùng đính kèm file cùng bình luận và gửi. Hệ thống hiển thị bình luận cùng liên kết tải file đính kèm. |

---

## FR-ATTACH — File đính kèm

| ID | Chức năng | Mô tả |
|----|-----------|-------|
| FR-ATTACH-1.1 | Tải file lên công việc | Người dùng chọn file và tải lên công việc. Hệ thống lưu file và hiển thị thông tin file (tên, kích thước, người tải, thời gian tải) trong danh sách đính kèm của công việc. |
| FR-ATTACH-1.2 | Vượt giới hạn đính kèm | Công việc đã có 20 file đính kèm, người dùng cố tải thêm. Hệ thống hiển thị thông báo đã đạt giới hạn và không tải lên. |
| FR-ATTACH-2.1 | Xóa file đính kèm | Người dùng có quyền xóa file đính kèm khỏi công việc. Hệ thống xóa file và không còn hiển thị trong danh sách. |
| FR-ATTACH-2.2 | File đính kèm không tồn tại | Người dùng cố xóa file không tồn tại. Hệ thống hiển thị thông báo không tìm thấy file. |

---

## FR-CHECK — Checklist

| ID | Chức năng | Mô tả |
|----|-----------|-------|
| FR-CHECK-1.1 | Thêm mục checklist | Người dùng nhập nội dung và thêm mục checklist vào công việc. Hệ thống hiển thị mục mới trong danh sách checklist. |
| FR-CHECK-1.2 | Mục checklist trống | Người dùng thêm mục không có nội dung. Hệ thống hiển thị thông báo lỗi và không thêm. |
| FR-CHECK-1.3 | Vượt giới hạn checklist | Công việc đã có 50 mục, người dùng cố thêm mục mới. Hệ thống hiển thị thông báo đã đạt giới hạn. |
| FR-CHECK-2.1 | Sửa mục checklist | Người dùng chỉnh sửa nội dung một mục checklist. Hệ thống lưu nội dung mới. |
| FR-CHECK-3.1 | Đánh dấu hoàn thành | Người dùng tích chọn một mục checklist. Hệ thống đánh dấu mục là hoàn thành và ghi lại người thực hiện cùng thời điểm hoàn thành. |
| FR-CHECK-3.2 | Bỏ đánh dấu hoàn thành | Người dùng bỏ tích một mục đã hoàn thành. Hệ thống đổi lại trạng thái chưa hoàn thành và xóa thông tin người thực hiện. |
| FR-CHECK-4.1 | Xóa mục checklist | Người dùng xóa một mục khỏi checklist. Hệ thống xóa mục và cập nhật danh sách. |

---

## FR-TIME — Theo dõi thời gian

| ID | Chức năng | Mô tả |
|----|-----------|-------|
| FR-TIME-1.1 | Bắt đầu tính giờ | Người dùng nhấn "Bắt đầu" trên một công việc. Hệ thống khởi động bộ đếm giờ cho người dùng đó trên công việc này. |
| FR-TIME-1.2 | Nhiều người cùng tính giờ | Nhiều người dùng khác nhau cùng bấm tính giờ trên một công việc. Hệ thống cho phép mỗi người có bộ đếm riêng độc lập. |
| FR-TIME-2.1 | Dừng tính giờ | Người dùng nhấn "Dừng" trên công việc đang tính giờ. Hệ thống dừng bộ đếm, tính tổng thời gian và lưu vào lịch sử thời gian làm việc. |
| FR-TIME-2.2 | Dừng khi không có giờ đang chạy | Người dùng nhấn "Dừng" khi không có bộ đếm nào đang chạy cho mình. Hệ thống hiển thị thông báo lỗi. |
| FR-TIME-2.3 | Ghi chú thời gian làm việc | Người dùng thêm mô tả khi dừng bộ đếm. Hệ thống lưu mô tả cùng bản ghi thời gian. |

---

## FR-CHAT — Chat nhóm

### FR-CHAT-1: Gửi và nhận tin nhắn nhóm

| ID | Chức năng | Mô tả |
|----|-----------|-------|
| FR-CHAT-1.1 | Gửi tin nhắn thành công | Thành viên nhóm nhập nội dung và gửi tin nhắn. Hệ thống hiển thị tin nhắn ngay lập tức trong khung chat cho tất cả thành viên đang online. |
| FR-CHAT-1.2 | Tin nhắn trống | Người dùng cố gửi tin nhắn không có nội dung. Hệ thống không gửi và hiển thị thông báo lỗi. |
| FR-CHAT-1.3 | Tin nhắn quá dài | Người dùng nhập tin nhắn dài hơn 5000 ký tự. Hệ thống hiển thị thông báo lỗi và không gửi. |
| FR-CHAT-1.4 | Không phải thành viên nhóm | Người dùng không thuộc nhóm cố gửi tin nhắn. Hệ thống hiển thị thông báo không có quyền. |
| FR-CHAT-1.5 | Trả lời tin nhắn | Người dùng chọn "Trả lời" một tin nhắn cụ thể và gửi phản hồi. Hệ thống hiển thị tin nhắn mới với tham chiếu đến tin nhắn gốc. |

---

### FR-CHAT-2: Xem lịch sử tin nhắn

| ID | Chức năng | Mô tả |
|----|-----------|-------|
| FR-CHAT-2.1 | Xem lịch sử tin nhắn | Thành viên nhóm mở chat nhóm. Hệ thống hiển thị lịch sử tin nhắn theo trang, 50 tin nhắn mỗi trang. |
| FR-CHAT-2.2 | Tải thêm tin nhắn cũ | Người dùng cuộn lên đầu danh sách. Hệ thống tải thêm tin nhắn cũ hơn. |

---

### FR-CHAT-3: Sửa và xóa tin nhắn

| ID | Chức năng | Mô tả |
|----|-----------|-------|
| FR-CHAT-3.1 | Sửa tin nhắn của mình | Người dùng chỉnh sửa tin nhắn do mình gửi. Hệ thống cập nhật nội dung tin nhắn, hiển thị trạng thái "đã chỉnh sửa". |
| FR-CHAT-3.2 | Sửa tin nhắn của người khác | Người dùng cố sửa tin nhắn không phải của mình. Hệ thống hiển thị thông báo không có quyền. |
| FR-CHAT-3.3 | Xóa tin nhắn của mình | Người dùng xóa tin nhắn do mình gửi. Hệ thống xóa tin nhắn khỏi danh sách. |
| FR-CHAT-3.4 | Xóa tin nhắn của người khác | Người dùng cố xóa tin nhắn không phải của mình. Hệ thống hiển thị thông báo không có quyền. |

---

### FR-CHAT-4: Phản ứng (Reaction) tin nhắn

| ID | Chức năng | Mô tả |
|----|-----------|-------|
| FR-CHAT-4.1 | Thêm reaction | Người dùng chọn emoji để react vào tin nhắn nhóm. Hệ thống thêm reaction và hiển thị số lượng phản ứng ngay dưới tin nhắn. |
| FR-CHAT-4.2 | Xóa reaction | Người dùng bấm lại vào emoji đã react. Hệ thống gỡ reaction của người dùng đó (toggle). |

---

### FR-CHAT-5: Chia sẻ file trong chat nhóm

| ID | Chức năng | Mô tả |
|----|-----------|-------|
| FR-CHAT-5.1 | Gửi file trong chat | Người dùng tải file/ảnh vào chat nhóm. Hệ thống gửi file và hiển thị liên kết tải/xem file trong khung chat. |

---

### FR-CHAT-6: Cập nhật thời gian thực

| ID | Chức năng | Mô tả |
|----|-----------|-------|
| FR-CHAT-6.1 | Nhận tin nhắn thời gian thực | Thành viên nhóm đang online nhận được tin nhắn mới ngay lập tức mà không cần tải lại trang. |
| FR-CHAT-6.2 | Cập nhật khi có sửa/xóa | Khi tin nhắn bị sửa hoặc xóa, tất cả thành viên online thấy thay đổi ngay lập tức. |

---

## FR-DIRECT — Tin nhắn trực tiếp

| ID | Chức năng | Mô tả |
|----|-----------|-------|
| FR-DIRECT-1.1 | Xem danh sách cuộc hội thoại | Người dùng mở mục tin nhắn trực tiếp. Hệ thống hiển thị danh sách tất cả cuộc hội thoại 1-1 của người dùng. |
| FR-DIRECT-2.1 | Bắt đầu hội thoại mới | Người dùng chọn một người dùng khác để nhắn tin. Hệ thống mở cuộc hội thoại (tạo mới nếu chưa có, hoặc mở lại nếu đã có). |
| FR-DIRECT-2.2 | Nhắn tin người dùng không tồn tại | Người dùng tìm kiếm và chọn người không tồn tại trong hệ thống. Hệ thống hiển thị thông báo không tìm thấy người dùng. |
| FR-DIRECT-3.1 | Gửi tin nhắn trực tiếp | Người dùng nhập và gửi tin nhắn trong hội thoại 1-1. Hệ thống gửi tin nhắn và hiển thị trong khung hội thoại. |
| FR-DIRECT-3.2 | Tin nhắn quá dài | Người dùng nhập tin nhắn hơn 5000 ký tự. Hệ thống hiển thị thông báo lỗi và không gửi. |
| FR-DIRECT-3.3 | Không phải người tham gia | Người dùng không có trong hội thoại cố xem hoặc gửi tin nhắn. Hệ thống hiển thị thông báo không có quyền. |
| FR-DIRECT-4.1 | Xem lịch sử tin nhắn 1-1 | Người dùng mở hội thoại. Hệ thống hiển thị lịch sử tin nhắn theo trang. |
| FR-DIRECT-5.1 | Sửa/Xóa tin nhắn trực tiếp | Người dùng sửa hoặc xóa tin nhắn do mình gửi trong hội thoại 1-1. Hệ thống cập nhật hoặc xóa tin nhắn. Nếu người dùng cố sửa/xóa tin nhắn người khác, hệ thống hiển thị thông báo không có quyền. |
| FR-DIRECT-6.1 | React tin nhắn trực tiếp | Người dùng thêm emoji reaction vào tin nhắn trong hội thoại 1-1. Hệ thống thêm/gỡ reaction theo kiểu toggle. |
| FR-DIRECT-7.1 | Gửi file trong tin nhắn 1-1 | Người dùng tải file/ảnh vào hội thoại 1-1. Hệ thống gửi và hiển thị liên kết trong khung hội thoại. |

---

## FR-NOTIF — Thông báo

### FR-NOTIF-1: Xem và quản lý thông báo

| ID | Chức năng | Mô tả |
|----|-----------|-------|
| FR-NOTIF-1.1 | Xem danh sách thông báo | Người dùng mở bảng thông báo. Hệ thống hiển thị danh sách thông báo, có thể lọc theo danh mục (nhóm, công việc, chat, cuộc họp, hệ thống) và trạng thái đã đọc/lưu trữ. |
| FR-NOTIF-1.2 | Hiển thị số thông báo chưa đọc | Hệ thống hiển thị số lượng thông báo chưa đọc trên biểu tượng thông báo ở thanh điều hướng. |
| FR-NOTIF-2.1 | Đánh dấu một thông báo đã đọc | Người dùng nhấn đánh dấu đã đọc trên một thông báo cụ thể. Hệ thống cập nhật trạng thái và giảm số đếm chưa đọc. |
| FR-NOTIF-2.2 | Đánh dấu tất cả đã đọc | Người dùng nhấn "Đánh dấu tất cả đã đọc". Hệ thống cập nhật tất cả thông báo sang trạng thái đã đọc và số đếm về 0. |
| FR-NOTIF-3.1 | Lưu trữ thông báo | Người dùng lưu trữ một hoặc nhiều thông báo. Hệ thống chuyển chúng vào mục lưu trữ và không hiển thị trong danh sách chính. |
| FR-NOTIF-4.1 | Xóa thông báo | Người dùng xóa một hoặc nhiều thông báo. Hệ thống xóa và không còn hiển thị. |

---

### FR-NOTIF-2: Nhận thông báo tự động

| ID | Chức năng | Mô tả |
|----|-----------|-------|
| FR-NOTIF-5.1 | Thông báo lời mời vào nhóm | Người dùng nhận thông báo khi được mời vào một nhóm. Thông báo hiển thị tên nhóm và tùy chọn chấp nhận/từ chối. |
| FR-NOTIF-5.2 | Thông báo thay đổi vai trò | Thành viên nhận thông báo khi vai trò của họ trong nhóm bị thay đổi. |
| FR-NOTIF-5.3 | Thông báo đổi tên nhóm | Thành viên nhận thông báo khi tên nhóm bị thay đổi. |
| FR-NOTIF-5.4 | Thông báo công việc mới | Thành viên nhóm nhận thông báo khi có công việc mới được tạo trong nhóm. |
| FR-NOTIF-5.5 | Thông báo được giao việc | Người dùng nhận thông báo khi được giao cho một công việc. |
| FR-NOTIF-5.6 | Thông báo bị hủy giao việc | Người dùng nhận thông báo khi bị gỡ khỏi danh sách người được giao. |
| FR-NOTIF-5.7 | Thông báo công việc hoàn thành | Người liên quan nhận thông báo khi công việc được đánh dấu hoàn thành. |
| FR-NOTIF-5.8 | Thông báo công việc sắp đến hạn | Người được giao nhận thông báo khi ngày đến hạn của công việc đang đến gần. |
| FR-NOTIF-5.9 | Thông báo có bình luận mới | Người dùng nhận thông báo khi có bình luận mới trên công việc họ đang theo dõi. |
| FR-NOTIF-5.10 | Thông báo được đề cập | Người dùng nhận thông báo khi được "@mention" trong một bình luận. |
| FR-NOTIF-5.11 | Thông báo tin nhắn khi offline | Người dùng nhận thông báo về tin nhắn nhận được khi họ không online. |
| FR-NOTIF-5.12 | Thông báo cuộc họp đến | Người dùng nhận thông báo khi có lời mời tham gia cuộc họp/cuộc gọi. |
| FR-NOTIF-5.13 | Thông báo cuộc họp nhỡ | Người dùng nhận thông báo khi bỏ lỡ một cuộc họp/cuộc gọi. |
| FR-NOTIF-5.14 | Thông báo từ quản trị viên | Tất cả người dùng nhận thông báo hệ thống khi quản trị viên gửi thông báo toàn hệ thống. |

---

### FR-NOTIF-3: Phản hồi lời mời nhóm

| ID | Chức năng | Mô tả |
|----|-----------|-------|
| FR-NOTIF-6.1 | Chấp nhận lời mời | Người dùng nhấn "Chấp nhận" trên thông báo lời mời. Hệ thống thêm người dùng vào nhóm và cập nhật trạng thái thông báo thành "Đã chấp nhận". |
| FR-NOTIF-6.2 | Từ chối lời mời | Người dùng nhấn "Từ chối" trên thông báo lời mời. Hệ thống cập nhật trạng thái thông báo thành "Đã từ chối" và không thêm vào nhóm. |

---

### FR-NOTIF-4: Thời gian thực

| ID | Chức năng | Mô tả |
|----|-----------|-------|
| FR-NOTIF-7.1 | Nhận thông báo thời gian thực | Người dùng đang online nhận thông báo mới ngay lập tức mà không cần tải lại trang. Số đếm thông báo chưa đọc cập nhật tự động. |

---

## FR-NOTE — Ghi chú cá nhân

| ID | Chức năng | Mô tả |
|----|-----------|-------|
| FR-NOTE-1.1 | Tạo ghi chú | Người dùng tạo ghi chú mới. Hệ thống lưu và hiển thị ghi chú trong danh sách ghi chú cá nhân. |
| FR-NOTE-2.1 | Xem danh sách ghi chú | Người dùng mở mục ghi chú. Hệ thống hiển thị tất cả ghi chú của người dùng. |
| FR-NOTE-3.1 | Xem chi tiết ghi chú | Người dùng nhấn vào một ghi chú. Hệ thống hiển thị nội dung đầy đủ. |
| FR-NOTE-3.2 | Ghi chú không tồn tại | Người dùng truy cập ghi chú đã xóa. Hệ thống hiển thị thông báo không tìm thấy ghi chú. |
| FR-NOTE-3.3 | Xem ghi chú của người khác không được chia sẻ | Người dùng cố truy cập ghi chú riêng tư của người khác. Hệ thống hiển thị thông báo không có quyền. |
| FR-NOTE-4.1 | Cập nhật ghi chú | Người dùng chỉnh sửa nội dung ghi chú của mình. Hệ thống lưu và hiển thị nội dung mới. |
| FR-NOTE-4.2 | Sửa ghi chú của người khác | Người dùng cố sửa ghi chú không phải của mình. Hệ thống hiển thị thông báo không có quyền. |
| FR-NOTE-5.1 | Xóa ghi chú | Người dùng xóa ghi chú của mình. Hệ thống xóa và không còn hiển thị trong danh sách. |
| FR-NOTE-5.2 | Xóa ghi chú của người khác | Người dùng cố xóa ghi chú không phải của mình. Hệ thống hiển thị thông báo không có quyền. |
| FR-NOTE-6.1 | Đánh dấu ghi chú yêu thích | Người dùng nhấn nút đánh dấu yêu thích trên ghi chú. Hệ thống thêm/gỡ dấu yêu thích (toggle). |
| FR-NOTE-7.1 | Chia sẻ ghi chú công khai | Người dùng đổi cài đặt ghi chú thành "Công khai". Hệ thống cho phép bất kỳ người dùng đăng nhập nào xem ghi chú đó qua ID. |
| FR-NOTE-7.2 | Đặt ghi chú riêng tư | Người dùng đổi cài đặt ghi chú thành "Riêng tư". Hệ thống chỉ cho phép chủ sở hữu truy cập. |
| FR-NOTE-8.1 | Xóa nhãn khỏi ghi chú | Người dùng xóa một nhãn ra khỏi ghi chú. Hệ thống cập nhật danh sách nhãn của ghi chú. |

---

## FR-ADMIN — Quản trị viên

### FR-ADMIN-1: Kiểm soát truy cập

| ID | Chức năng | Mô tả |
|----|-----------|-------|
| FR-ADMIN-1.1 | Chặn người dùng thường vào trang quản trị | Người dùng không có vai trò quản trị viên cố truy cập trang admin. Hệ thống từ chối truy cập và hiển thị thông báo không có quyền. |

---

### FR-ADMIN-2: Thống kê & Phân tích

| ID | Chức năng | Mô tả |
|----|-----------|-------|
| FR-ADMIN-2.1 | Xem thống kê tổng quan | Quản trị viên mở trang Dashboard. Hệ thống hiển thị các chỉ số tổng quan của hệ thống (số người dùng, số nhóm, hoạt động…). |
| FR-ADMIN-2.2 | Xem phân tích chi tiết | Quản trị viên mở trang Phân tích. Hệ thống hiển thị số liệu chi tiết theo thời gian. |
| FR-ADMIN-2.3 | Xem trạng thái hệ thống | Quản trị viên xem tình trạng hoạt động của các thành phần hệ thống (database, cache…). |

---

### FR-ADMIN-3: Quản lý người dùng

| ID | Chức năng | Mô tả |
|----|-----------|-------|
| FR-ADMIN-3.1 | Xem danh sách người dùng | Quản trị viên mở trang quản lý người dùng. Hệ thống hiển thị danh sách người dùng theo trang, hỗ trợ tìm kiếm và lọc. |
| FR-ADMIN-3.2 | Xem chi tiết tài khoản | Quản trị viên nhấn vào một tài khoản. Hệ thống hiển thị thông tin đầy đủ của người dùng đó. |
| FR-ADMIN-3.3 | Tài khoản không tồn tại | Quản trị viên tìm kiếm người dùng không tồn tại. Hệ thống hiển thị thông báo không tìm thấy. |
| FR-ADMIN-3.4 | Tạo tài khoản người dùng | Quản trị viên điền thông tin và tạo tài khoản mới cho người dùng. Hệ thống tạo tài khoản và hiển thị trong danh sách. |
| FR-ADMIN-3.5 | Cập nhật thông tin người dùng | Quản trị viên chỉnh sửa thông tin tài khoản người dùng và lưu. Hệ thống cập nhật thông tin. |

---

### FR-ADMIN-4: Khóa & Mở khóa tài khoản

| ID | Chức năng | Mô tả |
|----|-----------|-------|
| FR-ADMIN-4.1 | Khóa tài khoản | Quản trị viên khóa một tài khoản người dùng. Hệ thống ngăn người dùng đó đăng nhập và hiển thị thông báo tài khoản bị khóa khi họ cố đăng nhập. |
| FR-ADMIN-4.2 | Mở khóa tài khoản | Quản trị viên mở khóa tài khoản đã bị khóa. Hệ thống cho phép người dùng đó đăng nhập lại bình thường. |
| FR-ADMIN-4.3 | Tài khoản cần khóa không tồn tại | Quản trị viên cố khóa tài khoản không tồn tại. Hệ thống hiển thị thông báo không tìm thấy. |

---

### FR-ADMIN-5: Phân quyền quản trị (Chỉ Super Admin)

| ID | Chức năng | Mô tả |
|----|-----------|-------|
| FR-ADMIN-5.1 | Nâng cấp thành quản trị viên | Super Admin chỉ định người dùng trở thành quản trị viên. Hệ thống cập nhật vai trò và cấp quyền quản trị cho người đó. |
| FR-ADMIN-5.2 | Thu hồi quyền quản trị | Super Admin gỡ bỏ vai trò quản trị viên của một người. Hệ thống cập nhật và người đó không còn quyền quản trị. |
| FR-ADMIN-5.3 | Quản trị viên thường thực hiện thao tác Super Admin | Quản trị viên (không phải Super Admin) cố thực hiện các thao tác phân quyền. Hệ thống hiển thị thông báo không có quyền. |

---

### FR-ADMIN-6: Gửi thông báo hệ thống

| ID | Chức năng | Mô tả |
|----|-----------|-------|
| FR-ADMIN-6.1 | Gửi thông báo đến người dùng | Quản trị viên soạn và gửi thông báo đến một người dùng cụ thể. Hệ thống gửi thông báo và người dùng nhận được trong bảng thông báo. |
| FR-ADMIN-6.2 | Người dùng thường gửi thông báo hệ thống | Người dùng không phải quản trị viên cố gửi thông báo hệ thống. Hệ thống hiển thị thông báo không có quyền. |

---

### FR-ADMIN-7: Lịch sử đăng nhập & Log hành động

| ID | Chức năng | Mô tả |
|----|-----------|-------|
| FR-ADMIN-7.1 | Xem lịch sử đăng nhập | Quản trị viên mở trang lịch sử đăng nhập. Hệ thống hiển thị danh sách các lần đăng nhập bao gồm tên người dùng, địa chỉ IP, thiết bị, thời điểm và kết quả (thành công/thất bại). |
| FR-ADMIN-7.2 | Xem log hành động quản trị | Quản trị viên mở trang log. Hệ thống hiển thị danh sách các thao tác quản trị đã thực hiện. |

---

## FR-BOT — Chatbot hỗ trợ

| ID | Chức năng | Mô tả |
|----|-----------|-------|
| FR-BOT-1.1 | Chatbot hiển thị thông tin ngữ cảnh | Người dùng mở chatbot. Hệ thống cung cấp cho chatbot thông tin về người dùng hiện tại: tên, các công việc đến hạn hôm nay, và danh sách công việc đang hoạt động (chưa hoàn thành). |
| FR-BOT-2.1 | Lưu công việc được đề xuất | Chatbot đề xuất danh sách công việc phù hợp cho người dùng. Hệ thống lưu các công việc được đề xuất đó vào hồ sơ của người dùng. |
| FR-BOT-2.2 | Đánh giá hoàn thành công việc được đề xuất | Người dùng xem kết quả thực hiện công việc được đề xuất. Hệ thống tính toán và hiển thị tỷ lệ hoàn thành. |
| FR-BOT-3.1 | Xem tiến độ nhóm (PM/Product Owner) | Người dùng có vai trò PM hoặc Product Owner trong nhóm mở tính năng xem tiến độ. Hệ thống hiển thị tổng quan tiến độ toàn nhóm. |
| FR-BOT-3.2 | Xem tiến độ từng thành viên (PM/Product Owner) | Người dùng có vai trò PM hoặc Product Owner xem tiến độ từng cá nhân. Hệ thống hiển thị thống kê công việc của từng thành viên trong nhóm. |
| FR-BOT-3.3 | Vai trò không phù hợp xem tiến độ nhóm | Thành viên không có vai trò PM hoặc Product Owner cố xem tiến độ nhóm qua chatbot. Hệ thống hiển thị thông báo không có quyền. |

---

## NFR — Yêu cầu phi chức năng

| ID | Nhóm | Mô tả |
|----|------|-------|
| NFR-PERF-1 | Hiệu năng | Thời gian phản hồi cho các thao tác cơ bản (xem, tạo, sửa công việc; xem hồ sơ; thông báo) không vượt quá 3 giây trong điều kiện bình thường. |
| NFR-PERF-2 | Hiệu năng | Các màn hình danh sách (công việc, thông báo, tin nhắn) được phân trang để tránh tải quá nhiều dữ liệu cùng lúc. |
| NFR-SEC-1 | Bảo mật | Mật khẩu của người dùng không được lưu dưới dạng văn bản thường; hệ thống lưu trữ dưới dạng đã mã hóa. |
| NFR-SEC-2 | Bảo mật | Người dùng chưa đăng nhập không thể truy cập bất kỳ chức năng nào trong hệ thống; hệ thống tự chuyển hướng về trang đăng nhập. |
| NFR-SEC-3 | Bảo mật | Mỗi người dùng chỉ nhìn thấy dữ liệu thuộc quyền truy cập của họ (nhóm, công việc, ghi chú); hệ thống không để lộ dữ liệu của người dùng khác. |
| NFR-SEC-4 | Bảo mật | Hệ thống ngăn chặn các cuộc tấn công brute-force bằng cách giới hạn số lần thử đăng nhập/đăng ký trong một khoảng thời gian nhất định. |
| NFR-USAB-1 | Khả năng sử dụng | Giao diện hiển thị đúng và đầy đủ trên cả màn hình máy tính và thiết bị di động. |
| NFR-USAB-2 | Khả năng sử dụng | Hệ thống hỗ trợ chủ đề Sáng, Tối và Tự động; người dùng có thể thay đổi mà không cần tải lại trang. |
| NFR-USAB-3 | Khả năng sử dụng | Hệ thống hỗ trợ đa ngôn ngữ: Tiếng Anh và Tiếng Việt; toàn bộ giao diện chuyển ngôn ngữ ngay sau khi người dùng thay đổi cài đặt. |
| NFR-USAB-4 | Khả năng sử dụng | Khi có lỗi xảy ra, hệ thống hiển thị thông báo rõ ràng bằng ngôn ngữ người dùng thay vì mã lỗi kỹ thuật. |
| NFR-SCALE-1 | Khả năng mở rộng | Hệ thống cho phép mở rộng để đáp ứng số lượng người dùng tăng mà không ảnh hưởng đến chức năng hiện tại. |
| NFR-RELI-1 | Độ tin cậy | Tất cả các thao tác thất bại đều trả về thông báo lỗi có nội dung mô tả cụ thể; hệ thống không bao giờ hiển thị màn hình trắng hay crash mà không có thông báo. |

---

## Assumptions & Constraints

| Loại | Nội dung |
|------|----------|
| A-1 (Giả định) | Mỗi người dùng có một địa chỉ email hợp lệ và có thể nhận email xác nhận/đặt lại mật khẩu. |
| A-2 (Giả định) | Mỗi người dùng được tự động tạo một workspace cá nhân (nhóm 1 thành viên) ngay sau khi đăng ký. |
| A-3 (Giả định) | Người dùng phải chọn một nhóm đang làm việc trước khi có thể tạo hoặc xem công việc trong nhóm đó. |
| A-4 (Giả định) | Mọi thao tác tải/lưu file đều yêu cầu kết nối internet ổn định để hoàn thành. |
| C-1 (Ràng buộc) | Người dùng chưa đăng nhập không thể truy cập bất kỳ chức năng nào trong ứng dụng. |
| C-2 (Ràng buộc) | Vai trò hệ thống gồm: Người dùng, Quản trị viên, Super Admin. Vai trò trong nhóm là độc lập (PM, QA, Developer…). |
| C-3 (Ràng buộc) | Một công việc chỉ thuộc về một nhóm duy nhất; không hỗ trợ chia sẻ công việc giữa các nhóm. |
| C-4 (Ràng buộc) | Chỉ người tạo nhóm mới có thể xóa nhóm. |
| C-5 (Ràng buộc) | Người dùng chỉ có thể sửa hoặc xóa bình luận, tin nhắn và ghi chú do chính mình tạo ra. |
| C-6 (Ràng buộc) | Mỗi công việc có tối đa 50 mục checklist. |
| C-7 (Ràng buộc) | Mỗi công việc có tối đa 20 file đính kèm. |
| C-8 (Ràng buộc) | Mỗi công việc có tối đa 200 bình luận. |
| C-9 (Ràng buộc) | Mỗi công việc có tối đa 10 nhãn, mỗi nhãn không quá 30 ký tự. |
| C-10 (Ràng buộc) | Tiêu đề công việc tối đa 200 ký tự; mô tả tối đa 2000 ký tự. |
| C-11 (Ràng buộc) | Tin nhắn chat tối đa 5000 ký tự. |
| C-12 (Ràng buộc) | Tên nhóm tối đa 256 ký tự; mô tả nhóm tối đa 2000 ký tự. |
| C-13 (Ràng buộc) | Chỉ Super Admin mới có quyền cấp hoặc thu hồi vai trò Quản trị viên. |
