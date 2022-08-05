import React, { useEffect, useState } from 'react';
import styles from './Frete.module.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FreteLista from './FreteLista';
import Header from '../../../components/Header';
import Menus from '../../../components/Menus';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button';
import { useAuth } from "../../../contexts/Auth/useAuth";
import { consultaFrete } from '../../../services/FreteService';

const Frete = () => {
    const [listaFretes, setListaFretes] = useState([]);
    const { token } = useAuth();

    useEffect(()=>{(
        async ()=>{
          const list = await consultaFrete(token,"");      
          setListaFretes(list);          
        })();
      },[]);

    return (
    <>
      <Menus />
        <div className={styles.container}>
          <ToastContainer />
          <div className={styles.headerContainer}>
            <Header title="Regras de Frete" />
            <Link to="NovaRegra">
            <Button>Nova Regra</Button>
          </Link>  
          </div>
          <FreteLista listaFretes={listaFretes}/>
        </div>
    </>
  )
};

export default Frete;