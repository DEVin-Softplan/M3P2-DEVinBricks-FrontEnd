import * as React from 'react';
import { Link } from 'react-router-dom';
import style from './Menus.module.css';
import { itemsMenus } from '../../helpers/constantes';

const Menus = (props) => { 
  const options = props.items ? props.items : itemsMenus;
  
  return (     
    <aside className={style.aside}> 
      <ul className={style.ul}> 
        {
          options.map((item, index) => (
            <li key={index} className={style.li}>  
              <Link to={item.Rota} className={style.items}>
                {item.Descricao}
              </Link>
            </li>
          ))
        }
      </ul> 
    </aside>
  );
};

export default Menus;
