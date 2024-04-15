import React, {useLayoutEffect} from 'react';
import moment from 'moment';
import {View, Text, TouchableOpacity} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {storeData} from '../services/storage';

import styles from '../styles';

const ViewNote = ({route, navigation}) => {
  const {colors} = useTheme();
  let {notes, note, date} = route.params;
  const deleteNote = () => {
    notes.splice(notes.indexOf(date), 1);
    storeData(notes);
    navigation.goBack();
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => deleteNote()}>
          <Text style={{color: colors.notification}}>Delete</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, colors]);
  return (
    <View style={[styles.noteContainer, {backgroundColor: colors.background}]}>
      <Text style={[styles.title, {color: colors.text}]}>
        {moment(date).format('dddd, MMMM Do YYYY')}
      </Text>
      <Text style={[styles.noteMainContent, {color: colors.text}]}>{note}</Text>
    </View>
  );
};

export default ViewNote;
