import React from 'react';
import UsuarioLista from './UsuarioLista';
import styles from './UsuarioLista.module.css';
import Menus from '../../components/Menus';

const Usuarios = () => {
  const handerProductPage = () => {
    return <UsuarioLista />;
  }

  return (
    <main className={styles.Main}>
      <Menus />      
      {handerProductPage()}
    </main>
  );
};

export default Usuarios;