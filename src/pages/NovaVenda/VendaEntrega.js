import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './VendaEntrega.css';

export const VendaEntrega = ()=>{

    
    const [estado, setEstado] = React.useState("");
    const [logradouro, setLogradouro] = React.useState("");
    const [bairro, setBairro] = React.useState("");
    const [complemento, setComplemento] = React.useState("");
    const [dataDeEntrega, setDataDeEntrega] = React.useState("");
    const [cidade, setCidade] = React.useState("");
    const [error, setError] = React.useState(false)

    const handleChange = (event) => {
        if(checkCEP(event.target.value)){
            setError(false)
            fetch(`https://viacep.com.br/ws/${event.target.value}/json/`)
            .then(response => {
            response.json()
                .then(data => {
                    console.log(data)
                    setEstado(data.uf)
                    setCidade(data.localidade)
                    setComplemento(data.complemento)
                    setLogradouro(data.logradouro)
                    setBairro(data.bairro)
                })
            })
        }       
    }

    const checkCEP = cep => /^[0-9]{5}[0-9]{3}$/.test(cep.replace('-',''));

    const handleBlur = (event)=> {
        if(!checkCEP(event.target.value)){
            setError(true)
        }
        if(event.target.value.length == 0) 
            setError(false)    
    }
        
    

    return (<>
        <Box
            component="form"
            noValidate
            autoComplete="off"
            >
            <TextField sx={{m:"2px"}}className="textField" helperText={error?"CEP Inválido":""} error={error} label="CEP" onChange={handleChange} onBlur={handleBlur} variant="outlined" fullWidth={true} /> <br/>
            <TextField id="textField-estadp" disabled value={estado} label="Estado"  variant="outlined" />
            <TextField id="textField-cidade" label="Cidade" value={cidade} variant="outlined" /><br/>
            <TextField id="textField-logradouro" label="Logradouro" value={logradouro} variant="outlined" fullWidth={true}/><br/>
            <TextField id="textField-Bairro" label="Bairro" value={bairro} variant="outlined" />
            <TextField id="textField-Complemento" label="Complemento" value={complemento} variant="outlined" />
            <TextField id="textField-DataEntrega" label="Data de Entrega" value={dataDeEntrega} variant="outlined" />
            <Typography className="Typography" variant="h6" gutterBottom component="div">
                Produtos: R$ 
            </Typography>
            <Typography className="Typography" variant="h6" gutterBottom component="div">
                Frete: R$ 
            </Typography>
            <Typography className="Typography" variant="h6" gutterBottom component="div">
                Desconto: R$ 
            </Typography>   
            <Typography className="Typography" variant="h6" gutterBottom component="div">
                Valor Total: R$ 
            </Typography>     
            <Button sx={{backgroundColor:"blueviolet"}} className="btnconfirmar" variant="contained">Finalizar</Button>
        </Box>
    </>);
}
