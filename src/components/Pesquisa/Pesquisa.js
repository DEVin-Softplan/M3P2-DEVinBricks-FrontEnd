import React from 'react';
import styles from './Pesquisa.module.css';

const Pesquisa = ({ placeholder, onSubmit, onChange }) => {
  return (
    <form onSubmit={onSubmit} className={styles.formulario}>
      <input
        className={styles.campo}
        type="text"
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </form>
  );
};

export default Pesquisa;
