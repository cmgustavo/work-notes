import {DarkTheme as NavigationDarkTheme} from '@react-navigation/native';
import {adaptNavigationTheme, MD3DarkTheme} from 'react-native-paper';
import merge from 'deepmerge';

const CustomDarkTheme = {
  ...NavigationDarkTheme,
  dark: true,
};

const {DarkTheme} = adaptNavigationTheme({
  reactNavigationDark: NavigationDarkTheme,
});

const MD3CustomDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: 'rgb(170, 210, 255)',
    onPrimary: 'rgb(10, 40, 100)',
    primaryContainer: 'rgb(60, 100, 190)',
    onPrimaryContainer: 'rgb(220, 240, 255)',
    secondary: 'rgb(160, 200, 250)',
    onSecondary: 'rgb(20, 50, 100)',
    secondaryContainer: 'rgb(70, 110, 180)',
    onSecondaryContainer: 'rgb(220, 240, 255)',
    tertiary: 'rgb(140, 190, 250)',
    onTertiary: 'rgb(10, 40, 90)',
    tertiaryContainer: 'rgb(80, 130, 210)',
    onTertiaryContainer: 'rgb(220, 240, 255)',
    error: 'rgb(220, 100, 100)',
    onError: 'rgb(60, 10, 10)',
    errorContainer: 'rgb(130, 60, 60)',
    onErrorContainer: 'rgb(255, 200, 200)',
    background: 'rgb(20, 30, 50)',
    onBackground: 'rgb(220, 240, 255)',
    surface: 'rgb(20, 30, 50)',
    onSurface: 'rgb(220, 240, 255)',
    surfaceVariant: 'rgb(50, 70, 100)',
    onSurfaceVariant: 'rgb(160, 190, 230)',
    outline: 'rgb(120, 150, 190)',
    outlineVariant: 'rgb(80, 110, 150)',
    shadow: 'rgba(10, 20, 40, 0.8)',
    scrim: 'rgba(20, 40, 60, 0.5)',
    inverseSurface: 'rgb(200, 220, 245)',
    inverseOnSurface: 'rgb(30, 50, 80)',
    inversePrimary: 'rgb(90, 150, 230)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(40, 60, 90)',
      level2: 'rgb(50, 70, 100)',
      level3: 'rgb(60, 80, 110)',
      level4: 'rgb(70, 90, 120)',
      level5: 'rgb(80, 100, 130)',
    },
    surfaceDisabled: 'rgba(220, 240, 255, 0.12)',
    onSurfaceDisabled: 'rgba(220, 240, 255, 0.38)',
    backdrop: 'rgba(50, 70, 100, 0.4)',
  },
};

const CombinedDarkTheme = merge(DarkTheme, MD3CustomDarkTheme);

export default CombinedDarkTheme;
