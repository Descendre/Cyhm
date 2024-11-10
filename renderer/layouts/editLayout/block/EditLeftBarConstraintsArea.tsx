import { Box } from '@mui/material';
import { AddColumnResponse } from '../../../interfaces';

export const EditLeftBarConstraintsArea = (column: AddColumnResponse) => {
	return (
		<Box
			display="flex"
			justifyContent="start"
			alignItems="center"
			gap="4px"
			flexGrow={1}
			height="100%"
			sx={{
				cursor: 'pointer',
				pointerEvents: column ? 'none' : 'none',
			}}
		>
			{/* {column.constraints.map((constraint, index) => (
				<Box key={index}>{getConstraintIcon(constraint)}</Box>
			))} */}
		</Box>
	);
};
