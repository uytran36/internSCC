import * as types from "../constants/ActionTypes";
import {contactData} from "../constants/urlApi";
import axios from "axios";

export const fetchContactRequest = () => {
  return (dispatch) => {
    axios
      .get(contactData)
      .then((res) => {
        dispatch(fetchContact(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const fetchContact = (contacts) => {
  return {
    type: types.FETCH_CONTACT,
    contacts,
  };
};

export const delContactRequest = (id) => {
  return (dispatch) => {
    axios.delete(contactData + id).then((response) => {
      dispatch(delContact(response.data));
    });
  };
};

export const delContact = (contact) => {
  return {
    type: types.DELETE_CONTACT,
    contact,
  };
};

export const addContactRequest = (contact) => {
  return (dispatch) => {
    axios
      .post(contactData, {
        ho_va_ten: contact.ho_va_ten,
        sdt: contact.sdt,
        gender: contact.gender,
        age: contact.age,
      })
      .then((res) => {
        dispatch(addContact(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const addContact = (contact) => {
  return {
    type: types.ADD_CONTACT,
    contact,
  };
};

export const editContactRequest = (contact) => {
  return (dispatch) => {
    axios
      .put(contactData + contact.id, {
        id: contact.id,
        ho_va_ten: contact.ho_va_ten,
        sdt: contact.sdt,
        gender: contact.gender,
        age: contact.age,
      })
      .then((res) => {
        dispatch(editContact(contact));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const editContact = (contact) => {
  return {
    type: types.EDIT_CONTACT,
    contact: contact,
  };
};

export const searchContactFunc = (value, contacts) => {
  return (dispatch) => {
    let listSearch = [];
    if (value !== "") {
      for (let contact of contacts) {
        if (contact.ho_va_ten.includes(value)) {
          listSearch.push(contact);
        }
      }
    } else {
      listSearch = contacts;
    }
    dispatch(searchContact(listSearch));
  };
};

export const searchContact = (contacts) => {
  return {
    type: types.SEARCH_CONTACT,
    contacts,
  };
};
