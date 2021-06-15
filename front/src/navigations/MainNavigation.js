import React, { Component } from 'react';
import Home from "../screens/Home";
import Login from "../screens/Login";
import { createStackNavigator } from "@react-navigation/stack";
import Register from "../screens/Register";

const Stack = createStackNavigator();

class MainNavigation extends Component {
  render() {
    return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    );
  }
}

export default MainNavigation;
