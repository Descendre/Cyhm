import { InputAdornment, TextField, Typography } from '@mui/material';
import { useLayout, usePalette, useProject } from '../../../hooks';
import { Update } from '@mui/icons-material';
import { EditRightPopperTableColorInputProps } from '../../../interfaces';

export const EditRightPopperTableColorInput = ({
	table,
}: EditRightPopperTableColorInputProps) => {
	const palette = usePalette();
	const { tables } = useLayout();
	const { tableEditInfo, handleTableColorChange, handleTableColorUpdate } =
		useProject();
	const isEditable: boolean = tables[table?.id]?.isEditing;

	const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
		const tableId = table?.id;
		const color = tableEditInfo[tableId]?.color;
		if (event.key === 'Enter' && tableId && color) {
			handleTableColorUpdate({ tableId: table.id, color: color });
		}
	};

	return (
		<TextField
			fullWidth
			disabled={!isEditable}
			variant="outlined"
			size="small"
			placeholder="テーブルカラーを入力"
			value={tableEditInfo[table?.id]?.color || ''}
			onChange={(event) =>
				handleTableColorChange({
					tableId: table?.id,
					color: event.target.value,
				})
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
				startAdornment: (
					<InputAdornment position="start">
						<Typography
							variant="body2"
							sx={{
								color: isEditable
									? palette.text.secondary
									: palette.text.disabled,
							}}
						>
							#
						</Typography>
					</InputAdornment>
				),
				endAdornment: (
					<>
						{isEditable &&
						table &&
						tables[table?.id] &&
						tableEditInfo[table?.id] &&
						tables[table.id].color !== '#' + tableEditInfo[table.id].color ? (
							<InputAdornment position="end">
								<Update
									titleAccess="更新"
									fontSize="small"
									onClick={() =>
										handleTableColorUpdate({
											tableId: table.id,
											color: tableEditInfo[table.id].color,
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
