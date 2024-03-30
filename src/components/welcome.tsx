import React from "react";
import { StyleSheet } from "react-native";
import { Text, View, Heading, Button, Center } from "native-base";

import CurrentPlatform from "./platform";

interface Props {
  navigation: any;
}

class Welcome extends React.PureComponent<Props> {
  render() {
    const { navigation } = this.props;
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
          onPress={() => navigation.navigate("AddNote")}
        >
          Write note
        </Button>
        <CurrentPlatform />
      </Center>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Welcome;
