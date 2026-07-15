// react-native-mmkv is a JSI native module and cannot load under Jest, so back
// the store with an in-memory Map for tests.
jest.mock('react-native-mmkv', () => {
  const store = new Map();
  return {
    MMKV: jest.fn().mockImplementation(() => ({
      set: (key, value) => store.set(key, value),
      getString: key => store.get(key),
      delete: key => store.delete(key),
      clearAll: () => store.clear(),
    })),
  };
});
