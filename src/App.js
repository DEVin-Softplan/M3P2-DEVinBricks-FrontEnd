import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" component={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
