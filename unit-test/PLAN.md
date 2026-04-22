# Unit Test Plan — Todo List App
**Ngày tạo**: 2026-04-13  
**Phiên bản SRS**: 3.0  
**Scope**: Backend (Node.js) + Frontend Web (Next.js/TypeScript) — **KHÔNG bao gồm Mobile**

---

## 1. Triết lý & Nguyên tắc chọn lọc

### Chỉ test những gì CẦN TEST
Unit test tập trung vào các hàm có **business logic phức tạp**, **nhiều nhánh điều kiện**, hoặc **là điểm dễ hỏng nếu thay đổi**. Những hàm đơn giản như CRUD thông thường, login/logout handler, hay route handler **KHÔNG cần unit test** — những thứ đó đã có system test bao phủ.

### Quyết định theo SRS
Các constraint trong SRS là nguồn gốc để chọn test case:
- FR-AUTH-1.4 → `validatePassword` cần test
- FR-ASSIGN → `validateAssignmentPermissions` cần test (logic PM/PO Lead phức tạp)
- FR-FOLDER-5 → `canViewFolder`, `canWriteInFolder` cần test
- C-6 đến C-12 → limits trong `LIMITS` cần verify qua validationHelper

---

## 2. Folder Structure

```
unit-test/
├── PLAN.md                                     ← file này
├── backend/
│   ├── package.json                            ← jest + dependencies riêng
│   ├── jest.config.js
│   ├── setup.js                                ← jest global setup
│   └── tests/
│       ├── utils/
│       │   ├── groupPermissions.test.js        ← CRITICAL: permission matrix
│       │   ├── validationHelper.test.js        ← HIGH: SRS constraint validation
│       │   └── dateHelper.test.js              ← MEDIUM: date utilities
│       └── services/
│           ├── task.helpers.test.js            ← HIGH: pure helper functions
│           ├── task.assignment.test.js         ← CRITICAL: validateAssignmentPermissions
│           └── notification.producer.test.js  ← MEDIUM: invitation dedup logic
└── frontend/
    ├── package.json                            ← jest + ts-jest + testing-library
    ├── jest.config.ts
    ├── setup.ts
    └── tests/
        └── utils/
            └── groupRoleUtils.test.ts          ← MEDIUM: frontend permission helpers
```

### Lý do 1 file test = 1 file source
- `groupPermissions.test.js` → `backend/src/utils/groupPermissions.js`
- `validationHelper.test.js` → `backend/src/utils/validationHelper.js`
- `dateHelper.test.js` → `backend/src/utils/dateHelper.js`
- `task.helpers.test.js` → pure functions trong `backend/src/services/task.service.js`
- `task.assignment.test.js` → `validateAssignmentPermissions` trong `task.service.js` (tách riêng vì logic nặng)
- `notification.producer.test.js` → `backend/src/services/notification.producer.js`
- `groupRoleUtils.test.ts` → `frontend/app/utils/groupRoleUtils.ts`

---

## 3. Tools cần cài đặt

### 3.1 Backend
```
jest                   # Test runner chính
```
Không cần thêm gì — Jest hỗ trợ mock built-in (`jest.mock`, `jest.fn`), đủ dùng cho unit test thuần. Không cần MongoDB in-memory server vì ta test pure functions và mock DB calls.

### 3.2 Frontend
```
jest                   # Test runner
ts-jest                # TypeScript transformer cho jest
@types/jest            # TypeScript types cho jest
jest-environment-jsdom # Browser-like environment (nếu cần)
```

---

## 4. Chi tiết từng file test

---

### 4.1 `groupPermissions.test.js` — CRITICAL

**Source**: `backend/src/utils/groupPermissions.js`  
**Lý do test**: Đây là **tim của hệ thống phân quyền**. Một bug ở đây ảnh hưởng tới toàn bộ FR-FOLDER, FR-TASK, FR-ASSIGN. Logic nhiều nhánh với sự kết hợp role + isLeader + isAssigned.

#### Hàm 1: `canCreateTasks({ role, isLeader, isAssignedToFolder })`
Mapping từ SRS: FR-TASK-1 (tạo task cần quyền)

