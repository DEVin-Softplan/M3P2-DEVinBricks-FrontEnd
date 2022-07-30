import * as React from 'react';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import Link from "@mui/material/Link";

// import { Link } from 'react-router-dom';

const Menus = (props) => {

  //passar cada item de menu através de um array, pois vai ser feito um map depois
  return (    
    <Stack direction="row" spacing={2}  >
      <Paper sx={{backgroundColor: "#5965E0" }}>
        <MenuList sx={{color: "white" }}>
          <MenuItem href="/VendaProduto" component={Link}>Vendas</MenuItem>
          <MenuItem href="/Produtos" component={Link}>Produtos</MenuItem>
          <MenuItem>Usuários</MenuItem>
          <MenuItem>Frete</MenuItem>
          <MenuItem>Compradores</MenuItem>
          <MenuItem href="/Login" component={Link}>Sair</MenuItem>
        </MenuList>
      </Paper>
      <div>
      </div>
    </Stack>
  );
};

export default Menus;