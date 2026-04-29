/**
 * Integration Tests: notification.producer.js
 * Source: backend/src/services/notification.producer.js
 *
 * Verify producer behavior with real MongoDB persistence and cleanup by TEST_RUN_ID.
 */

const path = require('path');

const notificationProducer = require(path.resolve(__dirname, '../../../../backend/src/services/notification.producer'));
const Notification = require(path.resolve(__dirname, '../../../../backend/src/models/Notification.model'));

const {
  connectTestDb,
  disconnectTestDb,
  cleanupByRunId,
  assertCleanRunId
} = require('../_helpers/db');

const {
  GROUP_ROLE_KEYS,
  createTestRunId,
  buildTaggedValue,
  createUser,
  createGroup
} = require('../_helpers/fixtures');

const TEST_RUN_ID = createTestRunId();

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

const findTaggedNotifications = async (marker) => Notification.find({
  $or: [
    { title: marker },
    { message: new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) },
    { 'data.groupName': marker },
    { 'data.oldName': marker },
    { 'data.newName': marker }
  ]
}).lean();

describe('Integration - notification.producer.js', () => {
  describe('createGroupInvitationNotification', () => {
    // IT_NOTIF_INVITATION_06
    test('rejects null recipientId and does not persist notification', async () => {
      const groupName = buildTaggedValue('notif_null_recipient_group', TEST_RUN_ID);

      const result = await notificationProducer.createGroupInvitationNotification(
        null,
        '507f1f77bcf86cd799439041',
        '507f1f77bcf86cd799439042',
        groupName,
        'Inviter Name',
        GROUP_ROLE_KEYS.DEVELOPER
      );

      const persisted = await findTaggedNotifications(TEST_RUN_ID);

      expect(result.success).toBe(false);
      expect(result.statusCode).toBe(400);
      expect(persisted).toHaveLength(0);
    });

    // IT_NOTIF_INVITATION_01
    test('rejects invalid recipientId and does not persist notification', async () => {
      const groupName = buildTaggedValue('notif_invalid_recipient_group', TEST_RUN_ID);

      const result = await notificationProducer.createGroupInvitationNotification(
        'invalid-id',
        '507f1f77bcf86cd799439011',
        '507f1f77bcf86cd799439012',
        groupName,
        'Inviter Name',
        GROUP_ROLE_KEYS.DEVELOPER
      );

      const persisted = await findTaggedNotifications(TEST_RUN_ID);

      expect(result.success).toBe(false);
      expect(result.statusCode).toBe(400);
      expect(persisted).toHaveLength(0);
    });

    // IT_NOTIF_INVITATION_02
    test('rejects invalid senderId and does not persist notification', async () => {
      const groupName = buildTaggedValue('notif_invalid_sender_group', TEST_RUN_ID);

      const result = await notificationProducer.createGroupInvitationNotification(
        '507f1f77bcf86cd799439021',
        'invalid-id',
        '507f1f77bcf86cd799439022',
        groupName,
        'Inviter Name',
        GROUP_ROLE_KEYS.DEVELOPER
      );

      const persisted = await findTaggedNotifications(TEST_RUN_ID);

      expect(result.success).toBe(false);
      expect(result.statusCode).toBe(400);
      expect(persisted).toHaveLength(0);
    });

    // IT_NOTIF_INVITATION_03
    test('rejects invalid groupId and does not persist notification', async () => {
      const groupName = buildTaggedValue('notif_invalid_group_group', TEST_RUN_ID);

      const result = await notificationProducer.createGroupInvitationNotification(
        '507f1f77bcf86cd799439031',
        '507f1f77bcf86cd799439032',
        'invalid-id',
        groupName,
        'Inviter Name',
        GROUP_ROLE_KEYS.DEVELOPER
      );

      const persisted = await findTaggedNotifications(TEST_RUN_ID);

      expect(result.success).toBe(false);
      expect(result.statusCode).toBe(400);
      expect(persisted).toHaveLength(0);
    });

    // IT_NOTIF_INVITATION_04
    test('rejects duplicate pending invitation and does not create a second document', async () => {
      const sender = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'notif_inv_sender',
        namePrefix: 'Notif Inv Sender',
        role: GROUP_ROLE_KEYS.PM
      });
      const recipient = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'notif_inv_recipient',
        namePrefix: 'Notif Inv Recipient',
        role: GROUP_ROLE_KEYS.DEVELOPER
      });
      const group = await createGroup({
        testRunId: TEST_RUN_ID,
        creator: sender,
        namePrefix: 'notif_inv_group'
      });

      const existing = await Notification.createGroupInvitation(
        recipient._id,
        sender._id,
        group._id,
        group.name
      );

      const result = await notificationProducer.createGroupInvitationNotification(
        recipient._id,
        sender._id,
        group._id,
        group.name,
        sender.name,
        GROUP_ROLE_KEYS.DEVELOPER
      );

      const persisted = await Notification.find({
        recipient: recipient._id,
        type: 'group_invitation',
        status: 'pending',
        'data.groupId': group._id
      }).lean();

      expect(existing).toBeTruthy();
      expect(result.success).toBe(false);
      expect(result.message).toContain('already sent');
      expect(persisted).toHaveLength(1);
    });

    // IT_NOTIF_INVITATION_05
    test('persists one invitation notification with expected DB fields on happy path', async () => {
      const sender = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'notif_happy_sender',
        namePrefix: 'Notif Happy Sender',
        role: GROUP_ROLE_KEYS.PM
      });
      const recipient = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'notif_happy_recipient',
        namePrefix: 'Notif Happy Recipient',
        role: GROUP_ROLE_KEYS.DEVELOPER
      });
      const groupName = buildTaggedValue('notif_happy_group', TEST_RUN_ID);
      const inviterName = buildTaggedValue('notif_happy_inviter', TEST_RUN_ID);
      const group = await createGroup({
        testRunId: TEST_RUN_ID,
        creator: sender,
        namePrefix: 'notif_happy_group'
      });

      const result = await notificationProducer.createGroupInvitationNotification(
        recipient._id,
        sender._id,
        group._id,
        groupName,
        inviterName,
        GROUP_ROLE_KEYS.DEVELOPER
      );

      const persisted = await Notification.find({
        recipient: recipient._id,
        type: 'group_invitation',
        'data.groupId': group._id
      }).lean();

      expect(result.success).toBe(true);
      expect(result.statusCode).toBe(201);
      expect(result.data).toBeTruthy();
      expect(String(result.data._id)).toBe(String(persisted[0]._id));
      expect(String(result.data.recipient)).toBe(String(persisted[0].recipient));
      expect(String(result.data.sender)).toBe(String(persisted[0].sender));
      expect(result.data.type).toBe(persisted[0].type);
      expect(result.data.eventKey).toBe(persisted[0].eventKey);
      expect(result.data.status).toBe(persisted[0].status);
      expect(String(result.data.data.groupId)).toBe(String(persisted[0].data.groupId));
      expect(result.data.data.groupName).toBe(persisted[0].data.groupName);
      expect(persisted).toHaveLength(1);
      expect(String(persisted[0].recipient)).toBe(String(recipient._id));
      expect(String(persisted[0].sender)).toBe(String(sender._id));
      expect(persisted[0].type).toBe('group_invitation');
      expect(persisted[0].eventKey).toBe('GROUP_INVITATION_SENT');
      expect(String(persisted[0].data.groupId)).toBe(String(group._id));
      expect(persisted[0].data.groupName).toBe(groupName);
      expect(persisted[0].status).toBe('pending');
    });
  });

  describe('createGroupNameChangeNotification', () => {
    // IT_NOTIF_GROUPNAME_04
    test('rejects invalid senderId and does not persist notification', async () => {
      const oldName = buildTaggedValue('notif_old_invalid_sender', TEST_RUN_ID);
      const newName = buildTaggedValue('notif_new_invalid_sender', TEST_RUN_ID);

      const result = await notificationProducer.createGroupNameChangeNotification(
        '507f1f77bcf86cd799439111',
        'invalid-id',
        oldName,
        newName,
        'Sender Invalid'
      );

      const persisted = await findTaggedNotifications(TEST_RUN_ID);

      expect(result.success).toBe(false);
      expect(result.statusCode).toBe(400);
      expect(persisted).toHaveLength(0);
    });

    // IT_NOTIF_GROUPNAME_05
    test('rejects invalid groupId and does not persist notification', async () => {
      const sender = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'notif_name_sender_invalid_gid',
        namePrefix: 'Notif Name Sender Invalid Gid',
        role: GROUP_ROLE_KEYS.PM
      });
      const oldName = buildTaggedValue('notif_old_invalid_group', TEST_RUN_ID);
      const newName = buildTaggedValue('notif_new_invalid_group', TEST_RUN_ID);

      const result = await notificationProducer.createGroupNameChangeNotification(
        'invalid-id',
        sender._id,
        oldName,
        newName,
        sender.name
      );

      const persisted = await findTaggedNotifications(TEST_RUN_ID);

      expect(result.success).toBe(false);
      expect(result.statusCode).toBe(400);
      expect(persisted).toHaveLength(0);
    });

    // IT_NOTIF_GROUPNAME_01
    test('returns not found for unknown group and does not persist notification', async () => {
      const sender = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'notif_name_sender_nf',
        namePrefix: 'Notif Name Sender Nf',
        role: GROUP_ROLE_KEYS.PM
      });
      const oldName = buildTaggedValue('notif_old_nf', TEST_RUN_ID);
      const newName = buildTaggedValue('notif_new_nf', TEST_RUN_ID);

      const result = await notificationProducer.createGroupNameChangeNotification(
        '507f1f77bcf86cd799439099',
        sender._id,
        oldName,
        newName,
        sender.name
      );

      const persisted = await findTaggedNotifications(TEST_RUN_ID);

      expect(result.success).toBe(false);
      expect(result.statusCode).toBe(404);
      expect(persisted).toHaveLength(0);
    });

    // IT_NOTIF_GROUPNAME_02
    test('returns success with empty data when sender is the only group member', async () => {
      const sender = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'notif_name_sender_only',
        namePrefix: 'Notif Name Sender Only',
        role: GROUP_ROLE_KEYS.PM
      });
      const group = await createGroup({
        testRunId: TEST_RUN_ID,
        creator: sender,
        namePrefix: 'notif_name_solo_group'
      });
      const oldName = buildTaggedValue('notif_old_solo', TEST_RUN_ID);
      const newName = buildTaggedValue('notif_new_solo', TEST_RUN_ID);

      const result = await notificationProducer.createGroupNameChangeNotification(
        group._id,
        sender._id,
        oldName,
        newName,
        sender.name
      );

      const persisted = await findTaggedNotifications(TEST_RUN_ID);

      expect(result.success).toBe(true);
      expect(result.statusCode).toBe(200);
      expect(result.data).toEqual([]);
      expect(persisted).toHaveLength(0);
    });

    // IT_NOTIF_GROUPNAME_03
    test('persists notifications for all members except sender with correct old/new names', async () => {
      const sender = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'notif_name_sender',
        namePrefix: 'Notif Name Sender',
        role: GROUP_ROLE_KEYS.PM
      });
      const recipientOne = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'notif_name_recipient_one',
        namePrefix: 'Notif Name Recipient One',
        role: GROUP_ROLE_KEYS.DEVELOPER
      });
      const recipientTwo = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'notif_name_recipient_two',
        namePrefix: 'Notif Name Recipient Two',
        role: GROUP_ROLE_KEYS.BA
      });
      const group = await createGroup({
        testRunId: TEST_RUN_ID,
        creator: sender,
        memberIds: [recipientOne._id, recipientTwo._id],
        namePrefix: 'notif_name_group'
      });
      const oldName = buildTaggedValue('notif_old_happy', TEST_RUN_ID);
      const newName = buildTaggedValue('notif_new_happy', TEST_RUN_ID);

      const result = await notificationProducer.createGroupNameChangeNotification(
        group._id,
        sender._id,
        oldName,
        newName,
        sender.name
      );

      const persisted = await Notification.find({
        eventKey: 'GROUP_NAME_CHANGED',
        'data.groupId': String(group._id),
        'data.oldName': oldName,
        'data.newName': newName
      }).sort({ createdAt: 1 }).lean();

      const recipients = persisted.map(doc => String(doc.recipient)).sort();

      expect(result.success).toBe(true);
      expect(result.statusCode).toBe(201);
      expect(result.data).toHaveLength(2);
      expect(persisted).toHaveLength(2);
      expect(recipients).toEqual([
        String(recipientOne._id),
        String(recipientTwo._id)
      ].sort());
      expect(persisted.every(doc => String(doc.sender) === String(sender._id))).toBe(true);
      expect(persisted.every(doc => doc.type === 'group_update')).toBe(true);
      expect(persisted.every(doc => doc.data.oldName === oldName)).toBe(true);
      expect(persisted.every(doc => doc.data.newName === newName)).toBe(true);
    });
  });
});
