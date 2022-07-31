import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import VendaProduto from './NovaVenda/VendaProduto/VendaProduto';
import VendaResumo from './NovaVenda/VendaResumo';
import Produtos from './Produtos/Produtos';
import ProdutosForm from './Produtos/ProdutosForm';
import Home from './Home/Home';
import VendaEntrega from './NovaVenda/VendaEntrega';
import Vendas from './Vendas/Vendas';

const Rotas = () => {
  return (
    <BrowserRouter>    
      <Routes>
        <Route path="/" exact element ={<Home />} /> 
        <Route path="/Login" exact element={<Login />} />
        <Route path="/Produtos" exact element={<Produtos />} />
        <Route path="/EditarProduto/:idProduto" exact element ={<ProdutosForm />} />        
        <Route path="/NovoProduto" exact element ={<ProdutosForm />} />        
        <Route path="/VendaProduto" exact element={<VendaProduto />} />
        <Route path="/VendaResumo" exact element={<VendaResumo />} />
        {/* <Route path="/VendaEntrega" exact element={<VendaEntrega />} /> */}
        <Route path="/MinhasEntregas" exact element={<Vendas />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Rotas;
