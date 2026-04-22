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

  // -------------------------------------------------------
  // Validate inputs
  // -------------------------------------------------------
  describe('Input validation — invalid IDs', () => {
    // UT_NOTIF_01
    it('Invalid recipientId → { success: false, "Invalid ID" }', async () => {
      const result = await createGroupInvitationNotification(
        'invalid-id',
        VALID_SENDER_ID,
        VALID_GROUP_ID,
        'Test Group',
        'Sender Name',
        'pm'
      );
      expect(result.success).toBe(false);
      expect(result.statusCode).toBe(400);
      expect(result.message).toContain('Invalid ID');
    });

    // UT_NOTIF_02
    it('Invalid senderId → { success: false }', async () => {
      const result = await createGroupInvitationNotification(
        VALID_RECIPIENT_ID,
        'not-valid',
        VALID_GROUP_ID,
        'Test Group',
        'Sender Name',
        'pm'
      );
      expect(result.success).toBe(false);
    });

    // UT_NOTIF_03
    it('Invalid groupId → { success: false }', async () => {
      const result = await createGroupInvitationNotification(
        VALID_RECIPIENT_ID,
        VALID_SENDER_ID,
        'bad-group-id',
        'Test Group',
        'Sender Name',
        'pm'
      );
      expect(result.success).toBe(false);
    });

    // UT_NOTIF_04
    it('null recipientId → { success: false }', async () => {
      const result = await createGroupInvitationNotification(
        null,
        VALID_SENDER_ID,
        VALID_GROUP_ID,
        'Test Group',
        'Sender Name',
        'pm'
      );
      expect(result.success).toBe(false);
    });
  });

  // -------------------------------------------------------
  // Deduplication — không gửi lời mời trùng
  // -------------------------------------------------------
  describe('Deduplication — FR-GROUP-5.5', () => {
    // UT_NOTIF_05
    it('Đã có pending invitation → { success: false, "Invitation already sent" }', async () => {
      // Mock: tìm thấy existing notification
      // Source gọi findOne({...}).lean() → mock cần support chain
      mockNotificationFindOne.mockReturnValueOnce({
        lean: jest.fn().mockResolvedValue({
          _id: 'existing-notif-id',
          type: 'group_invitation',
          status: 'pending'
        })
      });

      const result = await createGroupInvitationNotification(
        VALID_RECIPIENT_ID,
        VALID_SENDER_ID,
        VALID_GROUP_ID,
        'Test Group',
        'Sender Name',
        'pm'
      );

      expect(result.success).toBe(false);
      expect(result.message).toContain('already sent');
    });

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

      // Verify query parameters
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

  // -------------------------------------------------------
  // Happy path — gửi invitation thành công
  // -------------------------------------------------------
  describe('Happy path', () => {
    // UT_NOTIF_07
    it('Không có pending duplicate → gọi notifyGroupInvitation', async () => {
      // Mock: không tìm thấy existing notification
      mockNotificationFindOne.mockReturnValueOnce({ lean: jest.fn().mockResolvedValue(null) });

      const mockNotification = { _id: 'new-notif-id', type: 'group_invitation' };
      mockNotifyGroupInvitation.mockReturnValueOnce({
        enqueuePromise: Promise.resolve(mockNotification)
      });

      const result = await createGroupInvitationNotification(
        VALID_RECIPIENT_ID,
        VALID_SENDER_ID,
        VALID_GROUP_ID,
        'Test Group',
        'Sender Name',
        'pm'
      );

      expect(result.success).toBe(true);
      expect(result.statusCode).toBe(201);
      expect(mockNotifyGroupInvitation).toHaveBeenCalledTimes(1);
    });

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

    // UT_NOTIF_09
    it('Trả về notification data', async () => {
      mockNotificationFindOne.mockReturnValueOnce({ lean: jest.fn().mockResolvedValue(null) });
      const mockNotification = { _id: 'new-notif-id', type: 'group_invitation' };
      mockNotifyGroupInvitation.mockReturnValueOnce({
        enqueuePromise: Promise.resolve(mockNotification)
      });

      const result = await createGroupInvitationNotification(
        VALID_RECIPIENT_ID,
        VALID_SENDER_ID,
        VALID_GROUP_ID,
        'Test Group',
        'Sender Name',
        'pm'
      );

      expect(result.data).toEqual(mockNotification);
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

  describe('Input validation', () => {
    // UT_NOTIF_10
    it('Invalid groupId → { success: false }', async () => {
      const result = await createGroupNameChangeNotification(
        'invalid-id',
        VALID_SENDER_ID,
        'Old Name',
        'New Name',
        'Actor'
      );
      expect(result.success).toBe(false);
    });

    // UT_NOTIF_11
    it('Invalid senderId → { success: false }', async () => {
      const result = await createGroupNameChangeNotification(
        VALID_GROUP_ID,
        'invalid',
        'Old Name',
        'New Name',
        'Actor'
      );
      expect(result.success).toBe(false);
    });
  });

  describe('Group not found', () => {
    // UT_NOTIF_12
    it('Group không tồn tại → { success: false, NOT_FOUND }', async () => {
      mockGroupFindById.mockResolvedValueOnce(null);

      const result = await createGroupNameChangeNotification(
        VALID_GROUP_ID,
        VALID_SENDER_ID,
        'Old Name',
        'New Name',
        'Actor'
      );

      expect(result.success).toBe(false);
      expect(result.statusCode).toBe(404);
    });
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

    // UT_NOTIF_14
    it('Group có members → result.success = true', async () => {
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

      const result = await createGroupNameChangeNotification(
        VALID_GROUP_ID,
        VALID_SENDER_ID,
        'Old Name',
        'New Name',
        'Actor Name'
      );

      expect(result.success).toBe(true);
    });

    // UT_NOTIF_15
    it('notifyGroupNameChange được gọi với đúng oldName và newName', async () => {
      const mockGroup = {
        members: [
          { userId: { _id: VALID_RECIPIENT_ID, toString: () => VALID_RECIPIENT_ID } }
        ]
      };
      mockGroupFindById.mockResolvedValueOnce(mockGroup);
      mockNotifyGroupNameChange.mockReturnValueOnce({
        enqueueAll: () => Promise.resolve([{ _id: 'notif-1' }])
      });

      await createGroupNameChangeNotification(
        VALID_GROUP_ID,
        VALID_SENDER_ID,
        'Old Group Name',
        'New Group Name',
        'Actor Name'
      );

      expect(mockNotifyGroupNameChange).toHaveBeenCalledTimes(1);
      expect(mockNotifyGroupNameChange).toHaveBeenCalledWith(
        expect.objectContaining({
          oldName: 'Old Group Name',
          newName: 'New Group Name'
        })
      );
    });

    // UT_NOTIF_16
    it('Group không có members → không gửi notification, vẫn success', async () => {
      const mockGroup = { members: [] };
      mockGroupFindById.mockResolvedValueOnce(mockGroup);
      mockNotifyGroupNameChange.mockReturnValueOnce({
        enqueueAll: () => Promise.resolve([])
      });

      const result = await createGroupNameChangeNotification(
        VALID_GROUP_ID,
        VALID_SENDER_ID,
        'Old Name',
        'New Name',
        'Actor'
      );

      // Kết quả không fail chỉ vì group không có members
      expect(result.success).not.toBe(false);
    });
  });
});
