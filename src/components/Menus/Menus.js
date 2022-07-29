import * as React from 'react';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import styles from './Menus.module.css';
import colors from '@mui/material';

const Menus = (props) => {

  //passar cada item de menu através de um array, pois vai ser feito um map depois
  return (    
      <Stack direction="row" spacing={2} color="blueviolet">
        <Paper>
          <MenuList>
            <MenuItem >Vendas</MenuItem>
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