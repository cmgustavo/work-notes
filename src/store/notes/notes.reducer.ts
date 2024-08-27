import {NotesActionType, NotesActionTypes, NotesStatus} from './notes.types';
import {NotesObj, NoteObj} from './notes.models';

export const NotesReduxPersistBlackList: (keyof NotesState)[] = ['status'];

export interface NotesState {
  status: NotesStatus;
  notes: NotesObj;
}

const initialState: NotesState = {
  status: null,
  notes: {},
};

export const NotesReducer = (
  state: NotesState = initialState,
  action: NotesActionType,
): NotesState => {
  switch (action.type) {
    case NotesActionTypes.NOTES_SUCCESS:
      return {
        ...state,
        status: 'success',
        notes: action.payload,
      };
    case NotesActionTypes.NOTES_FAILED:
      return {
        ...state,
        status: 'failed',
      };

    case NotesActionTypes.NOTES_CREATE:
      return {
        ...state,
        notes: {
          ...state.notes,
          [action.payload.id]: action.payload,
        },
      };

    case NotesActionTypes.NOTES_DELETE:
      if (Object.keys(state.notes).length > 0) {
        const {[action.payload]: _, ...newNotes} = state.notes as {
          [key: string]: NoteObj;
        };
        return {
          ...state,
          notes: newNotes,
        };
      }
      return state;

    case NotesActionTypes.NOTES_UPDATE:
      return {
        ...state,
        notes: {
          ...state.notes,
          [action.payload.id]: action.payload,
        },
      };

    default:
      return state;
  }
};
