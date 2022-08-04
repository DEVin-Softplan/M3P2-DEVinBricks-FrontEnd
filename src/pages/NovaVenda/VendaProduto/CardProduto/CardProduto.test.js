import { render, screen } from '@testing-library/react';
import CardProduto from './CardProduto';

const produto = {
  id: 1,
  nome: 'Cimento',
  valor: 30,
  quantidade: 0,
};

describe('CardProduto component', () => {
  it('deve renderizar corretamente', () => {
    const { asFragment } = render(<CardProduto produto={produto} />);
    expect(asFragment(<CardProduto />)).toMatchSnapshot();
  });

  it('deve renderizar nome do produto corretamente', () => {
    render(<CardProduto produto={produto} />);
    const nome = screen.getByText('Cimento');
    expect(nome).toBeInTheDocument();
  });
});
