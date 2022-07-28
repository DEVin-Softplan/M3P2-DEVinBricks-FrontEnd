import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import { VendaEntrega } from './pages/NovaVenda/VendaEntrega';
import VendaProduto from './pages/NovaVenda/VendaProduto/VendaProduto';


const App = () => {
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/venda-produto" element={<VendaProduto />} />
        <Route path="/venda-entrega" element={<VendaEntrega />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
