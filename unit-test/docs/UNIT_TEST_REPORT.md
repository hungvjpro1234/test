# UNIT TESTING REPORT

## Project Information
- **Project name:** Todo List App
- **Team members:** Chưa xác định rõ trong repository hiện tại
- **Repository / project path:** `d:\ToDoList-3\Todo_list_app`
- **Short summary:** Báo cáo này tổng hợp hiện trạng kiểm thử trong `unit-test/` cho backend và frontend, tập trung vào phạm vi unit/integration đã có, các phần chưa bao phủ, và lý do loại trừ theo đúng yêu cầu overview học thuật.

## 1. Tools and Libraries
- **Test framework chính:** `Jest` (backend và frontend).
- **Mocking / nội suy dependency:** `jest.mock` (service dependency, model, gateway), `rewire` (truy cập private helper/function trong `task.service.js`), `ts-jest` (biên dịch test TypeScript frontend).
- **Coverage tool:** Jest coverage với `coverageProvider: v8`, xuất reporter `text`, `lcov`, `json` (backend) và `text`, `lcov`, `clover` (frontend).
- **Runtime / language support:** Backend dùng Node.js (JS), frontend unit test dùng TypeScript (`ts-jest`, `ts-node`, `typescript`).
- **Vai trò công cụ:**
  - `Jest`: chạy test, assertion, lifecycle (`beforeAll/afterEach/afterAll`).
  - `rewire`: kiểm thử helper private không export trực tiếp.
  - `ts-jest`: chạy test frontend `.ts` mà không cần build riêng.
  - Coverage reporters: tạo số liệu bao phủ và artifact phục vụ báo cáo.

## 2. Scope of Testing

### 2.1 Bảng phạm vi test chi tiết

| STT | Module / Layer | Source File / Function / Class | Related Test File | Status | Responsibility | Reason / Scope Explanation |
|---|---|---|---|---|---|---|
| 1 | Backend Service | `backend/src/services/notification.producer.js` (`createGroupInvitationNotification`, `createGroupNameChangeNotification`) | `unit-test/backend/tests/services/notification.producer.test.js`, `unit-test/backend/tests-integration/services/notification.producer.int.test.js` | Tested | Nhóm backend test (không thấy phân công cá nhân) | Có cả unit (internal call contract) và integration (check DB persist/no-persist). |
| 2 | Backend Service | `backend/src/services/task.service.js` (assignment logic, helper behavior qua API public) | `unit-test/backend/tests/services/task.assignment.test.js`, `unit-test/backend/tests/services/task.helpers.test.js`, `unit-test/backend/tests-integration/services/task.assignment.int.test.js`, `unit-test/backend/tests-integration/services/task.helpers.int.test.js` | Tested | Nhóm backend test (không thấy phân công cá nhân) | Bao phủ role matrix, helper pure logic, và behavior DB-observable trong `createTask/getAllTasks`. |
| 3 | Backend Service | `backend/src/services/note.service.js` (`createNote`, `updateNote`, `toggleBookmark`) | `unit-test/backend/tests-integration/services/note.service.int.test.js` | Tested | Nhóm backend test (không thấy phân công cá nhân) | Đang test theo hướng integration check DB (không có unit file riêng cho note service). |
| 4 | Backend Utility | `backend/src/utils/dateHelper.js` | `unit-test/backend/tests/utils/dateHelper.test.js` | Tested | Nhóm backend test (không thấy phân công cá nhân) | Pure utility deterministic, phù hợp unit-only theo tài liệu traceability/plan. |
| 5 | Backend Utility | `backend/src/utils/groupPermissions.js` | `unit-test/backend/tests/utils/groupPermissions.test.js` | Tested | Nhóm backend test (không thấy phân công cá nhân) | Permission matrix là pure function; không cần DB assertion trực tiếp. |
| 6 | Backend Utility | `backend/src/utils/validationHelper.js` | `unit-test/backend/tests/utils/validationHelper.test.js` | Tested | Nhóm backend test (không thấy phân công cá nhân) | Validation/sanitize pure logic, phù hợp unit-only. |
| 7 | Frontend Utility | `frontend/app/utils/groupRoleUtils.ts` | `unit-test/frontend/tests/utils/groupRoleUtils.test.ts` | Tested | Nhóm frontend test (không thấy phân công cá nhân) | Utility phân quyền UI, không có persistence logic nên unit-only. |
| 8 | Backend Service (ngoài scope hiện tại) | Các service chưa có test trực tiếp: `auth.service.js`, `user.service.js`, `group.service.js`, `folder.service.js`, `chat.service.js`, `admin.service.js`, ... | Không thấy file test tương ứng trong `unit-test/backend/tests` hoặc `tests-integration` | Not Tested | Chưa xác định rõ trong repository hiện tại | Chưa thấy test script tương ứng; cần bổ sung nếu yêu cầu môn học đòi bao phủ toàn bộ service layer. |
| 9 | Backend Controller/API layer | `backend/src/controllers/*.js` | Không có test unit trực tiếp trong `unit-test/` | Not Tested | Chưa xác định rõ trong repository hiện tại | Controller/route thường thuộc integration/API testing hơn là unit thuần; hiện không thấy suite API-level trong `unit-test/`. |
| 10 | Backend Route layer | `backend/src/routes/*.js` | Không có test unit trực tiếp trong `unit-test/` | Not Tested | Chưa xác định rõ trong repository hiện tại | Route chủ yếu wiring middleware-endpoint, ít business logic độc lập; phù hợp integration/e2e hơn unit. |
| 11 | Backend Model/Schema layer | `backend/src/models/*.js` | Không có test model unit riêng trong `unit-test/` | Not Tested | Chưa xác định rõ trong repository hiện tại | Model/schema thiên về định nghĩa dữ liệu và DB validation; phù hợp integration DB validation hơn unit độc lập. |
| 12 | Config/Bootstrap | `jest.config.*`, `setup.*`, env setup, mapping alias | Test gián tiếp khi chạy suite | Not Tested (trực tiếp) | Chưa xác định rõ trong repository hiện tại | Cấu hình hạ tầng test, không phải business logic; thường không viết test unit riêng. |
| 13 | Interface/type/generated/third-party | Type declarations, dependency code từ `node_modules` | Không áp dụng | Not Tested | Không áp dụng | Không thuộc phạm vi unit test trực tiếp của dự án. |

