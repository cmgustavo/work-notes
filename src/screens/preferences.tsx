import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Appearance} from 'react-native';
import {RadioButton, List} from 'react-native-paper';
import {useAppDispatch, useAppSelector, RootState} from '../store';
import {useTheme} from 'react-native-paper';
import {useColorScheme, ColorSchemeName} from 'react-native';

import {appTheme} from '../store/app/app.actions';
import {ContainerStyles, GlobalStyles, TextStyles} from '../styles';

const Preferences = ({route, navigation}) => {
  const dispatch = useAppDispatch();
  const {colors} = useTheme();
  const _theme = useAppSelector(({APP}: RootState) => APP.appTheme);
  const [theme, setTheme] = useState<ColorSchemeName>(_theme);
  const [checked, setChecked] = useState(theme);

  const handleThemeChange = (newTheme: ColorSchemeName) => {
    setChecked(newTheme);
    dispatch(appTheme(newTheme));
    setTheme(newTheme);
    Appearance.setColorScheme(newTheme);
  };

  return (
    <View
      style={[
        ContainerStyles.globalContainer,
        {backgroundColor: colors.background},
      ]}>
      <List.Section>
        <Text style={[TextStyles.optionsTitle, {color: colors.primary}]}>
          Theme
        </Text>
        <TouchableOpacity
          onPress={() => handleThemeChange('light')}
          style={[
            GlobalStyles.itemContainer,
            {
              backgroundColor: colors.background,
              borderBottomColor: colors.surfaceVariant,
            },
          ]}>
          <Text style={[GlobalStyles.itemText, {color: colors.primary}]}>
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
              backgroundColor: colors.background,
              borderBottomColor: colors.surfaceVariant,
            },
          ]}>
          <Text style={[GlobalStyles.itemText, {color: colors.primary}]}>
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
              backgroundColor: colors.background,
              borderBottomColor: colors.surfaceVariant,
            },
          ]}>
          <Text style={[GlobalStyles.itemText, {color: colors.primary}]}>
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
