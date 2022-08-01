import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import VendaProduto from "./NovaVenda/VendaProduto/VendaProduto";
import VendaResumo from "./NovaVenda/VendaResumo";
import Produtos from "./Produtos/Produtos";
import ProdutosForm from "./Produtos/ProdutosForm";
import Home from "./Home/Home";
import Vendas from "./Vendas/Vendas";
import Usuarios from "./Usuarios";
import UsuariosForm from "./Usuarios/UsuarioForm/UsuariosForm";

const Rotas = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/Login" exact element={<Login />} />
        <Route path="/Produtos" exact element={<Produtos />} />
        <Route
          path="/EditarProduto/:idProduto"
          exact
          element={<ProdutosForm />}
        />
        <Route path="/NovoProduto" exact element={<ProdutosForm />} />
        <Route path="/VendaProduto" exact element={<VendaProduto />} />
        <Route path="/VendaResumo" exact element={<VendaResumo />} />
        <Route path="/MinhasEntregas" exact element={<Vendas />} />
        <Route path="/Usuarios" exalct element={<Usuarios />} />
        <Route path="/UsuariosForm" exalct element={<UsuariosForm />} />
        <Route path="/NovoUsuario" exalct element={<UsuariosForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Rotas;
