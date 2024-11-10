import { Box } from '@mui/material';
import { EditColumnConstraintSettingArea } from './EditColumnConstraintSettingArea';
import { useLayout } from '../../../hooks';
import {
	ColumnStatePropsExtended,
	EditColumnConstraintMainProps,
} from '../../../interfaces';

export const EditColumnConstraintMain = ({
	table,
}: EditColumnConstraintMainProps) => {
	const { columns, selectedConstraintColumnId } = useLayout();
	const selectedColumn: ColumnStatePropsExtended = columns[table.id].find(
		(col) => col.id === selectedConstraintColumnId
	);

	return (
		<Box
			display="flex"
			justifyContent="start"
			alignItems="center"
			flexDirection="column"
			width="calc(100% - 200px)"
			height="100%"
			padding="20px 0"
			sx={{
				overflowY: 'overlay',
				'&:not(:hover)': {
					'&::-webkit-scrollbar-thumb': {
						backgroundColor: 'transparent',
					},
				},
			}}
		>
			<Box
				display="flex"
				justifyContent="start"
				alignItems="center"
				flexDirection="column"
				width="90%"
			>
				{selectedColumn && (
					<EditColumnConstraintSettingArea column={selectedColumn} />
				)}
			</Box>
		</Box>
	);
};
