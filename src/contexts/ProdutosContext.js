import React, { createContext, useState } from 'react';

export const ProdutosContext = createContext();

export const ProdutoStorage = ({ children }) => {
  const [dadosProduto, setDadosProduto] = useState({
    dadosProduto: {}
  });

  const limparDadosProdutos = () => {
    setDadosProduto(null);
  };

  const editarProduto = (produto) => {
    const Produto = { ...dadosProduto };
    Produto.produto = produto;
    setDadosProduto(Produto);
  };

  return (
    <ProdutosContext.Provider
      value={{ dadosProduto, editarProduto, limparDadosProdutos }}
    >
      {children}
    </ProdutosContext.Provider>
  );
};
