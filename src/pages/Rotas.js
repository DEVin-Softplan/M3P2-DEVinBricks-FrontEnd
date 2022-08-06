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
import CompradorForm from "./Compradores/CompradorForm";
import FreteForm from "./Frete/FreteForm/FreteForm";
import Frete from "./Frete/FreteLista/Frete";
import EditaFreteForm from "./Frete/EditaFreteForm/EditaFreteForm";
import { UsuariosEditar } from "./Usuarios/UsuariosEditar/UsuariosEditar";

const Rotas = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" exact element={<Home />} />
				<Route path="/Login" exact element={<Login />} />
				<Route path="/Produtos" exact element={<Produtos />} />
				<Route
					path="Produtos/EditarProduto/idProduto=:idProduto"
					exact
					element={<ProdutosForm />}
				/>
				<Route path="/NovoProduto" exact element={<ProdutosForm />} />
				<Route path="/VendaProduto" exact element={<VendaProduto />} />
				<Route path="/VendaResumo" exact element={<VendaResumo />} />
				<Route path="/MinhasEntregas" exact element={<Vendas />} />
				<Route path="/Usuarios" exact element={<Usuarios />} />
				<Route path="/UsuariosForm" exact element={<UsuariosForm />} />
				<Route path="/UsuariosEditar/:id/:nome/:email/:login/:admin/:ativo" exact element={<UsuariosEditar />} />
				<Route path="/NovoUsuario" exact element={<UsuariosForm />} />
				<Route path="/Frete/NovaRegra" exact element={<FreteForm />} />
				<Route path="/Frete" exact element={<Frete />} />
				<Route
					path="/Frete/EditaRegra/:idRegra"
					exact
					element={<EditaFreteForm />}
				/>
				<Route path="/MinhasEntregas" exact element={<Vendas />} />
				<Route path="/Compradores" exact element={<Comprador />} />
				<Route path="/NovoComprador/:title/:labelButton" exact element={<CompradorForm />} />
				<Route path="/NovoComprador/:title/:labelButton/:id" exact element={<CompradorForm />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Rotas;
