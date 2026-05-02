## 6.2. Chức năng Xem danh sách nhóm

### 6.2.1. Mô tả chức năng

Chức năng Xem danh sách nhóm hiển thị tất cả nhóm mà người dùng hiện tại là thành viên. Người dùng thường chỉ thấy các nhóm mình tham gia; không thể thấy nhóm của người khác. Quản trị viên có quyền xem toàn bộ nhóm trong hệ thống bất kể tư cách thành viên. Danh sách được cập nhật tự động khi người dùng tham gia hoặc rời khỏi nhóm.

---

### 6.2.2. Yêu cầu chức năng

**FR-GROUP-2-01:** Hệ thống phải hiển thị danh sách tất cả nhóm mà người dùng hiện tại là thành viên khi họ mở màn hình nhóm.

**FR-GROUP-2-02:** Mỗi mục trong danh sách phải hiển thị tối thiểu tên nhóm và icon/avatar nhóm.

**FR-GROUP-2-03:** Người dùng thường không được thấy các nhóm mà họ không phải thành viên.

**FR-GROUP-2-04:** Người dùng có vai trò Quản trị viên phải có khả năng xem toàn bộ nhóm trong hệ thống, kể cả nhóm họ không tham gia.

**FR-GROUP-2-05:** Danh sách phải cập nhật ngay khi người dùng tham gia thêm hoặc rời khỏi một nhóm.

**FR-GROUP-2-06:** Danh sách nhóm phải nhất quán (persist) sau khi tải lại trang và sau khi đăng xuất/đăng nhập lại.

**FR-GROUP-2-07:** Danh sách nhóm của mỗi tài khoản phải độc lập; không bị ảnh hưởng bởi thao tác của người dùng khác.

---

### 6.2.3. Đặc tả Use Case

**Tên Use Case:** Xem danh sách nhóm của người dùng  
**Mã Use Case:** UC-GROUP-LIST-01

**Mô tả:**  
Người dùng mở màn hình nhóm để xem danh sách các nhóm mình tham gia. Hệ thống lọc và hiển thị đúng các nhóm theo quyền truy cập của người dùng.

**Tác nhân chính:**  
Người dùng đã đăng nhập (Người dùng thường hoặc Quản trị viên)

**Tiền điều kiện:**
- Người dùng đã đăng nhập thành công.
- Trong hệ thống đã có ít nhất một nhóm mà người dùng là thành viên.

**Kích hoạt:**  
Người dùng điều hướng đến màn hình quản lý nhóm.

**Hậu điều kiện:**
- Danh sách nhóm phù hợp với quyền truy cập của người dùng được hiển thị.

#### a. Luồng chính (Basic Flow) — Người dùng thường
1. Người dùng đăng nhập và vào màn hình nhóm.
2. Hệ thống truy vấn danh sách nhóm mà người dùng hiện tại là thành viên.
3. Hệ thống hiển thị danh sách với tên và icon của từng nhóm.
4. Người dùng thấy đúng và đủ các nhóm mình tham gia.

#### b. Luồng thay thế (Alternative Flow)

**AF-01: Quản trị viên xem danh sách nhóm**
1. Người dùng có vai trò Quản trị viên vào màn hình nhóm.
2. Hệ thống truy vấn toàn bộ nhóm trong hệ thống (không lọc theo tư cách thành viên).
3. Quản trị viên thấy tất cả nhóm, kể cả nhóm họ không tham gia.

**AF-02: Danh sách cập nhật sau khi tham gia nhóm mới**
1. Người dùng tham gia thêm một nhóm công khai.
2. Hệ thống cập nhật danh sách; nhóm mới xuất hiện trong danh sách của người dùng.

**AF-03: Danh sách cập nhật sau khi rời nhóm**
1. Người dùng rời một nhóm.
2. Hệ thống cập nhật danh sách; nhóm đã rời biến mất khỏi danh sách.

#### c. Luồng ngoại lệ (Exception Flow)

**EF-01: Người dùng chưa tham gia nhóm nào**
1. Người dùng mới (chỉ có workspace cá nhân) mở màn hình nhóm.
2. Hệ thống hiển thị trạng thái trống hoặc chỉ workspace cá nhân; không có lỗi.

---

### 6.2.4. Dữ liệu vào
- Thông tin phiên đăng nhập (để xác định người dùng và quyền)

### 6.2.5. Dữ liệu ra
- Danh sách nhóm (tên, icon/avatar) phù hợp quyền truy cập của người dùng
- Toàn bộ nhóm hệ thống (dành riêng cho Quản trị viên)

---

### 6.2.6. Quy tắc nghiệp vụ
- Người dùng thường chỉ được thấy nhóm mình là thành viên; không thể thấy nhóm người khác.
- Quản trị viên thấy toàn bộ nhóm trong hệ thống, bất kể tư cách thành viên.
- Danh sách cập nhật ngay khi có thay đổi tư cách thành viên (tham gia/rời nhóm).
- Danh sách nhất quán và độc lập theo từng tài khoản.

---

### 6.2.7. Điều kiện tiền đề và ràng buộc
- Người dùng phải đang đăng nhập hợp lệ.
- Cơ sở dữ liệu phải truy cập được để truy vấn danh sách nhóm.

---

### 6.2.8. Mức độ ưu tiên
**Mức độ ưu tiên: Cao**

**Lý do:**  
Đây là điểm khởi đầu để người dùng điều hướng vào không gian làm việc nhóm. Không hiển thị được danh sách nhóm, người dùng không thể tiếp cận công việc, chat và các tính năng cộng tác.

---

### 6.2.9. Tiêu chí chấp nhận
- Người dùng thường thấy đúng các nhóm mình tham gia; không thấy nhóm người khác.
- Quản trị viên thấy toàn bộ nhóm trong hệ thống.
- Danh sách cập nhật ngay sau khi tham gia/rời nhóm.
- Reload trang → danh sách nhóm giữ nguyên.
- Đăng xuất rồi đăng nhập lại → danh sách nhóm giữ nguyên.
- Danh sách của User A không bị ảnh hưởng bởi thao tác của User B.

---

### 6.2.10. Ghi chú
- Các test case tham chiếu: `TC_GROUP_LIST_01` đến `TC_GROUP_LIST_09` (file `TC_GROUP_LIST.md`).
- `TC_GROUP_LIST_03` xác nhận người dùng thường chỉ thấy nhóm mình tham gia.
- `TC_GROUP_LIST_04` xác nhận Admin thấy toàn bộ nhóm hệ thống.
- `TC_GROUP_LIST_05/06` xác nhận danh sách cập nhật sau tham gia/rời nhóm.
- `TC_GROUP_LIST_09` xác nhận tính độc lập giữa các tài khoản.
