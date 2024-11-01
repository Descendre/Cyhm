import { TextField } from '@mui/material';
import { useLayout, usePalette, useUser } from '../../../hooks';

export const EditHeaderUserPopperSearchBar = () => {
	const palette = usePalette();
	const { userSearchResults, handleUserLikeSearch } = useUser();
	const { userPopperViewMode } = useLayout();

	return (
		<TextField
			fullWidth
			variant="outlined"
			size="small"
			placeholder={'ユーザー名もしくはメールアドレスを入力'}
			value={
				userPopperViewMode === 'member'
					? ''
					: userPopperViewMode === 'invite'
						? userSearchResults.invite?.query
						: ''
			}
			onChange={(event) => {
				if (userPopperViewMode === 'invite') {
					handleUserLikeSearch({ keyWord: event.target.value });
				}
			}}
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
		/>
	);
};
