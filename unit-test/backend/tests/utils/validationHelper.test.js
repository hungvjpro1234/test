/**
 * Unit Tests: validationHelper.js
 * Source: backend/src/utils/validationHelper.js
 *
 * Test các hàm validation — trực tiếp map đến constraints trong SRS v3.0:
 * - FR-AUTH-1.3: email hợp lệ
 * - FR-AUTH-1.4: mật khẩu đủ điều kiện (8+, hoa, thường, số, ký tự đặc biệt)
 * - FR-TASK-1.5: trạng thái hợp lệ
 * - FR-TASK-1.6: độ ưu tiên hợp lệ
 * - C-6 đến C-12: giới hạn số ký tự, số lượng items
 * - NFR-PERF-2: phân trang
 */

const path = require('path');
const {
  validatePassword,
  isValidEmail,
  isValidObjectId,
  isValidTaskStatus,
  isValidTaskPriority,
  isValidColor,
  isValidLength,
  isValidUrl,
  validateTaskDates,
  validatePagination,
  validateSort,
  sanitizeEnumArray,
  sanitizeSort,
  sanitizeString,
  isNonEmptyArray,
  isNonEmptyObject
} = require(path.resolve(__dirname, '../../../../backend/src/utils/validationHelper'));

// ============================================================
// validatePassword — FR-AUTH-1.4
// ============================================================
describe('validatePassword', () => {
  describe('Input rỗng / null', () => {
    // UT_VALID_01
    it('null → invalid', () => {
      const result = validatePassword(null);
      expect(result.isValid).toBe(false);
    });

    // UT_VALID_02
    it('undefined → invalid', () => {
      const result = validatePassword(undefined);
      expect(result.isValid).toBe(false);
    });

    // UT_VALID_03
    it('empty string → invalid', () => {
      const result = validatePassword('');
      expect(result.isValid).toBe(false);
    });
  });

  describe('Độ dài (yêu cầu tối thiểu 8 ký tự)', () => {
    // UT_VALID_04
    it('7 ký tự → invalid', () => {
      const result = validatePassword('Aa1!aaa');
      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('8 characters'))).toBe(true);
    });

    // UT_VALID_05
    it('Đúng 8 ký tự hợp lệ → valid', () => {
      const result = validatePassword('Aa1!aaaa');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    // UT_VALID_06
    it('Dài hơn 8 ký tự → valid nếu đủ điều kiện', () => {
      const result = validatePassword('ValidPass123!extra');
      expect(result.isValid).toBe(true);
    });
  });

  describe('Thiếu chữ hoa', () => {
    // UT_VALID_07
    it('Không có uppercase → invalid', () => {
      const result = validatePassword('alllower1!aa');
      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('uppercase'))).toBe(true);
    });
  });

  describe('Thiếu chữ thường', () => {
    // UT_VALID_08
    it('Không có lowercase → invalid', () => {
      const result = validatePassword('ALLUPPERCASE1!');
      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('lowercase'))).toBe(true);
    });
  });

  describe('Thiếu số', () => {
    // UT_VALID_09
    it('Không có số → invalid', () => {
      const result = validatePassword('NoNumbers!aA');
      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('number'))).toBe(true);
    });
  });

  describe('Thiếu ký tự đặc biệt', () => {
    // UT_VALID_10
    it('Không có special char → invalid', () => {
      const result = validatePassword('NoSpecial1aA');
      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('special character'))).toBe(true);
    });
  });

  describe('Nhiều lỗi cùng lúc', () => {
    // UT_VALID_11
    it('Password "12345" → có nhiều lỗi', () => {
      const result = validatePassword('12345');
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(1);
    });
  });

  describe('Password hợp lệ', () => {
    // UT_VALID_12
    it('Valid1! (8 chars) → valid', () => {
      const result = validatePassword('Valid1!A');
      expect(result.isValid).toBe(true);
    });

    // UT_VALID_13
    it('Test@123 → valid', () => {
      const result = validatePassword('Test@123');
      expect(result.isValid).toBe(true);
    });

    // UT_VALID_14
    it('Với các ký tự đặc biệt khác nhau → valid', () => {
      expect(validatePassword('Abc#1234').isValid).toBe(true);
      expect(validatePassword('Abc$1234').isValid).toBe(true);
      expect(validatePassword('Abc%1234').isValid).toBe(true);
      expect(validatePassword('Abc^1234').isValid).toBe(true);
      expect(validatePassword('Abc&1234').isValid).toBe(true);
      expect(validatePassword('Abc*1234').isValid).toBe(true);
    });
  });
});

