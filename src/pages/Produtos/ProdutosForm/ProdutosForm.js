import React from 'react';

import { 
  TextField, 
  Button, 
  TextareaAutosize, 
  Switch } from '@mui/material';

const ProdutosForm = () => {
  return (
    <div>
      <h1>Novo produto</h1>
      
      <img 
        src="https://telhanorte.vteximg.com.br/arquivos/ids/330671-NaN-NaN/1444778.jpg?v=636652679501130000" 
        width="350px"
      />


      <TextField id="outlined-basic" label="urldoproduto.com.br" variant="outlined" />
      <TextField id="outlined-basic" label="Nome do produto" variant="outlined" />
      <TextField id="outlined-basic" label="Preço do produto" variant="outlined" />
      
      <TextareaAutosize
        aria-label="minimum height"
        minRows={3}
        placeholder="Minimum 3 rows"
        style={{ width: 200 }}
      />

      <Switch label="Produto ativo?" defaultChecked color="default" /> <h1>Produto ativo?</h1>

      <Button variant="contained">Voltar</Button>
      <Button variant="contained">Cadastrar</Button>
    </div>    
  );
};

export default ProdutosForm;
