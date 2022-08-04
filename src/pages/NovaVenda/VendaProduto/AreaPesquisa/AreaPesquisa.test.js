import { render, screen } from '@testing-library/react';
import AreaPesquisa from './AreaPesquisa';

describe('AreaPesquisa component', () => {
  test('deve renderizar um paragrafo na tela', () => {
    render(<AreaPesquisa />);
    const paragrafo = screen.getByText(
      'Pesquise por um nome ou código de produto',
    );
    expect(paragrafo).toBeInTheDocument();
  });

  test('deve renderizar um icone na tela', () => {
    render(<AreaPesquisa />);
    const icone = screen.getByTestId('icone');
    expect(icone).toBeInTheDocument();
  });
});
