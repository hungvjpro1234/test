# JMeter Performance Test Plan from SRS (20 Test Cases)

## 1) Pham vi va muc tieu

- Tai lieu dau vao: `test-docs/SRS.md` (FR + NFR).
- Muc tieu chinh:
  - Dap ung `NFR-PERF-1`: response time thao tac chinh <= 3 giay trong dieu kien binh thuong.
  - Dap ung `NFR-PERF-2`: cac danh sach lon phai phan trang/phan doan du lieu.
- Gioi han: 20 test case uu tien cao, phuc vu viet script JMeter tu dong.

## 2) Thanh phan can Performance Test bang JMeter

### P0 - Bat buoc

1. Auth (`/api/auth/login`, `/api/auth/refresh-token`)  
2. Task list/search/filter/kanban/calendar (`/api/tasks`, `/api/tasks/kanban`, `/api/tasks/calendar`, `/api/tasks/assigned-to-me`)  
3. Task detail + comments (`/api/tasks/:id`, `/api/tasks/:id/comments`)  
4. Group switch + group task list (`/api/groups/:id/switch`, `/api/groups/:id/tasks`)  
5. Notification list + unread + mark read (`/api/notifications`, `/api/notifications/unread-count`, `/api/notifications/:id/read`, `/api/notifications/mark-all-read`)  
6. Group chat history + send (`/api/chat/:groupId/messages`)  
7. Direct message conversation + history + send (`/api/chat/direct/...`)  

### P1 - Nen co

8. Admin dashboard va user list (`/api/admin/dashboard/stats`, `/api/admin/users`)  
9. User profile (`/api/users/me`)  

### P2 - Co the bo sung sau

10. Note list (`/api/notes`)  
11. Chatbot context (`/api/chatbot/context`)  

## 3) KPI/Threshold de pass

- p95 response time:
  - API doc/ghi thong thuong: <= 3000 ms
  - API danh sach lon (chat history/task list): <= 3500 ms
- Error rate (HTTP 5xx + timeout + assertion fail): < 1%
- Throughput: dat muc du kien moi scenario (ghi ro trong bang test case)
- Data paging:
  - API danh sach phai ton tai query `page/limit` hoac co co che chunking equivalent.

## 4) Test data va moi truong

- User role:
  - `normal_user_01`, `normal_user_02`, `group_admin_01`, `system_admin_01`
- Khoi luong data toi thieu truoc khi test:
  - >= 50 groups
  - >= 10,000 tasks (phan bo nhieu group)
  - >= 50,000 group chat messages
  - >= 20,000 direct messages
  - >= 20,000 notifications
- Warm-up: 3-5 phut truoc khi do chinh thuc.

## 5) Danh sach 20 test case cho JMeter

