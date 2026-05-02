## 6.5. Chức năng Quản lý thành viên nhóm

### 6.5.1. Mô tả chức năng

Chức năng Quản lý thành viên nhóm bao gồm các thao tác liên quan đến vòng đời thành viên trong một nhóm: thêm thành viên mới, xóa thành viên, thay đổi vai trò, gửi lời mời, cho phép thành viên rời nhóm và tham gia nhóm công khai. Quản trị viên nhóm (Admin) quản lý phần lớn các thao tác này; thành viên thường có thể tự rời nhóm hoặc gửi lời mời. Mọi thay đổi thành viên đều gửi thông báo cho người liên quan.

---

### 6.5.2. Yêu cầu chức năng

**FR-GROUP-5-01:** Quản trị viên nhóm phải có khả năng thêm người dùng mới vào nhóm; người được thêm nhận thông báo.

**FR-GROUP-5-02:** Hệ thống phải từ chối thêm thành viên khi nhóm đã đạt số lượng thành viên tối đa và hiển thị thông báo lỗi.

**FR-GROUP-5-03:** Hệ thống phải thông báo nếu người dùng được thêm đã là thành viên của nhóm; không thêm trùng.

**FR-GROUP-5-04:** Quản trị viên nhóm phải có khả năng xóa thành viên khỏi nhóm; thành viên bị xóa không còn thấy nội dung nhóm.

**FR-GROUP-5-05:** Quản trị viên nhóm phải có khả năng thay đổi vai trò của thành viên (PM, QA, Developer…); người được đổi vai trò nhận thông báo.

**FR-GROUP-5-06:** Thành viên nhóm có thể gửi lời mời đến người dùng khác; người được mời nhận thông báo lời mời.

**FR-GROUP-5-07:** Hệ thống phải thông báo lỗi khi mời người dùng không tồn tại trong hệ thống.

**FR-GROUP-5-08:** Thành viên có thể tự rời khỏi nhóm; sau khi rời, họ không còn thấy nội dung nhóm.

**FR-GROUP-5-09:** Người dùng có thể tham gia nhóm công khai; hệ thống thêm họ vào danh sách thành viên.

**FR-GROUP-5-10:** Danh sách thành viên phải cập nhật ngay sau mỗi thao tác thêm/xóa mà không cần tải lại trang.

---

### 6.5.3. Đặc tả Use Case

**Tên Use Case:** Quản lý thành viên nhóm làm việc  
**Mã Use Case:** UC-GROUP-MEMBERS-01

**Mô tả:**  
Quản trị viên nhóm thực hiện các thao tác quản lý thành viên: thêm, xóa, đổi vai trò. Thành viên thường có thể gửi lời mời, rời nhóm và tham gia nhóm công khai. Hệ thống gửi thông báo cho các bên liên quan sau mỗi thao tác.

**Tác nhân chính:**  
Quản trị viên nhóm (Admin), Thành viên nhóm, Người dùng chưa vào nhóm

**Tiền điều kiện:**
- Người dùng đã đăng nhập thành công.
- Nhóm đang tồn tại trong hệ thống.
- Người thực hiện thao tác có đủ quyền tương ứng với từng hành động.

**Kích hoạt:**  
Người dùng mở trang quản lý thành viên nhóm và thực hiện thao tác (thêm/xóa/đổi vai trò/mời/rời/tham gia).

**Hậu điều kiện:**
- Danh sách thành viên được cập nhật phù hợp với thao tác đã thực hiện.
- Thông báo được gửi đến các bên liên quan.

