import React, {useState} from 'react';
import moment from 'moment';
import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  useColorScheme,
} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {storeData} from '../services/storage';
import styles from '../styles';

const AddNote = ({route, navigation}) => {
  const {colors} = useTheme();
  const scheme = useColorScheme();
  let {notes} = route.params ? route.params.notes : {notes: []};
  const [textAreaValue, setTextAreaValue] = useState('');
  const today = Date.now();

  const addNote = (text: string) => {
    notes.push({note: text, date: today});
    storeData(notes);
  };

  return (
    <View style={[styles.formContainer, {backgroundColor: colors.background}]}>
      <Text style={[styles.subtitle, {color: colors.text}]}>
        {moment(today).format('dddd, MMMM Do YYYY')}
      </Text>
      <TextInput
        style={[
          styles.textArea,
          {color: colors.text, backgroundColor: colors.card},
        ]}
        value={textAreaValue}
        onChangeText={v => setTextAreaValue(v)}
        placeholder="Write a new note"
      />
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor:
              textAreaValue.length === 0 ? colors.border : colors.primary,
          },
        ]}
        disabled={textAreaValue.length === 0}
        onPress={() => {
          addNote(textAreaValue);
          setTextAreaValue('');
          navigation.goBack();
        }}>
        <Text
          style={[
            styles.text,
            {color: scheme === 'dark' ? colors.text : colors.card},
          ]}>
          Save
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddNote;
