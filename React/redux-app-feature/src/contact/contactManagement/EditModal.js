import React, { useState } from "react";
import { connect } from "react-redux";
import { Modal, Form, Input } from "antd";
import { editContactRequest } from "../contactActions";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export function EditModal(props) {
  const [isModalVisible, setIsModalVisible] = useState(props.visible);
  const [form] = Form.useForm();

  const handleOk = () => {
    let ho_va_ten = form.getFieldValue("ho_va_ten");
    let sdt = form.getFieldValue("sdt");
    let gender = form.getFieldValue("gender");
    let age = form.getFieldValue("age");

    if(ho_va_ten === undefined) {
      ho_va_ten = props.contactEdit.ho_va_ten;
    }

    if(sdt === undefined) {
      sdt = props.contactEdit.sdt;
    }
    
    if (gender === undefined) {
      gender = props.contactEdit.gender;
    }
    
    if (age === undefined) {
      age = props.contactEdit.age;
    }

    if (ho_va_ten !== "" && sdt !== "" && gender !== "" && age !== "") {
      const contact = {
        id: props.contactEdit.id,
        ho_va_ten: ho_va_ten,
        sdt: sdt,
        gender: gender,
        age: age,
      };
      props.editContactRequest(contact);
      
      let temp = props.getEditUpdate;
      console.log(ho_va_ten);
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
        <Form {...layout} name="nest-messages" form={form}>
          <Form.Item
            label="Họ tên"
            name="ho_va_ten"
            rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
          >
            <Input defaultValue={props.contactEdit.ho_va_ten} />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="sdt"
            rules={[
              {
                required: true,
                pattern: new RegExp("([0-9])+"),
                message: "Wrong format!",
              },
            ]}
          >
            <Input defaultValue={props.contactEdit.sdt} />
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
            <Input defaultValue={props.contactEdit.gender} />
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
            <Input defaultValue={props.contactEdit.age} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    editContactRequest: (contact) => {
      dispatch(editContactRequest(contact));
    },
  };
};

export default connect(null, mapDispatchToProps)(EditModal);
