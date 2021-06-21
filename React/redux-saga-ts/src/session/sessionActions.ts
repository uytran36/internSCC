import * as types from "../constants/ActionTypes";

interface User {
  username: string;
  password: string;
}

export const register = (user: User) => {
  return {
    type: types.REGISTER,
    user,
  };
};

export const setCurrentUser = (user: User) => {
  return {
    type: types.SET_CURRENT_USER,
    user,
  };
};

export const login = (user: User) => {
  return {
    type: types.LOGIN,
    user,
  };
};
