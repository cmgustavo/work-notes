import React, {useState, useEffect} from 'react';
import {Platform, Linking, StyleSheet, useColorScheme} from 'react-native';

import moment from 'moment';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {createStore} from 'redux';
import {Provider, useSelector} from 'react-redux';

import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  Text,
  Box,
  FlatList,
  View,
  AddIcon,
  Fab,
  Button,
  TextArea,
  Center,
  Heading,
  VStack,
  NativeBaseProvider,
} from 'native-base';

const PERSISTENCE_KEY = 'NAVIGATION_STATE';
const NOTES_KEY = 'notes';

const ADD_NOTE = 'ADD_NOTE';
const initialNoteState = {notes: []};
const noteApp = (state = initialNoteState, action) => {
  switch (action.type) {
    case ADD_NOTE:
      return Object.assign({}, state, {
        notes: [
          ...state.notes,
          {
            note: action.note,
            date: action.date,
          },
        ],
      });
    default:
      return state;
  }
};

let store = createStore(noteApp);
console.log('[App.tsx:59]', store.getState()); /* TODO */
let unsubscribe = store.subscribe(() => {
  console.log('[App.tsx:59] CHANGED', store.getState());
  // Store in localstorage
  storeData(NOTES_KEY, store.getState().notes);
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 16,
  },
});

const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log('[App.tsx:33]', e); /* TODO */
  }
};

const getData = async key => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log('[App.tsx:42]', e); /* TODO */
  }
};

const removeData = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log('[App.tsx:97]', e); /* TODO */
  }
};

const getPlatform = () => {
  const pOS =
    Platform.OS === 'ios'
      ? 'iOS'
      : Platform.OS === 'android'
      ? 'Android'
      : 'Other';
  const pVersion = Platform.Version;
  return pOS + ' v' + pVersion;
};

const Welcome = opts => {
  return (
    <Center style={styles.container}>
      <View>
        <Heading mb="2">
          Welcome to <Heading>Work Notes</Heading>
        </Heading>
        <Text mb="5" fontSize="md">
          Get start writing your first note for today.
        </Text>
        <Button size="md" onPress={() => opts.nav.navigate('AddNote')}>
          Write note
        </Button>
        <Center>
          <Text mt="10">You're using {getPlatform()}</Text>
        </Center>
      </View>
    </Center>
  );
};

const ListData = opts => {
  return (
    <FlatList
      p="5"
      data={opts.notes}
      renderItem={({item}) => (
        <Box
          mb="5"
          p="5"
          rounded="lg"
          overflow="hidden"
          borderWidth="1"
          borderColor="dark.600"
        >
          <VStack>
            <Heading>{moment(item.date).format('dddd, MMMM Do YYYY')}</Heading>
            <Text fontSize="lg">{item.note}</Text>
          </VStack>
        </Box>
      )}
      keyExtractor={item => item.date}
    />
  );
};

const HomeScreen = ({navigation}) => {
  const notes = useSelector(initialNoteState => initialNoteState.notes);
  return (
    <NativeBaseProvider>
      {notes.length > 0 ? (
        <AddButton nav={navigation} />
      ) : (
        <Welcome nav={navigation} />
      )}
      <ListData notes={notes} />
    </NativeBaseProvider>
  );
};

const AddButton = opts => {
  return (
    <Fab
      size="sm"
      icon={<AddIcon size="sm" />}
      onPress={() => opts.nav.navigate('AddNote')}
    />
  );
};

const AddNote = ({navigation}) => {
  const [textAreaValue, setTextAreaValue] = useState('');
  const today = Date.now();
  return (
    <NativeBaseProvider>
      <Center>
        <VStack width="90%">
          <Heading my="5">{moment(today).format('dddd, MMMM Do YYYY')}</Heading>
          <TextArea
            h={40}
            mb={7}
            value={textAreaValue}
            onChangeText={v => setTextAreaValue(v)}
            placeholder="Insert note"
          />
          <Button
            size="lg"
            colorScheme="primary"
            onPress={() => {
              store.dispatch({
                type: 'ADD_NOTE',
                note: textAreaValue,
                date: today,
              });
              setTextAreaValue('');
              navigation.goBack();
            }}
          >
            Save
          </Button>
        </VStack>
      </Center>
    </NativeBaseProvider>
  );
};

const Stack = createNativeStackNavigator();

const App = () => {
  const [isReady, setIsReady] = useState(__DEV__ ? false : true);
  const [initialState, setInitialState] = useState();
  const scheme = useColorScheme();

  const readNotesFromStorage = async () => {
    const data = (await getData(NOTES_KEY)) || [];
    initialNoteState.notes = data;
  };

  useEffect(() => {
    const restoreState = async () => {
      // Restore from Localstorage
      readNotesFromStorage();
      try {
        const initialUrl = await Linking.getInitialURL();
        if (Platform.OS !== 'web' && initialUrl == null) {
          // Only restore state if there's no deep link and we're not on web
          const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
          const state = savedStateString
            ? JSON.parse(savedStateString)
            : undefined;

          if (state !== undefined) {
            setInitialState(state);
          }
        }
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer
        theme={scheme === 'dark' ? DarkTheme : DefaultTheme}
        initialState={initialState}
        onStateChange={state =>
          AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
        }
      >
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{title: 'Work Notes'}}
          />
          <Stack.Screen
            name="AddNote"
            component={AddNote}
            options={{title: 'New Note', headerBackTitleVisible: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
