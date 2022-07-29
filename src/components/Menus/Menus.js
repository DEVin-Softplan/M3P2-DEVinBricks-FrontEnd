import * as React from 'react';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import styles from './Menus.module.css';
import colors from '@mui/material';
import Produtos from '../../pages/Produtos/Produtos';
import { Link } from 'react-router-dom';
import './../../index.css';

const Menus = (props) => {

  const handleClickMenu = (props) =>{

  }

  //passar cada item de menu através de um array, pois vai ser feito um map depois
  return (    
      <Stack direction="row" spacing={2}  >
        <Paper sx={{backgroundColor: "#5965E0" }}>
          <MenuList sx={{color: "white"}}>
            <MenuItem>Vendas</MenuItem>
            <MenuItem>Produtos</MenuItem>
            <MenuItem>Usuários</MenuItem>
            <MenuItem>Frete</MenuItem>
            <MenuItem>Compradores</MenuItem>
            <MenuItem>Sair</MenuItem>
          </MenuList>
        </Paper>
        <div>
        </div>
      </Stack>
  );
};

export default Menus;