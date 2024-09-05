import React from 'react';
import moment from 'moment';
import {FlatList} from 'react-native';
import {useTheme, Card, Text, Divider} from 'react-native-paper';

import {ContainerStyles} from '../styles';

interface Props {
  navigation: any;
  notes: any;
}

const List = ({notes, navigation}: Props) => {
  const {colors} = useTheme();

  const _renderItem = ({item}) => {
    const [_, itemData] = item;
    return (
      <Card
        mode="contained"
        onPress={() => {
          navigation.push('ViewNote', {
            id: itemData.id,
            text: itemData.text,
            date: itemData.date,
          });
        }}
        style={[
          ContainerStyles.noteContainer,
          {backgroundColor: colors.surfaceVariant},
        ]}>
        <Card.Title
          title={moment(itemData.date).format('dddd, MMMM Do YYYY')}
          titleStyle={{color: colors.primary}}
          subtitle={moment(itemData.date).fromNow()}
          subtitleStyle={{color: colors.secondary}}
        />
        <Divider />
        <Card.Content style={[ContainerStyles.noteMainContent]}>
          <Text variant="bodyMedium" numberOfLines={2}>
            {itemData.text}
          </Text>
        </Card.Content>
      </Card>
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
