import React, { useEffect, useState, useRef, useContext } from 'react';
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
import PageInfo from '../../../components/PageInfo';
import { useAuth } from "../../../contexts/Auth/useAuth";

import { getAllProducts } from './../../../services/ProdutosService';
import { formatarMoeda } from './../../../utils/FormatarMoeda';

const ProdutosLista = () => {
  const { token } = useAuth();

  const listaProdutos = useRef([]);
  const maxQtdPagina = Math.ceil(listaProdutos.current.length / 10);

  const [produtosFiltrado, setProdutosFiltrado] = useState([]);
  const [termoBusca, setTermoBusca] = useState("");
  const [pagina, setPagina] = useState(1);

  useEffect(() =>{(
    async () =>{
      const list = await getAllProducts(token);      
      listaProdutos.current = list;
      setProdutosFiltrado(filtrarListaPorPagina(listaProdutos.current, pagina));      
    })();
  },[]);
  
  const filtrarListaPorTermoBusca = (lista, termo) => {
    return lista.filter((listaProdutos) => {
      return new RegExp(termo, "ig").test(listaProdutos.nome);
    });
  };
  
  const filtrarListaPorPagina = (lista, pagina) =>{
    const qtd_Itens = 10;
    return lista.slice((pagina * qtd_Itens) - qtd_Itens, pagina * qtd_Itens);
  };

  useEffect(()=>{
    setProdutosFiltrado(filtrarListaPorTermoBusca(listaProdutos.current, termoBusca));    
  }, [termoBusca]);

  useEffect(()=>{
    setProdutosFiltrado(filtrarListaPorPagina(listaProdutos.current, pagina));
  },[pagina]);
  
  const handlePreviousPage = () =>{
    setPagina((currentPage)=> (currentPage > 1 ? currentPage -1 :1));
  };

  const handleNextPage = () =>{
    setPagina((currentPage)=> (currentPage >= maxQtdPagina ? maxQtdPagina : currentPage + 1));
  };

  const pageInfo =  {
    currentPage: pagina,
    totalPages: maxQtdPagina
  };


  return(    
    <section className={styles.section}>  
      <header className={styles.header}>
        <div className={styles.firstDivHeader}>          
          <Header title="Produtos"/> 
          <Link to="/NovoProduto">
            <Button>Novo Produto</Button>
          </Link>         
        </div>                
        <Pesquisa 
          placeholder={"Nome do produto..."}
          onChange={(event)=>{
            setTermoBusca(event);
          }}
        />
      </header>

      <TableContainer 
        component={Paper} 
        className={styles.table} sx={{ maxWidth: 700 }}>
        <Table sx={{ minWidth: 240 }}  aria-label="caption table">
          <caption>
            <PageInfo
              pageInfo={pageInfo}
              PaginaAnterior={handlePreviousPage}
              ProximaPagina={handleNextPage}              
            />
          </caption>
          <TableHead>
            <TableRow>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Nome</TableCell>
              <TableCell align="center">Valor p/ caixa(g)</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {produtosFiltrado.map((item) => (
              <TableRow  key={item.id}>
                <TableCell align="center" component="th" scope="row">
                  {(item.ativo)? "Ativo" : "Descontinuado"}
                </TableCell>
                <TableCell align="center">{item.nome}</TableCell>
                <TableCell align="center">{formatarMoeda(item.valor)}</TableCell>
                <TableCell align="center">
                  <Link to={`EditarProduto/idProduto=${item.id}`}>
                    <RiPencilFill size={30}/>
                  </Link>
                </TableCell>                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
};

export default ProdutosLista;