#### a. Luồng chính (Basic Flow) — Thêm thành viên
1. Quản trị viên nhóm mở trang quản lý thành viên.
2. Hệ thống hiển thị danh sách thành viên hiện tại với tên, vai trò, avatar.
3. Quản trị viên tìm và chọn người dùng cần thêm (theo email hoặc tên).
4. Quản trị viên nhấn "Thêm".
5. Hệ thống kiểm tra người dùng tồn tại và chưa là thành viên nhóm.
6. Hệ thống kiểm tra nhóm chưa đạt giới hạn thành viên tối đa.
7. Hệ thống thêm người dùng vào nhóm.
8. Hệ thống gửi thông báo "Bạn đã được thêm vào nhóm..." đến người được thêm.
9. Danh sách thành viên cập nhật ngay lập tức.

#### b. Luồng thay thế (Alternative Flow)

**AF-01: Xóa thành viên khỏi nhóm**
1. Quản trị viên chọn thành viên cần xóa và nhấn "Xóa khỏi nhóm".
2. Hệ thống xóa thành viên khỏi nhóm.
3. Thành viên bị xóa không còn thấy nhóm trong danh sách; URL nhóm bị chặn.
4. Hệ thống gửi thông báo đến thành viên bị xóa.
5. Danh sách thành viên cập nhật ngay.

**AF-02: Thay đổi vai trò thành viên**
1. Quản trị viên chọn thành viên, chọn vai trò mới (PM, QA, Developer…) và lưu.
2. Hệ thống cập nhật vai trò trong cơ sở dữ liệu.
3. Hệ thống gửi thông báo thay đổi vai trò đến thành viên.
4. Vai trò mới hiển thị ngay trong danh sách thành viên.

**AF-03: Thành viên gửi lời mời**
1. Thành viên nhóm nhập email người cần mời và nhấn "Mời".
2. Hệ thống kiểm tra người dùng đó tồn tại trong hệ thống.
3. Hệ thống gửi thông báo lời mời đến người được mời.
4. Người được mời có thể chấp nhận hoặc từ chối lời mời (xem FR-NOTIF-6).

**AF-04: Thành viên rời nhóm**
1. Thành viên nhấn "Rời nhóm" và xác nhận.
2. Hệ thống gỡ thành viên khỏi nhóm.
3. Nhóm biến mất khỏi danh sách nhóm của thành viên đó.
4. Thành viên không còn truy cập được nội dung nhóm.

**AF-05: Người dùng tham gia nhóm công khai**
1. Người dùng tìm và chọn nhóm công khai, nhấn "Tham gia nhóm".
2. Hệ thống thêm người dùng vào nhóm như thành viên mới.
3. Nhóm xuất hiện trong danh sách nhóm của người dùng; nội dung nhóm có thể truy cập.

#### c. Luồng ngoại lệ (Exception Flow)

**EF-01: Thêm thành viên vượt giới hạn tối đa**
1. Quản trị viên cố thêm thành viên khi nhóm đã đạt số lượng tối đa.
2. Hệ thống phát hiện vi phạm giới hạn.
3. Hệ thống hiển thị thông báo "Nhóm đã đạt giới hạn thành viên tối đa"; không thêm được.

**EF-02: Thêm người dùng đã là thành viên nhóm**
1. Quản trị viên cố thêm người dùng đã có trong nhóm.
2. Hệ thống phát hiện người dùng đã là thành viên.
3. Hệ thống thông báo lỗi; không tạo bản ghi thành viên trùng.

**EF-03: Mời người dùng không tồn tại trong hệ thống**
1. Thành viên nhập email không tồn tại trong hệ thống để mời.
2. Hệ thống không tìm thấy người dùng.
3. Hệ thống hiển thị thông báo "Người dùng không tồn tại"; lời mời không được gửi.

---

### 6.5.4. Dữ liệu vào
- Email hoặc tên người dùng cần thêm/mời/xóa/đổi vai trò
- Vai trò mới (khi đổi vai trò)
- Hành động của người dùng (rời nhóm, tham gia nhóm công khai)

