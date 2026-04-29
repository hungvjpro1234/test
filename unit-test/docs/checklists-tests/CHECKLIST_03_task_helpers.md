# CHECKLIST — task.helpers

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | Task Service — Pure Helper Functions |
| Source File | `backend/src/services/task.service.js` |
| Test File | `unit-test/backend/tests/services/task.helpers.test.js` + `unit-test/backend/tests-integration/services/task.helpers.int.test.js` |
| Test Framework | Jest + rewire |
| SRS Mapping | FR-TASK (quản lý task), FR-FOLDER (phân công folder) |
| Author | |
| Date | |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 50 | 49 | 1 | 0 | 0 |

Ghi chú tổng hợp: checklist này phản ánh **đúng source test hiện tại** theo tiêu chí *1 khối code test = 1 test case*, gồm **43 UT mock** + **7 IT checkdb**.

---

## CUSTOMIZED CHECKLIST

### normalizeId
- [x] UT_HELPER_01 — null → null
- [x] UT_HELPER_02 — undefined → null
- [x] UT_HELPER_03 — 0 → null (falsy)
- [x] UT_HELPER_04 — empty string → null (falsy)
- [x] UT_HELPER_05 — string → passthrough
- [x] UT_HELPER_06 — Valid ObjectId string → unchanged
- [x] UT_HELPER_07 — Object có toHexString → hex string
- [x] UT_HELPER_08 — Object có _id string → _id
- [x] UT_HELPER_09 — Object có _id là object → toString()
- [x] UT_HELPER_10 — Object có toString → toString result
- [x] UT_HELPER_11 — Empty object {} → null (SRS spec) ⚠️ có thể FAIL

### buildRecipientList
- [x] UT_HELPER_12 — null task → []
- [x] UT_HELPER_13 — undefined task → []
- [x] UT_HELPER_14 — Task có createdBy → [createdBy]
- [x] UT_HELPER_15 — createdBy là null → []
- [x] UT_HELPER_16 — assignedTo với string userId → được thêm vào
- [x] UT_HELPER_17 — assignedTo với populated userId object
- [x] UT_HELPER_18 — Nhiều assignees → đủ số lượng
- [x] UT_HELPER_19 — Null entries trong assignedTo → bỏ qua
- [x] UT_HELPER_20 — Empty assignedTo array → chỉ có createdBy
- [x] UT_HELPER_21 — Creator cũng là assignee → dedup (length = 1)
- [x] UT_HELPER_22 — Assignee trùng lặp → dedup
- [x] UT_HELPER_23 — Group members được thêm vào
- [x] UT_HELPER_24 — Group member với populated userId object
- [x] UT_HELPER_25 — groupDoc = null → không ảnh hưởng
- [x] UT_HELPER_26 — Creator cũng là group member → dedup

### buildFolderClauses
- [x] UT_HELPER_27 — null → []
- [x] UT_HELPER_28 — undefined → []
- [x] UT_HELPER_29 — Default folder → trả về $or clause
- [x] UT_HELPER_30 — $or chứa exact folderId match
- [x] UT_HELPER_31 — $or chứa folderId = null
- [x] UT_HELPER_32 — $or chứa folderId $exists: false
- [x] UT_HELPER_33 — $or có đúng 3 conditions
- [x] UT_HELPER_34 — Non-default folder → exact folderId match
- [x] UT_HELPER_35 — Non-default folder → không có $or
- [x] UT_HELPER_36 — isDefault: undefined → treat as non-default

### hasFolderAssignment
- [x] UT_HELPER_37 — null folderDoc → false
- [x] UT_HELPER_38 — Folder không có memberAccess → false
- [x] UT_HELPER_39 — null requesterId → false
- [x] UT_HELPER_40 — User có trong memberAccess → true
- [x] UT_HELPER_41 — User với ObjectId-like object → true
- [x] UT_HELPER_42 — User không có trong memberAccess → false
- [x] UT_HELPER_43 — Empty memberAccess → false

### Integration (checkdb) — `tests-integration/services/task.helpers.int.test.js`
- [x] IT_TASK_CREATE_01 — createTask persist đúng fields và side effects
- [x] IT_TASK_FOLDER_ACCESS_01 — assign vào folder non-default tự cấp memberAccess
- [x] IT_TASK_FOLDER_ACCESS_02 — omit folderId fallback về default folder
- [x] IT_TASK_HELPER_MAP_01 — default folder thấy task default + null folderId
- [x] IT_TASK_HELPER_MAP_02 — filter non-default folder trả đúng tasks folder đó
- [x] IT_TASK_HELPER_MAP_03 — requester có memberAccess thấy task folder được gán
- [x] IT_TASK_HELPER_MAP_04 — requester không có assignment thì không thấy task

