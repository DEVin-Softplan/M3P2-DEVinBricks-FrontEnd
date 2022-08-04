import React from 'react';
import UsuarioLista from './UsuarioLista';
import styles from './UsuarioLista.module.css';
import Menus from '../../components/Menus';

const Usuarios = () => {
  const handerUsuariosPage = () => {
    return <UsuarioLista />;
  }

  return (
    <main className={styles.Main}>
      <Menus />      
      {handerUsuariosPage()}
    </main>
  );
};

export default Usuarios;