# Integration Checklist Traceability

## Summary

- This document maps backend checklist `UT_*` cases to implemented integration `IT_*` cases where DB-observable behavior was actually executed.
- Cases that remain internal-call-only or pure-unit-only are explicitly marked and are not claimed as integration-covered.
- Current integration coverage basis:
  - `notification.producer.int.test.js`
  - `task.service.int.test.js`
  - `note.service.int.test.js`

## Notification (`UT_NOTIF_*`)

| UT ID | Integration Status | IT Mapping / Reason |
|------|---------------------|---------------------|
| UT_NOTIF_01 | Covered | `IT_NOTIF_INVITATION_01` |
| UT_NOTIF_02 | Covered | `IT_NOTIF_INVITATION_02` |
| UT_NOTIF_03 | Covered | `IT_NOTIF_INVITATION_03` |
| UT_NOTIF_04 | Covered | `IT_NOTIF_INVITATION_06` |
| UT_NOTIF_05 | Covered | `IT_NOTIF_INVITATION_04` |
| UT_NOTIF_06 | Not 1:1 integration | Internal duplicate-query parameter detail; keep unit-only |
| UT_NOTIF_07 | Covered | `IT_NOTIF_INVITATION_05` |
| UT_NOTIF_08 | Not 1:1 integration | Exact notifier call-argument detail; integration proves persisted payload parity instead |
| UT_NOTIF_09 | Covered | `IT_NOTIF_INVITATION_05` |
| UT_NOTIF_10 | Covered | `IT_NOTIF_GROUPNAME_05` |
| UT_NOTIF_11 | Covered | `IT_NOTIF_GROUPNAME_04` |
| UT_NOTIF_12 | Covered | `IT_NOTIF_GROUPNAME_01` |
| UT_NOTIF_13 | Not 1:1 integration | Exact `Group.findById` call detail; happy-path DB outcome covered by `IT_NOTIF_GROUPNAME_03` |
| UT_NOTIF_14 | Covered | `IT_NOTIF_GROUPNAME_03` |
| UT_NOTIF_15 | Covered | `IT_NOTIF_GROUPNAME_03` |
| UT_NOTIF_16 | Covered | `IT_NOTIF_GROUPNAME_02` |

## Assignment (`UT_ASSIGN_*`)

| UT ID | Integration Status | IT Mapping / Reason |
|------|---------------------|---------------------|
| UT_ASSIGN_01 | Not covered | Private helper empty-array return shape not asserted through public service |
| UT_ASSIGN_02 | Not covered | Private helper null-target return shape not asserted through public service |
| UT_ASSIGN_03 | Not covered | PM non-lead self-only branch not yet isolated in integration |
| UT_ASSIGN_04 | Covered | `IT_TASK_ASSIGNMENT_06` |
| UT_ASSIGN_05 | Not covered | Generic “any role self-assign” matrix remains unit-only beyond executed branches |
| UT_ASSIGN_06 | Not covered | Nonexistent-user branch not explicitly executed in integration |
| UT_ASSIGN_07 | Covered | `IT_TASK_ASSIGNMENT_07` |
| UT_ASSIGN_08 | Covered | `IT_TASK_ASSIGNMENT_08` |
| UT_ASSIGN_09 | Covered | `IT_TASK_ASSIGNMENT_09` |
| UT_ASSIGN_10 | Covered | `IT_TASK_ASSIGNMENT_03` |
| UT_ASSIGN_11 | Covered | `IT_TASK_ASSIGNMENT_11` |
| UT_ASSIGN_12 | Covered | `IT_TASK_ASSIGNMENT_12` |
| UT_ASSIGN_13 | Covered | `IT_TASK_ASSIGNMENT_13` |
| UT_ASSIGN_14 | Covered | `IT_TASK_ASSIGNMENT_03` |
| UT_ASSIGN_15 | Covered | `IT_TASK_ASSIGNMENT_10` |
| UT_ASSIGN_16 | Covered | `IT_TASK_ASSIGNMENT_14` |
| UT_ASSIGN_17 | Covered | `IT_TASK_ASSIGNMENT_15` |
| UT_ASSIGN_18 | Covered | `IT_TASK_ASSIGNMENT_16` |
| UT_ASSIGN_19 | Covered | `IT_TASK_ASSIGNMENT_04` |
| UT_ASSIGN_20 | Covered | `IT_TASK_ASSIGNMENT_04` |
| UT_ASSIGN_21 | Covered | `IT_TASK_ASSIGNMENT_04` |
| UT_ASSIGN_22 | Covered | `IT_TASK_ASSIGNMENT_04` |
| UT_ASSIGN_23 | Not fully covered | Broad-allow behavior strongly sampled, but not all target categories in one assertion set |
| UT_ASSIGN_24 | Covered | `IT_TASK_ASSIGNMENT_17` |
| UT_ASSIGN_25 | Covered behaviorally | `IT_TASK_ASSIGNMENT_18` proves valid-only success path with no restriction side effect |
| UT_ASSIGN_26 | Not covered | BA leader allow developer non-lead not yet isolated |
| UT_ASSIGN_27 | Not covered | BA leader allow QA non-lead not yet isolated |
| UT_ASSIGN_28 | Covered | `IT_TASK_ASSIGNMENT_05` |
| UT_ASSIGN_29 | Not covered | BA leader reject BA leader other not yet isolated |
| UT_ASSIGN_30 | Covered | `IT_TASK_ASSIGNMENT_05` |
| UT_ASSIGN_31 | Covered | `IT_TASK_ASSIGNMENT_02` |
| UT_ASSIGN_32 | Covered | `IT_TASK_ASSIGNMENT_02` |
| UT_ASSIGN_33 | Covered | `IT_TASK_ASSIGNMENT_07`, `IT_TASK_ASSIGNMENT_19` |
| UT_ASSIGN_34 | Covered | `IT_TASK_ASSIGNMENT_20` |
| UT_ASSIGN_35 | Covered | `IT_TASK_ASSIGNMENT_03`, `11`, `12`, `13`, `15`, `16` |
| UT_ASSIGN_36 | Covered behaviorally | `IT_TASK_ASSIGNMENT_07`, `19`, `20` persist partial-valid results without failing the request |

