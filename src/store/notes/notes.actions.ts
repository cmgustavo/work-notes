import {NotesObj, NoteObj} from './notes.models';
import {NotesActionType, NotesActionTypes} from './notes.types';

export const notesSuccess = (notes: NotesObj): NotesActionType => ({
  type: NotesActionTypes.NOTES_SUCCESS,
  payload: notes,
});

export const notesFailed = (): NotesActionType => ({
  type: NotesActionTypes.NOTES_FAILED,
});

export const createNote = (note: NoteObj): NotesActionType => ({
  type: NotesActionTypes.NOTES_CREATE,
  payload: note,
});

export const deleteNote = (id: string): NotesActionType => ({
  type: NotesActionTypes.NOTES_DELETE,
  payload: id,
});

export const updateNote = (note: NoteObj): NotesActionType => ({
  type: NotesActionTypes.NOTES_UPDATE,
  payload: note,
});
