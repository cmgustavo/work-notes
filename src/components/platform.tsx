import React from 'react';
import {Text} from 'react-native';
import {useTheme} from '@react-navigation/native';

import getPlatform from '../services/platform';

const CurrentPlatform = () => {
  const {colors} = useTheme();
  return <Text style={{color: colors.text}}>You're using {getPlatform()}</Text>;
};

export default CurrentPlatform;
