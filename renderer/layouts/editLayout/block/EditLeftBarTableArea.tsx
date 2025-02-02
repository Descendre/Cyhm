import { Box } from '@mui/material';
import { EditLeftBarTableHeader } from './EditLeftBarTableHeader';
import { useLayout, usePalette } from '../../../hooks';
import { EditLeftBarNewBorn } from './EditLeftBarNewBorn';
import { EditLeftBarColumnArea } from './EditLeftBarColumnArea';
import { EditLeftBarTableAreaProps } from '../../../interfaces';

export const EditLeftBarTableArea = ({ table }: EditLeftBarTableAreaProps) => {
	const palette = usePalette();
	const {
		tables,
		columns,
		addColumnIndex,
		selectedTableId,
		handleSelectTable,
	} = useLayout();
	const isTableSelected: boolean = table.id === selectedTableId;

	return (
		<Box
			position="relative"
			width="100%"
			onClick={() => handleSelectTable(table)}
		>
			<EditLeftBarTableHeader key={table.id} table={table} />
			{addColumnIndex === table.id && (
				<EditLeftBarNewBorn mode="column" tableId={table.id} />
			)}
			{tables?.[table.id]?.isExpanded &&
				columns &&
				columns[table.id]?.map((column) => (
					<EditLeftBarColumnArea key={column.id} {...column} />
				))}

			<Box
				zIndex={50}
				position="absolute"
				top={0}
				left={0}
				display={!table.isEditing ? 'block' : 'none'}
				width="100%"
				height="100%"
				bgcolor={palette.layout.editLayout.leftBar.lockBg}
				sx={{
					opacity: 0.5,
				}}
			/>

			<Box
				zIndex={100}
				position="absolute"
				display={isTableSelected ? 'block' : 'none'}
				top={0}
				left={0}
				width="100%"
				height="100%"
				border={`solid 2px ${palette.primary.main}`}
				sx={{
					pointerEvents: 'none',
				}}
			/>
		</Box>
	);
};
