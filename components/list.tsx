import React from "react";
import moment from "moment";
import { TouchableWithoutFeedback } from "react-native";
import { Text, Heading, FlatList, Box, VStack } from "native-base";

interface Props {
  navigation: any;
  notes: any;
}

class List extends React.PureComponent<Props> {
  render() {
    const { notes, navigation } = this.props;
    return (
      <FlatList
        data={notes}
        renderItem={({ item }) => (
          <Box mb="5" p="5" overflow="hidden" borderBottomWidth="1">
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.push("ViewNote", {
                  note: item.note,
                  date: item.date,
                });
              }}
            >
              <VStack>
                <Heading mb="3">
                  {moment(item.date).format("dddd, MMMM Do YYYY")}
                </Heading>
                <Text mb="3" fontSize="md">
                  {item.note}
                </Text>
                <Text fontWeight="200">{moment(item.date).fromNow()}</Text>
              </VStack>
            </TouchableWithoutFeedback>
          </Box>
        )}
        keyExtractor={(item) => item.date}
      />
    );
  }
}

export default List;
