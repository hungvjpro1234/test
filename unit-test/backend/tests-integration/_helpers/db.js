const path = require('path');
const mongoose = require(path.resolve(__dirname, '../../../../backend/node_modules/mongoose'));

const User = require(path.resolve(__dirname, '../../../../backend/src/models/User.model'));
const Group = require(path.resolve(__dirname, '../../../../backend/src/models/Group.model'));
const Folder = require(path.resolve(__dirname, '../../../../backend/src/models/Folder.model'));
const Note = require(path.resolve(__dirname, '../../../../backend/src/models/Note.model'));
const Task = require(path.resolve(__dirname, '../../../../backend/src/models/Task.model'));
const Notification = require(path.resolve(__dirname, '../../../../backend/src/models/Notification.model'));

const DEFAULT_TEST_URI = 'mongodb://127.0.0.1:27017/todolist_test';

const ensureSafeTestUri = (uri) => {
  if (!uri || typeof uri !== 'string') {
    throw new Error('MONGODB_URI_TEST must be a non-empty string');
  }

  const normalized = uri.toLowerCase();
  if (!normalized.includes('test')) {
    throw new Error(`Refusing to connect to non-test database URI: ${uri}`);
  }

  return uri;
};

const getTestDbUri = () => ensureSafeTestUri(process.env.MONGODB_URI_TEST || DEFAULT_TEST_URI);

const connectTestDb = async () => {
  const uri = getTestDbUri();

  if (mongoose.connection.readyState === 1) {
    const currentUri = mongoose.connection?.client?.s?.url || '';
    ensureSafeTestUri(currentUri || uri);
    return mongoose.connection;
  }

  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000
  });
  return mongoose.connection;
};

const disconnectTestDb = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
};

const cleanupByRunId = async (testRunId) => {
  if (mongoose.connection.readyState !== 1) {
    return;
  }

  const marker = String(testRunId || '').trim();
  if (!marker) {
    throw new Error('cleanupByRunId requires a non-empty testRunId');
  }

  const regex = new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

  await Promise.all([
    Notification.deleteMany({
      $or: [
        { title: regex },
        { message: regex },
        { 'data.groupName': regex },
        { 'data.oldName': regex },
        { 'data.newName': regex }
      ]
    }),
    Task.deleteMany({ title: regex }),
    Note.deleteMany({ title: regex }),
    Folder.deleteMany({ name: regex }),
    Group.deleteMany({ name: regex }),
    User.deleteMany({
      $or: [
        { email: regex },
        { name: regex }
      ]
    })
  ]);
};

const countTaggedDocs = async (testRunId) => {
  if (mongoose.connection.readyState !== 1) {
    return { notifications: 0, tasks: 0, notes: 0, folders: 0, groups: 0, users: 0 };
  }

  const marker = String(testRunId || '').trim();
  const regex = new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

  const [notifications, tasks, notes, folders, groups, users] = await Promise.all([
    Notification.countDocuments({
      $or: [
        { title: regex },
        { message: regex },
        { 'data.groupName': regex },
        { 'data.oldName': regex },
        { 'data.newName': regex }
      ]
    }),
    Task.countDocuments({ title: regex }),
    Note.countDocuments({ title: regex }),
    Folder.countDocuments({ name: regex }),
    Group.countDocuments({ name: regex }),
    User.countDocuments({
      $or: [
        { email: regex },
        { name: regex }
      ]
    })
  ]);

  return { notifications, tasks, notes, folders, groups, users };
};

const sampleTaggedDocs = async (testRunId) => {
  if (mongoose.connection.readyState !== 1) {
    return {
      notifications: [],
      tasks: [],
      notes: [],
      folders: [],
      groups: [],
      users: []
    };
  }

  const marker = String(testRunId || '').trim();
  const regex = new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

  const [
    notifications,
    tasks,
    notes,
    folders,
    groups,
    users
  ] = await Promise.all([
    Notification.find({
      $or: [
        { title: regex },
        { message: regex },
        { 'data.groupName': regex },
        { 'data.oldName': regex },
        { 'data.newName': regex }
      ]
    })
      .select('type title message data.groupName data.oldName data.newName')
      .limit(3)
      .lean(),
    Task.find({ title: regex }).select('title').limit(3).lean(),
    Note.find({ title: regex }).select('title').limit(3).lean(),
    Folder.find({ name: regex }).select('name').limit(3).lean(),
    Group.find({ name: regex }).select('name').limit(3).lean(),
    User.find({
      $or: [
        { email: regex },
        { name: regex }
      ]
    })
      .select('email name')
      .limit(3)
      .lean()
  ]);

  return { notifications, tasks, notes, folders, groups, users };
};

const formatSampleSummary = (samples = {}) => {
  const lines = [];

  if (samples.notifications?.length) {
    lines.push(`notifications=[${samples.notifications.map(doc => doc.message || doc.title || doc.type).join(' | ')}]`);
  }
  if (samples.tasks?.length) {
    lines.push(`tasks=[${samples.tasks.map(doc => doc.title).join(' | ')}]`);
  }
  if (samples.notes?.length) {
    lines.push(`notes=[${samples.notes.map(doc => doc.title).join(' | ')}]`);
  }
  if (samples.folders?.length) {
    lines.push(`folders=[${samples.folders.map(doc => doc.name).join(' | ')}]`);
  }
  if (samples.groups?.length) {
    lines.push(`groups=[${samples.groups.map(doc => doc.name).join(' | ')}]`);
  }
  if (samples.users?.length) {
    lines.push(`users=[${samples.users.map(doc => doc.email || doc.name).join(' | ')}]`);
  }

  return lines.join('; ');
};

const assertCleanRunId = async (testRunId) => {
  const counts = await countTaggedDocs(testRunId);
  const dirtyEntries = Object.entries(counts).filter(([, count]) => count > 0);

  if (dirtyEntries.length > 0) {
    const summary = dirtyEntries.map(([name, count]) => `${name}:${count}`).join(', ');
    const samples = await sampleTaggedDocs(testRunId);
    const sampleSummary = formatSampleSummary(samples);
    throw new Error(`Tagged test data still exists for ${testRunId}: ${summary}${sampleSummary ? ` | samples: ${sampleSummary}` : ''}`);
  }
};

module.exports = {
  DEFAULT_TEST_URI,
  getTestDbUri,
  connectTestDb,
  disconnectTestDb,
  cleanupByRunId,
  countTaggedDocs,
  sampleTaggedDocs,
  assertCleanRunId
};
