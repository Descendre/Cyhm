import { Box } from '@mui/material';
import {
	EditColumnConstraintColumnHeader,
	EditColumnConstraintLeftBarItem,
} from '../atom';
import { EditColumnConstraintLeftBarProps } from '../../../interfaces';
import { useLayout, usePalette } from '../../../hooks';

export const EditColumnConstraintLeftBar = ({
	table,
}: EditColumnConstraintLeftBarProps) => {
	const { columns } = useLayout();
	const palette = usePalette();

	return (
		<Box
			display="flex"
			justifyContent="start"
			alignItems="center"
			flexDirection="column"
			width="200px"
			height="100%"
			bgcolor={palette.layout.editLayout.leftBar.bg}
			sx={{
				overflowY: 'overlay',
				'&:not(:hover)': {
					'&::-webkit-scrollbar-thumb': {
						backgroundColor: 'transparent',
					},
				},
			}}
		>
			{columns[table.id]?.map((column) => (
				<Box key={column.id} width="100%">
					<EditColumnConstraintColumnHeader table={table} column={column} />
					{column.columnConstraints.map((constraint, index) => (
						<EditColumnConstraintLeftBarItem
							key={index}
							constraintType={constraint.type}
						/>
					))}
				</Box>
			))}
		</Box>
	);
};
