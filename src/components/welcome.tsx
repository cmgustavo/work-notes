import React from 'react';
import {View} from 'react-native';
import {useTheme, Text, Button} from 'react-native-paper';

import {
  ContainerStyles,
  TextStyles,
} from '../styles';

interface Props {
  navigation: any;
}

const Welcome = ({navigation}: Props) => {
  const {colors} = useTheme();
  return (
    <View style={ContainerStyles.welcomeContainer}>
      <Text
        style={[
          TextStyles.title,
          {color: colors.primary, borderColor: colors.surfaceVariant},
        ]}>
        Welcome to <Text style={TextStyles.highlight}>Work Notes</Text>
      </Text>
      <Text style={[TextStyles.subtitle, {color: colors.secondary}]}>
        Get start writing your first note for today.
      </Text>
      <Button mode="contained" onPress={() => navigation.navigate('AddNote')}>
        Add a new Note
      </Button>
    </View>
  );
};

export default Welcome;
