import {NotesActionType, NotesActionTypes, NotesStatus} from './notes.types';
import {NotesObj} from './notes.models';

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

    case NotesActionTypes.NOTES_DELETE: {
      if (!state.notes[action.payload]) {
        return state;
      }
      const newNotes = {...state.notes};
      delete newNotes[action.payload];
      return {
        ...state,
        notes: newNotes,
      };
    }

    case NotesActionTypes.NOTES_UPDATE:
      return {
        ...state,
        notes: {
          ...state.notes,
          [action.payload.id]: action.payload,
        },
      };

    case NotesActionTypes.NOTES_TOGGLE_STARRED: {
      const note = state.notes[action.payload];
      if (!note) {
        return state;
      }
      return {
        ...state,
        notes: {
          ...state.notes,
          [action.payload]: {...note, isStarred: !note.isStarred},
        },
      };
    }

    case NotesActionTypes.NOTES_TOGGLE_PINNED: {
      const note = state.notes[action.payload];
      if (!note) {
        return state;
      }
      return {
        ...state,
        notes: {
          ...state.notes,
          [action.payload]: {...note, isPinned: !note.isPinned},
        },
      };
    }

    default:
      return state;
  }
};
