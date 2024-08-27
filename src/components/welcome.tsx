import React from 'react';
import {View, Text, TouchableOpacity, useColorScheme} from 'react-native';
import {useTheme} from '@react-navigation/native';

import CurrentPlatform from './platform';
import {
  ContainerStyles,
  TextStyles,
  ButtonStyles,
  GlobalStyles,
} from '../styles';

interface Props {
  navigation: any;
}

const Welcome = ({navigation}: Props) => {
  const {colors} = useTheme();
  const scheme = useColorScheme();
  return (
    <View style={ContainerStyles.welcomeContainer}>
      <Text style={[TextStyles.title, {color: colors.text}]}>
        Welcome to <Text style={TextStyles.highlight}>Work Notes</Text>
      </Text>
      <Text style={[TextStyles.subtitle, {color: colors.text}]}>
        Get start writing your first note for today.
      </Text>
      <TouchableOpacity
        style={[ButtonStyles.button, {backgroundColor: colors.primary}]}
        onPress={() => navigation.navigate('AddNote')}>
        <Text
          style={[
            TextStyles.text,
            {color: scheme === 'dark' ? colors.text : colors.card},
          ]}>
          Add Note
        </Text>
      </TouchableOpacity>
      <View style={GlobalStyles.bottom}>
        <CurrentPlatform />
      </View>
    </View>
  );
};

export default Welcome;
