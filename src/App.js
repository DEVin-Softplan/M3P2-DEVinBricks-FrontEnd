import { VendaStorage } from './contexts/VendaContext';
import Rotas from './pages/Rotas';

const App = () => {
  return (
    <VendaStorage>
      <Rotas />
    </VendaStorage>
  );
};

export default App;
