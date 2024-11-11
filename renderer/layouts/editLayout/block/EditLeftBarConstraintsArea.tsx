import { Box } from '@mui/material';
import { AddColumnResponse } from '../../../interfaces';
import { useLayout } from '../../../hooks';

export const EditLeftBarConstraintsArea = (column: AddColumnResponse) => {
	const { handleGetConstraintIcon } = useLayout();

	return (
		<Box
			display="flex"
			justifyContent="start"
			alignItems="center"
			gap="4px"
			flexGrow={1}
			height="100%"
		>
			{column.columnConstraints.map((constraint) => (
				<Box key={constraint.id}>
					{handleGetConstraintIcon(constraint.type, false, '1rem', '')}
				</Box>
			))}
		</Box>
	);
};
