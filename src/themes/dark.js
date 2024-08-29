import {DarkTheme as NavigationDarkTheme} from '@react-navigation/native';
import {adaptNavigationTheme, MD3DarkTheme} from 'react-native-paper';
import merge from 'deepmerge';

const CustomDarkTheme = {
  ...NavigationDarkTheme,
  dark: true,
  colors: {
    card: '#121212',
    border: '#121212',
    notification: '#938F99',
  },
};

const {DarkTheme} = adaptNavigationTheme({
  reactNavigationDark: NavigationDarkTheme,
});

const MD3CustomDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#1565C0', // Medium Blue for Dark Mode
    secondary: '#90A4AE', // Light Blue Grey
    tertiary: '#42A5F5', // Sky Blue
  },
};

const CombinedDarkTheme = merge(MD3CustomDarkTheme, DarkTheme);

export default CombinedDarkTheme;
