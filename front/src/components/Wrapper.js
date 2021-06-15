import React, { Component, } from 'react';
import { AppState, Text, NativeModules, NativeEventEmitter } from 'react-native'
import ReactNativeBiometrics from "react-native-biometrics";

class Wrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lock: false,
    }
  }

  componentDidMount() {
    AppState.addEventListener("change", this.onActiveityStatusChange);
  }

  componentWillUnmount() {

    AppState.addEventListener("change", this.onActiveityStatusChange);
  }

  onBlockChange = (status) => {
    console.log(status, 444444)
  }
  onActiveityStatusChange = async (status) => {
    console.log(status);

    if (status === 'background') {
      this.setState({ lock: true })
      return
    }
    let success
    try {
      const data = await ReactNativeBiometrics.simplePrompt({ promptMessage: 'Confirm fingerprint' })
      success = data.success
    } catch (e) {
      success = false;
    }
    if (success) {
      this.setState({ lock: false })
    }
  }

  render() {
    const { lock } = this.state;
    return (
      <>
        {lock ? (
          <Text>Locked</Text>
        ) : this.props.children}
      </>
    );
  }
}

export default Wrapper;
