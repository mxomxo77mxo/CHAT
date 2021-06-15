import React, { Component } from 'react';
import { connect } from "react-redux";
import _ from "lodash";
import { View, StyleSheet } from "react-native";
import { Button, Icon, Input } from "react-native-elements";
import { setAccount, signInRequest } from "../store/acctions/users";
import { CommonActions } from '@react-navigation/native';
import Account from "../helpers/Account";
import ReactNativeBiometrics from "react-native-biometrics";


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        email: '',
        password: '',
      }
    }
  }

  async componentDidMount() {
    const isBiometricActive = Account.isBiometricActive();
    if (isBiometricActive) {
      let success;
      try {
        const data = await ReactNativeBiometrics.simplePrompt({ promptMessage: 'Confirm fingerprint' })
        success = data.success
      } catch (e) {
        success = false;
      }

      if (success) {
        const token = await Account.getBiometricsToken();
        await Account.setBiometricsStatus('1');
        this.props.setAccount({}, token);
      }
    }
  }


  handleChange = (path, value) => {
    const { formData } = this.state;
    _.set(formData, path, value);
    this.setState({ formData })
  }

  onSubmit = () => {
    const { formData } = this.state;
    this.props.signInRequest(formData.email, formData.password, () => {
      this.props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            { name: 'Home' },
          ],
        })
      );
    });
  }

  onSubmitHandler = () => {
    this.props.navigation.push('Register')
  }

  render() {
    return (
      <View>
        <Input
          label="Email"
          autoCompleteType="email"
          keyboardType="email-address"
          onChangeText={(val) => this.handleChange('email', val)}
          leftIcon={
            <Icon
              name='envelope-o'
              size={24}
              color='black'
              type='font-awesome'
            />
          }
        />
        <Input
          label="Password"
          secureTextEntry
          onChangeText={(val) => this.handleChange('password', val)}
          leftIcon={
            <Icon
              name='eye-slash'
              size={24}
              color='black'
              type='font-awesome'
            />
          }
        />
        <Button onPress={this.onSubmit} title="Sign in" />
        <View style={styles.btn}>
          <Button onPress={this.onSubmitHandler} title="Register" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    marginTop: 15
  }
})


const mapStateToProps = (state) => ({
  loginRequestStatus: state.users.loginRequestStatus
})

const mapDispatchToProps = {
  signInRequest,
  setAccount,
}
const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login)

export default Container;
