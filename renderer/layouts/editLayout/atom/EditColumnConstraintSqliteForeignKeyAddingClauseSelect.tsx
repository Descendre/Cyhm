import { MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { useLayout, usePalette, useProject } from '../../../hooks';
import {
	ColumnStatePropsExtended,
	EditColumnConstraintSqliteForeignKeyAddingClauseSelectProps,
} from '../../../interfaces';

export const EditColumnConstraintSqliteForeignKeyAddingClauseSelect = ({
	column,
}: EditColumnConstraintSqliteForeignKeyAddingClauseSelectProps) => {
	const palette = usePalette();
	const { columns, handleGetNoOptionText } = useLayout();
	const { columnConstraintEditInfo, setColumnConstraintEditInfo } =
		useProject();

	const primaryKeyColumnsWithForeignKeyConstraint: ColumnStatePropsExtended[] =
		Object.values(columns)
			.flat()
			.filter(
				(col) =>
					col.columnConstraints.some(
						(constraint) => constraint.type === 'PRIMARY_KEY'
					) && col.tableId !== column.tableId
			);

	const handleChange = (event: SelectChangeEvent): void => {
		setColumnConstraintEditInfo((prev) => ({
			columnId: column.id,
			columnConstraintType: prev.columnConstraintType,
			clauseType: prev.clauseType,
			primaryKeyIdToForeignKey: event.target.value as string | null,
		}));
	};

	return (
		<>
			<Select
				variant="outlined"
				size="small"
				value={columnConstraintEditInfo?.primaryKeyIdToForeignKey || ''}
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
				{primaryKeyColumnsWithForeignKeyConstraint.map((column) => {
					const primaryKeyConstraint = column.columnConstraints.find(
						(constraint) => constraint.type === 'PRIMARY_KEY'
					);
					const primaryKeyId = primaryKeyConstraint
						? primaryKeyConstraint.id
						: null;

					return (
						<MenuItem key={column.id} value={primaryKeyId}>
							<Typography variant="body2" noWrap fontSize="0.7rem">
								{column.name}
							</Typography>
						</MenuItem>
					);
				})}
				<MenuItem value={null}>{handleGetNoOptionText('0.7rem')}</MenuItem>
			</Select>
		</>
	);
};
