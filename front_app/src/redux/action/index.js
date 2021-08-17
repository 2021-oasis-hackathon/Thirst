import axios from 'axios';
const USER_LOGIN = 'USER_LOGIN';
const GET_USER = 'GET_USER';
const USER_LOGOUT = 'USER_LOGOUT';

export const UserLogin = data => {
  return dispatch => {
    dispatch({
      type: USER_LOGIN,
      token: data,
    });
  };
};

export const UserLogout = () => {
  return dispatch => {
    dispatch({
      type: USER_LOGOUT,
    });
  };
};

export const GetUser = data => {
  return dispatch => {
    dispatch({
      type: GET_USER,
      name: data.name,
      phone: data.phone,
      username: data.username,
      credit: data.credit,
    });
  };
};
