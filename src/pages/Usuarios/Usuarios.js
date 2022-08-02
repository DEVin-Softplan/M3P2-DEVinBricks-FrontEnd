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
    </main>
  );
};

export default Usuarios;
