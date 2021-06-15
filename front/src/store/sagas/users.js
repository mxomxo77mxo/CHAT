import {
  SIGN_IN_FAIL,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_UP_FAIL,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS
} from "../acctions/users";
import { takeLatest, put, call } from 'redux-saga/effects';
import Api from "../../Api";
import Account from "../../helpers/Account";

export default function* watcher() {
  yield takeLatest(SIGN_IN_REQUEST, handleSignIn)
  yield takeLatest(SIGN_UP_REQUEST, handleSignUp)
}

function* handleSignIn(action) {
  try {
    const { email, password, cb } = action.payload;
    const { data } = yield call(Api.signIn, email, password);

    yield call(Account.setToken, data.token);
    yield call(Account.set, data.user);
    yield put({
      type: SIGN_IN_SUCCESS,
      payload: {
        data
      }
    })
    if (cb) {
      cb(data);
    }
  } catch (e) {
    yield call(Account.delete);
    yield put({
      type: SIGN_IN_FAIL,
      message: e.response?.data?.message || e.message,
    })
  }
}
function* handleSignUp(action) {
  try {
    const { formData} = action.payload;
    const { data } = yield call(Api.signUp, formData);

    yield call(Account.setToken, data.token);
    yield call(Account.set, data.user);
    yield put({
      type: SIGN_UP_SUCCESS,
      payload: {
        data
      }
    })
    if (action.payload.cb) {
      action.payload.cb(data);
    }
  } catch (e) {
    yield call(Account.delete);
    yield put({
      type: SIGN_UP_FAIL,
      message: e.response?.data?.message || e.message,
    })
  }
}
