# Báo Cáo Thực Thi Performance JMeter

## 1. Thông Tin Tài Liệu

| Trường | Giá trị |
|---|---|
| Dự án | Todo List App |
| Loại báo cáo | Báo cáo thực thi performance JMeter |
| Ngày thực thi | 22/04/2026 |
| Workspace | `D:\ToDoList-3\Todo_list_app` |
| Test plan nguồn | `test-docs/performance/JMETER_PERFORMANCE_TEST_PLAN.md` |
| JMeter plan | `tool-test/jmeter/TodoApp_Perf.jmx` |
| Bộ kết quả chính | `html-20260422-025220`, `html-20260422-025320` |

## 2. Tóm Tắt Điều Hành

Báo cáo này ghi nhận kết quả thực thi 20 kịch bản performance JMeter được định nghĩa trong `test-docs/performance/JMETER_PERFORMANCE_TEST_PLAN.md`.

Kết luận chính là các lỗi của lần chạy cũ trước đây một phần đến từ nhiễu của môi trường test, chứ không hoàn toàn phản ánh hành vi thật của hệ thống:

- `429 Too Many Requests` đến từ cơ chế rate limit đăng nhập ở môi trường local.
- `304 Not Modified` đến từ `HTTP Cache Manager` của JMeter.
- `403 Forbidden` ở bước tạo task đến từ quyền của tài khoản test performance chưa đúng, không phải do bản thân endpoint bị sai.

Các vấn đề này đã được chỉnh lại trước khi chạy lần mới:

- backend perf local được chạy tại `localhost:8081`
- rate limit auth/API local được tắt chỉ cho lần chạy performance
- `HTTP Cache Manager` trong JMeter đã bị tắt
- tài khoản `performance.primary@test.com` được reseed với `groupRole=product_owner`
- dữ liệu seed và các ID trong cấu hình JMeter được sinh lại từ database hiện tại

Sau khi chỉnh:

- **smoke run** trở nên hợp lệ và đủ ổn định để chứng minh test harness hiện đang đo API thật thay vì bị nhiễu bởi lỗi môi trường
- **full run** vẫn fail gần như toàn bộ, nhưng kiểu lỗi đã chuyển sang triệu chứng quá tải thực tế: `SocketTimeoutException: Read timed out` và `SocketException: Connection reset`

Vì vậy, lần rerun này được xem là có giá trị và hợp lệ:

- các lỗi do setup test đã được loại bỏ
- kết quả full load hiện phản ánh giới hạn chịu tải hoặc độ ổn định thực tế của backend dưới profile tải đã định nghĩa

## 2A. Đối Chiếu Yêu Cầu

Các yêu cầu sau đã được thực hiện xong:

| Yêu cầu | Trạng thái | Minh chứng |
|---|---|---|
| Tạo test case | Đã hoàn thành | 20 scenario JMeter đã được xây dựng từ `JMETER_PERFORMANCE_TEST_PLAN.md` và trong báo cáo này đã được chuyển thành test case chi tiết có ID, mô tả, mục tiêu, expected output, pass/fail, và ghi chú lý do fail |
| Tạo test script | Đã hoàn thành | JMeter script `tool-test/jmeter/TodoApp_Perf.jmx` đã được chuẩn bị và hiệu chỉnh để chạy đúng; các script/cấu hình hỗ trợ gồm `run-jmeter.ps1`, `scripts/seed-perf-data.js`, `config/env.local.properties`, và `config/env.rerun-smoke.properties` |
| Thực thi test và sinh report cho môi trường mẫu | Đã hoàn thành | Test đã được chạy trên môi trường mẫu/local `http://localhost:8081`, và report đã được sinh tại `tool-test/jmeter/results/html-20260422-025220` và `tool-test/jmeter/results/html-20260422-025320` |

Điều đó có nghĩa là tập yêu cầu sau đã được đáp ứng:

> Test performance using JMeter, create test cases, create test scripts, execute test, and generate report for a sample environment.

## 3. Phạm Vi Và Mục Tiêu

Lần thực thi này tuân theo phạm vi và KPI trong `JMETER_PERFORMANCE_TEST_PLAN.md`:

- `NFR-PERF-1`: các thao tác chính phải phản hồi trong ngưỡng độ trễ chấp nhận được
- `NFR-PERF-2`: các API danh sách lớn phải hỗ trợ phân trang hoặc chunking
- toàn bộ 20 scenario phải giữ được traceability với performance plan gốc

