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
import { useAuth } from '../../../contexts/Auth/useAuth';
import Swal from 'sweetalert2';

const VendaProduto = () => {
  const navigate = useNavigate();
  const { token } = useAuth();

  const { adicionarProdutos, calcularValorProdutos, calcularQuantidadeItens } = useContext(VendaContext);

  const [pesquisaProduto, setPesquisaProduto] = useState('');
  const [listaProdutos, setListaProdutos] = useState([]);
  const [produtosPesquisados, setProdutosPesquisados] = useState([]);
  const [carrinho, setCarrinho] = useState([]);
  const [desabilitarBotao, setDesabilitarBotao] = useState(true);
  const [valorTotal, setValorTotal] = useState(0);
  const [quantidadeItens, setQuantidadeItens] = useState(0);

  const notificar = (nome) => toast(`${nome} adicionado ao carrinho`);

  const atualizarListaProdutos = (novoValor) => {
    setCarrinho(novoValor);
    adicionarProdutos(novoValor);
}

  const pesquisarProdutos = (event) => {
    event.preventDefault();
    
    const produtosFiltrados = listaProdutos.filter((produtos) =>
      produtos.nome.toUpperCase().includes(pesquisaProduto.toUpperCase()),
    );

    setProdutosPesquisados(produtosFiltrados);

    if (produtosFiltrados.length === 0) {
      Swal.fire(
        'Nenhum produto encontrado!',
        'Realize uma nova busca.',
        'error',
      );
    }
  };

  const adicionarProduto = (produto) => {
    if (carrinho.length === 0 || !carrinho.some(some => some.id === produto.id)) {
      atualizarListaProdutos([...carrinho, { ...produto, quantidade: 1 }]);
    } else {
      const handlerCarrinho = carrinho;
      const itemIndex = handlerCarrinho.findIndex(find => find.id === produto.id);
      handlerCarrinho[itemIndex].quantidade++;
      atualizarListaProdutos([...handlerCarrinho]);
    }
    notificar(produto.nome);
  };

  const proximaEtapa = () => {
    adicionarProdutos(carrinho);
    navigate('/VendaResumo');
  };

  useEffect(() => {
    setQuantidadeItens(calcularQuantidadeItens());
    setDesabilitarBotao(!carrinho || carrinho.length === 0);
    setValorTotal(calcularValorProdutos());
  }, [carrinho]);

  useEffect(() => {
    (async () => {
      atualizarListaProdutos([])
      const listaProdutosAPI = await getAllProducts(token);
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
          <span>
            {quantidadeItens} {quantidadeItens < 2 ? 'item' : 'itens'} |{' '}
            {valorTotal.toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
            })}
          </span>
        </div>

        <Pesquisa
          placeholder="Pesquise um produto"
          onChange={(value) => setPesquisaProduto(value)}
          onSubmit={pesquisarProdutos}
          value={pesquisaProduto}
        />

        {produtosPesquisados.length === 0 ? (
          <AreaPesquisa />
        ) : (
          produtosPesquisados.map((produto) => (
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
