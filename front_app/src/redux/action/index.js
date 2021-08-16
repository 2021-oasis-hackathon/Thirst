import axios from 'axios';
const USER_LOGIN = 'USER_LOGIN';
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
