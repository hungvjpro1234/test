# CHECKLIST — notification.producer.test.js

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | Notification Service |
| Source File | `backend/src/services/notification.producer.js` |
| Test File | `unit-test/backend/tests/services/notification.producer.test.js` |
| Test Framework | Jest |
| SRS Mapping | FR-GROUP-5.5 (mời vào nhóm), FR-GROUP-5.6 (đổi tên nhóm) |
| Author | |
| Date | |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 16    | 16 | 0 | 0 | 0 |

---

## CUSTOMIZED CHECKLIST

### createGroupInvitationNotification
- [x] UT_NOTIF_01 — Từ chối khi recipientId không hợp lệ
- [x] UT_NOTIF_02 — Từ chối khi senderId không hợp lệ
- [x] UT_NOTIF_03 — Từ chối khi groupId không hợp lệ
- [x] UT_NOTIF_04 — Từ chối khi recipientId là null
- [x] UT_NOTIF_05 — Không gửi lại nếu đã có pending invitation (dedup)
- [x] UT_NOTIF_06 — Query đúng parameters khi kiểm tra duplicate
- [x] UT_NOTIF_07 — Gọi notifyGroupInvitation khi không có duplicate
- [x] UT_NOTIF_08 — Gọi notifyGroupInvitation với đúng params
- [x] UT_NOTIF_09 — Trả về notification data khi thành công

### createGroupNameChangeNotification
- [x] UT_NOTIF_10 — Từ chối khi groupId không hợp lệ
- [x] UT_NOTIF_11 — Từ chối khi senderId không hợp lệ
- [x] UT_NOTIF_12 — Trả về NOT_FOUND khi group không tồn tại
- [x] UT_NOTIF_13 — Query đúng groupId khi group có members
- [x] UT_NOTIF_14 — Trả về success = true khi group có members
- [x] UT_NOTIF_15 — Gọi notifyGroupNameChange với đúng oldName và newName
- [x] UT_NOTIF_16 — Không fail khi group không có members

---

## TEST CASES

### createGroupInvitationNotification — Input Validation

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_NOTIF_01 | `createGroupInvitationNotification` | Xác minh producer từ chối sớm request có ObjectId không hợp lệ (SRS C-12), tránh truy vấn DB / gọi notifier với payload rỗng — PLAN mục 4.6. | Từ chối recipientId không hợp lệ | recipientId: `"invalid-id"`, senderId/groupId: valid | `{ success: false, statusCode: 400, message: contains "Invalid ID" }` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_NOTIF_02 | `createGroupInvitationNotification` | Xác minh producer từ chối sớm request có ObjectId không hợp lệ (SRS C-12), tránh truy vấn DB / gọi notifier với payload rỗng — PLAN mục 4.6. | Từ chối senderId không hợp lệ | senderId: `"not-valid"`, recipientId/groupId: valid | `{ success: false }` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_NOTIF_03 | `createGroupInvitationNotification` | Xác minh producer từ chối sớm request có ObjectId không hợp lệ (SRS C-12), tránh truy vấn DB / gọi notifier với payload rỗng — PLAN mục 4.6. | Từ chối groupId không hợp lệ | groupId: `"bad-group-id"`, recipientId/senderId: valid | `{ success: false }` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_NOTIF_04 | `createGroupInvitationNotification` | Xác minh producer từ chối sớm request có ObjectId không hợp lệ (SRS C-12), tránh truy vấn DB / gọi notifier với payload rỗng — PLAN mục 4.6. | Từ chối recipientId là null | recipientId: `null` | `{ success: false }` | Khớp kết quả mong đợi | ✅ Pass |  |

### createGroupInvitationNotification — Deduplication (FR-GROUP-5.5)

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_NOTIF_05 | `createGroupInvitationNotification` | Xác minh không tạo trùng thông báo lời mời khi đã có bản ghi pending cho cùng nhóm + người nhận (FR-GROUP-5.5) — PLAN mục 4.6. | Không gửi lại nếu đã có pending invitation | IDs hợp lệ; mock `findOne` trả về existing notification | `{ success: false, message: contains "already sent" }` | Khớp kết quả mong đợi | ✅ Pass | CheckDB: verify findOne được gọi |
| UT_NOTIF_06 | `createGroupInvitationNotification` | Xác minh không tạo trùng thông báo lời mời khi đã có bản ghi pending cho cùng nhóm + người nhận (FR-GROUP-5.5) — PLAN mục 4.6. | Query duplicate đúng parameters | IDs hợp lệ; mock trả về existing notification | `findOne` được gọi với `{ recipient, type: "group_invitation", status: "pending", "data.groupId" }` | Khớp kết quả mong đợi | ✅ Pass | CheckDB |

