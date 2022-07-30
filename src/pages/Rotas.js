import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import VendaProduto from './NovaVenda/VendaProduto/VendaProduto';
import VendaResumo from './NovaVenda/VendaResumo';
import Produtos from './Produtos/Produtos';
import ProdutosForm from './Produtos/ProdutosForm';
import Home from './Home/Home';
import Compradores from './Compradores'
import CompradorForm from './Compradores/CompradorForm';

const Rotas = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element ={<Home />} />
        <Route path="/Login" exact element={<Login />} />
        <Route path="/Produtos" exact element={<Produtos />} />
        <Route path="/EditarProduto/:idProduto" exact element ={<ProdutosForm />} />
        <Route path="/VendaProduto" exact element={<VendaProduto />} />
        <Route path="/VendaResumo" exact element={<VendaResumo />} />
        <Route path="/Compradores" exact element={<Compradores />} />
        <Route path="/EditarComprador/:idComprador" exact element={<CompradorForm />} />

      </Routes>
    </BrowserRouter>
  );
};

export default Rotas;
