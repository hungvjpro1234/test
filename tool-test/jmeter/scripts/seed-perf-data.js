const fs = require('fs');
const path = require('path');

const backendDir = path.resolve(__dirname, '..', '..', '..', 'backend');
process.chdir(backendDir);

require(path.join(backendDir, 'node_modules', 'dotenv')).config();
const mongoose = require(path.join(backendDir, 'node_modules', 'mongoose'));

const User = require(path.join(backendDir, 'src/models/User.model'));
const Group = require(path.join(backendDir, 'src/models/Group.model'));
const Task = require(path.join(backendDir, 'src/models/Task.model'));
const Notification = require(path.join(backendDir, 'src/models/Notification.model'));
const DirectConversation = require(path.join(backendDir, 'src/models/DirectConversation.model'));
const DirectMessage = require(path.join(backendDir, 'src/models/DirectMessage.model'));
const GroupMessage = require(path.join(backendDir, 'src/models/GroupMessage.model'));
const env = require(path.join(backendDir, 'src/config/environment'));
const { GROUP_ROLE_KEYS } = require(path.join(backendDir, 'src/config/constants'));

const AUTH_USER_COUNT = 50;
const DEFAULT_PASSWORD = 'Abc@1234';

const PERF_PRIMARY_EMAIL = 'performance.primary@test.com';
const PERF_PARTNER_EMAIL = 'performance.partner@test.com';
const PERF_ADMIN_EMAIL = 'performance.admin@test.com';
const PERF_GROUP_NAME = 'Performance Test Group';
const PERF_LOCAL_PORT = 8081;

async function upsertBusinessRole(user, groupRole = null, isLeader = false) {
  user.groupRole = groupRole;
  user.isLeader = isLeader;
  await user.save();
  return user;
}

async function upsertUser(email, name, role = 'user') {
  let user = await User.findOne({ email }).select('+password +refreshToken');
  if (!user) {
    user = new User({
      email,
      password: DEFAULT_PASSWORD,
      name,
      role,
      isActive: true,
      isEmailVerified: true
    });
  } else {
    user.name = name;
    user.role = role;
    user.isActive = true;
    user.isEmailVerified = true;
    user.password = DEFAULT_PASSWORD;
  }

  await user.save();
  return user;
}

async function ensureGroup(users) {
  let group = await Group.findOne({ name: PERF_GROUP_NAME, createdBy: users.primary._id });
  if (!group) {
    group = new Group({
      name: PERF_GROUP_NAME,
      description: 'Seed data for JMeter performance tests',
      createdBy: users.primary._id,
      members: []
    });
  }

  const memberRoleMap = new Map(group.members.map(member => [String(member.userId), member.role || null]));
  [users.primary, users.partner, users.admin, ...users.auth].forEach(user => {
    memberRoleMap.set(String(user._id), user.groupRole || null);
  });

  group.members = Array.from(memberRoleMap.entries()).map(([userId, role]) => ({ userId, role }));
  await group.save();
  return group;
}

async function ensureCurrentGroup(users, groupId) {
  await User.updateMany(
    { _id: { $in: [users.primary._id, users.partner._id, users.admin._id, ...users.auth.map(user => user._id)] } },
    { $set: { currentGroupId: groupId } }
  );
}

async function ensureTasks(group, primary) {
  let task = await Task.findOne({ groupId: group._id }).sort({ createdAt: -1 });
  if (task) {
    return task;
  }

  const docs = [];
  for (let i = 1; i <= 120; i += 1) {
    docs.push({
      title: `Performance Seed Task ${i}`,
      description: `JMeter seed task ${i}`,
      status: i % 5 === 0 ? 'in_progress' : 'todo',
      priority: i % 3 === 0 ? 'high' : 'medium',
      createdBy: primary._id,
      assignedTo: [{ userId: primary._id }],
      tags: ['perf', 'seed'],
      type: 'Operational',
      groupId: group._id,
      comments: i === 1
        ? Array.from({ length: 12 }, (_, idx) => ({
            user: primary._id,
            content: `Performance comment ${idx + 1}`,
            createdAt: new Date(Date.now() - idx * 60000)
          }))
        : []
    });
  }

  const inserted = await Task.insertMany(docs);
  return inserted[0];
}

