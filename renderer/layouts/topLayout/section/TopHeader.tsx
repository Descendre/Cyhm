'use client';
import { Box } from '@mui/material';
import { TopHeaderLogo } from '../atom';
import { TopHeaderButtons } from '../block';

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
			<TopHeaderLogo />
			<TopHeaderButtons />
		</Box>
	);
};
