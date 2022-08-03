import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import style from './Menus.module.css';
import { itemsMenus } from '../../helpers/constantes';
import { useAuth } from '../../contexts/Auth/useAuth';

const Menus = (props) => {
	const options = props.items ? props.items : itemsMenus;
	const { setAuth, setUser, setToken } = useAuth();
	const navigate = useNavigate();
	const logOut = () => {
		localStorage.removeItem('token');
		setToken('');
		setUser('');
		setAuth(false);
		navigate('/Login');
	};

	return (
		<aside className={style.aside}>
			<ul className={style.ul}>
				{options.map((item, index) => (
					<li key={index} className={style.li}>
						<Link to={item.Rota} className={style.items}>
							{item.Descricao}
						</Link>
					</li>
				))}
			</ul>
			<ul>
				<li style={{ cursor: 'pointer' }} className={style.items} onClick={() => logOut()}>
					Sair
				</li>
			</ul>
		</aside>
	);
};

export default Menus;
