import React from 'react';
import moment from 'moment';
import {TouchableWithoutFeedback, Text, FlatList, View} from 'react-native';

interface Props {
  navigation: any;
  notes: any;
}

class List extends React.PureComponent<Props> {
  render() {
    const {notes, navigation} = this.props;
    return (
      <FlatList
        data={notes}
        inverted={true}
        renderItem={({item}) => (
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.push('ViewNote', {
                note: item.note,
                date: item.date,
              });
            }}>
            <View>
              <Text>{moment(item.date).format('dddd, MMMM Do YYYY')}</Text>
              <Text>{item.note}</Text>
              <Text>{moment(item.date).fromNow()}</Text>
            </View>
          </TouchableWithoutFeedback>
        )}
        keyExtractor={item => item.date}
      />
    );
  }
}

export default List;
