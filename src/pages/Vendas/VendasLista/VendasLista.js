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
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md"

const venda = {
    comprador: {
        nome: "Maria Santos Silva",
        cpf: "021.234.767-09",
        email: "manu@gmail.com",
        telefone: "(48) 989766908"
    },
    dadosEntrega: {
        endereco: "Rua João da Silva, Buriti, Pacajás, Ceará, N° 23",
        frete: 30,
        total: 500
    },
    carrinho: [{
        id: 1,
        img: "https://temdetudomateriais.com.br/wp-content/uploads/2020/12/Sem-titulo-1.png",
        qtd: 3, produto: "cimento",
        subTotal: 100
    },
    {
        id: 2,
        img: "https://temdetudomateriais.com.br/wp-content/uploads/2020/12/Sem-titulo-1.png",
        qtd: 3, produto: "cimento",
        subTotal: 100
    },
    {
        id: 3,
        img: "https://temdetudomateriais.com.br/wp-content/uploads/2020/12/Sem-titulo-1.png",
        qtd: 3, produto: "cimento",
        subTotal: 100
    }
    ]
}

const dadosVenda = [
    {
        id: 1,
        cpf: "25986689983",
        cliente: "Joao da silva", 
        valor: 100
    },
    {
        id: 2,
        cpf: "25986689983",
        cliente: "Joao da silva", 
        valor: 100
    },
    {
        id: 3,
        cpf: "25986689983",
        cliente: "Joao da silva", 
        valor: 100
    },
    {
        id: 4,
        cpf: "25986689983",
        cliente: "Joao da silva", 
        valor: 100
    },
    {
        id: 5,
        cpf: "25986689983",
        cliente: "Joao da silva", 
        valor: 100
    },
]

export default function VendasLista() {
    const [modalisopen, setIsOpen] = useState(false);
    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }

    const [page, setPage] = useState(1);
    function nextPage() {
        setPage(page+1);
    }
    function prevPage() {
        if(page !== 1) setPage(page-1);
    }

    return (
        <TableContainer 
        component={Paper} 
        className={styles.table}>
        <Table sx={{ minWidth: 250 }}  aria-label="caption table">
          <caption></caption>
          <TableHead>
            <TableRow>
              <TableCell align="left">CPF</TableCell>
              <TableCell align="left">Cliente</TableCell>
              <TableCell align="left">Valor</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dadosVenda.map((row) => (
              <TableRow key={row.id}>
                <TableCell align="left">{row.cpf}</TableCell>
                <TableCell align="left">{row.cliente}</TableCell>
                <TableCell align="left">R$ {row.valor}</TableCell>
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
                            <VendaModal comprador={venda.comprador} dadosEntrega={venda.dadosEntrega} carrinho={venda.carrinho}/>
                        </div>
                        </Modal>
                </TableCell>                
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <span className={styles.pages}><MdOutlineArrowBackIos onClick={prevPage}/>   <label className={styles.pageNumber}>{page}</label>   <MdOutlineArrowForwardIos onClick={nextPage}/></span>
      </TableContainer>
    );
}

