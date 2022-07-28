import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import { VendaEntrega } from './pages/NovaVenda/VendaEntrega';

const App = () => {
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<VendaEntrega />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