async function ensureGroupMessages(group, primary, partner) {
  const count = await GroupMessage.countDocuments({ groupId: group._id });
  if (count >= 80) {
    return;
  }

  const docs = [];
  for (let i = 1; i <= 100; i += 1) {
    docs.push({
      groupId: group._id,
      senderId: i % 2 === 0 ? primary._id : partner._id,
      content: `Performance group message ${i}`,
      mentions: { users: [], roles: [] }
    });
  }
  await GroupMessage.insertMany(docs);
}

async function ensureConversation(primary, partner) {
  const participantHash = [String(primary._id), String(partner._id)].sort().join(':');
  let conversation = await DirectConversation.findOne({ participantHash });

  if (!conversation) {
    conversation = await DirectConversation.create({
      participants: [primary._id, partner._id],
      participantHash,
      unreadCounts: {
        [String(primary._id)]: 0,
        [String(partner._id)]: 0
      }
    });
  }

  const count = await DirectMessage.countDocuments({ conversationId: conversation._id });
  if (count < 80) {
    const docs = [];
    for (let i = 1; i <= 100; i += 1) {
      docs.push({
        conversationId: conversation._id,
        senderId: i % 2 === 0 ? primary._id : partner._id,
        content: `Performance direct message ${i}`
      });
    }
    await DirectMessage.insertMany(docs);

    conversation.lastMessagePreview = 'Performance direct message 100';
    conversation.lastMessageAt = new Date();
    conversation.lastMessageSender = partner._id;
    await conversation.save();
  }

  return conversation;
}

async function ensureNotifications(primary, partner, group, task) {
  let notification = await Notification.findOne({ recipient: primary._id }).sort({ createdAt: -1 });
  if (notification) {
    return notification;
  }

  const docs = [];
  for (let i = 1; i <= 25; i += 1) {
    docs.push({
      recipient: primary._id,
      sender: partner._id,
      type: 'task_assigned',
      eventKey: 'TASK_ASSIGNED',
      title: `Perf Notification ${i}`,
      message: `Performance notification ${i}`,
      data: {
        taskId: task._id,
        taskTitle: task.title,
        groupId: group._id,
        groupName: group.name
      },
      categories: ['task'],
      channels: ['in_app'],
      deliveredAt: new Date(),
      status: 'delivered',
      isRead: false,
      archived: false
    });
  }

  const inserted = await Notification.insertMany(docs);
  return inserted[0];
}

function createEnvLines(summary, { port, smoke }) {
  const tgLines = smoke
    ? [
        'tg.auth.threads=2',
        'tg.auth.ramp=5',
        'tg.auth.duration=30',
        'tg.taskread.threads=2',
        'tg.taskread.ramp=5',
        'tg.taskread.duration=30',
        'tg.taskwrite.threads=1',
        'tg.taskwrite.ramp=3',
        'tg.taskwrite.duration=30',
        'tg.group.threads=1',
        'tg.group.ramp=3',
        'tg.group.duration=30',
        'tg.notification.threads=1',
        'tg.notification.ramp=3',
        'tg.notification.duration=30',
        'tg.chat.threads=1',
        'tg.chat.ramp=3',
        'tg.chat.duration=30',
        'tg.admin.threads=1',
        'tg.admin.ramp=3',
        'tg.admin.duration=30'
      ]
    : [
        'tg.auth.threads=50',
        'tg.auth.ramp=60',
        'tg.auth.duration=300',
        'tg.taskread.threads=120',
        'tg.taskread.ramp=90',
        'tg.taskread.duration=600',
        'tg.taskwrite.threads=60',
        'tg.taskwrite.ramp=60',
        'tg.taskwrite.duration=600',
        'tg.group.threads=100',
        'tg.group.ramp=60',
        'tg.group.duration=480',
        'tg.notification.threads=120',
        'tg.notification.ramp=90',
        'tg.notification.duration=600',
        'tg.chat.threads=120',
        'tg.chat.ramp=90',
        'tg.chat.duration=600',
        'tg.admin.threads=40',
        'tg.admin.ramp=45',
        'tg.admin.duration=360'
      ];

  const header = smoke
    ? '# Smoke rerun profile for the fresh clone/backend on port 8081'
    : '# Auto-generated by seed-perf-data.js';

  return [
    header,
    'protocol=http',
    'host=localhost',
    `port=${port}`,
    'basePath=/api',
    'usersCsv=./test-data/perf_users.csv',
    'adminUsersCsv=./test-data/perf_admin_users.csv',
    'idsCsv=./test-data/perf_ids.csv',
    `loginEmail=${summary.primaryEmail}`,
    `loginPassword=${DEFAULT_PASSWORD}`,
    `adminLoginEmail=${summary.adminEmail}`,
    `adminLoginPassword=${DEFAULT_PASSWORD}`,
    `groupId=${summary.groupId}`,
    `taskId=${summary.taskId}`,
    `conversationId=${summary.conversationId}`,
    `notificationId=${summary.notificationId}`,
    'page=1',
    'limit=20',
    'chatLimit=50',
    'searchKeyword=Performance',
    'chatMessagePrefix=Perf test message',
    ...tgLines,
    'threshold.default=3000',
    'threshold.fast=2000',
    'threshold.heavy=3500'
  ];
}

