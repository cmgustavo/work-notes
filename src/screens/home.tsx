import React, {useLayoutEffect} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {useAppDispatch, useAppSelector, RootState} from '../store';
import {initialize} from '../store/app';
import {NoteObject} from '../store/app/app.types';

import Welcome from '../components/welcome';
import List from '../components/list';
import styles from '../styles';

const Home = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {colors} = useTheme();
  const _notes = useAppSelector(({APP}: RootState) => APP.notes);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('AddNote')}>
          <Text style={{color: colors.text}}>New Note</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, colors]);

  return (
    <SafeAreaView
      style={[styles.globalContainer, {backgroundColor: colors.background}]}>
      {_notes.length === 0 ? (
        <Welcome navigation={navigation} />
      ) : (
        <List notes={_notes} navigation={navigation} />
      )}
    </SafeAreaView>
  );
};

export default Home;
