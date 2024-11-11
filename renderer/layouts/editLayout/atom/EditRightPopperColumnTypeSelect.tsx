import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { EditRightPopperColumnTypeSelectProps } from '../../../interfaces';
import { useLayout, usePalette, useProject } from '../../../hooks';
import { SQliteColumnType } from '@prisma/client';

export const EditRightPopperColumnTypeSelect = ({
	column,
	table,
}: EditRightPopperColumnTypeSelectProps) => {
	const palette = usePalette();
	const { tables, handleGetColumnTypeTextWithSQlite } = useLayout();
	const { currentProject, handleUpdateColumnType } = useProject();
	const sqliteTypes: SQliteColumnType[] = ['INTEGER', 'TEXT', 'REAL', 'BLOB'];
	const isEditable: boolean = tables[table?.id]?.isEditing;

	const handleTypeChange = async (event: SelectChangeEvent) => {
		if (!currentProject) return;
		const newType = event.target.value as SQliteColumnType;
		await handleUpdateColumnType({
			tableId: column.tableId,
			columnId: column.id,
			dbType: currentProject.dbType,
			type: newType,
		});
	};

	return (
		<Select
			variant="outlined"
			size="small"
			disabled={!isEditable}
			value={column.sqliteType}
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
			{sqliteTypes.map((type) => (
				<MenuItem key={type} value={type}>
					{handleGetColumnTypeTextWithSQlite(type, true, '1rem', '0.6rem')}
				</MenuItem>
			))}
		</Select>
	);
};
