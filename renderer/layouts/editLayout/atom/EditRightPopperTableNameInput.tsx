import { InputAdornment, TextField } from '@mui/material';
import { useLayout, usePalette, useProject } from '../../../hooks';
import { Update } from '@mui/icons-material';
import { EditRightPopperTableNameInputProps } from '../../../interfaces';

export const EditRightPopperTableNameInput = ({
	table,
}: EditRightPopperTableNameInputProps) => {
	const palette = usePalette();
	const { tables } = useLayout();
	const { tableEditInfo, handleTableNameChange, handleTableNameUpdate } =
		useProject();
	const isEditable: boolean = tables[table?.id]?.isEditing;

	const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
		const tableId = table?.id;
		const name = tableEditInfo[tableId]?.name;
		if (event.key === 'Enter' && tableId && name) {
			handleTableNameUpdate({ tableId: table.id, name: name });
		}
	};

	return (
		<TextField
			fullWidth
			disabled={!isEditable}
			variant="outlined"
			size="small"
			placeholder="テーブル名を入力"
			value={tableEditInfo[table?.id]?.name || ''}
			onChange={(event) =>
				handleTableNameChange({ tableId: table?.id, event: event })
			}
			onKeyDown={(event) => handleKeyDown(event)}
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
						table &&
						tables[table?.id] &&
						tableEditInfo[table?.id] &&
						tables[table.id].name !== tableEditInfo[table.id].name ? (
							<InputAdornment position="end">
								<Update
									titleAccess="更新"
									fontSize="small"
									onClick={() =>
										handleTableNameUpdate({
											tableId: table.id,
											name: tableEditInfo[table.id].name,
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
