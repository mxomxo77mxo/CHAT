import React, { Component } from 'react';
import SplashScreen from 'react-native-splash-screen'
import Navigation from "./Navigation";
import { Provider } from "react-redux";
import store from "./store";
import Account from "./helpers/Account";
import { setAccount } from "./store/acctions/users";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      render: false,
    }
  }

  async componentDidMount() {
    const [token, account] = await Promise.all([
      Account.getToken(),
      Account.get()
    ]);

    await store.dispatch(setAccount(account, token));
    this.setState({ render: true });
    SplashScreen.hide();
  }

  render() {
    const { render } = this.state;
    if (!render) {
      return null;
    }
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}

export default App;
