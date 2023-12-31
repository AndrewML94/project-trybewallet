import { CHANGE_EMAIL } from '../actions/actionTypes';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CHANGE_EMAIL: {
    return {
      ...state,
      email: action.payload,
    };
  }
  default: return state;
  }
};

export default user;
