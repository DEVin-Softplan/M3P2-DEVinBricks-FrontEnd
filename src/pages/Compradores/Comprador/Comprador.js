import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { RiPencilFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button';
import Header from '../../../components/Header/Header';
import Pesquisa from '../../../components/Pesquisa';
import styles from './Comprador.module.css';
import Menus from '../../../components/Menus';

const Comprador = () => {
  const [comprador, setComprador] = useState([]);
  const [termoBusca, setTermoBusca] = useState("");
  const [listaFiltradaCompradores, setListafiltrada] = useState([])

  useEffect(() => {
    fetch(`https://localhost:7171/api/Comprador?pagina=0&tamanhopagina=10`, {
      method: 'GET',
      headers: new Headers({
        'Authorization': `bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
        
      }),      
    }).then(response => {
      response.json()
        .then(comprador => { 
          setComprador(comprador);
          setListafiltrada(comprador);
        })
    })
  }, [])

  useEffect(() => {
    if (termoBusca) {
      const listaFiltrada = comprador.resultados?.filter((comprador) =>
        comprador.nome.toUpperCase().toUpperCase().includes(termoBusca.toUpperCase()))
        setListafiltrada(listaFiltrada)
    } else {
      setListafiltrada(comprador)
    }
  }, [termoBusca, comprador]);

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
          <input 
            className={styles.busca} 
            placeholder={"  Nome do comprador..."} 
            onChange={(event) => {
              setTermoBusca(event.target.value)
          }}/>
        </header>

        <TableContainer
          component={Paper}
          className={styles.table} sx={{ maxWidth: 800 }}>
          <Table sx={{ minWidth: 240 }} aria-label="caption table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Nome</TableCell>
                <TableCell align="left">Telefone</TableCell>
                <TableCell align="left">CPF </TableCell>
                <TableCell align="left">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listaFiltradaCompradores.resultados?.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">{row.nome}</TableCell>
                  <TableCell align="left">{row.telefone}</TableCell>
                  <TableCell align="left">{row.cpf}</TableCell>
                  <TableCell align="left">
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
