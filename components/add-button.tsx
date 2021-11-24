import React from "react";
import { Box, Fab, AddIcon } from "native-base";

interface Props {
  navigation: any;
  notes: any;
}

class AddButton extends React.PureComponent<Props> {
  render() {
    const { notes, navigation } = this.props;
    return (
      <Box>
        <Fab
          size="sm"
          icon={<AddIcon size="sm" />}
          onPress={() => navigation.navigate("AddNote", { notes: { notes } })}
        />
      </Box>
    );
  }
}

export default AddButton;
