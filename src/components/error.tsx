import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface Props {
  errorText1: string;
  errorText2: string;
}

class Error extends React.PureComponent<Props> {
  render() {
    const {errorText1, errorText2} = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{errorText1}</Text>
        <Text style={styles.text}>{errorText2}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    color: 'red',
  },
});

export default Error;
