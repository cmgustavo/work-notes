import {AppActionType, AppActionTypes, NoteObject} from './app.types';

export const notesPending = (): AppActionType => ({
  type: AppActionTypes.NOTES_PENDING,
});

export const notesSuccess = (notes: NoteObject[]): AppActionType => ({
  type: AppActionTypes.NOTES_SUCCESS,
  payload: notes,
});

export const notesFailed = (): AppActionType => ({
  type: AppActionTypes.NOTES_FAILED,
});

export const createNote = (note: NoteObject): AppActionType => ({
  type: AppActionTypes.CREATE,
  payload: note,
});

export const deleteNote = (id: string): AppActionType => ({
  type: AppActionTypes.DELETE,
  payload: id,
});

export const updateNote = (note: NoteObject): AppActionType => ({
  type: AppActionTypes.UPDATE,
  payload: note,
});
