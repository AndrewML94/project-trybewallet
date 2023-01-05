import { CHANGE_EXCHANGE, CHANGE_INFO, DELETE_EXPENSE } from '../actions/actionTypes';

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
  case CHANGE_INFO: return {
    ...state,
    expenses: [...state.expenses, action.payload],
  };
  case DELETE_EXPENSE: return {
    ...state,
    expenses: state.expenses.filter((elem) => elem.id !== action.payload.id),
  };
  default: return state;
  }
};

export default wallet;
