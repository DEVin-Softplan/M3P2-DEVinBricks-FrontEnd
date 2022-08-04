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
import { getAllProducts } from '../../../services/ProdutosService';

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

    const produtosFiltrados = listaProdutos.filter((produtos) =>
      produtos.nome.includes(pesquisaProduto),
    );

    setListaProdutos(produtosFiltrados);
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

  useEffect(() => {
    (async () => {
      const listaProdutosAPI = await getAllProducts();
      console.log(listaProdutosAPI);
      setListaProdutos(listaProdutosAPI);
    })();
  }, []);

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
          value={pesquisaProduto}
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
