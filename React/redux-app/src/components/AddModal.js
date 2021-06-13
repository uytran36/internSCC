import React, { useState } from "react";
import { connect } from "react-redux";
import { Modal, Form, Input } from "antd";
import { addContactRequest } from "../actions/contacts";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function AddModal(props) {
  const [isModalVisible, setIsModalVisible] = useState(props.visible);

  const handleOk = () => {
    const ho_va_ten = document.getElementById("nest-messages_ho_va_ten").value;
    const sdt = document.getElementById("nest-messages_sdt").value;
    const gender = document.getElementById("nest-messages_gender").value;
    const age = document.getElementById("nest-messages_age").value;

    if (ho_va_ten !== "" && sdt !== "" && gender !== "" && age !== "") {
      const contact = {
        ho_va_ten: ho_va_ten,
        sdt: sdt,
        gender: gender,
        age: age,
      };
      props.addContactRequest(contact);
      let temp = props.getAddUpdate;
      temp(contact);
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
            label="Họ tên"
            name="ho_va_ten"
            rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
          >
            <Input defaultValue="" />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="sdt"
            rules={[
              {
                required: true,
                pattern: new RegExp("([0-9]\\s*)+"),
                message: "Wrong format!",
              },
            ]}
          >
            <Input defaultValue="" />
          </Form.Item>
          <Form.Item
            label="Giới tính"
            name="gender"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input defaultValue="" />
          </Form.Item>
          <Form.Item
            label="Tuổi"
            name="age"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input defaultValue="" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    addContactRequest: (contact) => {
      dispatch(addContactRequest(contact));
    },
  };
};

export default connect(null, mapDispatchToProps)(AddModal);
