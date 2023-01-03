import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { chanceExchange } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(chanceExchange());
  }

  render() {
    const { currencies } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="value-input">
            {'Valor da despesa: '}
            <input
              type="number"
              data-testid="value-input"
              id="value-input"
            />
          </label>
          <label htmlFor="currency-input">
            {'Moeda: '}
            <select
              data-testid="currency-input"
              id="currency-input"
            >
              {
                currencies.map((elem, index) => (
                  <option key={ index } value={ index }>{ elem }</option>
                ))
              }
            </select>
          </label>
          <label htmlFor="method-input">
            {'Forma de pagamento: '}
            <select
              data-testid="method-input"
              id="method-input"
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag-input">
            {'Categoria: '}
            <select
              data-testid="tag-input"
              id="tag-input"
            >
              <option value="Dinheiro">Alimentação</option>
              <option value="Cartão de crédito">Lazer</option>
              <option value="Cartão de débito">Trabalho</option>
              <option value="Cartão de débito">Transporte</option>
              <option value="Cartão de débito">Saúde</option>
            </select>
          </label>
          <label htmlFor="description-input">
            {'Descrição da despesa: '}
            <input
              type="text"
              data-testid="description-input"
              id="description-input"
            />
          </label>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(Array).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
