import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styles from './VendasLista.module.css';
import Modal from "react-modal";
import { BsFillEyeFill } from "react-icons/bs"
import { FaWindowClose } from "react-icons/fa"
import VendaModal from '../VendaModal/VendaModal';
import { AiFillDelete } from "react-icons/ai"
import PageInfo from '../../../components/PageInfo';
import { formatarMoeda } from '../../../utils/FormatarMoeda';

const venda = [{comprador: {
    nome: "Jose Oliveira",
    cpf: "221.534.787-02",
    email: "jose@gmail.com",
    telefone: "(48) 986487894"
},
dadosEntrega: {
    endereco: "Rua da Creche, Costeira do Pirajubaé, Florianópolis, Santa Catarina, N° 23",
    frete: 20,
    total: 320
},
carrinho: [{
    id: 1,
    img: "https://temdetudomateriais.com.br/wp-content/uploads/2020/12/Sem-titulo-1.png",
    qtd: 1, produto: "cimento",
    subTotal: 100
},
{
    id: 2,
    img: "https://temdetudomateriais.com.br/wp-content/uploads/2020/12/Sem-titulo-1.png",
    qtd: 1, produto: "cimento",
    subTotal: 100
},
{
    id: 3,
    img: "https://temdetudomateriais.com.br/wp-content/uploads/2020/12/Sem-titulo-1.png",
    qtd: 1, produto: "cimento",
    subTotal: 100
}]
}
]

export default function VendasLista() {

    const maxQtdPagina = 3;

    const [modalisopen, setIsOpen] = useState(false);
    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }

    const [pagina, setPagina] = useState(1);
    const handlePreviousPage = () =>{
        setPagina((currentPage)=> (currentPage > 1 ? currentPage -1 : 1));
      };
    
    const handleNextPage = () =>{
    setPagina((currentPage)=> (currentPage >= maxQtdPagina ? maxQtdPagina : currentPage + 1));
    };

    const pageInfo =  {
    currentPage: pagina,
    totalPages: maxQtdPagina
    };

    return (
        <TableContainer 
        component={Paper} 
        className={styles.table}>
        <Table sx={{ minWidth: 250 }}  aria-label="caption table">
        <caption>
            <PageInfo
              pageInfo={pageInfo}
              PaginaAnterior={handlePreviousPage}
              ProximaPagina={handleNextPage}              
            />
          </caption>
          <TableHead>
            <TableRow>
              <TableCell align="left">CPF</TableCell>
              <TableCell align="left">Cliente</TableCell>
              <TableCell align="left">Valor</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {venda.map((row) => (
              <TableRow key={row.id}>
                <TableCell align="left">{row.comprador.cpf}</TableCell>
                <TableCell align="left">{row.comprador.nome}</TableCell>
                <TableCell align="left">{formatarMoeda(row.dadosEntrega.total)}</TableCell>
                <TableCell align="center">
                    <a className={styles.actionIcon}><AiFillDelete size={25} /></a>
                    <a className={styles.actionIcon}><BsFillEyeFill size={25} onClick={openModal}></BsFillEyeFill></a>
                        <Modal
                        isOpen={modalisopen}
                        onRequestClose={closeModal}
                        contentLabel="Exemplo Modal"
                        overlayClassName="modal-overlay"
                        className="modal-content"
                        >
                        <div className="Container">
                            <FaWindowClose className='closeButton' size={28} onClick={closeModal}/>
                            <VendaModal comprador={row.comprador} dadosEntrega={row.dadosEntrega} carrinho={row.carrinho}/>
                        </div>
                        </Modal>
                </TableCell>                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
}

