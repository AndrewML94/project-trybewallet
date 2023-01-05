import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { chanceExchange, changeInfo } from '../redux/actions';
import fetchAPI from '../services/fetchAPI';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(chanceExchange());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async () => {
    const { id, value, description, currency, method, tag } = this.state;
    const { dispatch } = this.props;
    const exchangeRates = await fetchAPI();
    const information = {
      id, value, description, currency, method, tag, exchangeRates };
    dispatch(changeInfo(information));
    this.setState({
      id: id + 1,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="value-input">
            {'Valor da despesa: '}
            <input
              type="number"
              data-testid="value-input"
              id="value-input"
              name="value"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currency-input">
            {'Moeda: '}
            <select
              data-testid="currency-input"
              id="currency-input"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              {
                currencies.map((elem, index) => (
                  <option key={ index }>{ elem }</option>
                ))
              }
            </select>
          </label>
          <label htmlFor="method-input">
            {'Forma de pagamento: '}
            <select
              data-testid="method-input"
              id="method-input"
              name="method"
              value={ method }
              onChange={ this.handleChange }
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
              name="tag"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <label htmlFor="description-input">
            {'Descrição da despesa: '}
            <input
              type="text"
              data-testid="description-input"
              id="description-input"
              name="description"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            onClick={ this.handleSubmit }
          >
            Adicionar Despesa
          </button>
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
