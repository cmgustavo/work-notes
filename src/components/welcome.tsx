import React from 'react';
import {View, Text, TouchableOpacity, useColorScheme} from 'react-native';
import {useTheme} from '@react-navigation/native';

import CurrentPlatform from './platform';
import styles from '../styles';

interface Props {
  navigation: any;
}

const Welcome = ({navigation}: Props) => {
  const {colors} = useTheme();
  const scheme = useColorScheme();
  return (
    <View style={styles.welcomeContainer}>
      <Text style={[styles.title, {color: colors.text}]}>
        Welcome to <Text style={styles.highlight}>Work Notes</Text>
      </Text>
      <Text style={[styles.subtitle, {color: colors.text}]}>
        Get start writing your first note for today.
      </Text>
      <TouchableOpacity
        style={[styles.button, {backgroundColor: colors.primary}]}
        onPress={() => navigation.navigate('AddNote')}>
        <Text
          style={[
            styles.text,
            {color: scheme === 'dark' ? colors.text : colors.card},
          ]}>
          Add Note
        </Text>
      </TouchableOpacity>
      <View style={styles.bottom}>
        <CurrentPlatform />
      </View>
    </View>
  );
};

export default Welcome;
