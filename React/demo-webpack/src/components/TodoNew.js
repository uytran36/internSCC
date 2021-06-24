import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Tag, Space, Button, Input, Row, Col } from "antd";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";

function TodoNew() {
  const [todoItems, setTodo] = useState([]);

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
  const onClickEdit = (item) => {};


  //click add
  const onClickAdd = () => {};

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
    </div>
  );
}

export default TodoNew;
