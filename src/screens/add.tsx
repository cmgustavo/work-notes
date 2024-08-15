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

import {useAppDispatch} from '../store';
import {createNote} from '../store/app';
import styles from '../styles';

const getUniqueId = () => {
  return Math.random().toString(36).substr(2, 9);
};

const AddNote = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {colors} = useTheme();
  const scheme = useColorScheme();
  const [textAreaValue, setTextAreaValue] = useState('');
  const today = Date.now();

  const addNote = (text: string) => {
    dispatch(
      createNote({
        id: getUniqueId(),
        text: text,
        date: Date.now(),
      }),
    );
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
