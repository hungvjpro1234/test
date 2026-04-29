# CHECKLIST — notification.producer

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | Notification Service |
| Source File | `backend/src/services/notification.producer.js` |
| Test File | `unit-test/backend/tests/services/notification.producer.test.js` + `unit-test/backend/tests-integration/services/notification.producer.int.test.js` |
| Test Framework | Jest |
| SRS Mapping | FR-GROUP-5.5 (mời vào nhóm), FR-GROUP-5.6 (đổi tên nhóm) |
| Author | |
| Date | |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 14 | 14 | 0 | 0 | 0 |

Ghi chú tổng hợp: checklist này phản ánh **đúng source test hiện tại** theo tiêu chí *1 khối code test = 1 test case*, gồm **3 UT mock** + **11 IT checkdb**.

---

## CUSTOMIZED CHECKLIST

### Unit (mockdata) — `tests/services/notification.producer.test.js`
- [x] UT_NOTIF_06 — Existing notification query đúng parameters
- [x] UT_NOTIF_08 — notifyGroupInvitation được gọi với đúng params
- [x] UT_NOTIF_13 — Group có members → query đúng groupId

### Integration (checkdb) — `tests-integration/services/notification.producer.int.test.js`
- [x] IT_NOTIF_INVITATION_06 — reject null recipientId, không persist
- [x] IT_NOTIF_INVITATION_01 — reject invalid recipientId, không persist
- [x] IT_NOTIF_INVITATION_02 — reject invalid senderId, không persist
- [x] IT_NOTIF_INVITATION_03 — reject invalid groupId, không persist
- [x] IT_NOTIF_INVITATION_04 — reject duplicate pending invitation
- [x] IT_NOTIF_INVITATION_05 — happy path persist invitation đúng dữ liệu
- [x] IT_NOTIF_GROUPNAME_04 — reject invalid senderId, không persist
- [x] IT_NOTIF_GROUPNAME_05 — reject invalid groupId, không persist
- [x] IT_NOTIF_GROUPNAME_01 — unknown group → 404, không persist
- [x] IT_NOTIF_GROUPNAME_02 — sender là member duy nhất → success, data rỗng
- [x] IT_NOTIF_GROUPNAME_03 — persist notification cho members (trừ sender)

---

## TEST CASES

### Unit (mockdata)

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_NOTIF_06 | `createGroupInvitationNotification` | Kiểm tra chi tiết query dedup nội bộ, đảm bảo object query truyền vào đúng schema mong đợi. | Existing notification query đúng parameters | recipientId, senderId, groupId hợp lệ | `findOne` được gọi với `{ recipient, type, status, data.groupId }` đúng | Khớp kết quả mong đợi | ✅ Pass | `mode=mockdata; source=UT` |
| UT_NOTIF_08 | `createGroupInvitationNotification` | Kiểm tra contract gọi notifier nội bộ ở happy path. | notifyGroupInvitation được gọi với đúng params | recipientId, senderId, groupId, groupName, inviterName, role | `notifyGroupInvitation` được gọi với payload đúng field/value | Khớp kết quả mong đợi | ✅ Pass | `mode=mockdata; source=UT` |
| UT_NOTIF_13 | `createGroupNameChangeNotification` | Kiểm tra chi tiết internal call truy vấn group theo groupId. | Group có members → query đúng groupId | groupId, senderId, oldName, newName hợp lệ | `Group.findById` được gọi đúng groupId | Khớp kết quả mong đợi | ✅ Pass | `mode=mockdata; source=UT` |

