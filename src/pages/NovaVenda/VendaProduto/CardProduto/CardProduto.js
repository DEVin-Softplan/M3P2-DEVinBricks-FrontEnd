import React from 'react';
import styles from './CardProduto.module.css';
import { BsCartCheck } from 'react-icons/bs';

const CardProduto = ({ nome, valor }) => {
  return (
    <main className={styles.container}>
      <section className={styles.infoContainer}>
        <div className={styles.imageContainer}>
          <BsCartCheck className={styles.image} />
        </div>
        <div className={styles.productContainer}>
          <h3>{nome}</h3>
          <span> R$ {valor}</span>
        </div>
      </section>
      <button className={styles.adicionar}>+</button>
    </main>
  );
};

export default CardProduto;
