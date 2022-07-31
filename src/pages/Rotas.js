import { BrowserRouter, Routes, Route } from "react-router-dom";
import FreteForm from "./Frete/FreteForm/FreteForm";
import Home from "./Home/Home";
import Login from "./Login";
import Produtos from "./Produtos/Produtos";
import ProdutosForm from "./Produtos/ProdutosForm";
import VendaProduto from "./NovaVenda/VendaProduto/VendaProduto";
import VendaResumo from "./NovaVenda/VendaResumo";
import Vendas from "./Vendas/Vendas";

const Rotas = () => {
  return (
    <BrowserRouter>    
      <Routes>
        <Route path="/" exact element ={<Home />} /> 
        <Route path="/Login" exact element={<Login />} />
        <Route path="/Produtos" exact element={<Produtos />} />
        <Route path="/Produtos/EditarProduto/:idProduto" exact element ={<ProdutosForm />} />        
        <Route path="/NovoProduto" exact element ={<ProdutosForm />} />        
        <Route path="/VendaProduto" exact element={<VendaProduto />} />
        <Route path="/VendaResumo" exact element={<VendaResumo />} />
        <Route path="/Frete/NovaRegra" exact element={<FreteForm />} />
				<Route path="/MinhasEntregas" exact element={<Vendas />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Rotas;
