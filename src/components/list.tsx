import React from 'react';
import moment from 'moment';
import {TouchableOpacity, Text, FlatList, View} from 'react-native';
import {useTheme} from 'react-native-paper';

import {ContainerStyles, TextStyles} from '../styles';

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
        style={[
          ContainerStyles.noteContainer,
          {
            backgroundColor: colors.surface,
            borderColor: colors.surfaceVariant,
          },
        ]}
        onPress={() => {
          navigation.push('ViewNote', {
            id: itemData.id,
            text: itemData.text,
            date: itemData.date,
          });
        }}>
        <View>
          <Text style={[TextStyles.noteTitle, {color: colors.primary}]}>
            {moment(itemData.date).format('dddd, MMMM Do YYYY')}
          </Text>
          <Text style={[TextStyles.noteContent, {color: colors.secondary}]}>
            {itemData.text}
          </Text>
          <Text style={[TextStyles.noteDate, {color: colors.primary}]}>
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
      style={[
        ContainerStyles.notesContainer,
        {backgroundColor: colors.background},
      ]}
      renderItem={_renderItem}
      data={Object.entries(notes).reverse()}
      keyExtractor={_keyExtractor}
    />
  );
};

export default List;