### Integration (checkdb)

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| IT_NOTIF_INVITATION_06 | `createGroupInvitationNotification` | Xác minh validation null recipientId và đảm bảo không có document bẩn trong DB. | rejects null recipientId | recipientId: `null` | `success=false`, `statusCode=400`, DB không có notification theo marker | Khớp kết quả mong đợi | ✅ Pass | `mode=checkdb; source=IT` |
| IT_NOTIF_INVITATION_01 | `createGroupInvitationNotification` | Xác minh validation recipientId sai format và no-persist. | rejects invalid recipientId | recipientId: `"invalid-id"` | `success=false`, `statusCode=400`, DB clean | Khớp kết quả mong đợi | ✅ Pass | `mode=checkdb; source=IT` |
| IT_NOTIF_INVITATION_02 | `createGroupInvitationNotification` | Xác minh validation senderId sai format và no-persist. | rejects invalid senderId | senderId: `"invalid-id"` | `success=false`, `statusCode=400`, DB clean | Khớp kết quả mong đợi | ✅ Pass | `mode=checkdb; source=IT` |
| IT_NOTIF_INVITATION_03 | `createGroupInvitationNotification` | Xác minh validation groupId sai format và no-persist. | rejects invalid groupId | groupId: `"invalid-id"` | `success=false`, `statusCode=400`, DB clean | Khớp kết quả mong đợi | ✅ Pass | `mode=checkdb; source=IT` |
| IT_NOTIF_INVITATION_04 | `createGroupInvitationNotification` | Xác minh rule dedup: đã có pending invitation thì không tạo thêm. | rejects duplicate pending invitation | tồn tại pending invitation cùng recipient/group | `success=false`, DB chỉ còn 1 pending invitation | Khớp kết quả mong đợi | ✅ Pass | `mode=checkdb; source=IT` |
| IT_NOTIF_INVITATION_05 | `createGroupInvitationNotification` | Xác minh happy path persist đúng dữ liệu notification invitation. | persists one invitation notification | IDs hợp lệ, chưa có duplicate | `success=true`, `statusCode=201`, `result.data` khớp doc đã persist | Khớp kết quả mong đợi | ✅ Pass | `mode=checkdb; source=IT` |
| IT_NOTIF_GROUPNAME_04 | `createGroupNameChangeNotification` | Xác minh validation senderId sai format và no-persist ở luồng đổi tên group. | rejects invalid senderId | senderId: `"invalid-id"` | `success=false`, `statusCode=400`, DB clean | Khớp kết quả mong đợi | ✅ Pass | `mode=checkdb; source=IT` |
| IT_NOTIF_GROUPNAME_05 | `createGroupNameChangeNotification` | Xác minh validation groupId sai format và no-persist ở luồng đổi tên group. | rejects invalid groupId | groupId: `"invalid-id"` | `success=false`, `statusCode=400`, DB clean | Khớp kết quả mong đợi | ✅ Pass | `mode=checkdb; source=IT` |
| IT_NOTIF_GROUPNAME_01 | `createGroupNameChangeNotification` | Xác minh phản hồi not-found và không persist notification khi group không tồn tại. | returns not found for unknown group | groupId hợp lệ nhưng không tồn tại | `success=false`, `statusCode=404`, DB clean | Khớp kết quả mong đợi | ✅ Pass | `mode=checkdb; source=IT` |
| IT_NOTIF_GROUPNAME_02 | `createGroupNameChangeNotification` | Xác minh sender là member duy nhất thì success nhưng không tạo notification recipient dư. | sender is only member | group chỉ có sender | `success=true`, `statusCode=200`, `data=[]`, DB không có notification mới | Khớp kết quả mong đợi | ✅ Pass | `mode=checkdb; source=IT` |
| IT_NOTIF_GROUPNAME_03 | `createGroupNameChangeNotification` | Xác minh đổi tên group tạo notification cho toàn bộ members trừ sender, old/new name đúng. | persists notifications for all members except sender | group có nhiều members | `success=true`, DB persist đúng số recipients và đúng old/new names | Khớp kết quả mong đợi | ✅ Pass | `mode=checkdb; source=IT` |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |

---

## NHẬN XÉT KẾT QUẢ TEST

Kết quả hiện tại của `notification.producer` ổn định: toàn bộ 14 test case đang có trong source đều pass. Nhóm integration đã bao phủ đầy đủ nhánh DB-observable quan trọng (validation fail không persist, dedup, happy-path persist, group-name-change persist/no-persist), còn 3 unit case giữ vai trò kiểm tra chi tiết internal-call contract.

## GIẢI TRÌNH CÁC HÀNG `mockdata`

Các hàng `mockdata` là: `UT_NOTIF_06`, `UT_NOTIF_08`, `UT_NOTIF_13`.

- Lý do chung: đây là các kiểm tra mức internal-call (query shape/call args) nên không phải DB-observable contract theo kiểu 1:1.
- Theo source hiện tại, giữ 3 case này ở unit giúp khóa chặt chi tiết implementation mà integration khó biểu diễn trực tiếp.
