import { React } from "react";
import { connect } from "react-redux";
import { Form, Input, Button } from "antd";
import { Link, useHistory } from "react-router-dom";
import "./FormLogin.css";
import { register } from "./sessionActions";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function FormRegister(props) {
  const [form] = Form.useForm();
  const history = useHistory();

  const onFinish = (values) => {
    props.register(values);
    let path = "/";
    history.push(path);
  };

  return (
    <div className="form-register">
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
          name="username"
          label="Username"
          rules={[
            {
              required: true,
              message: "Please input your username",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
          Or <Link to="/"> Login now! </Link>
        </Form.Item>
      </Form>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    register: (user) => {
      dispatch(register(user));
    },
  };
};

export default connect(null, mapDispatchToProps)(FormRegister);
