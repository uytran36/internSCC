import * as types from "../constants/ActionTypes";

const initialState = {
  contacts: [],
};

const contactReducer = (state = initialState, action) => {
  switch(action.type) {
    case types.FETCH_CONTACT:
      state.contacts = action.contacts;
      return state;
    case types.ADD_CONTACT:
      state = action.contacts;
      return state;
    case types.DELETE_CONTACT:
      state = action.contact;
      return state;
    case types.EDIT_CONTACT:
      state = action.contact;
      return state;
    default:
      return state;
  }
};

export default contactReducer;
