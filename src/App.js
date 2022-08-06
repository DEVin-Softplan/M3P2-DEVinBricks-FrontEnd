import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './contexts/Auth/AuthProvider';
import { VendaStorage } from './contexts/VendaContext';
import './index.css';
import Rotas from './pages/Rotas';

const App = () => {
	return (
		<>
		<ToastContainer />
		<div className="divlanding">
			<AuthProvider>
				<VendaStorage>
					<Rotas />
				</VendaStorage>
			</AuthProvider>
		</div>
		</>
	);
};

export default App;
