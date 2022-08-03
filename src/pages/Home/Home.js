import React from 'react';
import Menus from '../../components/Menus';
import style from './Home.module.css';
import Login from '../Login';
import { useAuth } from '../../contexts/Auth/useAuth';

// galera que for fazer a tela de login, validar por essa variavel de controle!
const autorizado = true;

const renderFirstPage = (auth) => {
	if (auth) {
		return (
			<>
				<Menus />
				<section className={style.section}>
					<h1>Bem vindo ao DevInBricks!</h1>
				</section>
			</>
		);
	} else {
		return <Login />;
	}
};

const Home = () => {
	const { auth } = useAuth();
	return renderFirstPage(auth);
};

export default Home;
