import { CHANGE_EMAIL, CHANGE_EXCHANGE } from './actionTypes';
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