### createGroupInvitationNotification — Happy Path

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_NOTIF_07 | `createGroupInvitationNotification` | Xác minh luồng mời nhóm thành công: enqueue notifier đúng contract và trả payload cho tầng gọi (FR-GROUP-5.5) — PLAN mục 4.6. | Gọi notifyGroupInvitation khi không có duplicate | IDs hợp lệ; mock `findOne → null` | `{ success: true, statusCode: 201 }`; `notifyGroupInvitation` được gọi 1 lần | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_NOTIF_08 | `createGroupInvitationNotification` | Xác minh luồng mời nhóm thành công: enqueue notifier đúng contract và trả payload cho tầng gọi (FR-GROUP-5.5) — PLAN mục 4.6. | Gọi với đúng params | recipientId, senderId, groupId, groupName: "My Group", inviterName: "John Doe", role: "developer" | `notifyGroupInvitation` được gọi với object chứa đúng các trường trên | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_NOTIF_09 | `createGroupInvitationNotification` | Xác minh luồng mời nhóm thành công: enqueue notifier đúng contract và trả payload cho tầng gọi (FR-GROUP-5.5) — PLAN mục 4.6. | Trả về notification data | IDs hợp lệ; mock trả về `{ _id: "new-notif-id", type: "group_invitation" }` | `result.data` bằng object notification đã tạo | Khớp kết quả mong đợi | ✅ Pass |  |

### createGroupNameChangeNotification — Input Validation

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_NOTIF_10 | `createGroupNameChangeNotification` | Xác minh validation đầu vào (ObjectId) trước khi tra cứu nhóm đổi tên (FR-GROUP-5.6) — PLAN mục 4.6. | Từ chối groupId không hợp lệ | groupId: `"invalid-id"` | `{ success: false }` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_NOTIF_11 | `createGroupNameChangeNotification` | Xác minh validation đầu vào (ObjectId) trước khi tra cứu nhóm đổi tên (FR-GROUP-5.6) — PLAN mục 4.6. | Từ chối senderId không hợp lệ | senderId: `"invalid"` | `{ success: false }` | Khớp kết quả mong đợi | ✅ Pass |  |

### createGroupNameChangeNotification — Group Not Found

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_NOTIF_12 | `createGroupNameChangeNotification` | Xác minh phản hồi khi nhóm không tồn tại (404), không enqueue sai (FR-GROUP-5.6) — PLAN mục 4.6. | Trả về NOT_FOUND khi group không tồn tại | IDs hợp lệ; mock `Group.findById → null` | `{ success: false, statusCode: 404 }` | Khớp kết quả mong đợi | ✅ Pass |  |

### createGroupNameChangeNotification — Happy Path

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_NOTIF_13 | `createGroupNameChangeNotification` | Xác minh broadcast đổi tên nhóm tới thành viên với oldName/newName đúng (FR-GROUP-5.6) — PLAN mục 4.6. | Query đúng groupId | Group có 2 members; oldName, newName hợp lệ | `Group.findById` được gọi với đúng groupId | Khớp kết quả mong đợi | ✅ Pass | CheckDB |
| UT_NOTIF_14 | `createGroupNameChangeNotification` | Xác minh broadcast đổi tên nhóm tới thành viên với oldName/newName đúng (FR-GROUP-5.6) — PLAN mục 4.6. | Trả về success khi group có members | Group có members; mock enqueueAll thành công | `{ success: true }` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_NOTIF_15 | `createGroupNameChangeNotification` | Xác minh broadcast đổi tên nhóm tới thành viên với oldName/newName đúng (FR-GROUP-5.6) — PLAN mục 4.6. | Gọi notify với đúng tên cũ và mới | oldName: "Old Group Name", newName: "New Group Name" | `notifyGroupNameChange` được gọi với `{ oldName: "Old Group Name", newName: "New Group Name" }` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_NOTIF_16 | `createGroupNameChangeNotification` | Xác minh broadcast đổi tên nhóm tới thành viên với oldName/newName đúng (FR-GROUP-5.6) — PLAN mục 4.6. | Không fail khi group không có members | Group `members: []` | `result.success` không bằng `false` | Khớp kết quả mong đợi | ✅ Pass |  |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
