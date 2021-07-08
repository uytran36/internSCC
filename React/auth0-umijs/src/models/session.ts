import axios from 'axios';
import { userData } from '../pages/constants/urlApi';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface Session {
  login: { username: string; password: string };
  register: { username: string; password: string; confirmPassword: string };
  auth: { token: string | null };
}

const delay = (timeout: any) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

export default {
  namespace: 'session',
  state: {
    register: { username: '', password: '' },
    login: {
      username: '',
      password: '',
    },
    auth: window.localStorage.getItem('jwtToken'),
  },
  reducers: {
    login(state: Session, action: any) {
      return { ...state, login: action.user };
    },
    auth(state: Session, action: any) {
      return { ...state, auth: action.token };
    },
    register(state: Session, action: any) {
      return { ...state, register: action.user };
    },
  },
  effects: {
    *handleLogin(action: any, { call, put }: { call: any; put: any }) {
      const user = action.user;

      yield axios.get(userData).then((response) => {
        for (const userInt of response.data) {
          if (user.username === userInt.username) {
            bcrypt
              .compare(user.password, userInt.password)
              .then((valid: any) => {
                if (valid) {
                  const token = jwt.sign(
                    {
                      username: user.username,
                      password: userInt.password,
                    },
                    'SECRET_TOKEN',
                    { expiresIn: '10000' },
                  );
                  const refreshToken = jwt.sign(
                    {
                      username: user.username,
                      password: userInt.password,
                    },
                    'SECRET_TOKEN',
                    { expiresIn: '100d' },
                  );
                  window.localStorage.setItem('jwtToken', token);
                  window.localStorage.setItem('refreshJwtToken', refreshToken);
                }
              });
            break;
          }
        }
      });

      yield put({
        type: 'login',
        user: user,
      });

      yield call(delay, 500);

      yield put({
        type: 'auth',
        token: window.localStorage.getItem('jwtToken'),
      });

      // const instance = axios.create({
      //   baseURL: 'http://localhost:8000/',
      //   timeout: 300000,
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });

      // instance.setToken = (token: any) => {
      //   instance.defaults.headers['x-access-token'] = token;
      //   window.localStorage.setItem('token', token);
      // };

      // yield instance.interceptors.response.use((response) => {
      //   const { code, auto } = response.data;
      //   if (code === 401) {
      //     if (auto === 'yes') {
      //       return refreshToken().then((rs) => {
      //         console.log('get token refreshToken>>', rs.data);
      //         const { token } = rs.data;
      //         instance.setToken(token);
      //         const config = response.config;
      //         config.headers['x-access-token'] = token;
      //         config.baseURL = 'http://localhost:3000/';
      //         return instance(config);
      //       });
      //     }
      //   }
      //   return response;
      // },
      //   (error) => {
      //     console.warn('Error status', error.response.status);
      //     // return Promise.reject(error)
      //     if (error.response) {
      //       return parseError(error.response.data);
      //     } else {
      //       return Promise.reject(error);
      //     }
      //   };)
    },

    *handleRegister(action: any, { put }: { put: any }) {
      const user = action.user;
      const salt = bcrypt.genSaltSync(10);
      const hassPassword = bcrypt.hashSync(user.password, salt);

      const data = {
        username: user.username,
        password: hassPassword,
      };

      yield axios
        .post(userData, data)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });

      yield put({
        type: 'register',
        user: user,
      });
    },
  },
};
