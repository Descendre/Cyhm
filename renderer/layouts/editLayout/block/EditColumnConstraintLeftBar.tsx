import { Box, Divider } from '@mui/material';
import {
	EditColumnConstraintColumnHeader,
	EditColumnConstraintLeftBarItem,
} from '../atom';
import { EditColumnConstraintLeftBarProps } from '../../../interfaces';
import { useLayout, usePalette, useProject } from '../../../hooks';

export const EditColumnConstraintLeftBar = ({
	table,
}: EditColumnConstraintLeftBarProps) => {
	const { columns } = useLayout();
	const { addConstraintColumnId, setAddConstraintColumnId } = useProject();
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
			{columns[table.id]?.map((column, index) => (
				<Box
					key={column.id}
					position="relative"
					width="100%"
					onClick={() => setAddConstraintColumnId(column.id)}
				>
					<Divider
						sx={{
							width: '100%',
						}}
					/>
					<EditColumnConstraintColumnHeader table={table} column={column} />
					{column.isConstraintExpand &&
						column.columnConstraints.map((constraint, index) => (
							<EditColumnConstraintLeftBarItem
								key={index}
								constraintType={constraint.type}
							/>
						))}

					{columns[table.id].length === index + 1 && (
						<Divider
							sx={{
								width: '100%',
							}}
						/>
					)}

					<Box
						position="absolute"
						top={0}
						left={0}
						display={addConstraintColumnId === column.id ? 'block' : 'none'}
						width="100%"
						height="100%"
						border={`solid 1px ${palette.primary.main}`}
						sx={{
							pointerEvents: 'none',
						}}
					></Box>
				</Box>
			))}
		</Box>
	);
};
