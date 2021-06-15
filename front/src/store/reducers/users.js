import { SET_ACCOUNT, SIGN_IN_FAIL, SIGN_IN_REQUEST, SIGN_IN_SUCCESS } from "../acctions/users";

const initialState = {
  loginRequestStatus: '',
  token: '',
  account: '',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_ACCOUNT: {
      const { token, account } = action.payload;
      return {
        ...state,
        token,
        account,
      }
    }

    case SIGN_IN_REQUEST: {
      return {
        ...state,
        loginRequestStatus: 'request'
      }
    }

    case SIGN_IN_SUCCESS: {
      const { token, user: account } = action.payload.data;
      return {
        ...state,
        token,
        account,
        loginRequestStatus: 'ok'
      }
    }
    case SIGN_IN_FAIL: {
      return {
        ...state,
        loginRequestStatus: 'fail'
      }
    }
    default: {
      return state
    }
  }
}
