# CHECKLIST — note.service.int.test.js

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | Note Service (Integration) |
| Source File | `backend/src/services/note.service.js` |
| Test File | `unit-test/backend/tests-integration/services/note.service.int.test.js` |
| Test Framework | Jest |
| SRS Mapping | FR-NOTE (create/update/bookmark), FR-FOLDER (default folder, folder scope) |
| Author | |
| Date | |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 7 | 7 | 0 | 0 | 0 |

---

## CUSTOMIZED CHECKLIST

### createNote
- [x] IT_NOTE_CREATE_01 — Tạo note và tự map default folder khi không truyền `folderId`
- [x] IT_NOTE_CREATE_02 — Tạo note với boundary-valid title/content và persist đúng giá trị

### updateNote
- [x] IT_NOTE_UPDATE_01 — Cập nhật title/content/folder và persist `lastEdited`
- [x] IT_NOTE_UPDATE_02 — Reject `folderId` không hợp lệ, dữ liệu DB giữ nguyên
- [x] IT_NOTE_UPDATE_03 — Reject folder khác group, dữ liệu DB giữ nguyên

### toggleBookmark
- [x] IT_NOTE_BOOKMARK_01 — Toggle bookmark một lần và persist trạng thái mới
- [x] IT_NOTE_BOOKMARK_02 — Toggle bookmark hai lần và persist trạng thái cuối cùng

---

## TEST CASES

### createNote

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| IT_NOTE_CREATE_01 | `createNote` | Xác minh tạo note thành công và map default folder đúng theo contract service khi thiếu `folderId`. | Tạo note không truyền `folderId` | `title`, `content`, `userId`, `groupId` hợp lệ | Note được persist; `folderId` trỏ tới default folder của group | Khớp kết quả mong đợi | ✅ Pass | `checkdb` |
| IT_NOTE_CREATE_02 | `createNote` | Xác minh boundary input hợp lệ vẫn persist chính xác dữ liệu (title/content dài). | Tạo note với title 200 ký tự, content 10000 ký tự | Payload hợp lệ ở ngưỡng biên | DB lưu đúng giá trị và độ dài như input | Khớp kết quả mong đợi | ✅ Pass | `checkdb` |

### updateNote

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| IT_NOTE_UPDATE_01 | `updateNote` | Xác minh cập nhật note thành công và persist `lastEdited` tăng theo thời gian. | Update title/content/folder | `noteId`, `userId`, `groupId`, payload update hợp lệ | DB cập nhật đúng trường và `lastEdited` mới hơn giá trị cũ | Khớp kết quả mong đợi | ✅ Pass | `checkdb` |
| IT_NOTE_UPDATE_02 | `updateNote` | Xác minh fail-fast với `folderId` invalid và không làm bẩn dữ liệu note hiện có. | Update với `folderId` sai định dạng | `folderId = "invalid-folder-id"` | Throw error; dữ liệu note trong DB không đổi | Khớp kết quả mong đợi | ✅ Pass | `checkdb` |
| IT_NOTE_UPDATE_03 | `updateNote` | Xác minh chặn cập nhật sang folder khác group để đảm bảo ràng buộc group scope. | Update với folder thuộc group khác | `folderId` tồn tại nhưng thuộc `otherGroup` | Throw "Folder not found"; content/folder trong DB giữ nguyên | Khớp kết quả mong đợi | ✅ Pass | `checkdb` |

### toggleBookmark

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| IT_NOTE_BOOKMARK_01 | `toggleBookmark` | Xác minh toggle bookmark cập nhật đồng bộ giữa response service và dữ liệu persist. | Toggle 1 lần | `noteId`, `userId`, `groupId` hợp lệ | `isBookmarked` chuyển `false -> true` ở cả response và DB | Khớp kết quả mong đợi | ✅ Pass | `checkdb` |
| IT_NOTE_BOOKMARK_02 | `toggleBookmark` | Xác minh toggle nhiều lần vẫn phản ánh đúng trạng thái cuối cùng trong DB. | Toggle 2 lần liên tiếp | `noteId`, `userId`, `groupId` hợp lệ | Trạng thái cuối `isBookmarked = false` ở DB | Khớp kết quả mong đợi | ✅ Pass | `checkdb` |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |

---

## NHẬN XÉT KẾT QUẢ TEST

Bộ integration test cho `note.service` hiện bao phủ đầy đủ 3 luồng chính (create, update, bookmark) và tất cả case đều pass. Các case vừa kiểm chứng nhánh thành công vừa kiểm chứng nhánh lỗi có assert “không làm thay đổi dữ liệu DB”, nên mức tin cậy cho contract persistence của note service đang tốt.

## GIẢI TRÌNH CÁC HÀNG `mockdata`

Checklist này hiện **không có hàng `mockdata`**. Toàn bộ 7 test case đều là integration scenario có assertion trực tiếp trên dữ liệu MongoDB sau khi gọi service.
