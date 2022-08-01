import React, { useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';

import {
	Box,
	Checkbox,
	FormControlLabel,
	IconButton,
	InputAdornment,
	Link,
	Stack,
	TextField,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

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

const LoginForm = ({ setAuth }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || '/';

	const [showPassword, setShowPassword] = useState(false);

	const LoginSchema = Yup.object().shape({
		email: Yup.string().email('Adicione um Email válido').required('Email é obrigatório'),
		password: Yup.string().required('Senha é obrigatória'),
	});

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			remember: true,
		},
		validationSchema: LoginSchema,
		onSubmit: () => {
			console.log('submitting...');
			setTimeout(() => {
				console.log('submited!!');
				console.log(getFieldProps().value);
				setAuth(true);
				navigate(from, { replace: true });
			}, 2000);
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
							type="email"
							label="Email"
							{...getFieldProps('email')}
							error={Boolean(touched.email && errors.email)}
							helperText={touched.email && errors.email}
						/>

						<TextField
							fullWidth
							autoComplete="current-password"
							type={showPassword ? 'text' : 'password'}
							label="Senha"
							{...getFieldProps('password')}
							error={Boolean(touched.password && errors.password)}
							helperText={touched.password && errors.password}
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
							<FormControlLabel
								control={
									<Checkbox
										sx={{
											color: '#5965E0',
											'&.Mui-checked': {
												color: '#5965E0',
											},
										}}
										{...getFieldProps('remember')}
										checked={values.remember}
									/>
								}
								label="Lembre de mim"
							/>

							<Link
								sx={{
									color: '#5965E0',
								}}
								component={RouterLink}
								variant="subtitle2"
								to="#"
								underline="hover"
							>
								Esqueceu a senha?
							</Link>
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
