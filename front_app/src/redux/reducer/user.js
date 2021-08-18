const USER_LOGIN = 'USER_LOGIN';
const USER_LOGOUT = 'USER_LOGOUT';
const GET_USER = 'GET_USER';

const initialState = {
  token: null,
  username: null,
  name: null,
  phone: null,
  credit: null,
};

const user = (state = initialState, action) => {
  if (action.type == USER_LOGIN) {
    console.log(action.token);
    return {
      ...state,
      token: action.token,
    };
  } else if (action.type == USER_LOGOUT) {
    console.log(initialState);
    return {
      state: {...initialState},
    };
  } else if (action.type == GET_USER)
    return {
      ...state,
      name: action.name,
      phone: action.phone,
      username: action.username,
      credit: action.credit,
    };
  else return state;
};

export default user;
