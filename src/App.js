import { VendaStorage } from './contexts/VendaContext';
import Rotas from './pages/Rotas';
import './index.css';

const App = () => { 
  return (   
    <div className='divlanding'>
      <VendaStorage>                
        <Rotas />
      </VendaStorage>
    </div>     
  );
};

export default App;
