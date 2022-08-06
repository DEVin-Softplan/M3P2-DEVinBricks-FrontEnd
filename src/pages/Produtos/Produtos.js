import React from 'react';
import ProdutosLista from './ProdutosLista';
import styles from './Produtos.module.css';
import Menus from '../../components/Menus';

const Produtos = () => {
  //Make the rendering as deal with the requisition (form or list)

  const handleProductPage = () => {
    return <ProdutosLista />;
  }

  return (
    <main className={styles.main}>
      <Menus />      
      {handleProductPage()}
    </main>
  );
};

export default Produtos;
