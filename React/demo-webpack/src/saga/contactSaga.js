import * as types from "../constants/ActionTypes";
import { takeEvery } from "@redux-saga/core/effects";
import { put } from "redux-saga/effects";
import axios from "axios";
import { contactData } from "../constants/urlApi";

function* handleFetchContact(action) {
  let contacts = [];
  yield axios
    .get(contactData)
    .then((res) => {
      contacts = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  yield put({ type: types.FETCH_CONTACT_SUCCESS, contacts });
}

function* handleAddContact(action) {
  const contact = action.contact;
  yield axios
    .post(contactData, {
      ho_va_ten: contact.ho_va_ten,
      sdt: contact.sdt,
      gender: contact.gender,
      age: contact.age,
    })
    .then((res) => {
      //console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function* handleDelContact(action) {
  const id = action.contact;
  yield axios.delete(contactData + id).then((res) => {
    // console.log(res.data);
  });
}

function* handleEditContact(action) {
  const contact = action.contact;
  yield axios
    .put(contactData + contact.id, {
      id: contact.id,
      ho_va_ten: contact.ho_va_ten,
      sdt: contact.sdt,
      gender: contact.gender,
      age: contact.age,
    })
    .then((res) => {
      //console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function* handleSearchContact(action) {
  const value = action.value;
  const contacts = action.contacts;
  let listSearch = [];
  if (value !== "") {
    for (let contact of contacts) {
      if (contact.ho_va_ten.includes(value)) {
        yield listSearch.push(contact);
      }
    }
  } else {
    listSearch = contacts;
  }
  yield put({type: types.SEARCH_CONTACT_RESULT, listSearch})
}

export function* contactSaga() {
  yield takeEvery(types.FETCH_CONTACT, handleFetchContact);
  yield takeEvery(types.ADD_CONTACT, handleAddContact);
  yield takeEvery(types.DELETE_CONTACT, handleDelContact);
  yield takeEvery(types.EDIT_CONTACT, handleEditContact);
  yield takeEvery(types.SEARCH_CONTACT, handleSearchContact);
}
