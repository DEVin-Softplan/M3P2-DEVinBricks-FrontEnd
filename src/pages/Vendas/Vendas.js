import React from 'react';
import VendasLista from './VendasLista/VendasLista';
import styles from './Vendas.module.css';
import Header from '../../components/Header/Header';
import Pesquisa from '../../components/Pesquisa';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Menus from '../../components/Menus';

const Vendas = () => {
  return (
    <>
      <Menus />
        <div className={styles.container}>
          <ToastContainer />
          <div className={styles.headerContainer}>
            <Header title="Minhas Entregas" />
          </div>
          <Pesquisa
            placeholder="Cliente, CPF..."
            onChange={null}
            onSubmit={null}
          />
          <VendasLista/>
        </div>
    </>
  )
};

export default Vendas;
