import React, { useState, useEffect, useContext } from 'react';
import styles from './VendaProduto.module.css';
import Header from '../../../components/Header/Header';
import Button from '../../../components/Button';
import Pesquisa from '../../../components/Pesquisa';
import Menus from '../../../components/Menus';
import CardProduto from './CardProduto';
import AreaPesquisa from './AreaPesquisa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { VendaContext } from '../../../contexts/VendaContext';

// Simula resultado de uma busca qualquer na API
const mockProdutosApi = [
  {
    id: 1,
    nome: 'Cimento',
    valor: 30,
    quantidade: 0,
  },
  {
    id: 2,
    nome: 'Tijolo',
    valor: 2,
    quantidade: 0,
  },
  {
    id: 3,
    nome: 'Telha',
    valor: 10,
    quantidade: 0,
  },
];

const VendaProduto = () => {
  const navigate = useNavigate();
  const { adicionarProdutos } = useContext(VendaContext);

  const [pesquisaProduto, setPesquisaProduto] = useState('');
  const [listaProdutos, setListaProdutos] = useState([]);
  const [carrinho, setCarrinho] = useState([]);
  const [desabilitarBotao, setDesabilitarBotao] = useState(true);

  const notificar = (nome) => toast(`${nome} adicionado ao carrinho`);

  const pesquisarProdutos = (event) => {
    event.preventDefault();
    setListaProdutos(mockProdutosApi);
  };

  const adicionarProduto = (produto) => {
    setCarrinho([...carrinho, produto]);
    notificar(produto.nome);
  };

  const proximaEtapa = () => {
    adicionarProdutos(carrinho);
    navigate('/VendaResumo');
  };

  useEffect(() => {
    carrinho.length > 0
      ? setDesabilitarBotao(false)
      : setDesabilitarBotao(true);
  }, [carrinho]);

  return (
    <>
      <Menus />

      <div className={styles.container}>
        <ToastContainer />
        <div className={styles.headerContainer}>
          <Header title="Nova venda: Produtos" />
          <span>0 itens | R$ 0,00</span>
        </div>

        <Pesquisa
          placeholder="Pesquise um produto"
          onChange={(value) => setPesquisaProduto(value)}
          onSubmit={pesquisarProdutos}
        />

        {listaProdutos.length === 0 ? (
          <AreaPesquisa />
        ) : (
          listaProdutos.map((produto) => (
            <CardProduto
              key={produto.id}
              produto={produto}
              adicionarProduto={adicionarProduto}
            />
          ))
        )}

        <div className={styles.footer}>
          <Button disabled={desabilitarBotao} onClick={proximaEtapa}>
            Próxima etapa
          </Button>
        </div>
      </div>
    </>
  );
};

export default VendaProduto;
