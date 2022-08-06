import React from 'react';
import Menus from '../../components/Menus';
import style from './Home.module.css';
import Login from '../Login';
import { useAuth } from '../../contexts/Auth/useAuth';

const renderFirstPage = (auth, user) => {
	if (auth) {
		return (
			<>
				<Menus />
				<section className={style.section}>
					{user ? <h1>Bem vindo, {user}!</h1> : <h1>Bem vindo!</h1>} 
				</section>
			</>
		);
	} else {
		return <Login />;
	}
};

const Home = () => {
	const { auth } = useAuth();
	const { user } = useAuth();
	return renderFirstPage(auth, user);
};

export default Home;
