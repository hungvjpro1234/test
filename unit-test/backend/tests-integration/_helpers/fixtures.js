const path = require('path');
const mongoose = require(path.resolve(__dirname, '../../../../backend/node_modules/mongoose'));

const User = require(path.resolve(__dirname, '../../../../backend/src/models/User.model'));
const Group = require(path.resolve(__dirname, '../../../../backend/src/models/Group.model'));
const Folder = require(path.resolve(__dirname, '../../../../backend/src/models/Folder.model'));
const Note = require(path.resolve(__dirname, '../../../../backend/src/models/Note.model'));
const Task = require(path.resolve(__dirname, '../../../../backend/src/models/Task.model'));

const { GROUP_ROLE_KEYS } = require(path.resolve(__dirname, '../../../../backend/src/config/constants'));

const createTestRunId = () => `__it_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

const toObjectId = (value) => new mongoose.Types.ObjectId(String(value));

const buildTaggedValue = (prefix, testRunId) => `${prefix}_${testRunId}`;

const createUser = async ({
  testRunId,
  emailPrefix = 'user',
  namePrefix = 'User',
  role = GROUP_ROLE_KEYS.DEVELOPER,
  isLeader = false,
  ...overrides
} = {}) => {
  const marker = testRunId || createTestRunId();
  return User.create({
    email: `${emailPrefix}_${marker}@test.com`,
    password: 'Abc@1234',
    name: `${namePrefix} ${marker}`,
    groupRole: role,
    isLeader,
    ...overrides
  });
};

const createGroup = async ({
  testRunId,
  creator,
  namePrefix = 'group',
  memberIds = [],
  ...overrides
} = {}) => {
  const creatorId = creator?._id || creator;
  const members = [creatorId, ...memberIds]
    .filter(Boolean)
    .map(id => ({ userId: id }));

  return Group.create({
    name: buildTaggedValue(namePrefix, testRunId),
    description: `group_desc_${testRunId}`,
    createdBy: creatorId,
    members,
    ...overrides
  });
};

const createFolder = async ({
  testRunId,
  group,
  creator,
  namePrefix = 'folder',
  isDefault = false,
  memberAccessUserIds = [],
  ...overrides
} = {}) => {
  const creatorId = creator?._id || creator;
  const folder = await Folder.create({
    name: buildTaggedValue(namePrefix, testRunId),
    description: `folder_desc_${testRunId}`,
    groupId: group?._id || group,
    createdBy: creatorId,
    isDefault,
    memberAccess: memberAccessUserIds.map(userId => ({
      userId,
      addedBy: creatorId
    })),
    ...overrides
  });

  if (isDefault && group?._id) {
    await Group.updateOne(
      { _id: group._id },
      { $set: { defaultFolderId: folder._id } }
    );
  }

  return folder;
};

const createNoteDoc = async ({
  testRunId,
  user,
  group,
  folder = null,
  titlePrefix = 'note',
  content = 'integration note'
} = {}) => Note.create({
  title: buildTaggedValue(titlePrefix, testRunId),
  content,
  userId: user?._id || user,
  groupId: group?._id || group,
  folderId: folder?._id || folder || null
});

const createTaskDoc = async ({
  testRunId,
  creator,
  group,
  folder = null,
  assignees = [],
  titlePrefix = 'task',
  description = 'integration task'
} = {}) => Task.create({
  title: buildTaggedValue(titlePrefix, testRunId),
  description,
  createdBy: creator?._id || creator,
  groupId: group?._id || group,
  folderId: folder?._id || folder || null,
  assignedTo: assignees.map(user => ({
    userId: user?._id || user
  }))
});

module.exports = {
  GROUP_ROLE_KEYS,
  toObjectId,
  createTestRunId,
  buildTaggedValue,
  createUser,
  createGroup,
  createFolder,
  createNoteDoc,
  createTaskDoc
};
