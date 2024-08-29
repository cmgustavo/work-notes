import React, {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {useAppDispatch} from './store';
import {initializeApp} from './store/app';
import MainNavigation from './components/main-navigation';

import {PreferencesProvider} from './context/PreferencesContext';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeApp());
  }, []);

  return (
    <SafeAreaProvider>
      <PreferencesProvider>
        <MainNavigation />
      </PreferencesProvider>
    </SafeAreaProvider>
  );
};

export default App;
