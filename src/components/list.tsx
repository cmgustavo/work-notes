import React, {useState} from 'react';
import moment from 'moment';
import {FlatList, View} from 'react-native';
import {
  useTheme,
  Card,
  Text,
  Divider,
  IconButton,
  Searchbar,
  List as RNList,
} from 'react-native-paper';

import {ContainerStyles} from '../styles';
import {togglePinned, toggleStarred} from '../store/notes/notes.actions.ts';
import {useAppDispatch} from '../store';

interface Props {
  navigation: any;
  notes: any;
}

const List = ({notes, navigation}: Props) => {
  const dispatch = useAppDispatch();
  const {colors} = useTheme();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const getPinnedAndOtherNotes = () => {
    const entries = Array.isArray(notes) ? notes : Object.entries(notes);

    const pinnedNotes = entries.filter(([_, note]) => note.isPinned);
    const otherNotes = entries
      .filter(([_, note]) => !note.isPinned)
      .sort((a, b) => b[1].date - a[1].date);
    return {pinnedNotes, otherNotes};
  };

  // Search filter
  const getFilteredNotes = () => {
    const {pinnedNotes, otherNotes} = getPinnedAndOtherNotes();

    const filterFunc = ([_, note]) =>
      note.text.toLowerCase().includes(searchQuery.toLowerCase());

    return {
      pinnedNotes: pinnedNotes.filter(filterFunc),
      otherNotes: otherNotes.filter(filterFunc),
    };
  };

  const {pinnedNotes, otherNotes} = getFilteredNotes();

  const onToggleStar = (id: string) => {
    dispatch(toggleStarred(id));
  };

  const onTogglePin = (id: string) => {
    dispatch(togglePinned(id));
  };

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
            isStarred: itemData.isStarred,
            isPinned: itemData.isPinned,
          });
        }}
        style={[ContainerStyles.noteContainer]}>
        <Card.Title
          title={moment(itemData.date).format('dddd, MMMM Do YYYY')}
          titleStyle={{color: colors.primary}}
          subtitle={moment(itemData.date).fromNow()}
          subtitleStyle={{color: colors.secondary}}
          right={props => (
            <IconButton
              icon={itemData.isStarred ? 'star' : 'star-outline'}
              onPress={() => onToggleStar(itemData.id)}
            />
          )}
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

  const _renderPinnedItem = ({item}) => {
    const [_, itemData] = item;
    return (
      <RNList.Item
        title={itemData.text}
        titleEllipsizeMode={'tail'}
        titleNumberOfLines={2}
        description={moment(itemData.date).fromNow()}
        left={props => <RNList.Icon {...props} icon="pin" />}
        right={props => <RNList.Icon {...props} icon="chevron-right" />}
        onPress={() => {
          navigation.push('ViewNote', {
            id: itemData.id,
            text: itemData.text,
            date: itemData.date,
            isStarred: itemData.isStarred,
            isPinned: itemData.isPinned,
          });
        }}
      />
    );
  };

  const _keyExtractor = item => {
    const [key] = item;
    return key;
  };

  return (
    <View style={{flex: 1}}>
      {pinnedNotes.length > 0 && (
        <View style={{marginBottom: 15}}>
          <FlatList
            renderItem={_renderPinnedItem}
            data={pinnedNotes}
            keyExtractor={_keyExtractor}
          />
        </View>
      )}
      <View
        style={{
          marginHorizontal: 15,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            padding: 10,
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          Notes
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}>
          <IconButton
            icon="text-box-search-outline"
            onPress={() => setShowSearch(!showSearch)}
          />
        </View>
      </View>
      {showSearch && (
        <Searchbar
          style={{marginHorizontal: 15}}
          placeholder="Search notes..."
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      )}
      <FlatList
        style={[ContainerStyles.notesContainer]}
        renderItem={_renderItem}
        data={otherNotes}
        keyExtractor={_keyExtractor}
      />
    </View>
  );
};

export default List;
