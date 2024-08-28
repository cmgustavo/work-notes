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

const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);

export default CombinedDarkTheme;
