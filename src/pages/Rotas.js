import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Produtos from './Produtos/Produtos';
import ProdutosForm from './Produtos/ProdutosForm';
import Home from './Home/Home';

const Rotas = () => { 
  return (
    <BrowserRouter>
      <Routes>              
        <Route path="/" exact element ={<Home />} />        
        <Route path="/Login" exact element ={<Login />} />        
        <Route path="/Produtos" exact element ={<Produtos />} />
        <Route path="/EditarProduto/:idProduto" exact element ={<ProdutosForm />} />        
      </Routes> 
    </BrowserRouter>
  );
};

export default Rotas;