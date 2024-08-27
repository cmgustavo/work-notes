import React, {useCallback, useEffect, useState} from 'react';
import {useColorScheme, ColorSchemeName, Appearance} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';

import {useAppDispatch} from './store';
import {initializeApp} from './store/app';
import MainNavigation from './components/main-navigation';
import LightTheme from './themes/light';
import DarkTheme from './themes/dark';

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
    dispatch(initializeApp());
  }, []);

  return (
    <NavigationContainer theme={theme === 'dark' ? DarkTheme : LightTheme}>
      <MainNavigation />
    </NavigationContainer>
  );
};

export default App;