Mục tiêu của lần rerun là:

1. loại bỏ các nhiễu môi trường không hợp lệ từ lần chạy trước
2. giữ nguyên mục đích của performance plan ban đầu
3. xác định xem ứng dụng có đáp ứng được profile tải mục tiêu hay không
4. tách bạch lỗi giả và bottleneck hiệu năng thật

## 4. Môi Trường Và Chuẩn Bị

### 4.1 Môi Trường Thực Thi

| Hạng mục | Giá trị |
|---|---|
| Backend đích cho rerun | `http://localhost:8081` |
| Protocol | HTTP |
| Base path | `/api` |
| Công cụ thực thi | Apache JMeter 5.6.3 |
| Runtime | Java 24 |
| Chế độ chạy | Non-GUI / headless |

### 4.2 Các Điều Chỉnh Trước Khi Chạy

Các thay đổi sau đã được áp dụng để bảo đảm lần chạy bám đúng mục đích của performance plan:

1. `backend/src/middlewares/rateLimiter.js`
   - giữ cơ chế cho phép tắt rate limit bằng biến môi trường
   - mục đích là tránh anti-bruteforce local làm sai lệch baseline performance

2. `tool-test/jmeter/TodoApp_Perf.jmx`
   - tắt `HTTP Cache Manager`
   - mục đích là tránh `304 Not Modified` làm sai cách diễn giải kết quả

3. `tool-test/jmeter/scripts/seed-perf-data.js`
   - reseed dữ liệu performance từ database hiện tại
   - gán `performance.primary@test.com` thành `groupRole=product_owner`
   - làm mới `groupId`, `taskId`, `conversationId`, và `notificationId`
   - sinh lại `env.local.properties`
   - sinh lại `env.rerun-smoke.properties`

### 4.3 Vì Sao Các Điều Chỉnh Này Không Xung Đột Với Test Plan

Các chỉnh sửa trên không làm thay đổi mục tiêu của performance plan gốc:

- việc tắt rate limit local không làm giảm profile tải mục tiêu của các business API; nó chỉ loại bỏ một lớp chặn bảo vệ không thuộc đối tượng benchmark
- việc tắt `HTTP Cache Manager` khiến test gần hơn với yêu cầu assertion `2xx` và xác thực payload như trong tài liệu
- việc sửa role của tài khoản test cho `PERF-08` và `PERF-09` không làm nhẹ scenario; nó chỉ bảo đảm scenario có thể chạy đúng như mục tiêu ban đầu

## 5. Tóm Tắt Kết Quả Thực Thi

Hai lần chạy được dùng để đánh giá:

### 5.1 Smoke Run

| Trường | Giá trị |
|---|---|
| Env file | `tool-test/jmeter/config/env.rerun-smoke.properties` |
| File kết quả | `tool-test/jmeter/results/perf-result-20260422-025220.jtl` |
| HTML report | `tool-test/jmeter/results/html-20260422-025220/index.html` |
| Tổng sample | 218 |
| Số lỗi | 1 |
| Tỷ lệ lỗi | 0.46% |

Phân bố response code của smoke run:

| Response Code | Số lượng |
|---|---:|
| 200 | 203 |
| 201 | 15 |

Diễn giải smoke run:

- không còn `429`
- không còn `304`
- không còn `403`
- chỉ còn duy nhất 1 assertion fail
- lỗi còn lại là lỗi hiệu năng thật: `PERF-01 Login` mất `2764ms`, vượt threshold `2000ms`

Điều này chứng minh test harness hiện đã đủ đúng để dùng làm baseline hợp lệ.

### 5.2 Full Run

| Trường | Giá trị |
|---|---|
| Env file | `tool-test/jmeter/config/env.local.properties` |
| File kết quả | `tool-test/jmeter/results/perf-result-20260422-025320.jtl` |
| HTML report | `tool-test/jmeter/results/html-20260422-025320/index.html` |
| Tổng sample | 371,608 |
| Số lỗi | 370,951 |
| Tỷ lệ lỗi | 99.82% |

Kiểu lỗi chiếm ưu thế trong full run:

- `java.net.SocketTimeoutException: Read timed out`
- `java.net.SocketException: Connection reset`

Diễn giải full run:

- các lỗi setup từ lần chạy cũ đã được loại bỏ
- ứng dụng vẫn fail nặng dưới full load
- kiểu lỗi hiện tại cho thấy hệ thống mất ổn định thực sự dưới concurrency cao

