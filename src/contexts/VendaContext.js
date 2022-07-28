import React, { createContext, useState } from 'react';

export const VendaContext = createContext();

export const VendaStorage = ({ children }) => {
  const [dadosVenda, setDadosVenda] = useState({
    comprador: {},
    produtos: [],
    dadosEntrega: {},
  });

  const limparDadosVenda = () => {
    setDadosVenda(null);
  };

  const adicionarProdutos = (produtos) => {
    const venda = { ...dadosVenda };
    venda.produtos = produtos;
    setDadosVenda(venda);
  };

  return (
    <VendaContext.Provider
      value={{ dadosVenda, adicionarProdutos, limparDadosVenda }}
    >
      {children}
    </VendaContext.Provider>
  );
};
