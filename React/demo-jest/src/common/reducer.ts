import { combineReducers } from "redux";
import {
  loginReducer,
  registerReducer,
  authReducer,
} from "../session/sessionReducers";

export default combineReducers({
  loginReducer,
  registerReducer,
  authReducer,

});
