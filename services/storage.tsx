import AsyncStorage from "@react-native-async-storage/async-storage";

const NOTES_KEY = "notes";

export const storeData = async (value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(NOTES_KEY, jsonValue);
  } catch (e) {
    console.log("[App.tsx:33]", e); /* TODO */
  }
};

export const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(NOTES_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log("[App.tsx:42]", e); /* TODO */
  }
};
