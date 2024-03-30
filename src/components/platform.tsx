import React from "react";
import { Text, View } from "native-base";

import getPlatform from "../services/platform";

class CurrentPlatform extends React.PureComponent {
  render() {
    return (
      <View>
        <Text>You're using {getPlatform()}</Text>
      </View>
    );
  }
}

export default CurrentPlatform;
