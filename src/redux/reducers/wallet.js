import {
  CHANGE_EXCHANGE,
  CHANGE_INFO,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  SAVE_EXPENSE_EDIT } from '../actions/actionTypes';

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
  case EDIT_EXPENSE: return {
    ...state,
    idToEdit: action.payload,
    editor: true,
  };
  case SAVE_EXPENSE_EDIT: return {
    ...state,
    editor: false,
    expenses: action.payload,
  };
  default: return state;
  }
};

export default wallet;
