import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../../App';
import { renderWithRouterAndRedux } from './renderWith';

describe('Testa os elementos na tela de Login.', () => {
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
  });

  it('Verifica se há um input de Senha e se é possível digitar nele;', () => {
    renderWithRouterAndRedux(<App />);

    const inputPassword = screen.getByPlaceholderText('Senha');
    const password = '123456';

    userEvent.type(inputPassword, password);

    expect(inputPassword).toBeInTheDocument();
    expect(inputPassword.value).toBe(password);
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

  it('Verifica se ao preencher os inputs corretamente, o botão é habilitado e o estado global é preenchido;', () => {
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
