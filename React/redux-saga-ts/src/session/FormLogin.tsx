import { useDispatch } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { login } from "./sessionActions";
import "./FormLogin.css";

interface User {
  username: string;
  password: string;
}

function FormLogin(props: any) {
  const dispatch = useDispatch();
  const onFinish = (values: User) => {
    dispatch(login(values));
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

export default FormLogin;