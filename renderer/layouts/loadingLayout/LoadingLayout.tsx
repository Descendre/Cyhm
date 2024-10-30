import { Box } from '@mui/material';
import { LoadingLayoutProps } from '../../interfaces';

export const LoadingLayout = ({ children }: LoadingLayoutProps) => {
	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			width="100vw"
			height="100vh"
		>
			{children}
		</Box>
	);
};
