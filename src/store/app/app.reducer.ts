import {
  AppActionType,
  AppActionTypes,
  AppLoading,
  NoteObject,
  GetNotesStatus,
} from './app.types';

export const AppReduxPersistBlackList: (keyof AppState)[] = [
  'isLoading',
  'getNotesStatus',
];

export interface AppState {
  isLoading: AppLoading;
  getNotesStatus: GetNotesStatus;
  notes: NoteObject[];
}

const initialState: AppState = {
  isLoading: false,
  getNotesStatus: null,
  notes: [],
};

export const AppReducer = (
  state: AppState = initialState,
  action: AppActionType,
): AppState => {
  switch (action.type) {
    case AppActionTypes.NOTES_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case AppActionTypes.NOTES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        getNotesStatus: 'success',
        notes: action.payload,
      };
    case AppActionTypes.NOTES_FAILED:
      return {
        ...state,
        isLoading: false,
        getNotesStatus: 'failed',
      };

    case AppActionTypes.CREATE:
      return {
        ...state,
        notes: [...state.notes, action.payload],
      };

    case AppActionTypes.DELETE:
      return {
        ...state,
        notes: state.notes.filter(note => note.id !== action.payload),
      };

    case AppActionTypes.UPDATE:
      return {
        ...state,
        notes: state.notes.map(note =>
          note.id === action.payload.id ? action.payload : note,
        ),
      };

    default:
      return state;
  }
};
