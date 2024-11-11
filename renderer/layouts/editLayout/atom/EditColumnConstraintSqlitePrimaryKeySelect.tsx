import { MenuItem, Select } from '@mui/material';
import { useLayout, usePalette } from '../../../hooks';
import { EditColumnConstraintSqlitePrimaryKeySelectProps } from '../../../interfaces';
import { SqliteClauseType } from '@prisma/client';

export const EditColumnConstraintSqlitePrimaryKeySelect = ({
	column,
	constraint,
}: EditColumnConstraintSqlitePrimaryKeySelectProps) => {
	const palette = usePalette();
	const { handleGetClauseTextWithSQlite } = useLayout();

	const clauses: SqliteClauseType[] = ['AUTO_INCREMENT'];

	return (
		<>
			{column.sqliteType === 'INTEGER' && (
				<Select
					variant="outlined"
					size="small"
					value={constraint.sqliteClause}
					sx={{
						width: '70%',
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
					{clauses.map((clause) => (
						<MenuItem key={clause} value={clause}>
							{handleGetClauseTextWithSQlite(clause, '0.7rem')}
						</MenuItem>
					))}
				</Select>
			)}
		</>
	);
};
