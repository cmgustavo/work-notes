import React from 'react';
import moment from 'moment';
import {View, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';

import styles from '../styles';

const ViewNote = ({route}) => {
  const {colors} = useTheme();
  return (
    <View
      style={[styles.welcomeContainer, {backgroundColor: colors.background}]}>
      <Text style={[styles.title, {color: colors.text}]}>
        {moment(route.params.date).format('dddd, MMMM Do YYYY')}
      </Text>
      <Text style={[styles.subtitle, {color: colors.text}]}>
        {route.params.note}
      </Text>
    </View>
  );
};

export default ViewNote;
