import { combineReducers } from "redux";
import {loginReducer, registerReducer, authReducer } from "../session/sessionReducers";
import {contactReducer, searchReducer} from "../contact/contactReducers";

export default combineReducers({
  loginReducer,
  registerReducer,
  authReducer,
  contactReducer,
  searchReducer,
});
