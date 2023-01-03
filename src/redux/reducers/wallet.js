import { CHANGE_EXCHANGE } from '../actions/actionTypes';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CHANGE_EXCHANGE: return {
    ...state,
    currencies: action.payload,
  };
  default: return state;
  }
};

export default wallet;
