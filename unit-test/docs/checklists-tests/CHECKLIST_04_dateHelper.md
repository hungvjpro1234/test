# CHECKLIST — dateHelper.test.js

## ABOUT

| Field | Detail |
|-------|--------|
| Project | Todo List App |
| Module | Utility — Date Helper |
| Source File | `backend/src/utils/dateHelper.js` |
| Test File | `unit-test/backend/tests/utils/dateHelper.test.js` |
| Test Framework | Jest |
| SRS Mapping | FR-TASK-6 (calendar view), FR-TASK-9 (repeat task), FR-NOTIF-5.8 (task due soon) |
| Author | |
| Date | |

---

## SUMMARY

| Total | Pass | Fail | Untested | N/A |
|-------|------|------|----------|-----|
| 65    | 64 | 1 | 0 | 0 |

---

## CUSTOMIZED CHECKLIST

### isValidDate
- [x] UT_DATE_01 — null → false
- [x] UT_DATE_02 — undefined → false
- [x] UT_DATE_03 — empty string → false
- [x] UT_DATE_04 — "not-a-date" → false
- [x] UT_DATE_05 — "0000-00-00" → false
- [x] UT_DATE_06 — new Date() → true
- [x] UT_DATE_07 — ISO string hợp lệ → true
- [x] UT_DATE_08 — Unix timestamp (number) → true
- [x] UT_DATE_09 — "2024-02-29" (năm nhuận) → true
- [x] UT_DATE_10 — "2023-02-29" JS rollover → true (known behavior)
- [x] UT_DATE_11 — "2024-02-30" → false per SRS spec ⚠️ có thể FAIL

### getFirstDayOfMonth / getLastDayOfMonth
- [x] UT_DATE_12 — getFirstDay tháng 1/2024 → 1/1/2024
- [x] UT_DATE_13 — getFirstDay tháng 12/2024 → 1/12/2024
- [x] UT_DATE_14 — getFirstDay tháng 2/2024 → 1/2/2024
- [x] UT_DATE_15 — getLastDay tháng 1 → 31
- [x] UT_DATE_16 — getLastDay tháng 2 năm nhuận → 29
- [x] UT_DATE_17 — getLastDay tháng 2 không nhuận → 28
- [x] UT_DATE_18 — getLastDay tháng 12 → 31
- [x] UT_DATE_19 — getLastDay giờ cuối ngày 23:59:59.999
- [x] UT_DATE_20 — FirstDay < LastDay trong cùng tháng

### addDays
- [x] UT_DATE_21 — +1 ngày
- [x] UT_DATE_22 — +0 ngày → không thay đổi
- [x] UT_DATE_23 — -1 ngày
- [x] UT_DATE_24 — Không mutate date gốc
- [x] UT_DATE_25 — Qua tháng mới (31/1 + 1 → 1/2)

### addHours
- [x] UT_DATE_26 — +1 giờ
- [x] UT_DATE_27 — +24 giờ = +1 ngày
- [x] UT_DATE_28 — -1 giờ
- [x] UT_DATE_29 — Không mutate date gốc

### daysBetween / hoursBetween
- [x] UT_DATE_30 — Same date → 0
- [x] UT_DATE_31 — +1 day → 1
- [x] UT_DATE_32 — -2 days → -2
- [x] UT_DATE_33 — Cross-month boundary
- [x] UT_DATE_34 — hoursBetween same time → 0
- [x] UT_DATE_35 — hoursBetween diff 2 giờ → 2
- [x] UT_DATE_36 — hoursBetween ngược chiều → âm

### isSameDay
- [x] UT_DATE_37 — Cùng ngày, khác giờ → true
- [x] UT_DATE_38 — Khác ngày → false
- [x] UT_DATE_39 — Cuối tháng 1 vs đầu tháng 2 → false
- [x] UT_DATE_40 — Cùng ngày, cùng giờ → true

### getToday / getTomorrow / getYesterday
- [x] UT_DATE_41 — getToday giờ là 00:00:00
- [x] UT_DATE_42 — getTomorrow = getToday + 1
- [x] UT_DATE_43 — getYesterday = getToday - 1
- [x] UT_DATE_44 — getToday < getTomorrow
- [x] UT_DATE_45 — getYesterday < getToday

