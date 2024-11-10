import { Box } from '@mui/material';
import { EditColumnConstraintCurrentConstraintsProps } from '../../../interfaces';
import { EditColumnConstraintColumn } from './EditColumnConstraintColumn';

export const EditColumnConstraintCurrentConstraints = ({
	column,
}: EditColumnConstraintCurrentConstraintsProps) => {
	console.log(column);
	return (
		<Box
			display="flex"
			justifyContent="start"
			alignItems="center"
			width="100%"
			padding="10px"
		>
			<EditColumnConstraintColumn type="PRIMARY_KEY" />
		</Box>
	);
};
