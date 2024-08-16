import React, {useCallback, useEffect, useState} from 'react';
import {useColorScheme, ColorSchemeName, Appearance} from 'react-native';

import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';

import {useAppDispatch} from './store';
import {initialize} from './store/app';
import MainNavigation from './components/main-navigation';

const App = () => {
  const dispatch = useAppDispatch();
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

  useEffect(() => {
    dispatch(initialize());
  }, []);

  return (
    <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <MainNavigation />
    </NavigationContainer>
  );
};

export default App;
