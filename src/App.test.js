import { render } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  it('deve renderizar corretamente', () => {
    const { asFragment } = render(<App />);
    expect(asFragment(<App />)).toMatchSnapshot();
  });
});
