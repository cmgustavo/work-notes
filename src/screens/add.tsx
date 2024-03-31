import React, {useState} from 'react';
import moment from 'moment';
import {Button, View, Text, TextInput} from 'react-native';

import {storeData} from '../services/storage';

const AddNote = ({route, navigation}) => {
  let {notes} = route.params ? route.params.notes : {notes: []};
  const [textAreaValue, setTextAreaValue] = useState('');
  const today = Date.now();

  const addNote = (text: string) => {
    notes.push({note: text, date: today});
    storeData(notes);
  };

  return (
    <View>
      <Text>{moment(today).format('dddd, MMMM Do YYYY')}</Text>
      <TextInput
        value={textAreaValue}
        onChangeText={v => setTextAreaValue(v)}
        placeholder="Write a new note"
      />
      <Button
        title="Save"
        onPress={() => {
          addNote(textAreaValue);
          setTextAreaValue('');
          navigation.goBack();
        }}
      />
    </View>
  );
};

export default AddNote;
