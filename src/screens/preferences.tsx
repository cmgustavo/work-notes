import React, {useState} from 'react';
import {View} from 'react-native';
import {Divider, List, Text, Appbar} from 'react-native-paper';
import {ColorSchemeName} from 'react-native';

import {usePreferences} from '../context/PreferencesContext';
import {ContainerStyles} from '../styles';

const Preferences = ({navigation}) => {
  const {colorTheme, setColorTheme} = usePreferences();
  const [checked, setChecked] = useState(colorTheme);

  const handleThemeChange = (newTheme: ColorSchemeName) => {
    setColorTheme(newTheme);
    setChecked(newTheme);
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Preferences" />
      </Appbar.Header>
      <View style={[ContainerStyles.globalContainer]}>
        <List.Section>
          <List.Subheader>
            <Text variant="titleMedium">Theme Mode</Text>
          </List.Subheader>
          <List.Item
            title="Light"
            onPress={() => handleThemeChange('light')}
            right={props =>
              checked === 'light' ? (
                <List.Icon {...props} icon="checkbox-marked-circle-outline" />
              ) : (
                <List.Icon {...props} icon="checkbox-blank-circle-outline" />
              )
            }
          />
          <Divider />
          <List.Item
            title="Dark"
            onPress={() => handleThemeChange('dark')}
            right={props =>
              checked === 'dark' ? (
                <List.Icon {...props} icon="checkbox-marked-circle-outline" />
              ) : (
                <List.Icon {...props} icon="checkbox-blank-circle-outline" />
              )
            }
          />
          <Divider />
          <List.Item
            title="System"
            onPress={() => handleThemeChange(null)}
            right={props =>
              !checked ? (
                <List.Icon {...props} icon="checkbox-marked-circle-outline" />
              ) : (
                <List.Icon {...props} icon="checkbox-blank-circle-outline" />
              )
            }
          />
          <Divider />
        </List.Section>
        <List.Section>
          <List.Subheader>
            <Text variant="titleMedium">About</Text>
          </List.Subheader>
          <List.Item title="Version" right={props => <Text>v1.0.4</Text>} />
          <Divider />
        </List.Section>
      </View>
    </>
  );
};

export default Preferences;