## 6. Đánh Giá Tổng Thể

### 6.1 Trạng Thái Theo Từng Lần Chạy

| Loại run | Mục tiêu | Trạng thái | Kết luận |
|---|---|---|---|
| Smoke | xác nhận test harness sau khi sửa | Pass với 1 lỗi threshold nhỏ | Harness đã hợp lệ; các lỗi giả trước đó đã được loại bỏ |
| Full | chạy đúng profile tải trong kế hoạch | Fail | Backend không chịu được profile full load hiện tại |

### 6.2 Kết Luận Kỹ Thuật Chính

Hành vi hiện tại của hệ thống cần được hiểu thành hai lớp:

1. **Kết quả chỉnh test harness**
   - thành công
   - lần rerun đã loại bỏ các false negative do rate limit, cache validator, và quyền dữ liệu sai

2. **Kết quả về khả năng chịu tải thực tế của ứng dụng**
   - không đạt
   - backend hiện đang thể hiện hành vi quá tải thật dưới profile tải đã định nghĩa

## 7. Báo Cáo Chi Tiết 20 Test Case

Bảng dưới đây chuyển toàn bộ 20 scenario performance thành test case chính thức với:

- ID
- test description
- test objective
- expected output
- pass/fail
- note kèm lý do fail chính

| ID | Test Description | Test Objective | Expected Output | Pass/Fail | Note / Lý do fail |
|---|---|---|---|---|---|
| PERF-01 | Thực thi `POST /api/auth/login` theo profile tải auth | Xác minh login trả token hợp lệ trong ngưỡng thời gian và tỷ lệ lỗi thấp | HTTP `2xx`, có `accessToken`, p95 `<= 2000ms`, error `< 1%` | Fail | Smoke run đã cho thấy 1 lần vượt ngưỡng thật ở `2764ms`. Full run fail `100%` với timeout/reset, cho thấy login là bottleneck rất sớm. |
| PERF-02 | Thực thi `POST /api/auth/refresh-token` lặp liên tục | Xác minh luồng refresh token ổn định và nhanh dưới tải | HTTP `2xx`, token mới hợp lệ, p95 `<= 1500ms`, error `< 1%` | Fail | Full run có error `94.93%`. Request fail do timeout/reset và bị ảnh hưởng bởi auth setup không ổn định. |
| PERF-03 | Thực thi task list mặc định `GET /api/tasks?page=1&limit=20` | Xác minh danh sách task phân trang đáp ứng KPI | HTTP `2xx`, có payload task list, p95 `<= 3000ms`, error `< 1%` | Fail | Full run error `99.93%`. Lỗi `304` cũ đã bị loại bỏ, nên kết quả hiện phản ánh việc endpoint không chịu được concurrency theo kế hoạch. |
| PERF-04 | Thực thi filtered task list `GET /api/tasks?...filters...` | Xác minh danh sách task có filter vẫn đạt yêu cầu hiệu năng | HTTP `2xx`, payload lọc hợp lệ, p95 `<= 3000ms` | Fail | Full run error `99.93%`. Không còn lỗi do cache; hiện là fail do quá tải thực. |
| PERF-05 | Thực thi task search `GET /api/tasks?search=keyword` | Xác minh tìm kiếm task vẫn trong ngưỡng mục tiêu | HTTP `2xx`, payload search hợp lệ, p95 `<= 3000ms` | Fail | Full run error `99.93%`. Search path cũng sụp đổ dưới full load. |
| PERF-06 | Thực thi task detail `GET /api/tasks/:id` | Xác minh việc mở chi tiết task vẫn ổn định | HTTP `2xx`, payload chi tiết task hợp lệ, p95 `<= 2500ms` | Fail | Full run error `99.94%`. Backend không phục vụ ổn định được endpoint này dưới concurrency cao. |
| PERF-07 | Thực thi task comments `GET /api/tasks/:id/comments?page=1&limit=20` | Xác minh endpoint comment phân trang đạt KPI | HTTP `2xx`, payload comments hợp lệ, p95 `<= 3000ms` | Fail | Endpoint pass ở smoke nhưng fail `99.93%` ở full load. |
| PERF-08 | Thực thi create task `POST /api/tasks` | Xác minh việc tạo task mới thành công trong ngưỡng KPI | HTTP `201/200`, payload task mới hợp lệ, p95 `<= 2500ms`, error `< 1%` | Fail | Lỗi `403` do quyền đã được sửa trước rerun. Full run vẫn error `99.76%`, nên lỗi còn lại là quá tải thực chứ không phải authorization. |
| PERF-09 | Thực thi update task `PATCH /api/tasks/:id` | Xác minh cập nhật task vẫn ổn định dưới write load | HTTP `200`, payload update hợp lệ, p95 `<= 2500ms` | Fail | Full run error `99.76%`. Write path xuống cấp mạnh khi backend bị saturate. |
| PERF-10 | Thực thi kanban `GET /api/tasks/kanban` | Xác minh board kanban vẫn tải được trong ngưỡng cho phép | HTTP `2xx`, payload board hợp lệ, p95 `<= 3500ms` | Fail | Full run error `99.94%`. Đây là endpoint đọc lớn và mất ổn định khi tải tăng. |
| PERF-11 | Thực thi calendar `GET /api/tasks/calendar` | Xác minh dữ liệu lịch công việc có thể phục vụ đúng KPI | HTTP `2xx`, payload calendar hợp lệ, p95 `<= 3500ms` | Fail | Full run error `99.94%`. Kiểu lỗi tương tự kanban. |
| PERF-12 | Thực thi switch group `POST /api/groups/:id/switch` | Xác minh đổi group làm việc nhanh và chính xác | HTTP `200`, đổi current group thành công, p95 `<= 2000ms` | Fail | Full run error `99.86%`. Khi auth/session bị nghẽn, switch group cũng fail dây chuyền. |
| PERF-13 | Thực thi group task list `GET /api/groups/:id/tasks?page=1&limit=20` | Xác minh lấy danh sách task theo group sau switch | HTTP `2xx`, payload task group hợp lệ, p95 `<= 3000ms` | Fail | Endpoint pass ở smoke nhưng fail `99.86%` ở full concurrency. |
| PERF-14 | Thực thi notifications list `GET /api/notifications?page=1&limit=20` | Xác minh danh sách notification phân trang vẫn đạt KPI | HTTP `2xx`, payload notifications hợp lệ, p95 `<= 3000ms` | Fail | Full run error `99.82%`. Lỗi chủ đạo là timeout/reset. |
| PERF-15 | Thực thi unread count `GET /api/notifications/unread-count` | Xác minh polling unread count đủ nhanh và ổn định | HTTP `2xx`, unread count hợp lệ, p95 `<= 1500ms` | Fail | Full run error `99.86%`. Polling endpoint trở nên không ổn định dưới tải cao. |
| PERF-16 | Thực thi mark read và mark all read | Xác minh cập nhật trạng thái đã đọc vẫn đúng và đạt KPI | HTTP `2xx`, trạng thái cập nhật thành công, p95 `<= 2500ms` | Fail | Cả hai flow mark read đều có error rất cao ở full run. Đây là vấn đề write-path thực. |
| PERF-17 | Thực thi group chat history `GET /api/chat/:groupId/messages?page=1&limit=50` | Xác minh tải lịch sử chat nhóm theo trang ở quy mô lớn | HTTP `2xx`, payload chat phân trang hợp lệ, p95 `<= 3500ms` | Fail | Full run error `99.87%`. Group chat history mất ổn định khi áp tải lớn. |
| PERF-18 | Thực thi gửi group message `POST /api/chat/:groupId/messages` | Xác minh việc gửi tin nhắn nhóm vẫn trong ngưỡng mục tiêu | HTTP `201/200`, message tạo thành công, p95 `<= 2000ms` | Fail | Full run error `99.85%`. Đây là lỗi quá tải thật trên chat write path. |
| PERF-19 | Thực thi direct chat history `GET /api/chat/direct/conversations/:id/messages?page=1&limit=50` | Xác minh lịch sử chat 1-1 phân trang vẫn đáp ứng KPI | HTTP `2xx`, payload direct chat hợp lệ, p95 `<= 3500ms` | Fail | Full run error `99.84%`. Mẫu lỗi giống group chat history. |
| PERF-20 | Thực thi admin dashboard và user list phân trang | Xác minh dashboard admin và danh sách user vẫn phản hồi tốt | HTTP `2xx`, payload dashboard/user list hợp lệ, p95 `<= 3000ms` | Fail | Smoke pass, nhưng full run tăng lên `99.86%` và `99.89%`, cho thấy đây là suy giảm toàn hệ thống chứ không phải lỗi quyền hay cấu hình riêng endpoint admin. |

