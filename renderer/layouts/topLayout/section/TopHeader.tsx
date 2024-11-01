'use client';
import { Box } from '@mui/material';
import { TopHeaderButtons } from '../block';
import { AppLogo } from '../../../components';

export const TopHeader = () => {
	return (
		<Box
			display="flex"
			justifyContent="space-between"
			alignItems="end"
			width="100%"
			height="100px"
			maxWidth="900px"
			paddingBottom="15px"
		>
			<AppLogo width="auto" height="45px" />
			<TopHeaderButtons />
		</Box>
	);
};
