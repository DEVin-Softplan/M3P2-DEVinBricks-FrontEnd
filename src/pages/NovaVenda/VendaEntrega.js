import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styles from './VendaEntrega.module.css';
import Header from '../../components/Header/Header';
import Menus from '../../components/Menus';
import { AdapterDateFns }
    from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider }
    from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker }
    from '@mui/x-date-pickers/DatePicker';
    import { useAuth } from "../../contexts/Auth/useAuth";

const mockValores = {
    valorProdutos: 100.60,
    valorFrete: 50,
    valorDesconto: 50,
    valorTotal: 100.6

}

const mockComprador = {

}

const mockListaCompras = {

}

export const VendaEntrega = () => {

    const [cep, setCep] = React.useState("");
    const [estado, setEstado] = React.useState("");
    const [logradouro, setLogradouro] = React.useState("");
    const [bairro, setBairro] = React.useState("");
    const [complemento, setComplemento] = React.useState("");
    const [dataDeEntrega, setDataDeEntrega] = React.useState(null);
    const [cidade, setCidade] = React.useState("");
    const [error, setError] = React.useState(false)
    const [valorFrete, setValorFrete] = React.useState(50);
    const { token } = useAuth();
    React.useEffect(() => {
       // setToken(localStorage.getItem("token"))
        console.log("Token: " +token)
      }, [token])

    const handleChange = (event) => {
        var value = event.target.value
        if (checkCEP(value)) {
            setCep(value)
            setError(false)
            fetch(`https://viacep.com.br/ws/${value}/json/`)
                .then(response => {
                    response.json()
                        .then(data => {
                            console.log(data)

                            setEstado(data.uf)

                            setCidade(data.localidade)

                            setLogradouro(data.logradouro)

                            setBairro(data.bairro)


                            fetch(`https://localhost:7171/api/FretePorEstado?nome=${estado}&page=1&size=1`, {
                                method: 'GET',
                                headers: new Headers({
                                    'Authorization': 'Bearer ' + (`${token}`),
                                    'Content-Type': 'application/json'
                                }),
                            }).then(response => {
                                response.json()
                                    .then(data => {
                                        //console.log(data[0].valor)
                                        setValorFrete(data[0].valor)
                                    })
                            })
                        })
                })
        }
    }

    const checkCEP = cep => / ^[0 - 9]{5}[0-9] { 3}$/.test(cep.replace('-', ''));

    const handleBlur = (event) => {
        if (!checkCEP(event.target.value)) {
            setError(true)
        }
        if (event.target.value.length === 0)
            setError(false)
    }

    const validaSubimit = () => {
        if (checkCEP(cep) || !estado || !cidade || !logradouro || !bairro || !complemento || !dataDeEntrega)
            return true;
        return false;
    }
    const handleSubmit = () => {
        if (!validaSubimit) {
            alert("Dados Incompletos")
        }
        else {
            fetch(`https://localhost:7171/api/Venda`, {
                method: 'POST',
                headers: new Headers({
                    'Authorization': 'Bearer ' + (`${token}`),
                    'Content-Type': 'application/json'
                }),
                body: {
                    compradorId: 1,
                    VendedorId: 1,
                    Id: 6,
                }
            }).then(response => {
                response.json()
                    .then(data => {
                       
                        alert("ID DA VENDA: "+data)
                        
                    })
            })

        }
    }

    return (<>
        <Menus />
        < div className={styles.containerVEndaEntrega}>

            < div className={styles.headerContainer}>

                < Header title="Nova venda: Entrega" />

            </ div >

            < hr className={styles.linhaHeader}></ hr >

            < Box
                component="form"
                noValidate
                autoComplete="off"
            >
                < div className={styles.containerInputs}>

                    < TextField className={styles.textField}
                        helperText={error ? "CEP Inválido" : ""}
                        error={error}
                        label="CEP" onChange={handleChange}
                        onBlur={handleBlur}
                        variant="outlined" fullWidth={true} /> < br />

                </ div >

                < div className={styles.containerInputs}>

                    < TextField className={styles.textField}
                        disabled value={estado} label="Estado" variant="outlined" />

                    <TextField className={styles.textField} label="Cidade" value={cidade}
                        variant="outlined" />< br />

                </ div >

                < div className={styles.containerInputs}>

                    < TextField className={styles.textField}
                        id="textField-logradouro" label="Logradouro" value={logradouro}
                        onChange={(data) => setLogradouro(data.target.value)}
                        variant="outlined" fullWidth={true} />< br />

                </ div >

                < div className={styles.containerInputs}>

                    < TextField className={styles.textField}
                        label="Bairro" onChange={(data) => setBairro(data.target.value)}
                        value={bairro}
                        variant="outlined" />

                    < TextField className={styles.textField}
                        label="Complemento" value={complemento}
                        onChange={(data) => setComplemento(data.target.value)}
                        variant="outlined" />


                    < LocalizationProvider dateAdapter={AdapterDateFns}>

                        < DatePicker
                            label="Data de Entrega"
                            value={dataDeEntrega}

                            onChange={
                                (newValue) => {
                                    setDataDeEntrega(newValue);
                                }}
                            renderInput={(params) => < TextField {...params} />}
                        />
                    </ LocalizationProvider >
                </ div >


                < div className={styles.valoresCompra} >

                    < Typography sx={{ fontSize: "1.5em" }}
                        className={styles.Typography}
                        variant="h6" gutterBottom component="div" >
                        Produtos: R$ {mockValores.valorProdutos.toFixed(2)}
                    </ Typography >
                    < Typography sx={{ fontSize: "1.5em" }}
                        className={styles.Typography}
                        variant="h6" gutterBottom component="div" >
                        Frete: R$ {valorFrete.toFixed(2)}
                    </ Typography >
                    < Typography sx={{ fontSize: "1.5em" }}
                        className={styles.Typography}
                        variant="h6" gutterBottom component="div" >
                        Desconto: R$ {mockValores.valorDesconto.toFixed(2)}
                    </ Typography >
                    < Typography sx={{ fontSize: "1.5em" }}
                        className={styles.Typography}
                        variant="h6" gutterBottom component="div" >
                        Valor Total: R$ {mockValores.valorTotal.toFixed(2)}
                    </ Typography >

                    < Button
                        className={styles.btnconfirmar}
                        variant="contained"
                        onClick={handleSubmit}
                        sx={
                            {
                                fontSize: "1.2em",
                                backgroundColor: "var(--blue)",
                                '&:hover': {
                                    backgroundColor: "var(--blue-dark)"
                                }
                            }
                        }>
                        Finalizar
                    </ Button >

                </ div >



            </ Box >

        </ div >

    </>);
}

export default VendaEntrega;