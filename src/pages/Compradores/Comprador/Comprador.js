import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { RiPencilFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button';
import Header from '../../../components/Header/Header';
import Pesquisa from '../../../components/Pesquisa';
import styles from './Comprador.module.css';
import { FaCartArrowDown } from 'react-icons/fa'
import { cliente } from '../../../services/BaseService';
import Menus from '../../../components/Menus';

const Comprador = () => {
  const [comprador, setComprador] = useState([])

  useEffect(() => {
    cliente.get('/api/Comprador?nome=&cpf=')
      .then(res => {
        setComprador(res.data)
      })
      .catch(err => {
        console.log(err)
        setComprador([])
      })
  }, [])

  return (
    <main className={styles.main}>
      <Menus />
      <section className={styles.section}>
        <header className={styles.header}>
          <div className={styles.firstDivHeader}>
            <Header title="Compradores" />
            <Link to={`/NovoComprador`}>
              <Button>Novo Comprador</Button>
            </Link>
          </div>
          <Pesquisa placeholder={"Nome do comprador..."} />
        </header>

        <TableContainer
          component={Paper}
          className={styles.table} sx={{ maxWidth: 800 }}>
          <Table sx={{ minWidth: 250 }} aria-label="caption table">
            <caption></caption>
            <TableHead>
              <TableRow>
                <TableCell align="right">Nome</TableCell>
                <TableCell align="right">Telefone</TableCell>
                <TableCell align="right">CPF </TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {comprador.resultados?.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">{row.nome}</TableCell>
                  <TableCell align="right">{row.telefone}</TableCell>
                  <TableCell align="right">{row.cpf}</TableCell>
                  <TableCell align="right"><RiPencilFill size={30} /><FaCartArrowDown size={30} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </section>
    </main>
  )

    ;
};

export default Comprador;