import React from 'react';
import styles from './PageInfo.module.css';
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";

const PageInfo = (props) =>{
  return(
    <footer className={styles.footer}>
      <button onClick={props.PaginaAnterior} className={styles.buttonInfoPage}><MdArrowBackIos/></button>
      <h5> Página {props.pageInfo.currentPage} de {props.pageInfo.totalPages}</h5>
      <button onClick={props.ProximaPagina} className={styles.buttonInfoPage}><MdArrowForwardIos/></button>
    </footer>
  );
}

export default PageInfo;