import { Box } from '@mui/material';
import { EditLeftBarTableHeader } from './EditLeftBarTableHeader';
import { useLayout } from '../../../hooks';
import { EditLeftBarNewBorn } from './EditLeftBarNewBorn';
import { TableProps } from '../../../interfaces';
import { EditLeftBarColumnArea } from './EditLeftBarColumnArea';

export const EditLeftBarTableArea = (table: TableProps) => {
	const { tables, columns, addColumnIndex } = useLayout();

	return (
		<Box width="100%">
			<EditLeftBarTableHeader
				key={table.id}
				tableId={table.id}
				bg={table.color}
				text={table.name}
				isExpanded={table.isExpanded}
			/>
			{addColumnIndex === table.id && (
				<EditLeftBarNewBorn mode="column" tableId={table.id} />
			)}
			{tables[table.id].isExpanded &&
				columns &&
				columns[table.id]?.map((column) => (
					<EditLeftBarColumnArea key={column.id} {...column} />
				))}
		</Box>
	);
};