// ============================================================
// isValidEmail — FR-AUTH-1.3
// ============================================================
describe('isValidEmail', () => {
  describe('Falsy input', () => {
    // UT_VALID_15
    it('null → false', () => {
      expect(isValidEmail(null)).toBe(false);
    });

    // UT_VALID_16
    it('empty string → false', () => {
      expect(isValidEmail('')).toBe(false);
    });
  });

  describe('Email không hợp lệ', () => {
    // UT_VALID_17
    it('Không có @ → false', () => {
      expect(isValidEmail('notanemail')).toBe(false);
    });

    // UT_VALID_18
    it('@ nhưng không có domain → false', () => {
      expect(isValidEmail('user@')).toBe(false);
    });

    // UT_VALID_19
    it('Không có local part → false', () => {
      expect(isValidEmail('@domain.com')).toBe(false);
    });

    // UT_VALID_20
    it('Có khoảng trắng → false', () => {
      expect(isValidEmail('user name@domain.com')).toBe(false);
    });

    // UT_VALID_21
    it('Không có TLD → false (không có dấu chấm sau @)', () => {
      // pattern yêu cầu [^\s@]+@[^\s@]+\.[^\s@]+
      expect(isValidEmail('user@domain')).toBe(false);
    });
  });

  describe('Email hợp lệ', () => {
    // UT_VALID_22
    it('Format cơ bản → true', () => {
      expect(isValidEmail('user@domain.com')).toBe(true);
    });

    // UT_VALID_23
    it('Với subdomain → true', () => {
      expect(isValidEmail('user@sub.domain.com')).toBe(true);
    });

    // UT_VALID_24
    it('Với dấu chấm trong local → true', () => {
      expect(isValidEmail('user.name@domain.com')).toBe(true);
    });

    // UT_VALID_25
    it('Với ký tự + trong local → true', () => {
      expect(isValidEmail('user+tag@domain.com')).toBe(true);
    });
  });
});

// ============================================================
// isValidObjectId
// ============================================================
describe('isValidObjectId', () => {
  describe('Falsy input', () => {
    // UT_VALID_26
    it('null → false', () => {
      expect(isValidObjectId(null)).toBe(false);
    });

    // UT_VALID_27
    it('empty string → false', () => {
      expect(isValidObjectId('')).toBe(false);
    });

    // UT_VALID_28
    it('undefined → false', () => {
      expect(isValidObjectId(undefined)).toBe(false);
    });
  });

  describe('Invalid format', () => {
    // UT_VALID_29
    it('Quá ngắn → false', () => {
      expect(isValidObjectId('abc123')).toBe(false);
    });

    // UT_VALID_30
    it('Có ký tự không phải hex → false', () => {
      expect(isValidObjectId('507f1f77bcf86cd79943901z')).toBe(false);
    });

    // UT_VALID_31
    it('25 ký tự (quá dài) → false', () => {
      expect(isValidObjectId('507f1f77bcf86cd799439011a')).toBe(false);
    });
  });

  describe('Valid ObjectId', () => {
    // UT_VALID_32
    it('24 ký tự hex lowercase → true', () => {
      expect(isValidObjectId('507f1f77bcf86cd799439011')).toBe(true);
    });

    // UT_VALID_33
    it('24 ký tự hex uppercase → true', () => {
      expect(isValidObjectId('FFFFFFFFFFFFFFFFFFFFFFFF')).toBe(true);
    });

    // UT_VALID_34
    it('24 ký tự hex mixed case → true', () => {
      expect(isValidObjectId('507F1f77BCf86cd799439011')).toBe(true);
    });

    // UT_VALID_35
    it('All zeros → true (technically valid hex)', () => {
      expect(isValidObjectId('000000000000000000000000')).toBe(true);
    });
  });
});

