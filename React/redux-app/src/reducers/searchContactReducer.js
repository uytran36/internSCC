import { SEARCH_CONTACT } from "../constants/ActionTypes";

const initialState = {
  searchContacts: [],
};

const contactReducer = (state = initialState, action) => {
  if (action.type === SEARCH_CONTACT) {
    state = action.contacts;
    return state;
  } else {
    return state;
  }
};

export default contactReducer;
