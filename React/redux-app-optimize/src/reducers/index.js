import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import registerReducer from "./registerReducer";
import contactReducer from "./contactReducer";
import searchContactReducer from "./searchContactReducer";
import auth from "./auth";

export default combineReducers({
  loginReducer,
  registerReducer,
  contactReducer,
  searchContactReducer,
  auth
});