### 2.2 Nhận xét riêng về DB interaction, CheckDB và Rollback
- Các integration test hiện tại có cơ chế `connectTestDb` + `cleanupByRunId(TEST_RUN_ID)` + `assertCleanRunId(TEST_RUN_ID)` + `disconnectTestDb`, cho thấy **đã có chiến lược rollback/cleanup theo marker**.
- Phạm vi check DB hiện tập trung vào 4 cụm: `notification.producer`, `task.assignment`, `task.helpers` (behavior mapping), `note.service`.
- Kết luận phạm vi: đã đáp ứng checkDB/rollback cho các module integration đang chọn; **chưa bao phủ toàn bộ service/backend**.

## 3. Unit Test Script Overview

### 3.1 Danh sách file test hiện có và mapping source
- **Backend unit**
  - `unit-test/backend/tests/services/notification.producer.test.js` -> `backend/src/services/notification.producer.js`
  - `unit-test/backend/tests/services/task.assignment.test.js` -> `backend/src/services/task.service.js` (private function `validateAssignmentPermissions`)
  - `unit-test/backend/tests/services/task.helpers.test.js` -> `backend/src/services/task.service.js` (private helpers)
  - `unit-test/backend/tests/utils/dateHelper.test.js` -> `backend/src/utils/dateHelper.js`
  - `unit-test/backend/tests/utils/groupPermissions.test.js` -> `backend/src/utils/groupPermissions.js`
  - `unit-test/backend/tests/utils/validationHelper.test.js` -> `backend/src/utils/validationHelper.js`
- **Backend integration (trong bộ `unit-test` hiện hành)**
  - `unit-test/backend/tests-integration/services/notification.producer.int.test.js` -> `backend/src/services/notification.producer.js`
  - `unit-test/backend/tests-integration/services/task.assignment.int.test.js` -> `backend/src/services/task.service.js`
  - `unit-test/backend/tests-integration/services/task.helpers.int.test.js` -> `backend/src/services/task.service.js`
  - `unit-test/backend/tests-integration/services/note.service.int.test.js` -> `backend/src/services/note.service.js`
- **Frontend unit**
  - `unit-test/frontend/tests/utils/groupRoleUtils.test.ts` -> `frontend/app/utils/groupRoleUtils.ts`

### 3.2 Loại logic đang được kiểm thử
- **Service logic:** notification producer, task assignment, note service.
- **Helper/private function:** private helper trong `task.service.js` qua `rewire`.
- **Utility:** `dateHelper`, `groupPermissions`, `validationHelper`, `groupRoleUtils`.
- **Validation:** định dạng input, enum sanitize, password/email/objectId/date/pagination.
- **Permission logic:** backend (`groupPermissions`) và frontend (`groupRoleUtils`) đều có ma trận quyền.
- **Frontend utility:** hiện tập trung 1 module `groupRoleUtils.ts`.

### 3.3 Nhận xét mức độ bao phủ logic theo nhóm
- Nhóm utility/permission/validation được bao phủ sâu ở cấp unit.
- Nhóm service được bao phủ theo hướng chọn lọc; `task` và `notification` có cả unit + integration, `note` chủ yếu integration.
- Các service khác ngoài 4 cụm trên chưa thấy test trực tiếp trong phạm vi `unit-test` hiện tại.

## 4. Project Link
- Không tìm thấy GitHub repository URL chính thức trong tài liệu `unit-test/docs` hiện có.
- Các URL xuất hiện trong `package-lock.json` chủ yếu là link dependency (registry/sponsor), **không phải project repository**.
- Kết luận: **Chưa xác minh trực tiếp từ repository hiện tại**.

## 5. Execution Report Overview
- **Backend test scripts:** khai báo tại `unit-test/backend/package.json`.
  - `npm run test:unit`
  - `npm run test:int`
  - `npm run test:coverage`
  - `npm run test:int:coverage`
  - `npm run test:coverage:all`
  - `npm run test:all`
