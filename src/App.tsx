import React, {useCallback, useEffect, useState} from 'react';
import {useColorScheme, ColorSchemeName, Appearance} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';

import {useAppDispatch, useAppSelector, RootState} from './store';
import {initializeApp} from './store/app';
import MainNavigation from './components/main-navigation';
import CombinedDefaultTheme from './themes/light';
import CombinedDarkTheme from './themes/dark';

import {PaperProvider} from 'react-native-paper';

const App = () => {
  const dispatch = useAppDispatch();
  const _theme = useAppSelector(({APP}: RootState) => APP.appTheme);

  const [theme, setTheme] = useState<ColorSchemeName>(useColorScheme());

  const themeChangeListener = useCallback(() => {
    if (!theme) {
      setTheme(Appearance.getColorScheme());
    }
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
    <PaperProvider
      theme={theme === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme}>
      <NavigationContainer
        theme={theme === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme}>
        <MainNavigation />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