---

## TEST CASES

### normalizeId

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_HELPER_01 | `normalizeId` | Xác minh chuẩn hóa ID (string / ObjectId / populated) dùng xuyên suốt pipeline task, tránh lọt giá trị không resolve được — PLAN mục 4.4. | null → null | `null` | `null` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_HELPER_02 | `normalizeId` | Xác minh chuẩn hóa ID (string / ObjectId / populated) dùng xuyên suốt pipeline task, tránh lọt giá trị không resolve được — PLAN mục 4.4. | undefined → null | `undefined` | `null` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_HELPER_03 | `normalizeId` | Xác minh chuẩn hóa ID (string / ObjectId / populated) dùng xuyên suốt pipeline task, tránh lọt giá trị không resolve được — PLAN mục 4.4. | 0 → null (falsy) | `0` | `null` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_HELPER_04 | `normalizeId` | Xác minh chuẩn hóa ID (string / ObjectId / populated) dùng xuyên suốt pipeline task, tránh lọt giá trị không resolve được — PLAN mục 4.4. | empty string → null | `""` | `null` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_HELPER_05 | `normalizeId` | Xác minh chuẩn hóa ID (string / ObjectId / populated) dùng xuyên suốt pipeline task, tránh lọt giá trị không resolve được — PLAN mục 4.4. | string → passthrough | `"abc123"` | `"abc123"` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_HELPER_06 | `normalizeId` | Xác minh chuẩn hóa ID (string / ObjectId / populated) dùng xuyên suốt pipeline task, tránh lọt giá trị không resolve được — PLAN mục 4.4. | Valid ObjectId string → unchanged | `"507f1f77bcf86cd799439011"` | `"507f1f77bcf86cd799439011"` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_HELPER_07 | `normalizeId` | Xác minh chuẩn hóa ID (string / ObjectId / populated) dùng xuyên suốt pipeline task, tránh lọt giá trị không resolve được — PLAN mục 4.4. | Object có toHexString → hex string | `{ toHexString: () => "507f...011" }` | `"507f1f77bcf86cd799439011"` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_HELPER_08 | `normalizeId` | Xác minh chuẩn hóa ID (string / ObjectId / populated) dùng xuyên suốt pipeline task, tránh lọt giá trị không resolve được — PLAN mục 4.4. | Object có _id string → _id | `{ _id: "userId123" }` | `"userId123"` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_HELPER_09 | `normalizeId` | Xác minh chuẩn hóa ID (string / ObjectId / populated) dùng xuyên suốt pipeline task, tránh lọt giá trị không resolve được — PLAN mục 4.4. | Object có _id là object → toString() | `{ _id: { toString: () => "inner-id" } }` | `"inner-id"` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_HELPER_10 | `normalizeId` | Xác minh chuẩn hóa ID (string / ObjectId / populated) dùng xuyên suốt pipeline task, tránh lọt giá trị không resolve được — PLAN mục 4.4. | Object có toString method → toString result | `{ toString: () => "string-result" }` | `"string-result"` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_HELPER_11 | `normalizeId` | Xác minh chuẩn hóa ID (string / ObjectId / populated) dùng xuyên suốt pipeline task, tránh lọt giá trị không resolve được — PLAN mục 4.4. | Empty object {} → null theo SRS spec | `{}` | `null` | `"[object Object]"` | ❌ Fail | `mockdata`; bug logic normalizeId với plain object |

### buildRecipientList — Null / empty task

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_HELPER_12 | `buildRecipientList` | Xác minh danh sách người nhận thông báo task (creator, assignee, dedup, group members) theo FR-NOTIF-5 — PLAN mục 4.4. | null task → [] | `null` | `[]` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_HELPER_13 | `buildRecipientList` | Xác minh danh sách người nhận thông báo task (creator, assignee, dedup, group members) theo FR-NOTIF-5 — PLAN mục 4.4. | undefined task → [] | `undefined` | `[]` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |

### buildRecipientList — Task với createdBy

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_HELPER_14 | `buildRecipientList` | Xác minh danh sách người nhận thông báo task (creator, assignee, dedup, group members) theo FR-NOTIF-5 — PLAN mục 4.4. | Task có createdBy → [createdBy] | `{ createdBy: "user1" }` | `["user1"]` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_HELPER_15 | `buildRecipientList` | Xác minh danh sách người nhận thông báo task (creator, assignee, dedup, group members) theo FR-NOTIF-5 — PLAN mục 4.4. | createdBy là null → [] | `{ createdBy: null }` | `[]` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |

