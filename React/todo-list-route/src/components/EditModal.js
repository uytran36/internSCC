import React, { useState } from "react";
import { Modal, Form, Input } from "antd";
import axios from "axios";

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
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setTimeout(() => {
      let temp = props.getEditUpdate;
      temp();
    }, 3000);
    setIsModalVisible(false);
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
          <Form.Item name="title" label="title">
            <Input defaultValue={props.todoItem.title} />
          </Form.Item>
          <Form.Item name="isEditing" label="isEditing">
            <Input defaultValue={props.todoItem.isEditing} />
          </Form.Item>
          <Form.Item name="isCompleted" label="isCompleted">
            <Input defaultValue={props.todoItem.isCompleted} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default EditModal;