// ============================================================
// isValidTaskStatus — FR-TASK-1.5
// ============================================================
describe('isValidTaskStatus', () => {
  describe('Valid statuses', () => {
    // Code dùng title-case: ['Todo', 'In Progress', 'Completed', 'Archived']
    // UT_VALID_36
    it('"Todo" → true', () => {
      expect(isValidTaskStatus('Todo')).toBe(true);
    });

    // UT_VALID_37
    it('"In Progress" → true', () => {
      expect(isValidTaskStatus('In Progress')).toBe(true);
    });

    // UT_VALID_38
    it('"Completed" → true', () => {
      expect(isValidTaskStatus('Completed')).toBe(true);
    });

    // UT_VALID_39
    it('"Archived" → true', () => {
      expect(isValidTaskStatus('Archived')).toBe(true);
    });
  });

  describe('Invalid statuses', () => {
    // UT_VALID_40
    it('"todo" (lowercase) → false', () => {
      expect(isValidTaskStatus('todo')).toBe(false);
    });

    // UT_VALID_41
    it('"done" → false', () => {
      expect(isValidTaskStatus('done')).toBe(false);
    });

    // UT_VALID_42
    it('"pending" → false', () => {
      expect(isValidTaskStatus('pending')).toBe(false);
    });

    // UT_VALID_43
    it('empty string → false', () => {
      expect(isValidTaskStatus('')).toBe(false);
    });

    // UT_VALID_44
    it('null → false', () => {
      expect(isValidTaskStatus(null)).toBe(false);
    });
  });
});

// ============================================================
// isValidTaskPriority — FR-TASK-1.6
// ============================================================
describe('isValidTaskPriority', () => {
  describe('Valid priorities', () => {
    // UT_VALID_45
    it('"Low" → true', () => {
      expect(isValidTaskPriority('Low')).toBe(true);
    });

    // UT_VALID_46
    it('"Medium" → true', () => {
      expect(isValidTaskPriority('Medium')).toBe(true);
    });

    // UT_VALID_47
    it('"High" → true', () => {
      expect(isValidTaskPriority('High')).toBe(true);
    });

    // UT_VALID_48
    it('"Urgent" → true', () => {
      expect(isValidTaskPriority('Urgent')).toBe(true);
    });
  });

  describe('Invalid priorities', () => {
    // UT_VALID_49
    it('"low" (lowercase) → false', () => {
      expect(isValidTaskPriority('low')).toBe(false);
    });

    // UT_VALID_50
    it('"Critical" → false (không có trong list)', () => {
      expect(isValidTaskPriority('Critical')).toBe(false);
    });

    // UT_VALID_51
    it('"URGENT" → false', () => {
      expect(isValidTaskPriority('URGENT')).toBe(false);
    });

    // UT_VALID_52
    it('null → false', () => {
      expect(isValidTaskPriority(null)).toBe(false);
    });

    // UT_VALID_53
    it('empty string → false', () => {
      expect(isValidTaskPriority('')).toBe(false);
    });
  });
});

