import { React, useEffect, useState } from "react";
import "./TodoNew.css";
import axios from "axios";
import { Table, Tag, Space, Button, Input, Row, Col } from "antd";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";

import EditModal from "./EditModal";
import AddModal from "./AddModal";



function TodoNew() {
  const [todoItems, setTodo] = useState([]);
  const [editVisible, setEditVisible] = useState(false);
  const [addVisible, setAddVisible] = useState(false);
  const [todoItem, setItem] = useState({});

  useEffect(() => {
    axios
      .get("https://60b0f8b91f26610017fff943.mockapi.io/api/v1/todo_data")
      .then((res) => {
        setTodo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //search todo
  const { Search } = Input;
  const onSearch = (value) => {
    axios
      .get("https://60b0f8b91f26610017fff943.mockapi.io/api/v1/todo_data")
      .then((res) => {
        let listItem = res.data;
        listItem = listItem.filter((item) => item.title.includes(value));
        setTodo(listItem);
        console.log(listItem);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //click edit
  const onClickEdit = (item) => {
    setItem(item);
    setEditVisible(true);
  };

  const getEditUpdate = () => {
    axios
      .get("https://60b0f8b91f26610017fff943.mockapi.io/api/v1/todo_data")
      .then((res) => {
        setTodo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setEditVisible(false);
  };

  //click add
  const onClickAdd = () => {
    setAddVisible(true);
  };
  const getAddUpdate = () => {
    axios
      .get("https://60b0f8b91f26610017fff943.mockapi.io/api/v1/todo_data")
      .then((res) => {
        setTodo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setAddVisible(false);
  };

  const setVisibleFalse = () => {
    setEditVisible(false);
    setAddVisible(false);
  }
  //click delete
  const findIndex = (todoList, item) => {
    for (let i = 0; i < todoList.length; i++) {
      if (todoList[i].id === item.id) {
        return i;
      }
    }
  };

  const onClickDelete = (item) => {
    const temp = todoItems;

    const index = findIndex(temp, item);
    setTodo([...todoItems.slice(0, index), ...todoItems.slice(index + 1)]);

    axios
      .delete(
        "https://60b0f8b91f26610017fff943.mockapi.io/api/v1/todo_data/" +
          item.id
      )
      .then((response) => {
        console.log(response);
      });
  };

  //define table
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Is editing?",
      dataIndex: "isEditing",
      key: "isEditing",
      render: (isEditing) => {
        let color;
        if (isEditing === "false" || isEditing === false) {
          color = "volcano";
        }
        if (isEditing === "true" || isEditing === true) {
          color = "green";
        }
        return (
          <Tag color={color} key={isEditing}>
            {isEditing.toString().toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Is complete?",
      dataIndex: "isCompleted",
      key: "isCompleted",
      render: (isCompleted) => {
        let color;
        if (isCompleted === "false" || isCompleted === false) {
          color = "volcano";
        }
        if (isCompleted === "true" || isCompleted === true) {
          color = "green";
        }
        return (
          <Tag color={color} key={isCompleted}>
            {isCompleted.toString().toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Action",
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

  //define data for table
  const data = todoItems;

  return (
    <div className="TodoNew">
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
        <Col span={6}></Col>
        <Col span={6} className="addButton">
          <Button type="primary" size="large" onClick={onClickAdd}>
            +Add
          </Button>
        </Col>
      </Row>

      <Table columns={columns} dataSource={data} />
      <EditModal
        key={editVisible}
        visible={editVisible}
        todoItem={todoItem}
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

export default TodoNew;
