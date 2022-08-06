import React, { useContext, useState, useEffect } from 'react';
import { VendaContext } from '../../../contexts/VendaContext';
import styles from './VendaResumo.module.css';
import Menus from '../../../components/Menus';
import Header from '../../../components/Header/Header';
import InfoProdutos from './InfoProdutos/InfoProdutos'
import { useAuth } from '../../../contexts/Auth/useAuth';
import Button from '../../../components/Button';
import Swal from 'sweetalert2';

const VendaResumo = () => {
    const { dadosVenda, adicionarProdutos } = useContext(VendaContext);
    const [quantidadeItens, setQuantidadeItens] = useState(0);

    const { user } = useAuth();

    const [valorTotal, setValorTotal] = useState(0);


    const calcularValorProdutos = () => {
        let total = 0;
        dadosVenda.produtos?.forEach((produto) => {
            total += produto.valor * produto.quantidade;
        });
        return total;
    }

    const confirmarCarrinho = () => {
        Swal.fire({
            title: 'Deseja confirmar a venda?',
            text: "A venda será efetivada ao confirmar!",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#5965E0',
            cancelButtonColor: '#E83F5B',
            confirmButtonText: 'Efetivar venda!'
          }).then((result) => {
            if (result.isConfirmed) {
                /* implementar lógica para salvar back-end */
                Swal.fire(
                    'Erro!',
                    'Não foi possível efetivar a venda! *não implementado*',
                    'error'
                  )
            }
          })
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
                <div>
                    <p>Comprador: {user}</p>
                </div>
                <div>
                    <InfoProdutos />
                </div>
                <div className={styles.botaoConfirmarPlace}>
                    <Button onClick={() => confirmarCarrinho()}>Confirmar</Button>
                </div>
            </div>
        </>
    )
}

export default VendaResumo;