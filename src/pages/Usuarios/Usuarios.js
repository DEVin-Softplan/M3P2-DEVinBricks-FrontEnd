import React from "react";
import style from "./Usuarios.module.css";
import Menus from "../../components/Menus";
import UsuarioLista from "./UsuarioLista/UsuarioLista";

const Usuarios = () => {

  const handerProductPage = () => {
    return <UsuarioLista />;
  };
  return (
    <main className={style.main}>
      <Menus />
      {handerProductPage()}
    </main>
  );
};

export default Usuarios;
