import React, {useLayoutEffect, useEffect} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {useAppDispatch, useAppSelector, RootState} from '../store';
import {initialize} from '../store/notes';
import {NoteObj} from '../store/notes/notes.models';
import {NotesStatus} from '../store/notes/notes.types';

import Welcome from '../components/welcome';
import List from '../components/list';
import styles from '../styles';

const Home = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {colors} = useTheme();
  const _notes = useAppSelector(({NOTES}: RootState) => NOTES.notes);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('AddNote')}>
          <Text style={{color: colors.text}}>New Note</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, colors]);

  useEffect(() => {
    dispatch(initialize());
  }, []);

  return (
    <SafeAreaView
      style={[styles.globalContainer, {backgroundColor: colors.background}]}>
      {Object.entries(_notes).length === 0 ? (
        <Welcome navigation={navigation} />
      ) : (
        <List notes={_notes} navigation={navigation} />
      )}
    </SafeAreaView>
  );
};

export default Home;
