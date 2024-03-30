import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/home";
import ViewNote from "../screens/view";
import AddNote from "../screens/add";

const Stack = createNativeStackNavigator();

class MainNavigation extends React.PureComponent {
  render() {
    return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
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
    );
  }
}

export default MainNavigation;
