import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useLayout, usePalette, useProject } from '../../../hooks';
import { ColumnConstraintType } from '@prisma/client';
import { EditColumnConstraintSqliteAddingTypeSelectProps } from '../../../interfaces';

export const EditColumnConstraintSqliteAddingTypeSelect = ({
	column,
}: EditColumnConstraintSqliteAddingTypeSelectProps) => {
	const palette = usePalette();
	const { handleGetConstraintIcon } = useLayout();
	const { columnConstraintEditInfo, setColumnConstraintEditInfo } =
		useProject();

	const constraintTypes: ColumnConstraintType[] = [
		'PRIMARY_KEY',
		'NOT_NULL',
		'UNIQUE',
		'FOREIGN_KEY',
		'CHECK',
		'DEFAULT',
	];

	const handleChange = (event: SelectChangeEvent): void => {
		setColumnConstraintEditInfo({
			columnId: column.id,
			columnConstraintType: event.target.value as ColumnConstraintType,
			clauseType: null,
			primaryKeyId: null,
		});
	};

	return (
		<>
			<Select
				variant="outlined"
				size="small"
				value={columnConstraintEditInfo?.columnConstraintType || ''}
				onChange={handleChange}
				sx={{
					width: '80%',
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
				{constraintTypes.map((type) => (
					<MenuItem key={type} value={type}>
						{handleGetConstraintIcon(type, true, '1rem', '0.7rem')}
					</MenuItem>
				))}
			</Select>
		</>
	);
};
