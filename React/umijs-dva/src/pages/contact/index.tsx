import { useState, useEffect } from 'react';
import { useSelector, connect, useDispatch } from 'dva';
import TableContacts from './contactManagement/TableContacts';
import AddModal from './contactManagement/AddModal';
import EditModal from './contactManagement/EditModal';

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
  const [contactEdit, setContactEdit] = useState({});
  const [loading, setLoading] = useState(false);

  const contacts = useSelector((state: any) => state.contact.contacts);
  const dispatch = useDispatch();

  const setLoad = (load: boolean) => {
    setLoading(load);
  }

  useEffect(() => {
    dispatch({ type: 'contact/fetchContact', load: setLoad }); // eslint-disable-next-line
  }, []);

  //when click logout button
  const onClickLogout = () => {
    window.localStorage.removeItem('jwtToken');
  };

  //when click add button
  const onClickAdd = () => {
    setAddVisible(true);
  };

  //when search by name

  const onSearch = (value: string) => {
    dispatch({ type: 'contact/searchContact', value });
  };

  //when click edit
  const onClickEdit = (contact: ContactInterface) => {
    setContactEdit(contact);
    setEditVisible(true);
  };

  const setVisibleFalse = () => {
    setEditVisible(false);
    setAddVisible(false);
  };

  //when click delete
   const onClickDelete = (contact: ContactInterface) => {
    dispatch({ type: 'contact/delContact', contact: contact, load: setLoad });
  };

  return (
    <div>
      <TableContacts
        onClickLogout={onClickLogout}
        onClickAdd={onClickAdd}
        onSearch={onSearch}
        onClickEdit={onClickEdit}
        onClickDelete={onClickDelete}
        loading={loading}
        data={contacts}
      />
      <AddModal
        key={addVisible}
        visible={addVisible}
        setVisibleFalse={setVisibleFalse}
        setLoad={setLoad}
      />
      <EditModal
        key={editVisible}
        visible={editVisible}
        contactEdit={contactEdit}
        setVisibleFalse={setVisibleFalse}
        setLoad={setLoad}
      />
    </div>
  );
}

export default Contact;
