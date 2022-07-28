import React from 'react';
import { TextField, Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { RiPencilFill } from 'react-icons/ri';
import styles from './ProdutosLista.module.css';

const handleEditProduc = () => {

};

function createData(
  status,
  nomeProduto,
  preco,
  acao,
) {
  return { status, nomeProduto, preco, acao };
}

const rows = [
  createData('ATIVO', 'CIMENTO', "R$ 323,00", <Link to='/EditarProduto'><RiPencilFill size={30}/></Link>),
  createData('ATIVO', 'CIMENTO', "R$ 234,00", <Link to='/EditarProduto'><RiPencilFill size={30}/></Link>),
  createData('ATIVO', 'CIMENTO', "R$ 556,00", <Link to='/EditarProduto'><RiPencilFill size={30}/></Link>),
];

const ProdutosLista = () => {
  return(    
    <main className={styles.main}>      
      <header className={styles.header}>
        <div className={styles.firstDivHeader}>
          <h1>Produtos</h1>
          <Button variant="contained">Novo Produto</Button>
        </div>        
        <TextField label="Nome do produto ..."/>
      </header>

      <TableContainer component={Paper} className={styles.table}>
        <Table sx={{ minWidth: 650 }}  aria-label="caption table">
          <caption></caption>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="right">Nome</TableCell>
              <TableCell align="right">Valor p/ caixa(g)</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">{row.status}</TableCell>
                <TableCell align="right">{row.nomeProduto}</TableCell>
                <TableCell align="right">{row.preco}</TableCell>
                <TableCell align="right">{row.acao}</TableCell>                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </main>
  );
};

export default ProdutosLista;
