import { SET_CURRENT_USER, LOGIN, REGISTER } from "../constants/ActionTypes";

const initialLoginState = {
  user: { username: "", password: "", auth: false },
};

export const loginReducer = (state = initialLoginState, action) => {
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

export const registerReducer = (state = initialRegisterState, action) => {
  if (action.type === REGISTER) {
    state = action.user;
    return state;
  } else {
    return state;
  }
};

const initialAuthState = {
  isAuthenticated: false,
  user: {},
};

function isEmpty(item) {
  return item.username === "" ||
    item.password === "" ||
    Object.keys(item).length === 0
    ? true
    : false;
}

export const authReducer = (state = initialAuthState, action) => {
  if (action.type === SET_CURRENT_USER) {
    return {
      isAuthenticated: !isEmpty(action.user),
      user: action.user,
    };
  } else {
    return state;
  }
};


