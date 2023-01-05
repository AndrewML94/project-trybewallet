import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  conversionCalculator = (param) => {
    const conversion = +param.value * +param.exchangeRates[param.currency].ask;
    return conversion.toFixed(2);
  };

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>
              Descrição
            </th>
            <th>
              Tag
            </th>
            <th>
              Método de pagamento
            </th>
            <th>
              Valor
            </th>
            <th>
              Moeda
            </th>
            <th>
              Câmbio utilizado
            </th>
            <th>
              Valor convertido
            </th>
            <th>
              Moeda de conversão
            </th>
            <th>
              Editar/Excluir
            </th>
          </tr>
        </thead>
        <tbody>
          {
            expenses.map((elem) => (
              <tr key={ elem.id }>
                <td>
                  {elem.description}
                </td>
                <td>
                  {elem.tag}
                </td>
                <td>
                  {elem.method}
                </td>
                <td>
                  {Number(elem.value).toFixed(2)}
                </td>
                <td>
                  {elem.currency}
                </td>
                <td>
                  { Number(elem.exchangeRates[elem.currency].ask).toFixed(2) }
                </td>
                <td>
                  { this.conversionCalculator(elem) }
                </td>
                <td>
                  { elem.exchangeRates[elem.currency].name }
                </td>
                <button
                  type="button"
                  data-testid="edit-btn"
                >
                  Editar
                </button>
                <button
                  type="button"
                  data-testid="delete-btn"
                >
                  Excluir
                </button>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(Table);
