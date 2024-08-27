import {DarkTheme as DefaultDarkTheme} from '@react-navigation/native';

const DarkTheme = {
  ...DefaultDarkTheme,
  dark: true,
  colors: {
    primary: '#A6AEE5',
    background: '#121212',
    card: '#1F1F1F',
    text: '#FFFFFF',
    border: '#272727',
    notification: '#FF5252',
  },
};

export default DarkTheme;