| # | Input | Expected | SRS Ref |
|---|-------|----------|---------|
| 1 | `role: null` | `false` | - |
| 2 | `role: 'sale', isLeader: false` | `false` | READ_ONLY_ROLES |
| 3 | `role: 'qa', isAssignedToFolder: false` | `false` | QA cần được assign vào folder |
| 4 | `role: 'qa', isAssignedToFolder: true` | `true` | QA có folder access |
| 5 | `role: 'developer_manager', isLeader: false` | `false` | READ_ONLY_ROLES |
| 6 | `role: 'pm'` | `true` | PM được tạo |
| 7 | `role: 'ba'` | `true` | BA được tạo |
| 8 | `role: 'developer'` | `true` | Developer được tạo |
| 9 | `role: 'sale', isLeader: true` | `true` | Leader override tất cả |
| 10 | `role: 'qa', isLeader: true` | `true` | Leader QA cũng được |

#### Hàm 2: `canEditTask({ role, isCreator, isAssignee, isLeader, isAssignedToFolder })`
Mapping từ SRS: FR-TASK-4.3 (cần quyền cập nhật)

| # | Input | Expected |
|---|-------|----------|
| 1 | `role: 'pm'` | `true` (admin role) |
| 2 | `role: 'product_owner'` | `true` |
| 3 | `isLeader: true, role: 'sale'` | `true` |
| 4 | `isCreator: true, role: 'developer'` | `true` |
| 5 | `isAssignee: true, role: 'developer'` | `true` |
| 6 | `role: 'qa', isAssignedToFolder: true` | `true` |
| 7 | `role: 'qa', isAssignedToFolder: false, isCreator: false, isAssignee: false` | `false` |
| 8 | `role: 'developer', isCreator: false, isAssignee: false` | `false` |

#### Hàm 3: `canDeleteTask({ role, isCreator, isLeader, isAssignedToFolder })`
Mapping từ SRS: FR-TASK-5.2, C-4 (chỉ người tạo nhóm xóa nhóm — tương tự logic)

**Khác biệt quan trọng so với canEditTask**: Assignee KHÔNG được xóa task!

| # | Input | Expected |
|---|-------|----------|
| 1 | `isCreator: true` | `true` (bất kể role) |
| 2 | `role: 'pm', isCreator: false` | `true` (admin) |
| 3 | `role: 'product_owner'` | `true` |
| 4 | `isLeader: true, role: 'developer'` | `true` |
| 5 | `role: 'qa', isAssignedToFolder: true, isCreator: false` | `true` |
| 6 | `role: 'qa', isAssignedToFolder: false, isCreator: false` | `false` |
| 7 | `role: 'developer', isCreator: false` | `false` |
| 8 | **isAssignee không phải creator, không phải admin** | `false` (không như canEditTask!) |

#### Hàm 4: `canWriteInFolder(role, { isAssigned, isLeader })`
Mapping từ SRS: FR-FOLDER-5 (kiểm soát quyền truy cập)

| # | Input | Expected |
|---|-------|----------|
| 1 | `role: null` | `false` |
| 2 | `role: 'product_owner'` | `true` |
| 3 | `role: 'pm'` | `true` |
| 4 | `isLeader: true, role: 'sale'` | `true` |
| 5 | `role: 'qa', isAssigned: true` | `true` |
| 6 | `role: 'qa', isAssigned: false` | `false` |
| 7 | `role: 'sale', isAssigned: true` | `false` (READ_ONLY) |
| 8 | `role: 'developer_manager'` | `false` (READ_ONLY) |
| 9 | `role: 'ba', isAssigned: true` | `true` (FOLDER_SCOPED + assigned) |
| 10 | `role: 'ba', isAssigned: false` | `false` (FOLDER_SCOPED + not assigned) |
| 11 | `role: 'devops', isAssigned: true` | `true` (INFRA group → FOLDER_SCOPED) |

#### Hàm 5: `canViewFolder(role, { isAssigned, isLeader })`

| # | Input | Expected |
|---|-------|----------|
| 1 | `isLeader: true, role: 'sale'` | `true` (leader override) |
| 2 | `role: null` | `false` |
| 3 | `role: 'pm'` | `true` (canViewAllFolders) |
| 4 | `role: 'product_owner'` | `true` |
| 5 | `role: 'sale'` | `true` (READ_ONLY → canViewAllFolders) |
| 6 | `role: 'ba', isAssigned: true` | `true` (FOLDER_SCOPED + assigned) |
| 7 | `role: 'ba', isAssigned: false` | `false` |
| 8 | `role: 'developer', isAssigned: true` | `true` (FOLDER_SCOPED + assigned) |

