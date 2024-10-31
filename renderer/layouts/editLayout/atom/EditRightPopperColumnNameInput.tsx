import { InputAdornment, TextField } from '@mui/material';
import { useLayout, usePalette, useProject } from '../../../hooks';
import { Update } from '@mui/icons-material';
import { EditRightPopperColumnNameInputProps } from '../../../interfaces';

export const EditRightPopperColumnNameInput = ({
	column,
	table,
}: EditRightPopperColumnNameInputProps) => {
	const palette = usePalette();
	const { tables } = useLayout();
	const { columnEditInfo, handleColumnNameChange, handleColumnNameUpdate } =
		useProject();
	const isEditable: boolean = tables[table?.id]?.isEditing;
	const editColumnInfo = columnEditInfo[table.id].find(
		(col) => col.id === column.id
	);

	const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
		const tableId = table?.id;
		const columnId = column?.id;
		if (event.key === 'Enter' && tableId && columnId) {
			handleColumnNameUpdate({
				tableId: table.id,
				columnId: column.id,
				name: editColumnInfo.name,
			});
		}
	};

	return (
		<TextField
			fullWidth
			disabled={!isEditable}
			variant="outlined"
			size="small"
			placeholder="カラム名を入力"
			value={editColumnInfo?.name}
			onKeyDown={(event) => handleKeyDown(event)}
			onChange={(event) =>
				handleColumnNameChange({
					tableId: table.id,
					columnId: column.id,
					name: event.target.value,
				})
			}
			sx={{
				flexGrow: 1,
				height: '30px',
				borderRadius: '4px',
				backgroundColor: palette.layout.editLayout.header.searchBar.bg,
				'& .MuiInputBase-root': {
					height: '30px',
					'&:hover fieldset': {
						border: `solid 1px ${palette.text.disabled}`,
					},
					'&.Mui-focused fieldset': {
						border: `1px solid ${palette.primary.main}`,
					},
					'&.Mui-disabled fieldset': {
						border: 'none',
					},
				},
			}}
			inputProps={{
				style: {
					fontSize: '0.7rem',
				},
			}}
			InputProps={{
				endAdornment: (
					<>
						{isEditable &&
						editColumnInfo &&
						table &&
						column.name !== editColumnInfo.name ? (
							<InputAdornment position="end">
								<Update
									titleAccess="更新"
									fontSize="small"
									onClick={() =>
										handleColumnNameUpdate({
											tableId: table.id,
											columnId: column.id,
											name: editColumnInfo.name,
										})
									}
									sx={{
										color: palette.primary.main,
										cursor: 'pointer',
									}}
								/>
							</InputAdornment>
						) : (
							<></>
						)}
					</>
				),
			}}
		/>
	);
};
