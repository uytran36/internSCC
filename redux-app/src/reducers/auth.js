import { SET_CURRENT_USER } from "../constants/ActionTypes";

const initialState = {
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

const authReducer = (state = initialState, action) => {
  if (action.type === SET_CURRENT_USER) {
    return {
      isAuthenticated: !isEmpty(action.user),
      user: action.user,
    };
  } else {
    return state;
  }
};

export default authReducer;
