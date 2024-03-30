import React from "react";
import moment from "moment";
import { useColorScheme } from "react-native";
import { Heading, Center, NativeBaseProvider, VStack, Box } from "native-base";

const ViewNote = ({ route }) => {
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

export default ViewNote;
