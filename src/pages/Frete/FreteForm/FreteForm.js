import { forwardRef, React, useEffect, useState } from "react";
import style from "./FreteForm.module.css";
import {
	Alert,
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	MenuItem,
	Slide,
	TextField,
} from "@mui/material";
import Header from "../../../components/Header/Header";
import NumberFormat from "react-number-format";
import {
	getEstados,
	setNovaRegraDeFrete,
} from "../../../services/FreteService";
import Menus from "../../../components/Menus/Menus";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/Auth/useAuth";

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

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

const FreteForm = () => {
	const [values, setValues] = useState({
		valor: {
			error: false,
			value: "",
		},
		estado: {
			error: false,
			value: "",
		},
	});
	const [listaEstados, setListaEstados] = useState([]);
	const [loading, setLoading] = useState(false);
	const [openDialog, setOpenDialog] = useState(false);
	const { token } = useAuth();
	const [dialog, setDialog] = useState({
		title: "",
		text: "",
		callback: () => {},
	});
	let navigate = useNavigate();

	useEffect(() => {
		(async () => {
			setLoading(true);
			setListaEstados((await getEstados(token)) || []);
			setLoading(false);
		})();
	}, [token]);

	const handleChange = (event) => {
		setValues({
			...values,
			[event.target.name]: {
				error: false,
				value: event.target.value,
			},
		});
	};

	const validaDados = () => {
		if (values.valor.value === "" || values.estado.value === "") {
			setValues({
				valor: {
					error: values.valor.value === "",
					value: values.valor.value,
				},
				estado: {
					error: values.estado.value === "",
					value: values.estado.value,
				},
			});

			return false;
		}

		return true;
	};

	const resetDados = () => {
		setValues({
			valor: {
				error: false,
				value: "",
			},
			estado: {
				error: false,
				value: "",
			},
		});
	};

	const refreshPage = () => {
		window.location.reload();
	};

	const handleSubmit = async () => {
		if (validaDados()) {
			const response = await setNovaRegraDeFrete(
				{
					estadoId: values.estado.value,
					valor: parseFloat(values.valor.value),
				},
				token
			);

			if (response.ok) {
				setDialog({
					title: "Cadastro efetuado com sucesso!",
					text: "Nova regra de frete cadastrada com sucesso! ",
					callback: () => {
						resetDados();
						setOpenDialog(false);
						navigate("/");
					},
				});
				setOpenDialog(true);
			}

			if (!response.ok) {
				setDialog({
					title: "Não foi possível efetuar o cadastro!",
					text: `${response.status} - ${
						response.message
							? response.message
							: "Ocorreu um erro ao cadastrar."
					}`,
					callback: () => {
						setOpenDialog(false);
					},
				});
				setOpenDialog(true);
				throw new Error(
					`This is an HTTP error: The status is ${response.status}`
				);
			}
		}
	};

	return (
		<>
			<Menus />
			<div className={style.wrapper}>
				<Header title="Nova regra" />
				<section className={style.container}>
					{loading && <CircularProgress />}
					{!loading && listaEstados.length === 0 && (
						<Alert
							severity="error"
							action={
								<Button color="inherit" size="small" onClick={refreshPage}>
									Recarregar
								</Button>
							}
						>
							Ocorreu um erro ao carregar os dados página. Tente recarregar
							novamente clicando no botão.
						</Alert>
					)}
					{!loading && listaEstados.length > 0 && (
						<form className={style.form}>
							<TextField
								id="estado"
								fullWidth
								label="Estado"
								name="estado"
								variant="outlined"
								onChange={handleChange}
								error={values.estado.error}
								helperText={values.estado.error ? "Selecione um estado" : " "}
								className={style.input}
								inputProps={{ "data-testid": "estados" }}
								select
								value={values.estado.value}
								sx={{ height: "70px" }}
							>
								{listaEstados.length > 0 &&
									listaEstados.map((estado) => (
										<MenuItem key={estado.id} value={estado.id}>
											{estado.uf} - {estado.nome}
										</MenuItem>
									))}
							</TextField>
							<TextField
								label="Valor"
								value={values.valor.value}
								error={values.valor.error}
								helperText={values.valor.error ? "Informe um valor" : " "}
								onChange={handleChange}
								name="valor"
								id="formatted-numberformat-input"
								InputProps={{
									inputComponent: NumberFormatCustom,
								}}
								variant="outlined"
							/>
						</form>
					)}

					{!loading && listaEstados.length > 0 && (
						<footer className={style.footer}>
							<Button
								color="secondary"
								variant="contained"
								onClick={() => {
									navigate("/");
								}}
								data-testid="voltar"
							>
								Voltar
							</Button>
							<Button
								variant="contained"
								onClick={handleSubmit}
								data-testid="cadastrar"
							>
								Cadastrar
							</Button>
						</footer>
					)}
				</section>
			</div>

			<Dialog
				open={openDialog}
				TransitionComponent={Transition}
				keepMounted
				onClose={dialog.callback}
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogTitle>{dialog.title}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
						{dialog.text}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={dialog.callback}>Ok</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default FreteForm;
