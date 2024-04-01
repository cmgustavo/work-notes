import React, {useCallback, useEffect, useState} from 'react';
import {useColorScheme, ColorSchemeName, Appearance} from 'react-native';

import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';

import MainNavigation from './components/main-navigation';

const App = () => {
  const [theme, setTheme] = useState<ColorSchemeName>(useColorScheme());

  const themeChangeListener = useCallback(() => {
    setTheme(Appearance.getColorScheme());
  }, []);

  useEffect(() => {
    Appearance.addChangeListener(themeChangeListener);
    return () => {
      Appearance.addChangeListener(themeChangeListener);
    };
  }, [themeChangeListener]);

  return (
    <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <MainNavigation />
    </NavigationContainer>
  );
};

export default App;
