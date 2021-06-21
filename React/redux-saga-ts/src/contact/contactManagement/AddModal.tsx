import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, Form, Input } from "antd";
import { addContact } from "../contactActions";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};


function AddModal(props: any) {
  const [isModalVisible, setIsModalVisible] = useState(props.visible);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleOk = () => {
    const ho_va_ten =  form.getFieldValue('ho_va_ten');
    const sdt = form.getFieldValue('sdt');
    const gender = form.getFieldValue('gender');
    const age = form.getFieldValue('age');
    
    if (ho_va_ten !== "" && sdt !== "" && gender !== "" && age !== "") {
      const contact = {
        id: 0,
        ho_va_ten: ho_va_ten,
        sdt: sdt,
        gender: gender,
        age: age,
      };
      dispatch(addContact(contact));
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
        <Form {...layout} name="nest-messages" form={form}>
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
                pattern: new RegExp("([0-9])+"),
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

// const mapDispatchToProps = (dispatch: Function) => {
//   return {
//     addContact: (contact: Contact) => {
//       dispatch(addContact(contact));
//     },
//   };
// };

// export default connect(null, mapDispatchToProps)(AddModal);
export default AddModal;