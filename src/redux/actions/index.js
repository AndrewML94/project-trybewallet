export const CHANGE_EMAIL = 'CHANGE_EMAIL';

const changeEmail = (email) => ({
  type: CHANGE_EMAIL,
  payload: email,
});

export default changeEmail;
