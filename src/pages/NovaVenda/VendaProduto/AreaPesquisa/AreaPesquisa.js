import React from 'react';
import styles from './AreaPesquisa.module.css';
import { TbListSearch } from 'react-icons/tb';

const AreaPesquisa = () => {
  return (
    <div className={styles.container}>
      <TbListSearch className={styles.icon} />
      <p>Pesquise por um nome ou código de produto</p>
    </div>
  );
};

export default AreaPesquisa;
