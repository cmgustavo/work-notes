import React from 'react';
import {useTheme} from '@react-navigation/native';
import {StyleSheet, Text, View} from 'react-native';

interface Props {
  errorText1: string;
  errorText2: string;
}

import {TextStyles, ContainerStyles} from '../styles';

const ErrorMessage = ({errorText1, errorText2}: Props) => {
  const {colors} = useTheme();
  return (
    <View style={ContainerStyles.welcomeContainer}>
      <Text style={[TextStyles.errorTitle, {color: colors.notification}]}>
        {errorText1}
      </Text>
      <Text style={[TextStyles.error, {color: colors.notification}]}>
        {errorText2}
      </Text>
    </View>
  );
};

export default ErrorMessage;
