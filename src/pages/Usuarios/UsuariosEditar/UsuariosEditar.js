import { FormControlLabel, FormGroup, Switch, TextField } from "@mui/material";
import { FormikProvider, useFormik } from "formik";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/Button";
import Header from "../../../components/Header";
import Menus from "../../../components/Menus";
import { setAlteraUsuario } from "../../../services/UsuarioServiceForm";
import style from "./UsuariosEditar.module.css";

export const UsuariosEditar = () => {

  const navigate = useNavigate();
  const { id, nome, email, login, admin, ativo } = useParams();

  const [btnAdmin, setBtnAdmin] = useState(admin === "true" ? true : false);
  const [btnAtivo, setBtnAtivo] = useState(ativo === "true" ? true : false);

  const handleBtnAdminChange = () => {
    setBtnAdmin(!btnAdmin);
  }
  const handleBtnAtivoChange = () => {
    setBtnAtivo(!btnAtivo);
  }

  const formik = useFormik({
    initialValues: {
      id: id,
      nome: nome,
      email: email,
      login: login,
      admin: null,
      ativo: null
    },
    onSubmit: (values) => {
      values.admin = btnAdmin;
      values.ativo = btnAtivo;
      setAlteraUsuario(values);
    },
  });

  const { handleSubmit } = formik;

  return (
    <>
      <Menus />
      <FormikProvider value={formik}>
        <form className={style.container} noValidate onSubmit={handleSubmit}>
          <Header title="Editar usuário" />
          <TextField
            fullWidth
            id="nome"
            name="nome"
            label="Nome"
            variant="outlined"
            value={formik.values.nome}
            onChange={formik.handleChange}
          />
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <TextField
            fullWidth
            id="login"
            name="login"
            label="Login"
            variant="outlined"
            value={formik.values.login}
            onChange={formik.handleChange}
          />
          <FormGroup>
            <FormControlLabel
              id="admin"
              name="admin"
              label="É usuário admin?"
              variant="outlined"
              value={formik.values.admin}
              onChange={formik.handleChange}
              control={<Switch checked={btnAdmin} onChange={handleBtnAdminChange}/>}
            />
          </FormGroup>
          <FormGroup>
            <FormControlLabel
              id="ativo"
              name="ativo"
              label="É usuário ativo?"
              variant="outlined"
              value={formik.values.ativo}
              onChange={formik.handleChange}
              control={<Switch checked={btnAtivo} onChange={handleBtnAtivoChange}/>}
            />
          </FormGroup>
          <div>
            <Button vairant="contained" onClick={() => {navigate(`/Usuarios`)}}>
              Voltar
            </Button>
            <Button variant="contained" type="submit">
              Editar
            </Button>
          </div>
        </form>
      </FormikProvider>
    </>
  );
};