import { React, useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { Table, Space, Button, Input, Row, Col } from "antd";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import {
  fetchContactRequest,
  delContactRequest,
  searchContactFunc,
} from "../actions/contacts";
import EditModal from "./EditModal";
import AddModal from "./AddModal";

function TableContacts(props) {
  const [editVisible, setEditVisible] = useState(false);
  const [addVisible, setAddVisible] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [contactEdit, setContactEdit] = useState({});

  const listContact = useSelector((state) => state.contactReducer);
  console.log(props.listContact.contacts);
  useEffect(() => {
    props.fetchContactRequest();
    //setContacts(props.listContact.contacts);
  }, []);

  //when click logout button
  const onClickLogout = () => {
    window.localStorage.removeItem("jwtToken");
  };
  //when click add button
  const onClickAdd = () => {
    setAddVisible(true);
  };

  const getAddUpdate = (contact) => {
    setContacts([
      ...contacts.slice(0, contact.length),
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
  const listSearch = useSelector((state) => state.searchContactReducer);
  const { Search } = Input;

  const onSearch = (value) => {
    props.searchContactFunc(value, contacts);

    setContacts(listSearch);
  };

  //when click edit
  const onClickEdit = (contact) => {
    setContactEdit(contact);
    setEditVisible(true);
  };

  const getEditUpdate = (contact) => {
    const index = findIndex(contacts, contact);
    setContacts([
      ...contacts.slice(0, index),
      {
        id: contact.id,
        ho_va_ten: contact.ho_va_ten,
        sdt: contact.sdt,
        gender: contact.gender,
        age: contact.age,
      },
      ...contacts.slice(index + 1),
    ]);
    setEditVisible(false);
  };

  const setVisibleFalse = () => {
    setEditVisible(false);
    setAddVisible(false);
  };

  //when click delete
  const findIndex = (listContact, contact) => {
    for (let i = 0; i < listContact.length; i++) {
      if (listContact[i].id === contact.id) {
        return i;
      }
    }
  };

  const onClickDelete = (contact) => {
    props.delContactRequest(contact.id);
    const temp = contacts;

    const index = findIndex(temp, contact);
    setContacts([...contacts.slice(0, index), ...contacts.slice(index + 1)]);
  };

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Họ tên",
      dataIndex: "ho_va_ten",
      key: "ho_va_ten",
    },
    {
      title: "Số điện thoại",
      dataIndex: "sdt",
      key: "sdt",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Tuổi",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <EditTwoTone
            className="edit-button"
            onClick={() => onClickEdit(record)}
          />
          <DeleteTwoTone
            className="delete"
            onClick={() => onClickDelete(record)}
          />
        </Space>
      ),
    },
  ];

  const data = contacts;

  return (
    <div className="wrap-table-contacts">
      <Row>
        <Col span={6}>
          <Search
            className="searchTxb"
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
          />
        </Col>
        <Col span={6}></Col>
        <Col span={6} className="addButton">
          <Button type="primary" size="large" onClick={onClickAdd}>
            +Add
          </Button>
        </Col>
        <Col span={6}>
          <Button type="primary" size="large" onClick={onClickLogout} href="/">
            Logout
          </Button>
        </Col>
      </Row>

      <Table
        columns={columns}
        // dataSource={
        //   props?.listContact?.contacts?.length === 0
        //     ? []
        //     : props.listContact.contacts
        // }
        dataSource={props.listContact.contacts}
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

function mapStateToProps(state) {
  //const contacts = state.contactReducer;
 // console.log(contacts, state.contactReducer);

  //return { ...state, listContact: contacts };
  return {listContact: state.contactReducer};
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchContactRequest: () => {
      dispatch(fetchContactRequest());
    },
    delContactRequest: (id) => {
      dispatch(delContactRequest(id));
    },
    searchContactFunc: (value, contacts) => {
      dispatch(searchContactFunc(value, contacts));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableContacts);
