import { SET_CURRENT_USER, LOGIN, REGISTER } from "../constants/ActionTypes";

const initialLoginState = {
  user: { username: "", password: "", auth: false },
};

export const loginReducer = (state = initialLoginState, action: any) => {
  if (action.type === LOGIN) {
    state = action.user;
    return state;
  } else {
    return state;
  }
};

const initialRegisterState = {
  user: { username: "", password: "", confirmPassword: "" },
};

export const registerReducer = (state = initialRegisterState, action: any) => {
  if (action.type === REGISTER) {
    state = action.user;
    return state;
  } else {
    return state;
  }
};

const initialAuthState = {
  username: "",
  password: "",
  token: window.localStorage.getItem("jwtToken"),
};

export const authReducer = (state = initialAuthState, action: any) => {
  if (action.type === SET_CURRENT_USER) {
    return {
      username: action.auth.username,
      password: action.auth.password,
      token: action.auth.token,
    };
  } else {
    return state;
  }
};