### formatRelativeTime
- [x] UT_DATE_46 — 10 giây trước → "vừa xong"
- [x] UT_DATE_47 — 5 phút trước → "5 phút trước"
- [x] UT_DATE_48 — 3 giờ trước → "3 giờ trước"
- [x] UT_DATE_49 — 2 ngày trước → "2 ngày trước"
- [x] UT_DATE_50 — 30 giây nữa → "ngay bây giờ"
- [x] UT_DATE_51 — 15 phút nữa → "trong 15 phút"
- [x] UT_DATE_52 — 2 giờ nữa → "trong 2 giờ"
- [x] UT_DATE_53 — 5 ngày nữa → "trong 5 ngày"

### formatDateToYYYYMMDD
- [x] UT_DATE_54 — Valid date → format "YYYY-MM-DD"
- [x] UT_DATE_55 — Invalid date → null
- [x] UT_DATE_56 — null → null

### isPastDate / isFutureDate
- [x] UT_DATE_57 — Hôm qua → isPastDate = true
- [x] UT_DATE_58 — Ngày mai → isFutureDate = true
- [x] UT_DATE_59 — Hôm qua → isFutureDate = false
- [x] UT_DATE_60 — null → isPastDate = false
- [x] UT_DATE_61 — null → isFutureDate = false

### parseDate
- [x] UT_DATE_62 — null → null
- [x] UT_DATE_63 — Date object → same object
- [x] UT_DATE_64 — Valid date string → Date object
- [x] UT_DATE_65 — Invalid date string → null

---

## TEST CASES

### isValidDate

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_DATE_01 | `isValidDate` | Xác minh nhận diện ngày hợp lệ phục vụ calendar, repeat task, due soon (FR-TASK-6, FR-TASK-9, FR-NOTIF-5.8) — PLAN mục 4.3. | null → false | `null` | `false` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_DATE_02 | `isValidDate` | Xác minh nhận diện ngày hợp lệ phục vụ calendar, repeat task, due soon (FR-TASK-6, FR-TASK-9, FR-NOTIF-5.8) — PLAN mục 4.3. | undefined → false | `undefined` | `false` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_DATE_03 | `isValidDate` | Xác minh nhận diện ngày hợp lệ phục vụ calendar, repeat task, due soon (FR-TASK-6, FR-TASK-9, FR-NOTIF-5.8) — PLAN mục 4.3. | empty string → false | `""` | `false` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_DATE_04 | `isValidDate` | Xác minh nhận diện ngày hợp lệ phục vụ calendar, repeat task, due soon (FR-TASK-6, FR-TASK-9, FR-NOTIF-5.8) — PLAN mục 4.3. | chuỗi không phải ngày → false | `"not-a-date"` | `false` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_DATE_05 | `isValidDate` | Xác minh nhận diện ngày hợp lệ phục vụ calendar, repeat task, due soon (FR-TASK-6, FR-TASK-9, FR-NOTIF-5.8) — PLAN mục 4.3. | "0000-00-00" → false | `"0000-00-00"` | `false` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_DATE_06 | `isValidDate` | Xác minh nhận diện ngày hợp lệ phục vụ calendar, repeat task, due soon (FR-TASK-6, FR-TASK-9, FR-NOTIF-5.8) — PLAN mục 4.3. | Date object hợp lệ → true | `new Date()` | `true` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_DATE_07 | `isValidDate` | Xác minh nhận diện ngày hợp lệ phục vụ calendar, repeat task, due soon (FR-TASK-6, FR-TASK-9, FR-NOTIF-5.8) — PLAN mục 4.3. | ISO string hợp lệ → true | `"2024-01-15"` | `true` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_DATE_08 | `isValidDate` | Xác minh nhận diện ngày hợp lệ phục vụ calendar, repeat task, due soon (FR-TASK-6, FR-TASK-9, FR-NOTIF-5.8) — PLAN mục 4.3. | Unix timestamp → true | `1700000000000` | `true` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_DATE_09 | `isValidDate` | Xác minh nhận diện ngày hợp lệ phục vụ calendar, repeat task, due soon (FR-TASK-6, FR-TASK-9, FR-NOTIF-5.8) — PLAN mục 4.3. | 29/2 năm nhuận → true | `"2024-02-29"` | `true` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_DATE_10 | `isValidDate` | Xác minh nhận diện ngày hợp lệ phục vụ calendar, repeat task, due soon (FR-TASK-6, FR-TASK-9, FR-NOTIF-5.8) — PLAN mục 4.3. | "2023-02-29" JS rollover → true | `"2023-02-29"` | `true` | Khớp kết quả mong đợi | ✅ Pass | JS tự rollover sang 1/3/2023 — known behavior |
| UT_DATE_11 | `isValidDate` | Xác minh nhận diện ngày hợp lệ phục vụ calendar, repeat task, due soon (FR-TASK-6, FR-TASK-9, FR-NOTIF-5.8) — PLAN mục 4.3. | "2024-02-30" → false theo SRS spec | `"2024-02-30"` | `false` | `true` | ❌ Fail | `mockdata`; ⚠️ Có thể FAIL: JS Date rollover khiến `isNaN` = false; ⚠️ BUG: JS Date rollover `2024-02-30` → `2024-03-01`, isNaN = false |

