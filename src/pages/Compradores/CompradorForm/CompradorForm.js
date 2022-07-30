import { TextField } from '@mui/material';
import React from 'react';
import Button from '../../../components/Button';
import Header from '../../../components/Header/Header';
import styles from './CompradorForm.module.css';

const CompradorForm = () => {
  return (
    <>
      <Header title="Editar Comprador" />
      <section className={styles.container}>
        <form className={styles.form}>
          <TextField id="outlined-basic" label="Nome" variant="outlined" sx={{ height: "70px", width: "400px" }} />
          <TextField id="outlined-basic" label="email" variant="outlined" className={styles.input} sx={{ height: "70px", width: "400px" }} />
          <TextField id="outlined-basic" label="Telefone" variant="outlined" className={styles.input} sx={{ height: "70px", width: "400px" }} />
          <TextField id="outlined-basic" label="CPF" variant="outlined" className={styles.input} sx={{ height: "70px", width: "400px" }} />
          <TextField id="outlined-basic" label="Data de Nascimento" variant="outlined" className={styles.input} sx={{ height: "70px", width: "400px" }} />
        </form>

        <footer className={styles.footer}>
          <Button variant="contained">Voltar</Button>
          <Button variant="contained">Cadastrar</Button>
        </footer>
      </section>
    </>
  )
};

export default CompradorForm;