## Helpers (`UT_HELPER_*`)

| UT ID | Integration Status | IT Mapping / Reason |
|------|---------------------|---------------------|
| UT_HELPER_01..11 | Not integration-covered | Pure/private `normalizeId` logic remains unit territory |
| UT_HELPER_12..26 | Not integration-covered | `buildRecipientList` internals not directly DB-observable enough for safe 1:1 claims |
| UT_HELPER_27 | Not covered | `null -> []` private helper branch not asserted publicly |
| UT_HELPER_28 | Not covered | `undefined -> []` private helper branch not asserted publicly |
| UT_HELPER_29 | Covered behaviorally | `IT_TASK_HELPER_MAP_01` |
| UT_HELPER_30 | Covered behaviorally | `IT_TASK_HELPER_MAP_01` |
| UT_HELPER_31 | Covered behaviorally | `IT_TASK_HELPER_MAP_01` |
| UT_HELPER_32 | Covered behaviorally | `IT_TASK_HELPER_MAP_01` |
| UT_HELPER_33 | Covered behaviorally | `IT_TASK_HELPER_MAP_01` |
| UT_HELPER_34 | Covered behaviorally | `IT_TASK_HELPER_MAP_02` |
| UT_HELPER_35 | Covered behaviorally | `IT_TASK_HELPER_MAP_02` |
| UT_HELPER_36 | Covered behaviorally | `IT_TASK_HELPER_MAP_02` |
| UT_HELPER_37 | Not covered | `null folderDoc` private branch not publicly asserted |
| UT_HELPER_38 | Not covered | “no memberAccess field” private branch not isolated |
| UT_HELPER_39 | Not covered | `null requesterId` private branch not isolated |
| UT_HELPER_40 | Covered behaviorally | `IT_TASK_HELPER_MAP_03` |
| UT_HELPER_41 | Not covered | ObjectId-like shape branch remains unit-only |
| UT_HELPER_42 | Covered behaviorally | `IT_TASK_HELPER_MAP_04` |
| UT_HELPER_43 | Covered behaviorally | `IT_TASK_HELPER_MAP_04` |

## Unit-only Families

| Family | Status | Reason |
|--------|--------|--------|
| `UT_DATE_*` | Unit-only | Pure deterministic date logic |
| `UT_PERM_*` | Unit-only | Permission matrix pure functions |
| `UT_VALID_*` | Unit-only | Validation/sanitization pure functions |

## Stop Gate

- High-value DB-observable notification branches are now closed except internal-call-detail cases.
- Assignment coverage is materially expanded; remaining gaps are isolated matrix branches not yet executed as integration.
- Helper mapping only claims behavior that is observable through `createTask` or `getAllTasks`.
