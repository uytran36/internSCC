import * as types from "../constants/ActionTypes";

const initialState = {
  contacts: [],
};

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_CONTACT:
      const contacts = action.contacts;
      return { ...state, contacts };
    case types.ADD_CONTACT:
      state.contacts.push(action.contact);
      return { ...state };
    case types.DELETE_CONTACT:
      let index = state.contacts.length;
      while (index--) {
        if (state.contacts[index] === action.contact) {
          state.contacts.splice(index, 1);
          break;
        }
      }
      const delContact = action.contact;
      return { ...state, delContact };
    case types.EDIT_CONTACT:
      for(let i = 0; i < state.contacts.length; i++) {
        if(state.contacts[i].id === action.contact.id) {
          state.contacts[i] = action.contact;
          break;
        }
      }
      const contactEdit = action.contact;
      return { ...state, contactEdit };
    default:
      return state;
  }
};

export default contactReducer;
