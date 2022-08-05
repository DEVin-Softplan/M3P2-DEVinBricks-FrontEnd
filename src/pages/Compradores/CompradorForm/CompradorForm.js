import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../../components/Button';
import Header from '../../../components/Header/Header';
import styles from './CompradorForm.module.css';
import { cliente } from '../../../services/BaseService';
import Menus from '../../../components/Menus';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const CompradorForm = () => {
  const params = useParams();

  const [comprador, setcomprador] = useState({
    id: '',
    nome: '',
    email: '',
    telefone: '',
    cpf: '',
    dataNascimento: '',
    usuarioInclusaoId: 1
  })

  useEffect(() => {
    cliente.get(`/api/Comprador/${params.id}`)
      .then(res => {
        setcomprador(res.data)
      })
      .catch(err => {
        console.log(err)
        setcomprador([])
      })
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setcomprador({
      ...comprador,
      [name]: value
    })
  }

  const sendComprador = async () => {
    let response;
    if (params.id) {
      response = await cliente.patch(`/api/Comprador/${params.id}`, comprador)
    } else {
      response = await cliente.post(`/api/Comprador`, comprador)
    }
    const { data: { message } } = response;
    console.log(message);

  }

  return (
    <>
      <Menus />
      <Header title={params.title} />
      <section className={styles.container}>
        <form className={styles.form}>
          <TextField value={comprador.nome} name="nome" id="outlined-basic" label="Nome" variant="outlined" sx={{ height: "70px", width: "400px" }} onChange={handleChange} />
          <TextField value={comprador.email} name="email" id="outlined-basic" label="Email" variant="outlined" className={styles.input} sx={{ height: "70px", width: "400px" }} onChange={handleChange} />
          <TextField value={comprador.telefone} name="telefone" id="outlined-basic" label="Telefone" variant="outlined" className={styles.input} sx={{ height: "70px", width: "400px" }} onChange={handleChange} />
          <TextField value={comprador.cpf} name="cpf" id="outlined-basic" label="CPF" variant="outlined" className={styles.input} sx={{ height: "70px", width: "400px" }} onChange={handleChange} />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Data de Nascimento"
              value={comprador.dataNascimento}
              inputFormat="dd.MM.yyyy"
              onChange={(newValue) => {
                setcomprador({ ...comprador, dataNascimento: newValue })
              }}
              renderInput={(params) => <TextField  {...params} />}
            />
          </LocalizationProvider>
        </form>
        <footer className={styles.footer}>
          <Button variant="contained">Voltar</Button>
          <Button variant="contained" onClick={sendComprador} >{params.labelButton}</Button>
        </footer>
      </section>
    </>
  )
};

export default CompradorForm;