### buildRecipientList — assignedTo

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_HELPER_16 | `buildRecipientList` | Xác minh danh sách người nhận thông báo task (creator, assignee, dedup, group members) theo FR-NOTIF-5 — PLAN mục 4.4. | assignedTo với string userId | `{ createdBy: "c1", assignedTo: [{ userId: "a1" }] }` | Chứa cả `"c1"` và `"a1"` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_HELPER_17 | `buildRecipientList` | Xác minh danh sách người nhận thông báo task (creator, assignee, dedup, group members) theo FR-NOTIF-5 — PLAN mục 4.4. | assignedTo với populated userId object | `assignedTo: [{ userId: { _id: "a2", name: "User 2" } }]` | Chứa `"a2"` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_HELPER_18 | `buildRecipientList` | Xác minh danh sách người nhận thông báo task (creator, assignee, dedup, group members) theo FR-NOTIF-5 — PLAN mục 4.4. | Nhiều assignees → đủ số lượng | 3 assignees + 1 creator | `length = 4` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_HELPER_19 | `buildRecipientList` | Xác minh danh sách người nhận thông báo task (creator, assignee, dedup, group members) theo FR-NOTIF-5 — PLAN mục 4.4. | Null entries trong assignedTo → bỏ qua | `assignedTo: [null, { userId: "a1" }, null]` | Chứa `"a1"`, không chứa `null` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_HELPER_20 | `buildRecipientList` | Xác minh danh sách người nhận thông báo task (creator, assignee, dedup, group members) theo FR-NOTIF-5 — PLAN mục 4.4. | Empty assignedTo array | `{ createdBy: "c1", assignedTo: [] }` | `["c1"]` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |

### buildRecipientList — Deduplication

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_HELPER_21 | `buildRecipientList` | Xác minh danh sách người nhận thông báo task (creator, assignee, dedup, group members) theo FR-NOTIF-5 — PLAN mục 4.4. | Creator cũng là assignee → dedup | `{ createdBy: "u1", assignedTo: [{ userId: "u1" }] }` | `length = 1`, chứa `"u1"` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_HELPER_22 | `buildRecipientList` | Xác minh danh sách người nhận thông báo task (creator, assignee, dedup, group members) theo FR-NOTIF-5 — PLAN mục 4.4. | Assignee trùng lặp → dedup | `assignedTo: [{ userId: "a1" }, { userId: "a1" }]` | `length = 2` (creator + a1 duy nhất) | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |

### buildRecipientList — groupDoc

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_HELPER_23 | `buildRecipientList` | Xác minh danh sách người nhận thông báo task (creator, assignee, dedup, group members) theo FR-NOTIF-5 — PLAN mục 4.4. | Group members được thêm vào | task: `{createdBy:"c1"}`, groupDoc: `{members:[{userId:"m1"},{userId:"m2"}]}` | Chứa `"c1"`, `"m1"`, `"m2"` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_HELPER_24 | `buildRecipientList` | Xác minh danh sách người nhận thông báo task (creator, assignee, dedup, group members) theo FR-NOTIF-5 — PLAN mục 4.4. | Group member với populated userId object | `members: [{ userId: { _id: "m3", name: "..." } }]` | Chứa `"m3"` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_HELPER_25 | `buildRecipientList` | Xác minh danh sách người nhận thông báo task (creator, assignee, dedup, group members) theo FR-NOTIF-5 — PLAN mục 4.4. | groupDoc = null → không ảnh hưởng | task: `{createdBy:"c1"}`, groupDoc: `null` | `["c1"]` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_HELPER_26 | `buildRecipientList` | Xác minh danh sách người nhận thông báo task (creator, assignee, dedup, group members) theo FR-NOTIF-5 — PLAN mục 4.4. | Creator cũng là group member → dedup | groupDoc.members chứa createdBy | Chỉ có 1 entry của creator | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |

