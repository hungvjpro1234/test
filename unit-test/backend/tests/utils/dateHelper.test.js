/**
 * Unit Tests: dateHelper.js
 * Source: backend/src/utils/dateHelper.js
 *
 * Test các hàm xử lý ngày tháng — được dùng trong:
 * - FR-TASK-6: Calendar view (getFirstDayOfMonth, getLastDayOfMonth)
 * - FR-TASK-9: Repeat task scheduling (addDays, addHours)
 * - FR-NOTIF-5.8: Task due soon notification (daysBetween)
 */

const path = require('path');
const {
  isValidDate,
  isPastDate,
  isFutureDate,
  formatDateToYYYYMMDD,
  getFirstDayOfMonth,
  getLastDayOfMonth,
  addDays,
  addHours,
  daysBetween,
  hoursBetween,
  isSameDay,
  getToday,
  getTomorrow,
  getYesterday,
  formatRelativeTime,
  parseDate
} = require(path.resolve(__dirname, '../../../../backend/src/utils/dateHelper'));

// ============================================================
// isValidDate
// ============================================================
describe('isValidDate', () => {
  describe('Falsy / invalid input', () => {
    // UT_DATE_01
    it('null → false', () => {
      expect(isValidDate(null)).toBe(false);
    });

    // UT_DATE_02
    it('undefined → false', () => {
      expect(isValidDate(undefined)).toBe(false);
    });

    // UT_DATE_03
    it('empty string → false', () => {
      expect(isValidDate('')).toBe(false);
    });

    // UT_DATE_04
    it('"not-a-date" → false', () => {
      expect(isValidDate('not-a-date')).toBe(false);
    });

    // UT_DATE_05
    it('"0000-00-00" (invalid date) → false', () => {
      // Ngày 0 tháng 0 không hợp lệ
      expect(isValidDate('0000-00-00')).toBe(false);
    });
  });

  describe('Valid dates', () => {
    // UT_DATE_06
    it('new Date() → true', () => {
      expect(isValidDate(new Date())).toBe(true);
    });

    // UT_DATE_07
    it('"2024-01-15" ISO string → true', () => {
      expect(isValidDate('2024-01-15')).toBe(true);
    });

    // UT_DATE_08
    it('Unix timestamp (number) → true', () => {
      expect(isValidDate(1700000000000)).toBe(true);
    });

    // UT_DATE_09
    it('"2024-02-29" (năm nhuận 2024) → true', () => {
      expect(isValidDate('2024-02-29')).toBe(true);
    });
  });

  describe('Edge cases', () => {
    // UT_DATE_10
    it('"2023-02-29" — JavaScript tự rollover sang Mar 1 2023 → isValidDate trả về true', () => {
      // NOTE: new Date('2023-02-29') tạo ra Mar 1 2023 (rollover) → isNaN = false → valid
      // isValidDate chỉ check NaN, không validate calendar correctness
      // Đây là known behavior của JS Date parsing — test document hành vi thực tế
      expect(isValidDate('2023-02-29')).toBe(true);
    });

    /**
     * ⚠️ TEST NÀY CÓ THỂ FAIL — đây là MONG MUỐN, expose giới hạn của isValidDate.
     *
     * Theo PLAN spec (mục 4.3, case 6): '2024-02-30' → false (Feb 30 không tồn tại)
     *
     * Actual behavior: new Date('2024-02-30') → Mar 1, 2024 (JS Date rollover)
     * isValidDate chỉ check isNaN nên trả về true.
     *
     * Nếu test FAIL: isValidDate không validate calendar correctness — cần cân nhắc
     * thêm logic kiểm tra ngày-tháng thực tế (ví dụ: compare getDate() sau parse).
     * SRS ref: validateTaskDates dựa vào isValidDate — nếu isValidDate accept ngày ảo,
     * thì task có thể có dueDate/startDate không hợp lệ về lịch.
     */
    // UT_DATE_11
    it('"2024-02-30" — ngày không tồn tại → phải false theo SRS PLAN spec', () => {
      expect(isValidDate('2024-02-30')).toBe(false);
    });
  });
});

