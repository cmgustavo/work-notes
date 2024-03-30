import React, {useState, useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import {NativeBaseProvider} from 'native-base';

import {getData} from '../services/storage';

import Welcome from '../components/welcome';
import AddButton from '../components/add-button';
import List from '../components/list';
import Error from '../components/error';

const Home = ({navigation}) => {
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

  return (
    <NativeBaseProvider>
      {notes.length > 0 ? (
        <AddButton notes={notes} navigation={navigation} />
      ) : (
        <Welcome navigation={navigation} />
      )}
      {loaded && !error && <List notes={notes} navigation={navigation} />}
      {!loaded && <ActivityIndicator size="large" />}
      {error && (
        <Error errorText1={'Error'} errorText2={'Could not load the page'} />
      )}
    </NativeBaseProvider>
  );
};

export default Home;
