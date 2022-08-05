import { render, screen } from '@testing-library/react';
import VendaProduto from './VendaProduto';
import { BrowserRouter as Router } from 'react-router-dom';
import { VendaStorage } from '../../../contexts/VendaContext';

describe('VendaProduto component', () => {
  test('deve renderizar header na tela', () => {
    render(
      <VendaStorage>
        <Router>
          <VendaProduto />
        </Router>
      </VendaStorage>,
    );
    const header = screen.getByText('Nova venda: Produtos');
    expect(header).toBeInTheDocument();
  });
});
