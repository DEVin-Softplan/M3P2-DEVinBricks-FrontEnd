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
  const [comprador, setComprador] = useState([]);
  const [termoBusca, setTermoBusca] = useState('');

  useEffect(() => {
    console.log(1)
    fetch(`https://localhost:7171/api/Comprador?pagina=0&tamanhopagina=10`, {
      method: 'GET',
      headers: new Headers({
        'Authorization': `bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
        
      }),      
    }).then(response => {
      console.log(2)
      response.json()
        .then(comprador => { 
          console.log(3)
          setComprador(comprador);
          console.log(4)
          console.log(setComprador);
        })
    })
  }, [])

  return (
    <main className={styles.main}>
      <Menus />
      <section className={styles.section}>
        <header className={styles.header}>
          <div className={styles.firstDivHeader}>
            <Header title="Compradores" />
            <Link to={`/NovoComprador/Novo Comprador/Criar`}>
              <Button>Novo Comprador</Button>
            </Link>
          </div>
          <Pesquisa placeholder={"Nome do comprador..."} />
        </header>

        <TableContainer
          component={Paper}
          className={styles.table} sx={{ maxWidth: 800 }}>
          <Table sx={{ minWidth: 240 }} aria-label="caption table">
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
                  <TableCell align="right">
                    <Link to={`/NovoComprador/Editar Comprador/Salvar/${row.id}`}>
                      <RiPencilFill size={30} />
                    </Link>                    
                  </TableCell>
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
