import React from 'react';
import Menus from '../../components/Menus';
import style from './Home.module.css';

const Home = () => {
  return(
    <>
      <Menus />  
      <section className={style.section}>            
        <h1>Bem vindo!</h1>
      </section>      
    </>
  );
};

export default Home;