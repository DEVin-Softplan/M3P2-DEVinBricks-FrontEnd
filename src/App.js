import { VendaStorage } from './contexts/VendaContext';
import Rotas from './pages/Rotas';
import './index.css';
import Menus from './components/Menus';
import './index.css'

const App = () => { 
  return (   
    <div className='divlanding'>
      <VendaStorage>
        <Menus />
        <Rotas />
      </VendaStorage>
    </div>     
  );
};

export default App;
