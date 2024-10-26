'use client';
import { Box } from '@mui/material';
import { TopLayoutProps } from '../../interfaces';
import { TopHeader } from './section';

export const TopLayout = ({ children }: TopLayoutProps) => {
	return (
		<>
			<Box width="100%" height="100vh" maxWidth="800px" margin="0 auto">
				<TopHeader />
				{children}
			</Box>
		</>
	);
};
