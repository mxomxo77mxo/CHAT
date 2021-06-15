import React, { Component } from 'react';
import Login from "../screens/Login";
import Home from "../screens/Home";
import { createStackNavigator } from "@react-navigation/stack";
import Register from "../screens/Register";

const Stack = createStackNavigator();

class LogOutNavigation extends Component {
  render() {
    return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    );
  }
}

export default LogOutNavigation;


