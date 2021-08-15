const USER_LOGIN = 'USER_LOGIN';

const initialState = {
  name: '',
  phone: '',
  credit: '',
};

const user = (state = initialState, action) => {
  if (action.type == USER_LOGIN)
    return {
      ...state,
      name: action.name,
      phone: action.phone,
      credit: action.credit,
    };
  else return state;
};

export default user;
