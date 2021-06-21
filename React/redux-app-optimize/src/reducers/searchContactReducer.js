import { SEARCH_CONTACT } from "../constants/ActionTypes";

const initialState = {
  searchContacts: [],
};

const searchReducer = (state = initialState, action) => {
  if (action.type === SEARCH_CONTACT) {
    const searchContacts = action.contacts;
    return {...state, searchContacts};
  } else {
    return state;
  }
};

export default searchReducer;
