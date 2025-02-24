import React, {useEffect} from 'react';
import {useAppDispatch} from './store';
import {initializeApp} from './store/app';
import MainNavigation from './components/main-navigation';

import {PreferencesProvider} from './context/PreferencesContext';
import {initializeNotes} from "./store/notes";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeApp());
    dispatch(initializeNotes());
  }, []);

  return (
    <PreferencesProvider>
      <MainNavigation />
    </PreferencesProvider>
  );
};

export default App;
