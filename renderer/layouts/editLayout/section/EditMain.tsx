import { Box } from '@mui/material';
import { EditMainProps } from '../../../interfaces';

export const EditMain = ({ children }: EditMainProps) => {
	return (
		<Box position="relative" width="calc(100% - 250px)" height="100%">
			{children}
		</Box>
	);
};
