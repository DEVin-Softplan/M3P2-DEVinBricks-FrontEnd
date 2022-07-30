import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';
import { RiPencilFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button';
import Header from '../../../components/Header/Header';
import Pesquisa from '../../../components/Pesquisa';
import styles from './CompradorLista.module.css';
import { FaCartArrowDown } from 'react-icons/fa'

function createData(
  nome,
  telefone,
  cpf,
  acao,
) {
  return { nome, telefone, cpf, acao };
}

const rows = [
  createData('João', '67891-2345', "000000000-11", <Link to='/EditarComprador/100'><RiPencilFill size={30} /><FaCartArrowDown size={30} /></Link>),
  createData('Maria', '34512-8967', "123456789-12", <Link to='/EditarComprador/200'><RiPencilFill size={30} /><FaCartArrowDown size={30} /></Link>),
  createData('Ana', '12345-6789', "987654321-00", <Link to='/EditarComprador/300'><RiPencilFill size={30} /><FaCartArrowDown size={30} /></Link>),
];

const CompradorLista = () => {
  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <div className={styles.firstDivHeader}>
          <Header title="Compradores" />
          <Link to="/NovoComprador">
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
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">{row.nome}</TableCell>
                <TableCell align="right">{row.telefone}</TableCell>
                <TableCell align="right">{row.cpf}</TableCell>
                <TableCell align="right">{row.acao}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </section>

  )

    ;
};

export default CompradorLista;
