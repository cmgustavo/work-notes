import React, {useLayoutEffect} from 'react';
import moment from 'moment';
import {View, Text, TouchableOpacity} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useAppDispatch} from '../store';
import {deleteNote} from '../store/app';

import styles from '../styles';

const ViewNote = ({route, navigation}) => {
  const dispatch = useAppDispatch();
  const {colors} = useTheme();
  let {id, text, date} = route.params;
  const _delete = () => {
    dispatch(deleteNote(id));
    navigation.goBack();
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => _delete()}>
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
      <Text style={[styles.noteMainContent, {color: colors.text}]}>{text}</Text>
    </View>
  );
};

export default ViewNote;
