import React, { useState, useEffect } from "react";
import { Modal, Form, Input } from "antd";
import axios from "axios";
import "./TodoNew.css";
import { Table, Tag, Space, Button, Row, Col } from "antd";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function EditModal(props) {
  const [isModalVisible, setIsModalVisible] = useState(props.visible);

  const handleOk = () => {
    const title = document.getElementById("nest-messages_title").value;
    const isEditing = document.getElementById("nest-messages_isEditing").value;
    const isCompleted = document.getElementById(
      "nest-messages_isCompleted"
    ).value;

    if (
      title !== "" &&
      (isEditing === "true" || isEditing === "false") &&
      (isCompleted === "true" || isCompleted === "false")
    ) {
      const item = props.todoItem;
      axios
        .put(
          "https://60b0f8b91f26610017fff943.mockapi.io/api/v1/todo_data/" +
            item.id,
          {
            ...item,
            title: title,
            isEditing: isEditing,
            isCompleted: isCompleted,
          }
        )
        .then((res) => {
          let temp = props.getEditUpdate;
          temp(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

      setIsModalVisible(false);
    }
  };

  const handleCancel = () => {
    let temp = props.setVisibleFalse;
    temp();
    setIsModalVisible(false);
  };

  return (
    <>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form {...layout} name="nest-messages">
          <Form.Item
            name="title"
            label="title"
            rules={[{ required: true, message: "Please input your title!" }]}
          >
            <Input defaultValue={props.todoItem.title} />
          </Form.Item>
          <Form.Item
            name="isEditing"
            label="isEditing"
            rules={[
              {
                required: true,
                pattern: new RegExp("([0-9]\\s*)+"),
                message: "please input phone num",
              },
            ]}
          >
            <Input defaultValue={props.todoItem.isEditing} />
          </Form.Item>
          <Form.Item
            name="isCompleted"
            label="isCompleted"
            rules={[
              {
                required: true,
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (
                    getFieldValue("isEditing") === "true" ||
                    getFieldValue("isEditing") === "false"
                  ) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Please enter true or false!")
                  );
                },
              }),
            ]}
          >
            <Input defaultValue={props.todoItem.isCompleted} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

function AddModal(props) {
  const [isModalVisible, setIsModalVisible] = useState(props.visible);

  const handleOk = () => {
    const title = document.getElementById("nest-messages_title").value;
    const isEditing = document.getElementById("nest-messages_isEditing").value;
    const isCompleted = document.getElementById(
      "nest-messages_isCompleted"
    ).value;

    if (
      title !== "" &&
      (isEditing === "true" || isEditing === "false") &&
      (isCompleted === "true" || isCompleted === "false")
    ) {
      axios
        .post("https://60b0f8b91f26610017fff943.mockapi.io/api/v1/todo_data", {
          title: title,
          isEditing: isEditing,
          isCompleted: isCompleted,
        })
        .then((res) => {
          let temp = props.getAddUpdate;
          temp(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

      setIsModalVisible(false);
    }
  };

  const handleCancel = () => {
    let temp = props.setVisibleFalse;
    temp();
    setIsModalVisible(false);
  };

  return (
    <>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form {...layout} name="nest-messages">
          <Form.Item
            name="title"
            label="title"
            rules={[{ required: true, message: "Please input your title!" }]}
          >
            <Input defaultValue="this is title" />
          </Form.Item>
          <Form.Item
            name="isEditing"
            label="isEditing"
            rules={[
              {
                required: true,
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (
                    getFieldValue("isEditing") === "true" ||
                    getFieldValue("isEditing") === "false"
                  ) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Please enter true or false")
                  );
                },
              }),
            ]}
          >
            <Input defaultValue="this is isEditing" />
          </Form.Item>
          <Form.Item
            name="isCompleted"
            label="isCompleted"
            rules={[
              {
                required: true,
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (
                    getFieldValue("isEditing") === "true" ||
                    getFieldValue("isEditing") === "false"
                  ) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Please enter true or false!")
                  );
                },
              }),
            ]}
          >
            <Input defaultValue="this is isCompleted" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}


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
    if (value !== "") {
      let listSearch = [];
      for (let item of todoItems) {
        if (item.title.includes(value)) {
          listSearch.push(item);
        }
      }
      setTodo(listSearch);
    } else {
      axios
        .get("https://60b0f8b91f26610017fff943.mockapi.io/api/v1/todo_data")
        .then((res) => {
          setTodo(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  //click edit
  const onClickEdit = (item) => {
    setItem(item);
    setEditVisible(true);
  };

  const getEditUpdate = (item) => {
    const index = findIndex(todoItems, item);

    setTodo([
      ...todoItems.slice(0, index),
      {
        id: item.id,
        title: item.title,
        isEditing: item.isEditing,
        isCompleted: item.isCompleted,
      },
      ...todoItems.slice(index + 1),
    ]);
    setEditVisible(false);
  };

  //click add
  const onClickAdd = () => {
    setAddVisible(true);
  };

  const getAddUpdate = (item) => {
    setTodo([
      ...todoItems.slice(0, todoItems.length),
      {
        id: todoItems.length + 1,
        title: item.title,
        isEditing: item.isEditing,
        isCompleted: item.isCompleted,
      },
    ]);
    setAddVisible(false);
  };

  const setVisibleFalse = () => {
    setEditVisible(false);
    setAddVisible(false);
  };

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
      render: (item) => <Link to="/paging">{item}</Link>,
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
