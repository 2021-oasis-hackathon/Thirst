const USER_LOGIN = 'USER_LOGIN';
const USER_LOGOUT = 'USER_LOGOUT';

const initialState = {
  token: null,
};

const user = (state = initialState, action) => {
  if (action.type == USER_LOGIN) {
    console.log(action.token);
    return {
      ...state,
      token: action.token,
    };
  } else if (action.type == USER_LOGOUT)
    return {
      state: initialState,
    };
  else return state;
};

export default user;