function writeOutputs(summary) {
  const jmeterDir = path.resolve(__dirname, '..');
  const testDataDir = path.join(jmeterDir, 'test-data');
  const configDir = path.join(jmeterDir, 'config');

  const authUsersCsv = summary.authUsers.map(email => `${email},${DEFAULT_PASSWORD}`).join('\n');
  fs.writeFileSync(path.join(testDataDir, 'perf_users.csv'), `${authUsersCsv}\n`, 'utf8');
  fs.writeFileSync(path.join(testDataDir, 'perf_admin_users.csv'), `${summary.adminEmail},${DEFAULT_PASSWORD}\n`, 'utf8');
  fs.writeFileSync(
    path.join(testDataDir, 'perf_ids.csv'),
    `groupId,taskId,conversationId,notificationId\n${summary.groupId},${summary.taskId},${summary.conversationId},${summary.notificationId}\n`,
    'utf8'
  );

  const envLocal = createEnvLines(summary, { port: PERF_LOCAL_PORT, smoke: false }).join('\n');
  const envSmoke = createEnvLines(summary, { port: PERF_LOCAL_PORT, smoke: true }).join('\n');

  fs.writeFileSync(path.join(configDir, 'env.local.properties'), `${envLocal}\n`, 'utf8');
  fs.writeFileSync(path.join(configDir, 'env.rerun-smoke.properties'), `${envSmoke}\n`, 'utf8');
}

async function main() {
  await mongoose.connect(env.mongoUri);

  const primary = await upsertBusinessRole(
    await upsertUser(PERF_PRIMARY_EMAIL, 'Performance Primary User', 'user'),
    GROUP_ROLE_KEYS.PRODUCT_OWNER
  );
  const partner = await upsertBusinessRole(
    await upsertUser(PERF_PARTNER_EMAIL, 'Performance Partner User', 'user'),
    GROUP_ROLE_KEYS.DEVELOPER
  );
  const admin = await upsertBusinessRole(
    await upsertUser(PERF_ADMIN_EMAIL, 'Performance Admin User', 'admin'),
    GROUP_ROLE_KEYS.PM
  );

  const authUsers = [];
  for (let i = 1; i <= AUTH_USER_COUNT; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    const user = await upsertUser(`performance.auth.${String(i).padStart(3, '0')}@test.com`, `Performance Auth ${i}`, 'user');
    authUsers.push(user);
  }

  const users = { primary, partner, admin, auth: authUsers };
  const group = await ensureGroup(users);
  await ensureCurrentGroup(users, group._id);
  const task = await ensureTasks(group, primary);
  await ensureGroupMessages(group, primary, partner);
  const conversation = await ensureConversation(primary, partner);
  const notification = await ensureNotifications(primary, partner, group, task);

  const summary = {
    primaryEmail: primary.email,
    adminEmail: admin.email,
    authUsers: authUsers.map(user => user.email),
    groupId: String(group._id),
    taskId: String(task._id),
    conversationId: String(conversation._id),
    notificationId: String(notification._id)
  };

  writeOutputs(summary);
  console.log(JSON.stringify(summary, null, 2));
  await mongoose.disconnect();
}

main().catch(async error => {
  console.error(error);
  try {
    await mongoose.disconnect();
  } catch (_) {
    // ignore disconnect error
  }
  process.exit(1);
});
