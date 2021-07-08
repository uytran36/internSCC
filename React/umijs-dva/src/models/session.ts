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
                  const token = userInt.token;
                  window.localStorage.setItem('jwtToken', token);
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
    },

    *handleRegister(action: any, { put }: { put: any }) {
      const user = action.user;
      const salt = bcrypt.genSaltSync(10);
      const hassPassword = bcrypt.hashSync(user.password, salt);
      const token = jwt.sign(
        {
          username: user.username,
          password: hassPassword,
        },
        'SECRET_TOKEN',
      );
      const data = {
        username: user.username,
        password: hassPassword,
        token: token,
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
