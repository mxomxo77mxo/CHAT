import React, { Component } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import Login from "./screens/Login";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./screens/Home";
import { connect } from "react-redux";
import LogOutNavigation from "./navigations/LogOutNavigation";
import MainNavigation from "./navigations/MainNavigation";
import SettingsNavigation from "./navigations/SettingsNavigation";

const Tab = createBottomTabNavigator();

class Navigation extends Component {
  render() {
    const { token } = this.props;
    return (
      <NavigationContainer>
        {token ? (
          <Tab.Navigator>
            <Tab.Screen name="Home" component={MainNavigation} />
            <Tab.Screen name="Settings" component={SettingsNavigation} />
          </Tab.Navigator>
        ) : (
          <LogOutNavigation />
        )}
      </NavigationContainer>
    );
  }

}

const mapStateToProps = (state) => ({
    token: state.users.token
  }

)

const mapDispatchToProps =
  {}
const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Navigation)

export default Container;
