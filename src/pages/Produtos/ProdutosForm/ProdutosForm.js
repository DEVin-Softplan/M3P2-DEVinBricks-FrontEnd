import React from 'react';
import style from './ProdutosForm.module.css'
import Header from '../../../components/Header/Header';
import Button from '../../../components/Button';
import Menus from '../../../components/Menus';


import { 
  TextField, 
  // Button, 
  TextareaAutosize, 
  Switch } from '@mui/material';
import { Link } from 'react-router-dom';

const ProdutosForm = () => {
  return (
    <>
    <Menus />
    <Header title="Novo Produto"/>
    <section className={style.container}>
      <img 
        src="https://telhanorte.vteximg.com.br/arquivos/ids/330671-NaN-NaN/1444778.jpg?v=636652679501130000" 
        width="140px"     
      />
      <form className={style.form}>
        <TextField id="outlined-basic" label="Url" variant="outlined" sx={{height:"70px", width: "400px"}}/>
        <TextField id="outlined-basic" label="Nome do produto" variant="outlined" className={style.input} sx={{height:"70px", width: "400px"}}/>
        <TextField id="outlined-basic" label="Preço do produto" variant="outlined" className={style.input} sx={{height:"70px", width: "400px"}}/>
        
        <TextareaAutosize        
          variant="outlined"
          aria-label="Descrição"
          minRows={3}
          placeholder="Descrição"
          style={{ width: 400, height: 100 }}
        />

        <div className={style.toogle}>
          <Switch label="Produto ativo?" defaultChecked color="default" /> 
          <h4>Produto ativo?</h4>
        </div>
      </form>

      <footer className={style.footer}>
        <Link to="/Produtos"><Button variant="contained">Voltar</Button></Link>        
        <Button variant="contained">Cadastrar</Button>
      </footer>      
    </section>  
    </>  
  );
};

export default ProdutosForm;
