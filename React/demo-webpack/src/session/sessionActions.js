import * as types from "../constants/ActionTypes";

export const register = (user) => {
  return {
    type: types.REGISTER,
    user,
  };
};

export const setCurrentUser = (user) => {
  return {
    type: types.SET_CURRENT_USER,
    user,
  };
};

export const login = (user) => {
  return {
    type: types.LOGIN,
    user,
  };
};
