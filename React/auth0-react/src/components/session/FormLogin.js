import { React } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { login } from "./sessionActions";
import "./FormLogin.css";

function FormLogin(props) {
  const onFinish = (values) => {
    props.login(values);
    return <Redirect to="/" />;
  };

  return (
    <div className="form-login">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <Link to="/register"> register now! </Link>
        </Form.Item>
      </Form>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => {
      dispatch(login(user));
    },
  };
};

export default connect(null, mapDispatchToProps)(FormLogin);
