# UNIT TEST GUIDE

## Mục tiêu
- Repo này dùng chiến lược 2 lớp cho backend test:
  - `unit-test/backend/tests/**/*.test.js`: unit test mock-based cho pure logic, validation, permission matrix.
  - `unit-test/backend/tests-integration/**/*.int.test.js`: integration test dùng MongoDB thật để kiểm tra persistence, check DB và cleanup.
- Frontend giữ nguyên hướng unit test hiện tại.

## Cấu trúc chuẩn
```text
unit-test/
├── PLAN.md
├── backend/
│   ├── jest.config.js
│   ├── jest.integration.config.js
│   ├── package.json
│   ├── setup.js
│   ├── tests/
│   │   └── ...
│   └── tests-integration/
│       ├── _helpers/
│       │   ├── db.js
│       │   └── fixtures.js
│       └── services/
│           ├── note.service.int.test.js
│           └── task.service.int.test.js
└── docs/
    └── UNIT_TEST_REPORT.md
```

## Quy tắc cho integration test

### 1. DB test riêng
- Luôn dùng `MONGODB_URI_TEST`.
- Fallback mặc định: `mongodb://127.0.0.1:27017/todolist_test`.
- Không dùng `MONGODB_URI` của dev/prod.
- Helper kết nối phải fail fast nếu URI không có dấu hiệu là DB test.

### 2. Marker bắt buộc
- Mỗi file integration có `TEST_RUN_ID = "__it_<timestamp>_<rand>"`.
- Mọi fixture tạo ra phải gắn marker vào field queryable:
  - `User.email`, `User.name`
  - `Group.name`
  - `Folder.name`
  - `Note.title`
  - `Task.title`

### 3. Lifecycle chuẩn
```js
beforeAll(async () => {
  await connectTestDb();
});

afterEach(async () => {
  await cleanupByRunId(TEST_RUN_ID);
  await assertCleanRunId(TEST_RUN_ID);
});

afterAll(async () => {
  await cleanupByRunId(TEST_RUN_ID);
  await assertCleanRunId(TEST_RUN_ID);
  await disconnectTestDb();
});
```

### 4. Cleanup
- Cleanup theo collection, không drop database.
- Xóa child collections trước:
  - `Task`
  - `Note`
  - `Folder`
  - `Group`
  - `User`
- Sau cleanup phải có smoke check để xác nhận không còn document chứa marker.

### 5. Chạy tuần tự lúc đầu
- Integration test chạy với `--runInBand` để giảm race condition.
- Khi suite ổn định mới cân nhắc tối ưu song song.

## Khi nào dùng unit vs integration

### Giữ ở unit test
- `groupPermissions.test.js`
- `validationHelper.test.js`
- `dateHelper.test.js`
- Các test `rewire` cho private helpers thuần
- Logic cần mock để bắn nhiều nhánh nhanh và độc lập DB

### Đưa vào integration test
- Service có ghi DB thật
- Logic cần xác minh dữ liệu sau khi save/update
- Luồng cần chứng minh “rollback” theo nghĩa cleanup marker
- Luồng có side effect persistence như:
  - resolve `folderId`
  - persist `assignedTo`
  - auto-grant `memberAccess`
  - update `lastEdited`
  - toggle `isBookmarked`

## Mẫu skeleton
```js
const mongoose = require('mongoose');
const path = require('path');
const Note = require(path.resolve(__dirname, '../../../backend/src/models/Note.model'));
const User = require(path.resolve(__dirname, '../../../backend/src/models/User.model'));

const TEST_RUN_ID = `__it_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

const connectTestDb = async () => {
  const uri = process.env.MONGODB_URI_TEST || 'mongodb://127.0.0.1:27017/todolist_test';
  await mongoose.connect(uri);
};

const cleanupByRunId = async () => {
  await Promise.all([
    Note.deleteMany({ title: { $regex: TEST_RUN_ID } }),
    User.deleteMany({ email: { $regex: TEST_RUN_ID } })
  ]);
};

beforeAll(async () => {
  await connectTestDb();
});

afterEach(async () => {
  await cleanupByRunId();
});

afterAll(async () => {
  await cleanupByRunId();
  await mongoose.disconnect();
});
```

## Cách chạy

### Backend unit
```bash
cd unit-test/backend
npm run test:unit
```

### Backend integration
```bash
cd unit-test/backend
set MONGODB_URI_TEST=mongodb://127.0.0.1:27017/todolist_test
npm run test:int
```

### Chạy cả hai lớp
```bash
cd unit-test/backend
npm run test:all
```

## Kỳ vọng với báo cáo
- Báo cáo phải tách rõ `unit` và `integration`.
- Với integration, phần “CheckDB” nghĩa là truy vấn lại MongoDB thật.
- Với integration, “Rollback” nghĩa là cleanup tagged data sau mỗi test và dọn lại ở `afterAll`.
