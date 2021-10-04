import React, { useState, useEffect } from "react";
import {
  Platform,
  Linking,
  StyleSheet,
  useColorScheme,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";

import moment from "moment";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { createStore } from "redux";
import { Provider, useSelector } from "react-redux";

import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

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
} from "native-base";

const PERSISTENCE_KEY = "NAVIGATION_STATE";
const NOTES_KEY = "notes";

const ADD_NOTE = "ADD_NOTE";
const initialNoteState = { notes: [] };
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
let unsubscribe = store.subscribe(() => {
  // Store in localstorage
  storeData(NOTES_KEY, store.getState().notes);
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log("[App.tsx:33]", e); /* TODO */
  }
};

const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log("[App.tsx:42]", e); /* TODO */
  }
};

const getPlatform = () => {
  const pOS =
    Platform.OS === "ios"
      ? "iOS"
      : Platform.OS === "android"
      ? "Android"
      : "Other";
  const pVersion = Platform.Version;
  return pOS + " v" + pVersion;
};

const Welcome = (opts) => {
  return (
    <Center style={styles.container}>
      <Heading mb="2">
        Welcome to <Heading>Work Notes</Heading>
      </Heading>
      <Text mb="5" fontSize="md">
        Get start writing your first note for today.
      </Text>
      <Button
        variant="ghost"
        size="md"
        onPress={() => opts.nav.navigate("AddNote")}
      >
        Write note
      </Button>
      <Text mt="10">You're using {getPlatform()}</Text>
    </Center>
  );
};

const ListData = (opts) => {
  const dark: boolean = useColorScheme() === "dark" ? true : false;
  const backgroundColor = dark ? "light.800" : "light.300";
  const foregroundColor = dark ? "light.500" : "light.800";
  return (
    <FlatList
      data={opts.notes}
      renderItem={({ item }) => (
        <Box
          mb="5"
          p="5"
          overflow="hidden"
          borderBottomWidth="1"
          borderColor={backgroundColor}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              opts.nav.push("ViewNote", { note: item.note, date: item.date });
            }}
          >
            <VStack>
              <Heading mb="3">
                {moment(item.date).format("dddd, MMMM Do YYYY")}
              </Heading>
              <Text mb="3" color={foregroundColor} fontSize="md">
                {item.note}
              </Text>
              <Text color={foregroundColor} fontWeight="200">
                {moment(item.date).fromNow()}
              </Text>
            </VStack>
          </TouchableWithoutFeedback>
        </Box>
      )}
      keyExtractor={(item) => item.date}
    />
  );
};

const HomeScreen = ({ navigation }) => {
  const notes = useSelector((initialNoteState) => initialNoteState.notes);
  return (
    <NativeBaseProvider>
      {notes.length > 0 ? (
        <AddButton nav={navigation} />
      ) : (
        <Welcome nav={navigation} />
      )}
      <ListData notes={notes} nav={navigation} />
    </NativeBaseProvider>
  );
};

const AddButton = (opts) => {
  return (
    <Box>
      <Fab
        size="sm"
        icon={<AddIcon size="sm" />}
        onPress={() => opts.nav.navigate("AddNote")}
      />
    </Box>
  );
};

const AddNote = ({ navigation }) => {
  const [textAreaValue, setTextAreaValue] = useState("");
  const today = Date.now();
  const dark: boolean = useColorScheme() === "dark" ? true : false;
  const backgroundColor = dark ? "light.800" : "light.300";
  const foregroundColor = dark ? "light.300" : "light.800";
  return (
    <NativeBaseProvider>
      <Center>
        <VStack width="90%">
          <Heading my="5">{moment(today).format("dddd, MMMM Do YYYY")}</Heading>
          <TextArea
            h={40}
            mb={7}
            borderWidth="0"
            color={foregroundColor}
            backgroundColor={backgroundColor}
            value={textAreaValue}
            onChangeText={(v) => setTextAreaValue(v)}
            placeholder="Write a new note"
          />
          <Button
            size="lg"
            colorScheme="primary"
            onPress={() => {
              store.dispatch({
                type: "ADD_NOTE",
                note: textAreaValue,
                date: today,
              });
              setTextAreaValue("");
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

const ViewNote = ({ route, navigation }) => {
  const dark: boolean = useColorScheme() === "dark" ? true : false;
  const backgroundColor = dark ? "light.800" : "light.100";
  const foregroundColor = dark ? "light.300" : "light.800";
  return (
    <NativeBaseProvider>
      <Center>
        <VStack width="90%">
          <Heading my="5">
            {moment(route.params.date).format("dddd, MMMM Do YYYY")}
          </Heading>
          <Box p={3} bg={backgroundColor}>
            {route.params.note}
          </Box>
        </VStack>
      </Center>
    </NativeBaseProvider>
  );
};

const Stack = createNativeStackNavigator();

const App = () => {
  const scheme = useColorScheme();
  const readNotesFromStorage = async () => {
    const data = (await getData(NOTES_KEY)) || [];
    initialNoteState.notes = data;
  };
  const [isReady, setIsReady] = useState(__DEV__ ? false : true);
  const [initialState, setInitialState] = useState();

  useEffect(() => {
    const restoreState = async () => {
      try {
        readNotesFromStorage();
        const initialUrl = await Linking.getInitialURL();
        if (Platform.OS !== "web" && initialUrl == null) {
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
        theme={scheme === "dark" ? DarkTheme : DefaultTheme}
        initialState={initialState}
        onStateChange={(state) =>
          AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
        }
      >
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Work Notes" }}
          />
          <Stack.Screen
            name="AddNote"
            component={AddNote}
            options={{ title: "New Note", headerBackTitleVisible: false }}
          />
          <Stack.Screen
            name="ViewNote"
            component={ViewNote}
            options={{ title: "Note", headerBackTitleVisible: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
