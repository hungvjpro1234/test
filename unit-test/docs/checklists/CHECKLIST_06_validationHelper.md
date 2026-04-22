# CHECKLIST — validationHelper.test.js

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | Utility — Validation Helper (Backend) |
| Source File | `backend/src/utils/validationHelper.js` |
| Test File | `unit-test/backend/tests/utils/validationHelper.test.js` |
| Test Framework | Jest |
| SRS Mapping | FR-AUTH-1.3 (email), FR-AUTH-1.4 (password), FR-TASK-1.5 (status), FR-TASK-1.6 (priority), C-6~C-12 (giới hạn), NFR-PERF-2 (phân trang) |
| Author | |
| Date | |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 128    | 128 | 0 | 0 | 0 |

---

## CUSTOMIZED CHECKLIST

### validatePassword (FR-AUTH-1.4)
- [x] UT_VALID_01 — null → invalid
- [x] UT_VALID_02 — undefined → invalid
- [x] UT_VALID_03 — empty string → invalid
- [x] UT_VALID_04 — 7 ký tự → invalid (thiếu độ dài)
- [x] UT_VALID_05 — 8 ký tự hợp lệ → valid
- [x] UT_VALID_06 — Dài hơn 8 ký tự → valid
- [x] UT_VALID_07 — Thiếu uppercase → invalid
- [x] UT_VALID_08 — Thiếu lowercase → invalid
- [x] UT_VALID_09 — Thiếu số → invalid
- [x] UT_VALID_10 — Thiếu special char → invalid
- [x] UT_VALID_11 — Nhiều lỗi cùng lúc
- [x] UT_VALID_12 — Valid1! (8 chars) → valid
- [x] UT_VALID_13 — Test@123 → valid
- [x] UT_VALID_14 — Các special chars khác (#$%^&*) → valid

### isValidEmail (FR-AUTH-1.3)
- [x] UT_VALID_15 — null → false
- [x] UT_VALID_16 — empty string → false
- [x] UT_VALID_17 — Không có @ → false
- [x] UT_VALID_18 — @ không có domain → false
- [x] UT_VALID_19 — Không có local part → false
- [x] UT_VALID_20 — Có khoảng trắng → false
- [x] UT_VALID_21 — Không có TLD → false
- [x] UT_VALID_22 — Format cơ bản → true
- [x] UT_VALID_23 — Với subdomain → true
- [x] UT_VALID_24 — Với dấu chấm trong local → true
- [x] UT_VALID_25 — Với + trong local → true

### isValidObjectId
- [x] UT_VALID_26 — null → false
- [x] UT_VALID_27 — empty string → false
- [x] UT_VALID_28 — undefined → false
- [x] UT_VALID_29 — Quá ngắn → false
- [x] UT_VALID_30 — Ký tự không phải hex → false
- [x] UT_VALID_31 — 25 ký tự (quá dài) → false
- [x] UT_VALID_32 — 24 hex lowercase → true
- [x] UT_VALID_33 — 24 hex uppercase → true
- [x] UT_VALID_34 — 24 hex mixed case → true
- [x] UT_VALID_35 — All zeros → true

### isValidTaskStatus (FR-TASK-1.5)
- [x] UT_VALID_36 — "Todo" → true
- [x] UT_VALID_37 — "In Progress" → true
- [x] UT_VALID_38 — "Completed" → true
- [x] UT_VALID_39 — "Archived" → true
- [x] UT_VALID_40 — "todo" lowercase → false
- [x] UT_VALID_41 — "done" → false
- [x] UT_VALID_42 — "pending" → false
- [x] UT_VALID_43 — empty string → false
- [x] UT_VALID_44 — null → false

### isValidTaskPriority (FR-TASK-1.6)
- [x] UT_VALID_45 — "Low" → true
- [x] UT_VALID_46 — "Medium" → true
- [x] UT_VALID_47 — "High" → true
- [x] UT_VALID_48 — "Urgent" → true
- [x] UT_VALID_49 — "low" lowercase → false
- [x] UT_VALID_50 — "Critical" → false
- [x] UT_VALID_51 — "URGENT" → false
- [x] UT_VALID_52 — null → false
- [x] UT_VALID_53 — empty string → false

### isValidColor
- [x] UT_VALID_54 — null → false
- [x] UT_VALID_55 — empty string → false
- [x] UT_VALID_56 — #FFF (3 ký tự) → true
- [x] UT_VALID_57 — #FFFFFF (6 ký tự) → true
- [x] UT_VALID_58 — #0a3F9c (mixed case) → true
- [x] UT_VALID_59 — #000 → true
- [x] UT_VALID_60 — FFF (không có #) → false
- [x] UT_VALID_61 — #GGG (invalid hex) → false
- [x] UT_VALID_62 — #FFFFFFF (7 ký tự) → false
- [x] UT_VALID_63 — #FF (2 ký tự) → false
- [x] UT_VALID_64 — #FFFF (4 ký tự) → false

### isValidLength (C-10: max 200 ký tự)
- [x] UT_VALID_65 — null → false
- [x] UT_VALID_66 — empty string min=1 → false
- [x] UT_VALID_67 — spaces only min=1 → false (vì trim)
- [x] UT_VALID_68 — Đúng min → true
- [x] UT_VALID_69 — Đúng max → true
- [x] UT_VALID_70 — Trong khoảng → true
- [x] UT_VALID_71 — Ngắn hơn min → false
- [x] UT_VALID_72 — Dài hơn max → false
- [x] UT_VALID_73 — 200 ký tự (boundary C-10) → true
- [x] UT_VALID_74 — 201 ký tự (C-10 violation) → false

### validateTaskDates
- [x] UT_VALID_75 — Cả hai null → valid
- [x] UT_VALID_76 — Chỉ startDate null → valid
- [x] UT_VALID_77 — Chỉ dueDate null → valid
- [x] UT_VALID_78 — Invalid startDate → invalid
- [x] UT_VALID_79 — Invalid dueDate → invalid
- [x] UT_VALID_80 — Cả hai valid Date → valid
- [x] UT_VALID_81 — Valid date strings → valid
- [x] UT_VALID_82 — dueDate trước startDate → valid (no restriction per code)

### validatePagination (NFR-PERF-2)
- [x] UT_VALID_83 — No input → defaults {page:1, limit:10}
- [x] UT_VALID_84 — Non-numeric strings → defaults
- [x] UT_VALID_85 — page = 0 → sanitized to 1
- [x] UT_VALID_86 — page = -1 → sanitized to 1
- [x] UT_VALID_87 — page = 5 → 5
- [x] UT_VALID_88 — limit = 0 → default (10)
- [x] UT_VALID_89 — limit = 200 → capped to 100
- [x] UT_VALID_90 — limit = 100 → 100 (boundary)
- [x] UT_VALID_91 — limit = 50 → 50
- [x] UT_VALID_92 — Valid input → trả về đúng

### sanitizeEnumArray (FR-TASK-1.7, C-9: max 10 nhãn)
- [x] UT_VALID_93 — null values → { isValid: true, values: [] }
- [x] UT_VALID_94 — empty allowedValues → { isValid: true }
- [x] UT_VALID_95 — Valid values → isValid: true
- [x] UT_VALID_96 — Invalid values → isValid: false
- [x] UT_VALID_97 — Case-insensitive normalization
- [x] UT_VALID_98 — Deduplication
- [x] UT_VALID_99 — String comma-separated → hoạt động
- [x] UT_VALID_100 — 11 items maxItems=10 → invalid (C-9)
- [x] UT_VALID_101 — 10 items maxItems=10 → valid (boundary)

### sanitizeSort
- [x] UT_VALID_102 — null → defaults (createdAt, desc)
- [x] UT_VALID_103 — undefined → defaults
- [x] UT_VALID_104 — "createdAt:asc" → valid, asc
- [x] UT_VALID_105 — "dueDate:desc" → valid, desc
- [x] UT_VALID_106 — "-createdAt" prefix → desc
- [x] UT_VALID_107 — "+dueDate" prefix → asc
- [x] UT_VALID_108 — Array ["dueDate", "asc"] → valid
- [x] UT_VALID_109 — Invalid field → isValid: false
- [x] UT_VALID_110 — Invalid order → fallback to default desc
- [x] UT_VALID_111 — Custom default field/order

### sanitizeString
- [x] UT_VALID_112 — null → empty string
- [x] UT_VALID_113 — HTML script tag → xóa tag, giữ content
- [x] UT_VALID_114 — HTML element → xóa tag
- [x] UT_VALID_115 — Trim whitespace
- [x] UT_VALID_116 — Plain text → unchanged (trimmed)

### isValidUrl
- [x] UT_VALID_117 — null → false
- [x] UT_VALID_118 — empty string → false
- [x] UT_VALID_119 — Valid http URL → true
- [x] UT_VALID_120 — Valid https URL → true
- [x] UT_VALID_121 — No protocol → false

### isNonEmptyArray / isNonEmptyObject
- [x] UT_VALID_122 — null array → false
- [x] UT_VALID_123 — [] → false
- [x] UT_VALID_124 — [1] → true
- [x] UT_VALID_125 — String (not array) → false
- [x] UT_VALID_126 — null object → falsy
- [x] UT_VALID_127 — {} → false
- [x] UT_VALID_128 — { key: value } → true

---

## TEST CASES

### validatePassword (FR-AUTH-1.4)

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_VALID_01 | `validatePassword` | Xác minh ràng buộc mật khẩu (FR-AUTH-1.4, FR-USER-2.3) trước khi lưu user — PLAN mục 4.2. | null → invalid | `null` | `{ isValid: false }` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_02 | `validatePassword` | Xác minh ràng buộc mật khẩu (FR-AUTH-1.4, FR-USER-2.3) trước khi lưu user — PLAN mục 4.2. | undefined → invalid | `undefined` | `{ isValid: false }` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_03 | `validatePassword` | Xác minh ràng buộc mật khẩu (FR-AUTH-1.4, FR-USER-2.3) trước khi lưu user — PLAN mục 4.2. | empty string → invalid | `""` | `{ isValid: false }` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_04 | `validatePassword` | Xác minh ràng buộc mật khẩu (FR-AUTH-1.4, FR-USER-2.3) trước khi lưu user — PLAN mục 4.2. | 7 ký tự → invalid | `"Aa1!aaa"` | `isValid: false`, errors chứa "8 characters" | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_05 | `validatePassword` | Xác minh ràng buộc mật khẩu (FR-AUTH-1.4, FR-USER-2.3) trước khi lưu user — PLAN mục 4.2. | 8 ký tự hợp lệ → valid | `"Aa1!aaaa"` | `{ isValid: true, errors: [] }` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_06 | `validatePassword` | Xác minh ràng buộc mật khẩu (FR-AUTH-1.4, FR-USER-2.3) trước khi lưu user — PLAN mục 4.2. | Dài hơn 8 ký tự → valid | `"ValidPass123!extra"` | `{ isValid: true }` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_07 | `validatePassword` | Xác minh ràng buộc mật khẩu (FR-AUTH-1.4, FR-USER-2.3) trước khi lưu user — PLAN mục 4.2. | Thiếu uppercase → invalid | `"alllower1!aa"` | `isValid: false`, errors chứa "uppercase" | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_08 | `validatePassword` | Xác minh ràng buộc mật khẩu (FR-AUTH-1.4, FR-USER-2.3) trước khi lưu user — PLAN mục 4.2. | Thiếu lowercase → invalid | `"ALLUPPERCASE1!"` | `isValid: false`, errors chứa "lowercase" | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_09 | `validatePassword` | Xác minh ràng buộc mật khẩu (FR-AUTH-1.4, FR-USER-2.3) trước khi lưu user — PLAN mục 4.2. | Thiếu số → invalid | `"NoNumbers!aA"` | `isValid: false`, errors chứa "number" | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_10 | `validatePassword` | Xác minh ràng buộc mật khẩu (FR-AUTH-1.4, FR-USER-2.3) trước khi lưu user — PLAN mục 4.2. | Thiếu special char → invalid | `"NoSpecial1aA"` | `isValid: false`, errors chứa "special character" | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_11 | `validatePassword` | Xác minh ràng buộc mật khẩu (FR-AUTH-1.4, FR-USER-2.3) trước khi lưu user — PLAN mục 4.2. | Nhiều lỗi cùng lúc | `"12345"` | `isValid: false`, `errors.length > 1` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_12 | `validatePassword` | Xác minh ràng buộc mật khẩu (FR-AUTH-1.4, FR-USER-2.3) trước khi lưu user — PLAN mục 4.2. | Valid1! (8 chars) → valid | `"Valid1!A"` | `{ isValid: true }` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_13 | `validatePassword` | Xác minh ràng buộc mật khẩu (FR-AUTH-1.4, FR-USER-2.3) trước khi lưu user — PLAN mục 4.2. | Test@123 → valid | `"Test@123"` | `{ isValid: true }` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_14 | `validatePassword` | Xác minh ràng buộc mật khẩu (FR-AUTH-1.4, FR-USER-2.3) trước khi lưu user — PLAN mục 4.2. | Special chars #$%^&* → valid | `"Abc#1234"`, `"Abc$1234"`, ... | Tất cả `isValid: true` | Khớp kết quả mong đợi | ✅ Pass |  |

### isValidEmail (FR-AUTH-1.3)

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_VALID_15 | `isValidEmail` | Xác minh định dạng email đăng ký/đăng nhập (FR-AUTH-1.3) — PLAN mục 4.2. | null → false | `null` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_16 | `isValidEmail` | Xác minh định dạng email đăng ký/đăng nhập (FR-AUTH-1.3) — PLAN mục 4.2. | empty string → false | `""` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_17 | `isValidEmail` | Xác minh định dạng email đăng ký/đăng nhập (FR-AUTH-1.3) — PLAN mục 4.2. | Không có @ → false | `"notanemail"` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_18 | `isValidEmail` | Xác minh định dạng email đăng ký/đăng nhập (FR-AUTH-1.3) — PLAN mục 4.2. | @ không có domain → false | `"user@"` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_19 | `isValidEmail` | Xác minh định dạng email đăng ký/đăng nhập (FR-AUTH-1.3) — PLAN mục 4.2. | Không có local part → false | `"@domain.com"` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_20 | `isValidEmail` | Xác minh định dạng email đăng ký/đăng nhập (FR-AUTH-1.3) — PLAN mục 4.2. | Có khoảng trắng → false | `"user name@domain.com"` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_21 | `isValidEmail` | Xác minh định dạng email đăng ký/đăng nhập (FR-AUTH-1.3) — PLAN mục 4.2. | Không có TLD → false | `"user@domain"` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_22 | `isValidEmail` | Xác minh định dạng email đăng ký/đăng nhập (FR-AUTH-1.3) — PLAN mục 4.2. | Format cơ bản → true | `"user@domain.com"` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_23 | `isValidEmail` | Xác minh định dạng email đăng ký/đăng nhập (FR-AUTH-1.3) — PLAN mục 4.2. | Với subdomain → true | `"user@sub.domain.com"` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_24 | `isValidEmail` | Xác minh định dạng email đăng ký/đăng nhập (FR-AUTH-1.3) — PLAN mục 4.2. | Với dấu chấm trong local → true | `"user.name@domain.com"` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_25 | `isValidEmail` | Xác minh định dạng email đăng ký/đăng nhập (FR-AUTH-1.3) — PLAN mục 4.2. | Với + trong local → true | `"user+tag@domain.com"` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |

### isValidObjectId

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_VALID_26 | `isValidObjectId` | Xác minh ObjectId 24 hex (C-12) để chặn ID bẩn vào DB — PLAN mục 4.2. | null → false | `null` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_27 | `isValidObjectId` | Xác minh ObjectId 24 hex (C-12) để chặn ID bẩn vào DB — PLAN mục 4.2. | empty string → false | `""` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_28 | `isValidObjectId` | Xác minh ObjectId 24 hex (C-12) để chặn ID bẩn vào DB — PLAN mục 4.2. | undefined → false | `undefined` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_29 | `isValidObjectId` | Xác minh ObjectId 24 hex (C-12) để chặn ID bẩn vào DB — PLAN mục 4.2. | Quá ngắn → false | `"abc123"` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_30 | `isValidObjectId` | Xác minh ObjectId 24 hex (C-12) để chặn ID bẩn vào DB — PLAN mục 4.2. | Có ký tự không phải hex → false | `"507f1f77bcf86cd79943901z"` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_31 | `isValidObjectId` | Xác minh ObjectId 24 hex (C-12) để chặn ID bẩn vào DB — PLAN mục 4.2. | 25 ký tự (quá dài) → false | `"507f1f77bcf86cd799439011a"` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_32 | `isValidObjectId` | Xác minh ObjectId 24 hex (C-12) để chặn ID bẩn vào DB — PLAN mục 4.2. | 24 hex lowercase → true | `"507f1f77bcf86cd799439011"` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_33 | `isValidObjectId` | Xác minh ObjectId 24 hex (C-12) để chặn ID bẩn vào DB — PLAN mục 4.2. | 24 hex uppercase → true | `"FFFFFFFFFFFFFFFFFFFFFFFF"` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_34 | `isValidObjectId` | Xác minh ObjectId 24 hex (C-12) để chặn ID bẩn vào DB — PLAN mục 4.2. | 24 hex mixed case → true | `"507F1f77BCf86cd799439011"` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_35 | `isValidObjectId` | Xác minh ObjectId 24 hex (C-12) để chặn ID bẩn vào DB — PLAN mục 4.2. | All zeros → true | `"000000000000000000000000"` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |

### isValidTaskStatus (FR-TASK-1.5)

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_VALID_36 | `isValidTaskStatus` | Xác minh status task title-case (FR-TASK-1.5), tránh enum lệch — PLAN mục 4.2. | "Todo" → true | `"Todo"` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_37 | `isValidTaskStatus` | Xác minh status task title-case (FR-TASK-1.5), tránh enum lệch — PLAN mục 4.2. | "In Progress" → true | `"In Progress"` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_38 | `isValidTaskStatus` | Xác minh status task title-case (FR-TASK-1.5), tránh enum lệch — PLAN mục 4.2. | "Completed" → true | `"Completed"` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_39 | `isValidTaskStatus` | Xác minh status task title-case (FR-TASK-1.5), tránh enum lệch — PLAN mục 4.2. | "Archived" → true | `"Archived"` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_40 | `isValidTaskStatus` | Xác minh status task title-case (FR-TASK-1.5), tránh enum lệch — PLAN mục 4.2. | "todo" lowercase → false | `"todo"` | `false` | Khớp kết quả mong đợi | ✅ Pass | case-sensitive |
| UT_VALID_41 | `isValidTaskStatus` | Xác minh status task title-case (FR-TASK-1.5), tránh enum lệch — PLAN mục 4.2. | "done" → false | `"done"` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_42 | `isValidTaskStatus` | Xác minh status task title-case (FR-TASK-1.5), tránh enum lệch — PLAN mục 4.2. | "pending" → false | `"pending"` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_43 | `isValidTaskStatus` | Xác minh status task title-case (FR-TASK-1.5), tránh enum lệch — PLAN mục 4.2. | empty string → false | `""` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_44 | `isValidTaskStatus` | Xác minh status task title-case (FR-TASK-1.5), tránh enum lệch — PLAN mục 4.2. | null → false | `null` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |

### isValidTaskPriority (FR-TASK-1.6)

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_VALID_45 | `isValidTaskPriority` | Xác minh mức ưu tiên task hợp lệ (FR-TASK-1.6) — PLAN mục 4.2. | "Low" → true | `"Low"` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_46 | `isValidTaskPriority` | Xác minh mức ưu tiên task hợp lệ (FR-TASK-1.6) — PLAN mục 4.2. | "Medium" → true | `"Medium"` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_47 | `isValidTaskPriority` | Xác minh mức ưu tiên task hợp lệ (FR-TASK-1.6) — PLAN mục 4.2. | "High" → true | `"High"` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_48 | `isValidTaskPriority` | Xác minh mức ưu tiên task hợp lệ (FR-TASK-1.6) — PLAN mục 4.2. | "Urgent" → true | `"Urgent"` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_49 | `isValidTaskPriority` | Xác minh mức ưu tiên task hợp lệ (FR-TASK-1.6) — PLAN mục 4.2. | "low" lowercase → false | `"low"` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_50 | `isValidTaskPriority` | Xác minh mức ưu tiên task hợp lệ (FR-TASK-1.6) — PLAN mục 4.2. | "Critical" → false | `"Critical"` | `false` | Khớp kết quả mong đợi | ✅ Pass | không có trong list |
| UT_VALID_51 | `isValidTaskPriority` | Xác minh mức ưu tiên task hợp lệ (FR-TASK-1.6) — PLAN mục 4.2. | "URGENT" → false | `"URGENT"` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_52 | `isValidTaskPriority` | Xác minh mức ưu tiên task hợp lệ (FR-TASK-1.6) — PLAN mục 4.2. | null → false | `null` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_53 | `isValidTaskPriority` | Xác minh mức ưu tiên task hợp lệ (FR-TASK-1.6) — PLAN mục 4.2. | empty string → false | `""` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |

### isValidColor

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_VALID_54 | `isValidColor` | Xác minh mã màu #RGB/#RRGGBB cho label/UI — PLAN mục 4.2. | null → false | `null` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_55 | `isValidColor` | Xác minh mã màu #RGB/#RRGGBB cho label/UI — PLAN mục 4.2. | empty string → false | `""` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_56 | `isValidColor` | Xác minh mã màu #RGB/#RRGGBB cho label/UI — PLAN mục 4.2. | #FFF (3 ký tự) → true | `"#FFF"` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_57 | `isValidColor` | Xác minh mã màu #RGB/#RRGGBB cho label/UI — PLAN mục 4.2. | #FFFFFF (6 ký tự) → true | `"#FFFFFF"` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_58 | `isValidColor` | Xác minh mã màu #RGB/#RRGGBB cho label/UI — PLAN mục 4.2. | #0a3F9c (mixed case) → true | `"#0a3F9c"` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_59 | `isValidColor` | Xác minh mã màu #RGB/#RRGGBB cho label/UI — PLAN mục 4.2. | #000 → true | `"#000"` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_60 | `isValidColor` | Xác minh mã màu #RGB/#RRGGBB cho label/UI — PLAN mục 4.2. | FFF (không có #) → false | `"FFF"` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_61 | `isValidColor` | Xác minh mã màu #RGB/#RRGGBB cho label/UI — PLAN mục 4.2. | #GGG (invalid hex chars) → false | `"#GGG"` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_62 | `isValidColor` | Xác minh mã màu #RGB/#RRGGBB cho label/UI — PLAN mục 4.2. | #FFFFFFF (7 ký tự) → false | `"#FFFFFFF"` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_63 | `isValidColor` | Xác minh mã màu #RGB/#RRGGBB cho label/UI — PLAN mục 4.2. | #FF (2 ký tự) → false | `"#FF"` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_64 | `isValidColor` | Xác minh mã màu #RGB/#RRGGBB cho label/UI — PLAN mục 4.2. | #FFFF (4 ký tự) → false | `"#FFFF"` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |

### isValidLength (C-10)

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_VALID_65 | `isValidLength` | Xác minh giới hạn độ dài chuỗi (C-10: max 200) — PLAN mục 4.2. | null → false | `null, 1, 10` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_66 | `isValidLength` | Xác minh giới hạn độ dài chuỗi (C-10: max 200) — PLAN mục 4.2. | empty string min=1 → false | `"", 1, 10` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_67 | `isValidLength` | Xác minh giới hạn độ dài chuỗi (C-10: max 200) — PLAN mục 4.2. | spaces only → false (trim) | `"   ", 1, 10` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_68 | `isValidLength` | Xác minh giới hạn độ dài chuỗi (C-10: max 200) — PLAN mục 4.2. | Đúng min → true | `"a", 1, 10` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_69 | `isValidLength` | Xác minh giới hạn độ dài chuỗi (C-10: max 200) — PLAN mục 4.2. | Đúng max → true | `"a".repeat(10), 1, 10` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_70 | `isValidLength` | Xác minh giới hạn độ dài chuỗi (C-10: max 200) — PLAN mục 4.2. | Trong khoảng → true | `"hello", 1, 100` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_71 | `isValidLength` | Xác minh giới hạn độ dài chuỗi (C-10: max 200) — PLAN mục 4.2. | Ngắn hơn min → false | `"ab", 5, 10` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_72 | `isValidLength` | Xác minh giới hạn độ dài chuỗi (C-10: max 200) — PLAN mục 4.2. | Dài hơn max → false | `"a".repeat(201), 1, 200` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_73 | `isValidLength` | Xác minh giới hạn độ dài chuỗi (C-10: max 200) — PLAN mục 4.2. | 200 ký tự boundary → true | `"a".repeat(200), 1, 200` | `true` | Khớp kết quả mong đợi | ✅ Pass | C-10 boundary |
| UT_VALID_74 | `isValidLength` | Xác minh giới hạn độ dài chuỗi (C-10: max 200) — PLAN mục 4.2. | 201 ký tự → false | `"a".repeat(201), 1, 200` | `false` | Khớp kết quả mong đợi | ✅ Pass | C-10 violation |

### validateTaskDates

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_VALID_75 | `validateTaskDates` | Xác minh cặp start/due date hợp lệ khi tạo-sửa task — PLAN mục 4.2. | Cả hai null → valid | `null, null` | `{ isValid: true }` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_76 | `validateTaskDates` | Xác minh cặp start/due date hợp lệ khi tạo-sửa task — PLAN mục 4.2. | Chỉ startDate null → valid | `null, new Date()` | `{ isValid: true }` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_77 | `validateTaskDates` | Xác minh cặp start/due date hợp lệ khi tạo-sửa task — PLAN mục 4.2. | Chỉ dueDate null → valid | `new Date(), null` | `{ isValid: true }` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_78 | `validateTaskDates` | Xác minh cặp start/due date hợp lệ khi tạo-sửa task — PLAN mục 4.2. | Invalid startDate → invalid | `"not-a-date", null` | `{ isValid: false, error: defined }` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_79 | `validateTaskDates` | Xác minh cặp start/due date hợp lệ khi tạo-sửa task — PLAN mục 4.2. | Invalid dueDate → invalid | `null, "invalid"` | `{ isValid: false }` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_80 | `validateTaskDates` | Xác minh cặp start/due date hợp lệ khi tạo-sửa task — PLAN mục 4.2. | Cả hai valid Date → valid | `now, later` | `{ isValid: true }` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_81 | `validateTaskDates` | Xác minh cặp start/due date hợp lệ khi tạo-sửa task — PLAN mục 4.2. | Valid date strings → valid | `"2024-01-01", "2024-12-31"` | `{ isValid: true }` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_82 | `validateTaskDates` | Xác minh cặp start/due date hợp lệ khi tạo-sửa task — PLAN mục 4.2. | dueDate trước startDate → valid | `later, earlier` | `{ isValid: true }` | Khớp kết quả mong đợi | ✅ Pass | code: "Removed all due date restrictions" |

### validatePagination (NFR-PERF-2)

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_VALID_83 | `validatePagination` | Xác minh sanitize phân trang (NFR-PERF-2: page/limit an toàn) — PLAN mục 4.2. | No input → defaults | `undefined, undefined` | `{ sanitizedPage: 1, sanitizedLimit: 10 }` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_84 | `validatePagination` | Xác minh sanitize phân trang (NFR-PERF-2: page/limit an toàn) — PLAN mục 4.2. | Non-numeric strings → defaults | `"abc", "xyz"` | `{ sanitizedPage: 1, sanitizedLimit: 10 }` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_85 | `validatePagination` | Xác minh sanitize phân trang (NFR-PERF-2: page/limit an toàn) — PLAN mục 4.2. | page = 0 → 1 | `"0", "10"` | `sanitizedPage: 1` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_86 | `validatePagination` | Xác minh sanitize phân trang (NFR-PERF-2: page/limit an toàn) — PLAN mục 4.2. | page = -1 → 1 | `"-1", "10"` | `sanitizedPage: 1` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_87 | `validatePagination` | Xác minh sanitize phân trang (NFR-PERF-2: page/limit an toàn) — PLAN mục 4.2. | page = 5 → 5 | `"5", "10"` | `sanitizedPage: 5` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_88 | `validatePagination` | Xác minh sanitize phân trang (NFR-PERF-2: page/limit an toàn) — PLAN mục 4.2. | limit = 0 → default 10 | `"1", "0"` | `sanitizedLimit: 10` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_89 | `validatePagination` | Xác minh sanitize phân trang (NFR-PERF-2: page/limit an toàn) — PLAN mục 4.2. | limit = 200 → capped to 100 | `"1", "200"` | `sanitizedLimit: 100` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_90 | `validatePagination` | Xác minh sanitize phân trang (NFR-PERF-2: page/limit an toàn) — PLAN mục 4.2. | limit = 100 → 100 (boundary) | `"1", "100"` | `sanitizedLimit: 100` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_91 | `validatePagination` | Xác minh sanitize phân trang (NFR-PERF-2: page/limit an toàn) — PLAN mục 4.2. | limit = 50 → 50 | `"1", "50"` | `sanitizedLimit: 50` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_92 | `validatePagination` | Xác minh sanitize phân trang (NFR-PERF-2: page/limit an toàn) — PLAN mục 4.2. | Valid input → đúng | `"3", "25"` | `{ sanitizedPage: 3, sanitizedLimit: 25, isValid: true }` | Khớp kết quả mong đợi | ✅ Pass |  |

### sanitizeEnumArray (C-9: max 10 nhãn)

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_VALID_93 | `sanitizeEnumArray` | Xác minh mảng enum nhãn task (FR-TASK-1.7, C-9 max 10) — PLAN mục 4.2. | null values → { isValid: true, values: [] } | `null, allowed` | `{ isValid: true, values: [] }` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_94 | `sanitizeEnumArray` | Xác minh mảng enum nhãn task (FR-TASK-1.7, C-9 max 10) — PLAN mục 4.2. | empty allowedValues → { isValid: true } | `["todo"], []` | `{ isValid: true }` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_95 | `sanitizeEnumArray` | Xác minh mảng enum nhãn task (FR-TASK-1.7, C-9 max 10) — PLAN mục 4.2. | Valid values → isValid: true | `["todo","completed"], allowed` | `{ isValid: true }`, values chứa "todo" | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_96 | `sanitizeEnumArray` | Xác minh mảng enum nhãn task (FR-TASK-1.7, C-9 max 10) — PLAN mục 4.2. | Invalid values → isValid: false | `["invalid_status"], allowed` | `{ isValid: false, error: defined }` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_97 | `sanitizeEnumArray` | Xác minh mảng enum nhãn task (FR-TASK-1.7, C-9 max 10) — PLAN mục 4.2. | Case-insensitive normalization | `["TODO"], allowed` | `{ isValid: true }`, values chứa "todo" | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_98 | `sanitizeEnumArray` | Xác minh mảng enum nhãn task (FR-TASK-1.7, C-9 max 10) — PLAN mục 4.2. | Deduplication | `["todo","todo","completed"], allowed` | `values: ["todo","completed"]` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_99 | `sanitizeEnumArray` | Xác minh mảng enum nhãn task (FR-TASK-1.7, C-9 max 10) — PLAN mục 4.2. | String comma-separated | `"todo,completed", allowed` | `{ isValid: true }`, chứa "todo" và "completed" | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_100 | `sanitizeEnumArray` | Xác minh mảng enum nhãn task (FR-TASK-1.7, C-9 max 10) — PLAN mục 4.2. | 11 items maxItems=10 → invalid | 11 items, maxItems: 10 | `{ isValid: false }` | Khớp kết quả mong đợi | ✅ Pass | C-9 |
| UT_VALID_101 | `sanitizeEnumArray` | Xác minh mảng enum nhãn task (FR-TASK-1.7, C-9 max 10) — PLAN mục 4.2. | 10 items maxItems=10 → valid | 10 items, maxItems: 10 | `{ isValid: true }` | Khớp kết quả mong đợi | ✅ Pass | C-9 boundary |

### sanitizeSort

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_VALID_102 | `sanitizeSort` | Xác minh sortBy/order whitelist + default — PLAN mục 4.2. | null → defaults | `null, allowed` | `{ isValid: true, sortBy: "createdAt", order: "desc" }` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_103 | `sanitizeSort` | Xác minh sortBy/order whitelist + default — PLAN mục 4.2. | undefined → defaults | `undefined, allowed` | `{ sortBy: "createdAt" }` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_104 | `sanitizeSort` | Xác minh sortBy/order whitelist + default — PLAN mục 4.2. | "createdAt:asc" → valid, asc | `"createdAt:asc", allowed` | `{ isValid: true, sortBy: "createdAt", order: "asc" }` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_105 | `sanitizeSort` | Xác minh sortBy/order whitelist + default — PLAN mục 4.2. | "dueDate:desc" → valid, desc | `"dueDate:desc", allowed` | `{ isValid: true, sortBy: "dueDate", order: "desc" }` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_106 | `sanitizeSort` | Xác minh sortBy/order whitelist + default — PLAN mục 4.2. | "-createdAt" → desc | `"-createdAt", allowed` | `{ isValid: true, order: "desc" }` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_107 | `sanitizeSort` | Xác minh sortBy/order whitelist + default — PLAN mục 4.2. | "+dueDate" → asc | `"+dueDate", allowed` | `{ isValid: true, sortBy: "dueDate", order: "asc" }` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_108 | `sanitizeSort` | Xác minh sortBy/order whitelist + default — PLAN mục 4.2. | Array input → valid | `["dueDate","asc"], allowed` | `{ isValid: true, sortBy: "dueDate", order: "asc" }` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_109 | `sanitizeSort` | Xác minh sortBy/order whitelist + default — PLAN mục 4.2. | Invalid field → false | `"invalidField", allowed` | `{ isValid: false, error: defined }` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_110 | `sanitizeSort` | Xác minh sortBy/order whitelist + default — PLAN mục 4.2. | Invalid order → fallback desc | `"createdAt:invalid", allowed` | `{ isValid: true, order: "desc" }` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_111 | `sanitizeSort` | Xác minh sortBy/order whitelist + default — PLAN mục 4.2. | Custom default field/order | `null, allowed, "dueDate", "asc"` | `{ sortBy: "dueDate", order: "asc" }` | Khớp kết quả mong đợi | ✅ Pass |  |

### sanitizeString

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_VALID_112 | `sanitizeString` | Xác minh trim/giới hạn chuỗi đầu vào API — PLAN mục 4.2. | null → empty string | `null` | `""` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_113 | `sanitizeString` | Xác minh trim/giới hạn chuỗi đầu vào API — PLAN mục 4.2. | HTML script tag → xóa tag, giữ content | `"<script>alert(1)</script>hello"` | `"alert(1)hello"` | Khớp kết quả mong đợi | ✅ Pass | chỉ xóa tag `<...>`, không xóa nội dung bên trong |
| UT_VALID_114 | `sanitizeString` | Xác minh trim/giới hạn chuỗi đầu vào API — PLAN mục 4.2. | HTML element → xóa tag | `"<b>bold</b>"` | `"bold"` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_115 | `sanitizeString` | Xác minh trim/giới hạn chuỗi đầu vào API — PLAN mục 4.2. | Trim whitespace | `"  hello  "` | `"hello"` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_116 | `sanitizeString` | Xác minh trim/giới hạn chuỗi đầu vào API — PLAN mục 4.2. | Plain text → unchanged | `"normal text"` | `"normal text"` | Khớp kết quả mong đợi | ✅ Pass |  |

### isValidUrl

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_VALID_117 | `isValidUrl` | Xác minh URL hợp lệ cho trường link/attachment — PLAN mục 4.2. | null → false | `null` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_118 | `isValidUrl` | Xác minh URL hợp lệ cho trường link/attachment — PLAN mục 4.2. | empty string → false | `""` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_119 | `isValidUrl` | Xác minh URL hợp lệ cho trường link/attachment — PLAN mục 4.2. | Valid http URL → true | `"http://example.com"` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_120 | `isValidUrl` | Xác minh URL hợp lệ cho trường link/attachment — PLAN mục 4.2. | Valid https URL → true | `"https://example.com/path?q=1"` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_121 | `isValidUrl` | Xác minh URL hợp lệ cho trường link/attachment — PLAN mục 4.2. | No protocol → false | `"example.com"` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |

### isNonEmptyArray / isNonEmptyObject

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_VALID_122 | `isNonEmptyArray` | Xác minh guard non-empty array/object cho payload — PLAN mục 4.2. | null → false | `null` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_123 | `isNonEmptyArray` | Xác minh guard non-empty array/object cho payload — PLAN mục 4.2. | [] → false | `[]` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_124 | `isNonEmptyArray` | Xác minh guard non-empty array/object cho payload — PLAN mục 4.2. | [1] → true | `[1]` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_125 | `isNonEmptyArray` | Xác minh guard non-empty array/object cho payload — PLAN mục 4.2. | String (not array) → false | `"abc"` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_126 | `isNonEmptyObject` | Xác minh guard non-empty array/object cho payload — PLAN mục 4.2. | null → falsy | `null` | falsy | Khớp kết quả mong đợi | ✅ Pass | short-circuit → null (không phải boolean false) |
| UT_VALID_127 | `isNonEmptyObject` | Xác minh guard non-empty array/object cho payload — PLAN mục 4.2. | {} → false | `{}` | `false` | Khớp kết quả mong đợi | ✅ Pass |  |
| UT_VALID_128 | `isNonEmptyObject` | Xác minh guard non-empty array/object cho payload — PLAN mục 4.2. | { key: value } → true | `{ a: 1 }` | `true` | Khớp kết quả mong đợi | ✅ Pass |  |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| | | | | |
