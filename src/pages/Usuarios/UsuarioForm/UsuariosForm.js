import { FormControlLabel, FormGroup, Switch, TextField } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/Button";
import Header from "../../../components/Header";
import Menus from "../../../components/Menus";
import style from "./UsuariosForm.module.css";

const UsuariosForm = () => {
  return (
    <>
      <Menus />

      <form className={style.container}>
        <Header title="Novo usuário" />
        <TextField fullWidth label="Nome" variant="outlined" />
        <TextField fullWidth label="Email" variant="outlined" />
        <TextField fullWidth label="Usuario" variant="outlined" />
        <FormGroup>
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="É usuário admin?"
          />
        </FormGroup>

        <div>
          <Link to="/UsuariosLista">
            <Button variant="contained">Voltar</Button>
          </Link>
          <Button variant="contained">Cadastrar</Button>
        </div>
      </form>
    </>
  );
};

export default UsuariosForm;