// ============================================================
// isValidColor
// ============================================================
describe('isValidColor', () => {
  describe('Falsy input', () => {
    // UT_VALID_54
    it('null → false', () => {
      expect(isValidColor(null)).toBe(false);
    });

    // UT_VALID_55
    it('empty string → false', () => {
      expect(isValidColor('')).toBe(false);
    });
  });

  describe('Valid hex colors', () => {
    // UT_VALID_56
    it('#FFF (3 ký tự) → true', () => {
      expect(isValidColor('#FFF')).toBe(true);
    });

    // UT_VALID_57
    it('#FFFFFF (6 ký tự) → true', () => {
      expect(isValidColor('#FFFFFF')).toBe(true);
    });

    // UT_VALID_58
    it('#0a3F9c (mixed case) → true', () => {
      expect(isValidColor('#0a3F9c')).toBe(true);
    });

    // UT_VALID_59
    it('#000 → true', () => {
      expect(isValidColor('#000')).toBe(true);
    });
  });

  describe('Invalid colors', () => {
    // UT_VALID_60
    it('FFF (không có #) → false', () => {
      expect(isValidColor('FFF')).toBe(false);
    });

    // UT_VALID_61
    it('#GGG (invalid hex chars) → false', () => {
      expect(isValidColor('#GGG')).toBe(false);
    });

    // UT_VALID_62
    it('#FFFFFFF (7 ký tự — quá dài) → false', () => {
      expect(isValidColor('#FFFFFFF')).toBe(false);
    });

    // UT_VALID_63
    it('#FF (2 ký tự — quá ngắn) → false', () => {
      expect(isValidColor('#FF')).toBe(false);
    });

    // UT_VALID_64
    it('#FFFF (4 ký tự) → false', () => {
      expect(isValidColor('#FFFF')).toBe(false);
    });
  });
});

// ============================================================
// isValidLength
// ============================================================
describe('isValidLength', () => {
  describe('Falsy/empty input', () => {
    // UT_VALID_65
    it('null → false', () => {
      expect(isValidLength(null, 1, 10)).toBe(false);
    });

    // UT_VALID_66
    it('empty string với min=1 → false', () => {
      expect(isValidLength('', 1, 10)).toBe(false);
    });

    // UT_VALID_67
    it('spaces only với min=1 → false (vì trim)', () => {
      expect(isValidLength('   ', 1, 10)).toBe(false);
    });
  });

  describe('Trong giới hạn', () => {
    // UT_VALID_68
    it('Đúng min → true', () => {
      expect(isValidLength('a', 1, 10)).toBe(true);
    });

    // UT_VALID_69
    it('Đúng max → true', () => {
      expect(isValidLength('a'.repeat(10), 1, 10)).toBe(true);
    });

    // UT_VALID_70
    it('Trong khoảng → true', () => {
      expect(isValidLength('hello', 1, 100)).toBe(true);
    });
  });

  describe('Ngoài giới hạn', () => {
    // UT_VALID_71
    it('Ngắn hơn min → false', () => {
      expect(isValidLength('ab', 5, 10)).toBe(false);
    });

    // UT_VALID_72
    it('Dài hơn max → false', () => {
      // C-10: Tiêu đề task tối đa 200 ký tự
      expect(isValidLength('a'.repeat(201), 1, 200)).toBe(false);
    });

    // UT_VALID_73
    it('Đúng 200 ký tự → true (C-10 boundary)', () => {
      expect(isValidLength('a'.repeat(200), 1, 200)).toBe(true);
    });

    // UT_VALID_74
    it('201 ký tự → false (C-10 violation)', () => {
      expect(isValidLength('a'.repeat(201), 1, 200)).toBe(false);
    });
  });
});

