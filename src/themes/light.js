import {DefaultTheme as NavigationDefaultTheme} from '@react-navigation/native';
import {adaptNavigationTheme, MD3LightTheme} from 'react-native-paper';
import merge from 'deepmerge';

const CustomLightTheme = {
  ...NavigationDefaultTheme,
  dark: false,
  colors: {
    card: '#FFFFFF',
    border: '#1C1B1F',
    notification: '#79747E',
  },
};

const {LightTheme} = adaptNavigationTheme({
  reactNavigationLight: CustomLightTheme,
});

const MD3CustomLightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#0D47A1', // Dark Blue
    secondary: '#546E7A', // Blue Grey
    tertiary: '#1E88E5', // Bright Blue
  },
};

const CombinedDefaultTheme = merge(MD3CustomLightTheme, LightTheme);

export default CombinedDefaultTheme;
