import { Box } from '@mui/material';
import { TopMainProps } from '../../../interfaces';

export const TopMain = ({ children }: TopMainProps) => {
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
