import React, { Component } from 'react';
import Home from "../screens/Home";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

class SettingsNavigation extends Component {
  render() {
    return (
      <Stack.Navigator initialRouteName="Settings">
        <Stack.Screen name="Settings" component={Home} />
      </Stack.Navigator>
    );
  }
}

export default SettingsNavigation;
