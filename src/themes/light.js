import {DefaultTheme as NavigationDefaultTheme} from '@react-navigation/native';
import {adaptNavigationTheme, MD3LightTheme} from 'react-native-paper';
import merge from 'deepmerge';

const CustomLightTheme = {
  ...NavigationDefaultTheme,
  dark: false,
};

const {LightTheme} = adaptNavigationTheme({
  reactNavigationLight: CustomLightTheme,
});

const MD3CustomLightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: 'rgb(94, 146, 250)',
    onPrimary: 'rgb(255, 255, 255)',
    primaryContainer: 'rgb(210, 230, 255)',
    onPrimaryContainer: 'rgb(10, 50, 120)',
    secondary: 'rgb(80, 130, 230)',
    onSecondary: 'rgb(255, 255, 255)',
    secondaryContainer: 'rgb(190, 220, 255)',
    onSecondaryContainer: 'rgb(10, 40, 110)',
    tertiary: 'rgb(70, 120, 210)',
    onTertiary: 'rgb(255, 255, 255)',
    tertiaryContainer: 'rgb(180, 210, 250)',
    onTertiaryContainer: 'rgb(5, 30, 100)',
    error: 'rgb(200, 70, 70)',
    onError: 'rgb(255, 255, 255)',
    errorContainer: 'rgb(255, 200, 200)',
    onErrorContainer: 'rgb(90, 10, 10)',
    background: 'rgb(245, 250, 255)',
    onBackground: 'rgb(20, 30, 40)',
    surface: 'rgb(255, 255, 255)',
    onSurface: 'rgb(30, 40, 50)',
    surfaceVariant: 'rgb(220, 230, 245)',
    onSurfaceVariant: 'rgb(60, 80, 110)',
    outline: 'rgb(110, 140, 180)',
    outlineVariant: 'rgb(170, 190, 220)',
    shadow: 'rgba(0, 0, 0, 0.2)',
    scrim: 'rgba(0, 0, 0, 0.3)',
    inverseSurface: 'rgb(50, 70, 100)',
    inverseOnSurface: 'rgb(230, 240, 255)',
    inversePrimary: 'rgb(170, 210, 255)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(240, 245, 255)',
      level2: 'rgb(230, 240, 255)',
      level3: 'rgb(220, 235, 250)',
      level4: 'rgb(210, 230, 245)',
      level5: 'rgb(200, 225, 240)',
    },
    surfaceDisabled: 'rgba(30, 40, 50, 0.12)',
    onSurfaceDisabled: 'rgba(30, 40, 50, 0.38)',
    backdrop: 'rgba(60, 80, 110, 0.4)',
  },
};

const CombinedDefaultTheme = merge(LightTheme, MD3CustomLightTheme);

export default CombinedDefaultTheme;
