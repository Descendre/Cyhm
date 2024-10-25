import { Box } from '@mui/material';
import React from 'react';
import { AppLogo } from '../../../components';

export const LoginHeader = () => {
	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			width="100%"
			height="100px"
			maxWidth="900px"
		>
			<AppLogo width="auto" height="50%" />
		</Box>
	);
};
