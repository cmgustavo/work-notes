import { Platform } from "react-native";

const getPlatform = (): string => {
  const pOS =
    Platform.OS === "ios"
      ? "iOS"
      : Platform.OS === "android"
      ? "Android"
      : "Other";
  const pVersion = Platform.Version;
  return pOS + " v" + pVersion;
};

export default getPlatform;