## 8. Diễn Giải Pass/Fail

### 8.1 Diễn Giải Smoke Run

Smoke run cần được xem là baseline xác nhận test harness sau khi chỉnh sửa.

Vì sao smoke quan trọng:

- chứng minh rerun không còn bị sai lệch bởi rate limit
- chứng minh JMeter plan không còn fail vì `304`
- chứng minh write scenario không còn fail vì quyền user sai
- cho thấy ít nhất một lỗi threshold vẫn còn, và đó là lỗi hiệu năng thật

Kết luận smoke:

- test harness đã hợp lệ
- hệ thống chưa hoàn toàn khỏe ngay cả ở tải thấp, vì `PERF-01 Login` vẫn từng vượt ngưỡng

### 8.2 Diễn Giải Full Run

Full run phải được xem là phép đo performance thực theo đúng profile tải trong plan.

Vì sao full run fail:

- login trở nên mất ổn định từ rất sớm
- khi login fail, các flow phụ thuộc token đều bị ảnh hưởng
- dưới concurrency đã cấu hình, backend bắt đầu trả timeout và connection reset
- điều này thể hiện tình trạng saturate hoặc instability thật, không còn là lỗi harness

Những gì full run hiện **không còn** thể hiện:

- không còn là lỗi sai path
- không còn là lỗi cache validation của JMeter
- không còn là lỗi quyền tạo task

