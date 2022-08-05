import React, { useContext } from 'react';
import { VendaContext } from '../../../contexts/VendaContext';
import styles from './VendaResumo.module.css';
import Menus from '../../../components/Menus';
import Header from '../../../components/Header/Header';
import InfoProdutos from './InfoProdutos/InfoProdutos'

const VendaResumo = () => {
    const { dadosVenda, adicionarProdutos } = useContext(VendaContext);

    return (
        <>
            <Menus />
            <div className={styles.container}>
                <div className={styles.headerContainer}>
                    <Header title="Nova venda: Resumo" />
                    <span>0 itens | R$ 0,00</span>
                </div>
                {/* <div>
                    <p>Comprador: _comprador_</p>
                    <p>CPF: _cpf_</p>
                </div> */}
                <div>
                    <InfoProdutos dadosVenda={dadosVenda}/>
                </div>
            </div>
        </>
    )
}

export default VendaResumo;