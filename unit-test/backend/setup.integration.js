require('./setup');

const defaultTestUri = process.env.MONGODB_URI_TEST || 'mongodb://127.0.0.1:27017/todolist_test';

if (!process.env.MONGODB_URI_TEST) {
  process.env.MONGODB_URI_TEST = defaultTestUri;
}

// Some backend modules warn at require-time if MONGODB_URI is absent.
// Integration tests still connect through MONGODB_URI_TEST in db helper.
if (!process.env.MONGODB_URI) {
  process.env.MONGODB_URI = process.env.MONGODB_URI_TEST;
}

jest.setTimeout(30000);
