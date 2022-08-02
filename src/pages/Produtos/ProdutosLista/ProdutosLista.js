import React, { useEffect, useState, useRef } from 'react';
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
import Header from '../../../components/Header/Header';
import Pesquisa from '../../../components/Pesquisa';
import Button from '../../../components/Button';
import { TextField } from '@mui/material';
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";
import PageInfo from '../../../components/PageInfo';


import { getAllProdutos } from './../../../test/mock/ProdutosMock';

function createData(
  status,
  nomeProduto,
  preco,
  acao,
) {
  return { status, nomeProduto, preco, acao };
}

const rows = [
  createData('ATIVO', 'CIMENTO', "R$ 323,00", <Link to='/EditarProduto/100'><RiPencilFill size={30}/></Link>),
  createData('ATIVO', 'CIMENTO', "R$ 234,00", <Link to='/EditarProduto/200'><RiPencilFill size={30}/></Link>),
  createData('ATIVO', 'CIMENTO', "R$ 556,00", <Link to='/EditarProduto/300'><RiPencilFill size={30}/></Link>),
];


const ProdutosLista = (props) => {

  const listaProdutos = useRef([]);
  const maxQtdPagina = Math.ceil(listaProdutos.current.length / 10);

  const [produtosFiltrado, setProdutosFiltrado] = useState([]);
  const [termoBusca, setTermoBusca] = useState("");
  const [pagina, setPagina] = useState(1);

  useEffect(()=>{(
    async ()=>{
      const list = await getAllProdutos();      
      listaProdutos.current = list;
      setProdutosFiltrado(filtrarListaPorPagina(listaProdutos.current, pagina));               
    })();
  },[]);
  
  const filtrarListaPorTermoBusca = (lista, termo) => {
    return lista.filter((listaProdutos) => {
      return new RegExp(termo, "ig").test(listaProdutos.Nome);
    });
  };

  const filtrarListaPorPagina = (lista, pagina) =>{
    const qtd_Itens = 10;
    return lista.slice((pagina * qtd_Itens) - qtd_Itens, pagina * qtd_Itens);
  }
  
  return(    
    <section className={styles.section}>  
      <header className={styles.header}>
        <div className={styles.firstDivHeader}>          
          <Header title="Produtos"/> 
          <Link to="/NovoProduto">
            <Button>Novo Produto</Button>
          </Link>         
        </div>                
        <Pesquisa placeholder={"Nome do produto..."}/>
      </header>

      <TableContainer 
        component={Paper} 
        className={styles.table} sx={{ maxWidth: 700 }}>
        <Table sx={{ minWidth: 240 }}  aria-label="caption table">
          <caption>
            <PageInfo />
          </caption>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="center">Nome</TableCell>
              <TableCell align="center">Valor p/ caixa(g)</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {produtosFiltrado.map((item, index) => (
              <TableRow key={item.Id}>
                <TableCell component="th" scope="row">{(item.Ativo)? "Ativo" : "Descontinuado"}</TableCell>
                <TableCell align="center">{item.Nome}</TableCell>
                <TableCell align="center">{item.Valor}</TableCell>
                <TableCell align="right"><Link to={`EditarProduto/${item.Id}`}><RiPencilFill size={30}/></Link></TableCell>                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
};

export default ProdutosLista;
