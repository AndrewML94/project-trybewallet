import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../../App';
import mockData from './mockData';
import { renderWithRouterAndRedux } from './renderWith';

const currencies = ['USD', 'CAD', 'GBP', 'ARS', 'BTC', 'LTC', 'EUR', 'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP', 'DOGE'];

describe('Testa os elementos da página de Login.', () => {
  it('Verifica se a rota do componente está correta;', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    expect(history.location.pathname).toBe('/');
  });

  it('Verifica se há uma imagem com o logo da Trybewallet;', () => {
    renderWithRouterAndRedux(<App />);

    const imageTrybewallet = screen.getByRole('img', { name: /logo referente a trybewallet/i });

    expect(imageTrybewallet).toBeInTheDocument();
  });

  it('Verifica se há um input de Email e se é possível digitar nele;', () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByPlaceholderText('Email');
    const email = 'teste@teste.com';

    userEvent.type(inputEmail, email);

    expect(inputEmail).toBeInTheDocument();
    expect(inputEmail.value).toBe(email);
    expect(inputEmail.type).toEqual('text');
  });

  it('Verifica se há um input de Senha e se é possível digitar nele;', () => {
    renderWithRouterAndRedux(<App />);

    const inputPassword = screen.getByPlaceholderText('Senha');
    const password = '123456';

    userEvent.type(inputPassword, password);

    expect(inputPassword).toBeInTheDocument();
    expect(inputPassword.value).toBe(password);
    expect(inputPassword.type).toEqual('text');
  });

  it('Verifica se há um botão e se possui o texto: "Entrar";', () => {
    renderWithRouterAndRedux(<App />);

    const button = screen.getByRole('button', { name: 'Entrar' });

    expect(button).toBeInTheDocument();
  });

  it('Verifica se ao entar na tela de login o botão está desabilitado;', () => {
    renderWithRouterAndRedux(<App />);

    const button = screen.getByRole('button', { name: 'Entrar' });

    expect(button).toBeDisabled();
  });

  it('Verifica se ao preencher os inputs corretamente, o botão é habilitado, clicado e o estado global é preenchido.', () => {
    const reduxInitialState = {
      user: {
        email: 'teste1@teste.com',
      },
      wallet: {
        currencies: [],
        expenses: [],
        editor: false,
        idToEdit: 0,
      },
    };

    const { store } = renderWithRouterAndRedux(<App />, {
      initialState: reduxInitialState,
    });

    const inputEmail = screen.getByPlaceholderText('Email');
    const inputPassword = screen.getByPlaceholderText('Senha');
    const email = 'teste1@teste.com';
    const password = '123456';
    const button = screen.getByRole('button', { name: 'Entrar' });

    userEvent.type(inputEmail, email);
    userEvent.type(inputPassword, password);

    expect(button).toBeEnabled();

    userEvent.click(button);

    expect(store.getState()).toEqual(reduxInitialState);
  });
});

describe('Testa os elementos do componente Header.', () => {
  it('Verifica se a rota do componente está correta;', () => {
    const { history } = renderWithRouterAndRedux(<App />, {
      initialEntries: ['/carteira'],
    });

    expect(history.location.pathname).toBe('/carteira');
  });

  it('Verifica se há 3 imagens no Header;', () => {
    renderWithRouterAndRedux(<App />, {
      initialEntries: ['/carteira'],
    });

    const imageTrybewallet = screen.getByTestId('trybewallet');
    const imageCoins = screen.getByTestId('coins');
    const imageAvatar = screen.getByTestId('avatar');

    expect(imageTrybewallet).toBeInTheDocument();
    expect(imageCoins).toBeInTheDocument();
    expect(imageAvatar).toBeInTheDocument();
  });

  it('Verifica se há campo de soma de valores;', () => {
    renderWithRouterAndRedux(<App />, {
      initialEntries: ['/carteira'],
    });

    const value = screen.getByTestId('total-field');
    const exchange = screen.getByText(/brl/i);
    const total = screen.getByText(/total de despesas:/i);

    expect(value).toBeInTheDocument();
    expect(value.innerHTML).toEqual('0.00');
    expect(exchange).toBeInTheDocument();
    expect(total).toBeInTheDocument();
  });

  it('Verifica se o email digitado está salvo no estado global e aparece no Header.', () => {
    const reduxInitialState = {
      user: {
        email: 'testee@teste.com',
      },
      wallet: {
        currencies: [],
        expenses: [],
        editor: false,
        idToEdit: 0,
      },
    };

    renderWithRouterAndRedux(<App />, {
      initialEntries: ['/carteira'],
      initialState: reduxInitialState,
    });

    const email = screen.getByText(/testee@teste\.com/i);

    expect(email).toBeInTheDocument();
  });
});

