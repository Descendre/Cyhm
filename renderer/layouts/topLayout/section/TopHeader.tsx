'use client';
import { Box } from '@mui/material';
import { TopHeaderButtons } from '../block';
import { AppLogo } from '../../../components';

export const TopHeader = () => {
	return (
		<Box
			display="flex"
			justifyContent="space-between"
			alignItems="center"
			width="100%"
			height="100px"
			maxWidth="900px"
		>
			<AppLogo width="auto" height="50px" />
			<TopHeaderButtons />
		</Box>
	);
};
