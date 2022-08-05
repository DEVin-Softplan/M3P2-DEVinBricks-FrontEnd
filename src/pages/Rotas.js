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
import Comprador from "./Compradores/Comprador";
import CompradorForm from "./Compradores/Comprador";
import FreteForm from "./Frete/FreteForm/FreteForm";
import Frete from "./Frete/FreteLista/Frete";

const Rotas = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" exact element={<Home />} />
				<Route path="/Login" exact element={<Login />} />
				<Route path="/Produtos" exact element={<Produtos />} />
				<Route path="Produtos/EditarProduto/:idProduto" exact element={<ProdutosForm />} />
				<Route path="/NovoProduto" exact element={<ProdutosForm />} />
				<Route path="/VendaProduto" exact element={<VendaProduto />} />
				<Route path="/VendaResumo" exact element={<VendaResumo />} />
				<Route path="/MinhasEntregas" exact element={<Vendas />} />
				<Route path="/Usuarios" exact element={<Usuarios />} />
				<Route path="/UsuariosForm" exact element={<UsuariosForm />} />
				<Route path="/NovoUsuario" exact element={<UsuariosForm />} />
				<Route path="/Frete/NovaRegra" exact element={<FreteForm />} />
				<Route path="/Frete" exact element={<Frete />} />
				<Route path="/MinhasEntregas" exact element={<Vendas />} />
				<Route path="/Compradores" exact element={<Comprador />} />
				<Route path="/NovoComprador" exact element={<CompradorForm />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Rotas;