// ============================================================
// getFirstDayOfMonth + getLastDayOfMonth — FR-TASK-6
// ============================================================
describe('getFirstDayOfMonth', () => {
  // UT_DATE_12
  it('Tháng 1/2024 → ngày 1/1/2024', () => {
    const result = getFirstDayOfMonth(2024, 1);
    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(0); // 0-indexed
    expect(result.getDate()).toBe(1);
  });

  // UT_DATE_13
  it('Tháng 12/2024 → ngày 1/12/2024', () => {
    const result = getFirstDayOfMonth(2024, 12);
    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(11);
    expect(result.getDate()).toBe(1);
  });

  // UT_DATE_14
  it('Tháng 2/2024 → ngày 1/2/2024', () => {
    const result = getFirstDayOfMonth(2024, 2);
    expect(result.getDate()).toBe(1);
    expect(result.getMonth()).toBe(1);
  });
});

describe('getLastDayOfMonth', () => {
  // UT_DATE_15
  it('Tháng 1/2024 → ngày 31', () => {
    const result = getLastDayOfMonth(2024, 1);
    expect(result.getDate()).toBe(31);
    expect(result.getMonth()).toBe(0);
  });

  // UT_DATE_16
  it('Tháng 2/2024 (năm nhuận) → ngày 29', () => {
    const result = getLastDayOfMonth(2024, 2);
    expect(result.getDate()).toBe(29);
  });

  // UT_DATE_17
  it('Tháng 2/2023 (không nhuận) → ngày 28', () => {
    const result = getLastDayOfMonth(2023, 2);
    expect(result.getDate()).toBe(28);
  });

  // UT_DATE_18
  it('Tháng 12/2024 → ngày 31', () => {
    const result = getLastDayOfMonth(2024, 12);
    expect(result.getDate()).toBe(31);
    expect(result.getMonth()).toBe(11);
  });

  // UT_DATE_19
  it('Giờ cuối ngày: 23:59:59.999', () => {
    const result = getLastDayOfMonth(2024, 1);
    expect(result.getHours()).toBe(23);
    expect(result.getMinutes()).toBe(59);
    expect(result.getSeconds()).toBe(59);
    expect(result.getMilliseconds()).toBe(999);
  });

  // UT_DATE_20
  it('First day < Last day trong cùng tháng', () => {
    const first = getFirstDayOfMonth(2024, 3);
    const last = getLastDayOfMonth(2024, 3);
    expect(first < last).toBe(true);
  });
});

// ============================================================
// addDays + addHours
// ============================================================
describe('addDays', () => {
  const baseDate = new Date('2024-06-15T12:00:00Z');

  // UT_DATE_21
  it('Thêm 1 ngày → ngày hôm sau', () => {
    const result = addDays(baseDate, 1);
    expect(result.getDate()).toBe(16);
  });

  // UT_DATE_22
  it('Thêm 0 ngày → y nguyên', () => {
    const result = addDays(baseDate, 0);
    expect(result.getTime()).toBe(baseDate.getTime());
  });

  // UT_DATE_23
  it('Thêm -1 ngày → ngày hôm trước', () => {
    const result = addDays(baseDate, -1);
    expect(result.getDate()).toBe(14);
  });

  // UT_DATE_24
  it('Không mutate date gốc', () => {
    const original = new Date('2024-01-15');
    addDays(original, 5);
    expect(original.getDate()).toBe(15);
  });

  // UT_DATE_25
  it('Qua tháng mới', () => {
    const lastJan = new Date('2024-01-31');
    const result = addDays(lastJan, 1);
    expect(result.getMonth()).toBe(1); // February
    expect(result.getDate()).toBe(1);
  });
});

describe('addHours', () => {
  const baseDate = new Date('2024-01-15T10:00:00Z');

  // UT_DATE_26
  it('Thêm 1 giờ', () => {
    const result = addHours(baseDate, 1);
    expect(result.getUTCHours()).toBe(11);
  });

  // UT_DATE_27
  it('Thêm 24 giờ = +1 ngày', () => {
    const result = addHours(baseDate, 24);
    expect(result.getUTCDate()).toBe(16);
  });

  // UT_DATE_28
  it('Thêm -1 giờ → giờ trước', () => {
    const result = addHours(baseDate, -1);
    expect(result.getUTCHours()).toBe(9);
  });

  // UT_DATE_29
  it('Không mutate date gốc', () => {
    const original = new Date('2024-01-15T10:00:00Z');
    addHours(original, 3);
    expect(original.getUTCHours()).toBe(10);
  });
});

