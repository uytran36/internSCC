import * as types from "../constants/ActionTypes";

export const fetchContact = (contacts) => {
  return {
    type: types.FETCH_CONTACT,
    contacts,
  };
};

export const fetchContactSuccess = (contacts) => {
  return {
    type: types.FETCH_CONTACT_SUCCESS,
    contacts
  }
}

export const delContact = (contact) => {
  return {
    type: types.DELETE_CONTACT,
    contact,
  };
};

export const addContact = (contact) => {
  return {
    type: types.ADD_CONTACT,
    contact,
  };
};

export const editContact = (contact) => {
  return {
    type: types.EDIT_CONTACT,
    contact: contact,
  };
};

export const searchContact = (value, contacts) => {
  return {
    type: types.SEARCH_CONTACT,
    value,
    contacts,
  };
};
