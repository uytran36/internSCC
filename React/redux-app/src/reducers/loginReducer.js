import { LOGIN } from "../constants/ActionTypes";

const initialState = {
  user: { username: "", password: "", auth: false },
};

const loginReducer = (state = initialState, action) => {
  if (action.type === LOGIN) {
    state = action.user;
    return state;
  } else {
    return state;
  }
};

export default loginReducer;
