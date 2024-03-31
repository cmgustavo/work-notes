import React from 'react';
import moment from 'moment';
import {View, Text} from 'react-native';

const ViewNote = ({route}) => {
  return (
    <View>
      <Text>{moment(route.params.date).format('dddd, MMMM Do YYYY')}</Text>
      <Text>{route.params.note}</Text>
    </View>
  );
};

export default ViewNote;
