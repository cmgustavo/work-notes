import React, {useState} from 'react';
import moment from 'moment';
import {View} from 'react-native';
import {useTheme, TextInput, Text, Button} from 'react-native-paper';

import {useAppDispatch} from '../store';
import {createNote} from '../store/notes';
import {ContainerStyles} from '../styles';

const getUniqueId = () => {
  return Math.random().toString(36).substr(2, 9);
};

const AddNote = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {colors} = useTheme();
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
  );
};

export default AddNote;
