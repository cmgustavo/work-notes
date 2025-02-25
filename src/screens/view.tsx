import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {View, Platform, Share} from 'react-native';
import {
  useTheme,
  Button,
  Text,
  Divider,
  Dialog,
  Appbar,
  Menu,
  IconButton,
} from 'react-native-paper';
import {RootState, useAppDispatch, useAppSelector} from '../store';
import {deleteNote} from '../store/notes';

import {ContainerStyles} from '../styles';
import ErrorMessage from '../components/error.tsx';
import {togglePinned, toggleStarred} from '../store/notes/notes.actions.ts';

const ViewNote = ({route, navigation}) => {
  const dispatch = useAppDispatch();
  const {colors} = useTheme();
  const [showError, setShowError] = useState(false);
  const {
    id: _id,
    text: _text,
    date: _date,
    isStarred: _isStarred,
    isPinned: _isPinned,
  } = route.params;
  const [id, setId] = useState(_id);
  const [text, setText] = useState(_text);
  const [date, setDate] = useState(_date);
  const [isStarred, setIsStarred] = useState(_isStarred);
  const [isPinned, setIsPinned] = useState(_isPinned);
  const _notes = useAppSelector(({NOTES}: RootState) => NOTES.notes);

  const MAIN_MENU = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';
  const [showMenu, setShowMenu] = useState(false);
  const [visible, setVisible] = useState(false);
  const confirmDelete = () => {
    setShowMenu(false);
    setVisible(true);
  };
  const cancelDelete = () => setVisible(false);

  const _edit = () => {
    setShowMenu(false);
    navigation.navigate('AddNote', {id, text, date});
  };
  const _delete = () => {
    dispatch(deleteNote(id));
    navigation.goBack();
  };
  const _share = async () => {
    const humanDate = moment(date).format('dddd, MMMM Do YYYY');
    setShowMenu(false);
    try {
      await Share.share({
        message: humanDate + ': ' + text,
      });
    } catch (error) {
      setShowError(true);
    }
  };

  const onToggleStar = (id: string) => {
    dispatch(toggleStarred(id));
  };

  const onTogglePin = (id: string) => {
    dispatch(togglePinned(id));
  };

  useEffect(() => {
    const note = _notes[id];
    if (note) {
      setId(note.id);
      setText(note.text);
      setDate(note.date);
      setIsStarred(note.isStarred);
      setIsPinned(note.isPinned);
    }
  }, [_notes]);

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Note" />
        <Appbar.Action icon={isStarred ? 'star' : 'star-outline'} onPress={() => onToggleStar(id)} />
        <Appbar.Action icon={isPinned ? 'pin' : 'pin-outline'} onPress={() => onTogglePin(id)} />
        <Menu
          style={{marginTop: 55, minWidth: 250}}
          visible={showMenu}
          onDismiss={() => setShowMenu(false)}
          anchor={
            <IconButton icon={MAIN_MENU} onPress={() => setShowMenu(true)} />
          }>
          <Menu.Item title={'Share'} onPress={_share} leadingIcon={'share'} />
          <Menu.Item leadingIcon={'pencil'} onPress={_edit} title="Edit" />
          <Menu.Item
            leadingIcon={'delete'}
            onPress={confirmDelete}
            title="Delete"
          />
        </Menu>
      </Appbar.Header>
      {showError ? (
        <ErrorMessage
          errorText1={'Error'}
          errorText2={'Could not share the note'}
        />
      ) : null}
      <View style={[ContainerStyles.globalContainer]}>
        <View style={[ContainerStyles.noteContainer]}>
          <Text
            variant="headlineSmall"
            style={{marginBottom: 20, color: colors.primary}}>
            {moment(date).format('dddd, MMMM Do YYYY')}
          </Text>
          <Divider />
          <Text style={{marginVertical: 30}} variant="bodyLarge">
            {text}
          </Text>
        </View>
        <Dialog visible={visible} onDismiss={cancelDelete}>
          <Dialog.Title>Confirm</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">You are going to delete this note.</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={cancelDelete}>Cancel</Button>
            <Button
              mode="contained-tonal"
              textColor={colors.error}
              onPress={_delete}>
              Delete
            </Button>
          </Dialog.Actions>
        </Dialog>
      </View>
    </>
  );
};

export default ViewNote;
