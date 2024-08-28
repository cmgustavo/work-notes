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

const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme);

export default CombinedDefaultTheme;
