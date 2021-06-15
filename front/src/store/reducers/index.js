import { combineReducers } from "redux";
import users from './users'
import { LOG_OUT } from "../acctions/users";
import Account from "../../helpers/Account";

const appReducer = combineReducers({
  users
})


const rootReducer = (state, action) => {
  if (action.type === LOG_OUT) {
    Account.delete();
    return appReducer(undefined, action);
  }
  return appReducer(state, action)
}


export default rootReducer
