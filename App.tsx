import React from "react";
import { useColorScheme } from "react-native";

import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";

import MainNavigation from "./components/main-navigation";

const App = () => {
  const scheme = useColorScheme();

  return (
    <NavigationContainer theme={scheme === "dark" ? DarkTheme : DefaultTheme}>
      <MainNavigation />
    </NavigationContainer>
  );
};

export default App;
