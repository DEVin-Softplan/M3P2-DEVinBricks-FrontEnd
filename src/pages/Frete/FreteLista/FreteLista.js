import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styles from './FreteLista.module.css';
import { RiPencilFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

export default function FreteLista({listaFretes}) {
  return (
      <TableContainer 
      component={Paper} 
      className={styles.table}>
      <Table sx={{ minWidth: 250 }}  aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Estado</TableCell>
            <TableCell align="left">Valor do Frete</TableCell>
            <TableCell align="center">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listaFretes.map((row) => (
            <TableRow key={row.id}>
              <TableCell align="left">{row.estado.uf}</TableCell>
              <TableCell align="left">R$ {row.valor}</TableCell>
              <TableCell align="center">
                <Link className={styles.actionIcon} to={`NovaRegra/${row.estado.id}`}>
                      <RiPencilFill size={30}/>
                </Link>
              </TableCell>                
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