describe('Testa os elementos do componente WalletForm.', () => {
  it('Verifica se há input para preenchimento da despesa;', () => {
    renderWithRouterAndRedux(<App />, {
      initialEntries: ['/carteira'],
    });

    const expenseAmount = screen.getByText(/valor da despesa:/i);
    const inputExpense = screen.getByTestId('value-input');

    expect(expenseAmount).toBeInTheDocument();
    expect(inputExpense).toBeInTheDocument();
    expect(inputExpense.type).toEqual('number');
  });

  it('Verifica se há input para seleção da moeda;', () => {
    renderWithRouterAndRedux(<App />, {
      initialEntries: ['/carteira'],
      initialState: {
        user: {
          email: 'testee@teste.com',
        },
        wallet: {
          currencies,
          expenses: [],
          editor: false,
          idToEdit: 0,
        },
      },
    });

    const currency = screen.getByRole('combobox', { name: /moeda:/i });

    userEvent.selectOptions(currency, 'USD');
    expect(currency.value).toBe('USD');
    userEvent.selectOptions(currency, 'CAD');
    expect(currency.value).toBe('CAD');
    userEvent.selectOptions(currency, 'GBP');
    expect(currency.value).toBe('GBP');
    userEvent.selectOptions(currency, 'ARS');
    expect(currency.value).toBe('ARS');
    userEvent.selectOptions(currency, 'BTC');
    expect(currency.value).toBe('BTC');
    userEvent.selectOptions(currency, 'LTC');
    expect(currency.value).toBe('LTC');
    userEvent.selectOptions(currency, 'EUR');
    expect(currency.value).toBe('EUR');
    userEvent.selectOptions(currency, 'JPY');
    expect(currency.value).toBe('JPY');
    userEvent.selectOptions(currency, 'CHF');
    expect(currency.value).toBe('CHF');
    userEvent.selectOptions(currency, 'AUD');
    expect(currency.value).toBe('AUD');
    userEvent.selectOptions(currency, 'CNY');
    expect(currency.value).toBe('CNY');
    userEvent.selectOptions(currency, 'ILS');
    expect(currency.value).toBe('ILS');
    userEvent.selectOptions(currency, 'ETH');
    expect(currency.value).toBe('ETH');
    userEvent.selectOptions(currency, 'XRP');
    expect(currency.value).toBe('XRP');
    userEvent.selectOptions(currency, 'DOGE');
    expect(currency.value).toBe('DOGE');

    expect(currency).toBeInTheDocument();
  });

  it('Verifica se há input para seleção da forma de pagamento;', () => {
    renderWithRouterAndRedux(<App />, {
      initialEntries: ['/carteira'],
    });

    const payment = screen.getByRole('combobox', { name: /forma de pagamento:/i });

    userEvent.selectOptions(payment, 'Dinheiro');
    expect(payment.value).toBe('Dinheiro');
    userEvent.selectOptions(payment, 'Cartão de crédito');
    expect(payment.value).toBe('Cartão de crédito');
    userEvent.selectOptions(payment, 'Cartão de débito');
    expect(payment.value).toBe('Cartão de débito');

    expect(payment).toBeInTheDocument();
  });

  it('Verifica se há input para seleção da categoria;', () => {
    renderWithRouterAndRedux(<App />, {
      initialEntries: ['/carteira'],
    });

    const category = screen.getByRole('combobox', { name: /categoria:/i });

    userEvent.selectOptions(category, 'Trabalho');
    expect(category.value).toBe('Trabalho');
    userEvent.selectOptions(category, 'Lazer');
    expect(category.value).toBe('Lazer');
    userEvent.selectOptions(category, 'Trabalho');
    expect(category.value).toBe('Trabalho');
    userEvent.selectOptions(category, 'Transporte');
    expect(category.value).toBe('Transporte');
    userEvent.selectOptions(category, 'Saúde');
    expect(category.value).toBe('Saúde');

    expect(category).toBeInTheDocument();
  });

  it('Verifica se há input para descrição da despesa;', () => {
    renderWithRouterAndRedux(<App />, {
      initialEntries: ['/carteira'],
    });

    const category = screen.getByRole('textbox', { name: /descrição da despesa:/i });
    const expense = 'Passeio';

    userEvent.type(category, expense);

    expect(category).toBeInTheDocument();
    expect(category.value).toBe(expense);
    expect(category.type).toEqual('text');
  });

  it('Verifica se há um botão para adicionar a despesa.', () => {
    renderWithRouterAndRedux(<App />, {
      initialEntries: ['/carteira'],
    });

    const submitExpense = screen.getByRole('button', { name: /adicionar despesa/i });

    expect(submitExpense).toBeInTheDocument();
  });
});