#### Hàm 6: `canViewAllFolders(input)`

| # | Input | Expected |
|---|-------|----------|
| 1 | `null` | `false` |
| 2 | `{ isLeader: true }` | `true` |
| 3 | `{ role: 'pm' }` | `true` |
| 4 | `{ role: 'product_owner' }` | `true` |
| 5 | `{ role: 'sale' }` | `true` (READ_ONLY) |
| 6 | `{ role: 'ba' }` | `false` (FOLDER_SCOPED) |
| 7 | `'pm'` (string input) | `true` (backwards compat) |
| 8 | `'ba'` (string input) | `false` |

#### Hàm 7: `requiresFolderAssignment(role)`

| # | Input | Expected |
|---|-------|----------|
| 1 | `'ba'` | `true` (DELIVERY without PM) |
| 2 | `'bot_builder'` | `true` |
| 3 | `'devops'` | `true` (INFRA) |
| 4 | `'developer'` | `true` (PRODUCT_TEAM) |
| 5 | `'pm'` | `false` (PM không cần) |
| 6 | `'product_owner'` | `false` |
| 7 | `'sale'` | `false` (SUPERVISION) |
| 8 | `null` | `false` |

---

### 4.2 `validationHelper.test.js` — HIGH

**Source**: `backend/src/utils/validationHelper.js`  
**Lý do test**: Trực tiếp map đến constraints trong SRS (C-6 đến C-12, FR-AUTH-1.4, FR-TASK-1.5, FR-TASK-1.6). Bug ở đây = data bẩn vào DB.

#### Hàm 1: `validatePassword(password)`
Mapping từ SRS: FR-AUTH-1.4, FR-USER-2.3

| # | Input | Expected |
|---|-------|----------|
| 1 | `null` | `{ isValid: false }` |
| 2 | `''` | `{ isValid: false }` |
| 3 | `'short'` (7 chars) | invalid, "at least 8" |
| 4 | `'alllowercase1!'` | invalid, no uppercase |
| 5 | `'ALLUPPERCASE1!'` | invalid, no lowercase |
| 6 | `'NoNumbers!'` | invalid, no number |
| 7 | `'NoSpecial1'` | invalid, no special char |
| 8 | `'Valid1!'` (7 chars) | invalid, too short |
| 9 | `'Valid123!'` (9 chars) | `{ isValid: true }` |
| 10 | `'Aa1!aaaa'` (exactly 8) | `{ isValid: true }` |

#### Hàm 2: `isValidEmail(email)`
Mapping từ SRS: FR-AUTH-1.3

| # | Input | Expected |
|---|-------|----------|
| 1 | `null` | `false` |
| 2 | `''` | `false` |
| 3 | `'notanemail'` | `false` |
| 4 | `'@domain.com'` | `false` |
| 5 | `'user@'` | `false` |
| 6 | `'user@domain'` | `false` (no TLD) |
| 7 | `'user@domain.com'` | `true` |
| 8 | `'user.name+tag@sub.domain.co'` | `true` |

#### Hàm 3: `isValidObjectId(id)`

| # | Input | Expected |
|---|-------|----------|
| 1 | `null` | `false` |
| 2 | `''` | `false` |
| 3 | `'abc123'` | `false` (too short) |
| 4 | `'507f1f77bcf86cd799439011'` | `true` (valid 24-char hex) |
| 5 | `'507f1f77bcf86cd79943901z'` | `false` (z is not hex) |
| 6 | `'FFFFFFFFFFFFFFFFFFFFFFFF'` | `true` |

#### Hàm 4: `isValidTaskStatus(status)`
Mapping từ SRS: FR-TASK-1.5  
**Chú ý**: Code dùng title-case ('Todo', 'In Progress'...) khác với TASK_STATUS constants

| # | Input | Expected |
|---|-------|----------|
| 1 | `'Todo'` | `true` |
| 2 | `'In Progress'` | `true` |
| 3 | `'Completed'` | `true` |
| 4 | `'Archived'` | `true` |
| 5 | `'todo'` | `false` (lowercase không match) |
| 6 | `'done'` | `false` |
| 7 | `''` | `false` |
| 8 | `null` | `false` |

