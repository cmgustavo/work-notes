import React, { useState } from "react";
import moment from "moment";
import { useColorScheme } from "react-native";
import {
  Heading,
  Center,
  NativeBaseProvider,
  VStack,
  TextArea,
  Button,
} from "native-base";

import { storeData } from "../services/storage";

const AddNote = ({ route, navigation }) => {
  let { notes } = route.params.notes;
  const [textAreaValue, setTextAreaValue] = useState("");
  const today = Date.now();
  const dark: boolean = useColorScheme() === "dark" ? true : false;
  const backgroundColor = dark ? "light.800" : "light.300";
  const foregroundColor = dark ? "light.300" : "light.800";

  const addNote = (text: string) => {
    notes.push({ note: text, date: today });
    storeData(notes);
  };

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
              addNote(textAreaValue);
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

export default AddNote;
