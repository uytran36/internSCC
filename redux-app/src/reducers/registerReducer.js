import { REGISTER } from "../constants/ActionTypes";

const initialState = {
  user: { username: "", password: "", confirmPassword: "" },
};

const registerReducer = (state = initialState, action) => {
  if (action.type === REGISTER) {
    state = action.user;
    return state;
  } else {
    return state;
  }
};

export default registerReducer;
