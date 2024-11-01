import { List } from '@mui/material';
import { useNotify } from '../../../hooks';
import { EditHeaderUserPopperInvitedListItem } from '../atom';

export const EditHeaderUserPopperInvitedList = () => {
	const { invitedUsers } = useNotify();

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
			{invitedUsers.map((user) => (
				<EditHeaderUserPopperInvitedListItem
					key={user.toUser.id}
					user={user.toUser}
				/>
			))}
		</List>
	);
};
