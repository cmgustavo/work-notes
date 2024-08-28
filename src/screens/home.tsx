import React, {useLayoutEffect, useEffect} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from 'react-native';
import {useTheme, FAB} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

import {useAppDispatch, useAppSelector, RootState} from '../store';
import {initializeNotes} from '../store/notes';
import {NoteObj} from '../store/notes/notes.models';

import ErrorMessage from '../components/error';
import Welcome from '../components/welcome';
import List from '../components/list';
import {ContainerStyles, GlobalStyles} from '../styles';

const Home = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {colors} = useTheme();
  const notes = useAppSelector(({NOTES}: RootState) => NOTES.notes);
  const status = useAppSelector(({NOTES}: RootState) => NOTES.status);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Preferences')}>
          <Icon name="cog" size={25} color={colors.primary} />
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
        <>
          <List notes={notes} navigation={navigation} />
          <FAB
            label="Add Note"
            icon="plus"
            style={GlobalStyles.fab}
            onPress={() => navigation.navigate('AddNote')}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default Home;
