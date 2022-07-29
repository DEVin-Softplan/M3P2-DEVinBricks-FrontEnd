import Rotas from './pages/Rotas';
import './index.css';
import Menus from './components/Menus';
import './index.css'

const App = () => { 
  return (   
    <div className='divlanding'>
      <Menus />
      <Rotas />    
    </div>     
  );
};

export default App;