### getFirstDayOfMonth

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_DATE_12 | `getFirstDayOfMonth` | Xác minh ranh giới tháng (đầu/cuối) phục vụ calendar (FR-TASK-6) — PLAN mục 4.3. | Tháng 1/2024 → 1/1/2024 | `(2024, 1)` | `getFullYear()=2024, getMonth()=0, getDate()=1` | Khớp kết quả mong đợi | ✅ Pass | FR-TASK-6 |
| UT_DATE_13 | `getFirstDayOfMonth` | Xác minh ranh giới tháng (đầu/cuối) phục vụ calendar (FR-TASK-6) — PLAN mục 4.3. | Tháng 12/2024 → 1/12/2024 | `(2024, 12)` | `getFullYear()=2024, getMonth()=11, getDate()=1` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_DATE_14 | `getFirstDayOfMonth` | Xác minh ranh giới tháng (đầu/cuối) phục vụ calendar (FR-TASK-6) — PLAN mục 4.3. | Tháng 2/2024 → 1/2/2024 | `(2024, 2)` | `getDate()=1, getMonth()=1` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |

### getLastDayOfMonth

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_DATE_15 | `getLastDayOfMonth` | Xác minh ranh giới tháng (đầu/cuối) phục vụ calendar (FR-TASK-6) — PLAN mục 4.3. | Tháng 1/2024 → ngày 31 | `(2024, 1)` | `getDate()=31, getMonth()=0` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_DATE_16 | `getLastDayOfMonth` | Xác minh ranh giới tháng (đầu/cuối) phục vụ calendar (FR-TASK-6) — PLAN mục 4.3. | Tháng 2 năm nhuận → ngày 29 | `(2024, 2)` | `getDate()=29` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_DATE_17 | `getLastDayOfMonth` | Xác minh ranh giới tháng (đầu/cuối) phục vụ calendar (FR-TASK-6) — PLAN mục 4.3. | Tháng 2 không nhuận → ngày 28 | `(2023, 2)` | `getDate()=28` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_DATE_18 | `getLastDayOfMonth` | Xác minh ranh giới tháng (đầu/cuối) phục vụ calendar (FR-TASK-6) — PLAN mục 4.3. | Tháng 12 → ngày 31 | `(2024, 12)` | `getDate()=31, getMonth()=11` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_DATE_19 | `getLastDayOfMonth` | Xác minh ranh giới tháng (đầu/cuối) phục vụ calendar (FR-TASK-6) — PLAN mục 4.3. | Giờ cuối ngày 23:59:59.999 | `(2024, 1)` | `getHours()=23, getMinutes()=59, getSeconds()=59, getMilliseconds()=999` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_DATE_20 | `getFirstDayOfMonth` + `getLastDayOfMonth` | Xác minh ranh giới tháng (đầu/cuối) phục vụ calendar (FR-TASK-6) — PLAN mục 4.3. | FirstDay < LastDay trong cùng tháng | `(2024, 3)` | `firstDay < lastDay = true` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |

