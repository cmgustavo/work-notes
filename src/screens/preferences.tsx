import React, {useState, useContext} from 'react';
import {View, Text, TouchableOpacity, Appearance} from 'react-native';
import {RadioButton, List} from 'react-native-paper';
import {useAppDispatch, useAppSelector, RootState} from '../store';
import {useTheme, Switch} from 'react-native-paper';
import {useColorScheme, ColorSchemeName} from 'react-native';

import {
  PreferencesContext,
  usePreferences,
} from '../context/PreferencesContext';
import {ContainerStyles, GlobalStyles, TextStyles} from '../styles';

const Preferences = ({route, navigation}) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const {colorTheme, setColorTheme} = usePreferences();
  console.log('[preferences.tsx:16]', colorTheme); /* TODO */

  const [checked, setChecked] = useState(colorTheme);
  console.log('[preferences.tsx:19]', checked); /* TODO */

  const handleThemeChange = (newTheme: ColorSchemeName) => {
    setColorTheme(newTheme);
    setChecked(newTheme);
  };

  return (
    <View
      style={[
        ContainerStyles.globalContainer,
        {backgroundColor: theme.colors.background},
      ]}>
      <List.Section>
        <Text style={[TextStyles.optionsTitle, {color: theme.colors.primary}]}>
          Theme
        </Text>
        <TouchableOpacity
          onPress={() => handleThemeChange('light')}
          style={[
            GlobalStyles.itemContainer,
            {
              backgroundColor: theme.colors.background,
              borderBottomColor: theme.colors.surfaceVariant,
            },
          ]}>
          <Text style={[GlobalStyles.itemText, {color: theme.colors.primary}]}>
            Light
          </Text>
          <RadioButton
            value="light"
            status={checked === 'light' ? 'checked' : 'unchecked'}
            onPress={() => handleThemeChange('light')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleThemeChange('dark')}
          style={[
            GlobalStyles.itemContainer,
            {
              backgroundColor: theme.colors.background,
              borderBottomColor: theme.colors.surfaceVariant,
            },
          ]}>
          <Text style={[GlobalStyles.itemText, {color: theme.colors.primary}]}>
            Dark
          </Text>
          <RadioButton
            value="dark"
            status={checked === 'dark' ? 'checked' : 'unchecked'}
            onPress={() => handleThemeChange('dark')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleThemeChange(null)}
          style={[
            GlobalStyles.itemContainer,
            {
              backgroundColor: theme.colors.background,
              borderBottomColor: theme.colors.surfaceVariant,
            },
          ]}>
          <Text style={[GlobalStyles.itemText, {color: theme.colors.primary}]}>
            System
          </Text>
          <RadioButton
            value="system"
            status={!checked ? 'checked' : 'unchecked'}
            onPress={() => handleThemeChange(null)}
          />
        </TouchableOpacity>
      </List.Section>
    </View>
  );
};

export default Preferences;