### buildFolderClauses

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_HELPER_27 | `buildFolderClauses` | Xác minh điều kiện truy vấn MongoDB theo default vs non-default folder (FR-FOLDER-5) — PLAN mục 4.4. | null → [] | `null` | `[]` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_HELPER_28 | `buildFolderClauses` | Xác minh điều kiện truy vấn MongoDB theo default vs non-default folder (FR-FOLDER-5) — PLAN mục 4.4. | undefined → [] | `undefined` | `[]` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_HELPER_29 | `buildFolderClauses` | Xác minh điều kiện truy vấn MongoDB theo default vs non-default folder (FR-FOLDER-5) — PLAN mục 4.4. | Default folder → trả về $or clause | `{ _id: "fid", isDefault: true }` | `result[0].$or` được định nghĩa | Khớp kết quả mong đợi | ✅ Pass | `mode=mockdata; source=UT` |
| UT_HELPER_30 | `buildFolderClauses` | Xác minh điều kiện truy vấn MongoDB theo default vs non-default folder (FR-FOLDER-5) — PLAN mục 4.4. | $or chứa exact folderId match | Default folder | `result[0].$or` chứa `{ folderId: "fid" }` | Khớp kết quả mong đợi | ✅ Pass | `mode=mockdata; source=UT` |
| UT_HELPER_31 | `buildFolderClauses` | Xác minh điều kiện truy vấn MongoDB theo default vs non-default folder (FR-FOLDER-5) — PLAN mục 4.4. | $or chứa folderId = null | Default folder | `result[0].$or` chứa `{ folderId: null }` | Khớp kết quả mong đợi | ✅ Pass | `mode=mockdata; source=UT` |
| UT_HELPER_32 | `buildFolderClauses` | Xác minh điều kiện truy vấn MongoDB theo default vs non-default folder (FR-FOLDER-5) — PLAN mục 4.4. | $or chứa folderId $exists: false | Default folder | `result[0].$or` chứa `{ folderId: { $exists: false } }` | Khớp kết quả mong đợi | ✅ Pass | `mode=mockdata; source=UT` |
| UT_HELPER_33 | `buildFolderClauses` | Xác minh điều kiện truy vấn MongoDB theo default vs non-default folder (FR-FOLDER-5) — PLAN mục 4.4. | $or có đúng 3 conditions | Default folder | `result[0].$or.length = 3` | Khớp kết quả mong đợi | ✅ Pass | `mode=mockdata; source=UT` |
| UT_HELPER_34 | `buildFolderClauses` | Xác minh điều kiện truy vấn MongoDB theo default vs non-default folder (FR-FOLDER-5) — PLAN mục 4.4. | Non-default folder → exact folderId match | `{ _id: "fid", isDefault: false }` | `result = [{ folderId: "fid" }]` | Khớp kết quả mong đợi | ✅ Pass | `mode=mockdata; source=UT` |
| UT_HELPER_35 | `buildFolderClauses` | Xác minh điều kiện truy vấn MongoDB theo default vs non-default folder (FR-FOLDER-5) — PLAN mục 4.4. | Non-default folder → không có $or | `{ _id: "fid", isDefault: false }` | `result[0].$or` là undefined | Khớp kết quả mong đợi | ✅ Pass | `mode=mockdata; source=UT` |
| UT_HELPER_36 | `buildFolderClauses` | Xác minh điều kiện truy vấn MongoDB theo default vs non-default folder (FR-FOLDER-5) — PLAN mục 4.4. | isDefault: undefined → treat as non-default | `{ _id: "fid" }` (không có isDefault) | `result = [{ folderId: "fid" }]` | Khớp kết quả mong đợi | ✅ Pass | `mode=mockdata; source=UT` |

### hasFolderAssignment

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_HELPER_37 | `hasFolderAssignment` | Xác minh thành viên có trong memberAccess của folder (đồng bộ quyền folder-scoped) — FR-FOLDER / PLAN mục 4.4. | null folderDoc → false | `null, "user1"` | `false` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_HELPER_38 | `hasFolderAssignment` | Xác minh thành viên có trong memberAccess của folder (đồng bộ quyền folder-scoped) — FR-FOLDER / PLAN mục 4.4. | Folder không có memberAccess → false | `{ name: "folder" }, "user1"` | `false` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_HELPER_39 | `hasFolderAssignment` | Xác minh thành viên có trong memberAccess của folder (đồng bộ quyền folder-scoped) — FR-FOLDER / PLAN mục 4.4. | null requesterId → false | `{ memberAccess: [...] }, null` | `false` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_HELPER_40 | `hasFolderAssignment` | Xác minh thành viên có trong memberAccess của folder (đồng bộ quyền folder-scoped) — FR-FOLDER / PLAN mục 4.4. | User có trong memberAccess → true | memberAccess chứa `{ userId: "user1" }`, requesterId: `"user1"` | `true` | Khớp kết quả mong đợi | ✅ Pass | `mode=mockdata; source=UT` |
| UT_HELPER_41 | `hasFolderAssignment` | Xác minh thành viên có trong memberAccess của folder (đồng bộ quyền folder-scoped) — FR-FOLDER / PLAN mục 4.4. | User với ObjectId-like object → true | memberAccess: `[{ userId: { toHexString: () => "user-hex-id" } }]`, requesterId: `"user-hex-id"` | `true` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_HELPER_42 | `hasFolderAssignment` | Xác minh thành viên có trong memberAccess của folder (đồng bộ quyền folder-scoped) — FR-FOLDER / PLAN mục 4.4. | User không có trong memberAccess → false | memberAccess chứa `"user1"`, requesterId: `"user2"` | `false` | Khớp kết quả mong đợi | ✅ Pass | `mode=mockdata; source=UT` |
| UT_HELPER_43 | `hasFolderAssignment` | Xác minh thành viên có trong memberAccess của folder (đồng bộ quyền folder-scoped) — FR-FOLDER / PLAN mục 4.4. | Empty memberAccess → false | `{ memberAccess: [] }, "user1"` | `false` | Khớp kết quả mong đợi | ✅ Pass | `mode=mockdata; source=UT` |