| ID | Priority | SRS Ref | Endpoint/API | Scenario | Load Profile (threads-ramp-hold) | Pass Criteria |
|---|---|---|---|---|---|---|
| PERF-01 | P0 | NFR-PERF-1, FR-AUTH-2 | `POST /api/auth/login` | Login co token tra ve hop le | 50-60s-5m | p95 <= 2000ms, err < 1% |
| PERF-02 | P0 | NFR-PERF-1 | `POST /api/auth/refresh-token` | Refresh token lien tuc | 80-60s-5m | p95 <= 1500ms, err < 1% |
| PERF-03 | P0 | NFR-PERF-1, FR-TASK-2.1 | `GET /api/tasks?page=1&limit=20` | Task list mac dinh | 120-90s-10m | p95 <= 3000ms, err < 1% |
| PERF-04 | P0 | NFR-PERF-1, FR-TASK-2.2 | `GET /api/tasks?...filters...` | Task list voi filter status/priority | 120-90s-10m | p95 <= 3000ms |
| PERF-05 | P0 | NFR-PERF-1, FR-TASK-2.3 | `GET /api/tasks?search=keyword` | Task search theo tu khoa | 120-90s-10m | p95 <= 3000ms |
| PERF-06 | P0 | NFR-PERF-1, FR-TASK-3.1 | `GET /api/tasks/:id` | Mo chi tiet task | 100-60s-8m | p95 <= 2500ms |
| PERF-07 | P0 | NFR-PERF-1, FR-COMMENT-4.1 | `GET /api/tasks/:id/comments?page=1&limit=20` | Tai trang comment cua task | 100-60s-8m | p95 <= 3000ms |
| PERF-08 | P0 | NFR-PERF-1, FR-TASK-1.1 | `POST /api/tasks` | Tao task | 60-60s-10m | p95 <= 2500ms, err < 1% |
| PERF-09 | P0 | NFR-PERF-1, FR-TASK-4.1 | `PATCH /api/tasks/:id` | Cap nhat task | 60-60s-10m | p95 <= 2500ms |
| PERF-10 | P0 | NFR-PERF-2, FR-TASK-7.1 | `GET /api/tasks/kanban` | Tai board kanban | 80-60s-8m | p95 <= 3500ms |
| PERF-11 | P1 | NFR-PERF-2, FR-TASK-6.1 | `GET /api/tasks/calendar` | Tai lich cong viec | 80-60s-8m | p95 <= 3500ms |
| PERF-12 | P0 | NFR-PERF-1, FR-GROUP-6.1 | `POST /api/groups/:id/switch` | Chuyen group dang lam viec | 50-45s-6m | p95 <= 2000ms |
| PERF-13 | P0 | NFR-PERF-1, FR-GROUP-2.1 | `GET /api/groups/:id/tasks?page=1&limit=20` | Lay task theo group sau switch | 100-60s-8m | p95 <= 3000ms |
| PERF-14 | P0 | NFR-PERF-1, FR-NOTIF-1.1 | `GET /api/notifications?page=1&limit=20` | Danh sach notifications | 120-90s-10m | p95 <= 3000ms |
| PERF-15 | P0 | NFR-PERF-1, FR-NOTIF-1.2 | `GET /api/notifications/unread-count` | Poll unread count | 150-120s-10m | p95 <= 1500ms |
| PERF-16 | P0 | NFR-PERF-1, FR-NOTIF-2.1/2.2 | `PATCH /api/notifications/:id/read` + `PATCH /api/notifications/mark-all-read` | Danh dau da doc | 80-60s-8m | p95 <= 2500ms |
| PERF-17 | P0 | NFR-PERF-2, FR-CHAT-2.1 | `GET /api/chat/:groupId/messages?page=1&limit=50` | Group chat history paging | 120-90s-10m | p95 <= 3500ms |
| PERF-18 | P0 | NFR-PERF-1, FR-CHAT-1.1 | `POST /api/chat/:groupId/messages` | Gui tin nhan group chat | 100-60s-8m | p95 <= 2000ms |
| PERF-19 | P0 | NFR-PERF-2, FR-DIRECT-4.1 | `GET /api/chat/direct/conversations/:id/messages?page=1&limit=50` | Direct chat history paging | 100-60s-8m | p95 <= 3500ms |
| PERF-20 | P1 | NFR-PERF-1, FR-ADMIN-2.1/3.1 | `GET /api/admin/dashboard/stats` + `GET /api/admin/users?page=1&limit=20` | Admin dashboard + user list | 40-45s-6m | p95 <= 3000ms |

## 6) Ke hoach viet script tu dong JMeter

1. Tao 1 test plan goc: `tool-test/jmeter/TodoApp_Perf.jmx` (co the tao trong GUI, chay headless).
2. Chia thanh 7 Thread Group:
   - TG-Auth
   - TG-TaskRead
   - TG-TaskWrite
   - TG-Group
   - TG-Notification
   - TG-Chat
   - TG-Admin
3. Dung config chung:
   - `HTTP Request Defaults`
   - `CSV Data Set Config` (users, task_ids, group_ids, conversation_ids)
   - `HTTP Header Manager` (`Authorization: Bearer ${token}`)
   - `JSON Extractor` (lay `accessToken`, `taskId`, `notificationId`)
4. Assertions:
   - Response code = 2xx
   - JSON path co field can thiet
   - Duration assertion theo threshold tung API
5. Report:
   - Dashboard HTML
   - JTL de luu metrics
   - So sanh baseline theo build

## 7) Traceability SRS -> Perf Cases

- NFR-PERF-1: PERF-01..09, 12..16, 18, 20
- NFR-PERF-2: PERF-10, 11, 17, 19
- FR-TASK: PERF-03..11
- FR-CHAT + FR-DIRECT: PERF-17..19
- FR-NOTIF: PERF-14..16

## 8) Tieu chi ket thuc test

- Hoan tat 20/20 case (khong bo trong).
- Co baseline report (lan 1) va report sau toi uu (lan 2+).
- Co danh sach bottleneck top 5 endpoint p95 cao nhat.
- Co khuyen nghi toi uu (index, cache, pagination, query tuning, connection pooling).
