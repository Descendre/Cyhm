import { Box } from '@mui/material';
import {
	EditColumnConstraintLeftBar,
	EditColumnConstraintMain,
} from '../block';
import { useLayout } from '../../../hooks';

export const EditColumnConstraint = () => {
	const { tables, constraintEditingTableId } = useLayout();
	const selectedTable = tables[constraintEditingTableId];

	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			width="100%"
			height="100%"
		>
			{selectedTable && (
				<>
					<EditColumnConstraintLeftBar table={selectedTable} />
					<EditColumnConstraintMain table={selectedTable} />
				</>
			)}
		</Box>
	);
};
