import React, { useState, useContext } from 'react'
import { VendaContext } from '../../../../contexts/VendaContext';
import styles from './InfoProdutos.module.css'
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai'

const InfoProdutos = () => {
    const { dadosVenda, adicionarProdutos } = useContext(VendaContext);
    const [produtos, setProdutos] = useState(dadosVenda.produtos)

    const atualizarListaProdutos = (novoValor) => {
        setProdutos(novoValor);
        adicionarProdutos(novoValor);
    }

    const alterarQuantidade = (item, acrescentar) => {
        const index = produtos.findIndex(produto => produto.id === item.id)
        const handler = [...produtos]
        handler[index].quantidade = acrescentar ? handler[index].quantidade + 1 : handler[index].quantidade - 1
        atualizarListaProdutos(handler)
    }

    const adicionarQuantidade = (item) => {
        alterarQuantidade(item, true)
    }

    const diminuirQuantidade = (item) => {
        alterarQuantidade(item, false)
    }

    return (
        <div className={styles.containerProdutos}>
            <table className={styles.tabelaProdutos}>
                <thead className={styles.tabelaHeader}>
                    <tr className={styles.tabelaHeader}>
                        <th style={{ width: '20%' }}>#</th>
                        <th style={{ width: '40%' }}>Produto</th>
                        <th style={{ width: '20%' }}>Quantidade</th>
                        <th style={{ width: '20%' }}>SubTotal</th>
                    </tr>
                </thead>
                <tbody>
                    {/* fazer o for no tr provavelmente */}
                    {produtos.map((item) => (
                        <tr key={item.id} className={styles.tabelaItem}>
                            <td className={styles.celulaProduto}><img width="90px" src={item.url} alt="Imagem do produto" /></td>
                            <td className={styles.celulaProduto}>{item.nome}</td>
                            <td className={styles.celulaProduto}>
                                <AiFillMinusCircle className={styles.botaoQuantidade} onClick={() => diminuirQuantidade(item)} />
                                {item.quantidade}
                                <AiFillPlusCircle className={styles.botaoQuantidade} onClick={() => adicionarQuantidade(item)} />
                            </td>
                            <td className={styles.celulaProduto}>{(item.valor * item.quantidade).toLocaleString('pt-br', {
                                style: 'currency',
                                currency: 'BRL',
                            })}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default InfoProdutos;