import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { EditRightPopperColumnTypeSelectProps } from '../../../interfaces';
import { useLayout, usePalette, useProject } from '../../../hooks';
import { ColumnTypeTexts } from '../../../components';
import { ColumnType } from '@prisma/client';

export const EditRightPopperColumnTypeSelect = ({
	column,
	table,
}: EditRightPopperColumnTypeSelectProps) => {
	const palette = usePalette();
	const { tables } = useLayout();
	const { handleUpdateColumnType } = useProject();
	const types: ColumnType[] = [
		'INT',
		'VARCHAR',
		'BOOLEAN',
		'DATE',
		'TEXT',
		'FLOAT',
		'DOUBLE',
	];
	const isEditable: boolean = tables[table?.id]?.isEditing;

	const handleTypeChange = async (event: SelectChangeEvent) => {
		const newType = event.target.value as ColumnType;
		await handleUpdateColumnType({
			tableId: column.tableId,
			columnId: column.id,
			type: newType,
		});
	};

	return (
		<Select
			variant="outlined"
			size="small"
			disabled={!isEditable}
			value={column.type}
			onChange={handleTypeChange}
			sx={{
				width: '50%',
				height: '30px',
				borderRadius: '4px',
				backgroundColor: palette.layout.editLayout.header.searchBar.bg,
				'& .MuiSelect-select': {
					height: '30px',
					display: 'flex',
					alignItems: 'center',
				},
				'& .MuiSelect-icon': {
					color: palette.text.secondary,
				},
				'&:hover .MuiOutlinedInput-notchedOutline': {
					border: `1px solid ${palette.text.disabled}`,
				},
				'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
					border: `1px solid ${palette.primary.main}`,
				},
				'&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
					border: 'none',
				},
			}}
			inputProps={{
				style: {
					fontSize: '0.7rem',
				},
			}}
		>
			{types.map((type) => (
				<MenuItem key={type} value={type}>
					<ColumnTypeTexts type={type} />
				</MenuItem>
			))}
		</Select>
	);
};
