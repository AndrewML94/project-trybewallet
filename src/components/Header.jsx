import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import trybewallet from '../imgs/logo-trybe-wallet.png';
import iconperson from '../imgs/icon-person.png';
import iconcoins from '../imgs/icon-coins.png';

class Header extends Component {
  conversionToReal = () => {
    const { expenses } = this.props;
    let amount = 0;
    expenses.forEach((elem) => {
      const sum = +elem.exchangeRates[elem.currency].ask * +elem.value;
      amount += sum;
    });
    return amount;
  };

  render() {
    const { email } = this.props;
    return (
      <div>
        <img src={ trybewallet } alt="Logo referente a Trybewallet" />
        <div>
          <img src={ iconcoins } alt="Icone de moedas" />
          <span>Total de despesas: </span>
          <span data-testid="total-field">{ this.conversionToReal().toFixed(2) }</span>
          <span data-testid="header-currency-field"> BRL</span>
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
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.instanceOf(Object).isRequired,
};

export default connect(mapStateToProps)(Header);
