import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {useAppDispatch, useAppSelector, RootState} from '../store';
import {notesInitialize} from '../store/app';
import {NoteObject} from '../store/app/app.types';

import Welcome from '../components/welcome';
import List from '../components/list';
import Error from '../components/error';
import styles from '../styles';

const Home = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {colors} = useTheme();
  const _notes = useAppSelector(({APP}: RootState) => APP.notes);
  const [notes, setNotes] = useState<NoteObject[]>(_notes);

  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

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
      {notes.length === 0 ? <Welcome navigation={navigation} /> : null}
      {!error && <List notes={notes} navigation={navigation} />}
    </SafeAreaView>
  );
};

export default Home;
