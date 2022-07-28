import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Produtos from './Produtos/Produtos';
import ProdutosForm from './Produtos/ProdutosForm';

const Rotas = () => { 
  return (
    <BrowserRouter>
      <Routes>              
        <Route path="/Login" exact element ={<Login />} />        
        <Route path="/Produtos" exact element ={<Produtos />} />
        <Route path="/EditarProduto" exact element ={<ProdutosForm />} />        
      </Routes> 
    </BrowserRouter>
  );
};

export default Rotas;