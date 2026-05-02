## 11.2. Chức năng Dừng tính giờ, lịch sử và ghi chú

### 11.2.1. Mô tả chức năng

Chức năng Dừng tính giờ cho phép người dùng kết thúc bộ đếm đang chạy của chính họ trên công việc. Khi nhấn "Dừng", hệ thống dừng bộ đếm, tính **tổng thời gian** của phiên làm việc và ghi **một bản ghi** vào **lịch sử thời gian** (thời điểm bắt đầu, kết thúc, tổng thời gian). Người dùng có thể nhập **ghi chú** khi dừng (textarea/input); ghi chú được lưu cùng bản ghi — **ghi chú có thể để trống** (không bắt buộc). Nếu người dùng cố **dừng khi không có timer** đang chạy cho mình, hệ thống hiển thị **thông báo lỗi** và không tạo bản ghi giả (FR-TIME-2.2). Nhiều vòng bắt đầu–dừng trên cùng task tạo **nhiều bản ghi** trong lịch sử, không ghi đè. Bản ghi chỉ thuộc đúng người dùng đã dừng — timer của người khác trên cùng task không bị dừng nhầm và lịch sử không lẫn giữa user.

---

### 11.2.2. Yêu cầu chức năng

**FR-TIME-2-01:** Khi timer đang chạy, hệ thống phải hiển thị nút "Dừng" (hoặc stop ■); không hiển thị đồng thời nút "Bắt đầu" như trạng thái chờ.

**FR-TIME-2-02:** Khi nhấn "Dừng", hệ thống phải hiển thị trường nhập ghi chú (textarea hoặc input) trước khi xác nhận lưu (theo UI test).

**FR-TIME-2-03:** Sau khi xác nhận dừng hợp lệ, bộ đếm dừng; bản ghi mới xuất hiện trong lịch sử với thời điểm bắt đầu, kết thúc, tổng thời gian khớp thời gian đã đếm (±1 giây) (FR-TIME-2.1).

**FR-TIME-2-04:** Tổng thời gian trong bản ghi phải khớp \(T_{\text{kết thúc}} - T_{\text{bắt đầu}}\) trong phạm vi sai số cho phép.

**FR-TIME-2-05:** Khi không có timer đang chạy, thực hiện hành động dừng (qua UI hoặc API theo test) → **thông báo lỗi**; không thêm bản ghi rỗng/giả vào lịch sử (FR-TIME-2.2).

**FR-TIME-2-06:** Ghi chú có thể để trống vẫn dừng và lưu bản ghi thành công (ghi chú rỗng).

**FR-TIME-2-07:** Ghi chú không trống phải được lưu và hiển thị đúng trong lịch sử cùng bản ghi (FR-TIME-2.3).

**FR-TIME-2-08:** Nhiều lần tính giờ liên tiếp → lịch sử chứa đủ từng bản ghi, đúng thứ tự thời gian.

**FR-TIME-2-09:** Khi hai người cùng chạy timer, chỉ bản ghi của người nhấn dừng được thêm vào lịch sử của người đó; timer của người kia vẫn chạy nếu chưa dừng.

**FR-TIME-2-10:** Lịch sử và form dừng phải responsive.

**FR-TIME-2-11:** Sau khi dừng, có thể bắt đầu timer lần mới; các vòng tích lũy đúng trong lịch sử (ví dụ "Vòng 1", "Vòng 2").

---

### 11.2.3. Đặc tả Use Case

**Tên Use Case:** Dừng tính giờ và lưu lịch sử kèm ghi chú  
**Mã Use Case:** UC-TIME-STOP-01

**Mô tả:**  
Người dùng nhấn "Dừng" trên timer đang chạy, có thể nhập ghi chú, xác nhận; hệ thống lưu bản ghi thời gian.

**Tác nhân chính:**  
Thành viên nhóm (`member@test.com`, `member2@test.com`)

**Tiền điều kiện:**
- Đối với luồng dừng thành công: timer của user đang chạy trên `Task Timer Test`.
- Đối với FR-TIME-2.2: không có timer đang chạy.

**Kích hoạt:**  
Người dùng nhấn "Dừng" và hoàn tất xác nhận (kèm ghi chú nếu có).

