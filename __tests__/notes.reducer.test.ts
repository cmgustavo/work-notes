/**
 * @format
 */

import {NotesReducer, NotesState} from '../src/store/notes/notes.reducer';
import {
  createNote,
  deleteNote,
  updateNote,
  togglePinned,
  toggleStarred,
} from '../src/store/notes/notes.actions';
import {NoteObj} from '../src/store/notes/notes.models';

const note: NoteObj = {
  id: 'abc123',
  text: 'Standup notes',
  date: 1700000000000,
};

const stateWith = (...notes: NoteObj[]): NotesState => ({
  status: 'success',
  notes: Object.fromEntries(notes.map(n => [n.id, n])),
});

describe('NotesReducer', () => {
  it('creates a note', () => {
    const state = NotesReducer(stateWith(), createNote(note));
    expect(state.notes[note.id]).toEqual(note);
  });

  it('deletes a note', () => {
    const state = NotesReducer(stateWith(note), deleteNote(note.id));
    expect(state.notes).toEqual({});
  });

  it('toggles starred and pinned', () => {
    let state = NotesReducer(stateWith(note), toggleStarred(note.id));
    expect(state.notes[note.id].isStarred).toBe(true);

    state = NotesReducer(state, togglePinned(note.id));
    expect(state.notes[note.id].isPinned).toBe(true);

    state = NotesReducer(state, toggleStarred(note.id));
    expect(state.notes[note.id].isStarred).toBe(false);
  });

  it('ignores a toggle for an unknown note instead of throwing', () => {
    const state = stateWith(note);
    expect(NotesReducer(state, toggleStarred('missing'))).toBe(state);
    expect(NotesReducer(state, togglePinned('missing'))).toBe(state);
  });

  it('keeps starred and pinned flags when a note is edited', () => {
    const flagged: NoteObj = {...note, isStarred: true, isPinned: true};
    const state = NotesReducer(
      stateWith(flagged),
      updateNote({...flagged, text: 'Edited text'}),
    );

    expect(state.notes[note.id].text).toBe('Edited text');
    expect(state.notes[note.id].isStarred).toBe(true);
    expect(state.notes[note.id].isPinned).toBe(true);
  });
});
