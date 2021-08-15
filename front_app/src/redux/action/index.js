import axios from 'axios';
const USER_LOGIN = 'USER_LOGIN';

export const UserLogin = data => {
  return dispatch => {
    dispatch({
      type: USER_LOGIN,
      credit: data.credit,
      name: data.name,
      phone: data.phone,
    });
  };
};
