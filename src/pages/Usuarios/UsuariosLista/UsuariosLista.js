import React from "react";
import { Link } from "react-router-dom";
import Header from "../../../components/Header/Header";
import style from "./UsuarioLista.module.css";
import Button from "./UsuariosLista";

const UsuariosLista = () => {
  return (
    <header className={style.header}>
      <div className={style.firstDivHeader}>
        <Header title="Usuarios" />
        <Link to="/NovoUsuario">
          <Button>Novo Produto</Button>
        </Link>
      </div>
    </header>
  );
};

export default UsuariosLista;
