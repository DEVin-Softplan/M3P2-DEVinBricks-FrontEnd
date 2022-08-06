import React, { useState, useContext } from 'react'
import { VendaContext } from '../../../../contexts/VendaContext';
import styles from './InfoProdutos.module.css'
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai'
import { BiTrashAlt } from 'react-icons/bi'
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';

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
        if (handler[index].quantidade === 1 && !acrescentar) {
            excluirProduto(item);
            return
        }
        handler[index].quantidade = acrescentar ? handler[index].quantidade + 1 : handler[index].quantidade - 1
        atualizarListaProdutos(handler)
    }

    const adicionarQuantidade = (item) => {
        alterarQuantidade(item, true)
    }

    const diminuirQuantidade = (item) => {
        alterarQuantidade(item, false)
    }

    const excluirProduto = (item) => {
        Swal.fire({
            title: 'Deseja mesmo excluir esse produto?',
            text: "O produto será removido do carrinho após a exclusão!",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#5965E0',
            cancelButtonColor: '#E83F5B',
            confirmButtonText: 'Sim, remover!'
          }).then((result) => {
            if (result.isConfirmed) {
                const index = produtos.findIndex(produto => produto.id === item.id)
                const handler = [...produtos]
                handler.splice(index, 1)
                atualizarListaProdutos(handler)
                toast(`${item.nome} foi removido do carrinho!`)
            }
          })
    }

    return (
        <div className={styles.containerProdutos}>
            <ToastContainer />
            <table className={styles.tabelaProdutos}>
                <thead className={styles.tabelaHeader}>
                    <tr className={styles.tabelaHeader}>
                        <th style={{ width: '20%' }}>#</th>
                        <th style={{ width: '30%' }}>Produto</th>
                        <th style={{ width: '20%' }}>Quantidade</th>
                        <th style={{ width: '20%' }}>SubTotal</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {/* fazer o for no tr provavelmente */}
                    {produtos.map((item) => (
                        <tr key={item.id} className={styles.tabelaItem}>
                            <td className={styles.celulaProduto}><img width="90px" src={item.url} alt="Imagem do produto" /></td>
                            <td className={styles.celulaProduto}>{item.nome}</td>
                            <td className={styles.celulaProduto}>
                                <AiOutlineMinusCircle className={styles.botaoQuantidade} onClick={() => diminuirQuantidade(item)} />
                                {item.quantidade}
                                <AiOutlinePlusCircle className={styles.botaoQuantidade} onClick={() => adicionarQuantidade(item)} />
                            </td>
                            <td className={styles.celulaProduto}>{(item.valor * item.quantidade).toLocaleString('pt-br', {
                                style: 'currency',
                                currency: 'BRL',
                            })}</td>
                            <td className={styles.celulaProduto}><BiTrashAlt className={styles.botaoLixeira} onClick={() => excluirProduto(item)} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default InfoProdutos;