### Integration (checkdb)

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| IT_TASK_CREATE_01 | `createTask` | Xác minh createTask persist đầy đủ field cốt lõi và gọi side effects realtime/notification. | create task happy path | creator, group, folder, assignee hợp lệ | task lưu đúng title/group/folder/assignedTo; notification + event được gọi | Khớp kết quả mong đợi | ✅ Pass | `mode=checkdb; source=IT` |
| IT_TASK_FOLDER_ACCESS_01 | `createTask` | Xác minh khi assign vào folder non-default thì memberAccess được cập nhật đúng. | PM assign vào non-default folder | creator PM, assignee developer, folder non-default | folder.memberAccess chứa assignee, addedBy đúng creator | Khớp kết quả mong đợi | ✅ Pass | `mode=checkdb; source=IT` |
| IT_TASK_FOLDER_ACCESS_02 | `createTask` | Xác minh khi không truyền folderId thì service fallback đúng default folder. | omit folderId | group có default folder, tạo task không truyền folderId | task.folderId = defaultFolder._id | Khớp kết quả mong đợi | ✅ Pass | `mode=checkdb; source=IT` |
| IT_TASK_HELPER_MAP_01 | `getAllTasks` | Xác minh mapping helper cho default folder: lấy task thuộc default + task không folderId. | group view với requester có default-folder access | dữ liệu gồm task ở default/null/other folder | chỉ trả về task default và null-folder | Khớp kết quả mong đợi | ✅ Pass | `mode=checkdb; source=IT` |
| IT_TASK_HELPER_MAP_02 | `getAllTasks` | Xác minh filter theo non-default folder chỉ trả task trong folder đó. | query có folderId cụ thể | requester có access 2 folders, filter theo target folder | chỉ trả task thuộc target folder | Khớp kết quả mong đợi | ✅ Pass | `mode=checkdb; source=IT` |
| IT_TASK_HELPER_MAP_03 | `getAllTasks` | Xác minh requester có memberAccess chỉ thấy task trong folder được gán ở group view. | group view với requester đã assigned vào 1 folder | 1 assigned folder + 1 unassigned folder | chỉ thấy task ở assigned folder | Khớp kết quả mong đợi | ✅ Pass | `mode=checkdb; source=IT` |
| IT_TASK_HELPER_MAP_04 | `getAllTasks` | Xác minh requester không có folder assignment thì không thấy task nào. | group view không assignment | requester không có memberAccess ở bất kỳ folder nào | result.tasks rỗng, pagination.total = 0 | Khớp kết quả mong đợi | ✅ Pass | `mode=checkdb; source=IT` |

---

## NHẬN XÉT KẾT QUẢ TEST

Nhóm `task.helper` hiện có 50 test case theo source, trong đó 49 pass và 1 fail (`UT_HELPER_11`). Các integration case đã xác nhận hành vi DB/persistence và folder-scoped visibility chạy ổn định; phần còn lại vẫn cần unit để khóa chi tiết pure-helper logic.

## GIẢI TRÌNH CÁC HÀNG `mockdata`

Các hàng `mockdata` là toàn bộ nhóm `UT_HELPER_01` đến `UT_HELPER_43`.

- Lý do chung: đây là private helper/pure logic (shape normalization, nhánh null/undefined, object parsing), không tạo DB side effect trực tiếp nên không thể check DB 1:1.
- Trường hợp đặc biệt: `UT_HELPER_11` bắt bug `normalizeId({})`, cần giữ ở unit vì integration không chứng minh được 1:1 ở mức helper internals.

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| BUG-001 | UT_HELPER_11 | `normalizeId({})` trả về `"[object Object]"` thay vì `null` — thiếu guard cho plain object không có _id/toHexString | Medium | Open |

