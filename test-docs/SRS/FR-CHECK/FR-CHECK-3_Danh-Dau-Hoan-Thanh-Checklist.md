## 10.3. Chức năng Đánh dấu hoàn thành và bỏ đánh dấu checklist

### 10.3.1. Mô tả chức năng

Chức năng này gồm hai phần bổ sung cho nhau trên cùng một mục checklist:

- **Đánh dấu hoàn thành (FR-CHECK-3.1):** Người dùng tích checkbox của mục chưa hoàn thành. Hệ thống chuyển mục sang trạng thái hoàn thành, ghi nhận **người thực hiện** và **thời điểm** hoàn thành; hiển thị dấu hiệu trực quan (gạch ngang, màu, icon ✓, …).

- **Bỏ đánh dấu hoàn thành (FR-CHECK-3.2):** Người dùng bỏ tích mục đã hoàn thành. Hệ thống đưa mục về chưa hoàn thành và **xóa** hiển thị thông tin người thực hiện và thời điểm đã ghi trước đó.

Các mục độc lập: tick/bỏ tick nhiều mục không ảnh hưởng lẫn nhau. Nếu UI có progress bar hoặc tỉ lệ % hoàn thành, giá trị phải cập nhật đúng khi tick, bỏ tick (hoặc đánh dấu N/A nếu không có). Trạng thái cập nhật ngay, đồng bộ giữa thành viên, persist sau reload và đăng nhập lại.

---

### 10.3.2. Yêu cầu chức năng

**FR-CHECK-3-01:** Mỗi mục checklist phải có checkbox có thể click (FR-CHECK-3.1 / 3.2).

**FR-CHECK-3-02:** Khi tick mục chưa hoàn thành, hệ thống phải chuyển sang hoàn thành và ghi nhận người thực hiện = người dùng hiện tại (ví dụ `member@test.com`) và thời điểm hoàn thành (FR-CHECK-3.1).

**FR-CHECK-3-03:** Mục hoàn thành phải có dấu hiệu trực quan rõ (gạch ngang, màu, icon, …).

**FR-CHECK-3-04:** Thông tin người thực hiện và thời điểm phải hiển thị cạnh mục khi đã hoàn thành (theo test mong đợi).

**FR-CHECK-3-05:** Khi bỏ tick mục đã hoàn thành, mục trở về chưa hoàn thành; dấu hiệu trực quan hoàn thành biến mất (FR-CHECK-3.2).

**FR-CHECK-3-06:** Sau khi bỏ tick, thông tin người thực hiện và thời điểm **không còn** hiển thị (FR-CHECK-3.2).

**FR-CHECK-3-07:** Tick nhiều mục độc lập: chỉ các mục được chọn đổi trạng thái; các mục khác không đổi.

**FR-CHECK-3-08:** Progress / tỉ lệ % (nếu có) phải khớp số mục hoàn thành / tổng số mục khi tick và khi bỏ tick; đánh dấu N/A nếu UI không có progress (`TC_CHECK_TOGGLE_07`, `TC_CHECK_TOGGLE_10`).

**FR-CHECK-3-09:** Thành viên khác (`other@test.com`) mở task phải thấy đúng trạng thái tick và đúng tên người thực hiện.

**FR-CHECK-3-10:** Trạng thái persist sau reload và sau đăng xuất — đăng nhập lại.

---

### 10.3.3. Đặc tả Use Case

**Tên Use Case:** Đánh dấu và bỏ đánh dấu hoàn thành mục checklist  
**Mã Use Case:** UC-CHECK-TOGGLE-01

**Mô tả:**  
Người dùng click checkbox để chuyển trạng thái hoàn thành hoặc quay lại chưa hoàn thành; hệ thống cập nhật metadata tương ứng.

**Tác nhân chính:**  
Thành viên nhóm (`member@test.com`, `other@test.com`)

**Tiền điều kiện:**
- Task `Task Check Test` có ít nhất 3 mục: `Mục 1`, `Mục 2`, `Mục 3` — ban đầu tất cả chưa tích (cho luồng tick).

**Kích hoạt:**  
Click checkbox của một mục checklist.

**Hậu điều kiện:**  
Trạng thái và metadata mục khớp thao tác tick hoặc bỏ tick.

#### a. Luồng chính (Basic Flow) — Đánh dấu hoàn thành
1. `Mục 1` đang chưa hoàn thành.
2. `member@test.com` click checkbox của `Mục 1`.
3. `Mục 1` chuyển sang hoàn thành; hiển thị người thực hiện `member@test.com` và thời điểm; giao diện khác biệt rõ.

#### b. Luồng thay thế (Alternative Flow)

**AF-01: Tick nhiều mục độc lập**  
Tick `Mục 1` và `Mục 3`; `Mục 2` vẫn chưa tích.

**AF-02: Progress (nếu có)**  
3 mục, 0 hoàn thành → tick `Mục 1` → hiển thị 1/3 hoặc 33%.

**AF-03: Bỏ đánh dấu**  
`Mục 1` đang hoàn thành → click lại checkbox → chưa hoàn thành; không còn hiển thị người thực hiện và thời điểm.

**AF-04: Progress sau bỏ tick**  
Đã 1/3 → bỏ tick `Mục 1` → 0/3 hoặc 0% (nếu có progress).

**AF-05: Đồng bộ thành viên**  
`member@test.com` tick `Mục 2` → `other@test.com` mở task thấy `Mục 2` hoàn thành và đúng người thực hiện.

#### c. Luồng ngoại lệ (Exception Flow)

(Không có ngoại lệ bắt buộc trong bộ test; có thể bổ sung theo quyền nếu hệ thống hạn chế viewer không được tick.)

---

### 10.3.4. Dữ liệu vào
- Thao tác toggle checkbox trên mục cụ thể
- Danh tính người dùng thực hiện

### 10.3.5. Dữ liệu ra
- Trạng thái hoàn thành / chưa hoàn thành của mục
- Người thực hiện và thời điểm (khi hoàn thành) hoặc xóa các trường này (khi bỏ tick)

---

### 10.3.6. Quy tắc nghiệp vụ
- Ghi nhận ai và khi nào hoàn thành phục vụ truy vết công việc nhóm.
- Bỏ tick phải làm sạch metadata hoàn thành để tránh hiển thị sai (FR-CHECK-3.2).

---

### 10.3.7. Điều kiện tiền đề và ràng buộc
- Chuẩn bị đủ 3 mục chưa tích cho các case tick độc lập và progress.

---

### 10.3.8. Mức độ ưu tiên
**Mức độ ưu tiên: Cao**

**Lý do:**  
Checklist chỉ có giá trị vận hành khi có thể đánh dấu tiến độ và hoàn tác đánh dấu.

---

### 10.3.9. Tiêu chí chấp nhận
- Checkbox click được; mục hoàn thành có style rõ; hiển thị người + thời gian khi đã tích.
- Tick / bỏ tick đúng metadata; tick nhiều mục độc lập.
- Progress cập nhật đúng hoặc N/A.
- Real-time; `other@test.com` đồng bộ; persist reload và đăng nhập lại.
- Responsive.

---

### 10.3.10. Ghi chú
- Test case tham chiếu: `TC_CHECK_TOGGLE_01` đến `TC_CHECK_TOGGLE_14` (file `TC_CHECK_TOGGLE.md`).
- Gộp **FR-CHECK-3.1** (đánh dấu hoàn thành) và **FR-CHECK-3.2** (bỏ đánh dấu) trong một use case vì cùng một bộ test.
- `TC_CHECK_TOGGLE_07`, `TC_CHECK_TOGGLE_10`: N/A nếu không có progress bar.
