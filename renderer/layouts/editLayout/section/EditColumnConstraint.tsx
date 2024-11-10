import { Box } from '@mui/material';
import {
	EditColumnConstraintLeftBar,
	EditColumnConstraintMain,
} from '../block';
import { EditColumnConstraintProps } from '../../../interfaces';

export const EditColumnConstraint = ({ table }: EditColumnConstraintProps) => {
	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			width="100%"
			height="100%"
		>
			<EditColumnConstraintLeftBar table={table} />
			<EditColumnConstraintMain table={table} />
		</Box>
	);
};
