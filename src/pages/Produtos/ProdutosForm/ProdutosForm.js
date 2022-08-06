import React, { useState, useEffect, useRef } from 'react';
import style from './ProdutosForm.module.css'
import Header from '../../../components/Header/Header';
import Button from '../../../components/Button';
import Menus from '../../../components/Menus';
import { useAuth } from "../../../contexts/Auth/useAuth";
import { getProductById, createNewProduct } from '../../../services/ProdutosService';

import { formatarMoeda } from '../../../utils/FormatarMoeda';

import { 
  TextField, 
  TextareaAutosize, 
  Switch } from '@mui/material';
import { Link, useParams } from 'react-router-dom';

const ProdutosForm = () => {
  const { token } = useAuth();
  const { idProduto } = useParams();
  const produtoAtual = useRef([]);
  const [ produtoEditavel, setProdutoEditavel ] = useState([]);

  useEffect(() =>{(
    async () =>{
      if(idProduto){
        const list = await getProductById(token, idProduto);   
        produtoAtual.current = list;  
        setProdutoEditavel(produtoAtual.current)
        console.log(produtoEditavel);
      };    
    })();
  },[]);

  const [ValuesProduct, setValuesProduct] = useState({
		produto:{
      nome: "",
      descricao: "",
      urlDaImagem: "",
      ativo: false,
      valor:  ""
    }
	});
 
  const handleChangeFields = (event) => {
		setValuesProduct({
			...ValuesProduct,
			[event.target.name]: {
        nome: event.target.value,
        descricao: event.target.value,
        urlDaImagem: event.target.value,
        ativo: event.target.value,
        valor:  event.target.value,
			},
		});
	};

  const handleSubmitNewProduct = async () =>
  {
    const novoProduto = {
      nome: ValuesProduct.nome,
      descricao: ValuesProduct.descricao,
      urlDaImagem: ValuesProduct.urlDaImagem,
      ativo: true,
      valor: formatarMoeda(ValuesProduct.valor || 0) 
    };

    console.log(JSON.stringify(novoProduto));

    try{
      const response = await createNewProduct(token, novoProduto);      
      if(response.ok){ 
        alert("Produto criado com sucesso!");
      }else
      {
        alert("Erro na criaçãodo produto");
      }
    }catch{
      
    }
  }

  const produto = {
    id: produtoEditavel.id,
    nome: produtoEditavel.nome,
    descricao: produtoEditavel.descricao,
    urlDaImagem: produtoEditavel.urlDaImagem,
    ativo: produtoEditavel.ativo,
    valor: formatarMoeda(produtoEditavel.valor || 0) 
  };

  return (
    <>
    <Menus />
    <Header title="Novo Produto"/>
    <section className={style.container}>    
      <img 
        src={produtoEditavel.urlDaImagem} 
        width="140px"     
      />
      <form className={style.form}>
        <TextField 
          id="outlined-basic" 
          placeholder="Url" 
          variant="outlined" 
          sx={{height:"70px", width: "400px"}}
          value={produto.urlDaImagem}
          name="urlDaImagem"
          onChange={handleChangeFields}
        />

        <TextField 
          id="outlined-basic" 
          placeholder="Nome do produto" 
          variant="outlined" 
          className={style.input} 
          sx={{height:"70px", width: "400px"}}
          value={produto.nome}
          name="nome"
          onChange={handleChangeFields}          
        />

        <TextField 
          id="outlined-basic" 
          placeholder="Preço do produto" 
          variant="outlined" 
          className={style.input} 
          sx={{height:"70px", width: "400px"}}
          value={produto.valor}
          name="valor"
          onChange={handleChangeFields}       
        />
        
        <TextareaAutosize        
          variant="outlined"
          aria-label="Descrição"
          minRows={3}
          placeholder="Descrição"
          style={{ width: 400, height: 100 }}
          value={produto.descricao}
          name="descricao"
          onChange={handleChangeFields}
        />

        <div className={style.toogle}>
          <Switch 
            label="Produto ativo?"             
            color="default"
            checked = { produto? (produto.ativo ? false : true) : false}
            name="ativo"
            onChange={handleChangeFields}               
          /> 
          <h4>Produto ativo?</h4>
        </div>
      </form>

      <footer className={style.footer}>
        <Link to="/Produtos"><Button variant="contained">Voltar</Button></Link>        
        <Button variant="contained" onClick={handleSubmitNewProduct}>Cadastrar</Button>
      </footer>      
    </section>  
    </>  
  );
};

export default ProdutosForm;
