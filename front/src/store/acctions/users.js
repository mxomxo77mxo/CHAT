export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAIL = 'SIGN_IN_FAIL';

export function signInRequest(email, password, cb) {
  return {
    type: SIGN_IN_REQUEST,
    payload: {
      email, password, cb
    }
  }
}


export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAIL = 'SIGN_UP_FAIL';

export function signUpRequest(formData, cb) {
  return {
    type: SIGN_UP_REQUEST,
    payload: {
      formData, cb
    }
  }
}

export const SET_ACCOUNT = 'SET_ACCOUNT';

export function setAccount(account, token) {
  return {
    type: SET_ACCOUNT,
    payload: {
      account, token
    }
  }
}

export const LOG_OUT = 'LOG_OUT';

export function userLogOut() {
  return {
    type: LOG_OUT,
    payload: {}
  }
}
