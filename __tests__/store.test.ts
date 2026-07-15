/**
 * @format
 */

import getStore, {reduxStorage} from '../src/store';
import {createNote, notesSuccess} from '../src/store/notes/notes.actions';
import {setColorScheme} from '../src/store/app/app.actions';

// redux-persist flushes to storage on a timer, so wait for the write to land.
const waitForPersist = async () => {
  for (let i = 0; i < 50; i++) {
    const raw = await reduxStorage.getItem('persist:root');
    if (raw) {
      return raw;
    }
    await new Promise(resolve => setTimeout(resolve, 20));
  }
  throw new Error('redux-persist never wrote to storage');
};

describe('persisted store', () => {
  it('persists notes and the chosen colour scheme, but not transient status', async () => {
    const {store} = getStore();

    store.dispatch(notesSuccess({}));
    store.dispatch(
      createNote({id: 'n1', text: 'Standup', date: 1700000000000}),
    );
    store.dispatch(setColorScheme('dark'));

    const raw = await waitForPersist();
    const persisted = JSON.parse(raw as string);

    const notes = JSON.parse(persisted.NOTES);
    const app = JSON.parse(persisted.APP);

    expect(notes.notes.n1.text).toBe('Standup');
    expect(app.colorScheme).toBe('dark');

    // Blacklisted keys must never reach storage; they come from initialState.
    expect(notes).not.toHaveProperty('status');
    expect(app).not.toHaveProperty('appStatus');
  });
});
