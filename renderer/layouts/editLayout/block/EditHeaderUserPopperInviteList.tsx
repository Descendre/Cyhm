import { List } from '@mui/material';
import { useUser } from '../../../hooks';
import { EditHeaderUserPopperInviteListItem } from '../atom';

export const EditHeaderUserPopperInviteList = () => {
	const { userSearchResults } = useUser();

	return (
		<List
			sx={{
				width: '100%',
				height: '100%',
				overflowY: 'overlay',
				'&:not(:hover)': {
					'&::-webkit-scrollbar-thumb': {
						backgroundColor: 'transparent',
					},
				},
			}}
		>
			{userSearchResults.invite.result?.map((user) => (
				<EditHeaderUserPopperInviteListItem key={user.id} user={user} />
			))}
		</List>
	);
};
