import React, {createContext, useState, useEffect, useContext} from 'react';
import {useColorScheme, ColorSchemeName, StatusBar} from 'react-native';
import {useAppDispatch, useAppSelector, RootState} from '../store';
import {setColorScheme} from '../store/app/app.actions';
import {PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import CombinedDefaultTheme from '../themes/light';
import CombinedDarkTheme from '../themes/dark';
import {SafeAreaProvider} from 'react-native-safe-area-context';

// Define the type for your context
type PreferencesContextType = {
  setColorTheme: (theme: ColorSchemeName) => void;
  colorTheme: ColorSchemeName;
};

export const PreferencesContext = createContext<PreferencesContextType>({
  setColorTheme: (theme: ColorSchemeName) => {},
  colorTheme: null,
});

export const PreferencesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const _theme = useAppSelector(({APP}: RootState) => APP.colorScheme);
  const [colorTheme, setColorTheme] = useState<ColorSchemeName>(_theme);
  const dispatch = useAppDispatch();
  const systemColorScheme = useColorScheme();
  let appTheme;
  if (!colorTheme) {
    appTheme =
      systemColorScheme === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme;
  } else {
    appTheme = colorTheme === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme;
  }

  useEffect(() => {
    if (!colorTheme) {
      appTheme =
        systemColorScheme === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme;
    }
  }, [systemColorScheme]);

  const handleSetColorTheme = (theme: ColorSchemeName) => {
    setColorTheme(theme);
    dispatch(setColorScheme(theme));
  };

  return (
    <SafeAreaProvider style={{backgroundColor: appTheme.colors.background}}>
      <StatusBar
        animated={true}
        barStyle={colorTheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={'transparent'}
        translucent={true}
      />
      <PreferencesContext.Provider
        value={{colorTheme, setColorTheme: handleSetColorTheme}}>
        <PaperProvider theme={appTheme}>
          <NavigationContainer theme={appTheme}>{children}</NavigationContainer>
        </PaperProvider>
      </PreferencesContext.Provider>
    </SafeAreaProvider>
  );
};

export const usePreferences = () => useContext(PreferencesContext);
