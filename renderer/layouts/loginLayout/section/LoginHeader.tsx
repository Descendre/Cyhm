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
			maxWidth="900px"
		>
			<AppLogo width="auto" height="60px" />
		</Box>
	);
};