## 9. Phân Tích Nguyên Nhân Gốc

### 9.1 Các Lỗi Giả Ở Lần Chạy Trước

Lần chạy cũ trước đó ghi nhận rất nhiều:

- `429 Too Many Requests`
- `401 Unauthorized`
- `304 Not Modified`
- `403 Forbidden`

Các lỗi này không phải tín hiệu performance hợp lệ cho backend vì:

1. `429 Too Many Requests`
   - do auth rate limiter local gây ra
   - không nằm trong KPI business performance của scenario
   - chặn login giả tạo rồi kéo theo các fail phụ thuộc token

2. `304 Not Modified`
   - do JMeter thực hiện cache validation
   - xung đột với yêu cầu assertion `2xx` và validate payload trong performance plan
   - gây false fail ở các list endpoint

3. `403 Forbidden`
   - do role trong seed data chưa đúng
   - khiến `PERF-08` không còn là scenario “tạo task” đúng như tài liệu

### 9.2 Mẫu Lỗi Hợp Lệ Ở Lần Chạy Hiện Tại

Sau khi sửa, full run fail chủ yếu bằng:

- `Read timed out`
- `Connection reset`

Đây là mẫu lỗi khác hoàn toàn so với lần trước và thể hiện vấn đề runtime thực:

- backend không chịu nổi mức concurrency đã cấu hình
- request bị kéo dài vượt ngưỡng timeout socket
- một số connection bị reset trong lúc quá tải

### 9.3 Vì Sao Tỷ Lệ Lỗi Tăng Rất Cao

JMeter plan hiện tại có nhiều thread group chạy đồng thời:

- Auth
- TaskRead
- TaskWrite
- Group
- Notification
- Chat
- Admin

Khi login và auth bắt đầu mất ổn định:

- token extraction trở nên không ổn định
- refresh flow trở nên không ổn định
- các flow downstream vẫn tiếp tục bắn request nhưng dựa trên session degraded hoặc thiếu token
- hệ thống tiêu tốn thêm tài nguyên cho các request fail hoặc half-open
- timeout và connection reset lan rộng ra toàn bộ test plan

Điều này tạo ra hiện tượng suy giảm dây chuyền, thay vì các endpoint fail độc lập.

## 10. Các Phát Hiện Chính Theo Nhóm

### 10.1 Authentication

- `PERF-01` và `PERF-02` là tín hiệu fail sớm và quan trọng nhất
- ngay cả smoke cũng đã cho thấy login có áp lực threshold
- full run cho thấy auth có thể là bottleneck đầu vào của toàn hệ thống

### 10.2 Task APIs

- task read và task write đều pass ở smoke
- nhưng fail gần như toàn bộ ở full run
- điều này cho thấy endpoint vẫn đúng chức năng, nhưng không đủ resilience ở tải mục tiêu

### 10.3 Notification APIs

- notification hoạt động bình thường ở smoke
- nhưng ở full traffic thì fail gần như tương đương task flows
- khả năng cao chịu chung bottleneck backend hoặc database

