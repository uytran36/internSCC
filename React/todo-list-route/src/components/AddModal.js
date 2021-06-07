import React, { useState } from "react";
import { Modal, Form, Input } from "antd";
import axios from "axios";
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function AddModal(props) {
  const [isModalVisible, setIsModalVisible] = useState(props.visible);

  const handleOk = () => {
    const title = document.getElementById("nest-messages_title").value;
    const isEditing = document.getElementById("nest-messages_isEditing").value;
    const isCompleted = document.getElementById(
      "nest-messages_isCompleted"
    ).value;
    axios
      .post("https://60b0f8b91f26610017fff943.mockapi.io/api/v1/todo_data", {
        title: title,
        isEditing: isEditing,
        isCompleted: isCompleted,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    setTimeout(() => {
      const temp = props.getEditUpdate;
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
            <Input defaultValue="this is title" />
          </Form.Item>
          <Form.Item name="isEditing" label="isEditing">
            <Input defaultValue="this is isEditing" />
          </Form.Item>
          <Form.Item name="isCompleted" label="isCompleted">
            <Input defaultValue="this is isCompleted" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default AddModal;
