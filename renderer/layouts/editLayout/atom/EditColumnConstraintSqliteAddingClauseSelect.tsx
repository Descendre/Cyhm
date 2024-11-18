import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useLayout, usePalette, useProject } from '../../../hooks';
import { SqliteClauseType } from '@prisma/client';
import { EditColumnConstraintSqlitePrimaryKeyAddingClauseSelectProps } from '../../../interfaces';

export const EditColumnConstraintSqlitePrimaryKeyAddingClauseSelect = ({
	column,
}: EditColumnConstraintSqlitePrimaryKeyAddingClauseSelectProps) => {
	const palette = usePalette();
	const { handleGetClauseTextWithSQlite, handleGetNoOptionText } = useLayout();
	const { columnConstraintEditInfo, setColumnConstraintEditInfo } =
		useProject();

	const sqliteIntegerPrimaryKeyClauses: SqliteClauseType[] = ['AUTO_INCREMENT'];

	const handleChange = (event: SelectChangeEvent): void => {
		setColumnConstraintEditInfo((prev) => ({
			columnId: column.id,
			columnConstraintType: prev.columnConstraintType,
			clauseType: event.target.value as SqliteClauseType | null,
			primaryKeyId: prev.primaryKeyId,
		}));
	};

	return (
		<>
			{column.sqliteType === 'INTEGER' && (
				<Select
					variant="outlined"
					size="small"
					value={columnConstraintEditInfo?.clauseType || ''}
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
					{sqliteIntegerPrimaryKeyClauses.map((clause) => (
						<MenuItem key={clause} value={clause}>
							{handleGetClauseTextWithSQlite(clause, '0.7rem')}
						</MenuItem>
					))}
					<MenuItem value={null}>{handleGetNoOptionText('0.7rem')}</MenuItem>
				</Select>
			)}
		</>
	);
};