### addDays

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_DATE_21 | `addDays` | Xác minh cộng trừ ngày ổn định cho lịch và SLA hiển thị — PLAN mục 4.3. | +1 ngày | base: `2024-06-15`, delta: `1` | `getDate()=16` | Khớp kết quả mong đợi | ✅ Pass | FR-TASK-9 |
| UT_DATE_22 | `addDays` | Xác minh cộng trừ ngày ổn định cho lịch và SLA hiển thị — PLAN mục 4.3. | +0 ngày → không thay đổi | base: `2024-06-15`, delta: `0` | `getTime() = base.getTime()` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_DATE_23 | `addDays` | Xác minh cộng trừ ngày ổn định cho lịch và SLA hiển thị — PLAN mục 4.3. | -1 ngày | base: `2024-06-15`, delta: `-1` | `getDate()=14` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_DATE_24 | `addDays` | Xác minh cộng trừ ngày ổn định cho lịch và SLA hiển thị — PLAN mục 4.3. | Không mutate date gốc | `original = new Date("2024-01-15")` | `original.getDate()` vẫn là `15` sau khi gọi | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_DATE_25 | `addDays` | Xác minh cộng trừ ngày ổn định cho lịch và SLA hiển thị — PLAN mục 4.3. | Qua tháng mới | base: `2024-01-31`, delta: `1` | `getMonth()=1, getDate()=1` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |

### addHours

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_DATE_26 | `addHours` | Xác minh cộng trừ giờ cho mốc thời gian và thông báo — PLAN mục 4.3. | +1 giờ | base: `2024-01-15T10:00:00Z`, delta: `1` | `getUTCHours()=11` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_DATE_27 | `addHours` | Xác minh cộng trừ giờ cho mốc thời gian và thông báo — PLAN mục 4.3. | +24 giờ = +1 ngày | base: `2024-01-15T10:00:00Z`, delta: `24` | `getUTCDate()=16` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_DATE_28 | `addHours` | Xác minh cộng trừ giờ cho mốc thời gian và thông báo — PLAN mục 4.3. | -1 giờ | base: `2024-01-15T10:00:00Z`, delta: `-1` | `getUTCHours()=9` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_DATE_29 | `addHours` | Xác minh cộng trừ giờ cho mốc thời gian và thông báo — PLAN mục 4.3. | Không mutate date gốc | `original = new Date("2024-01-15T10:00:00Z")` | `original.getUTCHours()` vẫn là `10` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |

### daysBetween

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_DATE_30 | `daysBetween` | Xác minh khoảng cách thời gian (ngày/giờ) phục vụ báo cáo và UI — PLAN mục 4.3. | Same date → 0 | `d1 = d2 = 2024-01-15` | `0` | Khớp kết quả mong đợi | ✅ Pass | FR-NOTIF-5.8 |
| UT_DATE_31 | `daysBetween` | Xác minh khoảng cách thời gian (ngày/giờ) phục vụ báo cáo và UI — PLAN mục 4.3. | d2 = d1 + 1 day → 1 | `d1=2024-01-15, d2=2024-01-16` | `1` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_DATE_32 | `daysBetween` | Xác minh khoảng cách thời gian (ngày/giờ) phục vụ báo cáo và UI — PLAN mục 4.3. | d2 = d1 - 2 days → -2 | `d1=2024-01-15, d2=2024-01-13` | `-2` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_DATE_33 | `daysBetween` | Xác minh khoảng cách thời gian (ngày/giờ) phục vụ báo cáo và UI — PLAN mục 4.3. | Cross-month boundary | `d1=2024-01-30, d2=2024-02-01` | `2` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |

### hoursBetween

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_DATE_34 | `hoursBetween` | Xác minh khoảng cách thời gian (ngày/giờ) phục vụ báo cáo và UI — PLAN mục 4.3. | Same time → 0 | `d1 = d2` | `0` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_DATE_35 | `hoursBetween` | Xác minh khoảng cách thời gian (ngày/giờ) phục vụ báo cáo và UI — PLAN mục 4.3. | Diff 2 giờ → 2 | `d1=10:00Z, d2=12:00Z` | `2` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_DATE_36 | `hoursBetween` | Xác minh khoảng cách thời gian (ngày/giờ) phục vụ báo cáo và UI — PLAN mục 4.3. | Ngược chiều → âm | `d1=12:00Z, d2=10:00Z` | `-2` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |

