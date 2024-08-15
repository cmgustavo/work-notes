export type AppLoading = boolean;
export type GetNotesStatus = 'success' | 'failed' | null;

export type AppTheme = 'light' | 'dark';
export type NoteObject = {
  id: string;
  text: string;
  date: number;
  tags?: string[];
  isStarred?: boolean;
  isArchived?: boolean;
  isPinned?: boolean;
  isLocked?: boolean;
};

export enum AppActionTypes {
  NOTES_PENDING = 'App/NOTES_PENDING',
  NOTES_SUCCESS = 'App/NOTES_SUCCESS',
  NOTES_FAILED = 'App/NOTES_FAILED',
  CREATE = 'App/CREATE',
  DELETE = 'App/DELETE',
  UPDATE = 'App/UPDATE',
}

interface NotesPending {
  type: typeof AppActionTypes.NOTES_PENDING;
}

interface NotesSuccess {
  type: typeof AppActionTypes.NOTES_SUCCESS;
  payload: NoteObject[];
}

interface NotesFailed {
  type: typeof AppActionTypes.NOTES_FAILED;
}

interface CreateNote {
  type: typeof AppActionTypes.CREATE;
  payload: NoteObject;
}

interface DeleteNote {
  type: typeof AppActionTypes.DELETE;
  payload: string;
}

interface UpdateNote {
  type: typeof AppActionTypes.UPDATE;
  payload: NoteObject;
}

export type AppActionType =
  | NotesPending
  | NotesSuccess
  | NotesFailed
  | CreateNote
  | DeleteNote
  | UpdateNote;
