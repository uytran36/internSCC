import * as types from "../constants/ActionTypes";

interface Contact {
  id: number;
  ho_va_ten: string;
  sdt: string;
  gender: string;
  age: number;
}

export const fetchContact = () => {
  return {
    type: types.FETCH_CONTACT,
  };
};

export const fetchContactSuccess = (contacts: Array<Contact>) => {
  return {
    type: types.FETCH_CONTACT_SUCCESS,
    contacts,
  };
};

export const delContact = (id: number) => {
  return {
    type: types.DELETE_CONTACT,
    id,
  };
};

export const addContact = (contact: Contact) => {
  return {
    type: types.ADD_CONTACT,
    contact,
  };
};

export const editContact = (contact: Contact) => {
  return {
    type: types.EDIT_CONTACT,
    contact: contact,
  };
};

export const searchContact = (value: string, contacts: Array<Contact>) => {
  return {
    type: types.SEARCH_CONTACT,
    value,
    contacts,
  };
};
