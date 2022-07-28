import React, { useState } from 'react';
import styles from './VendaProduto.module.css';
import Header from '../../../components/Header/Header';
import Button from '../../../components/Button';
import Pesquisa from '../../../components/Pesquisa';
import CardProduto from './CardProduto';
import AreaPesquisa from './AreaPesquisa';

// Simula resultado de uma busca qualquer na API
const mockProdutosApi = [
  {
    id: 1,
    nome: 'Cimento',
    valor: 30,
  },
  {
    id: 2,
    nome: 'Tijolo',
    valor: 2,
  },
  {
    id: 3,
    nome: 'Telha',
    valor: 10,
  },
];

const VendaProduto = () => {
  const [productName, setProductName] = useState('');
  const [productList, setProductList] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(productName);
    setProductList(mockProdutosApi);
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <Header title="Nova venda: Produtos" />
        <span>0 itens | R$ 0,00</span>
      </div>

      <Pesquisa
        placeholder="Pesquise um produto"
        onChange={(value) => setProductName(value)}
        onSubmit={handleSubmit}
      />

      {productList.length === 0 ? (
        <AreaPesquisa />
      ) : (
        productList.map((product) => (
          <CardProduto
            key={product.id}
            nome={product.nome}
            valor={product.valor}
          />
        ))
      )}

      <div className={styles.footer}>
        <Button>Próxima etapa</Button>
      </div>
    </div>
  );
};

export default VendaProduto;
