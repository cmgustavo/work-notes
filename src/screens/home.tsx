import React, {useLayoutEffect, useEffect} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {useAppDispatch, useAppSelector, RootState} from '../store';
import {initializeNotes} from '../store/notes';
import {NoteObj} from '../store/notes/notes.models';

import ErrorMessage from '../components/error';
import Welcome from '../components/welcome';
import List from '../components/list';
import {ContainerStyles} from '../styles';

const Home = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {colors} = useTheme();
  const notes = useAppSelector(({NOTES}: RootState) => NOTES.notes);
  const status = useAppSelector(({NOTES}: RootState) => NOTES.status);

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
    dispatch(initializeNotes());
  }, []);

  return (
    <SafeAreaView
      style={[
        ContainerStyles.globalContainer,
        {backgroundColor: colors.background},
      ]}>
      {!status ? (
        <ActivityIndicator
          size="large"
          style={ContainerStyles.welcomeContainer}
        />
      ) : null}
      {status === 'failed' ? (
        <ErrorMessage
          errorText1={'Error'}
          errorText2={'Could not load the page'}
        />
      ) : null}
      {Object.entries(notes).length == 0 ? (
        <Welcome navigation={navigation} />
      ) : (
        <List notes={notes} navigation={navigation} />
      )}
    </SafeAreaView>
  );
};

export default Home;