- **Frontend test scripts:** khai báo tại `unit-test/frontend/package.json`.
  - `npm test`
  - `npm run test:coverage`
  - `npm run test:watch`
- **Nơi đặt test scripts:** `unit-test/backend/package.json` và `unit-test/frontend/package.json`.
- **Tổng hợp kết quả từ tài liệu checklist hiện có:**
  - Backend: có nhóm pass hoàn toàn và một số nhóm có case fail mở (`UT_HELPER_11`, `UT_DATE_11`, `UT_PERM_17`).
  - Frontend: `groupRoleUtils` đang ghi nhận pass đầy đủ.
  - Đây là số liệu theo checklist/docs; **cần chạy lại test để xác nhận runtime tại thời điểm nộp**.
- `[Insert backend test execution screenshot here]`
- `[Insert frontend test execution screenshot here]`

## 6. Code Coverage Overview
- **Coverage tool:** Jest coverage (`v8`) theo cấu hình trong:
  - `unit-test/backend/jest.config.js`
  - `unit-test/backend/jest.integration.config.js`
  - `unit-test/backend/jest.coverage-all.config.js`
  - `unit-test/frontend/jest.config.ts`
- **Lệnh generate coverage:**
  - Backend unit: `npm run test:coverage`
  - Backend integration: `npm run test:int:coverage`
  - Backend tổng hợp: `npm run test:coverage:all`
  - Frontend: `npm run test:coverage`
- **Thư mục output coverage:**
  - Backend: `unit-test/backend/coverage`, `unit-test/backend/coverage-integration`, `unit-test/backend/coverage-all`
  - Frontend: `unit-test/frontend/coverage`
- **Mục tiêu coverage:** đo mức bao phủ service + utility đã chọn trong scope hiện tại; không dùng để khẳng định toàn bộ codebase đã được test.
- **Số liệu coverage phần trăm:** Chưa xác minh trực tiếp từ repository hiện tại dưới dạng snapshot cuối cùng cho báo cáo; cần chạy lệnh coverage để lấy số liệu cập nhật.
- `[Insert backend coverage screenshot here]`
- `[Insert frontend coverage screenshot here]`

## 7. References and AI Prompts

### 7.1 Internal references (đã sử dụng)
- `unit-test/PLAN.md`
- `unit-test/docs/INTEGRATION_CHECKLIST_TRACEABILITY.md`
- `unit-test/docs/checklists-tests/CHECKLIST_01_notification_producer.md`
- `unit-test/docs/checklists-tests/CHECKLIST_02_task_assignment.md`
- `unit-test/docs/checklists-tests/CHECKLIST_03_task_helpers.md`
- `unit-test/docs/checklists-tests/CHECKLIST_04_dateHelper.md`
- `unit-test/docs/checklists-tests/CHECKLIST_05_groupPermissions.md`
- `unit-test/docs/checklists-tests/CHECKLIST_06_validationHelper.md`
- `unit-test/docs/checklists-tests/CHECKLIST_07_groupRoleUtils.md`
- `unit-test/docs/checklists-tests/CHECKLIST_08_note_service.md`
- Cấu hình và script tại `unit-test/backend/*`, `unit-test/frontend/*`.

### 7.2 External references
- Jest Documentation: [https://jestjs.io/docs/getting-started](https://jestjs.io/docs/getting-started)
- ts-jest Documentation: [https://kulshekhar.github.io/ts-jest/docs/](https://kulshekhar.github.io/ts-jest/docs/)

### 7.3 AI prompt log (để nhóm tự bổ sung)
- `[Điền danh sách prompt đã sử dụng trong quá trình hỗ trợ viết test/report]`

## 8. Assessment of Current Unit Test Scope
- **Điểm mạnh:** Scope hiện tại có định hướng rõ ở các cụm rủi ro cao (`task`, `notification`, `validation`, `permissions`) và đã kết hợp unit + integration checkDB cho các luồng chính.
- **Phần đã rõ:** Mapping checklist theo ID (`UT_*`, `IT_*`) và tài liệu traceability giúp truy vết tốt giữa yêu cầu và test script.
- **Phần còn thiếu:** Chưa thấy phạm vi cho nhiều service/controller/route/model ngoài nhóm đã chọn; chưa có phân công thành viên cụ thể trong tài liệu.
- **Khoảng trống theo yêu cầu giảng viên:** Cần nhấn mạnh hơn ranh giới “test / không test” theo layer (đã bổ sung trong bảng scope), đồng thời nêu rõ lý do loại trừ theo bản chất kỹ thuật.
- **Gợi ý cải thiện báo cáo overview (không yêu cầu thêm test code):**
  - Duy trì bảng scope như chuẩn cố định cho các lần cập nhật sau.
  - Bổ sung cột “Owner” theo thành viên thực tế khi có thông tin phân công.
  - Chụp lại evidence chạy test/coverage ở thời điểm chốt báo cáo để tăng tính xác thực học thuật.
