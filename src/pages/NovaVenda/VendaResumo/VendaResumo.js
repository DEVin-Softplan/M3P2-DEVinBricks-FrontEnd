import React, { useContext, useState, useEffect } from 'react';
import { VendaContext } from '../../../contexts/VendaContext';
import styles from './VendaResumo.module.css';
import Menus from '../../../components/Menus';
import Header from '../../../components/Header/Header';
import InfoProdutos from './InfoProdutos/InfoProdutos'

const VendaResumo = () => {
    const { dadosVenda, adicionarProdutos } = useContext(VendaContext);
    const [quantidadeItens, setQuantidadeItens] = useState(0);


    const [valorTotal, setValorTotal] = useState(0);


    const calcularValorProdutos = () => {
        let total = 0;
        dadosVenda.produtos?.forEach((produto) => {
            total += produto.valor * produto.quantidade;
        });
        return total;
    }

    useEffect(() => {
        setValorTotal(calcularValorProdutos())
        if (dadosVenda.produtos?.length > 0) {
            let totalItens = 0
            dadosVenda.produtos?.forEach(each => totalItens += each.quantidade)
            setQuantidadeItens(totalItens);
        }
    }, [dadosVenda])

    return (
        <>
            <Menus />
            <div className={styles.container}>
                <div className={styles.headerContainer}>
                    <Header title="Nova venda: Resumo" />
                    <span>
                        {quantidadeItens} {quantidadeItens < 2 ? 'item' : 'itens'} |{' '}
                        {valorTotal.toLocaleString('pt-br', {
                            style: 'currency',
                            currency: 'BRL',
                        })}
                    </span>
                </div>
                {/* <div>
                    <p>Comprador: _comprador_</p>
                    <p>CPF: _cpf_</p>
                </div> */}
                <div>
                    <InfoProdutos />
                </div>
            </div>
        </>
    )
}

export default VendaResumo;