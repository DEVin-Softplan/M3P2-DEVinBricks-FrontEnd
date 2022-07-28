import React from 'react';
import styles from './CardProduto.module.css';
import { BsCartCheck } from 'react-icons/bs';

const CardProduto = ({ produto, adicionarProduto }) => {
  return (
    <main className={styles.container}>
      <section className={styles.infoContainer}>
        <div className={styles.imageContainer}>
          <BsCartCheck className={styles.image} />
        </div>
        <div className={styles.productContainer}>
          <h3>{produto.nome}</h3>
          <span> R$ {produto.valor}</span>
        </div>
      </section>
      <div>
        <button
          className={styles.adicionar}
          onClick={() => adicionarProduto(produto)}
        >
          +
        </button>
      </div>
    </main>
  );
};

export default CardProduto;
