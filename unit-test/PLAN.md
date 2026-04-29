# Backend Integration Test Master Plan (Updated After Phase 4)

## 1. Objective

Mục tiêu triển khai:

- chuyển tối đa test case backend sang mô hình **check DB thật + rollback theo marker** nếu khả thi,
- giữ cấu trúc file integration bám source code thật,
- giữ style test case có comment ID ngay trên mỗi case.

## 2. Current Status (đã hoàn thành)

Hiện có:

- `tests-integration/services/notification.producer.int.test.js`: 8 case
- `tests-integration/services/task.service.int.test.js`: 10 case
- `tests-integration/services/note.service.int.test.js`: 7 case

Tổng: **25 integration cases**.

Phase progress:

- Phase 1: done
- Phase 2: done
- Phase 3: done
- Phase 4: done

## 3. Feasibility Direction (tiếp tục hay dừng)

Tiếp tục được sau Phase 4:

- `UT_NOTIF_*`: tiếp tục (còn nhánh DB-observable chưa đóng hết)
- `UT_ASSIGN_*`: tiếp tục mạnh (còn nhiều role-matrix có thể verify bằng DB behavior)
- `UT_HELPER_*`: tiếp tục chọn lọc (chỉ phần có thể chứng minh qua public behavior)

Dừng migrate (unit-only):

- `UT_DATE_*`
- `UT_PERM_*`
- `UT_VALID_*`

## 4. Target Structure (giữ cố định)

```text
unit-test/backend/
├── tests/
│   ├── services/
│   └── utils/
└── tests-integration/
    ├── _helpers/
    │   ├── db.js
    │   └── fixtures.js
    └── services/
        ├── note.service.int.test.js
        ├── task.service.int.test.js
        └── notification.producer.int.test.js
```

## 5. Format Rules (bắt buộc cho mọi case mới)

1. Header comment đầu file nêu source file.
2. Mỗi case có comment ID ngay phía trên (`// IT_...`).
3. Mỗi file có `TEST_RUN_ID` riêng.
4. Lifecycle rollback:
   - `beforeAll`: `connectTestDb()`
   - `afterEach`: `cleanupByRunId(TEST_RUN_ID)` + `assertCleanRunId(TEST_RUN_ID)`
   - `afterAll`: cleanup lại + `disconnectTestDb()`
5. Mỗi case phải có ít nhất 1 DB assertion.
6. Với nhánh fail/forbidden: phải assert không persist dữ liệu bẩn.

## 6. Roadmap from Phase 5

## Phase 5 - Notification Checklist Closure

File:

- `tests-integration/services/notification.producer.int.test.js`

Thêm case:

- invalid `senderId` cho `createGroupNameChangeNotification`
- invalid `groupId` cho `createGroupNameChangeNotification`
- explicit `recipientId = null` cho invitation
- tăng assert tương quan `result.data` và doc đã persist

Mục tiêu:

- đóng các nhánh DB-observable còn lại của `UT_NOTIF_*`.

## Phase 6 - Assignment Matrix Completion

File:

- `tests-integration/services/task.service.int.test.js`

Thêm role-matrix còn thiếu:

- PM non-lead allow/reject đầy đủ theo checklist
- PO non-lead allow/reject đầy đủ
- PO lead broad-allow cases
- bổ sung mixed-target combinations và partial persistence assertions

Mục tiêu:

- map tối đa `UT_ASSIGN_*` bằng DB behavior thực tế.

## Phase 7 - Helper Behavioral Mapping Expansion

File:

- `tests-integration/services/task.service.int.test.js` (và/hoặc file task integration mới nếu cần)

Thêm scenario gián tiếp:

- default vs non-default folder filtering qua public methods
- folder-assignment visibility effects
- assignment/recipient effects có thể quan sát qua DB/public response

Mục tiêu:

- cover phần khả thi của `UT_HELPER_*` (không ép 1:1 private helper).

## Phase 8 - Traceability & Stop Gate

Deliverable:

- bảng mapping `UT_* -> IT_*` + reason cho mỗi case không thể migrate.

Stop gate:

- không còn nhánh DB-observable giá trị cao chưa được map,
- mọi case còn lại có lý do rõ: private-helper-only hoặc pure-unit-only.

## 7. Acceptance Criteria

- `npm run test:int` chạy độc lập trên DB test.
- Suite integration không để lại tagged docs.
- Case mới tuân thủ format và rollback contract.
- Có mapping rõ cho phần “migrate được” và “không migrate được”.

## 8. Out of Scope

- Không ép chuyển toàn bộ 411 case theo 1:1.
- Không dùng transaction rollback toàn cục; rollback theo cleanup marker.
