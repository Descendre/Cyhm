import { TextField } from '@mui/material';
import { usePalette, useUser } from '../../../hooks';
import { EditHeaderUserPopperSearchBarProps } from '../../../interfaces';

export const EditHeaderUserPopperSearchBar = ({
	isUserView,
}: EditHeaderUserPopperSearchBarProps) => {
	const palette = usePalette();
	const { userSearchResults, handleUserLikeSearch } = useUser();

	return (
		<TextField
			fullWidth
			variant="outlined"
			size="small"
			placeholder={
				isUserView ? 'メンバーを検索' : 'メールアドレスまたはユーザー名で検索'
			}
			value={isUserView ? '' : userSearchResults.invite?.query}
			onChange={(event) => {
				if (!isUserView) {
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
