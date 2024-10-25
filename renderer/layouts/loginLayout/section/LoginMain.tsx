import { Box } from '@mui/material';
import { LoginMainProps } from '../../../interfaces';

export const LoginMain = ({ children }: LoginMainProps) => {
	return (
		<Box
			display="flex"
			flexDirection="column"
			justifyContent="center"
			alignItems="center"
			width="100%"
			height="calc(100% - 100px)"
		>
			{children}
		</Box>
	);
};
