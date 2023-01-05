import {
  CHANGE_EMAIL,
  CHANGE_EXCHANGE,
  CHANGE_INFO,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  SAVE_EXPENSE_EDIT } from './actionTypes';
import fetchAPI from '../../services/fetchAPI';

export const changeEmail = (email) => ({
  type: CHANGE_EMAIL,
  payload: email,
});

export const chanceExchange = () => (
  async (dispatch) => {
    try {
      const exchange = await fetchAPI();
      dispatch({
        type: CHANGE_EXCHANGE,
        payload: Object.keys(exchange),
      });
    } catch (error) {
      dispatch();
    }
  }
);

export const changeInfo = ({
  id, value, description, currency, method, tag, exchangeRates }) => ({
  type: CHANGE_INFO,
  payload: {
    id,
    value,
    description,
    currency,
    method,
    tag,
    exchangeRates,
  },
});

export const deleteExpense = (expense) => ({
  type: DELETE_EXPENSE,
  payload: expense,
});

export const editExpense = (id) => ({
  type: EDIT_EXPENSE,
  payload: id,
});

export const saveExpenseEdit = (newExpenses, expenses) => ({
  type: SAVE_EXPENSE_EDIT,
  payload: expenses.map((elem) => (elem.id === newExpenses.id ? newExpenses : elem)),
});
