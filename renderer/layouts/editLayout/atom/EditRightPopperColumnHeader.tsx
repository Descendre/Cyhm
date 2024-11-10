import { Box, Typography } from '@mui/material';
import { EditRightPopperColumnHeaderProps } from '../../../interfaces';

export const EditRightPopperColumnHeader = ({
	table,
}: EditRightPopperColumnHeaderProps) => {
	return (
		<Box
			display="flex"
			justifyContent="start"
			alignItems="center"
			width="100%"
			height="30px"
			padding="0 5px"
		>
			<Typography variant="body2" noWrap color="text.secondary">
				{table.name}
			</Typography>
		</Box>
	);
};
