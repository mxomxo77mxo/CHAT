import AsyncStorage from "@react-native-async-storage/async-storage";
import _ from 'lodash';

class Account {

  static get = async () => {
    try {
      return JSON.parse(await AsyncStorage.getItem('account')) || {};
    } catch (e) {
      return {};
    }
  }

  static  set = async (account) => {
    return AsyncStorage.setItem('account', JSON.stringify(account))
  }

  static #token = null;

  static setToken = async (token) => {
    this.#token = token;
    return AsyncStorage.setItem('token', token)
  }

  static getToken = async () => {
    if (_.isNull(this.#token)) {
      this.#token = await AsyncStorage.getItem('token')
    }
    return this.#token;
  }

  static delete = () => {
    this.#token = null;
    return Promise.all([
      AsyncStorage.removeItem('token'),
      AsyncStorage.removeItem('account'),
      AsyncStorage.removeItem('biometricsStatus'),
    ]);
  }

  static isBiometricActive = async () => {
    const res = await AsyncStorage.getItem('biometricsStatus')
    return res ? +res : -1;
  }

  static setBiometricsStatus = async (status) => {
    AsyncStorage.setItem('biometricsStatus', status)
  }

  static getBiometricsToken = async () => {
    return AsyncStorage.getItem('biometricsToken')
  }

  static saveBiometricsToken = async (success) => {
    if (success) {
      const token = await this.getToken();
      await AsyncStorage.setItem('biometricsToken', token)
    }
    await this.setBiometricsStatus('biometricsStatus', success ? '1' : '0');
  }
}

export default Account


