import CloseIcon from '@mui/icons-material/Close';
import { FormControlLabel, FormGroup, Switch, TextField } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import { FormikProvider, useFormik } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import Button from "../../../components/Button";
import Header from "../../../components/Header";
import Menus from "../../../components/Menus";
import { setNovoUsuario } from "../../../services/UsuarioService";
import style from "./UsuariosForm.module.css";

const UsuariosForm = () => {
  const formik = useFormik({
    initialValues: {
      nome: "",
      email: "",
      login: "",
      admin:false,
    },
    validationSchema: yup.object({
      nome: yup.string().required("O campo é obrigatório."),
      email: yup
        .string()
        .email("E-mail inválido.")
        .required("O campo é obrigatório."),
      login: yup.string().required("O campo é obrigatório."),
      admin: yup.bool().required("O campo é obrigatório."),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values));
      setNovoUsuario(values);
    },
  });

  const { handleSubmit } = formik;

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
  );


  return (
    <>
      <Menus />
      <FormikProvider value={formik}>
        <form className={style.container} noValidate onSubmit={handleSubmit}>
          <Header title="Novo usuário" />
          <TextField
            fullWidth
            id="nome"
            name="nome"
            label="Nome"
            variant="outlined"
            value={formik.values.nome}
            onChange={formik.handleChange}
            error={formik.touched.nome && Boolean(formik.errors.nome)}
            helperText={formik.touched.nome && formik.errors.nome}
          />
          <TextField
            fullWidth
            id="email"
            name="email"
            label="email"
            variant="outlined"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            id="login"
            name="login"
            label="Login"
            variant="outlined"
            value={formik.values.login}
            onChange={formik.handleChange}
            error={formik.touched.login && Boolean(formik.errors.login)}
            helperText={formik.touched.login && formik.errors.login}
          />
          <FormGroup>
            <FormControlLabel
              id="admin"
              name="admin"
              variant="outlined"
              value={formik.values.admin}
              onChange={formik.handleChange}
              error={formik.touched.admin && Boolean(formik.errors.admin)}
              helperText={formik.touched.admin && formik.errors.admin}
              control={<Switch defaultChecked />}
              label="É usuário admin?"
            />
          </FormGroup>
          <div>
            <Link to="/Usuarios">
              <Button variant="contained">Voltar</Button>
            </Link>
            <Button variant="contained" type="submit" onClick={handleClick}>
              Cadastrar
            </Button>
          </div>
        </form>
      </FormikProvider>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="ALERT"
        action={action}
      />
    </>
  );
};

export default UsuariosForm;
