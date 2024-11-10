import { Box } from '@mui/material';
import { useLayout } from '../../../hooks';
import { EditColumnConstraintLeftBarItemProps } from '../../../interfaces';

export const EditColumnConstraintLeftBarItem = ({
	constraintType,
}: EditColumnConstraintLeftBarItemProps) => {
	const { handleGetConstraintIcon } = useLayout();

	return (
		<Box
			display="flex"
			justifyContent="start"
			alignItems="center"
			gap="10px"
			width="100%"
			minHeight="25px"
			padding="0 10px"
			sx={{
				cursor: 'pointer',
			}}
		>
			<>{handleGetConstraintIcon(constraintType, false)}</>
		</Box>
	);
};
