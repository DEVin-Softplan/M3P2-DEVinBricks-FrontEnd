import React from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import styled from '@emotion/styled';

const Box2 = styled('div')({
	width: '1000px',
});

const Logo = () => {
	return (
		<Box>
			<Link to="/">
				<Box component="img" src="/static/Logo.webp" alt="logo" />
			</Link>
		</Box>
	);
};

export default Logo;
