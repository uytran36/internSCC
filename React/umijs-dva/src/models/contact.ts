import axios from 'axios';
import { contactData } from '../pages/constants/urlApi';

interface Contact {
  id: number;
  ho_va_ten: string;
  sdt: string;
  gender: string;
  age: number;
}

const delay = (timeout: any) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

export default {
  namespace: 'contact',
  state: {
    contacts: [],
  },
  reducers: {
    fetchContactSuccess(state: Array<Contact>, action: any) {
      return { contacts: action.contacts };
    },
    saveContacts(state: Array<Contact>, action: any) {
      return { contacts: action.contacts };
    },
  },
  effects: {
    *fetchContact(action: any, { put }: { put: any }) {
      let contacts: Array<Contact> = [];
      action.load(true);
      yield axios
        .get(contactData)
        .then((res: any) => {
          contacts = res.data;
          action.load(false);
        })
        .catch((err) => {
          console.log(err);
        });

      yield put({
        type: 'fetchContactSuccess',
        contacts: contacts,
      });
    },
    *addContact(action: any, { put, select }: { put: any; select: any }) {
      const contacts: Array<Contact> = yield select(
        (state: any) => state.contact.contacts,
      );

      const contact = {
        id: contacts.length + 1,
        ho_va_ten: action.contact.ho_va_ten,
        sdt: action.contact.sdt,
        gender: action.contact.gender,
        age: action.contact.age,
      };

      action.load(true);
      yield axios
        .post(contactData, {
          ho_va_ten: contact.ho_va_ten,
          sdt: contact.sdt,
          gender: contact.gender,
          age: contact.age,
        })
        .then((res) => {
          // console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      yield put({ type: 'fetchContact', load: action.load});
    },
    *delContact(action: any, { put }: { put: any }) {
      const id = action.contact.id;
      action.load(true);
      yield axios.delete(contactData + id).then((res) => {
        // console.log(res.data);
      });
      yield put({ type: 'fetchContact', load: action.load });
    },
    *editContact(action: any, { put }: { put: any }) {
      const contact = action.contact;
      action.load(true);
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
      yield put({ type: 'fetchContact', load: action.load });
    },
    *searchContact(action: any, { put, select }: { put: any; select: any }) {
      const value = action.value;
      const contacts: Array<Contact> = yield select(
        (state: any) => state.contact.contacts,
      );

      if (value !== '') {
        let listSearch = [];
        for (let contact of contacts) {
          if (contact.ho_va_ten.includes(value)) {
            yield listSearch.push(contact);
          }
        }

        yield put({ type: 'saveContacts', contacts: listSearch });
        console.log(listSearch);
      } else {
        yield put({ type: 'fetchContact' });
      }
    },
  },
};