### 10.4 Chat Và Direct Messaging

- chat và direct message pass smoke
- nhưng mất ổn định mạnh dưới full load
- nguyên nhân có thể liên quan tới truy vấn message, payload lớn, hoặc tranh chấp tài nguyên DB

### 10.5 Admin APIs

- endpoint admin không phải nguồn gốc lỗi ban đầu
- nhưng dưới full load cũng suy giảm nghiêm trọng
- điều này cho thấy đây là vấn đề toàn hệ thống, không phải lỗi cục bộ của một module riêng

## 11. Đánh Giá Theo Acceptance Criteria Của Test Plan

### 11.1 Acceptance Criteria Từ Tài Liệu Gốc

Performance plan gốc yêu cầu:

- thực thi đủ 20 case
- có baseline report
- có các lần rerun sau tối ưu để so sánh
- xác định bottleneck
- có khuyến nghị tối ưu

### 11.2 Kết Quả Đánh Giá

| Tiêu chí | Kết quả | Ghi chú |
|---|---|---|
| Chạy đủ 20 scenario | Đạt | Tất cả scenario đã được thực thi ở smoke và full run |
| Tạo baseline hợp lệ | Đạt | Smoke run là baseline hợp lệ sau khi sửa harness |
| Full load theo kế hoạch đạt KPI | Không đạt | Full run fail rất nặng dưới tải thực tế |
| Loại bỏ false failure | Đạt | `429`, `304`, và `403` đã được xử lý |
| Lộ ra bottleneck thật | Đạt | Auth và sức chịu tải chung của backend hiện đã bộc lộ rõ |

## 12. Khuyến Nghị Bước Tiếp Theo

### 12.1 Hành Động Kỹ Thuật Ngay Lập Tức

1. Đo CPU, memory, event-loop delay, và độ trễ MongoDB trong lúc chạy full run
2. Thu thập log backend trong quá trình load để đối chiếu với thời điểm timeout tăng mạnh
3. Kiểm tra timeout cấu hình ở HTTP server và cách xử lý connection
4. Ưu tiên phân tích login/auth pipeline trước, vì đây là điểm nghẽn xuất hiện sớm nhất

### 12.2 Hành Động Ở Cấp Độ Chiến Lược Load Test

1. Thêm các mức tải trung gian:
   - 25% load profile
   - 50% load profile
   - 75% load profile
2. Xác định ngưỡng gãy thực tế trước khi chạy lại đúng full profile
3. Sau mỗi lần tối ưu, rerun lại để tạo baseline so sánh

### 12.3 Hành Động Tối Ưu Dữ Liệu Và Truy Vấn

1. Rà soát index MongoDB cho:
   - login và refresh token
   - task list và task search
   - notifications
   - truy xuất message/chat history
2. Rà soát kích thước payload trả về cho:
   - kanban
   - group chat history
   - direct chat history
   - admin user list
3. Đánh giá việc trim payload hoặc projection ở các API đọc lớn

## 13. Kết Luận Cuối Cùng

Lần rerun này nên được xem là thành công về mặt chỉnh sửa test setup, nhưng không đạt về mặt kết quả performance của ứng dụng ở profile full load đã định nghĩa.

Giá trị lớn nhất của lần thực thi này là đã biến một báo cáo sai lệch do môi trường thành một tín hiệu kỹ thuật có ý nghĩa:

- trước khi sửa, test bị nhiễu bởi rate limit, cache, và quyền dữ liệu
- sau khi sửa, smoke run xác nhận test harness đã hợp lệ
- sau khi sửa, full run cho thấy hành vi quá tải thực sự của backend

Trạng thái cuối cùng:

- **Độ hợp lệ của test harness:** đã cải thiện và có thể chấp nhận
- **Smoke baseline:** chấp nhận được, chỉ còn 1 lỗi threshold login
- **Full planned load:** không đạt
- **Diễn giải chính:** hệ thống hiện chưa đáp ứng được profile performance mục tiêu dưới mức concurrent load đã định nghĩa

## 14. Tài Liệu Kết Quả Tham Chiếu

### Smoke Run

- HTML report: `tool-test/jmeter/results/html-20260422-025220/index.html`
- JTL data: `tool-test/jmeter/results/perf-result-20260422-025220.jtl`

### Full Run

- HTML report: `tool-test/jmeter/results/html-20260422-025320/index.html`
- JTL data: `tool-test/jmeter/results/perf-result-20260422-025320.jtl`
