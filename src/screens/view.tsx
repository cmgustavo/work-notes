import React, {useState} from 'react';
import moment from 'moment';
import {View} from 'react-native';
import {useTheme, Button, Text, Divider, Dialog} from 'react-native-paper';
import {useAppDispatch} from '../store';
import {deleteNote} from '../store/notes';

import {ContainerStyles, GlobalStyles} from '../styles';

const ViewNote = ({route, navigation}) => {
  const dispatch = useAppDispatch();
  const {colors} = useTheme();
  let {id, text, date} = route.params;

  const [visible, setVisible] = useState(false);
  const confirmDelete = () => setVisible(true);
  const cancelDelete = () => setVisible(false);

  const _delete = () => {
    dispatch(deleteNote(id));
    navigation.goBack();
  };
  return (
    <View
      style={[
        ContainerStyles.globalContainer,
        {backgroundColor: colors.background},
      ]}>
      <View
        style={[
          ContainerStyles.noteContainer,
          {backgroundColor: colors.background, borderColor: colors.background},
        ]}>
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
      <View style={[GlobalStyles.bottom]}>
        <Button
          icon="delete"
          mode="contained-tonal"
          textColor={colors.error}
          onPress={confirmDelete}>
          Delete
        </Button>
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
  );
};

export default ViewNote;
