import React, { useEffect, useState } from 'react';
import styles from './Comprador.module.css'
import CompradorLista from './CompradorLista/CompradorLista';
import axios from 'axios'

const getURLBackend = () => {

    const service = localStorage.getItem('service')
    return service && service !== '' ? service : ''
}

export const cliente = axios.create({
    baseURL: "https://localhost:7171"
})

const Compradores = () => {
    const [comprador, setComprador] = useState([])

    useEffect(() => {
        cliente.get('/CriarComprador')
            .then(res => setComprador(res.data))
            .catch(err => {
                console.log(err)
                setComprador([])
            })
    }, [])

    //Make the rendering as deal with the requisition (form or list)
    return (
        <main className={styles.main}>
            <CompradorLista processes={comprador} />
        </main>
    );
};

export default Compradores;
