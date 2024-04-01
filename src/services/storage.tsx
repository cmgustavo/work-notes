import AsyncStorage from '@react-native-async-storage/async-storage';

const NOTES_KEY = 'notes';
const THEME_KEY = 'theme';

export const storeData = async (value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(NOTES_KEY, jsonValue);
  } catch (e) {
    console.log('Error storing data', e);
  }
};

export const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(NOTES_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log('Error getting data', e);
  }
};

export const colorModeManager = {
  get: async () => {
    try {
      let val = await AsyncStorage.getItem(THEME_KEY);
      return val === 'dark' ? 'dark' : 'light';
    } catch (e) {
      return 'light';
    }
  },
  set: async (value: 'dark' | 'light') => {
    try {
      await AsyncStorage.setItem(THEME_KEY, value);
    } catch (e) {
      console.log('Error setting theme', e);
    }
  },
};
