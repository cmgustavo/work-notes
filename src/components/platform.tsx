import React from 'react';
import {useTheme, Text} from 'react-native-paper';

import {TextStyles} from '../styles';
import getPlatform from '../services/platform';

const CurrentPlatform = () => {
  const {colors} = useTheme();
  return (
    <Text style={[TextStyles.smallText, {color: colors.primary}]}>
      You're using {getPlatform()}
    </Text>
  );
};

export default CurrentPlatform;
