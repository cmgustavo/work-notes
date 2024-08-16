import {
  createStore,
  applyMiddleware,
  combineReducers,
  Action,
  AnyAction,
} from 'redux';
import {thunk, ThunkAction, ThunkDispatch} from 'redux-thunk';
import {Storage, persistReducer, persistStore} from 'redux-persist';
import {MMKV} from 'react-native-mmkv';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import {Selector} from 'reselect';
import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux';

import {AppReducer, AppReduxPersistBlackList} from './app/app.reducer';
import {NotesReducer, NotesReduxPersistBlackList} from './notes/notes.reducer';

const reducers = {
  APP: AppReducer,
  NOTES: NotesReducer,
};

const storage = new MMKV();

export const reduxStorage: Storage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: key => {
    storage.delete(key);
    return Promise.resolve();
  },
};

const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  stateReconciler: autoMergeLevel2,
};

const reducerPersistBlackLists: Record<keyof typeof reducers, string[]> = {
  APP: AppReduxPersistBlackList,
  NOTES: NotesReduxPersistBlackList,
};

const rootReducer = combineReducers(reducers);

// @ts-ignore
const persistedReducer = persistReducer(persistConfig, rootReducer);

const getStore = () => {
  const store = createStore(
    persistedReducer,
    undefined,
    applyMiddleware(thunk),
  );
  // @ts-ignore
  const persistor = persistStore(store);
  return {store, persistor};
};

export default getStore;

export type RootState = ReturnType<typeof rootReducer>;

export type AppSelector<T = any> = Selector<RootState, T>;

export type Effect<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;

export const useAppDispatch = () => {
  return useDispatch<AppDispatch>();
};

export const useAppSelector = useSelector as TypedUseSelectorHook<RootState>;
