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

export default AddModal;
