import { TextField } from '@mui/material';
import React, { useState } from 'react';
import Button from '../../../components/Button';
import Header from '../../../components/Header/Header';
import styles from './CompradorForm.module.css';
import axios from 'axios'

const config = {
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Origin': '*'
  }
};
const cliente = axios.create({
  baseURL: "https://localhost:7171",
})

const CompradorForm = ({ method = 'POST', id = '', callback = () => { } }) => {

  const [comprador, setcomprador] = useState({
    nome: '',
    email: '',
    telefone: '',
    cpf: '',
    dataNascimento: '',
    usuarioInclusaoId: 1
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setcomprador({
      ...comprador,
      [name]: value
    })
  }

  const sendComprador = async () => {
    const response = await cliente.post(`/api/Comprador`, comprador, config)
    const { data: { message } } = response;
    console.log(message);

  }

  return (
    <>
      <Header title="Novo Comprador" />
      <section className={styles.container}>
        <form className={styles.form}>
          <TextField name="nome" id="outlined-basic" label="Nome" variant="outlined" sx={{ height: "70px", width: "400px" }} onChange={handleChange} />
          <TextField name="email" id="outlined-basic" label="Email" variant="outlined" className={styles.input} sx={{ height: "70px", width: "400px" }} onChange={handleChange} />
          <TextField name="telefone" id="outlined-basic" label="Telefone" variant="outlined" className={styles.input} sx={{ height: "70px", width: "400px" }} onChange={handleChange} />
          <TextField name="cpf" id="outlined-basic" label="CPF" variant="outlined" className={styles.input} sx={{ height: "70px", width: "400px" }} onChange={handleChange} />
          <TextField name="dataNascimento" id="outlined-basic" label="Data de Nascimento" variant="outlined" className={styles.input} sx={{ height: "70px", width: "400px" }} onChange={handleChange} />
        </form>

        <footer className={styles.footer}>
          <Button variant="contained">Voltar</Button>
          <Button variant="contained" onClick={sendComprador} >Cadastrar</Button>
        </footer>
      </section>
    </>
  )
};

export default CompradorForm;
