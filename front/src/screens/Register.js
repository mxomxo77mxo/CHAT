import React from 'react'
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  TextInput,
  Button, ScrollView,

} from 'react-native';
import { Input } from "react-native-elements";
import _ from "lodash";
import { signUpRequest } from "../store/acctions/users";
import { connect } from "react-redux";


class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        avatar: {},
      }
    }
  }

  handleSubmit = (values) => {
    const { formData } = this.state;
    this.props.signUpRequest(formData)
  }

  handleChange = (path, value) => {
    const { formData } = this.state;
    _.set(formData, path, value);
    this.setState({ formData })
  }

  render() {
    const { formData } = this.state;
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <ScrollView style={styles.signupContainer}>
          <Text>Register</Text>
          <Input
            label="First Name"
            value={formData.firstName}
            onChangeText={(val) => this.handleChange('firstName', val)}
          />
          <Input
            label="Last Name"
            value={formData.lastName}
            onChangeText={(val) => this.handleChange('lastName', val)}
          />
          <Input
            label="Email"
            autoCompleteType="email"
            value={formData.email}
            onChangeText={(val) => this.handleChange('email', val)}
          />
          <Input
            label="Password"
            secureTextEntry
            value={formData.password}
            onChangeText={(val) => this.handleChange('password', val)}
          />

          <Button
            onPress={this.handleSubmit}
            title="SIGN UP"
          />

        </ScrollView>
      </>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupContainer: {
    backgroundColor: 'lightblue',
    padding: 10,
    elevation: 10,
  },
})


const mapStateToProps = (state) => ({})

const mapDispatchToProps = {
  signUpRequest
}
const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp)

export default Container


