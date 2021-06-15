import React, { Component } from 'react';
import { connect } from "react-redux";
import _ from "lodash";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { Button, Icon, Input } from "react-native-elements";
import { signInRequest, userLogOut } from "../store/acctions/users";
import Account from "../helpers/Account";
import ReactNativeBiometrics from "react-native-biometrics";
import Wrapper from "../components/Wrapper";

class Home extends Component {
  constructor(props) {
    super(props);

  }

  backHandler = () => {
    this.props.navigation.push('Login')
  }

  async componentDidMount() {
    const { available } = await ReactNativeBiometrics.isSensorAvailable();
    const isActive = await Account.isBiometricActive();
    if (available && isActive === -1) {
      let success;
      try {
        const data = await ReactNativeBiometrics.simplePrompt({ promptMessage: 'Confirm fingerprint' })
        success = data.success
      } catch (e) {
        success = false;
      }

      await Account.saveBiometricsToken(success)

    }
  }


  render() {
    return (
      <Wrapper>
        <View>
          <Text>Home</Text>
          <View style={styles.logout}>
            <Button onPress={this.props.userLogOut}
                    title={'Logout'}
            >
            </Button>
          </View>
        </View>
      </Wrapper>
    );
  }
}

const styles = StyleSheet.create({
  logout: {
    color: 'white',
    fontSize: 20,
    position: 'absolute',
    right: '2%',
  }
})

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {
  userLogOut
}
const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home)

export default Container;




