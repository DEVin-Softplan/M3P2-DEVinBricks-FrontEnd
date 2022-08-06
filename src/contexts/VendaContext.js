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

  const calcularValorProdutos = () => {
    let total = 0;
    dadosVenda.produtos?.forEach((produto) => {
      total += produto.valor * produto.quantidade;
    });
    return total;
  }

  const calcularQuantidadeItens = () => {
    let totalItens = 0
    if (dadosVenda.produtos?.length > 0) {
      dadosVenda.produtos?.forEach(each => totalItens += each.quantidade)
    }
    return totalItens
  }

  return (
    <VendaContext.Provider
      value={{ dadosVenda, adicionarProdutos, limparDadosVenda, calcularValorProdutos, calcularQuantidadeItens }}
    >
      {children}
    </VendaContext.Provider>
  );
};
