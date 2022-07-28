import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import VendaProduto from './NovaVenda/VendaProduto/VendaProduto';
import VendaResumo from './NovaVenda/VendaResumo';
import Produtos from './Produtos/Produtos';
import ProdutosForm from './Produtos/ProdutosForm';

const Rotas = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Login" exact element={<Login />} />
        <Route path="/Produtos" exact element={<Produtos />} />
        <Route path="/EditarProduto" exact element={<ProdutosForm />} />
        <Route path="/VendaProduto" exact element={<VendaProduto />} />
        <Route path="/VendaResumo" exact element={<VendaResumo />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Rotas;
