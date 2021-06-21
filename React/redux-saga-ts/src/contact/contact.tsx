import { useState, useEffect } from "react";
import { useSelector, connect, useDispatch } from "react-redux";
import TableContacts from "./contactManagement/TableContacts";
import { fetchContact, delContact, searchContact } from "./contactActions";
import AddModal from "./contactManagement/AddModal";
import EditModal from "./contactManagement/EditModal";

interface ContactInterface {
  id: number;
  ho_va_ten: string;
  sdt: string;
  gender: string;
  age: number;
}

function Contact(props: any) {
  const [addVisible, setAddVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [contacts, setContacts] = useState<ContactInterface[]>([]);
  const [contactEdit, setContactEdit] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContact());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setContacts(props.listContact.contacts);
  }, [props.listContact.contacts]);

  useEffect(() => {
    setContacts(props.listSearch.searchContacts);
  }, [props.listSearch.searchContacts]);

  //when click logout button
  const onClickLogout = () => {
    window.localStorage.removeItem("jwtToken");
  };

  //when click add button
  const onClickAdd = () => {
    setAddVisible(true);
  };

  const getAddUpdate = (contact: ContactInterface) => {
    setContacts([
      ...contacts.slice(0, contacts.length),
      {
        id: contacts.length + 1,
        ho_va_ten: contact.ho_va_ten,
        sdt: contact.sdt,
        gender: contact.gender,
        age: contact.age,
      },
    ]);
    setAddVisible(false);
  };

  //when search by name
  const listContacts = useSelector((state: any) => state.contactReducer.contacts);

  const onSearch = (value: string) => {
    dispatch(searchContact(value, listContacts));
  };

  //when click edit
  const onClickEdit = (contact: ContactInterface) => {
    setContactEdit(contact);
    setEditVisible(true);
  };

  const getEditUpdate = (contact: ContactInterface) => {
    let temp = props.listContact.contacts;
    const index = findIndex(temp, contact);
    setContacts([
      ...temp.slice(0, index),
      {
        id: contact.id,
        ho_va_ten: contact.ho_va_ten,
        sdt: contact.sdt,
        gender: contact.gender,
        age: contact.age,
      },
      ...temp.slice(index + 1),
    ]);
    setEditVisible(false);
  };

  const setVisibleFalse = () => {
    setEditVisible(false);
    setAddVisible(false);
  };

  //when click delete
  const findIndex = (
    listContact: Array<{ id: number }>,
    contact: ContactInterface
  ) => {
    for (let i = 0; i < listContact.length; i++) {
      if (listContact[i].id === contact.id) {
        return i;
      }
    }
    return -1;
  };

  const onClickDelete = (contact: ContactInterface) => {
    dispatch(delContact(contact.id));
    const temp = contacts;

    const index = findIndex(temp, contact);
    setContacts([...contacts.slice(0, index), ...contacts.slice(index + 1)]);
  };

  return (
    <div>
      <TableContacts
        onClickLogout={onClickLogout}
        onClickAdd={onClickAdd}
        onSearch={onSearch}
        onClickEdit={onClickEdit}
        onClickDelete={onClickDelete}
        data={contacts}
      />
      <EditModal
        key={editVisible}
        visible={editVisible}
        contactEdit={contactEdit}
        getEditUpdate={getEditUpdate}
        setVisibleFalse={setVisibleFalse}
      />
      <AddModal
        key={addVisible}
        visible={addVisible}
        getAddUpdate={getAddUpdate}
        setVisibleFalse={setVisibleFalse}
      />
    </div>
  );
}

function mapStateToProps(state: any) {
  return {
    listContact: state.contactReducer,
    listSearch: state.contactReducer,
  };
}

 export default connect(mapStateToProps, null)(Contact);
