import React from 'react';
import CompradorLista from './CompradorLista'
import styles from './Comprador.module.css'

const Compradores = () => {
    //Make the rendering as deal with the requisition (form or list)
    return (
        <main className={styles.main}>
            <CompradorLista />
        </main>
    );
};

export default Compradores;
