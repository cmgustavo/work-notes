import React, {useState} from 'react';
import moment from 'moment';
import {View} from 'react-native';
import {useTheme, TextInput, Text, Button, Appbar} from 'react-native-paper';

import {RootState, useAppDispatch, useAppSelector} from '../store';
import {createNote, updateNote} from '../store/notes';
import {ContainerStyles} from '../styles';

interface Props {
  navigation: any;
  route: any;
}

const getUniqueId = () => {
  return Math.random().toString(36).substring(2, 11);
};

const AddNote = ({route, navigation}: Props) => {
  const dispatch = useAppDispatch();
  const {id, text, date} = route.params || {};
  const {colors} = useTheme();
  const [textAreaValue, setTextAreaValue] = useState(text || '');
  const today = date || Date.now();
  const IS_DEV = __DEV__;
  const existingNote = useAppSelector(({NOTES}: RootState) =>
    id ? NOTES.notes[id] : undefined,
  );

  const addNote = (text: string) => {
    if (id) {
      dispatch(
        updateNote({
          ...existingNote,
          id: id,
          text: text,
          date: today,
        }),
      );
    } else {
      dispatch(
        createNote({
          id: getUniqueId(),
          text: text,
          date: today,
        }),
      );
    }
  };

  const addTestNote = () => {
    const testText = 'Test Note ' + Math.random().toString(36).substring(2, 11);
    setTextAreaValue(testText);
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={id ? 'Edit Note' : 'Add Note'} />
        {IS_DEV ? (
          <Appbar.Action icon="dev-to" onPress={() => addTestNote()} />
        ) : null}
      </Appbar.Header>
      <View style={[ContainerStyles.formContainer]}>
        <Text
          variant="headlineSmall"
          style={{marginBottom: 20, color: colors.primary}}>
          {moment(today).format('dddd, MMMM Do YYYY')}
        </Text>
        <TextInput
          value={textAreaValue}
          onChangeText={v => setTextAreaValue(v)}
          multiline={true}
        />
        <Button
          icon="content-save"
          mode="contained"
          style={{marginTop: 20}}
          disabled={textAreaValue.length === 0}
          onPress={() => {
            addNote(textAreaValue);
            setTextAreaValue('');
            navigation.goBack();
          }}>
          Save
        </Button>
      </View>
    </>
  );
};

export default AddNote;
