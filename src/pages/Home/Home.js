import React from 'react';
import Menus from '../../components/Menus';
import style from './Home.module.css';
import Login from '../Login';

// galera que for fazer a tela de login, validar por essa variavel de controle!
const autorizado = true; 

const renderFirstPage = () => {
  if(autorizado){
    return(
      <>
        <Menus />  
        <section className={style.section}>            
          <h1>Bem vindo ao DevInBricks!</h1>
        </section>      
      </>
    );
  }else{
    return <Login />
  }
};

const Home = () => {
  return(
    renderFirstPage()
  );
};

export default Home;