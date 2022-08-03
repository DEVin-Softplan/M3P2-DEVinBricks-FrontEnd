import { VendaStorage } from './contexts/VendaContext';
import { AuthProvider } from './contexts/Auth/AuthProvider';
import Rotas from './pages/Rotas';
import './index.css';

const App = () => {
	return (
		<div className="divlanding">
			<AuthProvider>
				<VendaStorage>
					<Rotas />
				</VendaStorage>
			</AuthProvider>
		</div>
	);
};

export default App;
