# Integration DB/Rollback Feasibility Report (Post-Phase-4 Re-Verification)

## 1) Scope Reviewed

Reviewed sources:

- `unit-test/PLAN.md`
- `unit-test/docs/checklists-tests/CHECKLIST_01_notification_producer.md`
- `unit-test/docs/checklists-tests/CHECKLIST_02_task_assignment.md`
- `unit-test/docs/checklists-tests/CHECKLIST_03_task_helpers.md`
- `unit-test/docs/checklists-tests/CHECKLIST_04_dateHelper.md`
- `unit-test/docs/checklists-tests/CHECKLIST_05_groupPermissions.md`
- `unit-test/docs/checklists-tests/CHECKLIST_06_validationHelper.md`
- `unit-test/backend/tests-integration/services/*.int.test.js`
- `unit-test/backend/tests-integration/_helpers/db.js`
- `unit-test/backend/tests-integration/_helpers/fixtures.js`
- backend service code: `backend/src/services/task.service.js`, `backend/src/services/note.service.js`, `backend/src/services/notification.producer.js`

Out of scope:

- `CHECKLIST_07_groupRoleUtils` (frontend).

## 2) Current Integration Implementation Snapshot

Current implemented integration test IDs:

- Notification: `IT_NOTIF_INVITATION_01..05`, `IT_NOTIF_GROUPNAME_01..03` (8 cases)
- Task: `IT_TASK_CREATE_01`, `IT_TASK_ASSIGNMENT_01..07`, `IT_TASK_FOLDER_ACCESS_01..02` (10 cases)
- Note: `IT_NOTE_CREATE_01..02`, `IT_NOTE_UPDATE_01..03`, `IT_NOTE_BOOKMARK_01..02` (7 cases)

Total implemented integration cases: **25**

Phase status against prior plan:

- Phase 1: done
- Phase 2: done (coverage breadth improved significantly)
- Phase 3: done
- Phase 4: done

## 3) Re-Verification: What Is Still Migratable from Checklist

## 3.1 `UT_NOTIF_*` (16 cases) - still extendable

Feasibility:

- Behaviorally DB-migratable: **14/16**
- Not directly assertable as DB outcome only (internal-call detail): **2/16**

Notes:

- Internal-call detail cases like exact function-call parameter checks are unit-mock territory.
- However, equivalent behavior can still be validated via persisted notification fields.

Remaining meaningful DB additions:

- Add explicit null recipient case (equivalent to invalid input branch).
- Add invalid `groupId` and invalid `senderId` for group-name-change branch.
- Add stricter assertions for returned payload vs persisted docs consistency.

## 3.2 `UT_ASSIGN_*` (36 cases) - still largely migratable

Feasibility:

- Behaviorally DB-migratable through `taskService.createTask`/assignment workflows: **36/36**
- Exact private-helper return-shape parity (`validIds/restrictedIds/errorMessage` object) is not a public contract, but outcomes are testable via DB persistence and service errors.

Current status:

- Covered critical lanes (outsider reject, non-privileged reject, PM lead allow broad, leader reject leader, self-assign, mixed valid+restricted).
- Still missing many role-matrix permutations from checklist (especially PO non-lead branches and some error-message-specific branches).

Conclusion:

- This area can continue to Phase 5+ with high value and high confidence.

## 3.3 `UT_HELPER_*` (43 cases) - partially migratable only

Feasibility split:

- Can be validated indirectly via DB/service behavior: **~14-18 cases**
- Not realistically migratable to DB assertions: **~25-29 cases**

Reason:

- `normalizeId` object-shape permutations and several pure helper branches are private pure logic.
- `buildRecipientList` internals mostly tie to in-memory composition and notification fanout decisions, not always persisted DB state.
- `buildFolderClauses` and `hasFolderAssignment` are partially inferable through `getAllTasks`/scoped folder behavior and assignment side effects.

Conclusion:

- Continue only with indirect scenarios that prove real user-facing behavior; keep pure helper matrix in unit tests.

## 3.4 Pure utility checklists (not migratable by design)

- `UT_DATE_*` (65)
- `UT_PERM_*` (123)
- `UT_VALID_*` (128)

These remain unit-test territory (pure deterministic logic, no DB contract).

## 4) “All Cases if Possible” Conclusion

Can all 411 be converted to DB+rollback? **No**.

Can we still continue meaningfully after Phase 4? **Yes**.

Most valuable remaining frontier:

1. Complete more of `UT_ASSIGN_*` matrix behavior in integration.
2. Close `UT_NOTIF_*` branch gaps that are DB-observable.
3. Add selective `UT_HELPER_*` behavioral mappings via public methods (`createTask`, `getAllTasks`, folder-scoped queries).

## 5) Concrete Remaining Backlog (Phase 5+)

## Phase 5 - Notification Checklist Closure (DB-observable)

Target file:

- `tests-integration/services/notification.producer.int.test.js`

Add:

- invalid `senderId` for `createGroupNameChangeNotification`
- invalid `groupId` for `createGroupNameChangeNotification`
- explicit `recipientId = null` invitation case
- strengthen payload-vs-persisted parity assertions

Expected outcome:

- Near-full behavioral closure for `UT_NOTIF_*` (except pure internal-call verification cases).

## Phase 6 - Assignment Matrix Expansion (Checklist-driven)

Target file:

- `tests-integration/services/task.service.int.test.js`

Add checklist-aligned scenarios:

- PM non-lead allow: BA, QA, Developer leader
- PM non-lead reject: PO non-lead, PM lead, PO lead
- PO non-lead allow/reject matrix
- PO lead broad-allow branches
- mixed target arrays with partial filtering for more role combinations

Expected outcome:

- Major coverage growth for `UT_ASSIGN_*` via DB-persist + no-persist assertions.

## Phase 7 - Helper Behavioral Mapping Expansion

Target file (extend):

- `tests-integration/services/task.service.int.test.js`

Add:

- default-folder vs non-default folder retrieval behavior (`getAllTasks`)
- folder-assigned vs unassigned requester visibility behavior
- evidence for clause-like behavior through returned datasets (instead of private helper assertions)

Expected outcome:

- Additional mapped coverage for feasible subset of `UT_HELPER_*`.

## Phase 8 - Traceability & Stop Gate

Deliverable:

- checklist-to-integration mapping table (UT ID -> IT ID / Not migratable reason)

Stop criteria:

- no high-value DB-observable checklist branch remains unmapped,
- remaining gaps are explicitly marked as private/helper-internal or pure-unit-only.

## 6) Updated Feasibility Table

- `UT_NOTIF_*`: continue (high)
- `UT_ASSIGN_*`: continue (high)
- `UT_HELPER_*`: continue selectively (medium)
- `UT_DATE_*`: stop (unit-only)
- `UT_PERM_*`: stop (unit-only)
- `UT_VALID_*`: stop (unit-only)

Final recommendation:

- Continue from **Phase 5** (not stop now).  
- Goal should be “maximum DB-observable migration + explicit non-migratable rationale,” not forced 1:1 conversion for private/pure logic tests.
