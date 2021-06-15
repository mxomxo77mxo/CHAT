import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.28.123:5000'
})

class Api {
  static signIn(email, password) {
    return api.post('/users/login', { email, password })
  }

  static signUp(formData) {
    return api.post('/users/register', formData)
  }
}

export default Api
