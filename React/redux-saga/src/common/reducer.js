import { combineReducers } from "redux";
import {loginReducer, registerReducer, authReducer } from "../session/sessionReducers";
import {contactReducer} from "../contact/contactReducers";

export default combineReducers({
  loginReducer,
  registerReducer,
  authReducer,
  contactReducer,
  // searchReducer,
  //function first
});
