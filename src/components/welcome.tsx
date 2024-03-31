import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

import CurrentPlatform from './platform';

interface Props {
  navigation: any;
}

const Welcome = ({navigation}: Props) => {
  return (
    <View style={styles.container}>
      <Text>Welcome to Work Notes</Text>
      <Text>Get start writing your first note for today.</Text>
      <Button
        title="Write note"
        onPress={() => navigation.navigate('AddNote')}
      />
      <CurrentPlatform />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Welcome;
