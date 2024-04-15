import React from 'react';
import moment from 'moment';
import {TouchableOpacity, Text, FlatList, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

import styles from '../styles';

interface Props {
  navigation: any;
  notes: any;
}

const List = ({notes, navigation}: Props) => {
  const {colors} = useTheme();
  return (
    <FlatList
      style={[styles.notesContainer, {backgroundColor: colors.background}]}
      data={notes.reverse()}
      renderItem={({item}) => (
        <TouchableOpacity
          style={[styles.noteContainer, {backgroundColor: colors.card}]}
          onPress={() => {
            navigation.push('ViewNote', {
              notes: notes,
              note: item.note,
              date: item.date,
            });
          }}>
          <View>
            <Text style={[styles.noteTitle, {color: colors.text}]}>
              {moment(item.date).format('dddd, MMMM Do YYYY')}
            </Text>
            <Text style={[styles.noteContent, {color: colors.text}]}>
              {item.note}
            </Text>
            <Text style={[styles.noteDate, {color: colors.text}]}>
              {moment(item.date).fromNow()}
            </Text>
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={item => item.date}
    />
  );
};

export default List;