// ============================================================
// daysBetween + hoursBetween
// ============================================================
describe('daysBetween', () => {
  // UT_DATE_30
  it('Same date → 0', () => {
    const d = new Date('2024-01-15');
    expect(daysBetween(d, d)).toBe(0);
  });

  // UT_DATE_31
  it('date2 = date1 + 1 day → 1', () => {
    const d1 = new Date('2024-01-15');
    const d2 = new Date('2024-01-16');
    expect(daysBetween(d1, d2)).toBe(1);
  });

  // UT_DATE_32
  it('date2 = date1 - 2 days → -2', () => {
    const d1 = new Date('2024-01-15');
    const d2 = new Date('2024-01-13');
    expect(daysBetween(d1, d2)).toBe(-2);
  });

  // UT_DATE_33
  it('Cross-month boundary', () => {
    const d1 = new Date('2024-01-30');
    const d2 = new Date('2024-02-01');
    expect(daysBetween(d1, d2)).toBe(2);
  });
});

describe('hoursBetween', () => {
  // UT_DATE_34
  it('Same time → 0', () => {
    const d = new Date('2024-01-15T10:00:00Z');
    expect(hoursBetween(d, d)).toBe(0);
  });

  // UT_DATE_35
  it('Diff 2 giờ → 2', () => {
    const d1 = new Date('2024-01-15T10:00:00Z');
    const d2 = new Date('2024-01-15T12:00:00Z');
    expect(hoursBetween(d1, d2)).toBe(2);
  });

  // UT_DATE_36
  it('Ngược chiều → âm', () => {
    const d1 = new Date('2024-01-15T12:00:00Z');
    const d2 = new Date('2024-01-15T10:00:00Z');
    expect(hoursBetween(d1, d2)).toBe(-2);
  });
});

// ============================================================
// isSameDay
// ============================================================
describe('isSameDay', () => {
  // UT_DATE_37
  it('Cùng ngày, khác giờ → true', () => {
    const d1 = new Date('2024-01-15T09:00:00');
    const d2 = new Date('2024-01-15T18:00:00');
    expect(isSameDay(d1, d2)).toBe(true);
  });

  // UT_DATE_38
  it('Khác ngày → false', () => {
    const d1 = new Date('2024-01-15');
    const d2 = new Date('2024-01-16');
    expect(isSameDay(d1, d2)).toBe(false);
  });

  // UT_DATE_39
  it('Cuối tháng 1 vs đầu tháng 2 → false', () => {
    const d1 = new Date('2024-01-31T23:59:59');
    const d2 = new Date('2024-02-01T00:00:00');
    expect(isSameDay(d1, d2)).toBe(false);
  });

  // UT_DATE_40
  it('Cùng ngày, cùng giờ → true', () => {
    const d = new Date('2024-06-15T12:00:00');
    expect(isSameDay(d, d)).toBe(true);
  });
});

// ============================================================
// getToday, getTomorrow, getYesterday
// ============================================================
describe('getToday / getTomorrow / getYesterday', () => {
  // UT_DATE_41
  it('getToday → giờ là 00:00:00', () => {
    const today = getToday();
    expect(today.getHours()).toBe(0);
    expect(today.getMinutes()).toBe(0);
    expect(today.getSeconds()).toBe(0);
  });

  // UT_DATE_42
  it('getTomorrow = getToday + 1 ngày', () => {
    const today = getToday();
    const tomorrow = getTomorrow();
    expect(daysBetween(today, tomorrow)).toBe(1);
  });

  // UT_DATE_43
  it('getYesterday = getToday - 1 ngày', () => {
    const today = getToday();
    const yesterday = getYesterday();
    expect(daysBetween(yesterday, today)).toBe(1);
  });

  // UT_DATE_44
  it('getToday < getTomorrow', () => {
    expect(getToday() < getTomorrow()).toBe(true);
  });

  // UT_DATE_45
  it('getYesterday < getToday', () => {
    expect(getYesterday() < getToday()).toBe(true);
  });
});

