import * as types from "../constants/ActionTypes";
import axios from "axios";
import * as jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const registerRequest = (user) => {
  return (dispatch) => {
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

    axios
      .post("https://60b0f8b91f26610017fff943.mockapi.io/api/v1/users", data)
      .then((response) => {
        dispatch(register(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const register = (user) => {
  return {
    type: types.REGISTER,
    user,
  };
};

export const setCurrentUser = (user) => {
  return {
    type: types.SET_CURRENT_USER,
    user,
  };
};

export const loginRequest = (user) => {
  return (dispatch) => {
    axios
      .get("https://60b0f8b91f26610017fff943.mockapi.io/api/v1/users")
      .then((response) => {
        dispatch(login(response.data))
        for (const userInt of response.data) {
          if (user.username === userInt.username) {
            bcrypt.compare(user.password, userInt.password).then((valid) => {
              if (valid) {
                const token = userInt.token;
                window.localStorage.setItem("jwtToken", token);
                let temp = jwt.decode(token);
                delete temp["iat"];
                
                dispatch(setCurrentUser(temp));
              }
            });
          }
        }
      });
  };
};

export const login = (user) => {
  return {
    type: types.LOGIN,
    user
  }
};
