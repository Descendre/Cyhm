import { InputAdornment, TextField } from '@mui/material';
import { usePalette } from '../../../hooks';
import { Update } from '@mui/icons-material';

export const EditRightPopperTableNameInput = () => {
	const palette = usePalette();

	return (
		<TextField
			fullWidth
			variant="outlined"
			size="small"
			placeholder="テーブル名を入力"
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
				},
			}}
			inputProps={{
				style: {
					fontSize: '0.7rem',
				},
			}}
			InputProps={{
				endAdornment: (
					<InputAdornment position="end">
						<Update
							fontSize="small"
							sx={{
								color: palette.primary.main,
							}}
						/>
					</InputAdornment>
				),
			}}
		/>
	);
};
