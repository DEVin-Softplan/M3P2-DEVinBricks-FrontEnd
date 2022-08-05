import { forwardRef, React, useEffect, useState } from "react";
import style from "./EditaFreteForm.module.css";
import {
	Alert,
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Slide,
	TextField,
} from "@mui/material";
import Header from "../../../components/Header/Header";
import NumberFormat from "react-number-format";
import {
	atualizaRegraDeFrete,
	consultaFrete,
	getEstados,
} from "../../../services/FreteService";
import Menus from "../../../components/Menus/Menus";

import { useNavigate, useParams } from "react-router-dom";
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

const EditaFreteForm = () => {
	const [values, setValues] = useState({
		valor: {
			error: false,
			value: "",
		},
		estado: {
			value: "",
		},
	});
	let { idRegra } = useParams();
	const [listaEstados, setListaEstados] = useState([]);
	const [loading, setLoading] = useState(false);
	const [openDialog, setOpenDialog] = useState(false);
	const [regraDeFrete, setRegraDeFrete] = useState();
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
			if (token) {
				const estados = await getEstados(token);
				await setListaEstados(estados || []);
				if (estados.length > 0) {
					const estado = estados.find(
						(estado) => estado.id === parseInt(idRegra)
					);
					const frete = await consultaFrete(token, estado.nome);
					setRegraDeFrete(frete[0]);
					setValues({
						valor: {
							error: false,
							value: frete[0].valor,
						},
						estado: {
							value: `${estado.uf} - ${estado.nome}`,
						},
					});
				}
			}
			setLoading(false);
		})();
	}, [token, idRegra]);

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
			const response = await atualizaRegraDeFrete(
				regraDeFrete.id,
				{
					id: parseInt(regraDeFrete.id),
					valor: parseFloat(values.valor.value),
				},
				token
			);

			if (response.ok) {
				setDialog({
					title: "Atualização efetuad com sucesso!",
					text: "Regra de frete atualizada com sucesso! ",
					callback: () => {
						resetDados();
						setOpenDialog(false);
						navigate("/Frete");
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
				<Header title="Editar regra" />
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
								label="Estado"
								disabled
								value={values.estado.value}
								name="estado"
								variant="outlined"
							/>
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
									navigate("/Frete");
								}}
								data-testid="voltar"
							>
								Voltar
							</Button>
							<Button
								variant="contained"
								onClick={handleSubmit}
								data-testid="atualizar"
							>
								Atualizar
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

export default EditaFreteForm;
