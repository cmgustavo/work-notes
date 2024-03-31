import React from 'react';
import {View, Button} from 'react-native';

interface Props {
  navigation: any;
  notes: any;
}

class AddButton extends React.PureComponent<Props> {
  render() {
    const {notes, navigation} = this.props;
    return (
      <View>
        <Button
          title="Add Note"
          onPress={() => navigation.navigate('AddNote', {notes: {notes}})}
        />
      </View>
    );
  }
}

export default AddButton;
