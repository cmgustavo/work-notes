import {Effect} from '../index';
import {notesSuccess, notesFailed} from './index';
import {NotesObj} from './notes.models';

export const initializeNotes =
  (): Effect<Promise<any>> => async (dispatch, getState) => {
    const {NOTES} = getState();
    try {
      const notes = NOTES.notes;
      dispatch(notesSuccess(notes));
    } catch (error: any) {
      dispatch(notesFailed());
    }
  };
