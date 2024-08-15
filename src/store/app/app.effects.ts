import {Effect} from '../index';
import {
  notesFailed,
  notesSuccess,
  notesPending,
  createNote,
  deleteNote,
  updateNote,
} from './index';

import {NoteObject} from './app.types';

export const initialize =
  (): Effect<Promise<any>> => async (dispatch, getState) => {
    const {APP} = getState();
    dispatch(notesPending());
    try {
      const notes = APP.notes;
      dispatch(notesSuccess(notes));
    } catch (error: any) {
      dispatch(notesFailed());
    }
  };

export const create =
  (note: NoteObject): Effect<void> =>
  async (dispatch, getState) => {
    dispatch(createNote(note));
  };

export const remove =
  (id: string): Effect<void> =>
  async (dispatch, getState) => {
    dispatch(deleteNote(id));
  };

export const update =
  (note: NoteObject): Effect<void> =>
  async (dispatch, getState) => {
    dispatch(updateNote(note));
  };
