import React from 'react';
import {Text} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {TextStyles} from '../styles';
import getPlatform from '../services/platform';

const CurrentPlatform = () => {
  const {colors} = useTheme();
  return <Text style={TextStyles.text}>You're using {getPlatform()}</Text>;
};

export default CurrentPlatform;
