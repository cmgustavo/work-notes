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

  const _renderItem = ({item}) => {
    const [_, itemData] = item;
    return (
      <TouchableOpacity
        style={[styles.noteContainer, {backgroundColor: colors.card}]}
        onPress={() => {
          navigation.push('ViewNote', {
            id: itemData.id,
            text: itemData.text,
            date: itemData.date,
          });
        }}>
        <View>
          <Text style={[styles.noteTitle, {color: colors.text}]}>
            {moment(itemData.date).format('dddd, MMMM Do YYYY')}
          </Text>
          <Text style={[styles.noteContent, {color: colors.text}]}>
            {itemData.text}
          </Text>
          <Text style={[styles.noteDate, {color: colors.text}]}>
            {moment(itemData.date).fromNow()}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const _keyExtractor = item => {
    const [key] = item;
    return key;
  };

  return (
    <FlatList
      style={[styles.notesContainer, {backgroundColor: colors.background}]}
      renderItem={_renderItem}
      data={Object.entries(notes).reverse()}
      keyExtractor={_keyExtractor}
    />
  );
};

export default List;