// ============================================================
// formatRelativeTime
// ============================================================
describe('formatRelativeTime', () => {
  const getDateOffset = (seconds) => {
    const d = new Date();
    d.setSeconds(d.getSeconds() + seconds);
    return d;
  };

  describe('Quá khứ', () => {
    // UT_DATE_46
    it('10 giây trước → "vừa xong"', () => {
      const past = getDateOffset(-10);
      expect(formatRelativeTime(past)).toBe('vừa xong');
    });

    // UT_DATE_47
    it('5 phút trước → "5 phút trước"', () => {
      const past = getDateOffset(-5 * 60);
      expect(formatRelativeTime(past)).toBe('5 phút trước');
    });

    // UT_DATE_48
    it('3 giờ trước → "3 giờ trước"', () => {
      const past = getDateOffset(-3 * 3600);
      expect(formatRelativeTime(past)).toBe('3 giờ trước');
    });

    // UT_DATE_49
    it('2 ngày trước → "2 ngày trước"', () => {
      const past = getDateOffset(-2 * 86400);
      expect(formatRelativeTime(past)).toBe('2 ngày trước');
    });
  });

  describe('Tương lai', () => {
    // UT_DATE_50
    it('30 giây nữa → "ngay bây giờ"', () => {
      const future = getDateOffset(30);
      expect(formatRelativeTime(future)).toBe('ngay bây giờ');
    });

    // UT_DATE_51
    it('15 phút nữa → "trong 15 phút"', () => {
      const future = getDateOffset(15 * 60);
      expect(formatRelativeTime(future)).toBe('trong 15 phút');
    });

    // UT_DATE_52
    it('2 giờ nữa → "trong 2 giờ"', () => {
      const future = getDateOffset(2 * 3600);
      expect(formatRelativeTime(future)).toBe('trong 2 giờ');
    });

    // UT_DATE_53
    it('5 ngày nữa → "trong 5 ngày"', () => {
      const future = getDateOffset(5 * 86400);
      expect(formatRelativeTime(future)).toBe('trong 5 ngày');
    });
  });
});

// ============================================================
// formatDateToYYYYMMDD
// ============================================================
describe('formatDateToYYYYMMDD', () => {
  // UT_DATE_54
  it('Valid date → "YYYY-MM-DD" format', () => {
    const d = new Date('2024-03-15');
    const result = formatDateToYYYYMMDD(d);
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(result).toContain('2024');
  });

  // UT_DATE_55
  it('Invalid date → null', () => {
    expect(formatDateToYYYYMMDD('invalid')).toBe(null);
  });

  // UT_DATE_56
  it('null → null', () => {
    expect(formatDateToYYYYMMDD(null)).toBe(null);
  });
});

// ============================================================
// isPastDate + isFutureDate
// ============================================================
describe('isPastDate / isFutureDate', () => {
  // UT_DATE_57
  it('Ngày hôm qua → isPastDate = true', () => {
    expect(isPastDate(getYesterday())).toBe(true);
  });

  // UT_DATE_58
  it('Ngày mai → isFutureDate = true', () => {
    expect(isFutureDate(getTomorrow())).toBe(true);
  });

  // UT_DATE_59
  it('Ngày hôm qua → isFutureDate = false', () => {
    expect(isFutureDate(getYesterday())).toBe(false);
  });

  // UT_DATE_60
  it('null → isPastDate = false', () => {
    expect(isPastDate(null)).toBe(false);
  });

  // UT_DATE_61
  it('null → isFutureDate = false', () => {
    expect(isFutureDate(null)).toBe(false);
  });
});

// ============================================================
// parseDate
// ============================================================
describe('parseDate', () => {
  // UT_DATE_62
  it('null → null', () => {
    expect(parseDate(null)).toBe(null);
  });

  // UT_DATE_63
  it('Date object → same object', () => {
    const d = new Date();
    expect(parseDate(d)).toBe(d);
  });

  // UT_DATE_64
  it('Valid date string → Date object', () => {
    const result = parseDate('2024-01-15');
    expect(result).toBeInstanceOf(Date);
    expect(isValidDate(result)).toBe(true);
  });

  // UT_DATE_65
  it('Invalid date string → null', () => {
    expect(parseDate('not-a-date')).toBe(null);
  });
});
