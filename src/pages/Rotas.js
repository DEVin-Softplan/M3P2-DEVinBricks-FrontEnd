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
<<<<<<< HEAD
import Usuarios from "./Usuarios/Usuarios";
=======
import FreteForm from "./Frete/FreteForm/FreteForm";
>>>>>>> fa8f70a2ab586d6ead60d6a9528b17a3fd42a4c9

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
<<<<<<< HEAD
        <Route path="/Compradores" exact element={<Comprador />} />
        <Route path="/NovoComprador" exact element={<CompradorForm />} />
        <Route path="/Usuarios" exact element={<Usuarios />} />
      </Routes>
    </BrowserRouter>
  );
=======
				<Route path="/Usuarios" exact element={<Usuarios />} />
				<Route path="/UsuariosForm" exact element={<UsuariosForm />} />
				<Route path="/NovoUsuario" exact element={<UsuariosForm />} />
				<Route path="/Frete/NovaRegra" exact element={<FreteForm />} />
				<Route path="/MinhasEntregas" exact element={<Vendas />} />
				<Route path="/Compradores" exact element={<Comprador />} />
				<Route path="/NovoComprador" exact element={<CompradorForm />} />
			</Routes>
		</BrowserRouter>
	);
>>>>>>> fa8f70a2ab586d6ead60d6a9528b17a3fd42a4c9
};

export default Rotas;
