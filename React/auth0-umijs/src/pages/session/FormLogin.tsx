import { connect, useDispatch } from 'dva';
import { Link, Redirect, history } from 'umi'; //cannot use
// import { Link, Redirect } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './FormLogin.css';
import { useAuth0 } from '@auth0/auth0-react';

interface User {
  username: string;
  password: string;
}

function FormLogin() {
  const { loginWithRedirect} = useAuth0();
  const { logout } = useAuth0();

  const dispatch = useDispatch();

  const onFinish = (values: User) => {
    dispatch({ type: 'session/handleLogin', user: values });
    setTimeout(() => {
      let path = '/';
      history.push(path);
    }, 2000);
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
              message: 'Please input your Username!',
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
              message: 'Please input your Password!',
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
      Or <button onClick={() => loginWithRedirect()}>Login with Auth0</button>
    </div>
  );
}

export default FormLogin;
