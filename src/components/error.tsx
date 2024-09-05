import React from 'react';
import {useTheme} from 'react-native-paper';
import {Text, View} from 'react-native';

interface Props {
  errorText1: string;
  errorText2: string;
}

import {TextStyles, ContainerStyles} from '../styles';

const ErrorMessage = ({errorText1, errorText2}: Props) => {
  const {colors} = useTheme();
  return (
    <View
      style={[
        ContainerStyles.welcomeContainer,
        {backgroundColor: colors.errorContainer},
      ]}>
      <Text style={[TextStyles.errorTitle, {color: colors.onError}]}>
        {errorText1}
      </Text>
      <Text style={[TextStyles.error, {color: colors.onError}]}>
        {errorText2}
      </Text>
    </View>
  );
};

export default ErrorMessage;