describe('Testa os elementos do componente Table.', () => {
  it('Verifica se há um cabeçalho na tabela conforme determinado;', () => {
    renderWithRouterAndRedux(<App />, {
      initialEntries: ['/carteira'],
    });

    const description = screen.getByText('Descrição');
    const tag = screen.getByText(/tag/i);
    const category = screen.getByText(/método de pagamento/i);
    const value = screen.getByText('Valor');
    const exchange = screen.getAllByText(/moeda/i);
    const exchangeUsed = screen.getByText(/câmbio utilizado/i);
    const convertedValue = screen.getByText(/valor convertido/i);
    const conversionCurrency = screen.getByText(/moeda de conversão/i);
    const editAndDelete = screen.getByText('Editar/Excluir');

    expect(description).toBeInTheDocument();
    expect(tag).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(value).toBeInTheDocument();
    expect(exchange[1]).toBeInTheDocument();
    expect(exchangeUsed).toBeInTheDocument();
    expect(convertedValue).toBeInTheDocument();
    expect(conversionCurrency).toBeInTheDocument();
    expect(editAndDelete).toBeInTheDocument();
  });

  it('Verifica se a tabela é populada da maneira correta;', () => {
    renderWithRouterAndRedux(<App />, {
      initialEntries: ['/carteira'],
      initialState: {
        user: {
          email: 'teste@trybe.com',
        },
        wallet: {
          currencies,
          expenses: [],
          editor: false,
          idToEdit: 0,
        },
      },
    });

    const value = screen.getByRole('spinbutton', { name: /valor da despesa:/i });
    const currency = screen.getByRole('combobox', { name: /moeda:/i });
    const category = screen.getByRole('combobox', { name: /forma de pagamento:/i });
    const tag = screen.getByRole('combobox', { name: /categoria:/i });
    const description = screen.getByRole('textbox', { name: /descrição da despesa:/i });
    const submitExpense = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(value, '100');
    userEvent.selectOptions(currency, 'CAD');
    userEvent.selectOptions(category, 'Dinheiro');
    userEvent.selectOptions(tag, 'Lazer');
    userEvent.type(description, 'Teste');

    expect(value.value).toBe('100');
    expect(currency.value).toBe('CAD');
    expect(category.value).toBe('Dinheiro');
    expect(tag.value).toBe('Lazer');
    expect(description.value).toBe('Teste');

    userEvent.click(submitExpense);
  });

  it('Verifica se após o preenchimento da tabela o valor total é atualizado;', () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithRouterAndRedux(<App />, {
      initialEntries: ['/carteira'],
      initialState: {
        user: {
          email: 'teste@trybe.com',
        },
        wallet: {
          currencies,
          expenses: [{
            id: 0,
            value: '100',
            description: 'Cem dólares',
            currency: 'USD',
            method: 'Dinheiro',
            tag: 'Alimentação',
            exchangeRates: mockData,
          }],
          editor: false,
          idToEdit: 0,
        },
      },
    });

    const totalValue = screen.getByTestId('total-field');

    expect(totalValue.innerHTML).toBe('475.31');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('Verifica se ao clicar no botão de Excluir na tabela a despesa é deletada;', () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    const { store } = renderWithRouterAndRedux(<App />, {
      initialEntries: ['/carteira'],
      initialState: {
        user: {
          email: '',
        },
        wallet: {
          currencies,
          expenses: [{
            id: 0,
            value: '20',
            description: '20 dólares',
            currency: 'CAD',
            method: 'Dinheiro',
            tag: 'Transporte',
            exchangeRates: mockData,
          }],
          editor: false,
          idToEdit: 0,
        },
      },
    });

    const newStore = {
      user: {
        email: '',
      },
      wallet: {
        currencies,
        expenses: [],
        editor: false,
        idToEdit: 0,
      },
    };
    const deleteButton = screen.getByTestId('delete-btn');

    expect(deleteButton).toBeInTheDocument();

    userEvent.click(deleteButton);

    expect(store.getState()).toEqual(newStore);
  });

  it('Verifica se ao clicar no botão de Editar na tabela, pode-se editar a despesa;', () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithRouterAndRedux(<App />, {
      initialEntries: ['/carteira'],
      initialState: {
        user: {
          email: '',
        },
        wallet: {
          currencies,
          expenses: [{
            id: 0,
            value: '30',
            description: '30 dólares',
            currency: 'CAD',
            method: 'Dinheiro',
            tag: 'Trabalho',
            exchangeRates: mockData,
          }],
          editor: false,
          idToEdit: 0,
        },
      },
    });

    const editButton = screen.getByTestId('edit-btn');

    userEvent.click(editButton);

    expect(editButton).toBeInTheDocument();

    const value = screen.getByRole('spinbutton', { name: /valor da despesa:/i });
    const currency = screen.getByRole('combobox', { name: /moeda:/i });
    const category = screen.getByRole('combobox', { name: /forma de pagamento:/i });
    const tag = screen.getByRole('combobox', { name: /categoria:/i });
    const description = screen.getByRole('textbox', { name: /descrição da despesa:/i });
    const editExpenseButton = screen.getByRole('button', { name: /editar despesa/i });

    userEvent.type(value, '40');
    userEvent.selectOptions(currency, 'ARS');
    userEvent.selectOptions(category, 'Dinheiro');
    userEvent.selectOptions(tag, 'Saúde');
    userEvent.type(description, 'Aspirina');

    userEvent.click(editExpenseButton);

    expect(value.value).toEqual('40');
    expect(currency.value).toEqual('ARS');
    expect(category.value).toEqual('Dinheiro');
    expect(tag.value).toEqual('Saúde');
    expect(description.value).toEqual('Aspirina');
  });

  it('Verifica se o estado global é atualizado após acréscimo de mais uma despesa.', () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithRouterAndRedux(<App />, {
      initialEntries: ['/carteira'],
      initialState: {
        user: {
          email: '',
        },
        wallet: {
          currencies,
          expenses: [{
            id: 0,
            value: '80',
            description: '80 dólares',
            currency: 'CAD',
            method: 'Dinheiro',
            tag: 'Trabalho',
            exchangeRates: mockData,
          }],
          editor: false,
          idToEdit: 0,
        },
      },
    });

    const value = screen.getByRole('spinbutton', { name: /valor da despesa:/i });
    const currency = screen.getByRole('combobox', { name: /moeda:/i });
    const category = screen.getByRole('combobox', { name: /forma de pagamento:/i });
    const tag = screen.getByRole('combobox', { name: /categoria:/i });
    const description = screen.getByRole('textbox', { name: /descrição da despesa:/i });
    const editExpenseButton = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(value, '40');
    userEvent.selectOptions(currency, 'ARS');
    userEvent.selectOptions(category, 'Dinheiro');
    userEvent.selectOptions(tag, 'Saúde');
    userEvent.type(description, 'Aspirina');

    userEvent.click(editExpenseButton);
  });
});
