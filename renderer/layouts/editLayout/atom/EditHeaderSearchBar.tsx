import { InputAdornment, TextField } from '@mui/material';
import { usePalette } from '../../../hooks';
import { Search } from '@mui/icons-material';

export const EditHeaderSearchBar = () => {
	const palette = usePalette();

	return (
		<TextField
			variant="outlined"
			size="small"
			placeholder="プロジェクト内を検索"
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
						border: `1px solid ${palette.text.disabled}`,
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
						<Search
							fontSize="small"
							sx={{
								color: palette.text.disabled,
							}}
						/>
					</InputAdornment>
				),
			}}
		/>
	);
};
