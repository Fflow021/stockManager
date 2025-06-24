import React from 'react';
import { render, screen } from '@testing-library/react-native';
import HomeScreen from '../HomeScreen';

const mockNavigation = {
  navigate: jest.fn(),
};

describe('HomeScreen', () => {
  it('deve renderizar o cabeçalho e os botões de navegação corretamente', () => {
    render(<HomeScreen navigation={mockNavigation} />);
    const headerTitle = screen.getByText(/Gerenciador de Estoque/i);

    const buttonCadastro = screen.getByText('Cadastro de Itens');
    const buttonEstoque = screen.getByText('Visualizar Estoque');
    const buttonRelatorio = screen.getByText('Gerar Relatório');

    expect(headerTitle).toBeOnTheScreen();
    expect(buttonCadastro).toBeOnTheScreen();
    expect(buttonEstoque).toBeOnTheScreen();
    expect(buttonRelatorio).toBeOnTheScreen();
  });
});