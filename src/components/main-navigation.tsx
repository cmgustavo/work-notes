import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../screens/home';
import ViewNote from '../screens/view';
import AddNote from '../screens/add';
import Preferences from '../screens/preferences';

const Stack = createNativeStackNavigator();

class MainNavigation extends React.PureComponent {
  render() {
    return (
      <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Home"
          component={Home}
        />
        <Stack.Screen
          name="AddNote"
          component={AddNote}
        />
        <Stack.Screen
          name="ViewNote"
          component={ViewNote}
        />
        <Stack.Screen
          name="Preferences"
          component={Preferences}
        />
      </Stack.Navigator>
    );
  }
}

export default MainNavigation;