// ============================================================
// validateTaskDates
// ============================================================
describe('validateTaskDates', () => {
  describe('Null inputs', () => {
    // UT_VALID_75
    it('Cả hai null → valid', () => {
      expect(validateTaskDates(null, null).isValid).toBe(true);
    });

    // UT_VALID_76
    it('Chỉ startDate null → valid', () => {
      expect(validateTaskDates(null, new Date()).isValid).toBe(true);
    });

    // UT_VALID_77
    it('Chỉ dueDate null → valid', () => {
      expect(validateTaskDates(new Date(), null).isValid).toBe(true);
    });
  });

  describe('Invalid date strings', () => {
    // UT_VALID_78
    it('Invalid startDate → invalid', () => {
      const result = validateTaskDates('not-a-date', null);
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    // UT_VALID_79
    it('Invalid dueDate → invalid', () => {
      const result = validateTaskDates(null, 'invalid');
      expect(result.isValid).toBe(false);
    });
  });

  describe('Valid dates', () => {
    // UT_VALID_80
    it('Cả hai là valid Date → valid', () => {
      const now = new Date();
      const later = new Date(now.getTime() + 86400000);
      expect(validateTaskDates(now, later).isValid).toBe(true);
    });

    // UT_VALID_81
    it('Valid date strings → valid', () => {
      expect(validateTaskDates('2024-01-01', '2024-12-31').isValid).toBe(true);
    });

    // UT_VALID_82
    it('dueDate TRƯỚC startDate → VẪN valid (no restriction per code)', () => {
      const later = new Date();
      const earlier = new Date(later.getTime() - 86400000);
      // Code comment: "Removed all due date restrictions"
      expect(validateTaskDates(later, earlier).isValid).toBe(true);
    });
  });
});

// ============================================================
// validatePagination — NFR-PERF-2
// ============================================================
describe('validatePagination', () => {
  describe('Default values', () => {
    // UT_VALID_83
    it('No input → defaults {page: 1, limit: 10}', () => {
      const result = validatePagination(undefined, undefined);
      expect(result.sanitizedPage).toBe(1);
      expect(result.sanitizedLimit).toBe(10);
    });

    // UT_VALID_84
    it('Non-numeric strings → defaults', () => {
      const result = validatePagination('abc', 'xyz');
      expect(result.sanitizedPage).toBe(1);
      expect(result.sanitizedLimit).toBe(10);
    });
  });

  describe('Page sanitization', () => {
    // UT_VALID_85
    it('page = 0 → sanitized to 1', () => {
      expect(validatePagination('0', '10').sanitizedPage).toBe(1);
    });

    // UT_VALID_86
    it('page = -1 → sanitized to 1', () => {
      expect(validatePagination('-1', '10').sanitizedPage).toBe(1);
    });

    // UT_VALID_87
    it('page = 5 → 5', () => {
      expect(validatePagination('5', '10').sanitizedPage).toBe(5);
    });
  });

  describe('Limit sanitization', () => {
    // UT_VALID_88
    it('limit = 0 → default (10)', () => {
      expect(validatePagination('1', '0').sanitizedLimit).toBe(10);
    });

    // UT_VALID_89
    it('limit = 200 → capped to 100', () => {
      expect(validatePagination('1', '200').sanitizedLimit).toBe(100);
    });

    // UT_VALID_90
    it('limit = 100 → 100 (boundary)', () => {
      expect(validatePagination('1', '100').sanitizedLimit).toBe(100);
    });

    // UT_VALID_91
    it('limit = 50 → 50', () => {
      expect(validatePagination('1', '50').sanitizedLimit).toBe(50);
    });
  });

  describe('Valid input', () => {
    // UT_VALID_92
    it('Thông thường → trả về đúng', () => {
      const result = validatePagination('3', '25');
      expect(result.sanitizedPage).toBe(3);
      expect(result.sanitizedLimit).toBe(25);
      expect(result.isValid).toBe(true);
    });
  });
});

// ============================================================
// sanitizeEnumArray — FR-TASK-1.7 (giới hạn nhãn)
// ============================================================
describe('sanitizeEnumArray', () => {
  const allowed = ['todo', 'in_progress', 'completed'];

  describe('Null/empty input', () => {
    // UT_VALID_93
    it('null values → { isValid: true, values: [] }', () => {
      const result = sanitizeEnumArray(null, allowed);
      expect(result.isValid).toBe(true);
      expect(result.values).toEqual([]);
    });

    // UT_VALID_94
    it('empty allowedValues → { isValid: true, values: [] }', () => {
      const result = sanitizeEnumArray(['todo'], []);
      expect(result.isValid).toBe(true);
    });
  });

  describe('Array input', () => {
    // UT_VALID_95
    it('Valid values → isValid: true', () => {
      const result = sanitizeEnumArray(['todo', 'completed'], allowed);
      expect(result.isValid).toBe(true);
      expect(result.values).toContain('todo');
    });

    // UT_VALID_96
    it('Invalid values → isValid: false', () => {
      const result = sanitizeEnumArray(['invalid_status'], allowed);
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    // UT_VALID_97
    it('Case-insensitive normalization', () => {
      const result = sanitizeEnumArray(['TODO'], allowed);
      expect(result.isValid).toBe(true);
      expect(result.values).toContain('todo');
    });

    // UT_VALID_98
    it('Deduplication', () => {
      const result = sanitizeEnumArray(['todo', 'todo', 'completed'], allowed);
      expect(result.isValid).toBe(true);
      expect(result.values).toEqual(['todo', 'completed']);
    });
  });

  describe('String input (comma-separated)', () => {
    // UT_VALID_99
    it('Comma-separated string → works', () => {
      const result = sanitizeEnumArray('todo,completed', allowed);
      expect(result.isValid).toBe(true);
      expect(result.values).toContain('todo');
      expect(result.values).toContain('completed');
    });
  });

  describe('maxItems enforcement — C-9 (tối đa 10 nhãn)', () => {
    const labels = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'];
    const allowedLabels = labels;

    // UT_VALID_100
    it('11 items với maxItems=10 → invalid', () => {
      const result = sanitizeEnumArray(labels, allowedLabels, 10);
      expect(result.isValid).toBe(false);
    });

    // UT_VALID_101
    it('10 items với maxItems=10 → valid (boundary)', () => {
      const result = sanitizeEnumArray(labels.slice(0, 10), allowedLabels, 10);
      expect(result.isValid).toBe(true);
    });
  });
});

// ============================================================
// sanitizeSort
// ============================================================
describe('sanitizeSort', () => {
  const allowedFields = ['createdAt', 'dueDate', 'priority'];

  describe('Null / no input', () => {
    // UT_VALID_102
    it('null → defaults', () => {
      const result = sanitizeSort(null, allowedFields);
      expect(result.isValid).toBe(true);
      expect(result.sortBy).toBe('createdAt');
      expect(result.order).toBe('desc');
    });

    // UT_VALID_103
    it('undefined → defaults', () => {
      const result = sanitizeSort(undefined, allowedFields);
      expect(result.isValid).toBe(true);
      expect(result.sortBy).toBe('createdAt');
    });
  });

  describe('Format "field:order"', () => {
    // UT_VALID_104
    it('"createdAt:asc" → valid, asc', () => {
      const result = sanitizeSort('createdAt:asc', allowedFields);
      expect(result.isValid).toBe(true);
      expect(result.sortBy).toBe('createdAt');
      expect(result.order).toBe('asc');
    });

    // UT_VALID_105
    it('"dueDate:desc" → valid, desc', () => {
      const result = sanitizeSort('dueDate:desc', allowedFields);
      expect(result.isValid).toBe(true);
      expect(result.sortBy).toBe('dueDate');
      expect(result.order).toBe('desc');
    });
  });

  describe('Prefix format "-field" và "+field"', () => {
    // UT_VALID_106
    it('"-createdAt" → sortBy=createdAt, order=desc', () => {
      const result = sanitizeSort('-createdAt', allowedFields);
      expect(result.isValid).toBe(true);
      expect(result.order).toBe('desc');
    });

    // UT_VALID_107
    it('"+dueDate" → sortBy=dueDate, order=asc', () => {
      const result = sanitizeSort('+dueDate', allowedFields);
      expect(result.isValid).toBe(true);
      expect(result.sortBy).toBe('dueDate');
      expect(result.order).toBe('asc');
    });
  });

  describe('Array input', () => {
    // UT_VALID_108
    it('["dueDate", "asc"] → valid', () => {
      const result = sanitizeSort(['dueDate', 'asc'], allowedFields);
      expect(result.isValid).toBe(true);
      expect(result.sortBy).toBe('dueDate');
      expect(result.order).toBe('asc');
    });
  });

  describe('Invalid field', () => {
    // UT_VALID_109
    it('Field không được phép → isValid: false', () => {
      const result = sanitizeSort('invalidField', allowedFields);
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('Invalid order → fallback to default', () => {
    // UT_VALID_110
    it('"createdAt:invalid" → order = desc (default)', () => {
      const result = sanitizeSort('createdAt:invalid', allowedFields);
      expect(result.isValid).toBe(true);
      expect(result.order).toBe('desc');
    });
  });

  describe('Custom default field và order', () => {
    // UT_VALID_111
    it('Custom defaults được dùng khi input null', () => {
      const result = sanitizeSort(null, allowedFields, 'dueDate', 'asc');
      expect(result.sortBy).toBe('dueDate');
      expect(result.order).toBe('asc');
    });
  });
});

// ============================================================
// sanitizeString
// ============================================================
describe('sanitizeString', () => {
  // UT_VALID_112
  it('null → empty string', () => {
    expect(sanitizeString(null)).toBe('');
  });

  // UT_VALID_113
  it('Removes HTML tags (giữ lại nội dung bên trong tag)', () => {
    // sanitizeString dùng /<[^>]*>/g → chỉ xóa thẻ tag, GIỮ content bên trong
    // '<script>alert(1)</script>hello' → 'alert(1)hello' (không phải 'hello')
    expect(sanitizeString('<script>alert(1)</script>hello')).toBe('alert(1)hello');
  });

  // UT_VALID_114
  it('Removes HTML element tags', () => {
    expect(sanitizeString('<b>bold</b>')).toBe('bold');
  });

  // UT_VALID_115
  it('Trims whitespace', () => {
    expect(sanitizeString('  hello  ')).toBe('hello');
  });

  // UT_VALID_116
  it('Plain text → unchanged (trimmed)', () => {
    expect(sanitizeString('normal text')).toBe('normal text');
  });
});

// ============================================================
// isValidUrl
// ============================================================
describe('isValidUrl', () => {
  // UT_VALID_117
  it('null → false', () => {
    expect(isValidUrl(null)).toBe(false);
  });

  // UT_VALID_118
  it('empty string → false', () => {
    expect(isValidUrl('')).toBe(false);
  });

  // UT_VALID_119
  it('Valid http URL → true', () => {
    expect(isValidUrl('http://example.com')).toBe(true);
  });

  // UT_VALID_120
  it('Valid https URL → true', () => {
    expect(isValidUrl('https://example.com/path?q=1')).toBe(true);
  });

  // UT_VALID_121
  it('No protocol → false', () => {
    expect(isValidUrl('example.com')).toBe(false);
  });
});

// ============================================================
// isNonEmptyArray + isNonEmptyObject
// ============================================================
describe('isNonEmptyArray', () => {
  // UT_VALID_122
  it('null → false', () => {
    expect(isNonEmptyArray(null)).toBe(false);
  });

  // UT_VALID_123
  it('[] → false', () => {
    expect(isNonEmptyArray([])).toBe(false);
  });

  // UT_VALID_124
  it('[1] → true', () => {
    expect(isNonEmptyArray([1])).toBe(true);
  });

  // UT_VALID_125
  it('String (not array) → false', () => {
    expect(isNonEmptyArray('abc')).toBe(false);
  });
});

describe('isNonEmptyObject', () => {
  // UT_VALID_126
  it('null → falsy (implementation trả về null via short-circuit)', () => {
    // isNonEmptyObject = (obj) => obj && typeof obj === 'object' && ...
    // null && ... → null (not boolean false), nên dùng toBeFalsy()
    expect(isNonEmptyObject(null)).toBeFalsy();
  });

  // UT_VALID_127
  it('{} → false', () => {
    expect(isNonEmptyObject({})).toBe(false);
  });

  // UT_VALID_128
  it('{ key: value } → true', () => {
    expect(isNonEmptyObject({ a: 1 })).toBe(true);
  });
});
