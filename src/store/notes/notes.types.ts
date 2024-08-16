import {NotesObj, NoteObj} from './notes.models';

export type NotesStatus = 'success' | 'failed' | null;

export enum NotesActionTypes {
  NOTES_SUCCESS = 'NOTES/SUCCESS',
  NOTES_FAILED = 'NOTES/FAILED',
  NOTES_CREATE = 'NOTES/CREATE',
  NOTES_DELETE = 'NOTES/DELETE',
  NOTES_UPDATE = 'NOTES/UPDATE',
}

interface NotesSuccess {
  type: typeof NotesActionTypes.NOTES_SUCCESS;
  payload: NotesObj;
}

interface NotesFailed {
  type: typeof NotesActionTypes.NOTES_FAILED;
}

interface CreateNote {
  type: typeof NotesActionTypes.NOTES_CREATE;
  payload: NoteObj;
}

interface DeleteNote {
  type: typeof NotesActionTypes.NOTES_DELETE;
  payload: string;
}

interface UpdateNote {
  type: typeof NotesActionTypes.NOTES_UPDATE;
  payload: NoteObj;
}

export type NotesActionType =
  | NotesSuccess
  | NotesFailed
  | CreateNote
  | DeleteNote
  | UpdateNote;
