import * as types from "../constants/ActionTypes";

interface Contact {
  id: number;
  ho_va_ten: string;
  sdt: string;
  gender: string;
  age: number;
}


const initialState: {
  contacts: Array<Contact>;
  searchContacts: Array<Contact>;
} = { contacts: [], searchContacts: [] };

export const contactReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.FETCH_CONTACT_SUCCESS:
      const contacts = action.contacts;
      return { ...state, contacts };
    case types.ADD_CONTACT:
      const temp: any = action.contact;
      state.contacts.push(temp);
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
      for (let i = 0; i < state.contacts.length; i++) {
        if (state.contacts[i].id === action.contact.id) {
          state.contacts[i] = action.contact;
          break;
        }
      }
      const contactEdit = action.contact;
      return { ...state, contactEdit };
    case types.SEARCH_CONTACT_RESULT:
      const searchContacts = action.listSearch;
      return { ...state, searchContacts };
    default:
      return state;
  }
};