### isSameDay

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_DATE_37 | `isSameDay` | Xác minh so sánh cùng ngày (bỏ qua giờ) cho calendar và filter — PLAN mục 4.3. | Cùng ngày, khác giờ → true | `2024-01-15T09:00`, `2024-01-15T18:00` | `true` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_DATE_38 | `isSameDay` | Xác minh so sánh cùng ngày (bỏ qua giờ) cho calendar và filter — PLAN mục 4.3. | Khác ngày → false | `2024-01-15`, `2024-01-16` | `false` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_DATE_39 | `isSameDay` | Xác minh so sánh cùng ngày (bỏ qua giờ) cho calendar và filter — PLAN mục 4.3. | Cuối tháng 1 vs đầu tháng 2 → false | `2024-01-31T23:59:59`, `2024-02-01T00:00:00` | `false` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_DATE_40 | `isSameDay` | Xác minh so sánh cùng ngày (bỏ qua giờ) cho calendar và filter — PLAN mục 4.3. | Cùng ngày, cùng giờ → true | `d = 2024-06-15T12:00`, so sánh với chính nó | `true` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |

### getToday / getTomorrow / getYesterday

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_DATE_41 | `getToday` | Xác minh neo mốc hôm nay / mai / hôm qua nhất quán múi giờ local — PLAN mục 4.3. | Trả về 00:00:00 | — | `getHours()=0, getMinutes()=0, getSeconds()=0` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_DATE_42 | `getTomorrow` | Xác minh neo mốc hôm nay / mai / hôm qua nhất quán múi giờ local — PLAN mục 4.3. | = getToday + 1 ngày | — | `daysBetween(today, tomorrow) = 1` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_DATE_43 | `getYesterday` | Xác minh neo mốc hôm nay / mai / hôm qua nhất quán múi giờ local — PLAN mục 4.3. | = getToday - 1 ngày | — | `daysBetween(yesterday, today) = 1` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_DATE_44 | `getToday` + `getTomorrow` | Xác minh neo mốc hôm nay / mai / hôm qua nhất quán múi giờ local — PLAN mục 4.3. | getToday < getTomorrow | — | `getToday() < getTomorrow() = true` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_DATE_45 | `getYesterday` + `getToday` | Xác minh neo mốc hôm nay / mai / hôm qua nhất quán múi giờ local — PLAN mục 4.3. | getYesterday < getToday | — | `getYesterday() < getToday() = true` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |

### formatRelativeTime

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_DATE_46 | `formatRelativeTime` | Xác minh chuỗi thời gian tương đối (FR-NOTIF / activity UI) — PLAN mục 4.3. | 10 giây trước → "vừa xong" | offset: `-10s` | `"vừa xong"` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_DATE_47 | `formatRelativeTime` | Xác minh chuỗi thời gian tương đối (FR-NOTIF / activity UI) — PLAN mục 4.3. | 5 phút trước | offset: `-5 * 60s` | `"5 phút trước"` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_DATE_48 | `formatRelativeTime` | Xác minh chuỗi thời gian tương đối (FR-NOTIF / activity UI) — PLAN mục 4.3. | 3 giờ trước | offset: `-3 * 3600s` | `"3 giờ trước"` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_DATE_49 | `formatRelativeTime` | Xác minh chuỗi thời gian tương đối (FR-NOTIF / activity UI) — PLAN mục 4.3. | 2 ngày trước | offset: `-2 * 86400s` | `"2 ngày trước"` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_DATE_50 | `formatRelativeTime` | Xác minh chuỗi thời gian tương đối (FR-NOTIF / activity UI) — PLAN mục 4.3. | 30 giây nữa → "ngay bây giờ" | offset: `+30s` | `"ngay bây giờ"` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_DATE_51 | `formatRelativeTime` | Xác minh chuỗi thời gian tương đối (FR-NOTIF / activity UI) — PLAN mục 4.3. | 15 phút nữa | offset: `+15 * 60s` | `"trong 15 phút"` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_DATE_52 | `formatRelativeTime` | Xác minh chuỗi thời gian tương đối (FR-NOTIF / activity UI) — PLAN mục 4.3. | 2 giờ nữa | offset: `+2 * 3600s` | `"trong 2 giờ"` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_DATE_53 | `formatRelativeTime` | Xác minh chuỗi thời gian tương đối (FR-NOTIF / activity UI) — PLAN mục 4.3. | 5 ngày nữa | offset: `+5 * 86400s` | `"trong 5 ngày"` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |

