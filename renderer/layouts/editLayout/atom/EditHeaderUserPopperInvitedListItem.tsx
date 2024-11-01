import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { useNotify, usePalette, useProject } from '../../../hooks';
import { EditHeaderUserPopperInvitedListItemProps } from '../../../interfaces';
import { DeleteForever } from '@mui/icons-material';
import { useSession } from 'next-auth/react';

export const EditHeaderUserPopperInvitedListItem = ({
	user,
}: EditHeaderUserPopperInvitedListItemProps) => {
	const palette = usePalette();
	const { data: session } = useSession();
	const { currentProject } = useProject();
	const { handleDeleteInviteNotify } = useNotify();

	const handleInviteDelete = async (): Promise<void> => {
		if (!session || !session.user) return;
		await handleDeleteInviteNotify({
			fromUserId: session.user.id,
			toUserId: user.id,
			projectId: currentProject.id,
		});
	};

	return (
		<ListItem
			sx={{
				height: '60px',
			}}
		>
			<ListItemAvatar>
				<Avatar
					src={user.image}
					sx={{
						width: '35px',
						height: '35px',
					}}
				/>
			</ListItemAvatar>
			<ListItemText
				primary={user.name}
				secondary={`(${user.provider})`}
				primaryTypographyProps={{
					fontSize: '0.9rem',
					sx: {
						wordBreak: 'break-all',
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						display: '-webkit-box',
						WebkitLineClamp: 2,
						WebkitBoxOrient: 'vertical',
						userSelect: 'none',
					},
				}}
				secondaryTypographyProps={{
					fontSize: '0.8rem',
					color: palette.text.disabled,
					textOverflow: 'ellipsis',
					overflow: 'hidden',
					whiteSpace: 'nowrap',
					sx: {
						userSelect: 'none',
					},
				}}
			/>
			<DeleteForever
				titleAccess="招待取り消し"
				color="error"
				onClick={handleInviteDelete}
				sx={{
					cursor: 'pointer',
				}}
			/>
		</ListItem>
	);
};
