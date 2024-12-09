import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { EditRightPopperColumnTypeSelectProps } from '../../../interfaces';
import { useLayout, usePalette, useProject } from '../../../hooks';
import { SQliteColumnType, SupabaseColumnType } from '@prisma/client';

export const EditRightPopperColumnTypeSelect = ({
	column,
	table,
}: EditRightPopperColumnTypeSelectProps) => {
	const palette = usePalette();
	const {
		tables,
		handleGetColumnTypeTextWithSQlite,
		handleGetColumnTypeTextWithSupabase,
	} = useLayout();
	const { currentProject, handleUpdateColumnType } = useProject();
	const sqliteTypes: SQliteColumnType[] = ['INTEGER', 'TEXT', 'REAL', 'BLOB'];
	const supabaseTypes: SupabaseColumnType[] = [
		'STRING',
		'INT',
		'BIGINT',
		'FLOAT',
		'DECIMAL',
		'BOOLEAN',
		'DATETIME',
		'JSON',
		'BYTES',
	];
	const isEditable: boolean = tables[table?.id]?.isEditing;
	const initialValue: SQliteColumnType | SupabaseColumnType =
		currentProject.dbType === 'SQLITE'
			? column.sqliteType
			: column.supabaseType;

	const handleTypeChange = async (event: SelectChangeEvent) => {
		if (!currentProject) return;
		const newType = event.target.value as SQliteColumnType | SupabaseColumnType;
		const updateData =
			currentProject.dbType === 'SQLITE'
				? { sqliteType: newType as SQliteColumnType }
				: { supabaseType: newType as SupabaseColumnType };

		await handleUpdateColumnType({
			tableId: column.tableId,
			columnId: column.id,
			dbType: currentProject.dbType,
			...updateData,
		});
	};

	return (
		<Select
			variant="outlined"
			size="small"
			disabled={!isEditable}
			value={initialValue}
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
			{currentProject.dbType === 'SQLITE' ? (
				sqliteTypes.map((type) => (
					<MenuItem key={type} value={type}>
						{handleGetColumnTypeTextWithSQlite(type, true, '1rem', '0.6rem')}
					</MenuItem>
				))
			) : currentProject.dbType === 'SUPABASE' ? (
				supabaseTypes.map((type) => (
					<MenuItem key={type} value={type}>
						{handleGetColumnTypeTextWithSupabase(type, true, '1rem', '0.6rem')}
					</MenuItem>
				))
			) : (
				<></>
			)}
		</Select>
	);
};
