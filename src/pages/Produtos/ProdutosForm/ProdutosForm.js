import React, {forwardRef, useState, useEffect, useRef } from 'react';
import style from './ProdutosForm.module.css'
import Header from '../../../components/Header/Header';
import Button from '../../../components/Button';
import Menus from '../../../components/Menus';
import { useAuth } from "../../../contexts/Auth/useAuth";
import { getProductById, createNewProduct } from '../../../services/ProdutosService';

import { formatarMoeda } from '../../../utils/FormatarMoeda';
import NumberFormat from "react-number-format";

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

  const [valuesProduct, setValuesProduct] = useState({
		produto:{
      nome: "",
      descricao: "",
      urlDaImagem: "",
      ativo: false,
      valor:  ""
    },
	});
 
  const handleChangeFields = (event) => {
		setValuesProduct({
			...valuesProduct,
			[event.target.name]: {
        value: event.target.value,        
			},
		});
	};

  const validaDatos = () => {
    if(valuesProduct.descricao === ""){
      return false;
    }else{
      setValuesProduct({
        produto:{
          nome: valuesProduct.nome,
          descricao: valuesProduct.descricao,
          urlDaImagem: valuesProduct.urlDaImagem,
          ativo: valuesProduct.ativo,
          valor: valuesProduct.valor
        }
      });

      console.log(`ON VALIDA DADOS: ${valuesProduct.produto}`);

      return true;
    }
  }

  const handleSubmitNewProduct = async () =>
  {
    if(validaDatos()){
    console.log(`ON SUBMIT: ${JSON.stringify(valuesProduct)}`);
      try{
        const response = await createNewProduct(
          token, 
          {
            nome: valuesProduct.nome.value,
            descricao: valuesProduct.descricao.value,
            urlDaImagem: valuesProduct.urlDaImagem.value,
            ativo: 1,
            valor: valuesProduct.valor.value 
          }
        );      

        if(response.ok){ 
          alert("Produto criado com sucesso!");
        }else
        {
          alert("Erro na criação do produto");
        }
      }catch(error){

      }
    };
  };

  const produto = {
    id: produtoEditavel.id,
    nome: produtoEditavel.nome,
    descricao: produtoEditavel.descricao,
    urlDaImagem: produtoEditavel.urlDaImagem,
    ativo: produtoEditavel.ativo,
    valor: 0
  };

  const NumberFormatCustom = forwardRef(function NumberFormatCustom(props, ref) {
    const { onChange, ...other } = props;
  
    return (
      <NumberFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator="."
        decimalSeparator=","
        isNumericString
        allowNegative={false}
        decimalScale="2"
        prefix="R$ "
      />
    );
  });

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
          InputProps={{
						inputComponent: NumberFormatCustom,
					}}      
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
