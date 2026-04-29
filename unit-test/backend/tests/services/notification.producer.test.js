/**
 * Unit Tests: notification.producer.js
 * Source: backend/src/services/notification.producer.js
 *
 * Focus vào hàm createGroupInvitationNotification — có logic dedup quan trọng:
 * Nếu đã có pending invitation cho cùng group + recipient → không gửi lại
 * Mapping từ SRS: FR-GROUP-5.5 (mời người dùng vào nhóm)
 *
 * Strategy: Mock Mongoose models và notification.events
 */

const path = require('path');

// ============================================================
// Mock dependencies trước khi require producer
// ============================================================

// Mock Notification model
const mockNotificationFindOne = jest.fn();
const mockNotificationCreate = jest.fn();
jest.mock(
  require('path').resolve(__dirname, '../../../../backend/src/models/Notification.model'),
  () => ({
    findOne: mockNotificationFindOne,
    create: mockNotificationCreate
  })
);

// Mock Group model
const mockGroupFindById = jest.fn();
jest.mock(
  require('path').resolve(__dirname, '../../../../backend/src/models/Group.model'),
  () => ({
    findById: mockGroupFindById
  })
);

// Mock notification events
const mockNotifyGroupInvitation = jest.fn();
const mockNotifyGroupNameChange = jest.fn();
const mockNotifyGroupRoleUpdated = jest.fn();
const mockNotifyTaskCreated = jest.fn();
const mockNotifyTaskAssigned = jest.fn();
const mockNotifyTaskUnassigned = jest.fn();
const mockNotifyTaskCompleted = jest.fn();
const mockNotifyCommentAdded = jest.fn();
const mockNotifyChatMessage = jest.fn();
const mockNotifyMention = jest.fn();

jest.mock(
  require('path').resolve(__dirname, '../../../../backend/src/services/notification.events'),
  () => ({
    publishNotification: jest.fn(),
    notifyGroupInvitation: mockNotifyGroupInvitation,
    notifyGroupNameChange: mockNotifyGroupNameChange,
    notifyGroupRoleUpdated: mockNotifyGroupRoleUpdated,
    notifyTaskCreated: mockNotifyTaskCreated,
    notifyTaskAssigned: mockNotifyTaskAssigned,
    notifyTaskUnassigned: mockNotifyTaskUnassigned,
    notifyTaskCompleted: mockNotifyTaskCompleted,
    notifyCommentAdded: mockNotifyCommentAdded,
    notifyChatMessage: mockNotifyChatMessage,
    notifyMention: mockNotifyMention
  })
);

// Constants cần mock
jest.mock(
  require('path').resolve(__dirname, '../../../../backend/src/config/constants'),
  () => ({
    HTTP_STATUS: {
      OK: 200,
      CREATED: 201,
      BAD_REQUEST: 400,
      NOT_FOUND: 404,
      FORBIDDEN: 403,
      INTERNAL_SERVER_ERROR: 500
    },
    ERROR_MESSAGES: {
      INVALID_ID: 'Invalid ID format',
      GROUP_NOT_FOUND: 'Group not found'
    },
    SUCCESS_MESSAGES: {
      GROUP_CREATED: 'Group created successfully'
    }
  })
);

// validationHelper — dùng implementation thật
jest.mock(
  require('path').resolve(__dirname, '../../../../backend/src/utils/validationHelper'),
  () => ({
    isValidObjectId: (id) => {
      if (!id) return false;
      return /^[0-9a-fA-F]{24}$/.test(id);
    }
  })
);

// ============================================================
// Require producer sau khi mock
// ============================================================
const {
  createGroupInvitationNotification,
  createGroupNameChangeNotification
} = require(path.resolve(
  __dirname,
  '../../../../backend/src/services/notification.producer'
));

// Valid 24-char hex IDs cho tests
const VALID_RECIPIENT_ID = '507f1f77bcf86cd799439001';
const VALID_SENDER_ID    = '507f1f77bcf86cd799439002';
const VALID_GROUP_ID     = '507f1f77bcf86cd799439003';

// ============================================================
// createGroupInvitationNotification
// ============================================================
describe('createGroupInvitationNotification', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Deduplication — FR-GROUP-5.5', () => {
    // UT_NOTIF_06
    it('Existing notification query đúng parameters', async () => {
      mockNotificationFindOne.mockReturnValueOnce({
        lean: jest.fn().mockResolvedValue({ _id: 'existing-id', type: 'group_invitation' })
      });

      await createGroupInvitationNotification(
        VALID_RECIPIENT_ID,
        VALID_SENDER_ID,
        VALID_GROUP_ID,
        'Test Group',
        'Sender Name',
        'pm'
      );

      expect(mockNotificationFindOne).toHaveBeenCalledWith(
        expect.objectContaining({
          recipient: VALID_RECIPIENT_ID,
          type: 'group_invitation',
          status: 'pending',
          'data.groupId': VALID_GROUP_ID
        })
      );
    });
  });

  describe('Happy path', () => {
    // UT_NOTIF_08
    it('notifyGroupInvitation được gọi với đúng params', async () => {
      mockNotificationFindOne.mockReturnValueOnce({ lean: jest.fn().mockResolvedValue(null) });
      const mockNotification = { _id: 'new-notif-id' };
      mockNotifyGroupInvitation.mockReturnValueOnce({
        enqueuePromise: Promise.resolve(mockNotification)
      });

      await createGroupInvitationNotification(
        VALID_RECIPIENT_ID,
        VALID_SENDER_ID,
        VALID_GROUP_ID,
        'My Group',
        'John Doe',
        'developer'
      );

      expect(mockNotifyGroupInvitation).toHaveBeenCalledWith(
        expect.objectContaining({
          recipientId: VALID_RECIPIENT_ID,
          senderId: VALID_SENDER_ID,
          groupId: VALID_GROUP_ID,
          groupName: 'My Group',
          inviterName: 'John Doe',
          role: 'developer'
        })
      );
    });
  });
});

// ============================================================
// createGroupNameChangeNotification
// ============================================================
describe('createGroupNameChangeNotification', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Happy path', () => {
    // UT_NOTIF_13
    it('Group có members → query đúng groupId', async () => {
      const mockGroup = {
        members: [
          { userId: { _id: VALID_RECIPIENT_ID, toString: () => VALID_RECIPIENT_ID } },
          { userId: { _id: VALID_SENDER_ID, toString: () => VALID_SENDER_ID } }
        ]
      };
      mockGroupFindById.mockResolvedValueOnce(mockGroup);
      mockNotifyGroupNameChange.mockReturnValueOnce({
        enqueueAll: () => Promise.resolve([{ _id: 'notif-1' }])
      });

      await createGroupNameChangeNotification(
        VALID_GROUP_ID,
        VALID_SENDER_ID,
        'Old Name',
        'New Name',
        'Actor Name'
      );

      expect(mockGroupFindById).toHaveBeenCalledWith(VALID_GROUP_ID);
    });
  });
});
