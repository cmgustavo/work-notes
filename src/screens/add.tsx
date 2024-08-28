import React, {useState} from 'react';
import moment from 'moment';
import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  useColorScheme,
} from 'react-native';
import {useTheme} from 'react-native-paper';

import {useAppDispatch} from '../store';
import {createNote} from '../store/notes';
import {ContainerStyles, TextStyles, FormStyles, ButtonStyles} from '../styles';

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
    <View
      style={[
        ContainerStyles.formContainer,
        {backgroundColor: colors.background},
      ]}>
      <Text style={[TextStyles.subtitle, {color: colors.primary}]}>
        {moment(today).format('dddd, MMMM Do YYYY')}
      </Text>
      <TextInput
        style={[
          FormStyles.textArea,
          {color: colors.secondary, backgroundColor: colors.background},
        ]}
        value={textAreaValue}
        onChangeText={v => setTextAreaValue(v)}
        placeholder="Write a new note"
      />
      <TouchableOpacity
        style={[
          ButtonStyles.button,
          {
            backgroundColor:
              textAreaValue.length === 0
                ? colors.surfaceDisabled
                : colors.primaryContainer,
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
            TextStyles.text,
            {
              color:
                textAreaValue.length === 0 ? colors.surface : colors.primary,
            },
          ]}>
          Save
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddNote;
