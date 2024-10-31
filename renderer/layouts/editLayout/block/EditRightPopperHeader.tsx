import { Box } from '@mui/material';
import { EditRightPoperTableTitle, EditRightPopperListIcon } from '../atom';
import { useLayout } from '../../../hooks';

export const EditRightPopperHeader = () => {
	const { tables, lastSelectedTableId } = useLayout();
	const lastSelectedTableInfo =
		lastSelectedTableId && tables && tables[lastSelectedTableId]
			? tables[lastSelectedTableId]
			: null;

	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			width="100%"
			height="35px"
			padding="10px"
			bgcolor={lastSelectedTableInfo?.color}
		>
			<EditRightPoperTableTitle table={lastSelectedTableInfo} />
			<EditRightPopperListIcon />
		</Box>
	);
};