**Hậu điều kiện:**  
Bản ghi trong lịch sử hoặc thông báo lỗi khi dừng không hợp lệ.

#### a. Luồng chính (Basic Flow)
1. Timer của `member@test.com` đã chạy ít nhất vài giây (ví dụ ≥ 5 giây).
2. Ghi nhận giá trị đếm tại thời điểm dừng.
3. Nhấn "Dừng".
4. Hệ thống hiển thị trường ghi chú (theo thiết kế).
5. Người dùng nhập ghi chú hoặc để trống và xác nhận.
6. Bộ đếm dừng; bản ghi mới trong lịch sử với tổng thời gian khớp đếm (±1 giây).

#### b. Luồng thay thế (Alternative Flow)

**AF-01: Ghi chú để trống**  
Để trống ghi chú, xác nhận → bản ghi lưu thành công, không lỗi validation.

**AF-02: Ghi chú có nội dung — FR-TIME-2.3**  
Nhập `"Hoàn thành phần giao diện"` → lịch sử hiển thị đúng chuỗi.

**AF-03: Hai lần tính giờ**  
Dừng lần 1 → bắt đầu lần 2 → dừng lần 2 → hai bản ghi riêng, không ghi đè.

**AF-04: Hai người cùng task**  
Cả hai bắt đầu timer; chỉ `member@test.com` dừng → chỉ lịch sử của `member@test.com` có bản ghi mới; timer `member2@test.com` vẫn chạy.

**AF-05: Luồng đầy đủ**  
Bắt đầu → đợi ~10 giây → Dừng → ghi chú `"Test flow"` → bản ghi ≈ 10 giây.

**AF-06: Nhiều vòng Vòng 1 / Vòng 2**  
Hai vòng 5 giây và 8 giây với ghi chú tương ứng → lịch sử đúng thứ tự và duration.

#### c. Luồng ngoại lệ (Exception Flow)

**EF-01: Dừng khi không có timer chạy — FR-TIME-2.2**  
→ Thông báo lỗi; không tạo bản ghi giả.

---

### 11.2.4. Dữ liệu vào
- Xác nhận dừng timer
- Ghi chú (tùy chọn, có thể rỗng)

### 11.2.5. Dữ liệu ra
- Bản ghi lịch sử: bắt đầu, kết thúc, tổng thời gian, ghi chú
- Thông báo lỗi khi dừng không hợp lệ

---

### 11.2.6. Quy tắc nghiệp vụ
- Thời gian ghi nhận phải nhất quán với đồng hồ phiên làm việc của user.
- Phân tách lịch sử theo người dùng — không gộp nhầm phiên của hai người.

---

### 11.2.7. Điều kiện tiền đề và ràng buộc
- Chuẩn bị timer đang chạy trước các case dừng.
- `TC_TIME_STOP_05` có thể cần API/DevTools nếu nút Dừng không hiển thị khi không chạy.

---

### 11.2.8. Mức độ ưu tiên
**Mức độ ưu tiên: Cao**

**Lý do:**  
Dừng và lưu lịch sử là bước khép kín vòng đo thời gian; thiếu thì không có báo cáo thời gian làm việc.

---

### 11.2.9. Tiêu chí chấp nhận
- Nút Dừng khi đang chạy; trường ghi chú khi dừng; lịch sử hiển thị đủ trường.
- Dừng thành công → tổng thời gian khớp (±1 giây); ghi chú lưu đúng hoặc rỗng hợp lệ.
- Dừng không có timer → lỗi, không bản ghi giả.
- Nhiều bản ghi; đúng user; hai user độc lập.
- Luồng đầy đủ và nhiều vòng; responsive lịch sử.

---

### 11.2.10. Ghi chú
- Test case tham chiếu: `TC_TIME_STOP_01` đến `TC_TIME_STOP_13` (file `TC_TIME_STOP.md`).
- `TC_TIME_STOP_07` → FR-TIME-2.1; `TC_TIME_STOP_05` → FR-TIME-2.2; `TC_TIME_STOP_09` → FR-TIME-2.3.
- `TC_TIME_STOP_08`: đối chiếu T₁, T₂ với tổng thời gian bản ghi.
