import * as types from "../constants/ActionTypes";
import { takeEvery } from "@redux-saga/core/effects";
import { put } from "redux-saga/effects";
import axios from "axios";
import { userData } from "../constants/urlApi";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

function* handleLogin(action) {
  const user = action.user;
  yield axios.get(userData).then((response) => {
    for (const userInt of response.data) {
      if (user.username === userInt.username) {
        bcrypt.compare(user.password, userInt.password).then((valid) => {
          if (valid) {
            const token = userInt.token;
            window.localStorage.setItem("jwtToken", token);
            let temp = jwt.decode(token);
            delete temp["iat"];
          }
        });
      }
    }
  });
  yield put({ type: types.SET_CURRENT_USER, user });
}

function* handleRegister(action) {
  const user = action.user;
  const salt = bcrypt.genSaltSync(10);
  const hassPassword = bcrypt.hashSync(user.password, salt);
  const token = jwt.sign(
    {
      username: user.username,
      password: hassPassword,
    },
    "SECRET_TOKEN"
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
}

export function* sessionSaga() {
  yield takeEvery(types.LOGIN, handleLogin);
  yield takeEvery(types.REGISTER, handleRegister);
}
