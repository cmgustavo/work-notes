import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {getData} from '../services/storage';

import Welcome from '../components/welcome';
import List from '../components/list';
import Error from '../components/error';
import styles from '../styles';

const Home = ({navigation}) => {
  const {colors} = useTheme();
  const [notes, setNotes] = useState([]);

  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const readNotesFromStorage = async () => {
    const data = (await getData()) || [];
    setNotes(data);
  };

  useEffect(() => {
    readNotesFromStorage()
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoaded(true);
      });
  }, [notes]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('AddNote', {notes: {notes}})}>
          <Text style={{color: colors.text}}>New Note</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, colors]);

  return (
    <SafeAreaView
      style={[styles.globalContainer, {backgroundColor: colors.background}]}>
      {notes.length > 0 ? null : <Welcome navigation={navigation} />}
      {loaded && !error && <List notes={notes} navigation={navigation} />}
      {!loaded && <ActivityIndicator size="large" />}
      {error && (
        <Error errorText1={'Error'} errorText2={'Could not load the page'} />
      )}
    </SafeAreaView>
  );
};

export default Home;
