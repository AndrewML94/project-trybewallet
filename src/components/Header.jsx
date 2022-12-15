import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import trybewallet from '../imgs/logo-trybe-wallet.png';
import iconperson from '../imgs/icon-person.png';
import iconcoins from '../imgs/icon-coins.png';

class Header extends Component {
  state = {
    amount: 0,
  };

  render() {
    const { amount } = this.state;
    const { email } = this.props;
    return (
      <div>
        <img src={ trybewallet } alt="Logo referente a Trybewallet" />
        <div>
          <img src={ iconcoins } alt="Icone de moedas" />
          <span data-testid="total-field">{ ` Total de despesas: ${amount} ` }</span>
          <span data-testid="header-currency-field">BRL</span>
        </div>
        <div>
          <img src={ iconperson } alt="Icone de avatar" />
          <span data-testid="email-field">{ email }</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
