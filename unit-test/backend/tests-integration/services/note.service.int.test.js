/**
 * Integration Tests: note.service.js
 * Source: backend/src/services/note.service.js
 *
 * File name mirror source file để nhìn vào là biết đang test service nào.
 */

const path = require('path');

const noteService = require(path.resolve(__dirname, '../../../../backend/src/services/note.service'));
const Note = require(path.resolve(__dirname, '../../../../backend/src/models/Note.model'));

const {
  connectTestDb,
  disconnectTestDb,
  cleanupByRunId,
  assertCleanRunId
} = require('../_helpers/db');

const {
  createTestRunId,
  buildTaggedValue,
  createUser,
  createGroup,
  createFolder,
  createNoteDoc
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

describe('Integration - note.service.js', () => {
  describe('createNote', () => {
    // IT_NOTE_CREATE_01
    test('creates note in DB and resolves default folder when folderId is omitted', async () => {
      const owner = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'note_owner',
        namePrefix: 'Note Owner'
      });
      const group = await createGroup({
        testRunId: TEST_RUN_ID,
        creator: owner,
        namePrefix: 'note_group'
      });
      const defaultFolder = await createFolder({
        testRunId: TEST_RUN_ID,
        group,
        creator: owner,
        namePrefix: 'default_folder',
        isDefault: true
      });

      const title = buildTaggedValue('note_create', TEST_RUN_ID);
      const created = await noteService.createNote({
        title,
        content: 'hello integration',
        userId: owner._id,
        groupId: group._id
      });

      const fromDb = await Note.findById(created._id).lean();

      expect(fromDb).toBeTruthy();
      expect(fromDb.title).toBe(title);
      expect(fromDb.content).toBe('hello integration');
      expect(String(fromDb.userId)).toBe(String(owner._id));
      expect(String(fromDb.groupId)).toBe(String(group._id));
      expect(String(fromDb.folderId)).toBe(String(defaultFolder._id));
    });

    // IT_NOTE_CREATE_02
    test('creates note with boundary-valid title/content and persists exact values', async () => {
      const owner = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'note_boundary_owner',
        namePrefix: 'Note Boundary Owner'
      });
      const group = await createGroup({
        testRunId: TEST_RUN_ID,
        creator: owner,
        namePrefix: 'note_boundary_group'
      });
      const defaultFolder = await createFolder({
        testRunId: TEST_RUN_ID,
        group,
        creator: owner,
        namePrefix: 'note_boundary_default',
        isDefault: true
      });
      const title = `${buildTaggedValue('note_boundary', TEST_RUN_ID)}${'x'.repeat(200 - buildTaggedValue('note_boundary', TEST_RUN_ID).length)}`;
      const content = 'c'.repeat(10000);

      const created = await noteService.createNote({
        title,
        content,
        userId: owner._id,
        groupId: group._id
      });

      const fromDb = await Note.findById(created._id).lean();

      expect(fromDb).toBeTruthy();
      expect(fromDb.title).toBe(title);
      expect(fromDb.title).toHaveLength(200);
      expect(fromDb.content).toBe(content);
      expect(String(fromDb.folderId)).toBe(String(defaultFolder._id));
    });
  });

  describe('updateNote', () => {
    // IT_NOTE_UPDATE_01
    test('updates title/content/folder and persists lastEdited in DB', async () => {
      const owner = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'note_upd_owner',
        namePrefix: 'Note Upd Owner'
      });
      const group = await createGroup({
        testRunId: TEST_RUN_ID,
        creator: owner,
        namePrefix: 'note_upd_group'
      });
      const defaultFolder = await createFolder({
        testRunId: TEST_RUN_ID,
        group,
        creator: owner,
        namePrefix: 'note_upd_default',
        isDefault: true
      });
      const targetFolder = await createFolder({
        testRunId: TEST_RUN_ID,
        group,
        creator: owner,
        namePrefix: 'note_upd_target'
      });
      const note = await createNoteDoc({
        testRunId: TEST_RUN_ID,
        user: owner,
        group,
        folder: defaultFolder,
        titlePrefix: 'note_before',
        content: 'before update'
      });
      const oldLastEdited = new Date('2024-01-01T00:00:00.000Z');

      await Note.updateOne(
        { _id: note._id },
        { $set: { lastEdited: oldLastEdited } }
      );

      const updatedTitle = buildTaggedValue('note_after', TEST_RUN_ID);
      const updated = await noteService.updateNote(
        note._id,
        owner._id,
        group._id,
        {
          title: updatedTitle,
          content: 'after update',
          folderId: targetFolder._id
        }
      );

      const fromDb = await Note.findById(note._id).lean();

      expect(updated).toBeTruthy();
      expect(fromDb.title).toBe(updatedTitle);
      expect(fromDb.content).toBe('after update');
      expect(String(fromDb.folderId)).toBe(String(targetFolder._id));
      expect(new Date(fromDb.lastEdited).getTime()).toBeGreaterThan(oldLastEdited.getTime());
    });

    // IT_NOTE_UPDATE_02
    test('rejects invalid folderId and leaves the note unchanged in DB', async () => {
      const owner = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'note_invalid_folder_owner',
        namePrefix: 'Note Invalid Folder Owner'
      });
      const group = await createGroup({
        testRunId: TEST_RUN_ID,
        creator: owner,
        namePrefix: 'note_invalid_folder_group'
      });
      const defaultFolder = await createFolder({
        testRunId: TEST_RUN_ID,
        group,
        creator: owner,
        namePrefix: 'note_invalid_folder_default',
        isDefault: true
      });
      const originalTitle = buildTaggedValue('note_invalid_folder_original', TEST_RUN_ID);
      const note = await createNoteDoc({
        testRunId: TEST_RUN_ID,
        user: owner,
        group,
        folder: defaultFolder,
        titlePrefix: 'note_invalid_folder_original',
        content: 'original content'
      });

      await Note.updateOne({ _id: note._id }, { $set: { title: originalTitle } });

      await expect(
        noteService.updateNote(note._id, owner._id, group._id, {
          title: buildTaggedValue('note_invalid_folder_new', TEST_RUN_ID),
          folderId: 'invalid-folder-id'
        })
      ).rejects.toThrow();

      const fromDb = await Note.findById(note._id).lean();

      expect(fromDb.title).toBe(originalTitle);
      expect(fromDb.content).toBe('original content');
      expect(String(fromDb.folderId)).toBe(String(defaultFolder._id));
    });

    // IT_NOTE_UPDATE_03
    test('rejects folder from another group and leaves the note unchanged in DB', async () => {
      const owner = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'note_cross_group_owner',
        namePrefix: 'Note Cross Group Owner'
      });
      const group = await createGroup({
        testRunId: TEST_RUN_ID,
        creator: owner,
        namePrefix: 'note_cross_group'
      });
      const otherGroup = await createGroup({
        testRunId: TEST_RUN_ID,
        creator: owner,
        namePrefix: 'note_cross_group_other'
      });
      const defaultFolder = await createFolder({
        testRunId: TEST_RUN_ID,
        group,
        creator: owner,
        namePrefix: 'note_cross_group_default',
        isDefault: true
      });
      const foreignFolder = await createFolder({
        testRunId: TEST_RUN_ID,
        group: otherGroup,
        creator: owner,
        namePrefix: 'note_cross_group_foreign'
      });
      const note = await createNoteDoc({
        testRunId: TEST_RUN_ID,
        user: owner,
        group,
        folder: defaultFolder,
        titlePrefix: 'note_cross_group_note',
        content: 'cross group original'
      });

      await expect(
        noteService.updateNote(note._id, owner._id, group._id, {
          content: 'should not persist',
          folderId: foreignFolder._id
        })
      ).rejects.toThrow('Folder not found');

      const fromDb = await Note.findById(note._id).lean();

      expect(fromDb.content).toBe('cross group original');
      expect(String(fromDb.folderId)).toBe(String(defaultFolder._id));
    });
  });

  describe('toggleBookmark', () => {
    // IT_NOTE_BOOKMARK_01
    test('toggles bookmark and persists the new state', async () => {
      const owner = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'note_bm_owner',
        namePrefix: 'Note Bm Owner'
      });
      const group = await createGroup({
        testRunId: TEST_RUN_ID,
        creator: owner,
        namePrefix: 'note_bm_group'
      });
      const defaultFolder = await createFolder({
        testRunId: TEST_RUN_ID,
        group,
        creator: owner,
        namePrefix: 'note_bm_default',
        isDefault: true
      });
      const note = await createNoteDoc({
        testRunId: TEST_RUN_ID,
        user: owner,
        group,
        folder: defaultFolder,
        titlePrefix: 'note_bm'
      });

      expect(note.isBookmarked).toBe(false);

      const toggled = await noteService.toggleBookmark(note._id, owner._id, group._id);
      const fromDb = await Note.findById(note._id).lean();

      expect(toggled).toBeTruthy();
      expect(toggled.isBookmarked).toBe(true);
      expect(fromDb.isBookmarked).toBe(true);
    });

    // IT_NOTE_BOOKMARK_02
    test('toggles bookmark twice and persists the final false state', async () => {
      const owner = await createUser({
        testRunId: TEST_RUN_ID,
        emailPrefix: 'note_bm_twice_owner',
        namePrefix: 'Note Bm Twice Owner'
      });
      const group = await createGroup({
        testRunId: TEST_RUN_ID,
        creator: owner,
        namePrefix: 'note_bm_twice_group'
      });
      const defaultFolder = await createFolder({
        testRunId: TEST_RUN_ID,
        group,
        creator: owner,
        namePrefix: 'note_bm_twice_default',
        isDefault: true
      });
      const note = await createNoteDoc({
        testRunId: TEST_RUN_ID,
        user: owner,
        group,
        folder: defaultFolder,
        titlePrefix: 'note_bm_twice'
      });

      await noteService.toggleBookmark(note._id, owner._id, group._id);
      const toggledBack = await noteService.toggleBookmark(note._id, owner._id, group._id);
      const fromDb = await Note.findById(note._id).lean();

      expect(toggledBack).toBeTruthy();
      expect(toggledBack.isBookmarked).toBe(false);
      expect(fromDb.isBookmarked).toBe(false);
    });
  });
});