#### Hàm 5: `isValidTaskPriority(priority)`
Mapping từ SRS: FR-TASK-1.6

| # | Input | Expected |
|---|-------|----------|
| 1 | `'Low'` | `true` |
| 2 | `'Medium'` | `true` |
| 3 | `'High'` | `true` |
| 4 | `'Urgent'` | `true` |
| 5 | `'low'` | `false` |
| 6 | `'Critical'` | `false` |
| 7 | `null` | `false` |

#### Hàm 6: `isValidColor(color)`

| # | Input | Expected |
|---|-------|----------|
| 1 | `null` | `false` |
| 2 | `'#FFF'` | `true` (3 hex) |
| 3 | `'#FFFFFF'` | `true` (6 hex) |
| 4 | `'FFF'` | `false` (no #) |
| 5 | `'#GGG'` | `false` (invalid chars) |
| 6 | `'#FFFFFFF'` | `false` (7 chars) |
| 7 | `'#0a3F9c'` | `true` (mixed case) |

#### Hàm 7: `validatePagination(page, limit)`
Mapping từ SRS: NFR-PERF-2 (phân trang)

| # | Input | Expected |
|---|-------|----------|
| 1 | `(undefined, undefined)` | `{ page: 1, limit: 10 }` defaults |
| 2 | `('0', '10')` | page sanitized to 1 |
| 3 | `('-1', '10')` | page sanitized to 1 |
| 4 | `('2', '200')` | limit capped to 100 |
| 5 | `('abc', 'xyz')` | defaults: `{ page: 1, limit: 10 }` |
| 6 | `('5', '50')` | `{ page: 5, limit: 50 }` |

#### Hàm 8: `validateTaskDates(startDate, dueDate)`

| # | Input | Expected |
|---|-------|----------|
| 1 | `(null, null)` | `{ isValid: true }` |
| 2 | `('invalid-date', null)` | `{ isValid: false }` |
| 3 | `(null, 'invalid-date')` | `{ isValid: false }` |
| 4 | `(new Date(), new Date())` | `{ isValid: true }` |
| 5 | Duedate TRƯỚC startdate | `{ isValid: true }` (không restrict per code) |

#### Hàm 9: `sanitizeEnumArray(values, allowedValues, maxItems)`

| # | Input | Expected |
|---|-------|----------|
| 1 | `(null, ['a','b'])` | `{ isValid: true, values: [] }` |
| 2 | `(['a','b'], ['a','b','c'])` | `{ isValid: true, values: ['a','b'] }` |
| 3 | `(['x'], ['a','b'])` | `{ isValid: false }` |
| 4 | `(['A'], ['a','b'])` | `{ isValid: true, values: ['a'] }` (case-insensitive) |
| 5 | `('a,b', ['a','b','c'])` | string input works |
| 6 | `(['a','a','b'], ['a','b'])` | dedup → `['a','b']` |
| 7 | `(['a','b','c'], ['a','b','c'], 2)` | maxItems exceeded → invalid |

#### Hàm 10: `sanitizeSort(sort, allowedFields, defaultField, defaultOrder)`

| # | Input | Expected |
|---|-------|----------|
| 1 | `(null, [])` | `{ sortBy: 'createdAt', order: 'desc' }` |
| 2 | `('createdAt:asc', ['createdAt'])` | `{ sortBy: 'createdAt', order: 'asc' }` |
| 3 | `('-createdAt', ['createdAt'])` | `{ sortBy: 'createdAt', order: 'desc' }` |
| 4 | `('+dueDate', ['dueDate'])` | `{ sortBy: 'dueDate', order: 'asc' }` |
| 5 | `('invalid', ['createdAt'])` | `{ isValid: false }` |
| 6 | `(['dueDate','asc'], ['dueDate'])` | array input works |

---

### 4.3 `dateHelper.test.js` — MEDIUM

**Source**: `backend/src/utils/dateHelper.js`  
**Lý do test**: Được dùng trong calendar view (FR-TASK-6), tính toán repeat task (FR-TASK-9), notification due soon (FR-NOTIF-5.8).

#### Hàm 1: `isValidDate(date)`
| # | Input | Expected |
|---|-------|----------|
| 1 | `null` | `false` |
| 2 | `''` | `false` |
| 3 | `'not-a-date'` | `false` |
| 4 | `new Date()` | `true` |
| 5 | `'2024-01-15'` | `true` |
| 6 | `'2024-02-30'` | `false` (Feb 30 không tồn tại) |

#### Hàm 2: `getFirstDayOfMonth(year, month)` + `getLastDayOfMonth(year, month)`
Mapping từ SRS: FR-TASK-6 (calendar view)

| # | Input | Expected |
|---|-------|----------|
| 1 | `getFirst(2024, 1)` | Jan 1 2024 00:00:00 |
| 2 | `getLast(2024, 1)` | Jan 31 2024 23:59:59.999 |
| 3 | `getLast(2024, 2)` | Feb 29 2024 (năm nhuận) |
| 4 | `getLast(2023, 2)` | Feb 28 2023 (không nhuận) |
| 5 | `getLast(2024, 12)` | Dec 31 2024 |

#### Hàm 3: `addHours(date, hours)` + `addDays(date, days)`
| # | Input | Expected |
|---|-------|----------|
| 1 | `addHours(t, 24)` | t + 1 ngày |
| 2 | `addHours(t, -1)` | t - 1 giờ |
| 3 | `addDays(t, 1)` | ngày hôm sau |
| 4 | `addDays(t, -1)` | ngày hôm qua |
| 5 | `addDays(t, 0)` | y nguyên |

#### Hàm 4: `daysBetween(date1, date2)` + `hoursBetween(date1, date2)`
| # | Input | Expected |
|---|-------|----------|
| 1 | Same date | `0` |
| 2 | date2 = date1 + 1 day | `1` |
| 3 | date2 = date1 - 2 days | `-2` |
| 4 | hoursBetween same time | `0` |
| 5 | hoursBetween diff 2h | `2` |

#### Hàm 5: `isSameDay(date1, date2)`
| # | Input | Expected |
|---|-------|----------|
| 1 | Same day 09:00 vs 18:00 | `true` |
| 2 | Different days | `false` |
| 3 | Jan 31 vs Feb 1 | `false` |

#### Hàm 6: `formatRelativeTime(date)`
| # | Input | Expected |
|---|-------|----------|
| 1 | 10 seconds ago | `'vừa xong'` |
| 2 | 5 minutes ago | `'5 phút trước'` |
| 3 | 3 hours ago | `'3 giờ trước'` |
| 4 | 2 days ago | `'2 ngày trước'` |
| 5 | 30 seconds in future | `'ngay bây giờ'` |
| 6 | 15 minutes in future | `'trong 15 phút'` |
| 7 | 2 hours in future | `'trong 2 giờ'` |
| 8 | 5 days in future | `'trong 5 ngày'` |

#### Hàm 7: `formatDateToYYYYMMDD(date)`
| # | Input | Expected |
|---|-------|----------|
| 1 | `new Date('2024-03-15')` | `'2024-03-15'` |
| 2 | Invalid date | `null` |

---

### 4.4 `task.helpers.test.js` — HIGH

**Source**: Pure helper functions trong `backend/src/services/task.service.js`  
**Lý do test**: `buildRecipientList` quyết định ai nhận notification. `normalizeId` được dùng hàng chục chỗ trong codebase. `buildFolderClauses` quyết định filter DB query.

> ⚠️ Lưu ý: Các hàm này **không exported** trong file gốc. Cần chiết xuất hoặc test qua module với approach thích hợp (xem implementation notes ở section 6).

#### Hàm 1: `normalizeId(value)`
| # | Input | Expected |
|---|-------|----------|
| 1 | `null` | `null` |
| 2 | `undefined` | `null` |
| 3 | `'abc123'` | `'abc123'` |
| 4 | `{ toHexString: () => 'hex' }` | `'hex'` |
| 5 | `{ _id: 'id123' }` | `'id123'` |
| 6 | `{ toString: () => 'str' }` | `'str'` |
| 7 | `{ }` | `null` (no valid property) |

#### Hàm 2: `buildRecipientList(task, groupDoc)`
Mapping từ SRS: FR-NOTIF-5 (ai nhận thông báo)

| # | Scenario | Expected |
|---|----------|----------|
| 1 | `null` task | `[]` |
| 2 | Task với chỉ `createdBy` | `[createdBy]` |
| 3 | Task với assignedTo = [{userId: 'u2'}] | `[createdBy, 'u2']` |
| 4 | createdBy cũng là assignee → dedup | 1 entry không trùng |
| 5 | groupDoc với members | bao gồm member IDs |
| 6 | assignedTo với populated userId object `{_id: 'u3'}` | `'u3'` extracted |
| 7 | Mixed null entries trong assignedTo | bỏ qua null |

#### Hàm 3: `buildFolderClauses(folder)`
| # | Input | Expected |
|---|-------|----------|
| 1 | `null` folder | `[]` |
| 2 | Default folder (isDefault: true) | `[{ $or: [folderId match, null, not-exists] }]` |
| 3 | Non-default folder | `[{ folderId: folder._id }]` |

---

### 4.5 `task.assignment.test.js` — CRITICAL

**Source**: `validateAssignmentPermissions` trong `backend/src/services/task.service.js`  
**Lý do test**: Logic phức tạp nhất trong codebase — quyết định PM/PO Lead vs non-lead có thể assign ai. Từ SRS FR-ASSIGN. Cần mock `User.find`.

```
PM non-lead:  KHÔNG gán cho PM/PO (lead hoặc không lead)
PO non-lead:  giống PM non-lead
PM lead:      gán cho TẤT CẢ kể cả lead khác
PO lead:      gán cho TẤT CẢ
Leader (không phải PM/PO): KHÔNG gán cho leader khác, được gán non-leader
Tự gán (self): LUÔN cho phép
```

| # | Assigner | Target | Expected |
|---|----------|--------|----------|
| 1 | Bất kỳ | Self | `validIds: [self]` |
| 2 | Empty targets | - | `{ validIds: [], restrictedIds: [], errorMessage: null }` |
| 3 | PM non-lead | Developer | `validIds` |
| 4 | PM non-lead | QA non-lead | `validIds` |
| 5 | PM non-lead | PM non-lead khác | `restrictedIds` |
| 6 | PM non-lead | PO non-lead | `restrictedIds` |
| 7 | PM non-lead | PM lead | `restrictedIds` |
| 8 | PM non-lead | PO lead | `restrictedIds` |
| 9 | PM lead | PM non-lead | `validIds` |
| 10 | PM lead | PO lead | `validIds` |
| 11 | PM lead | Developer lead | `validIds` |
| 12 | PO lead | PM lead | `validIds` |
| 13 | PO non-lead | Developer | `validIds` |
| 14 | PO non-lead | PM lead | `restrictedIds` |
| 15 | Leader (BA) | Developer non-lead | `validIds` |
| 16 | Leader (BA) | Developer lead | `restrictedIds` |
| 17 | Regular (Developer) | Developer khác | `restrictedIds` (no rule match) |
| 18 | User not found/inactive | - | `restrictedIds` |
| 19 | Mix valid + restricted | - | partial validIds |
| 20 | All restricted | - | `errorMessage` populated |

---

### 4.6 `notification.producer.test.js` — MEDIUM

**Source**: `backend/src/services/notification.producer.js`  
**Lý do test**: `createGroupInvitationNotification` có logic dedup quan trọng (FR-GROUP-5.5 — không gửi lời mời trùng).

#### Hàm: `createGroupInvitationNotification`
| # | Scenario | Expected |
|---|----------|----------|
| 1 | Invalid recipientId | `{ success: false, "Invalid ID" }` |
| 2 | Invalid senderId | `{ success: false, "Invalid ID" }` |
| 3 | Invalid groupId | `{ success: false, "Invalid ID" }` |
| 4 | Đã có pending invitation cho cùng group+recipient | `{ success: false, "Invitation already sent" }` |
| 5 | Valid, không có pending duplicate | `{ success: true }` |

---

### 4.7 `groupRoleUtils.test.ts` (Frontend) — MEDIUM

**Source**: `frontend/app/utils/groupRoleUtils.ts`  
**Lý do test**: Frontend tự tính toán permission để show/hide UI — nếu sai thì user thấy UI không đúng dù backend đúng.

#### Hàm 1: `getMemberId(member)`
| # | Input | Expected |
|---|-------|----------|
| 1 | `{ userId: 'abc' }` | `'abc'` |
| 2 | `{ userId: { _id: 'abc' } }` | `'abc'` |
| 3 | `null` | `null` |

#### Hàm 2: `getMemberRole(group, userId)`
| # | Input | Expected |
|---|-------|----------|
| 1 | `null` group | `null` |
| 2 | `null` userId | `null` |
| 3 | User found trong members | đúng role |
| 4 | User không tìm thấy | `null` |

#### Hàm 3: `isReadOnlyRole(role)`
| # | Input | Expected |
|---|-------|----------|
| 1 | `'sale'` | `true` |
| 2 | `'qa'` | `true` |
| 3 | `'developer_manager'` | `true` |
| 4 | `'pm'` | `false` |
| 5 | `null` | `false` |

#### Hàm 4: `canAddMembers / canManageFolders / canAssignFolderMembers`
| # | Input | Expected |
|---|-------|----------|
| 1 | `isPersonalOwner: true` | `true` |
| 2 | `role: 'product_owner'` | `true` |
| 3 | `role: 'pm'` | `true` |
| 4 | `isLeader: true` | `true` |
| 5 | `role: 'developer'` | `false` |
| 6 | `role: null` | `false` |

#### Hàm 5: `isPersonalWorkspaceOwner(group, userId)`
| # | Input | Expected |
|---|-------|----------|
| 1 | `null` group | `false` |
| 2 | Non-personal workspace | `false` |
| 3 | Personal workspace, sai userId | `false` |
| 4 | Personal workspace, createdBy là string, đúng userId | `true` |
| 5 | Personal workspace, createdBy là object `{_id: ...}`, đúng userId | `true` |

---

## 5. Quyết định KHÔNG test

| File/Hàm | Lý do không test |
|----------|-----------------|
| `auth.service.js` — login/register | Logic đơn giản, đã có system test |
| `auth.controller.js` | Chỉ gọi service, không có logic |
| `user.controller.js` | Route handler thuần |
| `chat.service.js` / `directChat.service.js` | Logic đơn giản, chủ yếu là DB CRUD |
| `note.service.js` | CRUD cơ bản, không có logic phức tạp |
| `admin.service.js` | CRUD + query, không có permission logic phức tạp |
| `email.service.js` | External service wrapper |
| `realtime.gateway.js` | Side-effect only, không có business logic |
| `notification.consumer.js` — markAsRead, archiveNotifications | DB update đơn giản |
| All controllers | Thin controllers, không có business logic |
| All routes | Chỉ là routing |
| Frontend UI components | Quá phụ thuộc render/DOM, system test phù hợp hơn |
| Frontend service calls (api.client.ts) | HTTP wrapper, không có logic |

---

## 6. Implementation Notes

### 6.1 Xử lý hàm private trong task.service.js
Các hàm `normalizeId`, `buildRecipientList`, `buildFolderClauses` không được export. Approach:
- **Option A** (recommended): Test qua hàm public export của class TaskService, kiểm tra side-effects
- **Option B**: Chiết xuất chúng vào file utils riêng rồi test trực tiếp
- Trong plan này, ta dùng **Option B** — test file sẽ import trực tiếp bằng cách require và dùng `jest.isolateModules` + monkey-patch nếu cần, hoặc chiết xuất ra helper file

### 6.2 Mock strategy
- Dùng `jest.mock('path/to/module')` để mock Mongoose models
- Dùng `jest.fn().mockResolvedValue(...)` cho async DB calls
- Không dùng `mongodb-memory-server` vì đây là unit test thuần

### 6.3 Module resolution trong unit-test folder
Vì test nằm ngoài backend/, cần cấu hình `moduleNameMapper` hoặc dùng relative path trong jest.config.

---

## 7. Cách chạy tests

### Backend
```bash
cd unit-test/backend
npm install
npm test
# Hoặc chạy từng file:
npx jest tests/utils/groupPermissions.test.js --verbose
```

### Frontend
```bash
cd unit-test/frontend
npm install
npm test
```

### Chạy tất cả
```bash
# Từ root của unit-test/
npm test --workspaces
```

---

## 8. Metrics mục tiêu

| File | Số test cases | Coverage mục tiêu |
|------|--------------|-------------------|
| groupPermissions.test.js | ~45 | 100% branches |
| validationHelper.test.js | ~50 | 100% branches |
| dateHelper.test.js | ~35 | 95%+ |
| task.helpers.test.js | ~25 | 100% |
| task.assignment.test.js | ~25 | 100% branches |
| notification.producer.test.js | ~8 | 100% |
| groupRoleUtils.test.ts | ~30 | 100% |
| **Total** | **~218** | - |