### 6.5.5. Dữ liệu ra
- Danh sách thành viên được cập nhật ngay lập tức
- Thông báo gửi đến người liên quan (được thêm, bị xóa, đổi vai trò, nhận lời mời)
- Thông báo lỗi khi vi phạm ràng buộc (quá giới hạn, người dùng không tồn tại…)

---

### 6.5.6. Quy tắc nghiệp vụ
- Chỉ Quản trị viên nhóm (Admin/Owner) được thêm/xóa thành viên và thay đổi vai trò.
- Mọi thành viên có thể gửi lời mời đến người dùng khác.
- Mọi thành viên (trừ trường hợp đặc biệt của Owner) có thể tự rời nhóm.
- Không thêm trùng thành viên đã có trong nhóm.
- Nhóm có giới hạn số thành viên tối đa; không được phép vượt quá.
- Mọi thay đổi thành viên đều kèm thông báo đến người liên quan.
- Thành viên bị xóa hoặc tự rời không còn thấy nội dung nhóm; URL nhóm bị chặn.
- Danh sách thành viên cập nhật ngay sau mỗi thao tác mà không cần tải lại trang.

---

### 6.5.7. Điều kiện tiền đề và ràng buộc
- Người dùng phải đang đăng nhập hợp lệ.
- Nhóm phải đang tồn tại trong hệ thống.
- Người thực hiện thao tác phải có quyền tương ứng.
- Hệ thống thông báo phải hoạt động để gửi thông báo đến các bên liên quan.

---

### 6.5.8. Mức độ ưu tiên
**Mức độ ưu tiên: Cao**

**Lý do:**  
Quản lý thành viên là tính năng cốt lõi của làm việc nhóm. Không có khả năng thêm/xóa thành viên, nhóm không thể mở rộng đội ngũ và không kiểm soát được quyền truy cập nội dung.

---

### 6.5.9. Tiêu chí chấp nhận
- Admin thêm thành viên mới → thành công, người được thêm nhận thông báo, danh sách cập nhật ngay.
- Thêm thành viên đã có → thông báo trùng, không thêm lại.
- Thêm vượt giới hạn tối đa → thông báo đã đạt giới hạn, không thêm.
- Admin xóa thành viên → thành viên bị xóa không còn thấy nhóm.
- Admin đổi vai trò → vai trò mới hiển thị, người được đổi nhận thông báo.
- Thành viên gửi lời mời → người được mời nhận thông báo lời mời.
- Mời người dùng không tồn tại → thông báo lỗi, không gửi lời mời.
- Thành viên rời nhóm → nhóm biến mất khỏi danh sách của họ.
- Người dùng tham gia nhóm công khai → được thêm vào thành viên, thấy nội dung nhóm.
- Danh sách thành viên cập nhật ngay mà không cần reload.

---

### 6.5.10. Ghi chú
- Các test case tham chiếu: `TC_GROUP_MEMBERS_01` đến `TC_GROUP_MEMBERS_22` (file `TC_GROUP_MEMBERS.md`).
- `TC_GROUP_MEMBERS_04` xác nhận hệ thống phát hiện thêm thành viên đã có trong nhóm.
- `TC_GROUP_MEMBERS_05` kiểm tra vượt giới hạn — cần setup nhóm đầy trước khi test.
- `TC_GROUP_MEMBERS_07` xác nhận thành viên bị xóa không còn truy cập được nhóm.
- `TC_GROUP_MEMBERS_16/17/20` xác nhận các loại thông báo được gửi đến người liên quan.
- `TC_GROUP_MEMBERS_19` xác nhận danh sách cập nhật ngay mà không cần reload.
- `TC_GROUP_MEMBERS_21` kiểm tra Owner tự rời nhóm — kết quả tùy business rule (có thể cần chuyển quyền trước).
- `TC_GROUP_MEMBERS_12/13` cần thêm lại `member@test.com` sau khi test rời nhóm.
- Liên kết với FR-NOTIF-5 (thông báo tự động) và FR-NOTIF-6 (phản hồi lời mời).
