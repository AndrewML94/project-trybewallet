import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import trybewallet from '../imgs/logo-trybe-wallet.png';
import { changeEmail } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = () => {
    const { email } = this.state;
    const { history, dispatch } = this.props;
    history.push('/carteira');
    dispatch(changeEmail(email));
  };

  render() {
    const { email, password } = this.state;
    const MIN_CHARACTER = 6;
    return (
      <form>
        <img src={ trybewallet } alt="Logo referente a Trybewallet" />
        <input
          data-testid="email-input"
          type="text"
          name="email"
          value={ email }
          placeholder="Email"
          onChange={ this.handleChange }
        />
        <input
          data-testid="password-input"
          type="text"
          name="password"
          value={ password }
          placeholder="Senha"
          onChange={ this.handleChange }
        />
        <button
          type="button"
          disabled={ !(email.includes('@')
            && email.includes('.com')
            && password.length >= MIN_CHARACTER) }
          onClick={ this.handleSubmit }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