### formatDateToYYYYMMDD

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_DATE_54 | `formatDateToYYYYMMDD` | Xác minh định dạng ngày YYYY-MM-DD cho export và query — PLAN mục 4.3. | Valid date → "YYYY-MM-DD" | `new Date("2024-03-15")` | match `/^\d{4}-\d{2}-\d{2}$/`, chứa `"2024"` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_DATE_55 | `formatDateToYYYYMMDD` | Xác minh định dạng ngày YYYY-MM-DD cho export và query — PLAN mục 4.3. | Invalid date → null | `"invalid"` | `null` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_DATE_56 | `formatDateToYYYYMMDD` | Xác minh định dạng ngày YYYY-MM-DD cho export và query — PLAN mục 4.3. | null → null | `null` | `null` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |

### isPastDate / isFutureDate

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_DATE_57 | `isPastDate` | Xác minh phân loại quá khứ / tương lai phục vụ hạn task và reminder — PLAN mục 4.3. | Hôm qua → true | `getYesterday()` | `true` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_DATE_58 | `isFutureDate` | Xác minh phân loại quá khứ / tương lai phục vụ hạn task và reminder — PLAN mục 4.3. | Ngày mai → true | `getTomorrow()` | `true` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_DATE_59 | `isFutureDate` | Xác minh phân loại quá khứ / tương lai phục vụ hạn task và reminder — PLAN mục 4.3. | Hôm qua → false | `getYesterday()` | `false` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_DATE_60 | `isPastDate` | Xác minh phân loại quá khứ / tương lai phục vụ hạn task và reminder — PLAN mục 4.3. | null → false | `null` | `false` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_DATE_61 | `isFutureDate` | Xác minh phân loại quá khứ / tương lai phục vụ hạn task và reminder — PLAN mục 4.3. | null → false | `null` | `false` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |

### parseDate

| ID | Chức năng / Phương thức | Mục tiêu kiểm thử | Trường hợp test | Dữ liệu vào | Kết quả mong đợi | Kết quả thực tế | Pass/Fail | Ghi chú |
|----|------------------------|-------------------|-----------------|-------------|-----------------|-----------------|-----------|---------|
| UT_DATE_62 | `parseDate` | Xác minh parse chuỗi ngày an toàn (invalid → null) — PLAN mục 4.3. | null → null | `null` | `null` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_DATE_63 | `parseDate` | Xác minh parse chuỗi ngày an toàn (invalid → null) — PLAN mục 4.3. | Date object → same object | `d = new Date()` | `result === d` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_DATE_64 | `parseDate` | Xác minh parse chuỗi ngày an toàn (invalid → null) — PLAN mục 4.3. | Valid date string → Date object | `"2024-01-15"` | `instanceof Date`, `isValidDate(result) = true` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |
| UT_DATE_65 | `parseDate` | Xác minh parse chuỗi ngày an toàn (invalid → null) — PLAN mục 4.3. | Invalid date string → null | `"not-a-date"` | `null` | Khớp kết quả mong đợi | ✅ Pass | `mockdata` |

---

## BUG LIST

| Bug ID | Test Case | Mô tả lỗi | Severity | Status |
|--------|-----------|-----------|----------|--------|
| BUG-002 | UT_DATE_11 | `isValidDate('2024-02-30')` trả về `true` — JS Date tự rollover ngày không tồn tại sang ngày hợp lệ tiếp theo (Mar 1) | Medium | Open |

---

## NHẬN XÉT KẾT QUẢ TEST

Bộ test date helper bao phủ tốt các nhánh biên (leap year, boundary ngày/giờ, định dạng). Hiện có 64/65 case pass; case fail `UT_DATE_11` là tín hiệu kỹ thuật hữu ích để team quyết định giữa giữ behavior JS hiện tại hay siết validate theo spec nghiệp vụ.

---

## RATIONALE - WHY THIS CHECKLIST DOES NOT USE DB CHECK

Lý do chung:

- Theo `INTEGRATION_CHECKLIST_TRACEABILITY.md`, `INTEGRATION_DB_ROLLBACK_FEASIBILITY_REPORT.md`, `PLAN.md`: toàn bộ `UT_DATE_*` thuộc nhóm unit-only.
- Đây là utility thuần ngày giờ, không có DB contract hoặc persistence side effect để assert.

Trường hợp đặc biệt:

- Các input ngày không tồn tại (ví dụ `2024-02-30`) phụ thuộc behavior rollover của JavaScript Date; cần giữ unit test để kiểm soát expected behavior theo spec.

