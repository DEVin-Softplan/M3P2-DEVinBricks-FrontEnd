import { FormControlLabel, FormGroup, Switch, TextField } from "@mui/material";
import { FormikProvider, useFormik } from 'formik';
import React from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/Button";
import Header from "../../../components/Header";
import Menus from "../../../components/Menus";
import style from "./UsuariosForm.module.css";
import * as yup from "yup";

const UsuariosForm = () => {
  const formik = useFormik({
    initialValues: {
      nome: "",
      email: "",
      usuario: "",
    },
    validationSchema: yup.object({
      nome: yup.string().required("O campo é obrigatório."),
      email: yup
        .string()
        .email("E-mail inválido.")
        .required("O campo é obrigatório."),
      usuario: yup
        .string()
        .required("O campo é obrigatório."),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const { errors, touched, values, handleSubmit, getFieldProps } =
    formik;

  return (
    <>
      <Menus />
      <FormikProvider value={formik}>
        <form className={style.container} noValidate onSubmit={handleSubmit}>
          <Header title="Novo usuário" />

          <TextField fullWidth label="Nome" {...getFieldProps('nome')}
							error={Boolean(touched.nome && errors.nome)}
							helperText={touched.nome && errors.nome} variant="outlined" />

          <TextField fullWidth label="Email" {...getFieldProps('email')}
							error={Boolean(touched.email && errors.email)}
							helperText={touched.email && errors.email} variant="outlined" />

          <TextField fullWidth label="Usuario" {...getFieldProps('usuario')}
							error={Boolean(touched.usuario && errors.usuario)}
							helperText={touched.usuario && errors.usuario} variant="outlined" />
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
      </FormikProvider>
    </>
  );
};

export default UsuariosForm;
