<<<<<<< HEAD
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
=======
import React from "react";
import style from "./Usuarios.module.css";
import Menus from "../../components/Menus";
import UsuariosLista from "./UsuariosLista";

const Usuarios = () => {
  //Make the rendering as deal with the requisition (form or list)

  const handerProductPage = () => {
    return <UsuariosLista />;
  };
  return (
    <main className={style.main}>
      <Menus />
      {handerProductPage()}
>>>>>>> fa8f70a2ab586d6ead60d6a9528b17a3fd42a4c9
    </main>
  );
};

<<<<<<< HEAD
export default Usuarios;
=======
export default Usuarios;
>>>>>>> fa8f70a2ab586d6ead60d6a9528b17a3fd42a4c9
