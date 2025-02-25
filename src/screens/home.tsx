import React from 'react';
import {View} from 'react-native';
import {ActivityIndicator, Appbar} from 'react-native-paper';

import {useAppSelector, RootState} from '../store';

import ErrorMessage from '../components/error';
import Welcome from '../components/welcome';
import List from '../components/list';
import {ContainerStyles, GlobalStyles} from '../styles';

const Home = ({navigation}) => {
  const notes = useAppSelector(({NOTES}: RootState) => NOTES.notes);
  const status = useAppSelector(({NOTES}: RootState) => NOTES.status);

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Work Notes" />
        {Object.entries(notes).length > 0 ? (
          <Appbar.Action
            icon={'plus'}
            onPress={() => navigation.navigate('AddNote')}
          />
        ) : null}
        <Appbar.Action
          icon="cog"
          onPress={() => navigation.navigate('Preferences')}
        />
      </Appbar.Header>
      <View style={[ContainerStyles.globalContainer]}>
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
      </View>
    </>
  );
};

export default Home;
