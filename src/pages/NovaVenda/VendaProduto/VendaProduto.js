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

  const { adicionarProdutos } = useContext(VendaContext);

  const [pesquisaProduto, setPesquisaProduto] = useState('');
  const [listaProdutos, setListaProdutos] = useState([]);
  const [produtosPesquisados, setProdutosPesquisados] = useState([]);
  const [carrinho, setCarrinho] = useState([]);
  const [desabilitarBotao, setDesabilitarBotao] = useState(true);
  const [valorTotal, setValorTotal] = useState(0);
  const [quantidadeItens, setQuantidadeItens] = useState(0);

  const notificar = (nome) => toast(`${nome} adicionado ao carrinho`);

  const pesquisarProdutos = (event) => {
    event.preventDefault();

    const produtosFiltrados = listaProdutos.filter((produtos) =>
      produtos.nome.includes(pesquisaProduto),
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
      setCarrinho([...carrinho, { ...produto, quantidade: 1 }]);
    } else {
      const itemIndex = carrinho.findIndex(find => find.id === produto.id)
      carrinho[itemIndex].quantidade++
    }
    notificar(produto.nome);
  };

  const proximaEtapa = () => {
    adicionarProdutos(carrinho);
    navigate('/VendaResumo');
  };

  const calcularValorTotal = () => {
    let total = 0;
    carrinho.forEach((produto) => {
      total += produto.valor;
    });

    return total;
  };

  useEffect(() => {
    carrinho.length > 0
      ? setDesabilitarBotao(false)
      : setDesabilitarBotao(true);

    setQuantidadeItens(carrinho.length);
    setValorTotal(calcularValorTotal());
  }, [carrinho]);

  useEffect(() => {
    (async () => {
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
            {quantidadeItens} itens |{' '}
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
