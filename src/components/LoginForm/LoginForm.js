import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { loginUser } from '../../services/AuthService';
import Swal from 'sweetalert2';
import { Box, IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/Auth/useAuth';

let easing = [0.6, -0.05, 0.01, 0.99];
const animate = {
	opacity: 1,
	y: 0,
	transition: {
		duration: 0.6,
		ease: easing,
		delay: 0.16,
	},
};

const LoginForm = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || '/';

	const [showPassword, setShowPassword] = useState(false);
	const { setToken, setAuth, auth } = useAuth();

	useEffect(() => {
		if (auth) {
			navigate('/');
		}
	});

	const LoginSchema = Yup.object().shape({
		login: Yup.string().required('Login é obrigatório'),
		senha: Yup.string().required('Senha é obrigatória'),
	});

	const formik = useFormik({
		initialValues: {
			login: '',
			senha: '',
		},
		validationSchema: LoginSchema,
		onSubmit: async () => {
			const response = await loginUser(values);

			if (response.status === 200) {
				setAuth(true);
				setToken(response.token);
				localStorage.setItem('token', response.token);
				Swal.fire({
					icon: 'success',
					title: response.message,
					showConfirmButton: false,
					timer: 1500,
				});
				navigate(from, { replace: true });
			} else {
				Swal.fire({
					icon: 'error',
					title: response.message,
					showConfirmButton: false,
					timer: 2000,
				});
			}
		},
	});

	const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

	return (
		<FormikProvider value={formik}>
			<Form autoComplete="off" noValidate onSubmit={handleSubmit}>
				<Box
					component={motion.div}
					animate={{
						transition: {
							staggerChildren: 0.55,
						},
					}}
				>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							gap: 3,
						}}
						component={motion.div}
						initial={{ opacity: 0, y: 40 }}
						animate={animate}
					>
						<TextField
							fullWidth
							autoComplete="username"
							type="text"
							label="Login"
							{...getFieldProps('login')}
							error={Boolean(touched.login && errors.login)}
							helperText={touched.login && errors.login}
						/>

						<TextField
							fullWidth
							autoComplete="current-password"
							type={showPassword ? 'text' : 'password'}
							label="Senha"
							{...getFieldProps('senha')}
							error={Boolean(touched.senha && errors.senha)}
							helperText={touched.senha && errors.senha}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											onClick={() => setShowPassword((prev) => !prev)}
										>
											{showPassword ? (
												<Icon icon="eva:eye-fill" />
											) : (
												<Icon icon="eva:eye-off-fill" />
											)}
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
					</Box>

					<Box component={motion.div} initial={{ opacity: 0, y: 20 }} animate={animate}>
						<Stack
							direction="row"
							alignItems="center"
							justifyContent="space-between"
							sx={{ my: 2 }}
						>
							{/* <Link
								sx={{
									color: '#5965E0',
								}}
								component={RouterLink}
								variant="subtitle2"
								to="#"
								underline="hover"
							>
								Esqueceu a senha?
							</Link> */}
						</Stack>

						<LoadingButton
							fullWidth
							size="large"
							type="submit"
							variant="contained"
							loading={isSubmitting}
							sx={{
								backgroundColor: '#5965E0',
								'&:hover': {
									color: 'black',
									backgroundColor: '#7982d9',
								},
							}}
						>
							{isSubmitting ? 'loading...' : 'Login'}
						</LoadingButton>
					</Box>
				</Box>
			</Form>
		</FormikProvider>
	);
};

export default LoginForm;
