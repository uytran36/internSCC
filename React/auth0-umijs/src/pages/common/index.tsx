import 'antd/dist/antd.css';
import { Spin } from 'antd';
import { Redirect } from 'umi';
import Contact from '../contact';
import jwt from 'jsonwebtoken';
import { useAuth0 } from '@auth0/auth0-react';

function App(props: any) {
  const token: any = window.localStorage.getItem('jwtToken');
  let dec: any;
  if (token !== null) {
    jwt.verify(token, 'SECRET_TOKEN', (err: any, decoded: any) => {
      console.log(err);
      dec = decoded;
      console.log(decoded);
    });
    if (dec === undefined) {
      const refreshToken: any = window.localStorage.getItem('refreshJwtToken');
      jwt.verify(refreshToken, 'SECRET_TOKEN', (err: any, decoded: any) => {
        console.log(err);
        dec = decoded;
      });
      const newToken = jwt.sign(
        {
          username: dec.username,
          password: dec.password,
        },
        'SECRET_TOKEN',
        { expiresIn: '1h' },
      );
      window.localStorage.setItem('jwtToken', newToken);
    }
  }

  const { isAuthenticated, isLoading, getAccessTokenSilently, user } =
    useAuth0();

  if (isLoading) {
    return <Spin></Spin>;
  }

  getAccessTokenSilently().then((token) => {
    window.localStorage.setItem('token', token);
  });

  console.log('is authenticated');
  console.log(isAuthenticated);

  return (
    <div className="App">
      {(token !== null ) || isAuthenticated === true ? (
        <Contact />
      ) : (
        <Redirect to="/login" />
      )}
    </div>
  );
}

export default App;
